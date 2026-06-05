import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Aria from Receptifi <receptifi.ai@gmail.com>";
const DEMO_URL = "https://receptifi.net/demo";
const CALENDLY_URL = "https://calendly.com/karmello-koba1ba/30min";

function scheduleISO(offsetMs: number): string {
  return new Date(Date.now() + offsetMs).toISOString();
}

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

function email1(firstName: string): { subject: string; html: string } {
  return {
    subject: "You're about to meet your new receptionist",
    html: `
<div style="font-family:Inter,ui-sans-serif,sans-serif;background:#05070d;color:#e2e8f0;max-width:600px;margin:0 auto;padding:40px 32px;border-radius:16px">
  <div style="margin-bottom:32px">
    <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#0ea5e9);display:inline-flex;align-items:center;justify-content:center">
      <div style="width:10px;height:10px;border-radius:50%;background:#fff"></div>
    </div>
    <span style="font-weight:700;font-size:18px;vertical-align:middle;margin-left:10px;color:#fff">Receptifi</span>
  </div>

  <h1 style="font-size:28px;font-weight:700;color:#fff;margin:0 0 16px;line-height:1.2">Hi ${firstName}, Aria is ready for you.</h1>
  <p style="font-size:16px;color:#94a3b8;line-height:1.7;margin:0 0 24px">
    You just filled out the form on our demo page — Aria, your AI receptionist, is standing by right now to take your call.
  </p>
  <p style="font-size:16px;color:#94a3b8;line-height:1.7;margin:0 0 24px">
    <strong style="color:#e2e8f0">Receptifi</strong> replaces your front desk with a 24/7 AI voice receptionist that answers calls, qualifies leads, books appointments, and never puts a patient on hold. For&nbsp;$497/month — less than a part-time hire.
  </p>

  <a href="${DEMO_URL}" style="display:inline-block;padding:14px 28px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;font-weight:600;font-size:15px;text-decoration:none;margin-bottom:32px">
    Talk to Aria Now →
  </a>

  <p style="font-size:13px;color:#475569;line-height:1.6;margin:0 0 8px">
    Aria is available 24/7 and will answer just like a real receptionist would — ask her anything about scheduling, pricing, or how Receptifi works.
  </p>
  <p style="font-size:13px;color:#334155;margin:0">— The Receptifi Team</p>
</div>`,
  };
}

function email2(firstName: string): { subject: string; html: string } {
  return {
    subject: "How did your call with Aria go?",
    html: `
<div style="font-family:Inter,ui-sans-serif,sans-serif;background:#05070d;color:#e2e8f0;max-width:600px;margin:0 auto;padding:40px 32px;border-radius:16px">
  <div style="margin-bottom:32px">
    <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#0ea5e9);display:inline-flex;align-items:center;justify-content:center">
      <div style="width:10px;height:10px;border-radius:50%;background:#fff"></div>
    </div>
    <span style="font-weight:700;font-size:18px;vertical-align:middle;margin-left:10px;color:#fff">Receptifi</span>
  </div>

  <h1 style="font-size:28px;font-weight:700;color:#fff;margin:0 0 16px;line-height:1.2">Hey ${firstName} — what did you think?</h1>
  <p style="font-size:16px;color:#94a3b8;line-height:1.7;margin:0 0 20px">
    You spoke with Aria about an hour ago. We'd love to know how it went.
  </p>
  <p style="font-size:16px;color:#94a3b8;line-height:1.7;margin:0 0 20px">
    If you liked what you heard, our <strong style="color:#e2e8f0">Standard plan at $497/month</strong> gets you a fully trained AI receptionist, live 24/7, answering every call the moment it rings — no voicemail, no hold music, no missed patients.
  </p>
  <p style="font-size:16px;color:#94a3b8;line-height:1.7;margin:0 0 28px">
    Want to see exactly how it would work for your practice? Book a quick 30-minute call with our team:
  </p>

  <a href="${CALENDLY_URL}" style="display:inline-block;padding:14px 28px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;font-weight:600;font-size:15px;text-decoration:none;margin-bottom:32px">
    Book a Free 30-Min Demo →
  </a>

  <p style="font-size:13px;color:#334155;margin:0">— Karmello &amp; the Receptifi Team</p>
</div>`,
  };
}

function email3(firstName: string): { subject: string; html: string } {
  return {
    subject: "Still thinking it over? Here's what you're missing",
    html: `
<div style="font-family:Inter,ui-sans-serif,sans-serif;background:#05070d;color:#e2e8f0;max-width:600px;margin:0 auto;padding:40px 32px;border-radius:16px">
  <div style="margin-bottom:32px">
    <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#0ea5e9);display:inline-flex;align-items:center;justify-content:center">
      <div style="width:10px;height:10px;border-radius:50%;background:#fff"></div>
    </div>
    <span style="font-weight:700;font-size:18px;vertical-align:middle;margin-left:10px;color:#fff">Receptifi</span>
  </div>

  <h1 style="font-size:28px;font-weight:700;color:#fff;margin:0 0 20px;line-height:1.2">While you were thinking, 7 calls went to voicemail.</h1>
  <p style="font-size:16px;color:#94a3b8;line-height:1.7;margin:0 0 12px">
    That's not a scare tactic — that's the average for a busy practice over a 24-hour period. Every missed call is a patient who chose a competitor.
  </p>

  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px 24px;margin:24px 0">
    <p style="font-size:14px;color:#94a3b8;margin:0 0 12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em">What Receptifi solves</p>
    <ul style="padding-left:20px;margin:0;color:#cbd5e1;font-size:15px;line-height:1.9">
      <li>Calls that ring out after hours — answered instantly</li>
      <li>Staff spending 40% of their day on the phone — eliminated</li>
      <li>New patient leads slipping through the cracks — captured automatically</li>
      <li>Hiring, training, and managing a front desk — gone</li>
    </ul>
  </div>

  <p style="font-size:16px;color:#94a3b8;line-height:1.7;margin:0 0 28px">
    For $497/month you get all of this — fully set up and live within days. Ready to see it working for your business specifically?
  </p>

  <a href="${CALENDLY_URL}" style="display:inline-block;padding:14px 28px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;font-weight:600;font-size:15px;text-decoration:none;margin-bottom:32px">
    Book a Free 30-Min Call →
  </a>

  <p style="font-size:13px;color:#334155;margin:0">— Karmello &amp; the Receptifi Team</p>
</div>`,
  };
}

function email4(firstName: string): { subject: string; html: string } {
  return {
    subject: "Last chance to see Receptifi in action",
    html: `
<div style="font-family:Inter,ui-sans-serif,sans-serif;background:#05070d;color:#e2e8f0;max-width:600px;margin:0 auto;padding:40px 32px;border-radius:16px">
  <div style="margin-bottom:32px">
    <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#0ea5e9);display:inline-flex;align-items:center;justify-content:center">
      <div style="width:10px;height:10px;border-radius:50%;background:#fff"></div>
    </div>
    <span style="font-weight:700;font-size:18px;vertical-align:middle;margin-left:10px;color:#fff">Receptifi</span>
  </div>

  <h1 style="font-size:28px;font-weight:700;color:#fff;margin:0 0 16px;line-height:1.2">${firstName}, we're keeping only a few onboarding slots open.</h1>
  <p style="font-size:16px;color:#94a3b8;line-height:1.7;margin:0 0 20px">
    We personally onboard every new client to make sure Aria is trained and dialed-in before she goes live. That means we can only take on a limited number of new practices at a time.
  </p>
  <p style="font-size:16px;color:#94a3b8;line-height:1.7;margin:0 0 28px">
    If you want one of those spots, grab a time now. The call is free, takes 30 minutes, and we'll show you exactly how Receptifi would work at your practice.
  </p>

  <a href="${CALENDLY_URL}" style="display:inline-block;padding:14px 28px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;font-weight:600;font-size:15px;text-decoration:none;margin-bottom:32px">
    Claim Your Spot →
  </a>

  <p style="font-size:14px;color:#475569;line-height:1.6;margin:0 0 8px">
    If now isn't the right time, no hard feelings — you can always come back to <a href="${DEMO_URL}" style="color:#60a5fa;text-decoration:none">try Aria</a> whenever you're ready.
  </p>
  <p style="font-size:13px;color:#334155;margin:0">— Karmello &amp; the Receptifi Team</p>
</div>`,
  };
}

export async function POST(request: Request) {
  const { name, email } = await request.json() as { name?: string; email?: string };

  if (!email) {
    return Response.json({ error: "email is required" }, { status: 400 });
  }

  const firstName = (name ?? "there").split(" ")[0];

  const e1 = email1(firstName);
  const e2 = email2(firstName);
  const e3 = email3(firstName);
  const e4 = email4(firstName);

  const results = await Promise.allSettled([
    resend.emails.send({ from: FROM, to: email, subject: e1.subject, html: e1.html }),
    resend.emails.send({ from: FROM, to: email, subject: e2.subject, html: e2.html, scheduledAt: scheduleISO(1 * HOUR) }),
    resend.emails.send({ from: FROM, to: email, subject: e3.subject, html: e3.html, scheduledAt: scheduleISO(1 * DAY) }),
    resend.emails.send({ from: FROM, to: email, subject: e4.subject, html: e4.html, scheduledAt: scheduleISO(3 * DAY) }),
  ]);

  const errors = results
    .filter((r): r is PromiseRejectedResult => r.status === "rejected")
    .map((r) => r.reason?.message ?? String(r.reason));

  if (errors.length) {
    console.error("[nurture] Some emails failed:", errors);
  }

  return Response.json({ ok: true, errors: errors.length ? errors : undefined });
}
