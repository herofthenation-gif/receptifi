import { supabaseAdmin } from "@/lib/supabase-admin"
import { Resend } from "resend"
import { NextResponse } from "next/server"
import { buildTipEmail } from "@/lib/tip-email"

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Which page element the signup came from, lets Karmello see which topic
// a subscriber is actually interested in (e.g. for follow-up email content).
const VALID_SOURCES = new Set([
  "footer",
  "seo_tips",
  "google_tips",
  "meta_tips",
  "aria_tips",
  "website_tips",
  "crm_tips",
])

export async function POST(req: Request) {
  const { email, source } = await req.json()

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
  }

  const normalized = email.trim().toLowerCase()
  const resolvedSource = typeof source === "string" && VALID_SOURCES.has(source) ? source : "footer"

  const { error: dbError } = await supabaseAdmin
    .from("subscribers")
    .upsert({ email: normalized, source: resolvedSource }, { onConflict: "email", ignoreDuplicates: true })

  if (dbError) {
    console.error("Supabase subscriber insert error:", dbError)
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 })
  }

  // Best-effort: sync to the Resend segment used for broadcast updates.
  // Non-fatal: the subscriber row is the source of truth, this just keeps
  // Resend in sync so broadcasts can be sent from there directly.
  const segmentId = process.env.RESEND_SUBSCRIBERS_SEGMENT_ID
  if (segmentId) {
    const { error: resendError } = await resend.contacts.create({
      email: normalized,
      segments: [{ id: segmentId }],
    })
    if (resendError) {
      console.error("Resend contact sync error:", resendError)
    }
  }

  // Best-effort: deliver the free tip they signed up for immediately.
  // Non-fatal: the subscriber row is already saved either way.
  const tipEmail = buildTipEmail(resolvedSource)
  if (tipEmail) {
    const { error: tipEmailError } = await resend.emails.send({
      from: tipEmail.from,
      to: normalized,
      replyTo: tipEmail.replyTo,
      subject: tipEmail.subject,
      html: tipEmail.html,
    })
    if (tipEmailError) {
      console.error("Tip email send error:", tipEmailError)
    }
  }

  return NextResponse.json({ ok: true })
}
