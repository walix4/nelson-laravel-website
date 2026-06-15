"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const FEATURES = [
  {
    icon: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
    title: "Instant Drayage Quotes",
    desc: "Get competitive drayage rates in seconds. Compare carriers, axle classes, and route options without a single phone call.",
  },
  {
    icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    title: "Real-Time Tracking",
    desc: "Live GPS tracking on every container move — port gate-out to final delivery — with automated status notifications.",
  },
  {
    icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    title: "Verified Carrier Network",
    desc: "Every carrier on DrayGo is MC/DOT verified, insured, and rated. No surprises at pickup.",
  },
  {
    icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    title: "Digital Bill of Lading",
    desc: "Paperless BOL generation, e-signatures, and document storage. Your freight records, always accessible.",
  },
  {
    icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    title: "Transparent Pricing",
    desc: "No hidden fees. See the full cost breakdown — base rate, fuel surcharge, chassis — before you confirm.",
  },
  {
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    title: "Dedicated Support",
    desc: "Your operations team has a direct line. Freight experts available 7 days a week for time-sensitive moves.",
  },
];

const STEPS = [
  { n: "1", title: "Post your load", desc: "Enter pickup terminal, delivery address, container type, and weight. Takes 60 seconds." },
  { n: "2", title: "Get matched", desc: "DrayGo instantly surfaces available carriers with live rates and ETAs from our verified network." },
  { n: "3", title: "Confirm & track", desc: "Book in one click. Track your container in real-time from dispatch to final delivery." },
];

export default function ShipperPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section
        className="relative overflow-hidden text-white py-24 md:py-32"
        style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 60%,#0d2240 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px 500px at 10% 60%,rgba(252,11,5,0.10),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-5" style={{ background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.35)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fc0b05] inline-block" />
              For Shippers
            </div>
            <h1 className="display text-white text-[42px] md:text-[64px] leading-[1.04]">
              Move containers.<br />
              <span style={{ color: "#fc0b05" }}>Not mountains of paperwork.</span>
            </h1>
            <p className="mt-6 text-white/70 text-[16px] md:text-[18px] max-w-xl leading-relaxed">
              DrayGo gives shippers instant access to a verified drayage carrier network, transparent pricing, and real-time container tracking — from port gate-out to warehouse door.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/#load-board" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold">
                Post a Load
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link href="/estimates" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="py-12" style={{ background: "#fc0b05" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[["10K+","Active Loads"],["500+","Verified Carriers"],["98%","On-Time Delivery"],["60s","Avg. Quote Time"]].map(([v,l]) => (
              <div key={l}>
                <div className="display num text-[38px] md:text-[46px] leading-none font-extrabold">{v}</div>
                <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28" style={{ background: "#f8fafc" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>How it works</div>
            <h2 className="display text-[32px] md:text-[44px] text-[#08192b] leading-[1.08]">Drayage in 3 steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl p-8 bg-white border border-[#08192b]/10">
                <div className="display text-[64px] leading-none num font-extrabold mb-4" style={{ color: "rgba(252,11,5,0.10)" }}>{s.n}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "#fc0b05" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="display text-[20px] text-[#08192b] mb-2">{s.title}</h3>
                <p className="text-[14px] text-[#64748b] leading-relaxed">{s.desc}</p>
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
            <h2 className="display text-[32px] md:text-[44px] text-[#08192b] leading-[1.08]">Built for shippers who move freight daily</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
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

      {/* CTA */}
      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="display text-[32px] md:text-[48px] leading-[1.08] text-white">Ready to simplify your drayage?</h2>
          <p className="mt-4 text-white/60 text-[15px] max-w-xl mx-auto leading-relaxed">
            Join thousands of shippers who trust DrayGo for fast, transparent drayage.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#load-board" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold">
              Get Started Free
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
