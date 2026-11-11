import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { SubscribeForm } from "@/components/subscribe-form"
import { ArrowRight, MapPin, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Local SEO & Map Pack for Local Service Businesses in the Inland Empire | Receptifi",
  description:
    "Win the Google map pack in the Inland Empire. We fully build out your Google Business Profile and review process so nearby customers find you first.",
}

const faqs = [
  {
    q: "What actually controls the map pack?",
    a: "Google says local ranking comes down to relevance, distance, and prominence, an accurate, fully-built Business Profile, how close you are to the searcher, and signals like reviews. There's no way to pay for a better position.",
  },
  {
    q: "Can you guarantee a map pack spot?",
    a: "No, and no honest agency can. What we can do is fully build out your profile, fix mismatched listings, and get a steady stream of reviews coming in, the things that are actually within your control.",
  },
  {
    q: "How many reviews do I actually need?",
    a: "Recent reviews matter more than sheer volume of old ones. A steady stream beats a one-time push, since Google weighs how current your signals are.",
  },
  {
    q: "Is Local SEO covered in Coaching?",
    a: "It's one of the five channels checked in every free audit, and if it's worth running for your business, it's one of the things we teach you to build.",
  },
  {
    q: "What if I want to learn to do this myself?",
    a: "That's what Coaching is for. We'll show you how to fully build out your profile, get reviews without begging for them, and what to check weekly.",
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

export default function LocalSeoPage() {
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
            <MapPin className="size-3.5" />
            Local SEO
          </span>
          <h1 className="text-balance font-serif text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
            Win the map pack before your competitors finish setting up theirs.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Over 90% of local searches never scroll past the map pack. Your Google Business Profile is the first thing a nearby customer sees, before they ever reach your website, so we fully build it out instead of leaving it half-done like most competitors do.
          </p>
          <div className="mt-10 flex justify-center">
            <SubscribeForm source="audit_cta" buttonLabel="Sign Up" size="lg" />
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
              Google says local ranking depends on relevance, distance, and prominence, not on anything you can pay for directly. A fully completed profile, accurate hours and categories, and real job photos all feed into that.
            </p>
            <p className="text-pretty text-lg leading-relaxed text-foreground">
              Mismatched business name, address, or phone number across directories quietly hurts your ranking, even if your Google profile itself looks fine.
            </p>
            <p className="text-pretty text-lg leading-relaxed text-foreground">
              A steady stream of recent reviews outperforms a one-time push for a pile of old ones. Local ranking rewards signals that stay current.
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
            Receptifi works with local service businesses across Riverside, San Bernardino, Moreno Valley, Ontario, Rancho Cucamonga, and Corona. Every engagement starts with a free audit of your current listings and profile, so you see exactly what&apos;s bottlenecking your map pack visibility before you spend anything.
          </p>
        </div>
      </section>

      {/* Coaching plan */}
      <section className="bg-section-alt py-24 sm:py-36">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
              How To Work With Us
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hands-on coaching, taught to you.
            </h2>
          </div>
          <div className="mx-auto max-w-md">
            <div className="glass-card flex flex-col rounded-[2rem] p-8 sm:p-10">
              <Users className="size-6 text-primary" />
              <h3 className="mt-4 font-serif text-2xl font-bold tracking-tight text-foreground">
                Coaching
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
                We&apos;ll show you how to fully build out your profile, get a steady stream of reviews without begging for them, and what to check weekly.
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
            See where you actually stand in the map pack.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Sign up and we&apos;ll show you the gap, in writing, before you spend a dollar.
          </p>
          <div className="mt-10 flex justify-center">
            <SubscribeForm source="audit_cta" buttonLabel="Sign Up" size="lg" />
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
