import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import RevealInit from "@/components/RevealInit";
import PageHero from "@/components/PageHero";
import LiveSettlements from "@/components/LiveSettlements";

export const metadata = { title: "Live Settlements · DrayPay", description: "Watch drayage payments settle on the DrayPay network in real time — payouts, escrow releases, QuickPay and card spend." };

const STATS = [
  { n: "$48.2M", l: "Settled this month" },
  { n: "412,800", l: "Payments YTD" },
  { n: "<60s", l: "Avg payout time" },
  { n: "510", l: "Payout rails" },
  { n: "0.5%", l: "Fees from" },
  { n: "120ms", l: "Contract latency" },
  { n: "99.99%", l: "Network uptime" },
  { n: "48", l: "States covered" },
];

export default function Settlements() {
  return (
    <>
      <Nav />
      <RevealInit />
      <PageHero
        eyebrow="Network live · settling now"
        title={<>Payments settling, <span className="bg-gradient-to-r from-[#8fd9f5] via-[#3bb8ee] to-[#00a2e7] bg-clip-text text-transparent">right now</span></>}
        sub="Every few seconds another drayage payment clears — an instant payout, an escrow release, a QuickPay advance, a card swipe at the fuel desk. This is the network's public pulse."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/wallet" className="px-6 py-3 rounded text-[14px] font-semibold btn-primary">Open a wallet</Link>
          <Link href="/fees" className="px-6 py-3 rounded text-[14px] font-semibold btn-ghost">Explore volume</Link>
        </div>
      </PageHero>

      {/* LIVE STATS */}
      <section className="grid-bg relative py-16 text-white">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div key={s.l} className={`stat-card reveal reveal-d${i % 4}`} style={{ padding: "24px 22px" }}>
                <div className="stat-num num" style={{ fontSize: 34 }}>{s.n}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE TABLE */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#F0F4FA,#FFFFFF)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 reveal">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Recently settled</div>
              <h2 className="display text-[34px] md:text-[44px] text-[var(--navy)] leading-[1.05] mt-2">The settlement stream</h2>
              <p className="mt-3 text-[var(--muted)] text-[15px] max-w-xl">Filter by payment type, hover to pause the stream, click any hash to copy it. Every row is a real settlement pattern on the network.</p>
            </div>
          </div>
          <LiveSettlements />
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
