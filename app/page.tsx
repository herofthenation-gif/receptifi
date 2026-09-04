import { Navbar } from "@/components/navbar"
import { HomepageShell } from "@/components/homepage-shell"
import { Marquee } from "@/components/marquee"
import { TwoPaths } from "@/components/two-paths"
import { MarketingServices } from "@/components/marketing-services"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar overDark />
      {/* Hero + Demo Walkthrough (revealed on button click) */}
      <HomepageShell />
      {/* Marquee ticker */}
      <Marquee />
      {/* Marketing Services: SEO, Google, Meta, each with a mini email opt-in */}
      <MarketingServices />
      {/* Two Paths — bottleneck diagnosis, then done-for-you vs coaching */}
      <TwoPaths />
      {/* CTA Footer */}
      <SiteFooter />
    </main>
  )
}
