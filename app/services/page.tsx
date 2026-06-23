import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Phone, Globe, Star, LayoutDashboard } from "lucide-react"

export const metadata: Metadata = {
  title: "Services | Receptifi",
  description: "Live phone answering, website design, Google review automation, and lead tracking. Each available on its own or as a complete growth system.",
}

const services = [
  {
    icon: <Phone className="size-6 text-primary" />,
    tag: "Live Answering",
    title: "We answer every call so you never miss a customer",
    bullets: [
      "Real US-based receptionists, 24/7/365",
      "Your callers hear your business name, not a call center",
      "Every caller is qualified and booked before they hang up",
      "Bilingual support available",
      "Instant call summaries sent to you after every call",
    ],
    highlight: "80% of callers who reach voicemail will not call back. Every unanswered call is a lead you paid to attract and then gave away.",
  },
  {
    icon: <Globe className="size-6 text-primary" />,
    tag: "Website",
    title: "A website built to turn visitors into booked appointments",
    bullets: [
      "Custom-designed for your business, not a template",
      "Loads fast, looks sharp on phones and desktops",
      "Built around getting people to call or book online",
      "Includes tracking so you can see where leads come from",
      "We maintain and update it. You never touch a line of code",
    ],
    highlight: "The average small business website converts less than 3% of visitors. A site built around booking can double or triple that number.",
  },
  {
    icon: <Star className="size-6 text-primary" />,
    tag: "Reviews",
    title: "We automate your Google reviews so your reputation sells for you",
    bullets: [
      "Automated review requests sent after every completed job",
      "More 5-star Google reviews, without you lifting a finger",
      "Negative feedback caught privately before it goes public",
      "Your business climbs the local search rankings",
      "Monthly report showing your reputation growth",
    ],
    highlight: "93% of consumers say online reviews influence their buying decisions. The business with more reviews and a higher rating gets chosen first.",
  },
  {
    icon: <LayoutDashboard className="size-6 text-primary" />,
    tag: "Lead Tracking",
    title: "One dashboard that shows you every lead and every opportunity",
    bullets: [
      "Every call, form, and inquiry captured in one place",
      "See exactly where each lead came from",
      "Know which ones booked, which ones need follow-up",
      "Automated follow-up messages so no lead goes cold",
      "You always know what is happening in your pipeline",
    ],
    highlight: "Studies show it takes an average of 5 follow-up attempts to close a new customer. Most businesses follow up once, then move on. We automate every touchpoint.",
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 sm:pt-48 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-6 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
              What We Do
            </span>
            <h1 className="text-balance font-serif text-5xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Everything your business needs to grow.
            </h1>
            <p className="mt-7 text-pretty text-lg leading-relaxed text-muted-foreground">
              We handle the four things that grow local businesses: answering phones, building websites, collecting reviews, and tracking leads. You focus on doing the work. We handle everything else.
            </p>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-section-alt py-24 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="space-y-8">
            {services.map((svc) => (
              <article
                key={svc.tag}
                className="glass-card rounded-[2rem] p-8 sm:p-12"
              >
                <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/5">
                        {svc.icon}
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                        {svc.tag}
                      </span>
                    </div>
                    <h2 className="mt-5 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      {svc.title}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {svc.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
                      <p className="text-sm font-medium leading-relaxed text-foreground">
                        {svc.highlight}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Not sure which services you need?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Book a free call and we will tell you exactly what your business needs and what it will cost. No pitch, no pressure.
          </p>
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.03] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
          >
            Get a Free Recommendation
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
