import type { GooglePlacesPeriod } from "@/lib/supabase";
import { article, getVertical } from "./config";
import type { OfferType } from "./offer";
import type { QualitySignals } from "./site-quality";

// Google Places "day" convention: 0 = Sunday ... 6 = Saturday.
const SUNDAY = 0;
const SATURDAY = 6;
const WEEKDAYS = [1, 2, 3, 4, 5]; // Monday..Friday

export interface PersonalizeInput {
  hasWebsite: boolean;
  reviewCount: number | null;
  hours: GooglePlacesPeriod[] | null;
  rating: number | null;
  vertical: string | null;
  city: string | null;
  /** Defaults to "voice" for unclassified leads — matches the pre-offer-matching behavior. */
  offerType: OfferType | null;
  /** Real defects found by the site-quality check; lets outdated-site openings cite specifics. */
  qualitySignals: QualitySignals | null;
}

function hasDayOpen(periods: GooglePlacesPeriod[], day: number): boolean {
  return periods.some((p) => p.open.day === day);
}

function formatTime(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const mm = minute.toString().padStart(2, "0");
  return `${h12}:${mm} ${period}`;
}

/** Most common weekday closing time, e.g. "5:00 PM", or null if no weekday hours. */
function mostCommonWeekdayCloseTime(periods: GooglePlacesPeriod[]): string | null {
  const counts = new Map<string, number>();
  for (const p of periods) {
    // Google Places omits `close` for a period that's open 24 hours that day.
    if (!WEEKDAYS.includes(p.open.day) || !p.close) continue;
    const key = `${p.close.hour}:${p.close.minute}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  if (counts.size === 0) return null;
  const [topKey] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  const [hour, minute] = topKey.split(":").map(Number);
  return formatTime(hour, minute);
}

/** The one concrete defect the outdated-site email leads with. Specificity = expertise. */
function outdatedSiteObservation(signals: QualitySignals | null): string {
  if (signals) {
    if (!signals.mobileViewport) return "It doesn't work on a phone, and that's where your customers are searching";
    if (signals.copyrightYear != null && !signals.freshCopyright)
      return `The footer still says ${signals.copyrightYear}`;
    if (!signals.bookingWidget) return "There's no way to book from it";
    if (!signals.https) return "It's not even secure — browsers flag it";
  }
  return "It's working against you, not for you";
}

/**
 * Picks the cold-email opening line — the Problem + Expertise hook. Offer-aware:
 * each offer type opens on the gap that offer fixes, in the vertical's own
 * language (patients vs. jobs vs. reservations).
 */
export function personalizeOpening(input: PersonalizeInput): string {
  const { hasWebsite, reviewCount, rating, hours, city, qualitySignals } = input;
  const v = getVertical(input.vertical);
  const offer = input.offerType ?? "voice";
  const area = city ?? "your area";

  if (offer === "web") {
    if (!hasWebsite) {
      const count = reviewCount ?? 0;
      return `${count} reviews on Google and no website. Every ${v.person} searching ${area} right now can't find you.`;
    }
    return `Looked at your website. ${outdatedSiteObservation(qualitySignals)}.`;
  }

  if (offer === "reviews") {
    if (rating != null && rating < 4.0) {
      return `${rating} stars on Google. In ${area} search results, that's the difference between getting the call and getting scrolled past.`;
    }
    return `${reviewCount ?? 0} Google reviews. The ${v.label.toLowerCase()} businesses winning ${area} searches have hundreds.`;
  }

  if (offer === "crm") {
    return `Good rating, solid website — but no way to book online. Every ${v.person} who can't book right then calls the next result.`;
  }

  // voice — the original hours-based openers, in the vertical's language.
  if (!hasWebsite) {
    if (!hours || hours.length === 0) {
      return "No website. No hours listed on Google.";
    }
    const count = reviewCount ?? 0;
    return `${count} reviews and no website. Every ${v.person} searching right now can't find you.`;
  }

  const periods = hours ?? [];
  const satOpen = hasDayOpen(periods, SATURDAY);
  const sunOpen = hasDayOpen(periods, SUNDAY);
  const closeTime = periods.length ? mostCommonWeekdayCloseTime(periods) : null;

  if (!sunOpen && !satOpen) {
    return `Closed weekends. Two full days of new ${v.person} calls going to voicemail every week.`;
  }
  if (!sunOpen) {
    return "Closed Sundays. Anyone calling this weekend books with whoever picks up.";
  }
  if (closeTime) {
    return `Your phones go off at ${closeTime}. Every call after that is ${article(v.person)} ${v.person} booking somewhere else.`;
  }
  return `Every after-hours call you miss is a new ${v.person} booking somewhere else.`;
}
