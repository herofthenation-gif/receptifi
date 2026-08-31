export interface OpeningPeriod {
  open: { day: number; hour: number; minute: number };
  close: { day: number; hour: number; minute: number };
}

export interface PlacesResult {
  placeId: string;
  displayName: string;
  formattedAddress: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  /** Places API (New) caps this at 10 photos per place regardless of how many the listing actually has, so treat as "at least N", same caveat as checkIndexedPages. */
  photoCount?: number;
  regularOpeningHours?: { periods: OpeningPeriod[] };
  businessStatus?: string;
}

interface PlacesApiPlace {
  id: string;
  displayName?: { text: string; languageCode?: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  photos?: unknown[];
  regularOpeningHours?: { periods: OpeningPeriod[] };
  businessStatus?: string;
}

interface PlacesApiResponse {
  places?: PlacesApiPlace[];
}

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.websiteUri",
  "places.rating",
  "places.userRatingCount",
  "places.photos",
  "places.regularOpeningHours",
  "places.businessStatus",
].join(",");

/** Google Places API (New) Text Search, e.g. searchPlacesText("dentist in Riverside, CA"). */
export async function searchPlacesText(query: string): Promise<PlacesResult[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_PLACES_API_KEY is not configured");

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify({ textQuery: query, pageSize: 20 }),
  });

  if (!res.ok) {
    throw new Error(`Places searchText failed (${res.status}): ${await res.text()}`);
  }

  const json = (await res.json()) as PlacesApiResponse;
  return (json.places ?? []).map((p) => ({
    placeId: p.id,
    // displayName is a {text, languageCode} object in the New API, not a bare string.
    displayName: p.displayName?.text ?? "Unknown",
    formattedAddress: p.formattedAddress ?? "",
    nationalPhoneNumber: p.nationalPhoneNumber,
    websiteUri: p.websiteUri,
    rating: p.rating,
    userRatingCount: p.userRatingCount,
    photoCount: p.photos?.length,
    regularOpeningHours: p.regularOpeningHours,
    businessStatus: p.businessStatus,
  }));
}

export interface PlaceReview {
  /** Google's review resource name, e.g. "places/{placeId}/reviews/{reviewId}" — stable, used as our id. */
  reviewId: string;
  authorName: string;
  rating: number;
  text: string;
  publishTime: string;
  relativeTime: string;
}

interface PlacesApiReview {
  name: string;
  relativePublishTimeDescription?: string;
  text?: { text: string; languageCode?: string };
  rating: number;
  authorAttribution?: { displayName?: string };
  publishTime: string;
}

interface PlaceDetailsResponse {
  reviews?: PlacesApiReview[];
}

/**
 * Fetches up to 5 reviews for a place (Google's own cap on the Place
 * Details reviews field, not something we control). Reviews sort by
 * relevance not recency, per Google — good enough for "draft a response to
 * whatever's currently surfaced", not a full review-history export.
 */
export async function getPlaceReviews(placeId: string): Promise<PlaceReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_PLACES_API_KEY is not configured");

  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "reviews",
    },
  });

  if (!res.ok) {
    throw new Error(`Places details (reviews) failed (${res.status}): ${await res.text()}`);
  }

  const json = (await res.json()) as PlaceDetailsResponse;
  return (json.reviews ?? []).map((r) => ({
    reviewId: r.name,
    authorName: r.authorAttribution?.displayName ?? "Anonymous",
    rating: r.rating,
    text: r.text?.text ?? "",
    publishTime: r.publishTime,
    relativeTime: r.relativePublishTimeDescription ?? "",
  }));
}
