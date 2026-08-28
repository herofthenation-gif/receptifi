-- Receptifi Growth Engine — public email subscriber list.
-- Run manually in the Supabase SQL editor. Safe to run multiple times.
--
-- Captures signups from the site footer for broadcast updates (distinct from
-- the leads table, which is cold-outreach targets, and app_state, which is
-- cron cursor storage). RLS enabled with no policy from the start: only
-- service_role (app/api/subscribe/route.ts, via supabaseAdmin) can read or
-- write — same lockdown posture as leads/app_state after 0005.

create table if not exists public.subscribers (
  id              uuid primary key default gen_random_uuid(),
  email           text not null unique,
  subscribed_at   timestamptz not null default now(),
  unsubscribed_at timestamptz,
  source          text not null default 'footer'
);

alter table public.subscribers enable row level security;
