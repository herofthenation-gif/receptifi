import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyCalendlySignature } from "@/lib/outreach/calendly";

interface CalendlyWebhookPayload {
  event?: string;
  payload?: { email?: string };
}

// Invoked directly by Calendly, not by Vercel Cron — verified via HMAC
// signature instead of CRON_SECRET. Requires the user to register this
// webhook subscription themselves via the Calendly API (paid plan + their
// own access token) — see migration/runbook notes.
export async function POST(req: Request) {
  const raw = await req.text(); // must read raw body before parsing, for signature verification
  const sigHeader = req.headers.get("calendly-webhook-signature");

  if (!verifyCalendlySignature(raw, sigHeader)) {
    return Response.json({ error: "invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(raw) as CalendlyWebhookPayload;
  if (body.event !== "invitee.created") {
    return Response.json({ ok: true });
  }

  const email = body.payload?.email?.toLowerCase();
  if (!email) return Response.json({ ok: true });

  await supabaseAdmin
    .from("leads")
    .update({ status: "booked", booked_at: new Date().toISOString(), outreach_replied: true })
    .eq("email", email);

  return Response.json({ ok: true });
}
