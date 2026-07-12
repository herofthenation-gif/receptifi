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
];

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

// Days between cold-outreach touches (matches outreach/send_emails.py).
// Touch 2 goes out 3 days after touch 1; touch 3 goes out 4 days after touch 2.
export const TOUCH_DELAYS: Record<2 | 3, number> = { 2: 3, 3: 4 };

export const DEFAULT_DAILY_CAP = 100;

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
export const SOURCING_BATCH_SIZE = 5;
