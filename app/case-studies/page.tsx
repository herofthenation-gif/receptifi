import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Search, ScanLine, Sparkles, Hammer, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "How We Work | Receptifi",
  description: "No manufactured case studies here. This is the real audit process, one verified reference, and the terms that put the risk on us, not you.",
}

const steps = [
  {
    icon: Search,
    title: "We pull your real market",
    body: "Live data from Google, not guesses: every competitor in your category and city, their rating, their review count. You see exactly where you stand next to the businesses actually beating you for calls.",
  },
  {
    icon: ScanLine,
    title: "We audit what you have",
    body: "A real scan of your site and listings: is it secure, does it work on a phone, can someone book without calling, how stale is the footer. Specific findings, not a generic checklist.",
  },
  {
    icon: Sparkles,
    title: "We check what AI says about you",
    body: "We ask ChatGPT, Gemini, and Perplexity who they would recommend in your category and area. Most local businesses have never checked. Increasingly, that answer is where the call comes from.",
  },
  {
    icon: Hammer,
    title: "We fix it in priority order",
    body: "Phone coverage, site, reviews, and follow-up, built in the order that stops the bleeding fastest for your specific business, not a bundled package sold the same way to everyone.",
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
              How We Work
            </span>
            <h1 className="text-balance font-serif text-5xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              We don&rsquo;t have a shelf of case studies. Here is something more useful.
            </h1>
            <p className="mt-7 text-pretty text-lg leading-relaxed text-muted-foreground">
              Receptifi is a new practice. Instead of dressing that up, here is exactly what an audit looks like, one reference who will tell you the truth about working with us, and terms that put the risk on us, not you.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-section-alt py-24 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What actually happens in an audit
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              No industry benchmarks pulled from a template. Every step below runs against your real business, live, before we build anything.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="glass-card flex gap-5 rounded-[1.75rem] p-8"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/8">
                  <s.icon className="size-5 text-primary" />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-1 font-serif text-xl font-bold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reference + guarantee */}
      <section className="py-24 sm:py-36">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Reference */}
            <div className="glass-card rounded-[1.75rem] p-8 sm:p-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                A Real Reference
              </span>
              <p className="mt-4 text-lg leading-relaxed text-foreground">
                Built a fully functional CRM for Transamerica to keep client and lead data organized. Brenda Youngblood has agreed to speak with anyone considering working with us.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Ask for her contact on your call and we will connect you directly. We are not publishing her information here for anyone to find.
              </p>
            </div>

            {/* Guarantee */}
            <div className="glass-card rounded-[1.75rem] border-primary/25 bg-primary/5 p-8 sm:p-10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" />
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                  The Guarantee
                </span>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-foreground">
                We build first. You watch the system work, on your business, before you pay anything.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                This is how a new practice earns trust without a stack of results to point to: by making the risk ours instead of yours. If it does not do what we said, you owe nothing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 sm:pb-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Be the audit we can actually show people.
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
