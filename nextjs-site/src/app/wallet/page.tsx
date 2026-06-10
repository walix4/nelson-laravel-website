import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import RevealInit from "@/components/RevealInit";
import PageHero from "@/components/PageHero";
import { Card3D, VaultCube } from "@/components/Pay3D";

export const metadata = { title: "Smart Wallet · DrayPay", description: "One DrayPay wallet per party — balances, escrow, instant payouts, invoices and a debit card, all settled on-chain." };

const FEATURES = [
  { n: "Instant payouts", d: "Funds hit the wallet in under 60 seconds — any hour, any day, no banking cutoffs.", i: "M13 2L4.5 13.5H11L9 22l8.5-11.5H13L13 2z" },
  { n: "Escrow balance", d: "Money for booked moves sits in smart-contract escrow you can see — locked, not promised.", i: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4" },
  { n: "Invoices built in", d: "Issue an invoice from the wallet and the payment terms become the contract itself.", i: "M6 2h9l4 4v16H6zM14 2v5h5M9 12h6M9 16h4" },
  { n: "QuickPay on tap", d: "Turn any approved invoice into same-day cash with one tap and one transparent fee.", i: "M12 3a9 9 0 1 0 9 9M12 7v5l3 2M21 3l-4 1 3 3 1-4z" },
  { n: "DrayPay debit card", d: "Spend the balance on fuel, tolls and repairs straight from the wallet — no transfer out.", i: "M3 6h18v12H3zM3 10h18M6 15h4" },
  { n: "On-chain receipts", d: "Every payout, release and spend is written on-chain — audit-ready for both sides.", i: "M9 12l2 2 4-5M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" },
];

const BALANCES = [
  ["Available", "$12,480.20", "Ready to pay out or spend"],
  ["In escrow", "$8,340.00", "Locked for 5 booked moves"],
  ["QuickPay pending", "$2,310.40", "Funding in under 60s"],
  ["This week", "+$21,904", "14 settlements received"],
];

export default function Wallet() {
  return (
    <>
      <Nav />
      <RevealInit />
      <PageHero
        eyebrow="Smart wallet · live on the network"
        title={<>One wallet for <span className="bg-gradient-to-r from-[#8fd9f5] via-[#3bb8ee] to-[#00a2e7] bg-clip-text text-transparent">every party</span> in the move</>}
        sub="Shippers, brokers, carriers, owner-operators and drivers each hold a DrayPay wallet — balances, escrow, payouts, invoices and a card, all settled by the same smart contracts."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/payments" className="px-6 py-3 rounded text-[14px] font-semibold btn-primary">See how payments work</Link>
          <Link href="/fees" className="px-6 py-3 rounded text-[14px] font-semibold btn-ghost">View fees</Link>
        </div>
      </PageHero>

      {/* 3D CARD + BALANCES */}
      <section className="grid-bg relative py-24 text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8fd9f5]">The balance you can prove</div>
              <h2 className="display text-[36px] md:text-[48px] leading-[1.05] mt-3">Your money, visible to the cent</h2>
              <p className="mt-5 text-white/65 text-[15px] max-w-lg leading-relaxed">A DrayPay balance isn&apos;t a number a platform shows you — it&apos;s a position on-chain. Available funds, escrowed funds and pending QuickPay are all separately provable, any second of the day.</p>
              <div className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
                {BALANCES.map(([k, v, s]) => (
                  <div key={k} className="glass-dark rounded p-4"><div className="text-white/55 text-[10px] uppercase tracking-wider">{k}</div><div className="display num text-[24px] mt-1">{v}</div><div className="text-white/45 text-[11px] mt-1">{s}</div></div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-d1 py-10">
              <Card3D />
              <div className="mt-12 text-center text-[12px] uppercase tracking-[0.18em] text-white/50">DrayPay Visa debit · spend the balance anywhere</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#F0F4FA,#FFFFFF)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Everything in the wallet</div>
            <h2 className="display text-[36px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-2">Built for drayage money</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px]">Six things every wallet does on day one — no add-ons, no upgrade tiers.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.n} className={`bg-white rounded p-6 reveal reveal-d${i % 3}`} style={{ border: "1px solid rgba(11,35,80,0.08)" }}>
                <div className="w-11 h-11 rounded flex items-center justify-center" style={{ background: "linear-gradient(160deg,#00a2e7,#046e9e)", boxShadow: "0 10px 22px -8px rgba(0,162,231,0.6)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={f.i} /></svg>
                </div>
                <div className="display text-[18px] text-[var(--navy)] mt-4">{f.n}</div>
                <p className="text-[13.5px] text-[var(--muted)] mt-2 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESCROW CUBE */}
      <section className="grid-bg relative py-24 text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal order-2 lg:order-1">
              <VaultCube size={150} glyph={<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4" /></svg>} />
            </div>
            <div className="reveal reveal-d1 order-1 lg:order-2">
              <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8fd9f5]">Smart-contract escrow</div>
              <h2 className="display text-[36px] md:text-[48px] leading-[1.05] mt-3">Locked on booking. Released on delivery.</h2>
              <p className="mt-5 text-white/65 text-[15px] max-w-lg leading-relaxed">When a move is booked, the payment moves into the contract — not into someone&apos;s ledger. The wallet shows it locked; the carrier hauls knowing the money exists; delivery conditions release it automatically.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/payments" className="px-6 py-3 rounded text-[14px] font-semibold btn-primary">Walk through a payment</Link>
                <Link href="/settlements" className="px-6 py-3 rounded text-[14px] font-semibold btn-ghost">Watch settlements live</Link>
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
