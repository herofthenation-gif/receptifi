import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Lead } from "@/lib/supabase";
import { TOUCH_DELAYS } from "./config";

export interface DueLead {
  lead: Lead;
  touch: 1 | 2 | 3;
}

function daysSinceUtc(dateStr: string): number {
  const sentUtc = new Date(`${dateStr}T00:00:00Z`).getTime();
  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.floor((todayUtc - sentUtc) / 86_400_000);
}

function comparePriority(a: DueLead, b: DueLead): number {
  const tierA = a.lead.priority_tier ?? 3;
  const tierB = b.lead.priority_tier ?? 3;
  if (tierA !== tierB) return tierA - tierB;
  const reviewsA = a.lead.review_count ?? 9999;
  const reviewsB = b.lead.review_count ?? 9999;
  return reviewsA - reviewsB;
}

/**
 * Ports outreach/send_emails.py's due_emails(): touch 1 is always due once a
 * lead has an email; touch 2/3 become due once enough days have passed since
 * the previous send (TOUCH_DELAYS). Sorted by priority tier, capped.
 */
export async function getDueLeads(cap: number): Promise<DueLead[]> {
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .not("email", "is", null)
    .or("outreach_replied.is.null,outreach_replied.eq.false")
    .not("status", "in", "(booked,closed)")
    .or("outreach_touch.is.null,outreach_touch.lt.3")
    // Only "dental" has real outreach copy today (see lib/outreach/email-templates.ts).
    // Null vertical covers manually-added CRM leads (the form doesn't set one, and the
    // CRM's original purpose was dental). Every other vertical waits for its own template.
    .or("vertical.is.null,vertical.eq.dental");

  if (error) throw new Error(`getDueLeads: ${error.message}`);

  const due: DueLead[] = [];
  for (const lead of (data ?? []) as Lead[]) {
    const touch = lead.outreach_touch ?? 0;
    if (touch === 0) {
      due.push({ lead, touch: 1 });
      continue;
    }
    if (!lead.outreach_sent_at) continue;
    const required = TOUCH_DELAYS[(touch + 1) as 2 | 3];
    if (daysSinceUtc(lead.outreach_sent_at) >= required) {
      due.push({ lead, touch: (touch + 1) as 1 | 2 | 3 });
    }
  }

  due.sort(comparePriority);
  return due.slice(0, cap);
}
