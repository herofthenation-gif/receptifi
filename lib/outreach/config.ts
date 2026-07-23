export interface Vertical {
  key: string;
  label: string;
  /** Term used in the Google Places text search query, e.g. "dentist in Riverside, CA" */
  queryTerm: string;
  /** Who calls this business, in its own language: "patient", "guest", "homeowner". */
  person: string;
  /** Plural of `person`. */
  personPlural: string;
  /** What one converted call is worth: "appointment", "case", "job", "reservation". */
  unit: string;
}

// Local-service verticals where a missed call is a lost appointment/job —
// the pain Receptifi's voice/CRM stack solves. Easy to extend: add a row.
export const VERTICALS: Vertical[] = [
  { key: "dental", label: "Dental", queryTerm: "dentist", person: "patient", personPlural: "patients", unit: "appointment" },
  { key: "chiropractic", label: "Chiropractic", queryTerm: "chiropractor", person: "patient", personPlural: "patients", unit: "appointment" },
  { key: "med_spa", label: "Med Spa / Aesthetics", queryTerm: "med spa", person: "client", personPlural: "clients", unit: "appointment" },
  { key: "veterinary", label: "Veterinary", queryTerm: "veterinarian", person: "pet owner", personPlural: "pet owners", unit: "appointment" },
  { key: "salon", label: "Hair Salon", queryTerm: "hair salon", person: "client", personPlural: "clients", unit: "appointment" },
  { key: "barbershop", label: "Barbershop", queryTerm: "barbershop", person: "client", personPlural: "clients", unit: "appointment" },
  { key: "legal_intake", label: "Law Firm", queryTerm: "law firm", person: "potential client", personPlural: "potential clients", unit: "case" },
  { key: "hvac", label: "HVAC", queryTerm: "HVAC contractor", person: "customer", personPlural: "customers", unit: "job" },
  { key: "plumbing", label: "Plumbing", queryTerm: "plumber", person: "customer", personPlural: "customers", unit: "job" },
  { key: "auto_repair", label: "Auto Repair", queryTerm: "auto repair shop", person: "customer", personPlural: "customers", unit: "job" },
  { key: "physical_therapy", label: "Physical Therapy", queryTerm: "physical therapy clinic", person: "patient", personPlural: "patients", unit: "appointment" },
  { key: "real_estate", label: "Real Estate", queryTerm: "real estate agent", person: "buyer", personPlural: "buyers", unit: "deal" },
  { key: "restaurant", label: "Restaurant", queryTerm: "restaurant", person: "guest", personPlural: "guests", unit: "reservation" },
  { key: "insurance_agency", label: "Insurance Agency", queryTerm: "insurance agency", person: "shopper", personPlural: "shoppers", unit: "policy" },
  { key: "home_services", label: "Home Services", queryTerm: "handyman service", person: "homeowner", personPlural: "homeowners", unit: "job" },
  { key: "electrical", label: "Electrical", queryTerm: "electrician", person: "customer", personPlural: "customers", unit: "job" },
  { key: "garage_door", label: "Garage Door", queryTerm: "garage door repair", person: "homeowner", personPlural: "homeowners", unit: "job" },
  { key: "restoration", label: "Water Damage Restoration", queryTerm: "water damage restoration", person: "homeowner", personPlural: "homeowners", unit: "job" },
];

// ---- Niche focus: emergency home trades -------------------------------------
// Sourcing targets these verticals only (send-side still renders copy for any
// vertical already in the leads table). Why trades over the broad 15-vertical
// rotation:
//   - They miss calls all day (owner on a job), not just after hours: the
//     exact pain the voice/CRM stack fixes, felt as immediate lost revenue.
//   - High ticket ($5k-15k jobs; restoration is insurance-funded): one saved
//     call pays for the audit engagement.
//   - Simple contractor sites expose owner-read info@ emails (higher scrape
//     yield than form-gated dental/med-spa sites).
//   - Summer in SoCal = HVAC emergency season; urgency is built into the pitch.
export const FOCUS_VERTICAL_KEYS = ["hvac", "plumbing", "electrical", "garage_door", "restoration"] as const;

export const FOCUS_VERTICALS: Vertical[] = FOCUS_VERTICAL_KEYS.map(
  (key) => VERTICALS.find((v) => v.key === key)!
);

// ---- High-ticket track: run alongside the trades focus, not instead of it --
// 2026-07-20: Karmello wants a second stream of leads who can plausibly pay
// $6-7k for a build + retainer, not just the $3k one-time audit the trades
// leads get pitched. Trades leads are chosen for maximum pain (no website,
// <50 reviews) precisely because that skews toward businesses too small for
// a retainer. This track instead sources verticals that already spend on
// marketing as a matter of course (ad-funded client acquisition, high
// per-conversion value), so a missed call is worth fixing at that price:
//   - legal_intake: a missed case can be worth more than the entire engagement
//   - med_spa: high per-visit ticket, already paying monthly vendors
//   - real_estate: a missed buyer call is a lost commission, not a lost visit
// Copy is unaffected: buildOutreachEmail() already has vertical-aware
// language for all three (email-templates.ts) and never mentions price;
// pricing tier is a live-call decision, not something sourcing encodes.
export const HIGH_TICKET_VERTICAL_KEYS = ["legal_intake", "med_spa", "real_estate"] as const;

export const HIGH_TICKET_VERTICALS: Vertical[] = HIGH_TICKET_VERTICAL_KEYS.map(
  (key) => VERTICALS.find((v) => v.key === key)!
);

// Fallback language for manually-added leads with no vertical set.
const DEFAULT_VERTICAL: Vertical = {
  key: "generic",
  label: "Local Business",
  queryTerm: "business",
  person: "customer",
  personPlural: "customers",
  unit: "booking",
};

export function getVertical(key: string | null | undefined): Vertical {
  return VERTICALS.find((v) => v.key === key) ?? DEFAULT_VERTICAL;
}

// "a appointment" reads as broken copy in a cold email; used to agree the
// indefinite article with words like v.unit/v.person ("an appointment", "a job").
export function article(word: string): "a" | "an" {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

export type Region = "LA" | "OC" | "SD" | "IE";

export interface City {
  name: string;
  region: Region;
}

// Starter SoCal city list. Add more cities here to widen sourcing.
// Grouped by county; SOURCING_CITIES below controls the order sourcing
// actually visits them (Inland Empire first: home turf, walk-in follow-up
// possible, and peak HVAC season hits hardest there).
export const CITIES: City[] = [
  // LA County
  { name: "Los Angeles", region: "LA" },
  { name: "Long Beach", region: "LA" },
  { name: "Glendale", region: "LA" },
  { name: "Pasadena", region: "LA" },
  { name: "Santa Clarita", region: "LA" },
  { name: "Pomona", region: "LA" },
  { name: "Torrance", region: "LA" },
  { name: "Burbank", region: "LA" },
  { name: "Inglewood", region: "LA" },
  { name: "Lancaster", region: "LA" },
  // Orange County
  { name: "Anaheim", region: "OC" },
  { name: "Santa Ana", region: "OC" },
  { name: "Irvine", region: "OC" },
  { name: "Huntington Beach", region: "OC" },
  { name: "Garden Grove", region: "OC" },
  { name: "Orange", region: "OC" },
  { name: "Fullerton", region: "OC" },
  { name: "Costa Mesa", region: "OC" },
  // San Diego County
  { name: "San Diego", region: "SD" },
  { name: "Chula Vista", region: "SD" },
  { name: "Oceanside", region: "SD" },
  { name: "Escondido", region: "SD" },
  { name: "Carlsbad", region: "SD" },
  { name: "El Cajon", region: "SD" },
  { name: "Vista", region: "SD" },
  // Inland Empire
  { name: "Riverside", region: "IE" },
  { name: "San Bernardino", region: "IE" },
  { name: "Moreno Valley", region: "IE" },
  { name: "Fontana", region: "IE" },
  { name: "Rancho Cucamonga", region: "IE" },
  { name: "Ontario", region: "IE" },
  { name: "Corona", region: "IE" },
  { name: "Murrieta", region: "IE" },
  { name: "Temecula", region: "IE" },
  { name: "Victorville", region: "IE" },
];

// Sourcing visit order: IE first, then the rest of the matrix.
const REGION_ORDER: Record<Region, number> = { IE: 0, LA: 1, OC: 2, SD: 3 };
export const SOURCING_CITIES: City[] = [...CITIES].sort(
  (a, b) => REGION_ORDER[a.region] - REGION_ORDER[b.region]
);

// Days between cold-outreach touches (matches outreach/send_emails.py).
// Touch 2 goes out 3 days after touch 1; touch 3 goes out 4 days after touch 2.
export const TOUCH_DELAYS: Record<2 | 3, number> = { 2: 3, 3: 4 };

// Resend's free tier hard-caps at 100 emails/DAY (not just 3,000/month) —
// confirmed 2026-07-23 against resend.com/pricing. 90 was already sitting
// right at that wall (Resend send logs show 90/day on 7/22 and 7/23 with no
// other traffic on top). Bumped to 95, leaving only a 5/day buffer for the
// site's own lead-notification and nurture emails, which share this
// account. This is NOT the "raise the cap" fix — with two tracks now
// competing for the same daily budget (see [[project-high-ticket-track]]),
// a real increase needs Resend Pro ($20/mo, 50,000/month, no meaningful
// daily throttle) upgraded manually in the Resend dashboard (API key alone
// can't change billing). Once upgraded, raise this significantly.
export const DEFAULT_DAILY_CAP = 95;

// Proven sender identity (already sending successfully via Resend — keep verbatim).
export const FROM_NAME = "Karmello";
export const FROM_EMAIL = "karmello@receptifi.net";
export const REPLY_TO = "receptifi.ai@gmail.com";
export const WEBSITE = "receptifi.net";

// CAN-SPAM requires a valid physical postal address in every commercial email.
// Set OUTREACH_PHYSICAL_ADDRESS (street or PO Box) in env; this city-level
// fallback is not fully compliant on its own.
export const PHYSICAL_ADDRESS =
  process.env.OUTREACH_PHYSICAL_ADDRESS ?? "Receptifi LLC, Moreno Valley, CA 92553";

// Public base URL for generated preview sites (the Web-offer email CTA).
export const PREVIEW_BASE_URL = `https://${WEBSITE}/preview`;

// Booking link for the paid audit call — price is discussed on the call, not in the email.
export const CALENDLY_URL = "https://calendly.com/karmello-koba1ba/30min";

// How many city x vertical combos the sourcing cron consumes per run.
// Raised 5 -> 10 on 2026-07-20: at 5/day the 5-focus-vertical x 34-city
// rotation took 34 days to complete one lap, and by then every focus lead
// with a website had already had an email-scrape attempt (0 untried left,
// 478 failed, 135 succeeded — a ~22% yield, which is expected for trades
// sites that favor contact forms over a published email). More combos/day
// is the actual lever on lead supply now, not re-scraping the same sites.
export const SOURCING_BATCH_SIZE = 10;

// Conservative pilot pace for the high-ticket track (3 verticals x 34 cities
// = 102 combos; a full pass takes ~20 days at this rate). Kept separate from
// SOURCING_BATCH_SIZE so ramping trades sourcing later doesn't silently speed
// this up too. Raise once Karmello has worked a first batch of these leads.
export const HIGH_TICKET_SOURCING_BATCH_SIZE = 5;
