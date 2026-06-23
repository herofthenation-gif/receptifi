/* ─────────────────────────────────────────────────────────────
   Replace the `reviews` array with your real Google reviews.
   Copy name, rating, date, and text from your Google Business
   Profile. The googleProfileUrl should point to your listing.
   ───────────────────────────────────────────────────────────── */

const googleProfileUrl = "https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"

const overallRating = 5.0
const totalReviews  = 47

const reviews = [
  {
    name: "Dr. Marcus Williams",
    handle: "Bright Smile Dental",
    avatar: "M",
    rating: 5,
    date: "2 weeks ago",
    text: "We were missing over 30% of our after-hours calls before Receptifi. Within the first month, we booked 14 new patients that came in after hours. The setup was seamless and the AI sounds completely natural.",
  },
  {
    name: "Lisa Ramirez",
    handle: "Elite Med Spa",
    avatar: "L",
    rating: 5,
    date: "1 month ago",
    text: "Our Google rating went from 4.2 to 4.8 in 6 weeks. The automated review requests after every appointment are genuinely game-changing. I did not realize how much revenue we were leaving on the table.",
  },
  {
    name: "James Kowalski",
    handle: "Summit HVAC",
    avatar: "J",
    rating: 5,
    date: "3 weeks ago",
    text: "Emergency calls used to go to voicemail when my techs were on jobs. Now every call is answered and customers are scheduled before they can Google a competitor. Worth every dollar.",
  },
  {
    name: "Angela Torres",
    handle: "Torres Law Group",
    avatar: "A",
    rating: 5,
    date: "5 weeks ago",
    text: "The intake process alone saves us 3 to 4 hours a week. Potential clients get qualified and logged before we ever touch the file. Receptifi pays for itself within the first week of new clients.",
  },
  {
    name: "Derek Okafor",
    handle: "Peak Plumbing Co.",
    avatar: "D",
    rating: 5,
    date: "2 months ago",
    text: "I was skeptical about an AI answering my phones but our customers cannot tell the difference. Answer rate went to 99.9% and we have not missed a lead in over 60 days. Genuinely remarkable product.",
  },
  {
    name: "Sarah Chen",
    handle: "Restore Chiropractic",
    avatar: "S",
    rating: 5,
    date: "6 weeks ago",
    text: "The bilingual option was the deciding factor for us. A huge portion of our patients speak Spanish and now every call gets answered in their language. Rebooking rates are up significantly.",
  },
]

/* ─── Google G logo (official colours) ──────────────────────── */
function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

/* ─── Star row ───────────────────────────────────────────────── */
function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < rating ? "#F59E0B" : "#E5E7EB"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

/* ─── Section ────────────────────────────────────────────────── */
export function GoogleReviews() {
  return (
    <section className="bg-section-alt py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-6 block font-sans text-xs uppercase tracking-[0.18em] text-primary">
            Client Reviews
          </span>
          <h2 className="text-balance font-serif text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            What our clients say.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Service businesses across the country are recovering missed revenue and growing their reputation with Receptifi.
          </p>
        </div>

        {/* Overall rating badge */}
        <div className="mx-auto mt-12 flex w-fit items-center gap-5 rounded-2xl border border-border bg-background px-7 py-5 shadow-soft">
          <div className="flex items-center gap-2.5">
            <GoogleG size={28} />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Google Rating</p>
              <div className="mt-0.5 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{overallRating.toFixed(1)}</span>
                <Stars rating={5} size={16} />
              </div>
            </div>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Total Reviews</p>
            <p className="mt-0.5 text-3xl font-bold text-foreground">{totalReviews}</p>
          </div>
        </div>

        {/* Review grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="glass-card flex flex-col gap-4 rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {r.avatar}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.handle}</p>
                </div>
                <div className="ml-auto shrink-0">
                  <GoogleG size={18} />
                </div>
              </div>

              {/* Rating + date */}
              <div className="flex items-center justify-between">
                <Stars rating={r.rating} />
                <span className="text-[10px] text-muted-foreground">{r.date}</span>
              </div>

              {/* Review text */}
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{r.text}&rdquo;
              </p>
            </article>
          ))}
        </div>

        {/* Google CTA */}
        <div className="mt-12 text-center">
          <a
            href={googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-soft transition-all hover:border-primary/40 hover:shadow-md"
          >
            <GoogleG size={18} />
            See all reviews on Google
          </a>
        </div>

      </div>
    </section>
  )
}
