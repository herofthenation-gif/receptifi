const pillars = [
  { label: "No buzzwords", note: "We explain it in plain English, not slide-deck jargon." },
  { label: "No guessing", note: "We tell you exactly where AI helps your business, and where it doesn't." },
  { label: "No overwhelm", note: "One clear plan instead of a hundred tools to sort through." },
]

export function AiClarity() {
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-6 block font-sans text-xs uppercase tracking-[0.18em] text-primary">
            Why Receptifi
          </span>
          <h2 className="text-balance font-serif text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Less noise. More clarity.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            AI integration is everywhere right now, and so are the buzzwords. It's easy to get lost in the cycle. We cut through it and tell you exactly where AI can actually help your business, and where it can't.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {pillars.map((p) => (
            <div key={p.label} className="glass-card rounded-2xl p-6 text-center">
              <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                {p.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
