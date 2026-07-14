// Ports outreach/scrape_emails.py: fetch a business's homepage (+ common
// contact-page paths) and regex-extract a usable contact email.

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const SKIP_DOMAINS = [
  "example.com",
  "domain.com",
  "yourdomain.com",
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
  // Website builders / hosts that embed their own support address in the
  // sites they serve (a Webador-built lead site got support@webador.com
  // scraped as the business's contact on 2026-07-14 — cold email opened a
  // Webador support ticket). The bare-name entries rely on the substring
  // match below to cover every TLD (webador.com, webador.nl, ...).
  "webador",
  "wix.com",
  "weebly",
  "jimdo",
  "duda.co",
  "webflow",
  "webnode",
  "site123",
  "strikingly",
  "shopify",
  "ionos",
  "one.com",
  "hostinger",
  "hostgator",
  "bluehost",
  "networksolutions",
  "register.com",
  "web.com",
  "vistaprint",
  "hibu.com",
  "thryv",
  "gohighlevel",
  "leadconnectorhq",
  "mailchimp",
];

// Addresses that deliver nowhere useful even on the business's own domain.
const SKIP_LOCAL_PARTS = [
  "noreply",
  "no-reply",
  "donotreply",
  "do-not-reply",
  "postmaster",
  "mailer-daemon",
  "abuse",
];

// Retina asset naming (logo@2x.png, hero@3x.jpg) and other static-file
// references regex-match the email pattern since the file extension looks
// like a TLD. Reject anything ending in a known non-TLD extension.
const FILE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "svg",
  "webp",
  "ico",
  "pdf",
  "css",
  "js",
  "woff",
  "woff2",
  "ttf",
  "eot",
  "mp4",
  "webm",
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
    const [localPart, domain] = lower.split("@");
    if (!domain) continue;
    if (SKIP_DOMAINS.some((skip) => domain === skip || domain.includes(skip))) continue;
    if (SKIP_LOCAL_PARTS.some((skip) => localPart === skip || localPart.startsWith(`${skip}+`))) continue;
    const tld = domain.split(".").pop() ?? "";
    if (FILE_EXTENSIONS.includes(tld)) continue;
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
