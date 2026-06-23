"use client";

import { useState, useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/karmello-koba1ba/30min";

export default function SiteHero() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "#0A0A0A",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 120,
        paddingBottom: 0,
        overflow: "hidden",
      }}
    >
      {/* Chrome noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(192,192,192,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Left stone polygons */}
      <StoneLeft />
      {/* Right stone polygons */}
      <StoneRight />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 860,
          padding: "0 24px",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#5A5A5A",
            marginBottom: 28,
          }}
        >
          Aria AI Receptionist — Inland Empire, CA
        </div>

        {/* Headline line 1 */}
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(56px, 8vw, 96px)",
            lineHeight: 0.96,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            margin: 0,
            color: "#E2E2E2",
          }}
        >
          Your Phone Rang at 7 PM.
        </h1>

        {/* Headline line 2 */}
        <h1
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(56px, 8vw, 96px)",
            lineHeight: 0.96,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            margin: "8px 0 0",
            color: "#8A8A8A",
          }}
        >
          They Found Another Dentist.
        </h1>

        {/* Subline */}
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: 17,
            lineHeight: 1.6,
            color: "#4A4A4A",
            marginTop: 28,
            maxWidth: 520,
          }}
        >
          Aria answers every call, books appointments, and follows up — 24 hours a day.
          Your front desk, upgraded.
        </p>

        {/* CTA */}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: 40,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            backgroundColor: "#7B2FBE",
            borderRadius: 999,
            padding: "15px 40px",
            textDecoration: "none",
            boxShadow: "0 0 40px rgba(123,47,190,0.35)",
            transition: "box-shadow 0.2s ease, transform 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 60px rgba(123,47,190,0.6)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 40px rgba(123,47,190,0.35)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
          }}
        >
          Book a Free Demo
        </a>

        {/* Trust chips */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["No contracts.", "Live in 7 days.", "24/7 coverage."].map((chip) => (
            <span
              key={chip}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: "#9A9A9A",
                border: "1px solid rgba(192,192,192,0.25)",
                borderRadius: 999,
                padding: "6px 14px",
                backgroundColor: "#0A0A0A",
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Aria console card */}
        <AriaConsole tick={tick} />
      </div>
    </section>
  );
}

/* ── Aria console mock ───────────────────────────────────── */

const TRANSCRIPT_LINES = [
  { role: "caller", text: "Hi, I need to schedule a cleaning for my daughter." },
  { role: "aria", text: "Of course. What dates work best for you?" },
  { role: "caller", text: "Maybe Thursday afternoon, around 3?" },
  { role: "aria", text: "Thursday at 3 PM is open. I'll book that now." },
];

function AriaConsole({ tick }: { tick: number }) {
  const visibleLines = Math.min(tick, TRANSCRIPT_LINES.length);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 620,
        marginTop: 56,
        backgroundColor: "#0F0F0F",
        border: "1px solid rgba(192,192,192,0.22)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.8), 0 0 60px rgba(123,47,190,0.08)",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderBottom: "1px solid rgba(192,192,192,0.1)",
          backgroundColor: "#0D0D0D",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <div
                key={c}
                style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c, opacity: 0.7 }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#4A4A4A",
              marginLeft: 8,
            }}
          >
            Aria Receptionist
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              boxShadow: "0 0 6px #22C55E",
            }}
          />
          <span style={{ fontSize: 11, color: "#22C55E", fontWeight: 600, letterSpacing: "0.06em" }}>
            LIVE
          </span>
        </div>
      </div>

      {/* Incoming call strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: "1px solid rgba(192,192,192,0.08)",
          backgroundColor: "rgba(123,47,190,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "rgba(192,192,192,0.08)",
              border: "1px solid rgba(192,192,192,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhoneIcon />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#D4D4D4" }}>
              Inbound Call — (951) 555-0182
            </div>
            <div style={{ fontSize: 11, color: "#5A5A5A", marginTop: 2 }}>
              New patient inquiry
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#7B2FBE",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Answering
        </div>
      </div>

      {/* Transcript */}
      <div style={{ padding: "16px 18px", minHeight: 140 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#3A3A3A",
            marginBottom: 12,
          }}
        >
          Live Transcript
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TRANSCRIPT_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                opacity: 1,
                animation: "fadeUp 0.35s ease",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: line.role === "aria" ? "#7B2FBE" : "#5A5A5A",
                  minWidth: 40,
                  paddingTop: 1,
                }}
              >
                {line.role === "aria" ? "Aria" : "Caller"}
              </span>
              <span style={{ fontSize: 13, color: "#9A9A9A", lineHeight: 1.5 }}>{line.text}</span>
            </div>
          ))}
          {visibleLines > 0 && visibleLines < TRANSCRIPT_LINES.length && (
            <TypingIndicator />
          )}
        </div>
      </div>

      {/* Booking confirmation */}
      {tick >= TRANSCRIPT_LINES.length && (
        <div
          style={{
            margin: "0 18px 18px",
            padding: "12px 16px",
            backgroundColor: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <CheckCircleIcon />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#22C55E" }}>
              Appointment Booked
            </div>
            <div style={{ fontSize: 11, color: "#5A5A5A", marginTop: 2 }}>
              Thursday, 3:00 PM — Dental Cleaning (New Patient)
            </div>
          </div>
        </div>
      )}

      {/* Bottom fade to bleed off page */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: "linear-gradient(to bottom, transparent, #0A0A0A)",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#7B2FBE",
          minWidth: 40,
        }}
      >
        Aria
      </span>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {[0, 0.2, 0.4].map((delay) => (
          <div
            key={delay}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              backgroundColor: "#7B2FBE",
              animation: `blink 1.1s ${delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Stone polygon SVGs ──────────────────────────────────── */

function StoneLeft() {
  return (
    <svg
      viewBox="0 0 320 800"
      width={320}
      height={800}
      style={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        opacity: 0.55,
        pointerEvents: "none",
      }}
      fill="none"
    >
      <polygon points="0,0 180,60 140,200 0,180" fill="rgba(80,80,80,0.18)" stroke="rgba(160,160,160,0.12)" strokeWidth="0.8" />
      <polygon points="0,180 140,200 100,380 0,360" fill="rgba(60,60,60,0.14)" stroke="rgba(140,140,140,0.1)" strokeWidth="0.8" />
      <polygon points="0,360 100,380 80,520 0,500" fill="rgba(50,50,50,0.12)" stroke="rgba(120,120,120,0.09)" strokeWidth="0.8" />
      <polygon points="0,500 80,520 60,660 0,640" fill="rgba(40,40,40,0.1)" stroke="rgba(100,100,100,0.08)" strokeWidth="0.8" />
      <polygon points="0,640 60,660 40,800 0,800" fill="rgba(30,30,30,0.08)" stroke="rgba(90,90,90,0.07)" strokeWidth="0.8" />
      <polygon points="60,80 200,20 220,140 80,180" fill="rgba(70,70,70,0.1)" stroke="rgba(150,150,150,0.1)" strokeWidth="0.6" />
      <polygon points="40,280 160,240 180,340 60,380" fill="rgba(60,60,60,0.09)" stroke="rgba(130,130,130,0.09)" strokeWidth="0.6" />
    </svg>
  );
}

function StoneRight() {
  return (
    <svg
      viewBox="0 0 320 800"
      width={320}
      height={800}
      style={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%) scaleX(-1)",
        opacity: 0.55,
        pointerEvents: "none",
      }}
      fill="none"
    >
      <polygon points="0,0 180,60 140,200 0,180" fill="rgba(80,80,80,0.18)" stroke="rgba(160,160,160,0.12)" strokeWidth="0.8" />
      <polygon points="0,180 140,200 100,380 0,360" fill="rgba(60,60,60,0.14)" stroke="rgba(140,140,140,0.1)" strokeWidth="0.8" />
      <polygon points="0,360 100,380 80,520 0,500" fill="rgba(50,50,50,0.12)" stroke="rgba(120,120,120,0.09)" strokeWidth="0.8" />
      <polygon points="0,500 80,520 60,660 0,640" fill="rgba(40,40,40,0.1)" stroke="rgba(100,100,100,0.08)" strokeWidth="0.8" />
      <polygon points="0,640 60,660 40,800 0,800" fill="rgba(30,30,30,0.08)" stroke="rgba(90,90,90,0.07)" strokeWidth="0.8" />
      <polygon points="60,80 200,20 220,140 80,180" fill="rgba(70,70,70,0.1)" stroke="rgba(150,150,150,0.1)" strokeWidth="0.6" />
      <polygon points="40,280 160,240 180,340 60,380" fill="rgba(60,60,60,0.09)" stroke="rgba(130,130,130,0.09)" strokeWidth="0.6" />
    </svg>
  );
}

/* ── Inline icons ────────────────────────────────────────── */

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(192,192,192,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4 12 14.01l-3-3" />
    </svg>
  );
}
