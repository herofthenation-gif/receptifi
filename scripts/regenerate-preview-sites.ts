#!/usr/bin/env tsx
/**
 * One-off backfill: rebuilds generated_site for every existing offer_type
 * "web" lead using the current buildGeneratedSite logic. Needed because
 * classifyLeads() (app/api/cron/source-leads/route.ts) only classifies a
 * lead once (quality_checked_at gate) — leads classified before the
 * garage_door/electrical/restoration vertical content and the real-review
 * testimonial were added are stuck with the old generic output forever
 * unless rebuilt here.
 *
 * Does NOT re-scrape the lead's existing website (no Firecrawl calls, no
 * cost) — for the "outdated website" subset this means the about paragraph
 * falls back to the vertical template instead of scraped copy, which is an
 * acceptable tradeoff for the majority "no website on Google" case this is
 * really targeting. site_quality_score/website_status on the lead are left
 * untouched; only the generated_site JSON blob is rebuilt.
 *
 * Usage: npx tsx scripts/regenerate-preview-sites.ts [--dry-run]
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { buildGeneratedSite } from "../lib/outreach/site-generator";

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...rest] = trimmed.split("=");
    const value = rest.join("=").trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvLocal();

const DRY_RUN = process.argv.includes("--dry-run");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

async function main() {
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select(
      "id, business_name, name, vertical, city, phone, address, rating, review_count, hours_json, website, last_review_text, last_review_author, last_review_rating, preview_slug"
    )
    .eq("offer_type", "web")
    .not("preview_slug", "is", null);
  if (error) throw error;

  const leads = data ?? [];
  console.log(`${leads.length} web-offer leads to regenerate${DRY_RUN ? " (dry run)" : ""}`);

  let updated = 0;
  for (const lead of leads) {
    const generatedSite = buildGeneratedSite({
      businessName: lead.business_name ?? lead.name,
      vertical: lead.vertical,
      city: lead.city,
      phone: lead.phone,
      address: lead.address,
      rating: lead.rating,
      reviewCount: lead.review_count,
      hours: lead.hours_json,
      websiteUrl: lead.website,
      scrape: null,
      qualitySignals: null,
      latestReview: lead.last_review_text
        ? {
            text: lead.last_review_text,
            author: lead.last_review_author ?? "a customer",
            rating: lead.last_review_rating ?? lead.rating ?? 5,
          }
        : null,
    });

    if (DRY_RUN) {
      console.log(`would update ${lead.business_name ?? lead.name} (${lead.preview_slug})`);
      updated++;
      continue;
    }

    const { error: updateError } = await supabaseAdmin
      .from("leads")
      .update({ generated_site: generatedSite })
      .eq("id", lead.id);
    if (updateError) {
      console.error(`ERR ${lead.business_name ?? lead.name}: ${updateError.message}`);
      continue;
    }
    updated++;
  }

  console.log(`${DRY_RUN ? "Would update" : "Updated"} ${updated}/${leads.length}`);
}

main();
