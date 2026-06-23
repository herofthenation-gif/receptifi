const items = [
  "ONE LAYER IMPROVES YOUR OPERATION: ALL FOUR SYNCHRONIZED TOGETHER REVOLUTIONIZES YOUR ENTERPRISE REVENUE",
  "PROVEN SCALE OPERATIONS: ELIMINATING REVENUE LEAKAGE AND RECOVERING UP TO 90% OF UNCAPTURED MARKET INTENT",
  "NOT A CALL CENTER: WE DEPLOY DEDICATED, US-BASED REVENUE EXECUTIVES TRAINED IN HIGH-CONVERSION SALES DIALOGUE",
  "BEYOND RECEPTION: A SINGLE SYNCHRONIZED ARCHITECTURE LINKING RAW INBOUND TRAFFIC DIRECTLY TO SIGNED CONTRACTS",
]

// Separator rendered between every statement
function Separator() {
  return (
    <span
      aria-hidden
      className="mx-10 select-none font-sans text-base font-bold text-primary/50"
    >
      //
    </span>
  )
}

export function Marquee() {
  // Double the items so the strip is exactly 2× wide — the CSS animation
  // slides it left by 50%, then snaps back to 0 for a perfect seamless loop.
  const doubled = [...items, ...items]

  return (
    <div className="relative flex w-full overflow-hidden border-y border-border bg-card/50 py-4">
      <div className="flex shrink-0 animate-marquee items-center">
        {doubled.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap font-sans text-[11px] uppercase tracking-wider text-muted-foreground">
              {item}
            </span>
            <Separator />
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-card/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-card/80 to-transparent" />
    </div>
  )
}
