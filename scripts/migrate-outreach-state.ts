#!/usr/bin/env tsx
/**
 * One-time reconciliation of the legacy local outreach pipeline
 * (~/Desktop/dental-leads-google.csv + outreach/state.json) into the
 * Supabase `leads` table, so the new autonomous cron doesn't re-email
 * leads that were already touched by outreach/send_emails.py and doesn't
 * lose existing "replied" flags.
 *
 * Usage:
 *   npx tsx scripts/migrate-outreach-state.ts              # dry run, prints a table
 *   npx tsx scripts/migrate-outreach-state.ts --apply       # writes to Supabase
 *   npx tsx scripts/migrate-outreach-state.ts --csv <path>  # override CSV location
 *
 * Run this BEFORE setting OUTREACH_DRY_RUN=false in production.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { homedir } from "os";
import path from "path";
import { computePriorityTier } from "../lib/outreach/priority";

// ── .env.local loader (this runs outside the Next.js process) ──────────────
function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...rest] = trimmed.split("=");
    const value = rest.join("=").trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvLocal();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// ── CLI args ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const apply = args.includes("--apply");
const csvArgIndex = args.indexOf("--csv");
const csvPath =
  csvArgIndex !== -1 && args[csvArgIndex + 1]
    ? args[csvArgIndex + 1]
    : path.join(homedir(), "Desktop", "dental-leads-google.csv");

// ── Quote-aware CSV parser (mirrors app/crm/dashboard/page.tsx's parseCsv) ──
interface CsvRow {
  business_name: string;
  phone: string;
  rating: string;
  review_count: string;
  website: string;
  website_present: string;
  high_priority: string;
  notes: string;
  types: string;
}

// The source CSV mixes verticals (Google Places' `types` column tells them
// apart, e.g. "dentist; doctor; ..." vs "establishment; food; ...; restaurant").
// Only "dental" has a real outreach email template right now (see
// lib/outreach/email-templates.ts) — everything else is tagged and migrated
// so it isn't lost, but getDueLeads must not pick it up until a template exists.
function inferVertical(types: string, businessName: string): string {
  const t = types.toLowerCase();
  if (t.includes("dentist")) return "dental";
  if (t.includes("restaurant") || t.includes("food")) return "restaurant";
  // Google Places' `types` occasionally omits "dentist" (e.g. tags a practice
  // as just "doctor; health") — fall back to the name for those.
  if (/dental|dentist|\bdds\b|\bdmd\b/i.test(businessName)) return "dental";
  return "unknown";
}

function parseCsv(text: string): CsvRow[] {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines
    .slice(1)
    .map((line) => {
      const vals: string[] = [];
      let cur = "";
      let inQuotes = false;
      for (const ch of line) {
        if (ch === '"') inQuotes = !inQuotes;
        else if (ch === "," && !inQuotes) {
          vals.push(cur);
          cur = "";
        } else cur += ch;
      }
      vals.push(cur);
      return Object.fromEntries(headers.map((h, i) => [h, (vals[i] ?? "").trim()])) as unknown as CsvRow;
    })
    .filter((r) => r.business_name);
}

interface StateEntry {
  email?: string;
  last_touch?: number;
  last_sent?: string;
  replied?: boolean;
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

interface ExistingLead {
  id: string;
  business_name: string | null;
  outreach_touch: number | null;
  outreach_sent_at: string | null;
  outreach_replied: boolean | null;
}

async function main() {
  if (!existsSync(csvPath)) {
    console.error(`CSV not found: ${csvPath}`);
    process.exit(1);
  }

  const csvRows = parseCsv(readFileSync(csvPath, "utf8"));
  const statePath = path.join(__dirname, "..", "outreach", "state.json");
  const state: Record<string, StateEntry> = existsSync(statePath)
    ? JSON.parse(readFileSync(statePath, "utf8"))
    : {};

  const { data: existing, error } = await supabaseAdmin
    .from("leads")
    .select("id,business_name,outreach_touch,outreach_sent_at,outreach_replied");
  if (error) {
    console.error("Failed to read existing leads:", error.message);
    process.exit(1);
  }

  const existingByName = new Map<string, ExistingLead>();
  for (const row of (existing ?? []) as ExistingLead[]) {
    if (row.business_name) existingByName.set(normalizeName(row.business_name), row);
  }

  type Action = "insert" | "update" | "skip (already up to date)" | "skip (no CSV match in state)";
  const planned: {
    businessName: string;
    action: Action;
    touch: number;
    sentAt: string | null;
    replied: boolean;
    vertical: string;
  }[] = [];

  for (const row of csvRows) {
    const key = normalizeName(row.business_name);
    const stateEntry = state[row.business_name.trim()] ?? {};
    const touch = stateEntry.last_touch ?? 0;
    const sentAt = stateEntry.last_sent ?? null;
    const replied = stateEntry.replied ?? false;
    const email = stateEntry.email ?? null;

    const hasWebsite = row.website_present.trim() === "Yes";
    const priorityTier = computePriorityTier({
      hasWebsite,
      rating: row.rating ? Number(row.rating) : null,
      reviewCount: row.review_count ? Number(row.review_count) : null,
    });

    const basePayload = {
      name: row.business_name,
      business_name: row.business_name,
      phone: row.phone || null,
      email,
      website: hasWebsite ? row.website || null : null,
      rating: row.rating ? Number(row.rating) : null,
      review_count: row.review_count ? Number(row.review_count) : null,
      vertical: inferVertical(row.types ?? "", row.business_name),
      source: "legacy_csv_migration",
      priority_tier: priorityTier,
      status: replied ? "warm" : "cold",
      notes: row.notes || null,
    };

    const existingRow = existingByName.get(key);

    if (!existingRow) {
      planned.push({ businessName: row.business_name, action: "insert", touch, sentAt, replied, vertical: basePayload.vertical });
      if (apply) {
        const { error: insertErr } = await supabaseAdmin.from("leads").insert({
          ...basePayload,
          outreach_touch: touch,
          outreach_sent_at: sentAt,
          outreach_replied: replied,
        });
        if (insertErr) console.error(`  insert failed for ${row.business_name}: ${insertErr.message}`);
      }
      continue;
    }

    const existingTouch = existingRow.outreach_touch ?? 0;
    const existingReplied = existingRow.outreach_replied ?? false;
    const isMoreAdvanced = touch > existingTouch || (replied && !existingReplied);

    if (!isMoreAdvanced) {
      planned.push({ businessName: row.business_name, action: "skip (already up to date)", touch, sentAt, replied, vertical: basePayload.vertical });
      continue;
    }

    planned.push({ businessName: row.business_name, action: "update", touch, sentAt, replied, vertical: basePayload.vertical });
    if (apply) {
      const { error: updateErr } = await supabaseAdmin
        .from("leads")
        .update({
          outreach_touch: touch,
          outreach_sent_at: sentAt,
          outreach_replied: replied,
          email: email ?? undefined, // only set if we have one; never null out an existing email
        })
        .eq("id", existingRow.id);
      if (updateErr) console.error(`  update failed for ${row.business_name}: ${updateErr.message}`);
    }
  }

  console.log(`${apply ? "APPLY" : "DRY RUN"} — ${csvPath}\n`);
  console.log(
    "business_name".padEnd(45),
    "action".padEnd(28),
    "vertical".padEnd(12),
    "touch",
    "sent_at".padEnd(12),
    "replied"
  );
  for (const p of planned) {
    console.log(
      p.businessName.slice(0, 44).padEnd(45),
      p.action.padEnd(28),
      p.vertical.padEnd(12),
      String(p.touch).padEnd(5),
      (p.sentAt ?? "-").padEnd(12),
      String(p.replied)
    );
  }

  const counts = planned.reduce<Record<string, number>>((acc, p) => {
    acc[p.action] = (acc[p.action] ?? 0) + 1;
    return acc;
  }, {});
  console.log("\nSummary:", counts);

  const byVertical = planned.reduce<Record<string, number>>((acc, p) => {
    acc[p.vertical] = (acc[p.vertical] ?? 0) + 1;
    return acc;
  }, {});
  console.log("By vertical:", byVertical);

  if (!apply) {
    console.log("\nDry run only — re-run with --apply to write these changes to Supabase.");
  } else {
    console.log(
      "\nDone. Once verified, manually archive outreach/state.json and outreach/log.csv — this script does not delete them."
    );
  }
}

main();
