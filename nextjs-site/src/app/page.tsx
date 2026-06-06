"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import Testimonials from "@/components/Testimonials";
import Chat from "@/components/Chat";
import StatBand from "@/components/StatBand";
import FreightFeatures from "@/components/FreightFeatures";
import ContainerLanes from "@/components/ContainerLanes";
import HowSteps from "@/components/HowSteps";
import WhoUses from "@/components/WhoUses";
import Ticker from "@/components/Ticker";
import CalculateRate from "@/components/CalculateRate";
import TollSavings from "@/components/TollSavings";
import { asset } from "@/lib/site";

const BRANDS = ["CARGOMAX", "portlink", "NORDFREIGHT", "veritas3pl", "ARC LOGISTICS", "Halo Freight", "ROADWORKS", "Meridian Fleet", "Atlas Carriers", "Northstar Cargo"];
// Solid (filled) icons — rendered with fill="currentColor".
const COSTS = [
  { n: "Toll roads", d: "Live per-mile rates × tolled miles × your axle class.", i: '<path d="M12 2a7 7 0 0 0-7 7c0 4.6 5.7 11.5 6.2 12.1a1 1 0 0 0 1.6 0C13.3 20.5 19 13.6 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/>', a: "#FF6B00" },
  { n: "Bridges & tunnels", d: "Per-crossing tolls for heavy vehicles, by axle count.", i: '<path d="M12 3a10 10 0 0 0-10 9 1 1 0 0 0 1 1h1v6h2v-6h3v6h2v-6h2v6h2v-6h3v6h2v-6h1a1 1 0 0 0 1-1A10 10 0 0 0 12 3Z"/>', a: "#3A5FC0" },
  { n: "Axle-based rates", d: "2 to 6+ axles — every authority prices weight differently.", i: '<path d="M3 7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1h2.4a2 2 0 0 1 1.72.98l1.6 2.67A2 2 0 0 1 24 12.7V15a1 1 0 0 1-1 1h-1.2a3 3 0 0 1-5.6 0H9.8a3 3 0 0 1-5.6 0H3a1 1 0 0 1-1-1V7Zm14 3h4l-1.2-2H17v2ZM7 18.5A1.5 1.5 0 1 0 7 15.5a1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>', a: "#0B2D5C" },
  { n: "Congestion & peak", d: "Time-of-day, express-lane and managed-lane pricing.", i: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 9.6 2.7 1.55a1 1 0 1 1-1 1.74l-3.2-1.85A1 1 0 0 1 11 12V7a1 1 0 1 1 2 0v4.6Z"/>', a: "#FF6B00" },
  { n: "Transponder networks", d: "E-ZPass, SunPass, TxTag, I-PASS — discounts & account fees.", i: '<path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1H3V6Zm0 4h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Zm3 5a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H6Z"/>', a: "#1E3A8A" },
  { n: "Cash & video tolls", d: "Pay-by-plate surcharges when you run a lane without a tag.", i: '<path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Zm10 1.5A3.5 3.5 0 1 0 12 15.5a3.5 3.5 0 0 0 0-7ZM5.5 8A1.5 1.5 0 0 0 4 9.5a1 1 0 0 0 2 0A1.5 1.5 0 0 0 5.5 8Zm13 5a1.5 1.5 0 0 0-1.5 1.5 1 1 0 0 0 2 0 1.5 1.5 0 0 0-.5-1.5Z"/>', a: "#FF6B00" },
];
const Arrow = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--navy)]/35 shrink-0"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
type Lane = [string, string, string];
const SHIP: { title: string; icon: React.ReactNode; rows: Lane[] }[] = [
  { title: "5-axle semi", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 17V7H2v10h2" /><path d="M14 9h4l4 4v4h-2" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>, rows: [["Los Angeles", "Phoenix, AZ", "$74"], ["Long Beach", "Las Vegas, NV", "$58"], ["Oakland", "Sacramento, CA", "$19"], ["Seattle", "Portland, OR", "$33"], ["Houston", "San Antonio, TX", "$41"]] },
  { title: "6-axle heavy", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="12" width="7" height="7" rx="1" /><rect x="14" y="12" width="7" height="7" rx="1" /><rect x="8.5" y="4" width="7" height="7" rx="1" /></svg>, rows: [["Los Angeles", "Dallas, TX", "$112"], ["New York/NJ", "Chicago, IL", "$96"], ["Norfolk", "Atlanta, GA", "$63"], ["Long Beach", "Denver, CO", "$88"], ["Miami", "Orlando, FL", "$57"]] },
  { title: "Oversize / permit", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.7" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="1" /><path d="M7 6v12M11 6v12M15 6v12" /></svg>, rows: [["Houston", "Kansas City, MO", "$164"], ["Seattle", "Salt Lake City, UT", "$148"], ["Oakland", "Reno, NV", "$96"], ["New York/NJ", "Indianapolis, IN", "$182"], ["Charleston", "Columbus, OH", "$138"]] },
];

export default function Home() {
  return (
    <>
      <div className="text-[11px] font-medium border-b text-white" style={{ background: "#FF6B00", borderColor: "rgba(255,255,255,0.2)" }}>
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
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="auto" poster={asset("/hero-toll.jpg")}><source src={asset("/hero-toll.mp4")} type="video/mp4" /></video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(1,7,26,0.82) 0%,rgba(1,7,26,0.55) 42%,rgba(1,7,26,0.86) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 520px at 18% 22%,rgba(11,35,80,0.28),transparent 60%),radial-gradient(820px 520px at 86% 82%,rgba(255,107,0,0.18),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-[440px_1fr] gap-10 lg:gap-14 items-stretch">
            {/* LEFT — savings calculator */}
            <TollSavings />
            {/* RIGHT — headline */}
            <div className="flex flex-col justify-center h-full">
              <div className="inline-flex items-center gap-2 self-start rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-5" style={{ background: "rgba(255,107,0,0.16)", border: "1px solid rgba(255,107,0,0.4)" }}>
                <span className="live-dot" /> Commercial truck toll data — updated every 15 minutes
              </div>
              <h1 className="display text-white text-[40px] md:text-[64px] leading-[1.02]">Toll intelligence for <span className="bg-gradient-to-r from-[#FFD36B] via-[#FF9A5B] to-[#FF6B00] bg-clip-text text-transparent">trucks &amp; container freight.</span></h1>
              <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-xl leading-relaxed">Class-aware toll rates for drayage, intermodal, and heavy freight — from port gates to inland ramps. Power TMS, fleet, and shipping platforms with one API.</p>
              <div className="mt-8 grid w-fit grid-cols-2 gap-3">
                {/* App Store badge */}
                <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[44px] w-full pl-3 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200">
                  <svg width="22" height="22" viewBox="0 0 384 512" fill="#fff" aria-hidden="true" className="shrink-0"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] opacity-90">Download on the</span><span className="block text-[14px] font-semibold tracking-tight">App Store</span></span>
                </a>
                {/* Google Play badge */}
                <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[44px] w-full pl-3 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200">
                  <svg width="22" height="24" viewBox="0 0 512 512" aria-hidden="true" className="shrink-0"><path fill="#4895F6" d="M60 40 220 256 60 472z"/><path fill="#1FBE5B" d="M60 40 340 188 220 256z"/><path fill="#EE4339" d="M60 472 340 324 220 256z"/><path fill="#FFBA00" d="M340 188 L424 236 Q450 252 450 256 Q450 260 424 276 L340 324 L220 256 Z"/></svg>
                  <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] uppercase tracking-[0.14em] opacity-90">Get it on</span><span className="block text-[14px] font-semibold tracking-tight">Google Play</span></span>
                </a>
              </div>
              <div className="mt-5 text-[12px] text-white/55">🚛 Built for 5-axle rigs, chassis moves, and E-ZPass fleets</div>
              <div className="mt-10 flex items-center gap-7 text-[11px] uppercase tracking-[0.16em] text-white/60">
                <div><div className="text-[26px] md:text-[30px] display num text-white">3,100+</div><div className="mt-0.5">Toll roads</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">48</div><div className="mt-0.5">States</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">250,000+</div><div className="mt-0.5">Routes priced</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="py-11 border-b border-white/10" style={{ background: "#0B2D5C" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-white/65">Trusted by fleets, owner-operators, brokers & 3PLs</div>
          <div className="mt-6 overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
            <div className="marquee-track">{[...BRANDS, ...BRANDS].map((b, i) => <span key={i} className="brand-logo text-white"><span className="text-[18px] font-bold tracking-tight whitespace-nowrap">{b}</span></span>)}</div>
          </div>
        </div>
      </section>

      <StatBand />
      <FreightFeatures />

      {/* CALCULATE YOUR RATE */}
      <section id="quote" className="relative overflow-hidden py-20 md:py-24" style={{ background: "radial-gradient(900px 500px at 80% 0%,rgba(58,95,192,0.2),transparent 60%),linear-gradient(180deg,#0B2D5C,#061A38)" }}>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--blue-2)]">Instant toll engine</div>
            <h2 className="display text-white text-[44px] md:text-[64px] leading-[1.03] mt-3">Price your tolls.</h2>
            <p className="text-white/60 text-[15px] md:text-[16px] mt-4 max-w-xl mx-auto">Pick a route, see it on the network, and get a fully itemised toll cost — by axle class and transponder — in seconds.</p>
          </div>
          <CalculateRate />
        </div>
      </section>

      <ContainerLanes />
      <HowSteps />

      {/* SHIPMENTS IN PROCESS */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#FFFFFF,#EEF4F9)" }}>
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Live on the network</div>
            <h2 className="display text-[40px] md:text-[52px] text-[var(--navy)] leading-[1.04] mt-2">Tolls priced right now</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px]">Real truck tolls being calculated across the country this minute — by axle class, from 5-axle semis to oversize permit loads.</p>
            <div className="mt-6 flex items-center justify-center gap-4"><Link href="/estimates" className="text-[14px] font-semibold text-[var(--navy)] inline-flex items-center gap-1.5">View all <Arrow /></Link><Link href="/#quote" className="px-5 py-2.5 rounded-lg text-[13px] font-semibold bg-[var(--navy)] text-white hover:bg-[var(--navy-2)] transition">Calculate a toll</Link></div>
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
      <section className="py-28 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 0%,#0B2D5C,#061A38 70%)", color: "#fff" }}>
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--red)]">Every variable, priced.</div>
              <h2 className="display text-[40px] md:text-[52px] leading-[1.04] mt-2">The model behind every toll number.</h2>
              <p className="text-white/65 mt-5 max-w-lg text-[15px]">Axle count, gross weight, height, width, transponder, commercial status and time of day — every input feeds the rate engine so the toll you see is the toll you pay. No guesswork, no surprise plaza charges.</p>
              <div className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
                {[["Toll authorities", "510+"], ["Pricing inputs", "38"], ["Reprice latency", "120ms"], ["Rate refresh", "Daily"]].map(([k, v]) => <div key={k} className="glass-dark rounded-xl p-4"><div className="text-white/55 text-[10px] uppercase tracking-wider">{k}</div><div className="display num text-[24px] mt-1">{v}</div></div>)}
              </div>
            </div>
            <div className="relative flex items-center justify-center" style={{ minHeight: 480 }}>
              <div className="relative rounded-lg overflow-hidden border border-white/10 w-full max-w-[640px] aspect-video shadow-2xl">
                <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="none" poster={asset("/hero-toll.jpg")}><source src={asset("/toll-road.mp4")} type="video/mp4" /></video>
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(6,26,56,0.15),rgba(6,26,56,0.45))" }} />
              </div>
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
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: "radial-gradient(800px 400px at 80% 10%,rgba(58,95,192,0.18),transparent 60%),radial-gradient(700px 400px at 10% 80%,rgba(255,107,0,0.13),transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="max-w-2xl reveal"><div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--red)]">Toll transparency</div><h2 className="display text-[40px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-2">Every toll on the route, accounted for.</h2><p className="mt-4 text-[var(--muted)] text-[15px]">No surprise plazas. No pay-by-plate shock weeks later. Six toll components on every estimate — priced from current authority tariffs.</p></div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COSTS.map((c, i) => (
              <div key={c.n} className={`bg-white rounded-2xl p-6 reveal reveal-d${i % 3} flex items-start gap-4`} style={{ border: "1px solid rgba(11,35,80,0.07)" }}>
                <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: c.a }}><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" dangerouslySetInnerHTML={{ __html: c.i }} /></div>
                <div><div className="display text-[17px] text-[var(--navy)]">{c.n}</div><p className="text-[13px] text-[var(--muted)] mt-1.5 leading-relaxed">{c.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhoUses />

      <Testimonials />

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

      <Footer />
      <Chat />
    </>
  );
}
