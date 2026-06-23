"use client"

import { useCallback, useEffect, useState } from "react"
import { CheckCircle2, Globe, LayoutDashboard, Phone, Star, TrendingUp, Zap } from "lucide-react"

const STEP_DURATION = 14000

const steps = [
  {
    id: 0,
    label: "New Website",
    service: "Website",
    icon: Globe,
    title: "They find you. Because we built a site that gets found.",
    description:
      "Your Receptifi website is built to rank, load fast, and convert. A visitor spots your number, clicks to call, and you are already ahead of every competitor who sent them to voicemail.",
  },
  {
    id: 1,
    label: "Call Answered",
    service: "Live Answering",
    icon: Phone,
    title: "Aria answers. Every call. Every time.",
    description:
      "No voicemail. No missed patients. Your AI receptionist greets callers in your business name, qualifies them, and books the appointment right then and there.",
  },
  {
    id: 2,
    label: "Lead Tracked",
    service: "Lead Tracking",
    icon: LayoutDashboard,
    title: "Every detail is logged the second the call ends.",
    description:
      "The lead lands in your CRM automatically. Name, service, source, status. You get a notification instantly. Nothing falls through the cracks.",
  },
  {
    id: 3,
    label: "Review Sent",
    service: "Reviews",
    icon: Star,
    title: "Happy customer. New review. Higher ranking.",
    description:
      "24 hours after their visit, the customer gets a review request by text. One tap submits a 5-star review. Your Google ranking climbs without you lifting a finger.",
  },
]

/* ─── Step 0: Website Panel ──────────────────────────────────── */
function WebsitePanel({ iteration }: { iteration: number }) {
  return (
    <div key={iteration} className="mx-auto w-full max-w-md">
      {/* Browser chrome */}
      <div className="anim-fade-up overflow-hidden rounded-2xl border border-border shadow-soft-lg">
        {/* Tab bar */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-3 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-300" />
            <span className="size-2.5 rounded-full bg-amber-300" />
            <span className="size-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex flex-1 items-center justify-center rounded-md bg-background px-3 py-1">
            <span className="font-mono text-[10px] text-muted-foreground">brightsmilediental.com</span>
          </div>
        </div>

        {/* Mock website */}
        <div className="bg-background p-5">
          {/* Site nav */}
          <div
            className="anim-fade-in mb-4 flex items-center justify-between"
            style={{ animationDelay: "0.25s" }}
          >
            <span className="text-sm font-bold text-foreground">Bright Smile Dental</span>
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-muted-foreground sm:block">Services</span>
              <span className="hidden text-xs text-muted-foreground sm:block">About</span>
              <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                Book Now
              </span>
            </div>
          </div>

          {/* Hero copy */}
          <div className="anim-fade-up" style={{ animationDelay: "0.5s" }}>
            <p className="font-serif text-lg font-bold leading-snug text-foreground">
              Dallas&apos;s Most Trusted Family Dentist
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              New patients welcome. Same-day appointments available.
            </p>
          </div>

          {/* Phone CTA highlight */}
          <div
            className="anim-fade-up mt-4 rounded-xl border-2 border-primary bg-primary/5 px-4 py-3"
            style={{ animationDelay: "0.9s" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Call us anytime
            </p>
            <p className="mt-0.5 text-xl font-bold tracking-tight text-primary">(214) 555-0182</p>
          </div>
        </div>
      </div>

      {/* Visitor action */}
      <div
        className="anim-fade-up mt-4 flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3"
        style={{ animationDelay: "1.6s" }}
      >
        <span className="text-base">👆</span>
        <p className="text-sm text-muted-foreground">
          Visitor sees the number on your Receptifi-built site and calls
        </p>
      </div>

      {/* Aria picks up */}
      <div
        className="anim-fade-up mt-3 flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/5 px-4 py-3"
        style={{ animationDelay: "2.5s" }}
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary">
          <Phone className="size-4 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Aria picks up instantly</p>
          <p className="font-mono text-[10px] text-muted-foreground">
            No rings. No voicemail. Your business name, answered live.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Step 1: AI Call Panel ──────────────────────────────────── */
function CallPanel({ iteration }: { iteration: number }) {
  const messages = [
    { from: "ai",     text: "Thank you for calling Bright Smile Dental. How can I help you today?" },
    { from: "caller", text: "Hi, I would like to schedule a new patient appointment." },
    { from: "ai",     text: "Of course. I can book that right now. Does Thursday at 2:30 PM work?" },
    { from: "caller", text: "Perfect, Thursday works great." },
    { from: "ai",     text: "Done. You are confirmed for Thursday at 2:30 PM. See you then." },
  ]

  return (
    <div key={iteration} className="mx-auto w-full max-w-sm">
      {/* Live status bar */}
      <div className="anim-fade-in mb-4 flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/6 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Aria · Live</span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">New Patient Inquiry</span>
      </div>

      {/* Chat bubbles */}
      <div className="space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`anim-fade-up flex ${msg.from === "ai" ? "justify-start" : "justify-end"}`}
            style={{ animationDelay: `${0.2 + i * 0.55}s` }}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.from === "ai"
                  ? "rounded-bl-sm bg-muted text-foreground"
                  : "rounded-br-sm bg-primary text-primary-foreground"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Booked confirmation */}
      <div
        className="anim-fade-up mt-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-3.5"
        style={{ animationDelay: "3.2s" }}
      >
        <CheckCircle2 className="size-5 shrink-0 text-green-600" />
        <div>
          <p className="text-sm font-semibold text-green-800">Appointment confirmed</p>
          <p className="font-mono text-[11px] text-green-700">Sarah M. · Thursday 2:30 PM</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Step 2: CRM Panel ──────────────────────────────────────── */
function CrmPanel({ iteration }: { iteration: number }) {
  const fields = [
    { label: "Name",        value: "Sarah Mitchell" },
    { label: "Phone",       value: "(214) 555-0182" },
    { label: "Service",     value: "New Patient Exam" },
    { label: "Source",      value: "Inbound Call via Aria" },
    { label: "Assigned to", value: "Dr. Williams" },
  ]

  return (
    <div key={iteration} className="mx-auto w-full max-w-sm">
      {/* Header */}
      <div className="anim-fade-in mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="size-4 text-primary" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-primary">Receptifi CRM</span>
        </div>
        <span
          className="anim-fade-in rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 font-mono text-[10px] text-amber-700"
          style={{ animationDelay: "0.2s" }}
        >
          New Lead
        </span>
      </div>

      {/* Lead card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-background">
        {fields.map((f, i) => (
          <div
            key={f.label}
            className="anim-fade-up flex items-center justify-between border-b border-border/50 px-5 py-3.5 last:border-b-0"
            style={{ animationDelay: `${0.3 + i * 0.35}s` }}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {f.label}
            </span>
            <span className="ml-4 text-right text-sm font-medium text-foreground">{f.value}</span>
          </div>
        ))}

        {/* Status */}
        <div
          className="anim-fade-up flex items-center justify-between border-t border-border bg-muted/30 px-5 py-3.5"
          style={{ animationDelay: "2.1s" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Status</span>
          <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 font-mono text-[11px] font-bold text-green-700">
            <span className="size-1.5 rounded-full bg-green-500" />
            BOOKED
          </span>
        </div>
      </div>

      {/* Notification */}
      <div
        className="anim-fade-up mt-4 flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground"
        style={{ animationDelay: "2.6s" }}
      >
        <CheckCircle2 className="size-4 shrink-0 text-primary" />
        Notification sent to you · 0 seconds ago
      </div>
    </div>
  )
}

/* ─── Step 3: Review Panel ───────────────────────────────────── */
function ReviewPanel({ iteration }: { iteration: number }) {
  return (
    <div key={iteration} className="mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
      {/* Left: review request */}
      <div>
        <p className="anim-fade-in mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Customer receives
        </p>

        <div className="anim-fade-up rounded-2xl border border-border bg-background p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Text Message</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            Hi Sarah! Thanks for visiting Bright Smile Dental. How did we do? Tap to leave a quick review.
          </p>
          <div className="mt-3 block rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">
            Leave a Review
          </div>
        </div>

        <div
          className="anim-fade-up mt-3 rounded-2xl border border-border bg-background p-4 text-center"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Rating</p>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className="size-6 fill-amber-400 text-amber-400"
                style={{
                  animation: "fade-in 0.2s ease forwards",
                  animationDelay: `${0.9 + n * 0.12}s`,
                  opacity: 0,
                }}
              />
            ))}
          </div>
          <p
            className="anim-fade-up mt-2 text-sm font-semibold text-foreground"
            style={{ animationDelay: "1.65s" }}
          >
            5 stars submitted
          </p>
        </div>
      </div>

      {/* Right: Google ranking */}
      <div>
        <p className="anim-fade-in mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Google profile
        </p>

        <div
          className="anim-fade-up rounded-2xl border border-border bg-background p-4"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Before</p>
          <div className="mt-2 flex items-center gap-1">
            {[1, 2, 3, 4].map((n) => (
              <Star key={n} className="size-4 fill-amber-400 text-amber-400" />
            ))}
            <Star className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">4.5 · 38 reviews</p>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">#8 in local search</p>
        </div>

        <div
          className="anim-fade-up mt-3 rounded-2xl border border-primary/25 bg-primary/5 p-4"
          style={{ animationDelay: "2s" }}
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">After 30 days</p>
            <TrendingUp className="size-4 text-green-600" />
          </div>
          <div className="mt-2 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className="size-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="mt-1 text-sm font-semibold text-foreground">4.8 · 57 reviews</p>
          <p className="mt-1 font-mono text-[11px] font-bold text-green-700">#3 in local search ↑</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────────── */
export function DemoWalkthrough() {
  const [activeStep, setActiveStep] = useState(0)
  const [iteration, setIteration] = useState(0)

  const goTo = useCallback((step: number) => {
    setActiveStep(step)
    setIteration((n) => n + 1)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => {
      goTo((activeStep + 1) % steps.length)
    }, STEP_DURATION)
    return () => clearTimeout(id)
  }, [activeStep, goTo])

  const active = steps[activeStep]

  return (
    <section id="demo" className="scroll-mt-20 bg-background py-24 sm:py-36" style={{ animation: "fade-up 0.55s ease both" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 block font-sans text-xs uppercase tracking-[0.18em] text-primary">
            The Full Stack in Action
          </span>
          <h2 className="text-balance font-serif text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl">
            Your website brings them in. Aria answers. The CRM tracks it. Then the reviews write themselves.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Four services working as one system. Every step runs automatically so you never have to chase a lead, return a call, or ask for a review again.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Step tabs */}
          <div className="mb-2 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {steps.map((step) => {
              const Icon = step.icon
              const isActive = activeStep === step.id
              return (
                <button
                  key={step.id}
                  onClick={() => goTo(step.id)}
                  className={`group flex flex-col items-start gap-2 rounded-2xl border px-4 py-4 text-left transition-all duration-200 sm:px-5 ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/4"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <Icon className={`size-4 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
                    <span
                      className={`font-sans text-[10px] ${
                        isActive ? "text-primary-foreground/60" : "text-muted-foreground"
                      }`}
                    >
                      0{step.id + 1}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-semibold leading-tight sm:text-xs ${
                      isActive ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span
                    className={`font-sans text-[9px] uppercase tracking-widest ${
                      isActive ? "text-primary-foreground/50" : "text-muted-foreground/60"
                    }`}
                  >
                    {step.service}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Progress bar */}
          <div className="mb-4 h-0.5 overflow-hidden rounded-full bg-border">
            <div
              key={`progress-${iteration}`}
              className="h-full rounded-full bg-primary anim-progress"
              style={{ animationDuration: `${STEP_DURATION}ms` }}
            />
          </div>

          {/* Next button */}
          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={() => goTo((activeStep + 1) % steps.length)}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2 text-xs font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
            >
              Next
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Panel */}
          <div className="glass-card overflow-hidden rounded-[2rem] p-8 sm:p-12">
            {/* Description */}
            <div className="mb-10 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div className="flex-1">
                <h3 className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-2 max-w-lg text-base leading-relaxed text-muted-foreground">
                  {active.description}
                </p>
              </div>
              <span className="hidden shrink-0 items-center gap-1 self-start rounded-full border border-border px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-muted-foreground sm:flex">
                Step 0{active.id + 1} / 0{steps.length}
              </span>
            </div>

            {/* Animated mockup */}
            <div className="min-h-[340px] sm:min-h-[380px]">
              {activeStep === 0 && <WebsitePanel key={iteration} iteration={iteration} />}
              {activeStep === 1 && <CallPanel key={iteration} iteration={iteration} />}
              {activeStep === 2 && <CrmPanel key={iteration} iteration={iteration} />}
              {activeStep === 3 && <ReviewPanel key={iteration} iteration={iteration} />}
            </div>
          </div>

          {/* Full-stack callout strip */}
          <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-border bg-muted/30 px-6 py-5 text-center sm:flex-row sm:text-left">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary">
              <Zap className="size-4 text-primary-foreground" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Each service works on its own.</span>{" "}
              Together as a full stack, they create a revenue loop that runs 24 hours a day, 7 days a week, and saves the average local business owner 12 or more hours every week.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
