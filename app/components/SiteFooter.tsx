export default function SiteFooter() {
  return (
    <footer
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "28px 48px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark */}
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: "-0.02em",
            background:
              "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 60%, #9A9A9A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Receptifi
        </span>

        {/* Center links */}
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Privacy Policy", "Terms", "Contact"].map((label, i) => (
            <a
              key={label}
              href={`/${label.toLowerCase().replace(" ", "-")}`}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: "#3A3A3A",
                textDecoration: "none",
                letterSpacing: "0.03em",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#7A7A7A")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#3A3A3A")
              }
            >
              {label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11,
            color: "#2A2A2A",
            letterSpacing: "0.03em",
          }}
        >
          &copy; 2026 Receptifi LLC. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
