"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import Chat from "@/components/Chat";
import StatBand from "@/components/StatBand";
import FreightFeatures from "@/components/FreightFeatures";
import ContainerLanes from "@/components/ContainerLanes";
import HowSteps from "@/components/HowSteps";
import WhoUses from "@/components/WhoUses";
import Typewriter from "@/components/Typewriter";
import ChainCube from "@/components/ChainCube";
import VolumeExplorer from "@/components/VolumeExplorer";
import { asset } from "@/lib/site";

const BRANDS = ["CARGOMAX", "portlink", "NORDFREIGHT", "veritas3pl", "ARC LOGISTICS", "Halo Freight", "ROADWORKS", "Meridian Fleet", "Atlas Carriers", "Northstar Cargo"];
// Solid (filled) icons — rendered with fill="currentColor".
const COSTS = [
  { n: "Rate confirmations", d: "Every agreed rate hashed and timestamped on-chain — no after-the-fact edits.", i: '<path d="M12 2a7 7 0 0 0-7 7c0 4.6 5.7 11.5 6.2 12.1a1 1 0 0 0 1.6 0C13.3 20.5 19 13.6 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/>', a: "#2f61c0" },
  { n: "BOL & POD records", d: "Bills of lading and proof of delivery anchored as tamper-proof ledger entries.", i: '<path d="M12 3a10 10 0 0 0-10 9 1 1 0 0 0 1 1h1v6h2v-6h3v6h2v-6h2v6h2v-6h3v6h2v-6h1a1 1 0 0 0 1-1A10 10 0 0 0 12 3Z"/>', a: "#3A5FC0" },
  { n: "Container movements", d: "Gate-in, gate-out and chassis events logged in an immutable chain of custody.", i: '<path d="M3 7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1h2.4a2 2 0 0 1 1.72.98l1.6 2.67A2 2 0 0 1 24 12.7V15a1 1 0 0 1-1 1h-1.2a3 3 0 0 1-5.6 0H9.8a3 3 0 0 1-5.6 0H3a1 1 0 0 1-1-1V7Zm14 3h4l-1.2-2H17v2ZM7 18.5A1.5 1.5 0 1 0 7 15.5a1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>', a: "#0B2D5C" },
  { n: "Shipment events", d: "Pickup, transfer and exception events written to the ledger in real time.", i: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 9.6 2.7 1.55a1 1 0 1 1-1 1.74l-3.2-1.85A1 1 0 0 1 11 12V7a1 1 0 1 1 2 0v4.6Z"/>', a: "#2f61c0" },
  { n: "Digital signatures", d: "Cryptographically signed approvals from carriers, brokers and shippers.", i: '<path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1H3V6Zm0 4h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Zm3 5a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H6Z"/>', a: "#1E3A8A" },
  { n: "On-chain payments", d: "Settlement and payment milestones recorded against the same verified record.", i: '<path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Zm10 1.5A3.5 3.5 0 1 0 12 15.5a3.5 3.5 0 0 0 0-7ZM5.5 8A1.5 1.5 0 0 0 4 9.5a1 1 0 0 0 2 0A1.5 1.5 0 0 0 5.5 8Zm13 5a1.5 1.5 0 0 0-1.5 1.5 1 1 0 0 0 2 0 1.5 1.5 0 0 0-.5-1.5Z"/>', a: "#2f61c0" },
];

export default function Home() {
  return (
    <>
      <div className="text-[11px] font-medium border-b text-white" style={{ background: "#2f61c0", borderColor: "rgba(255,255,255,0.2)" }}>
        <div className="max-w-[1400px] mx-auto px-6 h-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2"><span className="live-dot" /><span>Chain <b>LIVE</b></span></span>
            <span className="hidden sm:inline opacity-60">·</span><span className="hidden sm:inline num"><b>3,128,440</b> records anchored</span>
            <span className="hidden md:inline opacity-60">·</span><span className="hidden md:inline num">Avg verify <b>0.4s</b> · Block height <b>5,184,902</b></span>
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.14em]"><span className="opacity-70">v2026.05</span><a href="#api" className="opacity-90 hover:opacity-100">API status</a></div>
        </div>
      </div>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section className="relative overflow-hidden text-white">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="auto" poster={asset("/hero-toll.jpg?v=3")}><source src={asset("/hero-toll.mp4?v=3")} type="video/mp4" /></video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(1,7,26,0.82) 0%,rgba(1,7,26,0.55) 42%,rgba(1,7,26,0.86) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 520px at 18% 22%,rgba(11,35,80,0.28),transparent 60%),radial-gradient(820px 520px at 86% 82%,rgba(47,97,192,0.18),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LEFT — headline */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 self-start rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-5" style={{ background: "rgba(47,97,192,0.16)", border: "1px solid rgba(47,97,192,0.4)" }}>
                <span className="live-dot" /> Secure Every Move with Blockchain
              </div>
              <h1 className="display text-white text-[36px] md:text-[54px] leading-[1.06]">Real-Time Blockchain <span className="bg-gradient-to-r from-[#8fa8e6] via-[#4f74cf] to-[#2f61c0] bg-clip-text text-transparent">Verification</span><span className="block">for Drayage Operations</span></h1>
              <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-xl leading-relaxed">Create immutable records for rate confirmations, container movements, signatures, payments, and shipment events across the supply chain.</p>
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
              <div className="mt-5 text-[12px] text-white/55">🔗 Built for ports, carriers, brokers, 3PLs and shippers</div>
              <div className="mt-10 flex items-center gap-7 text-[11px] uppercase tracking-[0.16em] text-white/60">
                <div><div className="text-[26px] md:text-[30px] display num text-white">3.1M+</div><div className="mt-0.5">Records anchored</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">48</div><div className="mt-0.5">States</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">100%</div><div className="mt-0.5">Tamper-proof</div></div>
              </div>
            </div>
            {/* RIGHT — glass card with network visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full max-w-[520px] rounded-lg border border-white/15 px-8 py-12 flex flex-col justify-center" style={{ minHeight: "560px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px) saturate(150%)", WebkitBackdropFilter: "blur(16px) saturate(150%)", boxShadow: "0 30px 70px -20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)" }}>
                <img src={asset("/blockchain-cube.png?v=1")} alt="Blockchain ledger" className="w-[78%] mx-auto h-auto object-contain" style={{ filter: "drop-shadow(0 22px 44px rgba(0,0,0,0.5))", animation: "floatTag 5.5s ease-in-out infinite" }} />
                <div className="mt-7 display text-white text-[24px] md:text-[30px] leading-tight">Immutable On-Chain Records</div>
                <Typewriter text="Rate confirmations, container moves, signatures & payments — verified on-chain." className="mt-3 block text-[14px] md:text-[15px] text-white/70 leading-relaxed min-h-[3.2em]" />
              </div>
            </div>
          </div>
        </div>
        {/* trust band — bottom of hero, video plays behind the glass */}
        <div className="relative z-10 py-9 border-t-2" style={{ borderColor: "rgba(47,97,192,0.6)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-white/65">Trusted by fleets, owner-operators, brokers & 3PLs</div>
            <div className="mt-6 overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
              <div className="marquee-track">{[...BRANDS, ...BRANDS].map((b, i) => <span key={i} className="brand-logo text-white"><span className="text-[18px] font-bold tracking-tight whitespace-nowrap">{b}</span></span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <StatBand />
      <FreightFeatures />

      {/* THE CHAIN, VISUALIZED — 3D blocks */}
      <section className="grid-bg relative py-24 text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#8fa8e6]">The chain, visualized</div>
            <h2 className="display text-[38px] md:text-[50px] leading-[1.05] mt-3">Every record becomes a block. Every block stays forever.</h2>
            <p className="mt-4 text-white/65 text-[15px] md:text-[16px] leading-relaxed">A rate confirmation, a gate-in scan, a signed POD — each event is hashed into a block and cryptographically linked to the one before it. Change anything, and the chain tells on you.</p>
          </div>
          <div className="mt-6 hidden md:flex items-center justify-center gap-0 reveal reveal-d1">
            <ChainCube size={92} duration={18} delay={0} label="Block #5,184,900" />
            <div className="chain-link w-[110px] -mt-8" />
            <ChainCube size={124} duration={14} delay={-4} label="Block #5,184,901" />
            <div className="chain-link w-[110px] -mt-8" style={{ animationDelay: "-1.3s" }} />
            <ChainCube size={92} duration={18} delay={-9} label="Block #5,184,902" />
          </div>
          <div className="mt-4 md:hidden flex justify-center reveal reveal-d1"><ChainCube size={110} duration={14} label="Block #5,184,902" /></div>
          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[["Hashed", "SHA-256 fingerprint of the full record"], ["Signed", "Ed25519 signatures from every party"], ["Linked", "Each block commits to its parent hash"]].map(([t, d], i) => (
              <div key={t} className={`glass-pill rounded-md px-5 py-4 text-center reveal reveal-d${i}`}>
                <div className="display text-[17px]">{t}</div>
                <div className="text-[12.5px] text-white/60 mt-1 leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center reveal"><Link href="/technology" className="inline-flex items-center gap-2 px-7 py-3 rounded text-[14px] font-semibold btn-primary">Explore the technology <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link></div>
        </div>
      </section>

      {/* VOLUME EXPLORER — interactive container-volume chart */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#F6F8FB,#FFFFFF)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Network explorer</div>
            <h2 className="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-3">Container volume, by the block</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px] md:text-[16px] leading-relaxed">Every anchored gate event adds up. Explore the volume of containers moving through the network — per port, across any window.</p>
          </div>
          <div className="mt-10">
            <VolumeExplorer />
          </div>
        </div>
      </section>

      <ContainerLanes />

      {/* ANATOMY OF A BLOCK — orbiting 3D */}
      <section className="grid-bg relative py-24 text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-14 items-center">
          {/* left — center block with two orbiting mini blocks */}
          <div className="relative hidden lg:flex items-center justify-center" style={{ minHeight: 480 }}>
            <div className="absolute orbit-ring" style={{ width: 420, height: 420 }} />
            <div className="absolute orbit-ring" style={{ width: 290, height: 290, opacity: 0.6 }} />
            <ChainCube size={150} duration={15} label="Block #5,184,902" />
            {/* orbiters: outer spins, inner counter-spins to keep the cube upright */}
            <div className="absolute inset-0 spin-orbit pointer-events-none">
              <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%) translateX(210px)" }}>
                <div className="spin-orbit-rev"><ChainCube size={44} duration={9} /></div>
              </div>
            </div>
            <div className="absolute inset-0 spin-orbit pointer-events-none" style={{ animationDelay: "-13s" }}>
              <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%) translateX(-145px)" }}>
                <div className="spin-orbit-rev" style={{ animationDelay: "-13s" }}><ChainCube size={34} duration={11} delay={-3} /></div>
              </div>
            </div>
          </div>
          {/* right — what lives inside a block */}
          <div className="reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#8fa8e6]">Anatomy of a block</div>
            <h2 className="display text-[36px] md:text-[48px] leading-[1.05] mt-3">Four things make a record impossible to fake</h2>
            <p className="mt-4 text-white/65 text-[15px] leading-relaxed max-w-lg">Open any block on the chain and you'll find the same four ingredients. Together they turn a plain freight document into permanent, portable proof.</p>
            <div className="mt-8 space-y-3 max-w-lg">
              {[
                ["01", "Record hash", "A SHA-256 fingerprint of the document — change one comma and it breaks."],
                ["02", "Signatures", "Carrier, broker and shipper keys sign the same hash, binding identity to intent."],
                ["03", "Timestamp", "The block's position in the chain proves exactly when the record existed."],
                ["04", "Parent link", "Each block commits to the previous block's hash — history can only grow."],
              ].map(([n, t, d]) => (
                <div key={n} className="anat-tag glass-dark rounded-md px-5 py-4 flex items-start gap-4" style={{ border: "1px solid rgba(143,168,230,0.25)" }}>
                  <span className="display num text-[18px] text-[#8fa8e6] shrink-0 mt-0.5">{n}</span>
                  <span><span className="display text-[16px] text-white block">{t}</span><span className="text-[13px] text-white/60 leading-relaxed">{d}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HowSteps />

      {/* COST CARDS */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#F8FAFC,#EEF2F8)" }}>
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: "radial-gradient(800px 400px at 80% 10%,rgba(58,95,192,0.18),transparent 60%),radial-gradient(700px 400px at 10% 80%,rgba(47,97,192,0.13),transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="max-w-2xl reveal"><div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--red)]">Supply-chain transparency</div><h2 className="display text-[40px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-2">Every record on the move, verified.</h2><p className="mt-4 text-[var(--muted)] text-[15px]">No silent edits. No disputed paperwork weeks later. Six record types anchored on every shipment — each one hashed, signed and timestamped on-chain.</p></div>
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

      {/* BLOCK CONVEYOR — 3D ribbon of blocks being anchored */}
      <section className="grid-bg relative py-24 text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#8fa8e6]">Always anchoring</div>
            <h2 className="display text-[38px] md:text-[50px] leading-[1.05] mt-3">The chain never sleeps</h2>
            <p className="mt-4 text-white/65 text-[15px] md:text-[16px] leading-relaxed">A new block every two seconds, around the clock — gate events from night shifts, PODs from morning deliveries, payments at close of business.</p>
          </div>
        </div>
        <div className="conv-persp conv-fade relative mt-14" style={{ height: 230 }}>
          <div className="conv-plane absolute left-1/2 top-1/2" style={{ transform: "translate(-50%,-58%) rotateX(55deg) rotateZ(-12deg)" }}>
            <div className="conv-track">
              {["a", "b"].map((half) => ["7af3", "1c9e", "4b20", "9d11", "3e8a", "c4f2", "8b07", "2a55"].map((h) => (
                <div key={half + h} className="conv-block"><span className="cb-hash">0x{h}</span></div>
              )))}
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-12 mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
          {[["2s", "block time"], ["1.4M", "records / day"], ["24/7", "anchoring"], ["0", "missed blocks"]].map(([v, k], i) => (
            <div key={k} className={`glass-pill rounded-md px-4 py-3.5 text-center reveal reveal-d${i}`}>
              <div className="display num text-[22px]">{v}</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-white/55 mt-0.5">{k}</div>
            </div>
          ))}
        </div>
      </section>

      <WhoUses />

      <Footer />
      <Chat />
    </>
  );
}
