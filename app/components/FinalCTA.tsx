"use client";

import { useState } from "react";

const CALENDLY_URL = "https://calendly.com/karmello-koba1ba/30min";

export default function FinalCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        padding: "120px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Radial chrome glow behind headline */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 500,
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(192,192,192,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Stone formations */}
      <CtaStoneLeft />
      <CtaStoneRight />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        {/* Eyebrow line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              height: 1,
              width: 40,
              background:
                "linear-gradient(to right, transparent, rgba(192,192,192,0.3))",
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
            Ready to stop losing patients
          </span>
          <div
            style={{
              height: 1,
              width: 40,
              background:
                "linear-gradient(to left, transparent, rgba(192,192,192,0.3))",
            }}
          />
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(52px, 8vw, 100px)",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            color: "#D8D8D8",
            margin: "0 0 10px",
          }}
        >
          Stop Losing $10,000 a Month
        </h2>
        <h2
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(52px, 8vw, 100px)",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            color: "#6A6A6A",
            margin: "0 0 36px",
          }}
        >
          to a Phone That Rings Out.
        </h2>

        {/* Subline */}
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 17,
            lineHeight: 1.65,
            color: "#3E3E3E",
            margin: "0 0 44px",
            maxWidth: 540,
          }}
        >
          Aria answers every call, books every patient, and follows up on every lead.
          One call with us and you can be live in 7 days.
        </p>

        {/* CTA */}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "inline-block",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            backgroundColor: "#7B2FBE",
            borderRadius: 999,
            padding: "17px 52px",
            textDecoration: "none",
            boxShadow: hovered
              ? "0 0 70px rgba(123,47,190,0.65)"
              : "0 0 44px rgba(123,47,190,0.35)",
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
            transition: "box-shadow 0.2s ease, transform 0.18s ease",
            marginBottom: 28,
          }}
        >
          Book a Free Demo
        </a>

        {/* Trust lines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              color: "#3A3A3A",
              letterSpacing: "0.03em",
            }}
          >
            No contracts. Cancel anytime.
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              color: "#2E2E2E",
              letterSpacing: "0.03em",
            }}
          >
            Live within 7 days or we work for free until you are.
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── Stone formations ────────────────────────────────────── */

function CtaStoneLeft() {
  return (
    <svg
      viewBox="0 0 280 700"
      width={280}
      height={700}
      style={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        opacity: 0.5,
        pointerEvents: "none",
      }}
      fill="none"
    >
      <polygon points="0,0 200,50 160,190 0,160"   fill="rgba(80,80,80,0.16)" stroke="rgba(160,160,160,0.11)" strokeWidth="0.8" />
      <polygon points="0,160 160,190 120,340 0,310" fill="rgba(60,60,60,0.13)" stroke="rgba(140,140,140,0.09)" strokeWidth="0.8" />
      <polygon points="0,310 120,340 90,480 0,455"  fill="rgba(50,50,50,0.11)" stroke="rgba(120,120,120,0.08)" strokeWidth="0.8" />
      <polygon points="0,455 90,480 60,620 0,600"   fill="rgba(40,40,40,0.09)" stroke="rgba(100,100,100,0.07)" strokeWidth="0.8" />
      <polygon points="0,600 60,620 40,700 0,700"   fill="rgba(30,30,30,0.07)" stroke="rgba(90,90,90,0.06)"  strokeWidth="0.8" />
      <polygon points="70,60 210,10 230,120 90,160"  fill="rgba(65,65,65,0.09)" stroke="rgba(150,150,150,0.09)" strokeWidth="0.6" />
      <polygon points="50,260 170,230 190,320 70,360" fill="rgba(55,55,55,0.08)" stroke="rgba(130,130,130,0.08)" strokeWidth="0.6" />
    </svg>
  );
}

function CtaStoneRight() {
  return (
    <svg
      viewBox="0 0 280 700"
      width={280}
      height={700}
      style={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%) scaleX(-1)",
        opacity: 0.5,
        pointerEvents: "none",
      }}
      fill="none"
    >
      <polygon points="0,0 200,50 160,190 0,160"   fill="rgba(80,80,80,0.16)" stroke="rgba(160,160,160,0.11)" strokeWidth="0.8" />
      <polygon points="0,160 160,190 120,340 0,310" fill="rgba(60,60,60,0.13)" stroke="rgba(140,140,140,0.09)" strokeWidth="0.8" />
      <polygon points="0,310 120,340 90,480 0,455"  fill="rgba(50,50,50,0.11)" stroke="rgba(120,120,120,0.08)" strokeWidth="0.8" />
      <polygon points="0,455 90,480 60,620 0,600"   fill="rgba(40,40,40,0.09)" stroke="rgba(100,100,100,0.07)" strokeWidth="0.8" />
      <polygon points="0,600 60,620 40,700 0,700"   fill="rgba(30,30,30,0.07)" stroke="rgba(90,90,90,0.06)"  strokeWidth="0.8" />
      <polygon points="70,60 210,10 230,120 90,160"  fill="rgba(65,65,65,0.09)" stroke="rgba(150,150,150,0.09)" strokeWidth="0.6" />
      <polygon points="50,260 170,230 190,320 70,360" fill="rgba(55,55,55,0.08)" stroke="rgba(130,130,130,0.08)" strokeWidth="0.6" />
    </svg>
  );
}
