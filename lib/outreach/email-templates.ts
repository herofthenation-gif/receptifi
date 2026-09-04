import { CALENDLY_URL, getVertical, PHYSICAL_ADDRESS, WEBSITE } from "./config";
import type { OfferType } from "./offer";

// CAN-SPAM: every commercial email needs a physical postal address and a
// clear opt-out. The opt-out is a reply — checkGmailReplies() detects it and
// sets unsubscribed_at, which getDueLeads() honors.
const SIGNATURE = `Karmello

Receptifi | ${WEBSITE}
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

// Shared audit pitch (touch 1). The opening carries the offer-specific hook
// and `insight` adds an optional second, bucket-specific beat of expertise
// before the pivot to the general pitch (see personalize.ts) — skip it (pass
// null) when the opening already lands the point on its own. The call is
// always free; price only comes up live if the call turns into a real
// engagement.
//
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
  personPlural: string,
  subjectHook: string,
  email: string
): OutreachEmail {
  const paragraphs = [
    greetingFor(email),
    opening,
    insight,
    `We don't just hand you a report. We fix what's broken: your site, your reviews, your booking, your phone coverage, in the right order.`,
    `Free 20 minutes to see if it's worth doing for you?`,
    SIGNATURE,
  ].filter((p): p is string => Boolean(p));

  return { subject: `${businessName}, ${subjectHook}`, text: paragraphs.join("\n\n") };
}

function auditPitchTouch3(businessName: string, closingLine: string): OutreachEmail {
  return {
    subject: `${businessName}, last one`,
    text: `Last email.

${closingLine}

Book 20 minutes: ${CALENDLY_URL}

${SIGNATURE}`,
  };
}

function voiceEmail(touch: 1 | 2 | 3, businessName: string, opening: string, ctx: EmailContext): OutreachEmail {
  const v = getVertical(ctx.vertical);

  if (touch === 1) return auditPitchTouch1(businessName, opening, null, v.personPlural, "your after-hours calls", ctx.email);

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, your after-hours calls`,
      text: `Still here if you're interested.

${VOICE_STATS[v.key] ?? VOICE_STAT_FALLBACK} We catch exactly that, and fix it.

20 minutes, no obligation.

${SIGNATURE}`,
    };
  }

  return auditPitchTouch3(
    businessName,
    `If missed calls aren't a problem, no worries. But if the phones are stretched or you're losing after-hours ${v.personPlural}, that's exactly what we fix.`
  );
}

function webEmail(touch: 1 | 2 | 3, businessName: string, opening: string, ctx: EmailContext): OutreachEmail {
  const v = getVertical(ctx.vertical);

  if (touch === 1) {
    return auditPitchTouch1(
      businessName,
      opening,
      `Most ${v.personPlural} decide before they ever call. Whoever looks legitimate online gets the ${v.unit}, and right now that's not you.`,
      v.personPlural,
      "your website",
      ctx.email
    );
  }

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, your website`,
      text: `Still here.

Most ${v.personPlural} check the website before they ever call. Right now that first impression is sending them to competitors. We fix exactly what's costing you, starting with the site.

20 minutes, no obligation.

${SIGNATURE}`,
    };
  }

  return auditPitchTouch3(
    businessName,
    `If the website isn't a priority, no worries. But it's the first thing ${v.personPlural} see, and right now it's working against you. We can fix that fast.`
  );
}

function reviewsEmail(touch: 1 | 2 | 3, businessName: string, opening: string, ctx: EmailContext): OutreachEmail {
  const v = getVertical(ctx.vertical);

  if (touch === 1) {
    return auditPitchTouch1(
      businessName,
      opening,
      `Most happy ${v.personPlural} never think to leave a review unless someone asks at the right moment. That's usually the entire gap between you and the businesses outranking you.`,
      v.personPlural,
      "your Google reviews",
      ctx.email
    );
  }

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, your Google reviews`,
      text: `Still here if you're interested.

When someone searches "${v.queryTerm} near me", they call whoever has the most stars. We show you exactly how you stack up, and close the gap for you.

20 minutes, no obligation.

${SIGNATURE}`,
    };
  }

  return auditPitchTouch3(
    businessName,
    `If reviews aren't a priority, no worries. But every week at your current rating is ${v.personPlural} picking a competitor off a Google search, and that's fixable.`
  );
}

function crmEmail(touch: 1 | 2 | 3, businessName: string, opening: string, ctx: EmailContext): OutreachEmail {
  const v = getVertical(ctx.vertical);

  if (touch === 1) {
    return auditPitchTouch1(
      businessName,
      opening,
      `You already spent to get that ${v.person} to reach out. Every minute without a reply is you handing that ${v.unit} to whoever answers first.`,
      v.personPlural,
      "that missed follow-up",
      ctx.email
    );
  }

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, that missed follow-up`,
      text: `Still here if you're interested.

A ${v.person} who doesn't hear back within minutes goes cold. We find exactly where inquiries are slipping through and fix it.

20 minutes, no obligation.

${SIGNATURE}`,
    };
  }

  return auditPitchTouch3(
    businessName,
    `If follow-up isn't a problem, no worries. But if ${v.personPlural} are slipping through after the first contact, that's exactly what we fix.`
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
      v.personPlural,
      "your Google ranking",
      ctx.email
    );
  }

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, your Google ranking`,
      text: `Still here if you're interested.

When someone searches "${v.queryTerm} near me", they call whoever's in the top 3, not whoever has the nicest site. We check your actual position against local competitors and close the gap.

20 minutes, no obligation.

${SIGNATURE}`,
    };
  }

  return auditPitchTouch3(
    businessName,
    `If ranking isn't a priority, no worries. But every day you're not in the top 3, ${v.personPlural} are calling whoever is, and that's fixable.`
  );
}

/**
 * Builds the cold email for a touch, matched to the offer the lead actually
 * needs (see lib/outreach/offer.ts). Same proven voice throughout: Problem +
 * Expertise + Confidence + a 20-minute audit call as the ask. No price in
 * the email — that's discussed on the call.
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
