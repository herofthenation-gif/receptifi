import { Navbar } from "@/components/navbar"
import { HomepageShell } from "@/components/homepage-shell"
import { Marquee } from "@/components/marquee"
import { Services } from "@/components/services"
import { RoiCalculator } from "@/components/roi-calculator"
import { WhoThisIsFor } from "@/components/who-this-is-for"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {/* Hero + Demo Walkthrough (revealed on button click) */}
      <HomepageShell />
      {/* Marquee ticker */}
      <Marquee />
      {/* Services — premium off-white so white cards lift off the surface */}
      <div className="bg-section-alt">
        <Services />
      </div>
      {/* ROI Calculator — pure white */}
      <div className="bg-background">
        <RoiCalculator />
      </div>
      {/* Who This Is For */}
      <WhoThisIsFor />
      {/* CTA Footer */}
      <SiteFooter />
    </main>
  )
}
