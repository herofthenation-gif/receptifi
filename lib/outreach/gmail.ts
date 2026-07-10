import { supabaseAdmin } from "@/lib/supabase-admin";

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

interface GmailMessageList {
  messages?: { id: string }[];
}

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID!,
      client_secret: process.env.GMAIL_CLIENT_SECRET!,
      refresh_token: process.env.GMAIL_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`gmail token refresh failed: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as TokenResponse;
  return json.access_token;
}

async function listRecentMessageIds(accessToken: string): Promise<string[]> {
  // 3-day window gives overlap safety for a once-daily cron — re-checking an
  // already-replied lead is harmless (idempotent update).
  const url = new URL("https://gmail.googleapis.com/gmail/v1/users/me/messages");
  url.searchParams.set("q", "newer_than:3d in:inbox");
  url.searchParams.set("maxResults", "50");
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!res.ok) throw new Error(`gmail list failed: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as GmailMessageList;
  return (json.messages ?? []).map((m) => m.id);
}

interface MessageMeta {
  from: string | null;
  subject: string | null;
  snippet: string | null;
}

async function getMessageMeta(accessToken: string, messageId: string): Promise<MessageMeta | null> {
  const url = new URL(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`);
  url.searchParams.set("format", "metadata");
  url.searchParams.append("metadataHeaders", "From");
  url.searchParams.append("metadataHeaders", "Subject");
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!res.ok) return null;
  const json = (await res.json()) as {
    snippet?: string;
    payload?: { headers?: { name: string; value: string }[] };
  };
  const header = (name: string) => json.payload?.headers?.find((h) => h.name === name)?.value ?? null;
  return { from: header("From"), subject: header("Subject"), snippet: json.snippet ?? null };
}

// CAN-SPAM opt-out: the signature says reply "unsubscribe" — catch the
// common phrasings people actually type.
const UNSUBSCRIBE_RE = /unsubscribe|opt.?out|\bstop\s+email|remove\s+me|take\s+me\s+off|do\s+not\s+(?:contact|email)|don'?t\s+(?:contact|email)\s+me/i;

function extractEmailAddress(fromHeader: string): string | null {
  const match = fromHeader.match(EMAIL_RE);
  return match ? match[0].toLowerCase() : null;
}

export interface ReplyCheckResult {
  checked: number;
  matched: number;
  unsubscribed: number;
}

/**
 * Polls the receptifi.ai@gmail.com inbox (the Reply-To on every cold email)
 * for replies from leads currently in the outreach sequence, and marks them
 * outreach_replied=true so they drop out of getDueLeads(). No-ops cleanly if
 * Gmail OAuth env vars aren't configured yet, so it never blocks sending.
 */
export async function checkGmailReplies(): Promise<ReplyCheckResult> {
  if (!process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET || !process.env.GMAIL_REFRESH_TOKEN) {
    return { checked: 0, matched: 0, unsubscribed: 0 };
  }

  const { data: activeLeads, error } = await supabaseAdmin
    .from("leads")
    .select("id,email")
    .not("email", "is", null)
    .or("outreach_replied.is.null,outreach_replied.eq.false")
    .gte("outreach_touch", 1);

  if (error || !activeLeads?.length) return { checked: 0, matched: 0, unsubscribed: 0 };

  const emailToLeadId = new Map<string, string>();
  for (const lead of activeLeads) {
    if (lead.email) emailToLeadId.set(lead.email.toLowerCase(), lead.id as string);
  }

  const accessToken = await getAccessToken();
  const messageIds = await listRecentMessageIds(accessToken);

  let matched = 0;
  let unsubscribed = 0;
  for (const id of messageIds) {
    const meta = await getMessageMeta(accessToken, id);
    const fromEmail = meta?.from ? extractEmailAddress(meta.from) : null;
    const leadId = fromEmail ? emailToLeadId.get(fromEmail) : undefined;
    if (!leadId || !meta) continue;

    const optOut = UNSUBSCRIBE_RE.test(`${meta.subject ?? ""} ${meta.snippet ?? ""}`);
    await supabaseAdmin
      .from("leads")
      .update(optOut ? { outreach_replied: true, unsubscribed_at: new Date().toISOString() } : { outreach_replied: true })
      .eq("id", leadId);
    matched++;
    if (optOut) unsubscribed++;
  }

  return { checked: messageIds.length, matched, unsubscribed };
}
