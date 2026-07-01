# Growth Engine — Go-Live Runbook

Code is built. These are the things only you can do — none of them are something I can complete for you.

## 1. Database

Run `supabase/migrations/0001_outreach_phase1.sql` in the Supabase SQL editor (your project at the URL in `.env.local`).

## 2. Service-role key + cron secret

- Supabase → Project Settings → API → copy the **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` and in Vercel's project env vars.
- Generate a cron secret: `openssl rand -hex 32` → `CRON_SECRET` in both places.

## 3. Google Places API (lead sourcing)

- Google Cloud Console → enable **Places API (New)** + billing on a project.
- Create an API key, restrict it to Places API, → `GOOGLE_PLACES_API_KEY`.

## 4. Gmail OAuth (reply detection)

Needs OAuth credentials for the `receptifi.ai@gmail.com` inbox (the Reply-To on every cold email), readonly scope:

1. Google Cloud Console → APIs & Services → Credentials → create an OAuth 2.0 Client ID (type: Desktop app) → gives you `GMAIL_CLIENT_ID` / `GMAIL_CLIENT_SECRET`.
2. Enable the Gmail API on that project.
3. Run the OAuth consent flow once, signed in as `receptifi.ai@gmail.com`, with scope `https://www.googleapis.com/auth/gmail.readonly`, to mint a refresh token → `GMAIL_REFRESH_TOKEN`. (Google's OAuth Playground at developers.google.com/oauthplayground works for this — use your own client ID/secret, not the Playground's default.)

If these three aren't set, reply detection silently no-ops (it won't block sending — see `lib/outreach/gmail.ts`).

## 5. Calendly webhook (booking detection)

Requires a paid Calendly plan. Once the app is deployed:

```
POST https://api.calendly.com/webhook_subscriptions
Authorization: Bearer <your Calendly personal access token>
{
  "url": "https://<your-domain>/api/webhooks/calendly",
  "events": ["invitee.created"],
  "organization": "<your org URI>",
  "scope": "organization"
}
```

Calendly returns a `signing_key` in the response → `CALENDLY_WEBHOOK_SIGNING_KEY`.

## 6. Vercel plan

Both crons run once/day, which works on Hobby. If you're on Pro and want reply checks to run more often than once a day, that's a small follow-up (split `checkGmailReplies()` out of `send-outreach` into its own cron — the function is already structured for that).

## 7. Migrate existing data — do this before going live

```
npm run migrate:outreach            # dry run — inspect the printed table
npm run migrate:outreach -- --apply # writes to Supabase
```

This reconciles `~/Desktop/dental-leads-google.csv` + `outreach/state.json` (17 leads already at touch 1 as of the day this was built) into Supabase, so the new engine doesn't double-email them. Once you've verified it, archive `outreach/state.json` and `outreach/log.csv` — the script doesn't delete them.

## 8. Deploy + verify (dry run)

Deploy, set all the env vars above in Vercel (Production), leave `OUTREACH_DRY_RUN=true`.

```bash
curl https://<your-domain>/api/cron/send-outreach -H "Authorization: Bearer $CRON_SECRET"
curl https://<your-domain>/api/cron/source-leads  -H "Authorization: Bearer $CRON_SECRET"
```

Confirm `dryRun: true`, sane preview output, and check Supabase that `source-leads` inserted new rows with `source = 'google_places'` and no duplicate `place_id`s.

For no-website leads (highest priority, can't be email-scraped), use the CRM dashboard's new inline email field to paste in manually-found addresses so they enter the sequence.

## 9. Go live

Once dry-run output looks right for a couple of days and the migration is applied:

```
OUTREACH_DRY_RUN=false
```

in Vercel **Production** env vars only.
