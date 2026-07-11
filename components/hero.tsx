"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, LayoutDashboard, Phone, Play, Star, TrendingUp } from "lucide-react"

/* ─── Cycling service phrases ────────────────────────────────── */
const phrases = [
  "Missed calls are costing you patients.",
  "An outdated site is costing you bookings.",
  "Weak reviews are costing you the search.",
  "Slow follow-up is costing you leads.",
]

/* ─── Live activity pool ─────────────────────────────────────── */
type ActivityItem = {
  icon: "phone" | "star" | "crm" | "web"
  event: string
  detail: string
  time: string
}

const pool: ActivityItem[] = [
  { icon: "phone", event: "Call answered",       detail: "Bright Smile Dental · New patient booked",   time: "just now"  },
  { icon: "star",  event: "Review submitted",    detail: "Sarah M. · 5 stars on Google",               time: "2 min ago" },
  { icon: "crm",   event: "Lead captured",       detail: "Martinez HVAC · CRM updated",                time: "4 min ago" },
  { icon: "web",   event: "Website booking",     detail: "Apex Roofing · Estimate request logged",     time: "7 min ago" },
  { icon: "phone", event: "After-hours call",    detail: "Riverside Dental · Appointment confirmed",   time: "10 min ago"},
  { icon: "star",  event: "Rating improved",     detail: "Elite Med Spa · 4.9 stars (was 4.6)",        time: "14 min ago"},
  { icon: "crm",   event: "Follow-up sent",      detail: "James R. · Booking link delivered",          time: "18 min ago"},
  { icon: "phone", event: "New intake call",     detail: "Summit Law Group · Intake form completed",   time: "23 min ago"},
  { icon: "web",   event: "Form submission",     detail: "Peak Plumbing · Contact form captured",      time: "26 min ago"},
  { icon: "star",  event: "Review published",    detail: "Castro Chiropractic · 5-star review live",   time: "31 min ago"},
]

const iconMap = { phone: Phone, star: Star, crm: LayoutDashboard, web: Globe }
const colorMap = {
  phone: "text-primary bg-primary/10",
  star:  "text-amber-600 bg-amber-50",
  crm:   "text-violet-600 bg-violet-50",
  web:   "text-emerald-600 bg-emerald-50",
}

/* ─── Component ──────────────────────────────────────────────── */
export function Hero({ onWatchClick }: { onWatchClick?: () => void }) {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [show, setShow]           = useState(true)
  const [feedIdx, setFeedIdx]     = useState(0)

  /* Cycle phrases every 2.8 s with a quick fade */
  useEffect(() => {
    const id = setInterval(() => {
      setShow(false)
      setTimeout(() => {
        setPhraseIdx((n) => (n + 1) % phrases.length)
        setShow(true)
      }, 350)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  /* Advance activity feed every 3.5 s */
  useEffect(() => {
    const id = setInterval(() => setFeedIdx((n) => (n + 1) % pool.length), 3500)
    return () => clearInterval(id)
  }, [])

  /* Show 4 consecutive items, top item freshest */
  const visible = Array.from({ length: 4 }, (_, i) => pool[(feedIdx + i) % pool.length])

  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-52 sm:pb-36">

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

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">

          {/* ── Brand name — the largest element on the page ── */}
          <h1 className="font-sans text-5xl font-extrabold uppercase leading-none tracking-[0.1em] text-foreground sm:text-7xl lg:text-[8.5rem]">
            Recept<span className="text-primary">ifi</span>
          </h1>

          {/* ── Cycling service line ── */}
          <div className="mt-4 h-9 overflow-hidden sm:mt-5 sm:h-10">
            <p
              className="font-sans text-xl font-medium italic text-muted-foreground sm:text-2xl"
              style={{
                opacity:   show ? 1 : 0,
                transform: show ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {phrases[phraseIdx]}
            </p>
          </div>

          {/* ── Summary ── */}
          <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            See what not using AI is costing your business
          </p>

          {/* ── Live activity feed ── */}
          <div className="mt-12 w-full max-w-lg">
            <div className="glass-card overflow-hidden rounded-[1.75rem]">

              {/* Feed header */}
              <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">
                    Live System Activity
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-green-700">
                  <TrendingUp className="size-3" />
                  <span className="font-sans text-[10px] font-bold">99.9% uptime</span>
                </div>
              </div>

              {/* Activity rows */}
              <div className="divide-y divide-border/40">
                {visible.map((item, i) => {
                  const Icon = iconMap[item.icon]
                  return (
                    <div
                      key={`${feedIdx}-${i}`}
                      className="flex items-center gap-4 px-6 py-3.5 transition-opacity duration-500"
                      style={{
                        opacity: 1 - i * 0.2,
                        animation: i === 0 ? "fade-up 0.4s ease both" : undefined,
                      }}
                    >
                      <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${colorMap[item.icon]}`}>
                        <Icon className="size-3.5" />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <p className="text-sm font-semibold text-foreground">{item.event}</p>
                        <p className="truncate text-xs text-muted-foreground">{item.detail}</p>
                      </div>
                      <span className="shrink-0 font-sans text-[9px] text-muted-foreground/50">
                        {item.time}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── CTAs ── */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              render={<a href="/book" />}
              nativeButton={false}
              size="lg"
              className="group h-14 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.03] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
            >
              Book a Revenue Audit
              <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>

            <button
              type="button"
              onClick={onWatchClick}
              className="group inline-flex items-center gap-3 text-sm font-medium text-foreground"
            >
              <span className="flex size-11 items-center justify-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:text-primary">
                <Play className="size-4 fill-current" />
              </span>
              Watch How It Works
            </button>
          </div>


        </div>
      </div>
    </section>
  )
}
