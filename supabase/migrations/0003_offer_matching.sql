-- Receptifi Growth Engine — Phase 2 (offer matching + generated preview sites)
-- Additive only. Run manually in the Supabase SQL editor. Safe to run multiple times.

alter table public.leads
  add column if not exists address             text,
  add column if not exists website_status      text,
  add column if not exists site_quality_score  int,
  add column if not exists offer_type          text,
  add column if not exists preview_slug        text,
  add column if not exists generated_site      jsonb,
  add column if not exists quality_checked_at  timestamptz,
  add column if not exists unsubscribed_at     timestamptz;

-- Preview URLs are public — the slug must be unique. Partial index so the
-- many non-web leads (preview_slug null) don't collide.
create unique index if not exists leads_preview_slug_key
  on public.leads (preview_slug) where preview_slug is not null;

comment on column public.leads.website_status is
  'none = no website on Google, outdated = site_quality_score 0-2, good = 3-6';
comment on column public.leads.site_quality_score is
  '0-6: +1 each for HTTPS, mobile viewport, booking/chat widget, non-stale copyright, 3+ internal pages, NAP+CTA';
comment on column public.leads.offer_type is
  'web | reviews | crm | voice — which Receptifi offer the outreach sequence pitches (see lib/outreach/offer.ts)';
comment on column public.leads.preview_slug is
  'Slug for the generated preview site at /preview/[slug]. Only set for offer_type = web.';
comment on column public.leads.generated_site is
  'Structured content the /preview/[slug] page renders (see GeneratedSite in lib/outreach/site-generator.ts)';
comment on column public.leads.quality_checked_at is
  'When site-quality classification last ran. Null = not yet classified; the sourcing cron backfills.';
comment on column public.leads.unsubscribed_at is
  'CAN-SPAM opt-out. Set when a reply asks to unsubscribe; getDueLeads excludes these permanently.';
