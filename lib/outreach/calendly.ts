import { createHmac, timingSafeEqual } from "crypto";

// Calendly sends "Calendly-Webhook-Signature: t=<unix_ts>,v1=<hex hmac>".
// Verify against current Calendly docs at deploy time — this reflects their
// documented HMAC-SHA256-over-`${t}.${rawBody}` scheme as of last check.
const MAX_SKEW_SECONDS = 300;

export function verifyCalendlySignature(rawBody: string, header: string | null): boolean {
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (!header || !signingKey) return false;

  const parts: Record<string, string> = {};
  for (const kv of header.split(",")) {
    const [k, v] = kv.split("=");
    if (k && v) parts[k] = v;
  }
  const { t, v1 } = parts;
  if (!t || !v1) return false;

  const tsSeconds = Number(t);
  if (!Number.isFinite(tsSeconds)) return false;
  if (Math.abs(Math.floor(Date.now() / 1000) - tsSeconds) > MAX_SKEW_SECONDS) return false;

  const expectedHex = createHmac("sha256", signingKey).update(`${t}.${rawBody}`).digest("hex");
  const expected = Buffer.from(expectedHex, "hex");
  const actual = Buffer.from(v1, "hex");
  if (expected.length !== actual.length) return false;

  return timingSafeEqual(expected, actual);
}
