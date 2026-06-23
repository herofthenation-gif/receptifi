"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TrendingDown, TrendingUp, ArrowRight } from "lucide-react"

const fmt = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 0 })

const fmtShort = (n: number) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 10_000)    return `$${Math.round(n / 1_000)}k`
  return `$${fmt(n)}`
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
  max,
}: {
  id: string
  label: string
  hint: string
  value: string
  onChange: (v: string) => void
  prefix?: string
  suffix?: string
  placeholder: string
  max?: number
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </label>
      <div className="flex items-center rounded-xl border-2 border-border bg-background transition-colors focus-within:border-primary">
        {prefix && (
          <span className="pl-4 font-mono text-xl font-bold text-muted-foreground">{prefix}</span>
        )}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, "")
            if (max !== undefined && Number(raw) > max) return
            onChange(raw)
          }}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent py-4 px-3 text-right font-mono text-2xl font-bold text-foreground outline-none placeholder:text-muted-foreground/25"
        />
        {suffix && (
          <span className="pr-4 font-mono text-xl font-bold text-muted-foreground">{suffix}</span>
        )}
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{hint}</p>
    </div>
  )
}

export function RoiCalculator() {
  const [leadsStr,  setLeadsStr]  = useState("")
  const [valueStr,  setValueStr]  = useState("")
  const [missedStr, setMissedStr] = useState("")

  const leads  = Math.max(0, parseInt(leadsStr)  || 0)
  const value  = Math.max(0, parseInt(valueStr)  || 0)
  const missed = Math.min(100, Math.max(0, parseInt(missedStr) || 0))

  const hasInput  = leads > 0 && value > 0 && missed > 0
  const leaked    = Math.round(leads * (missed / 100) * value)
  const recovered = Math.round(leaked * 0.85)

  return (
    <section id="case-studies" className="scroll-mt-24 py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-6 block font-sans text-xs uppercase tracking-[0.18em] text-primary">
            Revenue Audit
          </span>
          <h2 className="text-balance font-serif text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Calculate the revenue you&apos;re leaking.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Enter your real numbers. No email required. See exactly what unanswered calls are costing your business every month.
          </p>
        </div>

        <div className="glass-card mt-16 grid overflow-hidden rounded-[2rem] lg:grid-cols-2">
          {/* ── Left: Inputs ── */}
          <div className="border-b border-border p-8 sm:p-12 lg:border-b-0 lg:border-r">
            <div className="mb-8">
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Your Numbers
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Use your actual numbers for an accurate picture. The result updates instantly.
              </p>
            </div>

            <div className="space-y-7">
              <Field
                id="leads"
                label="Monthly Inbound Calls or Leads"
                hint="Calls, form fills, DMs, anything that could turn into a customer."
                value={leadsStr}
                onChange={setLeadsStr}
                placeholder="600"
              />
              <Field
                id="value"
                label="Average Value per New Customer"
                hint="What does a typical job, appointment, or sale bring in for your business?"
                value={valueStr}
                onChange={setValueStr}
                prefix="$"
                placeholder="1,200"
              />
              <Field
                id="missed"
                label="Calls You Currently Miss"
                hint="After-hours, busy lines, voicemails never returned. Industry average is 20 to 30 percent."
                value={missedStr}
                onChange={setMissedStr}
                suffix="%"
                placeholder="28"
                max={100}
              />
            </div>
          </div>

          {/* ── Right: Results ── */}
          <div className="flex flex-col justify-center gap-5 bg-muted/40 p-8 sm:p-12">
            {/* Live badge */}
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground">
                Live Results
              </span>
            </div>

            {/* Leaked */}
            <div className="rounded-2xl border border-warning/30 bg-warning/5 p-6">
              <div className="flex items-center gap-2 text-warning">
                <TrendingDown className="size-4" />
                <span className="font-sans text-[11px] uppercase tracking-[0.16em]">
                  Estimated Leaked Revenue / mo
                </span>
              </div>
              {hasInput ? (
                <p className="mt-3 font-sans text-4xl font-bold tracking-tight text-warning sm:text-5xl">
                  ${fmt(leaked)}
                </p>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground/60 italic">
                  Enter your numbers on the left to see your monthly revenue leak.
                </p>
              )}
            </div>

            {/* Recovered */}
            <div className="rounded-2xl border border-primary/25 bg-primary/8 p-6 shadow-soft">
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="size-4" />
                <span className="font-sans text-[11px] uppercase tracking-[0.16em]">
                  Recovered With Receptifi / mo
                </span>
              </div>
              {hasInput ? (
                <p className="mt-3 font-sans text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                  ${fmt(recovered)}
                </p>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground/60 italic">
                  This is what Receptifi puts back into your business every month.
                </p>
              )}
            </div>

            <Button
              render={<a href="/book" />}
              nativeButton={false}
              size="lg"
              className="group h-13 w-full rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
            >
              {hasInput
                ? `Claim ${fmtShort(recovered)} / Month`
                : "Claim This Revenue"}
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
