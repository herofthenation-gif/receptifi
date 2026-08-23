import { Phone, ArrowRight } from "lucide-react";
import type { GeneratedSite } from "@/lib/outreach/site-generator";
import { WEBSITE } from "@/lib/outreach/config";

// Design system: Steep ("serif analytics on warm paper"), from
// https://styles.refero.design/style/75fdb89f-ca64-41b3-af36-7a78bd09448e
// Adapted, not copied verbatim: Steep specs Signifier/Sohne, we substitute
// the site's own Playfair Display / Plus Jakarta Sans at Steep's exact
// sizes/line-heights/letter-spacing, and Steep's single peach/sienna accent
// is replaced by our per-vertical accent — deliberately, since which color a
// preview uses is functional (signals "this wasn't copy-pasted"), not
// decorative. Everything else (neutrals, spacing, radii, the "no shadow on
// content cards, only floating chrome gets elevation" rule) follows Steep's
// spec exactly.
const INK = "#17191c";
const SLATE = "#777b86";
const ASH = "#979799";
const MIST = "#f2f2f3";
const FOG = "#fafafb";

// Per-vertical accent so previews don't all look like the same template.
const ACCENTS: Record<string, { accent: string; accentDark: string; tint: string }> = {
  dental: { accent: "#0e7490", accentDark: "#155e75", tint: "#ecfeff" },
  chiropractic: { accent: "#15803d", accentDark: "#166534", tint: "#f0fdf4" },
  med_spa: { accent: "#9d174d", accentDark: "#831843", tint: "#fdf2f8" },
  veterinary: { accent: "#b45309", accentDark: "#92400e", tint: "#fffbeb" },
  salon: { accent: "#7e22ce", accentDark: "#6b21a8", tint: "#faf5ff" },
  barbershop: { accent: "#1e293b", accentDark: "#0f172a", tint: "#f8fafc" },
  legal_intake: { accent: "#1e3a8a", accentDark: "#172554", tint: "#eff6ff" },
  hvac: { accent: "#c2410c", accentDark: "#9a3412", tint: "#fff7ed" },
  plumbing: { accent: "#1d4ed8", accentDark: "#1e40af", tint: "#eff6ff" },
  auto_repair: { accent: "#b91c1c", accentDark: "#991b1b", tint: "#fef2f2" },
  physical_therapy: { accent: "#0f766e", accentDark: "#115e59", tint: "#f0fdfa" },
  real_estate: { accent: "#a16207", accentDark: "#854d0e", tint: "#fefce8" },
  restaurant: { accent: "#9f1239", accentDark: "#881337", tint: "#fff1f2" },
  insurance_agency: { accent: "#3730a3", accentDark: "#312e81", tint: "#eef2ff" },
  home_services: { accent: "#4d7c0f", accentDark: "#3f6212", tint: "#f7fee7" },
  massage: { accent: "#059669", accentDark: "#047857", tint: "#ecfdf5" },
  garage_door: { accent: "#57534e", accentDark: "#44403c", tint: "#fafaf9" },
  electrical: { accent: "#ca8a04", accentDark: "#78350f", tint: "#fefce8" },
  restoration: { accent: "#0369a1", accentDark: "#075985", tint: "#f0f9ff" },
};
const DEFAULT_ACCENT = { accent: "#0f766e", accentDark: "#115e59", tint: "#f0fdfa" };

const EASE = "cubic-bezier(0.32,0.72,0,1)";

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span aria-label={`${rating} out of 5 stars`} className="tracking-tight">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < filled ? "#f5b942" : "#d5d5d4" }}>
          ★
        </span>
      ))}
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
      style={{ backgroundColor: "var(--pv-tint)", color: "var(--pv-accent-dark)" }}
    >
      {children}
    </span>
  );
}

/** Steep's card rule: flat, 24px radius, no shadow — elevation is reserved for floating chrome only. */
function Card({ tone = "mist", className = "", children }: { tone?: "mist" | "white"; className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-[24px] p-7 sm:p-8 ${className}`}
      style={{ backgroundColor: tone === "mist" ? MIST : "#ffffff" }}
    >
      {children}
    </div>
  );
}

export function PreviewSite({ site }: { site: GeneratedSite }) {
  const colors = ACCENTS[site.vertical] ?? DEFAULT_ACCENT;
  const telHref = site.phone ? `tel:${site.phone.replace(/[^\d+]/g, "")}` : null;
  const cssVars = { "--pv-accent": colors.accent, "--pv-accent-dark": colors.accentDark, "--pv-tint": colors.tint } as React.CSSProperties;
  const hasRating = site.rating != null && site.reviewCount != null;

  return (
    <div className="min-h-screen font-sans" style={{ ...cssVars, backgroundColor: "#ffffff", color: INK }}>
      {/* Header — floating chrome, the one element that earns Steep's "dropdown" elevation token */}
      <div className="sticky top-4 z-20 px-4 sm:px-5">
        <header
          className="mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full bg-white/85 px-5 py-3 backdrop-blur-xl"
          style={{ boxShadow: "0 0 0 1px rgba(4,23,43,0.05), 0 4px 24px rgba(0,0,0,0.08)" }}
        >
          <span className="min-w-0 truncate font-[family-name:var(--font-playfair)] text-lg font-bold">{site.businessName}</span>
          {telHref && (
            <a
              href={telHref}
              className="group flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-4 pr-1.5 text-[15px] font-medium text-white transition-transform duration-300 active:scale-[0.97]"
              style={{ backgroundColor: "var(--pv-accent)", transitionTimingFunction: EASE }}
            >
              <span className="hidden sm:inline">Call {site.phone}</span>
              <span className="sm:hidden">Call</span>
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5" style={{ transitionTimingFunction: EASE }}>
                <Phone className="size-3.5" strokeWidth={1.75} />
              </span>
            </a>
          )}
        </header>
      </div>

      {/* Hero */}
      <section
        className="px-5 pb-20 pt-20 sm:pb-24"
        style={{ background: `linear-gradient(180deg, var(--pv-tint) 0%, #ffffff 100%)` }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>
            {site.verticalLabel}
            {site.city ? ` · ${site.city}, CA` : ""}
          </Eyebrow>
          <h1
            className="mt-6 font-[family-name:var(--font-playfair)] font-normal text-[44px] leading-[1.3] tracking-[-0.66px] sm:text-[64px] sm:tracking-[-0.96px]"
          >
            {site.tagline}
          </h1>
          {hasRating && (
            <p className="mt-6 flex items-center justify-center gap-2 text-[15px]" style={{ color: SLATE }}>
              <Stars rating={site.rating as number} />
              <span className="font-medium" style={{ color: INK }}>{site.rating}</span>
              <span>· {site.reviewCount} Google reviews</span>
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {telHref && (
              <a
                href={telHref}
                className="group flex items-center gap-2.5 rounded-full py-3 pl-7 pr-2.5 text-[17px] font-medium text-white transition-transform duration-300 active:scale-[0.98]"
                style={{ backgroundColor: "var(--pv-accent)", transitionTimingFunction: EASE }}
              >
                Call Now
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px"
                  style={{ transitionTimingFunction: EASE }}
                >
                  <Phone className="size-3.5" strokeWidth={1.75} />
                </span>
              </a>
            )}
            <a
              href="#services"
              className="rounded-full border px-7 py-3 text-[17px] font-medium transition-colors duration-300"
              style={{ borderColor: "var(--pv-accent)", color: "var(--pv-accent-dark)", transitionTimingFunction: EASE }}
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-5xl px-5 py-20">
        <div className="text-center">
          <Eyebrow>What We Do</Eyebrow>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] font-normal text-[32px] leading-[1.3] sm:text-[44px] sm:tracking-[-0.66px]">
            Services built around you
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((s, i) => (
            <Card key={s.name}>
              <span className="font-[family-name:var(--font-playfair)] text-[15px]" style={{ color: "var(--pv-accent)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[26px] font-medium leading-[1.18] tracking-[-0.23px]">{s.name}</h3>
              <p className="mt-2 text-[17px] leading-[1.35]" style={{ color: SLATE }}>{s.blurb}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      {site.review && (
        <section className="px-5 py-20" style={{ backgroundColor: "var(--pv-tint)" }}>
          <div className="mx-auto max-w-3xl">
            <Card tone="white">
              <span className="font-[family-name:var(--font-playfair)] text-6xl leading-none" style={{ color: "var(--pv-accent)" }}>
                &ldquo;
              </span>
              <Stars rating={site.review.rating} />
              <p className="mt-4 font-[family-name:var(--font-playfair)] font-normal text-[22px] leading-[1.5]">
                {site.review.text}
              </p>
              <p className="mt-5 text-[15px] font-medium" style={{ color: SLATE }}>— {site.review.author}, Google review</p>
            </Card>
          </div>
        </section>
      )}

      {/* About */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className={`grid gap-12 lg:items-center ${hasRating ? "lg:grid-cols-[1.3fr_1fr]" : ""}`}>
          <div className={hasRating ? "" : "mx-auto max-w-2xl text-center"}>
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] font-normal text-[32px] leading-[1.3] sm:text-[44px] sm:tracking-[-0.66px]">
              {site.businessName}
            </h2>
            <p className="mt-5 text-[17px] leading-[1.35]" style={{ color: SLATE }}>{site.about}</p>
          </div>
          {hasRating && (
            <Card className="text-center lg:justify-self-end">
              <div className="font-[family-name:var(--font-playfair)] font-normal text-[44px] leading-[1.3] tracking-[-0.66px]" style={{ color: "var(--pv-accent-dark)" }}>
                {site.rating}
              </div>
              <div className="mt-2 flex justify-center"><Stars rating={site.rating as number} /></div>
              <div className="mt-2 text-[15px]" style={{ color: SLATE }}>{site.reviewCount} Google reviews</div>
            </Card>
          )}
        </div>
      </section>

      {/* Hours + Contact */}
      <section className="px-5 py-20" style={{ backgroundColor: "var(--pv-tint)" }}>
        <div className={`mx-auto grid max-w-5xl items-start gap-6 ${site.hours ? "sm:grid-cols-2" : "max-w-2xl"}`}>
          <Card tone="white">
            <h2 className="font-[family-name:var(--font-playfair)] font-normal text-[26px] leading-[1.18] tracking-[-0.23px]">Visit Us</h2>
            <dl className="mt-6 space-y-5 text-[17px]">
              {site.address && (
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: ASH }}>Address</dt>
                  <dd className="mt-1">{site.address}</dd>
                </div>
              )}
              {site.phone && telHref && (
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: ASH }}>Phone</dt>
                  <dd className="mt-1">
                    <a href={telHref} className="font-medium" style={{ color: "var(--pv-accent-dark)" }}>
                      {site.phone}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Card>
          {site.hours && (
            <Card tone="white">
              <h2 className="font-[family-name:var(--font-playfair)] font-normal text-[26px] leading-[1.18] tracking-[-0.23px]">Hours</h2>
              <ul className="mt-6 space-y-1.5 text-[15px]">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6 py-2" style={{ borderBottom: `1px solid ${FOG}` }}>
                    <span className="font-medium">{h.day}</span>
                    <span style={{ color: h.hours === "Closed" ? "#d5d5d4" : SLATE }}>{h.hours}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </section>

      {/* CTA band */}
      {telHref && (
        <section
          className="px-5 py-20 text-center text-white"
          style={{ background: `linear-gradient(135deg, var(--pv-accent) 0%, var(--pv-accent-dark) 100%)` }}
        >
          <h2 className="font-[family-name:var(--font-playfair)] font-normal text-[32px] leading-[1.3] sm:text-[44px] sm:tracking-[-0.66px]">
            Ready when you are.
          </h2>
          <p className="mt-3 text-[17px] text-white/80">One call and you&apos;re on the schedule.</p>
          <a
            href={telHref}
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-white py-3 pl-7 pr-2.5 text-[17px] font-medium transition-transform duration-300 active:scale-[0.98]"
            style={{ color: "var(--pv-accent-dark)", transitionTimingFunction: EASE }}
          >
            Call {site.phone}
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
              style={{ backgroundColor: "var(--pv-tint)", transitionTimingFunction: EASE }}
            >
              <ArrowRight className="size-3.5" strokeWidth={1.75} />
            </span>
          </a>
        </section>
      )}

      {/* Footer */}
      <footer className="px-5 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center text-[15px]" style={{ color: SLATE }}>
          <span className="font-semibold" style={{ color: INK }}>{site.businessName}</span>
          {site.address && <span>{site.address}</span>}
          <span className="mt-2">
            Website by{" "}
            <a href={`https://${WEBSITE}`} className="font-semibold underline" style={{ color: "var(--pv-accent-dark)" }}>
              Receptifi
            </a>{" "}
            · {WEBSITE}
          </span>
        </div>
      </footer>
    </div>
  );
}
