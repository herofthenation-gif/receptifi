-- Receptifi Growth Engine — email scrape backfill tracking
-- Additive only. Run manually in the Supabase SQL editor. Safe to run multiple times.

alter table public.leads
  add column if not exists email_scrape_attempted_at timestamptz;

comment on column public.leads.email_scrape_attempted_at is
  'When scrapeContactEmail last ran for this lead, success or failure. Null = never attempted. Lets the sourcing cron backfill the pre-existing lead backlog without re-attempting known failures every run.';

-- Backfill: leads sourced before this column existed already have an email
-- or already went through scraping at source time. Leads with a website and
-- no email were, by definition, attempted once (at sourcing time) or never
-- reached (skipped past the old per-run cap). We can't distinguish those
-- retroactively, so leave email_scrape_attempted_at null for all existing
-- rows, letting the backfill sweep pick up the entire backlog.
