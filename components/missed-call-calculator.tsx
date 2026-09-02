"use client"

import { useState } from "react"

const inputClasses =
  "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 })
}

// Small self-contained tool: estimates revenue lost to missed calls from
// three inputs the visitor can edit inline. No submission, updates live.
export function MissedCallCalculator() {
  const [avgJobValue, setAvgJobValue] = useState(300)
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(5)
  const [bookingRate, setBookingRate] = useState(30)

  const weeklyLoss = missedCallsPerWeek * (bookingRate / 100) * avgJobValue
  const monthlyLoss = weeklyLoss * 4.33

  return (
    <div className="mt-6 rounded-xl border border-border bg-background/60 p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">Quick Calculator</p>
      <p className="mt-1 text-sm text-muted-foreground">See roughly what missed calls are costing you.</p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="block text-xs font-medium text-muted-foreground">Avg. job value ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            value={avgJobValue}
            onChange={(e) => setAvgJobValue(Math.max(0, Number(e.target.value) || 0))}
            className={inputClasses}
          />
        </label>
        <label className="block">
          <span className="block text-xs font-medium text-muted-foreground">Missed calls / week</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={missedCallsPerWeek}
            onChange={(e) => setMissedCallsPerWeek(Math.max(0, Number(e.target.value) || 0))}
            className={inputClasses}
          />
        </label>
        <label className="block">
          <span className="block text-xs font-medium text-muted-foreground">% of calls that book</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={100}
            value={bookingRate}
            onChange={(e) => setBookingRate(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
            className={inputClasses}
          />
        </label>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-foreground">
        Estimated revenue you&apos;re leaving on the table:{" "}
        <span className="font-semibold text-primary">${formatCurrency(monthlyLoss)}/month</span>{" "}
        <span className="text-muted-foreground">(${formatCurrency(weeklyLoss)}/week)</span>
      </p>
    </div>
  )
}
