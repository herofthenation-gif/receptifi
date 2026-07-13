import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Lead } from "@/lib/supabase";
import { assertCronAuth } from "@/lib/outreach/cron-auth";
import { searchPlacesText, type PlacesResult } from "@/lib/outreach/google-places";
import { scrapeContactEmail } from "@/lib/outreach/email-scraper";
import { mapWithConcurrency } from "@/lib/outreach/concurrency";
import { nextCombos, advanceCursor } from "@/lib/outreach/cursor";
import { computePriorityTier } from "@/lib/outreach/priority";
import { FOCUS_VERTICAL_KEYS, SOURCING_BATCH_SIZE } from "@/lib/outreach/config";
import { assessSiteQuality } from "@/lib/outreach/site-quality";
import { decideOffer } from "@/lib/outreach/offer";
import { buildGeneratedSite, buildPreviewSlug } from "@/lib/outreach/site-generator";

// Firecrawl scrapes (15s timeout each) dominate the classification budget.
export const maxDuration = 300;

// Plain fetches, run concurrently, so raising this covers a full day's fresh
// batch (SOURCING_BATCH_SIZE combos return roughly 60-100 results/day).
const MAX_EMAIL_SCRAPES_PER_RUN = 80;
// Separate sweep over the pre-existing backlog (leads with a website that
// were never attempted, e.g. sourced back when the per-run cap was 10).
const BACKFILL_BATCH_SIZE = 60;
const SCRAPE_CONCURRENCY = 20;
// Firecrawl calls per run. Leads without a website classify instantly and
// don't count against this.
const MAX_QUALITY_SCRAPES_PER_RUN = 10;
const CLASSIFY_FETCH_LIMIT = 40;

interface ClassificationEntry {
  businessName: string;
  vertical: string | null;
  websiteStatus: string;
  score: number;
  offerType: string;
  reasoning: string;
  previewSlug?: string;
}

/**
 * Backfills offer classification for leads that don't have one yet: scores
 * website quality, decides which offer to pitch, and generates the preview
 * site for web-offer leads. Skips leads already in the email sequence so an
 * offer never switches mid-thread.
 */
async function classifyLeads(): Promise<{ classified: ClassificationEntry[]; errors: string[] }> {
  const classified: ClassificationEntry[] = [];
  const errors: string[] = [];

  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .is("quality_checked_at", null)
    .or("outreach_touch.is.null,outreach_touch.eq.0")
    .order("priority_tier", { ascending: true })
    .limit(CLASSIFY_FETCH_LIMIT);

  if (error) {
    errors.push(`classify fetch: ${error.message}`);
    return { classified, errors };
  }

  let qualityScrapes = 0;
  for (const lead of (data ?? []) as Lead[]) {
    if (lead.website && qualityScrapes >= MAX_QUALITY_SCRAPES_PER_RUN) continue;

    let quality;
    try {
      if (lead.website) qualityScrapes++;
      quality = await assessSiteQuality(lead.website);
    } catch (err) {
      // Missing FIRECRAWL_API_KEY or an API failure: leave quality_checked_at
      // null so tomorrow's run retries, and surface the error.
      errors.push(`classify ${lead.business_name ?? lead.name}: ${(err as Error).message}`);
      continue;
    }

    const offer = decideOffer({
      quality,
      rating: lead.rating,
      reviewCount: lead.review_count,
    });

    const update: Record<string, unknown> = {
      website_status: quality.status,
      site_quality_score: quality.score,
      offer_type: offer.offerType,
      quality_checked_at: new Date().toISOString(),
    };

    let previewSlug: string | undefined;
    if (offer.offerType === "web") {
      previewSlug = buildPreviewSlug(
        lead.business_name ?? lead.name,
        lead.city,
        lead.place_id ?? lead.id
      );
      update.preview_slug = previewSlug;
      update.generated_site = buildGeneratedSite({
        businessName: lead.business_name ?? lead.name,
        vertical: lead.vertical,
        city: lead.city,
        phone: lead.phone,
        address: lead.address ?? null,
        rating: lead.rating,
        reviewCount: lead.review_count,
        hours: lead.hours_json,
        websiteUrl: lead.website,
        scrape: quality.scrape,
        qualitySignals: quality.signals,
      });
    }

    const { error: updateError } = await supabaseAdmin.from("leads").update(update).eq("id", lead.id);
    if (updateError) {
      errors.push(`classify update ${lead.business_name ?? lead.name}: ${updateError.message}`);
      continue;
    }

    classified.push({
      businessName: lead.business_name ?? lead.name,
      vertical: lead.vertical,
      websiteStatus: quality.status,
      score: quality.score,
      offerType: offer.offerType,
      reasoning: offer.reasoning,
      ...(previewSlug ? { previewSlug } : {}),
    });
  }

  return { classified, errors };
}

/**
 * Sweeps the pre-existing backlog: leads with a website that never got a
 * scrape attempt (sourced before this column existed, or skipped past the
 * old 10/run cap). email_scrape_attempted_at is set regardless of outcome
 * so a failure is recorded once, not retried forever.
 */
async function backfillEmailScrape(): Promise<{ attempted: number; found: number; errors: string[] }> {
  const errors: string[] = [];

  // Focus-vertical backlog first; only spend leftover budget on the rest.
  const backlog: Pick<Lead, "id" | "website">[] = [];
  for (const focusOnly of [true, false]) {
    const remaining = BACKFILL_BATCH_SIZE - backlog.length;
    if (remaining <= 0) break;

    const query = supabaseAdmin
      .from("leads")
      .select("id, website")
      .not("website", "is", null)
      .is("email", null)
      .is("email_scrape_attempted_at", null)
      .filter("vertical", focusOnly ? "in" : "not.in", `(${FOCUS_VERTICAL_KEYS.join(",")})`)
      .order("priority_tier", { ascending: true })
      .limit(remaining);

    const { data, error } = await query;
    if (error) {
      errors.push(`backfill fetch (focus=${focusOnly}): ${error.message}`);
      continue;
    }
    backlog.push(...((data ?? []) as Pick<Lead, "id" | "website">[]));
  }
  let found = 0;

  await mapWithConcurrency(backlog, SCRAPE_CONCURRENCY, async (lead) => {
    let email: string | null = null;
    try {
      email = await scrapeContactEmail(lead.website!);
    } catch (err) {
      errors.push(`backfill scrape ${lead.id}: ${(err as Error).message}`);
    }
    if (email) found++;

    const { error: updateError } = await supabaseAdmin
      .from("leads")
      .update({ email, email_scrape_attempted_at: new Date().toISOString() })
      .eq("id", lead.id);
    if (updateError) errors.push(`backfill update ${lead.id}: ${updateError.message}`);
  });

  return { attempted: backlog.length, found, errors };
}

interface Candidate {
  cityName: string;
  region: string;
  verticalKey: string;
  r: PlacesResult;
}

export async function GET(req: Request) {
  const authError = assertCronAuth(req);
  if (authError) return authError;

  const combos = await nextCombos(SOURCING_BATCH_SIZE);
  const errors: string[] = [];
  const candidates: Candidate[] = [];

  for (const { city, vertical } of combos) {
    let results;
    try {
      results = await searchPlacesText(`${vertical.queryTerm} in ${city.name}, CA`);
    } catch (err) {
      errors.push(`${vertical.key}/${city.name}: ${(err as Error).message}`);
      continue;
    }

    for (const r of results) {
      if (r.businessStatus && r.businessStatus !== "OPERATIONAL") continue;
      candidates.push({ cityName: city.name, region: city.region, verticalKey: vertical.key, r });
    }
  }

  // Scrape emails concurrently for today's fresh batch, capped per run.
  const toScrape = candidates.filter((c) => !!c.r.websiteUri).slice(0, MAX_EMAIL_SCRAPES_PER_RUN);
  const scrapedEmails = await mapWithConcurrency(toScrape, SCRAPE_CONCURRENCY, (c) =>
    scrapeContactEmail(c.r.websiteUri!)
  );
  const emailByPlaceId = new Map(toScrape.map((c, i) => [c.r.placeId, scrapedEmails[i]]));
  const attemptedIds = new Set(toScrape.map((c) => c.r.placeId));

  let inserted = 0;
  for (const { cityName, region, verticalKey, r } of candidates) {
    const hasWebsite = !!r.websiteUri;
    const email = emailByPlaceId.get(r.placeId) ?? null;
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
        email,
        email_scrape_attempted_at: attemptedIds.has(r.placeId) ? new Date().toISOString() : null,
        website: r.websiteUri ?? null,
        address: r.formattedAddress || null,
        rating: r.rating ?? null,
        review_count: r.userRatingCount ?? null,
        status: "cold",
        source: "google_places",
        vertical: verticalKey,
        city: cityName,
        region,
        hours_json: r.regularOpeningHours?.periods ?? null,
        priority_tier: priorityTier,
        place_id: r.placeId,
      },
      { onConflict: "place_id", ignoreDuplicates: true }
    );

    if (!error) inserted++;
    else errors.push(`upsert ${r.displayName}: ${error.message}`);
  }

  await advanceCursor(combos.length);

  // Backfill sweep over the pre-existing backlog, then offer classification
  // (which runs after sourcing so today's inserts are eligible before this
  // afternoon's send-outreach cron picks leads).
  const backfill = await backfillEmailScrape();
  errors.push(...backfill.errors);

  const classification = await classifyLeads();
  errors.push(...classification.errors);

  return Response.json({
    combosProcessed: combos.map((c) => `${c.vertical.key}/${c.city.name}`),
    inserted,
    emailsScraped: scrapedEmails.filter(Boolean).length,
    emailScrapeAttempted: toScrape.length,
    backfillAttempted: backfill.attempted,
    backfillFound: backfill.found,
    classified: classification.classified,
    errors,
  });
}
