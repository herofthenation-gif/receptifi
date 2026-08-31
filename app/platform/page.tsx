import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, TrendingUp, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Systems | Receptifi",
  description: "Done-for-you systems for local service businesses. We find what's costing you customers, phone coverage, website, reviews, lead follow-up, SEO, then build and run the fix.",
}

const layers = [
  {
    number: "01",
    tag: "Answer",
    title: "We Answer Your Phones",
    body: "Real US-based receptionists answer every call, 24 hours a day, 7 days a week. They greet your callers by your business name, qualify the lead, and book the appointment before it ever reaches voicemail. You stop losing customers to a phone that just rings.",
    stat: { value: "24/7", label: "Coverage, No Voicemail" },
  },
  {
    number: "02",
    tag: "Attract",
    title: "We Build Your Website",
    body: "We design and build a fast, professional website that works hard to turn visitors into booked appointments. Not a template. A high-performance digital storefront built specifically around your business and your customers.",
    stat: { value: "Built to Book", label: "Not Just to Look Good" },
  },
  {
    number: "03",
    tag: "Trust",
    title: "We Grow Your Reviews",
    body: "Google reviews are the first thing new customers see. We automate the entire review process so that happy customers leave reviews automatically, and your business rises above the competition in search results.",
    stat: { value: "Automatic", label: "Review Requests, Every Job" },
  },
  {
    number: "04",
    tag: "Retain",
    title: "We Track Every Lead",
    body: "Every call, form, and inquiry lands in one clean dashboard. You can see every lead, where they came from, what they need, and whether they booked. Nothing falls through the cracks. Every opportunity is accounted for.",
    stat: { value: "One Place", label: "Every Lead, Tracked" },
  },
  {
    number: "05",
    tag: "Rank",
    title: "We Grow Your SEO",
    body: "Every business wants to rank higher on Google, so this one is not optional, it is built into every plan. We clean up your listings, your site's local signals, and the on-page basics that decide whether you show up when someone nearby searches for what you do, and we track your real ranking over time so you see the movement, not just take our word for it.",
    stat: { value: "Included", label: "In Every Plan, No Exceptions" },
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
              Done-For-You
            </span>
            <h1 className="text-balance font-serif text-5xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              We find the bottleneck. We build the fix.
            </h1>
            <p className="mt-7 text-pretty text-lg leading-relaxed text-muted-foreground">
              As your AI consulting partner, every Systems engagement starts with a free audit. We tell you which of these five are actually costing you customers, then build and run the fix, one engagement, not five separate contracts. SEO is never optional and includes real Google ranking tracking, not just checklist items, since every business wants proof it&apos;s actually working.
            </p>
          </div>
        </div>
      </section>

      {/* How it works, 2-step */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="glass-card rounded-[1.75rem] p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                Step 1
              </span>
              <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground">
                We find your bottleneck
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                A real audit of your calls, site, reviews, booking flow, and SEO, plus your live market and what AI search says about you. Free, and you get the findings either way.
              </p>
            </div>
            <div className="glass-card rounded-[1.75rem] p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                Step 2
              </span>
              <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground">
                We build and run the fix
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Whichever of the five areas below are actually leaking customers get built into one system, and we run it. Not a one-time delivery you're left to maintain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Individual services */}
      <section className="bg-section-alt py-24 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 flex items-start justify-between gap-6 flex-wrap">
            <div>
              <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
                What We Check
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Five places revenue leaks without you noticing.
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              The audit checks all five for your specific business, and SEO is always one of them. We fix whichever ones are actually losing you customers, built into one plan, not sold as separate add-ons.
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
                        Checked in every audit
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
                      {combo.tag} Pairing
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
            Not sure what&rsquo;s actually broken?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Book a free audit and we will tell you exactly what&rsquo;s costing you customers, and what fixing it would mean for your revenue.
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
            <a
              href="/services"
              className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Or see the do-it-yourself coaching path
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
