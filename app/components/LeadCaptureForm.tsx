"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

interface Props {
  onSuccess: () => void;
}

export default function LeadCaptureForm({ onSuccess }: Props) {
  const [fields, setFields] = useState({
    name: "",
    business_name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [hover, setHover] = useState(false);

  function set(key: keyof typeof fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    await Promise.allSettled([
      supabase.from("leads").insert({
        name: fields.name.trim(),
        business_name: fields.business_name.trim() || null,
        email: fields.email.trim() || null,
        phone: fields.phone.trim() || null,
        status: "cold",
      }).then(({ error }) => {
        if (error) console.error("[LeadCaptureForm] Supabase insert failed:", error);
      }),
      fetch("/api/nurture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fields.name.trim(), email: fields.email.trim() }),
      }).then(async (res) => {
        if (!res.ok) console.error("[LeadCaptureForm] Nurture API failed:", await res.text());
      }).catch((err) => {
        console.error("[LeadCaptureForm] Nurture fetch error:", err);
      }),
    ]);

    setSubmitting(false);
    onSuccess();
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.09)",
    background: "rgba(255,255,255,0.04)",
    color: "var(--ink)",
    fontSize: 15,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 500,
    color: "var(--ink-dim)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: 6,
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.035)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 20,
        padding: "40px 36px",
        maxWidth: 460,
        width: "100%",
        boxShadow:
          "0 0 0 1px rgba(59,130,246,0.08), 0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        animation: "fadeIn 0.4s ease",
      }}
    >
      <p
        style={{
          fontSize: 13,
          color: "var(--ink-faint)",
          marginTop: 0,
          marginBottom: 32,
          lineHeight: 1.5,
        }}
      >
        We&apos;ll connect you with Aria — our AI receptionist — right away.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input
            required
            type="text"
            placeholder="Jane Smith"
            value={fields.name}
            onChange={(e) => set("name", e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
          />
        </div>

        <div>
          <label style={labelStyle}>Business Name *</label>
          <input
            required
            type="text"
            placeholder="Acme Dental"
            value={fields.business_name}
            onChange={(e) => set("business_name", e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
          />
        </div>

        <div>
          <label style={labelStyle}>Email *</label>
          <input
            required
            type="email"
            placeholder="jane@acmedental.com"
            value={fields.email}
            onChange={(e) => set("email", e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
          />
        </div>

        <div>
          <label style={labelStyle}>Phone Number *</label>
          <input
            required
            type="tel"
            placeholder="(555) 000-0000"
            value={fields.phone}
            onChange={(e) => set("phone", e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            marginTop: 8,
            padding: "15px 28px",
            borderRadius: 12,
            border: 0,
            background: submitting
              ? "rgba(59,130,246,0.35)"
              : hover
              ? "linear-gradient(135deg,#2563eb,#0284c7)"
              : "linear-gradient(135deg,#3b82f6,#0ea5e9)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: submitting ? "default" : "pointer",
            boxShadow: submitting
              ? "none"
              : hover
              ? "0 0 40px rgba(59,130,246,0.55), 0 0 0 1px rgba(96,165,250,0.4)"
              : "0 0 28px rgba(59,130,246,0.4), 0 0 0 1px rgba(96,165,250,0.3)",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {submitting ? (
            <>
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  animation: "spin 0.8s linear infinite",
                  display: "inline-block",
                }}
              />
              Connecting…
            </>
          ) : (
            "Talk to Our AI Receptionist →"
          )}
        </button>
      </form>
    </div>
  );
}
