import type { Metadata } from "next";
import StarField from "../components/StarField";
import ScrollReveal from "../components/ScrollReveal";
import CalendlyButton from "../components/CalendlyButton";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "Grow Your Revenue — Receptifi",
  description:
    "Done-for-you websites, Google Reviews on autopilot, and Google Business Profile optimization. Guaranteed revenue growth or we work for free.",
};

const GrowCTA = () => (
  <CalendlyButton
    className="btn btn-primary"
    style={{ padding: "14px 32px", fontSize: 15 }}
  >
    Book a Free Growth Call
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </CalendlyButton>
);

export default function GrowPage() {
  return (
    <>
      <div className="ambient" aria-hidden="true" />
      <StarField />
      <ScrollReveal />

      <Nav />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="grow-hero">
        <div className="wrap">
          <div className="eyebrow reveal">
            <span className="dot" />
            Revenue Growth Services
          </div>
          <h1 className="reveal">
            Already handling your calls?<br />
            <span className="grad">Let&apos;s grow your revenue another way.</span>
          </h1>
          <p className="sub reveal">
            We build your online presence, generate 5-star Google reviews, and put your business
            in front of more customers every month — guaranteed results or we work for free.
          </p>
          <div className="reveal" style={{ display: "flex", justifyContent: "center" }}>
            <GrowCTA />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── SERVICES ────────────────────────────────────────── */}
      <section>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="dot" /> What we build for you
            </div>
            <h2>Three services. One goal: more revenue every month.</h2>
          </div>
          <div className="grow-cards">

            {/* Card 1 */}
            <div className="grow-card reveal">
              <div className="ico-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <h3>Done-For-You Website</h3>
              <p>A fast, modern, conversion-focused site built to turn visitors into paying customers.</p>
            </div>

            {/* Card 2 */}
            <div className="grow-card reveal">
              <div className="ico-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3>Google Reviews on Autopilot</h3>
              <p>A proven system that gets your happy customers leaving 5-star reviews without you lifting a finger.</p>
            </div>

            {/* Card 3 */}
            <div className="grow-card reveal">
              <div className="ico-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2C20 17.5 12 22 12 22z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3>Google Business Profile Optimization</h3>
              <p>Rank higher in local search, show up when customers are looking, and drive more calls and walk-ins.</p>
            </div>

          </div>

          {/* Guarantee bar */}
          <div className="guarantee-bar reveal">
            <div className="g-check">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <p>90-day guarantee — measurable revenue growth or we keep working for free.</p>
          </div>

          {/* CTA after cards */}
          <div className="reveal" style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
            <GrowCTA />
          </div>

        </div>
      </section>

      <div className="divider" />

      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <section className="grow-final">
        <div className="wrap">
          <div className="inner reveal">
            <h2>
              Ready to turn your online presence into<br />
              <span className="grad">a revenue machine?</span>
            </h2>
            <p>One free call. No pressure. We&apos;ll map out exactly what growth looks like for your business.</p>
            <GrowCTA />
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
    </>
  );
}
