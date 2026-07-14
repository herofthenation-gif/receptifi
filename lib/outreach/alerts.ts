import { Resend } from "resend";
import { FROM_EMAIL, FROM_NAME } from "./config";

const resend = new Resend(process.env.RESEND_API_KEY);

// Where cron failure alerts go. Must be an inbox Karmello actually reads.
export const ALERT_EMAIL = process.env.OUTREACH_ALERT_EMAIL ?? "herofthenation@gmail.com";

/**
 * Email an operational alert. Tries the normal sender first; if that fails
 * (e.g. the domain is unverified on whatever Resend account the key belongs
 * to, which is exactly the failure mode that ate the 07-11/07-13 cron runs),
 * retries from Resend's built-in onboarding@resend.dev sender, which needs no
 * domain verification. Never throws: an alert failure must not break the cron.
 */
export async function sendFailureAlert(subject: string, body: string): Promise<void> {
  const senders = [
    `${FROM_NAME} <${FROM_EMAIL}>`,
    "Receptifi Alerts <onboarding@resend.dev>",
  ];
  for (const from of senders) {
    try {
      const { error } = await resend.emails.send({
        from,
        to: ALERT_EMAIL,
        subject: `[Receptifi cron] ${subject}`,
        text: body,
      });
      if (!error) return;
      console.error(`sendFailureAlert via ${from}: ${error.message}`);
    } catch (err) {
      console.error(`sendFailureAlert via ${from}: ${(err as Error).message}`);
    }
  }
}
