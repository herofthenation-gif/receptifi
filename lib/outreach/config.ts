export interface Vertical {
  key: string;
  label: string;
  /** Term used in the Google Places text search query, e.g. "dentist in Riverside, CA" */
  queryTerm: string;
}

// Local-service verticals where a missed call is a lost appointment/job —
// the pain Receptifi's voice/CRM stack solves. Easy to extend: add a row.
export const VERTICALS: Vertical[] = [
  { key: "dental", label: "Dental", queryTerm: "dentist" },
  { key: "chiropractic", label: "Chiropractic", queryTerm: "chiropractor" },
  { key: "med_spa", label: "Med Spa / Aesthetics", queryTerm: "med spa" },
  { key: "veterinary", label: "Veterinary", queryTerm: "veterinarian" },
  { key: "salon", label: "Hair Salon", queryTerm: "hair salon" },
  { key: "barbershop", label: "Barbershop", queryTerm: "barbershop" },
  { key: "legal_intake", label: "Law Firm", queryTerm: "law firm" },
  { key: "hvac", label: "HVAC", queryTerm: "HVAC contractor" },
  { key: "plumbing", label: "Plumbing", queryTerm: "plumber" },
  { key: "auto_repair", label: "Auto Repair", queryTerm: "auto repair shop" },
  { key: "physical_therapy", label: "Physical Therapy", queryTerm: "physical therapy clinic" },
];

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

export const DEFAULT_DAILY_CAP = 30;

// Proven sender identity (already sending successfully via Resend — keep verbatim).
export const FROM_NAME = "Karmello";
export const FROM_EMAIL = "karmello@receptifi.net";
export const REPLY_TO = "receptifi.ai@gmail.com";
export const WEBSITE = "receptifi.net";

// How many city x vertical combos the sourcing cron consumes per run.
export const SOURCING_BATCH_SIZE = 5;
