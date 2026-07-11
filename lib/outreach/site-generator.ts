// Builds the structured content behind /preview/[slug] — the real, live site
// the Web-offer email links to instead of "want a demo?". Content comes from
// Google Places data plus whatever the Firecrawl scrape recovered from the
// lead's existing site. Never invents facts: rating/reviews/phone/address/hours
// are real, and prose stays generic where we have no source material.

import type { GooglePlacesPeriod } from "@/lib/supabase";
import { getVertical } from "./config";
import type { QualitySignals, ScrapedSite } from "./site-quality";

export interface GeneratedService {
  name: string;
  blurb: string;
}

export interface GeneratedSite {
  businessName: string;
  vertical: string;
  verticalLabel: string;
  city: string | null;
  phone: string | null;
  address: string | null;
  rating: number | null;
  reviewCount: number | null;
  tagline: string;
  about: string;
  services: GeneratedService[];
  hours: { day: string; hours: string }[] | null;
  sourceUrl: string | null;
  /** Kept for personalizeOpening() so outdated-site emails can cite the real defect. */
  qualitySignals: QualitySignals | null;
  generatedAt: string;
}

interface VerticalContent {
  tagline: (city: string) => string;
  about: (name: string, city: string) => string;
  services: GeneratedService[];
}

const GENERIC_CONTENT: VerticalContent = {
  tagline: (city) => `Trusted local service in ${city}`,
  about: (name, city) =>
    `${name} serves ${city} and the surrounding area with dependable, straightforward service. Call today and talk to a real person about what you need.`,
  services: [
    { name: "Consultations", blurb: "Talk through what you need and get a clear plan." },
    { name: "Same-Week Appointments", blurb: "Fast scheduling that works around your day." },
    { name: "Upfront Pricing", blurb: "Know what it costs before any work starts." },
  ],
};

const CONTENT: Record<string, VerticalContent> = {
  dental: {
    tagline: (city) => `Modern dental care for ${city} families`,
    about: (name, city) =>
      `${name} provides comprehensive dental care for families in ${city}. From routine cleanings to complete smile makeovers, our team makes every visit comfortable, and getting an appointment easy.`,
    services: [
      { name: "Cleanings & Exams", blurb: "Preventive care that keeps small problems small." },
      { name: "Cosmetic Dentistry", blurb: "Whitening, veneers, and smile design." },
      { name: "Restorations", blurb: "Crowns, bridges, and implants that last." },
      { name: "Emergency Visits", blurb: "Tooth pain can't wait. Neither do we." },
    ],
  },
  chiropractic: {
    tagline: (city) => `Move better. Feel better. ${city}'s spine specialists.`,
    about: (name, city) =>
      `${name} helps ${city} patients get out of pain and back to full motion with hands-on, personalized chiropractic care.`,
    services: [
      { name: "Spinal Adjustments", blurb: "Precise, gentle correction for lasting relief." },
      { name: "Injury Recovery", blurb: "Auto, work, and sports injury rehabilitation." },
      { name: "Posture & Mobility", blurb: "Long-term plans for desk-bound bodies." },
    ],
  },
  med_spa: {
    tagline: (city) => `${city}'s destination for confident, natural results`,
    about: (name, city) =>
      `${name} brings medical-grade aesthetics to ${city}, customized treatments delivered by licensed professionals in a calm, private setting.`,
    services: [
      { name: "Injectables", blurb: "Botox and fillers with a natural finish." },
      { name: "Skin Treatments", blurb: "Facials, peels, and laser resurfacing." },
      { name: "Body Contouring", blurb: "Non-invasive sculpting and tightening." },
    ],
  },
  veterinary: {
    tagline: (city) => `Compassionate care for ${city}'s pets`,
    about: (name, city) =>
      `${name} treats your pets like family. Full-service veterinary care for the animals of ${city}: wellness, urgent care, and everything in between.`,
    services: [
      { name: "Wellness Exams", blurb: "Annual checkups, vaccines, and prevention." },
      { name: "Dental Care", blurb: "Cleanings and oral health for dogs and cats." },
      { name: "Urgent Care", blurb: "When something's wrong, we see them fast." },
    ],
  },
  salon: {
    tagline: (city) => `${city}'s salon for color, cuts, and confidence`,
    about: (name, city) =>
      `${name} is where ${city} goes to look its best. Skilled stylists, premium products, and a chair that's easy to book.`,
    services: [
      { name: "Cuts & Styling", blurb: "Precision cuts tailored to you." },
      { name: "Color & Balayage", blurb: "Dimension and shine that lasts." },
      { name: "Treatments", blurb: "Keratin, conditioning, and repair." },
    ],
  },
  barbershop: {
    tagline: (city) => `Sharp fades. No waiting around. ${city}.`,
    about: (name, city) =>
      `${name} keeps ${city} sharp: classic barbering, modern fades, and hot towel shaves from barbers who take the craft seriously.`,
    services: [
      { name: "Haircuts & Fades", blurb: "Clean lines, every time." },
      { name: "Beard Work", blurb: "Trims, shape-ups, and hot towel shaves." },
      { name: "Kids' Cuts", blurb: "Patient barbers, happy kids." },
    ],
  },
  legal_intake: {
    tagline: (city) => `Straight answers from ${city} attorneys who fight for you`,
    about: (name, city) =>
      `${name} represents clients across ${city} with the focus every case deserves. Your first consultation is a conversation, not a sales pitch.`,
    services: [
      { name: "Free Case Review", blurb: "Know where you stand before you commit." },
      { name: "Personal Representation", blurb: "You work with your attorney, not a case number." },
      { name: "No-Pressure Consults", blurb: "Clear options, honest assessments." },
    ],
  },
  hvac: {
    tagline: (city) => `Heating & cooling ${city} can count on`,
    about: (name, city) =>
      `${name} keeps ${city} homes comfortable year-round. Licensed technicians, straight pricing, and repairs done right the first time.`,
    services: [
      { name: "AC Repair & Install", blurb: "Fast fixes and efficient new systems." },
      { name: "Heating Service", blurb: "Furnaces and heat pumps, tuned and safe." },
      { name: "Maintenance Plans", blurb: "Catch problems before the heat wave does." },
    ],
  },
  plumbing: {
    tagline: (city) => `${city}'s plumbers for fast, honest work`,
    about: (name, city) =>
      `${name} handles ${city}'s plumbing, from dripping faucets to full repipes, with upfront quotes and workmanship we stand behind.`,
    services: [
      { name: "Emergency Repairs", blurb: "Burst pipes and backups, handled fast." },
      { name: "Drain Cleaning", blurb: "Clear lines without the mess." },
      { name: "Water Heaters", blurb: "Repair, replace, and tankless upgrades." },
    ],
  },
  auto_repair: {
    tagline: (city) => `Honest auto repair in ${city}`,
    about: (name, city) =>
      `${name} is the shop ${city} drivers trust: clear estimates, quality parts, and mechanics who explain the fix before they make it.`,
    services: [
      { name: "Diagnostics", blurb: "Find the real problem, not a guess." },
      { name: "Brakes & Suspension", blurb: "Safety systems done right." },
      { name: "Scheduled Maintenance", blurb: "Keep the warranty, skip the dealer markup." },
    ],
  },
  physical_therapy: {
    tagline: (city) => `Get back to full strength in ${city}`,
    about: (name, city) =>
      `${name} builds personalized recovery plans for ${city} patients, one-on-one sessions focused on getting you back to what you love.`,
    services: [
      { name: "Injury Rehab", blurb: "Post-surgery and sports injury recovery." },
      { name: "Pain Management", blurb: "Move without the ache." },
      { name: "Performance Therapy", blurb: "Come back stronger than before." },
    ],
  },
  real_estate: {
    tagline: (city) => `Your edge in the ${city} market`,
    about: (name, city) =>
      `${name} knows ${city} street by street. Whether you're buying your first home or selling your fifth, you get an agent who answers the phone.`,
    services: [
      { name: "Buyer Representation", blurb: "Win the home without overpaying." },
      { name: "Home Selling", blurb: "Pricing, staging, and marketing that moves." },
      { name: "Free Home Valuation", blurb: "Know what your home is really worth." },
    ],
  },
  restaurant: {
    tagline: (city) => `${city}'s table worth talking about`,
    about: (name, city) =>
      `${name} serves ${city} food made with care: fresh ingredients, honest portions, and a room you'll want to come back to.`,
    services: [
      { name: "Dine In", blurb: "Reserve a table, skip the wait." },
      { name: "Takeout", blurb: "Order ahead, ready when you are." },
      { name: "Private Events", blurb: "Book the room for your next occasion." },
    ],
  },
  insurance_agency: {
    tagline: (city) => `Coverage that fits ${city} life`,
    about: (name, city) =>
      `${name} helps ${city} families and businesses get properly covered: auto, home, life, and commercial, with a local agent who picks up the phone when it matters.`,
    services: [
      { name: "Free Policy Review", blurb: "Find gaps and overpayments in minutes." },
      { name: "Auto & Home", blurb: "Bundled coverage, better rates." },
      { name: "Business Insurance", blurb: "Protect what you've built." },
    ],
  },
  home_services: {
    tagline: (city) => `${city}'s go-to for repairs done right`,
    about: (name, city) =>
      `${name} handles the home projects ${city} homeowners don't have time for: skilled work, clean job sites, and quotes before we start.`,
    services: [
      { name: "Repairs & Installs", blurb: "From door hinges to drywall." },
      { name: "Home Improvement", blurb: "Small upgrades, big difference." },
      { name: "Free Estimates", blurb: "Know the price before we start." },
    ],
  },
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatTime(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return minute === 0 ? `${h12} ${period}` : `${h12}:${minute.toString().padStart(2, "0")} ${period}`;
}

function formatHours(periods: GooglePlacesPeriod[] | null): { day: string; hours: string }[] | null {
  if (!periods?.length) return null;
  return DAY_NAMES.map((day, i) => {
    const p = periods.find((period) => period.open.day === i);
    // Google Places omits `close` for a period that's open 24 hours that day.
    const hours = !p ? "Closed" : !p.close ? "Open 24 hours" : `${formatTime(p.open.hour, p.open.minute)} – ${formatTime(p.close.hour, p.close.minute)}`;
    return { day, hours };
  });
}

/** First substantial prose paragraph from scraped markdown — skips headings, links-only lines, nav noise. */
function extractAboutFromScrape(scrape: ScrapedSite | null): string | null {
  if (scrape?.description && scrape.description.length >= 80) return scrape.description.slice(0, 400);
  if (!scrape?.markdown) return null;
  for (const block of scrape.markdown.split(/\n{2,}/)) {
    const text = block
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[#*_>`|-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length >= 120 && /[a-z]{3}/.test(text) && !/cookie|privacy policy|all rights reserved/i.test(text)) {
      return text.slice(0, 400);
    }
  }
  return null;
}

export function buildPreviewSlug(businessName: string, city: string | null, placeId: string): string {
  const base = `${businessName} ${city ?? ""}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  // place_id suffix guarantees uniqueness across same-name businesses.
  const suffix = placeId.replace(/[^a-zA-Z0-9]/g, "").slice(-6).toLowerCase();
  return `${base}-${suffix}`;
}

export interface SiteGeneratorInput {
  businessName: string;
  vertical: string | null;
  city: string | null;
  phone: string | null;
  address: string | null;
  rating: number | null;
  reviewCount: number | null;
  hours: GooglePlacesPeriod[] | null;
  websiteUrl: string | null;
  scrape: ScrapedSite | null;
  qualitySignals: QualitySignals | null;
}

export function buildGeneratedSite(input: SiteGeneratorInput): GeneratedSite {
  const vertical = getVertical(input.vertical);
  const content = CONTENT[vertical.key] ?? GENERIC_CONTENT;
  const city = input.city ?? "your area";

  return {
    businessName: input.businessName,
    vertical: vertical.key,
    verticalLabel: vertical.label,
    city: input.city,
    phone: input.phone,
    address: input.address,
    rating: input.rating,
    reviewCount: input.reviewCount,
    tagline: content.tagline(city),
    about: extractAboutFromScrape(input.scrape) ?? content.about(input.businessName, city),
    services: content.services,
    hours: formatHours(input.hours),
    sourceUrl: input.websiteUrl,
    qualitySignals: input.qualitySignals,
    generatedAt: new Date().toISOString(),
  };
}
