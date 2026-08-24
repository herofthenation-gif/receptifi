// One-off research pipeline for the 2026-08-12 high-ticket call list.
// For each candidate lead: scrapes their own site for lead-gen signals
// (Firecrawl, via the same assessSiteQuality used for offer classification),
// pulls their live Google reviews to find a real client-facing complaint,
// and benchmarks them against the top-ranked competitor for their
// city+vertical search query (Google Places, same method as the 7/15 rank
// upgrade). Output: outreach/call_sheet_2026-08-12.md.
import { supabaseAdmin } from "../lib/supabase-admin";
import { assessSiteQuality } from "../lib/outreach/site-quality";
import { searchPlacesText, type PlacesResult } from "../lib/outreach/google-places";
import { mapWithConcurrency } from "../lib/outreach/concurrency";
import { getVertical } from "../lib/outreach/config";

const TARGET_COUNT = 100;
const MAX_PER_CITY_VERTICAL = 6;
const CANDIDATE_POOL_LIMIT = 150;

interface CandidateLead {
  id: string;
  business_name: string | null;
  name: string;
  vertical: string;
  city: string;
  phone: string;
  website: string | null;
  rating: number | null;
  review_count: number | null;
  place_id: string | null;
  status: string;
}

interface Review {
  text: string;
  rating: number | null;
}

const RETENTION_COMPLAINT_RE =
  /never (called|call(ed)? me)? ?back|no (call ?back|response|follow[\s-]?up|one (answered|picked up|returned))|did(n'?t| not) (call|answer|respond|return)|took (forever|weeks|days) to|hard to (reach|get (a )?(hold of|in touch))|missed (my|the) call|voicemail (and never|with no)|ghosted|kept me waiting|waited (weeks|days|forever)|unresponsive|ignored (my|our) (call|email|message)/i;

async function fetchPlaceDetails(placeId: string): Promise<{ reviews: Review[] } | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews",
      },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { reviews?: Array<{ text?: { text?: string }; rating?: number }> };
    const reviews = (json.reviews ?? []).map((r) => ({ text: r.text?.text ?? "", rating: r.rating ?? null }));
    return { reviews };
  } catch {
    return null;
  }
}

function findComplaintReview(reviews: Review[]): string | null {
  for (const r of reviews) {
    if (r.text && RETENTION_COMPLAINT_RE.test(r.text)) {
      return r.text.length > 220 ? r.text.slice(0, 217) + "..." : r.text;
    }
  }
  return null;
}

interface EnrichedLead extends CandidateLead {
  hasWebsite: boolean;
  bookingWidget: boolean | null;
  napCta: boolean | null;
  complaintQuote: string | null;
  leaderName: string | null;
  leaderReviewCount: number | null;
  leaderRating: number | null;
  marketRank: number | null; // 1-indexed position of this lead among the search results, null if outside top 20
  painScore: number;
}

function computePainScore(e: Omit<EnrichedLead, "painScore">): number {
  let score = 0;
  if (!e.hasWebsite) score += 6;
  if (e.hasWebsite && e.bookingWidget === false) score += 3;
  if (e.hasWebsite && e.napCta === false) score += 1;
  if (e.complaintQuote) score += 4;
  if (e.marketRank == null) score += 3;
  else if (e.marketRank > 10) score += 2;
  else if (e.marketRank > 3) score += 1;
  const reviewGap = (e.leaderReviewCount ?? 0) - (e.review_count ?? 0);
  if (reviewGap > 200) score += 2;
  else if (reviewGap > 50) score += 1;
  return score;
}

async function main() {
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("id, business_name, name, vertical, city, phone, website, rating, review_count, place_id, status")
    .in("vertical", ["legal_intake", "med_spa", "real_estate"])
    .not("phone", "is", null)
    .not("status", "eq", "closed")
    .order("review_count", { ascending: false })
    .limit(CANDIDATE_POOL_LIMIT);
  if (error) throw error;

  const candidates = (data ?? []) as CandidateLead[];
  console.log(`Pool: ${candidates.length} high-ticket leads with phone numbers.`);

  // Memoize one market search per (city, vertical) pair — many leads share one.
  const marketCache = new Map<string, PlacesResult[]>();
  async function getMarketResults(city: string, verticalKey: string): Promise<PlacesResult[]> {
    const key = `${city}|${verticalKey}`;
    if (marketCache.has(key)) return marketCache.get(key)!;
    const vertical = getVertical(verticalKey);
    let results: PlacesResult[] = [];
    try {
      results = await searchPlacesText(`${vertical.queryTerm} in ${city}, CA`);
    } catch (err) {
      console.log(`  market search failed for ${key}: ${(err as Error).message}`);
    }
    marketCache.set(key, results);
    return results;
  }

  let done = 0;
  const enriched = await mapWithConcurrency(candidates, 8, async (lead): Promise<EnrichedLead> => {
    const hasWebsite = !!lead.website;

    let bookingWidget: boolean | null = null;
    let napCta: boolean | null = null;
    if (hasWebsite) {
      try {
        const quality = await assessSiteQuality(lead.website);
        bookingWidget = quality.signals?.bookingWidget ?? false;
        napCta = quality.signals?.napCta ?? false;
      } catch {
        // Firecrawl failure: treat as unknown, not a false pain signal.
      }
    }

    let complaintQuote: string | null = null;
    if (lead.place_id) {
      const details = await fetchPlaceDetails(lead.place_id);
      if (details) complaintQuote = findComplaintReview(details.reviews);
    }

    const market = await getMarketResults(lead.city, lead.vertical);
    const leader = market[0] ?? null;
    const rankIdx = lead.place_id ? market.findIndex((r) => r.placeId === lead.place_id) : -1;

    const base = {
      ...lead,
      hasWebsite,
      bookingWidget,
      napCta,
      complaintQuote,
      leaderName: leader?.displayName ?? null,
      leaderReviewCount: leader?.userRatingCount ?? null,
      leaderRating: leader?.rating ?? null,
      marketRank: rankIdx >= 0 ? rankIdx + 1 : null,
    };
    const result: EnrichedLead = { ...base, painScore: computePainScore(base) };

    done++;
    if (done % 20 === 0) console.log(`  enriched ${done}/${candidates.length}`);
    return result;
  });

  enriched.sort((a, b) => b.painScore - a.painScore);

  const perCityVertical = new Map<string, number>();
  const selected: EnrichedLead[] = [];
  for (const lead of enriched) {
    const key = `${lead.city}|${lead.vertical}`;
    const count = perCityVertical.get(key) ?? 0;
    if (count >= MAX_PER_CITY_VERTICAL) continue;
    selected.push(lead);
    perCityVertical.set(key, count + 1);
    if (selected.length >= TARGET_COUNT) break;
  }

  console.log(`\nSelected ${selected.length} leads for the call list.`);
  console.log(JSON.stringify(selected.map((l) => ({
    name: l.business_name ?? l.name,
    vertical: l.vertical,
    city: l.city,
    painScore: l.painScore,
    hasWebsite: l.hasWebsite,
    bookingWidget: l.bookingWidget,
    complaintQuote: l.complaintQuote,
    marketRank: l.marketRank,
    leaderName: l.leaderName,
    leaderReviewCount: l.leaderReviewCount,
    review_count: l.review_count,
  })), null, 2));

  // Write raw JSON for the markdown-writing pass to consume.
  const fs = await import("fs");
  fs.writeFileSync("scripts/.tmp-ht-selected.json", JSON.stringify(selected, null, 2));
}

main();
