"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Loader2 } from "lucide-react"

const CALENDLY = "https://calendly.com/karmello-koba1ba/30min"

export default function BookPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [problem, setProblem] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, problem }),
      })
    } catch {
      // Non-blocking — still redirect even if save fails
    }

    const params = new URLSearchParams({ name, email })
    window.location.href = `${CALENDLY}?${params.toString()}`
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="flex min-h-[calc(100vh-4rem)] items-center py-24 pt-36">
        <div className="mx-auto w-full max-w-lg px-5 sm:px-8">

          <div className="mb-10">
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Book Your Free Call
            </span>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Tell us a little about your business.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We will come to the call prepared. Takes 30 seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card rounded-[2rem] p-8 sm:p-10 space-y-5">

            <div className="space-y-2">
              <label htmlFor="name" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Business Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="jane@yourbusiness.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="problem" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                What is your biggest challenge right now?
              </label>
              <textarea
                id="problem"
                rows={4}
                placeholder="e.g. We miss too many calls after hours. Our website gets traffic but no one books. We have no idea where our leads come from..."
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Taking you to the calendar...
                </>
              ) : (
                <>
                  Continue to Book Your Call
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Free 30-minute strategy call. No pitch, no pressure.
            </p>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
