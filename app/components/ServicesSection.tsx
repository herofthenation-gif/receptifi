"use client";

import { useState } from "react";

/* ── Service data ─────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    id: "voice",
    num: "01",
    label: "Voice",
    desc: "Aria picks up every inbound call 24/7, qualifies the patient, and books appointments in real time. No voicemail. No missed revenue. No after-hours dead zone.",
    replaces: ["Answering services", "Front desk overflow"],
  },
  {
    id: "web",
    num: "02",
    label: "Web",
    desc: "We build and maintain a fast, conversion-optimized dental site that ranks on Google and turns visitors into booked appointments. Yours in two weeks.",
    replaces: ["Web agencies", "Squarespace", "Outdated practice sites"],
  },
  {
    id: "reviews",
    num: "03",
    label: "Reviews",
    desc: "Review requests go out after every appointment. Google is monitored around the clock. AI-drafted responses go live fast. Your reputation compounds daily.",
    replaces: ["Birdeye", "Podium", "Manual follow-up"],
  },
  {
    id: "crm",
    num: "04",
    label: "CRM",
    desc: "Every patient interaction is captured automatically. Leads move through a pipeline. Follow-ups fire on schedule. Nothing falls through the cracks.",
    replaces: ["Spreadsheets", "Generic CRMs", "Manual tracking"],
  },
] as const;

/* ── Shared icon components ───────────────────────────────────────────────── */

function StarIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleG() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/* ── Mockup: Voice ────────────────────────────────────────────────────────── */

function VoiceMockup() {
  return (
    <div className="flex flex-col flex-1">

      {/* Active call header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-[#141416]">
        <div>
          <div className="flex items-center gap-[7px] mb-[6px]">
            <div className="w-[5px] h-[5px] rounded-full bg-[#E8651A] shadow-[0_0_8px_rgba(232,101,26,0.75)] animate-pulse" />
            <span className="font-['Space_Grotesk'] text-[9px] text-[#E8651A] tracking-[0.18em] uppercase font-semibold">
              Active Call
            </span>
          </div>
          <p className="font-['Barlow_Condensed'] text-white text-[18px] font-bold tracking-wide leading-none">
            James Holloway
          </p>
          <p className="font-['Space_Grotesk'] text-[11px] text-[#2C2C38] mt-[5px]">
            +1 (858) 412-7193 · New Patient Inquiry
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-['Space_Grotesk'] text-[13px] text-[#38384A] font-medium tracking-[0.06em]">01:24</p>
          <p className="font-['Space_Grotesk'] text-[8px] text-[#202028] tracking-[0.12em] uppercase mt-[4px]">Duration</p>
        </div>
      </div>

      {/* Aria speaking row */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-[#141416]">
        <div className="w-7 h-7 rounded-full bg-[#161620] border border-[#222230] flex items-center justify-center shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#B8B8C4]" />
        </div>
        <span className="font-['Space_Grotesk'] text-[9px] text-[#34344A] tracking-[0.15em] uppercase font-medium">
          Aria Speaking
        </span>
        {/* Static waveform */}
        <div className="flex items-end gap-[2px] h-4 ml-auto">
          {[3, 7, 4, 10, 6, 12, 8, 5, 11, 7, 9, 4, 8, 6, 10].map((h, i) => (
            <div
              key={i}
              className="w-[2px] rounded-sm bg-[#B0B0BE] opacity-30"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>

      {/* Live transcript */}
      <div className="flex-1 px-5 py-4 flex flex-col gap-[11px] overflow-hidden">
        <p className="font-['Space_Grotesk'] text-[8px] text-[#1C1C28] tracking-[0.2em] uppercase">
          Live Transcript
        </p>
        {[
          { who: "Caller", text: "Hi, I'm looking to book a cleaning. Do you have anything next week?", bright: false },
          { who: "Aria",   text: "Of course. What days work best for you, Monday through Friday?",     bright: true  },
          { who: "Caller", text: "Monday or Tuesday if possible.",                                       bright: false },
          { who: "Aria",   text: "I have Monday the 30th at 10:00 AM. Shall I book that for you?",      bright: true  },
        ].map(({ who, text, bright }) => (
          <div key={who + text.slice(0, 8)} className="flex gap-[10px]">
            <span
              className={`font-['Space_Grotesk'] text-[8px] tracking-[0.14em] uppercase shrink-0 pt-[2px] w-10 ${
                bright ? "text-[#32324A]" : "text-[#202030]"
              }`}
            >
              {who}
            </span>
            <p
              className={`font-['Space_Grotesk'] text-[12px] leading-[1.5] ${
                bright ? "text-[#404054]" : "text-[#282838]"
              }`}
            >
              {text}
            </p>
          </div>
        ))}
      </div>

      {/* Booking in progress */}
      <div className="mx-5 mb-5 p-3 bg-[#080808] border border-[#161620] rounded-[8px]">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-[11px] h-[11px] rounded-full border border-[#E8651A] border-t-transparent animate-spin shrink-0" />
          <span className="font-['Space_Grotesk'] text-[9px] text-[#4A2812] tracking-[0.14em] uppercase font-semibold">
            Booking in Progress
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { k: "Date", v: "Mon, Jun 30" },
            { k: "Time", v: "10:00 AM"   },
            { k: "Type", v: "New Patient" },
          ].map(({ k, v }) => (
            <div key={k}>
              <p className="font-['Space_Grotesk'] text-[8px] text-[#181826] uppercase tracking-[0.1em]">{k}</p>
              <p className="font-['Space_Grotesk'] text-[11px] text-[#3A3A4C] font-medium mt-[3px]">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mockup: Web ──────────────────────────────────────────────────────────── */

function WebMockup() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      {/* Nested browser chrome */}
      <div className="flex items-center gap-2 px-3 py-[7px] bg-[#080808] border-b border-[#141416] shrink-0">
        <div className="flex gap-[5px]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-[8px] h-[8px] rounded-full bg-[#161620] border border-[#1E1E28]" />
          ))}
        </div>
        <div className="flex-1 mx-2 px-3 py-[4px] rounded-[4px] bg-[#0C0C12] border border-[#161622]">
          <p className="font-['Space_Grotesk'] text-[9px] text-[#24243A] tracking-wide">
            pacificdental.receptifi.net
          </p>
        </div>
      </div>

      {/* Mini dental site */}
      <div className="flex-1 overflow-hidden bg-[#0A0A10]">

        {/* Site nav */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#141418]">
          <p className="font-['Barlow_Condensed'] text-white text-[12px] font-bold tracking-[0.12em] uppercase">
            PacificDental
          </p>
          <div className="flex items-center gap-3">
            {["Services", "About", "Contact"].map((l) => (
              <p key={l} className="font-['Space_Grotesk'] text-[9px] text-[#20203A]">{l}</p>
            ))}
            <div className="px-2 py-[3px] rounded-[3px] bg-[#E8651A]">
              <p className="font-['Space_Grotesk'] text-[8px] text-white font-semibold tracking-wide">Book</p>
            </div>
          </div>
        </div>

        {/* Site hero */}
        <div className="px-4 pt-4 pb-3 border-b border-[#141418]">
          <p className="font-['Space_Grotesk'] text-[8px] text-[#22223A] tracking-[0.18em] uppercase mb-1.5">
            Accepting New Patients
          </p>
          <p className="font-['Barlow_Condensed'] text-white text-[20px] font-black uppercase leading-[0.9]">
            Expert Dental Care<br />in San Diego.
          </p>
          <p className="font-['Space_Grotesk'] text-[10px] text-[#22223A] mt-2 leading-relaxed max-w-[200px]">
            Trusted by 800+ patients. Same-day appointments available.
          </p>
        </div>

        {/* Booking widget */}
        <div className="mx-4 mt-3 p-3 bg-[#07070E] border border-[#14141E] rounded-[8px]">
          <p className="font-['Space_Grotesk'] text-[8px] text-[#20203A] tracking-[0.14em] uppercase mb-2">
            Book an Appointment
          </p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {[
              { label: "Date", val: "Jun 30, 2026" },
              { label: "Time", val: "10:00 AM" },
            ].map(({ label, val }) => (
              <div key={label} className="px-2 py-1.5 bg-[#0C0C18] border border-[#161624] rounded-[4px]">
                <p className="font-['Space_Grotesk'] text-[8px] text-[#1C1C30] uppercase tracking-wider">{label}</p>
                <p className="font-['Space_Grotesk'] text-[11px] text-[#303048] mt-[3px]">{val}</p>
              </div>
            ))}
          </div>
          <div className="w-full py-[7px] bg-[#E8651A] rounded-[4px] text-center">
            <p className="font-['Space_Grotesk'] text-[9px] text-white font-semibold tracking-wide">
              Confirm Appointment
            </p>
          </div>
        </div>

        {/* Google review badge */}
        <div className="flex items-center gap-2 mx-4 mt-3 p-2.5 bg-[#07070E] border border-[#14141E] rounded-[6px]">
          <GoogleG />
          <div className="flex items-center gap-[3px]">
            {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} />)}
          </div>
          <p className="font-['Space_Grotesk'] text-[9px] text-[#26263C]">
            4.9 <span className="text-[#1C1C32]">· 186 Google reviews</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Mockup: Reviews ──────────────────────────────────────────────────────── */

function ReviewsMockup() {
  return (
    <div className="flex flex-col flex-1">

      {/* Stat row */}
      <div className="grid grid-cols-3 border-b border-[#141416] divide-x divide-[#141416] shrink-0">
        {[
          { val: "4.9", label: "Avg Rating"    },
          { val: "186", label: "Total Reviews" },
          { val: "+18", label: "This Month"    },
        ].map(({ val, label }) => (
          <div key={label} className="p-3 text-center">
            <p className="font-['Barlow_Condensed'] text-white text-[24px] font-black leading-none tracking-tight">
              {val}
            </p>
            <p className="font-['Space_Grotesk'] text-[8px] text-[#1C1C28] tracking-[0.14em] uppercase mt-[5px]">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Star bar */}
      <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-[#141416] shrink-0">
        {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} />)}
        <p className="font-['Space_Grotesk'] text-[10px] text-[#28283A] ml-1.5">4.9 out of 5</p>
        <div className="ml-auto px-2 py-[3px] bg-[#081008] border border-[#122012] rounded-full">
          <p className="font-['Space_Grotesk'] text-[8px] text-[#284A28] tracking-[0.12em] uppercase font-semibold">
            Auto-monitored
          </p>
        </div>
      </div>

      {/* Review cards */}
      <div className="flex-1 px-5 py-4 flex flex-col gap-2.5 overflow-hidden">
        {[
          { name: "Sarah M.", initial: "S", time: "2 days ago", text: "Front desk was incredibly helpful. Booked me same day." },
          { name: "Marcus T.", initial: "M", time: "5 days ago", text: "Best dental office I've been to. Clean, fast, professional." },
        ].map(({ name, initial, time, text }) => (
          <div key={name} className="bg-[#080808] border border-[#141416] rounded-[8px] p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#121220] border border-[#1C1C2C] flex items-center justify-center">
                  <span className="font-['Barlow_Condensed'] text-[9px] text-[#28283C] font-bold">{initial}</span>
                </div>
                <p className="font-['Space_Grotesk'] text-[11px] text-[#32324A] font-medium">{name}</p>
              </div>
              <p className="font-['Space_Grotesk'] text-[9px] text-[#181828]">{time}</p>
            </div>
            <div className="flex gap-[3px] mb-1.5">
              {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} />)}
            </div>
            <p className="font-['Space_Grotesk'] text-[11px] text-[#262636] leading-[1.5]">{text}</p>
          </div>
        ))}
      </div>

      {/* AI response draft */}
      <div className="mx-5 mb-5 p-3 bg-[#080808] border border-[#141416] rounded-[8px]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-[7px]">
            <div className="w-[5px] h-[5px] rounded-full bg-[#B0B0C0] animate-pulse" />
            <span className="font-['Space_Grotesk'] text-[9px] text-[#28283C] tracking-[0.14em] uppercase">
              Drafting Response
            </span>
          </div>
          <span className="font-['Space_Grotesk'] text-[9px] text-[#181826]">Tom R. · 3 days ago</span>
        </div>
        <p className="font-['Space_Grotesk'] text-[11.5px] text-[#282838] leading-[1.55]">
          Thank you for the kind words, Tom. We are glad your experience was smooth and look forward to seeing you at your next
          <span className="inline-block w-[2px] h-[12px] bg-[#A0A0B4] ml-[2px] animate-pulse align-middle" />
        </p>
      </div>
    </div>
  );
}

/* ── Mockup: CRM ──────────────────────────────────────────────────────────── */

function CRMMockup() {
  const COLS = [
    {
      label: "New Lead",
      count: 3,
      cards: [
        { name: "James H.",  detail: "Cleaning",      time: "2m ago"  },
        { name: "Rosa P.",   detail: "Implant consult", time: "18m ago" },
        { name: "David K.",  detail: "Emergency",     time: "1h ago"  },
      ],
    },
    {
      label: "Contacted",
      count: 2,
      cards: [
        { name: "Maria S.", detail: "Called Jun 20", time: "" },
        { name: "Kevin L.", detail: "Email Jun 19",  time: "" },
      ],
    },
    {
      label: "Appt Set",
      count: 2,
      cards: [
        { name: "Ann T.",   detail: "Jun 24, 2 PM",   time: "" },
        { name: "Chris R.", detail: "Jun 25, 10 AM",  time: "" },
      ],
    },
    {
      label: "Patient",
      count: 3,
      cards: [
        { name: "Lisa M.",  detail: "Active", time: "" },
        { name: "Omar N.",  detail: "Active", time: "" },
        { name: "Priya S.", detail: "Active", time: "" },
      ],
    },
  ];

  return (
    <div className="flex flex-col flex-1">

      {/* Pipeline progress bar */}
      <div className="flex items-center gap-4 px-5 py-2.5 border-b border-[#141416] shrink-0">
        <p className="font-['Space_Grotesk'] text-[8px] text-[#1C1C28] tracking-[0.18em] uppercase shrink-0">
          Pipeline
        </p>
        <div className="h-[3px] flex-1 bg-[#0E0E14] rounded-full overflow-hidden">
          <div className="h-full bg-[#E8651A] opacity-30 rounded-full" style={{ width: "62%" }} />
        </div>
        <p className="font-['Barlow_Condensed'] text-[#E8651A] text-[13px] font-bold tracking-wide shrink-0">
          10 leads active
        </p>
      </div>

      {/* Kanban columns */}
      <div className="flex-1 grid grid-cols-4 divide-x divide-[#141416] overflow-hidden">
        {COLS.map(({ label, count, cards }) => (
          <div key={label} className="flex flex-col min-w-0">

            {/* Column header */}
            <div className="px-2.5 py-2 border-b border-[#141416] shrink-0">
              <p className="font-['Space_Grotesk'] text-[7px] text-[#1E1E2E] tracking-[0.16em] uppercase truncate">
                {label}
              </p>
              <p className="font-['Barlow_Condensed'] text-[#303044] text-[16px] font-bold leading-none mt-[2px]">
                {count}
              </p>
            </div>

            {/* Cards */}
            <div className="flex-1 p-1.5 flex flex-col gap-1.5 overflow-hidden">
              {cards.map(({ name, detail, time }) => (
                <div key={name} className="bg-[#0B0B12] border border-[#161620] rounded-[5px] p-2">
                  <p className="font-['Space_Grotesk'] text-[10px] text-[#303048] font-medium leading-none truncate">
                    {name}
                  </p>
                  <p className="font-['Space_Grotesk'] text-[9px] text-[#1E1E30] leading-none mt-[5px] truncate">
                    {detail}
                  </p>
                  {time && (
                    <p className="font-['Space_Grotesk'] text-[7.5px] text-[#161626] mt-[3px]">{time}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div className="px-5 py-3 border-t border-[#141416] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-[5px] h-[5px] rounded-full bg-[#4ade80] shadow-[0_0_5px_rgba(74,222,128,0.7)] animate-pulse" />
          <p className="font-['Space_Grotesk'] text-[9px] text-[#1C1C2C] tracking-[0.06em]">
            James H. follow-up sent automatically · 2 min ago
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────────────────────────── */

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleSwitch = (idx: number) => {
    if (idx === active) return;
    setVisible(false);
    setTimeout(() => {
      setActive(idx);
      setVisible(true);
    }, 160);
  };

  const renderMockup = () => {
    switch (active) {
      case 0:  return <VoiceMockup   />;
      case 1:  return <WebMockup     />;
      case 2:  return <ReviewsMockup />;
      default: return <CRMMockup     />;
    }
  };

  return (
    <section className="relative z-[2] bg-[#0A0A0A] py-[clamp(80px,10vw,140px)]">
      <div className="max-w-[1100px] mx-auto px-6">

        {/* ── Section header ──────────────────────────────── */}
        <div className="mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-6 bg-[#1C1C20]" />
            <span className="font-['Space_Grotesk'] text-[10px] font-medium tracking-[0.22em] uppercase text-[#30303A]">
              Four Services. One Agency.
            </span>
          </div>
          <h2
            className="font-['Barlow_Condensed'] font-black uppercase text-white leading-[0.88] tracking-[-0.005em]"
            style={{ fontSize: "clamp(46px, 6.5vw, 96px)" }}
          >
            Everything your front desk
            <br />
            <span className="text-[#36363E]">was supposed to handle.</span>
          </h2>
        </div>

        {/* ── Two-column layout ───────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-5 lg:items-stretch">

          {/* Left: service tab list */}
          <div className="w-full lg:w-[38%] shrink-0 border border-[#161618] rounded-[12px] overflow-hidden bg-[#0C0C0C] divide-y divide-[#161618]">
            {SERVICES.map((svc, i) => {
              const isActive = i === active;
              return (
                <div
                  key={svc.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSwitch(i)}
                  onKeyDown={(e) => e.key === "Enter" && handleSwitch(i)}
                  className={`border-l-2 cursor-pointer select-none transition-colors duration-200 outline-none ${
                    isActive
                      ? "border-l-[#E8651A] bg-[#0F0F0F]"
                      : "border-l-transparent hover:bg-[#0E0E0E]"
                  }`}
                >
                  {/* Tab header row */}
                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-['Space_Grotesk'] text-[10px] font-medium tracking-[0.12em] transition-colors duration-200 ${
                          isActive ? "text-[#E8651A]" : "text-[#20202E]"
                        }`}
                      >
                        {svc.num}
                      </span>
                      <span
                        className={`font-['Barlow_Condensed'] text-[18px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                          isActive ? "text-white" : "text-[#26262E]"
                        }`}
                      >
                        {svc.label}
                      </span>
                    </div>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isActive ? "#E8651A" : "#1C1C28"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                      className={`transition-transform duration-200 shrink-0 ${isActive ? "rotate-90" : ""}`}
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>

                  {/* Accordion body */}
                  <div
                    className={`overflow-hidden transition-all duration-[220ms] ease-out ${
                      isActive ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-5">
                      <p className="font-['Space_Grotesk'] text-[13px] text-[#3E3E4C] leading-[1.65] mb-4">
                        {svc.desc}
                      </p>
                      <div className="flex items-start gap-2.5 flex-wrap">
                        <span className="font-['Space_Grotesk'] text-[8px] text-[#20202C] tracking-[0.16em] uppercase mt-[4px] shrink-0">
                          Replaces
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {svc.replaces.map((r) => (
                            <span
                              key={r}
                              className="font-['Space_Grotesk'] text-[10px] text-[#26263A] bg-[#0A0A0A] border border-[#161624] px-2 py-[3px] rounded-[4px] tracking-wide"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: mockup frame */}
          <div className="flex-1 min-h-[520px] lg:min-h-0">
            <div className="h-full bg-[#0D0D0D] border border-[#1A1A1A] rounded-[12px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)] flex flex-col">

              {/* Chrome bar */}
              <div className="flex items-center justify-between px-5 py-[9px] border-b border-[#141416] bg-[#0A0A0A] shrink-0">
                <div className="flex gap-[6px]">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-[9px] h-[9px] rounded-full bg-[#181818] border border-[#222]" />
                  ))}
                </div>
                <span className="font-['Space_Grotesk'] text-[9px] text-[#202030] tracking-[0.16em] uppercase font-medium">
                  Receptifi {SERVICES[active].label}
                </span>
                <div className="flex items-center gap-[7px]">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#4ade80] shadow-[0_0_6px_rgba(74,222,128,0.8)] animate-pulse" />
                  <span className="font-['Space_Grotesk'] text-[9px] text-[#264A26] tracking-[0.12em] uppercase font-semibold">
                    Live
                  </span>
                </div>
              </div>

              {/* Mockup content with crossfade */}
              <div
                className={`flex-1 flex flex-col overflow-hidden transition-all duration-[160ms] ease-out ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[4px]"
                }`}
              >
                {renderMockup()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
