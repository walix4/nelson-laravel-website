import { Fragment } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import RevealInit from "@/components/RevealInit";
import PageHero from "@/components/PageHero";
import { PayConveyor, VaultCube } from "@/components/Pay3D";

export const metadata = { title: "How Payments Work · DrayPay", description: "From invoice to payout in three on-chain steps — booking escrow, condition-based release and instant settlement." };

const STEPS = [
  { k: "01", n: "Invoice & lock", d: "An invoice is issued from the wallet and the payment locks into smart-contract escrow the moment the move is booked. Both sides see the same locked amount.", i: "M6 2h9l4 4v16H6zM14 2v5h5M9 12h6M9 16h4" },
  { k: "02", n: "Haul & verify", d: "Gate events, POD signatures and delivery conditions are written to the contract as the move happens — the release conditions tick green in real time.", i: "M9 12l2 2 4-5M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" },
  { k: "03", n: "Release & settle", d: "The instant conditions are met, funds release to the carrier's wallet — under 60 seconds, fee shown up front, receipt written on-chain.", i: "M13 2L4.5 13.5H11L9 22l8.5-11.5H13L13 2z" },
];

const TERMS = [
  { n: "Payer & payee", d: "Wallet addresses on both sides — no routing numbers, no middlemen." },
  { n: "Amount & fee", d: "Gross, fee and net are fixed in the contract before anyone accepts." },
  { n: "Escrow terms", d: "What locks the money and when — booking, pickup or document upload." },
  { n: "Release conditions", d: "POD signed, gate-out confirmed, detention clock — whatever the lane needs." },
  { n: "QuickPay clause", d: "The early-payment discount is a term, not a negotiation after the fact." },
  { n: "Dispute window", d: "A bounded window with the evidence already on-chain — not an email thread." },
];

export default function Payments() {
  return (
    <>
      <Nav />
      <RevealInit />
      <PageHero
        eyebrow="Smart-contract settlement"
        title={<>From invoice to payout in <span className="bg-gradient-to-r from-[#8fd9f5] via-[#3bb8ee] to-[#00a2e7] bg-clip-text text-transparent">three steps</span></>}
        sub="Legacy rails move money slowly and hide the terms. A DrayPay payment is a contract: the amount, the fee, the escrow and the release conditions are all written down before a wheel turns."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/wallet" className="px-6 py-3 rounded text-[14px] font-semibold btn-primary">Open a wallet</Link>
          <Link href="/settlements" className="px-6 py-3 rounded text-[14px] font-semibold btn-ghost">Watch it live</Link>
        </div>
      </PageHero>

      {/* 3 STEPS with pulse links */}
      <section className="grid-bg relative py-24 text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8fd9f5]">The settlement path</div>
            <h2 className="display text-[36px] md:text-[50px] leading-[1.05] mt-3">Money follows the freight</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-[1fr_60px_1fr_60px_1fr] items-stretch gap-y-10">
            {STEPS.map((s, i) => (
              <Fragment key={s.k}>
                <div className={`glass-dark rounded p-7 reveal reveal-d${i}`} style={{ border: "1px solid rgba(143,217,245,0.25)" }}>
                  <div className="flex items-center justify-between">
                    <span className="w-12 h-12 rounded flex items-center justify-center" style={{ background: "linear-gradient(160deg,#00a2e7,#046e9e)", filter: "drop-shadow(0 0 14px rgba(0,162,231,0.55))" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.i} /></svg>
                    </span>
                    <span className="num text-[13px] font-bold text-white/35">{s.k}</span>
                  </div>
                  <div className="display text-[22px] mt-5">{s.n}</div>
                  <p className="text-white/60 text-[13.5px] mt-3 leading-relaxed">{s.d}</p>
                </div>
                {i < 2 && <div className="hidden md:flex items-center px-1"><div className="chain-link w-full" /></div>}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CONVEYOR */}
      <section className="relative py-20 text-white overflow-hidden" style={{ background: "linear-gradient(180deg,#061A38,#07153B)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8fd9f5]">Always settling</div>
            <h2 className="display text-[34px] md:text-[46px] leading-[1.05] mt-3">The rail never sleeps</h2>
            <p className="mt-4 text-white/60 text-[15px]">No banking hours, no weekend cutoffs, no &quot;funds available in 3–5 business days.&quot; Payments settle the moment their conditions are met.</p>
          </div>
        </div>
        <PayConveyor />
        <div className="text-center text-[12px] uppercase tracking-[0.18em] text-white/45">Live payments moving through the contract layer</div>
      </section>

      {/* CONTRACT TERMS */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#F0F4FA,#FFFFFF)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Inside the contract</div>
              <h2 className="display text-[34px] md:text-[44px] text-[var(--navy)] leading-[1.05] mt-2">Every term, written down</h2>
              <p className="mt-4 text-[var(--muted)] text-[15px] leading-relaxed">A DrayPay payment isn&apos;t a promise with paperwork attached — the paperwork <em>is</em> the payment. Six terms travel with every dollar.</p>
              <div className="mt-8"><VaultCube size={110} glyph={<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h9l4 4v16H6zM14 2v5h5" /></svg>} /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {TERMS.map((t, i) => (
                <div key={t.n} className={`bg-white rounded p-5 reveal reveal-d${i % 2}`} style={{ border: "1px solid rgba(11,35,80,0.08)" }}>
                  <div className="display text-[16px] text-[var(--navy)]">{t.n}</div>
                  <p className="text-[13px] text-[var(--muted)] mt-1.5 leading-relaxed">{t.d}</p>
                </div>
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
