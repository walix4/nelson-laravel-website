"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const BENEFITS = [
  {
    icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>',
    title: "Live Load Board Access",
    desc: "See available drayage loads in your area the moment they're posted — no middlemen, no delays.",
  },
  {
    icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    title: "Fast Dispatch",
    desc: "Accept a load and receive the full job packet — terminal name, container number, delivery address, contact info — instantly.",
  },
  {
    icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    title: "Quick Pay",
    desc: "Get paid faster. DrayGo processes carrier payments within 48 hours of POD submission — no 30-60 day wait.",
  },
  {
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    title: "Fleet Management",
    desc: "Manage your drivers, trucks, and container history from a single dashboard. Assign loads with one tap.",
  },
  {
    icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    title: "Performance Ratings",
    desc: "Build your reputation on every delivery. Top-rated carriers get priority access to premium loads.",
  },
  {
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    title: "Compliance Tools",
    desc: "MC/DOT document tracking, insurance reminders, and port access credential management — all in one place.",
  },
];

export default function CarriersPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section
        className="relative overflow-hidden text-white py-24 md:py-32"
        style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 60%,#0d2240 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 80% 50%,rgba(252,11,5,0.08),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-5" style={{ background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.35)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fc0b05] inline-block" />
              For Carriers
            </div>
            <h1 className="display text-white text-[42px] md:text-[64px] leading-[1.04]">
              More loads.<br />
              <span style={{ color: "#fc0b05" }}>Less deadhead.</span>
            </h1>
            <p className="mt-6 text-white/70 text-[16px] md:text-[18px] max-w-xl leading-relaxed">
              DrayGo connects drayage carriers directly to shippers and brokers. Find loads near your terminal, dispatch fast, and get paid in 48 hours — no broker markup eating your margin.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/#load-board" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold">
                Find Loads Now
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="py-12" style={{ background: "#fc0b05" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[["10K+","Loads Per Month"],["48h","Carrier Payment"],["0%","Hidden Fees"],["$0","Sign-Up Cost"]].map(([v,l]) => (
              <div key={l}>
                <div className="display num text-[38px] md:text-[46px] leading-none font-extrabold">{v}</div>
                <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>Why carriers choose DrayGo</div>
            <h2 className="display text-[32px] md:text-[44px] text-[#08192b] leading-[1.08]">
              Run a leaner, more profitable operation
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-xl p-7 border border-[#08192b]/10 bg-white">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(252,11,5,0.08)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: b.icon }} />
                </div>
                <h3 className="display text-[18px] text-[#08192b] mb-2">{b.title}</h3>
                <p className="text-[14px] text-[#64748b] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="py-20 md:py-24" style={{ background: "#f8fafc" }}>
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>Requirements</div>
            <h2 className="display text-[32px] md:text-[40px] text-[#08192b] leading-[1.08]">What you need to join</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Active MC or DOT number",
              "Valid cargo & liability insurance",
              "Port authority access credentials",
              "Commercial driver's license (CDL)",
              "Compatible container chassis",
              "Mobile phone for load tracking",
            ].map((req) => (
              <div key={req} className="flex items-center gap-3 rounded-lg p-4 bg-white border border-[#08192b]/10">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: "#fc0b05" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <span className="text-[14px] font-medium text-[#08192b]">{req}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="display text-[32px] md:text-[48px] leading-[1.08] text-white">Join the DrayGo carrier network.</h2>
          <p className="mt-4 text-white/60 text-[15px] max-w-xl mx-auto leading-relaxed">
            Registration is free. Get verified in 24 hours and start accepting loads immediately.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#load-board" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold">
              Register as Carrier
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <Link href="/broker" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors">
              For Brokers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
