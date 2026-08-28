// One-off sourcing + call-sheet pipeline for Birmingham, AL, requested
// 2026-08-28 as the first market outside SoCal. Unlike the CA call sheets
// (which pull from leads already sourced by the daily cron), Birmingham has
// no leads yet, so this scrapes Google Places directly, upserts into the
// `leads` table (consistent with the rest of the system, eligible for the
// same automated email outreach later), enriches with the same site-quality
// / review-complaint / market-rank pipeline as the CA call sheets, and
// writes two separate call sheets: high-ticket (retainer pitch) and local
// trades (marketing/guarantee pitch, per the IE trades call sheet).
import fs from "fs";
import { supabaseAdmin } from "../lib/supabase-admin";
import { searchPlacesText, type PlacesResult } from "../lib/outreach/google-places";
import { scrapeContactEmail } from "../lib/outreach/email-scraper";
import { assessSiteQuality } from "../lib/outreach/site-quality";
import { mapWithConcurrency } from "../lib/outreach/concurrency";
import { computePriorityTier } from "../lib/outreach/priority";
import {
  getVertical,
  FOCUS_VERTICAL_KEYS,
  HIGH_TICKET_VERTICAL_KEYS,
} from "../lib/outreach/config";

const CITY = "Birmingham";
const STATE = "AL";
const SCRAPE_CONCURRENCY = 10;

const TRADES_LABEL: Record<string, string> = {
  hvac: "HVAC",
  plumbing: "Plumbing",
  electrical: "Electrical",
  garage_door: "Garage Door",
  restoration: "Water Damage Restoration",
};
const HIGH_TICKET_LABEL: Record<string, string> = {
  med_spa: "Med Spa",
  legal_intake: "Law Firm",
  real_estate: "Real Estate",
};
const HIGH_TICKET_UNIT: Record<string, string> = {
  med_spa: "appointment",
  legal_intake: "case",
  real_estate: "deal",
};

const RETENTION_COMPLAINT_RE =
  /never (called|call(ed)? me)? ?back|no (call ?back|response|follow[\s-]?up|one (answered|picked up|returned))|did(n'?t| not) (call|answer|respond|return)|took (forever|weeks|days) to|hard to (reach|get (a )?(hold of|in touch))|missed (my|the) call|voicemail (and never|with no)|ghosted|kept me waiting|waited (weeks|days|forever)|unresponsive|ignored (my|our) (call|email|message)/i;

interface Review {
  text: string;
  rating: number | null;
}

async function fetchPlaceDetails(placeId: string): Promise<{ reviews: Review[] } | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: { "X-Goog-Api-Key": apiKey, "X-Goog-FieldMask": "reviews" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { reviews?: Array<{ text?: { text?: string }; rating?: number }> };
    return { reviews: (json.reviews ?? []).map((r) => ({ text: r.text?.text ?? "", rating: r.rating ?? null })) };
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

interface Enriched {
  placeId: string;
  businessName: string;
  vertical: string;
  phone: string | null;
  website: string | null;
  rating: number | null;
  reviewCount: number | null;
  hasWebsite: boolean;
  bookingWidget: boolean | null;
  complaintQuote: string | null;
  leaderName: string | null;
  leaderReviewCount: number | null;
  leaderRating: number | null;
  marketRank: number | null;
  painScore: number;
}

function computePainScore(e: Omit<Enriched, "painScore">): number {
  let score = 0;
  if (!e.hasWebsite) score += 6;
  if (e.hasWebsite && e.bookingWidget === false) score += 3;
  if (e.complaintQuote) score += 4;
  if (e.marketRank == null) score += 3;
  else if (e.marketRank > 10) score += 2;
  else if (e.marketRank > 3) score += 1;
  const reviewGap = (e.leaderReviewCount ?? 0) - (e.reviewCount ?? 0);
  if (reviewGap > 200) score += 2;
  else if (reviewGap > 50) score += 1;
  return score;
}

async function sourceVertical(verticalKey: string): Promise<PlacesResult[]> {
  const vertical = getVertical(verticalKey);
  try {
    const results = await searchPlacesText(`${vertical.queryTerm} in ${CITY}, ${STATE}`);
    return results.filter((r) => !r.businessStatus || r.businessStatus === "OPERATIONAL");
  } catch (err) {
    console.log(`  source failed for ${verticalKey}: ${(err as Error).message}`);
    return [];
  }
}

async function main() {
  const allVerticalKeys = [...FOCUS_VERTICAL_KEYS, ...HIGH_TICKET_VERTICAL_KEYS];
  const highTicketKeys: readonly string[] = HIGH_TICKET_VERTICAL_KEYS;

  console.log(`Sourcing ${CITY}, ${STATE} across ${allVerticalKeys.length} verticals...`);
  const byVertical = new Map<string, PlacesResult[]>();
  for (const key of allVerticalKeys) {
    const results = await sourceVertical(key);
    byVertical.set(key, results);
    console.log(`  ${key}: ${results.length} candidates`);
  }

  // Scrape emails for anyone with a website, mirroring source-leads so these
  // leads are immediately usable in the automated email sequence too.
  const withWebsite: Array<{ verticalKey: string; r: PlacesResult }> = [];
  for (const [verticalKey, results] of byVertical) {
    for (const r of results) if (r.websiteUri) withWebsite.push({ verticalKey, r });
  }
  console.log(`Scraping emails for ${withWebsite.length} candidates with a website...`);
  const emails = await mapWithConcurrency(withWebsite, SCRAPE_CONCURRENCY, (c) => scrapeContactEmail(c.r.websiteUri!));
  const emailByPlaceId = new Map(withWebsite.map((c, i) => [c.r.placeId, emails[i]]));

  // Upsert every candidate into `leads`, same schema as source-leads/route.ts.
  let upserted = 0;
  for (const [verticalKey, results] of byVertical) {
    const status = highTicketKeys.includes(verticalKey) ? "needs_review" : "cold";
    for (const r of results) {
      const hasWebsite = !!r.websiteUri;
      const priorityTier = computePriorityTier({
        hasWebsite,
        rating: r.rating ?? null,
        reviewCount: r.userRatingCount ?? null,
      });
      const { error } = await supabaseAdmin.from("leads").upsert(
        {
          name: r.displayName,
          business_name: r.displayName,
          phone: r.nationalPhoneNumber ?? null,
          email: emailByPlaceId.get(r.placeId) ?? null,
          email_scrape_attempted_at: hasWebsite ? new Date().toISOString() : null,
          website: r.websiteUri ?? null,
          address: r.formattedAddress || null,
          rating: r.rating ?? null,
          review_count: r.userRatingCount ?? null,
          status,
          source: "google_places",
          vertical: verticalKey,
          city: CITY,
          region: "AL",
          hours_json: r.regularOpeningHours?.periods ?? null,
          priority_tier: priorityTier,
          place_id: r.placeId,
        },
        { onConflict: "place_id", ignoreDuplicates: true }
      );
      if (!error) upserted++;
      else console.log(`  upsert failed for ${r.displayName}: ${error.message}`);
    }
  }
  console.log(`Upserted ${upserted} Birmingham leads into the leads table.`);

  // Enrich: site quality (booking widget), review complaint mining, market
  // rank within each vertical's own result set (already fetched above, one
  // query per vertical covers the whole city).
  const enrichedByVertical = new Map<string, Enriched[]>();
  for (const [verticalKey, results] of byVertical) {
    const leader = results[0] ?? null;
    const enriched = await mapWithConcurrency(results, SCRAPE_CONCURRENCY, async (r): Promise<Enriched> => {
      const hasWebsite = !!r.websiteUri;
      let bookingWidget: boolean | null = null;
      if (hasWebsite) {
        try {
          const quality = await assessSiteQuality(r.websiteUri!);
          bookingWidget = quality.signals?.bookingWidget ?? false;
        } catch {
          // Firecrawl failure: unknown, not a false pain signal.
        }
      }
      let complaintQuote: string | null = null;
      const details = await fetchPlaceDetails(r.placeId);
      if (details) complaintQuote = findComplaintReview(details.reviews);

      const base = {
        placeId: r.placeId,
        businessName: r.displayName,
        vertical: verticalKey,
        phone: r.nationalPhoneNumber ?? null,
        website: r.websiteUri ?? null,
        rating: r.rating ?? null,
        reviewCount: r.userRatingCount ?? null,
        hasWebsite,
        bookingWidget,
        complaintQuote,
        leaderName: leader?.displayName ?? null,
        leaderReviewCount: leader?.userRatingCount ?? null,
        leaderRating: leader?.rating ?? null,
        marketRank: results.findIndex((x) => x.placeId === r.placeId) + 1 || null,
      };
      return { ...base, painScore: computePainScore(base) };
    });
    enrichedByVertical.set(verticalKey, enriched);
    console.log(`  enriched ${verticalKey}: ${enriched.length}`);
  }

  const tradesLeads = FOCUS_VERTICAL_KEYS.flatMap((k) => enrichedByVertical.get(k) ?? []).filter((l) => l.phone);
  const highTicketLeads = HIGH_TICKET_VERTICAL_KEYS.flatMap((k) => enrichedByVertical.get(k) ?? []).filter((l) => l.phone);
  tradesLeads.sort((a, b) => b.painScore - a.painScore);
  highTicketLeads.sort((a, b) => b.painScore - a.painScore);

  writeTradesSheet(tradesLeads);
  writeHighTicketSheet(highTicketLeads);
}

function buildTradesFacts(l: Enriched): string[] {
  const facts: string[] = [];
  if (!l.hasWebsite) {
    facts.push(`No website at all — every emergency call has to find you by phone or a Google listing alone.`);
  } else if (l.bookingWidget === false) {
    facts.push(`Website has no online booking, every job still has to be caught live on the phone to convert.`);
  }
  if (l.marketRank == null) {
    facts.push(`Outside the results for "${getVertical(l.vertical).queryTerm} in ${CITY}" — invisible to anyone searching cold.`);
  } else if (l.marketRank > 5) {
    facts.push(`Ranks #${l.marketRank} in ${CITY} search results, behind ${l.leaderName} (${l.leaderReviewCount} reviews, ${l.leaderRating}★).`);
  }
  if (l.complaintQuote) facts.push(`A real client review flagged a follow-up gap: "${l.complaintQuote}"`);
  const reviewGap = (l.leaderReviewCount ?? 0) - (l.reviewCount ?? 0);
  if (reviewGap > 100) {
    facts.push(`${l.reviewCount ?? 0} reviews vs. the category leader's ${l.leaderReviewCount}, a ${reviewGap}-review gap that compounds every month it's not addressed.`);
  }
  if (facts.length === 0) {
    facts.push(`Established review base (${l.reviewCount ?? "?"} reviews) but no marketing pushing new jobs in, still relying on word of mouth and repeat customers.`);
  }
  return facts;
}

function buildTradesOpener(l: Enriched): string {
  const label = TRADES_LABEL[l.vertical] ?? l.vertical;
  let hook: string;
  if (!l.hasWebsite) {
    hook = `You don't have a website up right now, which means every job that doesn't already have your number by word of mouth is going to whoever comes up first on Google.`;
  } else if (l.bookingWidget === false) {
    hook = `I checked your site, there's no online booking on it. Every job still has to catch someone live on the phone to actually convert, which means after-hours and busy-moment calls are just gone.`;
  } else if (l.complaintQuote) {
    hook = `I pulled your reviews. One of them called out a follow-up gap: "${l.complaintQuote}" That's lost jobs, not a one-off.`;
  } else {
    hook = `You're at ${l.reviewCount ?? "a solid number of"} reviews but not really running any marketing. ${l.leaderName ? `${l.leaderName} is ahead of you in ${CITY} search results at ${l.leaderReviewCount} reviews` : "The companies ahead of you"} because they're actively bringing in new jobs, not just waiting on repeat business.`;
  }
  return `"Hi, is this the owner?" [wait]
"My name's Karmello, I run marketing for ${label.toLowerCase()} companies here in Birmingham, more calls, more jobs, and I guarantee it. ${hook} I build and run the marketing myself, and you don't pay until you're actually seeing more jobs come in. Worth 20 minutes this week to walk through what I found on your setup specifically?"`;
}

function writeTradesSheet(leads: Enriched[]) {
  const path = "outreach/call_sheet_birmingham_local_2026-08-28.md";
  const header = `# Call Sheet: ${leads.length} Birmingham, AL Local Trades Leads (HVAC / Plumbing / Electrical / Garage Door / Restoration)
Built 2026-08-28. First non-SoCal market, sourced live from Google Places, Firecrawl site scans, Google review mining, and market-rank benchmarking, same methodology as the California trades call sheet.

**Offer:** marketing, run for them, guaranteeing more clients, same pitch as the IE trades call sheet. We build and run the marketing (ads, SEO, reviews, follow-up) and don't get paid until they're actually seeing more jobs come in.

**Wedge:** free 20-minute call first, built around the specific gap found on their own site/reviews (below), guarantee pitched live on that call.

## Objections
- "How much does this cost?" > "The call's free, it's just me walking you through what I found on your setup. If it's a fit, I'll lay out the marketing plan and the cost on the call, not before, and you don't pay until it's actually working."
- "I've tried marketing before and it didn't work." > "That's exactly why the guarantee matters here. I build and run it myself, and you don't pay until you're actually seeing more jobs, not just more clicks."
- "Send me something first." > "I'll text you the specific gap I found on your site after we hang up. But the actual plan makes more sense walked through live, 20 minutes, this week?"
- Voicemail: "Karmello here, I run marketing for [vertical] companies here in Birmingham, guaranteed more jobs. I looked at your site/reviews and found something specific worth 20 minutes. Call me back at [your cell]." Log it, call again in 2 days.

## How These Leads Are Scored
Every lead is pain-scored and sorted highest first, so you're calling the businesses missing the most fundamentals before anyone else:
- **No website at all:** +6 (heaviest signal, can't be found or booked online at all)
- **Has a website but no online booking:** +3 (still phone-only to convert)
- **A real negative review about follow-up/responsiveness:** +4 (pulled from their actual Google reviews)
- **Search rank vs. the category leader** (SEO/visibility): +3 outside the top 20, +2 if ranked below #10, +1 if ranked below #3
- **Review-count gap vs. the #1 result:** +2 if the gap is 200+, +1 if 50+

## The ${leads.length}

`;
  const cards = leads.map((l, i) => {
    const label = TRADES_LABEL[l.vertical] ?? l.vertical;
    const facts = buildTradesFacts(l);
    const opener = buildTradesOpener(l);
    return `### ${i + 1}. ${l.businessName}  (${CITY}, ${label})
- **Phone:** ${l.phone}
- **Website:** ${l.website ?? "none found"}
- **Reviews:** ${l.reviewCount ?? "?"} (${l.rating ?? "?"}★)${l.marketRank ? `, ranks #${l.marketRank} in ${CITY} search` : ""}
- **The gaps found:**
${facts.map((f) => `  - ${f}`).join("\n")}
- **Say this:**
${opener.split("\n").map((line) => `  ${line}`).join("\n")}
- **Outcome:** ______  (booked / callback / no / vm x__)
`;
  });
  fs.writeFileSync(path, header + cards.join("\n"));
  console.log(`Wrote ${path} — ${leads.length} leads.`);
}

function buildHighTicketFacts(l: Enriched): string[] {
  const facts: string[] = [];
  const unit = HIGH_TICKET_UNIT[l.vertical] ?? "lead";
  if (!l.hasWebsite) {
    facts.push(`No website at all — every ${unit} inquiry has to find them by phone or a Google listing alone.`);
  } else if (l.bookingWidget === false) {
    facts.push(`Website has no online booking/scheduling widget — every ${unit} still has to be caught live on the phone to convert.`);
  }
  if (l.marketRank == null) {
    facts.push(`Outside the results for "${getVertical(l.vertical).queryTerm} in ${CITY}" — invisible to anyone searching cold.`);
  } else if (l.marketRank > 5) {
    facts.push(`Ranks #${l.marketRank} in ${CITY} search results, behind ${l.leaderName} (${l.leaderReviewCount} reviews, ${l.leaderRating}★).`);
  }
  if (l.complaintQuote) facts.push(`A real client review flagged a follow-up gap: "${l.complaintQuote}"`);
  const reviewGap = (l.leaderReviewCount ?? 0) - (l.reviewCount ?? 0);
  if (reviewGap > 100) {
    facts.push(`${l.reviewCount ?? 0} reviews vs. the category leader's ${l.leaderReviewCount} — a ${reviewGap}-review gap that compounds every month it's not addressed.`);
  }
  if (facts.length === 0) {
    facts.push(`Established review base (${l.reviewCount ?? "?"} reviews) but no automated intake — still relying on manual phone pickup to not lose ${unit}s.`);
  }
  return facts;
}

function buildHighTicketOpener(l: Enriched): string {
  const label = HIGH_TICKET_LABEL[l.vertical] ?? l.vertical;
  const unit = HIGH_TICKET_UNIT[l.vertical] ?? "lead";
  let hook: string;
  if (!l.hasWebsite) {
    hook = `You don't have a website up right now, which means every ${unit} that doesn't already have your number by word of mouth is going to whoever comes up first on Google.`;
  } else if (l.bookingWidget === false) {
    hook = `I checked your site — there's no online booking on it. Every ${unit} still has to catch someone live on the phone to actually convert, which means after-hours and busy-moment inquiries are just gone.`;
  } else if (l.complaintQuote) {
    hook = `I pulled your reviews. One of them called out a follow-up gap: "${l.complaintQuote}" That's not a one-off, that's a system problem.`;
  } else {
    hook = `You're at ${l.reviewCount ?? "a solid number of"} reviews but still running intake manually. ${l.leaderName ? `${l.leaderName} is ahead of you in ${CITY} search results at ${l.leaderReviewCount} reviews` : "The businesses ahead of you"} because they've automated what you're still doing by hand.`;
  }
  return `"Hi, is this the owner?" [wait]
"My name's Karmello, I build done-for-you systems for ${label.toLowerCase()} businesses — lead capture, follow-up, retention, that side of the operation. ${hook} I build and run that as a monthly retainer, so it's not a one-time fix that decays. Worth 20 minutes this week to walk through what I found on your setup specifically?"`;
}

function writeHighTicketSheet(leads: Enriched[]) {
  const path = "outreach/call_sheet_birmingham_high_ticket_2026-08-28.md";
  const header = `# Call Sheet: ${leads.length} Birmingham, AL High-Ticket Leads (Med Spa / Law Firm / Real Estate)
Built 2026-08-28. First non-SoCal market, sourced live from Google Places, Firecrawl site scans, Google review mining, and market-rank benchmarking, same methodology as the California high-ticket call sheet.

**Offer, same as the 2026-08-12 pivot:** lead with the $4k+/mo done-for-you retainer as the main ask. The $700 audit is the fallback if they're not ready to commit to a retainer on the first call, don't lead with it.

**Wedge:** free 20-minute call first, built around the specific gap found on their own site/reviews (below), retainer pitched live on that call.

## Objections
- "How much does this cost?" > "The call's free — it's just me walking you through what I found on your setup. If it's a fit, the retainer's $4k+ a month depending on scope, and I'll lay that out on the call, not before."
- "I'm not looking to spend that much." > "Totally fair — I also do a $700 one-time audit if you want the findings without the ongoing build. Most people start there if the retainer's too much right now."
- "Send me something first." > "I'll text you the specific gap I found on your site after we hang up. But the actual plan makes more sense walked through live — 20 minutes, this week?"
- Voicemail: "Karmello here, I build lead-capture and follow-up systems for [vertical] businesses. I looked at your site/reviews and found something specific worth 20 minutes. Call me back at [your cell]." Log it, call again in 2 days.

## How These Leads Are Scored
Every lead is pain-scored and sorted highest first, so you're calling the businesses missing the most fundamentals before anyone else:
- **No website at all:** +6 (heaviest signal, can't be found or booked online at all)
- **Has a website but no online booking:** +3 (still phone-only to convert)
- **A real negative review about follow-up/responsiveness:** +4 (pulled from their actual Google reviews)
- **Search rank vs. the category leader** (SEO/visibility): +3 outside the top 20, +2 if ranked below #10, +1 if ranked below #3
- **Review-count gap vs. the #1 result:** +2 if the gap is 200+, +1 if 50+

## The ${leads.length}

`;
  const cards = leads.map((l, i) => {
    const label = HIGH_TICKET_LABEL[l.vertical] ?? l.vertical;
    const facts = buildHighTicketFacts(l);
    const opener = buildHighTicketOpener(l);
    return `### ${i + 1}. ${l.businessName}  (${CITY}, ${label})
- **Phone:** ${l.phone}
- **Website:** ${l.website ?? "none found"}
- **Reviews:** ${l.reviewCount ?? "?"} (${l.rating ?? "?"}★)${l.marketRank ? `, ranks #${l.marketRank} in ${CITY} search` : ""}
- **The gaps found:**
${facts.map((f) => `  - ${f}`).join("\n")}
- **Say this:**
${opener.split("\n").map((line) => `  ${line}`).join("\n")}
- **Outcome:** ______  (booked / callback / no / vm x__)
`;
  });
  fs.writeFileSync(path, header + cards.join("\n"));
  console.log(`Wrote ${path} — ${leads.length} leads.`);
}

main();
