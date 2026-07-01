// Lead priority rules (see memory: feedback-communication-and-outreach):
//   1. No website         — easiest close, highest pain
//   2. Low reviews         — rating < 4.0 or review_count < 50
//   3. High rating, no booking signal — solid presence already

export interface PriorityInput {
  hasWebsite: boolean;
  rating: number | null;
  reviewCount: number | null;
}

export function computePriorityTier(input: PriorityInput): 1 | 2 | 3 {
  if (!input.hasWebsite) return 1;
  const lowRating = input.rating != null && input.rating < 4.0;
  const lowReviews = input.reviewCount != null && input.reviewCount < 50;
  if (lowRating || lowReviews) return 2;
  return 3;
}

export function sortByPriority<T extends { priority_tier: number | null; review_count: number | null }>(
  leads: T[]
): T[] {
  return [...leads].sort((a, b) => {
    const tierA = a.priority_tier ?? 3;
    const tierB = b.priority_tier ?? 3;
    if (tierA !== tierB) return tierA - tierB;
    const reviewsA = a.review_count ?? 9999;
    const reviewsB = b.review_count ?? 9999;
    return reviewsA - reviewsB;
  });
}
