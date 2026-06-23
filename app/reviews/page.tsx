import type { Metadata } from "next";
import StarField from "../components/StarField";
import ScrollReveal from "../components/ScrollReveal";
import ChatWidget from "../components/ChatWidget";
import CalendlyButton from "../components/CalendlyButton";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "Receptifi Reviews — Automated Google Reviews on Autopilot",
  description: "Turn your happy patients into 5-star Google reviews automatically. 50+ reviews in 60 days without asking a single patient yourself.",
};

const Chk = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function ReviewsPage() {
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
            GOOGLE REVIEWS ON AUTOPILOT · RECEPTIFI REVIEWS
          </div>
          <h1>
            87% of patients choose a business<br />
            <span className="grad">based on reviews. Are yours winning?</span>
          </h1>
          <p className="sub">
            Receptifi Reviews builds your Google reputation automatically — turning every happy patient into a 5-star review without you lifting a finger. No awkward asks. No chasing. It just runs.
          </p>
          <div className="cta-row">
            <CalendlyButton className="btn btn-primary" style={{ padding: "16px 38px", fontSize: 16 }}>
              Book a Call — Start Getting Reviews →
            </CalendlyButton>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 20 }}>
            <Star /><Star /><Star /><Star /><Star />
            <span style={{ marginLeft: 10, fontSize: 14, color: "var(--ink-faint)" }}>Your next 50 reviews are waiting to be asked</span>
          </div>
        </div>
      </section>

      {/* ── PAIN ────────────────────────────────────────────── */}
      <section style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Here&apos;s what your review situation is costing you.</h2>
          </div>
          <div className="pain-grid">
            {[
              { icon: "⭐", text: "A new patient Googles you. They see 12 reviews. Your competitor has 180. They click the competitor." },
              { icon: "😶", text: "You have 50 happy patients this month. You ask zero of them for a review. Your competitor's reputation grows. Yours doesn't." },
              { icon: "😬", text: "One bad review from two years ago sits at the top of your profile. Happy patients never posted. It defines you." },
              { icon: "🙈", text: "You know you should ask for reviews. But it feels awkward. So it never gets done. Month after month." },
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
            <h2>What your practice looks like with Receptifi Reviews.</h2>
          </div>
          <div className="desire-grid">
            {[
              "Every happy patient automatically gets a review request via text or email — at exactly the right moment after their visit.",
              "50+ five-star Google reviews in 60 days. Your profile looks dominant. New patients choose you without hesitation.",
              "One unhappy patient? We identify them first and route their feedback privately — protecting your public reputation.",
              "Your review system runs completely on autopilot. Set it up once. Reviews roll in forever.",
            ].map((text, i) => (
              <div key={i} className="desire-card reveal">
                <div className="desire-check"><Chk /></div>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="desire-sub reveal">
            <p>Your happy patients want to leave reviews. They just need someone to ask them at the right time.</p>
            <CalendlyButton className="btn btn-primary" style={{ padding: "15px 36px", fontSize: 16 }}>
              Book a Call — Start Getting Reviews →
            </CalendlyButton>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="dot" /> What Receptifi Reviews does
            </div>
            <h2>A complete reputation engine — on autopilot.</h2>
          </div>
          <div className="service-features">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                title: "Automated review requests",
                desc: "Text and email requests sent automatically after each visit — at the exact moment patients are most likely to respond.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2C20 17.5 12 22 12 22z"/><circle cx="12" cy="10" r="3"/></svg>,
                title: "Smart sentiment routing",
                desc: "Happy patients get directed to Google. Unhappy patients get directed to your inbox — before they post publicly.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                title: "Google Business optimization",
                desc: "Your profile optimized for maximum visibility. Hours, categories, photos, and posts — all handled.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>,
                title: "Review velocity tracking",
                desc: "Dashboard showing new reviews, response rates, and your star-rating trajectory week over week.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                title: "Multi-location support",
                desc: "Running multiple locations? Receptifi Reviews manages reputation across all of them from one dashboard.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>,
                title: "Website review display",
                desc: "Your best reviews automatically displayed on your website — fresh social proof, always up to date.",
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
            <h2>What happens when local businesses take reviews seriously.</h2>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card reveal">
              <div className="testimonial-stat">12 → 67</div>
              <p>&ldquo;We went from 12 Google reviews to 67 in 6 weeks. New patients now mention our reviews every week when they book.&rdquo;</p>
              <span className="testimonial-placeholder">Dental practice, CA [PLACEHOLDER]</span>
            </div>
            <div className="testimonial-card reveal">
              <div className="testimonial-stat">4.2 → 4.9</div>
              <p>&ldquo;Our star rating went from 4.2 to 4.9 in 90 days. We&apos;re now the highest-rated practice in our city on Google.&rdquo;</p>
              <span className="testimonial-placeholder">Solo practice owner [PLACEHOLDER]</span>
            </div>
            <div className="testimonial-card reveal">
              <div className="testimonial-stat">+28%</div>
              <p>&ldquo;New patient inquiries increased 28% in the 3 months after we started building reviews. People trust us before they even call.&rdquo;</p>
              <span className="testimonial-placeholder">Local service business [PLACEHOLDER]</span>
            </div>
          </div>
          <div className="trust-cta reveal">
            <p>Ready to dominate your local reputation?</p>
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
              <p className="objection-q">&ldquo;We already have some reviews.&rdquo;</p>
              <div className="objection-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>
              <p className="objection-a">&ldquo;Some&rdquo; isn&apos;t winning. If your competitor has 3× more reviews, patients choose them — regardless of quality. Volume and recency both matter.</p>
            </div>
            <div className="objection-card reveal">
              <p className="objection-q">&ldquo;Asking for reviews feels pushy.&rdquo;</p>
              <div className="objection-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>
              <p className="objection-a">You don&apos;t ask — your system does. A well-timed, friendly text after a great appointment isn&apos;t pushy. 70% of patients say they&apos;d leave a review if asked.</p>
            </div>
            <div className="objection-card reveal">
              <p className="objection-q">&ldquo;Won&apos;t fake reviews get us in trouble?&rdquo;</p>
              <div className="objection-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>
              <p className="objection-a">Every review we generate comes from your real patients after their real visit. 100% authentic. 100% compliant with Google&apos;s guidelines.</p>
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
              If you don&apos;t have significantly more Google reviews within 90 days, we keep running your system at no charge until you do. No contracts. No risk.
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
            <h2>While you wait, your competitors are getting more reviews every day.</h2>
            <p style={{ fontSize: 18, marginTop: 28, lineHeight: 1.7 }}>
              Right now, your competitor&apos;s happy patients are getting review requests. They&apos;re clicking. They&apos;re posting. Their rating is climbing. And every new review they get makes it harder for you to catch up. The gap compounds every single day you don&apos;t act.
            </p>
            <div className="urgency-stat">87% of patients</div>
            <p style={{ fontSize: 15, color: "var(--ink-faint)", marginBottom: 40 }}>
              87% of patients read online reviews before choosing a local business. What are they seeing when they look at yours?
            </p>
            <CalendlyButton className="btn btn-primary" style={{ padding: "15px 36px", fontSize: 16 }}>
              Start Building Reviews — Book a Call Today →
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
              <p>If 3 extra patients per month choose you because of your <strong>5-star reputation</strong>&hellip;</p>
            </div>
            <div className="logic-step reveal">
              <div className="logic-step-ico">02</div>
              <p>At an average patient value of <strong>$500</strong>&hellip;</p>
            </div>
            <div className="logic-step reveal">
              <div className="logic-step-ico">03</div>
              <p>That&apos;s <strong>$1,500 per month</strong> in additional revenue — just from looking more trustworthy on Google.</p>
            </div>
          </div>
          <div className="logic-conclusion reveal">
            <p>Receptifi Reviews costs a fraction of that — and pays for itself the moment your first extra patient finds you because of your reviews.</p>
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
            <h2>Your patients are happy.<br /><span className="grad">It&apos;s time the world knew it.</span></h2>
            <p className="sub">
              Every day you wait, your competitor gets another review. Another 5 stars. Another patient who chose them over you.
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
