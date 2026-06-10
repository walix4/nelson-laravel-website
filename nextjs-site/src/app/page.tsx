"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import LiveSettlements from "@/components/LiveSettlements";
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

      {/* LIVE SETTLEMENTS PREVIEW */}
      <section className="py-24 f-soft-rev">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <div className="f-eyebrow">Live on the network</div>
              <h2 className="display text-[34px] md:text-[44px] text-[var(--navy)] leading-[1.05] mt-3">Payments settling right now</h2>
              <p className="mt-3 text-[var(--muted)] text-[15px] max-w-xl">Real settlement activity across the network this minute — hover to pause the stream.</p>
            </div>
            <Link href="/settlements" className="shrink-0 btn-dark text-[14px] px-6 py-3 inline-flex items-center gap-2">Full stream <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
          </motion.div>
          <motion.div {...fadeUp}><LiveSettlements compact /></motion.div>
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

      <Footer />
      <Chat />
    </>
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
