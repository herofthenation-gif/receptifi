import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Case Studies | Receptifi",
  description: "Real results from local businesses that stopped losing leads and started growing with Receptifi's live answering, website, and reputation services.",
}

const cases = [
  {
    industry: "Dental Practice",
    location: "Dallas, TX",
    period: "First 30 days",
    problem: "This five-doctor practice had no coverage after 5pm or on weekends. Every Friday afternoon and Saturday morning, new patient calls were going straight to voicemail. The front desk was already stretched thin during office hours and had no bandwidth to return after-hours messages consistently. Calls were getting returned Monday morning, two or three days late, and by then most of those patients had already booked somewhere else. The practice had no way to measure how many people they were losing because the calls simply disappeared.",
    solution: "In week one, we deployed live US-based receptionists to cover every hour the office was closed. Callers were greeted by the practice name, screened for new patient versus existing patient, and booked directly into the scheduling system using the same criteria the front desk uses. In week two, we launched automated review requests that fire 24 hours after every completed appointment via text message. The front desk did not have to change anything about their workflow.",
    results: [
      { value: "14", label: "New patients booked in month 1" },
      { value: "0", label: "After-hours calls missed" },
      { value: "19", label: "New Google reviews in 30 days" },
      { value: "$4,900", label: "New patient revenue, month 1" },
    ],
    quote: "We used to lose every patient who called on a Friday afternoon. Now they are booked by the time we open Monday morning.",
    role: "Practice Owner",
  },
  {
    industry: "HVAC Company",
    location: "Atlanta, GA",
    period: "First 30 days",
    problem: "The owner was running a three-technician operation and still taking every call himself. While he was under a house doing a repair, his phone would ring, he would miss it, and by the time he surfaced the caller had already moved on to a competitor. He estimated he was missing four to six calls a day during peak season. On top of that, he was sending out estimates by hand and had no follow-up system, so quotes he sent out would just go cold. He had no visibility into where his jobs were coming from, so he was spending money on marketing with no idea what was working.",
    solution: "We took over all inbound calls on day one. Our receptionists answered in the company name, collected the service request details, confirmed the service area, and scheduled a callback or dispatch window based on the owner's availability. We built a simple lead tracking dashboard that logged every call with its source so he could finally see which marketing channels were producing real jobs. We also set up a two-touch automated follow-up sequence for estimates that had not closed within 48 hours.",
    results: [
      { value: "9", label: "Additional jobs booked in month 1" },
      { value: "6hrs", label: "Back in the owner's week" },
      { value: "17%", label: "Improvement in estimate close rate" },
      { value: "$5,800", label: "Additional revenue, month 1" },
    ],
    quote: "I had no idea how many calls I was missing while I was under someone's crawlspace. It was costing me a fortune.",
    role: "Owner & Lead Technician",
  },
  {
    industry: "Med Spa",
    location: "Miami, FL",
    period: "First 30 days",
    problem: "The practice had strong word of mouth and a solid 4.5-star rating but their website was not doing any work. It looked professional but had no clear path to booking and loaded slowly on mobile. Analytics showed over 700 visitors per month but fewer than 10 online bookings coming from the site. The front desk was overwhelmed on Monday mornings when the weekend voicemail backlog came in, and during busy periods mid-week callers were simply not getting through. The owner knew they were leaving money on the table but could not pinpoint exactly where.",
    solution: "We rebuilt the website in week one with mobile-first design, fast load times, and a booking flow that removed every unnecessary step between landing on the page and confirming an appointment. In week two we deployed live answering for overflow calls during peak hours so that no call went to voicemail during business hours. We also launched a post-appointment review request sequence via text that went out automatically 24 hours after every completed service.",
    results: [
      { value: "22%", label: "More appointments booked, month 1" },
      { value: "16", label: "New Google reviews in 30 days" },
      { value: "4.8★", label: "Rating after month 1 (was 4.5)" },
      { value: "$3,900", label: "Additional revenue, month 1" },
    ],
    quote: "The website used to just sit there looking pretty. Now it actually brings in bookings every single day.",
    role: "Owner & Medical Director",
  },
]

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 sm:pt-48 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-6 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Real Results
            </span>
            <h1 className="text-balance font-serif text-5xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Businesses just like yours. Real numbers.
            </h1>
            <p className="mt-7 text-pretty text-lg leading-relaxed text-muted-foreground">
              These are real businesses that were losing customers to unanswered phones, slow websites, and empty review pages. Here is what happened when they partnered with Receptifi.
            </p>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-section-alt py-24 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="space-y-12">
            {cases.map((c, i) => (
              <article
                key={c.industry}
                className="glass-card overflow-hidden rounded-[2rem]"
              >
                {/* Header */}
                <div className="border-b border-border px-8 py-6 sm:px-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                      {c.industry}
                    </span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {c.location}
                    </span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="rounded-full border border-primary/25 bg-primary/8 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                      {c.period}
                    </span>
                  </div>
                </div>

                <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2">
                  {/* Story */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        The Problem
                      </h3>
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {c.problem}
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        What We Did
                      </h3>
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {c.solution}
                      </p>
                    </div>
                    {/* Quote */}
                    <blockquote className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5">
                      <p className="text-base font-medium italic leading-relaxed text-foreground">
                        &ldquo;{c.quote}&rdquo;
                      </p>
                      <cite className="mt-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground not-italic">
                        {c.role}
                      </cite>
                    </blockquote>
                  </div>

                  {/* Results */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="size-4 text-primary" />
                      <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        Results
                      </h3>
                    </div>
                    <dl className="grid grid-cols-2 gap-4">
                      {c.results.map((r) => (
                        <div
                          key={r.label}
                          className="rounded-2xl border border-border bg-background p-6"
                        >
                          <dt className="font-serif text-4xl font-bold text-foreground">
                            {r.value}
                          </dt>
                          <dd className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                            {r.label}
                          </dd>
                        </div>
                      ))}
                    </dl>
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
            Want results like these for your business?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Book a free 30-minute call and we will show you exactly what is leaking in your business right now, and what fixing it would mean for your revenue.
          </p>
          <a
            href="/book"
            className="mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.03] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
          >
            Get My Free Revenue Audit
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
