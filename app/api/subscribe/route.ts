import { supabaseAdmin } from "@/lib/supabase-admin"
import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  const { email } = await req.json()

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
  }

  const normalized = email.trim().toLowerCase()

  const { error: dbError } = await supabaseAdmin
    .from("subscribers")
    .upsert({ email: normalized }, { onConflict: "email", ignoreDuplicates: true })

  if (dbError) {
    console.error("Supabase subscriber insert error:", dbError)
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 })
  }

  // Best-effort: sync to the Resend segment used for broadcast updates.
  // Non-fatal — the subscriber row is the source of truth, this just keeps
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

  return NextResponse.json({ ok: true })
}
