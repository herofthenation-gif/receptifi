import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Lead } from "@/lib/supabase";
import { assertCronAuth } from "@/lib/outreach/cron-auth";
import { searchPlacesText } from "@/lib/outreach/google-places";
import { scrapeContactEmail } from "@/lib/outreach/email-scraper";
import { nextCombos, advanceCursor } from "@/lib/outreach/cursor";
import { computePriorityTier } from "@/lib/outreach/priority";
import { SOURCING_BATCH_SIZE } from "@/lib/outreach/config";
import { assessSiteQuality } from "@/lib/outreach/site-quality";
import { decideOffer } from "@/lib/outreach/offer";
import { buildGeneratedSite, buildPreviewSlug } from "@/lib/outreach/site-generator";

// Firecrawl scrapes (15s timeout each) dominate the classification budget.
export const maxDuration = 300;

const MAX_EMAIL_SCRAPES_PER_RUN = 10;
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

export async function GET(req: Request) {
  const authError = assertCronAuth(req);
  if (authError) return authError;

  const combos = await nextCombos(SOURCING_BATCH_SIZE);
  let inserted = 0;
  let scraped = 0;
  const errors: string[] = [];

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

      const hasWebsite = !!r.websiteUri;
      let email: string | null = null;
      if (hasWebsite && scraped < MAX_EMAIL_SCRAPES_PER_RUN) {
        email = await scrapeContactEmail(r.websiteUri!);
        scraped++;
      }

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
          website: r.websiteUri ?? null,
          address: r.formattedAddress || null,
          rating: r.rating ?? null,
          review_count: r.userRatingCount ?? null,
          status: "cold",
          source: "google_places",
          vertical: vertical.key,
          city: city.name,
          region: city.region,
          hours_json: r.regularOpeningHours?.periods ?? null,
          priority_tier: priorityTier,
          place_id: r.placeId,
        },
        { onConflict: "place_id", ignoreDuplicates: true }
      );

      if (!error) inserted++;
      else errors.push(`upsert ${r.displayName}: ${error.message}`);
    }
  }

  await advanceCursor(combos.length);

  // Offer classification runs after sourcing so today's inserts are eligible
  // before this afternoon's send-outreach cron picks leads.
  const classification = await classifyLeads();
  errors.push(...classification.errors);

  return Response.json({
    combosProcessed: combos.map((c) => `${c.vertical.key}/${c.city.name}`),
    inserted,
    emailsScraped: scraped,
    classified: classification.classified,
    errors,
  });
}
