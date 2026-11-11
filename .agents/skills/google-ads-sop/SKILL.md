---
name: google-ads-sop
description: Karmello's Google Ads SOP for Receptifi and its clients, local service business lead-gen Search campaigns. Updated every Tuesday, paste a fresh version in and say "Update my skill with this" when a new one drops. Use whenever building or auditing a Search campaign.
---

# Google Ads SOP

Version: 2026-11-03. Updated every Tuesday. Last week's version is dead, get the new one in the campus.

How to use this: tell your AI to turn this file into a skill (on ChatGPT, put it in a project). Add your own prices, clients and what worked at the bottom, under My Notes. Then tell it which client and say "run this". AI drafts, you check, and you press publish yourself.

When an update drops, paste the whole post into your AI and say: "Update my skill with this. The new steps replace the old ones completely. Keep My Notes. Show me what changed." Then read what it changed.

This SOP is for Search campaigns for lead generation clients: local service businesses that want calls, forms and bookings. E-commerce, Shopping, video and Performance Max setups are not part of it. Reported results are examples, not promises.

## What this gets you

A Search campaign that is live, tracked and ready to learn, or an existing account converted to this setup. Plus a fixed rhythm for managing it and a clear rule for when to scale.

## The seven rules

1. Search first. Every account starts with Search. Other campaign types come after Search produces leads.
2. Search, ad and page match. The search, the ad and the landing page say the same thing.
3. Test tracking before spending. Google optimises for whatever it can measure. If tracking is wrong, every automated feature works against the client.
4. Google's defaults serve Google. The Recommendations tab and the calls from Google reps are built to raise spend. Read them, never obey them.
5. One service, one campaign. Fewer campaigns with more data beat many campaigns with little data.
6. Measure revenue, not clicks. Paying customers and revenue count. Click-through rate and form fills do not.
7. AI drafts, people check. Never paste AI output straight into an account.

## How the account is built

Think of the client as a restaurant. Campaigns are the services: dining in, take-out, catering. Ad groups are the menu items inside a service: dinner reservations, theme nights. Ads sell one menu item and link to its own page.

The search term belongs in the headline. If it does not fit any headline you have, it belongs in another ad group.

## Step 0: Intake, before you open Google Ads

1. Get access to the client's Google Ads account, their website and their Google Business Profile.
2. Ask the client:
   - Which services do you sell, and which one do you want more of first?
   - Which area do your best customers come from?
   - What is a customer worth to you on average?
   - Out of 10 leads, how many become customers?
   - What do you charge, and are you the cheap option or not?
   - Who answers calls and forms, and during which hours?
   - What can you say that your competitors cannot?
3. Pick one service to launch with. The rest come later, one at a time.
4. Work out the numbers in Step 2 before you build anything.

Brand-new account? Google pushes you into guided campaign creation. Choose to set up the account only. Keyword Planner is then available without a campaign.

## Step 1: Set up tracking before anything else

1. Install the Google tag (the AW- ID) on every page of the site. If it does not register, check the site is published and clear the cache.
2. Create three conversion actions:
   - Form or booking. The form redirects to a thank-you page with its own URL.
   - Calls from ads, through the call asset.
   - Calls from the website. This needs a second snippet under the Google tag.
3. Leave enhanced conversions on. It is now one switch for the website and for leads.
4. Only real lead actions are primary conversions. Page views, scrolls and clicks are never primary.
5. Client in the US or Canada? Google can record ad calls there and count only the calls its AI marks as qualified. Check the call conversion settings, so the count in Google Ads matches the calls the client actually gets.
6. Uploading closed leads from a CRM later? That now goes through Data Manager.
7. Give each lead type a value. Example: call USD 200, form USD 100, click-to-call USD 25 to 50. Use the client's real numbers.
8. Stress-test every form. Submit a junk entry. If junk counts as a conversion, it feeds the bidding, and the client pays for more junk. Add spam filtering.
9. Submit one test conversion for each action: fill in the form, make a call, check both show up.

No test conversion, no launch. Until then the campaign stays paused.

## Step 2: Work out the budget

1. Value of a lead = customer value x close rate. Example: USD 5,000 x 1 in 5 = USD 1,000. That is the ceiling for cost per lead.
2. Open Tools, then Planning, then Keyword Planner, then Discover new keywords. Set the location to the service area, because click prices differ by area.
3. For every keyword you keep, note the top-of-page bid, low range and high range. The midpoint is your expected price per click. Use the high range to be safe.
4. Existing account with history? Check what clicks on similar keywords actually cost there too.
5. Minimum daily budget = 10 clicks x that price. Example: 10 x USD 3 = USD 30 a day. A healthy start is 10 to 30 clicks a day. Propose more than the minimum if the client can afford it, because data comes in faster.
6. Can't buy 10 clicks a day? Narrow to one service and a smaller area. Never narrow the intent, and never launch thin.
7. Ignore the budget Google suggests during setup.

## Step 3: Find the keywords

1. In Keyword Planner, Discover new keywords, location set to the service area.
2. Search the main keyword on Google yourself. Note what the top ads promise. That feeds your ad copy.
3. AI can suggest keyword ideas. Check every one in Keyword Planner, because AI does not know search volumes.
4. Keep only searches from people who want to hire someone now: service + city, service + near me, emergency + service, price, quote, hire.
5. Drop how to, jobs, careers and single words. A single word like "accountant" is cheap and has volume, but little buying intent. A longer search with the service and the city costs more and converts better.
6. Start with the highest-intent keywords, even if they are expensive. If 10 clicks a day does not fit, shrink the area, not the intent.

## Step 4: Build the structure

1. One campaign per service. Name it `S | Service | Location`, like `S | Residential painting | Bloomfield`.
2. One theme per ad group. For a vet, spay and neuter is one ad group and dog vet is another.
3. Use 4 to 8 keywords per ad group. Never go past about 15.
4. Every keyword goes in twice: exact match in square brackets and phrase match in quotes. `[house painter bloomfield]` and `"house painter bloomfield"`. A keyword without brackets or quotes is broad match, so check every line.
5. No broad match at the start. Phrase match surfaces the longer variations, and the search terms report shows them.
6. Fewer, fatter campaigns. Low-volume campaigns swing wildly: in one reported set of 305 campaigns, half of those under 7 conversions a week moved more than 50%. That sample was e-commerce only, but the rule holds.
7. Make a separate campaign only for a different service line, brand versus non-brand, a location that needs different ads or budget, or a different campaign type. Never split per device or per match type.

## Step 5: Set the settings by hand

- Objective: Leads (or no guidance). Never Website traffic.
- Goals: only the lead conversion actions.
- Networks: Search partners off, Display off. Some accounts now show a priority per network instead of on or off. There, set Search partners and Display to Low priority with the smallest budget share it allows. From February 2027, Search campaigns with Display on lose their old spend split, so check this on every account.
- Locations: start with the area the best customers come from. Widen only when the budget is not being spent.
- Location option: Presence. The default, Presence or interest, shows ads to people elsewhere who are merely interested in the area. Change it every time.
- AI Max: off. Google offers it twice, at campaign level and again at ad group level. Keep both off.
- Automatically created assets: off. Campaign-level broad match setting: off. Since September 2026, Google upgrades campaigns that use either one to AI Max automatically.
- Auto-apply recommendations: off.
- Audience segments: none.
- Customer acquisition: off.
- Google's offer to generate keywords and assets from the website: skip it.
- Ad schedule: the hours the client actually answers leads.
- Devices: all. Review after 30 days.
- Bidding: Maximize clicks with a CPC limit near the high top-of-page bid from Step 2.
- Google's suggested budget: ignore.

## Step 6: Add the shared negative list on day one

One shared negative list per account, attached to every Search campaign before launch. Don't pay for the bad clicks first.

- Job seekers: jobs, hiring, career, salary, apprenticeship
- DIY and learners: how to, tutorial, course, training, certification
- No budget: free, coupon. Add cheap and used if the client is not the low-price option.
- Wrong product: the products people buy instead of the service, rent, rental
- Wrong place: every place outside the service area
- Competitors: their names. You don't bid on competitors at launch.

AI can draft the list. Read every term before it goes in. The list keeps growing from the search terms report.

## Step 7: Write the ad

1. One responsive search ad per ad group at launch. A second variant after 30 days.
2. Write 8 to 10 headlines, each from a different angle, and all 4 descriptions. Each description is a benefit plus a next step.
3. Cover six angles:
   - Intent match: the keyword plus the city. Pin it to position 1, so the searcher always sees what they typed.
   - Difference: what competitors cannot claim.
   - Offer: the first step, like a free quote or inspection.
   - Trust: reviews, years in business, licensed, guarantee.
   - Call to action: call now, book online.
   - Brand: the business name.
4. Look at competitors' ads first. Write lines only this client can say.
5. Budget tight? Pre-qualify in the headline, so the wrong people don't click.
6. Final URL: the page about this exact service. Never the homepage.
7. Ignore the Ad strength score. Don't pad the ad with near-duplicate headlines to raise it.
8. Optional: cluster complaints from competitors' bad reviews with your AI and write headlines from the gaps. Results for this method are unproven.

## Step 8: Fill every asset

Assets make the ad bigger, which raises click-through rate.

- Sitelinks: at least 4, both description lines filled, each to a real page.
- Callouts: at least 4 short benefits.
- Structured snippets: a header such as Services, with 3 or 4 values.
- Call: the number the client answers.
- Location: link the Business Profile (Tools, then Data manager) and add the location asset at account level.
- Images: real photos of the work, the team or the premises. Never stock.
- Business name and logo: these need advertiser verification.
- Promotion or price: only when real.
- Lead form assets: only with SMS verification. Without it they attract spam.

Google Maps: there is no separate Maps campaign. The location asset plus tight targeting does it. To check Maps clicks, segment by click type and look for driving directions and location details.

## Step 9: Run the pre-launch check

Screenshot this and tick every line.

- Test form and test call recorded
- Objective is not Website traffic, only lead actions as goals
- Search partners and Display off
- Location option Presence
- AI Max off at both levels, automatically created assets off, campaign-level broad match off, auto-apply off, no audiences
- Every keyword in brackets or quotes
- Keyword headline pinned to position 1
- Final URL is the right page and loads fast on a phone
- Sitelinks, callouts, snippets, call, location, images, name and logo present
- Shared negative list attached
- Budget matches the formula and the client approved it
- Someone at the client answers a form within minutes

The last one has nothing to do with Google. If nobody answers, the best campaign still loses the lead.

## Step 10: Climb the bidding ladder

1. Launch: Maximize clicks, with a CPC limit near the high top-of-page bid.
2. At 30 conversions in the last 30 days: Maximize conversions, no target yet.
3. After at least 30 more days, at about 50 conversions a month: Target CPA, set at the level the campaign already achieves.

Under 30 conversions, stay on clicks. A target set without data, or set too low, stops the campaign from spending. If a campaign never reaches the threshold, improve the offer, the page and the keywords. Don't force smart bidding.

**Set a target as the price you will really pay.** Since 17 Aug 2026, Google says a target CPA or target ROAS campaign that is limited by budget delivers closer to its target, even when it was beating it. Google's own example: a USD 10 target running at USD 5 now delivers closer to USD 10. Google does not change your targets for you.

On every tCPA or tROAS campaign that beats its target, pick one:

- Set the target to what the campaign actually achieves or slightly better, and check it regularly. If you lower it, walk it down in steps.
- Raise the budget.
- Drop the target and use Maximize Conversions or Maximize Conversion Value.

## Step 11: Manage it, weekly at minimum

Days 1 to 14:
- Check search terms every 1 to 2 days and add negatives.
- Check the budget spends and conversions record.
- Don't touch bids, ads or structure.

Every week:
- Read the search terms. Add negatives, and add good terms as new exact keywords. A term that doesn't fit an existing headline starts a new ad group.
- Per ad group, look at cost per click, click-through rate, conversion rate and cost per lead. Click-through rate under about 3% means the ads and keywords don't match.
- Ask the client which leads were real.

Every 30 days:
- Judge only after 50 to 100 clicks.
- Pause what spends without leads.
- Test one new ad variant.
- Match closed customers to keywords. Put about 80% of the budget on those keywords and aim for 80 to 85% impression share on them.
- Build landing pages for the top themes.

Tell the client upfront that the first 60 to 90 days are for learning.

## Scaling is earned

Everything Google pushes hardest comes last, and only when the data supports it.

- Broad match and AI Max: only on campaigns with conversion-based bidding and steady volume. AI Max with final URL expansion off.
- Competitors: only for clients who can support a comparison page. Never a competitor's name in the ad text.
- Performance Max: only above USD 3,000 a month and with 15 or more conversions in 30 days. Google says stable Performance Max needs at least 15 conversions over 30 days. That is a separate setup.

Grow in this order instead:

1. More ad groups from converting search terms.
2. A brand campaign.
3. Remarketing lists for search ads.
4. The client's other services, one at a time.
5. A landing page per ad group.
6. Revenue fed back into Google.

Raise the budget only with a stable cost per lead under the ceiling, 10 to 20% every few days.

## Existing account? Convert it, don't restart

Old click-bid campaigns have almost no bidding history to lose. Their search terms and click prices are exactly the data you need.

1. Set up and test the three conversion actions. Change nothing else until conversions record. Do check every campaign for AI Max features Google switched on for you since September 2026, and switch them off.
2. Pull the broad campaign's search terms for the last 90 days. Good terms become exact and phrase keywords. Junk goes on the shared negative list.
3. Pause the broad campaign. Don't delete it, so its reporting stays.
4. Convert the exact campaign to this setup: Presence, partners and Display off, AI Max, automatically created assets, campaign-level broad match and auto-apply off, lead actions as the only goals, a phrase copy of every exact keyword, ad groups split by headline, all assets.
5. Stay on click bidding until 30 conversions in 30 days.

Space out the big changes. Don't restructure and change bidding in the same week.

Start a new campaign only when the old one mixes several services, is a type that can't be converted (like a Smart campaign), or its history is mostly irrelevant traffic. Even then, pause the old one.

## What you hand the client

Screenshot of the live campaign, the budget maths, the test conversions, and the date of the first review.

## Done means

- Test conversions recorded
- Pre-launch check passed
- First weekly review in the calendar

## My Notes

(Your prices, your clients, what worked. Your AI keeps this part when it updates the skill.)

Receptifi's own account (not a client), status as of 2026-11-07:

- Campaign attempt was in Google's Express/Smart Campaign guided flow, which this SOP explicitly says to back out of on a brand-new account (choose "set up the account only" instead, so Keyword Planner works without a campaign). Not yet redone as a proper Search campaign.
- Service to launch with: undecided among the 5 channels Receptifi sells (General SEO, Local SEO, Google Ads, Meta Ads, AI SEO). Needs a decision before Step 0 can close.
- Area: Inland Empire local trades (HVAC, plumbing, electrical, garage, restoration), matches existing outreach targeting.
- Customer value: discussed as $3,000 (assumed, not from a closed deal).
- Close rate: 0%, no customers closed yet. This breaks the Step 2 lead-value formula (value of lead = customer value x close rate = $0 ceiling). Two honest options discussed: assume a target close rate and treat it as a stated bet, or treat early spend as a fixed, bounded learning budget per the SOP's own "first 60-90 days are for learning" framing, and defer the ceiling math until real conversions exist.
- Pricing tiers for positioning: $3,000 = premium, $1,000 = cheap, in Karmello's own words.
- Differentiation: month-to-month billing was floated but not confirmed as actually true, don't put it in ad copy unless verified.
- Who answers calls/forms: Karmello directly; Aria AI receptionist line status should be confirmed as live before claiming it in ads.
- Google Ads credit: unconfirmed terms, check Billing > Promotions in the account directly before assuming it covers the launch budget.
- Campaign setup was paused by Karmello on 2026-11-07 pending these decisions. Resume from Step 0 once service, close-rate approach, and differentiation are settled.

## What changed

- 2026-11-01: First version. Includes the Smart Bidding target check and the junk-form test.
- 2026-11-02: How to use this now says to keep the SOP as a skill and update it from each post.
- 2026-11-03: Full workflow added: intake questions, tag install, keyword research, the exact-plus-phrase rule, when to split a campaign, the full negative list, the Maps setup, the detailed weekly rhythm, the growth order and the full conversion steps for an existing account. Google confirmed the 17 Aug bidding change, so Step 10 now states it as Google's. Automatically created assets and the campaign-level broad match setting are now off, because Google upgrades them to AI Max. New network priority setting, one switch for enhanced conversions, AI-judged calls in the US and Canada, and a 15-conversion floor for Performance Max.
