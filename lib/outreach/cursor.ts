import { supabaseAdmin } from "@/lib/supabase-admin";
import { CITIES, VERTICALS, type City, type Vertical } from "./config";

export interface Combo {
  city: City;
  vertical: Vertical;
}

// Deterministic order from the static config arrays — a single persisted
// integer pointer is enough to guarantee even coverage over time without
// per-combo "last queried" bookkeeping.
const COMBOS: Combo[] = CITIES.flatMap((city) => VERTICALS.map((vertical) => ({ city, vertical })));
export const TOTAL_COMBOS = COMBOS.length;

const CURSOR_KEY = "source_cursor";

interface CursorState {
  index: number;
  pass: number;
}

async function readCursor(): Promise<CursorState> {
  const { data } = await supabaseAdmin.from("app_state").select("value").eq("key", CURSOR_KEY).maybeSingle();
  const value = (data?.value ?? {}) as Partial<CursorState>;
  return { index: value.index ?? 0, pass: value.pass ?? 0 };
}

/** Returns the next `n` city x vertical combos to query, without advancing the cursor. */
export async function nextCombos(n: number): Promise<Combo[]> {
  const { index } = await readCursor();
  return Array.from({ length: n }, (_, i) => COMBOS[(index + i) % COMBOS.length]);
}

/** Advances the rotation cursor by `n` combos, wrapping (and bumping `pass`) at the end of the matrix. */
export async function advanceCursor(n: number): Promise<void> {
  const { index, pass } = await readCursor();
  const nextIndex = index + n;
  const wrapped = nextIndex >= COMBOS.length;
  const value: CursorState = { index: nextIndex % COMBOS.length, pass: wrapped ? pass + 1 : pass };
  await supabaseAdmin
    .from("app_state")
    .upsert({ key: CURSOR_KEY, value, updated_at: new Date().toISOString() });
}
