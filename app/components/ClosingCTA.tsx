export default function ClosingCTA() {
  return (
    <section className="relative z-[2] bg-[#0A0A0A] min-h-screen flex flex-col overflow-hidden font-['Space_Grotesk']">

      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.032]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Orange radial bloom — behind headline, very low opacity */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 42%, rgba(232,101,26,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Left stone formation — same paths as hero */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 hidden md:block w-[240px] lg:w-[320px] xl:w-[380px] z-[3] pointer-events-none select-none"
      >
        <svg
          viewBox="0 0 380 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          preserveAspectRatio="xMinYMin slice"
        >
          <path d="M0 0 L380 0 L305 78 L362 158 L282 232 L345 312 L262 388 L325 468 L242 542 L308 620 L224 694 L290 770 L206 844 L268 918 L0 1000 Z" fill="#101010"/>
          <path d="M0 0 L285 0 L212 84 L272 164 L190 242 L252 322 L168 398 L232 476 L148 550 L214 628 L130 702 L196 778 L112 852 L174 926 L0 1000 Z" fill="#0D0D0D"/>
          <path d="M0 0 L188 0 L118 88 L178 168 L96 248 L158 328 L76 406 L138 484 L56 558 L120 636 L38 710 L102 786 L22 860 L84 934 L0 1000 Z" fill="#0A0A0A"/>
          <path d="M188 0 L118 88 L178 168 L96 248 L158 328 L76 406 L138 484 L56 558 L120 636 L38 710 L102 786 L22 860 L84 934" stroke="rgba(255,255,255,0.028)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>

      {/* Right stone formation — same paths as hero */}
      <div
        aria-hidden
        className="absolute right-0 top-0 bottom-0 hidden md:block w-[240px] lg:w-[320px] xl:w-[380px] z-[3] pointer-events-none select-none"
      >
        <svg
          viewBox="0 0 380 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          preserveAspectRatio="xMaxYMin slice"
        >
          <path d="M380 0 L0 0 L75 78 L18 158 L98 232 L35 312 L118 388 L55 468 L138 542 L72 620 L156 694 L90 770 L174 844 L112 918 L380 1000 Z" fill="#101010"/>
          <path d="M380 0 L95 0 L168 84 L108 164 L190 242 L128 322 L212 398 L148 476 L232 550 L166 628 L250 702 L184 778 L268 852 L206 926 L380 1000 Z" fill="#0D0D0D"/>
          <path d="M380 0 L192 0 L262 88 L202 168 L284 248 L222 328 L304 406 L242 484 L324 558 L260 636 L342 710 L278 786 L358 860 L296 934 L380 1000 Z" fill="#0A0A0A"/>
          <path d="M192 0 L262 88 L202 168 L284 248 L222 328 L304 406 L242 484 L324 558 L260 636 L342 710 L278 786 L358 860 L296 934" stroke="rgba(255,255,255,0.028)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>

      {/* ── CTA CONTENT ──────────────────────────────────────── */}
      <div className="relative z-[10] flex-1 flex flex-col items-center justify-center text-center px-6 py-32 md:py-44">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-10 md:mb-14">
          <div className="h-px w-7 bg-[#1E1E22]" />
          <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#35353C]">
            One decision. Four solutions. Guaranteed.
          </span>
          <div className="h-px w-7 bg-[#1E1E22]" />
        </div>

        {/* Headline */}
        <h2
          className="font-['Barlow_Condensed'] font-black uppercase leading-[0.88] tracking-[-0.005em] max-w-[820px] w-full"
          style={{ fontSize: "clamp(54px, 10.2vw, 140px)" }}
        >
          <span className="text-white block">Your competitors answered</span>
          <span className="text-[#3A3A42] block">while you read this.</span>
        </h2>

        {/* Subheadline */}
        <p
          className="text-[#44444C] leading-[1.68] mt-7 md:mt-9 max-w-[440px]"
          style={{ fontSize: "clamp(15px, 1.8vw, 18px)" }}
        >
          The moment you book, we start building. Aria is answering your calls within 7 days.
        </p>

        {/* CTA */}
        <a
          href="https://calendly.com/karmello-koba1ba/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 md:mt-12 inline-flex items-center gap-2 bg-[#E8651A] hover:bg-[#D45B16] transition-colors duration-200 text-white font-['Space_Grotesk'] font-semibold rounded-full px-9 py-4 text-[16px]"
        >
          Book a Free Demo
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Friction killers */}
        <div className="mt-5 flex flex-col items-center gap-1.5">
          <p className="text-[#2E2E36]" style={{ fontSize: "12px" }}>
            No contracts. Cancel anytime.
          </p>
          <p className="text-[#2E2E36]" style={{ fontSize: "12px" }}>
            Live within 7 days or we work for free until you are.
          </p>
        </div>

      </div>

      {/* ── FOOTER STRIP ─────────────────────────────────────── */}
      <footer className="relative z-[10] border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Wordmark */}
          <span className="text-[#3A3A42] font-['Space_Grotesk'] font-semibold tracking-tight" style={{ fontSize: "14px" }}>
            Receptifi
          </span>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#2A2A32] hover:text-[#4A4A54] transition-colors duration-150" style={{ fontSize: "12px" }}>
              Privacy Policy
            </a>
            <a href="#" className="text-[#2A2A32] hover:text-[#4A4A54] transition-colors duration-150" style={{ fontSize: "12px" }}>
              Terms
            </a>
            <a href="mailto:aria@receptifi.net" className="text-[#2A2A32] hover:text-[#4A4A54] transition-colors duration-150" style={{ fontSize: "12px" }}>
              Contact
            </a>
          </div>

          {/* Copyright */}
          <span className="text-[#222228]" style={{ fontSize: "11px" }}>
            © 2025 Receptifi LLC. All rights reserved.
          </span>

        </div>
      </footer>

    </section>
  );
}
