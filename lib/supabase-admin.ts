import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazily constructed so `next build`'s page-data collection (which imports
// every route module) doesn't throw just because SUPABASE_SERVICE_ROLE_KEY
// isn't set in this environment — the error only surfaces if a cron/webhook
// route actually runs without it configured.
let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}

/**
 * Privileged server-side client (service-role key). Used by cron jobs,
 * webhooks, and migration scripts — never imported from client components.
 * The browser-facing CRM dashboard keeps using the anon client in
 * lib/supabase.ts; this does not change that RLS policy.
 */
export const supabaseAdmin: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getClient(), prop, receiver);
  },
});
