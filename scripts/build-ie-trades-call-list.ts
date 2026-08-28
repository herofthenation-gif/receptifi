// One-off research pipeline for the 2026-08-24 IE trades call list, same
// methodology as build-high-ticket-call-list.ts (2026-08-12): scrapes each
// candidate's own site for lead-gen signals (Firecrawl), pulls their live
// Google reviews to find a real client-facing complaint, and benchmarks them
// against the top-ranked competitor for their city+vertical search query
// (Google Places). Pitch here is the marketing/guaranteed-more-clients
// angle, not the general systems retainer pitch, per Karmello's ask.
// Output: outreach/call_sheet_ie_trades_2026-08-24.md
import fs from "fs";
import { supabaseAdmin } from "../lib/supabase-admin";
import { assessSiteQuality } from "../lib/outreach/site-quality";
import { searchPlacesText, type PlacesResult } from "../lib/outreach/google-places";
import { mapWithConcurrency } from "../lib/outreach/concurrency";
import { getVertical, FOCUS_VERTICAL_KEYS, SOURCING_CITIES } from "../lib/outreach/config";

const TARGET_COUNT = 100;
const MAX_PER_CITY_VERTICAL = 4;
const CANDIDATE_POOL_LIMIT = 250;
const OUTPUT_PATH = "outreach/call_sheet_ie_trades_2026-08-24.md";

const IE_CITIES = new Set(SOURCING_CITIES.filter((c) => c.region === "IE").map((c) => c.name));

const VERTICAL_LABEL: Record<string, string> = {
  hvac: "HVAC",
  plumbing: "Plumbing",
  electrical: "Electrical",
  garage_door: "Garage Door",
  restoration: "Water Damage Restoration",
};

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
  complaintQuote: string | null;
  leaderName: string | null;
  leaderReviewCount: number | null;
  leaderRating: number | null;
  marketRank: number | null;
  painScore: number;
}

function computePainScore(e: Omit<EnrichedLead, "painScore">): number {
  let score = 0;
  if (!e.hasWebsite) score += 6;
  if (e.hasWebsite && e.bookingWidget === false) score += 3;
  if (e.complaintQuote) score += 4;
  if (e.marketRank == null) score += 3;
  else if (e.marketRank > 10) score += 2;
  else if (e.marketRank > 3) score += 1;
  const reviewGap = (e.leaderReviewCount ?? 0) - (e.review_count ?? 0);
  if (reviewGap > 200) score += 2;
  else if (reviewGap > 50) score += 1;
  return score;
}

function buildFacts(l: EnrichedLead): string[] {
  const facts: string[] = [];

  if (!l.hasWebsite) {
    facts.push(`No website at all — every emergency call has to find you by phone or a Google listing alone.`);
  } else if (l.bookingWidget === false) {
    facts.push(`Website has no online booking, every job still has to be caught live on the phone to convert.`);
  }

  if (l.marketRank == null) {
    facts.push(`Outside the top 20 results for "${getVertical(l.vertical).queryTerm} in ${l.city}" — invisible to anyone searching cold.`);
  } else if (l.marketRank > 5) {
    facts.push(`Ranks #${l.marketRank} in ${l.city} search results, behind ${l.leaderName} (${l.leaderReviewCount} reviews, ${l.leaderRating}★).`);
  }

  if (l.complaintQuote) {
    facts.push(`A real client review flagged a follow-up gap: "${l.complaintQuote}"`);
  }

  const reviewGap = (l.leaderReviewCount ?? 0) - (l.review_count ?? 0);
  if (reviewGap > 100) {
    facts.push(`${l.review_count ?? 0} reviews vs. the category leader's ${l.leaderReviewCount}, a ${reviewGap}-review gap that compounds every month it's not addressed.`);
  }

  if (facts.length === 0) {
    facts.push(`Established review base (${l.review_count ?? "?"} reviews) but no marketing pushing new jobs in, still relying on word of mouth and repeat customers.`);
  }

  return facts;
}

function buildOpener(l: EnrichedLead): string {
  const label = VERTICAL_LABEL[l.vertical] ?? l.vertical;
  const facts = buildFacts(l);

  let hook: string;
  if (!l.hasWebsite) {
    hook = `You don't have a website up right now, which means every job that doesn't already have your number by word of mouth is going to whoever comes up first on Google.`;
  } else if (l.bookingWidget === false) {
    hook = `I checked your site, there's no online booking on it. Every job still has to catch someone live on the phone to actually convert, which means after-hours and busy-moment calls are just gone.`;
  } else if (l.complaintQuote) {
    hook = `I pulled your reviews. One of them called out a follow-up gap: "${l.complaintQuote}" That's lost jobs, not a one-off.`;
  } else {
    hook = `You're at ${l.review_count ?? "a solid number of"} reviews but not really running any marketing. ${l.leaderName ? `${l.leaderName} is ahead of you in ${l.city} search results at ${l.leaderReviewCount} reviews` : "The companies ahead of you"} because they're actively bringing in new jobs, not just waiting on repeat business.`;
  }

  return `"Hi, is this the owner?" [wait]
"My name's Karmello, I run marketing for ${label.toLowerCase()} companies here in the Inland Empire, more calls, more jobs, and I guarantee it. ${hook} I build and run the marketing myself, and you don't pay until you're actually seeing more jobs come in. Worth 20 minutes this week to walk through what I found on your setup specifically?"`;
}

async function main() {
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("id, business_name, name, vertical, city, phone, website, rating, review_count, place_id, status")
    .in("vertical", FOCUS_VERTICAL_KEYS)
    .in("city", [...IE_CITIES])
    .not("phone", "is", null)
    .not("status", "eq", "closed")
    .order("review_count", { ascending: true })
    .limit(CANDIDATE_POOL_LIMIT);
  if (error) throw error;

  const candidates = (data ?? []) as CandidateLead[];
  console.log(`Pool: ${candidates.length} IE trades leads with phone numbers.`);

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
    if (hasWebsite) {
      try {
        const quality = await assessSiteQuality(lead.website);
        bookingWidget = quality.signals?.bookingWidget ?? false;
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

  console.log(`Selected ${selected.length} leads for the call list.`);

  const header = `# Call Sheet: ${selected.length} IE Trades Leads (HVAC / Plumbing / Electrical / Garage Door / Restoration)
Built 2026-08-24. Sourced from live site scans (Firecrawl), Google review mining, and Google Maps search-rank benchmarking against the category leader in each lead's own city, same methodology as the 2026-08-12 high-ticket call sheet, applied here to Inland Empire trades.

**Offer:** marketing, run for them, guaranteeing more clients, not the general systems retainer pitch. We build and run the marketing (ads, SEO, reviews, follow-up) and don't get paid until they're actually seeing more jobs come in, the same build-first guarantee already proven on the Systems path.

**Wedge:** free 20-minute call first, built around the specific gap found on their own site/reviews (below), guarantee pitched live on that call, not a warm-up freebie, a diagnostic that already shows them something real about their own business.

## Objections
- "How much does this cost?" > "The call's free, it's just me walking you through what I found on your setup. If it's a fit, I'll lay out the marketing plan and the cost on the call, not before, and you don't pay until it's actually working."
- "I've tried marketing before and it didn't work." > "That's exactly why the guarantee matters here. I build and run it myself, and you don't pay until you're actually seeing more jobs, not just more clicks."
- "Send me something first." > "I'll text you the specific gap I found on your site after we hang up. But the actual plan makes more sense walked through live, 20 minutes, this week?"
- Voicemail: "Karmello here, I run marketing for [vertical] companies in the Inland Empire, guaranteed more jobs. I looked at your site/reviews and found something specific worth 20 minutes. Call me back at [your cell]." Log it, call again in 2 days.

## How These Leads Are Scored
Every lead is pain-scored and sorted highest first, so you're calling the businesses missing the most fundamentals before anyone else:
- **No website at all:** +6 (heaviest signal, can't be found or booked online at all)
- **Has a website but no online booking:** +3 (still phone-only to convert)
- **A real negative review about follow-up/responsiveness:** +4 (pulled from their actual Google reviews)
- **Search rank vs. the category leader** (SEO/visibility): +3 outside the top 20, +2 if ranked below #10, +1 if ranked below #3
- **Review-count gap vs. the #1 result:** +2 if the gap is 200+, +1 if 50+

## The ${selected.length}

`;

  const cards = selected.map((l, i) => {
    const name = l.business_name ?? l.name;
    const label = VERTICAL_LABEL[l.vertical] ?? l.vertical;
    const facts = buildFacts(l);
    const opener = buildOpener(l);
    return `### ${i + 1}. ${name}  (${l.city}, ${label})
- **Phone:** ${l.phone}
- **Website:** ${l.website ?? "none found"}
- **Reviews:** ${l.review_count ?? "?"} (${l.rating ?? "?"}★)${l.marketRank ? `, ranks #${l.marketRank} in ${l.city} search` : ""}
- **The gaps found:**
${facts.map((f) => `  - ${f}`).join("\n")}
- **Say this:**
${opener.split("\n").map((line) => `  ${line}`).join("\n")}
- **Outcome:** ______  (booked / callback / no / vm x__)
`;
  });

  fs.writeFileSync(OUTPUT_PATH, header + cards.join("\n"));
  console.log(`Wrote ${OUTPUT_PATH} — ${selected.length} leads.`);
}

main();
