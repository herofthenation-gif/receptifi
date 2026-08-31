import { Navbar } from "@/components/navbar"
import { HomepageShell } from "@/components/homepage-shell"
import { Marquee } from "@/components/marquee"
import { TwoPaths } from "@/components/two-paths"
import { WhoThisIsFor } from "@/components/who-this-is-for"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar overDark />
      {/* Hero + Demo Walkthrough (revealed on button click) */}
      <HomepageShell />
      {/* Marquee ticker */}
      <Marquee />
      {/* Two Paths — bottleneck diagnosis, then done-for-you vs coaching */}
      <TwoPaths />
      {/* Who This Is For */}
      <WhoThisIsFor />
      {/* CTA Footer */}
      <SiteFooter />
    </main>
  )
}
