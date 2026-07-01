import { Resend } from "resend";
import { FROM_EMAIL, FROM_NAME, REPLY_TO } from "./config";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendResult {
  ok: boolean;
  error?: string;
}

export async function sendColdEmail(to: string, subject: string, text: string): Promise<SendResult> {
  const { error } = await resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to,
    replyTo: REPLY_TO,
    subject,
    text,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
