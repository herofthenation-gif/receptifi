"use client";

export default function HowItWorks() {
  return (
    <section className="relative z-[2] bg-[#0A0A0A] py-24 md:py-32 overflow-hidden font-['Space_Grotesk']">
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.032]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "192px 192px",
        }}
      />

      <div className="relative z-[2] max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section label */}
        <p
          className="text-[#3A3A42] tracking-[0.2em] uppercase mb-6"
          style={{ fontSize: "11px", letterSpacing: "0.18em" }}
        >
          HOW IT WORKS
        </p>

        {/* Headline */}
        <h2
          className="font-['Barlow_Condensed'] uppercase leading-[0.95] tracking-tight mb-20 md:mb-24"
          style={{ fontSize: "clamp(46px, 6.5vw, 96px)" }}
        >
          <span className="text-white block">Three steps.</span>
          <span className="text-[#2E2E36] block">Then it runs itself.</span>
        </h2>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-[rgba(255,255,255,0.06)]">
          {/* Step 1 */}
          <div className="md:pr-12 pb-16 md:pb-0">
            <p
              className="text-[#3A3A42] tracking-[0.18em] uppercase mb-10"
              style={{ fontSize: "10px" }}
            >
              FIG 0.1
            </p>

            {/* SVG: Form / intake document */}
            <div className="mb-10">
              <svg
                viewBox="0 0 220 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[220px]"
              >
                {/* Document base */}
                <rect x="28" y="20" width="128" height="164" rx="3" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                {/* Folded corner */}
                <path d="M128 20 L156 48" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                <path d="M128 20 L128 48 L156 48" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="rgba(255,255,255,0.03)"/>
                {/* Header bar */}
                <rect x="44" y="38" width="72" height="6" rx="1.5" fill="rgba(255,255,255,0.1)"/>
                {/* Form field lines */}
                <rect x="44" y="60" width="96" height="1" rx="0.5" fill="rgba(255,255,255,0.06)"/>
                <rect x="44" y="56" width="38" height="3" rx="1" fill="rgba(255,255,255,0.06)"/>
                <rect x="44" y="76" width="96" height="1" rx="0.5" fill="rgba(255,255,255,0.06)"/>
                <rect x="44" y="72" width="52" height="3" rx="1" fill="rgba(255,255,255,0.06)"/>
                <rect x="44" y="92" width="96" height="1" rx="0.5" fill="rgba(255,255,255,0.06)"/>
                <rect x="44" y="88" width="44" height="3" rx="1" fill="rgba(255,255,255,0.06)"/>
                {/* Checkbox rows */}
                <rect x="44" y="110" width="10" height="10" rx="1.5" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                <rect x="62" y="113" width="52" height="3" rx="1" fill="rgba(255,255,255,0.06)"/>
                <rect x="44" y="126" width="10" height="10" rx="1.5" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                {/* Checkmark in second box */}
                <path d="M46.5 131 L49 133.5 L53.5 128.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="62" y="129" width="64" height="3" rx="1" fill="rgba(255,255,255,0.06)"/>
                <rect x="44" y="142" width="10" height="10" rx="1.5" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                <rect x="62" y="145" width="44" height="3" rx="1" fill="rgba(255,255,255,0.06)"/>
                {/* Submit button */}
                <rect x="44" y="162" width="60" height="14" rx="2" stroke="rgba(232,101,26,0.4)" strokeWidth="1" fill="rgba(232,101,26,0.08)"/>
                <rect x="54" y="167" width="40" height="3" rx="1" fill="rgba(232,101,26,0.35)"/>
                {/* Decorative corner lines */}
                <line x1="4" y1="20" x2="4" y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                <line x1="4" y1="20" x2="28" y2="20" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                <line x1="184" y1="184" x2="184" y2="144" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                <line x1="184" y1="184" x2="156" y2="184" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              </svg>
            </div>

            <h3
              className="font-['Barlow_Condensed'] uppercase text-white tracking-tight leading-tight mb-3"
              style={{ fontSize: "clamp(26px, 3vw, 38px)" }}
            >
              You sign up.
            </h3>
            <p className="text-[#44444C] leading-relaxed" style={{ fontSize: "15px" }}>
              Fill out one intake form. Tell us your practice name, hours, services, and what a typical call sounds like. That is all we need.
            </p>
          </div>

          {/* Step 2 */}
          <div className="md:px-12 pb-16 md:pb-0 border-t border-[rgba(255,255,255,0.06)] md:border-t-0 pt-16 md:pt-0">
            <p
              className="text-[#3A3A42] tracking-[0.18em] uppercase mb-10"
              style={{ fontSize: "10px" }}
            >
              FIG 0.2
            </p>

            {/* SVG: Layered/stacked systems */}
            <div className="mb-10">
              <svg
                viewBox="0 0 220 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[220px]"
              >
                {/* Back layer */}
                <path
                  d="M110 44 L180 72 L110 100 L40 72 Z"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1"
                  fill="rgba(255,255,255,0.02)"
                />
                <line x1="40" y1="72" x2="40" y2="90" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                <line x1="180" y1="72" x2="180" y2="90" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                <path
                  d="M40 90 L110 118 L180 90"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1"
                />

                {/* Mid layer */}
                <path
                  d="M110 72 L180 100 L110 128 L40 100 Z"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  fill="rgba(255,255,255,0.03)"
                />
                <line x1="40" y1="100" x2="40" y2="118" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                <line x1="180" y1="100" x2="180" y2="118" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                <path
                  d="M40 118 L110 146 L180 118"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />

                {/* Top / front layer */}
                <path
                  d="M110 100 L180 128 L110 156 L40 128 Z"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                  fill="rgba(255,255,255,0.04)"
                />
                <line x1="40" y1="128" x2="40" y2="146" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                <line x1="180" y1="128" x2="180" y2="146" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                <path
                  d="M40 146 L110 174 L180 146"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />

                {/* Dots at corners of front layer */}
                <circle cx="110" cy="100" r="2" fill="rgba(255,255,255,0.2)"/>
                <circle cx="180" cy="128" r="2" fill="rgba(255,255,255,0.15)"/>
                <circle cx="40" cy="128" r="2" fill="rgba(255,255,255,0.15)"/>
                <circle cx="110" cy="156" r="2" fill="rgba(255,255,255,0.2)"/>

                {/* Center label lines on top face */}
                <rect x="90" y="124" width="40" height="2" rx="1" fill="rgba(255,255,255,0.1)"/>
                <rect x="96" y="130" width="28" height="2" rx="1" fill="rgba(255,255,255,0.07)"/>

                {/* Vertical connector lines */}
                <line x1="110" y1="20" x2="110" y2="44" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 3"/>
                {/* Top node */}
                <circle cx="110" cy="18" r="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.04)"/>
                <circle cx="110" cy="18" r="1.5" fill="rgba(255,255,255,0.2)"/>
              </svg>
            </div>

            <h3
              className="font-['Barlow_Condensed'] uppercase text-white tracking-tight leading-tight mb-3"
              style={{ fontSize: "clamp(26px, 3vw, 38px)" }}
            >
              We build everything.
            </h3>
            <p className="text-[#44444C] leading-relaxed" style={{ fontSize: "15px" }}>
              Voice system, website, review automation, and CRM. All configured for your practice. We handle the setup, the testing, and the launch. You do not touch a single setting.
            </p>
          </div>

          {/* Step 3 */}
          <div className="md:pl-12 border-t border-[rgba(255,255,255,0.06)] md:border-t-0 pt-16 md:pt-0">
            <p
              className="text-[#3A3A42] tracking-[0.18em] uppercase mb-10"
              style={{ fontSize: "10px" }}
            >
              FIG 0.3
            </p>

            {/* SVG: Phone / signal / communication */}
            <div className="mb-10">
              <svg
                viewBox="0 0 220 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[220px]"
              >
                {/* Signal arcs */}
                <path
                  d="M110 116 Q110 68 148 44"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M72 44 Q110 68 110 116"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                  fill="none"
                />
                {/* Concentric signal rings from phone top */}
                <path d="M88 52 Q110 36 132 52" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none"/>
                <path d="M80 42 Q110 22 140 42" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none"/>
                <path d="M72 32 Q110 8 148 32" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none"/>

                {/* Phone body */}
                <rect x="78" y="60" width="64" height="112" rx="8" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="rgba(255,255,255,0.03)"/>
                {/* Phone screen */}
                <rect x="84" y="72" width="52" height="78" rx="3" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="rgba(255,255,255,0.02)"/>
                {/* Speaker slot */}
                <rect x="98" y="65" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.1)"/>
                {/* Home indicator */}
                <rect x="99" y="156" width="22" height="3" rx="1.5" fill="rgba(255,255,255,0.1)"/>

                {/* Screen content */}
                {/* Incoming call label */}
                <rect x="92" y="80" width="36" height="3" rx="1" fill="rgba(255,255,255,0.08)"/>
                {/* Caller name */}
                <rect x="88" y="89" width="44" height="5" rx="1.5" fill="rgba(255,255,255,0.12)"/>
                {/* Divider */}
                <line x1="84" y1="102" x2="136" y2="102" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                {/* Answer button */}
                <circle cx="110" cy="124" r="12" fill="rgba(232,101,26,0.12)" stroke="rgba(232,101,26,0.35)" strokeWidth="1"/>
                {/* Phone icon inside button */}
                <path d="M104.5 120.5 C104.5 120.5 106 119 107.5 119.5 C109 120 109.5 121.5 109.5 121.5 C109.5 121.5 110 123 108.5 123.5 C108 123.7 108.5 124.5 109.5 125.5 C110.5 126.5 111.3 127 111.5 126.5 C112 125 113.5 125.5 113.5 125.5 C113.5 125.5 115 126 115.5 127.5 C116 129 114.5 130.5 114.5 130.5 C114.5 130.5 113 132 110.5 130.5 C108 129 105.5 126.5 104.5 124.5 C103.5 122.5 104.5 120.5 104.5 120.5 Z"
                  stroke="rgba(232,101,26,0.6)" strokeWidth="0.8" fill="none"/>

                {/* Pulse ring around button */}
                <circle cx="110" cy="124" r="18" stroke="rgba(232,101,26,0.12)" strokeWidth="1"/>
                <circle cx="110" cy="124" r="24" stroke="rgba(232,101,26,0.06)" strokeWidth="1"/>
              </svg>
            </div>

            <h3
              className="font-['Barlow_Condensed'] uppercase text-white tracking-tight leading-tight mb-3"
              style={{ fontSize: "clamp(26px, 3vw, 38px)" }}
            >
              Aria answers.<br />Patients book.
            </h3>
            <p className="text-[#44444C] leading-relaxed" style={{ fontSize: "15px" }}>
              Every call gets answered. Every lead gets followed up. Every appointment gets booked. You open your calendar and see a full schedule. That is the whole job.
            </p>
          </div>
        </div>

        {/* Bottom rule + stat */}
        <div className="mt-20 md:mt-24 pt-10 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="text-[#3A3A42]" style={{ fontSize: "14px" }}>
            Average time from signup to live system: <span className="text-[#E8651A]">48 hours</span>
          </p>
          <a
            href="https://calendly.com/karmello-koba1ba/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E8651A] hover:bg-[#D45B16] transition-colors duration-200 text-white font-['Space_Grotesk'] font-semibold rounded-full px-7 py-3 text-[15px] self-start sm:self-auto"
          >
            Book a Free Demo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
