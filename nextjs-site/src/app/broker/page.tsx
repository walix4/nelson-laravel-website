"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const FEATURES = [
  {
    icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>',
    title: "Live Load Board",
    desc: "Post loads and get matched with available drayage carriers instantly. No cold calls, no waiting — real bids in real time.",
  },
  {
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    title: "Carrier Vetting",
    desc: "Every carrier on the platform is MC/DOT verified and actively rated by other brokers. Build your approved carrier list.",
  },
  {
    icon: '<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
    title: "Route Intelligence",
    desc: "Historical lane data, port congestion alerts, and chassis availability — all surfaced before you quote the shipper.",
  },
  {
    icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    title: "Digital Documentation",
    desc: "Auto-generate rate confirmations, BOLs, and carrier agreements. Every document signed and stored in the cloud.",
  },
  {
    icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    title: "Shipment Tracking",
    desc: "Proactively update your customers with real-time container status. Automated alerts so you focus on the next load.",
  },
  {
    icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    title: "Margin Reporting",
    desc: "Lane-by-lane margin analytics. Know which routes and carriers are most profitable before you renew a contract.",
  },
];

export default function BrokerPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section
        className="relative overflow-hidden text-white py-24 md:py-32"
        style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 60%,#0d2240 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px 500px at 90% 40%,rgba(252,11,5,0.09),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-5" style={{ background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.35)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fc0b05] inline-block" />
              For Freight Brokers
            </div>
            <h1 className="display text-white text-[42px] md:text-[64px] leading-[1.04]">
              Close more drayage deals.<br />
              <span style={{ color: "#fc0b05" }}>With less overhead.</span>
            </h1>
            <p className="mt-6 text-white/70 text-[16px] md:text-[18px] max-w-xl leading-relaxed">
              DrayGo gives freight brokers a live load board, verified carrier access, digital documentation, and the lane intelligence to quote confidently on every drayage move.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/#load-board" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold">
                Post a Load
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link href="/estimates" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors">
                Get Lane Rates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="py-12" style={{ background: "#06143A" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[["500+","Verified Carriers"],["48h","Avg. Payment Terms"],["99%","Load Coverage"],["$0","Membership Fee"]].map(([v,l]) => (
              <div key={l}>
                <div className="display num text-[38px] md:text-[46px] leading-none font-extrabold" style={{ color: "#fc0b05" }}>{v}</div>
                <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>Platform features</div>
            <h2 className="display text-[32px] md:text-[44px] text-[#08192b] leading-[1.08]">
              Everything a drayage broker needs
            </h2>
            <p className="mt-4 text-[#64748b] text-[15px] leading-relaxed max-w-lg mx-auto">
              Stop juggling spreadsheets and carrier calls. DrayGo centralizes your entire drayage operation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl p-7 border border-[#08192b]/10 bg-white">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(252,11,5,0.08)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: f.icon }} />
                </div>
                <h3 className="display text-[18px] text-[#08192b] mb-2">{f.title}</h3>
                <p className="text-[14px] text-[#64748b] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-24" style={{ background: "#f8fafc" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>Workflow</div>
            <h2 className="display text-[32px] md:text-[44px] text-[#08192b] leading-[1.08]">Cover a load in minutes</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {["Receive shipper order","Post to load board","Carrier bids instantly","Dispatch & track"].map((step, i) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white display text-[20px] font-bold" style={{ background: "#fc0b05" }}>{i + 1}</div>
                <p className="text-[14px] font-semibold text-[#08192b]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="display text-[32px] md:text-[48px] leading-[1.08] text-white">Start brokering smarter.</h2>
          <p className="mt-4 text-white/60 text-[15px] max-w-xl mx-auto leading-relaxed">
            Join the DrayGo broker network and access verified carriers, live rates, and automated documentation today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#load-board" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold">
              Join as Broker
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <Link href="/carriers" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors">
              View Carrier Network
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
