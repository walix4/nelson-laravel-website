"use client";
import Link from "next/link";
import { useState } from "react";
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
  { n: "Port charges", d: "Gate fees, terminal handling, exam fees if pulled.", i: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>', a: "#1E3A8A" },
  { n: "Chassis", d: "Daily rental, pool fees, per-diem on long dwell.", i: '<path d="M14 18V6H2v12h2"/><path d="M14 8h4l4 4v6h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>', a: "#fc0b05" },
  { n: "Accessorials", d: "Tolls, overweight, hazmat, reefer plug, lumper.", i: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>', a: "#fc0b05" },
  { n: "Overhead", d: "Admin, dispatch, ELD/TMS, insurance, depreciation.", i: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>', a: "#1E3A8A" },
];

type Lane = [string, string, string];
const SHIP: { title: string; icon: React.ReactNode; rows: Lane[] }[] = [
  { title: "Parcels", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 17V7H2v10h2" /><path d="M14 9h4l4 4v4h-2" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>, rows: [["Los Angeles", "Phoenix, AZ", "2h ago"], ["Long Beach", "Las Vegas, NV", "4h ago"], ["Oakland", "Sacramento, CA", "08 Jan"], ["Seattle", "Portland, OR", "29 Oct"], ["Houston", "San Antonio, TX", "12 Mar"]] },
  { title: "Standard Cargo", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="12" width="7" height="7" rx="1" /><rect x="14" y="12" width="7" height="7" rx="1" /><rect x="8.5" y="4" width="7" height="7" rx="1" /></svg>, rows: [["Los Angeles", "Dallas, TX", "1h ago"], ["New York/NJ", "Chicago, IL", "5h ago"], ["Norfolk", "Atlanta, GA", "22 Nov"], ["Long Beach", "Denver, CO", "22 Nov"], ["Miami", "Orlando, FL", "03 Feb"]] },
  { title: "Project Cargo", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.7" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="1" /><path d="M7 6v12M11 6v12M15 6v12" /></svg>, rows: [["Houston", "Kansas City, MO", "3d ago"], ["Seattle", "Salt Lake City, UT", "3d ago"], ["Oakland", "Reno, NV", "2d ago"], ["New York/NJ", "Indianapolis, IN", "11 Dec"], ["Charleston", "Columbus, OH", "14 Feb"]] },
];

const FAQS = [
  { q: "What is included in a drayage quote?", a: "Every DrayageRate quote is fully itemised — base carrier rate, live fuel surcharge (FSC), chassis pool fee, port terminal handling charges, and any applicable accessorials like overweight permits, hazmat fees, or reefer plugs. No hidden costs." },
  { q: "How are fuel surcharges calculated?", a: "FSC is calculated daily from the U.S. Department of Energy national diesel average, applied using each carrier's declared MPG and the EIA FSC table. The rate you see reflects that day's diesel price — not last week's." },
  { q: "How long are quotes valid?", a: "All quotes generated on DrayageRate are locked and valid for 24 hours. Rate changes caused by diesel index swings, terminal surcharge updates, or chassis availability shifts do not affect locked quotes within that window." },
  { q: "What container types are supported?", a: "We support all 12 standard ISO container configurations: 20' standard, 40' standard, 40' high cube, 45' high cube, 20' reefer, 40' reefer, open top, flat rack, ISO tank, and break-bulk. Container dimensions and tare weights are factored into every rate." },
  { q: "Do you cover Canadian ports?", a: "Yes. DrayageRate covers every major Canadian container port including Vancouver (VACT, CENTERM, VANTERM), Montreal (MCT), Halifax (PSA Halifax), and Prince Rupert — as well as all Class I rail ramps in Canada." },
  { q: "How do I integrate the rate API?", a: "The DrayageRate API uses standard REST/JSON. POST your origin port, destination city, container type, and weight — get back a fully itemised rate object in under 120ms. Full API docs, sandbox credentials, and Postman collection available on the developer portal." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <div className="text-[11px] font-medium border-b" style={{ background: "var(--red)", color: "#fff", borderColor: "rgba(0,0,0,0.15)" }}>
        <div className="max-w-[1400px] mx-auto px-6 h-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2"><span className="live-dot" /><span>Network <b>LIVE</b></span></span>
            <span className="hidden sm:inline opacity-60">·</span><span className="hidden sm:inline num"><b>12,431</b> active routes</span>
            <span className="hidden md:inline opacity-60">·</span><span className="hidden md:inline num">Diesel <b>$5.18</b>/gal · FSC <b>17%</b></span>
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.14em]"><span className="opacity-70">v2026.05</span><a href="#api" className="opacity-90 hover:opacity-100">API status</a></div>
        </div>
      </div>
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
                <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] w-full pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200">
                  <svg width="30" height="30" viewBox="0 0 384 512" fill="#fff" aria-hidden="true" className="shrink-0"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] opacity-90">Download on the</span><span className="block text-[14px] font-semibold tracking-tight">App Store</span></span>
                </a>
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
        {/* trust band */}
        <div className="relative z-10 py-9 border-t-2" style={{ borderColor: "rgba(255,59,48,0.6)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-white/65">Trusted by brokers, freight forwarders, importers &amp; 3PLs</div>
            <div className="mt-6 overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
              <div className="marquee-track">{[...BRANDS, ...BRANDS].map((b, i) => <span key={i} className="brand-logo text-white"><span className="text-[18px] font-bold tracking-tight whitespace-nowrap">{b}</span></span>)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATE YOUR RATE */}
      <section id="quote" className="relative overflow-hidden py-20 md:py-24" style={{ background: "radial-gradient(900px 500px at 80% 0%,rgba(58,95,192,0.2),transparent 60%),linear-gradient(180deg,#08192b,#06143A)" }}>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--blue-2)]">Instant quote engine</div>
            <h2 className="display text-white text-[44px] md:text-[64px] leading-[1.03] mt-3">Calculate your rate.</h2>
            <p className="text-white/60 text-[15px] md:text-[16px] mt-4 max-w-xl mx-auto">Pick a lane, see it on the network, and get a fully itemised, all-in price in seconds.</p>
          </div>
          <CalculateRate />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 relative overflow-hidden text-white" style={{ background: "radial-gradient(760px 460px at 10% 12%,rgba(255,59,48,0.16),transparent 60%),radial-gradient(820px 520px at 92% 30%,rgba(58,95,192,0.18),transparent 60%),linear-gradient(180deg,#08163C 0%,#0C2150 60%,#0A1C45 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-6 reveal">
            <div className="max-w-xl"><div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--red)]">How it works</div><h2 className="display text-[40px] md:text-[48px] text-white leading-[1.05] mt-2">Quote, route, book — one continuous flow.</h2></div>
            <p className="max-w-md text-white/60 text-[15px]">From the first input to a customer-ready PDF, every drayage move is priced and visualized in under a minute.</p>
          </div>
          <div className="hiw reveal mt-20">
            <div className="hiw-line" />
            <div className="hiw-spark" />
            <div className="hiw-row">
              <div className="hiw-col">
                <div className="hiw-half top"><div className="hiw-icon"><img src={asset("/hiw-origin.png")} alt="Choose origin port" loading="lazy" /></div><div className="hiw-stub" /></div>
                <div className="hiw-node" />
                <div className="hiw-half bot"><div className="hiw-text"><div className="hiw-title">Choose origin</div><div className="hiw-uline" style={{ background: "#fc0b05" }} /><p className="hiw-desc">Pick from every container port across the U.S. &amp; Canada — West Coast, Gulf, East Coast and every Class I rail ramp.</p></div></div>
              </div>
              <div className="hiw-col">
                <div className="hiw-half top"><div className="hiw-text"><div className="hiw-title">Pick destination</div><div className="hiw-uline" style={{ background: "#fc0b05" }} /><p className="hiw-desc">Door, warehouse or ramp across 1,200+ inland delivery cities — typed or dropped on the map.</p></div></div>
                <div className="hiw-node" />
                <div className="hiw-half bot"><div className="hiw-stub" /><div className="hiw-icon"><img src={asset("/hiw-destination.png")} alt="Pick destination" loading="lazy" /></div></div>
              </div>
              <div className="hiw-col">
                <div className="hiw-half top"><div className="hiw-icon"><img src={asset("/hiw-calculate.png")} alt="Calculate rate" loading="lazy" /></div><div className="hiw-stub" /></div>
                <div className="hiw-node" />
                <div className="hiw-half bot"><div className="hiw-text"><div className="hiw-title">Calculate rate</div><div className="hiw-uline" style={{ background: "#3A5FC0" }} /><p className="hiw-desc">A fully itemised, all-in price in under 30 seconds — live diesel, FSC, chassis pool and port fees baked in.</p></div></div>
              </div>
              <div className="hiw-col">
                <div className="hiw-half top"><div className="hiw-text"><div className="hiw-title">Export quote</div><div className="hiw-uline" style={{ background: "#1E3A8A" }} /><p className="hiw-desc">Send it out as a brand-ready PDF, structured JSON or embeddable HTML — your markup applied automatically.</p></div></div>
                <div className="hiw-node" />
                <div className="hiw-half bot"><div className="hiw-stub" /><div className="hiw-icon"><img src={asset("/hiw-export.png")} alt="Export quote PDF" loading="lazy" /></div></div>
              </div>
              <div className="hiw-col">
                <div className="hiw-half top"><div className="hiw-icon"><div className="text-center leading-tight"><div className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/50">from</div><div className="display text-[28px] text-white">$3.50</div></div></div><div className="hiw-stub" /></div>
                <div className="hiw-node" />
                <div className="hiw-half bot"><div className="hiw-text"><div className="hiw-title">Book shipment</div><div className="hiw-uline" style={{ background: "#fc0b05" }} /><p className="hiw-desc">Hand off to any of 2,800+ vetted carrier partners and track the container from gate to door.</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section id="network" className="py-24 text-white relative overflow-hidden" style={{ background: "#06143A" }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ background: "radial-gradient(circle at 25% 20%,#3A5FC0 0%,transparent 40%),radial-gradient(circle at 80% 70%,#fc0b05 0%,transparent 45%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--blue)]">North American network</div>
              <h2 className="display text-[40px] md:text-[48px] leading-[1.05] mt-2">One rate engine. Every container port from Seattle to Savannah.</h2>
              <p className="mt-5 text-white/70 max-w-md text-[15px]">Real-time pricing across 50+ port complexes, every Class I rail ramp, and 1,200+ inland delivery destinations — covered by 2,800+ carrier partners on the platform.</p>
              <div className="mt-8 grid grid-cols-2 gap-3 text-[12px]">
                {[["West coast", "LAX · LGB · OAK · SEA"], ["East coast", "NY/NJ · NOR · SAV · CHA"], ["Gulf", "HOU · MIA"], ["Canada", "VAN · MTL · HAL"]].map(([k, v]) => <div key={k} className="glass-dark rounded-lg p-3"><div className="text-white/55 text-[10px] uppercase tracking-wider">{k}</div><div className="display text-white text-[16px] mt-0.5">{v}</div></div>)}
              </div>
            </div>
            <div className="reveal reveal-d1"><NetworkMap /></div>
          </div>
        </div>
      </section>

      {/* SHIPMENTS IN PROCESS — dark version */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#08192b" }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(700px 400px at 10% 50%,rgba(58,95,192,0.3),transparent 60%),radial-gradient(600px 400px at 90% 20%,rgba(255,59,48,0.18),transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "rgba(255,59,48,0.9)" }}>Live network activity</div>
            <h2 className="display text-[40px] md:text-[52px] text-white leading-[1.04]">Shipments in process</h2>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Link href="/estimates" className="text-[14px] font-semibold text-white/70 hover:text-white inline-flex items-center gap-1.5 transition-colors">View all <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></Link>
              <Link href="/#quote" className="px-5 py-2.5 rounded-lg text-[13px] font-semibold text-white transition" style={{ background: "#fc0b05" }}>Request a quote</Link>
            </div>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {SHIP.map((s, i) => (
              <div key={s.title} className={`rounded-2xl p-6 reveal reveal-d${i}`} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5">{s.icon}<h3 className="display text-[19px] text-white">{s.title}</h3></div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 11v5" strokeLinecap="round" /><circle cx="12" cy="7.8" r="0.6" fill="#22c55e" /></svg>
                </div>
                <style>{`.ticker-d${i}::after{background:linear-gradient(transparent,#08192b)!important}`}</style>
                <div className={`ticker-d${i}`}><Ticker rows={s.rows} index={i} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE DIGITAL TWIN */}
      <section className="py-28 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 0%,#08192b,#06143A 70%)", color: "#fff" }}>
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--blue)]">Every container, modeled.</div>
              <h2 className="display text-[40px] md:text-[52px] leading-[1.04] mt-2">A live digital twin of every move on the platform.</h2>
              <p className="text-white/65 mt-5 max-w-lg text-[15px]">Container type, weight, chassis assignment, port dwell — every variable feeds the rate engine. Quotes update as ocean ETAs shift.</p>
              <div className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
                {[["Container types", "12"], ["Live variables", "38"], ["Reprice latency", "120ms"], ["Quote validity", "24 hr"]].map(([k, v]) => <div key={k} className="glass-dark rounded-xl p-4"><div className="text-white/55 text-[10px] uppercase tracking-wider">{k}</div><div className="display num text-[24px] mt-1">{v}</div></div>)}
              </div>
            </div>
            <div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>
              <div className="scene"><div className="box3d"><div className="face front"><div className="box-no num">DRG · 2026 · 4520-7</div><div className="box-label">DRAY RATE</div></div><div className="face back" /><div className="face right" /><div className="face left" /><div className="face top" /><div className="face bot" /></div></div>
              <div className="floating-tag glass-dark rounded-xl px-3 py-2 text-[11px]" style={{ top: "8%", left: "5%", animationDelay: "-1s" }}><div className="text-white/55 text-[9px] uppercase tracking-wider">Container</div><div className="display text-white">40&apos; High Cube</div></div>
              <div className="floating-tag glass-dark rounded-xl px-3 py-2 text-[11px]" style={{ top: "20%", right: "5%", animationDelay: "-2.5s" }}><div className="text-white/55 text-[9px] uppercase tracking-wider">Weight</div><div className="display text-white num">38,420 lb</div></div>
              <div className="floating-tag glass-dark rounded-xl px-3 py-2 text-[11px]" style={{ bottom: "18%", left: "8%", animationDelay: "-3.5s" }}><div className="text-white/55 text-[9px] uppercase tracking-wider">Chassis</div><div className="display text-white">SACP Pool</div></div>
              <div className="floating-tag glass-dark rounded-xl px-3 py-2 text-[11px]" style={{ bottom: "8%", right: "6%", animationDelay: "-1.5s" }}><div className="text-white/55 text-[9px] uppercase tracking-wider">Dwell</div><div className="display text-white num">2.4 days</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* COST CARDS — dark */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#060d1a" }}>
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: "radial-gradient(800px 400px at 80% 10%,rgba(58,95,192,0.22),transparent 60%),radial-gradient(700px 400px at 10% 80%,rgba(255,59,48,0.16),transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="max-w-2xl reveal">
            <div className="text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: "#fc0b05" }}>Cost transparency</div>
            <h2 className="display text-[40px] md:text-[48px] text-white leading-[1.05] mt-2">Every dollar in the quote, accounted for.</h2>
            <p className="mt-4 text-white/55 text-[15px]">No mystery FSCs. No surprise accessorials at delivery. Six cost components on every quote — priced from live market data.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COSTS.map((c, i) => (
              <div key={c.n} className={`rounded-2xl p-6 reveal reveal-d${i % 3} flex items-start gap-4`} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: c.a }}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: c.i }} /></div>
                <div><div className="display text-[17px] text-white">{c.n}</div><p className="text-[13px] text-white/55 mt-1.5 leading-relaxed">{c.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      {/* ESTIMATES CTA — dark */}
      <section className="py-20 relative overflow-hidden" style={{ background: "#08192b" }}>
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "radial-gradient(600px 300px at 50% 50%,rgba(255,59,48,0.18),transparent 60%)" }} />
        <div className="max-w-[1100px] mx-auto px-6 text-center reveal relative">
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#fc0b05" }}>Live estimate stream</div>
          <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05] mt-2">Every quote, live on the network</h2>
          <p className="mt-4 text-white/55 text-[15px] max-w-xl mx-auto">Watch real drayage estimates stream in and price in seconds across every U.S. port and lane.</p>
          <Link href="/estimates" className="btn-primary inline-flex items-center gap-2 mt-7 px-7 py-3.5 rounded-xl text-[15px] font-semibold"><span className="label">View all estimates</span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
        </div>
      </section>

      <Testimonials />

      {/* UNIT CONVERTER — dark */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#060d1a" }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(700px 400px at 80% 20%,rgba(58,95,192,0.3),transparent 60%)" }} />
        <div className="max-w-[1100px] mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#fc0b05" }}>Free logistics tool</div>
            <h2 className="display text-[40px] md:text-[52px] text-white leading-[1.04] mt-2">Online Unit Converter</h2>
            <p className="mt-4 text-white/55 text-[15px] leading-relaxed">Accurately, quickly and for free convert common units of measurement. Enter a value, pick a category, then choose the <i>from</i> and <i>to</i> units to convert instantly.</p>
          </div>
          <div className="mt-12 reveal reveal-d1"><UnitConverter initial="Acceleration" /></div>
        </div>
      </section>

      {/* PORTS BANNER — dark */}
      <section className="py-16 relative overflow-hidden" style={{ background: "#08192b" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="ports-band flex flex-col md:block">
            <div className="pmap" style={{ backgroundImage: `url(${asset("/usa-map.svg")})` }} />
            <div className="relative z-10 text-center px-6 pt-12 pb-10 md:py-16 max-w-xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-white/80">U.S. coverage</div>
              <h2 className="display text-white text-[34px] md:text-[44px] leading-[1.05] mt-2">Explore the U.S. port network</h2>
              <p className="text-white/85 text-[15px] mt-4">Filter every major U.S. container port and inland ramp across all 48 states — then price a drayage move in seconds.</p>
              <Link href="/tools/ports" className="inline-flex items-center gap-2 mt-7 font-semibold text-[14px] px-6 py-3 rounded-xl text-white transition" style={{ background: "#fc0b05" }}>Browse ports <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
            </div>
            <div className="ports-card left">
              <div className="flex items-center justify-between mb-4">
                <div className="display text-[19px] text-[var(--navy)]">Filters</div>
                <div className="flex items-center gap-3"><span className="text-[13px] text-[var(--muted)] cursor-pointer">Clear</span><span className="bg-[var(--navy)] text-white text-[13px] font-semibold px-4 py-2 rounded-lg">Show 20</span></div>
              </div>
              <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--muted)] mb-2">Sort by</div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="pf-radio"><span className="pf-dot" />Sea ports</div>
                <div className="pf-radio sel"><span className="pf-dot" />River ports</div>
                <div className="pf-radio"><span className="pf-dot" />Dry ports</div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div><div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--muted)]">Sea ports</div><div className="pf-track"><div className="pf-fill" style={{ width: "18%" }} /><div className="pf-knob" style={{ left: "18%" }} /></div></div>
                <div><div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--muted)] flex justify-between">River ports <span className="bg-[var(--navy)]/6 px-2 rounded-full text-[var(--navy)]">500</span></div><div className="pf-track"><div className="pf-fill" style={{ width: "55%" }} /><div className="pf-knob" style={{ left: "55%" }} /></div></div>
                <div><div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--muted)]">Dry ports</div><div className="pf-track"><div className="pf-fill" style={{ width: "35%" }} /><div className="pf-knob" style={{ left: "35%" }} /></div></div>
              </div>
            </div>
            <div className="ports-card right">
              <div className="px-4 pt-1 pb-2 text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--muted)] flex items-center gap-1.5"><span className="flag">🇺🇸</span> Top U.S. ports</div>
              {([["Los Angeles, CA", 48], ["Long Beach, CA", 45], ["New York / NJ", 52], ["Savannah, GA", 33], ["Houston, TX", 29], ["Seattle, WA", 21]] as [string, number][]).map(([city, n]) => (
                <div key={city} className="pc-row"><svg className="pc-pin" viewBox="0 0 24 24"><path d="M12 22s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" /><circle cx="12" cy="11" r="2.6" fill="#fff" /></svg>{city} <span className="text-[var(--muted)] font-normal">({n})</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#06101e" }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(800px 400px at 20% 60%,rgba(58,95,192,0.25),transparent 60%)" }} />
        <div className="max-w-[860px] mx-auto px-6 relative">
          <div className="text-center reveal mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>Got questions</div>
            <h2 className="display text-[40px] md:text-[52px] text-white leading-[1.05]">Frequently asked</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="reveal" style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
                  style={{ background: openFaq === i ? "rgba(255,59,48,0.08)" : "rgba(255,255,255,0.03)" }}
                >
                  <span className="display text-[16px] text-white pr-4">{faq.q}</span>
                  <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white/60 transition-transform" style={{ background: "rgba(255,255,255,0.08)", transform: openFaq === i ? "rotate(45deg)" : "none" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5" style={{ background: "rgba(255,59,48,0.04)" }}>
                    <p className="text-[14px] text-white/65 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 60%,#1E3C82 100%)" }}>
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: "radial-gradient(700px 400px at 90% 50%,rgba(255,59,48,0.25),transparent 60%),radial-gradient(600px 400px at 10% 80%,rgba(58,95,192,0.22),transparent 60%)" }} />
        <div className="max-w-[900px] mx-auto px-6 text-center reveal relative">
          <h2 className="display text-white text-[44px] md:text-[58px] leading-[1.03]">Get your drayage quote in seconds.</h2>
          <p className="text-white/70 mt-4">Instant pricing. Full transparency. Nationwide coverage. Built for the brokers, BCOs and 3PLs running North American freight.</p>
          <Link href="/#quote" className="btn-primary inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-xl text-[15px] font-semibold"><span className="label">Run my first quote</span></Link>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
