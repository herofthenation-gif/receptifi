"use client";
import CalendlyButton from "./CalendlyButton";

export default function DemoForm() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 8 }}>
      <CalendlyButton className="btn btn-primary" style={{ padding: "16px 36px", fontSize: 16, borderRadius: 12 } as React.CSSProperties}>
        Book a Demo →
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </CalendlyButton>
      <p style={{ fontSize: 13, color: "var(--ink-faint)", margin: 0 }}>
        No commitment. No credit card. Pick a time that works for you.
      </p>
    </div>
  );
}
