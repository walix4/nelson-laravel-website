"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { asset } from "@/lib/site";

const VALUES = [
  { title: "Accuracy", desc: "DOT rule sets updated daily. Every state, every bridge formula, every axle class.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { title: "Speed", desc: "Permits generated in under 60 seconds from submission to driver delivery.", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
  { title: "Coverage", desc: "All 50 states. Every axle configuration. Every weight limit.", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-13l6 3m6 10l5.447 2.724A1 1 0 0021 19.382V8.618a1 1 0 00-.553-.894L15 5m0 15V5" },
  { title: "Reliability", desc: "Built on infrastructure trusted by fleet operators moving 250,000+ loads/year.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
];

const TECH_PILLARS = [
  { label: "Live DOT Scraping", desc: "We scrape all 50 state DOT portals daily, normalizing axle weight tables, permit fee schedules, and route restriction updates into a single unified rule engine. No stale PDFs, no manual entry." },
  { label: "Valhalla Routing", desc: "Our routing is powered by Valhalla, an open-source routing engine, extended with bridge-formula-aware cost functions. Every route is evaluated for weight-restriction compliance before a permit is issued." },
  { label: "Bridge Formula Engine", desc: "Federal Bridge Formula B is applied to every axle group configuration. We precompute legal limits for the 2,000+ most common axle spacings so compliance checks return in milliseconds, not seconds." },
];

const TEAM = [
  { title: "Engineering", count: "8 engineers", desc: "Building the compliance engine, routing layer, permit generation pipeline, and real-time recheck infrastructure." },
  { title: "Compliance Data", count: "4 specialists", desc: "Ex-DOT analysts and permit agents who own rule-set accuracy, manual overrides, and state-by-state escalation paths." },
  { title: "Fleet Support", count: "3 specialists", desc: "Former fleet dispatchers and owner-operators who onboard carriers, answer permit questions, and ensure every load moves." },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src={asset("/hero-toll.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(11,45,92,0.85) 0%,rgba(6,26,56,0.75) 50%,rgba(6,26,56,0.9) 100%)" }} />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-block text-[11px] uppercase tracking-[0.22em] font-semibold px-4 py-1.5 rounded-full mb-6" style={{ background: "rgba(255,222,1,0.12)", border: "1px solid rgba(255,222,1,0.3)", color: "#ffde01" }}>
              About Dray Overweight
            </div>
            <h1 className="display text-white text-[44px] md:text-[64px] leading-[1.02]">Built for the Overweight Freight Industry.</h1>
            <p className="mt-6 text-white/70 text-[18px] max-w-2xl leading-relaxed">
              Overweight permit automation and compliance for fleets running heavy in all 50 states. We exist to eliminate the $10,000 fine that comes from a missed rule change.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#0B2D5C" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: "#ffde01" }}>Our mission</div>
              <h2 className="display text-white text-[36px] md:text-[48px] leading-[1.04]">The permit process shouldn&apos;t take hours.</h2>
              <p className="mt-6 text-white/65 text-[15px] leading-relaxed max-w-lg">
                We built Dray Overweight because overweight compliance was buried in PDFs, fax machines, and state-by-state phone calls. Carriers were spending 4 hours on permit research that should take 4 minutes. Dispatchers were guessing on bridge formula calculations that should be instant.
              </p>
              <p className="mt-4 text-white/65 text-[15px] leading-relaxed max-w-lg">
                Today, DrayOW processes 250,000+ compliance checks per month, covering every axle configuration from 5-axle semis to 9-axle lowboys — in every state, against every current rule. The result is fewer fines, faster dispatch, and carriers who can actually move more loads.
              </p>
            </div>
            {/* CSS stats card */}
            <div className="reveal reveal-d1">
              <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,222,1,0.15)" }}>
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { val: "250K+", label: "Loads Cleared" },
                    { val: "50",    label: "State Rule Sets" },
                    { val: "99.9%", label: "API Uptime" },
                    { val: "120ms", label: "Avg Latency" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="display text-[32px] md:text-[38px] text-white num leading-none">{s.val}</div>
                      <div className="mt-2 text-[12px] text-white/45 uppercase tracking-[0.12em]">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 flex items-center gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,222,1,0.15)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffde01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <span className="text-white/55 text-[13px]">Data updated daily from all 50 state DOT databases</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#061A38" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="reveal text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#ffde01" }}>What we stand for</div>
            <h2 className="display text-white text-[36px] md:text-[50px] leading-[1.04]">Four principles behind every decision we make.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <div key={v.title} className={`reveal reveal-d${i} rounded-2xl p-8 text-center`} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(255,222,1,0.12)", border: "1px solid rgba(255,222,1,0.2)" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffde01" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={v.icon} /></svg>
                </div>
                <h3 className="display text-white text-[20px] mb-3">{v.title}</h3>
                <p className="text-white/55 text-[13px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE BUILT IT */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#0B2D5C" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="reveal text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#ffde01" }}>The technology</div>
            <h2 className="display text-white text-[36px] md:text-[50px] leading-[1.04]">How Dray Overweight works under the hood.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TECH_PILLARS.map((p, i) => (
              <div key={p.label} className={`reveal reveal-d${i} rounded-2xl p-8`} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="display text-[28px] md:text-[32px] text-white/20 num mb-4">0{i + 1}</div>
                <h3 className="display text-white text-[20px] mb-3">{p.label}</h3>
                <p className="text-white/55 text-[13px] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          {/* inline code block showing API response */}
          <div className="reveal mt-12 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,222,1,0.15)" }}>
            <div className="flex items-center gap-2 px-5 py-3" style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {["#E53935","#ffde01","#22c55e"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />)}
              <span className="ml-3 text-white/40 text-[12px] font-mono">POST /api/v1/compliance/check</span>
            </div>
            <div className="p-6 font-mono text-[13px] leading-relaxed" style={{ background: "rgba(0,0,0,0.3)" }}>
              <div className="text-white/30">{"{"}</div>
              <div className="ml-4"><span className="text-[#ffde01]">&quot;load&quot;</span><span className="text-white/50">: {"{"} </span><span className="text-[#60a5fa]">&quot;origin&quot;</span><span className="text-white/50">: </span><span className="text-[#86efac]">&quot;Houston, TX&quot;</span><span className="text-white/50">, </span><span className="text-[#60a5fa]">&quot;destination&quot;</span><span className="text-white/50">: </span><span className="text-[#86efac]">&quot;Dallas, TX&quot;</span><span className="text-white/50"> {"}"},</span></div>
              <div className="ml-4"><span className="text-[#ffde01]">&quot;vehicle&quot;</span><span className="text-white/50">: {"{"} </span><span className="text-[#60a5fa]">&quot;axles&quot;</span><span className="text-white/50">: </span><span className="text-[#f9a8d4]">5</span><span className="text-white/50">, </span><span className="text-[#60a5fa]">&quot;gross_weight&quot;</span><span className="text-white/50">: </span><span className="text-[#f9a8d4]">95000</span><span className="text-white/50"> {"}"},</span></div>
              <div className="ml-4 mt-2"><span className="text-white/30">// Response:</span></div>
              <div className="ml-4"><span className="text-[#ffde01]">&quot;permit&quot;</span><span className="text-white/50">: {"{"} </span><span className="text-[#60a5fa]">&quot;status&quot;</span><span className="text-white/50">: </span><span className="text-[#86efac]">&quot;issued&quot;</span><span className="text-white/50">, </span><span className="text-[#60a5fa]">&quot;states&quot;</span><span className="text-white/50">: [</span><span className="text-[#86efac]">&quot;TX&quot;</span><span className="text-white/50">], </span><span className="text-[#60a5fa]">&quot;issued_in&quot;</span><span className="text-white/50">: </span><span className="text-[#86efac]">&quot;47s&quot;</span><span className="text-white/50"> {"}"}</span></div>
              <div className="text-white/30">{"}"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#061A38" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="reveal text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#ffde01" }}>The team</div>
            <h2 className="display text-white text-[36px] md:text-[50px] leading-[1.04]">People who&apos;ve lived the overweight problem.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((t, i) => (
              <div key={t.title} className={`reveal reveal-d${i} rounded-2xl p-8`} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="display text-[48px] text-white/10 num leading-none mb-2">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="display text-white text-[22px] mb-1">{t.title}</h3>
                <div className="text-[#ffde01] text-[13px] font-semibold mb-3">{t.count}</div>
                <p className="text-white/55 text-[13px] leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0B2D5C 0%,#061A38 60%,#15448C 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="max-w-[900px] mx-auto px-6 text-center reveal relative">
          <div className="inline-block text-[11px] uppercase tracking-[0.22em] font-semibold px-4 py-1.5 rounded-full mb-6" style={{ background: "rgba(255,222,1,0.12)", border: "1px solid rgba(255,222,1,0.3)", color: "#ffde01" }}>
            Start automating your permits today
          </div>
          <h2 className="display text-white text-[40px] md:text-[56px] leading-[1.03]">Join thousands of operators who run heavy and stay compliant.</h2>
          <p className="mt-5 text-white/60 text-[16px] max-w-xl mx-auto">No setup fee. API access included. Every state, every axle class, ready on day one.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="/#quote" className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-[15px] font-bold text-[#0B2D5C] transition hover:opacity-90" style={{ background: "#ffde01" }}>
              Check a load free <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-[15px] font-semibold text-white transition hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
              View API pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
