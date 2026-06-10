"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import { PhoneWallet, FloatChip, DashboardMock, Card3D, Counter } from "@/components/Fintech";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const BRANDS = ["CARGOMAX", "portlink", "NORDFREIGHT", "veritas3pl", "ARC LOGISTICS", "Halo Freight", "ROADWORKS", "Meridian Fleet", "Atlas Carriers", "Northstar Cargo"];

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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const chipY1 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const chipY2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 36]);

  return (
    <>
      <Nav />

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden f-hero-bg">
        <div className="max-w-[1280px] mx-auto px-6 pt-16 md:pt-24 pb-20 md:pb-28 grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0670a0]" style={{ background: "rgba(0,162,231,0.08)", border: "1px solid rgba(0,162,231,0.22)" }}>
                <span className="live-dot" /> Logistics payment infrastructure
              </div>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }} className="display text-[40px] md:text-[60px] leading-[1.04] mt-6 text-[var(--navy)]">
              The Financial Hub for <span className="bg-gradient-to-r from-[#00a2e7] to-[#0670a0] bg-clip-text text-transparent">Modern Logistics</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16, ease: "easeOut" }} className="mt-6 text-[var(--muted)] text-[16px] md:text-[18px] leading-relaxed max-w-xl">
              Manage payments, balances, payouts, and transfers across your entire transportation network from a single wallet.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.24, ease: "easeOut" }} className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/wallet" className="btn-primary text-[14px] px-7 py-3.5 inline-flex items-center gap-2"><span className="label">Get Started</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
              <a href="mailto:support@draypay.net?subject=DrayPay%20Demo" className="btn-line text-[14px] px-7 py-3.5 inline-flex items-center gap-2">Book Demo</a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-10 flex items-center gap-8 text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
              <div><div className="display num text-[24px] md:text-[28px] text-[var(--navy)]">&lt;60s</div><div className="mt-0.5">Payout speed</div></div>
              <div className="h-9 w-px" style={{ background: "rgba(11,45,92,0.12)" }} />
              <div><div className="display num text-[24px] md:text-[28px] text-[var(--navy)]">$48M+</div><div className="mt-0.5">Settled / month</div></div>
              <div className="h-9 w-px" style={{ background: "rgba(11,45,92,0.12)" }} />
              <div><div className="display num text-[24px] md:text-[28px] text-[var(--navy)]">99.9%</div><div className="mt-0.5">Uptime</div></div>
            </motion.div>
          </div>
          {/* hero visual */}
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="relative hidden md:flex justify-center lg:justify-end pr-2">
            <motion.div style={{ y: phoneY }}><PhoneWallet /></motion.div>
            <motion.div style={{ y: chipY1 }} className="absolute inset-0 pointer-events-none">
              <FloatChip className="float-soft-2 -left-2 top-[14%]" title="Driver payout" value="$740.00" sub="Settled in 42s" />
              <FloatChip className="float-soft-3 -left-6 bottom-[16%]" title="Cash flow" value="+12.4%" sub="vs last month" />
            </motion.div>
            <motion.div style={{ y: chipY2 }} className="absolute inset-0 pointer-events-none">
              <FloatChip className="float-soft right-0 top-[30%]" title="Broker transfer" value="$1,840.00" sub="Invoice #8841" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURE CARDS (SadaPay style) ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <motion.div {...fadeUp} className="sada-card flex flex-col p-8" style={{ background: "#E6F5FC", minHeight: 380 }}>
              <div className="display text-[30px] md:text-[34px] text-[var(--navy)] leading-[1.15] max-w-[270px]">Instant payouts</div>
              <p className="mt-2.5 text-[var(--muted)] text-[14.5px] leading-relaxed max-w-[270px]">Pay any driver, carrier or partner in seconds — to any bank, 24/7, one transparent fee.</p>
              <div className="flex-1 relative mt-6" style={{ minHeight: 180 }}><PaperPlaneFig /></div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.07, ease: "easeOut" }} className="sada-card flex flex-col p-8" style={{ background: "#EAF0F8", minHeight: 380 }}>
              <div className="display text-[30px] md:text-[34px] text-[var(--navy)] leading-[1.15] max-w-[270px]">DrayPay card</div>
              <p className="mt-2.5 text-[var(--muted)] text-[14.5px] leading-relaxed max-w-[270px]">Virtual and physical — spend your balance anywhere Mastercard is accepted. No monthly fee.</p>
              <div className="flex-1 relative mt-6" style={{ minHeight: 180 }}><CardFanFig /></div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }} className="sada-card flex flex-col p-8" style={{ background: "#E6F4EC", minHeight: 380 }}>
              <div className="display text-[30px] md:text-[34px] text-[var(--navy)] leading-[1.15] max-w-[270px]">Same-day settlement</div>
              <p className="mt-2.5 text-[var(--muted)] text-[14.5px] leading-relaxed max-w-[270px]">Funds release the moment delivery is confirmed. Every charge itemized, receipt attached to the load.</p>
              <div className="flex-1 relative mt-6" style={{ minHeight: 180 }}><ReceiptFig /></div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }} className="sada-card flex flex-col p-8" style={{ background: "#EDE8F8", minHeight: 380 }}>
              <div className="display text-[30px] md:text-[34px] text-[var(--navy)] leading-[1.15] max-w-[270px]">Driver payments</div>
              <p className="mt-2.5 text-[var(--muted)] text-[14.5px] leading-relaxed max-w-[270px]">Drivers get paid the day the container delivers — right to their wallet on their phone, no wait.</p>
              <div className="flex-1 relative mt-6" style={{ minHeight: 180 }}><MobileWalletFig /></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 3D CARD DEVICE SCENE ─── */}
      <section className="cd-bg py-20 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <div className="f-eyebrow" style={{ color: "rgba(0,162,231,0.9)" }}>Your card</div>
            <h2 className="display text-white text-[34px] md:text-[52px] leading-[1.05] mt-3">Pay anywhere, instantly</h2>
            <p className="mt-4 text-white/60 text-[15px] md:text-[17px] max-w-xl mx-auto">Add your DrayPay card to Apple Pay or Google Pay in seconds — fuel stops, vendor payments, supplier orders.</p>
          </motion.div>
        </div>
        <CardDeviceScene />
      </section>

      {/* ─── SECURITY SECTION ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="display text-[34px] md:text-[50px] text-[var(--navy)] leading-[1.05]">Your money stays protected</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5">
            <motion.div {...fadeUp} className="relative rounded-[24px] overflow-hidden p-8" style={{ background: "#EBF4FD", minHeight: 320 }}>
              <div className="display text-[24px] text-[var(--navy)] max-w-[260px]">Instant approvals</div>
              <p className="mt-2 text-[14px] text-[var(--muted)] max-w-[260px] leading-relaxed">Payments release automatically on delivery confirmation — no manual step, no delay.</p>
              <div className="absolute bottom-0 right-0 w-[210px] h-[210px] opacity-75 pointer-events-none"><ShieldSvg /></div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.07, ease: "easeOut" }} className="relative rounded-[24px] overflow-hidden p-8" style={{ background: "#EAF0F8", minHeight: 320 }}>
              <div className="display text-[24px] text-[var(--navy)] max-w-[260px]">DrayPay card</div>
              <p className="mt-2 text-[14px] text-[var(--muted)] max-w-[260px] leading-relaxed">Virtual and physical Mastercard accepted everywhere — no issuance fee, no monthly charge.</p>
              <div className="absolute bottom-4 right-[-16px] pointer-events-none"><SecCardEl /></div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }} className="relative rounded-[24px] overflow-hidden p-8" style={{ background: "#EBF4FD", minHeight: 320 }}>
              <div className="absolute bottom-0 left-2 w-[190px] h-[210px] opacity-70 pointer-events-none"><LockSvg /></div>
              <div className="display text-[24px] text-[var(--navy)] max-w-[260px]">Bank-grade security</div>
              <p className="mt-2 text-[14px] text-[var(--muted)] max-w-[260px] leading-relaxed">Every transaction encrypted in-flight and at-rest, with a complete audit trail per load.</p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }} className="relative rounded-[24px] overflow-hidden p-8" style={{ background: "#EDE8F8", minHeight: 320 }}>
              <div className="absolute bottom-0 right-0 w-[200px] h-[200px] opacity-60 pointer-events-none"><GearSvg /></div>
              <div className="display text-[24px] text-[var(--navy)] max-w-[260px]">Complete control</div>
              <p className="mt-2 text-[14px] text-[var(--muted)] max-w-[260px] leading-relaxed">Role permissions, spending limits and team approvals — everything under your control.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── BANK CONNECTIONS ─── */}
      <section className="py-24 overflow-hidden" style={{ background: "#F8FAFB" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <div className="f-eyebrow">Integrations</div>
            <h2 className="display text-[34px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-3">Connect any bank or payment rail</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px]">DrayPay connects to every major US bank and international payment network — one wallet, every rail.</p>
          </motion.div>
          {/* Desktop: scattered floating pills */}
          <div className="relative hidden md:block" style={{ height: 360 }}>
            {BANK_ICONS.map((b, i) => (
              <div key={b.n} className="bank-pill absolute" style={{ ...b.pos, animation: `${b.anim} ${3.5 + i * 0.38}s ease-in-out infinite`, animationDelay: `${i * -0.65}s` }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, background: b.color, display: "inline-block", flexShrink: 0 }} />
                <span style={{ color: "#0B2D5C" }}>{b.n}</span>
              </div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="mx-auto rounded-2xl flex items-center justify-center mb-4" style={{ width: 72, height: 72, background: "linear-gradient(160deg,#00a2e7,#0B2D5C)", boxShadow: "0 20px 50px -15px rgba(0,162,231,0.5)" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"><path d="M3 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM3 7V6a2 2 0 0 1 2-2h11M16 13h3" /></svg>
                </div>
                <div className="display text-[20px] text-[var(--navy)]">DrayPay</div>
                <div className="text-[12px] text-[var(--muted)] mt-1">The hub</div>
              </div>
            </div>
          </div>
          {/* Mobile: marquee */}
          <div className="md:hidden overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}>
            <div className="marquee-track">
              {[...BANK_ICONS, ...BANK_ICONS].map((b, i) => (
                <span key={i} className="bank-pill" style={{ marginRight: 12 }}>
                  <span style={{ width: 18, height: 18, borderRadius: 5, background: b.color, display: "inline-block" }} />
                  {b.n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-12 border-y" style={{ borderColor: "rgba(11,45,92,0.07)", background: "#fff" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--muted)]">Trusted by transportation companies, logistics providers, freight operators & broker networks</div>
          <div className="mt-7 overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
            <div className="marquee-track">{[...BRANDS, ...BRANDS].map((b, i) => <span key={i} className="brand-logo"><span className="text-[17px] font-bold tracking-tight whitespace-nowrap text-[var(--navy)]/45">{b}</span></span>)}</div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 f-soft">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <div className="f-eyebrow">The problem</div>
            <h2 className="display text-[34px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-3">Logistics Payments Are Broken</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px] md:text-[16px]">The freight moves in days. The money takes weeks — and everyone pays for it.</p>
          </motion.div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PROBLEMS.map((p, i) => (
              <motion.div key={p.n} {...fadeUp} transition={{ duration: 0.55, delay: i * 0.07, ease: "easeOut" }} className="f-card p-6">
                <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: "rgba(0,162,231,0.09)" }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0670a0" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={p.i} /></svg>
                </div>
                <div className="display text-[16px] text-[var(--navy)] mt-4">{p.n}</div>
                <p className="text-[13px] text-[var(--muted)] mt-2 leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <div className="f-eyebrow">The solution</div>
            <h2 className="display text-[34px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-3">One Wallet. Every Transaction.</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px] md:text-[16px]">DrayPay connects every party in the move to a single payment ecosystem — money flows the moment work happens.</p>
          </motion.div>
          <motion.div {...fadeUp} className="mt-14 f-card p-8 md:p-12" style={{ borderRadius: 24 }}>
            <div className="grid md:grid-cols-[1fr_50px_1fr_50px_1fr_50px_1fr] items-center gap-y-8">
              {ROLES.map((r, i) => (
                <div key={r.n} className="contents">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-2xl grid place-items-center" style={{ background: "linear-gradient(160deg,#0B2D5C,#0670a0)", boxShadow: "0 18px 36px -14px rgba(11,45,92,0.45)" }}>
                      <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={r.i} /></svg>
                    </div>
                    <div className="display text-[17px] text-[var(--navy)] mt-3">{r.n}</div>
                    <div className="text-[12px] text-[var(--muted)] mt-1 max-w-[180px] mx-auto leading-relaxed">{r.d}</div>
                  </div>
                  {i < ROLES.length - 1 && <div className="hidden md:block px-1"><div className="flow-line" /></div>}
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center"><div className="flow-line v hidden md:block" style={{ height: 36 }} /></div>
            <div className="mt-4 mx-auto max-w-md rounded-2xl px-6 py-4 text-center" style={{ background: "linear-gradient(160deg,#F2F9FD,#E9F4FB)", border: "1px solid rgba(0,162,231,0.25)" }}>
              <div className="flex items-center justify-center gap-2.5">
                <span className="w-8 h-8 rounded-lg grid place-items-center" style={{ background: "linear-gradient(160deg,#00a2e7,#0670a0)" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M3 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM3 7V6a2 2 0 0 1 2-2h11M16 13h3" /></svg></span>
                <span className="display text-[18px] text-[var(--navy)]">One DrayPay ecosystem</span>
              </div>
              <div className="text-[12.5px] text-[var(--muted)] mt-1.5">Every balance, payout and transfer — connected, visible and instant.</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES — alternating */}
      <section className="py-24 f-soft-rev">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="max-w-2xl">
            <div className="f-eyebrow">The platform</div>
            <h2 className="display text-[34px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-3">Everything your money does, in one place</h2>
          </motion.div>
          <div className="mt-16 space-y-20">
            {FEATURES.map((f, i) => (
              <motion.div key={f.k} {...fadeUp} className={`grid lg:grid-cols-2 gap-12 items-center`}>
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <div className="f-eyebrow">{f.k}</div>
                  <h3 className="display text-[26px] md:text-[34px] text-[var(--navy)] leading-[1.1] mt-3">{f.h}</h3>
                  <p className="mt-4 text-[var(--muted)] text-[15px] leading-relaxed max-w-lg">{f.d}</p>
                  <ul className="mt-6 space-y-3">
                    {f.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-[14px] text-[var(--navy)]">
                        <span className="w-5 h-5 rounded-full grid place-items-center shrink-0" style={{ background: "rgba(14,159,110,0.12)" }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0E9F6E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${i % 2 ? "lg:order-1" : ""} flex justify-center`}>
                  <FeatureVisual idx={i} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <div className="f-eyebrow">Product</div>
            <h2 className="display text-[34px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-3">Built like the tools your team already loves</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px]">A full payment dashboard for the office, a wallet that lives in every driver&apos;s pocket.</p>
          </motion.div>
          <motion.div {...fadeUp} className="mt-14"><DashboardMock /></motion.div>
        </div>
      </section>

      {/* BENEFITS — counters */}
      <section className="py-24 f-soft">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <div className="f-eyebrow">The impact</div>
            <h2 className="display text-[34px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-3">What changes when money moves on time</h2>
          </motion.div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { v: 21, suffix: "x", label: "Faster settlements", d: "Same-day instead of net-30" },
              { v: 94, suffix: "%", label: "Fewer payment delays", d: "Late payouts virtually eliminated" },
              { v: 100, suffix: "%", label: "Cash flow visibility", d: "Every dollar tracked to its load" },
              { v: 38, suffix: "%", label: "Operational efficiency", d: "Less time on settlement admin" },
            ].map((s, i) => (
              <motion.div key={s.label} {...fadeUp} transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }} className="f-card p-7 text-center">
                <div className="display text-[42px] text-[var(--navy)] leading-none"><Counter to={s.v} suffix={s.suffix} /></div>
                <div className="display text-[15.5px] text-[var(--navy)] mt-3">{s.label}</div>
                <div className="text-[12.5px] text-[var(--muted)] mt-1.5">{s.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <div className="f-eyebrow">How it works</div>
            <h2 className="display text-[34px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-3">Up and running in an afternoon</h2>
          </motion.div>
          <motion.div {...fadeUp} className="mt-16 tl-track grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-10">
            {STEPS.map((s, i) => (
              <div key={s.n} className="text-center px-2">
                <div className="tl-dot mx-auto num">{i + 1}</div>
                <div className="display text-[15.5px] text-[var(--navy)] mt-4">{s.n}</div>
                <div className="text-[12.5px] text-[var(--muted)] mt-1.5 leading-relaxed">{s.d}</div>
              </div>
            ))}
          </motion.div>
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
            <motion.div {...fadeUp} className="hidden lg:block"><Card3D /></motion.div>
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    App Store
                  </a>
                  <a href="#" className="store-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M3.18 23.76c.28.16.6.24.93.22l12.2-6.98L13.05 14l-9.87 9.76zm14.14-15.1L4.11.68A1.4 1.4 0 003.17.5L13.04 10l4.28-1.34zM21.5 10.7l-2.88-1.65L14.54 10l3.08 3.08 3.88-1.65c.83-.45.83-1.74 0-2.27zm-17.39 12.62l13.21-7.55-4.27-4.27L4.11 23.32z"/></svg>
                    Google Play
                  </a>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-center gap-3">
                <div style={{ background: "white", borderRadius: 18, padding: 14, width: 118, height: 118, display: "grid", placeItems: "center" }}>
                  <svg viewBox="0 0 37 37" width="90" height="90" style={{ imageRendering: "pixelated" }}>
                    {/* QR code pattern — deterministic grid */}
                    {[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[0,1],[6,1],[0,2],[2,2],[3,2],[4,2],[6,2],[0,3],[2,3],[4,3],[6,3],[0,4],[2,4],[3,4],[4,4],[6,4],[0,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[8,0],[10,0],[12,0],[9,1],[11,1],[8,2],[10,2],[12,2],[9,3],[8,4],[10,4],[11,4],[12,4],[9,5],[11,5],[8,6],[10,6],[0,8],[2,8],[4,8],[6,8],[1,9],[3,9],[5,9],[0,10],[1,10],[4,10],[6,10],[2,11],[3,11],[5,11],[6,11],[0,12],[4,12],[6,12],[30,30],[31,30],[32,30],[33,30],[34,30],[35,30],[36,30],[30,31],[36,31],[30,32],[32,32],[33,32],[34,32],[36,32],[30,33],[32,33],[34,33],[36,33],[30,34],[32,34],[33,34],[34,34],[36,34],[30,35],[36,35],[30,36],[31,36],[32,36],[33,36],[34,36],[35,36],[36,36]].map(([x,y],i) => (
                      <rect key={i} x={x} y={y} width={1} height={1} fill="#0B2D5C" />
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
  const base: React.CSSProperties = { position: "absolute", left: 0, right: 0, height: 148, borderRadius: 20 };
  return (
    <div className="relative w-full" style={{ height: 190, overflow: "visible" }}>
      <div style={{ ...base, top: 0, transform: "rotate(-15deg) translateX(-22px) scale(0.86)", background: "linear-gradient(135deg,#1a4080,#2060B0)", opacity: 0.6 }} />
      <div style={{ ...base, top: 20, transform: "rotate(-6deg) translateX(-10px) scale(0.93)", background: "linear-gradient(135deg,#0B2D5C,#0a5490)", opacity: 0.8 }} />
      <div style={{ ...base, top: 38, transform: "rotate(4deg)", background: "linear-gradient(135deg,#00a2e7,#0B2D5C)", zIndex: 3, boxShadow: "0 20px 50px -20px rgba(0,162,231,0.6)" }}>
        <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ width: 36, height: 26, borderRadius: 5, background: "rgba(255,255,255,0.3)" }} />
            <svg width="38" height="24" viewBox="0 0 54 33"><circle cx="21" cy="16.5" r="16.5" fill="rgba(255,255,255,0.3)" /><circle cx="33" cy="16.5" r="16.5" fill="rgba(255,255,255,0.45)" /></svg>
          </div>
          <div>
            <div style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.75)", fontSize: 11, letterSpacing: "0.15em" }}>•••• •••• •••• 4417</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em" }}>DRAYPAY</span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>12/28</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReceiptFig() {
  return (
    <div className="relative w-full h-full flex items-end justify-center overflow-hidden">
      <div className="coin-blob float-soft-3 absolute" style={{ width: 46, top: "5%", right: "18%" }} />
      <div className="coin-blob float-soft absolute" style={{ width: 54, top: "30%", left: "10%" }} />
      <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%) rotate(-4deg)", width: 168, height: 220, background: "white", borderRadius: "14px 14px 0 0", boxShadow: "0 20px 50px rgba(0,0,0,0.14)", overflow: "hidden" }}>
        <div style={{ padding: "12px 14px 8px", borderBottom: "1px solid #EDF2F8" }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: "#0670a0", letterSpacing: "0.1em", textTransform: "uppercase" }}>Settlement</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0B2D5C", marginTop: 2 }}>Load #LB-4417</div>
        </div>
        {[["Driver payout", "$740.00"], ["Broker fee", "$185.00"], ["Fuel advance", "-$150.00"], ["Net amount", "$575.00"]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 14px", borderBottom: "1px dashed #EDF2F8", fontSize: 10.5 }}>
            <span style={{ color: "#6B7C93" }}>{k}</span>
            <span style={{ fontWeight: 700, color: "#0B2D5C" }}>{v}</span>
          </div>
        ))}
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 16, background: "repeating-linear-gradient(90deg,white 0,white 8px,transparent 8px,transparent 13px)" }} />
      </div>
    </div>
  );
}

function MobileWalletFig() {
  return (
    <div className="relative w-full h-full flex items-end justify-center overflow-hidden">
      <div style={{ width: 140, height: 240, borderRadius: 28, background: "#0B1220", boxShadow: "0 28px 60px rgba(11,18,32,.4)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 28, background: "rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 14px", fontSize: 9, color: "rgba(255,255,255,0.55)" }}>
          <span style={{ fontWeight: 600 }}>9:41</span><span>●●●</span>
        </div>
        <div style={{ flex: 1, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div>
            <div style={{ fontSize: 8, color: "rgba(0,162,231,0.8)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Balance</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "white", marginTop: 2 }}>$12,480</div>
          </div>
          <div style={{ display: "flex", gap: 7 }}>
            {["Send", "Card"].map(b => (
              <div key={b} style={{ flex: 1, background: "rgba(0,162,231,0.15)", borderRadius: 8, padding: "5px 0", textAlign: "center", fontSize: 8.5, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{b}</div>
            ))}
          </div>
          <div>
            {[["Driver payout", "$740", true], ["Invoice #8841", "$1,840", true], ["Card swipe", "-$48", false]].map(([n, v, inc]) => (
              <div key={String(n)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 8.5 }}>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{n}</span>
                <span style={{ color: inc ? "#5fe3a8" : "rgba(255,255,255,0.8)", fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
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
