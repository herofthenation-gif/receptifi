import fs from "fs";

interface EnrichedLead {
  id: string;
  business_name: string | null;
  name: string;
  vertical: string;
  city: string;
  phone: string;
  website: string | null;
  rating: number | null;
  review_count: number | null;
  place_id: string | null;
  status: string;
  hasWebsite: boolean;
  bookingWidget: boolean | null;
  napCta: boolean | null;
  complaintQuote: string | null;
  leaderName: string | null;
  leaderReviewCount: number | null;
  leaderRating: number | null;
  marketRank: number | null;
  painScore: number;
}

const VERTICAL_LABEL: Record<string, string> = {
  med_spa: "Med Spa",
  legal_intake: "Law Firm",
  real_estate: "Real Estate",
};

const UNIT: Record<string, string> = {
  med_spa: "appointment",
  legal_intake: "case",
  real_estate: "deal",
};

function buildFacts(l: EnrichedLead): string[] {
  const facts: string[] = [];
  const unit = UNIT[l.vertical] ?? "lead";

  if (!l.hasWebsite) {
    facts.push(`No website at all — every ${unit} inquiry has to find them by phone or a Google listing alone.`);
  } else if (l.bookingWidget === false) {
    facts.push(`Website has no online booking/scheduling widget — every ${unit} still has to be caught live on the phone to convert.`);
  }

  if (l.marketRank == null) {
    facts.push(`Outside the top 20 results for "${l.vertical === "med_spa" ? "med spa" : l.vertical === "legal_intake" ? "law firm" : "real estate agent"} in ${l.city}" — invisible to anyone searching cold.`);
  } else if (l.marketRank > 5) {
    facts.push(`Ranks #${l.marketRank} in ${l.city} search results, behind ${l.leaderName} (${l.leaderReviewCount} reviews, ${l.leaderRating}★).`);
  }

  if (l.complaintQuote) {
    facts.push(`A real client review flagged a follow-up gap: "${l.complaintQuote}"`);
  }

  const reviewGap = (l.leaderReviewCount ?? 0) - (l.review_count ?? 0);
  if (reviewGap > 100) {
    facts.push(`${l.review_count ?? 0} reviews vs. the category leader's ${l.leaderReviewCount} — a ${reviewGap}-review gap that compounds every month it's not addressed.`);
  }

  if (facts.length === 0) {
    facts.push(`Established review base (${l.review_count ?? "?"} reviews) but no automated intake — still relying on manual phone pickup to not lose ${unit}s.`);
  }

  return facts;
}

function buildOpener(l: EnrichedLead): string {
  const label = VERTICAL_LABEL[l.vertical] ?? l.vertical;
  const unit = UNIT[l.vertical] ?? "lead";
  const facts = buildFacts(l);
  const leadFact = facts[0];

  let hook: string;
  if (!l.hasWebsite) {
    hook = `You don't have a website up right now, which means every ${unit} that doesn't already have your number by word of mouth is going to whoever comes up first on Google.`;
  } else if (l.bookingWidget === false) {
    hook = `I checked your site — there's no online booking on it. Every ${unit} still has to catch someone live on the phone to actually convert, which means after-hours and busy-moment inquiries are just gone.`;
  } else if (l.complaintQuote) {
    hook = `I pulled your reviews. One of them called out a follow-up gap: "${l.complaintQuote}" That's not a one-off, that's a system problem.`;
  } else {
    hook = `You're at ${l.review_count ?? "a solid number of"} reviews but still running intake manually. ${l.leaderName ? `${l.leaderName} is ahead of you in ${l.city} search results at ${l.leaderReviewCount} reviews` : "The businesses ahead of you"} because they've automated what you're still doing by hand.`;
  }

  return `"Hi, is this the owner?" [wait]
"My name's Karmello, I build done-for-you systems for ${label.toLowerCase()} businesses — lead capture, follow-up, retention, that side of the operation. ${hook} I build and run that as a monthly retainer, so it's not a one-time fix that decays. Worth 20 minutes this week to walk through what I found on your setup specifically?"`;
}

function buildOutcomeLine(): string {
  return "- **Outcome:** ______  (booked / callback / no / vm x__)";
}

function main() {
  const leads: EnrichedLead[] = JSON.parse(fs.readFileSync("scripts/.tmp-ht-selected.json", "utf-8"));

  const header = `# Call Sheet: 100 High-Ticket Leads (Med Spa / Law Firm / Real Estate)
Built 2026-08-24. Sourced from live site scans (Firecrawl), Google review mining, and Google Maps search-rank benchmarking against the category leader in each lead's own city — same methodology as the 7/14-7/15 trades call sheet, applied here to the high-ticket track.

**Offer, per the 2026-08-12 pivot:** lead with the $4k+/mo done-for-you retainer as the main ask — this track was sourced specifically for businesses that can plausibly pay it (established review counts, already spending on client acquisition). The $700 audit is the fallback if they're not ready to commit to a retainer on the first call; don't lead with it.

**Wedge:** free 20-minute call first, built around the specific gap found on their own site/reviews (below), retainer pitched live on that call — not a warm-up freebie, a diagnostic that already shows them something real about their own business.

## Objections
- "How much does this cost?" > "The call's free — it's just me walking you through what I found on your setup. If it's a fit, the retainer's $4k+ a month depending on scope, and I'll lay that out on the call, not before."
- "I'm not looking to spend that much." > "Totally fair — I also do a $700 one-time audit if you want the findings without the ongoing build. Most people start there if the retainer's too much right now."
- "Send me something first." > "I'll text you the specific gap I found on your site after we hang up. But the actual plan makes more sense walked through live — 20 minutes, this week?"
- Voicemail: "Karmello here, I build lead-capture and follow-up systems for [vertical] businesses. I looked at your site/reviews and found something specific worth 20 minutes. Call me back at [your cell]." Log it, call again in 2 days.

## How These Leads Are Scored
Every lead is pain-scored and sorted highest first, so you're calling the businesses missing the most fundamentals before anyone else:
- **No website at all:** +6 (heaviest signal, can't be found or booked online at all)
- **Has a website but no online booking:** +3 (still phone-only to convert)
- **A real negative review about follow-up/responsiveness:** +4 (pulled from their actual Google reviews)
- **Search rank vs. the category leader** (SEO/visibility): +3 outside the top 20, +2 if ranked below #10, +1 if ranked below #3
- **Review-count gap vs. the #1 result:** +2 if the gap is 200+, +1 if 50+

## The 100

`;

  const cards = leads.map((l, i) => {
    const name = l.business_name ?? l.name;
    const label = VERTICAL_LABEL[l.vertical] ?? l.vertical;
    const facts = buildFacts(l);
    const opener = buildOpener(l);
    return `### ${i + 1}. ${name}  (${l.city}, ${label})
- **Phone:** ${l.phone}
- **Website:** ${l.website ?? "none found"}
- **Reviews:** ${l.review_count ?? "?"} (${l.rating ?? "?"}★)${l.marketRank ? `, ranks #${l.marketRank} in ${l.city} search` : ""}
- **The gaps found:**
${facts.map((f) => `  - ${f}`).join("\n")}
- **Say this:**
${opener.split("\n").map((line) => `  ${line}`).join("\n")}
${buildOutcomeLine()}
`;
  });

  const out = header + cards.join("\n");
  fs.writeFileSync("outreach/call_sheet_2026-08-24.md", out);
  console.log(`Wrote outreach/call_sheet_2026-08-24.md — ${leads.length} leads.`);
}

main();
