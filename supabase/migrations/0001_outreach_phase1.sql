-- Receptifi Growth Engine — Phase 1 (outbound autonomous sourcing + outreach)
-- Additive only. Run manually in the Supabase SQL editor. Safe to run multiple times.
-- Does NOT touch the original SQL_SETUP in app/crm/dashboard/page.tsx.

alter table public.leads
  add column if not exists place_id     text,
  add column if not exists website      text,
  add column if not exists rating       numeric(2,1),
  add column if not exists review_count int,
  add column if not exists vertical     text,
  add column if not exists city         text,
  add column if not exists region       text,
  add column if not exists hours_json   jsonb,
  add column if not exists priority_tier int,
  add column if not exists source       text default 'manual',
  add column if not exists outreach_last_error text;

-- place_id is the Google Places dedup key. Partial unique index: unlimited
-- NULLs allowed (manual/legacy/CSV rows have none), but every row the
-- sourcing cron inserts must be unique on place_id.
create unique index if not exists leads_place_id_key
  on public.leads (place_id) where place_id is not null;

-- Generic key/value store for cron state. Used today for the lead-sourcing
-- city x vertical rotation cursor; reusable for future cron state.
create table if not exists public.app_state (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.app_state enable row level security;
drop policy if exists "app_state_all" on public.app_state;
create policy "app_state_all" on public.app_state for all using (true) with check (true);

comment on column public.leads.priority_tier is
  '1 = no website (highest priority), 2 = has website but rating<4.0 or review_count<50, 3 = solid existing presence';
comment on column public.leads.source is
  'manual | google_places | legacy_csv_migration | inbound_demo';
