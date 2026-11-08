import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Search, TrendingUp, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "General SEO for Local Service Businesses | Receptifi",
  description:
    "SEO for HVAC, plumbing, electrical, and other local service businesses in the Inland Empire. We rank you for what customers actually search, not just your business name.",
}

const faqs = [
  {
    q: "What's the difference between General SEO and Local SEO?",
    a: "General SEO is your site itself, structure, content, and backlinks, ranking for the services you offer. Local SEO is your Google Business Profile and the map pack. They work together, but they're different jobs with different fixes.",
  },
  {
    q: "How long until I rank higher?",
    a: "There's no fixed timeline, and anyone who guarantees one isn't being straight with you. It depends on your starting point and how competitive your trade and area are. We track ranking movement over time so you see real progress, not a one-time checklist.",
  },
  {
    q: "Do you guarantee a #1 ranking?",
    a: "No. Nobody can honestly guarantee a specific Google ranking. What we can guarantee is that we'll show you exactly what's moving and what isn't.",
  },
  {
    q: "Is General SEO included if I'm on the Systems plan?",
    a: "It's one of the five channels checked in every free audit. If it's a channel worth running for your business, it gets built into your Systems plan.",
  },
  {
    q: "What if I want to learn to do this myself?",
    a: "That's what Coaching is for. We'll show you what actually moves rankings versus what's a waste of time, and how to build backlinks that are worth having.",
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

export default function GeneralSeoPage() {
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
            <Search className="size-3.5" />
            General SEO
          </span>
          <h1 className="text-balance font-serif text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
            Rank for what customers search, not just your business name.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Most small business sites rank for their own name and nothing else. General SEO means building the on-page structure, content, and site authority Google rewards for the searches that actually bring in customers, tracked over time so you see real movement.
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
              Google ranks pages for specific searches, not businesses. A site built only around your company name has nothing to rank for when someone searches &quot;emergency plumber Riverside&quot; or &quot;AC repair near me.&quot;
            </p>
            <p className="text-pretty text-lg leading-relaxed text-foreground">
              Content built around what customers actually search outranks content that only describes your company. Site structure and backlinks from relevant sites still matter, more of them isn&apos;t the goal, the right ones are.
            </p>
            <p className="text-pretty text-lg leading-relaxed text-foreground">
              Ranking movement should be tracked over time. A one-time checklist tells you nothing about whether what was built is actually working.
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
            Receptifi works with local service businesses, HVAC, plumbing, electrical, and others, across Riverside, San Bernardino, Moreno Valley, Ontario, Rancho Cucamonga, and Corona. Every engagement starts with a free audit of your current rankings, so you see exactly what&apos;s costing you customers before you spend anything.
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
                If the audit shows General SEO is worth running for you, it gets built into your plan, site fixes, content, and ranking tracked weekly.
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
                We&apos;ll show you what actually moves rankings versus what&apos;s a waste of time, and how to build backlinks that are worth having, not just more of them.
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
            See what&apos;s actually costing you rankings.
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
