"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const STATS = [
  { value: "10K+", label: "Active Loads" },
  { value: "500+", label: "Verified Carriers" },
  { value: "98%", label: "On-Time Delivery" },
  { value: "2022", label: "Founded" },
];

const VALUES = [
  {
    title: "Speed",
    desc: "Drayage shouldn't take days to arrange. DrayGo connects shippers and carriers in under 60 seconds.",
    icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
  },
  {
    title: "Transparency",
    desc: "No hidden fees, no rate guessing. Every load on DrayGo shows the full cost before you confirm.",
    icon: '<circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>',
  },
  {
    title: "Reliability",
    desc: "Every carrier is MC/DOT verified and rated by real brokers and shippers on the platform.",
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  },
];

const TEAM = [
  { title: "Engineering", desc: "6 engineers building the load board, dispatch engine, and real-time tracking pipeline." },
  { title: "Operations", desc: "4 ex-drayage operators who spent years running containers — they make sure the product reflects the real world." },
  { title: "Carrier Success", desc: "3 specialists onboarding, verifying, and supporting every carrier on the DrayGo network." },
];

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden text-white py-24 md:py-32" style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 60%,#0d2240 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px 500px at 15% 60%,rgba(252,11,5,0.09),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-5" style={{ background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.35)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fc0b05] inline-block" />
              About DrayGo
            </div>
            <h1 className="display text-white text-[42px] md:text-[64px] leading-[1.04]">
              We built the platform<br />
              <span style={{ color: "#fc0b05" }}>drayage deserved.</span>
            </h1>
            <p className="mt-6 text-white/70 text-[16px] md:text-[18px] max-w-xl leading-relaxed">
              DrayGo was founded in 2022 by a team of freight veterans who were tired of watching shippers, brokers, and carriers lose time and money to a broken drayage process.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12" style={{ background: "#fc0b05" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="display num text-[40px] md:text-[48px] leading-none font-extrabold">{value}</div>
                <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: "#fc0b05" }}>Our mission</div>
            <h2 className="display text-[32px] md:text-[44px] text-[#08192b] leading-[1.08]">
              Make drayage as simple as sending a text.
            </h2>
          </div>
          <div className="space-y-5 text-[15px] text-[#64748b] leading-relaxed">
            <p>Container drayage — the short-haul move from port to warehouse — has always been the most friction-heavy leg of the supply chain. Phone calls, fax machines, spreadsheet rate sheets, and cash-only carriers created an industry where the average load took 4+ hours to arrange.</p>
            <p>DrayGo changes that. Our platform connects shippers and brokers to a verified carrier network in real time, with transparent pricing, digital documentation, and live tracking built in from day one.</p>
            <p>Today, DrayGo processes thousands of container moves per month across every major U.S. port — and we're just getting started.</p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 md:py-24" style={{ background: "#f8fafc" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>What we stand for</div>
            <h2 className="display text-[32px] md:text-[44px] text-[#08192b] leading-[1.08]">Our core values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <div key={v.title} className="rounded-xl p-8 bg-white border border-[#08192b]/10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(252,11,5,0.09)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: v.icon }} />
                </div>
                <h3 className="display text-[20px] text-[#08192b] mb-2">{v.title}</h3>
                <p className="text-[14px] text-[#64748b] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>The team</div>
            <h2 className="display text-[32px] md:text-[44px] text-[#08192b] leading-[1.08]">Built by freight people</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((t) => (
              <div key={t.title} className="rounded-xl p-8 border border-[#08192b]/10 bg-white">
                <h3 className="display text-[20px] text-[#08192b] mb-3">{t.title}</h3>
                <p className="text-[14px] text-[#64748b] leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="display text-[32px] md:text-[48px] leading-[1.08] text-white">Join the DrayGo network.</h2>
          <p className="mt-4 text-white/60 text-[15px] max-w-xl mx-auto leading-relaxed">Whether you're shipping, brokering, or hauling — DrayGo has a place for you.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#load-board" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold text-white transition hover:opacity-90" style={{ background: "#fc0b05" }}>
              Get Started
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors">
              View Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
