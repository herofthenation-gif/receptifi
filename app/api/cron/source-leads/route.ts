import { supabaseAdmin } from "@/lib/supabase-admin";
import { assertCronAuth } from "@/lib/outreach/cron-auth";
import { searchPlacesText } from "@/lib/outreach/google-places";
import { scrapeContactEmail } from "@/lib/outreach/email-scraper";
import { nextCombos, advanceCursor } from "@/lib/outreach/cursor";
import { computePriorityTier } from "@/lib/outreach/priority";
import { SOURCING_BATCH_SIZE } from "@/lib/outreach/config";

export const maxDuration = 120;

const MAX_EMAIL_SCRAPES_PER_RUN = 10;

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

  return Response.json({
    combosProcessed: combos.map((c) => `${c.vertical.key}/${c.city.name}`),
    inserted,
    emailsScraped: scraped,
    errors,
  });
}
