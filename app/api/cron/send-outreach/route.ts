import { supabaseAdmin } from "@/lib/supabase-admin";
import { assertCronAuth } from "@/lib/outreach/cron-auth";
import { checkGmailReplies } from "@/lib/outreach/gmail";
import { getDueLeads } from "@/lib/outreach/due-emails";
import { sendColdEmail } from "@/lib/outreach/resend-client";
import { buildOutreachEmail } from "@/lib/outreach/email-templates";
import { personalizeOpening } from "@/lib/outreach/personalize";
import { DEFAULT_DAILY_CAP, PREVIEW_BASE_URL } from "@/lib/outreach/config";

export const maxDuration = 60;

interface SendResultEntry {
  businessName: string;
  touch: number;
  to: string;
  subject: string;
  vertical: string | null;
  offerType: string;
  status: "sent" | "error" | "preview";
  error?: string;
}

export async function GET(req: Request) {
  const authError = assertCronAuth(req);
  if (authError) return authError;

  // Step A: check for replies first so a same-day reply suppresses today's send.
  const replyCheck = await checkGmailReplies();

  // Step B: compute who's due.
  const cap = Number(process.env.OUTREACH_DAILY_CAP ?? DEFAULT_DAILY_CAP);
  const due = await getDueLeads(cap);

  // Step C: safety gate — must explicitly set the literal string "false" to send for real.
  const dryRun = process.env.OUTREACH_DRY_RUN !== "false";

  const today = new Date().toISOString().slice(0, 10);
  const results: SendResultEntry[] = [];

  for (const { lead, touch } of due) {
    const businessName = lead.business_name ?? lead.name;
    const ctx = {
      vertical: lead.vertical,
      offerType: lead.offer_type,
      previewUrl: lead.preview_slug ? `${PREVIEW_BASE_URL}/${lead.preview_slug}` : null,
    };
    const opening =
      touch === 1
        ? personalizeOpening({
            hasWebsite: !!lead.website,
            reviewCount: lead.review_count,
            hours: lead.hours_json,
            rating: lead.rating,
            vertical: lead.vertical,
            city: lead.city,
            offerType: lead.offer_type,
            qualitySignals: lead.generated_site?.qualitySignals ?? null,
          })
        : "";
    const { subject, text } = buildOutreachEmail(touch, businessName, opening, ctx);
    const offerType = lead.offer_type ?? "voice";

    if (dryRun) {
      results.push({ businessName, touch, to: lead.email!, subject, vertical: lead.vertical, offerType, status: "preview" });
      continue;
    }

    const sendResult = await sendColdEmail(lead.email!, subject, text);
    if (sendResult.ok) {
      await supabaseAdmin
        .from("leads")
        .update({ outreach_touch: touch, outreach_sent_at: today, outreach_last_error: null })
        .eq("id", lead.id);
      results.push({ businessName, touch, to: lead.email!, subject, vertical: lead.vertical, offerType, status: "sent" });
    } else {
      await supabaseAdmin.from("leads").update({ outreach_last_error: sendResult.error }).eq("id", lead.id);
      results.push({ businessName, touch, to: lead.email!, subject, vertical: lead.vertical, offerType, status: "error", error: sendResult.error });
    }
  }

  return Response.json({
    dryRun,
    repliesChecked: replyCheck.checked,
    repliesMatched: replyCheck.matched,
    unsubscribed: replyCheck.unsubscribed,
    queued: due.length,
    results,
  });
}
