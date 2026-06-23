"use client"

import { Phone, ArrowRight, CheckCircle2, Activity } from "lucide-react"
import { useState, useEffect } from "react"

// Per-bar config: duration (s), delay (s), min height %, dark navy or light tint
const BAR_CONFIG = [
  { dur: 1.05, delay: 0.00, minH: 18, dark: false },
  { dur: 0.82, delay: 0.18, minH: 32, dark: false },
  { dur: 1.31, delay: 0.42, minH: 55, dark: true  },
  { dur: 0.94, delay: 0.07, minH: 25, dark: false },
  { dur: 1.18, delay: 0.63, minH: 68, dark: true  },
  { dur: 0.76, delay: 0.29, minH: 40, dark: false },
  { dur: 1.44, delay: 0.51, minH: 82, dark: true  },
  { dur: 0.89, delay: 0.14, minH: 48, dark: false },
  { dur: 1.22, delay: 0.37, minH: 72, dark: true  },
  { dur: 1.07, delay: 0.58, minH: 30, dark: false },
  { dur: 0.71, delay: 0.22, minH: 60, dark: true  },
  { dur: 1.36, delay: 0.45, minH: 88, dark: true  },
]

export function HeroVisual() {
  const [captured, setCaptured] = useState(1284)
  const [qualified, setQualified] = useState(942)
  const [closed, setClosed] = useState(318)
  const [spiking, setSpiking] = useState(false)

  // Counter loop — every 4s increment CAPTURED + cascade
  useEffect(() => {
    const captureInterval = setInterval(() => {
      setCaptured((n) => n + 1)
      // Trigger spike
      setSpiking(true)
      setTimeout(() => setSpiking(false), 1000)

      setTimeout(() => {
        setQualified((n) => n + 1)
        setTimeout(() => {
          setClosed((n) => n + 1)
        }, 1500)
      }, 2000)
    }, 4000)

    return () => clearInterval(captureInterval)
  }, [])

  const stages = [
    { label: "Captured", value: captured, active: true },
    { label: "Qualified", value: qualified, active: false },
    { label: "Closed", value: closed, active: false },
  ]

  return (
    <div className="relative">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-primary/8 blur-3xl"
      />

      <div className="glass-card relative overflow-hidden rounded-[1.75rem] p-6 sm:p-7">
        {/* window chrome — macOS-style traffic lights */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: "#FF5F56" }}
            />
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: "#FFBD2E" }}
            />
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: "#27C93F" }}
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            live pipeline
          </span>
        </div>

        {/* incoming call card */}
        <div className="flex items-center gap-3 rounded-xl border border-primary/40 bg-primary/10 p-4">
          <span className="relative flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="absolute inset-0 rounded-full bg-primary animate-ping-soft" />
            <Phone className="relative size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">
              Incoming Call
            </p>
            <p className="truncate text-xs text-muted-foreground">
              +1 (415) 555-0142 · Routing to live agent
            </p>
          </div>
          <span className="font-mono text-xs text-primary">00:02</span>
        </div>

        {/* routing line */}
        <div className="my-3 flex items-center justify-center gap-2 text-muted-foreground">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary/60" />
          <ArrowRight className="size-4 text-primary" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-primary/60" />
        </div>

        {/* pipeline stages */}
        <div className="grid grid-cols-3 gap-2.5">
          {stages.map((s) => (
            <div
              key={s.label}
              className={`rounded-xl border p-3 ${
                s.active
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-background/60"
              }`}
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-1 w-[4.5ch] text-lg font-bold tabular-nums text-foreground">
                {s.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* metric footer */}
        <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-background/60 p-4">
          <div className="flex items-center gap-2">
            <Activity className="size-4 text-primary" />
            <span className="text-xs text-muted-foreground">
              Answer rate (24h)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-primary" />
            <span className="text-sm font-bold text-foreground">99.9%</span>
          </div>
        </div>

        {/* animated waveform bars — pure CSS, smooth ease-in-out */}
        <div className="mt-3 flex h-12 items-end gap-1.5">
          {BAR_CONFIG.map((b, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm"
              style={{
                backgroundColor: b.dark
                  ? spiking ? "#2a4fbb" : "#1E3A8A"
                  : spiking ? "rgba(30,58,138,0.48)" : "rgba(30,58,138,0.28)",
                transition: "background-color 0.2s ease",
                animationName: spiking ? "waveformSpike" : "waveform",
                animationDuration: spiking ? `${b.dur * 0.55}s` : `${b.dur}s`,
                animationDelay: `${b.delay}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDirection: "alternate",
                transformOrigin: "bottom",
                minHeight: `${b.minH * 0.18}px`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes waveform {
            0%   { transform: scaleY(0.18); }
            100% { transform: scaleY(1); }
          }
          @keyframes waveformSpike {
            0%   { transform: scaleY(0.55); }
            100% { transform: scaleY(1.35); }
          }
        `}</style>
      </div>
    </div>
  )
}
