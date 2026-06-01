"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import Testimonials from "@/components/Testimonials";
import Chat from "@/components/Chat";
import Stats from "@/components/Stats";
import UnitConverter from "@/components/UnitConverter";
import UsMap from "@/components/UsMap";
import CalculateRate from "@/components/CalculateRate";
import { asset } from "@/lib/site";

const BRANDS = ["CARGOMAX", "portlink", "NORDFREIGHT", "veritas3pl", "ARC LOGISTICS", "Halo Freight", "CONTAINERWORKS", "Meridian Drayage", "Atlas BCO", "Northstar Cargo"];
const COSTS = [
  { n: "Fuel + FSC", d: "Live diesel × MPG × distance, plus carrier FSC.", i: '<line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>', a: "#FF3B30" },
  { n: "Driver labor", d: "Hourly wage × transit time + per diem on 400+ mi.", i: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/>', a: "#3A5FC0" },
  { n: "Port charges", d: "Gate fees, terminal handling, exam fees if pulled.", i: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>', a: "#0B2350" },
  { n: "Chassis", d: "Daily rental, pool fees, per-diem on long dwell.", i: '<path d="M14 18V6H2v12h2"/><path d="M14 8h4l4 4v6h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>', a: "#FF3B30" },
  { n: "Accessorials", d: "Tolls, overweight, hazmat, reefer plug, lumper.", i: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>', a: "#FF3B30" },
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
      <div className="text-[11px] font-medium border-b" style={{ background: "#4DA3FF", color: "var(--navy)", borderColor: "rgba(11,35,80,0.15)" }}>
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
      <section className="relative overflow-hidden text-white">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline><source src={asset("/hero-cargo.mp4")} type="video/mp4" /></video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(1,7,26,0.82) 0%,rgba(1,7,26,0.55) 42%,rgba(1,7,26,0.86) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 520px at 18% 22%,rgba(11,35,80,0.28),transparent 60%),radial-gradient(820px 520px at 86% 82%,rgba(255,59,48,0.18),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-28 md:py-40">
          <div className="max-w-3xl">
            <h1 className="display text-white text-[40px] md:text-[66px] leading-[1.03]">Drayage quotes, port to door — <span style={{ color: "#FF6A5E" }}>priced in 30 seconds.</span></h1>
            <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-xl leading-relaxed">Live diesel, FSC, chassis and port fees across every major U.S. &amp; Canadian container port — instant, fully itemised, and locked for 24 hours.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/#quote" className="btn-primary px-6 py-3.5 rounded-lg text-[14px] font-semibold inline-flex items-center gap-2"><span className="label">Get instant quote</span></Link>
              <Link href="/#network" className="px-6 py-3.5 rounded-lg text-[14px] text-white font-semibold" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}>Explore the network</Link>
            </div>
            <div className="mt-12 flex items-center gap-7 text-[11px] uppercase tracking-[0.16em] text-white/60">
              <div><div className="text-[26px] md:text-[30px] display num text-white">50</div><div className="mt-0.5">Ports</div></div>
              <div className="h-9 w-px bg-white/20" />
              <div><div className="text-[26px] md:text-[30px] display num text-white">1,200+</div><div className="mt-0.5">Lanes</div></div>
              <div className="h-9 w-px bg-white/20" />
              <div><div className="text-[26px] md:text-[30px] display num text-white">250,000+</div><div className="mt-0.5">Quotes</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="py-11 border-b border-white/10" style={{ background: "#0B2350" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-white/65">Trusted by brokers, freight forwarders, importers & 3PLs</div>
          <div className="mt-6 overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
            <div className="marquee-track">{[...BRANDS, ...BRANDS].map((b, i) => <span key={i} className="brand-logo text-white"><span className="text-[18px] font-bold tracking-tight whitespace-nowrap">{b}</span></span>)}</div>
          </div>
        </div>
      </section>

      {/* CALCULATE YOUR RATE */}
      <section id="quote" className="relative overflow-hidden py-20 md:py-24" style={{ background: "radial-gradient(900px 500px at 80% 0%,rgba(58,95,192,0.2),transparent 60%),linear-gradient(180deg,#0B2350,#06143A)" }}>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--blue-2)]">Instant quote engine</div>
            <h2 className="display text-white text-[44px] md:text-[64px] leading-[1.03] mt-3">Calculate your rate.</h2>
            <p className="text-white/60 text-[15px] md:text-[16px] mt-4 max-w-xl mx-auto">Pick a lane, see it on the network, and get a fully itemised, all-in price in seconds.</p>
          </div>
          <CalculateRate />
        </div>
      </section>

      {/* HOW IT WORKS — Quote, route, book */}
      <section id="how" className="py-24 relative overflow-hidden text-white" style={{ background: "radial-gradient(760px 460px at 10% 12%,rgba(255,59,48,0.16),transparent 60%),radial-gradient(820px 520px at 92% 30%,rgba(58,95,192,0.18),transparent 60%),linear-gradient(180deg,#08163C 0%,#0C2150 60%,#0A1C45 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-6 reveal">
            <div className="max-w-xl"><div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--red)]">How it works</div><h2 className="display text-[40px] md:text-[48px] text-white leading-[1.05] mt-2">Quote, route, book — one continuous flow.</h2></div>
            <p className="max-w-md text-white/60 text-[15px]">From the first input to a customer-ready PDF, every drayage move is priced and visualized in under a minute.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-14">
            {[["hiw-origin", "Choose origin", "#FF3B30", "Pick from every container port across the U.S. & Canada — West Coast, Gulf, East Coast and every Class I rail ramp."], ["hiw-destination", "Pick destination", "#FF3B30", "Door, warehouse or ramp across 1,200+ inland delivery cities — typed or dropped on the map."], ["hiw-calculate", "Calculate rate", "#3A5FC0", "A fully itemised, all-in price in under 30 seconds — live diesel, FSC, chassis pool and port fees baked in."], ["hiw-export", "Export quote", "#1E3A8A", "Send it out as a brand-ready PDF, structured JSON or embeddable HTML — your markup applied automatically."], ["$3.50", "Book shipment", "#FF3B30", "Hand off to any of 2,800+ vetted carrier partners and track the container from gate to door."]].map(([img, t, c, d], i) => (
              <div key={t} className="bg-white rounded-2xl p-6 text-center reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
                <div className="hiw-icon mx-auto" style={{ width: 72, height: 72 }}>{img.startsWith("$") ? <div className="text-center leading-tight"><div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">from</div><div className="display text-[28px] text-[var(--navy)]">{img}</div></div> : <img src={asset(`/${img}.png`)} alt="" />}</div>
                <div className="display text-[17px] text-[var(--navy)] mt-4">{t}</div>
                <div className="mx-auto mt-1.5 mb-2" style={{ width: 28, height: 3, borderRadius: 3, background: c }} />
                <p className="text-[12.5px] text-[var(--muted)] leading-relaxed">{d}</p>
              </div>
            ))}
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
              <h2 className="display text-[40px] md:text-[48px] leading-[1.05] mt-2">One rate engine. Every container port from Seattle to Savannah.</h2>
              <p className="mt-5 text-white/70 max-w-md text-[15px]">Real-time pricing across 50+ port complexes, every Class I rail ramp, and 1,200+ inland delivery destinations — covered by 2,800+ carrier partners on the platform.</p>
              <div className="mt-8 grid grid-cols-2 gap-3 text-[12px]">
                {[["West coast", "LAX · LGB · OAK · SEA"], ["East coast", "NY/NJ · NOR · SAV · CHA"], ["Gulf", "HOU · MIA"], ["Canada", "VAN · MTL · HAL"]].map(([k, v]) => <div key={k} className="glass-dark rounded-lg p-3"><div className="text-white/55 text-[10px] uppercase tracking-wider">{k}</div><div className="display text-white text-[16px] mt-0.5">{v}</div></div>)}
              </div>
            </div>
            <div className="reveal reveal-d1"><UsMap height={520} /></div>
          </div>
        </div>
      </section>

      {/* SHIPMENTS IN PROCESS */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#FFFFFF,#EEF4F9)" }}>
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto reveal">
            <h2 className="display text-[40px] md:text-[52px] text-[var(--navy)] leading-[1.04]">Shipments in process</h2>
            <div className="mt-6 flex items-center justify-center gap-4"><Link href="/estimates" className="text-[14px] font-semibold text-[var(--navy)] inline-flex items-center gap-1.5">View all <Arrow /></Link><Link href="/#quote" className="px-5 py-2.5 rounded-lg text-[13px] font-semibold bg-[var(--navy)] text-white hover:bg-[var(--navy-2)] transition">Request a quote</Link></div>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {SHIP.map((s, i) => (
              <div key={s.title} className={`bg-white rounded-2xl p-6 border border-[var(--navy)]/8 reveal reveal-d${i}`}>
                <div className="flex items-center justify-between"><div className="flex items-center gap-2.5">{s.icon}<h3 className="display text-[19px] text-[var(--navy)]">{s.title}</h3></div><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 11v5" strokeLinecap="round" /><circle cx="12" cy="7.8" r="0.6" fill="var(--green)" /></svg></div>
                <div className="mt-4">{s.rows.map(([from, to, time]) => (
                  <div key={from + to} className="flex items-center justify-between border-t border-[var(--navy)]/6 gap-3 py-2.5">
                    <div className="flex items-center gap-2 text-[13.5px] min-w-0"><span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#16B571" }} /><span className="font-semibold text-[var(--navy)]">{from}</span><Arrow /><span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#3A5FC0" }} /><span className="font-semibold text-[var(--navy)] truncate">{to}</span></div>
                    <span className="text-[12px] text-[var(--muted)] shrink-0 num">{time}</span>
                  </div>
                ))}</div>
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

      {/* COST CARDS */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#F8FAFC,#EEF2F8)" }}>
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: "radial-gradient(800px 400px at 80% 10%,rgba(58,95,192,0.18),transparent 60%),radial-gradient(700px 400px at 10% 80%,rgba(255,59,48,0.13),transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="max-w-2xl reveal"><div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--red)]">Cost transparency</div><h2 className="display text-[40px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-2">Every dollar in the quote, accounted for.</h2><p className="mt-4 text-[var(--muted)] text-[15px]">No mystery FSCs. No surprise accessorials at delivery. Six cost components on every quote — priced from live market data.</p></div>
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
          <h2 className="display text-[36px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-2">Every quote, live on the network</h2>
          <p className="mt-4 text-[var(--muted)] text-[15px] max-w-xl mx-auto">Watch real drayage estimates stream in and price in seconds across every U.S. port and lane.</p>
          <Link href="/estimates" className="btn-primary inline-flex items-center gap-2 mt-7 px-7 py-3.5 rounded-xl text-[15px] font-semibold"><span className="label">View all estimates</span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
        </div>
      </section>

      <Testimonials />

      {/* UNIT CONVERTER */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto reveal"><div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Free logistics tool</div><h2 className="display text-[40px] md:text-[52px] text-[var(--navy)] leading-[1.04] mt-2">Online Unit Converter</h2><p className="mt-4 text-[var(--muted)] text-[15px] leading-relaxed">Accurately, quickly and for free convert common units of measurement. Enter a value, pick a category, then choose the <i>from</i> and <i>to</i> units to convert instantly.</p></div>
          <div className="mt-12 reveal reveal-d1"><UnitConverter initial="Acceleration" /></div>
        </div>
      </section>

      {/* PORTS BANNER */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="ports-band">
            <div className="pmap" style={{ backgroundImage: `url(${asset("/usa-map.svg")})` }} />
            <div className="relative z-10 text-center px-6 py-14 max-w-xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-white/80">U.S. coverage</div>
              <h2 className="display text-white text-[34px] md:text-[44px] leading-[1.05] mt-2">Explore the U.S. port network</h2>
              <p className="text-white/85 text-[15px] mt-4">Filter every major U.S. container port and inland ramp across all 48 states — then price a drayage move in seconds.</p>
              <Link href="/tools/ports" className="inline-flex items-center gap-2 mt-7 bg-white text-[var(--navy)] font-semibold text-[14px] px-6 py-3 rounded-xl">Browse ports <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0B2350 0%,#06143A 60%,#1E3C82 100%)" }}>
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
