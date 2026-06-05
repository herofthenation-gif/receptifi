import StarField from "./components/StarField";
import ScrollReveal from "./components/ScrollReveal";
import VoiceBar from "./components/VoiceBar";
import DemoForm from "./components/DemoForm";
import ChatWidget from "./components/ChatWidget";
import CalendlyButton from "./components/CalendlyButton";
import HeroCallButton from "./components/HeroCallButton";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const SmallCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function Home() {
  return (
    <>
      <div className="ambient" aria-hidden="true" />
      <StarField />
      <ScrollReveal />

      {/* ── NAV ────────────────────────────────────────────── */}
      <nav className="top">
        <div className="wrap">
          <div className="brand">
            <div className="mark" />
            <b>Receptifi</b>
          </div>
          <div className="nav-links">
            <a href="#what">Product</a>
            <a href="#insurance">Insurance</a>
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#who">Who it&apos;s for</a>
          </div>
          <div className="nav-cta">
            <a href="#demo" className="btn btn-ghost btn-sm">Sign in</a>
            <CalendlyButton className="btn btn-primary btn-sm">Book a Demo</CalendlyButton>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">
            <span className="dot" />
            AI Voice Receptionist for Service Businesses
          </div>
          <h1>
            Your front desk,<br />
            <span className="grad">upgraded.</span>
          </h1>
          <p className="sub">
            An AI voice receptionist that answers every call, books appointments,
            and handles inquiries — 24 hours a day, 7 days a week. Built for busy
            practice owners and service businesses that can&apos;t afford to miss a call.
          </p>
          <div className="cta-row">
            <CalendlyButton className="btn btn-primary">
              Book a Demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </CalendlyButton>
            <a href="/demo" className="btn btn-ghost">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
              </svg>
              Talk to Our AI
            </a>
          </div>
          <div style={{ marginTop: 8 }}>
            <HeroCallButton />
          </div>

          <VoiceBar />

          <div className="meta">
            <span><span className="check-ico">✓</span>24/7 coverage</span>
            <span><span className="check-ico">✓</span>Books directly to your calendar</span>
            <span><span className="check-ico">✓</span>2-week setup</span>
          </div>

          {/* Phone mockup */}
          <div className="stage">
            <div className="chip c1">
              <div className="ico blue">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div><b>Call answered</b><span>0.3s pickup</span></div>
            </div>
            <div className="chip c2">
              <div className="ico green">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <div><b>Appointment booked</b><span>Tues 2:30 PM</span></div>
            </div>
            <div className="chip c3">
              <div className="ico purple">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div><b>Bilingual</b><span>English · Español</span></div>
            </div>
            <div className="phone">
              <div className="notch" />
              <div className="screen">
                <div className="phone-top">
                  <span>9:41</span>
                  <span>Receptifi · Live</span>
                </div>
                <div className="call-card">
                  <div className="row">
                    <div className="av">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                      </svg>
                    </div>
                    <div>
                      <div className="name">Incoming patient</div>
                      <div className="sub">+1 (415) 555·0192</div>
                    </div>
                    <div className="live"><i />LIVE</div>
                  </div>
                </div>
                <div className="msgs">
                  <div className="msg ai">Hi, this is the office of Dr. Chen — how can I help you today?</div>
                  <div className="msg user">My filling fell out, I need an appointment ASAP.</div>
                  <div className="msg ai">I&apos;m sorry to hear that. I have an opening tomorrow at 2:30 PM, or today at 4:15 PM. Which works?</div>
                  <div className="msg user">Today at 4:15 please.</div>
                  <div className="msg ai">Booked. You&apos;ll get a text confirmation in a moment.</div>
                </div>
                <div className="booking">
                  <div className="check">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>Appointment booked · Today 4:15 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── WHAT WE DO ──────────────────────────────────────── */}
      <section id="what">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="dot" /> What we do
            </div>
            <h2>An AI receptionist that actually sounds like one.</h2>
            <p>Receptifi answers every call with a natural, professional voice — handling scheduling, FAQs, and overflow, so your team can focus on the people in front of them.</p>
          </div>
          <div className="features">
            <div className="feat reveal">
              <div className="ico-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3>Answers in 0.3 seconds</h3>
              <p>Every call, every time. Receptifi picks up before the second ring — no hold music, no voicemail, no walk-aways.</p>
            </div>
            <div className="feat reveal">
              <div className="ico-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                </svg>
              </div>
              <h3>Books directly to your calendar</h3>
              <p>Integrates with Dentrix, Open Dental, Google Calendar, and others. Appointments land in your existing system instantly.</p>
            </div>
            <div className="feat reveal">
              <div className="ico-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>Handles real conversations</h3>
              <p>Intake questions, pricing, hours, directions, reservations, follow-ups. Trained on your business — not a generic script.</p>
            </div>
            <div className="feat reveal">
              <div className="ico-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h4l3-9 4 18 3-9h4" />
                </svg>
              </div>
              <h3>Sounds human, not robotic</h3>
              <p>Warm, professional tone — with pauses, intonation, and the ability to clarify when callers ramble or interrupt.</p>
            </div>
            <div className="feat reveal">
              <div className="ico-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
                </svg>
              </div>
              <h3>Bilingual, on request</h3>
              <p>Switches to fluent Spanish mid-call — without breaking stride. One receptionist, two languages, zero training.</p>
            </div>
            <div className="feat reveal">
              <div className="ico-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2C20 17.5 12 22 12 22z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3>Secure by design</h3>
              <p>Encrypted calls and transcripts, HIPAA-aware for healthcare, PCI-aware for payments. Compliance from day one — not bolted on later.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSURANCE VERIFICATION ──────────────────────────── */}
      <section id="insurance">
        <div className="wrap">
          <div className="insure">
            <div className="insure-pitch reveal">
              <div className="eyebrow"><span className="dot" /> Beyond booking</div>
              <h2 style={{ marginTop: 22, marginBottom: 18 }}>
                From appointment booking to{" "}
                <span className="grad">insurance verification</span> — Receptifi handles it all.
              </h2>
              <p className="lead">
                When a caller asks about coverage, Receptifi doesn&apos;t punt to voicemail. It collects the provider,
                member ID, and group number, confirms what happens next, and either warm-transfers to your staff or logs
                a ticket for your team to follow up — all in the same call.
              </p>
              <div className="insure-grid">
                <div className="insure-card">
                  <div className="ico">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h4>Collects the right details</h4>
                  <p>Provider, member ID, group number, date of birth, subscriber name — captured cleanly and read back to confirm.</p>
                </div>
                <div className="insure-card">
                  <div className="ico">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <h4>Confirms next steps</h4>
                  <p>Tells the caller exactly when to expect a verification callback, so no one is left wondering.</p>
                </div>
                <div className="insure-card">
                  <div className="ico">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" />
                    </svg>
                  </div>
                  <h4>Routes intelligently</h4>
                  <p>Warm-transfers to the right team member during business hours, or logs a ticket for follow-up if you&apos;re closed.</p>
                </div>
                <div className="insure-card">
                  <div className="ico">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" />
                    </svg>
                  </div>
                  <h4>Hands you a clean record</h4>
                  <p>Structured ticket lands in your inbox with caller info, insurance details, and full transcript — ready for verification.</p>
                </div>
              </div>
            </div>

            {/* Demo card */}
            <div className="demo reveal">
              <div className="demo-hd">
                <div className="av">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                  </svg>
                </div>
                <div className="nm">
                  <b>Receptifi · Insurance inquiry</b>
                  <span>Call from +1 (415) 555-0118 · 0:42</span>
                </div>
                <div className="tag"><i />LIVE</div>
              </div>
              <div className="demo-msgs">
                <div className="dmsg user">Hi, do you take Delta Dental?</div>
                <div className="dmsg ai">Yes, we accept Delta Dental. I can take down your information and have our insurance coordinator verify your coverage and benefits — would that work?</div>
                <div className="dmsg user">Sure. My member ID is W-58231904, group 1124.</div>
                <div className="dmsg ai">Got it — <strong>W-58231904</strong>, group <strong>1124</strong>. Can I have your full name and date of birth?</div>
                <div className="dmsg user">Sarah Mitchell, May 14, 1989.</div>
                <div className="dmsg ai">Perfect. Our coordinator will verify your benefits and call you back within one business day at this number. Anything else I can help with?</div>
              </div>
              <div className="demo-record">
                <div className="row">
                  <div className="ico">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <b>Ticket created · Sent to Insurance Coordinator</b>
                </div>
                <dl>
                  <dt>Patient</dt><dd>Sarah Mitchell · 05/14/1989</dd>
                  <dt>Provider</dt><dd>Delta Dental PPO</dd>
                  <dt>Member ID</dt><dd>W-58231904</dd>
                  <dt>Group</dt><dd>1124</dd>
                  <dt>Callback</dt><dd>+1 (415) 555-0118</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────── */}
      <section id="who">
        <div className="wrap">
          <div className="who">
            <div className="reveal">
              <div className="eyebrow" style={{ marginBottom: 20 }}>
                <span className="dot" /> Who it&apos;s for
              </div>
              <h2>Built for service businesses that can&apos;t afford to miss a call.</h2>
              <p>The average service business misses roughly 30% of incoming calls. Every missed call is a lost customer — and most won&apos;t call back.</p>
              <p>Receptifi handles the overflow when your front desk is on another line, the after-hours inquiries, the lunch-break gap, and the new-customer questions that arrive at 9 PM.</p>
              <ul className="who-list">
                <li>
                  <div className="tick"><SmallCheck /></div>
                  <div><b>Dental practices.</b> Our primary focus today — solo, group, specialist and DSO, with deep dental workflows out of the box.</div>
                </li>
                <li>
                  <div className="tick"><SmallCheck /></div>
                  <div><b>Restaurants &amp; hospitality.</b> Reservations, hours, dietary questions, waitlist — handled before the host can pick up.</div>
                </li>
                <li>
                  <div className="tick"><SmallCheck /></div>
                  <div><b>Salons, spas &amp; other service businesses.</b> Bookings, pricing, intake — Receptifi adapts to your script.</div>
                </li>
              </ul>
              <div className="future">
                <span className="future-ico">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </span>
                Dental-first today — expanding to restaurants, salons and beyond.
              </div>
            </div>

            <div className="vis reveal">
              <div className="core">
                <div className="pulse">
                  <div className="r" /><div className="r" /><div className="r" />
                  <div className="core-dot">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="stat s1"><b>30%</b><span>Calls missed without AI</span></div>
              <div className="stat s2"><b>24/7</b><span>Always-on coverage</span></div>
              <div className="stat s3"><b>0.3s</b><span>Average pickup time</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="how">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="dot" /> How it works
            </div>
            <h2>Three steps. No engineers required.</h2>
            <p>Forward your line. Train Receptifi on your office in a 20-minute call. Go live.</p>
          </div>
          <div className="steps">
            <div className="step reveal">
              <div className="num">01</div>
              <div className="ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3>Call comes in</h3>
              <p>Your existing business number forwards to Receptifi after hours, when busy, or always — your choice.</p>
            </div>
            <div className="step reveal">
              <div className="num">02</div>
              <div className="ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h4l3-9 4 18 3-9h4" />
                </svg>
              </div>
              <h3>AI answers naturally</h3>
              <p>Receptifi greets the caller by your business name, listens, and handles the conversation — scheduling, FAQs, or routing to you.</p>
            </div>
            <div className="step reveal">
              <div className="num">03</div>
              <div className="ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3>Appointment booked</h3>
              <p>It writes directly to your scheduling system — practice management software, reservation platform, or calendar. You wake up to a full book.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────── */}
      <section id="pricing">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="dot" /> Pricing
            </div>
            <h2>Simple, transparent pricing.</h2>
            <p>One flat monthly rate. Unlimited calls. No setup fees, no per-minute surprises.</p>
          </div>
          <div className="pricing">
            {/* Standard */}
            <div className="plan reveal">
              <h3>Standard</h3>
              <div className="price"><b>$497</b><span>/ month</span></div>
              <div className="pitch">A full-time AI receptionist that never sleeps, never calls in sick, and never puts a patient on hold.</div>
              <ul>
                {[
                  "24/7 AI voice receptionist",
                  "Unlimited inbound calls",
                  "Direct calendar integration",
                  "Insurance verification intake",
                  "SMS confirmations & reminders",
                  "Call transcripts & summaries",
                  "HIPAA-compliant infrastructure",
                ].map((f) => (
                  <li key={f}>
                    <div className="check"><CheckIcon /></div>{f}
                  </li>
                ))}
              </ul>
              <a href="#demo" className="btn btn-ghost">Get Started</a>
            </div>

            {/* Bilingual */}
            <div className="plan pro reveal">
              <div className="plan-badge">Most popular</div>
              <h3>Bilingual</h3>
              <div className="price"><b>$679</b><span>/ month</span></div>
              <div className="pitch">Everything in Standard, plus a fluent English/Spanish receptionist that switches mid-call.</div>
              <ul>
                {[
                  "Everything in Standard",
                  "Bilingual English/Spanish voice",
                  "Auto language detection",
                  "Bilingual SMS templates",
                  "Priority onboarding",
                  "Dedicated success manager",
                ].map((f) => (
                  <li key={f}>
                    <div className="check"><CheckIcon /></div>{f}
                  </li>
                ))}
              </ul>
              <CalendlyButton className="btn btn-primary">
                Book a Demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </CalendlyButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK A DEMO ──────────────────────────────────────── */}
      <section className="final" id="demo">
        <div className="wrap">
          <div className="inner reveal">
            <h2>
              Every missed call is a customer<br />
              <span className="grad">walking to your competitor.</span>
            </h2>
            <p>See Receptifi answer a real call in under 10 minutes. No commitment. No credit card.</p>
            <DemoForm />
            <div className="urgency">
              <span className="d" />
              Onboarding slots for June 2026 are filling fast
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer>
        <div className="wrap">
          <div className="brand">
            <div className="mark" />
            <b>Receptifi</b>
          </div>
          <div className="links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
            <a href="#">Contact</a>
          </div>
          <div>© 2026 Receptifi · All rights reserved</div>
        </div>
      </footer>

      {/* ── CHAT WIDGET ──────────────────────────────────────── */}
      <ChatWidget />
    </>
  );
}
