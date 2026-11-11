"use client"

import { useEffect, useState } from "react"
import { ArrowRight, X } from "lucide-react"

// Gaps between re-shows: 30s, then 2min, then 5min, then repeats at the 5min
// cadence. Re-shows even after being dismissed, intentional per Karmello:
// this is the one remaining "Book a Free Audit" CTA, everything else on the
// site funnels to email signup instead.
const SCHEDULE_MS = [30_000, 120_000, 300_000]

export function AuditPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let index = 0
    let timer: ReturnType<typeof setTimeout>

    const scheduleNext = () => {
      const gap = SCHEDULE_MS[Math.min(index, SCHEDULE_MS.length - 1)]
      timer = setTimeout(() => {
        setOpen(true)
        index++
        scheduleNext()
      }, gap)
    }

    scheduleNext()
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed inset-y-0 left-0 z-[100] flex items-center transition-transform duration-500 ease-out ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="dark relative ml-3 w-64 rounded-2xl border border-border bg-background/95 p-5 shadow-soft-lg backdrop-blur-xl sm:ml-4 sm:w-72">
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          Not Sure
        </span>
        <p className="mt-2 text-sm font-semibold leading-snug text-foreground">
          What your business bottleneck may be?
        </p>
        <a
          href="/book"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          Book a Free Audit
          <ArrowRight className="size-3.5" />
        </a>
      </div>
    </div>
  )
}
