import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { SubscribeForm } from "@/components/subscribe-form"
import { ArrowRight, Sparkles, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "AI SEO for Local Service Businesses in the Inland Empire | Receptifi",
  description:
    "AI SEO means getting named when someone asks ChatGPT, Perplexity, Gemini, or Google AI Mode who to call. Receptifi helps Inland Empire service businesses show up in AI answers, not just Google.",
}

const faqs = [
  {
    q: "Does AI SEO replace regular SEO?",
    a: "No. The same underlying signals, your Google Business Profile, reviews, site content, and citations, decide both your Google ranking and whether AI tools name you. They're not separate jobs, they're the same work read by two different audiences: the search bar and the chat box.",
  },
  {
    q: "How long until my business shows up in ChatGPT or Perplexity?",
    a: "There's no fixed timeline, and anyone who promises one isn't being straight with you. It depends on your starting point, your competition, and how much of your online information is already accurate. We take a dated baseline first so you can see real movement, not guess at it.",
  },
  {
    q: "Can you guarantee I'll be recommended by AI tools?",
    a: "No. Nobody can guarantee a specific AI assistant names a specific business on a specific question, the same way no one can guarantee a #1 Google ranking. What we can do is fix the signals that make it more likely and track whether it's working.",
  },
  {
    q: "Is AI SEO covered in Coaching?",
    a: "Yes. It's one of the five channels checked in every free audit, no exceptions, because it's no longer optional for a local service business, and we teach you how to build it yourself.",
  },
  {
    q: "What if I just want to learn to do this myself?",
    a: "That's what Coaching is for. We'll show you exactly what ChatGPT, Gemini, and Perplexity already say about you and your competitors, and how to fix it yourself.",
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

export default function AiSeoPage() {
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
            <Sparkles className="size-3.5" />
            AI SEO
          </span>
          <h1 className="text-balance font-serif text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
            Get recommended when someone asks ChatGPT instead of Google.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            AI SEO means making sure ChatGPT, Google AI Mode, Perplexity, Gemini, Claude, and Grok name your business when someone asks who to call, not just Google search. It&apos;s built from the same signals as local SEO, your Google Business Profile, reviews, and clear website content, read by a different audience.
          </p>
          <div className="mt-10 flex justify-center">
            <SubscribeForm source="audit_cta" buttonLabel="Sign Up" size="lg" />
          </div>
        </div>
      </section>

      {/* What it actually means */}
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
              AI assistants pull from the same public information Google does: your Google Business Profile, your reviews (mostly Google, some from a handful of other sites), your website content, and what other sites say about you.
            </p>
            <p className="text-pretty text-lg leading-relaxed text-foreground">
              There&apos;s no way to pay for a mention and no submission form that guarantees one. The businesses that get named are the ones whose information is accurate, consistent, and specific everywhere it appears.
            </p>
            <p className="text-pretty text-lg leading-relaxed text-foreground">
              A growing share of customers now ask an AI assistant who to call before they ever open Google. If your information isn&apos;t clear and consistent, that answer goes to a competitor instead, even one with a worse business than yours.
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
            Receptifi works with local service businesses across Riverside, San Bernardino, Moreno Valley, Ontario, Rancho Cucamonga, and Corona. We start every engagement with a dated baseline: what ChatGPT, Perplexity, Gemini, and the others currently say about your business and your competitors when a real customer asks, so you can see the gap before we fix it and measure the movement after.
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
                We&apos;ll show you exactly what ChatGPT, Gemini, and Perplexity already say about you and your competitors, and how to publish content that gets cited instead of ignored.
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
            See what AI tools already say about you.
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
