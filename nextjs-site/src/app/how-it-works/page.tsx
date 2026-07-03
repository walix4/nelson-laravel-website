"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { asset } from "@/lib/site";

const STEPS = [
  {
    n: "01",
    title: "Submit Your Load",
    desc: "Enter your origin, destination, axle configuration, and gross vehicle weight. The engine accepts everything from 3-axle straight trucks to 9-axle lowboys.",
    color: "#ffde01",
    visual: (
      <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,222,1,0.15)" }}>
        <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-white/40 mb-4">Load submission form</div>
        {[["Origin", "Houston, TX"], ["Destination", "Dallas, TX"], ["Gross Weight", "95,000 lb"], ["Axle Config", "5-axle semi"]].map(([label, val]) => (
          <div key={label} className="mb-3">
            <div className="text-[10px] uppercase tracking-[0.1em] text-white/35 mb-1">{label}</div>
            <div className="rounded-lg px-3 py-2.5 text-[13px] text-white font-medium" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>{val}</div>
          </div>
        ))}
        <div className="mt-4 rounded-lg py-3 text-center text-[13px] font-bold text-[#0B2D5C]" style={{ background: "#ffde01" }}>Check compliance →</div>
      </div>
    ),
  },
  {
    n: "02",
    title: "Auto Compliance Check",
    desc: "The engine evaluates 38 compliance inputs in real time — federal axle limits, state-specific weight thresholds, bridge formula groups, width and height restrictions, and current permit requirements.",
    color: "#3A5FC0",
    visual: (
      <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(58,95,192,0.3)" }}>
        <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-white/40 mb-4">Compliance engine — 38 checks</div>
        {[
          { label: "Federal gross limit (80K)", ok: false, val: "95,000 lb — Permit needed" },
          { label: "Bridge formula B", ok: true,  val: "Pass — all groups clear" },
          { label: "TX tandem axle limit", ok: true,  val: "34,000 lb — Legal" },
          { label: "TX state permit required", ok: true,  val: "Issued in 47s" },
        ].map((c) => (
          <div key={c.label} className="flex items-start gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="mt-0.5 text-[12px] font-bold flex-shrink-0" style={{ color: c.ok ? "#22c55e" : "#ffde01" }}>{c.ok ? "✓" : "!"}</span>
            <div>
              <div className="text-[12px] text-white/60">{c.label}</div>
              <div className="text-[11px] mt-0.5" style={{ color: c.ok ? "#22c55e" : "#ffde01" }}>{c.val}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: "03",
    title: "Permit Generated",
    desc: "A multi-state permit package is assembled and delivered to the driver in under 60 seconds. For routes requiring multiple state permits, all documents are bundled and sent together.",
    color: "#ffde01",
    visual: (
      <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,222,1,0.2)" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-white/40">Permit document</div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>ISSUED</span>
        </div>
        <div className="rounded-xl p-4 mb-3" style={{ background: "rgba(255,222,1,0.06)", border: "1px solid rgba(255,222,1,0.12)" }}>
          <div className="text-[10px] uppercase tracking-[0.1em] text-white/35 mb-1">Permit #</div>
          <div className="text-white font-mono text-[13px]">TX-2026-OW-047821</div>
        </div>
        {[["Route", "HOU → DAL via I-45"], ["Valid", "24 hours from issue"], ["States", "Texas (1 permit)"], ["Issued in", "47 seconds"]].map(([k, v]) => (
          <div key={k} className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="text-[12px] text-white/40">{k}</span>
            <span className="text-[12px] text-white font-medium">{v}</span>
          </div>
        ))}
        <div className="mt-4 text-center text-[11px] text-white/40">PDF sent to driver · SMS sent to dispatcher</div>
      </div>
    ),
  },
  {
    n: "04",
    title: "Route Cleared",
    desc: "A bridge-safe route is calculated and pushed to the driver's navigation. The route avoids low bridges, weight-restricted roads, and seasonal closure zones based on current state data.",
    color: "#3A5FC0",
    visual: (
      <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(58,95,192,0.25)" }}>
        <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-white/40 mb-4">Route intelligence</div>
        <div className="rounded-xl overflow-hidden mb-3" style={{ background: "rgba(11,45,92,0.6)", height: 100, position: "relative" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="80%" height="60%" viewBox="0 0 200 60" fill="none">
              <path d="M10 30 C40 10 80 50 120 30 C160 10 180 35 190 30" stroke="#3A5FC0" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="4 2"/>
              <circle cx="10" cy="30" r="5" fill="#E53935"/>
              <circle cx="190" cy="30" r="5" fill="#22c55e"/>
              <circle cx="80" cy="42" r="3" fill="#ffde01" opacity="0.8"/>
            </svg>
          </div>
        </div>
        {[["Distance", "239 miles"], ["Restrictions avoided", "3 bridge limits"], ["Clearance", "16.2 ft — OK"], ["Weight restriction", "None on route"]].map(([k, v]) => (
          <div key={k} className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="text-[12px] text-white/40">{k}</span>
            <span className="text-[12px] text-white font-medium">{v}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: "05",
    title: "Compliant Move",
    desc: "Real-time monitoring tracks the load from yard to delivery. Compliance status updates automatically if a state changes a limit mid-trip. Delivery confirmation closes the permit and logs the move.",
    color: "#ffde01",
    visual: (
      <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,222,1,0.15)" }}>
        <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-white/40 mb-4">Live tracking</div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(34,197,94,0.15)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 17V7H2v10h2"/><path d="M14 9h4l4 4v4h-2"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>
          </div>
          <div>
            <div className="text-white text-[13px] font-semibold">Unit #TX-2847 — En Route</div>
            <div className="text-white/40 text-[11px]">I-45 North · 142 mi remaining</div>
          </div>
        </div>
        {[["Compliance", "Active", "#22c55e"], ["Permit valid", "18h 42m left", "#ffde01"], ["Scale houses", "2 cleared ahead", "#3A5FC0"], ["ETA", "14:32 today", "#fff"]].map(([k, v, c]) => (
          <div key={k} className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="text-[12px] text-white/40">{k}</span>
            <span className="text-[12px] font-medium" style={{ color: c }}>{v}</span>
          </div>
        ))}
      </div>
    ),
  },
];

const COMPARE_ROWS = [
  { feat: "50-state permit rules",   us: true,  manual: false, comp: false },
  { feat: "Real-time axle analysis", us: true,  manual: false, comp: true  },
  { feat: "Bridge formula checks",   us: true,  manual: false, comp: false },
  { feat: "Automated permit filing", us: true,  manual: false, comp: false },
  { feat: "Route optimization",      us: true,  manual: false, comp: true  },
  { feat: "API / integrations",      us: true,  manual: false, comp: false },
];
const Check = ({ ok }: { ok: boolean }) => ok
  ? <span style={{ color: "#22c55e", fontWeight: 700, fontSize: 16 }}>✓</span>
  : <span style={{ color: "#E53935", fontWeight: 700, fontSize: 16 }}>✕</span>;

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: "55vh", display: "flex", alignItems: "center" }}>
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src={asset("/toll-road.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(11,45,92,0.88) 0%,rgba(6,26,56,0.78) 50%,rgba(6,26,56,0.92) 100%)" }} />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-block text-[11px] uppercase tracking-[0.22em] font-semibold px-4 py-1.5 rounded-full mb-6" style={{ background: "rgba(255,222,1,0.12)", border: "1px solid rgba(255,222,1,0.3)", color: "#ffde01" }}>
              How it works
            </div>
            <h1 className="display text-white text-[44px] md:text-[64px] leading-[1.02]">How Dray Overweight Works.</h1>
            <p className="mt-6 text-white/70 text-[18px] max-w-2xl leading-relaxed">From load submission to permit delivery in under 60 seconds. Five steps, fully automated.</p>
          </div>
        </div>
      </section>

      {/* 5 STEPS */}
      {STEPS.map((step, i) => (
        <section key={step.n} className="py-20 relative overflow-hidden" style={{ background: i % 2 === 0 ? "#0B2D5C" : "#061A38" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
          <div className="max-w-[1400px] mx-auto px-6 relative">
            <div className={`grid lg:grid-cols-2 gap-14 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`} style={{ direction: i % 2 === 1 ? "rtl" : "ltr" }}>
              <div className="reveal" style={{ direction: "ltr" }}>
                <div className="display text-[56px] md:text-[72px] leading-none num mb-3" style={{ color: step.color, opacity: 0.2 }}>{step.n}</div>
                <h2 className="display text-white text-[28px] md:text-[40px] leading-[1.04] mt-1">{step.title}</h2>
                <p className="mt-5 text-white/60 text-[16px] leading-relaxed max-w-md">{step.desc}</p>
              </div>
              <div className="reveal reveal-d1" style={{ direction: "ltr" }}>
                {step.visual}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* COMPARISON */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#0B2D5C,#061A38)" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="reveal text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#ffde01" }}>Why DrayOW</div>
            <h2 className="display text-white text-[36px] md:text-[50px] leading-[1.04]">The only platform built end-to-end for overweight compliance.</h2>
          </div>
          <div className="reveal rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,222,1,0.15)" }}>
            <div className="grid grid-cols-4 text-[12px] font-bold uppercase tracking-[0.12em]" style={{ background: "#0B2D5C", borderBottom: "1px solid rgba(255,222,1,0.2)" }}>
              <div className="px-6 py-4 text-white/60">Feature</div>
              <div className="px-6 py-4 text-center" style={{ background: "rgba(255,222,1,0.1)", color: "#ffde01" }}>DrayOW ✦</div>
              <div className="px-6 py-4 text-center text-white/40">Manual</div>
              <div className="px-6 py-4 text-center text-white/40">Others</div>
            </div>
            {COMPARE_ROWS.map((r, i) => (
              <div key={r.feat} className="grid grid-cols-4 text-[13px]" style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="px-6 py-4 text-white/80 font-medium">{r.feat}</div>
                <div className="px-6 py-4 text-center" style={{ background: "rgba(255,222,1,0.04)" }}><Check ok={r.us} /></div>
                <div className="px-6 py-4 text-center"><Check ok={r.manual} /></div>
                <div className="px-6 py-4 text-center"><Check ok={r.comp} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API INTEGRATION */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#061A38" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: "#ffde01" }}>API integration</div>
              <h2 className="display text-white text-[32px] md:text-[44px] leading-[1.04]">Plug DrayOW into your TMS in minutes.</h2>
              <p className="mt-5 text-white/60 text-[15px] leading-relaxed max-w-md">Our REST API gives your TMS direct access to compliance checks, permit generation, route analysis, and state rule sets. SDKs for Python, Node.js, and Java included.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["REST API","Webhooks","Python SDK","Node.js SDK","Java SDK"].map(t => (
                  <span key={t} className="text-[12px] font-semibold px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,222,1,0.1)", border: "1px solid rgba(255,222,1,0.2)", color: "#ffde01" }}>{t}</span>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold text-[#0B2D5C]" style={{ background: "#ffde01" }}>
                  See API pricing <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </div>
            </div>
            <div className="reveal reveal-d1 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,222,1,0.15)" }}>
              <div className="flex items-center gap-2 px-5 py-3" style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["#E53935","#ffde01","#22c55e"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />)}
                <span className="ml-3 text-white/40 text-[12px] font-mono">POST /api/v1/compliance/check</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-loose" style={{ background: "rgba(0,0,0,0.35)" }}>
                <div className="text-white/30">{"{"}</div>
                <div className="ml-4"><span className="text-[#60a5fa]">&quot;load&quot;</span><span className="text-white/50">: {"{"}</span></div>
                <div className="ml-8"><span className="text-[#86efac]">&quot;origin&quot;</span><span className="text-white/50">: </span><span className="text-[#fcd34d]">&quot;Houston, TX&quot;</span><span className="text-white/50">,</span></div>
                <div className="ml-8"><span className="text-[#86efac]">&quot;destination&quot;</span><span className="text-white/50">: </span><span className="text-[#fcd34d]">&quot;Dallas, TX&quot;</span></div>
                <div className="ml-4 text-white/50">{"}"}</div>
                <div className="ml-4"><span className="text-[#60a5fa]">&quot;vehicle&quot;</span><span className="text-white/50">: {"{"}</span></div>
                <div className="ml-8"><span className="text-[#86efac]">&quot;axles&quot;</span><span className="text-white/50">: </span><span className="text-[#f9a8d4]">5</span><span className="text-white/50">,</span></div>
                <div className="ml-8"><span className="text-[#86efac]">&quot;gross_weight&quot;</span><span className="text-white/50">: </span><span className="text-[#f9a8d4]">95000</span></div>
                <div className="ml-4 text-white/50">{"}"}</div>
                <div className="text-white/30">{"}"}</div>
                <div className="mt-3 text-white/25">// ← Response (47ms):</div>
                <div className="text-white/30">{"{"}</div>
                <div className="ml-4"><span className="text-[#60a5fa]">&quot;permit&quot;</span><span className="text-white/50">: {"{"}</span></div>
                <div className="ml-8"><span className="text-[#86efac]">&quot;status&quot;</span><span className="text-white/50">: </span><span className="text-[#fcd34d]">&quot;issued&quot;</span><span className="text-white/50">,</span></div>
                <div className="ml-8"><span className="text-[#86efac]">&quot;states&quot;</span><span className="text-white/50">: [</span><span className="text-[#fcd34d]">&quot;TX&quot;</span><span className="text-white/50">],</span></div>
                <div className="ml-8"><span className="text-[#86efac]">&quot;issued_in&quot;</span><span className="text-white/50">: </span><span className="text-[#fcd34d]">&quot;47s&quot;</span></div>
                <div className="ml-4 text-white/50">{"}"}</div>
                <div className="text-white/30">{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0B2D5C 0%,#061A38 60%,#15448C 100%)" }}>
        <div className="max-w-[900px] mx-auto px-6 text-center reveal">
          <h2 className="display text-white text-[40px] md:text-[56px] leading-[1.03]">Ready to automate your permits?</h2>
          <p className="mt-5 text-white/60 text-[16px] max-w-xl mx-auto">No setup fee. API access included. Instant compliance from day one.</p>
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
