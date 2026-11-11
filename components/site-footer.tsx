import { Logo } from "@/components/logo"
import { SubscribeForm } from "@/components/subscribe-form"

export function SiteFooter() {
  return (
    <footer className="dark border-t border-border bg-section-alt">
      {/* Generous top padding ensures zero collision with any content above */}
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44">
        <div id="signup" className="relative mx-auto max-w-3xl scroll-mt-24 text-center">
          <h2 className="text-balance font-serif text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Ready to eliminate your bottlenecks?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Sign up and we&rsquo;ll send you exactly what&rsquo;s broken, missed calls, a weak site, thin reviews, slow follow-up, weak SEO, and what fixing it would mean for your business.
          </p>
          <div className="mt-10 flex justify-center">
            <SubscribeForm source="audit_cta" buttonLabel="Sign Up" size="lg" />
          </div>
          <a
            href="/services"
            className="mt-6 inline-block text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Or see the do-it-yourself coaching path
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
          <Logo />
          <p className="text-xs text-muted-foreground">
            Based in the Inland Empire, CA · Serving businesses nationwide
          </p>
          <div className="flex items-center gap-4">
            <a href="tel:+19516251893" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              (951) 625-1893
            </a>
            <span className="text-muted-foreground/30 text-xs">·</span>
            <a href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <span className="text-muted-foreground/30 text-xs">·</span>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Receptifi. All rights reserved.
            </p>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border px-5 py-8 sm:flex-row sm:px-8">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Get occasional updates
            </span>
            <SubscribeForm />
          </div>
        </div>
      </div>
    </footer>
  )
}
