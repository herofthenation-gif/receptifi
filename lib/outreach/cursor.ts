import { supabaseAdmin } from "@/lib/supabase-admin";
import { FOCUS_VERTICALS, HIGH_TICKET_VERTICALS, SOURCING_CITIES, type City, type Vertical } from "./config";

export interface Combo {
  city: City;
  vertical: Vertical;
}

function buildCombos(verticals: Vertical[]): Combo[] {
  return SOURCING_CITIES.flatMap((city) => verticals.map((vertical) => ({ city, vertical })));
}

interface CursorState {
  index: number;
  pass: number;
}

// Deterministic order from the static config arrays: a single persisted
// integer pointer per track is enough to guarantee even coverage over time
// without per-combo "last queried" bookkeeping. Each track gets its own
// matrix and its own cursor key so the two rotations never interfere.
function makeTrack(combos: Combo[], cursorKey: string) {
  async function readCursor(): Promise<CursorState> {
    const { data } = await supabaseAdmin.from("app_state").select("value").eq("key", cursorKey).maybeSingle();
    const value = (data?.value ?? {}) as Partial<CursorState>;
    return { index: value.index ?? 0, pass: value.pass ?? 0 };
  }

  return {
    combos,
    /** Returns the next `n` city x vertical combos to query, without advancing the cursor. */
    async next(n: number): Promise<Combo[]> {
      const { index } = await readCursor();
      return Array.from({ length: n }, (_, i) => combos[(index + i) % combos.length]);
    },
    /** Advances the rotation cursor by `n` combos, wrapping (and bumping `pass`) at the end of the matrix. */
    async advance(n: number): Promise<void> {
      const { index, pass } = await readCursor();
      const nextIndex = index + n;
      const wrapped = nextIndex >= combos.length;
      const value: CursorState = { index: nextIndex % combos.length, pass: wrapped ? pass + 1 : pass };
      await supabaseAdmin
        .from("app_state")
        .upsert({ key: cursorKey, value, updated_at: new Date().toISOString() });
    },
  };
}

// v2: matrix switched from all-verticals to the trades focus. The old
// persisted index pointed into a different combo ordering, so start fresh.
const tradesTrack = makeTrack(buildCombos(FOCUS_VERTICALS), "source_cursor_v2_trades");
export const TOTAL_COMBOS = tradesTrack.combos.length;
export const nextCombos = tradesTrack.next;
export const advanceCursor = tradesTrack.advance;

// High-ticket track (legal/med-spa/real-estate), added 2026-07-20 to run
// alongside trades sourcing without touching its cursor or pacing.
const highTicketTrack = makeTrack(buildCombos(HIGH_TICKET_VERTICALS), "source_cursor_v1_high_ticket");
export const TOTAL_HIGH_TICKET_COMBOS = highTicketTrack.combos.length;
export const nextHighTicketCombos = highTicketTrack.next;
export const advanceHighTicketCursor = highTicketTrack.advance;
