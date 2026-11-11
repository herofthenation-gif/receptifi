import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Share2, TrendingUp, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Meta Ads for Local Service Businesses in the Inland Empire | Receptifi",
  description:
    "Facebook and Instagram ads for local service businesses in the Inland Empire. Real job photos, not stock creative, in front of people before they're even searching for you.",
}

const faqs = [
  {
    q: "Facebook or Instagram, which should I actually run ads on?",
    a: "Usually both, through the same campaign, since Meta serves across both from one setup. What matters more than the platform is the creative, real job photos and before-and-afters outperform stock images and stop the scroll.",
  },
  {
    q: "How do you target the right people?",
    a: "Targeting gets set up so you're not paying to reach people who were never going to need your service. We test what actually performs before scaling spend, not guess with your budget.",
  },
  {
    q: "What if my ad click lands on a dead-looking page?",
    a: "We keep your page looking active, since an ad click landing on a stale profile kills conversion before the person even reaches your offer. Creative gets rotated so nothing goes stale.",
  },
  {
    q: "Is Meta Ads included if I'm on the Systems plan?",
    a: "It's one of the five channels checked in every free audit. If it's worth running for your business, it gets built into your Systems plan.",
  },
  {
    q: "What if I want to learn to run my own ads?",
    a: "That's what Coaching is for. We'll show you what creative actually performs, how to set up targeting correctly, and what to test first.",
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

export default function MetaAdsPage() {
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
            <Share2 className="size-3.5" />
            Meta Ads
          </span>
          <h1 className="text-balance font-serif text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
            Ads that stop the scroll, not just spend the budget.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Facebook and Instagram ads built around real job photos and before-and-afters, put in front of people who aren&apos;t even searching for you yet, so they already know your name before they need you.
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
              Facebook and Instagram ads live or die in the first half-second. Creative that looks like stock advertising gets scrolled past; real job photos and before-and-afters don&apos;t.
            </p>
            <p className="text-pretty text-lg leading-relaxed text-foreground">
              Targeting the wrong people wastes budget just as fast as bad creative does. Testing what actually performs matters more than guessing and hoping.
            </p>
            <p className="text-pretty text-lg leading-relaxed text-foreground">
              A click that lands on a dead-looking page kills the ad spend that got it there. The page has to look active, and the creative has to stay fresh.
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
            Receptifi works with local service businesses across Riverside, San Bernardino, Moreno Valley, Ontario, Rancho Cucamonga, and Corona. Every engagement starts with a free audit of what&apos;s actually worth running for your business before any ad spend goes out.
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
                If the audit shows Meta Ads is worth running for you, it gets built into your plan, real creative, correct targeting, kept fresh so spend never goes stale.
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
                We&apos;ll show you what creative actually performs versus what just looks nice, and how to set up targeting so you&apos;re not paying to reach the wrong people.
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
            See what your ads should actually look like.
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
