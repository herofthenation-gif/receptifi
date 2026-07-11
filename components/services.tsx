import type { ReactNode } from "react"

/* ------------------------------------------------------------------ */
/* Abstract, high-end line-art graphics (data flow & scaling revenue) */
/* ------------------------------------------------------------------ */

function BrowserGraphic() {
  return (
    <svg viewBox="0 0 240 120" fill="none" className="h-full w-full text-primary" aria-hidden>
      {/* Browser outer frame */}
      <rect x="8" y="5" width="224" height="110" rx="9" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      {/* Chrome bar */}
      <rect x="8" y="5" width="224" height="22" rx="9" fill="currentColor" opacity="0.06" />
      <line x1="8" y1="27" x2="232" y2="27" stroke="currentColor" strokeWidth="1" opacity="0.18" />
      {/* Traffic lights */}
      <circle cx="22" cy="16" r="3.5" fill="currentColor" opacity="0.75" />
      <circle cx="35" cy="16" r="3.5" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <circle cx="48" cy="16" r="3.5" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      {/* URL bar */}
      <rect x="64" y="10" width="112" height="12" rx="5" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.04" opacity="0.35" />
      {/* Nav strip inside page */}
      <rect x="18" y="35" width="204" height="7" rx="2" fill="currentColor" opacity="0.07" />
      {/* Hero headline */}
      <rect x="18" y="50" width="96" height="7" rx="2" fill="currentColor" opacity="0.13" />
      <rect x="18" y="61" width="68" height="5" rx="1.5" fill="currentColor" opacity="0.08" />
      {/* CTA button */}
      <rect x="18" y="72" width="42" height="13" rx="5" fill="currentColor" opacity="0.72" />
      {/* Hero image block */}
      <rect x="150" y="48" width="62" height="48" rx="5" stroke="currentColor" strokeWidth="1" opacity="0.18" />
      <line x1="150" y1="48" x2="212" y2="96" stroke="currentColor" strokeWidth="0.75" opacity="0.1" />
      {/* Three content pillars at bottom */}
      {[18, 90, 162].map((x) => (
        <rect key={x} x={x} y="100" width="52" height="4" rx="2" fill="currentColor" opacity="0.09" />
      ))}
    </svg>
  )
}

function StarsGraphic() {
  // Star path: outer r=10, inner r=4.5, top-pointing
  const star = "M 0,-10 L 2.65,-3.63 L 9.51,-3.09 L 4.28,1.39 L 5.88,8.09 L 0,4.5 L -5.88,8.09 L -4.28,1.39 L -9.51,-3.09 L -2.65,-3.63 Z"
  const xs = [24, 62, 100, 138, 176]
  const barH = [14, 23, 35, 48, 62]

  return (
    <svg viewBox="0 0 240 120" fill="none" className="h-full w-full text-primary" aria-hidden>
      {/* 5 stars */}
      {xs.map((x, i) => (
        <g key={x} transform={`translate(${x}, 28)`}>
          <path d={star} fill="currentColor" opacity={i === 4 ? 1 : 0.6} />
        </g>
      ))}
      {/* Glow ring on final star */}
      <circle cx="176" cy="28" r="18" stroke="currentColor" strokeWidth="1" opacity="0.28" />

      {/* Review count bars (month-over-month growth) */}
      {xs.map((x, i) => (
        <rect key={x} x={x - 9} y={114 - barH[i]} width="18" height={barH[i]}
          rx="3" fill="currentColor" opacity={0.18 + i * 0.14} />
      ))}
      {/* Accent dot on tallest bar */}
      <circle cx="176" cy={114 - barH[4] - 7} r="4" fill="currentColor" />
      <circle cx="176" cy={114 - barH[4] - 7} r="9" stroke="currentColor" strokeWidth="1" opacity="0.28" />
    </svg>
  )
}

function PipelineGraphic() {
  // 4-stage horizontal sales pipeline with funnel taper
  const stages = [
    { x: 28,  r: 5.5, open: true },
    { x: 88,  r: 6.5, open: true },
    { x: 158, r: 8,   open: true },
    { x: 212, r: 11,  open: false },
  ]

  return (
    <svg viewBox="0 0 240 120" fill="none" className="h-full w-full text-primary" aria-hidden>
      {/* Funnel taper background */}
      <path d="M14 18 L226 18 L196 52 L160 74 L120 88 L80 74 L44 52 Z"
        fill="currentColor" opacity="0.04" />

      {/* Pipeline track */}
      <line x1="28" y1="60" x2="212" y2="60"
        stroke="currentColor" strokeWidth="1.2" opacity="0.2" />

      {/* Stage nodes */}
      {stages.map((s) => (
        s.open ? (
          <circle key={s.x} cx={s.x} cy={60} r={s.r}
            fill="var(--color-background)" stroke="currentColor"
            strokeWidth="1.5" opacity="0.65" />
        ) : (
          <g key={s.x}>
            <circle cx={s.x} cy={60} r={s.r} fill="currentColor" />
            <circle cx={s.x} cy={60} r={s.r + 8} stroke="currentColor" strokeWidth="1" opacity="0.28" />
          </g>
        )
      ))}

      {/* Flowing lead dots between stages */}
      <circle cx="58"  cy="57" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="123" cy="59" r="2.5" fill="currentColor" opacity="0.55" />
      <circle cx="185" cy="58" r="2.5" fill="currentColor" opacity="0.72" />

      {/* Lead count columns below each node */}
      {stages.map((s, i) => {
        const count = [4, 3, 2, 1][i]
        return Array.from({ length: count }, (_, j) => (
          <circle key={j} cx={s.x} cy={86 + j * 9} r="2.5"
            fill="currentColor" opacity={0.18 + i * 0.12} />
        ))
      })}
    </svg>
  )
}

function FlowGraphic() {
  // Headset (receptionist) right side + voice waveform left/center
  const bars = [18, 32, 52, 28, 66, 40, 78, 48, 62, 34, 70, 26, 56, 38, 72, 30, 54]
  return (
    <svg viewBox="0 0 420 200" fill="none" className="h-full w-full text-primary" aria-hidden>
      {/* ── Headset (right quadrant) ── */}
      {/* Headband arc */}
      <path d="M255 104 Q255 44 302 44 Q349 44 349 104"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
      {/* Left ear cup */}
      <rect x="240" y="93" width="19" height="28" rx="7"
        stroke="currentColor" strokeWidth="1.5" fill="var(--color-background)" opacity="0.8" />
      {/* Right ear cup */}
      <rect x="344" y="93" width="19" height="28" rx="7"
        stroke="currentColor" strokeWidth="1.5" fill="var(--color-background)" opacity="0.8" />
      {/* Mic boom from right ear cup */}
      <path d="M354 118 Q354 148 332 158"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
      {/* Mic head + glow */}
      <circle cx="328" cy="162" r="8" fill="currentColor" />
      <circle cx="328" cy="162" r="16" stroke="currentColor" strokeWidth="1" opacity="0.28" />

      {/* Signal arcs right of headset */}
      <path d="M368 92 Q384 107 368 122"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M378 83 Q402 107 378 131"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M388 74 Q420 107 388 140"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.14" />

      {/* ── Voice waveform (left + center) ── */}
      {bars.map((h, i) => {
        const x = 22 + i * 13
        return (
          <line key={i} x1={x} y1={186} x2={x} y2={186 - h}
            stroke="currentColor" strokeWidth="3" strokeLinecap="round"
            opacity={h > 58 ? 0.85 : 0.3} />
        )
      })}
    </svg>
  )
}

/* ------------------------------------------------------------------ */

type Card = {
  tag: string
  title: string
  desc: string
  graphic: ReactNode
}

const flagship = {
  tag: "Retain: The Core",
  title: "Live Response Operations",
  desc: "We plug a live receptionist into your business line. Every call is answered 24/7, every lead is qualified on the spot, and every appointment is booked in real time. Your customers always reach a real voice. You never touch the phone.",
  graphic: <FlowGraphic />,
}

const cards: Card[] = [
  {
    tag: "Attract",
    title: "Web Architecture",
    desc: "We build you a brand new, modern website from scratch. Fast, professional, and designed to turn visitors into booked appointments the moment they land on your page.",
    graphic: <BrowserGraphic />,
  },
  {
    tag: "Attract",
    title: "Trust Automation",
    desc: "We send a review request after every call, appointment, and visit. More 5-star reviews means Google ranks you higher and new customers choose you first.",
    graphic: <StarsGraphic />,
  },
  {
    tag: "Retain",
    title: "CRM Infrastructure",
    desc: "We plug in a CRM that captures every lead the moment they contact you. Every call, form, and booking lands in one place so nothing ever slips through.",
    graphic: <PipelineGraphic />,
  },
]

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-6 block font-sans text-xs uppercase tracking-[0.18em] text-primary">
            What We Find
          </span>
          <h2 className="text-balance font-serif text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Four places local businesses lose revenue without knowing it.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            The audit checks all four. We fix whichever ones are actually
            costing you.
          </p>
        </div>

        {/* Flagship horizontal panel */}
        <div className="mt-20">
          <article className="glass-card group relative grid items-center gap-10 overflow-hidden rounded-[2rem] p-8 transition-transform duration-500 hover:-translate-y-1 sm:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:p-16">
            <div>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-primary">
                {flagship.tag}
              </span>
              <h3 className="mt-5 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {flagship.title}
              </h3>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {flagship.desc}
              </p>
            </div>
            <div className="glass-card-soft rounded-3xl p-6 sm:p-8">
              <div className="aspect-[2/1] w-full">{flagship.graphic}</div>
            </div>
          </article>
        </div>

        {/* Supporting service cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-3 lg:mt-10 lg:gap-8">
          {cards.map((card, i) => (
            <article
              key={card.title}
              className={`glass-card group relative flex flex-col overflow-hidden rounded-[1.75rem] p-8 transition-transform duration-500 hover:-translate-y-1.5 sm:p-10 ${
                i === 1 ? "md:mt-10" : ""
              }`}
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {card.tag}
              </span>
              <h3 className="mt-4 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-[1.7rem]">
                {card.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {card.desc}
              </p>
              <div className="mt-auto pt-10">
                <div className="glass-card-soft aspect-[2/1] w-full rounded-2xl p-4">
                  {card.graphic}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
