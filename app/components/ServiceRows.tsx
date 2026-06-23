"use client";

import { useState } from "react";

/* ── Shared types ───────────────────────────────────────── */

type RowProps = {
  flip?: boolean;
  overline: string;
  headline: string;
  description: string;
  learnMore?: string;
  mockup: React.ReactNode;
};

/* ── Section wrapper ────────────────────────────────────── */

export default function ServiceRows() {
  return (
    <section
      id="services"
      style={{ backgroundColor: "#0A0A0A", paddingTop: 0 }}
    >
      <SectionLabel />
      <FeatureRow
        overline="Voice — Aria AI Receptionist"
        headline="Every call answered. Every patient captured."
        description="Aria picks up before the second ring — 24 hours a day. She qualifies the caller, books the appointment, and sends a confirmation. Your team handles care. Aria handles the calls they can't."
        mockup={<VoiceMockup />}
      />
      <Divider />
      <FeatureRow
        flip
        overline="Web — Done-For-You Websites"
        headline="A website that works as hard as you do."
        description="Built for dental offices. Fast, mobile-first, and conversion-optimized from day one. Booking widget, insurance info, and Google review integration baked in. Live in 7 days."
        mockup={<WebMockup />}
      />
    </section>
  );
}

export function ServiceRowsBottom() {
  return (
    <section style={{ backgroundColor: "#0A0A0A" }}>
      <Divider />
      <FeatureRow
        overline="Reviews — Reputation Automation"
        headline="Your reputation on autopilot."
        description="After every visit, Aria sends a personalized review request. AI drafts responses to every review — 5-star or 1-star. Your Google rating climbs while you focus on patients."
        mockup={<ReviewsMockup />}
      />
      <Divider />
      <FeatureRow
        flip
        overline="CRM — Patient Relationship Manager"
        headline="No lead left behind. Ever."
        description="Every inquiry, missed call, and form fill lands in one smart inbox. Aria follows up automatically. You see the full patient journey — from first call to booked appointment — in one place."
        mockup={<CrmMockup />}
      />
    </section>
  );
}

/* ── Section label ──────────────────────────────────────── */

function SectionLabel() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 48px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 64,
        }}
      >
        <div
          style={{
            height: 1,
            width: 40,
            backgroundColor: "rgba(192,192,192,0.25)",
          }}
        />
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#3A3A3A",
          }}
        >
          Four Services. One System.
        </span>
      </div>
    </div>
  );
}

/* ── Feature row ────────────────────────────────────────── */

function FeatureRow({ flip, overline, headline, description, mockup }: RowProps) {
  const [hovered, setHovered] = useState(false);

  const textCol = (
    <div
      style={{
        flex: "0 0 42%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#4A4A4A",
          marginBottom: 18,
          display: "block",
        }}
      >
        {overline}
      </span>
      <h2
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(34px, 4vw, 52px)",
          lineHeight: 1.0,
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          color: "#D4D4D4",
          margin: "0 0 20px",
        }}
      >
        {headline}
      </h2>
      <p
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 15,
          lineHeight: 1.7,
          color: "#4E4E4E",
          margin: "0 0 28px",
          maxWidth: 420,
        }}
      >
        {description}
      </p>
      <a
        href="#demo"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: hovered ? "#E8E8E8" : "#6A6A6A",
          textDecoration: "none",
          transition: "color 0.15s ease",
        }}
      >
        Learn more
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: hovered ? "translateX(3px)" : "translateX(0)",
            transition: "transform 0.15s ease",
          }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );

  const mockupCol = (
    <div style={{ flex: "0 0 52%", display: "flex", alignItems: "center" }}>
      {mockup}
    </div>
  );

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "72px 48px",
        display: "flex",
        alignItems: "center",
        gap: 80,
        flexDirection: flip ? "row-reverse" : "row",
      }}
    >
      {textCol}
      {mockupCol}
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 48px",
      }}
    >
      <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.05)" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MOCKUP 1 — VOICE / ARIA CALL INTERFACE
══════════════════════════════════════════════════════════════ */

function VoiceMockup() {
  return (
    <MockupShell>
      {/* Live call header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: "1px solid rgba(192,192,192,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#7B2FBE",
              boxShadow: "0 0 8px rgba(123,47,190,0.8)",
            }}
          />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#C0C0C0",
              letterSpacing: "0.04em",
            }}
          >
            Live Call — Aria Answering
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11,
            color: "#3A3A3A",
          }}
        >
          0:42
        </span>
      </div>

      {/* Caller info */}
      <div style={{ padding: "16px 18px 12px" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#2E2E2E",
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: 8,
          }}
        >
          Caller
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "rgba(192,192,192,0.06)",
              border: "1px solid rgba(192,192,192,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(192,192,192,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#D4D4D4", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              (951) 555-0182
            </div>
            <div style={{ fontSize: 11, color: "#3A3A3A", fontFamily: "'Space Grotesk', sans-serif" }}>
              New patient — first call
            </div>
          </div>
        </div>
      </div>

      {/* Waveform */}
      <div
        style={{
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          gap: 3,
          height: 44,
        }}
      >
        {[6, 14, 8, 20, 10, 16, 6, 22, 12, 18, 8, 14, 20, 10, 16, 6, 12, 18, 8, 22, 10, 14, 6, 16].map(
          (h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: h,
                borderRadius: 2,
                backgroundColor:
                  i < 16
                    ? `rgba(123,47,190,${0.3 + (i / 16) * 0.5})`
                    : "rgba(192,192,192,0.12)",
              }}
            />
          )
        )}
      </div>

      {/* Transcript */}
      <div
        style={{
          margin: "0 18px",
          padding: "12px 14px",
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(192,192,192,0.07)",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#2E2E2E",
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: 10,
          }}
        >
          Transcript
        </div>
        {[
          { role: "aria", text: "Thank you for calling. How can I help you today?" },
          { role: "caller", text: "I need to book a cleaning for next week." },
          { role: "aria", text: "I have Tuesday at 2 PM open. Shall I book that?" },
        ].map((line, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 8,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: line.role === "aria" ? "#7B2FBE" : "#3A3A3A",
                minWidth: 36,
                paddingTop: 2,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {line.role === "aria" ? "Aria" : "Caller"}
            </span>
            <span
              style={{
                fontSize: 12,
                color: "#5A5A5A",
                lineHeight: 1.5,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {line.text}
            </span>
          </div>
        ))}
      </div>

      {/* Booking confirmation */}
      <div
        style={{
          margin: "12px 18px 16px",
          padding: "10px 14px",
          backgroundColor: "rgba(34,197,94,0.05)",
          border: "1px solid rgba(34,197,94,0.18)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="M22 4 12 14.01l-3-3" />
        </svg>
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#22C55E",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Appointment Booked
          </div>
          <div
            style={{
              fontSize: 10,
              color: "#3A3A3A",
              fontFamily: "'Space Grotesk', sans-serif",
              marginTop: 2,
            }}
          >
            Tuesday, 2:00 PM — Dental Cleaning
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

/* ═══════════════════════════════════════════════════════════
   MOCKUP 2 — WEB / DENTAL SITE PREVIEW
══════════════════════════════════════════════════════════════ */

function WebMockup() {
  return (
    <MockupShell>
      {/* Browser bar */}
      <div
        style={{
          padding: "10px 14px",
          borderBottom: "1px solid rgba(192,192,192,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: c, opacity: 0.6 }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: 22,
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            paddingLeft: 8,
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: "#2E2E2E",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            brightsmile-dental.com
          </span>
        </div>
      </div>

      {/* Fake dental site */}
      <div style={{ padding: "16px 18px" }}>
        {/* Site nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: "#C0C0C0",
            }}
          >
            BrightSmile Dental
          </span>
          <div style={{ display: "flex", gap: 12 }}>
            {["Services", "About", "Contact"].map((l) => (
              <span
                key={l}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 9,
                  color: "#3A3A3A",
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* Hero area */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(192,192,192,0.07)",
            borderRadius: 6,
            padding: "16px 14px",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: "#D4D4D4",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Your Smile Starts Here
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 10,
              color: "#3A3A3A",
              marginBottom: 10,
            }}
          >
            Serving Riverside County since 2008
          </div>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#7B2FBE",
              borderRadius: 999,
              padding: "5px 14px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Book Appointment
          </div>
        </div>

        {/* Booking widget */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(123,47,190,0.25)",
            borderRadius: 6,
            padding: "12px 14px",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              color: "#7B2FBE",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Book Online — Instant Confirmation
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            {["Cleaning", "Whitening", "Exam", "Emergency"].map((s) => (
              <div
                key={s}
                style={{
                  border: "1px solid rgba(192,192,192,0.15)",
                  borderRadius: 4,
                  padding: "4px 8px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 9,
                  backgroundColor: s === "Cleaning" ? "rgba(123,47,190,0.12)" : "transparent",
                  borderColor: s === "Cleaning" ? "rgba(123,47,190,0.4)" : "rgba(192,192,192,0.15)",
                  color: s === "Cleaning" ? "#9B6FDE" : "#4A4A4A",
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <div
              style={{
                flex: 1,
                height: 22,
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(192,192,192,0.1)",
                borderRadius: 4,
              }}
            />
            <div
              style={{
                backgroundColor: "#7B2FBE",
                borderRadius: 4,
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                Book
              </span>
            </div>
          </div>
        </div>

        {/* Google review badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 12px",
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(192,192,192,0.08)",
            borderRadius: 6,
          }}
        >
          <div style={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill="#C0C0C0">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 10,
              color: "#5A5A5A",
            }}
          >
            4.9 on Google — 143 reviews
          </span>
        </div>
      </div>
    </MockupShell>
  );
}

/* ═══════════════════════════════════════════════════════════
   MOCKUP 3 — REVIEWS DASHBOARD
══════════════════════════════════════════════════════════════ */

function ReviewsMockup() {
  return (
    <MockupShell>
      {/* Header */}
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid rgba(192,192,192,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "#C0C0C0",
            letterSpacing: "0.04em",
          }}
        >
          Review Dashboard
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              boxShadow: "0 0 5px #22C55E",
            }}
          />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 10,
              color: "#22C55E",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            AUTO-RESPONDING
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          padding: "14px 18px",
          gap: 1,
          borderBottom: "1px solid rgba(192,192,192,0.08)",
        }}
      >
        {[
          { label: "Rating", value: "4.9", sub: "Google" },
          { label: "Reviews", value: "143", sub: "total" },
          { label: "This month", value: "+18", sub: "new" },
          { label: "Response rate", value: "100%", sub: "AI" },
        ].map(({ label, value, sub }) => (
          <div
            key={label}
            style={{
              flex: 1,
              padding: "0 10px",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: "#D4D4D4",
                lineHeight: 1,
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 9,
                color: "#2E2E2E",
                marginTop: 4,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent review */}
      <div style={{ padding: "14px 18px" }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#2E2E2E",
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: 10,
          }}
        >
          Latest Review
        </div>
        <div
          style={{
            padding: "12px 14px",
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(192,192,192,0.08)",
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div style={{ display: "flex", gap: 2 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill="#C0C0C0">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 9,
                color: "#2E2E2E",
              }}
            >
              2h ago — Google
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              color: "#5A5A5A",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            "Best dental experience I've ever had. The booking was so easy and the staff were incredible."
          </p>
          <div
            style={{
              marginTop: 6,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 9,
              color: "#3A3A3A",
            }}
          >
            — Maria T.
          </div>
        </div>

        {/* AI response draft */}
        <div
          style={{
            padding: "12px 14px",
            backgroundColor: "rgba(123,47,190,0.06)",
            border: "1px solid rgba(123,47,190,0.2)",
            borderRadius: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                backgroundColor: "#7B2FBE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 9, color: "#fff", fontWeight: 700 }}>A</span>
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 9,
                fontWeight: 700,
                color: "#7B2FBE",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              AI Response Draft
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              color: "#4A4A4A",
              lineHeight: 1.6,
              margin: "0 0 10px",
            }}
          >
            Thank you so much, Maria! We're thrilled you had a great experience. We look forward to seeing you at your next visit!
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={{
                backgroundColor: "#7B2FBE",
                border: "none",
                borderRadius: 4,
                padding: "4px 12px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 9,
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
                letterSpacing: "0.06em",
              }}
            >
              Post Reply
            </button>
            <button
              style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(192,192,192,0.15)",
                borderRadius: 4,
                padding: "4px 12px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 9,
                color: "#3A3A3A",
                cursor: "pointer",
                letterSpacing: "0.06em",
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

/* ═══════════════════════════════════════════════════════════
   MOCKUP 4 — CRM KANBAN
══════════════════════════════════════════════════════════════ */

const KANBAN_COLS = [
  {
    label: "New Lead",
    active: false,
    cards: [
      { name: "Priya K.", note: "Cleaning inquiry" },
      { name: "Marcus L.", note: "Invisalign quote" },
    ],
  },
  {
    label: "Contacted",
    active: false,
    cards: [
      { name: "Sandra M.", note: "Called back ×2" },
    ],
  },
  {
    label: "Scheduled",
    active: true,
    cards: [
      { name: "Carlos V.", note: "Thursday 3 PM" },
      { name: "Yuki T.", note: "Monday 10 AM" },
    ],
  },
  {
    label: "Booked",
    active: false,
    cards: [
      { name: "James R.", note: "Confirmed — cleaning" },
    ],
  },
];

function CrmMockup() {
  return (
    <MockupShell>
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid rgba(192,192,192,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "#C0C0C0",
            letterSpacing: "0.03em",
          }}
        >
          Patient Pipeline
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#7B2FBE",
              boxShadow: "0 0 6px rgba(123,47,190,0.9)",
            }}
          />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 10,
              color: "#7B2FBE",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            ARIA ACTIVE
          </span>
        </div>
      </div>

      {/* Kanban board */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          padding: "14px 14px 16px",
          overflow: "hidden",
        }}
      >
        {KANBAN_COLS.map((col, ci) => (
          <div
            key={col.label}
            style={{
              borderRight:
                ci < KANBAN_COLS.length - 1
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
              paddingRight: ci < KANBAN_COLS.length - 1 ? 10 : 0,
              paddingLeft: ci > 0 ? 10 : 0,
            }}
          >
            {/* Column header */}
            <div
              style={{
                marginBottom: 10,
                paddingBottom: 8,
                borderBottom: col.active
                  ? "2px solid rgba(123,47,190,0.6)"
                  : "1px solid rgba(192,192,192,0.1)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: col.active ? "#9B6FDE" : "#3A3A3A",
                }}
              >
                {col.label}
              </span>
            </div>

            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {col.cards.map((card) => (
                <div
                  key={card.name}
                  style={{
                    padding: "8px 9px",
                    backgroundColor: col.active
                      ? "rgba(123,47,190,0.08)"
                      : "rgba(255,255,255,0.02)",
                    border: col.active
                      ? "1px solid rgba(123,47,190,0.22)"
                      : "1px solid rgba(192,192,192,0.08)",
                    borderRadius: 6,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      color: col.active ? "#C0A0F0" : "#8A8A8A",
                      marginBottom: 3,
                    }}
                  >
                    {card.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 9,
                      color: "#2E2E2E",
                      lineHeight: 1.4,
                    }}
                  >
                    {card.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Auto-followup strip */}
      <div
        style={{
          margin: "0 14px 14px",
          padding: "9px 12px",
          backgroundColor: "rgba(123,47,190,0.05)",
          border: "1px solid rgba(123,47,190,0.15)",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 10,
            color: "#5A5A5A",
          }}
        >
          Aria sent follow-up SMS to Sandra M. — 12 min ago
        </span>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#7B2FBE",
            boxShadow: "0 0 6px rgba(123,47,190,0.8)",
            flexShrink: 0,
          }}
        />
      </div>
    </MockupShell>
  );
}

/* ── Shared mockup shell ────────────────────────────────── */

function MockupShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#0F0F0F",
        border: "1px solid rgba(192,192,192,0.18)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px rgba(0,0,0,0.7)",
      }}
    >
      {children}
    </div>
  );
}
