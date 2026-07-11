import {
  Stethoscope,
  Wrench,
  Landmark,
  Sparkles,
  Car,
  Home,
  Utensils,
  Shield,
  Hammer,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

/* ─── Cityscape SVG ──────────────────────────────────────────── */
function Cityscape() {
  return (
    <svg
      viewBox="0 0 900 130"
      fill="none"
      className="w-full text-primary"
      aria-hidden
    >
      {/* Ground line */}
      <line x1="0" y1="122" x2="900" y2="122" stroke="currentColor" strokeWidth="1" opacity="0.12" />

      {/* Building 1 — Dental clinic (tall, narrow, medical cross) */}
      <rect x="18" y="28" width="52" height="94" rx="2" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" opacity2="0.3" />
      <rect x="18" y="28" width="52" height="94" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <rect x="28" y="42" width="14" height="14" rx="1.5" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <rect x="50" y="42" width="14" height="14" rx="1.5" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="44" y1="82" x2="44" y2="104" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <line x1="33" y1="93" x2="55" y2="93" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <rect x="33" y="104" width="22" height="18" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />

      {/* Building 2 — HVAC (wide, medium, rooftop unit) */}
      <rect x="82" y="52" width="78" height="70" rx="2" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <rect x="112" y="38" width="18" height="18" rx="2" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <rect x="94" y="65" width="20" height="14" rx="1" fill="currentColor" opacity="0.09" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
      <rect x="122" y="65" width="20" height="14" rx="1" fill="currentColor" opacity="0.09" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
      <path d="M88 88 Q95 82 102 88 Q109 82 116 88 Q123 82 130 88 Q137 82 144 88 Q151 82 158 88"
        stroke="currentColor" strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      <rect x="106" y="103" width="28" height="19" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />

      {/* Building 3 — Law firm (wide, classical columns) */}
      <rect x="174" y="18" width="98" height="104" rx="2" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <rect x="174" y="18" width="98" height="12" rx="1" fill="currentColor" opacity="0.1" />
      {[185, 205, 225, 245, 260].map((x) => (
        <rect key={x} x={x} y="30" width="6" height="66" rx="2"
          fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
      ))}
      <rect x="196" y="96" width="28" height="26" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />

      {/* Building 4 — Med spa (sleek modern, stepped facade) */}
      <rect x="288" y="42" width="68" height="80" rx="3" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <rect x="288" y="42" width="68" height="10" fill="currentColor" opacity="0.1" rx="3" />
      <circle cx="322" cy="62" r="10" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      <path d="M313 60 Q322 54 331 60 Q331 72 322 77 Q313 72 313 60 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      {[294, 344].map((x) => (
        <g key={x}>
          <circle cx={x + 6} cy="56" r="2" fill="currentColor" opacity="0.3" />
          <circle cx={x + 6} cy="56" r="5" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
        </g>
      ))}
      <rect x="305" y="100" width="24" height="22" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />

      {/* Building 5 — Auto shop (wide, low, garage doors) */}
      <rect x="372" y="64" width="100" height="58" rx="2" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <rect x="382" y="74" width="32" height="32" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      {[78, 84, 90, 96].map((y) => (
        <line key={y} x1="383" y1={y} x2="413" y2={y} stroke="currentColor" strokeWidth="0.7" opacity="0.18" />
      ))}
      <rect x="424" y="74" width="32" height="32" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      {[78, 84, 90, 96].map((y) => (
        <line key={y} x1="425" y1={y} x2="455" y2={y} stroke="currentColor" strokeWidth="0.7" opacity="0.18" />
      ))}
      <path d="M378 70 Q422 55 468 70" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />

      {/* Building 6 — Real estate office (house shape) */}
      <path d="M492 60 L532 32 L572 60 L572 122 L492 122 Z"
        fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <rect x="510" y="86" width="44" height="36" rx="1" fill="currentColor" opacity="0.05" />
      <rect x="516" y="92" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
      <rect x="534" y="92" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
      <rect x="522" y="106" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
      <circle cx="532" cy="46" r="3" fill="currentColor" opacity="0.3" />

      {/* Building 7 — Restaurant (awning, round window) */}
      <rect x="590" y="50" width="72" height="72" rx="2" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M590 72 L590 64 Q626 56 662 64 L662 72 Z" fill="currentColor" opacity="0.14" />
      <circle cx="626" cy="63" r="1.5" fill="currentColor" opacity="0.5" />
      <rect x="600" y="80" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      <rect x="634" y="80" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      <rect x="611" y="100" width="24" height="22" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />

      {/* Building 8 — Insurance / financial tower (tall, glass) */}
      <rect x="678" y="12" width="56" height="110" rx="2" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {[24, 36, 48, 60, 72, 84].map((y) => (
        <g key={y}>
          <rect x="686" y={y} width="16" height="8" rx="1" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
          <rect x="710" y={y} width="16" height="8" rx="1" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
        </g>
      ))}
      <rect x="696" y="100" width="20" height="22" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />

      {/* Building 9 — Home services (workshop, slanted roof) */}
      <path d="M752 38 L820 50 L820 122 L752 122 Z"
        fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <rect x="760" y="75" width="24" height="47" rx="1" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="0.7" opacity="0.2" />
      <rect x="794" y="82" width="20" height="20" rx="1" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
      <line x1="804" y1="88" x2="804" y2="102" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="797" y1="95" x2="811" y2="95" stroke="currentColor" strokeWidth="1" opacity="0.3" />

      {/* Signal arcs over all buildings */}
      <path d="M44 22 Q450 -12 856 18" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.15" strokeLinecap="round" />
      <path d="M44 14 Q450 -22 856 10" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 10" opacity="0.08" strokeLinecap="round" />

      {/* Signal dots at each building */}
      {[44, 121, 223, 322, 422, 532, 626, 706, 786].map((x, i) => (
        <circle key={i} cx={x} cy={i % 2 === 0 ? 16 : 20} r="2.5"
          fill="currentColor" opacity="0.35" />
      ))}
    </svg>
  )
}

/* ─── Business Cards ─────────────────────────────────────────── */
type Industry = {
  Icon: LucideIcon
  name: string
  note: string
}

const industries: Industry[] = [
  {
    Icon: Stethoscope,
    name: "Dental Practices",
    note: "New patients call after hours. Every missed call books with a competitor down the street.",
  },
  {
    Icon: Wrench,
    name: "HVAC and Plumbing",
    note: "Emergency calls come in while your techs are on jobs. Aria answers every one.",
  },
  {
    Icon: Landmark,
    name: "Law Firms",
    note: "Qualify and log every intake call without pulling attorneys off billable work.",
  },
  {
    Icon: Sparkles,
    name: "Med Spas and Clinics",
    note: "Fill your schedule automatically and grow your Google rating after every visit.",
  },
  {
    Icon: Car,
    name: "Auto Repair Shops",
    note: "Answer estimate calls even when the shop floor is too loud to pick up the phone.",
  },
  {
    Icon: Home,
    name: "Real Estate Offices",
    note: "Every listing inquiry gets a live response before they call the next agent on the list.",
  },
  {
    Icon: Utensils,
    name: "Restaurants",
    note: "Take reservations, handle party inquiries, and collect reviews without lifting a finger.",
  },
  {
    Icon: Shield,
    name: "Insurance Agencies",
    note: "Qualify prospects and schedule consultations without chasing down every lead manually.",
  },
  {
    Icon: Hammer,
    name: "Home Services",
    note: "Roofing, electrical, landscaping. If you miss the call, a competitor picks up the job.",
  },
]

/* ─── Section ────────────────────────────────────────────────── */
export function WhoThisIsFor() {
  return (
    <section className="bg-section-alt py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-6 block font-sans text-xs uppercase tracking-[0.18em] text-primary">
            Who This Is For
          </span>
          <h2 className="text-balance font-serif text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Built for businesses that run on the phone.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            If your customers call to schedule, book, or get a quote, every unanswered call is a customer lost. Receptifi was built to make sure that never happens to your business again.
          </p>
        </div>

        {/* Cityscape visual */}
        <div className="mx-auto mt-16 max-w-5xl opacity-75">
          <Cityscape />
        </div>

        {/* Industry cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {industries.map(({ Icon, name, note }) => (
            <div
              key={name}
              className="glass-card group flex items-start gap-5 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/6 transition-colors group-hover:bg-primary/10">
                <Icon className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold tracking-tight text-foreground">
                  {name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Not in one of these categories? Or just curious how AI could help your business but not sure where to start?{" "}
          <a href="/book" className="font-semibold text-primary underline underline-offset-2 hover:no-underline">
            Book a call
          </a>{" "}
          and we will tell you honestly if Receptifi is the right fit.
        </p>

      </div>
    </section>
  )
}
