const STATS = [
  { value: "94%",    label: "Calls answered on first ring" },
  { value: "3.2x",   label: "Average increase in booked appointments" },
  { value: "7 days", label: "Average time to go live" },
  { value: "24/7",   label: "Coverage. No holidays. No sick days." },
];

const TESTIMONIALS = [
  {
    quote:
      "We were losing somewhere between 8 and 12 calls a week to voicemail after 5pm. I assumed that was just how it worked. Three weeks in, Aria booked two new patients on a Saturday night while we were closed. That single weekend covered the cost of the first month.",
    name: "Dr. Marcus Webb",
    role: "Owner",
    practice: "Webb Family Dental",
  },
  {
    quote:
      "We had 14 Google reviews and a website we hadn't touched since 2019. A competitor three blocks away had 240. We knew it was costing us patients but kept deprioritizing it. Receptifi launched a new site and automated our review requests. We're at 73 reviews now. New patients mention the website when they call in.",
    name: "Jennifer Tran",
    role: "Office Manager",
    practice: "Shoreline Dental Group",
  },
  {
    quote:
      "I had a front desk candidate lined up. Offer letter drafted. We ran a one-month trial with Receptifi first and I never sent it. Calls get answered, follow-ups go out automatically, reminders run on their own. It's doing the job of a full hire for a fraction of the cost. Should have done this two years ago.",
    name: "Dr. Alicia Okonkwo",
    role: "Solo Practitioner",
    practice: "Okonkwo Dental",
  },
];

const Stars = () => (
  <div className="flex items-center gap-[3px]">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-[#A0A0B4]">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

export default function SocialProof() {
  return (
    <section
      className="relative z-[2] bg-[#0A0A0A] py-24 md:py-32 overflow-hidden font-['Space_Grotesk']"
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.032]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "192px 192px",
        }}
      />

      <div className="relative z-[2] max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Section label */}
        <p
          className="text-[#3A3A42] tracking-[0.22em] uppercase mb-14"
          style={{ fontSize: "10px" }}
        >
          RESULTS. NOT PROJECTIONS.
        </p>

        {/* ── STAT BAR ─────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-[rgba(255,255,255,0.06)] rounded-[4px] mb-20 md:mb-24 divide-y divide-[rgba(255,255,255,0.06)] md:divide-y-0 md:divide-x md:divide-[rgba(255,255,255,0.06)]">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="px-8 py-10 flex flex-col gap-2"
            >
              <span
                className="font-['Barlow_Condensed'] uppercase leading-none tracking-tight text-[#E8651A]"
                style={{ fontSize: "clamp(36px, 4.5vw, 60px)" }}
              >
                {stat.value}
              </span>
              <span
                className="text-[#3A3A42] leading-snug"
                style={{ fontSize: "13px" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── TESTIMONIAL GRID ─────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-[#111114] border border-[rgba(255,255,255,0.06)] rounded-[8px] p-8 flex flex-col gap-6"
            >
              <Stars />

              <p
                className="text-[#B0B0BC] leading-relaxed flex-1"
                style={{ fontSize: "15px" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="pt-4 border-t border-[rgba(255,255,255,0.06)]">
                <p
                  className="text-white font-medium"
                  style={{ fontSize: "13px" }}
                >
                  {t.name}
                </p>
                <p
                  className="text-[#3A3A42] mt-0.5"
                  style={{ fontSize: "12px" }}
                >
                  {t.role} · {t.practice}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
