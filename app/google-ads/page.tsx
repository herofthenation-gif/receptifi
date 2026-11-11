import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Megaphone, TrendingUp, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Google Ads for Local Service Businesses in the Inland Empire | Receptifi",
  description:
    "Google Ads management for local service businesses in the Inland Empire. Campaigns sent to pages built for the exact search, not your homepage, with call tracking that works.",
}

const faqs = [
  {
    q: "How much should I spend on Google Ads per month?",
    a: "There's no universal number, it depends on your trade, service area, and competition. We work out a real budget from actual click prices for your keywords and area during the audit, not a guess.",
  },
  {
    q: "Do you manage my existing Google Ads account, or start fresh?",
    a: "Either. If you already have an account, we audit what's there first, good search terms and click prices are data worth keeping, before changing anything.",
  },
  {
    q: "Why does my ad send people to my homepage right now hurt me?",
    a: "A homepage tries to be everything to everyone. A page built for the exact search the ad is targeting converts better and costs less per lead over time.",
  },
  {
    q: "Is Google Ads included if I'm on the Systems plan?",
    a: "It's one of the five channels checked in every free audit. If it's worth running for your business, it gets built into your Systems plan and managed, not just set and forgotten.",
  },
  {
    q: "What if I want to learn to run my own campaigns?",
    a: "That's what Coaching is for. We'll show you how to set up call-only extensions and conversion tracking correctly, and what budget actually makes sense before you scale up.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export default function GoogleAdsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="pt-36 sm:pt-48 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
            <Megaphone className="size-3.5" />
            Google Ads
          </span>
          <h1 className="text-balance font-serif text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
            Stop paying for clicks that were never going to call.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            We build and manage paid search campaigns that send clicks to a landing page built for that exact search, not your homepage, with call-only extensions so the people ready to buy can reach you by phone immediately.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.03] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
            >
              Book a Free Audit
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* What it means */}
      <section className="bg-section-alt py-24 sm:py-36">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
            What It Actually Means
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Three facts, no filler.
          </h2>
          <div className="mt-10 space-y-6">
            <p className="text-pretty text-lg leading-relaxed text-foreground">
              Most local businesses waste a meaningful share of their Google Ads budget on the wrong clicks, searches with no real buying intent, or clicks sent to a homepage that was never built to convert that specific search.
            </p>
            <p className="text-pretty text-lg leading-relaxed text-foreground">
              Call-only extensions and correct conversion tracking matter more than the ad copy itself. If tracking is wrong, the campaign optimizes for the wrong thing automatically.
            </p>
            <p className="text-pretty text-lg leading-relaxed text-foreground">
              Budget should come from real click prices for your trade and area, not a guess or whatever Google&apos;s own suggested budget recommends.
            </p>
          </div>
        </div>
      </section>

      {/* Why it matters locally */}
      <section className="py-24 sm:py-36">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
            Why It Matters Here
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for Inland Empire service businesses.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Receptifi works with local service businesses across Riverside, San Bernardino, Moreno Valley, Ontario, Rancho Cucamonga, and Corona. Every engagement starts with a free audit of real click prices and keyword intent for your specific trade and area, so budget isn&apos;t a guess.
          </p>
        </div>
      </section>

      {/* Two paths */}
      <section className="bg-section-alt py-24 sm:py-36">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Two Ways To Work With Us
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Done for you, or taught to you.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="glass-card flex flex-col rounded-[2rem] p-8 sm:p-10">
              <TrendingUp className="size-6 text-primary" />
              <h3 className="mt-4 font-serif text-2xl font-bold tracking-tight text-foreground">
                Systems
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
                If the audit shows Google Ads is worth running for you, it gets built into your plan, managed campaigns, correct tracking, budget actually spent on the right clicks.
              </p>
              <p className="mt-6 font-serif text-3xl font-bold text-foreground">
                3,000<span className="text-base font-medium text-muted-foreground">/month</span>
              </p>
              <a
                href="/platform"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                See the Systems plan
                <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="glass-card flex flex-col rounded-[2rem] p-8 sm:p-10">
              <Users className="size-6 text-primary" />
              <h3 className="mt-4 font-serif text-2xl font-bold tracking-tight text-foreground">
                Coaching
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
                We&apos;ll show you how to set up campaigns that target searches actually worth paying for, and what budget makes sense before you scale.
              </p>
              <p className="mt-6 font-serif text-3xl font-bold text-foreground">
                1,500<span className="text-base font-medium text-muted-foreground">/month</span>
              </p>
              <a
                href="/services"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                See the Coaching plan
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-36">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
            Questions
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Common questions, answered straight.
          </h2>
          <div className="mt-10 space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="glass-card rounded-[1.75rem] p-7 sm:p-8">
                <h3 className="font-serif text-xl font-bold tracking-tight text-foreground">
                  {f.q}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-section-alt py-24 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            See where your ad budget is actually leaking.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Book a free audit and we&apos;ll show you the gap, in writing, before you spend a dollar.
          </p>
          <div className="mt-10">
            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.03] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
            >
              Book a Free Audit
              <ArrowRight className="size-4" />
            </a>
          </div>
          <p className="mt-10 text-xs text-muted-foreground">
            Written by Karmello Robinson, founder of Receptifi. Last reviewed November 2026.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
