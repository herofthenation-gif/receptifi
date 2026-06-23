const STATS = [
  { numeral: "94%", label: "Calls answered" },
  { numeral: "3.2x", label: "Booked appointments" },
  { numeral: "7", label: "Days to go live" },
  { numeral: "24/7", label: "Coverage, always" },
];

const TESTIMONIALS = [
  {
    quote:
      "We were missing 30 to 40 calls a week after 5 PM. Aria picks up every single one. We booked 11 new patients the first month we turned it on. I didn't realize how much money was walking out the door every night.",
    author: "Dr. Angela Reyes",
    practice: "Reyes Family Dental, Riverside CA",
    highlight: "missed calls",
  },
  {
    quote:
      "We went from 18 Google reviews to 91 in two months. Our new website launched and booked 17 appointments before I even looked at the analytics. Patients tell me they found us online every single week now.",
    author: "Dr. Marcus Webb",
    practice: "Webb Dental Group, Rancho Cucamonga CA",
    highlight: "reviews and web",
  },
  {
    quote:
      "I was about to hire a second receptionist. That's $42,000 a year in salary and benefits. Receptifi costs a fraction of that and does more. My existing team handles care. Aria handles the phones. It wasn't even a close decision.",
    author: "Dr. Sandra Okonkwo",
    practice: "Fontana Smile Center, Fontana CA",
    highlight: "ROI",
  },
];

const Stars = () => (
  <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="#C0C0C0">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
  </div>
);

export default function SocialProofNew() {
  return (
    <section
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px" }}>

        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 64 }}>
          <div style={{ height: 1, width: 40, backgroundColor: "rgba(192,192,192,0.25)" }} />
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
            Results
          </span>
        </div>

        {/* Stat bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            marginBottom: 72,
            borderTop: "1px solid rgba(192,192,192,0.1)",
            borderBottom: "1px solid rgba(192,192,192,0.1)",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "40px 32px",
                borderRight:
                  i < STATS.length - 1
                    ? "1px solid rgba(192,192,192,0.08)"
                    : "none",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(42px, 5vw, 64px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "#7B2FBE",
                }}
              >
                {stat.numeral}
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#4A4A4A",
                  letterSpacing: "0.02em",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#0F0F0F",
                border: "1px solid rgba(192,192,192,0.14)",
                borderRadius: 10,
                padding: "28px 28px 24px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.02), 0 16px 40px rgba(0,0,0,0.5)",
              }}
            >
              <Stars />

              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: "#5A5A5A",
                  margin: "0 0 24px",
                  flex: 1,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div
                style={{
                  borderTop: "1px solid rgba(192,192,192,0.08)",
                  paddingTop: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#C0C0C0",
                    marginBottom: 4,
                  }}
                >
                  {t.author}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 11,
                    color: "#3A3A3A",
                    letterSpacing: "0.02em",
                  }}
                >
                  {t.practice}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
