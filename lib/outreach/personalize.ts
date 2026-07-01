import type { GooglePlacesPeriod } from "@/lib/supabase";

// Google Places "day" convention: 0 = Sunday ... 6 = Saturday.
const SUNDAY = 0;
const SATURDAY = 6;
const WEEKDAYS = [1, 2, 3, 4, 5]; // Monday..Friday

export interface PersonalizeInput {
  hasWebsite: boolean;
  reviewCount: number | null;
  hours: GooglePlacesPeriod[] | null;
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
    if (!WEEKDAYS.includes(p.open.day)) continue;
    const key = `${p.close.hour}:${p.close.minute}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  if (counts.size === 0) return null;
  const [topKey] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  const [hour, minute] = topKey.split(":").map(Number);
  return formatTime(hour, minute);
}

/**
 * Picks the cold-email opening line. Ports outreach/send_emails.py's
 * personalize_opening(), reworked for Places API (New) structured hours
 * instead of a formatted hours string.
 */
export function personalizeOpening(input: PersonalizeInput): string {
  const { hasWebsite, reviewCount, hours } = input;

  if (!hasWebsite) {
    if (!hours || hours.length === 0) {
      return "No website. No hours listed on Google.";
    }
    const count = reviewCount ?? 0;
    return `${count} reviews and no website. Every patient searching right now can't find you.`;
  }

  const periods = hours ?? [];
  const satOpen = hasDayOpen(periods, SATURDAY);
  const sunOpen = hasDayOpen(periods, SUNDAY);
  const closeTime = periods.length ? mostCommonWeekdayCloseTime(periods) : null;

  if (!sunOpen && !satOpen) {
    return "Closed weekends. Two full days of new patient calls going to voicemail every week.";
  }
  if (!sunOpen) {
    return "Closed Sundays. Anyone calling this weekend books with whoever picks up.";
  }
  if (closeTime) {
    return `Your phones go off at ${closeTime}. Every call after that is a patient booking somewhere else.`;
  }
  return "Every after-hours call you miss is a new patient booking somewhere else.";
}
