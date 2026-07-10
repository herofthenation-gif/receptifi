import { article, getVertical, PHYSICAL_ADDRESS, WEBSITE } from "./config";
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
  /** Live generated-site URL. Required for offer_type = web. */
  previewUrl: string | null;
}

// Touch-2 voice stat, per vertical. The old template hardcoded the dental
// line for everyone — a law firm reading "new patient calls" is a dead lead.
const VOICE_STATS: Record<string, string> = {
  dental: "Most dental offices lose 30-40% of new patient calls to voicemail.",
  chiropractic: "Most chiropractic offices lose 30-40% of new patient calls to voicemail.",
  physical_therapy: "Most PT clinics lose 30-40% of new patient calls to voicemail.",
  med_spa: "Most med spas miss a third of new client calls — and those callers book with whoever answers.",
  veterinary: "Most vet clinics miss a third of new client calls. Pet owners don't leave voicemails — they call the next clinic.",
  salon: "Most salons miss a third of booking calls mid-appointment. Those callers book the next chair that answers.",
  barbershop: "Most shops miss booking calls with clippers in hand. Those callers book the next chair that answers.",
  legal_intake: "Most firms miss over a third of intake calls. People with a case don't leave voicemails — they call the next firm.",
  hvac: "Trades miss about 1 in 3 calls while on a job. Those callers don't wait — they dial the next company on the list.",
  plumbing: "Trades miss about 1 in 3 calls while on a job. Those callers don't wait — they dial the next company on the list.",
  auto_repair: "Most shops miss calls with hands under a hood. Those callers book the next shop that answers.",
  real_estate: "Buyers work down the list and go with the first agent who picks up. Miss the call, lose the deal.",
  restaurant: "Restaurants miss a big share of calls during service. Every unanswered ring is a table booking somewhere else.",
  insurance_agency: "People shopping coverage call down the list. Whoever answers first writes the policy.",
  home_services: "Trades miss about 1 in 3 calls while on a job. Those callers don't wait — they dial the next company on the list.",
};

const VOICE_STAT_FALLBACK = "Most local businesses miss about a third of inbound calls. Every one is a customer who never calls back.";

function voiceEmail(touch: 1 | 2 | 3, businessName: string, opening: string, ctx: EmailContext): OutreachEmail {
  const v = getVertical(ctx.vertical);

  if (touch === 1) {
    return {
      subject: `${businessName}, quick question`,
      text: `${businessName},

${opening}

Every after-hours call you miss is ${article(v.unit)} ${v.unit} going to a competitor.

Receptifi answers every call and books them automatically. 48 hour setup, no contracts.

Want a 60-second demo?

${SIGNATURE}`,
    };
  }

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, quick question`,
      text: `Still here if you're interested.

${VOICE_STATS[v.key] ?? VOICE_STAT_FALLBACK} Receptifi captures every one and books them automatically.

Takes 48 hours to go live. No contracts.

Worth 60 seconds?

${SIGNATURE}`,
    };
  }

  return {
    subject: `Closing the loop, ${businessName}`,
    text: `Last email.

If missed calls aren't a problem, no worries. But if the phones are stretched or you're losing after-hours ${v.personPlural}, that's exactly what we fix.

Watch the demo: ${WEBSITE}

${SIGNATURE}`,
  };
}

function webEmail(touch: 1 | 2 | 3, businessName: string, opening: string, ctx: EmailContext): OutreachEmail {
  const v = getVertical(ctx.vertical);
  const url = ctx.previewUrl ?? `https://${WEBSITE}`;

  if (touch === 1) {
    return {
      subject: `${businessName}, built you something`,
      text: `${businessName},

${opening}

So we built you a new site. It's already live:

${url}

Like it? It's on your own domain in 48 hours. No contracts.

Worth a look?

${SIGNATURE}`,
    };
  }

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, built you something`,
      text: `Still here.

Most ${v.personPlural} check the website before they ever call. Right now that first impression is sending them to competitors.

The site we built for ${businessName} is still live: ${url}

48 hours to make it yours. No contracts.

${SIGNATURE}`,
    };
  }

  return {
    subject: `Closing the loop, ${businessName}`,
    text: `Last email.

We take unclaimed preview sites down eventually. Yours is still up: ${url}

If the website isn't a priority, no worries. If it is — this one's already built.

${SIGNATURE}`,
  };
}

function reviewsEmail(touch: 1 | 2 | 3, businessName: string, opening: string, ctx: EmailContext): OutreachEmail {
  const v = getVertical(ctx.vertical);

  if (touch === 1) {
    return {
      subject: `${businessName}, quick question`,
      text: `${businessName},

${opening}

Receptifi fixes that automatically — every happy ${v.person} gets a review request at exactly the right moment, and your rating climbs on its own.

48 hour setup, no contracts.

Want a 60-second demo?

${SIGNATURE}`,
    };
  }

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, quick question`,
      text: `Still here if you're interested.

When someone searches "${v.queryTerm} near me", they call whoever has the most stars. Receptifi turns the ${v.personPlural} you already make happy into 5-star reviews, automatically.

Takes 48 hours to go live. No contracts.

Worth 60 seconds?

${SIGNATURE}`,
    };
  }

  return {
    subject: `Closing the loop, ${businessName}`,
    text: `Last email.

If reviews aren't a priority, no worries. But every week at your current rating is ${v.personPlural} picking a competitor off a Google search.

Watch the demo: ${WEBSITE}

${SIGNATURE}`,
  };
}

function crmEmail(touch: 1 | 2 | 3, businessName: string, opening: string, ctx: EmailContext): OutreachEmail {
  const v = getVertical(ctx.vertical);

  if (touch === 1) {
    return {
      subject: `${businessName}, quick question`,
      text: `${businessName},

${opening}

Receptifi adds online booking plus automatic follow-up — every ${v.person} gets captured, reminded, and booked without your team lifting a finger.

48 hour setup, no contracts.

Want a 60-second demo?

${SIGNATURE}`,
    };
  }

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, quick question`,
      text: `Still here if you're interested.

A ${v.person} who doesn't hear back within minutes goes cold. Receptifi follows up instantly, every time, and turns inquiries into booked ${v.unit}s.

Takes 48 hours to go live. No contracts.

Worth 60 seconds?

${SIGNATURE}`,
    };
  }

  return {
    subject: `Closing the loop, ${businessName}`,
    text: `Last email.

If follow-up isn't a problem, no worries. But if ${v.personPlural} are slipping through after the first contact, that's exactly what we fix.

Watch the demo: ${WEBSITE}

${SIGNATURE}`,
  };
}

/**
 * Builds the cold email for a touch, matched to the offer the lead actually
 * needs (see lib/outreach/offer.ts). Same proven voice throughout:
 * Problem + Expertise + Confidence + Free Value, minimum words.
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
    default:
      return voiceEmail(touch, businessName, opening, ctx);
  }
}
