"use client";

import { useState, useEffect } from "react";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "#0A0A0A",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        transition: "box-shadow 0.2s ease",
        boxShadow: scrolled
          ? "0 2px 40px rgba(0,0,0,0.8)"
          : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark */}
        <a
          href="/"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: "-0.02em",
            color: "#D4D4D4",
            textDecoration: "none",
            background: "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 60%, #9A9A9A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            userSelect: "none",
          }}
        >
          Receptifi
        </a>

        {/* Center links */}
        <div
          style={{
            display: "flex",
            gap: "36px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {["Services", "How It Works", "Pricing", "About"].map((label) => (
            <NavLink key={label} label={label} />
          ))}
        </div>

        {/* CTA */}
        <BookDemoButton />
      </div>
    </nav>
  );
}

function NavLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);

  const href =
    label === "Services"
      ? "#services"
      : label === "How It Works"
      ? "#how-it-works"
      : label === "Pricing"
      ? "#pricing"
      : "#about";

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 500,
        fontSize: 14,
        letterSpacing: "0.01em",
        color: hovered ? "#D4D4D4" : "#6B6B6B",
        textDecoration: "none",
        transition: "color 0.15s ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </a>
  );
}

function BookDemoButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#demo"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: hovered ? "#FFFFFF" : "#C0C0C0",
        backgroundColor: hovered ? "#7B2FBE" : "transparent",
        border: `1px solid ${hovered ? "#7B2FBE" : "#C0C0C0"}`,
        borderRadius: 999,
        padding: "9px 20px",
        textDecoration: "none",
        transition: "background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease",
        whiteSpace: "nowrap",
        display: "inline-block",
      }}
    >
      Book a Demo
    </a>
  );
}
