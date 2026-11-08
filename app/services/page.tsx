import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { HoursNote } from "@/components/hours-note"
import { ArrowRight, Search, MapPin, Megaphone, Share2, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Coaching | Receptifi",
  description: "Hands-on coaching to run your own marketing: General SEO, Local SEO, Google Ads, Meta Ads, and AI SEO. $700/hour.",
}

const modules = [
  {
    icon: <Search className="size-6 text-primary" />,
    tag: "General SEO",
    title: "How to rank higher without hiring an agency full-time",
    bullets: [
      "What actually moves organic rankings versus what's a waste of time",
      "How to structure your site and content around what customers search, not what you want to say",
      "How to build backlinks that are worth having, not just more of them",
      "How to track ranking movement so you know it's working before you've spent a fortune",
    ],
    highlight: "Most small business sites rank for their own name and nothing else. We show you how to build for the searches that actually bring in customers.",
  },
  {
    icon: <MapPin className="size-6 text-primary" />,
    tag: "Local SEO",
    title: "How to win the map pack for searches near you",
    bullets: [
      "How to fully build out your Google Business Profile, not just the basics",
      "How to get a steady stream of reviews without begging for them",
      "Why mismatched listings across directories quietly hurt your ranking, and how to fix it",
      "What to check weekly so you know where you actually stand",
    ],
    highlight: "Over 90% of local searches never scroll past the map pack. We show you exactly what it takes to get into it.",
  },
  {
    icon: <Megaphone className="size-6 text-primary" />,
    tag: "Google Ads",
    title: "How to stop wasting ad spend on clicks that never call",
    bullets: [
      "How to set up campaigns that target the searches actually worth paying for",
      "Why sending clicks to your homepage is costing you money, and what to send them to instead",
      "How to set up call-only extensions and conversion tracking correctly",
      "What budget actually makes sense before you scale up",
    ],
    highlight: "Most local businesses waste half their Google Ads budget on the wrong clicks. We show you where it's leaking.",
  },
  {
    icon: <Share2 className="size-6 text-primary" />,
    tag: "Meta Ads",
    title: "How to build ads that actually stop the scroll",
    bullets: [
      "What creative actually performs versus what just looks nice",
      "How to set up targeting so you're not paying to reach the wrong people",
      "How to keep your page looking active so an ad click doesn't land on a dead profile",
      "What to test first so you're not guessing with your budget",
    ],
    highlight: "Facebook and Instagram ads live or die in the first half-second. We show you the changes that actually move performance.",
  },
  {
    icon: <Sparkles className="size-6 text-primary" />,
    tag: "AI SEO",
    title: "How to get recommended when someone asks ChatGPT instead of Google",
    bullets: [
      "How to check what ChatGPT, Gemini, and Perplexity already say about you and your competitors",
      "What signals these tools actually pull from, and why it overlaps with your local SEO",
      "How to publish content that gets cited instead of ignored",
      "How to track whether you're showing up over time, not just once",
    ],
    highlight: "A growing share of customers are asking AI before they ever open Google. We show you how to make sure it names you.",
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
              700<span className="text-2xl font-medium text-muted-foreground">/hour</span>
            </p>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Tell us what you're trying to build and we scope the session around that. Most builds run about{" "}
              <HoursNote note="Depending on skill level and experience with AI, coaching sessions can run for as little as 30 minutes. This is for those with experience — not every build takes 2 hours.">
                two hours
              </HoursNote>
              , roughly 1,400 total.
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
              The same five channels we'd run for you, except you run them.
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
