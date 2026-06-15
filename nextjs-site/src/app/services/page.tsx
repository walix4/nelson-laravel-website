"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const SERVICES = [
  {
    label: "Shippers",
    href: "/shipper",
    tag: "For Shippers",
    headline: "Instant drayage quotes & verified carriers",
    desc: "Post a load, get matched with verified carriers, and track your container from port gate-out to final delivery — all in one platform.",
    features: ["Live load board", "Real-time container tracking", "Digital BOL", "Transparent pricing"],
    cta: "Learn More",
    color: "#fc0b05",
  },
  {
    label: "Brokers",
    href: "/broker",
    tag: "For Brokers",
    headline: "Cover every drayage lane with confidence",
    desc: "Access live load board, 500+ verified carriers, lane intelligence, and digital documentation — the complete broker toolkit for drayage.",
    features: ["Live load matching", "Carrier vetting & ratings", "Route intelligence", "Margin analytics"],
    cta: "Learn More",
    color: "#1a56db",
  },
  {
    label: "Carriers",
    href: "/carriers",
    tag: "For Carriers",
    headline: "More loads, faster pay, less deadhead",
    desc: "Find drayage loads near your terminal, accept with one tap, and get paid within 48 hours of POD submission. No broker markup on your rate.",
    features: ["Live load board access", "48h carrier payment", "Fleet management", "Compliance tools"],
    cta: "Learn More",
    color: "#059669",
  },
  {
    label: "PortJob",
    href: "/estimates",
    tag: "Port Operations",
    headline: "Container job management & dispatch",
    desc: "Full port job lifecycle management — from container booking and chassis assignment to driver dispatch and delivery confirmation.",
    features: ["Container job creation", "Driver dispatch", "Port terminal integration", "Job tracking"],
    cta: "Get Started",
    color: "#7c3aed",
  },
];

const ALL_FEATURES = [
  { icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>', title: "Load Board", desc: "Post and find loads in real time. No phone calls, no waiting." },
  { icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', title: "Live Tracking", desc: "GPS visibility on every move, port to door." },
  { icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>', title: "Quick Pay", desc: "Carriers paid within 48h. Shippers invoice on delivery." },
  { icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>', title: "Digital Docs", desc: "BOL, rate confirmations, and agreements — paperless." },
  { icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>', title: "Verified Network", desc: "Every carrier is MC/DOT verified and actively rated." },
  { icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>', title: "Analytics", desc: "Lane-level data and margin tracking for every stakeholder." },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section
        className="relative overflow-hidden text-white py-24 md:py-28"
        style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 60%,#0d2240 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px 500px at 50% 80%,rgba(252,11,5,0.08),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-5" style={{ background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.35)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#fc0b05] inline-block" />
            DrayGo Platform
          </div>
          <h1 className="display text-white text-[42px] md:text-[64px] leading-[1.04]">
            One platform.<br />
            <span style={{ color: "#fc0b05" }}>Every drayage role.</span>
          </h1>
          <p className="mt-6 text-white/70 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">
            Whether you're a shipper, freight broker, or carrier — DrayGo has a purpose-built set of tools that connects your side of the drayage transaction to everyone else's.
          </p>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="py-20 md:py-28" style={{ background: "#f8fafc" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((s) => (
              <div key={s.label} className="rounded-2xl p-8 md:p-10 bg-white border border-[#08192b]/10 flex flex-col">
                <div
                  className="inline-flex items-center self-start rounded-full px-3 py-1 text-[11px] font-bold mb-5"
                  style={{ background: `${s.color}15`, color: s.color }}
                >
                  {s.tag}
                </div>
                <h2 className="display text-[22px] md:text-[28px] text-[#08192b] leading-[1.2] mb-3">{s.headline}</h2>
                <p className="text-[14px] text-[#64748b] leading-relaxed mb-6">{s.desc}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[14px] text-[#08192b]">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${s.color}18` }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={s.href}
                  className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: s.color }}
                >
                  {s.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>Platform</div>
            <h2 className="display text-[32px] md:text-[44px] text-[#08192b] leading-[1.08]">Core capabilities across all roles</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl p-6 border border-[#08192b]/10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(252,11,5,0.08)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: f.icon }} />
                </div>
                <h3 className="display text-[17px] text-[#08192b] mb-1.5">{f.title}</h3>
                <p className="text-[13.5px] text-[#64748b] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="display text-[32px] md:text-[48px] leading-[1.08] text-white">Start moving freight on DrayGo.</h2>
          <p className="mt-4 text-white/60 text-[15px] max-w-xl mx-auto leading-relaxed">
            No setup fees. No contracts. Sign up for free and access the full DrayGo network today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#load-board" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold">
              Get Started
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <Link href="/estimates" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
