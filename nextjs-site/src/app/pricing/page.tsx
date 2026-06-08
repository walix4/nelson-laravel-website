import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = {
  title: "Pricing · DrayPay",
  description: "Start free, pay simple per-transaction fees as you grow, or go enterprise with custom rates and dedicated settlement support.",
};

const CHIPS = ["Transparent per-transaction fees", "Instant payouts to any wallet", "Smart-contract escrow included", "On-chain receipts on every payment"];

const PLANS = [
  {
    name: "Starter", popular: false, blurb: "Open a wallet and start sending and receiving payments — no monthly fee.",
    price: "Free", unit: "0.9% per transaction",
    features: ["Digital wallet & debit card", "Instant payouts", "Smart-contract escrow", "On-chain receipts"],
    cta: "Open a wallet", solid: false,
  },
  {
    name: "Business", popular: true, blurb: "For brokers and carriers settling volume — lower fees and faster support.",
    price: "$299", unit: "/month + 0.5% per txn",
    features: ["Everything in Starter", "QuickPay & factoring", "Email support (24h SLA)", "Payment webhooks & API", "Settlement analytics dashboard"],
    cta: "Get started", solid: true,
  },
  {
    name: "Enterprise", popular: false, blurb: "High-volume platforms, custom rates, and dedicated settlement support.",
    price: "Custom", unit: "volume pricing",
    features: ["Unlimited volume", "Dedicated account manager", "99.9% uptime SLA", "Custom payout rails & bulk export", "Priority settlement support"],
    cta: "Contact sales", solid: false,
  },
];

const FAQ = [
  ["What does a transaction cost?", "Each payment or payout is charged a flat percentage shown before you confirm — no monthly minimums on Starter, no hidden deductions."],
  ["How fast do payouts settle?", "Payouts to carrier, broker and driver wallets typically settle in under a minute, with funds held in escrow until delivery is confirmed."],
  ["Do you offer annual contracts?", "Business and Enterprise plans are available annually with a 15% discount. Contact us for a quote."],
];

const Check = ({ on }: { on: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
    <circle cx="12" cy="12" r="10" fill={on ? "var(--red)" : "rgba(11,45,92,0.12)"} />
    <path d="M8 12.2l2.6 2.6L16 9.4" stroke={on ? "#fff" : "rgba(11,45,92,0.5)"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Pricing() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section className="relative overflow-hidden text-white" style={{ background: "radial-gradient(900px 520px at 18% 18%,rgba(58,95,192,0.28),transparent 60%),radial-gradient(820px 520px at 86% 88%,rgba(0,162,231,0.22),transparent 60%),linear-gradient(180deg,#0B2D5C,#061A38)" }}>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative max-w-[900px] mx-auto px-6 py-24 md:py-28 text-center">
          <div className="inline-flex items-center rounded-md px-3.5 py-1.5 text-[11px] font-semibold" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>Pricing</div>
          <h1 className="display text-white text-[40px] md:text-[58px] leading-[1.05] mt-6">Pricing that scales with your payments</h1>
          <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-xl mx-auto leading-relaxed">Start free, pay simple per-transaction fees as you grow, or talk to us about enterprise volumes with custom rates and dedicated settlement support.</p>
          <div className="mt-5 text-[13px] font-semibold text-[var(--red)]">Starter free · Business from $299/mo · Enterprise custom</div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#plans" className="btn-primary px-6 py-3.5 rounded-lg text-[14px] font-semibold inline-flex items-center gap-2"><span className="label">Open a wallet</span></a>
            <Link href="/tools/ports" className="px-6 py-3.5 rounded-lg text-[14px] text-white font-semibold" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}>Payout rails →</Link>
          </div>
          <div className="mt-7 text-[12.5px] text-white/55">
            <Link href="/tools" className="text-[var(--red)] font-semibold hover:opacity-80">Payment tools</Link> · <Link href="/#quote" className="text-[var(--red)] font-semibold hover:opacity-80">Estimate a payment</Link>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-20 md:py-24" style={{ background: "linear-gradient(180deg,#F6F8FB,#FFFFFF)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 reveal">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Plans</div>
              <h2 className="display text-[34px] md:text-[44px] text-[var(--navy)] leading-[1.05] mt-2">Choose your tier</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {CHIPS.map((c) => <span key={c} className="text-[11.5px] font-medium text-[var(--navy)]/70 bg-white border border-[var(--navy)]/10 rounded-full px-3 py-1.5">{c}</span>)}
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map((p, i) => (
              <div key={p.name} className={`reveal reveal-d${i} relative rounded-lg bg-white p-7 ${p.popular ? "border-2 shadow-2xl md:-mt-3 md:mb-3" : "border shadow-sm"}`} style={{ borderColor: p.popular ? "var(--red)" : "rgba(11,45,92,0.1)" }}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.14em] text-white px-3 py-1 rounded-md" style={{ background: "var(--red)" }}>Most popular</div>}
                <h3 className="display text-[20px] text-[var(--navy)]">{p.name}</h3>
                <p className="text-[13px] text-[var(--muted)] mt-2 leading-relaxed min-h-[40px]">{p.blurb}</p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="display text-[40px] text-[var(--red)] leading-none num">{p.price}</span>
                  <span className="text-[13px] text-[var(--navy)]/55">{p.unit}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-[var(--navy)]/80"><Check on={p.popular} /> {f}</li>
                  ))}
                </ul>
                <a href="#plans" className={`mt-7 block text-center py-3 rounded-lg text-[14px] font-semibold transition ${p.solid ? "btn-primary" : "border border-[var(--navy)]/15 text-[var(--navy)] hover:bg-[var(--navy)]/5"}`}>{p.solid ? <span className="label">{p.cta}</span> : p.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-[820px] mx-auto px-6">
          <div className="text-center reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">FAQ</div>
            <h2 className="display text-[32px] md:text-[42px] text-[var(--navy)] leading-[1.05] mt-2">Common questions</h2>
          </div>
          <div className="mt-10 space-y-4">
            {FAQ.map(([q, a], i) => (
              <div key={q} className={`reveal reveal-d${i} rounded-lg border border-[var(--navy)]/8 bg-[#F8FAFC] p-6`}>
                <h3 className="text-[15px] font-semibold text-[var(--navy)]">{q}</h3>
                <p className="text-[13.5px] text-[var(--muted)] mt-2 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative overflow-hidden text-white py-24" style={{ background: "radial-gradient(700px 400px at 85% 50%,rgba(0,162,231,0.25),transparent 60%),radial-gradient(600px 400px at 10% 80%,rgba(58,95,192,0.25),transparent 60%),linear-gradient(135deg,#0B2D5C,#061A38 60%,#15448C)" }}>
        <div className="max-w-[820px] mx-auto px-6 text-center reveal relative">
          <h2 className="display text-white text-[36px] md:text-[48px] leading-[1.05]">Get paid faster — settle before the container rolls</h2>
          <p className="mt-4 text-white/70 text-[15px] md:text-[16px] max-w-xl mx-auto leading-relaxed">Embed instant payouts, escrow and settlement into your TMS, accounting stack, or broker portal. Built for drayage and intermodal teams.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#plans" className="btn-primary px-6 py-3.5 rounded-lg text-[14px] font-semibold inline-flex items-center gap-2"><span className="label">Open a business wallet</span></a>
            <a href="#plans" className="px-6 py-3.5 rounded-lg text-[14px] text-white font-semibold" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}>View pricing →</a>
          </div>
          <div className="mt-6 text-[12.5px] text-white/55">Settling high payment volume? <a href="#plans" className="text-[var(--red)] font-semibold">Talk to our payments team</a></div>
        </div>
      </section>

      <Footer />
    </>
  );
}
