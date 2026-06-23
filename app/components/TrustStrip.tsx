const TILES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#C0C0C0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3 5 8v8c0 6 4.8 11.2 11 13 6.2-1.8 11-7 11-13V8L16 3z" />
        <path d="M11 16l3 3 7-7" />
      </svg>
    ),
    label: "HIPAA-Aware Infrastructure",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#C0C0C0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="24" height="20" rx="3" />
        <path d="M10 14l4 4 8-8" />
        <path d="M4 11h24" />
      </svg>
    ),
    label: "No Contracts. Cancel Anytime.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#C0C0C0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 9v7l4 4" />
      </svg>
    ),
    label: "Live Within 7 Days.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#C0C0C0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 10a10 10 0 0 1 20 0v.5C26 20 21 26 16 28 11 26 6 20 6 10.5V10z" />
        <path d="M12 16h8M16 12v8" />
      </svg>
    ),
    label: "24/7. No Holidays. No Sick Days.",
  },
];

export default function TrustStrip() {
  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {TILES.map((tile, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              padding: "40px 24px",
              borderRight:
                i < TILES.length - 1
                  ? "1px solid rgba(192,192,192,0.08)"
                  : "none",
              textAlign: "center",
            }}
          >
            <div style={{ opacity: 0.85 }}>{tile.icon}</div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: "#6A6A6A",
                lineHeight: 1.5,
                maxWidth: 160,
              }}
            >
              {tile.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
