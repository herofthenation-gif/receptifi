import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Phone, Globe, Star, LayoutDashboard, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Coaching | Receptifi",
  description: "Hands-on coaching to build your own AI-powered growth systems: phone coverage, website, reviews, lead tracking, and SEO. $700/hour.",
}

const modules = [
  {
    icon: <Phone className="size-6 text-primary" />,
    tag: "Phone Coverage",
    title: "How to stop losing jobs to voicemail",
    bullets: [
      "What live-answering and AI-answering options actually exist, and what they cost",
      "How to route after-hours and overflow calls without hiring a receptionist",
      "How to qualify and book a caller before you ever pick up the phone",
      "What to look for so you don't get locked into an enterprise contract",
    ],
    highlight: "80% of callers who reach voicemail will not call back. We show you how to close that gap yourself, with tools sized for your business.",
  },
  {
    icon: <Globe className="size-6 text-primary" />,
    tag: "Website",
    title: "How to build a site that actually books appointments",
    bullets: [
      "What makes a site convert versus just look good",
      "The handful of pages and CTAs that do most of the work",
      "How to set up tracking so you know where leads actually come from",
      "What to build yourself versus when it's worth paying someone",
    ],
    highlight: "The average small business website converts less than 3% of visitors. We walk you through what a booking-focused rebuild actually requires.",
  },
  {
    icon: <Star className="size-6 text-primary" />,
    tag: "Reviews",
    title: "How to automate review requests without chasing customers",
    bullets: [
      "The right moment to ask for a review, and why timing matters more than wording",
      "How to automate the ask so you're not manually texting every customer",
      "How to catch negative feedback privately before it goes public",
      "What tools do this without a $300/month reputation-management contract",
    ],
    highlight: "93% of consumers say online reviews influence their buying decisions. We show you the system, not just the advice.",
  },
  {
    icon: <LayoutDashboard className="size-6 text-primary" />,
    tag: "Lead Tracking",
    title: "How to build a simple system so no lead goes cold",
    bullets: [
      "How to capture every call, form, and inquiry in one place without expensive CRM software",
      "How to set up automatic follow-up so you're not relying on memory",
      "What to track so you actually know where your leads come from",
      "How to build this with tools you likely already have access to",
    ],
    highlight: "It takes an average of 5 follow-up attempts to close a new customer. Most businesses follow up once. We show you how to automate the rest.",
  },
  {
    icon: <Search className="size-6 text-primary" />,
    tag: "SEO",
    title: "How to rank higher on Google without paying an agency monthly",
    bullets: [
      "How to fully optimize your Google Business Profile yourself",
      "The on-page basics that actually move local rankings",
      "How to fix inconsistent business info across the listings that matter",
      "What's worth doing yourself versus what's worth paying for",
    ],
    highlight: "Every business owner wants to rank higher on Google. Most are paying $500 to $1,000+/month for basics they could learn to do themselves.",
  },
]

export default function CoachingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 sm:pt-48 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-6 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Do-It-Yourself
            </span>
            <h1 className="text-balance font-serif text-5xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Learn to build it yourself.
            </h1>
            <p className="mt-7 text-pretty text-lg leading-relaxed text-muted-foreground">
              Not every owner wants done-for-you. Some want an AI consultant in the room while they build their own marketing and ranking systems, with their own team, on their own timeline. That's what coaching is for.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <div className="glass-card rounded-[2rem] p-8 text-center sm:p-10">
            <p className="font-serif text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              $700<span className="text-2xl font-medium text-muted-foreground">/hour</span>
            </p>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Tell us what you're trying to build and we scope the session around that. Most builds run about two hours, roughly $1,400 total.
            </p>
            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-13 items-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
            >
              Book a Coaching Call
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* What we teach */}
      <section className="bg-section-alt py-24 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-primary">
              What We Teach
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The same five things we'd build for you, except you build them.
            </h2>
          </div>

          <div className="space-y-8">
            {modules.map((mod) => (
              <article
                key={mod.tag}
                className="glass-card rounded-[2rem] p-8 sm:p-12"
              >
                <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/5">
                        {mod.icon}
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                        {mod.tag}
                      </span>
                    </div>
                    <h2 className="mt-5 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      {mod.title}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {mod.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
                      <p className="text-sm font-medium leading-relaxed text-foreground">
                        {mod.highlight}
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
            Would rather we just build it?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            That's the other path. Same diagnosis, we build and run the fix for you instead.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.03] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
            >
              Book a Coaching Call
              <ArrowRight className="size-4" />
            </a>
            <a
              href="/platform"
              className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Or see the done-for-you Systems path
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
