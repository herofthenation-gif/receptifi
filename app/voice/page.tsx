import type { Metadata } from "next";
import StarField from "../components/StarField";
import ScrollReveal from "../components/ScrollReveal";
import ChatWidget from "../components/ChatWidget";
import CalendlyButton from "../components/CalendlyButton";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "Receptifi Voice — 24/7 AI Receptionist for Dental & Local Businesses",
  description: "Every call answered in 0.3 seconds, 24/7. AI receptionist that books appointments, handles FAQs, and sounds like your real front desk.",
};

const Chk = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function VoicePage() {
  return (
    <>
      <div className="ambient" aria-hidden="true" />
      <StarField />
      <ScrollReveal />
      <Nav />

      {/* ── HERO (Recognition) ──────────────────────────────── */}
      <section className="service-hero">
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            <span className="dot" />
            AI VOICE RECEPTIONIST · RECEPTIFI VOICE
          </div>
          <h1>
            Every missed call is a patient<br />
            <span className="grad">who chose your competitor.</span>
          </h1>
          <p className="sub">
            Receptifi Voice answers every call in 0.3 seconds, 24/7/365 — booking appointments, handling FAQs, and routing calls like a professional receptionist who never takes a day off.
          </p>
          <div className="cta-row">
            <CalendlyButton className="btn btn-primary" style={{ padding: "16px 38px", fontSize: 16 }}>
              Book a Call — Get Voice Set Up →
            </CalendlyButton>
          </div>
          <a href="tel:+19516251893" className="phone-link" style={{ display: "inline-flex", marginTop: 14 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call (951) 625-1893 to hear our AI receptionist live right now →
          </a>
        </div>
      </section>

      {/* ── PAIN ────────────────────────────────────────────── */}
      <section style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Here&apos;s what your phone is costing you right now.</h2>
          </div>
          <div className="pain-grid">
            {[
              { icon: "🌙", text: "Your front desk goes home at 5. Patients call at 7 PM. Voicemail picks up. They never call back." },
              { icon: "⏸️", text: "Your team is with a patient. The phone rings. They can't answer. That's a lost appointment." },
              { icon: "⏱️", text: "A new patient calls to schedule. They're placed on hold. They hang up after 2 minutes. Gone." },
              { icon: "👩‍💼", text: "You're paying a full-time employee to answer phones. They still miss 30% of calls." },
            ].map(({ icon, text }, i) => (
              <div key={i} className="pain-card reveal">
                <span className="pain-icon">{icon}</span>
                <p>&ldquo;{text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESIRE ──────────────────────────────────────────── */}
      <section style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>What your practice looks like with Receptifi Voice.</h2>
          </div>
          <div className="desire-grid">
            {[
              "Every call answered in 0.3 seconds — 24 hours a day, 7 days a week, 365 days a year. No exceptions.",
              "Every appointment booked directly to your calendar. You wake up to a full schedule without lifting a finger.",
              "Patients get a warm, natural voice that sounds like your actual front desk — not a robot, not a menu.",
              "Bilingual support. English and Spanish callers handled fluently in the same call, same quality.",
            ].map((text, i) => (
              <div key={i} className="desire-card reveal">
                <div className="desire-check"><Chk /></div>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="desire-sub reveal">
            <p>This is your front desk — upgraded.</p>
            <CalendlyButton className="btn btn-primary" style={{ padding: "15px 36px", fontSize: 16 }}>
              Book a Call — Get Voice Set Up →
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="dot" /> What Receptifi Voice does
            </div>
            <h2>One AI receptionist. Everything your front desk handles.</h2>
          </div>
          <div className="service-features">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
                title: "0.3s pickup, every time",
                desc: "Answers before the second ring. No hold music, no voicemail, no missed opportunities.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
                title: "Direct calendar booking",
                desc: "Integrates with Dentrix, Open Dental, Google Calendar. Appointments land in your system instantly.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>,
                title: "Insurance verification",
                desc: "Collects member ID, group number, and subscriber info. Hands your team a clean ticket.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>,
                title: "Bilingual (EN + ES)",
                desc: "Switches to fluent Spanish mid-call without missing a beat. One receptionist, two languages.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
                title: "Smart call routing",
                desc: "Warm transfers to your team during hours. Logs tickets and sends summaries when you're closed.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2C20 17.5 12 22 12 22z"/><circle cx="12" cy="10" r="3"/></svg>,
                title: "HIPAA-aware",
                desc: "Encrypted calls and transcripts. Compliance built in from day one, not bolted on later.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div key={i} className="feat reveal">
                <div className="ico-wrap">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ───────────────────────────────────────────── */}
      <section className="trust-section" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>What practices say after 30 days with Receptifi Voice.</h2>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card reveal">
              <div className="testimonial-stat">0 missed</div>
              <p>&ldquo;Before Receptifi, we missed 8–12 calls a day. Now we miss zero. Every single call gets answered.&rdquo;</p>
              <span className="testimonial-placeholder">Dental practice, Southern CA [PLACEHOLDER]</span>
            </div>
            <div className="testimonial-card reveal">
              <div className="testimonial-stat">31 new</div>
              <p>&ldquo;Our AI receptionist booked 31 new patient appointments in month one — without anyone on our team touching the phone.&rdquo;</p>
              <span className="testimonial-placeholder">General dentistry practice [PLACEHOLDER]</span>
            </div>
            <div className="testimonial-card reveal">
              <div className="testimonial-stat">Sounds real</div>
              <p>&ldquo;Patients can&apos;t tell it&apos;s AI. They ask to speak with &lsquo;the girl who helped them last time.&rsquo;&rdquo;</p>
              <span className="testimonial-placeholder">Multi-location dental group [PLACEHOLDER]</span>
            </div>
          </div>
          <div className="trust-cta reveal">
            <p>Ready to stop missing calls?</p>
            <CalendlyButton className="btn btn-primary" style={{ padding: "15px 36px", fontSize: 16 }}>
              Book a Call — Get Started →
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* ── BELIEF ──────────────────────────────────────────── */}
      <section style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>You might be thinking&hellip;</h2>
          </div>
          <div className="objection-grid">
            <div className="objection-card reveal">
              <p className="objection-q">&ldquo;We already have a receptionist.&rdquo;</p>
              <div className="objection-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </div>
              <p className="objection-a">Perfect. Your receptionist handles in-person patients. Receptifi handles the overflow, after-hours, and lunch-break calls they can&apos;t get to. Together, you miss nothing.</p>
            </div>
            <div className="objection-card reveal">
              <p className="objection-q">&ldquo;AI sounds robotic and patients will hate it.&rdquo;</p>
              <div className="objection-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </div>
              <p className="objection-a">Call (951) 625-1893 right now and hear it yourself. Warm, natural, professional. Patients ask to speak with &ldquo;her&rdquo; again.</p>
            </div>
            <div className="objection-card reveal">
              <p className="objection-q">&ldquo;What if it gets something wrong?&rdquo;</p>
              <div className="objection-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </div>
              <p className="objection-a">You review every transcript. It follows your exact script. And anything outside its training gets routed to your team — never dropped.</p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }} className="reveal">
            <CalendlyButton className="btn btn-ghost" style={{ padding: "13px 28px", fontSize: 15 }}>
              Still have questions? Book a call and ask them →
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* ── SAFETY ──────────────────────────────────────────── */}
      <section className="safety-section" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }} className="reveal">
            <h2 className="guarantee-headline">We guarantee results or we keep working for free.</h2>
            <p className="guarantee-sub">
              If you&apos;re not answering more calls and booking more appointments within 90 days, we don&apos;t stop until you are. No contracts. No risk. Just results.
            </p>
          </div>
          <div className="safety-signals reveal">
            {["No long-term contracts", "90-day results guarantee", "Setup handled by our team"].map((s) => (
              <div key={s} className="safety-signal">
                <div className="s-check"><Chk /></div>
                {s}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }} className="reveal">
            <CalendlyButton className="btn btn-primary" style={{ padding: "15px 36px", fontSize: 16 }}>
              Book a Risk-Free Call →
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* ── URGENCY ─────────────────────────────────────────── */}
      <section className="urgency-section">
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }} className="reveal">
            <h2>Every call you miss tonight is a patient you lose forever.</h2>
            <p style={{ fontSize: 18, marginTop: 28, lineHeight: 1.7 }}>
              Patients who hit voicemail don&apos;t leave messages. They Google your competitor and book with them instead. After-hours calls are your highest-intent leads — and right now, 100% of them are hitting a dead end.
            </p>
            <div className="urgency-stat">30% of calls</div>
            <p style={{ fontSize: 15, color: "var(--ink-faint)", marginBottom: 40 }}>
              The average dental office misses 30% of incoming calls. Every one is a patient walking away.
            </p>
            <CalendlyButton className="btn btn-primary" style={{ padding: "15px 36px", fontSize: 16 }}>
              Stop Missing Calls — Book a Call Today →
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* ── LOGIC ───────────────────────────────────────────── */}
      <section style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>The math is simple.</h2>
          </div>
          <div className="logic-steps">
            <div className="logic-step reveal">
              <div className="logic-step-ico">01</div>
              <p>The average new dental patient is worth <strong>$800–$1,500</strong> in lifetime value&hellip;</p>
            </div>
            <div className="logic-step reveal">
              <div className="logic-step-ico">02</div>
              <p>If you miss <strong>10 calls a month</strong> and convert half&hellip;</p>
            </div>
            <div className="logic-step reveal">
              <div className="logic-step-ico">03</div>
              <p>That&apos;s <strong>$4,000–$7,500 in lost revenue</strong> every single month.</p>
            </div>
          </div>
          <div className="logic-conclusion reveal">
            <p>Receptifi Voice costs a fraction of that — and pays for itself with the first two recovered patients.</p>
            <CalendlyButton className="btn btn-primary" style={{ padding: "14px 32px", fontSize: 15 }}>
              Run the math for your practice — Book a Call →
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* ── DECISION ────────────────────────────────────────── */}
      <section className="decision-section">
        <div className="wrap">
          <div className="decision-inner">
            <h2>Your AI receptionist is ready.<br /><span className="grad">Is your practice?</span></h2>
            <p className="sub">
              Every call you don&apos;t answer is a patient you don&apos;t book. Every patient you don&apos;t book is revenue you don&apos;t recover.
            </p>
            <CalendlyButton className="btn btn-primary decision-btn">
              Book Your Call Now →
            </CalendlyButton>
            <p className="decision-phone">
              Or call <a href="tel:+19516251893">(951) 625-1893</a> to hear the AI live right now
            </p>
            <p className="decision-note">
              Takes 30 minutes. No pressure. No obligation. Just answers.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer>
        <div className="wrap">
          <div className="brand">
            <div className="mark" />
            <b>Receptifi</b>
          </div>
          <div className="links">
            <a href="/voice">Voice</a>
            <a href="/web">Web</a>
            <a href="/reviews">Reviews</a>
            <a href="/crm">CRM</a>
            <a href="/demo">Demo</a>
            <a href="#">Privacy</a>
          </div>
          <div>© 2026 Receptifi · All rights reserved</div>
        </div>
      </footer>

      <ChatWidget />
    </>
  );
}
