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
    regularOpeningHours: p.regularOpeningHours,
    businessStatus: p.businessStatus,
  }));
}
