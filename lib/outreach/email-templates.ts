import { article, CALENDLY_URL, getVertical, PHYSICAL_ADDRESS, WEBSITE } from "./config";
import { seoFraming } from "./personalize";
import type { OfferType } from "./offer";

// CAN-SPAM: every commercial email needs a physical postal address and a
// clear opt-out. The opt-out is a reply — checkGmailReplies() detects it and
// sets unsubscribed_at, which getDueLeads() honors.
const SIGN_OFF = `Talk soon,
Karmello`;

const LEGAL_FOOTER = `Receptifi | ${WEBSITE}
${PHYSICAL_ADDRESS}
Not interested? Reply "unsubscribe" and you won't hear from me again.`;

export interface OutreachEmail {
  subject: string;
  text: string;
}

export interface EmailContext {
  vertical: string | null;
  /** Null = unclassified lead; falls back to the original voice pitch. */
  offerType: OfferType | null;
  /** Unused by current copy (no more free preview-site giveaway) — kept so callers don't need to change. */
  previewUrl: string | null;
  /** Used to decide the touch-1 greeting: a first name if this looks like a person, "Hello," otherwise. */
  email: string;
}

// Generic role inboxes we scrape off contractor/firm sites — never a person,
// so greeting one by whatever the local-part happens to spell out reads as
// broken personalization, not a name.
const ROLE_INBOX_LOCAL_PARTS = new Set([
  "info", "contact", "contactus", "hello", "hi", "support", "help", "sales",
  "admin", "office", "front", "frontdesk", "reception", "receptionist",
  "billing", "accounts", "accounting", "hr", "jobs", "careers", "marketing",
  "media", "press", "general", "enquiries", "enquiry", "inquiries", "inquiry",
  "bookings", "booking", "appointments", "appointment", "team", "staff",
  "main", "mail", "webmaster", "noreply", "no-reply", "donotreply",
  "do-not-reply", "orders", "order", "shop", "store", "welcome", "concierge",
  "reservations", "reservation", "service", "services", "intake",
  "referrals", "referral", "scheduling", "schedule", "desk", "manager",
  "management", "owner", "staffing",
]);

const VOWEL_RE = /[aeiouy]/;

/**
 * A cold-sourced lead has no separate contact-name field, only whatever
 * email the scraper found. If the local-part looks like a role inbox
 * (info@, support@, ...) or isn't name-shaped, fall back to a plain
 * "Hello," rather than greeting a business like it's a person, or a role
 * account by a garbled non-name.
 */
function greetingFor(email: string): string {
  const localPart = email.split("@")[0]?.toLowerCase() ?? "";
  const firstToken = localPart.split(/[._+-]/)[0]?.replace(/\d+$/, "") ?? "";

  if (
    !firstToken ||
    ROLE_INBOX_LOCAL_PARTS.has(firstToken) ||
    // Below 2, nothing name-shaped; above 10, it's almost always a whole
    // business name mashed into one token (e.g. "grahamplumbinginc",
    // "realtormrobe"), not a first name.
    firstToken.length < 2 ||
    firstToken.length > 10 ||
    !/^[a-z]+$/.test(firstToken) ||
    !VOWEL_RE.test(firstToken)
  ) {
    return "Hello,";
  }

  const name = firstToken[0].toUpperCase() + firstToken.slice(1);
  return `Hi ${name},`;
}

// Touch-2 voice stat, per vertical. The old template hardcoded the dental
// line for everyone — a law firm reading "new patient calls" is a dead lead.
const VOICE_STATS: Record<string, string> = {
  dental: "Most dental offices lose 30-40% of new patient calls to voicemail.",
  chiropractic: "Most chiropractic offices lose 30-40% of new patient calls to voicemail.",
  physical_therapy: "Most PT clinics lose 30-40% of new patient calls to voicemail.",
  med_spa: "Most med spas miss a third of new client calls. Those callers book with whoever answers.",
  veterinary: "Most vet clinics miss a third of new client calls. Pet owners don't leave voicemails, they call the next clinic.",
  salon: "Most salons miss a third of booking calls mid-appointment. Those callers book the next chair that answers.",
  barbershop: "Most shops miss booking calls with clippers in hand. Those callers book the next chair that answers.",
  legal_intake: "Most firms miss over a third of intake calls. People with a case don't leave voicemails, they call the next firm.",
  hvac: "Trades miss about 1 in 3 calls while on a job. Those callers don't wait, they dial the next company on the list.",
  plumbing: "Trades miss about 1 in 3 calls while on a job. Those callers don't wait, they dial the next company on the list.",
  auto_repair: "Most shops miss calls with hands under a hood. Those callers book the next shop that answers.",
  real_estate: "Buyers work down the list and go with the first agent who picks up. Miss the call, lose the deal.",
  restaurant: "Restaurants miss a big share of calls during service. Every unanswered ring is a table booking somewhere else.",
  insurance_agency: "People shopping coverage call down the list. Whoever answers first writes the policy.",
  home_services: "Trades miss about 1 in 3 calls while on a job. Those callers don't wait, they dial the next company on the list.",
  electrical: "Trades miss about 1 in 3 calls while on a job. Those callers don't wait, they dial the next company on the list.",
  garage_door: "A stuck garage door gets fixed today, by whoever answers. Miss the call and that job is gone.",
  restoration: "Water damage calls are emergencies. Nobody leaves a voicemail with a flooded kitchen, they dial the next company.",
};

const VOICE_STAT_FALLBACK = "Most local businesses miss about a third of inbound calls. Every one is a customer who never calls back.";

/**
 * The only hard sell in the email, and it's not hard: what I fix, specific,
 * then a no-pressure reply ask. Same shape every time on purpose, it's the
 * formula, not a template we forgot to vary.
 */
function closingPs(fixDescription: string): string {
  return `P.S. ${fixDescription} Free 15 minutes, no pitch deck. Just reply and we'll see if it's worth your time.`;
}

// Shared audit pitch (touch 1). The opening carries the offer-specific hook,
// `insight` adds an optional second, bucket-specific beat before the pivot
// line lands the point, then the sign-off and a P.S. carry the only ask.
// subjectHook is offer-specific and shared by touch 1 and its touch-2 reply
// (same subject, "Re:" prefixed, so it threads like a real reply). Deliberately
// not "quick question" — that phrase is the single most fingerprinted cold-email
// subject line there is; spam filters and jaded owners both pattern-match it
// instantly, the same problem the old "I checked your Google ranking" call
// opener had on the phone side.
function auditPitchTouch1(
  businessName: string,
  opening: string,
  insight: string | null,
  pivotLine: string | null,
  ps: string,
  subjectHook: string,
  email: string
): OutreachEmail {
  const paragraphs = [
    greetingFor(email),
    opening,
    insight,
    pivotLine,
    SIGN_OFF,
    ps,
    LEGAL_FOOTER,
  ].filter((p): p is string => Boolean(p));

  return { subject: `${businessName}, ${subjectHook}`, text: paragraphs.join("\n\n") };
}

function auditPitchTouch3(businessName: string, closingLine: string): OutreachEmail {
  return {
    subject: `${businessName}, last one`,
    text: `Last email.

${closingLine}

Book 20 minutes: ${CALENDLY_URL}

${SIGN_OFF}

${LEGAL_FOOTER}`,
  };
}

function voiceEmail(touch: 1 | 2 | 3, businessName: string, opening: string, ctx: EmailContext): OutreachEmail {
  const v = getVertical(ctx.vertical);

  if (touch === 1) {
    return auditPitchTouch1(
      businessName,
      opening,
      null,
      null,
      closingPs(`I turn missed calls into booked ${v.unit}s for ${v.label.toLowerCase()} businesses.`),
      "your after-hours calls",
      ctx.email
    );
  }

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, your after-hours calls`,
      text: `Still here.

${VOICE_STATS[v.key] ?? VOICE_STAT_FALLBACK} We catch exactly that, and fix it.

No pitch. Reply if you want the 20 minutes.

${SIGN_OFF}

${LEGAL_FOOTER}`,
    };
  }

  return auditPitchTouch3(
    businessName,
    `Maybe missed calls aren't costing you anything. I'd bet otherwise. Every one that rings out is ${article(v.unit)} ${v.unit} for whoever picks up next.`
  );
}

function webEmail(touch: 1 | 2 | 3, businessName: string, opening: string, ctx: EmailContext): OutreachEmail {
  const v = getVertical(ctx.vertical);

  if (touch === 1) {
    return auditPitchTouch1(
      businessName,
      opening,
      `Most ${v.personPlural} decide before they ever call. Whoever looks legitimate online gets the ${v.unit}, and right now that's not you.`,
      "And that's the whole game, decided before the phone even rings.",
      closingPs(`I build or fix exactly what's making you lose that decision online.`),
      "your website",
      ctx.email
    );
  }

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, your website`,
      text: `Still here.

Most ${v.personPlural} check the website before they ever call. Right now that first impression is sending them to competitors. We fix exactly what's costing you, starting with the site.

No pitch. Reply if you want the 20 minutes.

${SIGN_OFF}

${LEGAL_FOOTER}`,
    };
  }

  return auditPitchTouch3(
    businessName,
    `Your website is still the first thing ${v.personPlural} see before they ever dial. Right now it's talking them out of calling.`
  );
}

function reviewsEmail(touch: 1 | 2 | 3, businessName: string, opening: string, ctx: EmailContext): OutreachEmail {
  const v = getVertical(ctx.vertical);

  if (touch === 1) {
    return auditPitchTouch1(
      businessName,
      opening,
      `Most happy ${v.personPlural} never think to leave a review unless someone asks at the right moment. That's usually the entire gap between you and the businesses outranking you.`,
      "And it's a gap anyone can close in a week.",
      closingPs(`I close exactly that gap, so you outrank them instead of the other way around.`),
      "your Google reviews",
      ctx.email
    );
  }

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, your Google reviews`,
      text: `Still here.

When someone searches "${v.queryTerm} near me", they call whoever has the most stars. We show you exactly how you stack up, and close the gap for you.

No pitch. Reply if you want the 20 minutes.

${SIGN_OFF}

${LEGAL_FOOTER}`,
    };
  }

  return auditPitchTouch3(
    businessName,
    `Every week at your current rating is a few more ${v.personPlural} picking whoever has more stars than you. That's a fixable number, not bad luck.`
  );
}

function crmEmail(touch: 1 | 2 | 3, businessName: string, opening: string, ctx: EmailContext): OutreachEmail {
  const v = getVertical(ctx.vertical);

  if (touch === 1) {
    return auditPitchTouch1(
      businessName,
      opening,
      `You already spent to get that ${v.person} to reach out. Every minute without a reply is you handing that ${v.unit} to whoever answers first.`,
      "So. The money's already spent, the lead's just slipping through anyway.",
      closingPs(`I find exactly where inquiries are going cold and plug it.`),
      "that missed follow-up",
      ctx.email
    );
  }

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, that missed follow-up`,
      text: `Still here.

A ${v.person} who doesn't hear back within minutes goes cold. We find exactly where inquiries are slipping through and fix it.

No pitch. Reply if you want the 20 minutes.

${SIGN_OFF}

${LEGAL_FOOTER}`,
    };
  }

  return auditPitchTouch3(
    businessName,
    `You already paid for that ${v.person} to show up. Every one that slips through after first contact is money you spent for nothing.`
  );
}

// 2026-09-02: site pivot leads with "not ranking top 3" as the universal
// hook, so this replaced "voice" as the fallback pitch for leads with no
// other obvious defect (decent site, decent reviews, has booking).
function seoEmail(touch: 1 | 2 | 3, businessName: string, opening: string, ctx: EmailContext): OutreachEmail {
  const v = getVertical(ctx.vertical);

  if (touch === 1) {
    return auditPitchTouch1(
      businessName,
      opening,
      null,
      "So. I'd have called whoever was actually in front of me.",
      closingPs(`I fix exactly where you show up, so next time it's you in front of them, not a competitor.`),
      "your Google ranking",
      ctx.email
    );
  }

  const framing = seoFraming(ctx.email);

  if (touch === 2) {
    const rankingLine =
      framing === "top20"
        ? `When someone searches "${v.queryTerm} near me", almost no one scrolls past the top 20 results, they call whoever's already in front of them. We check your actual position and close the gap.`
        : `When someone searches "${v.queryTerm} near me", almost no one goes past page 1, they call whoever's already in front of them. We check your actual position and close the gap.`;
    return {
      subject: `Re: ${businessName}, your Google ranking`,
      text: `Still here.

${rankingLine}

No pitch. Reply if you want the 20 minutes.

${SIGN_OFF}

${LEGAL_FOOTER}`,
    };
  }

  return auditPitchTouch3(
    businessName,
    framing === "top20"
      ? `Maybe ranking doesn't matter to you. I doubt it. Every day outside the top 20 is ${article(v.person)} ${v.person} calling whoever they could actually find.`
      : `Maybe ranking doesn't matter to you. I doubt it. Every day off page 1 is ${article(v.person)} ${v.person} calling whoever they could actually find.`
  );
}

/**
 * Builds the cold email for a touch, matched to the offer the lead actually
 * needs (see lib/outreach/offer.ts). Direct, story-first, no corporate
 * hedging: state the problem flat, one punchy pivot line, sign off, and the
 * only ask lives in a low-pressure P.S. ("just reply"), not a mid-body CTA.
 * No price in the email, that's discussed on the call.
 */
export function buildOutreachEmail(
  touch: 1 | 2 | 3,
  businessName: string,
  opening: string,
  ctx: EmailContext
): OutreachEmail {
  switch (ctx.offerType) {
    case "web":
      return webEmail(touch, businessName, opening, ctx);
    case "reviews":
      return reviewsEmail(touch, businessName, opening, ctx);
    case "crm":
      return crmEmail(touch, businessName, opening, ctx);
    case "voice":
      return voiceEmail(touch, businessName, opening, ctx);
    default:
      return seoEmail(touch, businessName, opening, ctx);
  }
}
