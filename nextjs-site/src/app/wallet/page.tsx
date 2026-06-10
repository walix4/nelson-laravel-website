import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import RevealInit from "@/components/RevealInit";
import PageHero from "@/components/PageHero";
import { Card3D, PhoneWallet } from "@/components/Fintech";

export const metadata = { title: "Smart Wallet · DrayPay", description: "One DrayPay wallet per party — balances, reserved funds, instant payouts, invoices and a debit card for the logistics industry." };

const FEATURES = [
  { n: "Instant payouts", d: "Funds hit the wallet in under 60 seconds — any hour, any day, no banking cutoffs.", i: "M13 2L4.5 13.5H11L9 22l8.5-11.5H13L13 2z" },
  { n: "Reserved balances", d: "Money for booked moves is set aside and visible — committed, not just promised.", i: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4" },
  { n: "Invoices built in", d: "Issue an invoice from the wallet and the payment terms travel with it automatically.", i: "M6 2h9l4 4v16H6zM14 2v5h5M9 12h6M9 16h4" },
  { n: "QuickPay on tap", d: "Turn any approved invoice into same-day cash with one tap and one transparent fee.", i: "M12 3a9 9 0 1 0 9 9M12 7v5l3 2M21 3l-4 1 3 3 1-4z" },
  { n: "DrayPay debit card", d: "Spend the balance on fuel, tolls and repairs straight from the wallet — no transfer out.", i: "M3 6h18v12H3zM3 10h18M6 15h4" },
  { n: "Audit-ready records", d: "Every payout, release and spend is recorded with its load — exports your accountant will love.", i: "M9 12l2 2 4-5M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" },
];

const BALANCES = [
  ["Available", "$12,480.20", "Ready to pay out or spend"],
  ["Reserved", "$8,340.00", "Set aside for 5 booked moves"],
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
        title={<>One wallet for <span className="bg-gradient-to-r from-[#00a2e7] to-[#0670a0] bg-clip-text text-transparent">every party</span> in the move</>}
        sub="Shippers, brokers, carriers, owner-operators and drivers each hold a DrayPay wallet — balances, payouts, invoices and a card, all managed in one place."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/payments" className="px-6 py-3 text-[14px] font-semibold btn-primary rounded-[10px]">See how payments work</Link>
          <Link href="/fees" className="px-6 py-3 text-[14px] font-semibold btn-line">View fees</Link>
        </div>
      </PageHero>

      {/* CARD + BALANCES */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="reveal">
              <div className="f-eyebrow">The balance you can trust</div>
              <h2 className="display text-[34px] md:text-[46px] text-[var(--navy)] leading-[1.05] mt-3">Your money, visible to the cent</h2>
              <p className="mt-5 text-[var(--muted)] text-[15px] max-w-lg leading-relaxed">A DrayPay balance isn&apos;t a number buried in a statement. Available funds, reserved funds and pending QuickPay are all separately visible — any second of the day, from any device.</p>
              <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg">
                {BALANCES.map(([k, v, s]) => (
                  <div key={k} className="f-card p-5"><div className="text-[var(--muted)] text-[10px] uppercase tracking-wider font-bold">{k}</div><div className="display num text-[24px] text-[var(--navy)] mt-1">{v}</div><div className="text-[var(--muted)] text-[11.5px] mt-1">{s}</div></div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-d1 py-10">
              <Card3D />
              <div className="mt-12 text-center text-[12px] uppercase tracking-[0.18em] text-[var(--muted)]">DrayPay Visa debit · spend the balance anywhere</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="py-24 f-soft">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="f-eyebrow">Everything in the wallet</div>
            <h2 className="display text-[34px] md:text-[46px] text-[var(--navy)] leading-[1.05] mt-2">Built for logistics money</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px]">Six things every wallet does on day one — no add-ons, no upgrade tiers.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.n} className={`f-card p-6 reveal reveal-d${i % 3}`}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(160deg,#00a2e7,#0670a0)", boxShadow: "0 10px 22px -8px rgba(0,162,231,0.5)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={f.i} /></svg>
                </div>
                <div className="display text-[18px] text-[var(--navy)] mt-4">{f.n}</div>
                <p className="text-[13.5px] text-[var(--muted)] mt-2 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE WALLET */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal flex justify-center order-2 lg:order-1"><PhoneWallet /></div>
            <div className="reveal reveal-d1 order-1 lg:order-2">
              <div className="f-eyebrow">In every driver&apos;s pocket</div>
              <h2 className="display text-[34px] md:text-[46px] text-[var(--navy)] leading-[1.05] mt-3">Reserved on booking. Released on delivery.</h2>
              <p className="mt-5 text-[var(--muted)] text-[15px] max-w-lg leading-relaxed">When a move is booked, the payment is set aside and the carrier can see it. When delivery is confirmed, it releases automatically — no chasing, no waiting on someone to push a button.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/payments" className="px-6 py-3 text-[14px] font-semibold btn-primary rounded-[10px]">Walk through a payment</Link>
                <Link href="/settlements" className="px-6 py-3 text-[14px] font-semibold btn-line">Watch settlements live</Link>
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
