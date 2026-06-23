import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Logo } from "@/components/logo"

export function SiteFooter() {
  return (
    <footer id="book" className="scroll-mt-24 border-t border-border bg-section-alt">
      {/* Generous top padding ensures zero collision with any content above */}
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44">
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-serif text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Ready to systematize your revenue process?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Book a strategy call to map out your primary operational bottleneck. Our team will engineer custom infrastructure solutions to secure your pipeline and scale your business growth.
          </p>
          <div className="mt-10 flex justify-center">
            <Button
              render={<a href="/book" />}
              nativeButton={false}
              size="lg"
              className="group h-14 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-soft-lg transition-all duration-200 hover:scale-[1.03] hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
            >
              Book a Growth Audit
              <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
          <Logo />
          <p className="text-xs text-muted-foreground">
            Operating nationally · All 50 states
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <span className="text-muted-foreground/30 text-xs">·</span>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Receptifi. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
