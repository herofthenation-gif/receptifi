import { Navbar } from "@/components/navbar"
import { HomepageShell } from "@/components/homepage-shell"
import { Marquee } from "@/components/marquee"
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
      {/* What We Do: General SEO, Local SEO, Google Ads, Meta Ads, AI SEO, each with a mini email opt-in */}
      <MarketingServices />
      {/* CTA Footer */}
      <SiteFooter />
    </main>
  )
}
