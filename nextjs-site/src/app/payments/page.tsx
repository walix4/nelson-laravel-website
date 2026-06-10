import { Fragment } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import RevealInit from "@/components/RevealInit";
import PageHero from "@/components/PageHero";
import { DashboardMock } from "@/components/Fintech";

export const metadata = { title: "How Payments Work · DrayPay", description: "From invoice to payout in three steps — funds reserved on booking, released on delivery confirmation and settled instantly." };

const STEPS = [
  { k: "01", n: "Invoice & reserve", d: "An invoice is issued from the wallet and the payment is reserved the moment the move is booked. Both sides see the same committed amount.", i: "M6 2h9l4 4v16H6zM14 2v5h5M9 12h6M9 16h4" },
  { k: "02", n: "Haul & confirm", d: "Pickup, delivery and POD confirmations flow into the payment as the move happens — the release conditions tick green in real time.", i: "M9 12l2 2 4-5M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" },
  { k: "03", n: "Release & settle", d: "The instant delivery is confirmed, funds release to the carrier's wallet — under 60 seconds, fee shown up front, receipt attached to the load.", i: "M13 2L4.5 13.5H11L9 22l8.5-11.5H13L13 2z" },
];

const TERMS = [
  { n: "Payer & payee", d: "Both wallets named up front — no routing numbers, no middlemen." },
  { n: "Amount & fee", d: "Gross, fee and net are fixed and visible before anyone accepts." },
  { n: "Reserve terms", d: "What sets the money aside and when — booking, pickup or document upload." },
  { n: "Release conditions", d: "POD signed, delivery confirmed, detention clock — whatever the lane needs." },
  { n: "QuickPay option", d: "The early-payment fee is part of the terms, not a negotiation after the fact." },
  { n: "Dispute window", d: "A bounded window with the paper trail already attached — not an email thread." },
];

export default function Payments() {
  return (
    <>
      <Nav />
      <RevealInit />
      <PageHero
        eyebrow="Automated settlement"
        title={<>From invoice to payout in <span className="bg-gradient-to-r from-[#00a2e7] to-[#0670a0] bg-clip-text text-transparent">three steps</span></>}
        sub="Legacy rails move money slowly and hide the terms. A DrayPay payment carries its terms with it: the amount, the fee, the reserve and the release conditions are all agreed before a wheel turns."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/wallet" className="px-6 py-3 text-[14px] font-semibold btn-primary rounded-[10px]">Open a wallet</Link>
          <Link href="/settlements" className="px-6 py-3 text-[14px] font-semibold btn-line">Watch it live</Link>
        </div>
      </PageHero>

      {/* 3 STEPS with flow connectors */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="f-eyebrow">The settlement path</div>
            <h2 className="display text-[34px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-3">Money follows the freight</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-[1fr_60px_1fr_60px_1fr] items-stretch gap-y-10">
            {STEPS.map((s, i) => (
              <Fragment key={s.k}>
                <div className={`f-card p-7 reveal reveal-d${i}`}>
                  <div className="flex items-center justify-between">
                    <span className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(160deg,#00a2e7,#0670a0)", boxShadow: "0 14px 28px -12px rgba(0,162,231,0.5)" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.i} /></svg>
                    </span>
                    <span className="num text-[13px] font-bold text-[var(--navy)]/30">{s.k}</span>
                  </div>
                  <div className="display text-[22px] text-[var(--navy)] mt-5">{s.n}</div>
                  <p className="text-[var(--muted)] text-[13.5px] mt-3 leading-relaxed">{s.d}</p>
                </div>
                {i < 2 && <div className="hidden md:flex items-center px-1"><div className="flow-line w-full" /></div>}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ALWAYS SETTLING */}
      <section className="py-24 f-soft">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="f-eyebrow">Always on</div>
            <h2 className="display text-[34px] md:text-[46px] text-[var(--navy)] leading-[1.05] mt-3">Settlement that never sleeps</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px]">No banking hours, no weekend cutoffs, no &quot;funds available in 3–5 business days.&quot; Payments settle the moment their conditions are met — and your dashboard shows it happening.</p>
          </div>
          <div className="mt-12 reveal reveal-d1"><DashboardMock /></div>
        </div>
      </section>

      {/* PAYMENT TERMS */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            <div className="reveal">
              <div className="f-eyebrow">Inside every payment</div>
              <h2 className="display text-[32px] md:text-[42px] text-[var(--navy)] leading-[1.05] mt-2">Every term, written down</h2>
              <p className="mt-4 text-[var(--muted)] text-[15px] leading-relaxed">A DrayPay payment isn&apos;t a promise with paperwork attached — the terms travel with the money. Six things are fixed before anyone accepts.</p>
              <Link href="/fees" className="mt-7 inline-flex px-6 py-3 text-[14px] font-semibold btn-primary rounded-[10px]">See the fee schedule</Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {TERMS.map((t, i) => (
                <div key={t.n} className={`f-card p-5 reveal reveal-d${i % 2}`}>
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
