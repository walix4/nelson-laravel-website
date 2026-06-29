"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import "@/components/Fintech";
import { asset } from "@/lib/site";

const fadeUp = {
  initial: { y: 18 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.01 },
  transition: { duration: 0.45, ease: "easeOut" },
} as const;

const BRANDS = [
  { name: "Maersk",      logo: "maersk" },
  { name: "COSCO",       logo: "cosco" },
  { name: "Hapag-Lloyd", logo: "hapaglloyd" },
  { name: "Evergreen",   logo: "evergreen" },
  { name: "HMM",         logo: "hmm" },
  { name: "Yang Ming",   logo: "yangming" },
  { name: "ZIM",         logo: "zim" },
  { name: "OOCL",        logo: "oocl" },
  { name: "Wan Hai",     logo: "wanhai" },
  { name: "Matson",      logo: "matson" },
] as { name: string; logo: string }[];

const PROBLEMS = [
  { n: "Delayed payouts", d: "Carriers and drivers wait 30+ days for money they earned weeks ago.", i: "M12 8v5l3 2M12 3a9 9 0 1 0 9 9" },
  { n: "Manual settlements", d: "Every payment means invoices, emails, spreadsheets and follow-up calls.", i: "M6 2h9l4 4v16H6zM9 12h6M9 16h6M9 8h2" },
  { n: "Multiple payment tools", d: "ACH here, checks there, a factoring portal somewhere else — nothing connected.", i: "M4 7h6v6H4zM14 4h6v6h-6zM14 14h6v6h-6zM4 17h6" },
  { n: "Lack of transparency", d: "Nobody can see where a payment is, what it costs, or when it will land.", i: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 12h.01" },
  { n: "Reconciliation headaches", d: "Accounting teams burn days matching payments to loads at month end.", i: "M9 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-4M9 15l11-11M15 4h5v5" },
];

const ROLES = [
  { n: "Driver", d: "Gets paid the day the load delivers", i: "M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM5 17H3V7h11v10M14 9h4l3 4v4h-2" },
  { n: "Broker", d: "Sends and tracks every carrier payment", i: "M3 21h18M5 21V7l7-4 7 4v14M9 9h2M9 13h2M13 9h2M13 13h2" },
  { n: "Shipper", d: "Funds moves and sees every charge", i: "M3 18c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0M7 14V6h10v8" },
  { n: "Company", d: "Controls balances, payouts and limits", i: "M12 2l8 4v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-4z" },
];

const FEATURES = [
  {
    k: "Instant Transfers",
    h: "Move money across your logistics network instantly",
    d: "Pay a driver, settle a broker invoice or fund a shipment in seconds — not banking days. Every transfer lands with the load it belongs to, so both sides always know what was paid and why.",
    points: ["Payouts land in under 60 seconds", "Works nights, weekends and holidays", "Every transfer linked to a load"],
  },
  {
    k: "Wallet Management",
    h: "Monitor balances and activity in real time",
    d: "Available, reserved and pending balances update live as your network moves. One screen shows what you hold, what's committed to booked loads and what's arriving next.",
    points: ["Live available & reserved balances", "Activity feed across all roles", "Low-balance alerts and auto top-up"],
  },
  {
    k: "Payout Automation",
    h: "Automate settlements and payment distribution",
    d: "Set the rules once — pay on delivery confirmation, split between carrier and driver, hold a percentage for fuel advances — and DrayPay runs every settlement automatically.",
    points: ["Pay-on-delivery rules", "Automatic splits & deductions", "Batch payouts in one click"],
  },
  {
    k: "Financial Visibility",
    h: "Track every transaction with complete transparency",
    d: "Every payment carries its full story: who sent it, what load it covers, what it cost and when it settled. Exports and reports your accounting team will actually like.",
    points: ["Per-load payment history", "Fee shown before you send", "One-click accounting exports"],
  },
  {
    k: "Multi-Role Access",
    h: "Support drivers, brokers, shippers, and companies",
    d: "One platform, role-aware by design. Drivers see payouts and the card. Brokers manage carrier payments. Companies control balances, approvals and team permissions.",
    points: ["Role-based dashboards", "Team approvals & limits", "One wallet per party, connected"],
  },
];

const STEPS = [
  { n: "Fund Wallet", d: "Top up by bank transfer or incoming customer payments." },
  { n: "Manage Balance", d: "See available, reserved and pending funds in real time." },
  { n: "Send Payments", d: "Pay drivers, carriers and partners in seconds." },
  { n: "Track Transactions", d: "Every payment tied to its load, exportable anytime." },
  { n: "Grow Operations", d: "Automate settlements and scale without adding headcount." },
];

const TESTIMONIALS = [
  { q: "We went from paying carriers in three weeks to paying them the day the container delivers. Our carrier retention has never been better.", n: "Sarah Mitchell", r: "VP of Operations", c: "Meridian Fleet" },
  { q: "DrayPay replaced our ACH runs, our factoring portal and half a spreadsheet. Settlements that took my team two days now run themselves.", n: "David Okafor", r: "CFO", c: "ARC Logistics" },
  { q: "Drivers see the payout hit their wallet before they're out of the gate. That transparency alone changed how people feel about driving for us.", n: "Elena Rodriguez", r: "Owner", c: "Northstar Cargo" },
];

const FAQS = [
  { q: "What is DrayPay?", a: "DrayPay is a digital wallet built for the logistics industry. Drivers, brokers, shippers and companies each hold a wallet and move money between each other instantly — payouts, settlements, transfers and spending, all in one place." },
  { q: "Who can use DrayPay?", a: "Anyone in the transportation ecosystem: fleets and owner-operators receiving payouts, brokers paying carriers, shippers funding moves, and companies managing balances and team permissions." },
  { q: "How fast are payments?", a: "Transfers between DrayPay wallets settle in under 60 seconds, around the clock — including nights, weekends and holidays. Withdrawals to a bank account follow standard banking timelines." },
  { q: "What does it cost?", a: "Holding a wallet and receiving standard payments is free. Instant payouts are 0.5% (capped at $25), QuickPay early payments are 1.5%, and the DrayPay card has no fees. The full schedule is on our Fees page." },
  { q: "How does QuickPay work?", a: "Once a delivery is confirmed and the invoice is approved, you can turn it into same-day cash for a single transparent fee — no reserves, no minimums, no long-term contract." },
  { q: "Is DrayPay secure?", a: "Yes. Funds are held with regulated partner institutions, every transaction is encrypted and fully auditable, and role-based permissions keep your team's access under your control." },
];

const BANK_ICONS = [
  { n: "JPMorgan Chase", color: "#117ACA", pos: { top: "6%",    left: "3%"   }, anim: "bb0" },
  { n: "Bank of America", color: "#E31837", pos: { top: "38%",  left: "8%"   }, anim: "bb1" },
  { n: "Wells Fargo",    color: "#CF2027", pos: { bottom: "14%",left: "4%"   }, anim: "bb2" },
  { n: "Citibank",       color: "#003591", pos: { top: "14%",   left: "22%"  }, anim: "bb3" },
  { n: "US Bank",        color: "#002776", pos: { bottom: "28%",left: "19%"  }, anim: "bb4" },
  { n: "Stripe",         color: "#635BFF", pos: { top: "60%",   left: "13%"  }, anim: "bb5" },
  { n: "Wise",           color: "#00B9FF", pos: { top: "6%",    right: "3%"  }, anim: "bb6" },
  { n: "PayPal",         color: "#003087", pos: { top: "38%",   right: "8%"  }, anim: "bb7" },
  { n: "Zelle",          color: "#6D1ED4", pos: { bottom: "14%",right: "4%"  }, anim: "bb0" },
  { n: "Square",         color: "#006AFF", pos: { top: "14%",   right: "22%" }, anim: "bb1" },
  { n: "ACH Network",    color: "#0670a0", pos: { bottom: "28%",right: "19%" }, anim: "bb2" },
  { n: "SWIFT",          color: "#0A5DA5", pos: { top: "60%",   right: "13%" }, anim: "bb3" },
] as const;

export default function Home() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    v.src = asset("/hero-new.mp4");
    v.load();
  }, []);

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden text-white">
        <video ref={heroVideoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline poster={asset("/hero-toll.jpg?v=3")} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(1,7,26,0.82) 0%,rgba(1,7,26,0.55) 42%,rgba(1,7,26,0.86) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 520px at 18% 22%,rgba(11,35,80,0.28),transparent 60%),radial-gradient(820px 520px at 86% 82%,rgba(0,162,231,0.18),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LEFT — headline */}
            <div className="flex flex-col justify-center">
              <h1 className="display text-white text-[40px] md:text-[64px] leading-[1.05]">
                <span className="italic font-black" style={{ fontFamily: "'Roboto', sans-serif" }}>DrayPay</span>{" "}
                <span className="bg-gradient-to-r from-[#8fd9f5] via-[#3bb8ee] to-[#00a2e7] bg-clip-text text-transparent">Smart Wallet</span>
                <span className="block">The Financial Hub for{" "}<span className="bg-gradient-to-r from-[#8fd9f5] via-[#3bb8ee] to-[#00a2e7] bg-clip-text text-transparent">Modern Logistics</span></span>
              </h1>
              <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-xl leading-relaxed">Manage payments, balances, payouts, and transfers across your entire transportation network from a single wallet.</p>
              <div className="mt-8 grid w-fit grid-cols-2 gap-3">
                <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] w-full pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200">
                  <svg width="30" height="30" viewBox="0 0 384 512" fill="#fff" aria-hidden="true" className="shrink-0"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] opacity-90">Download on the</span><span className="block text-[14px] font-semibold tracking-tight">App Store</span></span>
                </a>
                <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] w-full pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200">
                  <img src={asset("/google-play.png")} alt="" className="h-7 w-auto shrink-0" style={{ height: 28, width: "auto" }} />
                  <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] uppercase tracking-[0.14em] opacity-90">Get it on</span><span className="block text-[14px] font-semibold tracking-tight">Google Play</span></span>
                </a>
              </div>
              <div className="mt-5 text-[12px] text-white/55">Built for ports, carriers, brokers, 3PLs and shippers</div>
              <div className="mt-10 flex items-center gap-7 text-[11px] uppercase tracking-[0.16em] text-white/60">
                <div><div className="text-[26px] md:text-[30px] display num text-white">&lt;60s</div><div className="mt-0.5">Payout speed</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">$48M+</div><div className="mt-0.5">Settled / month</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">99.9%</div><div className="mt-0.5">Uptime</div></div>
              </div>
            </div>
            {/* RIGHT — frosted glass card with DrayPay card mockup */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full max-w-[520px] rounded-lg border border-white/15 px-8 py-12 flex flex-col items-center justify-center" style={{ minHeight: "560px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", boxShadow: "0 30px 70px -20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)" }}>
                <img src={asset("/draypay-card.png?v=2")} alt="DrayPay digital wallet card" className="w-[82%] h-auto object-contain" style={{ filter: "drop-shadow(0 22px 44px rgba(0,0,0,0.5))", animation: "floatTag 5.5s ease-in-out infinite" }} />
                <div className="mt-7 display text-white text-[24px] md:text-[30px] leading-tight text-center">Digital Wallet for Drayage</div>
                <p className="mt-3 text-[14px] md:text-[15px] text-white/70 leading-relaxed text-center max-w-xs">Instant payouts, smart-contract escrow, QuickPay funding and a physical card — all in one wallet.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Trust band */}
        <div className="relative z-10 py-9 border-t" style={{ borderColor: "rgba(0,162,231,0.35)", background: "rgba(255,255,255,0.06)" }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-white/65">Trusted by fleets, owner-operators, brokers &amp; 3PLs</div>
            <div className="mt-6 overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
              <div className="marquee-track" style={{ gap: "1.2rem" }}>
                {[...BRANDS, ...BRANDS].map((b, i) => (
                  <span key={i} className="brand-logo" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px 8px 10px", borderRadius: 8, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)", whiteSpace: "nowrap" }}>
                    <span style={{ width: 34, height: 34, borderRadius: 6, background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                      <img src={asset(`/shipping-logos/${b.logo}.png`)} width={28} height={28} alt={b.name} style={{ objectFit: "contain", display: "block" }} />
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.88)", letterSpacing: "0.04em" }}>{b.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─── FEATURE CARDS — dark glass ─── */}
      <section id="features" className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(160deg,#060D1A 0%,#0B1A2E 50%,#071424 100%)" }}>
        {/* subtle grid pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,162,231,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,162,231,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          {/* Heading */}
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 rounded-[6px] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ background: "rgba(0,162,231,0.12)", border: "1px solid rgba(0,162,231,0.25)", color: "#60c8f0" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00a2e7" strokeWidth="2.2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Our Features
            </span>
            <h2 className="display text-[36px] md:text-[54px] text-white leading-[1.05] mt-5">Everything your logistics<br className="hidden md:block" /> payment needs</h2>
            <p className="mt-4 text-[15px] md:text-[17px] max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>Instant payouts, smart settlement, a physical card, and a personal wallet — built for the freight world.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Card 1 — Personal Wallet */}
            <motion.div {...fadeUp} className="flex flex-col overflow-hidden" style={{ minHeight: 460, borderRadius: 24, background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.2)", boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(139,92,246,0.12)" }}>
              <div className="px-8 pt-8 shrink-0">
                <div className="display text-[30px] md:text-[36px] text-white leading-[1.1]">Personal Wallet</div>
                <p className="mt-2.5 text-[14.5px] leading-relaxed max-w-[280px]" style={{ color: "rgba(255,255,255,0.55)" }}>Your balance, payouts, and spending — all in one place. Transfer, request, or top up in seconds from your phone.</p>
              </div>
              <div className="flex-1 relative overflow-hidden" style={{ minHeight: 320 }}>
                <img src={asset("/draypay-app-splash.png")} style={{ position: "absolute", bottom: -90, left: "50%", transform: "translateX(-50%)", width: 520, height: "auto", objectFit: "contain", display: "block" }} />
              </div>
            </motion.div>
            {/* Card 2 — DrayPay card */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.07, ease: "easeOut" }} className="flex flex-col overflow-hidden" style={{ minHeight: 460, borderRadius: 24, background: "rgba(0,162,231,0.08)", border: "1px solid rgba(0,162,231,0.2)", boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(0,162,231,0.15)" }}>
              <div className="px-8 pt-8 shrink-0">
                <div className="display text-[30px] md:text-[36px] text-white leading-[1.1]">Digital Blockchain Wallet</div>
                <p className="mt-2.5 text-[14.5px] leading-relaxed max-w-[280px]" style={{ color: "rgba(255,255,255,0.55)" }}>Virtual and physical — spend your balance anywhere VISA is accepted. No monthly fee.</p>
              </div>
              <div className="flex-1 flex items-center justify-center px-6 pb-6 pt-2">
                <CardFanFig />
              </div>
            </motion.div>
            {/* Card 3 — Container-to-cash payouts */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }} className="flex flex-col overflow-hidden" style={{ minHeight: 460, borderRadius: 24, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
              <div className="px-8 pt-8 shrink-0">
                <div className="display text-[30px] md:text-[36px] text-white leading-[1.1]">Container-to-cash payouts</div>
                <p className="mt-2.5 text-[14.5px] leading-relaxed max-w-[280px]" style={{ color: "rgba(255,255,255,0.55)" }}>Driver gets paid the moment the container lands — no invoices, no delays, no middleman calls.</p>
              </div>
              <div className="flex-1 flex items-center justify-center px-4 pb-4 pt-4 overflow-hidden">
                <img src={asset("/draypay-container.png")} alt="DrayPay container" style={{ width: "100%", maxWidth: 480, height: "auto", objectFit: "contain", display: "block" }} />
              </div>
            </motion.div>
            {/* Card 4 — Same-day settlement */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }} className="flex flex-col overflow-hidden" style={{ minHeight: 460, borderRadius: 24, background: "rgba(14,159,110,0.07)", border: "1px solid rgba(14,159,110,0.2)", boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(14,159,110,0.12)" }}>
              <div className="px-8 pt-8 shrink-0">
                <div className="display text-[30px] md:text-[36px] text-white leading-[1.1]">Same-day settlement</div>
                <p className="mt-2.5 text-[14.5px] leading-relaxed max-w-[280px]" style={{ color: "rgba(255,255,255,0.55)" }}>Funds release the moment delivery is confirmed. Every charge itemized, receipt attached to the load.</p>
              </div>
              <div className="flex-1 flex items-center justify-center pb-0 pt-0 overflow-hidden">
                <img src={asset("/draypay-nozzle.png")} style={{ width: "100%", maxWidth: 300, height: "auto", objectFit: "contain", display: "block" }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── APP FEATURES SHOWCASE ─── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#D5EBFA 0%,#E8F5FD 45%,#D8EFF9 100%)", paddingTop: 96, paddingBottom: 96 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,162,231,0.1) 1.5px, transparent 1.5px)", backgroundSize: "40px 40px" }} />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-[6px] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ background: "rgba(255,255,255,0.88)", border: "1px solid rgba(0,162,231,0.2)", color: "#0670a0" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00a2e7" strokeWidth="2.2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>
              App Feature
            </span>
            <h2 className="display text-[34px] md:text-[52px] text-[var(--navy)] leading-[1.05] mt-5">Explore the DrayPay<br className="hidden md:block" /> Smart Wallet App</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px] md:text-[17px] max-w-xl mx-auto leading-relaxed">Instant payouts, real-time balance tracking, card spending, and QuickPay funding — all in one powerful wallet.</p>
          </motion.div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            {/* LEFT cards */}
            <div className="hidden lg:flex flex-col gap-4 shrink-0" style={{ width: 252 }}>
              <div style={{ animation: "floatTag 4.5s ease-in-out infinite" }}>
                <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl bg-white p-5" style={{ boxShadow: "0 8px 32px rgba(11,45,92,0.08)", border: "1px solid rgba(0,162,231,0.1)" }}>
                  <div style={{ fontSize: 12, color: "#6B7C93", fontWeight: 600 }}>Wallet</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#0B2D5C", marginTop: 2, letterSpacing: "-0.02em" }}>$12,480.20</div>
                  <div style={{ marginTop: 10, height: 6, background: "#EBF5FC", borderRadius: 3 }}>
                    <div style={{ width: "68%", height: "100%", borderRadius: 3, background: "linear-gradient(90deg,#00a2e7,#0670a0)" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10, color: "#6B7C93" }}>
                    <span>Available</span><span style={{ color: "#00a2e7", fontWeight: 700 }}>68%</span>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 10, color: "#9CA3AF" }}>Wallet Address</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0B2D5C", marginTop: 2, letterSpacing: "0.05em" }}>DPY-4417...A2K8</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                    <div style={{ flex: 1, background: "rgba(0,162,231,0.1)", color: "#0670a0", borderRadius: 8, padding: "6px 0", fontSize: 10, fontWeight: 700, textAlign: "center" }}>Copy</div>
                    <div style={{ flex: 1, background: "rgba(0,162,231,0.1)", color: "#0670a0", borderRadius: 8, padding: "6px 0", fontSize: 10, fontWeight: 700, textAlign: "center" }}>Share</div>
                  </div>
                </motion.div>
              </div>
              <div>
                <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12 }} className="rounded-2xl bg-white p-4 flex items-center gap-3" style={{ boxShadow: "0 6px 20px rgba(11,45,92,0.07)", border: "1px solid rgba(11,45,92,0.06)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#0B2D5C,#0670a0)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  </div>
                  <div><div style={{ fontSize: 12.5, fontWeight: 700, color: "#0B2D5C" }}>Instant Payout</div><div style={{ fontSize: 10.5, color: "#0E9F6E", fontWeight: 600 }}>+1.76% settlement speed</div></div>
                </motion.div>
              </div>
            </div>
            {/* CENTER phone */}
            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.05 }} className="shrink-0" style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 42, background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,162,231,0.22), transparent 70%)", filter: "blur(32px)", zIndex: 0 }} />
              <img src={asset("/app-screens/payment-list.png")} alt="DrayPay app home screen" style={{ position: "relative", zIndex: 1, width: 260, display: "block", filter: "drop-shadow(0 32px 56px rgba(11,18,32,0.22))" }} />
            </motion.div>
            {/* RIGHT cards */}
            <div className="hidden lg:flex flex-col gap-4 shrink-0" style={{ width: 252 }}>
              <div style={{ animation: "floatTag 4.8s ease-in-out infinite 0.3s" }}>
                <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl bg-white p-5" style={{ boxShadow: "0 8px 32px rgba(11,45,92,0.08)", border: "1px solid rgba(0,162,231,0.1)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 12, color: "#6B7C93", fontWeight: 600 }}>Payment Year</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#0B2D5C" }}>4.7k</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 52 }}>
                    {[30,48,26,60,40,85,52].map((h,i) => (
                      <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "3px 3px 0 0", background: i === 5 ? "linear-gradient(180deg,#00a2e7,#0670a0)" : "rgba(0,162,231,0.12)" }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", marginTop: 4 }}>
                    {["J","F","M","A","M","J","J"].map((m,i) => <span key={i} style={{ fontSize: 9, color: "#9CA3AF", flex: 1, textAlign: "center" }}>{m}</span>)}
                  </div>
                </motion.div>
              </div>
              <div>
                <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12 }} className="rounded-2xl bg-white p-4 flex items-center gap-3" style={{ boxShadow: "0 6px 20px rgba(11,45,92,0.07)", border: "1px solid rgba(11,45,92,0.06)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(0,162,231,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0670a0" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  </div>
                  <div><div style={{ fontSize: 12.5, fontWeight: 700, color: "#0B2D5C" }}>QuickPay Fund</div><div style={{ fontSize: 10.5, color: "#0E9F6E", fontWeight: 600 }}>+22.56% avg return</div></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAST SECURE FLEXIBLE ─── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(160deg,#060D1A 0%,#0B1A2E 50%,#071424 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,162,231,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,162,231,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-[1280px] mx-auto px-6 relative">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="display text-[34px] md:text-[52px] leading-[1.1]" style={{ color: "rgba(255,255,255,0.95)" }}>Fast, secure, and flexible</h2>
            <div className="display text-[34px] md:text-[52px] leading-[1.1]" style={{ color: "rgba(255,255,255,0.3)" }}>payment solutions</div>
          </motion.div>
          {/* 5-card row with coin center */}
          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Card 1 */}
            <div className="rounded-[20px] p-6 flex flex-col gap-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)", minHeight: 200 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#a78bfa,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div>
                <div className="display text-[16px]" style={{ color: "rgba(255,255,255,0.92)" }}>Fast &amp; Reliable</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>Real-time processing with near-zero downtime across your logistics network.</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="rounded-[20px] p-6 flex flex-col gap-4" style={{ background: "rgba(0,162,231,0.08)", border: "1px solid rgba(0,162,231,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(0,162,231,0.15)", minHeight: 200 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(0,162,231,0.25)", border: "1px solid rgba(0,162,231,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00a2e7" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M15 7l5 5-5 5M9 7l-5 5 5 5"/></svg>
              </div>
              <div>
                <div className="display text-[16px]" style={{ color: "rgba(255,255,255,0.92)" }}>Instant Settlement</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>Funds move the moment delivery is confirmed — no waiting, no batching.</p>
              </div>
            </div>
            {/* Card 3 — Card stack visual */}
            <div className="rounded-[20px] flex flex-col items-center justify-end col-span-2 md:col-span-1 overflow-hidden" style={{ background: "linear-gradient(170deg,#0A1E38 0%,#071528 100%)", border: "1px solid rgba(0,162,231,0.2)", boxShadow: "0 8px 40px rgba(0,162,231,0.12), inset 0 1px 0 rgba(0,162,231,0.15)", minHeight: 200 }}>
              <img src={asset("/draypay-cardstack2.png")} alt="DrayPay card stack" style={{ width: "100%", maxWidth: 240, objectFit: "contain", display: "block", marginBottom: 0 }} />
            </div>
            {/* Card 4 */}
            <div className="rounded-[20px] p-6 flex flex-col gap-4" style={{ background: "rgba(14,159,110,0.08)", border: "1px solid rgba(14,159,110,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(14,159,110,0.12)", minHeight: 200 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#0E9F6E,#047857)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              </div>
              <div>
                <div className="display text-[16px]" style={{ color: "rgba(255,255,255,0.92)" }}>Transparent Pricing</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>Only pay per transaction — fees shown before you send, no hidden charges.</p>
              </div>
            </div>
            {/* Card 5 */}
            <div className="rounded-[20px] p-6 flex flex-col gap-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)", minHeight: 200 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#00a2e7,#0670a0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <div>
                <div className="display text-[16px]" style={{ color: "rgba(255,255,255,0.92)" }}>Logistics-First</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>Built for ports, carriers, brokers &amp; 3PLs — not adapted from generic fintech.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── KEY BENEFITS (Image #97 style) ─── */}
      <section id="how-it-works" className="py-24" style={{ background: "#F3F5F8" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 rounded-[6px] px-5 py-2 text-[12px] font-bold" style={{ background: "linear-gradient(135deg,#00a2e7,#0565a0)", color: "white", boxShadow: "0 4px 16px rgba(0,162,231,0.35)" }}>
              Key Benefits
            </span>
            <h2 className="display text-[32px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-5">Unlock the advantage of<br className="hidden md:block" /> smarter payment solutions</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px] max-w-xl mx-auto leading-relaxed">Manage logistics payments smarter — instant settlements, real-time visibility, and automated payouts all in one wallet.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {/* Card 1 */}
            <motion.div {...fadeUp} className="rounded-[24px] p-6 flex flex-col gap-0 overflow-hidden" style={{ background: "white", border: "1px solid rgba(11,45,92,0.07)", boxShadow: "0 2px 8px rgba(11,45,92,0.05), 0 20px 48px -20px rgba(11,45,92,0.1)", minHeight: 360 }}>
              <div className="flex-1 flex flex-col justify-start pt-4 pb-6">
                {/* Mini wallet UI */}
                <div className="rounded-[16px] p-4 mb-3" style={{ background: "#F0F7FF", border: "1px solid rgba(0,162,231,0.1)" }}>
                  <div style={{ fontSize: 11, color: "#6B7C93", fontWeight: 600 }}>Total settled today</div>
                  <div className="display" style={{ fontSize: 26, fontWeight: 900, color: "#0B2D5C", marginTop: 2 }}>$24,180.00</div>
                  <div style={{ marginTop: 8, height: 5, background: "#D4EAF7", borderRadius: 3 }}>
                    <div style={{ width: "72%", height: "100%", borderRadius: 3, background: "linear-gradient(90deg,#00a2e7,#0565a0)" }} />
                  </div>
                  <div style={{ fontSize: 10, color: "#0E9F6E", fontWeight: 700, marginTop: 4 }}>↑ 18.4% vs last week</div>
                </div>
                <div className="rounded-[12px] p-3 flex items-center gap-3" style={{ background: "white", border: "1px solid rgba(11,45,92,0.07)", boxShadow: "0 4px 12px rgba(11,45,92,0.06)" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#00a2e7,#0565a0)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0B2D5C" }}>Settlement confirmed</div>
                    <div style={{ fontSize: 10, color: "#9CA3AF" }}>Load #LB-4417 · 38 sec ago</div>
                  </div>
                </div>
              </div>
              <div className="display text-[20px] text-[var(--navy)]">Instant Settlements</div>
              <p className="mt-2 text-[13.5px] text-[var(--muted)] leading-relaxed">Funds release the moment delivery is confirmed — no delays, no batching, any time of day.</p>
            </motion.div>
            {/* Card 2 */}
            <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }} className="rounded-[24px] p-6 flex flex-col gap-0 overflow-hidden" style={{ background: "white", border: "1px solid rgba(11,45,92,0.07)", boxShadow: "0 2px 8px rgba(11,45,92,0.05), 0 20px 48px -20px rgba(11,45,92,0.1)", minHeight: 360 }}>
              <div className="flex-1 flex flex-col justify-start pt-4 pb-6">
                {/* Mini chart */}
                <div className="rounded-[16px] p-4" style={{ background: "#F0F7FF", border: "1px solid rgba(0,162,231,0.1)" }}>
                  <div style={{ fontSize: 11, color: "#6B7C93", fontWeight: 600 }}>Payment volume</div>
                  <div className="display" style={{ fontSize: 22, fontWeight: 900, color: "#0B2D5C", marginTop: 2 }}>$50.6K <span style={{ fontSize: 12, color: "#0E9F6E", fontWeight: 700 }}>↑ 8.21%</span></div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 56, marginTop: 12 }}>
                    {[22,38,30,55,42,70,58,82,65,90].map((h,i) => (
                      <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "3px 3px 0 0", background: i >= 8 ? "linear-gradient(180deg,#00a2e7,#0565a0)" : `rgba(0,162,231,${0.1 + i*0.08})` }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    {["Jan","Mar","May","Jul","Sep","Nov"].map(m => <span key={m} style={{ fontSize: 9, color: "#9CA3AF" }}>{m}</span>)}
                  </div>
                </div>
              </div>
              <div className="display text-[20px] text-[var(--navy)]">Real-time Visibility</div>
              <p className="mt-2 text-[13.5px] text-[var(--muted)] leading-relaxed">See every balance, transaction and trend live — no end-of-month surprises for your accounting team.</p>
            </motion.div>
            {/* Card 3 */}
            <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }} className="rounded-[24px] p-6 flex flex-col gap-0 overflow-hidden" style={{ background: "white", border: "1px solid rgba(11,45,92,0.07)", boxShadow: "0 2px 8px rgba(11,45,92,0.05), 0 20px 48px -20px rgba(11,45,92,0.1)", minHeight: 360 }}>
              <div className="flex-1 flex flex-col justify-center items-center pb-6">
                {/* Network viz */}
                <div style={{ position: "relative", width: 200, height: 160 }}>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 140, height: 140, borderRadius: "50%", border: "1.5px dashed rgba(0,162,231,0.25)" }} />
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 90, height: 90, borderRadius: "50%", border: "1.5px dashed rgba(0,162,231,0.15)" }} />
                  {[
                    { top: "2%",  left: "50%", t: "translateX(-50%)", bg: "#00a2e7", label: "Driver" },
                    { top: "55%", left: "2%",  t: "",                 bg: "#8B5CF6", label: "Broker" },
                    { top: "55%", left: "72%", t: "",                 bg: "#0E9F6E", label: "Shipper" },
                    { top: "28%", left: "78%", t: "",                 bg: "#F59E0B", label: "Bank" },
                  ].map(n => (
                    <div key={n.label} style={{ position: "absolute", top: n.top, left: n.left, transform: n.t }}>
                      <div style={{ width: 38, height: 38, borderRadius: 12, background: n.bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 16px ${n.bg}55` }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                      </div>
                      <div style={{ fontSize: 9, fontWeight: 700, color: "#6B7C93", textAlign: "center", marginTop: 3 }}>{n.label}</div>
                    </div>
                  ))}
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#00a2e7,#0565a0)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 18px rgba(0,162,231,0.45)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                  </div>
                </div>
              </div>
              <div className="display text-[20px] text-[var(--navy)]">Automated Payouts</div>
              <p className="mt-2 text-[13.5px] text-[var(--muted)] leading-relaxed">Set rules once — DrayPay runs every settlement automatically across drivers, brokers and shippers.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <div id="services"><ServicesGrid /></div>

      {/* ─── GET STARTED STEPS ─── */}
      <GetStartedSteps />

      {/* ─── OUR MISSION (Image #96 style) ─── */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-center">
            {/* Left */}
            <motion.div {...fadeUp}>
              <span className="inline-flex items-center px-4 py-1.5 rounded-[6px] text-[12px] font-bold" style={{ background: "rgba(0,162,231,0.1)", color: "#0670a0" }}>Our Mission</span>
              <h2 className="display text-[32px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-5">Empowering logistics teams to take full control of their payments</h2>
              <p className="mt-5 text-[15px] text-[var(--muted)] leading-relaxed max-w-md">At DrayPay, we make logistics finance accessible — instant payouts, live balance tracking and smart automation built for the freight world.</p>
              <div className="mt-8 flex flex-col gap-4">
                {[
                  { t: "No more waiting", d: "Drivers and carriers get paid the day a load delivers, not 30 days later." },
                  { t: "Full transparency", d: "Every payment carries its full story — load, amount, fee and timestamp." },
                  { t: "Built for scale", d: "From one truck to a 500-carrier fleet, DrayPay grows with your operation." },
                ].map(b => (
                  <div key={b.t} className="flex gap-3">
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(0,162,231,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00a2e7" strokeWidth="2.8" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#0B2D5C" }}>{b.t}</div>
                      <div style={{ fontSize: 13, color: "#6B7C93", marginTop: 2, lineHeight: 1.5 }}>{b.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Right — photo collage */}
            <div className="hidden lg:grid gap-4" style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto" }}>
              {/* Floating payment card (spans both cols) */}
              <motion.div {...fadeUp} className="col-span-2 flex justify-center mb-0">
                <div className="rounded-[20px] p-5 flex items-center gap-4" style={{ background: "white", border: "1px solid rgba(11,45,92,0.09)", boxShadow: "0 18px 48px -14px rgba(11,45,92,0.18)", maxWidth: 340, width: "100%" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,#00a2e7,#0565a0)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </div>
                  <div className="flex-1">
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0B2D5C" }}>Payment Settled</div>
                    <div style={{ fontSize: 11.5, color: "#6B7C93", marginTop: 1 }}>$3,750 available in wallet</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3 }}>*** *** *** 4154</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#0E9F6E" }}>✓</div>
                </div>
              </motion.div>
              {/* Container 1 */}
              <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="rounded-[20px] overflow-hidden flex items-center justify-center" style={{ height: 220, background: "linear-gradient(135deg,#EBF7FF,#D6EFFA)" }}>
                <img src={asset("/singlecontainer.png")} alt="DrayPay shipping container" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 16 }} />
              </motion.div>
              {/* Container 2 */}
              <motion.div {...fadeUp} transition={{ delay: 0.18 }} className="rounded-[20px] overflow-hidden flex items-center justify-center" style={{ height: 220, background: "linear-gradient(135deg,#0B2D5C,#0A1E3A)" }}>
                <img src={asset("/singlecontainer2.png")} alt="DrayPay shipping container" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 16 }} />
              </motion.div>
              {/* AI support chip */}
              <motion.div {...fadeUp} transition={{ delay: 0.24 }} className="col-span-2">
                <div className="inline-flex items-center gap-3 rounded-[6px] px-4 py-2.5" style={{ background: "white", border: "1px solid rgba(11,45,92,0.09)", boxShadow: "0 6px 20px -6px rgba(11,45,92,0.14)" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#00a2e7,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "#0B2D5C" }}>AI-powered support for quick, personalized answers</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHERE YOU CAN USE DRAYPAY ─── */}
      <section style={{ background: "linear-gradient(160deg,#030912 0%,#060F1E 50%,#040C17 100%)", paddingTop: 80, paddingBottom: 96, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "15%", left: "8%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,162,231,0.12) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "8%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "45%", right: "28%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,170,0,0.07) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div className="max-w-[1100px] mx-auto px-6" style={{ position: "relative" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 32, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 40px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)", overflow: "visible", position: "relative" }}>
            {/* Subtle inner glow */}
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 500, height: 240, background: "radial-gradient(ellipse, rgba(0,162,231,0.15) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

            <div style={{ position: "relative", padding: "56px 48px 56px", textAlign: "center" }}>
              <motion.div {...fadeUp}>
                <h2 className="display text-[34px] md:text-[58px] leading-[1.05] uppercase" style={{ color: "#FFFFFF", letterSpacing: "-0.02em", fontWeight: 900 }}>
                  10,000+ <span style={{ background: "linear-gradient(135deg,#60D9FF,#00a2e7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Drivers &amp; Carriers</span><br />
                  Use DrayPay every day
                </h2>
                <p className="mt-5 text-[15px] md:text-[17px] leading-relaxed max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Fuel your car, grab a meal, shop online, pay bills — wherever Visa debit is accepted, your DrayPay card works.
                </p>
                <div className="mt-8">
                  <Link href="/wallet" className="inline-flex items-center gap-2.5 text-[14px] font-semibold px-7 py-3.5" style={{ background: "rgba(255,255,255,0.14)", border: "1.5px solid rgba(255,255,255,0.28)", borderRadius: 999, color: "white" }}>
                    Get Your DrayPay Card
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                </div>
              </motion.div>

              {/* Animated brand ticker — iOS-style white tiles with brand-bob stagger */}
              <div className="mt-12" style={{ overflow: "hidden", paddingTop: 14, maskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)" }}>
                <div style={{ display: "flex", gap: 14, width: "max-content", animation: "brand-scroll 32s linear infinite", alignItems: "flex-end", paddingBottom: 12 }}>
                  {([
                    { label: "Shell",          file: "shell" },
                    { label: "BP",             file: "bp" },
                    { label: "Chevron",        file: "chevron" },
                    { label: "ExxonMobil",     file: "exxon" },
                    { label: "7-Eleven",       file: "7eleven" },
                    { label: "Circle K",       file: "circlek" },
                    { label: "Pilot Flying J", file: "pilotfj" },
                    { label: "Love's",         file: "loves" },
                    { label: "Sunoco",         file: "sunoco" },
                    { label: "Valero",         file: "valero" },
                    { label: "Speedway",       file: "speedway" },
                    { label: "Wawa",           file: "wawa" },
                    { label: "QuikTrip",       file: "quiktrip" },
                    { label: "Marathon",       file: "marathon" },
                    { label: "76",             file: "76" },
                    { label: "Casey's",        file: "caseys" },
                    { label: "Shell",          file: "shell" },
                    { label: "BP",             file: "bp" },
                    { label: "Chevron",        file: "chevron" },
                    { label: "ExxonMobil",     file: "exxon" },
                    { label: "7-Eleven",       file: "7eleven" },
                    { label: "Circle K",       file: "circlek" },
                    { label: "Pilot Flying J", file: "pilotfj" },
                    { label: "Love's",         file: "loves" },
                    { label: "Sunoco",         file: "sunoco" },
                    { label: "Valero",         file: "valero" },
                    { label: "Speedway",       file: "speedway" },
                    { label: "Wawa",           file: "wawa" },
                    { label: "QuikTrip",       file: "quiktrip" },
                    { label: "Marathon",       file: "marathon" },
                    { label: "76",             file: "76" },
                    { label: "Casey's",        file: "caseys" },
                  ] as {label:string;file:string}[]).map((c, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, flexShrink: 0, animation: `brand-bob ${2.8 + (i % 5) * 0.4}s ease-in-out infinite ${(i % 8) * 0.22}s` }}>
                      <div className="brand-icon-tile" style={{ width: 68, height: 68, borderRadius: 22, background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.28), 0 2px 6px rgba(0,0,0,0.14)", padding: 6, overflow: "hidden" }}>
                        <img src={asset(`/gas-logos/${c.file}.png`)} alt={c.label} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3">
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>Accepted at 50M+ Visa locations across the United States</span>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* ─── GETTING STARTED ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 rounded-[6px] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ border: "1px solid rgba(11,45,92,0.12)", color: "#6B7C93" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0670a0" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              Features
            </span>
            <h2 className="display text-[36px] md:text-[54px] text-[var(--navy)] leading-[1.05] mt-4">Getting Started is Easy!</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px] max-w-lg mx-auto">Three simple steps from signup to instant payments — no bank paperwork, no waiting in line.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {/* Card 1 — Download */}
            <motion.div {...fadeUp} className="rounded-[20px] overflow-hidden border" style={{ borderColor: "rgba(11,45,92,0.08)" }}>
              <div className="flex items-end justify-center overflow-hidden" style={{ height: 340, background: "#F2F5FA" }}>
                <img src={asset("/app-screens/add-card.png")} alt="DrayPay Add Card screen" style={{ width: 210, display: "block", marginBottom: -2 }} />
              </div>
              <div className="p-6">
                <div className="display text-[22px] text-[var(--navy)]">Download The App</div>
                <p className="mt-2 text-[var(--muted)] text-[13.5px] leading-relaxed">Available on iOS and Android. Install DrayPay and create your wallet in under 2 minutes — no bank visit needed.</p>
              </div>
            </motion.div>
            {/* Card 2 — Fund Wallet */}
            <motion.div {...fadeUp} transition={{ delay: 0.08 }} className="rounded-[20px] overflow-hidden border" style={{ borderColor: "rgba(11,45,92,0.08)" }}>
              <div className="flex items-end justify-center overflow-hidden" style={{ height: 340, background: "#EBF5FC" }}>
                <img src={asset("/app-screens/top-up.png")} alt="DrayPay Top Up screen" style={{ width: 210, display: "block", marginBottom: -2 }} />
              </div>
              <div className="p-6">
                <div className="display text-[22px] text-[var(--navy)]">Fund Your Wallet</div>
                <p className="mt-2 text-[var(--muted)] text-[13.5px] leading-relaxed">Link your bank or receive incoming payments to top up your DrayPay wallet. Funds are available instantly.</p>
              </div>
            </motion.div>
            {/* Card 3 — Start Paying */}
            <motion.div {...fadeUp} transition={{ delay: 0.16 }} className="rounded-[20px] overflow-hidden border" style={{ borderColor: "rgba(11,45,92,0.08)" }}>
              <div className="flex items-end justify-center overflow-hidden" style={{ height: 340, background: "#EBF5FC" }}>
                <img src={asset("/app-screens/payment-success.png")} alt="DrayPay Payment Success screen" style={{ width: 210, display: "block", marginBottom: -2 }} />
              </div>
              <div className="p-6">
                <div className="display text-[22px] text-[var(--navy)]">Start Sending Payments</div>
                <p className="mt-2 text-[var(--muted)] text-[13.5px] leading-relaxed">Pay drivers and carriers in seconds. Track every payment with full transparency and real-time insights.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <div className="f-eyebrow">Customers</div>
            <h2 className="display text-[34px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-3">Teams that stopped chasing payments</h2>
          </motion.div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.n} {...fadeUp} transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }} className="f-card p-8 flex flex-col">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="rgba(0,162,231,0.25)"><path d="M10 8H6a4 4 0 0 0-4 4v6h7v-7H6.5A2.5 2.5 0 0 1 9 8.5V8h1zm12 0h-4a4 4 0 0 0-4 4v6h7v-7h-2.5A2.5 2.5 0 0 1 21 8.5V8h1z" /></svg>
                <p className="mt-4 text-[15px] text-[var(--navy)] leading-relaxed flex-1">{t.q}</p>
                <div className="mt-6 pt-5 border-t" style={{ borderColor: "#EDF2F8" }}>
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full grid place-items-center text-[13px] font-bold text-white" style={{ background: "linear-gradient(160deg,#0B2D5C,#0670a0)" }}>{t.n.split(" ").map((w) => w[0]).join("")}</span>
                    <span><span className="block text-[14px] font-semibold text-[var(--navy)]">{t.n}</span><span className="block text-[12px] text-[var(--muted)]">{t.r} · {t.c}</span></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 f-soft">
        <div className="max-w-[860px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center">
            <div className="f-eyebrow">FAQ</div>
            <h2 className="display text-[34px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-3">Questions, answered</h2>
          </motion.div>
          <motion.div {...fadeUp} className="mt-12 space-y-3.5">
            {FAQS.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>{f.q}<span className="faq-x"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg></span></summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "radial-gradient(900px 480px at 75% -10%,rgba(0,162,231,0.3),transparent 60%),linear-gradient(160deg,#0B2D5C,#093155 65%,#0A3D66)" }}>
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-14 items-center">
            <motion.div {...fadeUp}>
              <h2 className="display text-white text-[36px] md:text-[52px] leading-[1.05]">Power Every Payment in Your Logistics Network</h2>
              <p className="mt-5 text-white/70 text-[15px] md:text-[17px] max-w-xl">Simplify logistics finance with a wallet designed for transportation businesses.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/wallet" className="btn-primary text-[14px] px-7 py-3.5 inline-flex items-center gap-2"><span className="label">Get Started</span></Link>
                <a href="mailto:support@draypay.net?subject=DrayPay%20Sales" className="text-[14px] px-7 py-3.5 rounded-[10px] font-semibold text-white inline-flex items-center gap-2 transition hover:bg-white/15" style={{ border: "1.5px solid rgba(255,255,255,0.35)" }}>Contact Sales</a>
              </div>
            </motion.div>
            <motion.div {...fadeUp} className="hidden lg:flex items-end justify-center overflow-hidden" style={{ minHeight: 420 }}>
              <img src={asset("/draypay-cardstack2.png")} alt="DrayPay Visa Debit Card" style={{ width: 500, objectFit: "contain", display: "block", marginBottom: -24, filter: "drop-shadow(0 30px 60px rgba(0,162,231,0.35))" }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── APP DOWNLOAD BANNER ─── */}
      <section className="py-10 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="app-banner px-8 md:px-14 py-12 md:py-14">
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none flex flex-col justify-center gap-0">
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="whitespace-nowrap font-black" style={{ color: "rgba(255,255,255,0.06)", lineHeight: 1.65, fontSize: "clamp(20px,3vw,34px)" }}>
                  Get the app now.&nbsp;&nbsp;Get the app now.&nbsp;&nbsp;Get the app now.&nbsp;&nbsp;Get the app now.&nbsp;&nbsp;Get the app now.
                </div>
              ))}
            </div>
            <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <div className="display text-white text-[28px] md:text-[40px] leading-[1.1]">Get the app now. <span style={{ color: "rgba(255,255,255,0.45)" }}>Manage DrayPay on the go.</span></div>
                <p className="mt-3 text-white/60 text-[15px] max-w-lg">Manage your wallet, send payments and track settlements from your phone — iOS and Android.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#" className="store-btn">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    <span className="leading-none text-left"><span className="block text-[9px] opacity-75 font-normal">Download on the</span><span className="block text-[15px] font-bold tracking-tight">App Store</span></span>
                  </a>
                  <a href="#" className="store-btn">
                    <svg width="22" height="22" viewBox="0 0 24 24"><path d="M3.18 23.76c.28.16.6.24.93.22l12.2-6.98L13.05 14l-9.87 9.76z" fill="#EA4335"/><path d="M21.5 10.7l-2.88-1.65L14.54 10l3.08 3.08 3.88-1.65c.83-.45.83-1.74 0-2.27z" fill="#FBBC05"/><path d="M4.11.68A1.4 1.4 0 003.17.5L13.04 10l4.28-1.34L4.11.68z" fill="#4285F4"/><path d="M3.18.26C2.7.53 2.4 1.07 2.4 1.72v20.56c0 .65.3 1.19.78 1.46l.07.04 11.52-11.52v-.27L3.25.22l-.07.04z" fill="#34A853"/></svg>
                    <span className="leading-none text-left"><span className="block text-[9px] opacity-75 font-normal uppercase tracking-[0.12em]">Get it on</span><span className="block text-[15px] font-bold tracking-tight">Google Play</span></span>
                  </a>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-center gap-3">
                <div style={{ background: "white", borderRadius: 18, padding: 12, width: 120, height: 120, display: "grid", placeItems: "center" }}>
                  <svg viewBox="0 0 21 21" width="96" height="96" style={{ imageRendering: "pixelated" }}>
                    {/* Finder top-left */}
                    <rect x="0" y="0" width="7" height="7" fill="#0B2D5C"/><rect x="1" y="1" width="5" height="5" fill="white"/><rect x="2" y="2" width="3" height="3" fill="#0B2D5C"/>
                    {/* Finder top-right */}
                    <rect x="14" y="0" width="7" height="7" fill="#0B2D5C"/><rect x="15" y="1" width="5" height="5" fill="white"/><rect x="16" y="2" width="3" height="3" fill="#0B2D5C"/>
                    {/* Finder bottom-left */}
                    <rect x="0" y="14" width="7" height="7" fill="#0B2D5C"/><rect x="1" y="15" width="5" height="5" fill="white"/><rect x="2" y="16" width="3" height="3" fill="#0B2D5C"/>
                    {/* Data modules */}
                    {[[8,0],[10,0],[12,0],[9,1],[11,1],[8,2],[10,2],[12,2],[9,3],[11,3],[8,4],[10,4],[12,4],[8,5],[9,5],[11,5],[8,6],[12,6],[0,8],[2,8],[4,8],[6,8],[8,8],[9,8],[10,8],[12,8],[14,8],[16,8],[18,8],[20,8],[1,9],[3,9],[5,9],[7,9],[11,9],[13,9],[15,9],[17,9],[19,9],[0,10],[2,10],[4,10],[6,10],[8,10],[10,10],[12,10],[14,10],[16,10],[18,10],[20,10],[1,11],[3,11],[9,11],[11,11],[13,11],[15,11],[17,11],[19,11],[0,12],[2,12],[4,12],[6,12],[8,12],[10,12],[12,12],[14,12],[16,12],[18,12],[20,12],[8,13],[10,13],[12,13],[14,13],[16,13],[18,13],[20,13],[9,14],[11,14],[13,14],[15,14],[17,14],[19,14],[8,15],[10,15],[12,15],[14,15],[16,15],[18,15],[20,15],[9,16],[11,16],[13,16],[15,16],[17,16],[19,16],[8,17],[10,17],[12,17],[14,17],[16,17],[18,17],[20,17],[9,18],[11,18],[13,18],[15,18],[17,18],[19,18],[8,19],[10,19],[14,19],[16,19],[18,19],[20,19],[9,20],[11,20],[13,20],[15,20],[17,20],[19,20]].map(([x,y],i) => (
                      <rect key={i} x={x} y={y} width={1} height={1} fill="#0B2D5C"/>
                    ))}
                  </svg>
                </div>
                <div className="text-white/45 text-[11px] font-medium text-center">Scan to download</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}

/* ── Get Started Steps ── */
const ONBOARDING_STEPS = [
  {
    num: "1",
    title: "Create your account",
    desc: "Sign up in minutes. Add your company details and verify your identity to unlock your DrayPay wallet.",
  },
  {
    num: "2",
    title: "Connect your operation",
    desc: "Link your fleet, load board, and brokers. Import drivers and set up your payment workflows in one place.",
  },
  {
    num: "3",
    title: "Pay and get paid instantly",
    desc: "Send payouts to drivers, settle port fees, and collect freight payments — all from a single dashboard.",
  },
];

function GetStartedSteps() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div {...fadeUp} className="text-center mb-10">
          <h2 className="display text-[34px] md:text-[52px] text-[var(--navy)] leading-[1.08] mb-6">
            Get started in 3 steps
          </h2>
          <a
            href="#"
            style={{
              display: "inline-block",
              background: "#0B2D5C",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              padding: "13px 32px",
              borderRadius: 999,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#00a2e7"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#0B2D5C"; }}
          >
            Download DrayPay
          </a>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="mt-10">
          {ONBOARDING_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              style={{
                background: "#EDEEF0",
                borderRadius: 16,
                padding: "28px 28px 36px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {/* Circled number */}
              <div style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1.5px solid #0B2D5C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 600,
                color: "#0B2D5C",
                flexShrink: 0,
              }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0B2D5C", lineHeight: 1.3, margin: 0 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Services Grid ── */
const SERVICE_CARDS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
    ),
    title: "Instant Driver Payouts",
    desc: "Pay drivers and owner-operators the moment a load is delivered — no waiting, no checks.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    ),
    title: "Digital Paperwork",
    desc: "Replace paper BOLs, invoices, and receipts with digital documents — signed and stored automatically.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
    ),
    title: "QuickPay Freight Funding",
    desc: "Get paid early on outstanding invoices. Stop waiting 30-90 days for broker payments.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    title: "Container Settlement",
    desc: "Automate port demurrage, per diem, and container fees — reconciled and settled in real time.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
    title: "Multi-Party Splits",
    desc: "Automatically split payments between carriers, brokers, and agents on every transaction.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-4"/><path d="m5 7 3 3-3 3"/></svg>
    ),
    title: "Send Payments Anywhere",
    desc: "Wire funds to any bank, port authority, or logistics partner — domestic or international, 24/7.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 21V9"/></svg>
    ),
    title: "Fleet Fuel Cards",
    desc: "Issue virtual and physical fuel cards to your fleet. Set spending limits per driver or truck.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    ),
    title: "Real-Time Spend Tracking",
    desc: "See every transaction across your entire operation as it happens — one dashboard, zero surprises.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
    ),
    title: "Compliance & Tax Reports",
    desc: "Automated IFTA, per-diem, and 1099 reporting. Stay audit-ready without the manual work.",
  },
];

function ServicesGrid() {
  return (
    <section className="py-24" style={{ background: "#F8FAFC" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div {...fadeUp} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div style={{ height: 1, width: 48, background: "#CBD5E1" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B7C93" }}>Our Services</span>
            <div style={{ height: 1, width: 48, background: "#CBD5E1" }} />
          </div>
          <h2 className="display text-[34px] md:text-[50px] text-[var(--navy)] leading-[1.08]">Everything logistics<br className="hidden md:block" /> payments need</h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="md:grid-cols-3 grid-cols-1">
          {SERVICE_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              style={{
                background: "#EDEEF0",
                borderRadius: 16,
                padding: "28px 28px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                cursor: "default",
                transition: "background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = "#0B2D5C";
                el.style.boxShadow = "0 20px 48px rgba(11,45,92,0.22)";
                el.style.transform = "translateY(-4px)";
                el.querySelectorAll<HTMLElement>("h3").forEach(h => h.style.color = "#fff");
                el.querySelectorAll<HTMLElement>("p").forEach(p => p.style.color = "rgba(255,255,255,0.72)");
                el.querySelectorAll<SVGElement>("svg").forEach(s => s.style.stroke = "#00a2e7");
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = "#EDEEF0";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
                el.querySelectorAll<HTMLElement>("h3").forEach(h => h.style.color = "#0B2D5C");
                el.querySelectorAll<HTMLElement>("p").forEach(p => p.style.color = "#64748B");
                el.querySelectorAll<SVGElement>("svg").forEach(s => s.style.stroke = "currentColor");
              }}
            >
              <div style={{ color: "#0B2D5C", marginBottom: 4 }}>{card.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0B2D5C", lineHeight: 1.3, margin: 0 }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Illustration helpers ── */
function PaperPlaneFig() {
  const coins = [
    { w: 54, style: { top: "8%", left: "12%" } as React.CSSProperties },
    { w: 38, style: { top: "28%", right: "15%" } as React.CSSProperties },
    { w: 46, style: { bottom: "22%", left: "28%" } as React.CSSProperties },
  ];
  return (
    <div className="relative w-full h-full overflow-hidden">
      {coins.map((c, i) => (
        <div key={i} className={`coin-blob absolute ${["float-soft","float-soft-2","float-soft-3"][i]}`} style={{ width: c.w, height: c.w, ...c.style }} />
      ))}
      <svg style={{ position: "absolute", bottom: -8, right: 0, filter: "drop-shadow(0 14px 28px rgba(0,162,231,0.38))" }} width="210" height="162" viewBox="0 0 220 170" fill="none">
        <defs><linearGradient id="pp1" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#0B2D5C" /><stop offset="100%" stopColor="#00a2e7" /></linearGradient></defs>
        <polygon points="5,85 210,12 155,85 210,160" fill="url(#pp1)" />
        <polygon points="155,85 210,12 88,108" fill="rgba(255,255,255,0.22)" />
        <polygon points="5,85 210,160 88,108" fill="rgba(0,0,0,0.10)" />
      </svg>
    </div>
  );
}

function CardFanFig() {
  return (
    <div style={{ position: "relative", width: 420, height: 380, margin: "0 auto" }}>
      {/* card 3 — back (static) */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", pointerEvents: "none" }}>
        <img src={asset("/draypay-blue-card.png")} alt="" style={{ width: 290, transform: "translateX(-72%) rotate(-16deg) translateY(-12px)", opacity: 0.35, filter: "blur(1px)", objectFit: "contain", display: "block" }} />
      </div>
      {/* card 2 — mid (static) */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", pointerEvents: "none" }}>
        <img src={asset("/draypay-blue-card.png")} alt="" style={{ width: 305, transform: "translateX(-52%) rotate(-6deg) translateY(-6px)", opacity: 0.65, objectFit: "contain", display: "block" }} />
      </div>
      {/* card 1 — front */}
      <div style={{ position: "absolute", bottom: 0, left: "50%" }}>
        <img src={asset("/draypay-blue-card.png")} alt="DrayPay Debit Card" style={{ width: 320, transform: "translateX(-42%) rotate(5deg)", filter: "drop-shadow(0 22px 44px rgba(0,162,231,0.5)) drop-shadow(0 8px 18px rgba(11,45,92,0.32))", objectFit: "contain", display: "block" }} />
      </div>
    </div>
  );
}

function ReceiptFig() {
  const rows = [["Driver payout","$740.00","#0E9F6E"],["Broker fee","$185.00","#0670a0"],["Fuel advance","-$150.00","#e05252"],["Platform fee","-$12.00","#e05252"],["Net settled","$763.00","#0B2D5C"]];
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", paddingBottom: 0 }}>
      <div style={{ width: 260, background: "white", borderRadius: "20px 20px 0 0", boxShadow: "0 -6px 40px rgba(11,45,92,0.13), 0 24px 60px rgba(11,45,92,0.10)", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg,#0B2D5C,#0a5490)", padding: "16px 20px 14px" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Settlement</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "white", marginTop: 3 }}>Load #LB-4417</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Long Beach → Phoenix · Delivered</div>
        </div>
        <div style={{ padding: "4px 0 0" }}>
          {rows.map(([k, v, c]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", borderBottom: "1px dashed #EDF2F8" }}>
              <span style={{ fontSize: 12, color: "#6B7C93" }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: c }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 20px", background: "#F8FBFE", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#0B2D5C" }}>Settled in</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#0670a0" }}>38 seconds</span>
        </div>
      </div>
    </div>
  );
}

/* ── AnimatedVisaCard — DrayPay card photo with 3D float animation ── */
function AnimatedVisaCard() {
  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", paddingTop: 8 }}>
      {/* Ambient glow — static */}
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 340, height: 260, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,162,231,0.45) 0%, rgba(0,162,231,0.12) 50%, transparent 72%)", filter: "blur(32px)", zIndex: 0, pointerEvents: "none" }} />
      {/* Card photo with 3D float */}
      <img
        src={asset("/draypay-blue-card.png")}
        alt="DrayPay VISA Debit Card"
        style={{ width: 260, display: "block", position: "relative", zIndex: 1, animation: "card-float 7s ease-in-out infinite", filter: "drop-shadow(0 28px 48px rgba(0,162,231,0.5)) drop-shadow(0 8px 18px rgba(0,0,0,0.55))" }}
      />
    </div>
  );
}

/* ── SettlementFig — CSS phone matching MobileWalletFig ── */
function SettlementFig() {
  const rows: [string, string, string][] = [
    ["Driver payout", "+$740.00", "#10B981"],
    ["Broker fee", "+$185.00", "#10B981"],
    ["Fuel advance", "-$150.00", "#EF4444"],
    ["Platform fee", "-$12.00", "#EF4444"],
    ["Net settled", "$763.00", "#0B1220"],
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: 222, borderRadius: "32px 32px 0 0", background: "#F5F6FA", overflow: "hidden" }}>
        {/* status bar */}
        <div style={{ height: 30, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px", fontSize: 9, color: "#222", fontWeight: 700 }}>
          <span>9:41</span>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <svg width="11" height="9" viewBox="0 0 24 20" fill="#222"><rect x="0" y="8" width="4" height="12" rx="1"/><rect x="6" y="5" width="4" height="15" rx="1"/><rect x="12" y="2" width="4" height="18" rx="1"/><rect x="18" y="0" width="4" height="20" rx="1" opacity=".3"/></svg>
            <svg width="20" height="10" viewBox="0 0 38 18" fill="none"><rect x="1" y="1" width="32" height="16" rx="4" stroke="#222" strokeWidth="1.5"/><rect x="3" y="3" width="24" height="12" rx="2.5" fill="#222"/><rect x="34" y="5" width="3" height="8" rx="1.5" fill="#222" opacity=".4"/></svg>
          </div>
        </div>
        {/* header */}
        <div style={{ padding: "6px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 9, color: "#888", fontWeight: 500 }}>Settlement</div>
            <div style={{ fontSize: 15, fontWeight: 900, color: "#0B1220", marginTop: 1 }}>Load #LB-4417</div>
          </div>
          <div style={{ fontSize: 8, background: "#DCFCE7", color: "#10B981", padding: "3px 8px", borderRadius: 6, fontWeight: 700, marginTop: 4 }}>✓ Settled</div>
        </div>
        {/* route pill */}
        <div style={{ margin: "0 14px 12px", background: "#EEF2FF", borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 6, fontSize: 9.5, fontWeight: 600, color: "#4338CA" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4338CA" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          Long Beach → Phoenix · Delivered
        </div>
        {/* settlement rows */}
        <div style={{ margin: "0 10px", background: "white", borderRadius: 16, overflow: "hidden" }}>
          {rows.map(([label, val, color], i) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", borderBottom: i < rows.length - 1 ? "1px solid #F3F4F6" : "none" }}>
              <span style={{ fontSize: 10, color: "#555", fontWeight: label === "Net settled" ? 700 : 500 }}>{label}</span>
              <span style={{ fontSize: 10.5, fontWeight: 700, color }}>{val}</span>
            </div>
          ))}
        </div>
        {/* settled in badge */}
        <div style={{ margin: "10px 14px 0", display: "flex", justifyContent: "center" }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: "#1852D9", background: "#EEF2FF", padding: "5px 14px", borderRadius: 8 }}>
            ⚡ Settled in 38 seconds
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileWalletFig() {
  const cats = [
    { bg: "#FFF3CD", ic: "M3 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z", cl: "#F59E0B", lbl: "Payout" },
    { bg: "#FFE4E4", ic: "M5 12h14M12 5l7 7-7 7",                                        cl: "#EF4444", lbl: "Transfer" },
    { bg: "#E0F2FE", ic: "M3 3v18h18M3 17l6-6 4 4 8-8",                                  cl: "#0EA5E9", lbl: "QuickPay" },
    { bg: "#F3E8FF", ic: "M12 2v20M2 12h20",                                              cl: "#8B5CF6", lbl: "More" },
    { bg: "#DCFCE7", ic: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2", cl: "#10B981", lbl: "Reports" },
    { bg: "#FEF9C3", ic: "M3 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z",   cl: "#EAB308", lbl: "History" },
    { bg: "#E0F2FE", ic: "M3 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM16 13h3", cl: "#0670a0", lbl: "Card" },
    { bg: "#FFE4E4", ic: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",                  cl: "#EF4444", lbl: "Insurance" },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: 222, borderRadius: "32px 32px 0 0", background: "#F5F6FA", overflow: "hidden" }}>
        {/* status bar */}
        <div style={{ height: 30, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px", fontSize: 9, color: "#222", fontWeight: 700 }}>
          <span>9:41</span>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <svg width="11" height="9" viewBox="0 0 24 20" fill="#222"><rect x="0" y="8" width="4" height="12" rx="1"/><rect x="6" y="5" width="4" height="15" rx="1"/><rect x="12" y="2" width="4" height="18" rx="1"/><rect x="18" y="0" width="4" height="20" rx="1" opacity=".3"/></svg>
            <svg width="11" height="8" viewBox="0 0 22 16" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round"><path d="M1 6Q5.5 1 11 1Q16.5 1 21 6"/><path d="M4 10Q7 6.5 11 6.5Q15 6.5 18 10"/><circle cx="11" cy="14" r="1.5" fill="#222" stroke="none"/></svg>
            <svg width="20" height="10" viewBox="0 0 38 18" fill="none"><rect x="1" y="1" width="32" height="16" rx="4" stroke="#222" strokeWidth="1.5"/><rect x="3" y="3" width="24" height="12" rx="2.5" fill="#222"/><rect x="34" y="5" width="3" height="8" rx="1.5" fill="#222" opacity=".4"/></svg>
          </div>
        </div>
        {/* greeting */}
        <div style={{ padding: "6px 16px 10px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 9, color: "#888", fontWeight: 500 }}>Good Morning,</div>
            <div style={{ fontSize: 15, fontWeight: 900, color: "#0B1220", marginTop: 1 }}>Hello Nelson</div>
          </div>
          <div style={{ width: 28, height: 28, borderRadius: 9, background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0B1220" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
        </div>
        {/* blue wallet card */}
        <div style={{ margin: "0 12px 12px", borderRadius: 14, background: "linear-gradient(135deg,#1852D9 0%,#3B82F6 100%)", padding: "14px 15px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -12, top: -12, width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
          <div style={{ position: "absolute", right: 10, top: 10 }}>
            <svg width="22" height="14" viewBox="0 0 38 24"><circle cx="14" cy="12" r="12" fill="rgba(255,160,0,0.85)"/><circle cx="24" cy="12" r="12" fill="rgba(255,80,0,0.65)"/></svg>
          </div>
          <div style={{ fontSize: 8, color: "rgba(255,255,255,0.7)", fontWeight: 600, marginBottom: 5 }}>Total Wallet Balance</div>
          <div style={{ fontSize: 21, fontWeight: 900, color: "white", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 5 }}>
            $12,480.20
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.2" strokeLinecap="round"><path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
          </div>
        </div>
        {/* 3 actions */}
        <div style={{ display: "flex", padding: "0 12px 12px", gap: 6 }}>
          {[
            { lbl: "Transfer", d: "M5 12h14M13 6l6 6-6 6" },
            { lbl: "Request",  d: "M19 12H5M11 18l-6-6 6-6" },
            { lbl: "Top Up",   d: "M12 5v14M5 12h14" },
          ].map(b => (
            <div key={b.lbl} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: "#E8F0FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1852D9" strokeWidth="2.2" strokeLinecap="round"><path d={b.d}/></svg>
              </div>
              <span style={{ fontSize: 8, color: "#555", fontWeight: 600 }}>{b.lbl}</span>
            </div>
          ))}
        </div>
        {/* payment list */}
        <div style={{ padding: "0 14px 8px", fontSize: 11, fontWeight: 800, color: "#0B1220" }}>Payment List</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", padding: "0 8px 14px", rowGap: 8 }}>
          {cats.map(c => (
            <div key={c.lbl} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.cl} strokeWidth="2" strokeLinecap="round"><path d={c.ic}/></svg>
              </div>
              <span style={{ fontSize: 7.5, color: "#555", fontWeight: 600 }}>{c.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShieldSvg() {
  return (
    <svg width="210" height="210" viewBox="0 0 210 210" fill="none">
      <path d="M105 18L182 48L182 118Q182 170 105 194Q28 170 28 118L28 48Z" fill="rgba(0,162,231,0.13)" stroke="rgba(0,162,231,0.28)" strokeWidth="2" />
      <path d="M95 82Q90 72 105 68Q120 64 120 82Q120 96 105 100" stroke="#00a2e7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M82 88Q76 68 105 62Q134 56 138 88Q140 110 120 118Q104 124 88 118" stroke="#00a2e7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M70 96Q62 74 105 58Q148 42 152 96Q155 126 132 140Q116 150 96 146" stroke="#00a2e7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="168" cy="168" r="22" fill="rgba(14,159,110,0.15)" stroke="#0E9F6E" strokeWidth="2" />
      <path d="M160 168l6 6 10-10" stroke="#0E9F6E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function SecCardEl() {
  return (
    <div style={{ width: 220, height: 138, borderRadius: 20, background: "linear-gradient(135deg,#0B2D5C,#0670a0)", boxShadow: "0 24px 60px -20px rgba(11,45,92,0.5)", transform: "rotate(-8deg)", padding: "16px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: -28, right: -28, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: 42, height: 30, borderRadius: 5, background: "rgba(255,255,255,0.3)" }} />
        <svg width="34" height="22" viewBox="0 0 54 33"><circle cx="21" cy="16.5" r="16.5" fill="rgba(255,255,255,0.3)" /><circle cx="33" cy="16.5" r="16.5" fill="rgba(255,255,255,0.45)" /></svg>
      </div>
      <div>
        <div style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.7)", fontSize: 12, letterSpacing: "0.15em" }}>•••• •••• •••• 4417</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em" }}>DRAYPAY</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>12/28</span>
        </div>
      </div>
    </div>
  );
}

function LockSvg() {
  return (
    <svg width="190" height="210" viewBox="0 0 190 210" fill="none">
      <rect x="25" y="88" width="140" height="112" rx="22" fill="rgba(0,162,231,0.13)" stroke="rgba(0,162,231,0.28)" strokeWidth="2" />
      <path d="M60 88L60 60Q60 28 95 28Q130 28 130 60L130 88" stroke="rgba(0,162,231,0.45)" strokeWidth="12" fill="none" strokeLinecap="round" />
      <circle cx="95" cy="144" r="20" fill="rgba(0,162,231,0.22)" stroke="#00a2e7" strokeWidth="2" />
      <rect x="88" y="146" width="14" height="22" rx="7" fill="rgba(0,162,231,0.4)" />
    </svg>
  );
}

function GearSvg() {
  const pts = [0, 60, 120, 180, 240, 300].map(a => ({
    x: 100 + 80 * Math.cos(a * Math.PI / 180),
    y: 100 + 80 * Math.sin(a * Math.PI / 180),
  }));
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="76" stroke="rgba(106,72,196,0.18)" strokeWidth="1.5" strokeDasharray="8 4" />
      <circle cx="100" cy="100" r="52" fill="rgba(106,72,196,0.1)" stroke="rgba(106,72,196,0.28)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="26" fill="rgba(106,72,196,0.18)" stroke="rgba(106,72,196,0.4)" strokeWidth="1.5" />
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={7} fill="rgba(106,72,196,0.35)" stroke="rgba(106,72,196,0.6)" strokeWidth="1.5" />)}
      <path d="M89 92L103 92L108 100L103 108L89 108L84 100Z" fill="rgba(106,72,196,0.4)" stroke="rgba(106,72,196,0.7)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="5" fill="rgba(106,72,196,0.8)" />
    </svg>
  );
}

function CardDeviceScene() {
  const [active, setActive] = useState(1);
  const VCARDS = [
    { bg: "linear-gradient(135deg,#6B3FA0,#4338CA)" },
    { bg: "linear-gradient(160deg,#00a2e7 0%,#0B2D5C 100%)" },
    { bg: "linear-gradient(135deg,#0EA5E9,#0EA472)" },
    { bg: "linear-gradient(135deg,#EC4899,#8B5CF6)" },
  ];
  const offsets = [-1.5, -0.5, 0.5, 1.5];
  const actions = [
    { l: "Freeze", p: "M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" },
    { l: "Reveal", p: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" },
    { l: "More",   p: "M5 12h.01M12 12h.01M19 12h.01" },
  ];
  return (
    <div className="relative mx-auto mt-10" style={{ height: 530, maxWidth: 960, overflow: "hidden" }}>
      {/* Card tray */}
      <div style={{ position: "absolute", inset: "0 0 90px", display: "flex", justifyContent: "center", alignItems: "flex-end", perspective: "1100px", perspectiveOrigin: "50% -10%" }}>
        {VCARDS.map((c, i) => {
          const off = offsets[i];
          const isAct = i === active;
          return (
            <div key={i} onClick={() => setActive(i)} style={{
              position: "absolute", width: 290, height: 182, borderRadius: 22,
              background: c.bg, bottom: 0, left: "50%", marginLeft: -145,
              transform: `rotateX(52deg) rotateY(${off * 20}deg) translateX(${off * 196}px)`,
              transformOrigin: "bottom center",
              zIndex: isAct ? 8 : 6 - Math.abs(Math.round(off)),
              boxShadow: "0 28px 60px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,0.1) inset",
              transition: "transform .5s cubic-bezier(.2,.7,.2,1)",
              cursor: "pointer", willChange: "transform",
            }}>
              <div style={{ padding: "16px 20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><path d="M3 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM3 7V6a2 2 0 0 1 2-2h3M16 13h3" /></svg>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Virtual</span>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontFamily: "monospace", letterSpacing: "0.14em" }}>•••• •••• •••• 4417</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.06em" }}>DRAYPAY</span>
                    <svg width="36" height="22" viewBox="0 0 54 33"><circle cx="21" cy="16.5" r="16.5" fill="rgba(255,255,255,0.32)" /><circle cx="33" cy="16.5" r="16.5" fill="rgba(255,255,255,0.48)" /></svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Phone frame */}
      <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 226, height: 422, borderRadius: 38, background: "#161B2A", border: "7px solid #252E48", boxShadow: "0 0 0 1px rgba(255,255,255,0.07) inset, 0 40px 80px rgba(0,0,0,.75)", zIndex: 20, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 90, height: 22, borderRadius: 12, background: "#0D1120", zIndex: 2 }} />
        <div style={{ position: "absolute", inset: "42px 0 0", background: "linear-gradient(180deg,#1A2235,#222B42)", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 14 }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>My Card</div>
          <div style={{ width: 164, height: 103, borderRadius: 15, background: VCARDS[active].bg, marginTop: 10, boxShadow: "0 12px 32px rgba(0,0,0,.5)", transition: "background .5s" }}>
            <div style={{ padding: "10px 12px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ fontSize: 6.5, color: "rgba(255,255,255,0.65)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Virtual</div>
              <div>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,0.7)", fontFamily: "monospace", letterSpacing: "0.12em" }}>•••• •••• •••• 4417</div>
                <div style={{ fontSize: 7.5, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginTop: 4 }}>DRAYPAY</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 22, marginTop: 14 }}>
            {actions.map(a => (
              <div key={a.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(255,255,255,0.08)", display: "grid", placeItems: "center" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round"><path d={a.p} /></svg>
                </div>
                <span style={{ fontSize: 7, color: "rgba(255,255,255,0.38)", fontWeight: 500 }}>{a.l}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
            {VCARDS.map((_, i) => (
              <div key={i} onClick={() => setActive(i)} style={{ width: 6, height: 6, borderRadius: "50%", background: i === active ? "white" : "rgba(255,255,255,0.24)", cursor: "pointer", transition: "background .3s" }} />
            ))}
          </div>
        </div>
      </div>
      {/* Bottom color dots */}
      <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 10, zIndex: 30 }}>
        {VCARDS.map((c, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ width: 12, height: 12, borderRadius: "50%", background: i === active ? "white" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all .3s", transform: i === active ? "scale(1.25)" : "scale(1)" }} />
        ))}
      </div>
    </div>
  );
}

/* ── DrayCoin — photo coin with proper 3D rim ── */
function DrayCoin() {
  const R = 80;      // disc radius px
  const TH = 20;     // coin thickness px
  const SEGS = 12;   // edge segments
  const SW = Math.ceil((2 * Math.PI * R) / SEGS) + 2; // segment width with slight overlap

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* warm amber glow — static, no animation */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 260, height: 240, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,200,40,0.75) 0%, rgba(255,130,0,0.25) 50%, transparent 72%)", filter: "blur(32px)", zIndex: 0, pointerEvents: "none" }} />
      {/* perspective shell */}
      <div style={{ perspective: 500, position: "relative", zIndex: 1 }}>
        {/* spinning disc */}
        <div style={{ width: 162, height: 162, position: "relative", transformStyle: "preserve-3d", animation: "coin-y-spin 5s linear infinite" }}>

          {/* ── EDGE RING — segments around Z-axis forming the disc rim ── */}
          {Array.from({ length: SEGS }, (_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: TH,
              height: SW,
              top: `calc(50% - ${SW / 2}px)`,
              left: `calc(50% - ${TH / 2}px)`,
              background: "linear-gradient(90deg,#FFF3A0 0%,#F5C018 25%,#C07010 55%,#7A4000 100%)",
              transform: `rotateZ(${i * (360 / SEGS)}deg) translateX(${R}px) rotateY(90deg)`,
            }} />
          ))}

          {/* ── FRONT face ── */}
          <img
            src={asset("/draypay-coin-front.png")}
            alt="DrayPay coin"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: `translateZ(${TH / 2}px)`, borderRadius: "50%", display: "block" }}
          />
          {/* ── BACK face ── */}
          <img
            src={asset("/draypay-coin-back.png")}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: `rotateY(180deg) translateZ(${TH / 2}px)`, borderRadius: "50%", display: "block" }}
          />
        </div>
      </div>
      {/* floor shadow */}
      <div style={{ width: 120, height: 13, borderRadius: "50%", background: "rgba(0,0,0,0.28)", filter: "blur(7px)", marginTop: 6, position: "relative", zIndex: 1 }} />
    </div>
  );
}

/* ── FeaturesAccordion — left panel for Image #28 section ── */
function FeaturesAccordion() {
  const [active, setActive] = useState(0);
  const items = [
    { icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M12 12h.01M9 16h6", title: "Instant Payment Analysis", desc: "Every transaction auto-categorized. See exactly where your money flows, updated in real time across your whole logistics network — per load, per carrier, per route." },
    { icon: "M3 7h18M3 12h18M3 17h18", title: "Smart Payout Builder", desc: "Set pay-on-delivery rules once. DrayPay handles every split, deduction, and fuel advance automatically — no manual steps, no delays." },
    { icon: "M3 3v18h18M3 17l6-6 4 4 4-8 4 4", title: "Settlement Forecasting", desc: "Predict cash flow based on upcoming deliveries and scheduled releases. Never be surprised by a payment gap in your logistics operation." },
    { icon: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4", title: "Financial Insights", desc: "Per-load payment history, fee breakdowns, and one-click accounting exports your team will actually use at month end." },
  ];
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <button key={i} onClick={() => setActive(i)} className="w-full text-left rounded-2xl p-5 transition-all duration-200" style={{ background: active === i ? "white" : "rgba(255,255,255,0.55)", border: active === i ? "1.5px solid rgba(0,162,231,0.3)" : "1.5px solid transparent", cursor: "pointer" }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 36, height: 36, borderRadius: 10, background: active === i ? "rgba(0,162,231,0.12)" : "rgba(11,45,92,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background .2s" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={active === i ? "#0670a0" : "#6B7C93"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon}/></svg>
            </div>
            <span className="display text-[15px]" style={{ color: "#0B2D5C" }}>{item.title}</span>
          </div>
          {active === i && (
            <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "#4B5563", paddingLeft: 48 }}>{item.desc}</p>
          )}
        </button>
      ))}
    </div>
  );
}

/* ── AccordionPhone — right panel for Image #28 section ── */
function AccordionPhone() {
  const bars = [38, 55, 42, 70, 50, 88, 62, 75, 48, 92];
  const txns = [
    { name: "Load #LB-4417 · Payout", amt: "+$740", c: "#4ade9a" },
    { name: "QuickPay · Atlas Carriers", amt: "+$1,120", c: "#4ade9a" },
    { name: "Fuel advance · Pilot #214", amt: "-$150", c: "#f87171" },
    { name: "Broker fee · Halo Freight", amt: "+$185", c: "#4ade9a" },
  ];
  return (
    <div style={{ width: 248, borderRadius: "40px 40px 0 0", background: "#0B1220", padding: "10px 8px 0", border: "1.5px solid rgba(255,255,255,0.08)", borderBottom: "none" }}>
      <div style={{ width: 88, height: 22, background: "#0B1220", borderRadius: "0 0 14px 14px", margin: "0 auto 4px" }} />
      <div style={{ borderRadius: "30px 30px 0 0", overflow: "hidden", background: "#111827" }}>
        {/* status bar */}
        <div style={{ height: 28, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px", fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>
          <span>9:41</span><span>●●</span>
        </div>
        {/* header */}
        <div style={{ padding: "0 14px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Payment Analytics</div>
            <div style={{ fontSize: 15, fontWeight: 900, color: "white", marginTop: 1 }}>Overview</div>
          </div>
          <div style={{ width: 28, height: 28, borderRadius: 9, background: "rgba(0,162,231,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00a2e7" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
        </div>
        {/* balance card */}
        <div style={{ margin: "0 10px 10px", borderRadius: 16, background: "linear-gradient(135deg,#00a2e7 0%,#0B2D5C 100%)", padding: "12px 14px" }}>
          <div style={{ fontSize: 8, color: "rgba(255,255,255,0.65)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Monthly Settled</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "white", marginTop: 3, letterSpacing: "-0.02em" }}>$51,240.00</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 5 }}>
            <span style={{ fontSize: 8, background: "rgba(74,222,154,0.2)", color: "#4ade9a", padding: "2px 6px", borderRadius: 5, fontWeight: 700 }}>↑ 12.4%</span>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.45)" }}>vs last month</span>
          </div>
        </div>
        {/* bar chart */}
        <div style={{ padding: "0 12px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.55)" }}>Settlement Volume</span>
            <span style={{ fontSize: 9, color: "#00a2e7", fontWeight: 700 }}>Jun 2026</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 44 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "2px 2px 0 0", background: i === 9 ? "linear-gradient(180deg,#00a2e7,#0670a0)" : "rgba(255,255,255,0.1)", transition: "height .3s" }} />
            ))}
          </div>
        </div>
        {/* recent transactions */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "8px 0 0" }}>
          <div style={{ padding: "0 14px 6px", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Recent</div>
          {txns.map(t => (
            <div key={t.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 150 }}>{t.name}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: t.c, flexShrink: 0, marginLeft: 6 }}>{t.amt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Per-feature visual mockups (CSS only). */
function FeatureVisual({ idx }: { idx: number }) {
  if (idx === 0) {
    // Instant transfers — transfer card
    return (
      <div className="f-card p-7 w-full max-w-[440px]" style={{ borderRadius: 20 }}>
        <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--muted)]">Transfer</div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="text-center"><span className="w-12 h-12 rounded-full grid place-items-center text-[15px] font-bold text-white mx-auto" style={{ background: "linear-gradient(160deg,#0B2D5C,#0670a0)" }}>HF</span><div className="text-[11px] font-semibold text-[var(--navy)] mt-2">Halo Freight</div><div className="text-[10px] text-[var(--muted)]">Broker</div></div>
          <div className="flex-1"><div className="flow-line" /><div className="text-center num text-[18px] font-bold text-[var(--navy)] mt-3">$1,840.00</div><div className="text-center text-[10px] text-[var(--muted)]">Load #LB-4417 · fee $9.20</div></div>
          <div className="text-center"><span className="w-12 h-12 rounded-full grid place-items-center text-[15px] font-bold text-white mx-auto" style={{ background: "linear-gradient(160deg,#00a2e7,#0670a0)" }}>MA</span><div className="text-[11px] font-semibold text-[var(--navy)] mt-2">M. Alvarez</div><div className="text-[10px] text-[var(--muted)]">Driver</div></div>
        </div>
        <div className="mt-6 rounded-xl px-4 py-3 flex items-center justify-between" style={{ background: "rgba(14,159,110,0.08)" }}>
          <span className="text-[12px] font-semibold" style={{ color: "#0E9F6E" }}>✓ Settled in 42 seconds</span>
          <span className="text-[11px] num text-[var(--muted)]">Today, 2:14 PM</span>
        </div>
      </div>
    );
  }
  if (idx === 1) {
    // Wallet management — stacked balance cards
    return (
      <div className="relative w-full max-w-[420px] h-[300px]">
        {[
          { t: "Available balance", v: "$12,480.20", s: "Ready to send or spend", top: 0, z: 3, float: "float-soft" },
          { t: "Reserved for booked loads", v: "$8,340.00", s: "5 moves in progress", top: 105, z: 2, float: "float-soft-2" },
          { t: "Arriving via QuickPay", v: "$2,310.40", s: "Funding now", top: 210, z: 1, float: "float-soft-3" },
        ].map((c) => (
          <div key={c.t} className={`absolute left-0 right-0 f-card p-5 ${c.float}`} style={{ top: c.top, zIndex: c.z, borderRadius: 18 }}>
            <div className="flex items-center justify-between">
              <span><span className="block text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--muted)]">{c.t}</span><span className="num display text-[22px] text-[var(--navy)] mt-1 block">{c.v}</span></span>
              <span className="pm-pill" style={{ background: "rgba(0,162,231,0.1)", color: "#0670a0" }}>{c.s}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (idx === 2) {
    // Payout automation — rules list
    return (
      <div className="f-card p-7 w-full max-w-[440px]" style={{ borderRadius: 20 }}>
        <div className="flex items-center justify-between"><span className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--muted)]">Settlement rules</span><span className="pm-pill" style={{ background: "rgba(14,159,110,0.1)", color: "#0E9F6E" }}>3 active</span></div>
        {[
          ["Pay on delivery confirmation", "All carriers · instant payout"],
          ["Split 85 / 15", "Owner-operators · carrier / driver"],
          ["Hold $150 fuel advance", "Deducted before payout"],
        ].map(([n, d]) => (
          <div key={n} className="mt-3.5 rounded-xl px-4 py-3.5 flex items-center gap-3" style={{ background: "#F7FAFD", border: "1px solid #EDF2F8" }}>
            <span className="w-8 h-8 rounded-lg grid place-items-center shrink-0" style={{ background: "rgba(0,162,231,0.1)" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0670a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M5.6 18.4l2.2-2.2M16.2 7.8l2.2-2.2" /></svg></span>
            <span><span className="block text-[13px] font-semibold text-[var(--navy)]">{n}</span><span className="block text-[11px] text-[var(--muted)] mt-0.5">{d}</span></span>
            <span className="ml-auto w-9 h-5 rounded-full relative shrink-0" style={{ background: "#00a2e7" }}><span className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" /></span>
          </div>
        ))}
      </div>
    );
  }
  if (idx === 3) {
    // Financial visibility — chart + chips
    return (
      <div className="f-card p-7 w-full max-w-[440px]" style={{ borderRadius: 20 }}>
        <div className="flex items-center justify-between"><span className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--muted)]">Payment volume · June</span><span className="num text-[12px] font-bold" style={{ color: "#0E9F6E" }}>↑ 12.4%</span></div>
        <div className="mt-5 flex items-end gap-2 h-[120px]">
          {[42, 58, 39, 66, 52, 78, 61, 84, 70, 92].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 9 ? "linear-gradient(180deg,#00a2e7,#0670a0)" : "#E3EEF7" }} />
          ))}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {[["Sent", "$1.24M"], ["Received", "$1.51M"], ["Fees", "$4,180"]].map(([k, v]) => (
            <div key={k} className="rounded-xl px-3 py-2.5 text-center" style={{ background: "#F7FAFD", border: "1px solid #EDF2F8" }}>
              <div className="text-[9.5px] uppercase tracking-[0.12em] font-bold text-[var(--muted)]">{k}</div>
              <div className="num text-[14px] font-bold text-[var(--navy)] mt-0.5">{v}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // Multi-role access — role grid
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-[440px]">
      {ROLES.map((r) => (
        <div key={r.n} className="f-card p-5" style={{ borderRadius: 18 }}>
          <span className="w-10 h-10 rounded-xl grid place-items-center block" style={{ background: "linear-gradient(160deg,#0B2D5C,#0670a0)" }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={r.i} /></svg>
          </span>
          <div className="display text-[15px] text-[var(--navy)] mt-3">{r.n}</div>
          <div className="text-[11.5px] text-[var(--muted)] mt-1 leading-relaxed">{r.d}</div>
        </div>
      ))}
    </div>
  );
}
