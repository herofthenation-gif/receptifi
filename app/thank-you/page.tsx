import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "You're Booked | Receptifi",
  description: "Your call with Receptifi is confirmed. Here's what happens next.",
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="flex min-h-[calc(100vh-4rem)] items-center py-24 pt-36">
        <div className="mx-auto w-full max-w-lg px-5 sm:px-8 text-center">

          <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="size-8 text-primary" />
          </div>

          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
            You're Booked
          </span>
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Your call is confirmed.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Check your email for the calendar invite. We'll review your business beforehand so we come to the call prepared, not pitching.
          </p>

          <div className="mt-10 glass-card rounded-[2rem] p-8 text-left space-y-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              What happens next
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-foreground">
              <li className="flex gap-3">
                <span className="text-primary">1.</span>
                <span>We look at your current site, reviews, and lead flow before the call.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">2.</span>
                <span>On the call, we walk through what's costing you leads and what we'd fix first.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">3.</span>
                <span>No pressure. If it's not a fit, we'll tell you.</span>
              </li>
            </ul>
          </div>

          <Link
            href="/"
            className="mt-8 inline-block text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Back to homepage
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
