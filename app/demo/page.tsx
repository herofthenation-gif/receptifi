"use client";

import { useState } from "react";
import { useRetellCall } from "../components/useRetellCall";
import LeadCaptureForm from "../components/LeadCaptureForm";

export default function DemoPage() {
  const [leadCaptured, setLeadCaptured] = useState(false);
  const { status, agentTalking, error, start, stop } = useRetellCall();

  const idle       = status === "idle";
  const connecting = status === "connecting";
  const active     = status === "active";
  const ending     = status === "ending";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)", color: "var(--ink)", fontFamily: "Inter, ui-sans-serif, sans-serif", position: "relative", overflow: "hidden" }}>

      {/* Ambient */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(50% 40% at 50% 30%, rgba(59,130,246,0.22), transparent 65%), radial-gradient(35% 28% at 80% 70%, rgba(99,102,241,0.14), transparent 65%)" }} />
      {/* Grid */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse at 50% 30%,#000 20%,transparent 75%)" }} />

      {/* Nav */}
      <nav style={{ position: "relative", zIndex: 10, padding: "0 28px", borderBottom: "1px solid var(--hair)", backdropFilter: "blur(18px)", background: "rgba(5,7,13,0.6)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 17, textDecoration: "none", color: "var(--ink)" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "linear-gradient(135deg,#3b82f6,#0ea5e9)", boxShadow: "0 0 18px rgba(59,130,246,.45)", display: "grid", placeItems: "center" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", display: "block" }} />
            </div>
            Receptifi
          </a>
          <a href="/" style={{ fontSize: 13, color: "var(--ink-dim)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back to site
          </a>
        </div>
      </nav>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 28px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", maxWidth: 620 }}>

          {/* Eyebrow */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)", color: "var(--accent-2)", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-2)", boxShadow: "0 0 8px var(--accent-2)", animation: "pulse 2s ease-in-out infinite", display: "inline-block" }} />
            Live AI Demo
          </div>

          <h1 style={{ fontSize: "clamp(36px,5.5vw,64px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, margin: "0 0 20px" }}>
            Meet Your Future{" "}
            <span style={{ background: "linear-gradient(180deg,#fff 0%,#93c5fd 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Receptionist
            </span>
          </h1>
          <p style={{ fontSize: 18, color: "var(--ink-dim)", lineHeight: 1.6, margin: "0 0 40px", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            No scripts. No hold music. Just your new front desk —<br />
            available right now, 24/7.
          </p>

          {/* ── Lead capture gate ── */}
          {!leadCaptured && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LeadCaptureForm onSuccess={() => setLeadCaptured(true)} />
            </div>
          )}

          {/* ── Call interface (shown after form submit) ── */}
          {leadCaptured && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>

                {/* Pulsing rings — only while active */}
                {active && (
                  <>
                    <span style={{ position: "absolute", inset: -20, borderRadius: "50%", border: "1px solid rgba(96,165,250,0.35)", animation: "ringOut 2.4s ease-out infinite" }} />
                    <span style={{ position: "absolute", inset: -20, borderRadius: "50%", border: "1px solid rgba(96,165,250,0.35)", animation: "ringOut 2.4s ease-out 0.8s infinite" }} />
                    <span style={{ position: "absolute", inset: -20, borderRadius: "50%", border: "1px solid rgba(96,165,250,0.35)", animation: "ringOut 2.4s ease-out 1.6s infinite" }} />
                  </>
                )}

                {/* Agent talking rings */}
                {agentTalking && (
                  <>
                    <span style={{ position: "absolute", inset: -8, borderRadius: "50%", border: "2px solid rgba(74,222,128,0.5)", animation: "ringOut 1.2s ease-out infinite" }} />
                    <span style={{ position: "absolute", inset: -8, borderRadius: "50%", border: "2px solid rgba(74,222,128,0.5)", animation: "ringOut 1.2s ease-out 0.4s infinite" }} />
                  </>
                )}

                {/* Main button */}
                <button
                  onClick={idle ? start : undefined}
                  disabled={connecting || ending || active}
                  aria-label={idle ? "Start call" : connecting ? "Connecting" : "Call active"}
                  style={{
                    width: 120, height: 120, borderRadius: "50%", border: 0, cursor: idle ? "pointer" : "default",
                    background: active
                      ? "linear-gradient(135deg, rgba(74,222,128,0.25), rgba(74,222,128,0.1))"
                      : connecting || ending
                      ? "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(14,165,233,0.1))"
                      : "linear-gradient(135deg, #3b82f6, #0ea5e9)",
                    boxShadow: active
                      ? "0 0 60px rgba(74,222,128,0.35), 0 0 0 1px rgba(74,222,128,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)"
                      : connecting || ending
                      ? "0 0 40px rgba(59,130,246,0.25), 0 0 0 1px rgba(96,165,250,0.2)"
                      : "0 0 60px rgba(59,130,246,0.5), 0 0 0 1px rgba(96,165,250,0.4), inset 0 0 0 1px rgba(255,255,255,0.15)",
                    display: "grid", placeItems: "center", color: "#fff",
                    transition: "all 0.4s cubic-bezier(0.2,0.7,0.3,1)",
                    transform: active ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  {connecting || ending ? (
                    <span style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.2)", borderTopColor: "#fff", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                  ) : active ? (
                    <div style={{ display: "flex", gap: 5, alignItems: "center", height: 40 }}>
                      {[0, 0.15, 0.3, 0.45, 0.6].map((d, i) => (
                        <span key={i} style={{ width: 4, borderRadius: 3, background: agentTalking ? "#4ade80" : "#fff", display: "block",
                          animation: agentTalking ? `bars 0.9s ease-in-out ${d}s infinite` : `barsIdle 2s ease-in-out ${d}s infinite`,
                        }} />
                      ))}
                    </div>
                  ) : (
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Status text */}
              <div style={{ minHeight: 28 }}>
                {idle && !error && (
                  <p style={{ fontSize: 15, color: "var(--ink-dim)", margin: 0 }}>
                    Click to start a live call with Receptifi&apos;s AI
                  </p>
                )}
                {connecting && (
                  <p style={{ fontSize: 15, color: "var(--accent-2)", margin: 0, animation: "fadeIn 0.3s ease" }}>
                    Connecting to your AI receptionist…
                  </p>
                )}
                {active && (
                  <p style={{ fontSize: 15, color: agentTalking ? "#4ade80" : "var(--ink-dim)", margin: 0, transition: "color 0.3s" }}>
                    {agentTalking ? "AI is speaking…" : "Go ahead — say hi or ask a question"}
                  </p>
                )}
                {ending && (
                  <p style={{ fontSize: 15, color: "var(--ink-faint)", margin: 0 }}>Ending call…</p>
                )}
                {error && (
                  <p style={{ fontSize: 13, color: "#fca5a5", margin: 0, maxWidth: 380, textAlign: "center" }}>{error}</p>
                )}
              </div>

              {/* Hang up button */}
              {active && (
                <button
                  onClick={stop}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 999, border: "1px solid rgba(239,68,68,0.35)", background: "rgba(239,68,68,0.08)", color: "#fca5a5", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", animation: "fadeIn 0.4s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.55)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.35)"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                  </svg>
                  Hang Up
                </button>
              )}

              {/* Retry after error */}
              {error && idle && (
                <button
                  onClick={start}
                  style={{ padding: "10px 24px", borderRadius: 10, border: "1px solid var(--hair-strong)", background: "transparent", color: "var(--ink)", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
                >
                  Try again
                </button>
              )}

              {/* Mic permission note */}
              {idle && !error && (
                <p style={{ marginTop: 12, fontSize: 12, color: "var(--ink-faint)" }}>
                  Your browser will ask for microphone access — required for the call.
                </p>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Footer strip */}
      <div style={{ position: "relative", zIndex: 1, padding: "20px 28px", borderTop: "1px solid var(--hair)", textAlign: "center", fontSize: 12, color: "var(--ink-faint)" }}>
        Powered by <strong style={{ color: "var(--ink-dim)" }}>Receptifi</strong> · AI Voice Receptionist
      </div>

      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes pulse   { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes ringOut { 0%{transform:scale(.85);opacity:1} 100%{transform:scale(2);opacity:0} }
        @keyframes bars    { 0%,100%{height:8px} 50%{height:32px} }
        @keyframes barsIdle{ 0%,100%{height:10px} 50%{height:22px} }
        @keyframes fadeIn  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
      `}</style>
    </div>
  );
}
