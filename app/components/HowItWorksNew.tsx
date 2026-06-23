const STEPS = [
  {
    fig: "01",
    illustration: <PhoneIso />,
    headlineA: "You sign up.",
    headlineB: "One call. We learn your practice.",
    body: "One onboarding call. We learn your services, your voice, your schedule. No forms, no IT work, no tech knowledge required.",
  },
  {
    fig: "02",
    illustration: <BrainIso />,
    headlineA: "We build everything.",
    headlineB: "Voice, Web, Reviews, CRM. Live in 7 days.",
    body: "Our team sets up every system — Aria receptionist, your website, review automation, and patient CRM. You are live within a week.",
  },
  {
    fig: "03",
    illustration: <CalendarIso />,
    headlineA: "Aria answers.",
    headlineB: "Patients book. You watch the dashboard.",
    body: "Every call gets answered. Every lead gets followed up. Your calendar fills and you see every metric in one clean dashboard.",
  },
];

export default function HowItWorksNew() {
  return (
    <section
      id="how-it-works"
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 48px",
        }}
      >
        {/* Section label */}
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
            How It Works
          </span>
        </div>

        {/* Three columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={i}
              style={{
                borderRight:
                  i < STEPS.length - 1
                    ? "1px solid rgba(192,192,192,0.08)"
                    : "none",
                paddingRight: i < STEPS.length - 1 ? 48 : 0,
                paddingLeft: i > 0 ? 48 : 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* FIG label */}
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#2E2E2E",
                  marginBottom: 32,
                }}
              >
                Fig. {step.fig}
              </span>

              {/* Isometric illustration */}
              <div style={{ marginBottom: 36, height: 120, display: "flex", alignItems: "center" }}>
                {step.illustration}
              </div>

              {/* Headline */}
              <h3
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: 28,
                  lineHeight: 1.05,
                  textTransform: "uppercase",
                  margin: "0 0 16px",
                }}
              >
                <span style={{ color: "#D4D4D4" }}>{step.headlineA}</span>
                <br />
                <span style={{ color: "#4A4A4A" }}>{step.headlineB}</span>
              </h3>

              {/* Body */}
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "#3E3E3E",
                  margin: 0,
                }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Isometric SVG illustrations ────────────────────────── */

function PhoneIso() {
  return (
    <svg width="140" height="110" viewBox="0 0 140 110" fill="none" stroke="#C0C0C0" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      {/* Isometric phone handset */}
      {/* Base platform */}
      <polygon points="70,90 20,62 70,34 120,62" fill="rgba(192,192,192,0.04)" stroke="rgba(192,192,192,0.18)" strokeWidth="0.8" />
      <line x1="20" y1="62" x2="20" y2="72" stroke="rgba(192,192,192,0.12)" />
      <line x1="120" y1="62" x2="120" y2="72" stroke="rgba(192,192,192,0.12)" />
      <line x1="70" y1="90" x2="70" y2="100" stroke="rgba(192,192,192,0.12)" />
      <polygon points="70,100 20,72 20,62 70,90" fill="rgba(192,192,192,0.03)" strokeWidth="0.8" />
      <polygon points="70,100 120,72 120,62 70,90" fill="rgba(192,192,192,0.05)" strokeWidth="0.8" />

      {/* Phone body on top */}
      <polygon points="70,58 48,46 70,34 92,46" fill="rgba(192,192,192,0.06)" stroke="rgba(192,192,192,0.3)" />
      <line x1="48" y1="46" x2="48" y2="62" stroke="rgba(192,192,192,0.25)" />
      <line x1="92" y1="46" x2="92" y2="62" stroke="rgba(192,192,192,0.25)" />
      <line x1="70" y1="58" x2="70" y2="74" stroke="rgba(192,192,192,0.25)" />
      <polygon points="70,74 48,62 48,46 70,58" fill="rgba(192,192,192,0.04)" stroke="rgba(192,192,192,0.25)" />
      <polygon points="70,74 92,62 92,46 70,58" fill="rgba(192,192,192,0.06)" stroke="rgba(192,192,192,0.25)" />

      {/* Screen lines */}
      <line x1="55" y1="50" x2="85" y2="38" stroke="rgba(192,192,192,0.2)" strokeWidth="0.7" />
      <line x1="55" y1="54" x2="80" y2="42" stroke="rgba(192,192,192,0.15)" strokeWidth="0.7" />
      <line x1="55" y1="58" x2="72" y2="50" stroke="rgba(192,192,192,0.1)" strokeWidth="0.7" />

      {/* Signal arcs */}
      <path d="M 100 20 Q 106 26 100 32" stroke="rgba(123,47,190,0.7)" strokeWidth="1.2" fill="none" />
      <path d="M 104 16 Q 113 26 104 36" stroke="rgba(123,47,190,0.5)" strokeWidth="1" fill="none" />
      <path d="M 108 12 Q 120 26 108 40" stroke="rgba(123,47,190,0.3)" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

function BrainIso() {
  return (
    <svg width="140" height="110" viewBox="0 0 140 110" fill="none" stroke="#C0C0C0" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      {/* Base platform */}
      <polygon points="70,90 20,62 70,34 120,62" fill="rgba(192,192,192,0.04)" stroke="rgba(192,192,192,0.18)" strokeWidth="0.8" />
      <line x1="20" y1="62" x2="20" y2="72" stroke="rgba(192,192,192,0.12)" />
      <line x1="120" y1="62" x2="120" y2="72" stroke="rgba(192,192,192,0.12)" />
      <line x1="70" y1="90" x2="70" y2="100" stroke="rgba(192,192,192,0.12)" />
      <polygon points="70,100 20,72 20,62 70,90" fill="rgba(192,192,192,0.03)" strokeWidth="0.8" />
      <polygon points="70,100 120,72 120,62 70,90" fill="rgba(192,192,192,0.05)" strokeWidth="0.8" />

      {/* Central cube / AI core */}
      <polygon points="70,50 52,40 70,30 88,40" fill="rgba(123,47,190,0.08)" stroke="rgba(123,47,190,0.5)" strokeWidth="1.1" />
      <polygon points="70,50 52,40 52,55 70,65" fill="rgba(123,47,190,0.05)" stroke="rgba(123,47,190,0.4)" strokeWidth="1" />
      <polygon points="70,50 88,40 88,55 70,65" fill="rgba(123,47,190,0.07)" stroke="rgba(123,47,190,0.4)" strokeWidth="1" />

      {/* Connection lines radiating out */}
      <line x1="52" y1="40" x2="36" y2="30" stroke="rgba(192,192,192,0.3)" strokeWidth="0.8" />
      <line x1="70" y1="30" x2="70" y2="16" stroke="rgba(192,192,192,0.3)" strokeWidth="0.8" />
      <line x1="88" y1="40" x2="104" y2="30" stroke="rgba(192,192,192,0.3)" strokeWidth="0.8" />
      <line x1="52" y1="55" x2="36" y2="62" stroke="rgba(192,192,192,0.3)" strokeWidth="0.8" />
      <line x1="88" y1="55" x2="104" y2="62" stroke="rgba(192,192,192,0.3)" strokeWidth="0.8" />

      {/* Nodes at endpoints */}
      {[[36, 30], [70, 16], [104, 30], [36, 62], [104, 62]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="rgba(192,192,192,0.08)" stroke="rgba(192,192,192,0.4)" strokeWidth="0.8" />
      ))}

      {/* Center dot */}
      <circle cx="70" cy="47" r="3" fill="rgba(123,47,190,0.6)" stroke="none" />
    </svg>
  );
}

function CalendarIso() {
  return (
    <svg width="140" height="110" viewBox="0 0 140 110" fill="none" stroke="#C0C0C0" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      {/* Base platform */}
      <polygon points="70,90 20,62 70,34 120,62" fill="rgba(192,192,192,0.04)" stroke="rgba(192,192,192,0.18)" strokeWidth="0.8" />
      <line x1="20" y1="62" x2="20" y2="72" stroke="rgba(192,192,192,0.12)" />
      <line x1="120" y1="62" x2="120" y2="72" stroke="rgba(192,192,192,0.12)" />
      <line x1="70" y1="90" x2="70" y2="100" stroke="rgba(192,192,192,0.12)" />
      <polygon points="70,100 20,72 20,62 70,90" fill="rgba(192,192,192,0.03)" strokeWidth="0.8" />
      <polygon points="70,100 120,72 120,62 70,90" fill="rgba(192,192,192,0.05)" strokeWidth="0.8" />

      {/* Calendar top face */}
      <polygon points="70,55 45,42 70,29 95,42" fill="rgba(192,192,192,0.05)" stroke="rgba(192,192,192,0.35)" strokeWidth="1" />
      {/* Calendar left face */}
      <polygon points="70,55 45,42 45,68 70,81" fill="rgba(192,192,192,0.03)" stroke="rgba(192,192,192,0.25)" strokeWidth="0.9" />
      {/* Calendar right face */}
      <polygon points="70,55 95,42 95,68 70,81" fill="rgba(192,192,192,0.05)" stroke="rgba(192,192,192,0.25)" strokeWidth="0.9" />

      {/* Calendar header bar */}
      <polygon points="70,33 45,46 45,42 70,29" fill="rgba(192,192,192,0.1)" stroke="rgba(192,192,192,0.4)" strokeWidth="0.8" />
      <polygon points="70,33 95,46 95,42 70,29" fill="rgba(192,192,192,0.12)" stroke="rgba(192,192,192,0.4)" strokeWidth="0.8" />

      {/* Grid lines on top face */}
      <line x1="57" y1="48" x2="70" y2="41" stroke="rgba(192,192,192,0.2)" strokeWidth="0.7" />
      <line x1="57" y1="52" x2="83" y2="45" stroke="rgba(192,192,192,0.2)" strokeWidth="0.7" />
      <line x1="70" y1="55" x2="83" y2="41" stroke="rgba(192,192,192,0.2)" strokeWidth="0.7" />

      {/* Check mark on top (appointment confirmed) */}
      <path d="M 63 46 L 67 50 L 76 40" stroke="rgba(34,197,94,0.8)" strokeWidth="1.4" fill="none" />

      {/* Small dots on grid */}
      {[[60, 50], [70, 44], [80, 48]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="rgba(192,192,192,0.3)" />
      ))}
    </svg>
  );
}
