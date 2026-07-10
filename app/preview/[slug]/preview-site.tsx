import type { GeneratedSite } from "@/lib/outreach/site-generator";
import { WEBSITE } from "@/lib/outreach/config";

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
};
const DEFAULT_ACCENT = { accent: "#0f766e", accentDark: "#115e59", tint: "#f0fdfa" };

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span aria-label={`${rating} out of 5 stars`} className="tracking-tight">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filled ? "text-amber-400" : "text-neutral-300"}>
          ★
        </span>
      ))}
    </span>
  );
}

export function PreviewSite({ site }: { site: GeneratedSite }) {
  const colors = ACCENTS[site.vertical] ?? DEFAULT_ACCENT;
  const telHref = site.phone ? `tel:${site.phone.replace(/[^\d+]/g, "")}` : null;

  return (
    <div
      className="min-h-screen bg-white text-neutral-900"
      style={{ "--pv-accent": colors.accent, "--pv-accent-dark": colors.accentDark, "--pv-tint": colors.tint } as React.CSSProperties}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <span className="min-w-0 truncate font-[family-name:var(--font-playfair)] text-xl font-bold">{site.businessName}</span>
          {telHref && (
            <a
              href={telHref}
              className="shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--pv-accent)" }}
            >
              <span className="hidden sm:inline">Call {site.phone}</span>
              <span className="sm:hidden">Call Now</span>
            </a>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="px-5 py-16 sm:py-24" style={{ backgroundColor: "var(--pv-tint)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--pv-accent)" }}>
            {site.verticalLabel}
            {site.city ? ` · ${site.city}, CA` : ""}
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight sm:text-5xl">
            {site.tagline}
          </h1>
          {site.rating != null && site.reviewCount != null && (
            <p className="mt-5 flex items-center justify-center gap-2 text-neutral-700">
              <Stars rating={site.rating} />
              <span className="font-semibold">{site.rating}</span>
              <span className="text-neutral-500">· {site.reviewCount} Google reviews</span>
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {telHref && (
              <a
                href={telHref}
                className="rounded-full px-7 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--pv-accent)" }}
              >
                Call Now
              </a>
            )}
            <a
              href="#services"
              className="rounded-full border-2 px-7 py-3 font-semibold transition-colors"
              style={{ borderColor: "var(--pv-accent)", color: "var(--pv-accent-dark)" }}
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="text-center font-[family-name:var(--font-playfair)] text-3xl font-bold">What We Do</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((s) => (
            <div key={s.name} className="rounded-2xl border border-neutral-200 p-6">
              <div className="mb-3 h-1.5 w-10 rounded-full" style={{ backgroundColor: "var(--pv-accent)" }} />
              <h3 className="text-lg font-bold">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="px-5 py-16" style={{ backgroundColor: "var(--pv-tint)" }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
            About {site.businessName}
          </h2>
          <p className="mt-5 leading-relaxed text-neutral-700">{site.about}</p>
        </div>
      </section>

      {/* Hours + Contact */}
      <section className="mx-auto grid max-w-5xl gap-12 px-5 py-16 sm:grid-cols-2">
        <div>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold">Visit Us</h2>
          <dl className="mt-5 space-y-4 text-neutral-700">
            {site.address && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Address</dt>
                <dd className="mt-1">{site.address}</dd>
              </div>
            )}
            {site.phone && telHref && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Phone</dt>
                <dd className="mt-1">
                  <a href={telHref} className="font-semibold" style={{ color: "var(--pv-accent-dark)" }}>
                    {site.phone}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
        {site.hours && (
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold">Hours</h2>
            <ul className="mt-5 space-y-1.5 text-sm">
              {site.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-6 border-b border-neutral-100 py-1.5">
                  <span className="font-medium">{h.day}</span>
                  <span className={h.hours === "Closed" ? "text-neutral-400" : "text-neutral-700"}>{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* CTA band */}
      {telHref && (
        <section className="px-5 py-14 text-center text-white" style={{ backgroundColor: "var(--pv-accent-dark)" }}>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">Ready when you are.</h2>
          <p className="mt-2 text-white/80">One call and you&apos;re on the schedule.</p>
          <a
            href={telHref}
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-semibold"
            style={{ color: "var(--pv-accent-dark)" }}
          >
            Call {site.phone}
          </a>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-200 px-5 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center text-sm text-neutral-500">
          <span className="font-semibold text-neutral-700">{site.businessName}</span>
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
