import { Navbar } from "@/components/navbar"
import { HomepageShell } from "@/components/homepage-shell"
import { Marquee } from "@/components/marquee"
import { AiClarity } from "@/components/ai-clarity"
import { Services } from "@/components/services"
import { SelfAssessment } from "@/components/self-assessment"
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
      {/* Why Receptifi — cuts through AI hype before the services pitch */}
      <AiClarity />
      {/* Services — premium off-white so white cards lift off the surface */}
      <div className="bg-section-alt">
        <Services />
      </div>
      {/* Self-Assessment — pure white */}
      <div className="bg-background">
        <SelfAssessment />
      </div>
      {/* Who This Is For */}
      <WhoThisIsFor />
      {/* CTA Footer */}
      <SiteFooter />
    </main>
  )
}
