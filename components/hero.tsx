import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

/* ─── Component ──────────────────────────────────────────────── */
export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">

      {/* Drifting color orbs — slow, alive background */}
      <div aria-hidden className="anim-drift-a pointer-events-none absolute -top-24 -left-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-primary/7 blur-[70px] sm:h-[42rem] sm:w-[42rem] sm:blur-[130px]" />
      <div aria-hidden className="anim-drift-b pointer-events-none absolute -top-16 -right-20 -z-10 h-[24rem] w-[24rem] rounded-full bg-primary/5 blur-[60px] sm:h-[38rem] sm:w-[38rem] sm:blur-[110px]" />
      <div aria-hidden className="anim-drift-c pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[20rem] w-[20rem] rounded-full bg-primary/4 blur-[50px] sm:h-[30rem] sm:w-[30rem] sm:blur-[100px]" />

      {/* Slowly rotating concentric arcs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 900 900" fill="none" className="anim-ring-spin w-full max-w-5xl text-primary" aria-hidden>
          {[120, 220, 320, 420, 520, 630].map((r, i) => (
            <circle key={r} cx="450" cy="450" r={r}
              stroke="currentColor" strokeWidth="1"
              strokeDasharray={i % 2 === 0 ? "6 18" : "2 14"}
              opacity={Math.max(0.006, 0.05 - i * 0.007)} />
          ))}
          <circle cx="450" cy="450" r="9"  fill="currentColor" opacity="0.15" />
          <circle cx="450" cy="450" r="24" stroke="currentColor" strokeWidth="1" opacity="0.08" />
        </svg>
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
        <div className="flex flex-col items-center text-center">

          {/* ── Identity eyebrow ── */}
          <span className="mb-5 block font-mono text-xs uppercase tracking-[0.18em] text-primary sm:mb-6">
            AI Consulting &amp; Marketing Agency
          </span>

          {/* ── Brand name — the largest element on the page ── */}
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold uppercase leading-none tracking-[0.1em] text-foreground sm:text-7xl lg:text-[8.5rem]">
            Recept<span className="text-primary">ifi</span>
          </h1>

          {/* ── CTA ── */}
          <div className="mt-14">
            <Button
              render={<a href="/book" />}
              nativeButton={false}
              size="lg"
              className="group h-14 rounded-full bg-[linear-gradient(115deg,var(--color-gold-champagne),var(--color-gold)_55%,var(--color-gold-bronze))] px-10 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]"
            >
              Book a Free Audit
              <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}
