"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

type SubscribeFormProps = {
  source?: "footer" | "seo_tips" | "google_tips" | "meta_tips" | "aria_tips" | "chat_tips" | "followup_tips"
  label?: string
  buttonLabel?: string
  successText?: string
  compact?: boolean
}

export function SubscribeForm({
  source = "footer",
  label,
  buttonLabel = "Subscribe",
  successText = "You’re on the list.",
  compact = false,
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
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Check className="size-3.5 text-primary" />
        {successText}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
