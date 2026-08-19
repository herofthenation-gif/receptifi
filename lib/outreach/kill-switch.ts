import { supabaseAdmin } from "@/lib/supabase-admin";

const KEY = "outreach_paused";

interface PauseState {
  paused: boolean;
  reason?: string;
  changed_at?: string;
}

/**
 * Instant stop for both crons, read fresh on every invocation (no redeploy
 * needed, unlike flipping OUTREACH_DRY_RUN). Governance requirement: a loop
 * that emails real people and spends API budget needs a kill switch that
 * doesn't depend on the same deploy pipeline that might be broken.
 */
export async function isOutreachPaused(): Promise<boolean> {
  const { data } = await supabaseAdmin.from("app_state").select("value").eq("key", KEY).maybeSingle();
  return ((data?.value as Partial<PauseState> | undefined)?.paused) === true;
}

export async function setOutreachPaused(paused: boolean, reason?: string): Promise<void> {
  const value: PauseState = { paused, reason, changed_at: new Date().toISOString() };
  await supabaseAdmin.from("app_state").upsert({ key: KEY, value });
}
