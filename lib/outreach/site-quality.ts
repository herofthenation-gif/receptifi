// Website quality classification for offer matching. Scrapes a lead's site
// via the Firecrawl API and scores it 0-6 (one point per signal below).
// FIRECRAWL_API_KEY comes from env — same pattern as RESEND_API_KEY.

export type WebsiteStatus = "none" | "outdated" | "good";

export interface QualitySignals {
  https: boolean;
  mobileViewport: boolean;
  bookingWidget: boolean;
  freshCopyright: boolean;
  multiPage: boolean;
  napCta: boolean;
  /** Most recent copyright year found on the page, if any. */
  copyrightYear: number | null;
}

export interface ScrapedSite {
  title: string | null;
  description: string | null;
  markdown: string | null;
}

export interface SiteQuality {
  status: WebsiteStatus;
  score: number;
  signals: QualitySignals | null;
  /** Page content kept for the preview-site generator (offer_type = web). */
  scrape: ScrapedSite | null;
}

const OUTDATED_MAX_SCORE = 2;
const FIRECRAWL_TIMEOUT_MS = 15_000;

// Booking/chat embeds and CTAs local businesses actually use. Presence of any
// one means the site can already capture a lead — feeds both the quality score
// and the reviews-vs-crm offer decision.
const BOOKING_SIGNAL_RE =
  /calendly|acuityscheduling|zocdoc|localmed|nexhealth|opentable|resy\.com|tock\.com|housecallpro|servicetitan|getjobber|getweave|podium|birdeye|intercom|drift\.com|tawk\.to|livechat|vagaro|booksy|squareup\.com\/appointments|book\s*(?:online|now)|(?:request|schedule|book)\s+(?:an?\s+)?(?:appointment|consultation|estimate|reservation)/i;

const CTA_RE = /book|schedule|appointment|call\s+(?:us|now|today)|contact\s+us|free\s+(?:quote|estimate|consultation)|get\s+a\s+quote/i;
const PHONE_RE = /(?:\(\d{3}\)\s*|\d{3}[-.\s])\d{3}[-.\s]\d{4}|tel:/i;
const ADDRESS_RE = /\b\d{5}(?:-\d{4})?\b|\b(?:ave(?:nue)?|blvd|boulevard|st(?:reet)?|suite|ste\.?|road|rd\.?|drive|dr\.?|lane|ln\.?)\b/i;

export interface FirecrawlResponse {
  success?: boolean;
  data?: {
    markdown?: string;
    html?: string;
    links?: string[];
    metadata?: { title?: string; description?: string; statusCode?: number };
  };
  error?: string;
}

async function firecrawlScrape(url: string): Promise<FirecrawlResponse["data"]> {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) throw new Error("FIRECRAWL_API_KEY is not configured");

  const res = await fetch("https://api.firecrawl.dev/v2/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      url,
      formats: ["markdown", "html", "links"],
      onlyMainContent: false,
      timeout: FIRECRAWL_TIMEOUT_MS,
    }),
    signal: AbortSignal.timeout(FIRECRAWL_TIMEOUT_MS + 5_000),
  });

  if (!res.ok) throw new Error(`firecrawl scrape failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
  const json = (await res.json()) as FirecrawlResponse;
  if (json.success === false || !json.data) throw new Error(`firecrawl scrape failed: ${json.error ?? "no data"}`);
  return json.data;
}

/** Most recent 4-digit year in any copyright notice, or null if none found. */
function latestCopyrightYear(html: string): number | null {
  const years: number[] = [];
  for (const m of html.matchAll(/(?:©|&copy;|copyright)[\s\w]{0,20}?((?:19|20)\d{2})(?:\s*[-–]\s*((?:19|20)\d{2}))?/gi) as Iterable<RegExpMatchArray>) {
    years.push(Number(m[1]));
    if (m[2]) years.push(Number(m[2]));
  }
  return years.length ? Math.max(...years) : null;
}

function countInternalPages(links: string[], siteUrl: string): number {
  let host: string;
  try {
    host = new URL(siteUrl).hostname.replace(/^www\./, "");
  } catch {
    return 0;
  }
  const paths = new Set<string>();
  for (const link of links) {
    try {
      const u = new URL(link, siteUrl);
      if (u.hostname.replace(/^www\./, "") !== host) continue;
      const path = u.pathname.replace(/\/$/, "");
      if (path) paths.add(path);
    } catch {
      // skip mailto:, tel:, malformed
    }
  }
  return paths.size;
}

/**
 * Classifies a lead's website for the offer decision. `websiteUrl = null`
 * short-circuits to status "none" without hitting Firecrawl. A site that
 * won't scrape at all counts as outdated (score 0) — if a scraper can't
 * load it, neither can a customer.
 */
export async function assessSiteQuality(websiteUrl: string | null): Promise<SiteQuality> {
  if (!websiteUrl) return { status: "none", score: 0, signals: null, scrape: null };

  const url = websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`;

  let data: FirecrawlResponse["data"];
  try {
    data = await firecrawlScrape(url);
  } catch (err) {
    if ((err as Error).message.includes("FIRECRAWL_API_KEY")) throw err;
    return {
      status: "outdated",
      score: 0,
      signals: null,
      scrape: null,
    };
  }

  return scoreScrapedSite(data, url);
}

/** Pure scoring over already-scraped content. Exported for offline testing. */
export function scoreScrapedSite(data: FirecrawlResponse["data"], url: string): SiteQuality {
  const html = data?.html ?? "";
  const markdown = data?.markdown ?? "";
  const links = data?.links ?? [];
  const haystack = `${html}\n${markdown}`;
  const copyrightYear = latestCopyrightYear(haystack);
  const currentYear = new Date().getFullYear();

  const signals: QualitySignals = {
    https: url.startsWith("https://"),
    mobileViewport: /<meta[^>]+name=["']viewport["']/i.test(html),
    bookingWidget: BOOKING_SIGNAL_RE.test(haystack),
    freshCopyright: copyrightYear != null && copyrightYear >= currentYear - 1,
    multiPage: countInternalPages(links, url) >= 3,
    napCta: PHONE_RE.test(haystack) && ADDRESS_RE.test(haystack) && CTA_RE.test(haystack),
    copyrightYear,
  };

  const score =
    Number(signals.https) +
    Number(signals.mobileViewport) +
    Number(signals.bookingWidget) +
    Number(signals.freshCopyright) +
    Number(signals.multiPage) +
    Number(signals.napCta);

  return {
    status: score <= OUTDATED_MAX_SCORE ? "outdated" : "good",
    score,
    signals,
    scrape: {
      title: data?.metadata?.title ?? null,
      description: data?.metadata?.description ?? null,
      markdown: markdown ? markdown.slice(0, 8_000) : null,
    },
  };
}
