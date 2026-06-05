"use client";

import { useRetellCall } from "./useRetellCall";

export default function HeroCallButton() {
  const { status, agentTalking, error, start, stop } = useRetellCall();

  const active = status === "active";
  const connecting = status === "connecting";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <button
        onClick={active ? stop : start}
        disabled={connecting || status === "ending"}
        className="btn btn-ghost"
        style={{
          display: "inline-flex", alignItems: "center", gap: 9,
          borderColor: active ? "rgba(74,222,128,0.4)" : undefined,
          color: active ? "#4ade80" : undefined,
          background: active ? "rgba(74,222,128,0.06)" : undefined,
          opacity: (connecting || status === "ending") ? 0.6 : 1,
          cursor: (connecting || status === "ending") ? "not-allowed" : "pointer",
        }}
      >
        {connecting ? (
          <>
            <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(96,165,250,0.3)", borderTopColor: "var(--accent-2)", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
            Connecting…
          </>
        ) : active ? (
          <>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", animation: "pulse 1.4s ease-in-out infinite", display: "inline-block" }} />
            {agentTalking ? "AI is speaking…" : "Listening…"}
            &nbsp;·&nbsp;End call
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
            </svg>
            Talk to Our AI Receptionist
          </>
        )}
      </button>
      {error && (
        <span style={{ fontSize: 12, color: "#fca5a5" }}>{error}</span>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
