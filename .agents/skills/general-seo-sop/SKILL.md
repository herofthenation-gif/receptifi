---
name: general-seo-sop
description: Karmello's General SEO SOP for Receptifi and its clients, a single-page site audit that outputs a ranked, visual fix report, plus an internal-links pass and a quick-win low-competition ranking play. Updated every Monday, paste a fresh version in and say "Update my skill with this" when a new one drops. Use whenever auditing a website for general SEO.
---

# General SEO SOP

Version: 2026-11-09. Updated every Monday. Last week's version is dead, get the new one in the best campus, the business campus.

How to use this: tell your AI to turn this file into a skill (on ChatGPT, put it in a project).

When an update drops, paste the whole post into your AI and say: "Update my skill with this. The new steps replace the old ones. Keep My Notes. Show me what changed." Then read what it changed.

Reported results from tests and case studies are examples, not promises. Where something is unproven, this SOP says so.

## What this gets you

A finished SEO audit of one website as a visual report, with a ranked fix list, and the top fixes done.

Plus a quick win: a number one ranking on Google for an easy phrase, in about a week, that you can show any prospect.

## Need to have

- The website address
- The client's main service and city or market

## Optional to have

- Access to Google Search Console and GA4. Without them you can still run the audit. Step 1 stays not checked.
- Access to the website. You only need this to make the fixes.

## Step 1: Check the measurement

This step needs Search Console and GA4. No access? Mark it not checked and go to step 2.

1. Search Console connected and verified. Set it up on day one if it isn't.
2. GA4 key events exist and fire. Submit one test yourself. Plenty of sites track no conversions at all, and then nobody can say whether SEO works.
3. Save a baseline with today's date: organic sessions, top pages, ranking keywords, conversions. Search Console showed a click spike around 31 Oct to 2 Nov 2026 that Google hasn't explained, with impressions flat. Leave those days out of the baseline and check them against GA4.

## Step 2: Check Google can read the site

1. Run `site:domain.com`. For a business site you want at least 30 relevant pages. Look at what is indexed: 30 on-topic pages beat 60 random blog posts.
2. Compare indexed pages to pages that should be indexed. If 60% or less is indexed, there is a problem. Find it before writing anything new.
3. Check robots.txt. It controls access only, and unknown rules get ignored silently. It does not control AI training.
4. Look for accidental noindex tags. Noindex the site's internal search pages.
5. Use HTTPS everywhere and one site version. Pick www or non-www and redirect the other.
6. Don't panic over 404s. Google says they cost no penalty and no crawl budget. Redirect only when a true replacement exists. Errors 500 and 429 do slow crawling, so fix those.
7. A money page that shows in Google with only its title, no description and no icon, may be returning an error. Google can keep an important page in the results for a while when it errors. Open it and fix it the same day.
8. After any launch or redesign, crawl with screenshots. A single JavaScript problem can render hundreds of pages blank to Google.
9. Check what is in the raw HTML. Open the page, view the source, and search for a phrase from a tab, accordion or slider. Not there? ChatGPT, Claude and Perplexity don't see it, because their crawlers don't run JavaScript, and Google may see it late. The title, meta description, canonical and robots tag must be in the source too. Reported: page builders can also drop text out of HTML tags. To test if Google reads a piece of text, put a unique phrase in it and search that phrase in quotes.
10. "Crawled, currently not indexed" in Search Console is common and often needs no action, Google says. Check your important pages one by one with URL Inspection, and leave the rest alone.

## Step 3: Check every money page

Walk through this in order:

1. **Title.** Hover the browser tab. Formula: BEST + main keyword + city + main services + near me if there's space. Go up to about 200 characters. Ignore the 60-character rule.
2. **Meta description.** Right language, keyword and city, and it sells the click. It's your ad in the results.
3. **Exactly one H1.** Main keyword plus city. Common bug: the logo is marked as an H1, so the page has several.
4. **H2s.** Secondary topics and main services.
5. **First 100 words.** Say what you do and where, in plain language.
6. **FAQ.** Keep the text fully visible. A controlled test showed visible text beating accordions by 12% in organic sessions.
7. **Links.** Clean URLs, no broken links in the navigation or footer, no orphan pages.
8. **Images.** Real alt text, compressed, under about 200 KB each.
9. **Mobile.** Open it on your phone. Readable, buttons tappable, phone number one tap away.
10. **Speed.** Test on pagespeed.web.dev, mobile. Under about 60, find the cause. You don't need 100.

## Step 4: Check the content

1. Every service gets its own page. Build one cluster completely before starting the next.
2. Run the swap check. Could a competitor put in their name and use the page? Then it says nothing. Add real prices, real jobs, real photos and real names.
3. Fact-check all AI text by hand. Google's rater guidance of 1 Oct 2026 looks at effort, originality, skill and accuracy.
4. Don't chase AI-detector scores. Reported: a study of 600,000 pages found almost no link between the score and rankings (correlation 0.11). Nobody tested whether lowering a score helps, and humanizer tools reportedly strip out useful detail. Check the content with the steps above instead.
5. Old lazy AI pages: clean up one section at a time, worst first, measure, then the next section.
6. Publish new pages at a steady pace. Reported: putting out many pages at once draws Google's attention to scaled content more than who wrote them. Start with a few pages a week and add more only while the new ones keep getting indexed.
7. Do the internal links pass below. Use normal words that a person would say.
8. Don't add site-wide anchors without reading them. Footer anchors can make a site that runs Google Ads look like it sells something it doesn't. That is one case, but cheap to check.

## Step 5: Check the links

1. Compare referring domains with the top 3 competitors.
2. Look for a sudden spike of cheap links with exact-match anchors. One reported case fell below its starting rankings after two Google updates.
3. Don't buy cheap link packages. Earn or place links on real sites in the niche.

## Internal links pass

Internal links are the links from one page of the site to another. They tell Google which pages matter and help a visitor find the next step. On a small business site this is often the cheapest fix in the whole audit.

You need access to the website to make the changes. Step 3 also needs Search Console. No access? Mark step 3 not checked and do the rest.

1. **Every link is a real link.** Google follows links that have a web address behind them. Some website builders make buttons that only run a script, and Google can't follow those. To check, right-click the button. If you see "Copy link address", it's a real link.
2. **Every important page gets a link from another page.** A page nothing links to is an orphan, and Google and visitors rarely reach it. Each service page and each location page needs at least one link from another relevant page. Two or three is better.
3. **Push the pages that almost rank.** In Search Console, open Performance, then Queries, and find searches where the site sits at position 4 to 20 with impressions coming in every week. Check which page ranks for each one. Add links to that page from two or three related pages on the site, with link text that says what the page is about. Start with the ones closest to the top 3. Reported as common practice, not a promise. Note the date and check again after a few weeks.
4. **Every blog post links to the service page it supports.** A post on how to fix a leaking tap links to the plumbing service page. Put the link where the reader needs the answer, not at the very bottom.
5. **Service pages and location pages link to each other.** Each service page links to the areas you cover. Each area page links back to its services.
6. **Proof links to the offer.** Reviews, case studies and before-and-after photos link to the service they prove, so a convinced visitor has a next step.
7. **Link text says where it goes.** Not "click here" or "read more". Name the service or the answer the next page gives. The best words are often the searches that page already ranks for in Search Console. Use them where the sentence already says it, and never rewrite a sentence just to fit a keyword in. Vary the wording from page to page, the way a person would.
8. **Fix broken links and links through a redirect.** A link to a page that no longer exists, or to an old address that redirects, gets pointed straight at the live page.
9. **Keep it light and check before you change.** Add 3 to 5 new links per page at most, spread through the text, not in headings. Link to the same page once per page, and never to the page itself. Have your AI show you a table first: page, link text, where it goes, and why. Check it, then make the changes, and log them under "Log every change" so you can undo one.

Every time a new page goes live, search the site for its topic and add a link to it from the older pages that mention it.

## Step 6: Turn the audit into a visual report

Text on a screen doesn't get read. Have your AI build the result as one web page you can read at a glance, on a phone too:

1. Open with the biggest finding in one plain sentence. Under it, the count of each status.
2. One status per step, in colour and in words: good, partly there, needs fixing, not checked yet.
3. The five fixes as ranked cards, one under the other: what's wrong, what to do.
4. What already works. A report with only problems reads like an attack.
5. Bars for the numbers that matter, such as how many pages have each problem out of all pages.
6. Every step in full at the bottom, in sections that fold open.
7. Show what you couldn't check as not checked. Never fill a gap with a guess or a made-up score.
8. Put the date on it. Build the same report after the fixes, so the client sees what moved.

Style, because a business owner reads this and not an SEO expert:

- Light background, dark text, lots of white space. No dark dashboard look.
- One friendly, readable font, at least 16 px. No small grey text.
- One main colour for fixes and bars. Soft green, amber and coral only for the statuses.
- Rounded cards with one thing on each. Don't squeeze them side by side.

If My Notes has your logo, colours or report style, use those instead.

## Quick win: number one on Google in about a week

Use this on yourself first, then on a client. A phrase almost nobody targets is easy to win, and a number one result is proof you can show anyone. This only works for low competition. Loans, insurance, mortgages and other big keywords never go this fast, so don't try.

On a site Google already visits, pages built this way have ranked in one to three days. A brand new site takes longer. These are examples, not promises.

You need access to the website and to Search Console.

### Step A: Brainstorm five phrases

Tell your AI: "Give me 5 phrases for [me or the client] that almost nobody targets, that would look good to rank number one for, and that would be very easy to rank for. Use the formula: superlative + what we do + our city."

Each of the five has to pass all four checks:

1. Low competition. Superlative plus service plus a real city clears most of it. Everybody fights over "best marketing agency". Almost nobody fights over "hardest working marketing agency in Leeds".
2. Nice to rank for. A customer should be impressed to see it at number one. Pick something that sells, not a joke.
3. Very easy to rank for. You check this in step B.
4. Something you can back up.

Superlatives that work: hardest working, most relentless, most qualified, best dressed. "Best" has more competition, so check it harder.

### Step B: Check each phrase and pick one

1. Open an incognito window, so your own history doesn't change the results.
2. Search each phrase in quotes, word for word. Quotes mean Google looks for that exact phrase.
3. What you want to see is Google saying: No results found for "your phrase". Then it's extremely easy to rank. Screenshot that, it's your before picture. A few results: still possible, look at them first. A list of real pages already targeting it: drop it.
4. Pick the one with the least competition that you would be proudest to show. Write it down word for word. You use it exactly like that everywhere below.
5. Don't take a phrase from an example you saw somewhere. Pick your own.

### Step C: Build one page around the phrase

Make a new page, not the homepage: domain.com/the-phrase. Your own domain is best because it builds trust. A free domain probably works too, because there is so little competition.

The whole page answers one question: who is the [phrase]? Put the exact phrase in:

1. The title tag: the phrase, a colon, then the name.
2. The H1.
3. The URL.
4. The meta description.
5. The body copy, 300 to 500 words, with real details about the person or business.
6. The alt text of the images.

Person schema is a bonus, not a must. Your AI can write the page: give it the phrase, this list and real background. At this level of competition the copy doesn't have to be great. The six spots have to be right.

### Step D: Get Google to find it

With no competition, the only job is getting found. Do all four:

1. Link to the page from the homepage, with the phrase in the link text. Not "click here".
2. Set up and verify Search Console.
3. Submit the sitemap in Search Console. Most website builders make one for you. No sitemap? Have your AI build an XML sitemap.
4. Request indexing for the page in Search Console.

On a site Google already visits, the homepage link alone is often enough. Do all four anyway.

### Step E: Cement it with your own profiles on big sites

Optional, but it fills more of the results page with you and sends links back to your page. Use your own accounts, or the client's, with real content:

1. A short YouTube video with the phrase as its title, linking to the page.
2. A LinkedIn article about the phrase, linking to the page.
3. A Medium article about the phrase, linking to the page.

Your AI can write the articles and a script for the video. You don't need all three. Given enough time and enough of these, you may start ranking for the phrase without quotes, and AI answers may start naming you. That's reported, not guaranteed.

### Step F: Check, fix, show

1. Check in an incognito window, phrase in quotes.
2. Not found at all: the page isn't indexed. Redo step D, or add another link from a real page. Any step E link counts.
3. Indexed but not in the top 3: check the six spots in step C. Most of the time the phrase has too much competition. Go back to step B and pick another one.
4. After indexing, give it a few days before you change anything.
5. Number one: take a screenshot with the date. Show prospects and tell them to look it up. If you can do it for yourself, you can do it for them.

Done means: phrase checked in quotes, page live with the phrase in all six spots, linked from the homepage, indexing requested, dated incognito screenshot of you at number one.

## If traffic dropped, do this instead

1. Check manual actions in Search Console.
2. Line up the drop with Google's update dates. A devaluation usually shows in the first 1 to 2 weeks of an update.
3. Crawl the site.
4. Search the brand name. A site that doesn't rank for its own name is almost always under a Google action.
5. Check organic and local results separately. They can move apart.
6. Strengthen where the site still ranks before chasing the biggest losses.

## What you hand the client

The visual report from step 6, with: where they stand today, the five fixes that make the most money, what you already fixed, and what's next. Plain words, no jargon.

## Done means

- Baseline saved with a date, if you have the access
- Indexing checked
- Every money page walked through
- Fix list ranked, top fixes done
- Internal links pass done: real links, no orphan pages, pages at 4 to 20 linked to, or step 3 marked not checked
- Visual report sent to the client

## Log every change

Keep one line per change: page, what changed, date, why. Look again after 3 months. Without this you will never know what worked.

## My Notes

(Your prices, your clients, what worked. Your AI keeps this part when it updates the skill.)

**Receptifi's own site audit, run 2026-11-08** (against the prior SOP version, before this 2026-11-09 update), full report saved as `outreach/general_seo_audit_receptifi_2026-11-08.html`. Headline finding: Google has indexed zero pages of receptifi.net, confirmed via `site:receptifi.net` returning nothing and a unique-phrase search also returning nothing, despite no technical block found (no noindex, robots.txt doesn't exist but isn't blocking, Googlebot gets 200, sitemap is valid). Other ranked fixes from that pass: no GA4 key events/conversions fire (only pageviews), no page title includes a city, `/platform` and `/services` (the two paid-offer pages) have titles/H1s with no keyword or city at all ("Systems | Receptifi", "Coaching | Receptifi"), and zero real photos anywhere on the site.

**Fix #1 progress, 2026-11-09:** Search Console turned out to already be set up and verified for `https://www.receptifi.net/` (not new, contrary to what the 2026-11-08 audit assumed from outside signals alone, a reminder to check Search Console directly before concluding it's missing). Real data pulled from it: 3 months of Performance history, 0 clicks, 8 impressions, average position 17.4, and the Pages report showed 1 of 6 known pages indexed, 5 not indexed under "Discovered, currently not indexed" (`/book`, `/case-studies`, `/platform`, `/privacy`, `/services`, first detected 10/23/26). The 5 new SOP pages weren't in Google's known-pages list at all yet, since that data predates their 2026-11-08 launch.

Actions taken same day: resubmitted `sitemap.xml` in Search Console (was last read 11/1/26, stale relative to the current 11-page sitemap), then requested indexing individually via URL Inspection for all 10 relevant pages, the original 5 stuck ones plus the 5 new SOP pages. Re-crawl isn't instant, expect hours to a few days before the Pages report reflects it. Next check: come back to the Pages report in a few days and confirm the indexed count actually moved past 1.

**Fix #2, GA4 key event, done 2026-11-09:** `/book`'s submit handler now fires a `generate_lead` GA4 event (tagged with lead source) right after a successful lead save, previously only pageviews fired. Added `global.d.ts` for a typed `window.gtag`. Still needs a manual, non-code step: in GA4 Admin > Events, mark `generate_lead` as a key event once real submissions start firing it.

**Fix #3, city in titles, done 2026-11-09:** added "in the Inland Empire" to all 7 live page titles (home, services, ai-seo, general-seo, local-seo, google-ads, meta-ads). `/platform` and `/case-studies` were excluded, Karmello is mid-restructure on those (intentional cleanup of filler content across the site, confirmed 2026-11-09, not an accident), revisit their titles once that settles.

**Fix #4 (platform/services title-and-H1 rewrite) status:** partially overtaken by events. `/platform` no longer exists as of the in-progress site cleanup. `/services` still exists; its title got the city fix above, but its H1 ("Learn to build it yourself.") still carries no keyword or city, that part of fix #4 is still open for `/services` specifically.

**Fix #5 (zero real photos) status:** still open, needs an actual photo from Karmello, not something fixable in code.

**Notable connection to the Quick Win section:** this version's own example phrase, "hardest working marketing agency in Leeds," is nearly identical to Receptifi's actual live homepage title, "Hardest-Working Marketing Agency for Local Service Businesses | Receptifi," decided independently earlier in this project before this SOP update existed. Worth running the actual Quick Win play (Steps A-F) once Search Console is live, a real low-competition phrase check (e.g. "hardest working marketing agency inland empire") could turn this into a literal, provable #1 ranking fast, and ties directly into the Search Console setup already underway.

**Tension to flag:** this version's new Step 4.6 says to publish new pages at a steady pace, not all at once, because a burst of pages draws scrutiny toward scaled content. Receptifi published all 5 new service pages (`/ai-seo`, `/general-seo`, `/local-seo`, `/google-ads`, `/meta-ads`) in a single batch on 2026-11-08, before this guidance existed. Can't undo that, but worth knowing it goes against the current version's advice, and worth pacing out any future page launches.

No Search Console access confirmed yet for receptifi.net, only GA4 (wired in 2026-11-07, confirmed receiving real-time data). Step 1 stays partly not-checked until Search Console is connected.

## What changed

- 2026-11-02: First version.
- 2026-11-02: Swap test split into two checks, AI-detector scores dropped from the content check, visual report added as step 6.
- 2026-11-02: How to use this now says to keep the SOP as a skill and update it from each post.
- 2026-11-02: Step 6 now sets the report's layout and style, and your own style in My Notes wins.
- 2026-11-02: City swap check moved to the Local SEO SOP. What you need split into need to have and optional to have, so step 1 can stay not checked.
- 2026-11-09: How to use this cut down to the skill and the update.
- 2026-11-09: Step 1 leaves the unexplained click spike of 31 Oct to 2 Nov 2026 out of the baseline.
- 2026-11-09: Step 2 adds money pages that show only a title, the raw HTML check, and "Crawled, currently not indexed".
- 2026-11-09: Step 4 adds publishing at a steady pace.
- 2026-11-09: Internal links pass added: real links, no orphan pages, push the pages at 4 to 20, blog to service, service to location, proof to offer, clear link text, fix broken links, a few links per page checked before you change anything.
- 2026-11-09: Quick win added: brainstorm five low-competition phrases, check them, build one page, get it indexed, cement it with your own profiles, check and show.
