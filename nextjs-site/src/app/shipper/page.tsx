"use client";
import Link from "next/link";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { asset } from "@/lib/site";

// ─── glass card style ────────────────────────────────────────────────────────
const glass: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: 16,
  backdropFilter: "blur(12px)",
};

// ─── journey steps ────────────────────────────────────────────────────────────
const JOURNEY_STEPS = [
  {
    label: "Gate Release",
    iconPath: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-3.03 2.42Z"/>
        <path d="m7 16.5-4.74-2.85M7 16.5l5-3M7 16.5v5.17M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/>
        <path d="m17 16.5-5-3M17 16.5l4.74-2.85M17 16.5v5.17M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/>
        <path d="M12 8v5M7.97 4.42 12 7l4.03-2.58"/>
      </svg>
    ),
    title: "Gate Release",
    desc: "Container released from terminal after customs clearance. Carrier notified instantly.",
    detail: "You receive: Automatic gate-release alert via SMS & email within 60 seconds.",
  },
  {
    label: "Chassis Hook-Up",
    iconPath: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 3h15v13H1z"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: "Chassis Hook-Up",
    desc: "Carrier picks up chassis and hooks to your container. GPS tracking begins.",
    detail: "You see: Carrier name, truck #, photo ID, and ETA on your tracking dashboard.",
  },
  {
    label: "En Route",
    iconPath: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 2"/>
      </svg>
    ),
    title: "En Route",
    desc: "Live GPS tracking. Exact location, speed, and ETA updated every 2 minutes.",
    detail: "You get: Real-time map view with ETA countdown and delay alerts if any.",
  },
  {
    label: "50 Miles Out",
    iconPath: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    title: "50 Miles Out",
    desc: "Automated alert sent to your warehouse team. Dock door prep time.",
    detail: "Your team gets: 50-mile and 10-mile alerts so your dock is ready.",
  },
  {
    label: "On-Site Delivery",
    iconPath: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "On-Site Delivery",
    desc: "Carrier arrives at your facility. Digital paperwork on their app.",
    detail: "You confirm: Digital arrival timestamp + driver selfie at dock.",
  },
  {
    label: "POD Complete",
    iconPath: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <polyline points="9 15 11 17 15 13"/>
      </svg>
    ),
    title: "POD Complete",
    desc: "Proof of Delivery captured digitally. Invoice auto-generated.",
    detail: "You receive: Signed BOL image, POD document, and payment receipt.",
  },
];

// ─── comparison rows ──────────────────────────────────────────────────────────
type CompRow = { label: string; draygo: string; broker: string; diy: string };
const COMP_ROWS: CompRow[] = [
  { label: "Quote Speed",        draygo: "Under 60 sec",             broker: "2-4 hours",           diy: "1-3 days" },
  { label: "Carrier Vetting",    draygo: "All verified",             broker: "Varies",              diy: "You verify" },
  { label: "Real-Time Tracking", draygo: "Live GPS always",          broker: "Email only",          diy: "None" },
  { label: "Free Days Alerts",   draygo: "Automated",                broker: "Manual",              diy: "None" },
  { label: "Booking Method",     draygo: "Digital one-click",        broker: "Phone+email",         diy: "Phone+fax" },
  { label: "Cost",               draygo: "Market rate",              broker: "+8-15% markup",       diy: "Inconsistent" },
  { label: "Support Hours",      draygo: "24/7",                     broker: "Biz hours",           diy: "None" },
];

const CHECK_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const WARN_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const CROSS_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ─── testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "We moved 500+ containers last year through DrayGo. Zero demurrage charges. Our port costs dropped 22%.",
    name: "Jennifer A.",
    role: "VP Logistics · Chicago, IL",
    stat: "500+ containers/year",
    initials: "JA",
  },
  {
    quote: "The real-time tracking changed everything. Our warehouse team knows exactly when to staff the dock.",
    name: "Robert M.",
    role: "Import Manager · Newark, NJ",
    stat: "200+ containers/year",
    initials: "RM",
  },
  {
    quote: "Quotes in under a minute. We used to spend half a day sourcing carriers. Now it's done before my coffee is cold.",
    name: "Amy L.",
    role: "BCO · Los Angeles, CA",
    stat: "800+ containers/year",
    initials: "AL",
  },
];

// ─── port chips ───────────────────────────────────────────────────────────────
const PORT_CHIPS = [
  "LA/Long Beach", "NY/NJ", "Savannah GA", "Houston TX", "Chicago IL",
  "Seattle WA", "Baltimore MD", "Charleston SC", "Miami FL", "Norfolk VA",
];

// ─── quote calculator data ────────────────────────────────────────────────────
const PORT_BASE_RATES: Record<string, number> = {
  "LA/Long Beach": 1200,
  "NY/NJ": 800,
  "Savannah GA": 1400,
  "Houston TX": 900,
  "Chicago IL": 1300,
  "Seattle WA": 1000,
  "Baltimore MD": 750,
  "Charleston SC": 1100,
  "Miami FL": 850,
  "Norfolk VA": 950,
};

const CONTAINER_MULT: Record<string, number> = {
  "20' Standard": 0.85,
  "40' Standard": 1.0,
  "40' High Cube": 1.1,
  "45' High Cube": 1.25,
  "Reefer 40'": 1.4,
};

const DEST_STATES = [
  "CA", "TX", "NY", "IL", "GA", "FL", "NJ", "PA", "OH", "NC",
  "WA", "VA", "MD", "MA", "AZ", "TN", "MO", "WI", "MN", "CO",
];

// ─── page component ───────────────────────────────────────────────────────────
export default function ShipperPage() {

  // quote calculator
  const [port, setPort] = useState("LA/Long Beach");
  const [container, setContainer] = useState("40' Standard");
  const [destState, setDestState] = useState("CA");
  const [showResult, setShowResult] = useState(false);

  // journey stepper
  const [activeStep, setActiveStep] = useState(0);

  // rate calc logic
  const portRates = PORT_BASE_RATES[port] ?? 1000;
  const containerMult = CONTAINER_MULT[container] ?? 1.0;
  const minRate = Math.round((portRates * containerMult * 0.85) / 50) * 50;
  const maxRate = Math.round((portRates * containerMult * 1.35) / 50) * 50;

  const selectStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    color: "#fff",
    padding: "12px 14px",
    fontSize: 14,
    outline: "none",
    appearance: "none" as const,
    cursor: "pointer",
  };

  return (
    <div style={{ background: "#08192b", color: "#fff", minHeight: "100vh", fontFamily: "system-ui,sans-serif" }}>
      <Nav />

      {/* ══ SECTION 1 — HERO ══════════════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
          <source src={asset("/shipper-hero.mp4")} type="video/mp4" />
        </video>
        {/* overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(105deg, rgba(8,25,43,0.82) 0%, rgba(6,20,58,0.55) 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ maxWidth: 600 }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px",
              borderRadius: 4, background: "rgba(252,11,5,0.16)", border: "1px solid rgba(252,11,5,0.4)",
              marginBottom: 24,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase" }}>For Shippers &amp; BCOs</span>
            </div>
            <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, lineHeight: 1.04, margin: "0 0 20px", color: "#fff" }}>
              Your cargo, port to door &mdash;{" "}
              <span style={{ color: "#fc0b05" }}>On time. Every time.</span>
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, margin: "0 0 36px", maxWidth: 520 }}>
              Instant drayage quotes from 500+ verified carriers. Real-time GPS tracking from gate-out to your dock &mdash; fully transparent, locked rates, 24/7 visibility.
            </p>
            {/* App store buttons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
              <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200" style={{ textDecoration: "none", whiteSpace: "nowrap" }}>
                <svg width="30" height="30" viewBox="0 0 384 512" fill="#fff" className="shrink-0">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <span className="leading-none text-white text-left whitespace-nowrap">
                  <span className="block text-[8.5px] opacity-90">Download on the</span>
                  <span className="block text-[14px] font-semibold tracking-tight">App Store</span>
                </span>
              </a>
              <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200" style={{ textDecoration: "none", whiteSpace: "nowrap" }}>
                <img src={asset("/google-play.png")} alt="" className="h-7 w-auto shrink-0" />
                <span className="leading-none text-white text-left whitespace-nowrap">
                  <span className="block text-[8.5px] uppercase tracking-[0.14em] opacity-90">Get it on</span>
                  <span className="block text-[14px] font-semibold tracking-tight">Google Play</span>
                </span>
              </a>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>&#128230; Built for shippers, BCOs &amp; importers</div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAND ════════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(180deg,#09172a 0%,#060f1e 100%)", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }} className="hero-stats-grid">
          {([
            ["50+", "Port Complexes"],
            ["500+", "Verified Carriers"],
            ["<60s", "Instant Quotes"],
            ["$0", "To Post First Load"],
          ] as [string, string][]).map(([val, lbl], i) => (
            <div key={lbl} style={{ padding: "28px 0", paddingLeft: i === 0 ? 0 : 32, borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>{val}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 8, textTransform: "uppercase" as const, letterSpacing: "0.14em" }}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PRICING SECTION ══════════════════════════════════════════════════ */}
      <section style={{ background: "radial-gradient(ellipse 70% 90% at 15% 50%, rgba(252,11,5,0.13) 0%, transparent 65%), radial-gradient(ellipse 60% 70% at 85% 30%, rgba(252,11,5,0.08) 0%, transparent 55%), #060f1e", padding: "88px 24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-semibold mb-5 rounded" style={{ background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.4)", color: "#fff" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              Simple, transparent pricing
            </div>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 16px" }}>
              Plans built for shippers.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              Every plan includes live load board access, verified carriers, and 48-hour payments. No setup fees.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }} className="pricing-grid-shipper">
            {/* Starter */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fc0b05", marginBottom: 16 }}>Starter</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$0</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For shippers just getting started with drayage.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["3 loads per month","Live load board access","Basic rate calculator","Email support","Standard POD upload","48h payment on delivery"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get Started Free</a>
            </div>
            {/* Shipper — highlighted */}
            <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid #fc0b05", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#fc0b05", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 4, whiteSpace: "nowrap" }}>MOST POPULAR</div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fc0b05", marginBottom: 16 }}>Shipper</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$49</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For shippers and BCOs moving containers regularly.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Unlimited load postings","Instant rate quotes","500+ verified carriers","Container tracking dashboard","Demurrage & per-diem alerts","Dedicated account manager"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "#fc0b05", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Start Free Trial</a>
            </div>
            {/* Growth */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fc0b05", marginBottom: 16 }}>Growth</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$99</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For high-volume shippers scaling across multiple ports.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Everything in Shipper","Multi-port rate comparison","Advanced tracking & alerts","Custom rate contracts","Priority carrier matching","API access"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get Started</a>
            </div>
            {/* Enterprise */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fc0b05", marginBottom: 16 }}>Enterprise</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$199</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For large importers and BCOs with high-volume needs.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Everything in Growth","Dedicated account manager","Custom carrier contracts","Volume rate discounts","Priority port coverage","SLA & uptime guarantee"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SHIPPER BENEFITS ══════════════════════════════════════════════════ */}
      <section style={{ background: "#060d1a", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* header */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fc0b05", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              Benefits
            </div>
            <h2 style={{ fontSize: "clamp(34px,4vw,56px)", fontWeight: 900, color: "#fff", lineHeight: 1.04, margin: "0 0 14px" }}>
              Everything you need,{" "}
              <span style={{ color: "#fc0b05" }}>nothing you don't.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 17, maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
              DrayGo eliminates phone calls, fax machines, and guesswork from drayage shipping.
            </p>
          </div>

          {/* bento top row: hero card + stat tower */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>

            {/* HERO CARD */}
            <div style={{ background: "linear-gradient(135deg, rgba(252,11,5,0.18) 0%, rgba(252,11,5,0.05) 100%)", border: "1.5px solid rgba(252,11,5,0.3)", borderRadius: 20, padding: "44px 48px", position: "relative", overflow: "hidden", minHeight: 340, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ position: "absolute", right: -60, top: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(252,11,5,0.15), transparent 70%)", pointerEvents: "none" }} />
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fc0b05", borderRadius: 99, padding: "3px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", marginBottom: 20 }}>INSTANT QUOTES</div>
                <div style={{ fontSize: "clamp(72px,8vw,96px)", fontWeight: 900, color: "#fff", lineHeight: 0.9, marginBottom: 4 }}>&lt;60s</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Average quote time</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 12px", lineHeight: 1.2 }}>Live rate in under 60 seconds.</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
                  Enter your port, destination, and container type — get a live market rate instantly. No broker callbacks, no email chains. A price you can act on immediately.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div><div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>500+</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 3 }}>Carrier rates</div></div>
                <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }} />
                <div><div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>Live</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 3 }}>Market data</div></div>
                <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }} />
                <div><div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>$0</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 3 }}>Quote fee</div></div>
              </div>
            </div>

            {/* STAT TOWER */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, display: "flex", flexDirection: "column" }}>
              {[
                { val: "98.4%", label: "On-Time Rate" },
                { val: "8 min", label: "Avg Driver Match" },
                { val: "48h", label: "Max Payment Wait" },
              ].map((s, i, arr) => (
                <div key={s.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <div style={{ fontSize: 44, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 8, textAlign: "center" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* bento bottom row: 3 feature cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              { iconPath: '<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>', title: "No Hidden Fees", desc: "The price you see is the price you pay. Fuel surcharges, tolls, and accessorials shown upfront before you confirm." },
              { iconPath: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>', title: "Instant Driver Match", desc: "Book and get a verified, insured driver assigned automatically. No dispatch calls — your container moves while you watch live." },
              { iconPath: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>', title: "Full Visibility Dashboard", desc: "Track every container from gate release to delivery. Demurrage alerts, free day countdowns, and POD — all in one screen." },
            ].map(b => (
              <div key={b.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(252,11,5,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: b.iconPath }} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "14px 0 8px" }}>{b.title}</div>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — FULL-BLEED PHOTO: PORT COVERAGE ══════════════════════ */}
      <section style={{ position: "relative", minHeight: 560 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(8,25,43,0.96) 0%, rgba(8,25,43,0.65) 50%, rgba(8,25,43,0.2) 100%)",
        }} />
        <div style={{
          position: "absolute", left: "5%", top: "50%", transform: "translateY(-50%)",
          maxWidth: 600, padding: "64px",
        }}>
          <p style={{ color: "#fc0b05", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 16px" }}>PORT COVERAGE</p>
          <h2 style={{ fontSize: 42, fontWeight: 900, color: "#fff", margin: "0 0 20px", lineHeight: 1.1 }}>
            50+ Port Complexes.<br />Every Major US Gateway.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: "0 0 32px" }}>
            From LA/Long Beach to New York, Savannah to Seattle &mdash; DrayGo has verified carriers at every major port complex in the US.
          </p>
          {/* Port chips grid 3 cols */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 8, width: "fit-content" }}>
            {PORT_CHIPS.map((chip) => (
              <div key={chip} style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.8)",
                fontSize: 12,
                padding: "6px 12px",
                borderRadius: 6,
                whiteSpace: "nowrap",
              }}>
                {chip}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — QUOTE CALCULATOR ══════════════════════════════════════ */}
      <section id="quote" style={{ background: "#08192b", padding: "96px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ color: "#fc0b05", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 14px" }}>INSTANT QUOTE</p>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, margin: "0 0 12px" }}>Get a Rate Estimate in Seconds</h2>
          </div>

          <div style={{ ...glass, padding: "40px" }}>
            {/* 3 selects side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {/* Port */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Origin Port</label>
                <select
                  value={port}
                  onChange={(e) => { setPort(e.target.value); setShowResult(false); }}
                  style={selectStyle}
                >
                  {Object.keys(PORT_BASE_RATES).map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              {/* Container */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Container Type</label>
                <select
                  value={container}
                  onChange={(e) => { setContainer(e.target.value); setShowResult(false); }}
                  style={selectStyle}
                >
                  <option value="20' Standard">20&apos; Standard</option>
                  <option value="40' Standard">40&apos; Standard</option>
                  <option value="40' High Cube">40&apos; High Cube</option>
                  <option value="45' High Cube">45&apos; High Cube</option>
                  <option value="Reefer 40'">Reefer 40&apos;</option>
                </select>
              </div>
              {/* Dest State */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Destination State</label>
                <select
                  value={destState}
                  onChange={(e) => { setDestState(e.target.value); setShowResult(false); }}
                  style={selectStyle}
                >
                  {DEST_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowResult(true)}
              style={{
                background: "#fc0b05", color: "#fff", fontWeight: 700, fontSize: 15,
                padding: "16px 40px", borderRadius: 12, border: "none", cursor: "pointer",
                width: "100%", marginTop: 24, letterSpacing: "0.02em",
              }}
            >
              Get Estimate
            </button>

            {showResult && (
              <div style={{
                marginTop: 28, borderRadius: 12,
                background: "rgba(252,11,5,0.06)", border: "1px solid rgba(252,11,5,0.5)",
                padding: "32px 28px",
              }}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, textAlign: "center", margin: "0 0 8px" }}>
                  Estimated Rate
                </p>
                <p style={{ fontSize: 52, fontWeight: 900, color: "#fc0b05", textAlign: "center", margin: "0 0 6px", lineHeight: 1 }}>
                  ${minRate.toLocaleString()} &ndash; ${maxRate.toLocaleString()}
                </p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textAlign: "center", margin: "0 0 24px" }}>
                  {container} from {port} to {destState}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
                  {[
                    ["Est. Transit", "4-12 hrs"],
                    ["Free Days", "5 days"],
                    ["Rate Locked", "24 hours"],
                  ].map(([lbl, val]) => (
                    <div key={lbl} style={{
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 10, padding: "14px 12px", textAlign: "center",
                    }}>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", margin: "0 0 5px", textTransform: "uppercase", letterSpacing: "0.09em", fontWeight: 700 }}>{lbl}</p>
                      <p style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>{val}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center", margin: 0 }}>
                  Estimate only. Book on DrayGo for exact carrier pricing.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — CONTAINER JOURNEY ═════════════════════════════════════ */}
      <section style={{ background: "#05101c", padding: "96px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: "#fc0b05", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 14px" }}>HOW IT WORKS</p>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, margin: 0 }}>From Gate Release to Your Dock.</h2>
          </div>

          {/* Step tabs: row of 6 circles connected by line */}
          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 40, overflowX: "auto", paddingBottom: 4 }}>
            {JOURNEY_STEPS.map((step, i) => {
              const done = i < activeStep;
              const active = i === activeStep;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", flex: i < JOURNEY_STEPS.length - 1 ? 1 : "none" }}>
                  <button
                    onClick={() => setActiveStep(i)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                      background: "none", border: "none", cursor: "pointer", padding: "0 4px", flexShrink: 0, minWidth: 60,
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: 14,
                      background: (active || done) ? "#fc0b05" : "rgba(255,255,255,0.08)",
                      border: active
                        ? "2px solid #fc0b05"
                        : done
                        ? "2px solid #fc0b05"
                        : "1px solid rgba(255,255,255,0.2)",
                      color: (active || done) ? "#fff" : "rgba(255,255,255,0.4)",
                      boxShadow: active ? "0 0 0 3px rgba(5,16,28,1), 0 0 0 5px rgba(252,11,5,0.5)" : "none",
                      transition: "all 0.2s",
                    }}>
                      {done ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : (i + 1)}
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: active ? 700 : 500, textAlign: "center", lineHeight: 1.3, whiteSpace: "nowrap",
                      color: active ? "#fc0b05" : done ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.28)",
                      letterSpacing: "0.01em",
                    }}>
                      {step.label}
                    </span>
                  </button>
                  {i < JOURNEY_STEPS.length - 1 && (
                    <div style={{
                      flex: 1, height: 2, minWidth: 10,
                      background: i < activeStep ? "#fc0b05" : "rgba(255,255,255,0.12)",
                      margin: "0 2px", marginBottom: 28, transition: "background 0.3s",
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Active step detail card — max-w-2xl mx-auto */}
          <div style={{ ...glass, padding: 32, maxWidth: 672, margin: "0 auto" }}>
            {/* Large icon */}
            <div style={{
              width: 64, height: 64, borderRadius: 14, marginBottom: 20,
              background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {JOURNEY_STEPS[activeStep].iconPath}
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 10px" }}>
              {JOURNEY_STEPS[activeStep].title}
            </h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>
              {JOURNEY_STEPS[activeStep].desc}
            </p>
            <div style={{
              background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.25)",
              borderRadius: 12, padding: 16, marginTop: 16,
            }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", margin: 0, lineHeight: 1.65 }}>
                {JOURNEY_STEPS[activeStep].detail}
              </p>
            </div>
            {/* Prev / Next */}
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button
                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                disabled={activeStep === 0}
                style={{
                  padding: "10px 22px", borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.18)", background: "transparent",
                  color: activeStep === 0 ? "rgba(255,255,255,0.2)" : "#fff",
                  fontSize: 13, fontWeight: 600, cursor: activeStep === 0 ? "default" : "pointer",
                }}
              >
                &larr; Previous
              </button>
              <button
                onClick={() => setActiveStep((s) => Math.min(JOURNEY_STEPS.length - 1, s + 1))}
                disabled={activeStep === JOURNEY_STEPS.length - 1}
                style={{
                  padding: "10px 22px", borderRadius: 8, border: "none",
                  background: activeStep < JOURNEY_STEPS.length - 1 ? "#fc0b05" : "rgba(255,255,255,0.07)",
                  color: activeStep < JOURNEY_STEPS.length - 1 ? "#fff" : "rgba(255,255,255,0.2)",
                  fontSize: 13, fontWeight: 600, cursor: activeStep < JOURNEY_STEPS.length - 1 ? "pointer" : "default",
                }}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — BENTO GRID ════════════════════════════════════════════ */}
      <section style={{ background: "#08192b", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: "#fc0b05", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 14px" }}>PLATFORM FEATURES</p>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, margin: 0 }}>Everything a Modern Shipper Needs.</h2>
          </div>

          {/* CSS grid: 3 columns 2 rows gap-4 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>

            {/* Cell A: col 1, rows 1-2 — photo card */}
            <div style={{
              gridColumn: "1", gridRow: "1 / 3",
              borderRadius: 16, overflow: "hidden", position: "relative", minHeight: 500,
            }}>
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80')",
                backgroundSize: "cover", backgroundPosition: "center",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, rgba(5,10,24,0) 30%, rgba(5,10,24,0.95) 100%)",
              }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28 }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>Real-Time Container Tracking</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: "0 0 12px", lineHeight: 1.6 }}>
                  Live GPS from gate-out to your dock. Automated ETA alerts.
                </p>
                <span style={{ fontSize: 13, color: "#fc0b05", fontWeight: 600, cursor: "pointer" }}>&rarr; View tracking demo</span>
              </div>
            </div>

            {/* Cell B: col 2, row 1 — glass card */}
            <div style={{
              gridColumn: "2", gridRow: "1",
              ...glass, padding: 32, position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#fc0b05" }} />
              <div style={{
                width: 52, height: 52, borderRadius: 14, marginBottom: 20,
                background: "rgba(252,11,5,0.09)", border: "1px solid rgba(252,11,5,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>Instant Rate Quotes</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>
                Get drayage pricing across every US port in seconds &mdash; no RFQ, no waiting.
              </p>
            </div>

            {/* Cell C: col 3, row 1 — red-tinted glass */}
            <div style={{
              gridColumn: "3", gridRow: "1",
              background: "rgba(252,11,5,0.08)", border: "1px solid rgba(252,11,5,0.2)",
              borderRadius: 16, padding: 32,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, marginBottom: 20,
                background: "rgba(252,11,5,0.15)", border: "1px solid rgba(252,11,5,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>Demurrage Protection</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "0 0 16px" }}>
                Free-day tracking and port congestion alerts. Stop paying per-diem.
              </p>
              <div style={{
                display: "inline-block", background: "rgba(252,11,5,0.18)", border: "1px solid rgba(252,11,5,0.3)",
                borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: "#fc0b05",
              }}>
                Average savings: $2,400/shipment
              </div>
            </div>

            {/* Cell D: col 2, row 2 — photo card ~220px */}
            <div style={{
              gridColumn: "2", gridRow: "2",
              borderRadius: 16, overflow: "hidden", position: "relative", minHeight: 220,
            }}>
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "url('https://images.unsplash.com/photo-1519003300449-424ad0405076?auto=format&fit=crop&w=1920&q=80')",
                backgroundSize: "cover", backgroundPosition: "center",
              }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(5,10,24,0.65)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24 }}>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>500+ Verified Carriers</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0 }}>Every carrier MC/DOT verified</p>
              </div>
            </div>

            {/* Cell E: col 3, row 2 — glass card */}
            <div style={{ gridColumn: "3", gridRow: "2", ...glass, padding: 32 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>48h Carrier Settlement</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "0 0 20px" }}>
                Fast payment = more carriers competing for your loads.
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>Digital Booking</h4>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.6 }}>
                  One-click rate confirmation. No faxes.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — COMPARISON TABLE ══════════════════════════════════════ */}
      <section style={{ background: "#05101c", padding: "96px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: "#fc0b05", fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 14px" }}>THE DRAYGO DIFFERENCE</p>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, margin: 0 }}>DrayGo vs. The Old Way.</h2>
          </div>

          <div style={{ ...glass, overflow: "hidden", borderRadius: 16 }}>
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr" }}>
              <div style={{ padding: "18px 20px", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.07)" }} />
              <div style={{ padding: "18px 14px", textAlign: "center", background: "#fc0b05", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>DrayGo</span>
              </div>
              <div style={{ padding: "18px 14px", textAlign: "center", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>Traditional Broker</span>
              </div>
              <div style={{ padding: "18px 14px", textAlign: "center", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>DIY Direct</span>
              </div>
            </div>
            {/* Data rows */}
            {COMP_ROWS.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
                  borderBottom: i < COMP_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <div style={{ padding: "15px 20px", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center" }}>
                  {row.label}
                </div>
                {/* DrayGo cell — #fc0b05 left border */}
                <div style={{
                  padding: "15px 10px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  borderLeft: "3px solid #fc0b05",
                }}>
                  {CHECK_ICON}
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600, textAlign: "center" }}>{row.draygo}</span>
                </div>
                {/* Broker cell */}
                <div style={{ padding: "15px 10px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  {WARN_ICON}
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.48)", textAlign: "center" }}>{row.broker}</span>
                </div>
                {/* DIY cell */}
                <div style={{ padding: "15px 10px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  {CROSS_ICON}
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>{row.diy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 8 — TESTIMONIALS ══════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "96px 24px" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1545893835-abaa50cbe628?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,10,24,0.9)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 800, color: "#fff", margin: "0 0 12px" }}>Shippers Who Made the Switch.</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", margin: 0 }}>Real results from shippers, BCOs, and importers.</p>
          </div>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: 32,
              }}>
                <div style={{ fontSize: 16, color: "#fbbf24", marginBottom: 16, letterSpacing: 2 }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p style={{ fontSize: 15, color: "#fff", fontStyle: "italic", lineHeight: 1.75, margin: "0 0 24px" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                    background: "#fc0b05",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: 14, color: "#fff",
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 2px", color: "#fff" }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "0 0 4px" }}>{t.role}</p>
                    <div style={{
                      display: "inline-block", background: "rgba(252,11,5,0.18)", border: "1px solid rgba(252,11,5,0.3)",
                      borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700, color: "#fc0b05",
                    }}>
                      {t.stat}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 9 — CTA ═══════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(135deg, #1a0000 0%, #08192b 50%, #06143a 100%)",
        padding: "112px 24px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 800, margin: "0 0 20px", lineHeight: 1.1 }}>
            Move Your First Container Today.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.52)", lineHeight: 1.75, margin: "0 auto 44px", maxWidth: 500 }}>
            Join thousands of shippers and BCOs who trust DrayGo for transparent pricing, verified carriers, and end-to-end visibility on every container move.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="#quote"
              style={{
                background: "#fc0b05", color: "#fff", padding: "16px 44px",
                borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-block",
                boxShadow: "0 4px 28px rgba(252,11,5,0.38)",
              }}
            >
              Get Free Quote
            </Link>
            <a
              href="mailto:sales@draygo.net"
              style={{
                background: "transparent", color: "#fff", padding: "16px 44px",
                borderRadius: 8, fontWeight: 600, fontSize: 16, textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.3)", display: "inline-block",
              }}
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
