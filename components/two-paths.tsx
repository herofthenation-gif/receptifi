import { ArrowRight, Search, ScanLine, Sparkles, Hammer, GraduationCap } from "lucide-react"

const findSteps = [
  {
    icon: Search,
    title: "We pull your real market",
    body: "Live data from Google: every competitor in your category and city, their rating, their review count.",
  },
  {
    icon: ScanLine,
    title: "We audit what you have",
    body: "Phone coverage, site, reviews, booking flow, and your real Google ranking, not a guess. Specific findings, not a generic checklist.",
  },
  {
    icon: Sparkles,
    title: "We check what AI says about you",
    body: "We ask ChatGPT, Gemini, and Perplexity who they'd recommend in your category. Increasingly, that's where the call comes from.",
  },
]

export function TwoPaths() {
  return (
    <section className="py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-6 block font-sans text-xs uppercase tracking-[0.18em] text-primary">
            Two Ways To Work With Us
          </span>
          <h2 className="text-balance font-serif text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Same diagnosis. Two ways to act on it.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Every engagement starts the same way: as your AI consultants, we find exactly what&apos;s costing you customers, backed by real market and ranking data. What happens next is up to you.
          </p>
        </div>

        {/* Step 1: find the bottleneck */}
        <div className="mt-16">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
            Step 1 &middot; We Find Your Bottleneck
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {findSteps.map((s) => (
              <div key={s.title} className="glass-card flex items-start gap-4 rounded-2xl p-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/6">
                  <s.icon className="size-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-bold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: choose your path */}
        <div className="mt-20">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
            Step 2 &middot; You Choose How It Gets Fixed
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Receptifi Marketing */}
            <article className="glass-card flex flex-col rounded-[2rem] p-8 sm:p-10">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/6">
                <Hammer className="size-5 text-primary" />
              </div>
              <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                Receptifi Marketing
              </span>
              <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                We build and run your marketing.
              </h3>
              <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                Once we know exactly what&apos;s broken, our team builds and runs the system that fixes it: phone coverage, your website, reviews, lead tracking, SEO, whichever of these are actually costing you customers. Nothing generic, nothing you have to configure yourself. You keep running your business. We handle the leak, day to day, for as long as you work with us.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  Starts with the same free audit, no extra step
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  Built around your specific bottleneck, not a one-size bundle
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  We run it ongoing. You don&apos;t manage another tool
                </li>
              </ul>
              <a
                href="/platform"
                className="mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
              >
                See Receptifi Marketing
                <ArrowRight className="size-4" />
              </a>
            </article>

            {/* Receptifi AI Consultation */}
            <article className="glass-card flex flex-col rounded-[2rem] p-8 sm:p-10">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/6">
                <GraduationCap className="size-5 text-primary" />
              </div>
              <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                Receptifi AI Consultation
              </span>
              <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                We consult, you build.
              </h3>
              <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                Prefer to build it in-house? An AI consultant walks you or your team through exactly how, live, using the same findings from your audit, not generic advice. You leave each session knowing precisely what to build, why it matters, and how to build it yourselves. You own the system. We don&apos;t run it for you.
              </p>
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
                <p className="font-serif text-2xl font-bold text-foreground">
                  $700<span className="text-base font-medium text-muted-foreground">/hour</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tell us what you&apos;re building. Most sessions run about two hours.
                </p>
              </div>
              <a
                href="/services"
                className="mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-full border-2 border-primary/25 bg-transparent px-8 text-base font-semibold text-foreground transition-all duration-200 hover:scale-[1.02] hover:border-primary hover:bg-primary/5 active:scale-[0.98]"
              >
                See Receptifi AI Consultation
                <ArrowRight className="size-4" />
              </a>
            </article>
          </div>
        </div>

      </div>
    </section>
  )
}
