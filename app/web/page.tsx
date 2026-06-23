import type { Metadata } from "next";
import StarField from "../components/StarField";
import ScrollReveal from "../components/ScrollReveal";
import ChatWidget from "../components/ChatWidget";
import CalendlyButton from "../components/CalendlyButton";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "Receptifi Web — Done-for-You Websites That Rank and Convert",
  description: "A fast, modern website built for local search and converting visitors into booked appointments. Done-for-you, live in 2 weeks.",
};

const Chk = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function WebPage() {
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
            DONE-FOR-YOU WEBSITES · RECEPTIFI WEB
          </div>
          <h1>
            Your website is losing you patients<br />
            <span className="grad">every single day.</span>
          </h1>
          <p className="sub">
            A slow, outdated website doesn&apos;t just fail to convert — it actively sends patients to your competitors. Receptifi Web builds you a fast, modern site that ranks on Google and turns visitors into booked appointments. Done completely for you.
          </p>
          <div className="cta-row">
            <CalendlyButton className="btn btn-primary" style={{ padding: "16px 38px", fontSize: 16 }}>
              Book a Call — See Your New Site →
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* ── PAIN ────────────────────────────────────────────── */}
      <section style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Here&apos;s what your current website is costing you.</h2>
          </div>
          <div className="pain-grid">
            {[
              { icon: "🐌", text: "Your website loads in 4+ seconds on mobile. 53% of visitors leave before it ever loads." },
              { icon: "📄", text: "Someone Googles 'dentist near me.' You're on page 3. Your competitor is on page 1. They get the patient." },
              { icon: "😬", text: "Your website looks like it was built in 2015. Patients assume your practice is the same quality." },
              { icon: "💸", text: "You paid for Google Ads. Visitors clicked. They landed on your site. They left. $50 gone." },
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
            <h2>What your practice looks like with Receptifi Web.</h2>
          </div>
          <div className="desire-grid">
            {[
              "A blazing-fast, mobile-first website that loads in under 2 seconds on any device — no bouncing, no lost patients.",
              "Optimized for local search. You show up when patients Google your specialty + your city. Page 1, not page 3.",
              "A site that actually converts — clear CTAs, easy booking, and trust signals that turn browsers into booked appointments.",
              "You approve the design. We build it. You're live in 2 weeks with zero technical work on your end.",
            ].map((text, i) => (
              <div key={i} className="desire-card reveal">
                <div className="desire-check"><Chk /></div>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="desire-sub reveal">
            <p>Your website should be your best salesperson — working 24/7.</p>
            <CalendlyButton className="btn btn-primary" style={{ padding: "15px 36px", fontSize: 16 }}>
              Book a Call — See What We Build →
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="dot" /> What Receptifi Web includes
            </div>
            <h2>Everything that makes patients choose you.</h2>
          </div>
          <div className="service-features">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
                title: "Mobile-first design",
                desc: "Built for the phone in the patient's hand. Fast, beautiful, and easy to navigate on any screen.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
                title: "Local SEO built in",
                desc: "Keyword-optimized pages for your city, specialty, and services. Structured data for Google rankings.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
                title: "Calendly booking integration",
                desc: "Book-a-call button on every page. Visitors go from landing to booked appointment in 60 seconds.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                title: "Review showcase",
                desc: "Your Google reviews displayed prominently. Social proof front and center, building trust on arrival.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>,
                title: "Analytics dashboard",
                desc: "See exactly how many visitors came, what they looked at, and how many booked — every week.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
                title: "Done for you, start to finish",
                desc: "Design, copywriting, development, hosting. You review and approve. We handle everything else.",
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
            <h2>What happens when local businesses get a real website.</h2>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card reveal">
              <div className="testimonial-stat">23 appts</div>
              <p>&ldquo;Our new website booked 23 appointments in the first month. Our old one booked maybe 2. We should have done this years ago.&rdquo;</p>
              <span className="testimonial-placeholder">Dental practice owner [PLACEHOLDER]</span>
            </div>
            <div className="testimonial-card reveal">
              <div className="testimonial-stat">Page 1</div>
              <p>&ldquo;We went from page 4 on Google to the top 3 results for &lsquo;dentist [city]&rsquo; within 60 days of launching our new site.&rdquo;</p>
              <span className="testimonial-placeholder">Solo dental practice [PLACEHOLDER]</span>
            </div>
            <div className="testimonial-card reveal">
              <div className="testimonial-stat">3.2× ROI</div>
              <p>&ldquo;Our ad spend went from wasted clicks to booked appointments the moment our new site launched. Conversion rate tripled.&rdquo;</p>
              <span className="testimonial-placeholder">Local service business [PLACEHOLDER]</span>
            </div>
          </div>
          <div className="trust-cta reveal">
            <p>Ready for a website that actually works?</p>
            <CalendlyButton className="btn btn-primary" style={{ padding: "15px 36px", fontSize: 16 }}>
              Book a Call — See If You Qualify →
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
              <p className="objection-q">&ldquo;We already have a website.&rdquo;</p>
              <div className="objection-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>
              <p className="objection-a">Having a website and having a website that converts are two very different things. If it&apos;s not booking appointments, it&apos;s costing you money.</p>
            </div>
            <div className="objection-card reveal">
              <p className="objection-q">&ldquo;It sounds expensive.&rdquo;</p>
              <div className="objection-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>
              <p className="objection-a">One additional new patient per month covers the cost of Receptifi Web entirely. Most clients see that in the first two weeks.</p>
            </div>
            <div className="objection-card reveal">
              <p className="objection-q">&ldquo;Building a new site takes forever.&rdquo;</p>
              <div className="objection-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>
              <p className="objection-a">We go from kickoff call to live website in 2 weeks. You review once. We handle design, copy, development, and launch.</p>
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
              If your new website doesn&apos;t generate more booked appointments within 90 days, we keep optimizing at no cost until it does. No contracts. No risk.
            </p>
          </div>
          <div className="safety-signals reveal">
            {["No long-term contracts", "90-day results guarantee", "Done completely by our team"].map((s) => (
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
            <h2>Every day with a bad website is a day you&apos;re invisible on Google.</h2>
            <p style={{ fontSize: 18, marginTop: 28, lineHeight: 1.7 }}>
              Right now, patients are Googling your specialty and city. Your competitor with the fast, modern site is on page 1. You&apos;re on page 3 — or worse. They click. They book. They become loyal patients. All because their website was better than yours.
            </p>
            <div className="urgency-stat">53% bounce rate</div>
            <p style={{ fontSize: 15, color: "var(--ink-faint)", marginBottom: 40 }}>
              53% of mobile visitors leave a site that takes over 3 seconds to load. How fast does yours load?
            </p>
            <CalendlyButton className="btn btn-primary" style={{ padding: "15px 36px", fontSize: 16 }}>
              Fix Your Website — Book a Call Today →
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
              <p>If your website converts even <strong>2 extra patients per month</strong>&hellip;</p>
            </div>
            <div className="logic-step reveal">
              <div className="logic-step-ico">02</div>
              <p>At an average patient value of <strong>$800</strong>&hellip;</p>
            </div>
            <div className="logic-step reveal">
              <div className="logic-step-ico">03</div>
              <p>That&apos;s <strong>$1,600 per month</strong> in additional revenue from your website alone.</p>
            </div>
          </div>
          <div className="logic-conclusion reveal">
            <p>Receptifi Web costs a fraction of that — and the first two extra patients you book pay for the entire thing.</p>
            <CalendlyButton className="btn btn-primary" style={{ padding: "14px 32px", fontSize: 15 }}>
              Run the numbers — Book a Call →
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* ── DECISION ────────────────────────────────────────── */}
      <section className="decision-section">
        <div className="wrap">
          <div className="decision-inner">
            <h2>Your new website is<br /><span className="grad">2 weeks away.</span></h2>
            <p className="sub">
              Every day you wait is another day patients Google you, see an outdated site, and book with your competitor instead.
            </p>
            <CalendlyButton className="btn btn-primary decision-btn">
              Book Your Call Now →
            </CalendlyButton>
            <p className="decision-phone">
              Or call <a href="tel:+19516251893">(951) 625-1893</a> right now
            </p>
            <p className="decision-note">
              Takes 30 minutes. No pressure. No obligation. Just answers.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="brand"><div className="mark" /><b>Receptifi</b></div>
          <div className="links">
            <a href="/voice">Voice</a><a href="/web">Web</a><a href="/reviews">Reviews</a><a href="/crm">CRM</a><a href="/demo">Demo</a><a href="#">Privacy</a>
          </div>
          <div>© 2026 Receptifi · All rights reserved</div>
        </div>
      </footer>

      <ChatWidget />
    </>
  );
}
