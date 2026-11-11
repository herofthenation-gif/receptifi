#!/usr/bin/env tsx
/**
 * Reruns, on one business, the same research pass used by hand for
 * Enterprise Solar and Electrical: scrape the site for a real contact email
 * (reusing the actual outreach scraper, not a one-off regex), pull its
 * Google Places profile (rating, review count, hours, address), and, given
 * a search query, show where it actually ranks against its real competitors
 * for that query (not a dry "we assume you're not ranking" guess).
 *
 * Usage:
 *   npx tsx scripts/scout-lead.ts <website_url> --query "solar panel installation in Grand Terrace, CA"
 *   npx tsx scripts/scout-lead.ts <website_url> --name "Enterprise Solar and Electrical"
 *   npx tsx scripts/scout-lead.ts <website_url>   # site scrape only, no Places lookup
 */

import { readFileSync, existsSync } from "fs";
import path from "path";

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

import { scrapeContactEmail } from "../lib/outreach/email-scraper";
import { searchPlacesText } from "../lib/outreach/google-places";

function arg(flag: string): string | null {
  const i = process.argv.indexOf(flag);
  return i !== -1 ? process.argv[i + 1] ?? null : null;
}

async function fetchSiteBasics(url: string) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
    signal: AbortSignal.timeout(15000),
  }).catch(() => null);
  if (!res || !res.ok) return null;
  const html = await res.text();

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
  const description =
    html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1]?.trim() ?? null;

  // Pull raw lines mentioning a dollar amount — cheap, generic pricing signal
  // across any vertical rather than a parser tuned to one site's markup.
  const dollarLines = Array.from(
    new Set(
      (html.match(/[^<>{}]{0,80}\$[\d,]+(?:\.\d{2})?[^<>{}]{0,80}/g) ?? [])
        .map((s) => s.replace(/\s+/g, " ").trim())
        .filter((s) => s.length > 3)
    )
  ).slice(0, 15);

  return { title, description, dollarLines, html };
}

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error("Usage: npx tsx scripts/scout-lead.ts <website_url> [--query \"...\"] [--name \"...\"]");
    process.exit(1);
  }
  const query = arg("--query");
  const nameHint = arg("--name");

  console.log(`\n=== SITE: ${url} ===`);
  const site = await fetchSiteBasics(url);
  if (!site) {
    console.log("Could not fetch the site.");
  } else {
    console.log("Title:", site.title);
    console.log("Description:", site.description);
    if (site.dollarLines.length) {
      console.log("\nPricing mentions found on the page:");
      for (const line of site.dollarLines) console.log(" -", line);
    }
  }

  console.log("\n=== BEST CONTACT EMAIL (same logic the outreach system uses) ===");
  const email = await scrapeContactEmail(url);
  console.log(email ?? "none found");

  if (query) {
    console.log(`\n=== GOOGLE PLACES: "${query}" ===`);
    const results = await searchPlacesText(query);
    const baseDomain = url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
    results.forEach((r, i) => {
      const isTarget =
        (r.websiteUri && r.websiteUri.includes(baseDomain)) ||
        (nameHint && r.displayName.toLowerCase().includes(nameHint.toLowerCase()));
      const marker = isTarget ? " <== THIS BUSINESS" : "";
      console.log(
        `${i + 1}. ${r.displayName} — ${r.rating ?? "?"}★ (${r.userRatingCount ?? "?"} reviews)${marker}`
      );
    });
  } else if (nameHint) {
    console.log(`\n=== GOOGLE PLACES lookup for "${nameHint}" (no --query given, direct name search) ===`);
    const results = await searchPlacesText(nameHint);
    const top = results[0];
    if (top) {
      console.log("Name:", top.displayName);
      console.log("Rating:", top.rating, `(${top.userRatingCount} reviews)`);
      console.log("Phone:", top.nationalPhoneNumber);
      console.log("Address:", top.formattedAddress);
      console.log("Hours:", JSON.stringify(top.regularOpeningHours?.periods ?? null));
    } else {
      console.log("No match found.");
    }
  } else {
    console.log("\n(no --query or --name given, skipped Google Places lookup)");
  }

  console.log("");
}

main().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
