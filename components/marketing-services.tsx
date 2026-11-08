import { Search, MapPin, Megaphone, Share2, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SubscribeForm } from "@/components/subscribe-form"

/* ─── Services ───────────────────────────────────────────────── */
type Service = {
  Icon: LucideIcon
  tag: string
  title: string
  bullets: string[]
  highlight: string
  tips: string
  source: "seo_tips" | "local_seo_tips" | "google_tips" | "meta_tips" | "ai_seo_tips"
}

const services: Service[] = [
  {
    Icon: Search,
    tag: "General SEO",
    title: "We grow your organic rankings, not just your name",
    bullets: [
      "On-page fixes and content built around exactly what's missing",
      "One page per service, not a single page trying to rank for everything",
      "Backlinks from sites actually worth linking from",
      "Ranking tracked over time so you see real movement, not a one-time report",
    ],
    highlight: "Most small business sites rank for their own name and nothing else. We fix that.",
    tips: "Get free General SEO tips",
    source: "seo_tips",
  },
  {
    Icon: MapPin,
    tag: "Local SEO",
    title: "We win your map pack, not just your listing",
    bullets: [
      "Full Google Business Profile build-out, hours, categories, real job photos",
      "A steady stream of recent reviews, the single biggest ranking factor most businesses half-do",
      "Your name, address, and phone matched exactly across every directory",
      "Map pack ranking checked weekly so you know where you stand",
    ],
    highlight: "Over 90% of local searches never scroll past the map pack. We get you into it.",
    tips: "Get free Local SEO tips",
    source: "local_seo_tips",
  },
  {
    Icon: Megaphone,
    tag: "Google Ads",
    title: "We run ads that convert, not just click",
    bullets: [
      "Campaigns built around searches actually worth paying for",
      "Clicks sent to a landing page built for that search, not your homepage",
      "Call-only extensions so ready-to-buy searchers reach you by phone",
      "Budget managed weekly, not set once and forgotten",
    ],
    highlight: "Most local businesses waste half their ad budget on the wrong clicks. We stop that.",
    tips: "Get free Google Ads tips",
    source: "google_tips",
  },
  {
    Icon: Share2,
    tag: "Meta Ads",
    title: "We run ads that stop the scroll",
    bullets: [
      "Creative built around real job photos and before-and-afters",
      "Targeting that reaches the people actually likely to hire you",
      "Your page kept active daily so a click doesn't land on a dead profile",
      "Fresh creative rotated before it goes stale",
    ],
    highlight: "Facebook and Instagram ads live or die in the first half-second. We make them work.",
    tips: "Get free Meta Ads tips",
    source: "meta_tips",
  },
  {
    Icon: Sparkles,
    tag: "AI SEO",
    title: "We get you recommended by AI, not just Google",
    bullets: [
      "What ChatGPT, Gemini, and Perplexity currently say about you and your competitors",
      "Citations, reviews, and content signals built so you're the name in the answer",
      "Checked and optimized in every plan, no exceptions",
      "Tracked over time, not a one-time check",
    ],
    highlight: "A growing share of customers ask AI before they ever open Google. We make sure it names you.",
    tips: "Get free AI SEO tips",
    source: "ai_seo_tips",
  },
]

/* ─── Section ────────────────────────────────────────────────── */
export function MarketingServices() {
  return (
    <section className="bg-section-alt py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-6 block font-sans text-xs uppercase tracking-[0.18em] text-primary">
            What We Do
          </span>
          <h2 className="text-balance font-serif text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Five channels. We run whichever ones you need.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            General SEO, Local SEO, Google Ads, Meta Ads, AI SEO. One team running all five, not five separate vendors you have to manage yourself.
          </p>
        </div>

        {/* Service panels */}
        <div className="mx-auto mt-16 space-y-6">
          {services.map(({ Icon, tag, title, bullets, highlight, tips, source }) => (
            <article
              key={tag}
              className="glass-card rounded-[2rem] p-8 sm:p-12"
            >
              <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/5">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                      {tag}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {title}
                  </h3>
                </div>
                <div className="space-y-4">
                  <ul className="space-y-3">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
                    <p className="text-sm font-medium leading-relaxed text-foreground">
                      {highlight}
                    </p>
                  </div>
                  <div className="border-t border-border pt-5">
                    <SubscribeForm source={source} label={tips} buttonLabel="Send them" compact />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
