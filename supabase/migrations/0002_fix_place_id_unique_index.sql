-- Fixes app/api/cron/source-leads/route.ts's upsert({ onConflict: "place_id" }):
-- Postgres can't use a partial index (where place_id is not null) as an ON
-- CONFLICT arbiter unless the conflict clause repeats that exact predicate,
-- which supabase-js's upsert() doesn't do. A plain unique index already
-- allows unlimited NULLs by default (NULL <> NULL), so the partial
-- predicate was unnecessary — this swaps to a plain index that upsert can
-- actually use. Safe to run multiple times.

drop index if exists public.leads_place_id_key;

create unique index if not exists leads_place_id_key
  on public.leads (place_id);
