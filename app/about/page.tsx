import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About Receptifi, Marketing for Local Service Businesses in the Inland Empire",
  description:
    "Receptifi was started because the Inland Empire doesn't have enough real marketing help for local service businesses. Who's behind it, and why it exists.",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  mainEntity: {
    "@type": "Person",
    name: "Karmello Robinson",
    jobTitle: "Founder, Receptifi",
    worksFor: {
      "@type": "Organization",
      name: "Receptifi",
      url: "https://www.receptifi.net",
    },
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="pt-36 sm:pt-48 pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
            About
          </span>
          <h1 className="text-balance font-serif text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl">
            Built because the Inland Empire doesn&apos;t have enough real marketing help.
          </h1>
        </div>
      </section>

      {/* Why it exists */}
      <section className="bg-section-alt py-24 sm:py-36">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
            Why Receptifi Exists
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            There&apos;s a gap in the Inland Empire, so I built something to close it.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Local service businesses across Riverside, San Bernardino, Moreno Valley, Ontario, Rancho Cucamonga, and Corona have never had a real marketing option built for them specifically. Receptifi started because that gap was obvious and nobody was closing it properly, not with generic packages built for anywhere, built for a business here.
          </p>
        </div>
      </section>

      {/* Who's behind it */}
      <section className="py-24 sm:py-36">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
            Who&apos;s Behind It
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Karmello Robinson, founder.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Receptifi is run solo. That means every audit, every campaign, and every plan comes from one person staying current across all five channels, General SEO, Local SEO, Google Ads, Meta Ads, and AI SEO, not handed off to a junior account manager reading from a template. No layers between you and the person actually doing the work.
          </p>
        </div>
      </section>

      {/* What it does, for whom */}
      <section className="bg-section-alt py-24 sm:py-36">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
            What Receptifi Does
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            For local service businesses, specifically.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Every engagement starts with a free audit across five channels, General SEO, Local SEO, Google Ads, Meta Ads, and AI SEO, and only the ones actually worth running get built into a plan. Two ways to work together: Systems, done-for-you at $3,000/month, or Coaching, hands-on at $1,500/month, for owners who want to run it themselves with guidance. This is built for local service businesses specifically, HVAC, plumbing, electrical, and similar trades in the Inland Empire, not a generic small-business package.
          </p>
          <div className="mt-10 flex justify-center">
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

      <SiteFooter />
    </main>
  )
}
