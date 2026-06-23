export default function Hero() {
  return (
    <section className="relative bg-[#0A0A0A] min-h-screen flex flex-col items-center overflow-x-hidden pt-[clamp(72px,11vh,128px)]">

      {/* Grain texture — adds surface depth without a gradient */}
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

      {/* Left stone formation */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 hidden md:block w-[240px] lg:w-[320px] xl:w-[380px] z-[2] pointer-events-none select-none"
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

      {/* Right stone formation */}
      <div
        aria-hidden
        className="absolute right-0 top-0 bottom-0 hidden md:block w-[240px] lg:w-[320px] xl:w-[380px] z-[2] pointer-events-none select-none"
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

      {/* ── CONTENT ─────────────────────────────────────────── */}
      <div className="relative z-[10] flex flex-col items-center text-center px-6 w-full max-w-[860px] mx-auto">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-10 md:mb-14">
          <div className="h-px w-7 bg-[#1E1E22]" />
          <span className="font-['Space_Grotesk'] text-[10px] font-medium tracking-[0.22em] uppercase text-[#35353C]">
            AI Growth System for Dental Offices
          </span>
          <div className="h-px w-7 bg-[#1E1E22]" />
        </div>

        {/* Headline */}
        <h1
          className="font-['Barlow_Condensed'] font-black uppercase text-white leading-[0.88] tracking-[-0.005em] w-full"
          style={{ fontSize: "clamp(58px, 10.8vw, 148px)" }}
        >
          Your patients called.
          <br />
          <span className="text-[#3A3A42]">Nobody picked up.</span>
        </h1>

        {/* Subheadline */}
        <p className="font-['Space_Grotesk'] text-[#44444C] text-[16px] md:text-[18px] leading-[1.68] mt-6 md:mt-8 max-w-[490px]">
          Receptifi gives your practice 24/7 AI coverage, a website that converts, automated 5-star reviews, and a CRM that follows up. Four solutions. One agency.
        </p>

        {/* CTA */}
        <div className="mt-9 md:mt-11">
          <a
            href="https://calendly.com/karmello-koba1ba/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#E8651A] hover:bg-[#D45B16] text-white font-['Space_Grotesk'] font-semibold text-[14px] tracking-[0.04em] px-9 py-[15px] rounded-full transition-all duration-200 hover:shadow-[0_0_44px_rgba(232,101,26,0.38)]"
          >
            Book a Free Demo
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Trust tokens */}
        <div className="flex items-center gap-7 md:gap-10 mt-7 flex-wrap justify-center">
          {["No contracts", "Live in 48 hours", "90-day guarantee"].map((label) => (
            <div key={label} className="flex items-center gap-[7px]">
              <div className="w-[3px] h-[3px] rounded-full bg-[#272730]" />
              <span className="font-['Space_Grotesk'] text-[10px] text-[#2E2E36] tracking-[0.08em] uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Rule */}
        <div className="w-full max-w-[520px] h-px bg-[#141416] mt-14" />

        {/* ── ARIA CALL CONSOLE ─────────────────────────────── */}
        <div className="relative w-full max-w-[800px] mt-14">

          {/* Bottom bleed fade — pulls the eye to scroll */}
          <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-[#0A0A0A] to-transparent z-[10] pointer-events-none" />

          <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-[13px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.85)]">

            {/* Chrome top bar */}
            <div className="flex items-center justify-between px-5 py-[9px] border-b border-[#151518] bg-[#0A0A0A]">
              <div className="flex items-center gap-[6px]">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-[9px] h-[9px] rounded-full bg-[#181818] border border-[#202024]" />
                ))}
              </div>
              <span className="font-['Space_Grotesk'] text-[9px] text-[#232330] tracking-[0.18em] uppercase font-medium">
                Aria Receptionist Console
              </span>
              <div className="flex items-center gap-[7px]">
                <div className="w-[5px] h-[5px] rounded-full bg-[#4ade80] shadow-[0_0_7px_rgba(74,222,128,0.9)] animate-pulse" />
                <span className="font-['Space_Grotesk'] text-[9px] text-[#2E5A2E] tracking-[0.14em] uppercase font-semibold">
                  Live
                </span>
              </div>
            </div>

            {/* Two-column body */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_252px]">

              {/* Left — call + transcript + waveform */}
              <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-[#141416] flex flex-col gap-5">

                {/* Active call header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-[7px] mb-[7px]">
                      <div className="w-[5px] h-[5px] rounded-full bg-[#E8651A] shadow-[0_0_8px_rgba(232,101,26,0.75)] animate-pulse" />
                      <span className="font-['Space_Grotesk'] text-[9px] text-[#E8651A] tracking-[0.18em] uppercase font-semibold">
                        Active Call
                      </span>
                    </div>
                    <p className="font-['Barlow_Condensed'] text-white text-[19px] font-bold tracking-[0.02em] leading-none">
                      Inbound: +1 (619) 555-0142
                    </p>
                    <p className="font-['Space_Grotesk'] text-[11px] text-[#2E2E36] mt-[5px]">
                      Pacific Dental Group · San Diego, CA
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-['Space_Grotesk'] text-[13px] text-[#3A3A44] font-medium tracking-[0.08em]">
                      02:47
                    </p>
                    <p className="font-['Space_Grotesk'] text-[9px] text-[#242430] tracking-[0.1em] uppercase mt-[4px]">
                      Duration
                    </p>
                  </div>
                </div>

                {/* Live transcript */}
                <div className="bg-[#080808] border border-[#141416] rounded-[9px] p-4 flex flex-col gap-[11px]">
                  <div className="flex items-center gap-2 mb-[2px]">
                    <span className="font-['Space_Grotesk'] text-[8px] text-[#20202A] tracking-[0.2em] uppercase font-medium">
                      Live Transcript
                    </span>
                    <div className="h-px flex-1 bg-[#141416]" />
                  </div>

                  {[
                    {
                      role: "Caller",
                      msg: "Hi, I'd like to book a new patient cleaning. Do you have anything open next week?",
                      bright: false,
                    },
                    {
                      role: "Aria",
                      msg: "Absolutely. I have Tuesday the 24th at 2:00 PM or Thursday the 26th at 10:00 AM. Which works best?",
                      bright: true,
                    },
                    {
                      role: "Caller",
                      msg: "Tuesday at 2 is perfect.",
                      bright: false,
                    },
                    {
                      role: "Aria",
                      msg: "Booked. Sending a confirmation to your number now. Is there anything else I can help with?",
                      bright: true,
                    },
                  ].map(({ role, msg, bright }) => (
                    <div key={role + msg.slice(0, 10)} className="flex gap-[10px]">
                      <span
                        className={`font-['Space_Grotesk'] text-[8px] tracking-[0.15em] uppercase shrink-0 pt-[2px] w-10 ${
                          bright ? "text-[#38384A]" : "text-[#242432]"
                        }`}
                      >
                        {role}
                      </span>
                      <p
                        className={`font-['Space_Grotesk'] text-[12px] leading-[1.55] text-left ${
                          bright ? "text-[#52525E]" : "text-[#363642]"
                        }`}
                      >
                        {msg}
                      </p>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  <div className="flex gap-[10px] items-center">
                    <span className="font-['Space_Grotesk'] text-[8px] text-[#38384A] tracking-[0.15em] uppercase w-10">
                      Aria
                    </span>
                    <div className="flex gap-[4px] items-center pt-[2px]">
                      <div className="w-[5px] h-[5px] rounded-full bg-[#252532] animate-bounce [animation-duration:1.2s] [animation-delay:0ms]" />
                      <div className="w-[5px] h-[5px] rounded-full bg-[#252532] animate-bounce [animation-duration:1.2s] [animation-delay:150ms]" />
                      <div className="w-[5px] h-[5px] rounded-full bg-[#252532] animate-bounce [animation-duration:1.2s] [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>

                {/* Audio waveform */}
                <div className="flex items-end gap-[2px] h-7 px-1 overflow-hidden">
                  {[3, 6, 4, 9, 5, 11, 7, 3, 8, 5, 10, 6, 3, 7, 4].map((h, i) => (
                    <div key={`past-${i}`} className="w-[3px] shrink-0 rounded-sm bg-[#191920]" style={{ height: `${h}px` }} />
                  ))}
                  {[10, 18, 13, 24, 16, 20, 27, 18, 22, 15, 21, 26, 17, 23, 19, 25, 14].map((h, i) => (
                    <div key={`live-${i}`} className="w-[3px] shrink-0 rounded-sm bg-[#E8651A] opacity-55" style={{ height: `${h}px` }} />
                  ))}
                  {[4, 3, 5, 2, 4, 2, 3].map((h, i) => (
                    <div key={`future-${i}`} className="w-[3px] shrink-0 rounded-sm bg-[#141418]" style={{ height: `${h}px` }} />
                  ))}
                </div>
              </div>

              {/* Right sidebar — status + booking + stats */}
              <div className="p-5 flex flex-col gap-4">

                {/* System status */}
                <div>
                  <p className="font-['Space_Grotesk'] text-[8px] text-[#1E1E28] tracking-[0.2em] uppercase mb-[10px]">
                    System Status
                  </p>
                  <div className="flex flex-col gap-[7px]">
                    {[
                      { label: "Speech Recognition", status: "Active", color: "text-[#4ade80]" },
                      { label: "Intent Classification", status: "Active", color: "text-[#4ade80]" },
                      { label: "Calendar Sync", status: "Syncing", color: "text-[#E8651A]" },
                      { label: "SMS Confirmation", status: "Ready", color: "text-[#383844]" },
                    ].map(({ label, status, color }) => (
                      <div key={label} className="flex items-center justify-between gap-2">
                        <span className="font-['Space_Grotesk'] text-[10px] text-[#28282E]">{label}</span>
                        <span className={`font-['Space_Grotesk'] text-[9px] font-semibold tracking-[0.08em] ${color}`}>
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-[#111114]" />

                {/* Booking confirmation */}
                <div className="bg-[#080808] border border-[#161618] rounded-[9px] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-[13px] h-[13px] rounded-full bg-[#4ade80] flex items-center justify-center shrink-0">
                      <svg
                        width="7"
                        height="7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#052e16"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="font-['Space_Grotesk'] text-[9px] text-[#2E5A2E] tracking-[0.14em] uppercase font-semibold">
                      Confirmed
                    </span>
                  </div>
                  {[
                    { k: "Date", v: "Tue, Jun 24" },
                    { k: "Time", v: "2:00 PM" },
                    { k: "Type", v: "New Patient" },
                    { k: "Duration", v: "60 min" },
                  ].map(({ k, v }) => (
                    <div key={k} className="flex justify-between items-baseline py-[3px]">
                      <span className="font-['Space_Grotesk'] text-[9px] text-[#1C1C24] uppercase tracking-[0.1em]">
                        {k}
                      </span>
                      <span className="font-['Space_Grotesk'] text-[11px] text-[#3E3E4A] font-medium">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-[#111114]" />

                {/* Today's totals */}
                <div>
                  <p className="font-['Space_Grotesk'] text-[8px] text-[#1E1E28] tracking-[0.2em] uppercase mb-[10px]">
                    Today
                  </p>
                  {[
                    { label: "Calls Handled", value: "23" },
                    { label: "Booked", value: "11" },
                    { label: "After-hours", value: "8" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-baseline py-[4px]">
                      <span className="font-['Space_Grotesk'] text-[10px] text-[#28282E]">{label}</span>
                      <span className="font-['Barlow_Condensed'] text-[22px] font-bold text-[#363644] leading-none tracking-tight">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Operational footer */}
                <div className="mt-auto pt-3 border-t border-[#111114] flex items-center gap-2">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#4ade80] shadow-[0_0_6px_rgba(74,222,128,0.8)] animate-pulse" />
                  <span className="font-['Space_Grotesk'] text-[9px] text-[#1E1E28] tracking-[0.1em] uppercase">
                    All systems operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
