"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { supabase, type Lead, type LeadStatus } from "@/lib/supabase";
import { getVertical } from "@/lib/outreach/config";

// ── CSV import types ─────────────────────────────────────
interface CsvRow {
  business_name: string;
  phone: string;
  rating: string;
  review_count: string;
  website: string;
  website_present: string;
  high_priority: string;
  notes: string;
}

function parseCsv(text: string): CsvRow[] {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    const vals: string[] = [];
    let cur = "", inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === "," && !inQ) { vals.push(cur); cur = ""; }
      else { cur += ch; }
    }
    vals.push(cur);
    return Object.fromEntries(headers.map((h, i) => [h, (vals[i] ?? "").trim()])) as unknown as CsvRow;
  }).filter((r) => r.business_name);
}

// ── Status config ────────────────────────────────────────
const STATUS: Record<LeadStatus, { label: string; color: string; bg: string; border: string }> = {
  cold:   { label: "Cold",   color: "#9aa5b8", bg: "rgba(154,165,184,0.10)", border: "rgba(154,165,184,0.25)" },
  warm:   { label: "Warm",   color: "#fbbf24", bg: "rgba(251,191,36,0.10)",  border: "rgba(251,191,36,0.30)"  },
  booked: { label: "Booked", color: "#60a5fa", bg: "rgba(96,165,250,0.12)",  border: "rgba(96,165,250,0.30)"  },
  closed: { label: "Closed", color: "#4ade80", bg: "rgba(74,222,128,0.10)",  border: "rgba(74,222,128,0.28)"  },
};

const STATUSES: LeadStatus[] = ["cold", "warm", "booked", "closed"];

const EMPTY_FORM = { name: "", business_name: "", phone: "", email: "", status: "cold" as LeadStatus, notes: "" };

// Scoped to this page only — the marketing site has its own (light) theme
// tokens in globals.css and must not be touched. These were referenced
// throughout this file but never actually defined anywhere, so every badge
// and glass-card effect below was silently falling back to plain black-on-
// white. Values match the dark theme this page was originally designed for.
const CRM_THEME = {
  "--bg": "#05070d",
  "--ink": "#e8eef9",
  "--ink-dim": "#9aa5b8",
  "--ink-faint": "rgba(232,238,249,.55)",
  "--hair": "rgba(255,255,255,.08)",
  "--hair-strong": "rgba(255,255,255,.14)",
  "--accent-2": "#60a5fa",
} as CSSProperties;

// ── Offer type config ────────────────────────────────────
const OFFER: Record<string, { label: string; color: string; bg: string; border: string }> = {
  web:     { label: "Web",     color: "#a78bfa", bg: "rgba(167,139,250,0.10)", border: "rgba(167,139,250,0.28)" },
  reviews: { label: "Reviews", color: "#fbbf24", bg: "rgba(251,191,36,0.10)",  border: "rgba(251,191,36,0.28)"  },
  crm:     { label: "CRM",     color: "#4ade80", bg: "rgba(74,222,128,0.10)",  border: "rgba(74,222,128,0.28)"  },
  voice:   { label: "Voice",   color: "#60a5fa", bg: "rgba(96,165,250,0.10)",  border: "rgba(96,165,250,0.28)"  },
};

function OfferBadge({ lead }: { lead: Lead }) {
  if (lead.offer_type && OFFER[lead.offer_type]) {
    const o = OFFER[lead.offer_type];
    return (
      <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: o.color, background: o.bg, border: `1px solid ${o.border}` }}>
        {o.label}
      </span>
    );
  }
  if (lead.website) {
    return <span style={{ fontSize: 11, color: "var(--ink-faint)", fontStyle: "italic" }}>Awaiting classification</span>;
  }
  return <span style={{ color: "var(--hair-strong)", fontSize: 12 }}>—</span>;
}

// ── Sub-components ───────────────────────────────────────
function Badge({ status }: { status: LeadStatus }) {
  const s = STATUS[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 10px", borderRadius: 999,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
      color: s.color, background: s.bg, border: `1px solid ${s.border}`,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
      {s.label}
    </span>
  );
}

function StatusSelect({ value, onChange }: { value: LeadStatus; onChange: (v: LeadStatus) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as LeadStatus)}
      style={{
        appearance: "none", background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.14)", color: "var(--ink)",
        fontSize: 12, fontWeight: 600, padding: "5px 10px", borderRadius: 8,
        cursor: "pointer", fontFamily: "inherit",
      }}
    >
      {STATUSES.map((s) => <option key={s} value={s}>{STATUS[s].label}</option>)}
    </select>
  );
}

// ── Main page ─────────────────────────────────────────────
export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [emailText, setEmailText] = useState("");
  const [filter, setFilter] = useState<LeadStatus | "all" | "unsubscribed">("all");
  const [verticalFilter, setVerticalFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [importRows, setImportRows] = useState<CsvRow[]>([]);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setLeads(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchLeads(); }, []);

  async function addLead(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("leads").insert([form]);
    if (error) alert(error.message);
    else { setForm(EMPTY_FORM); setShowForm(false); fetchLeads(); }
    setSaving(false);
  }

  async function updateStatus(id: string, status: LeadStatus) {
    const patch: Partial<Lead> = { status };
    if (status === "booked") patch.booked_at = new Date().toISOString();
    await supabase.from("leads").update(patch).eq("id", id);
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, ...patch } : l));
  }

  async function saveNote(id: string) {
    await supabase.from("leads").update({ notes: noteText }).eq("id", id);
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, notes: noteText } : l));
    setEditingNote(null);
  }

  async function saveEmail(id: string) {
    const email = emailText.trim() || null;
    await supabase.from("leads").update({ email }).eq("id", id);
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, email } : l));
    setEditingEmail(null);
  }

  async function deleteLead(id: string) {
    if (!confirm("Delete this lead?")) return;
    await supabase.from("leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  function handleCsvFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const rows = parseCsv(ev.target?.result as string);
      setImportRows(rows);
    };
    reader.readAsText(file);
  }

  async function runImport() {
    if (!importRows.length) return;
    setImporting(true);
    const batch = importRows.map((r) => ({
      name: r.business_name,
      business_name: r.business_name,
      phone: r.phone || null,
      email: null,
      status: (r.high_priority === "Yes" ? "warm" : "cold") as LeadStatus,
      notes: [
        r.rating ? `Rating: ${r.rating} (${r.review_count} reviews)` : null,
        r.website_present === "Yes" ? `Website: ${r.website}` : "No website",
        r.notes || null,
      ].filter(Boolean).join(" | ") || null,
    }));
    const CHUNK = 50;
    for (let i = 0; i < batch.length; i += CHUNK) {
      const { error } = await supabase.from("leads").insert(batch.slice(i, i + CHUNK));
      if (error) { alert(error.message); break; }
    }
    setImporting(false);
    setShowImport(false);
    setImportRows([]);
    if (fileRef.current) fileRef.current.value = "";
    fetchLeads();
  }

  const visible = leads.filter((l) => {
    if (filter === "unsubscribed") { if (!l.unsubscribed_at) return false; }
    else if (filter !== "all" && l.status !== filter) return false;
    if (verticalFilter !== "all" && (l.vertical ?? "generic") !== verticalFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        (l.email ?? "").toLowerCase().includes(q) ||
        (l.business_name ?? "").toLowerCase().includes(q) ||
        (l.phone ?? "").includes(q) ||
        (l.city ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = STATUSES.reduce((acc, s) => ({ ...acc, [s]: leads.filter((l) => l.status === s).length }), {} as Record<LeadStatus, number>);
  const unsubscribedCount = leads.filter((l) => l.unsubscribed_at).length;
  const verticalsPresent = Array.from(new Set(leads.map((l) => l.vertical ?? "generic"))).sort();

  return (
    <div style={{ ...CRM_THEME, minHeight: "100vh", background: "var(--bg)", color: "var(--ink)", fontFamily: "Inter, sans-serif" }}>
      {/* ambient */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(40% 30% at 20% 10%, rgba(59,130,246,0.18), transparent 60%), radial-gradient(35% 28% at 80% 20%, rgba(99,102,241,0.12), transparent 65%)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 28px 80px" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 0 32px", borderBottom: "1px solid var(--hair)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg,#3b82f6,#0ea5e9)", boxShadow: "0 0 18px rgba(59,130,246,.45)", display: "grid", placeItems: "center" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", boxShadow: "0 0 8px #fff", display: "block" }} />
              </div>
              <span style={{ fontSize: 17 }}>Receptifi</span>
            </a>
            <span style={{ color: "var(--hair-strong)", fontSize: 20, fontWeight: 200 }}>|</span>
            <span style={{ color: "var(--ink-dim)", fontSize: 15, fontWeight: 500 }}>CRM</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setShowImport(true)}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, border: "1px solid rgba(96,165,250,0.3)", background: "rgba(59,130,246,0.08)", color: "var(--accent-2)", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Import CSV
            </button>
            <button
              onClick={() => setShowForm(true)}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, border: 0, background: "linear-gradient(180deg,#3b82f6,#2563eb)", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 16px rgba(37,99,235,.35)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              Add Lead
            </button>
          </div>
        </div>

        {/* ── Stat pills ── */}
        <div style={{ display: "flex", gap: 12, margin: "28px 0", flexWrap: "wrap" }}>
          {[{ key: "all" as const, label: "All leads", count: leads.length, color: "var(--accent-2)", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.25)" },
            ...STATUSES.map((s) => ({ key: s, label: STATUS[s].label, count: counts[s] ?? 0, color: STATUS[s].color, bg: STATUS[s].bg, border: STATUS[s].border })),
            { key: "unsubscribed" as const, label: "Unsubscribed", count: unsubscribedCount, color: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.28)" },
          ].map(({ key, label, count, color, bg, border }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 12, border: `1px solid ${filter === key ? border : "var(--hair)"}`, background: filter === key ? bg : "rgba(255,255,255,0.03)", cursor: "pointer", transition: "all .2s" }}
            >
              <span style={{ fontSize: 22, fontWeight: 700, color, letterSpacing: "-0.03em" }}>{count}</span>
              <span style={{ fontSize: 12, color: "var(--ink-dim)", fontWeight: 500 }}>{label}</span>
            </button>
          ))}
        </div>

        {/* ── Search + vertical filter ── */}
        <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)", pointerEvents: "none" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input
              type="text"
              placeholder="Search leads by name, email, business, phone, or city…"
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

        {/* ── Table ── */}
        {error && (
          <div style={{ padding: "20px 24px", borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5", marginBottom: 20, fontSize: 14 }}>
            <strong>Database error:</strong> {error}
            <div style={{ marginTop: 8, fontSize: 12, color: "rgba(252,165,165,0.7)" }}>Make sure the <code>leads</code> table has been created in your Supabase project. See setup instructions below.</div>
          </div>
        )}

        <div style={{ borderRadius: 16, border: "1px solid var(--hair-strong)", overflowX: "auto", background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid var(--hair)" }}>
                {["Name", "Business", "Vertical", "Offer", "Contact", "Status", "Outreach", "Notes", "Created", ""].map((h) => (
                  <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--ink-faint)", letterSpacing: "0.07em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={10} style={{ padding: 48, textAlign: "center", color: "var(--ink-faint)" }}>
                  <div style={{ display: "inline-flex", gap: 6 }}>
                    {[0, 0.15, 0.3].map((d, i) => (
                      <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-2)", animation: `dot 1.2s ease-in-out ${d}s infinite` }} />
                    ))}
                  </div>
                </td></tr>
              ) : visible.length === 0 ? (
                <tr><td colSpan={10} style={{ padding: 64, textAlign: "center", color: "var(--ink-faint)", fontSize: 14 }}>
                  {leads.length === 0 ? "No leads yet — add your first one above." : "No leads match your filter."}
                </td></tr>
              ) : visible.map((lead, i) => (
                <tr key={lead.id} style={{ borderBottom: i < visible.length - 1 ? "1px solid var(--hair)" : "none", transition: "background .15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>{lead.name}</div>
                    {lead.booked_at && (
                      <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>
                        Booked {new Date(lead.booked_at).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--ink-dim)" }}>
                    {lead.business_name || <span style={{ color: "var(--hair-strong)" }}>—</span>}
                    {lead.city && <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>{lead.city}</div>}
                    {lead.preview_slug && (
                      <a href={`/preview/${lead.preview_slug}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "var(--accent-2)", marginTop: 2, display: "inline-block" }}>
                        View site ↗
                      </a>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: "var(--ink-dim)", whiteSpace: "nowrap" }}>
                    {getVertical(lead.vertical).label}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <OfferBadge lead={lead} />
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13 }}>
                    {editingEmail === lead.id ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <input
                          autoFocus
                          type="email"
                          value={emailText}
                          onChange={(e) => setEmailText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && saveEmail(lead.id)}
                          placeholder="email@example.com"
                          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(96,165,250,0.4)", color: "var(--ink)", fontSize: 12, padding: "5px 8px", borderRadius: 7, fontFamily: "inherit", outline: "none", width: 150 }}
                        />
                        <button onClick={() => saveEmail(lead.id)} style={{ padding: "4px 10px", borderRadius: 6, border: 0, background: "rgba(59,130,246,0.2)", color: "var(--accent-2)", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Save</button>
                        <button onClick={() => setEditingEmail(null)} style={{ padding: "4px 10px", borderRadius: 6, border: 0, background: "rgba(255,255,255,0.06)", color: "var(--ink-dim)", fontSize: 11, cursor: "pointer" }}>Cancel</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setEditingEmail(lead.id); setEmailText(lead.email ?? ""); }}
                        title="Click to edit email"
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", display: "block", width: "100%" }}
                      >
                        {lead.email ? (
                          <div style={{ color: "var(--ink-dim)" }}>{lead.email}</div>
                        ) : (
                          <div style={{ color: "var(--hair-strong)" }}>+ Add email</div>
                        )}
                      </button>
                    )}
                    {lead.phone && <div style={{ color: "var(--ink-faint)", marginTop: 2 }}>{lead.phone}</div>}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <StatusSelect value={lead.status} onChange={(v) => updateStatus(lead.id, v)} />
                  </td>
                  <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                    {lead.unsubscribed_at ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: "#ef4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.28)" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ef4444" }} />
                        Unsubscribed
                      </span>
                    ) : lead.outreach_replied ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: "#4ade80", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.28)" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80" }} />
                        Replied
                      </span>
                    ) : lead.outreach_touch && lead.outreach_touch >= 3 ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: "#60a5fa", background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.28)" }}>
                        T3 sent
                      </span>
                    ) : lead.outreach_touch && lead.outreach_touch > 0 ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: "#fbbf24", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.28)" }}>
                        T{lead.outreach_touch} sent
                        {lead.outreach_sent_at && (
                          <span style={{ fontWeight: 400, color: "rgba(251,191,36,0.7)", fontSize: 10 }}>
                            {new Date(lead.outreach_sent_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span style={{ color: "var(--hair-strong)", fontSize: 12 }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px", maxWidth: 220 }}>
                    {editingNote === lead.id ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <textarea
                          autoFocus
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          rows={2}
                          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(96,165,250,0.4)", color: "var(--ink)", fontSize: 12, padding: "6px 10px", borderRadius: 8, resize: "none", fontFamily: "inherit", outline: "none" }}
                        />
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => saveNote(lead.id)} style={{ padding: "4px 10px", borderRadius: 6, border: 0, background: "rgba(59,130,246,0.2)", color: "var(--accent-2)", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Save</button>
                          <button onClick={() => setEditingNote(null)} style={{ padding: "4px 10px", borderRadius: 6, border: 0, background: "rgba(255,255,255,0.06)", color: "var(--ink-dim)", fontSize: 11, cursor: "pointer" }}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setEditingNote(lead.id); setNoteText(lead.notes ?? ""); }}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", width: "100%" }}
                      >
                        <span style={{ fontSize: 12, color: lead.notes ? "var(--ink-dim)" : "var(--hair-strong)", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {lead.notes || "Add note…"}
                        </span>
                      </button>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: "var(--ink-faint)", whiteSpace: "nowrap" }}>
                    {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    {lead.source && (
                      <div style={{ fontSize: 10, marginTop: 2, textTransform: "capitalize" }}>
                        {lead.source.replace(/_/g, " ")}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <button
                      onClick={() => deleteLead(lead.id)}
                      title="Delete lead"
                      style={{ appearance: "none", border: 0, background: "transparent", color: "var(--hair-strong)", cursor: "pointer", padding: 4, borderRadius: 6, display: "grid", placeItems: "center", transition: "color .15s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#ef4444")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--hair-strong)")}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visible.length > 0 && (
          <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-faint)", textAlign: "right" }}>
            {visible.length} of {leads.length} lead{leads.length !== 1 ? "s" : ""}
          </div>
        )}

        {/* ── SQL setup instructions (shown only on error) ── */}
        {error && (
          <div style={{ marginTop: 32, padding: "24px 28px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid var(--hair)", fontSize: 13 }}>
            <div style={{ fontWeight: 600, marginBottom: 12, color: "var(--ink-dim)", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.08em" }}>Setup: Run this SQL in your Supabase SQL editor</div>
            <pre style={{ background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: "16px 18px", overflowX: "auto", color: "#93c5fd", fontSize: 12, lineHeight: 1.7, margin: 0 }}>{SQL_SETUP}</pre>
          </div>
        )}
      </div>

      {/* ── Add lead modal ── */}
      {showForm && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 70, background: "rgba(5,7,13,0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
        >
          <div style={{ width: "100%", maxWidth: 480, background: "linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))", border: "1px solid var(--hair-strong)", borderRadius: 20, padding: 36, backdropFilter: "blur(20px)", boxShadow: "0 40px 100px rgba(0,0,0,.7), 0 0 60px rgba(59,130,246,.12)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Add New Lead</h3>
              <button onClick={() => setShowForm(false)} style={{ appearance: "none", border: 0, background: "rgba(255,255,255,0.06)", color: "var(--ink-dim)", width: 32, height: 32, borderRadius: 8, cursor: "pointer", display: "grid", placeItems: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={addLead}>
              {[
                { id: "name",          label: "Full name *",          type: "text",  placeholder: "Jane Smith",           required: true  },
                { id: "business_name", label: "Practice / business",  type: "text",  placeholder: "Smith Family Dental",  required: false },
                { id: "email",         label: "Email",                type: "email", placeholder: "jane@example.com",     required: false },
                { id: "phone",         label: "Phone",                type: "tel",   placeholder: "(555) 000-0000",       required: false },
              ].map(({ id, label, type, placeholder, required }) => (
                <div key={id} style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--ink-dim)", marginBottom: 5 }}>{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    value={(form as Record<string, string>)[id]}
                    onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--hair-strong)", color: "var(--ink)", fontFamily: "inherit", fontSize: 14, padding: "10px 13px", borderRadius: 10, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--ink-dim)", marginBottom: 5 }}>Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as LeadStatus }))}
                  style={{ width: "100%", appearance: "none", background: "rgba(255,255,255,0.05)", border: "1px solid var(--hair-strong)", color: "var(--ink)", fontFamily: "inherit", fontSize: 14, padding: "10px 13px", borderRadius: 10, outline: "none", cursor: "pointer" }}
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{STATUS[s].label}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--ink-dim)", marginBottom: 5 }}>Notes</label>
                <textarea
                  placeholder="Interested in bilingual plan, called about hours…"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--hair-strong)", color: "var(--ink)", fontFamily: "inherit", fontSize: 14, padding: "10px 13px", borderRadius: 10, outline: "none", resize: "vertical", boxSizing: "border-box" }}
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                style={{ width: "100%", padding: "13px", borderRadius: 11, border: 0, background: "linear-gradient(180deg,#3b82f6,#2563eb)", color: "#fff", fontWeight: 600, fontSize: 15, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1, fontFamily: "inherit" }}
              >
                {saving ? "Saving…" : "Save Lead"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Import CSV modal ── */}
      {showImport && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 70, background: "rgba(5,7,13,0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={(e) => e.target === e.currentTarget && !importing && setShowImport(false)}
        >
          <div style={{ width: "100%", maxWidth: 580, background: "linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))", border: "1px solid var(--hair-strong)", borderRadius: 20, padding: 36, backdropFilter: "blur(20px)", boxShadow: "0 40px 100px rgba(0,0,0,.7), 0 0 60px rgba(59,130,246,.12)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Import CSV Leads</h3>
              <button onClick={() => setShowImport(false)} disabled={importing} style={{ appearance: "none", border: 0, background: "rgba(255,255,255,0.06)", color: "var(--ink-dim)", width: 32, height: 32, borderRadius: 8, cursor: "pointer", display: "grid", placeItems: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {/* File picker */}
            <label style={{ display: "block", marginBottom: 20, cursor: "pointer" }}>
              <div style={{ border: "1px dashed rgba(96,165,250,0.35)", borderRadius: 12, padding: "24px 20px", textAlign: "center", background: "rgba(59,130,246,0.04)", transition: "background .2s" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 10 }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <p style={{ margin: 0, fontSize: 14, color: "var(--ink-dim)" }}>
                  {importRows.length > 0 ? `${importRows.length} leads loaded` : "Click to select your dental-leads CSV"}
                </p>
                <p style={{ margin: "6px 0 0", fontSize: 12, color: "var(--ink-faint)" }}>Expects columns: business_name, phone, rating, review_count, high_priority</p>
              </div>
              <input ref={fileRef} type="file" accept=".csv" onChange={handleCsvFile} style={{ display: "none" }} />
            </label>

            {/* Preview */}
            {importRows.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                  <span style={{ padding: "5px 12px", borderRadius: 999, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", fontSize: 12, color: "var(--accent-2)", fontWeight: 600 }}>
                    {importRows.length} total leads
                  </span>
                  <span style={{ padding: "5px 12px", borderRadius: 999, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", fontSize: 12, color: "#fbbf24", fontWeight: 600 }}>
                    {importRows.filter((r) => r.high_priority === "Yes").length} high-priority → Warm
                  </span>
                  <span style={{ padding: "5px 12px", borderRadius: 999, background: "rgba(154,165,184,0.1)", border: "1px solid rgba(154,165,184,0.25)", fontSize: 12, color: "#9aa5b8", fontWeight: 600 }}>
                    {importRows.filter((r) => r.high_priority !== "Yes").length} standard → Cold
                  </span>
                </div>
                <div style={{ borderRadius: 10, border: "1px solid var(--hair)", overflow: "hidden", fontSize: 12 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid var(--hair)" }}>
                        {["Business", "Phone", "Rating", "Priority"].map((h) => (
                          <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "var(--ink-faint)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", fontSize: 10 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {importRows.slice(0, 5).map((r, i) => (
                        <tr key={i} style={{ borderBottom: i < 4 ? "1px solid var(--hair)" : "none" }}>
                          <td style={{ padding: "8px 12px", color: "var(--ink)" }}>{r.business_name}</td>
                          <td style={{ padding: "8px 12px", color: "var(--ink-dim)" }}>{r.phone || "—"}</td>
                          <td style={{ padding: "8px 12px", color: "var(--ink-dim)" }}>{r.rating} ({r.review_count})</td>
                          <td style={{ padding: "8px 12px" }}>
                            {r.high_priority === "Yes"
                              ? <span style={{ color: "#fbbf24", fontWeight: 600 }}>Warm</span>
                              : <span style={{ color: "#9aa5b8" }}>Cold</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {importRows.length > 5 && (
                    <div style={{ padding: "8px 12px", textAlign: "center", color: "var(--ink-faint)", fontSize: 11, borderTop: "1px solid var(--hair)" }}>
                      + {importRows.length - 5} more rows
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={runImport}
              disabled={importing || importRows.length === 0}
              style={{ width: "100%", padding: "13px", borderRadius: 11, border: 0, background: importRows.length === 0 ? "rgba(59,130,246,0.2)" : "linear-gradient(180deg,#3b82f6,#2563eb)", color: "#fff", fontWeight: 600, fontSize: 15, cursor: importing || importRows.length === 0 ? "not-allowed" : "pointer", opacity: importing ? 0.7 : 1, fontFamily: "inherit" }}
            >
              {importing ? "Importing…" : importRows.length === 0 ? "Select a CSV file above" : `Import ${importRows.length} Leads`}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dot { 0%,80%,100%{opacity:.3;transform:translateY(0)} 40%{opacity:1;transform:translateY(-4px)} }
        input:focus, textarea:focus, select:focus { border-color: rgba(96,165,250,0.5) !important; background: rgba(255,255,255,0.07) !important; }
        input::placeholder, textarea::placeholder { color: var(--ink-faint); }
        select option { background: #0a0e1a; }
      `}</style>
    </div>
  );
}

const SQL_SETUP = `-- Run this in your Supabase SQL editor (supabase.com/dashboard)

-- Initial table (skip if already exists)
create table if not exists public.leads (
  id            uuid        default gen_random_uuid() primary key,
  name          text        not null,
  business_name text,
  phone         text,
  email         text,
  status        text        default 'cold'
                            check (status in ('cold','warm','booked','closed')),
  notes         text,
  created_at    timestamptz default now(),
  booked_at     timestamptz
);

-- Outreach tracking columns (run if upgrading an existing table)
alter table public.leads
  add column if not exists outreach_touch   int     default 0,
  add column if not exists outreach_sent_at date,
  add column if not exists outreach_replied boolean default false;

-- Allow full access via the anon key (internal CRM tool)
alter table public.leads enable row level security;
drop policy if exists "crm_all" on public.leads;
create policy "crm_all" on public.leads for all using (true) with check (true);`;
