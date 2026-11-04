-- Receptifi Growth Engine — lock down RLS on leads + app_state.
-- Run manually in the Supabase SQL editor. Safe to run multiple times.
--
-- Why: both tables had a "for all using (true)" policy, meaning the public
-- anon key (shipped in the browser JS bundle on every page load) could
-- read/write/delete every lead's PII (name, email, phone, notes) directly
-- against the Supabase REST API, with no login required. The CRM dashboard
-- now goes through /api/admin/leads (service-role key, server-side, gated by
-- admin login — see proxy.ts + lib/admin-auth.ts) instead of querying
-- Supabase from the browser, and the public lead-capture form
-- (app/api/lead/route.ts) already runs server-side too. Nothing in the
-- codebase queries either table with the anon key anymore, so dropping the
-- permissive policy and leaving RLS enabled with no policy denies
-- anon/authenticated entirely. service_role (crons, webhooks, /api/admin/*)
-- always bypasses RLS regardless of policy, so nothing server-side breaks.

alter table public.leads enable row level security;
drop policy if exists "crm_all" on public.leads;

alter table public.app_state enable row level security;
drop policy if exists "app_state_all" on public.app_state;

-- Verify after running: as the anon key, a select against either table
-- should return an empty result (RLS silently filters rows), and an
-- insert/update/delete should fail with a permission error.
