"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import Chat from "@/components/Chat";
import Typewriter from "@/components/Typewriter";
import LiveSettlements from "@/components/LiveSettlements";
import { Card3D, CoinSpin, PayConveyor } from "@/components/Pay3D";
import { asset } from "@/lib/site";

const BRANDS = ["CARGOMAX", "portlink", "NORDFREIGHT", "veritas3pl", "ARC LOGISTICS", "Halo Freight", "ROADWORKS", "Meridian Fleet", "Atlas Carriers", "Northstar Cargo"];

const EXPLORE = [
  { n: "Smart Wallet", href: "/wallet", d: "Balances, escrow, payouts, invoices and a debit card — one wallet per party.", i: "M3 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM3 7V6a2 2 0 0 1 2-2h11M16 13h3" },
  { n: "How Payments Work", href: "/payments", d: "Invoice → escrow → release. Three on-chain steps from booking to payout.", i: "M4 12h6M14 12h6M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM6 2h9l4 4" },
  { n: "QuickPay", href: "/quickpay", d: "Turn an approved invoice into wallet cash in under 60 seconds.", i: "M13 2L4.5 13.5H11L9 22l8.5-11.5H13L13 2z" },
  { n: "Live Settlements", href: "/settlements", d: "Watch payouts, escrow releases and card spend clear in real time.", i: "M3 3v18h18M7 14l3-3 3 2 4-5" },
  { n: "Fees & Volume", href: "/fees", d: "The whole fee schedule plus a live explorer of network volume by rail.", i: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
];

const STEPS = [
  { k: "01", n: "Invoice & lock", d: "Payment locks into smart-contract escrow the moment the move is booked." },
  { k: "02", n: "Haul & verify", d: "POD signatures and gate events tick the release conditions green in real time." },
  { k: "03", n: "Release & settle", d: "Funds hit the carrier's wallet in under 60 seconds, receipt written on-chain." },
];

export default function Home() {
  return (
    <>
      <div className="text-[11px] font-medium border-b text-white" style={{ background: "#00a2e7", borderColor: "rgba(255,255,255,0.2)" }}>
        <div className="max-w-[1400px] mx-auto px-6 h-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2"><span className="live-dot" /><span>Network <b>LIVE</b></span></span>
            <span className="hidden sm:inline opacity-60">·</span><span className="hidden sm:inline num"><b>$48M+</b> settled this month</span>
            <span className="hidden md:inline opacity-60">·</span><span className="hidden md:inline num">Avg payout <b>under 60s</b> · Fees from <b>0.5%</b></span>
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.14em]"><span className="opacity-70">v2026.06</span><Link href="/settlements" className="opacity-90 hover:opacity-100">Network status</Link></div>
        </div>
      </div>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section className="relative overflow-hidden text-white">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="auto" poster={asset("/hero-toll.jpg?v=3")}><source src={asset("/hero-toll.mp4?v=3")} type="video/mp4" /></video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(1,7,26,0.82) 0%,rgba(1,7,26,0.55) 42%,rgba(1,7,26,0.86) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 520px at 18% 22%,rgba(11,35,80,0.28),transparent 60%),radial-gradient(820px 520px at 86% 82%,rgba(0,162,231,0.18),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LEFT — headline */}
            <div className="flex flex-col justify-center">
              <h1 className="display text-white text-[40px] md:text-[64px] leading-[1.05]"><span className="italic font-black" style={{ fontFamily: "'Roboto', sans-serif" }}>DrayPay</span> <span className="bg-gradient-to-r from-[#8fd9f5] via-[#3bb8ee] to-[#00a2e7] bg-clip-text text-transparent">Smart Wallet</span><span className="block">Instant Blockchain <span className="bg-gradient-to-r from-[#8fd9f5] via-[#3bb8ee] to-[#00a2e7] bg-clip-text text-transparent">Payments</span></span></h1>
              <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-xl leading-relaxed">Secure digital payments for carriers, brokers, and drivers powered by blockchain smart contracts.</p>
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
              <div className="mt-5 text-[12px] text-white/55">🚛 Built for shippers, brokers, carriers, owner-operators & drivers</div>
              <div className="mt-10 flex items-center gap-7 text-[11px] uppercase tracking-[0.16em] text-white/60">
                <div><div className="text-[26px] md:text-[30px] display num text-white">&lt;60s</div><div className="mt-0.5">Payouts</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">48</div><div className="mt-0.5">States</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">$48M+</div><div className="mt-0.5">Settled / mo</div></div>
              </div>
            </div>
            {/* RIGHT — DrayPay card on a glass card with app badges */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full max-w-[520px] rounded-lg border border-white/15 px-8 py-12 flex flex-col justify-center" style={{ minHeight: "560px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px) saturate(150%)", WebkitBackdropFilter: "blur(16px) saturate(150%)", boxShadow: "0 30px 70px -20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)" }}>
                <img src={asset("/draypay-card.png?v=2")} alt="DrayPay app and Visa debit card" className="w-full h-auto object-contain" style={{ filter: "drop-shadow(0 18px 36px rgba(0,0,0,0.45))", animation: "floatTag 5.5s ease-in-out infinite" }} />
                <div className="mt-7 display text-white text-[24px] md:text-[30px] leading-tight">Digital Wallet for Drayage</div>
                <Typewriter text="Fast, secure payments for shippers, brokers, and carriers — all in one wallet." className="mt-3 block text-[14px] md:text-[15px] text-white/70 leading-relaxed min-h-[3.2em]" />
              </div>
            </div>
          </div>
        </div>
        {/* trust band — bottom of hero, video plays behind the glass */}
        <div className="relative z-10 py-9 border-t-2" style={{ borderColor: "rgba(0,162,231,0.6)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-white/65">Trusted by fleets, owner-operators, brokers & 3PLs</div>
            <div className="mt-6 overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
              <div className="marquee-track">{[...BRANDS, ...BRANDS].map((b, i) => <span key={i} className="brand-logo text-white"><span className="text-[18px] font-bold tracking-tight whitespace-nowrap">{b}</span></span>)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* MONEY CONVEYOR */}
      <section className="relative py-20 text-white overflow-hidden" style={{ background: "linear-gradient(180deg,#061A38,#07153B)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8fd9f5]">The payment rail for drayage</div>
            <h2 className="display text-[36px] md:text-[52px] leading-[1.04] mt-3">Money moves like the freight</h2>
            <p className="mt-4 text-white/60 text-[15px] md:text-[16px]">Every box on this belt is a payment settling right now — instant payouts, escrow releases and QuickPay, clearing in seconds instead of weeks.</p>
          </div>
        </div>
        <PayConveyor />
        <div className="text-center reveal"><Link href="/payments" className="px-6 py-3 rounded text-[14px] font-semibold btn-primary inline-flex items-center gap-2">See how a payment settles <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link></div>
      </section>

      {/* EXPLORE GRID */}
      <section className="grid-bg relative py-24 text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="max-w-2xl reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8fd9f5]">Explore DrayPay</div>
            <h2 className="display text-[36px] md:text-[50px] leading-[1.05] mt-3">One platform, five doors in</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {EXPLORE.map((c, i) => (
              <Link key={c.href} href={c.href} className={`glass-dark rounded p-5 reveal reveal-d${i % 4} group block`} style={{ border: "1px solid rgba(143,217,245,0.22)" }}>
                <span className="w-10 h-10 rounded flex items-center justify-center" style={{ background: "linear-gradient(160deg,#00a2e7,#046e9e)", filter: "drop-shadow(0 0 12px rgba(0,162,231,0.5))" }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={c.i} /></svg>
                </span>
                <div className="display text-[17px] mt-4 group-hover:text-[#8fd9f5] transition">{c.n}</div>
                <p className="text-white/55 text-[12.5px] mt-2 leading-relaxed">{c.d}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#8fd9f5]">Open <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT SETTLES */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#F0F4FA,#FFFFFF)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">From booking to payout</div>
              <h2 className="display text-[34px] md:text-[46px] text-[var(--navy)] leading-[1.05] mt-2">Three steps. Zero chasing.</h2>
              <p className="mt-4 text-[var(--muted)] text-[15px] leading-relaxed">The payment terms become the contract the moment a move is booked — so getting paid stops being a follow-up job.</p>
              <Link href="/payments" className="mt-7 inline-flex px-6 py-3 rounded text-[14px] font-semibold btn-primary">Walk through a payment</Link>
            </div>
            <div className="space-y-4">
              {STEPS.map((s, i) => (
                <div key={s.k} className={`bg-white rounded p-5 flex items-start gap-4 reveal reveal-d${i}`} style={{ border: "1px solid rgba(11,35,80,0.08)" }}>
                  <span className="shrink-0 w-10 h-10 rounded flex items-center justify-center display text-[15px] text-white" style={{ background: "linear-gradient(160deg,#00a2e7,#046e9e)" }}>{s.k}</span>
                  <span><span className="display text-[17px] text-[var(--navy)] block">{s.n}</span><span className="text-[13.5px] text-[var(--muted)] leading-relaxed block mt-1">{s.d}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WALLET + CARD */}
      <section className="grid-bg relative py-24 text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="reveal py-8"><Card3D /></div>
            <div className="reveal reveal-d1">
              <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8fd9f5]">The smart wallet</div>
              <h2 className="display text-[36px] md:text-[50px] leading-[1.05] mt-3">Hold it. Prove it. Spend it.</h2>
              <p className="mt-5 text-white/65 text-[15px] max-w-lg leading-relaxed">Balances you can prove on-chain, escrow you can see, and a debit card that spends the wallet directly — fuel, tolls and repairs without waiting on a transfer.</p>
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                {[["<60s", "Payouts"], ["0.5%", "Fees from"], ["$0", "Card fees"]].map(([v, k]) => (
                  <div key={k} className="glass-dark rounded p-4 text-center"><div className="display num text-[24px]">{v}</div><div className="text-white/50 text-[10px] uppercase tracking-wider mt-1">{k}</div></div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/wallet" className="px-6 py-3 rounded text-[14px] font-semibold btn-primary">Open Wallet</Link>
                <Link href="/quickpay" className="px-6 py-3 rounded text-[14px] font-semibold btn-ghost">Get paid today</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE SETTLEMENTS PREVIEW */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#FFFFFF,#EEF4F9)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 reveal">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Live on the network</div>
              <h2 className="display text-[36px] md:text-[48px] text-[var(--navy)] leading-[1.04] mt-2">Payments settling right now</h2>
              <p className="mt-3 text-[var(--muted)] text-[15px] max-w-xl">Real settlement patterns clearing across the country this minute — hover to pause, click a hash to copy it.</p>
            </div>
            <Link href="/settlements" className="shrink-0 px-6 py-3 rounded text-[14px] font-semibold bg-[var(--navy)] text-white hover:bg-[var(--navy-2)] transition inline-flex items-center gap-2">Full stream <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
          </div>
          <LiveSettlements compact />
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative py-24 text-white overflow-hidden" style={{ background: "radial-gradient(900px 500px at 50% 0%,rgba(0,162,231,0.35),transparent 60%),linear-gradient(180deg,#0B2D5C,#061A38)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div className="reveal">
              <h2 className="display text-[38px] md:text-[56px] leading-[1.04]">Stop waiting 32 days <span className="bg-gradient-to-r from-[#8fd9f5] via-[#3bb8ee] to-[#00a2e7] bg-clip-text text-transparent">to get paid</span></h2>
              <p className="mt-4 text-white/65 text-[15px] md:text-[16px] max-w-xl">Open a DrayPay wallet, link your first move and watch the money settle the way the freight does — fast, tracked and provable.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/wallet" className="px-7 py-3.5 rounded text-[14px] font-semibold btn-primary">Open Wallet</Link>
                <a href="#" className="inline-flex items-center gap-2.5 rounded h-[48px] pl-3 pr-4 bg-white/[0.1] hover:bg-white/[0.22] border border-white/15 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 384 512" fill="#fff" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  <span className="leading-none text-left"><span className="block text-[8px] opacity-90">Download on the</span><span className="block text-[13px] font-semibold tracking-tight">App Store</span></span>
                </a>
                <a href="#" className="inline-flex items-center gap-2.5 rounded h-[48px] pl-3 pr-4 bg-white/[0.1] hover:bg-white/[0.22] border border-white/15 transition-colors">
                  <img src={asset("/google-play.png")} alt="" className="h-6 w-auto" />
                  <span className="leading-none text-left"><span className="block text-[8px] uppercase tracking-[0.14em] opacity-90">Get it on</span><span className="block text-[13px] font-semibold tracking-tight">Google Play</span></span>
                </a>
              </div>
            </div>
            <div className="hidden lg:block reveal reveal-d1"><CoinSpin size={180} /></div>
          </div>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
