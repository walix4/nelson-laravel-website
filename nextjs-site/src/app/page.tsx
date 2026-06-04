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
import { asset } from "@/lib/site";

const BRANDS = ["CARGOMAX", "portlink", "NORDFREIGHT", "veritas3pl", "ARC LOGISTICS", "Halo Freight", "ROADWORKS", "Meridian Fleet", "Atlas Carriers", "Northstar Cargo"];
const COSTS = [
  { n: "Toll roads", d: "Live per-mile rates × tolled miles × your axle class.", i: '<path d="M3 21h18"/><path d="M5 21V10l7-5 7 5v11"/><path d="M9 21v-6h6v6"/>', a: "#FF3B30" },
  { n: "Bridges & tunnels", d: "Per-crossing tolls for heavy vehicles, by axle count.", i: '<path d="M2 17h20"/><path d="M4 17v-4M20 17v-4"/><path d="M2 13c4 0 4-5 10-5s6 5 10 5"/>', a: "#3A5FC0" },
  { n: "Axle-based rates", d: "2 to 6+ axles — every authority prices weight differently.", i: '<circle cx="6" cy="17" r="2.4"/><circle cx="18" cy="17" r="2.4"/><path d="M3 17h2M9 17h6M21 17h-2"/><path d="M5 13h14l-2-4H7z"/>', a: "#0B2350" },
  { n: "Congestion & peak", d: "Time-of-day, express-lane and managed-lane pricing.", i: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>', a: "#FF3B30" },
  { n: "Transponder networks", d: "E-ZPass, SunPass, TxTag, I-PASS — discounts & account fees.", i: '<rect x="4" y="7" width="16" height="11" rx="2"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/><path d="M9 12h6"/>', a: "#1E3A8A" },
  { n: "Cash & video tolls", d: "Pay-by-plate surcharges when you run a lane without a tag.", i: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>', a: "#FF3B30" },
];
const Arrow = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--navy)]/35 shrink-0"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
type Lane = [string, string, string];
const SHIP: { title: string; icon: React.ReactNode; rows: Lane[] }[] = [
  { title: "Regional", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 17V7H2v10h2" /><path d="M14 9h4l4 4v4h-2" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>, rows: [["Los Angeles", "Phoenix, AZ", "2h ago"], ["Long Beach", "Las Vegas, NV", "4h ago"], ["Oakland", "Sacramento, CA", "08 Jan"], ["Seattle", "Portland, OR", "29 Oct"], ["Houston", "San Antonio, TX", "12 Mar"]] },
  { title: "Long-haul", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="12" width="7" height="7" rx="1" /><rect x="14" y="12" width="7" height="7" rx="1" /><rect x="8.5" y="4" width="7" height="7" rx="1" /></svg>, rows: [["Los Angeles", "Dallas, TX", "1h ago"], ["New York/NJ", "Chicago, IL", "5h ago"], ["Norfolk", "Atlanta, GA", "22 Nov"], ["Long Beach", "Denver, CO", "22 Nov"], ["Miami", "Orlando, FL", "03 Feb"]] },
  { title: "Oversize", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.7" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="1" /><path d="M7 6v12M11 6v12M15 6v12" /></svg>, rows: [["Houston", "Kansas City, MO", "3d ago"], ["Seattle", "Salt Lake City, UT", "3d ago"], ["Oakland", "Reno, NV", "2d ago"], ["New York/NJ", "Indianapolis, IN", "11 Dec"], ["Charleston", "Columbus, OH", "14 Feb"]] },
];

export default function Home() {
  return (
    <>
      <div className="text-[11px] font-medium border-b" style={{ background: "#4DA3FF", color: "var(--navy)", borderColor: "rgba(11,35,80,0.15)" }}>
        <div className="max-w-[1400px] mx-auto px-6 h-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2"><span className="live-dot" /><span>Network <b>LIVE</b></span></span>
            <span className="hidden sm:inline opacity-60">·</span><span className="hidden sm:inline num"><b>3,128</b> toll roads tracked</span>
            <span className="hidden md:inline opacity-60">·</span><span className="hidden md:inline num">5-axle avg <b>$0.21</b>/mi · Diesel <b>$5.18</b>/gal</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.14em]"><span className="opacity-70">v2026.05</span><a href="#api" className="opacity-90 hover:opacity-100">API status</a></div>
        </div>
      </div>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section className="relative overflow-hidden text-white">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline><source src={asset("/hero-toll.mp4")} type="video/mp4" /></video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(1,7,26,0.82) 0%,rgba(1,7,26,0.55) 42%,rgba(1,7,26,0.86) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 520px at 18% 22%,rgba(11,35,80,0.28),transparent 60%),radial-gradient(820px 520px at 86% 82%,rgba(255,59,48,0.18),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 md:py-40">
          <div className="max-w-3xl">
            <h1 className="display text-white text-[40px] md:text-[66px] leading-[1.03]">Every toll on your truck route — <span style={{ color: "#FF6A5E" }}>priced before you dispatch.</span></h1>
            <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-xl leading-relaxed">Instant toll costs for any lane across the U.S. &amp; Canada — by axle class, transponder network, bridges, tunnels and congestion pricing. Fully itemised in seconds.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/#quote" className="btn-primary px-6 py-3.5 rounded-lg text-[14px] font-semibold inline-flex items-center gap-2"><span className="label">Get toll estimate</span></Link>
              <Link href="/#network" className="px-6 py-3.5 rounded-lg text-[14px] text-white font-semibold" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}>Explore the network</Link>
            </div>
            <div className="mt-12 flex items-center gap-7 text-[11px] uppercase tracking-[0.16em] text-white/60">
              <div><div className="text-[26px] md:text-[30px] display num text-white">3,100+</div><div className="mt-0.5">Toll roads</div></div>
              <div className="h-9 w-px bg-white/20" />
              <div><div className="text-[26px] md:text-[30px] display num text-white">48</div><div className="mt-0.5">States</div></div>
              <div className="h-9 w-px bg-white/20" />
              <div><div className="text-[26px] md:text-[30px] display num text-white">250,000+</div><div className="mt-0.5">Routes priced</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="py-11 border-b border-white/10" style={{ background: "#0B2350" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-white/65">Trusted by fleets, owner-operators, brokers & 3PLs</div>
          <div className="mt-6 overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
            <div className="marquee-track">{[...BRANDS, ...BRANDS].map((b, i) => <span key={i} className="brand-logo text-white"><span className="text-[18px] font-bold tracking-tight whitespace-nowrap">{b}</span></span>)}</div>
          </div>
        </div>
      </section>

      {/* CALCULATE YOUR RATE */}
      <section id="quote" className="relative overflow-hidden py-20 md:py-24" style={{ background: "radial-gradient(900px 500px at 80% 0%,rgba(58,95,192,0.2),transparent 60%),linear-gradient(180deg,#0B2350,#06143A)" }}>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--blue-2)]">Instant toll engine</div>
            <h2 className="display text-white text-[44px] md:text-[64px] leading-[1.03] mt-3">Price your tolls.</h2>
            <p className="text-white/60 text-[15px] md:text-[16px] mt-4 max-w-xl mx-auto">Pick a route, see it on the network, and get a fully itemised toll cost — by axle class and transponder — in seconds.</p>
          </div>
          <CalculateRate />
        </div>
      </section>

      {/* HOW IT WORKS — Quote, route, book */}
      <section id="how" className="py-24 relative overflow-hidden text-white" style={{ background: "radial-gradient(760px 460px at 10% 12%,rgba(255,59,48,0.16),transparent 60%),radial-gradient(820px 520px at 92% 30%,rgba(58,95,192,0.18),transparent 60%),linear-gradient(180deg,#08163C 0%,#0C2150 60%,#0A1C45 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-6 reveal">
            <div className="max-w-xl"><div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--red)]">How it works</div><h2 className="display text-[40px] md:text-[48px] text-white leading-[1.05] mt-2">Route, price, dispatch — one continuous flow.</h2></div>
            <p className="max-w-md text-white/60 text-[15px]">From the first input to a customer-ready PDF, every truck route is toll-priced and visualized in under a minute.</p>
          </div>
          <div className="hiw reveal mt-20">
            <div className="hiw-line" />
            <div className="hiw-spark" />
            <div className="hiw-row">
              {/* 01 — icon top, text bottom */}
              <div className="hiw-col">
                <div className="hiw-half top"><div className="hiw-icon"><img src={asset("/hiw-origin.png")} alt="Choose origin port" loading="lazy" /></div><div className="hiw-stub" /></div>
                <div className="hiw-node" />
                <div className="hiw-half bot"><div className="hiw-text"><div className="hiw-title">Set origin</div><div className="hiw-uline" style={{ background: "#FF3B30" }} /><p className="hiw-desc">Start anywhere across the U.S. &amp; Canada — a yard, a dock, a city or a precise pin dropped on the map.</p></div></div>
              </div>
              {/* 02 — text top, icon bottom */}
              <div className="hiw-col">
                <div className="hiw-half top"><div className="hiw-text"><div className="hiw-title">Pick destination</div><div className="hiw-uline" style={{ background: "#FF3B30" }} /><p className="hiw-desc">Door, warehouse or terminal across thousands of delivery cities — typed or dropped on the map.</p></div></div>
                <div className="hiw-node" />
                <div className="hiw-half bot"><div className="hiw-stub" /><div className="hiw-icon"><img src={asset("/hiw-destination.png")} alt="Pick destination" loading="lazy" /></div></div>
              </div>
              {/* 03 — icon top, text bottom */}
              <div className="hiw-col">
                <div className="hiw-half top"><div className="hiw-icon"><img src={asset("/hiw-calculate.png")} alt="Calculate rate" loading="lazy" /></div><div className="hiw-stub" /></div>
                <div className="hiw-node" />
                <div className="hiw-half bot"><div className="hiw-text"><div className="hiw-title">Calculate tolls</div><div className="hiw-uline" style={{ background: "#3A5FC0" }} /><p className="hiw-desc">A fully itemised toll cost in under 30 seconds — toll roads, bridges, tunnels, congestion and axle class baked in.</p></div></div>
              </div>
              {/* 04 — text top, icon bottom */}
              <div className="hiw-col">
                <div className="hiw-half top"><div className="hiw-text"><div className="hiw-title">Export quote</div><div className="hiw-uline" style={{ background: "#1E3A8A" }} /><p className="hiw-desc">Send it out as a brand-ready PDF, structured JSON or embeddable HTML — your markup applied automatically.</p></div></div>
                <div className="hiw-node" />
                <div className="hiw-half bot"><div className="hiw-stub" /><div className="hiw-icon"><img src={asset("/hiw-export.png")} alt="Export quote PDF" loading="lazy" /></div></div>
              </div>
              {/* 05 — $ icon top, text bottom */}
              <div className="hiw-col">
                <div className="hiw-half top"><div className="hiw-icon"><div className="text-center leading-tight"><div className="text-[9px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--muted)" }}>from</div><div className="display text-[28px]" style={{ color: "var(--navy)" }}>$0.11</div><div className="text-[8px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--muted)" }}>/ mi</div></div></div><div className="hiw-stub" /></div>
                <div className="hiw-node" />
                <div className="hiw-half bot"><div className="hiw-text"><div className="hiw-title">Dispatch route</div><div className="hiw-uline" style={{ background: "#FF3B30" }} /><p className="hiw-desc">Lock the toll-priced route, push it to your TMS or driver, and track spend against the estimate in real time.</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section id="network" className="py-24 text-white relative overflow-hidden" style={{ background: "#06143A" }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ background: "radial-gradient(circle at 25% 20%,#3A5FC0 0%,transparent 40%),radial-gradient(circle at 80% 70%,#FF3B30 0%,transparent 45%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--blue)]">North American network</div>
              <h2 className="display text-[40px] md:text-[48px] leading-[1.05] mt-2">One toll engine. Every turnpike from Seattle to Savannah.</h2>
              <p className="mt-5 text-white/70 max-w-md text-[15px]">Real-time toll rates across 3,100+ toll roads, bridges and tunnels, every transponder network, and thousands of corridors — kept current as authorities change their tariffs.</p>
              <div className="mt-8 grid grid-cols-2 gap-3 text-[12px]">
                {[["Northeast", "E-ZPass · NJTP · Mass Pike"], ["Southeast", "SunPass · PeachPass · NC Quick"], ["Texas", "TxTag · NTTA · EZ TAG"], ["West & Midwest", "FasTrak · I-PASS · ExpressToll"]].map(([k, v]) => <div key={k} className="glass-dark rounded-lg p-3"><div className="text-white/55 text-[10px] uppercase tracking-wider">{k}</div><div className="display text-white text-[16px] mt-0.5">{v}</div></div>)}
              </div>
            </div>
            <div className="reveal reveal-d1"><NetworkMap /></div>
          </div>
        </div>
      </section>

      {/* SHIPMENTS IN PROCESS */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#FFFFFF,#EEF4F9)" }}>
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto reveal">
            <h2 className="display text-[40px] md:text-[52px] text-[var(--navy)] leading-[1.04]">Routes in process</h2>
            <div className="mt-6 flex items-center justify-center gap-4"><Link href="/estimates" className="text-[14px] font-semibold text-[var(--navy)] inline-flex items-center gap-1.5">View all <Arrow /></Link><Link href="/#quote" className="px-5 py-2.5 rounded-lg text-[13px] font-semibold bg-[var(--navy)] text-white hover:bg-[var(--navy-2)] transition">Estimate a route</Link></div>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {SHIP.map((s, i) => (
              <div key={s.title} className={`bg-white rounded-2xl p-6 border border-[var(--navy)]/8 reveal reveal-d${i}`}>
                <div className="flex items-center justify-between"><div className="flex items-center gap-2.5">{s.icon}<h3 className="display text-[19px] text-[var(--navy)]">{s.title}</h3></div><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 11v5" strokeLinecap="round" /><circle cx="12" cy="7.8" r="0.6" fill="var(--green)" /></svg></div>
                <Ticker rows={s.rows} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE DIGITAL TWIN */}
      <section className="py-28 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 0%,#0B2350,#06143A 70%)", color: "#fff" }}>
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--blue)]">Every route, modeled.</div>
              <h2 className="display text-[40px] md:text-[52px] leading-[1.04] mt-2">A live digital twin of every route on the platform.</h2>
              <p className="text-white/65 mt-5 max-w-lg text-[15px]">Axle class, weight, height, transponder, time of day — every variable feeds the toll engine. Estimates update as authorities change their tariffs.</p>
              <div className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
                {[["Axle classes", "6"], ["Live variables", "38"], ["Reprice latency", "120ms"], ["Rate refresh", "Daily"]].map(([k, v]) => <div key={k} className="glass-dark rounded-xl p-4"><div className="text-white/55 text-[10px] uppercase tracking-wider">{k}</div><div className="display num text-[24px] mt-1">{v}</div></div>)}
              </div>
            </div>
            <div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>
              <div className="scene"><div className="box3d"><div className="face front"><div className="box-no num">DRT · 2026 · 4520-7</div><div className="box-label">DRAY TOLL</div></div><div className="face back" /><div className="face right" /><div className="face left" /><div className="face top" /><div className="face bot" /></div></div>
              <div className="floating-tag glass-dark rounded-xl px-3 py-2 text-[11px]" style={{ top: "8%", left: "5%", animationDelay: "-1s" }}><div className="text-white/55 text-[9px] uppercase tracking-wider">Axle class</div><div className="display text-white">5-axle semi</div></div>
              <div className="floating-tag glass-dark rounded-xl px-3 py-2 text-[11px]" style={{ top: "20%", right: "5%", animationDelay: "-2.5s" }}><div className="text-white/55 text-[9px] uppercase tracking-wider">Weight</div><div className="display text-white num">38,420 lb</div></div>
              <div className="floating-tag glass-dark rounded-xl px-3 py-2 text-[11px]" style={{ bottom: "18%", left: "8%", animationDelay: "-3.5s" }}><div className="text-white/55 text-[9px] uppercase tracking-wider">Transponder</div><div className="display text-white">E-ZPass</div></div>
              <div className="floating-tag glass-dark rounded-xl px-3 py-2 text-[11px]" style={{ bottom: "8%", right: "6%", animationDelay: "-1.5s" }}><div className="text-white/55 text-[9px] uppercase tracking-wider">Toll points</div><div className="display text-white num">14</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* COST CARDS */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#F8FAFC,#EEF2F8)" }}>
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: "radial-gradient(800px 400px at 80% 10%,rgba(58,95,192,0.18),transparent 60%),radial-gradient(700px 400px at 10% 80%,rgba(255,59,48,0.13),transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="max-w-2xl reveal"><div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--red)]">Toll transparency</div><h2 className="display text-[40px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-2">Every toll on the route, accounted for.</h2><p className="mt-4 text-[var(--muted)] text-[15px]">No surprise plazas. No pay-by-plate shock weeks later. Six toll components on every estimate — priced from current authority tariffs.</p></div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COSTS.map((c, i) => (
              <div key={c.n} className={`bg-white rounded-2xl p-6 reveal reveal-d${i % 3} flex items-start gap-4`} style={{ border: "1px solid rgba(11,35,80,0.07)" }}>
                <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: c.a }}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: c.i }} /></div>
                <div><div className="display text-[17px] text-[var(--navy)]">{c.n}</div><p className="text-[13px] text-[var(--muted)] mt-1.5 leading-relaxed">{c.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      {/* ESTIMATES CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 text-center reveal">
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Live estimate stream</div>
          <h2 className="display text-[36px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-2">Every toll, live on the network</h2>
          <p className="mt-4 text-[var(--muted)] text-[15px] max-w-xl mx-auto">Watch real route tolls stream in and price in seconds across every U.S. and Canadian corridor.</p>
          <Link href="/estimates" className="btn-primary inline-flex items-center gap-2 mt-7 px-7 py-3.5 rounded-xl text-[15px] font-semibold"><span className="label">View all estimates</span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
        </div>
      </section>

      <Testimonials />

      {/* UNIT CONVERTER */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto reveal"><div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Free trucking tool</div><h2 className="display text-[40px] md:text-[52px] text-[var(--navy)] leading-[1.04] mt-2">Online Unit Converter</h2><p className="mt-4 text-[var(--muted)] text-[15px] leading-relaxed">Accurately, quickly and for free convert common units of measurement. Enter a value, pick a category, then choose the <i>from</i> and <i>to</i> units to convert instantly.</p></div>
          <div className="mt-12 reveal reveal-d1"><UnitConverter initial="Acceleration" /></div>
        </div>
      </section>

      {/* PORTS BANNER */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="ports-band flex flex-col md:block">
            <div className="pmap" style={{ backgroundImage: `url(${asset("/usa-map.svg")})` }} />
            <div className="relative z-10 text-center px-6 pt-12 pb-10 md:py-16 max-w-xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-white/80">U.S. coverage</div>
              <h2 className="display text-white text-[34px] md:text-[44px] leading-[1.05] mt-2">Explore the U.S. toll network</h2>
              <p className="text-white/85 text-[15px] mt-4">Browse every major toll road, bridge and tunnel across all 48 states — then price a truck route in seconds.</p>
              <Link href="/tools/ports" className="inline-flex items-center gap-2 mt-7 bg-white text-[var(--navy)] font-semibold text-[14px] px-6 py-3 rounded-xl">Browse toll roads <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
            </div>
            {/* left filters card */}
            <div className="ports-card left">
              <div className="flex items-center justify-between mb-4">
                <div className="display text-[19px] text-[var(--navy)]">Filters</div>
                <div className="flex items-center gap-3"><span className="text-[13px] text-[var(--muted)] cursor-pointer">Clear</span><span className="bg-[var(--navy)] text-white text-[13px] font-semibold px-4 py-2 rounded-lg">Show 20</span></div>
              </div>
              <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--muted)] mb-2">Sort by</div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="pf-radio"><span className="pf-dot" />Toll roads</div>
                <div className="pf-radio sel"><span className="pf-dot" />Bridges</div>
                <div className="pf-radio"><span className="pf-dot" />Tunnels</div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div><div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--muted)]">Toll roads</div><div className="pf-track"><div className="pf-fill" style={{ width: "18%" }} /><div className="pf-knob" style={{ left: "18%" }} /></div></div>
                <div><div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--muted)] flex justify-between">Bridges <span className="bg-[var(--navy)]/6 px-2 rounded-full text-[var(--navy)]">500</span></div><div className="pf-track"><div className="pf-fill" style={{ width: "55%" }} /><div className="pf-knob" style={{ left: "55%" }} /></div></div>
                <div><div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--muted)]">Tunnels</div><div className="pf-track"><div className="pf-fill" style={{ width: "35%" }} /><div className="pf-knob" style={{ left: "35%" }} /></div></div>
              </div>
            </div>
            {/* right top-ports card */}
            <div className="ports-card right">
              <div className="px-4 pt-1 pb-2 text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--muted)] flex items-center gap-1.5"><span className="flag">🇺🇸</span> Top U.S. toll roads</div>
              {([["NJ Turnpike", 48], ["PA Turnpike", 45], ["I-95 Express, FL", 52], ["Ohio Turnpike", 33], ["Sam Houston Tollway", 29], ["Indiana Toll Rd", 21]] as [string, number][]).map(([city, n]) => (
                <div key={city} className="pc-row"><svg className="pc-pin" viewBox="0 0 24 24"><path d="M12 22s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" /><circle cx="12" cy="11" r="2.6" fill="#fff" /></svg>{city} <span className="text-[var(--muted)] font-normal">({n})</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0B2350 0%,#06143A 60%,#1E3C82 100%)" }}>
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: "radial-gradient(700px 400px at 90% 50%,rgba(255,59,48,0.25),transparent 60%),radial-gradient(600px 400px at 10% 80%,rgba(58,95,192,0.22),transparent 60%)" }} />
        <div className="max-w-[900px] mx-auto px-6 text-center reveal relative">
          <h2 className="display text-white text-[44px] md:text-[58px] leading-[1.03]">Get your route tolls in seconds.</h2>
          <p className="text-white/70 mt-4">Instant toll pricing. Full transparency. Nationwide coverage. Built for the fleets, owner-operators and brokers running North American freight.</p>
          <Link href="/#quote" className="btn-primary inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-xl text-[15px] font-semibold"><span className="label">Price my first route</span></Link>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
