import { Search, Megaphone, Share2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SubscribeForm } from "@/components/subscribe-form"

/* ─── Services ───────────────────────────────────────────────── */
type Service = {
  Icon: LucideIcon
  name: string
  detail: string
  tips: string
  source: "seo_tips" | "google_tips" | "meta_tips"
}

const services: Service[] = [
  {
    Icon: Search,
    name: "Search Rankings (SEO)",
    detail:
      "We track exactly where you rank against the top result in your city for the searches that actually bring in customers, then close the gap: site fixes, content built around what's missing, and a review-generation push, the single biggest ranking factor almost every local business ignores completely. Every day you're not on page one, your competitor is banking the calls that should've been yours.",
    tips: "Get free SEO tips",
    source: "seo_tips",
  },
  {
    Icon: Megaphone,
    name: "Google Ads & Business Profile",
    detail:
      "We run paid search and manage your Google Business Profile so you're locked into the map pack and the ads above it, not buried under ten competitors on an organic listing nobody scrolls to. Over 90% of local searches never make it past the first screen. If you're not there, you don't exist to them.",
    tips: "Get free Google Ads tips",
    source: "google_tips",
  },
  {
    Icon: Share2,
    name: "Meta Ads & Social",
    detail:
      "We run Facebook and Instagram ads and keep your page active every day, so the people who aren't even searching for you yet already know your name before they need you, and call you first, not the competitor who's actually spending on marketing.",
    tips: "Get free Meta Ads tips",
    source: "meta_tips",
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
            Receptifi Marketing Services
          </span>
          <h2 className="text-balance font-serif text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Most local businesses aren&rsquo;t losing to a better competitor.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            A call that goes to voicemail is a customer choosing someone else. A site buried on page five might as well not exist, nobody scrolls that far. The businesses with the strongest digital presence are the ones winning.
          </p>
        </div>

        {/* Service panels */}
        <div className="mx-auto mt-16 max-w-3xl space-y-5">
          {services.map(({ Icon, name, detail, tips, source }) => (
            <div
              key={name}
              className="glass-card flex flex-col gap-6 rounded-2xl p-8 sm:flex-row sm:items-start sm:p-10"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/6">
                <Icon className="size-5.5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {name}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {detail}
                </p>
                <div className="mt-6 border-t border-border pt-5">
                  <SubscribeForm source={source} label={tips} buttonLabel="Send them" compact />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note: hard close, no hedging */}
        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted-foreground">
          Run all three together and you don&rsquo;t just compete, you dominate the search results in your market. Receptifi guarantees top 3 on Google in 90 days.{" "}
          <a href="/book" className="font-semibold text-primary underline underline-offset-2 hover:no-underline">
            Book your free audit now
          </a>{" "}
          before your competitor does.
        </p>

      </div>
    </section>
  )
}
