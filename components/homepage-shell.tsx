"use client"

import { useEffect, useState } from "react"
import { Hero } from "@/components/hero"
import { DemoWalkthrough } from "@/components/demo-walkthrough"

export function HomepageShell() {
  const [showDemo, setShowDemo] = useState(false)

  useEffect(() => {
    if (showDemo) {
      setTimeout(() => {
        document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 60)
    }
  }, [showDemo])

  return (
    <>
      <div className="bg-background">
        <Hero onWatchClick={() => setShowDemo(true)} />
      </div>
      {showDemo && <DemoWalkthrough />}
    </>
  )
}
