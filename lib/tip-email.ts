// Content for the instant "free tip" email sent right after someone signs up
// through one of the "Get free X tips" forms on the site. Each entry maps to
// a SubscribeForm `source` value.

type TipTopic = {
  subject: string
  heading: string
  intro: string
  tips: string[]
}

const TIP_TOPICS: Record<string, TipTopic> = {
  aria_tips: {
    subject: "Your free phone coverage tips",
    heading: "3 ways to stop losing calls",
    intro:
      "A missed call is a customer who just called your competitor next. Here's what to fix first, before you spend a dollar on ads to bring in more calls you'll only lose the same way.",
    tips: [
      "Set a 3-ring rule. If nobody live picks up by the third ring, an auto-text should go out immediately asking to reschedule the call, most people won't call back a second time on their own.",
      "Kill the generic voicemail greeting. Record one that names your business and sets a callback window (\"we'll call you back within the hour\"), it buys you time without losing the lead.",
      "Track why calls are actually being missed for one week, after-hours, on another job, or just busy, the fix is different for each one.",
    ],
  },
  website_tips: {
    subject: "Your free website tips",
    heading: "3 fixes for a site that isn't converting",
    intro:
      "Most local business sites lose the visitor before they ever read a word. These are the fixes that move the needle fastest, whether you have no site yet or one that's overdue for a rebuild.",
    tips: [
      "Put your phone number and city above the fold, click-to-call, not buried in a header menu. On mobile, that's the only thing most visitors are looking for.",
      "Put 2 to 3 real reviews on the homepage itself, not a separate testimonials page nobody clicks to. Social proof works only if it's seen in the first five seconds.",
      "Give every page exactly one action to take. A homepage with five different buttons competing for attention converts worse than one with a single clear next step.",
    ],
  },
  crm_tips: {
    subject: "Your free CRM setup tips",
    heading: "3 ways to stop losing leads in the shuffle",
    intro:
      "If leads live across texts, a notebook, and memory, some of them are quietly falling through right now. Here's how to fix that before you spend more on marketing to fill a leaky bucket.",
    tips: [
      "Get every lead into one place the day it comes in, phone, form, walk-in, all of it. If you have to ask \"wait, did we already talk to this person?\" you don't have a system yet.",
      "Build a follow-up schedule for anyone who doesn't book on the first contact, day 1, day 3, day 7. Most jobs close on a later touch, not the first one.",
      "Tag every lead by where it came from. Without that, you can't tell which marketing dollar is actually turning into paying jobs.",
    ],
  },
  seo_tips: {
    subject: "Your free SEO tips",
    heading: "3 ways to rank higher this month",
    intro:
      "Over 90% of local searches never scroll past the first screen. These are the highest-leverage, lowest-cost moves to get in front of that screen.",
    tips: [
      "Fully fill out your Google Business Profile, hours, every relevant category, and real job photos. It's free and most competitors only half do it.",
      "Ask every satisfied customer for a Google review before they leave the job. Recent reviews beat sheer volume of old ones for ranking.",
      "Build one page per service-and-city combination (\"AC repair in Riverside\"), not one generic services page trying to rank for everything at once.",
    ],
  },
  google_tips: {
    subject: "Your free Google Ads tips",
    heading: "3 ways to get more out of every ad dollar",
    intro:
      "Most local businesses waste half their Google Ads budget on the wrong clicks. Here's where to fix it first.",
    tips: [
      "Bid on your own brand name and your closest competitors' names, some of the cheapest, highest-converting clicks you can buy.",
      "Send ad traffic to a page built for that exact search, not your homepage. A dedicated landing page converts significantly better.",
      "Add a call-only ad extension with a real number. Most local searches convert by phone, not by filling out a form.",
    ],
  },
  meta_tips: {
    subject: "Your free Meta Ads tips",
    heading: "3 ways to stop the scroll",
    intro:
      "Facebook and Instagram ads live or die on the first half-second. These are the changes that actually move performance.",
    tips: [
      "Lead with a real job photo or before/after, not a stock graphic. It's the single biggest driver of getting someone to stop scrolling.",
      "Send every ad to a form that asks for a phone number, not just an email, so you can get them on the phone the same day.",
      "Post 2 to 3 times a week even with no ad budget running. When someone clicks an ad and checks your page, it needs to look active, not abandoned.",
    ],
  },
}

const FROM = "Receptifi <karmello@receptifi.net>"
const REPLY_TO = "receptifi.ai@gmail.com"
const CALENDLY_URL = "https://calendly.com/karmello-koba1ba/30min"

export function buildTipEmail(source: string): { from: string; replyTo: string; subject: string; html: string } | null {
  const topic = TIP_TOPICS[source]
  if (!topic) return null

  const html = `
<div style="font-family:Inter,ui-sans-serif,sans-serif;background:#05070d;color:#e2e8f0;max-width:600px;margin:0 auto;padding:40px 32px;border-radius:16px">
  <div style="margin-bottom:32px">
    <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#0ea5e9);display:inline-flex;align-items:center;justify-content:center">
      <div style="width:10px;height:10px;border-radius:50%;background:#fff"></div>
    </div>
    <span style="font-weight:700;font-size:18px;vertical-align:middle;margin-left:10px;color:#fff">Receptifi</span>
  </div>

  <h1 style="font-size:26px;font-weight:700;color:#fff;margin:0 0 16px;line-height:1.25">${topic.heading}</h1>
  <p style="font-size:16px;color:#94a3b8;line-height:1.7;margin:0 0 24px">${topic.intro}</p>

  <ol style="margin:0 0 28px;padding:0 0 0 20px">
    ${topic.tips
      .map(
        (tip) =>
          `<li style="font-size:15px;color:#e2e8f0;line-height:1.7;margin:0 0 16px">${tip}</li>`
      )
      .join("")}
  </ol>

  <p style="font-size:16px;color:#94a3b8;line-height:1.7;margin:0 0 24px">
    Want us to just handle this for you, guaranteed results before you pay? Grab 20 minutes and we'll show you exactly what's costing you jobs right now.
  </p>

  <a href="${CALENDLY_URL}" style="display:inline-block;padding:14px 28px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#0ea5e9);color:#fff;font-weight:600;font-size:15px;text-decoration:none;margin-bottom:32px">
    Book Your Free Call →
  </a>

  <p style="font-size:13px;color:#334155;margin:0">The Receptifi Team</p>
</div>`

  return { from: FROM, replyTo: REPLY_TO, subject: topic.subject, html }
}
