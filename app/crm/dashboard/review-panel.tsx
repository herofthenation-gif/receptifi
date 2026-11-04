"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lead } from "@/lib/supabase";
import { getVertical } from "@/lib/outreach/config";

// Fast bulk triage for needs_review leads (the high-ticket track: legal
// intake, med spa, real estate — gated behind manual approval before they
// enter send-outreach's due queue, see lib/outreach/due-emails.ts). Approving
// sets status to "cold" so it's picked up on the next cron run; rejecting
// sets it to "closed" so it's dropped for good. Both are bulk-capable via a
// single PATCH with `ids` (see app/api/admin/leads/route.ts).

async function apiGetNeedsReview(): Promise<{ leads?: Lead[]; error?: string }> {
  const res = await fetch("/api/admin/leads?status=needs_review");
  return res.json();
}

async function apiBulkPatch(ids: string[], patch: Partial<Lead>): Promise<{ error?: string }> {
  const res = await fetch("/api/admin/leads", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids, patch }),
  });
  return res.json();
}

function ReviewCard({
  lead,
  checked,
  onToggle,
  onApprove,
  onReject,
}: {
  lead: Lead;
  checked: boolean;
  onToggle: () => void;
  onApprove: () => void;
  onReject: () => void;
}) {
  const gap =
    lead.last_review_text ||
    (lead.website_status === "outdated" ? "Site flagged outdated." : null) ||
    (!lead.website ? "No website found." : null);

  return (
    <div
      style={{
        display: "flex", alignItems: "flex-start", gap: 14,
        padding: "16px 18px", borderRadius: 14,
        border: `1px solid ${checked ? "rgba(96,165,250,0.4)" : "var(--hair)"}`,
        background: checked ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.02)",
        transition: "background .15s, border-color .15s",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        style={{ marginTop: 3, width: 16, height: 16, cursor: "pointer", accentColor: "#3b82f6" }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>
            {lead.business_name || lead.name}
          </span>
          <span style={{ fontSize: 12, color: "var(--accent-2)", fontWeight: 600 }}>
            {getVertical(lead.vertical).label}
          </span>
          {lead.city && <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>{lead.city}</span>}
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 6, fontSize: 12, color: "var(--ink-dim)", flexWrap: "wrap" }}>
          {lead.rating != null ? (
            <span><span style={{ color: "#fbbf24" }}>★</span> {lead.rating} ({lead.review_count ?? 0})</span>
          ) : (
            <span style={{ color: "var(--hair-strong)" }}>No rating</span>
          )}
          <span>{lead.website ? "Has website" : "No website"}</span>
          {lead.email ? <span>{lead.email}</span> : <span style={{ color: "var(--hair-strong)" }}>No email</span>}
        </div>

        {gap && (
          <div style={{ marginTop: 8, fontSize: 12, color: "var(--ink-faint)", lineHeight: 1.5, maxWidth: 640, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
            {lead.last_review_text ? `“${lead.last_review_text}”` : gap}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          onClick={onApprove}
          title="Approve → Cold (enters outreach)"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 9, border: "1px solid rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.1)", color: "#4ade80", fontWeight: 600, fontSize: 12, cursor: "pointer" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          Approve
        </button>
        <button
          onClick={onReject}
          title="Reject → Closed"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 9, border: "1px solid rgba(239,68,68,0.28)", background: "rgba(239,68,68,0.08)", color: "#ef4444", fontWeight: 600, fontSize: 12, cursor: "pointer" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          Reject
        </button>
      </div>
    </div>
  );
}

export function ReviewPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [verticalFilter, setVerticalFilter] = useState("all");
  const [busy, setBusy] = useState(false);

  async function load() {
    setLoading(true);
    const { leads: data, error } = await apiGetNeedsReview();
    if (error) setError(error);
    else setLeads(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const verticalsPresent = useMemo(
    () => Array.from(new Set(leads.map((l) => l.vertical ?? "generic"))).sort(),
    [leads]
  );

  const visible = useMemo(() => leads.filter((l) => {
    if (verticalFilter !== "all" && (l.vertical ?? "generic") !== verticalFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        (l.business_name ?? "").toLowerCase().includes(q) ||
        (l.city ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  }), [leads, search, verticalFilter]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleAllVisible() {
    setSelected((prev) => {
      const allSelected = visible.length > 0 && visible.every((l) => prev.has(l.id));
      if (allSelected) {
        const next = new Set(prev);
        visible.forEach((l) => next.delete(l.id));
        return next;
      }
      const next = new Set(prev);
      visible.forEach((l) => next.add(l.id));
      return next;
    });
  }

  async function applyStatus(ids: string[], status: "cold" | "closed") {
    if (!ids.length || busy) return;
    setBusy(true);
    const { error } = await apiBulkPatch(ids, { status });
    if (error) { alert(error); setBusy(false); return; }
    const idSet = new Set(ids);
    setLeads((prev) => prev.filter((l) => !idSet.has(l.id)));
    setSelected((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
    setBusy(false);
  }

  const selectedCount = selected.size;
  const allVisibleSelected = visible.length > 0 && visible.every((l) => selected.has(l.id));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>Needs Review</div>
          <div style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 2 }}>
            High-ticket leads (legal, med spa, real estate) held out of outreach until approved. Approve → Cold, enters the send queue. Reject → Closed, dropped for good.
          </div>
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-dim)", fontWeight: 600 }}>
          {leads.length} pending
        </div>
      </div>

      <div style={{ marginBottom: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
          <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)", pointerEvents: "none" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input
            type="text"
            placeholder="Search by name, business, or city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid var(--hair-strong)", color: "var(--ink)", fontFamily: "inherit", fontSize: 14, padding: "11px 14px 11px 40px", borderRadius: 10, outline: "none", boxSizing: "border-box" }}
          />
        </div>
        <select
          value={verticalFilter}
          onChange={(e) => setVerticalFilter(e.target.value)}
          style={{ appearance: "none", background: "rgba(255,255,255,0.04)", border: "1px solid var(--hair-strong)", color: "var(--ink)", fontFamily: "inherit", fontSize: 14, padding: "11px 16px", borderRadius: 10, outline: "none", cursor: "pointer", minWidth: 160 }}
        >
          <option value="all">All verticals</option>
          {verticalsPresent.map((v) => (
            <option key={v} value={v}>{getVertical(v).label}</option>
          ))}
        </select>
      </div>

      <div
        style={{
          position: "sticky", top: 0, zIndex: 5,
          display: "flex", alignItems: "center", gap: 12,
          padding: "10px 16px", marginBottom: 14, borderRadius: 12,
          border: "1px solid var(--hair-strong)", background: "rgba(10,14,26,0.85)", backdropFilter: "blur(10px)",
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "var(--ink-dim)" }}>
          <input type="checkbox" checked={allVisibleSelected} onChange={toggleAllVisible} style={{ width: 15, height: 15, cursor: "pointer", accentColor: "#3b82f6" }} />
          Select all visible ({visible.length})
        </label>
        <span style={{ flex: 1 }} />
        {selectedCount > 0 && (
          <>
            <span style={{ fontSize: 13, color: "var(--accent-2)", fontWeight: 600 }}>{selectedCount} selected</span>
            <button
              disabled={busy}
              onClick={() => applyStatus(Array.from(selected), "cold")}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, border: 0, background: "linear-gradient(180deg,#22c55e,#16a34a)", color: "#fff", fontWeight: 600, fontSize: 13, cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.6 : 1 }}
            >
              Approve {selectedCount}
            </button>
            <button
              disabled={busy}
              onClick={() => applyStatus(Array.from(selected), "closed")}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontWeight: 600, fontSize: 13, cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.6 : 1 }}
            >
              Reject {selectedCount}
            </button>
          </>
        )}
      </div>

      {error && (
        <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5", marginBottom: 16, fontSize: 14 }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: "center", color: "var(--ink-faint)" }}>Loading…</div>
        ) : visible.length === 0 ? (
          <div style={{ padding: 64, textAlign: "center", color: "var(--ink-faint)", fontSize: 14 }}>
            {leads.length === 0 ? "Backlog is clear. Nothing needs review." : "No leads match your filter."}
          </div>
        ) : (
          visible.map((lead) => (
            <ReviewCard
              key={lead.id}
              lead={lead}
              checked={selected.has(lead.id)}
              onToggle={() => toggle(lead.id)}
              onApprove={() => applyStatus([lead.id], "cold")}
              onReject={() => applyStatus([lead.id], "closed")}
            />
          ))
        )}
      </div>
    </div>
  );
}
