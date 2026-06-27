"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import Testimonials from "@/components/Testimonials";
import Chat from "@/components/Chat";
import Stats from "@/components/Stats";
import UnitConverter from "@/components/UnitConverter";
import NetworkMap from "@/components/NetworkMap";
import Ticker from "@/components/Ticker";
import CalculateRate from "@/components/CalculateRate";
import LoadBoard from "@/components/LoadBoard";
import { asset } from "@/lib/site";

const BRANDS = ["CARGOMAX", "portlink", "NORDFREIGHT", "veritas3pl", "ARC LOGISTICS", "Halo Freight", "CONTAINERWORKS", "Meridian Drayage", "Atlas BCO", "Northstar Cargo"];
const COSTS = [
  { n: "Fuel + FSC", d: "Live diesel × MPG × distance, plus carrier FSC.", i: '<line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>', a: "#fc0b05" },
  { n: "Driver labor", d: "Hourly wage × transit time + per diem on 400+ mi.", i: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/>', a: "#3A5FC0" },
  { n: "Port charges", d: "Gate fees, terminal handling, exam fees if pulled.", i: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>', a: "#08192b" },
  { n: "Chassis", d: "Daily rental, pool fees, per-diem on long dwell.", i: '<path d="M14 18V6H2v12h2"/><path d="M14 8h4l4 4v6h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>', a: "#fc0b05" },
  { n: "Accessorials", d: "Tolls, overweight, hazmat, reefer plug, lumper.", i: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>', a: "#fc0b05" },
  { n: "Overhead", d: "Admin, dispatch, ELD/TMS, insurance, depreciation.", i: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>', a: "#1E3A8A" },
];
const Arrow = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--navy)]/35 shrink-0"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
type Lane = [string, string, string];
const SHIP: { title: string; icon: React.ReactNode; rows: Lane[] }[] = [
  { title: "Parcels", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 17V7H2v10h2" /><path d="M14 9h4l4 4v4h-2" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>, rows: [["Los Angeles", "Phoenix, AZ", "2h ago"], ["Long Beach", "Las Vegas, NV", "4h ago"], ["Oakland", "Sacramento, CA", "08 Jan"], ["Seattle", "Portland, OR", "29 Oct"], ["Houston", "San Antonio, TX", "12 Mar"]] },
  { title: "Standard Cargo", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="12" width="7" height="7" rx="1" /><rect x="14" y="12" width="7" height="7" rx="1" /><rect x="8.5" y="4" width="7" height="7" rx="1" /></svg>, rows: [["Los Angeles", "Dallas, TX", "1h ago"], ["New York/NJ", "Chicago, IL", "5h ago"], ["Norfolk", "Atlanta, GA", "22 Nov"], ["Long Beach", "Denver, CO", "22 Nov"], ["Miami", "Orlando, FL", "03 Feb"]] },
  { title: "Project Cargo", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.7" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="1" /><path d="M7 6v12M11 6v12M15 6v12" /></svg>, rows: [["Houston", "Kansas City, MO", "3d ago"], ["Seattle", "Salt Lake City, UT", "3d ago"], ["Oakland", "Reno, NV", "2d ago"], ["New York/NJ", "Indianapolis, IN", "11 Dec"], ["Charleston", "Columbus, OH", "14 Feb"]] },
];

export default function Home() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section id="load-board" className="relative overflow-hidden text-white">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline><source src={asset("/hero-cargo.mp4")} type="video/mp4" /></video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(1,7,26,0.82) 0%,rgba(1,7,26,0.55) 42%,rgba(1,7,26,0.86) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 520px at 18% 22%,rgba(11,35,80,0.28),transparent 60%),radial-gradient(820px 520px at 86% 82%,rgba(255,59,48,0.18),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-[440px_1fr] gap-10 lg:gap-14 items-stretch">
            {/* LEFT — load board */}
            <LoadBoard />
            {/* RIGHT — headline */}
            <div className="flex flex-col justify-center h-full">
              <div className="inline-flex items-center gap-2 self-start rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-5" style={{ background: "rgba(255,59,48,0.16)", border: "1px solid rgba(255,59,48,0.4)" }}>
                <span className="live-dot" /> Live drayage data — diesel &amp; FSC updated continuously
              </div>
              <h1 className="display text-white text-[40px] md:text-[64px] leading-[1.03]">Drayage quotes, port to door — <span style={{ color: "var(--red)" }}>Rate in 30 seconds.</span></h1>
              <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-xl leading-relaxed">Live diesel, FSC, chassis and port fees across every major U.S. &amp; Canadian container port — instant, fully itemised, and locked for 24 hours.</p>
              <div className="mt-8 grid w-fit grid-cols-2 gap-3">
                {/* App Store badge */}
                <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] w-full pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200">
                  <svg width="30" height="30" viewBox="0 0 384 512" fill="#fff" aria-hidden="true" className="shrink-0"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] opacity-90">Download on the</span><span className="block text-[14px] font-semibold tracking-tight">App Store</span></span>
                </a>
                {/* Google Play badge */}
                <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] w-full pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200">
                  <img src={asset("/google-play.png")} alt="" className="h-7 w-auto shrink-0" />
                  <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] uppercase tracking-[0.14em] opacity-90">Get it on</span><span className="block text-[14px] font-semibold tracking-tight">Google Play</span></span>
                </a>
              </div>
              <div className="mt-5 text-[12px] text-white/55">🚛 Built for drayage, chassis moves &amp; container freight</div>
              <div className="mt-10 flex items-center gap-7 text-[11px] uppercase tracking-[0.16em] text-white/60">
                <div><div className="text-[26px] md:text-[30px] display num text-white">50</div><div className="mt-0.5">Ports</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">1,200+</div><div className="mt-0.5">Lanes</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">250,000+</div><div className="mt-0.5">Quotes</div></div>
              </div>
            </div>
          </div>
        </div>
        {/* ── STATS BAR inside hero so video shows through ── */}
        <div style={{ position: "relative", zIndex: 10, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {[
              { val: "2026",   label: "Drayage Activity" },
              { val: "3,847",  label: "Import Containers" },
              { val: "1,293",  label: "Export Containers" },
              { val: "5,140+", label: "Total Containers" },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: "28px 0", paddingLeft: i === 0 ? 0 : 32, borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.val}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 8, textTransform: "uppercase", letterSpacing: "0.14em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 1: INSTANT QUOTES ──────────────────────────────────── */}
      <section style={{ background: "linear-gradient(180deg,#0a0d18 0%,#0b0e1a 100%)", padding: "120px 24px", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "55%", height: "100%", background: "radial-gradient(ellipse 80% 70% at 80% 40%, rgba(252,11,5,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative" }} className="home-2col">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 24 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block", boxShadow: "0 0 0 3px rgba(252,11,5,0.25)" }} />
              Instant Rate Engine
            </div>
            <h2 style={{ fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 900, color: "#fff", lineHeight: 1.04, margin: "0 0 20px", letterSpacing: "-0.025em" }}>
              Rate any lane in<br /><span style={{ color: "#fc0b05" }}>30 seconds.</span><br />No calls. No RFQs.
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, maxWidth: 420, margin: "0 0 40px" }}>Live diesel, FSC, chassis, port fees — fully itemised and locked for 24 hours. Every U.S. and Canadian container port, every Class I rail ramp.</p>
            <Link href="/#quote" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fc0b05", color: "#fff", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: "0 0 0 1px rgba(252,11,5,0.3), 0 8px 32px rgba(252,11,5,0.35)" }}>
              Calculate Your Rate
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ animation: "floatCardA 4s ease-in-out infinite", transform: "perspective(900px) rotateX(5deg) rotateY(-10deg)", transformStyle: "preserve-3d" as const }}>
              <div style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 20, padding: "28px 32px", width: 340, boxShadow: "0 24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" as const, letterSpacing: "0.14em" }}>Quote · DR-2041</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginTop: 2 }}>LAX → Chicago, IL</div>
                  </div>
                  <div style={{ background: "rgba(39,179,10,0.15)", border: "1px solid rgba(39,179,10,0.4)", borderRadius: 20, padding: "3px 10px", fontSize: 10, fontWeight: 700, color: "#27b30a" }}>LOCKED 24H</div>
                </div>
                {[["Base Rate","$1,180"],["Fuel + FSC (18%)","$212"],["Chassis Pool","$95"],["Port Terminal Fee","$140"],["Tolls & Accessorials","$58"]].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                    <span>{label}</span><span style={{ fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{val}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, marginTop: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.12em" }}>Total All-In</span>
                  <span style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>$1,685</span>
                </div>
                <div style={{ marginTop: 18, background: "#fc0b05", borderRadius: 8, padding: "11px 0", textAlign: "center" as const, fontSize: 13, fontWeight: 700, color: "#fff" }}>Book This Rate →</div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@keyframes floatCardA{0%,100%{transform:perspective(900px) rotateX(5deg) rotateY(-10deg) translateY(0px)}50%{transform:perspective(900px) rotateX(5deg) rotateY(-10deg) translateY(-16px)}} @media(max-width:768px){.home-2col{grid-template-columns:1fr!important}}`}</style>
      </section>


      {/* ── SECTION A: LIVE MARKET DATA ────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 620, display: "flex", alignItems: "center" }}>
        <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1400&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(4,10,22,0.97) 45%, rgba(4,10,22,0.55) 100%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="home-2col">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 24 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", animation: "pulse 2s infinite", display: "inline-block" }} />
              Live Market Data
            </div>
            <h2 style={{ fontSize: "clamp(34px,4vw,56px)", fontWeight: 900, color: "#fff", lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-0.025em" }}>
              Live diesel, FSC &amp;<br />port fees — updated<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>every 60 seconds.</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, maxWidth: 420, marginBottom: 40 }}>No stale rate sheets. Every quote pulls live diesel index, carrier FSC, chassis pool availability, and port terminal fees from real-time data sources.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
              {[["DOE Diesel Index","Live feed"],["Carrier FSC","Auto-calc"],["Port Terminals","50+ feeds"],["Chassis Pools","Real-time"]].map(([label, badge]) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{label}</span>
                  <span style={{ background: "rgba(39,179,10,0.18)", border: "1px solid rgba(39,179,10,0.4)", borderRadius: 10, padding: "2px 7px", fontSize: 9, fontWeight: 800, color: "#27b30a", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>{badge}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
            {[
              { label:"Chassis (daily rate)", val:"$40/day", change:"no change", up:null, color:"#3A7BEA" },
              { label:"Prepull Fee", val:"$125", change:"+$5", up:true, color:"#f59e0b" },
              { label:"Storage (per day)", val:"$35/day", change:"–$5", up:false, color:"#fc0b05" },
              { label:"Bobtail Rate", val:"50% drayage", change:"no change", up:null, color:"#8b5cf6" },
            ].map((row) => (
              <div key={row.label} style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.11)", borderRadius: 14, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.35)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: row.color, boxShadow: `0 0 0 3px ${row.color}33` }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{row.label}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{row.val}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: row.up === true ? "#27b30a" : row.up === false ? "#fc0b05" : "rgba(255,255,255,0.35)", background: row.up === true ? "rgba(39,179,10,0.12)" : row.up === false ? "rgba(252,11,5,0.12)" : "rgba(255,255,255,0.06)", borderRadius: 6, padding: "2px 7px" }}>{row.change}</span>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textAlign: "right" as const, marginTop: 4 }}>Last updated: 2 min ago · IANA, terminal operators, port data feeds</div>
          </div>
        </div>
      </section>

      {/* ── SECTION B: EVERY FEE ITEMISED ──────────────────────────────── */}
      <section style={{ background: "linear-gradient(180deg,#050d1c 0%,#040a17 100%)", padding: "120px 24px", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(58,95,192,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="home-2col">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(58,95,192,0.12)", border: "1px solid rgba(58,95,192,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#3A7BEA", marginBottom: 24 }}>Fully Itemised Quotes</div>
              <h2 style={{ fontSize: "clamp(34px,4vw,56px)", fontWeight: 900, color: "#fff", lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-0.025em" }}>
                Six fees.<br />One all-in price.<br /><span style={{ color: "rgba(255,255,255,0.35)" }}>No hidden charges.</span>
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, maxWidth: 420, marginBottom: 40 }}>Every quote shows exactly what you're paying — base rate, fuel, chassis, port fees, tolls, and accessorials broken out line by line. No surprises at delivery.</p>
              <Link href="/#quote" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(58,95,192,0.15)", border: "1.5px solid rgba(58,95,192,0.5)", color: "#3A7BEA", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                See a sample quote
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
              {[
                { n:"Base Rate", d:"Distance × carrier tariff, market-priced per lane", pct:"~70%", color:"#fc0b05" },
                { n:"Fuel + FSC", d:"Live DOE diesel index + carrier fuel surcharge", pct:"~13%", color:"#f59e0b" },
                { n:"Chassis", d:"Pool rental + per-diem, by region and dwell time", pct:"~6%", color:"#3A7BEA" },
                { n:"Port Terminal Fee", d:"Gate, handling, and exam fees per terminal", pct:"~8%", color:"#8b5cf6" },
                { n:"Tolls & Permits", d:"Route-specific tolls, overweight & hazmat permits", pct:"~2%", color:"#10b981" },
                { n:"Accessorials", d:"Detention, chassis splits, reefer, lumper etc.", pct:"~1%", color:"#06b6d4" },
              ].map((item, i) => (
                <div key={item.n} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div style={{ width: 3, height: 36, borderRadius: 2, background: item.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{item.n}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{item.d}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: item.color, minWidth: 36, textAlign: "right" as const }}>{item.pct}</div>
                </div>
              ))}
              <div style={{ marginTop: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Total All-In</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>$1,685</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION C: 24H RATE LOCK ────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 560, display: "flex", alignItems: "center" }}>
        <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1400&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(4,10,22,0.88) 0%, rgba(4,10,22,0.72) 50%, rgba(4,10,22,0.92) 100%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 60, alignItems: "center" }} className="home-2col">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(39,179,10,0.12)", border: "1px solid rgba(39,179,10,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#27b30a", marginBottom: 24 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#27b30a", display: "inline-block" }} />
              24-Hour Rate Lock
            </div>
            <h2 style={{ fontSize: "clamp(34px,4vw,56px)", fontWeight: 900, color: "#fff", lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-0.025em" }}>
              Quote in 30 seconds.<br />Book anytime in the<br /><span style={{ color: "#27b30a" }}>next 24 hours.</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, maxWidth: 460 }}>Your rate is locked the moment you quote — no re-pricing, no "call for current rates." Present the quote to your customer and book at your convenience, up to 24 hours later.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
            {[
              { icon:"⚡", title:"Quote generated", desc:"All-in price calculated in under 30 seconds", time:"0:00" },
              { icon:"🔒", title:"Rate locked", desc:"Price frozen — good for the next 24 hours", time:"0:01" },
              { icon:"📋", title:"Share with customer", desc:"Send branded PDF quote immediately", time:"Any time" },
              { icon:"✅", title:"Book the load", desc:"Confirm and assign a carrier within the 24h window", time:"< 24h" },
            ].map((step, i) => (
              <div key={step.title} style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 12, padding: "14px 16px", boxShadow: "0 4px 20px rgba(0,0,0,0.35)" }}>
                <div style={{ fontSize: 20, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{step.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{step.title}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>{step.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: VERIFIED CARRIER NETWORK ────────────────────────── */}
      <section style={{ background: "linear-gradient(180deg,#050d1e 0%,#060f1e 100%)", padding: "120px 24px", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "45%", background: "radial-gradient(ellipse 80% 60% at 10% 50%, rgba(39,179,10,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative" }} className="home-2col">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(39,179,10,0.12)", border: "1px solid rgba(39,179,10,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#27b30a", marginBottom: 24 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#27b30a", display: "inline-block", boxShadow: "0 0 0 3px rgba(39,179,10,0.25)" }} />
              Carrier Network
            </div>
            <h2 style={{ fontSize: "clamp(34px,4vw,54px)", fontWeight: 900, color: "#fff", lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-0.025em" }}>
              500+ vetted carriers.<br /><span style={{ color: "rgba(255,255,255,0.35)" }}>Every move covered.</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, maxWidth: 400, marginBottom: 48 }}>Every carrier is FMCSA-verified, MC-licensed, and rated by shippers on the platform. AI matches the best carrier to every load in real time.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["500+","Active carriers"],["4.9★","Avg rating"],["< 1%","Load rejections"],["FMCSA","All verified"]].map(([val, label]) => (
                <div key={label} style={{ background: "rgba(39,179,10,0.06)", border: "1px solid rgba(39,179,10,0.18)", borderRadius: 12, padding: "18px 20px" }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 6, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative", height: 380, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {([
              { name:"Apex Drayage LLC", mc:"MC-491823", loads:"1,240 loads", rating:"4.9", port:"LAX · LGB", offset:0, rotate:0, zIndex:3 },
              { name:"Summit Freight Inc", mc:"MC-338291", loads:"847 loads", rating:"4.8", port:"NY/NJ · NOR", offset:-20, rotate:-5, zIndex:2 },
              { name:"BlueLine Carriers", mc:"MC-712044", loads:"2,103 loads", rating:"5.0", port:"SAV · CHA", offset:-40, rotate:-10, zIndex:1 },
            ] as {name:string;mc:string;loads:string;rating:string;port:string;offset:number;rotate:number;zIndex:number}[]).map((c, i) => (
              <div key={c.name} style={{ position: "absolute", width: 320, transform: `perspective(800px) rotateY(${c.rotate}deg) translateX(${c.offset}px)`, zIndex: c.zIndex, boxShadow: `0 ${16+i*8}px ${48+i*16}px rgba(0,0,0,${0.5+i*0.1})`, borderRadius: 16 }}>
                <div style={{ background: i === 0 ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1px solid rgba(255,255,255,${0.14-i*0.03})`, borderRadius: 16, padding: "22px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>{c.mc}</div>
                    </div>
                    <div style={{ background: "rgba(39,179,10,0.15)", border: "1px solid rgba(39,179,10,0.4)", borderRadius: 20, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "#27b30a" }}>★ {c.rating}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[c.port, c.loads, "FMCSA ✓"].map((tag, ti) => (
                      <div key={tag} style={{ background: ti === 2 ? "rgba(39,179,10,0.10)" : "rgba(255,255,255,0.06)", borderRadius: 6, padding: "5px 10px", fontSize: 11, color: ti === 2 ? "#27b30a" : "rgba(255,255,255,0.6)" }}>{tag}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: DRAYPAY FAST PAYMENTS ───────────────────────────── */}
      <section style={{ background: "#04101f", padding: "120px 24px", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "55%", background: "radial-gradient(ellipse 80% 60% at 90% 50%, rgba(0,165,231,0.09) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative" }} className="home-2col">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,165,231,0.12)", border: "1px solid rgba(0,165,231,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#00a5e7", marginBottom: 24 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00a5e7", display: "inline-block", boxShadow: "0 0 0 3px rgba(0,165,231,0.25)" }} />
              DrayPay Payments
            </div>
            <h2 style={{ fontSize: "clamp(34px,4vw,54px)", fontWeight: 900, color: "#fff", lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-0.025em" }}>
              Carriers paid in<br /><span style={{ color: "#00a5e7" }}>24-72 hours.</span><br />Not 45 days.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, maxWidth: 420, marginBottom: 40 }}>DrayPay auto-generates invoices on POD and pays directly to the carrier — no factoring, no float, no paperwork. Smart contracts settle instantly.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Payment Dashboard Mockup */}
            <div style={{ width: 360, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(0,165,231,0.22)", borderRadius: 20, overflow: "hidden", boxShadow: "0 28px 80px rgba(0,165,231,0.18), 0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
              {/* Dashboard header */}
              <div style={{ background: "rgba(0,165,231,0.10)", borderBottom: "1px solid rgba(0,165,231,0.18)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#00a5e7", letterSpacing: "0.14em", textTransform: "uppercase" as const }}>DrayPay · Payout Center</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginTop: 4, letterSpacing: "-0.02em" }}>$24,860 <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>this week</span></div>
                </div>
                <div style={{ background: "rgba(39,179,10,0.15)", border: "1px solid rgba(39,179,10,0.4)", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontWeight: 700, color: "#27b30a" }}>● Live</div>
              </div>
              {/* Payment rows */}
              <div style={{ padding: "8px 0" }}>
                {[
                  { carrier:"Apex Drayage LLC", load:"DR-2041 · LAX→CHI", amount:"$3,280", time:"Paid 38h", color:"#27b30a" },
                  { carrier:"Summit Freight Inc", load:"DR-2038 · NJ→ATL", amount:"$2,940", time:"Paid 51h", color:"#27b30a" },
                  { carrier:"BlueLine Carriers", load:"DR-2035 · SAV→DFW", amount:"$4,120", time:"Paid 29h", color:"#27b30a" },
                  { carrier:"Pacific Port Haulers", load:"DR-2033 · OAK→LAS", amount:"$1,860", time:"Processing", color:"#00a5e7" },
                ].map((row, i) => (
                  <div key={row.load} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(${row.color === "#27b30a" ? "39,179,10" : "0,165,231"},0.12)`, border: `1px solid rgba(${row.color === "#27b30a" ? "39,179,10" : "0,165,231"},0.3)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={row.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{row.carrier}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>{row.load}</div>
                    </div>
                    <div style={{ textAlign: "right" as const, flexShrink: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{row.amount}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: row.color, marginTop: 2 }}>{row.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Footer bar */}
              <div style={{ background: "rgba(0,165,231,0.07)", borderTop: "1px solid rgba(0,165,231,0.15)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Avg payout time</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#00a5e7" }}>42 hours</div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@keyframes floatCardB{0%,100%{transform:translateY(0px)}50%{transform:translateY(-14px)}}`}</style>
      </section>

      {/* ── SECTION 6: THREE PRODUCTS CTA ──────────────────────────────── */}
      <section style={{ background: "linear-gradient(180deg,#070d20 0%,#060f1e 100%)", padding: "120px 24px 140px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.022) 1px, transparent 1px)", backgroundSize: "36px 36px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center" as const, marginBottom: 80 }}>
            <h2 style={{ fontSize: "clamp(36px,4.5vw,64px)", fontWeight: 900, color: "#fff", lineHeight: 1.03, margin: "0 0 16px", letterSpacing: "-0.03em" }}>
              One platform.<br /><span style={{ color: "rgba(255,255,255,0.28)" }}>Three products.</span>
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto" }}>Rates, blockchain tracking, and instant payments — unified under one login.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="products-3d-grid">
            {([
              { name:"DrayGo", tag:"Rate Engine", color:"#fc0b05", rgb:"252,11,5", desc:"Instant all-in drayage quotes across every U.S. & Canadian port. Live diesel, FSC, chassis and accessorials.", features:["30-second quotes","50+ ports covered","24h rate lock","PDF export"], cta:"Get Rates", href:"/#quote" },
              { name:"Drayage Blockchain", tag:"Blockchain Trust", color:"#1a6ed4", rgb:"26,110,212", desc:"Every load recorded on-chain. Smart contracts auto-release payment on POD. Tamper-proof, auditable, immutable.", features:["Tamper-proof records","Smart contracts","Auto-invoice on POD","Full audit trail"], cta:"Learn More", href:"/how-it-works" },
              { name:"DrayPay", tag:"Fast Payments", color:"#00a5e7", rgb:"0,165,231", desc:"Carriers paid 24-72 hours after delivery. No factoring, no float, no paperwork. Direct deposit, every time.", features:["24-72h payment","Zero factoring fees","Auto bank transfer","Payment dashboard"], cta:"See Pricing", href:"/carriers" },
            ] as {name:string;tag:string;color:string;rgb:string;desc:string;features:string[];cta:string;href:string}[]).map((p) => (
              <div key={p.name} style={{ background: `rgba(${p.rgb},0.07)`, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid rgba(${p.rgb},0.28)`, borderRadius: 20, padding: "36px 28px", display: "flex", flexDirection: "column" as const, boxShadow: `0 8px 40px rgba(${p.rgb},0.12), inset 0 1px 0 rgba(255,255,255,0.06)` }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: p.color, textTransform: "uppercase" as const, letterSpacing: "0.16em", marginBottom: 8 }}>{p.tag}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#fff", marginBottom: 14, letterSpacing: "-0.02em" }}>{p.name}</div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 24 }}>{p.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 auto", display: "flex", flexDirection: "column" as const, gap: 9 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={p.href} style={{ marginTop: 32, display: "block", textAlign: "center" as const, padding: "13px 0", borderRadius: 10, background: `rgba(${p.rgb},0.14)`, border: `1.5px solid rgba(${p.rgb},0.45)`, color: p.color, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>{p.cta} →</Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" as const, marginTop: 72 }}>
            <Link href="/shipper" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fc0b05", color: "#fff", padding: "16px 36px", borderRadius: 12, fontSize: 16, fontWeight: 800, textDecoration: "none", boxShadow: "0 0 0 1px rgba(252,11,5,0.4), 0 10px 40px rgba(252,11,5,0.4)" }}>
              Get Started — It&apos;s Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <div style={{ marginTop: 14, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>No credit card required · Free Starter plan forever</div>
          </div>
          <style>{`@media(max-width:900px){.products-3d-grid{grid-template-columns:1fr!important;transform:none!important}}`}</style>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
