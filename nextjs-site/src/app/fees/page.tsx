import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import RevealInit from "@/components/RevealInit";
import PageHero from "@/components/PageHero";
import FeeExplorer from "@/components/FeeExplorer";

export const metadata = { title: "Fees & Volume · DrayPay", description: "DrayPay's full fee schedule and a live explorer of payment volume settling across every rail — instant payouts, releases, QuickPay and card." };

const SCHEDULE = [
  { n: "Wallet & reserves", fee: "Free", d: "Holding balances, reserving funds for booked moves, receiving standard releases — never a fee." },
  { n: "Instant payout", fee: "0.5%", d: "Settles to any wallet in under 60 seconds, capped at $25 per payment." },
  { n: "QuickPay", fee: "1.5%", d: "Same-day cash on approved invoices. The fee is the whole cost." },
  { n: "Factoring", fee: "from 2.5%", d: "On-demand funding for invoices still in approval. Non-recourse available." },
  { n: "DrayPay card", fee: "$0", d: "No issuance, monthly or per-swipe fees. Spend the balance directly." },
  { n: "Records & exports", fee: "Free", d: "Audit-ready settlement records, accounting exports and the API — included." },
];

export default function Fees() {
  return (
    <>
      <Nav />
      <RevealInit />
      <PageHero
        eyebrow="Transparent by design"
        title={<>Fees you see <span className="bg-gradient-to-r from-[#00a2e7] to-[#0670a0] bg-clip-text text-transparent">before you pay</span></>}
        sub="Every DrayPay fee is shown before you accept and itemized after you settle. Explore what the network is actually moving — live, by rail."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/wallet" className="px-6 py-3 text-[14px] font-semibold btn-primary rounded-[10px]">Open a wallet</Link>
          <Link href="/quickpay" className="px-6 py-3 text-[14px] font-semibold btn-line">QuickPay pricing</Link>
        </div>
      </PageHero>

      {/* VOLUME EXPLORER */}
      <section className="relative py-24 f-soft overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 reveal">
            <div className="f-eyebrow">Network volume</div>
            <h2 className="display text-[34px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-3">What the rails are settling</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px]">Switch rails, scrub the curve, change the window — live settlement volume across the network.</p>
          </div>
          <FeeExplorer />
        </div>
      </section>

      {/* FEE SCHEDULE */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="f-eyebrow">The whole schedule</div>
            <h2 className="display text-[34px] md:text-[46px] text-[var(--navy)] leading-[1.05] mt-2">Six lines. That&apos;s the pricing.</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px]">No reserves, no minimum volume, no monthly platform fee. If it isn&apos;t on this page, it doesn&apos;t exist.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SCHEDULE.map((s, i) => (
              <div key={s.n} className={`f-card p-6 reveal reveal-d${i % 3}`}>
                <div className="flex items-center justify-between">
                  <div className="display text-[17px] text-[var(--navy)]">{s.n}</div>
                  <span className="num font-bold text-[15px] px-3 py-1 rounded-lg" style={{ background: "rgba(0,162,231,0.08)", color: "#0670a0" }}>{s.fee}</span>
                </div>
                <p className="text-[13.5px] text-[var(--muted)] mt-3 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center reveal">
            <Link href="/settlements" className="px-7 py-3.5 text-[14px] font-semibold btn-primary rounded-[10px] inline-flex items-center gap-2">Watch the network settle <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
