// Ports outreach/scrape_emails.py: fetch a business's homepage (+ common
// contact-page paths) and regex-extract a usable contact email.

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const SKIP_DOMAINS = [
  "example.com",
  "sentry.io",
  "wixpress.com",
  "squarespace.com",
  "wordpress.com",
  "godaddy.com",
  "amazonaws.com",
  "cloudflare.com",
  "google.com",
  "facebook.com",
  "yelp.com",
  "healthgrades.com",
  "zocdoc.com",
  "doctorallia.com",
  "webmd.com",
  "w3.org",
];

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

async function fetchText(url: string, timeoutMs = 8000): Promise<string | null> {
  try {
    const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(timeoutMs) });
    if (!res.ok) return null;
    const text = await res.text();
    return text.slice(0, 50_000); // cap at 50KB
  } catch {
    return null;
  }
}

function extractEmails(html: string): string[] {
  const found = html.match(EMAIL_RE) ?? [];
  const results: string[] = [];
  for (const raw of found) {
    const lower = raw.toLowerCase();
    const domain = lower.split("@")[1];
    if (!domain) continue;
    if (SKIP_DOMAINS.some((skip) => domain === skip || domain.includes(skip))) continue;
    if (!results.includes(lower)) results.push(lower);
  }
  return results;
}

export async function scrapeContactEmail(websiteUrl: string): Promise<string | null> {
  const trimmed = websiteUrl.replace(/\/$/, "");
  const baseUrl = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
  const baseDomain = baseUrl.split("//")[1]?.split("/")[0]?.replace(/^www\./, "") ?? "";

  let html = await fetchText(baseUrl);
  let emails = html ? extractEmails(html) : [];

  if (emails.length === 0) {
    for (const path of ["/contact", "/contact-us", "/contact.html", "/about"]) {
      html = await fetchText(baseUrl + path);
      if (html) {
        emails = extractEmails(html);
        if (emails.length) break;
      }
    }
  }

  if (emails.length === 0) return null;

  // Prefer gmail or domain-matching addresses over generic/info@ ones.
  for (const e of emails) {
    if (e.includes("@gmail.com") || (baseDomain && e.includes(baseDomain))) return e;
  }
  return emails[0];
}
