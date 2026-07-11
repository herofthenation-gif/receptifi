// Match the offer to what the business is actually missing, instead of
// pitching Voice to everyone. Decision ladder (first match wins):
//   none/outdated website               -> web      (worst gap, easiest close)
//   good site + weak reviews            -> reviews  (rating < 4.0 or < 50 reviews)
//   good site + no booking/lead capture -> crm
//   good site + everything solid        -> voice    (after-hours calls are the remaining leak)

import type { SiteQuality } from "./site-quality";

export type OfferType = "web" | "reviews" | "crm" | "voice";

export interface OfferDecision {
  offerType: OfferType;
  /** Human-readable audit trail, surfaced in the sourcing cron's dry-run output. */
  reasoning: string;
}

export interface OfferInput {
  quality: SiteQuality;
  rating: number | null;
  reviewCount: number | null;
}

export function decideOffer({ quality, rating, reviewCount }: OfferInput): OfferDecision {
  if (quality.status === "none") {
    return { offerType: "web", reasoning: "no website on Google" };
  }
  if (quality.status === "outdated") {
    return { offerType: "web", reasoning: `outdated website (quality ${quality.score}/6)` };
  }

  const lowRating = rating != null && rating < 4.0;
  const lowReviews = reviewCount != null && reviewCount < 50;
  if (lowRating || lowReviews) {
    const parts = [];
    if (lowRating) parts.push(`rating ${rating}`);
    if (lowReviews) parts.push(`${reviewCount} reviews`);
    return { offerType: "reviews", reasoning: `good site (${quality.score}/6) but weak reviews: ${parts.join(", ")}` };
  }

  if (!quality.signals?.bookingWidget) {
    return { offerType: "crm", reasoning: `good site (${quality.score}/6), strong reviews, but no booking/lead-capture signal` };
  }

  return { offerType: "voice", reasoning: `solid presence (${quality.score}/6, rating ${rating}, ${reviewCount} reviews), after-hours calls are the gap` };
}
