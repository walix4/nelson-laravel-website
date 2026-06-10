import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import RevealInit from "@/components/RevealInit";
import PageHero from "@/components/PageHero";
import { Card3D } from "@/components/Fintech";

export const metadata = { title: "QuickPay & Factoring · DrayPay", description: "Turn approved invoices into same-day cash with one transparent fee — QuickPay and on-demand factoring for logistics carriers." };

const TIERS = [
  { n: "Standard", fee: "0%", when: "On delivery confirmation", d: "The reserved payment releases in full the moment delivery is confirmed. No discount, no waiting on a payer.", hot: false },
  { n: "QuickPay", fee: "1.5%", when: "Under 60 seconds", d: "Tap any approved invoice and the net amount lands in the wallet now. The fee is the whole cost — no reserves, no minimums.", hot: true },
  { n: "Factoring", fee: "from 2.5%", when: "On submission", d: "Fund invoices that are still working through approval. Non-recourse available; every term shown before you accept.", hot: false },
];

const STEPS = [
  { k: "1", n: "Deliver & sign", d: "The POD is captured the moment it's signed — the invoice is born approved." },
  { k: "2", n: "Tap QuickPay", d: "The wallet shows gross, fee and net side by side. One tap to accept." },
  { k: "3", n: "Cash in 60s", d: "Funds settle to the wallet instantly — spend on the card or pay out." },
];

export default function QuickPay() {
  return (
    <>
      <Nav />
      <RevealInit />
      <PageHero
        eyebrow="QuickPay · same-day money"
        title={<>Get paid <span className="bg-gradient-to-r from-[#00a2e7] to-[#0670a0] bg-clip-text text-transparent">today</span>, not in 30 days</>}
        sub="The industry average payment term is 32 days. QuickPay turns an approved invoice into wallet cash in under a minute — for one fee you see before you tap."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/wallet" className="px-6 py-3 text-[14px] font-semibold btn-primary rounded-[10px]">Open a wallet</Link>
          <Link href="/fees" className="px-6 py-3 text-[14px] font-semibold btn-line">See all fees</Link>
        </div>
      </PageHero>

      {/* CARD + STEPS */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="reveal py-6"><Card3D /></div>
            <div className="reveal reveal-d1">
              <div className="f-eyebrow">Three taps to cash</div>
              <h2 className="display text-[34px] md:text-[46px] text-[var(--navy)] leading-[1.05] mt-3">From signed POD to spendable money</h2>
              <div className="mt-8 space-y-4 max-w-lg">
                {STEPS.map((s) => (
                  <div key={s.k} className="flex items-start gap-4 f-card p-5">
                    <span className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center display text-[16px] text-white" style={{ background: "linear-gradient(160deg,#00a2e7,#0670a0)" }}>{s.k}</span>
                    <span><span className="display text-[17px] text-[var(--navy)] block">{s.n}</span><span className="text-[var(--muted)] text-[13.5px] leading-relaxed block mt-1">{s.d}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section className="py-24 f-soft">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="f-eyebrow">One fee, shown first</div>
            <h2 className="display text-[34px] md:text-[46px] text-[var(--navy)] leading-[1.05] mt-2">Pick how fast you get paid</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px]">Every option prices the same way: the fee you see is the only money you give up.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {TIERS.map((t, i) => (
              <div key={t.n} className={`relative f-card p-7 reveal reveal-d${i}`} style={t.hot ? { border: "2px solid #00a2e7", boxShadow: "0 24px 50px -24px rgba(0,162,231,0.4)" } : {}}>
                {t.hot && <span className="absolute -top-3 left-6 text-[10px] font-bold uppercase tracking-[0.14em] text-white px-3 py-1 rounded-full" style={{ background: "#00a2e7" }}>Most used</span>}
                <div className="display text-[20px] text-[var(--navy)]">{t.n}</div>
                <div className="mt-3 flex items-baseline gap-2"><span className="display num text-[40px] text-[var(--navy)]">{t.fee}</span><span className="text-[12px] text-[var(--muted)] uppercase tracking-wider">fee</span></div>
                <div className="mt-1 text-[12.5px] font-semibold" style={{ color: "#0670a0" }}>{t.when}</div>
                <p className="text-[13.5px] text-[var(--muted)] mt-4 leading-relaxed">{t.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center reveal">
            <div className="inline-flex items-center gap-3 rounded-xl px-5 py-3 text-[13.5px] bg-white" style={{ border: "1px solid rgba(0,162,231,0.25)", color: "var(--navy)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0670a0" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.5v.5" /></svg>
              On a $1,000 invoice, QuickPay costs $15 — and beats 32 days of waiting, every time.
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
