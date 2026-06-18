"use client";
import Link from "next/link";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { asset } from "@/lib/site";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface LaneEntry {
  port: string;
  region: string;
  range: string;
  transit: string;
  trend: string;
  trendUp: boolean;
  bars: number[];
  hot: { name: string; rate: string }[];
}

interface Testimonial {
  initials: string;
  name: string;
  role: string;
  location: string;
  stat: string;
  quote: string;
}

/* ─── Lane data ──────────────────────────────────────────────────────────── */
const LANES: LaneEntry[] = [
  {
    port: "LA / Long Beach",
    region: "Southern California",
    range: "$1,200–$2,800",
    transit: "3–8 hrs",
    trend: "+4.2%",
    trendUp: true,
    bars: [55, 70, 62, 85, 78],
    hot: [
      { name: "APM → Ontario", rate: "$1,850" },
      { name: "Trapac → Fontana", rate: "$2,100" },
      { name: "TTI → Riverside", rate: "$1,950" },
    ],
  },
  {
    port: "NY / NJ",
    region: "Northeast",
    range: "$650–$1,400",
    transit: "1–4 hrs",
    trend: "+1.8%",
    trendUp: true,
    bars: [60, 45, 72, 58, 65],
    hot: [
      { name: "Maher → Newark", rate: "$850" },
      { name: "APM → Jersey City", rate: "$920" },
      { name: "GCT → Elizabeth", rate: "$780" },
    ],
  },
  {
    port: "Savannah",
    region: "Southeast",
    range: "$900–$2,400",
    transit: "2–10 hrs",
    trend: "+6.1%",
    trendUp: true,
    bars: [40, 55, 48, 70, 90],
    hot: [
      { name: "Garden City → Atlanta", rate: "$2,200" },
      { name: "Ocean Terminal → Augusta", rate: "$1,450" },
      { name: "Garden City → Charlotte", rate: "$2,800" },
    ],
  },
  {
    port: "Houston",
    region: "Gulf Coast",
    range: "$750–$1,800",
    transit: "1–6 hrs",
    trend: "-0.9%",
    trendUp: false,
    bars: [72, 65, 55, 60, 52],
    hot: [
      { name: "Bayport → Pasadena", rate: "$1,100" },
      { name: "Barbours Cut → Houston", rate: "$980" },
      { name: "Bayport → San Antonio", rate: "$1,750" },
    ],
  },
  {
    port: "Chicago",
    region: "Midwest",
    range: "$1,100–$3,200",
    transit: "2–8 hrs",
    trend: "+2.3%",
    trendUp: true,
    bars: [50, 62, 75, 68, 80],
    hot: [
      { name: "BNSF Alliance → Indianapolis", rate: "$1,750" },
      { name: "CN Intermodal → Detroit", rate: "$2,200" },
      { name: "UP Yard → Milwaukee", rate: "$1,100" },
    ],
  },
  {
    port: "Seattle",
    region: "Pacific Northwest",
    range: "$850–$2,100",
    transit: "2–7 hrs",
    trend: "+3.7%",
    trendUp: true,
    bars: [45, 58, 50, 72, 66],
    hot: [
      { name: "SSA T-18 → Tacoma", rate: "$980" },
      { name: "Husky → Portland", rate: "$1,600" },
      { name: "SSA → Spokane", rate: "$2,050" },
    ],
  },
];

const LANE_TABS = ["LA / Long Beach", "NY / NJ", "Savannah", "Houston", "Chicago", "Seattle"];

/* ─── Testimonials ───────────────────────────────────────────────────────── */
const TESTIMONIALS: Testimonial[] = [
  {
    initials: "M",
    name: "Marcus T.",
    role: "Senior Broker",
    location: "Houston, TX",
    stat: "120 loads/month",
    quote:
      "DrayGo cut our average booking time from 2 hours to under 8 minutes. We book twice the loads with the same team.",
  },
  {
    initials: "S",
    name: "Sarah K.",
    role: "Operations Manager",
    location: "Atlanta, GA",
    stat: "340 loads/month",
    quote:
      "Finally a platform that shows real carrier capacity. No more calling 20 carriers to find one truck.",
  },
  {
    initials: "D",
    name: "David R.",
    role: "Freight Broker",
    location: "Los Angeles, CA",
    stat: "65 loads/month",
    quote:
      "The margin dashboard alone is worth it. I know exactly which lanes are profitable before I quote a shipper.",
  },
];

/* ─── Shared style helpers ───────────────────────────────────────────────── */
const glass: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: 16,
  backdropFilter: "blur(12px)",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        color: "#00a5e7",
        fontSize: 11,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        marginBottom: 12,
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
}

function fmt(n: number): string {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function BrokerPage() {
  const [grossRate, setGrossRate] = useState(2200);
  const [carrierCost, setCarrierCost] = useState(1750);
  const [activeLane, setActiveLane] = useState(0);

  const netMargin = grossRate - carrierCost;
  const marginPct = grossRate > 0 ? (netMargin / grossRate) * 100 : 0;
  const monthlyEst = netMargin * 20;

  const marginColor =
    marginPct >= 20
      ? "#22c55e"
      : marginPct >= 12
      ? "#00a5e7"
      : marginPct >= 8
      ? "#f59e0b"
      : "#ef4444";

  const barWidth = `${Math.min((marginPct / 30) * 100, 100)}%`;

  const lane = LANES[activeLane];

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <Nav logoSrc={asset("/logo-broker-blue.png")} />

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <video autoPlay muted loop playsInline src={asset("/broker-hero.mp4")}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(8,25,43,0.88) 0%, rgba(6,20,58,0.60) 100%)", zIndex: 1 }} />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col" style={{ maxWidth: 600 }}>
            {/* badge */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 text-[11px] font-semibold mb-5"
              style={{ borderRadius: 4, background: "rgba(0,165,231,0.16)", border: "1px solid rgba(0,165,231,0.4)", color: "#fff" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00a5e7", display: "inline-block" }} />
              For Freight Brokers
            </div>

            <h1 className="text-white font-extrabold leading-[1.03]" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Source drayage capacity —{" "}
              <span style={{ color: "#00a5e7" }}>Faster. Smarter.</span>
            </h1>

            <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-xl leading-relaxed">
              DrayGo connects freight brokers to 500+ vetted drayage carriers across every major US port complex. Real rates, real capacity, real-time.
            </p>

            <div className="mt-8 flex gap-2.5 flex-wrap">
              <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200" style={{ textDecoration: "none", whiteSpace: "nowrap" }}>
                <svg width="30" height="30" viewBox="0 0 384 512" fill="#fff" className="shrink-0"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] opacity-90">Download on the</span><span className="block text-[14px] font-semibold tracking-tight">App Store</span></span>
              </a>
              <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200" style={{ textDecoration: "none", whiteSpace: "nowrap" }}>
                <img src={asset("/google-play.png")} alt="" className="h-7 w-auto shrink-0" />
                <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] uppercase tracking-[0.14em] opacity-90">Get it on</span><span className="block text-[14px] font-semibold tracking-tight">Google Play</span></span>
              </a>
            </div>

            <div className="mt-5 text-[12px] text-white/55">
              🤝 Built for freight brokers &amp; 3PLs
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: STATS BAND ────────────────────────────────────────── */}
      <section style={{ background: "#00a5e7", padding: "44px 24px" }}>
        <div
          className="stats-band-inner"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            textAlign: "center",
          }}
        >
          {[
            { val: "$2.4M+", label: "Brokered Monthly" },
            { val: "8 min", label: "Avg Booking Time" },
            { val: "500+", label: "Vetted Carriers" },
            { val: "12-18%", label: "Avg Broker Margin" },
          ].map((s) => (
            <div key={s.val}>
              <div
                style={{
                  fontSize: "clamp(28px, 4vw, 44px)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.75)",
                  marginTop: 6,
                  fontWeight: 500,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING SECTION ─────────────────────────────────────────────── */}
      <section style={{ background: "#060f1e", padding: "88px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-semibold mb-5 rounded" style={{ background: "rgba(0,165,231,0.14)", border: "1px solid rgba(0,165,231,0.4)", color: "#fff" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00a5e7", display: "inline-block" }} />
              Simple, transparent pricing
            </div>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 16px" }}>
              Plans built for brokers.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              Every plan includes live load board access, 500+ verified carriers, and real-time rate intelligence.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="pricing-grid-broker">
            {/* Starter */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#27b30a", marginBottom: 16 }}>Starter</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 52, fontWeight: 900, color: "#fff", lineHeight: 1 }}>$0</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>forever</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 28, lineHeight: 1.5 }}>For brokers just getting started on DrayGo.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12 }}>
                {["Up to 5 loads/month","Live load board access","Basic rate calculator","Email support","Standard BOL upload"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "rgba(255,255,255,0.8)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "12px 0", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get Started Free</a>
            </div>
            {/* Broker — highlighted */}
            <div style={{ background: "rgba(0,165,231,0.07)", border: "2px solid #00a5e7", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#00a5e7", color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 99, whiteSpace: "nowrap" }}>BEST FOR YOU</div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00a5e7", marginBottom: 16 }}>Broker</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 52, fontWeight: 900, color: "#fff", lineHeight: 1 }}>$149</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>per month</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 28, lineHeight: 1.5 }}>For freight brokers sourcing drayage capacity at scale.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12 }}>
                {["Full carrier network access","Multi-load management","Lane rate intelligence","Digital BOL & rate con","Margin reporting per load","API access (coming soon)"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "rgba(255,255,255,0.9)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00a5e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "12px 0", borderRadius: 8, background: "#00a5e7", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Start Free Trial</a>
            </div>
            {/* Enterprise */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00a5e7", marginBottom: 16 }}>Enterprise</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 52, fontWeight: 900, color: "#fff", lineHeight: 1 }}>Custom</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 28, lineHeight: 1.5 }}>For large brokerages and 3PLs with dedicated support needs.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12 }}>
                {["Everything in Broker","Dedicated account manager","Custom carrier contracts","Volume rate discounts","White-label options","SLA & uptime guarantee"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "rgba(255,255,255,0.8)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00a5e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "12px 0", borderRadius: 8, border: "1.5px solid rgba(0,165,231,0.5)", color: "#00a5e7", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BROKER BENEFITS ──────────────────────────────────────────────── */}
      <section style={{ background: "#060d1a", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,165,231,0.12)", border: "1px solid rgba(0,165,231,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00a5e7", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00a5e7", display: "inline-block" }} />
              Benefits
            </div>
            <h2 style={{ fontSize: "clamp(34px,4vw,56px)", fontWeight: 900, color: "#fff", lineHeight: 1.04, margin: "0 0 14px" }}>
              Source faster. Protect margins.{" "}
              <span style={{ color: "#00a5e7" }}>Never miss a free day.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 17, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
              Instant access to the closest vetted drivers, live demurrage alerts, and a 500+ carrier network — all in one platform.
            </p>
          </div>

          {/* bento top row */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
            {/* HERO CARD */}
            <div style={{ background: "linear-gradient(135deg, rgba(0,165,231,0.18) 0%, rgba(0,165,231,0.05) 100%)", border: "1.5px solid rgba(0,165,231,0.3)", borderRadius: 20, padding: "44px 48px", position: "relative", overflow: "hidden", minHeight: 340, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ position: "absolute", right: -60, top: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,165,231,0.15), transparent 70%)", pointerEvents: "none" }} />
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#00a5e7", borderRadius: 99, padding: "3px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", marginBottom: 20 }}>AVOID DEMURRAGE</div>
                <div style={{ fontSize: "clamp(72px,8vw,96px)", fontWeight: 900, color: "#fff", lineHeight: 0.9, marginBottom: 4 }}>$0</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Surprise demurrage fees</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 12px", lineHeight: 1.2 }}>Never pay a surprise demurrage fee.</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
                  DrayGo tracks every container's free-day clock in real time and alerts you before detention kicks in — then books the nearest available driver instantly to protect your margins.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div><div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>Live</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 3 }}>Free-day tracking</div></div>
                <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }} />
                <div><div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>Auto</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 3 }}>Detention alerts</div></div>
                <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }} />
                <div><div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>&lt;8 min</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 3 }}>Driver booked</div></div>
              </div>
            </div>

            {/* STAT TOWER */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, display: "flex", flexDirection: "column" }}>
              {[
                { val: "500+", label: "Vetted Carriers" },
                { val: "12–18%", label: "Avg Broker Margin" },
                { val: "8 min", label: "Avg Booking Time" },
              ].map((s, i, arr) => (
                <div key={s.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <div style={{ fontSize: 44, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 8, textAlign: "center" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* bento bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              { iconPath: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>', title: "Closest Driver to Terminal", desc: "See which carriers are physically nearest to the terminal right now. Book the fastest, most competitive move for your shipper — every time." },
              { iconPath: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>', title: "500+ Carrier Network", desc: "The largest vetted drayage carrier network across every major US port. Pre-screened, insured, and rated by brokers like you." },
              { iconPath: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>', title: "Margin Intelligence", desc: "Real-time lane rate benchmarks so you always know your spread before you quote. Never leave money on the table again." },
            ].map(b => (
              <div key={b.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(0,165,231,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00a5e7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: b.iconPath }} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "14px 0 8px" }}>{b.title}</div>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE BROKER EDGE — FULL-WIDTH PHOTO SPLIT ─────────── */}
      <section style={{ background: "#08192b" }}>
        <div
          className="broker-split"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          {/* Left half — photo */}
          <div style={{ position: "relative", minHeight: 600, overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(8,25,43,0.1) 0%, rgba(8,25,43,0.85) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "48px 40px",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(22px, 2.5vw, 36px)",
                  fontStyle: "italic",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.25,
                  marginBottom: 12,
                }}
              >
                "The average broker saves 4.2 hours per load using DrayGo."
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                Based on Q1 2026 platform data
              </p>
            </div>
          </div>

          {/* Right half — content */}
          <div
            style={{
              background: "#08192b",
              padding: "60px 56px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <SectionLabel>Why Brokers Choose DrayGo</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(24px, 2.5vw, 36px)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: 40,
              }}
            >
              Everything you need to run a modern brokerage.
            </h2>

            {[
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00a5e7"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ),
                title: "500+ Vetted Carriers",
                desc: "Real capacity at every major US port complex. Every carrier MC/DOT verified.",
              },
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00a5e7"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18" />
                    <path d="M7 14l3-3 3 2 4-5" />
                  </svg>
                ),
                title: "Lane Rate Intelligence",
                desc: "Live market rates by corridor so you never overpay or under-quote.",
              },
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00a5e7"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                ),
                title: "Book in Under 8 Minutes",
                desc: "From posting a load to confirmed carrier in minutes, not hours.",
              },
              {
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00a5e7"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
                title: "Track Every Dollar",
                desc: "Per-load margin dashboard. Know exactly which lanes are profitable.",
              },
            ].map((f) => (
              <div key={f.title} style={{ display: "flex", gap: 16, marginBottom: 28 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(0,165,231,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <div
                    style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}
                  >
                    {f.title}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.6,
                    }}
                  >
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 8 }}>
              <Link
                href="#"
                style={{
                  display: "inline-block",
                  background: "#00a5e7",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "13px 28px",
                  borderRadius: 12,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Start Brokering →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: MARGIN CALCULATOR ────────────────────────────────── */}
      <section style={{ background: "#05101c", padding: "100px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Broker Tools</SectionLabel>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 900,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            Calculate Your Broker Margin
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)" }}>
            Adjust sliders to match your loads
          </p>
        </div>

        {/* Glass card */}
        <div
          className="calc-grid"
          style={{
            ...glass,
            maxWidth: 900,
            margin: "0 auto",
            padding: "48px 48px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
          }}
        >
          {/* Left: sliders */}
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {/* Gross Rate */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Gross Load Rate
                </label>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>
                  {fmt(grossRate)}
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={5000}
                step={50}
                value={grossRate}
                onChange={(e) => setGrossRate(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#00a5e7", cursor: "pointer" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  marginTop: 4,
                }}
              >
                <span>$500</span>
                <span>$5,000</span>
              </div>
            </div>

            {/* Carrier Cost */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Carrier Cost
                </label>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>
                  {fmt(carrierCost)}
                </span>
              </div>
              <input
                type="range"
                min={400}
                max={4800}
                step={50}
                value={carrierCost}
                onChange={(e) => setCarrierCost(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#00a5e7", cursor: "pointer" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  marginTop: 4,
                }}
              >
                <span>$400</span>
                <span>$4,800</span>
              </div>
            </div>
          </div>

          {/* Right: results */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Net Margin */}
            <div
              style={{
                background: "rgba(0,165,231,0.08)",
                border: "1px solid rgba(0,165,231,0.2)",
                borderRadius: 14,
                padding: "24px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Net Margin
              </div>
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 900,
                  color: "#00a5e7",
                  lineHeight: 1,
                }}
              >
                {fmt(netMargin)}
              </div>
            </div>

            {/* Margin % */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Margin %
                </div>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: marginColor,
                    lineHeight: 1,
                  }}
                >
                  {marginPct.toFixed(1)}%
                </div>
              </div>
              {/* Progress bar */}
              <div
                style={{
                  height: 8,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: barWidth,
                    background: "linear-gradient(to right, #ef4444, #f59e0b, #22c55e)",
                    borderRadius: 999,
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.25)",
                  marginTop: 4,
                }}
              >
                <span>0%</span>
                <span>30%+</span>
              </div>
            </div>

            {/* Monthly estimate */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "16px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                Est. Monthly (20 loads)
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>
                {fmt(monthlyEst)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: BENTO GRID ────────────────────────────────────────── */}
      <section style={{ background: "#08192b", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>Platform</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 900,
                color: "#fff",
              }}
            >
              The DrayGo Broker Platform
            </h2>
          </div>

          {/* Bento grid */}
          <div
            className="bento-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "auto auto",
              gap: 16,
            }}
          >
            {/* Cell A — col 1, spans 2 rows */}
            <div
              className="bento-cell-a"
              style={{
                gridColumn: "1",
                gridRow: "1 / 3",
                height: 520,
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1920&q=80"
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(8,25,43,0.95) 0%, rgba(8,25,43,0) 60%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "32px 28px",
                }}
              >
                <h3
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: "#fff",
                    marginBottom: 8,
                  }}
                >
                  50+ Port Complexes
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: 16,
                  }}
                >
                  Every major US port, terminal, and inland rail hub.
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["LA/LB", "NY/NJ", "SAV", "HOU", "CHI"].map((p) => (
                    <span
                      key={p}
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Cell B — col 2, row 1 */}
            <div
              style={{
                ...glass,
                gridColumn: "2",
                gridRow: "1",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  color: "#00a5e7",
                  lineHeight: 1,
                }}
              >
                8 Min
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.6)",
                  marginTop: 12,
                  lineHeight: 1.5,
                }}
              >
                Average time from load post to confirmed carrier
              </p>
              <div
                style={{
                  marginTop: 20,
                  height: 6,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 999,
                }}
              >
                <div
                  style={{
                    width: "27%",
                    height: "100%",
                    background: "#00a5e7",
                    borderRadius: 999,
                  }}
                />
              </div>
              <div
                style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 6 }}
              >
                vs. 2+ hrs industry avg
              </div>
            </div>

            {/* Cell C — col 3, row 1 */}
            <div
              style={{
                gridColumn: "3",
                gridRow: "1",
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
                minHeight: 240,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80"
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{ position: "absolute", inset: 0, background: "rgba(8,25,43,0.7)" }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  padding: "32px 28px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <h3
                  style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 8 }}
                >
                  Real-time container visibility
                </h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                  Know where every load is — from gate release to delivery.
                </p>
              </div>
            </div>

            {/* Cell D — col 2, row 2 */}
            <div
              style={{
                ...glass,
                gridColumn: "2",
                gridRow: "2",
                padding: "32px 28px",
              }}
            >
              <div style={{ marginBottom: 12 }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00a5e7"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
                Digital Rate Cons
              </h3>
              <p
                style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}
              >
                Send, sign, and store rate confirmations 100% digitally.
              </p>
            </div>

            {/* Cell E — col 3, row 2 */}
            <div
              style={{
                gridColumn: "3",
                gridRow: "2",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid #00a5e7",
                borderRadius: 16,
                backdropFilter: "blur(12px)",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: "#00a5e7",
                  lineHeight: 1,
                }}
              >
                12–18%
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  marginTop: 10,
                  lineHeight: 1.5,
                }}
              >
                Average broker margin on DrayGo loads
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: LANE RATE INTELLIGENCE ───────────────────────────── */}
      <section style={{ background: "#05101c", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Market Intelligence</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 900,
                color: "#fff",
              }}
            >
              Lane Rate Intelligence
            </h2>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {LANE_TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveLane(i)}
                style={{
                  padding: "9px 18px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: activeLane === i ? "#00a5e7" : "transparent",
                  color: activeLane === i ? "#fff" : "rgba(255,255,255,0.4)",
                  border:
                    activeLane === i
                      ? "1px solid #00a5e7"
                      : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Active lane card */}
          <div
            className="lane-card-grid"
            style={{
              ...glass,
              maxWidth: 900,
              margin: "32px auto 0",
              padding: "40px 40px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 40,
            }}
          >
            {/* Left: stats + bar chart */}
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 6 }}>
                {lane.port}
              </h3>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 999,
                  padding: "3px 12px",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 24,
                }}
              >
                {lane.region}
              </div>

              <div style={{ marginBottom: 12 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 4,
                  }}
                >
                  Rate Range
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#00a5e7" }}>
                  {lane.range}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 4,
                  }}
                >
                  Avg Transit
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
                  {lane.transit}
                </div>
              </div>

              {/* Trend pill */}
              <span
                style={{
                  display: "inline-block",
                  background: lane.trendUp
                    ? "rgba(34,197,94,0.15)"
                    : "rgba(239,68,68,0.15)",
                  color: lane.trendUp ? "#22c55e" : "#ef4444",
                  border: `1px solid ${
                    lane.trendUp ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"
                  }`,
                  borderRadius: 999,
                  padding: "4px 12px",
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 28,
                }}
              >
                {lane.trendUp ? "▲" : "▼"} {lane.trend} this week
              </span>

              {/* Bar chart */}
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 100 }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                  <div
                    key={day}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: `${lane.bars[i]}%`,
                        background: "#00a5e7",
                        borderRadius: "4px 4px 0 0",
                        opacity: i === 3 ? 1 : 0.5 + i * 0.12,
                        transition: "height 0.3s",
                      }}
                    />
                    <div
                      style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}
                    >
                      {day}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: hot lanes */}
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 20,
                }}
              >
                Hot Lanes Right Now
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {lane.hot.map((h) => (
                  <div
                    key={h.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      padding: "14px 18px",
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
                      {h.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        style={{ fontSize: 15, fontWeight: 800, color: "#00a5e7" }}
                      >
                        {h.rate}
                      </div>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: TESTIMONIALS ──────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "112px 24px" }}>
        <img
          src="https://images.unsplash.com/photo-1545893835-abaa50cbe628?auto=format&fit=crop&w=1920&q=80"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(5,10,24,0.88)",
          }}
        />

        <div
          style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>Social Proof</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 900,
                color: "#fff",
              }}
            >
              Real Brokers. Real Results.
            </h2>
          </div>

          <div
            className="testimonials-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              maxWidth: "80rem",
              margin: "0 auto",
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 20,
                  padding: "32px 32px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Stars */}
                <div
                  style={{
                    fontSize: 16,
                    color: "#fbbf24",
                    marginBottom: 16,
                    letterSpacing: 2,
                  }}
                >
                  ★★★★★
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontStyle: "italic",
                    color: "#fff",
                    fontSize: 15,
                    lineHeight: 1.7,
                    marginBottom: 24,
                    flex: 1,
                  }}
                >
                  "{t.quote}"
                </p>

                {/* Author row */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "#00a5e7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      fontWeight: 900,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                      {t.role} · {t.location}
                    </div>
                  </div>
                  <span
                    style={{
                      background: "rgba(0,165,231,0.15)",
                      color: "#00a5e7",
                      border: "1px solid rgba(0,165,231,0.3)",
                      borderRadius: 4,
                      padding: "2px 8px",
                      fontSize: 11,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: CTA ───────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #08192b, #06143A)",
          padding: "112px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blurred circle accent */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.06,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto" }}>
          <SectionLabel>Get Started</SectionLabel>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Start Brokering Smarter Today.
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.55)",
              marginBottom: 40,
              lineHeight: 1.6,
            }}
          >
            Join the fastest-growing drayage brokerage network in North America.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="#"
              style={{
                background: "#00a5e7",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                padding: "16px 40px",
                borderRadius: 12,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Create Free Account
            </Link>
            <Link
              href="#"
              style={{
                background: "transparent",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                padding: "16px 40px",
                borderRadius: 12,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.25)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.10)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Responsive styles ────────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .broker-split { grid-template-columns: 1fr !important; }
          .bento-grid { grid-template-columns: 1fr !important; }
          .bento-cell-a { grid-row: auto !important; grid-column: auto !important; height: 360px !important; }
          .stats-band-inner { grid-template-columns: repeat(2,1fr) !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .calc-grid { grid-template-columns: 1fr !important; }
          .lane-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
