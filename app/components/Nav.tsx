"use client";
import CalendlyButton from "./CalendlyButton";

export default function Nav() {
  return (
    <nav className="top">
      <div className="wrap">
        <a href="/" className="brand" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="mark" />
          <b>Receptifi</b>
        </a>
        <div className="nav-links">
          <a href="/voice">Voice</a>
          <a href="/web">Web</a>
          <a href="/reviews">Reviews</a>
          <a href="/crm">CRM</a>
          <a href="/demo">Demo</a>
        </div>
        <div className="nav-cta">
          <CalendlyButton className="btn btn-primary btn-sm">Book a Call</CalendlyButton>
        </div>
      </div>
    </nav>
  );
}
