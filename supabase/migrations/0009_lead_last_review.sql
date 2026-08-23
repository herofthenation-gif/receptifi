-- Most recent Google review per lead, backfilled by app/api/cron/source-leads
-- (backfillLastReview) via Places Details. last_review_checked_at is set
-- regardless of outcome so a lead with zero reviews isn't retried forever,
-- same pattern as quality_checked_at / email_scrape_attempted_at.
alter table public.leads
  add column if not exists last_review_text      text,
  add column if not exists last_review_author    text,
  add column if not exists last_review_rating    numeric(2,1),
  add column if not exists last_review_at        timestamptz,
  add column if not exists last_review_checked_at timestamptz;
