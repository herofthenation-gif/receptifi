import Image from "next/image"

/* ------------------------------------------------------------------ */
/* HOW IT WORKS — step icons (thin royal navy SVG line art)            */
/* ------------------------------------------------------------------ */

function IconCapture() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8" aria-hidden>
      <circle cx="24" cy="24" r="20" stroke="#1E3A8A" strokeWidth="1.25" />
      <circle cx="24" cy="24" r="7" stroke="#1E3A8A" strokeWidth="1.25" />
      <line x1="24" y1="4" x2="24" y2="14" stroke="#1E3A8A" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="24" y1="34" x2="24" y2="44" stroke="#1E3A8A" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="4" y1="24" x2="14" y2="24" stroke="#1E3A8A" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="34" y1="24" x2="44" y2="24" stroke="#1E3A8A" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function IconQualify() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8" aria-hidden>
      <rect x="8" y="8" width="32" height="32" rx="4" stroke="#1E3A8A" strokeWidth="1.25" />
      <line x1="16" y1="18" x2="32" y2="18" stroke="#1E3A8A" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="16" y1="24" x2="28" y2="24" stroke="#1E3A8A" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="16" y1="30" x2="24" y2="30" stroke="#1E3A8A" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="36" cy="34" r="6" fill="white" stroke="#1E3A8A" strokeWidth="1.25" />
      <polyline points="33,34 35,36 39,32" stroke="#1E3A8A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconRoute() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8" aria-hidden>
      <circle cx="12" cy="24" r="5" stroke="#1E3A8A" strokeWidth="1.25" />
      <circle cx="36" cy="12" r="5" stroke="#1E3A8A" strokeWidth="1.25" />
      <circle cx="36" cy="36" r="5" stroke="#1E3A8A" strokeWidth="1.25" />
      <path d="M17 24 Q26 24 31 17" stroke="#1E3A8A" strokeWidth="1.25" strokeLinecap="round" strokeDasharray="2 2.5" />
      <path d="M17 24 Q26 24 31 31" stroke="#1E3A8A" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function IconConvert() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8" aria-hidden>
      <path d="M8 36 L18 26 L26 32 L40 14" stroke="#1E3A8A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="40" cy="14" r="3.5" fill="#1E3A8A" />
      <line x1="8" y1="38" x2="40" y2="38" stroke="#1E3A8A" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

function IconRetain() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8" aria-hidden>
      <path d="M24 10 C14 10 8 16 8 22 C8 32 24 40 24 40 C24 40 40 32 40 22 C40 16 34 10 24 10 Z" stroke="#1E3A8A" strokeWidth="1.25" />
      <path d="M18 23 L22 27 L30 19" stroke="#1E3A8A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const steps = [
  {
    number: "01",
    icon: <IconCapture />,
    title: "Capture Every Signal",
    desc: "Every inbound call, web form, and review request is intercepted by the Receptifi system. Nothing enters your pipeline untracked.",
  },
  {
    number: "02",
    icon: <IconQualify />,
    title: "Qualify in Real Time",
    desc: "Our US-based live receptionists answer 24/7, qualify intent, and screen leads against your criteria before a single minute of your time is spent.",
  },
  {
    number: "03",
    icon: <IconRoute />,
    title: "Route to Revenue",
    desc: "Qualified opportunities are routed instantly to your calendar, CRM, or team. Warm handoffs, zero friction.",
  },
  {
    number: "04",
    icon: <IconConvert />,
    title: "Convert with Confidence",
    desc: "With a complete lead profile and full context already in your pipeline, your team closes from a position of total information.",
  },
  {
    number: "05",
    icon: <IconRetain />,
    title: "Retain and Compound",
    desc: "Automated review capture and CRM follow-up loops ensure every client relationship compounds into referral revenue over time.",
  },
]

/* ------------------------------------------------------------------ */
/* Founder / Philosophy + HOW IT WORKS                                  */
/* ------------------------------------------------------------------ */

export function Founder() {
  return (
    <>
      {/* ── Philosophy / Clock section ── */}
      <section id="platform" className="scroll-mt-24 overflow-hidden py-32 sm:py-44">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">

            {/* Gear clock image */}
            <div className="relative self-start">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card"
                style={{
                  boxShadow:
                    "0 2px 4px oklch(0.208 0.042 265.75 / 4%), 0 8px 24px -4px oklch(0.208 0.042 265.75 / 10%), 0 32px 80px -16px oklch(0.208 0.042 265.75 / 24%)",
                }}
              >
                <Image
                  src="/gear-clock.png"
                  alt="Precision mechanical gear clock representing Receptifi engineering philosophy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  loading="eager"
                />
                {/* Bottom label overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-7 pb-7 pt-16">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/90">
                    RECEPTIFI
                  </p>
                </div>
              </div>
            </div>

            {/* Quote block */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: "#1E3A8A" }}>
                The Receptifi Philosophy
              </span>
              <blockquote className="mt-8">
                <p className="text-balance font-serif text-3xl font-medium leading-snug tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                  &ldquo;Software schedules the meeting. Humans close the deal.
                  We refused to choose between them, so we engineered a system
                  where{" "}
                  <span style={{ color: "#1E3A8A" }}>
                    automation captures every lead
                  </span>{" "}
                  and{" "}
                  <span style={{ color: "#1E3A8A" }}>
                    real people convert them into revenue.
                  </span>
                  &rdquo;
                </p>
                <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  Most companies bleed revenue in the gaps. The unanswered call,
                  the unattended review, and the lead that fell out of the
                  pipeline are costing you money. We don&apos;t sell tools. We
                  operate the entire revenue process so nothing leaks.
                </p>
                <footer className="mt-10 flex items-center gap-3">
                  <span className="h-px w-10" style={{ background: "#1E3A8A" }} />
                  <cite className="not-italic font-mono text-sm uppercase tracking-widest text-muted-foreground">
                    The Receptifi Philosophy
                  </cite>
                </footer>
              </blockquote>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS section ── */}
      <section id="how-it-works" className="scroll-mt-24 bg-section-alt py-44 sm:py-56">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          {/* Section heading */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: "#1E3A8A" }}>
              The System
            </span>
            <h2 className="mt-5 text-balance font-serif text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              How It Works
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              Five precision-engineered stages that transform every inbound
              signal into compounding revenue.
            </p>
          </div>

          {/* Bento step grid */}
          <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {steps.map((step) => (
              <article
                key={step.number}
                className="glass-card group flex flex-col rounded-[1.75rem] p-8 transition-transform duration-500 hover:-translate-y-1.5"
              >
                {/* Step number */}
                <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "#1E3A8A" }}>
                  {step.number}
                </span>

                {/* Icon container */}
                <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "rgba(30,58,138,0.07)", border: "1px solid rgba(30,58,138,0.18)" }}>
                  {step.icon}
                </div>

                {/* Copy */}
                <h3 className="mt-6 font-serif text-xl font-bold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>

                {/* Hover accent */}
                <div className="mt-8 h-px w-8 transition-all duration-500 group-hover:w-14" style={{ background: "rgba(30,58,138,0.3)" }} />
              </article>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
