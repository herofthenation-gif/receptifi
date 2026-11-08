import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, TrendingUp, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Systems | Receptifi",
  description: "Done-for-you marketing for local service businesses. We find which channel, General SEO, Local SEO, Google Ads, Meta Ads, or AI SEO, is actually costing you customers, then run it.",
}

const SERVICE_SLUGS: Record<string, string> = {
  "General SEO": "/general-seo",
  "Local SEO": "/local-seo",
  "Google Ads": "/google-ads",
  "Meta Ads": "/meta-ads",
  "AI SEO": "/ai-seo",
}

const layers = [
  {
    number: "01",
    tag: "General SEO",
    title: "We Grow Your Organic Rankings",
    body: "We build the on-page structure, content, and site authority Google rewards for the searches that actually bring in customers, not just your business name. Site fixes, content built around what you're missing, and ranking tracked over time so you see real movement, not a one-time checklist.",
    stat: { value: "Tracked Weekly", label: "Real Ranking Movement, Not a Checklist" },
  },
  {
    number: "02",
    tag: "Local SEO",
    title: "We Win Your Map Pack",
    body: "Your Google Business Profile is the first thing a nearby customer sees before they ever reach your website. We fully build it out, hours, categories, photos, and a steady stream of reviews, so you show up in the map pack instead of buried under competitors who only half-did theirs.",
    stat: { value: "Map Pack", label: "Where Local Searches Actually Convert" },
  },
  {
    number: "03",
    tag: "Google Ads",
    title: "We Run Your Google Ads",
    body: "We build and manage paid search campaigns that send clicks to a landing page built for that exact search, not your homepage, with call-only extensions so the people ready to buy can reach you by phone immediately. No budget wasted on clicks that were never going to convert.",
    stat: { value: "Pay Per Click", label: "Budget Managed, Not Just Spent" },
  },
  {
    number: "04",
    tag: "Meta Ads",
    title: "We Run Your Meta Ads",
    body: "Facebook and Instagram ads built around real job photos and before-and-afters, put in front of people who aren't even searching for you yet, so they already know your name before they need you. We keep the page active and the creative rotating so the spend never goes stale.",
    stat: { value: "Always Fresh", label: "Creative Rotated, Never Set and Forgotten" },
  },
  {
    number: "05",
    tag: "AI SEO",
    title: "We Get You Recommended By AI",
    body: "ChatGPT, Gemini, and Perplexity are already answering who to call for a growing share of your customers, so this one is not optional, it is built into every plan. We check what they currently say about you and your competitors, then build the citations, reviews, and content signals that get your business named in the answer.",
    stat: { value: "Included", label: "In Every Plan, No Exceptions" },
  },
]

const combos = [
  {
    icon: <TrendingUp className="size-6 text-primary" />,
    tag: "Growth",
    title: "Google Ads + Local SEO",
    subtitle: "The fastest way to get calls now while building calls for free later",
    body: "Google Ads puts you in front of customers today, while your organic rankings are still climbing. Local SEO is what keeps those calls coming after the ad budget gets turned down. Most businesses only run one. Running both at the same time means you're never standing still waiting on the other to kick in.",
    services: ["We Run Your Google Ads", "We Win Your Map Pack"],
    outcome: "Calls now from ads, and calls for free once your map pack ranking catches up.",
  },
  {
    icon: <Sparkles className="size-6 text-primary" />,
    tag: "Future-Proofing",
    title: "General SEO + AI SEO",
    subtitle: "The best way to get found everywhere customers are actually asking",
    body: "The same signals, content, site authority, and reviews, decide both your Google ranking and whether AI tools recommend you by name. Building them together means one effort pays off in two different places customers are already searching, the search bar and the chat box.",
    services: ["We Grow Your Organic Rankings", "We Get You Recommended By AI"],
    outcome: "Found on Google search and named by AI, from the same underlying work.",
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
              We find the channel. We run the fix.
            </h1>
            <p className="mt-7 text-pretty text-lg leading-relaxed text-muted-foreground">
              As your AI consulting partner, every Systems engagement starts with a free audit. We tell you which of these five channels, General SEO, Local SEO, Google Ads, Meta Ads, AI SEO, is actually worth your money right now, then run it, one engagement, not five separate contracts. AI SEO is never optional and includes real tracking of what AI tools say about you, not just checklist items, since every business wants proof it&apos;s actually working.
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
                We find your channel
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                A real audit of your current rankings, ads, and listings, plus your live market and what AI search says about you. Free, and you get the findings either way.
              </p>
            </div>
            <div className="glass-card rounded-[1.75rem] p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                Step 2
              </span>
              <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground">
                We run the fix
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Whichever of the five channels below are actually worth the spend get built into one plan, and we run it. Not a one-time delivery you're left to maintain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <div className="glass-card rounded-[2rem] p-8 text-center sm:p-10">
            <p className="font-serif text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              3,000<span className="text-2xl font-medium text-muted-foreground">/month</span>
            </p>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Covers whichever of the five channels your free audit shows are actually worth running, managed as one plan.
            </p>
            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-13 items-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
            >
              Book a Free Audit
              <ArrowRight className="size-4" />
            </a>
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
                Five channels. Most businesses are only running one.
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              The audit checks all five for your specific business, and AI SEO is always one of them. We run whichever ones are actually worth your budget, built into one plan, not sold as separate add-ons.
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
                    {SERVICE_SLUGS[layer.tag] && (
                      <a
                        href={SERVICE_SLUGS[layer.tag]}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                      >
                        More on {layer.tag}
                        <ArrowRight className="size-4" />
                      </a>
                    )}
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
