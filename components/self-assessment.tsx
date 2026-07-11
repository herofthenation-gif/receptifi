"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

const items = [
  "No way to book online",
  "Google rating under 4.0, or under 50 reviews",
  "Site hasn't been updated in 2 or more years",
  "Calls go to voicemail after hours",
  "No system for following up on leads",
  "Not sure how AI could help, but curious",
]

export function SelfAssessment() {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false))
  const count = checked.filter(Boolean).length

  const toggle = (i: number) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  return (
    <section className="py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-6 block font-sans text-xs uppercase tracking-[0.18em] text-primary">
            Free Self-Check
          </span>
          <h2 className="text-balance font-serif text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            What&apos;s costing you customers?
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Check what applies to your business. No email required.
          </p>
        </div>

        <div className="glass-card mx-auto mt-16 max-w-2xl overflow-hidden rounded-[2rem] p-8 sm:p-12">
          <div className="space-y-3">
            {items.map((item, i) => {
              const isChecked = checked[i]
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={isChecked}
                  className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-colors ${
                    isChecked
                      ? "border-primary bg-primary/6"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                      isChecked ? "border-primary bg-primary text-primary-foreground" : "border-border"
                    }`}
                  >
                    {isChecked && <Check className="size-4" strokeWidth={3} />}
                  </span>
                  <span className="text-sm font-medium text-foreground sm:text-base">{item}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-8 flex flex-col items-center gap-5 border-t border-border pt-8 text-center">
            {count > 0 ? (
              <p className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {count} of {items.length} apply to your business.
              </p>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground/70 italic">
                Check the ones that apply above to see where you stand.
              </p>
            )}
            <Button
              render={<a href="/book" />}
              nativeButton={false}
              size="lg"
              className="group h-13 w-full rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] sm:w-auto"
            >
              See what to fix, book a free audit
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
