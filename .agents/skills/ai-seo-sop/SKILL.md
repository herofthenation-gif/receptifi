---
name: ai-seo-sop
description: Karmello's AI SEO SOP for Receptifi and its clients, getting a business named and cited by ChatGPT, Google AI Mode, Perplexity, Gemini, Claude and Grok. Updated every Wednesday, paste a fresh version in and say "Update my skill with this" when a new one drops. Use whenever doing AI-search visibility work.
---

# AI SEO SOP

Version: 2026-11-11. Updated every Wednesday. Last week's version is dead, get the new one in the best campus, the business campus.

How to use this: tell your AI to turn this file into a skill (on ChatGPT, put it in a project).

When an update drops, paste the whole post into your AI and say: "Update my skill with this. The new steps replace the old ones. Keep My Notes. Show me what changed." Then read what it changed.

Goal: get a business named and cited by ChatGPT, Google AI Mode, Perplexity, Gemini, Claude and Grok.

Be honest with the client. AI search is small for traffic and bigger for decisions. Measurement is weak. Sell being recommended, not a traffic promise.

## What this gets you

A dated baseline of where the client appears in AI answers, a list of pages to build, a list of sites to get onto, and the first fixes done.

## What you need first

- The website, and access to it
- Search Console and GA4
- The client's services and their real money terms
- Sales calls, support tickets or customer questions if they have them

## Step 1: Do the foundations first

Skip this and nothing else works.

1. Open `domain.com/robots.txt`. Look for blocks on GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot and Bingbot.
2. Check the CDN or firewall separately. Cloudflare can block AI bots without touching robots.txt.
3. Check that the content is in the raw HTML. The crawlers behind ChatGPT, Claude and Perplexity don't run JavaScript. Open view-source and search for a phrase from a tab, an accordion or a lower section. If it isn't there, they don't see it. The title, description, canonical and robots tag must be in the server response too. This matters most on Framer, Wix and other JavaScript-heavy builders.
4. Create an AI referral channel in GA4.
5. Add "How did you hear about us?" to the enquiry form. This is the most valuable item on this page.
6. Check that GA4 key events fire.
7. Claim the client's business in ChatGPT (Businesses in ChatGPT, in Business Hub, beta), where it is open. Verify by a text or call to the main business number, or by DNS. It shows how often ChatGPT mentions the business, clicks to the site, and the topics of conversations that cite the site. Claiming is reported to help ChatGPT get the facts right, not to earn recommendations on its own.

## Step 2: Take the baseline

1. Write 20 to 30 prompts a real buyer would ask, in full sentences.
2. Run each one in incognito on ChatGPT, Google AI Mode, Perplexity, Gemini, Claude and Grok.
3. For each one, log the brands named, the sources cited, the source type, and how the client is described.
4. Log the gaps: mentioned but not cited, competitor named and not us, topic owned by someone else.
5. Date it and save it. Repeat monthly. Answers vary, so run each prompt 5 to 10 times per assistant and record the share of runs that name the client. Report that share, not one answer.
6. Search the client's brand name on Google on a desktop. Where the Knowledge Panel used to be, Google is reported to now show an AI summary for many brands. Log what it says about the client and what it gets wrong. It is built from the site, the Business Profile, reviews and mentions on other sites.

## Step 3: Pick the right targets

1. Write down what the owner thinks buyers ask, before you open any tool.
2. Mine real questions from sales calls, support tickets, chat, Reddit, Search Console and People Also Ask.
3. For each topic ask: can an assistant answer this fully without a click?
   - Yes: go for the mention.
   - No (tools, calculators, near me, buying): go for the click.
4. Group prompts by intent. Pick the top 10.

Note: Google's internal AI fan-out searches do not show in Search Console. Use Perplexity's visible follow-up questions to see what AI goes looking for.

## Step 4: Reverse-engineer the answer

For each top prompt:

1. Open every cited source. Classify it: listicle, comparison, review, Reddit, YouTube, directory, homepage, forum.
2. The most common type is the asset to build.
3. Build a list of cited pages where the client could be added.
4. Build a list of content the client must publish.

## Step 5: Build the pages AI goes looking for

1. Run the client's main question through Perplexity. Note repeated follow-ups like "[brand] price", "[brand] reviews", "[competitor] alternative".
2. Build those pages first. Bottom-of-funnel pages before informational posts.
3. On X vs Y pages, put the comparison in the first H2.
4. Put prices on the page. Build pricing guides ("[service] cost in [city]": what's included, what changes the price).
5. Add the specifics: who it's for and who it isn't for, materials, specs, limits, certifications.

Every page gets: a short answer in the first screen, sections that make sense alone, one idea per sentence, real named products and places, a visible FAQ, an author with real credentials, sources for factual claims, and no filler.

Make the About page detailed: history, the people, what the business does and for whom. Reported: on one large site the About page was cited five times more than the homepage in AI Overviews and AI Mode.

## Step 6: Get mentioned on other sites

1. Work through the list from step 4. Getting onto pages AI already cites is reported to work without links.
2. Pitch third-party lists, press and podcasts.
3. Don't rank your own "best X" list with yourself at number 1. Data suggests Google cites those about half as often, and often drops your brand from the answer.
4. Use real, identified accounts on Reddit and forums. No sockpuppets, no fake reviews, no automation.
5. Publish YouTube videos. Say the keyword out loud and add chapters.

## Step 7: Reviews and directories

1. Reviews: roughly 80% on Google, 20% on the few other sites AI cites for that industry. These numbers are a rule of thumb.
2. Yelp reportedly matters for ChatGPT.
3. Ask for reviews that name the job and the outcome: "Could you share what we helped you with and what the outcome was?"
4. Fix wrong listings. AI repeats stale prices and old descriptions.
5. Use one plain sentence, "X does Y for Z", identically everywhere.
6. Write the Google Business Profile posts as job write-ups: the job, the town, the materials, what was hard. Reported to get quoted in Google's AI answer and in ChatGPT within a week, where offers and slogans were not.

## Step 8: Report honestly

1. Report the trend of AI referral traffic in GA4 and know that it undercounts.
2. Where the client is claimed in ChatGPT's Business Hub, report its mentions and clicks every month. It is OpenAI's own data, the first that shows from the source whether this work moves anything.
3. Report the prompt tracking from step 2, and direction rather than exact numbers.
4. Report what people say in "How did you hear about us?". This is the number that matters.
5. Search Console now has generative AI reports. Add them to client reporting.
6. If the site runs Microsoft Clarity, open Agent Activity. It shows which AI agents visit the site and whether they reach the contact and booking forms.
7. AI rank trackers are unreliable. Their API answers can differ from the app.

## Still unproven

- Schema for AI citations: sources disagree. Add it for normal SEO reasons, don't promise AI results.
- `llms.txt`: low priority, cheap, unproven.

## Stay away from

Fake press releases about made-up awards, hacks on LinkedIn hashtags and instant indexers, self-made Wikipedia entries. They can work for a day and then vanish, and they can burn a real client's name.

## What you hand the client

The dated baseline, the top 10 prompts, the pages you're building, the sites you're getting onto, and what you've already fixed.

## Done means

- Crawlers confirmed open
- "How did you hear about us?" live
- Baseline saved with a date
- First page built or first placement requested

## My Notes

(Your prices, your clients, what worked. Your AI keeps this part when it updates the skill.)

Receptifi's own site (not a client), status as of 2026-11-08, updated 2026-11-11:

- Step 1 (Foundations): done. robots.txt checked (no blocks, file didn't exist at all before, not a problem since no robots.txt means no blocks by default), no CDN/firewall blocks found in the repo, GA4 wired in (`G-7TWE8N52B0`) and confirmed receiving real-time data, "How did you hear about us?" field added to `/book` form, storing to the existing `leads.source` column. New from this version, not yet done: the raw HTML / view-source check (item 3) and claiming Receptifi in ChatGPT's Business Hub (item 7), both open.
- Step 2 (Baseline): one ChatGPT run logged in `outreach/ai_seo_baseline_2026-11-07.md`, 26 prompts, 0/26 mentioned Receptifi including all 3 brand-specific ones. Not yet repeated 5-10x per the SOP, and not yet run on the other 5 assistants. Important finding: 2 of the 5 "competitors" ChatGPT named (Obsidian AI Technologies, Aslan Intelligence) could not be verified to exist anywhere, likely hallucinations, always verify a named competitor via web search before trusting it.
- Step 3 (Targets): picked the 10 "no one named" prompts as the shortlist, split into click-intent vs mention-intent per the SOP's own framework.
- Step 4 (Reverse-engineer): the one real competitor found (Rahziel Digital) had a dead website (`rahzieldigital.com` has no DNS record), so nothing to reverse-engineer directly. But its DesignRush and Clutch directory profiles were what ChatGPT actually cited, that's the real finding to act on for Step 6.
- Step 5 (Build pages): done. 5 new pages shipped: `/ai-seo`, `/general-seo`, `/local-seo`, `/google-ads`, `/meta-ads`. Each has a direct-answer hero, 3-fact "what it means" section, Inland Empire framing, both Systems ($3,000/mo) and Coaching ($1,500/mo) paths, and a visible FAQ with schema. Was linked from `/platform` and `/services`, but `/platform` was deleted 2026-11-09 as part of an intentional, in-progress site cleanup Karmello is running in parallel, check those internal links still resolve once that settles. `/about` built 2026-11-11: founding story (lack of real marketing help for Inland Empire local service businesses), who's behind it (Karmello Robinson, solo, staying current across all 5 channels), and what/for whom (the 5-channel audit model, both plan prices). Kept to only what Karmello actually confirmed, no invented credentials or history. Added to `sitemap.ts`. Still open: claiming Receptifi in ChatGPT's Business Hub (Step 1, item 7), needs Karmello to do the verification himself (text/call to the business number or DNS).
- Step 6 (Get mentioned): in progress, tracked in `outreach/ai_seo_step6_mentions_2026-11-08.md`. Clutch profile submitted (under review, free, used PO Box 7943 Moreno Valley CA 92552 as the public HQ address). DesignRush paused, that signup requires naming 3 real clients and 3 real company photos to proceed, which Receptifi can't do honestly yet (no clients). GoodFirms not started, their stated vetting includes "at least two years in business," check Receptifi's incorporation date before applying. Pitches sent to 2 of 3 found listicles (Webtonic via LinkedIn to author Cedric Pharand, UFO Rocks via contact form), both awaiting response. Third listicle (GeeksForGrowth) dropped, dead link and not actually a company-naming list.
- Step 7 (Reviews/directories): blocked on having real clients for items 1-3 (nothing to request reviews for yet). Items 4-6 (fixing listings, one consistent description sentence, Business Profile job-writeup posts) are not client-dependent and are open to do.
- Pricing used consistently across all of this: Systems (done-for-you) $3,000/month, Coaching (DIY) $1,500/month. AI SEO is included in every Systems plan, no exceptions, per the site's own copy.
- Site title/description updated to lead with "marketing agency" framing rather than "AI consultant" framing, to match the actual 5-channel positioning (General SEO, Local SEO, Google Ads, Meta Ads, AI SEO). All 7 live page titles also now include "Inland Empire" (per the General SEO SOP audit, 2026-11-09).
- Chat widget (`app/api/chat/route.ts`) was still describing the old dental/Voice-Website-Reviews-CRM offer, rewritten to match the current 5-channel positioning and pricing, plus added error handling so a failed API call falls back gracefully instead of crashing.
- Google Search Console confirmed already set up and verified for receptifi.net (found 2026-11-09, contrary to an earlier assumption it wasn't). See the `general-seo-sop` skill's My Notes for the full indexing-fix detail, it's the same site, same Search Console property, relevant to both SOPs.

## What changed

- 2026-11-01: First version.
- 2026-11-02: How to use this now says to keep the SOP as a skill and update it from each post.
- 2026-11-04: Step 2 now runs each prompt 5 to 10 times and reports the share of runs, and adds a check of the AI summary Google shows for the brand name. Step 7 adds Business Profile posts written as job write-ups.
- 2026-11-11: Header cut to the short Version block. Step 1 adds the raw HTML check (AI crawlers don't run JavaScript) and claiming the business in ChatGPT's Business Hub. Step 5 adds a detailed About page. Step 8 adds the Business Hub mentions and clicks, and Microsoft Clarity's Agent Activity.
