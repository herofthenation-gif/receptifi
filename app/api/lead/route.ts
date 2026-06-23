import { supabase } from "@/lib/supabase"
import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)
const NOTIFY_TO = "herofthenation@gmail.com"
const FROM = "Receptifi Leads <receptifi.ai@gmail.com>"

export async function POST(req: Request) {
  const { name, email, phone, problem } = await req.json()

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 })
  }

  // Save to Supabase
  const { error: dbError } = await supabase.from("leads").insert({
    name,
    email,
    phone: phone ?? null,
    notes: problem ?? null,
    status: "warm",
  })

  if (dbError) {
    console.error("Supabase lead insert error:", dbError)
  }

  // Notify Karmello
  await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    subject: `New lead: ${name}`,
    html: `
      <div style="font-family:ui-sans-serif,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f8fafc;border-radius:12px">
        <div style="margin-bottom:24px">
          <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#6366f1;font-weight:600">New Receptifi Lead</span>
          <h1 style="font-size:24px;font-weight:700;color:#0f172a;margin:8px 0 0">${name}</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;width:120px">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;font-weight:500">
              <a href="mailto:${email}" style="color:#4f46e5">${email}</a>
            </td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b">Phone</td>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;font-weight:500">
              <a href="tel:${phone}" style="color:#4f46e5">${phone}</a>
            </td>
          </tr>` : ""}
          ${problem ? `
          <tr>
            <td style="padding:14px 0;color:#64748b;vertical-align:top">Challenge</td>
            <td style="padding:14px 0;color:#0f172a;line-height:1.6">${problem}</td>
          </tr>` : ""}
        </table>
        <div style="margin-top:28px">
          <a href="https://calendly.com/karmello-koba1ba/30min" style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;border-radius:999px;font-weight:600;font-size:14px;text-decoration:none">
            View on Calendly
          </a>
        </div>
        <p style="margin-top:24px;font-size:12px;color:#94a3b8">Receptifi lead capture · ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })} CT</p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}
