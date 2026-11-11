"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

type SubscribeFormProps = {
  source?: "footer" | "audit_cta" | "seo_tips" | "local_seo_tips" | "google_tips" | "meta_tips" | "ai_seo_tips" | "aria_tips" | "website_tips" | "crm_tips"
  label?: string
  buttonLabel?: string
  successText?: string
  compact?: boolean
  size?: "sm" | "lg"
  id?: string
}

export function SubscribeForm({
  source = "footer",
  label,
  buttonLabel = "Subscribe",
  successText = "You’re on the list.",
  compact = false,
  size = "sm",
  id,
}: SubscribeFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Try again.")
        setStatus("error")
        return
      }
      setStatus("done")
    } catch {
      setErrorMsg("Something went wrong. Try again.")
      setStatus("error")
    }
  }

  if (status === "done") {
    return (
      <div
        id={id}
        className={`flex items-center justify-center gap-2 text-muted-foreground ${size === "lg" ? "h-14 text-base" : "text-xs"}`}
      >
        <Check className={size === "lg" ? "size-5 text-primary" : "size-3.5 text-primary"} />
        {successText}
      </div>
    )
  }

  if (size === "lg") {
    return (
      <form id={id} onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
        {label && (
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {label}
          </span>
        )}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="you@yourbusiness.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 w-full max-w-sm rounded-full border border-border bg-background px-6 text-base text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="group inline-flex h-14 w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.03] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] disabled:opacity-60 sm:w-auto"
          >
            {status === "loading" ? "..." : buttonLabel}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
        {status === "error" && (
          <p className="text-center text-sm text-destructive">{errorMsg}</p>
        )}
      </form>
    )
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="flex flex-col gap-2">
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
      )}
      <div className="flex items-center gap-2">
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@yourbusiness.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`rounded-full border border-border bg-background px-4 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors ${compact ? "w-full" : "w-56"}`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60"
        >
          {status === "loading" ? "..." : buttonLabel}
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-destructive">{errorMsg}</p>
      )}
    </form>
  )
}
