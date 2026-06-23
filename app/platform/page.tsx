import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, TrendingUp, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "The Platform | Receptifi",
  description: "Four integrated services: live answering, website, reviews, and lead tracking. One connected revenue operations system for local businesses.",
}

const layers = [
  {
    number: "01",
    tag: "Answer",
    title: "We Answer Your Phones",
    body: "Real US-based receptionists answer every call, 24 hours a day, 7 days a week. They greet your callers by your business name, qualify the lead, and book the appointment before it ever reaches voicemail. You stop losing customers to a phone that just rings.",
    stat: { value: "99.9%", label: "Live Answer Rate" },
  },
  {
    number: "02",
    tag: "Attract",
    title: "We Build Your Website",
    body: "We design and build a fast, professional website that works hard to turn visitors into booked appointments. Not a template. A high-performance digital storefront built specifically around your business and your customers.",
    stat: { value: "3×", label: "More Leads from the Same Traffic" },
  },
  {
    number: "03",
    tag: "Trust",
    title: "We Grow Your Reviews",
    body: "Google reviews are the first thing new customers see. We automate the entire review process so that happy customers leave reviews automatically, and your business rises above the competition in search results.",
    stat: { value: "5×", label: "Review Volume in 90 Days" },
  },
  {
    number: "04",
    tag: "Retain",
    title: "We Track Every Lead",
    body: "Every call, form, and inquiry lands in one clean dashboard. You can see every lead, where they came from, what they need, and whether they booked. Nothing falls through the cracks. Every opportunity is accounted for.",
    stat: { value: "0", label: "Leads Lost to the Cracks" },
  },
]

const combos = [
  {
    icon: <TrendingUp className="size-6 text-primary" />,
    tag: "Growth",
    title: "Website + Reviews",
    subtitle: "The best way to attract more customers",
    body: "Your website brings people in. Your reviews make them trust you enough to call. Together they create a self-reinforcing loop: better rankings bring more visitors, more visitors become more reviews, more reviews bring even better rankings. Most businesses are only doing one of these. Doing both at the same time is what creates real momentum.",
    services: ["We Build Your Website", "We Grow Your Reviews"],
    outcome: "More new customers finding you and choosing you over the competition.",
  },
  {
    icon: <Shield className="size-6 text-primary" />,
    tag: "Retention",
    title: "Live Answering + Lead Tracking",
    subtitle: "The best way to keep every customer you earn",
    body: "Answering the phone gets the lead in. Tracking that lead makes sure it closes. Together these two services make sure no one falls through the cracks. Every caller is captured, qualified, and followed up with until they become a paying customer. You stop losing people you already paid to attract.",
    services: ["We Answer Your Phones", "We Track Every Lead"],
    outcome: "Every lead that enters your business gets followed up with until it closes.",
  },
]

export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 sm:pt-48 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-6 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
              The Platform
            </span>
            <h1 className="text-balance font-serif text-5xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Four tools. One system. Zero leaks.
            </h1>
            <p className="mt-7 text-pretty text-lg leading-relaxed text-muted-foreground">
              Each service works on its own. Together, they seal every leak in your revenue pipeline. Start with one or deploy the full system. Either way, you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Individual services */}
      <section className="bg-section-alt py-24 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 flex items-start justify-between gap-6 flex-wrap">
            <div>
              <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
                Individual Services
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Each one available on its own.
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              You do not have to buy the whole system. Start with the service that fixes your biggest problem today and add more when you are ready.
            </p>
          </div>

          <div className="space-y-6">
            {layers.map((layer) => (
              <article
                key={layer.number}
                className="glass-card grid items-center gap-10 rounded-[2rem] p-8 sm:p-12 lg:grid-cols-[1fr_280px]"
              >
                <div className="flex gap-8">
                  <span className="hidden font-mono text-5xl font-bold text-foreground/10 sm:block">
                    {layer.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                        {layer.tag}
                      </span>
                      <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        Available standalone
                      </span>
                    </div>
                    <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      {layer.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {layer.body}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
                  <p className="font-serif text-5xl font-bold text-primary">
                    {layer.stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {layer.stat.label}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Better together */}
      <section className="py-24 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Better Together
            </span>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Some services are stronger as a pair.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              Certain combinations create compounding results that neither service achieves alone. Here are the two pairings that matter most.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {combos.map((combo) => (
              <article
                key={combo.tag}
                className="glass-card flex flex-col rounded-[2rem] p-8 sm:p-12"
              >
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5">
                    {combo.icon}
                  </div>
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                      {combo.tag} Stack
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {combo.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                      {combo.subtitle}
                    </p>
                  </div>
                </div>

                {/* Services included */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {combo.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Body */}
                <p className="mt-7 text-base leading-relaxed text-muted-foreground">
                  {combo.body}
                </p>

                {/* Outcome */}
                <div className="mt-8 rounded-2xl border border-foreground/10 bg-muted/40 px-6 py-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-2">
                    The outcome
                  </p>
                  <p className="text-base font-semibold leading-snug text-foreground">
                    {combo.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-section-alt py-24 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Book a free call and we will tell you exactly which service or combination fits your business right now.
          </p>
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.03] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
          >
            Book a Free Strategy Call
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
