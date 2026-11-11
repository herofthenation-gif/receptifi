// Shared heuristic for telling a personal inbox (sarah@firm.com) apart from a
// role inbox (info@firm.com) or garbled non-name (grahamplumbinginc@...),
// using nothing but the local-part shape. Used both to decide the cold-email
// greeting (a person vs. "Hello,") and, in the scraper, to prefer a real
// decision-maker's address over a generic one when a page exposes both.

// Generic role inboxes we scrape off contractor/firm sites — never a person,
// so greeting one by whatever the local-part happens to spell out reads as
// broken personalization, not a name.
export const ROLE_INBOX_LOCAL_PARTS = new Set([
  "info", "contact", "contactus", "hello", "hi", "support", "help", "sales",
  "admin", "office", "front", "frontdesk", "reception", "receptionist",
  "billing", "accounts", "accounting", "hr", "jobs", "careers", "marketing",
  "media", "press", "general", "enquiries", "enquiry", "inquiries", "inquiry",
  "bookings", "booking", "appointments", "appointment", "team", "staff",
  "main", "mail", "webmaster", "noreply", "no-reply", "donotreply",
  "do-not-reply", "orders", "order", "shop", "store", "welcome", "concierge",
  "reservations", "reservation", "service", "services", "intake",
  "referrals", "referral", "scheduling", "schedule", "desk", "manager",
  "management", "owner", "staffing", "business", "company",
]);

const VOWEL_RE = /[aeiouy]/;

/**
 * True when the email's local part is shaped like a first name: a
 * contiguous run of letters, 2-10 chars, containing a vowel, not a known
 * role word. Below 2 or above 10 chars it's almost always garbled (a whole
 * business name mashed into one token) or a role word, not a first name.
 */
export function looksLikePersonalName(email: string): boolean {
  const localPart = email.split("@")[0]?.toLowerCase() ?? "";
  const firstToken = localPart.split(/[._+-]/)[0]?.replace(/\d+$/, "") ?? "";

  return !(
    !firstToken ||
    ROLE_INBOX_LOCAL_PARTS.has(firstToken) ||
    firstToken.length < 2 ||
    firstToken.length > 10 ||
    !/^[a-z]+$/.test(firstToken) ||
    !VOWEL_RE.test(firstToken)
  );
}

/** The detected first name, capitalized, or null if it doesn't look personal. */
export function personalNameFrom(email: string): string | null {
  if (!looksLikePersonalName(email)) return null;
  const localPart = email.split("@")[0]?.toLowerCase() ?? "";
  const firstToken = localPart.split(/[._+-]/)[0]?.replace(/\d+$/, "") ?? "";
  return firstToken[0].toUpperCase() + firstToken.slice(1);
}
