"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { asset } from "@/lib/site";

const VALUES = [
  { title: "Speed", desc: "A drayage quote should take 30 seconds, not 30 phone calls. Every product decision we make is tested against that benchmark.", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", color: "#fc0b05" },
  { title: "Transparency", desc: "No black-box pricing. Every line item in a DrayageRate quote — fuel, chassis, port fee — is visible, explained, and auditable.", icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", color: "#3A5FC0" },
  { title: "Accuracy", desc: "Our rate engine updates 38 live variables on every quote — diesel index, chassis pool fees, port surcharges. Stale data is our enemy.", icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3", color: "#fc0b05" },
  { title: "Coverage", desc: "50+ U.S. and Canadian container ports. 1,200+ inland delivery cities. 2,800+ carrier partners. We did not cut corners on the network.", icon: "M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", color: "#3A5FC0" },
];

const PRICING_ITEMS = [
  { label: "Live Diesel Index", desc: "DOE weekly national average, updated every Tuesday at market open." },
  { label: "Carrier CPM", desc: "Carrier-declared cost-per-mile, adjusted for axle class and haul length." },
  { label: "Chassis Pool Fees", desc: "Per-day chassis rental from SACP, ULGCP, DCLI, Flexi-Van, and regional pools." },
  { label: "Port Terminal Charges", desc: "Gate fees, terminal handling, exam surcharges from every major terminal operator." },
  { label: "Fuel Surcharge (FSC)", desc: "EIA-table FSC applied to carrier declared MPG, updated with each diesel index." },
  { label: "Accessorials", desc: "Overweight permits, hazmat, reefer plug, chassis split, and lumper all modeled at quote time." },
];

const TEAM = [
  { title: "Engineering", n: "9 engineers", desc: "Full-stack, data, and infrastructure. They built the rate engine, quote API, and the real-time repricing pipeline." },
  { title: "Data & Operations", n: "5 specialists", desc: "Ex-drayage operators who spent years running containers — they make sure the data matches the real world." },
  { title: "Carrier Success", n: "4 managers", desc: "Onboarding, verifying, and supporting every carrier on the platform. They own the network quality." },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: 520 }}>
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src={asset("/hero-cargo.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(1,7,26,0.88) 0%,rgba(1,7,26,0.65) 45%,rgba(1,7,26,0.92) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 20% 50%,rgba(255,59,48,0.18),transparent 60%)" }} />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 py-28 md:py-36 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold mb-6" style={{ background: "rgba(255,59,48,0.15)", border: "1px solid rgba(255,59,48,0.4)" }}>
            About DrayageRate
          </div>
          <h1 className="display text-white text-[40px] md:text-[64px] leading-[1.03]">The Rate Engine Behind<br /><span style={{ color: "#fc0b05" }}>North American Drayage.</span></h1>
          <p className="mt-6 text-white/70 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">Built by freight operators who were tired of calling around for prices. Every quote is fully itemised, live-priced, and locked for 24 hours.</p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#08192b" }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: "radial-gradient(800px 400px at 80% 40%,rgba(58,95,192,0.3),transparent 60%)" }} />
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: "#fc0b05" }}>Our mission</div>
              <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Drayage pricing was a black box. We opened it.</h2>
              <p className="mt-5 text-white/60 text-[15px] leading-relaxed">For decades, drayage pricing required calling three brokers and hoping you got the right number. Rates varied wildly between carriers, fuel surcharges were opaque, and chassis fees appeared as surprises at billing.</p>
              <p className="mt-4 text-white/60 text-[15px] leading-relaxed">We built DrayageRate to fix that. A single API call returns the same fully-itemised, all-in price that a carrier would actually charge. Locked for 24 hours. Exportable to PDF, JSON, or HTML.</p>
              <div className="mt-8">
                <Link href="/#quote" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white transition" style={{ background: "#fc0b05" }}>
                  Run a quote <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </div>
            </div>
            <div className="reveal reveal-d1">
              <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="grid grid-cols-2 gap-6">
                  {[["$2.4B+", "Rates Processed"], ["50+", "Ports Covered"], ["2,800+", "Carrier Partners"], ["30s", "Avg Quote Time"]].map(([v, l]) => (
                    <div key={l} className="text-center py-6 rounded-xl" style={{ background: "rgba(255,59,48,0.06)", border: "1px solid rgba(255,59,48,0.15)" }}>
                      <div className="display text-[32px] md:text-[38px] text-white num leading-none">{v}</div>
                      <div className="mt-2 text-[11px] uppercase tracking-wider text-white/45">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#060d1a" }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: "radial-gradient(700px 400px at 15% 70%,rgba(255,59,48,0.2),transparent 60%)" }} />
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>What we stand for</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Four principles. Every feature.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <div key={v.title} className={`rounded-2xl p-8 reveal reveal-d${i % 2}`} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${v.color}22`, border: `1px solid ${v.color}44` }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={v.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: v.icon }} />
                </div>
                <h3 className="display text-[20px] text-white mb-3">{v.title}</h3>
                <p className="text-[14px] text-white/55 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE PRICE */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#08192b" }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: "radial-gradient(800px 400px at 85% 20%,rgba(58,95,192,0.3),transparent 60%)" }} />
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: "#3A5FC0" }}>The rate engine</div>
              <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">How every quote is priced.</h2>
              <p className="mt-5 text-white/60 text-[15px] leading-relaxed">DrayageRate does not make up numbers. Every quote is the sum of six precisely-calculated cost components, each pulling from a live data source updated at least daily.</p>
              <p className="mt-4 text-white/55 text-[15px] leading-relaxed">No averages. No rule-of-thumb per-mile rates. Each quote reflects the actual economics of a specific container move on the day you run it.</p>
            </div>
            <div className="reveal reveal-d1 flex flex-col gap-3">
              {PRICING_ITEMS.map((item, i) => (
                <div key={item.label} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white" style={{ background: i % 2 === 0 ? "#fc0b05" : "#3A5FC0" }}>{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="text-[14px] font-semibold text-white">{item.label}</div>
                    <div className="text-[13px] text-white/50 mt-1 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#060d1a" }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: "radial-gradient(600px 300px at 50% 30%,rgba(255,59,48,0.18),transparent 60%)" }} />
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto reveal mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>The team</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Small team. Big network.</h2>
            <p className="mt-4 text-white/55 text-[15px]">18 people covering engineering, operations, and carrier success — every one obsessed with making drayage easier.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((t, i) => (
              <div key={t.title} className={`rounded-2xl p-8 text-center reveal reveal-d${i}`} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-[18px]" style={{ background: "linear-gradient(135deg,#fc0b05,#d90a04)" }}>{t.title[0]}</div>
                <h3 className="display text-[18px] text-white">{t.title}</h3>
                <div className="text-[12px] font-semibold mt-1 mb-3" style={{ color: "#fc0b05" }}>{t.n}</div>
                <p className="text-[13px] text-white/55 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 60%,#1E3C82 100%)" }}>
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: "radial-gradient(700px 400px at 90% 50%,rgba(255,59,48,0.25),transparent 60%)" }} />
        <div className="max-w-[800px] mx-auto px-6 text-center reveal relative">
          <h2 className="display text-white text-[40px] md:text-[54px] leading-[1.03]">Run your first drayage quote.</h2>
          <p className="text-white/65 mt-4 text-[15px]">Free to start. No credit card. Every port covered from day one.</p>
          <Link href="/#quote" className="btn-primary inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-xl text-[15px] font-semibold">
            <span className="label">Get a free quote</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
