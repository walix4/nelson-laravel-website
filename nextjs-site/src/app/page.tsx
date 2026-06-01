"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import Testimonials from "@/components/Testimonials";
import Chat from "@/components/Chat";
import { asset } from "@/lib/site";

const BRANDS = ["CARGOMAX", "portlink", "NORDFREIGHT", "veritas3pl", "ARC LOGISTICS", "Halo Freight", "CONTAINERWORKS", "Meridian Drayage", "Atlas BCO", "Northstar Cargo"];
const PORTS: Record<string, number> = { "Los Angeles, CA": 62, "Long Beach, CA": 71, "New York / NJ": 92, "Savannah, GA": 264, "Houston, TX": 248, "Seattle, WA": 1320 };
const DEST = ["Dallas, TX", "Chicago, IL", "Phoenix, AZ", "Atlanta, GA", "Denver, CO", "Memphis, TN"];
const CONT: Record<string, number> = { "20ft": 1, "40ft": 1.18, "40ft-hc": 1.22, reefer: 1.55 };

function Quote() {
  const [origin, setOrigin] = useState("Los Angeles, CA");
  const [dest, setDest] = useState("Dallas, TX");
  const [cont, setCont] = useState("40ft");
  const price = useMemo(() => Math.round((350 + PORTS[origin] * 2.35) * CONT[cont] / 5) * 5, [origin, cont]);
  return (
    <div className="bg-white rounded-[22px] p-7 md:p-8" style={{ border: "1px solid rgba(11,35,80,0.08)" }}>
      <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--navy)]/70">Instant quote engine</div>
      <h2 className="display text-[24px] md:text-[26px] text-[var(--navy)] mt-1">Price your move</h2>
      <div className="space-y-4 mt-5">
        <div><label className="tool-label">Origin port</label><select className="tool-select" value={origin} onChange={(e) => setOrigin(e.target.value)}>{Object.keys(PORTS).map((p) => <option key={p}>{p}</option>)}</select></div>
        <div><label className="tool-label">Destination</label><select className="tool-select" value={dest} onChange={(e) => setDest(e.target.value)}>{DEST.map((d) => <option key={d}>{d}</option>)}</select></div>
        <div><label className="tool-label">Container</label><select className="tool-select" value={cont} onChange={(e) => setCont(e.target.value)}>{Object.keys(CONT).map((c) => <option key={c}>{c}</option>)}</select></div>
      </div>
      <div className="mt-6 flex items-end justify-between rounded-xl px-4 py-4" style={{ background: "rgba(11,35,80,0.04)", border: "1px solid rgba(11,35,80,0.08)" }}>
        <div><div className="text-[11px] uppercase tracking-wider text-[var(--navy)]/55">Estimated round trip</div><div className="display text-[40px] text-[var(--navy)] num leading-none mt-1">${price.toLocaleString()}</div></div>
        <span className="text-[11px] text-[var(--navy)]/60">Rate locks 24h</span>
      </div>
      <p className="text-[10px] text-[var(--navy)]/55 text-center mt-3">No login · No card · Indicative estimate</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ minHeight: "82vh", background: "#06143A" }}>
        <video className="absolute inset-0 w-full h-full object-cover opacity-40" autoPlay muted loop playsInline poster=""><source src={asset("/hero-cargo.mp4")} type="video/mp4" /></video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(6,20,58,0.6),rgba(6,20,58,0.35) 40%,rgba(6,20,58,0.85))" }} />
        <div className="relative max-w-[1400px] mx-auto px-6 flex flex-col justify-center" style={{ minHeight: "82vh" }}>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-white/90 text-[12px] font-semibold px-3 py-1.5 rounded-full" style={{ background: "rgba(255,59,48,0.18)", border: "1px solid rgba(255,59,48,0.35)" }}><span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" /> Live drayage rates — updated every 15 minutes</div>
            <h1 className="display text-white text-[44px] md:text-[68px] leading-[1.02] mt-5">Port to door,<br /><span style={{ color: "var(--red)" }}>priced in seconds.</span></h1>
            <p className="text-white/80 text-[16px] md:text-[18px] mt-5 max-w-xl">Real-time port drayage rates across every major U.S. port and inland lane — for freight brokers, TMS platforms and importers.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/#quote" className="btn-primary px-6 py-3.5 rounded-lg text-[14px] font-semibold inline-flex items-center gap-2"><span className="label">Get instant quote</span></Link>
              <Link href="/#network" className="px-6 py-3.5 rounded-lg text-[14px] text-white font-semibold" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}>Explore the network</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE (navy) */}
      <section className="py-11 border-b border-white/10" style={{ background: "#0B2350" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-white/65">Trusted by brokers, freight forwarders, importers & 3PLs</div>
          <div className="mt-6 overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
            <div className="marquee-track">
              {[...BRANDS, ...BRANDS].map((b, i) => <span key={i} className="brand-logo text-white"><span className="text-[18px] font-bold tracking-tight whitespace-nowrap">{b}</span></span>)}
            </div>
          </div>
        </div>
      </section>

      {/* LIVE NETWORK + QUOTE */}
      <section id="network" className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal"><div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Live network</div><h2 className="display text-[36px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-2">Every U.S. port, one network</h2></div>
          <div className="grid lg:grid-cols-2 gap-8 mt-12 items-center">
            <div id="quote" className="reveal"><Quote /></div>
            <div className="reveal reveal-d1 relative rounded-[22px] overflow-hidden" style={{ background: "linear-gradient(135deg,#0B2350,#1E3C82)", minHeight: 420 }}>
              <div className="absolute inset-0" style={{ backgroundImage: `url(${asset("/usa-map.svg")})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", opacity: 0.25, filter: "brightness(0) invert(1)" }} />
              <div className="absolute inset-0 flex items-center justify-center text-center px-8">
                <div><div className="display text-white text-[40px] leading-none">50+ ports</div><div className="text-white/70 mt-2">1,200+ inland destinations · 2,800+ carriers</div><Link href="/tools/ports" className="inline-flex items-center gap-2 mt-6 bg-white text-[var(--navy)] font-semibold text-[14px] px-5 py-2.5 rounded-xl">Browse ports</Link></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20" style={{ background: "#F4F7FB" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center reveal"><div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">How it works</div><h2 className="display text-[36px] md:text-[46px] text-[var(--navy)] mt-2">Quote to delivery in 4 steps</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {[["hiw-origin", "Pick origin", "Choose any U.S. container port or rail ramp."], ["hiw-calculate", "Get the rate", "Live pricing with FSC and accessorials baked in."], ["hiw-book", "Book the move", "Lock the rate for 24h and dispatch instantly."], ["hiw-destination", "Track to door", "Watch it move from port to warehouse in real time."]].map(([img, t, d], i) => (
              <div key={t} className={`reveal reveal-d${i % 3} bg-white rounded-2xl p-6 text-center`} style={{ border: "1px solid rgba(11,35,80,0.07)" }}>
                <div className="hiw-icon mx-auto" style={{ width: 72, height: 72 }}><img src={asset(`/${img}.png`)} alt="" /></div>
                <div className="display text-[17px] text-[var(--navy)] mt-4">{t}</div>
                <p className="text-[13px] text-[var(--muted)] mt-1.5 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
        <div className="max-w-[900px] mx-auto px-6 text-center reveal">
          <h2 className="display text-white text-[38px] md:text-[52px] leading-[1.05]">Run your first quote in 30 seconds</h2>
          <p className="text-white/75 mt-4">No login, no card. Real rates across every U.S. port.</p>
          <Link href="/#quote" className="btn-primary inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-xl text-[15px] font-semibold"><span className="label">Get instant quote</span></Link>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
