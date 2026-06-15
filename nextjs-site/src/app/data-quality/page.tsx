"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

const COVERAGE = [
  { region: "Northeast", plazas: "1,240", axles: "2–6", freq: "15 min", acc: "99.1%" },
  { region: "Southeast", plazas: "820",   axles: "2–6", freq: "15 min", acc: "98.4%" },
  { region: "Midwest",   plazas: "640",   axles: "2–5", freq: "30 min", acc: "97.8%" },
  { region: "Southwest", plazas: "510",   axles: "2–6", freq: "15 min", acc: "99.3%" },
  { region: "West Coast",plazas: "920",   axles: "2–6", freq: "15 min", acc: "98.9%" },
];

const STEPS = [
  {
    n: "1",
    title: "Source Ingestion",
    desc: "Live feeds pulled directly from 50+ toll authorities — agency portals, published tariff APIs, and proprietary data partnerships updated continuously.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    n: "2",
    title: "Cross-Validation",
    desc: "Machine learning models cross-check every incoming rate against 24 months of historical data, flagging anomalies for immediate review before publication.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    n: "3",
    title: "Certification",
    desc: "Human freight experts review every edge case — oversize permits, managed lanes, and peak-pricing windows — before rates are certified and released to production.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const SLA = [
  { label: "Uptime SLA", value: "99.9%", sub: "Guaranteed production availability" },
  { label: "Latency p99",value: "<80ms",  sub: "API response at the 99th percentile" },
  { label: "Data freshness", value: "<15min", sub: "Maximum age of any published rate" },
];

export default function DataQuality() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section
        className="relative overflow-hidden text-white py-20 md:py-28"
        style={{ background: "linear-gradient(135deg,#0B2D5C 0%,#061A38 60%,#0f3060 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(700px 400px at 10% 50%,rgba(255,107,0,0.12),transparent 60%)" }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
          <div
            className="inline-flex items-center rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-6"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            Data Quality
          </div>
          <h1 className="display text-white text-[40px] md:text-[58px] leading-[1.05]">
            Commercial Data Quality
          </h1>
          <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">
            How we verify, update, and certify every toll rate in our network.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/pricing" className="btn-primary px-6 py-3.5 rounded-lg text-[14px] font-semibold inline-flex items-center gap-2">
              <span className="label">See API pricing</span>
            </Link>
            <Link
              href="/tools/ports"
              className="px-6 py-3.5 rounded-lg text-[14px] text-white font-semibold"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              Browse coverage →
            </Link>
          </div>
        </div>
      </section>

      {/* QUALITY SCORE BANNER */}
      <section className="py-14" style={{ background: "#061A38" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div
            className="reveal rounded-xl px-10 py-12 text-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)] mb-4">
              Network accuracy
            </div>
            <div className="display text-white text-[72px] md:text-[96px] leading-none num">
              98.7%
            </div>
            <div className="text-[18px] font-semibold text-white/80 mt-3">Data Accuracy</div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-6 text-[13.5px] text-white/55">
              <span>Updated every 15 minutes</span>
              <span className="text-white/25">·</span>
              <span>50,000+ toll points</span>
              <span className="text-white/25">·</span>
              <span>6 axle classes</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE COLLECT DATA */}
      <section className="py-20 md:py-24" style={{ background: "linear-gradient(180deg,#F6F8FB,#FFFFFF)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Methodology</div>
            <h2 className="display text-[32px] md:text-[42px] text-[var(--navy)] leading-[1.05] mt-2">
              How we collect and verify data
            </h2>
            <p className="mt-4 text-[var(--muted)] text-[15px] max-w-xl mx-auto leading-relaxed">
              A three-stage pipeline ensures every rate you receive is accurate, fresh, and freight-ready.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6 relative">
            {/* connector line */}
            <div
              className="absolute hidden md:block top-14 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px"
              style={{ background: "linear-gradient(90deg,var(--red),rgba(255,107,0,0.2))" }}
            />
            {STEPS.map((s, i) => (
              <div key={s.title} className={`reveal reveal-d${i} rounded-xl p-7 border border-[var(--navy)]/10 bg-white flex flex-col gap-5`}>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ background: "var(--red)" }}
                  >
                    {s.icon}
                  </div>
                  <div
                    className="display text-[40px] leading-none num"
                    style={{ color: "rgba(11,45,92,0.08)" }}
                  >
                    {s.n}
                  </div>
                </div>
                <div>
                  <div className="display text-[18px] text-[var(--navy)]">{s.title}</div>
                  <p className="text-[13.5px] text-[var(--muted)] mt-2 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE TABLE */}
      <section className="py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Coverage</div>
            <h2 className="display text-[32px] md:text-[42px] text-[var(--navy)] leading-[1.05] mt-2">
              Regional coverage breakdown
            </h2>
          </div>
          <div className="mt-10 reveal overflow-x-auto rounded-xl border border-[var(--navy)]/10">
            <table className="w-full text-left">
              <thead>
                <tr style={{ background: "var(--navy)" }}>
                  {["Region", "Toll Plazas", "Axle Classes", "Update Freq", "Accuracy"].map((h) => (
                    <th key={h} className="px-6 py-4 text-[11px] uppercase tracking-[0.16em] font-bold text-white/70 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COVERAGE.map((row, i) => (
                  <tr
                    key={row.region}
                    className="border-t border-[var(--navy)]/8"
                    style={{ background: i % 2 === 0 ? "#fff" : "#F8FAFC" }}
                  >
                    <td className="px-6 py-4 display text-[15px] text-[var(--navy)]">{row.region}</td>
                    <td className="px-6 py-4 text-[14px] num text-[var(--navy)]/80">{row.plazas}</td>
                    <td className="px-6 py-4 text-[14px] text-[var(--navy)]/80">{row.axles}</td>
                    <td className="px-6 py-4 text-[14px] text-[var(--navy)]/80">{row.freq}</td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold"
                        style={{ background: "rgba(255,107,0,0.1)", color: "var(--red)" }}
                      >
                        {row.acc}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SLA CARDS */}
      <section
        className="py-20 md:py-24"
        style={{ background: "linear-gradient(180deg,#F6F8FB,#EEF4F9)" }}
      >
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">SLA</div>
            <h2 className="display text-[32px] md:text-[42px] text-[var(--navy)] leading-[1.05] mt-2">
              Our service commitments
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {SLA.map((s, i) => (
              <div key={s.label} className={`reveal reveal-d${i} rounded-xl p-8 border border-[var(--navy)]/10 bg-white text-center`}>
                <div className="display text-[52px] leading-none num" style={{ color: "var(--red)" }}>
                  {s.value}
                </div>
                <div className="display text-[17px] text-[var(--navy)] mt-3">{s.label}</div>
                <p className="text-[13px] text-[var(--muted)] mt-2 leading-relaxed">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden text-white py-24"
        style={{ background: "radial-gradient(700px 400px at 85% 50%,rgba(255,107,0,0.25),transparent 60%),radial-gradient(600px 400px at 10% 80%,rgba(58,95,192,0.25),transparent 60%),linear-gradient(135deg,#0B2D5C,#061A38 60%,#15448C)" }}
      >
        <div className="max-w-[820px] mx-auto px-6 text-center reveal relative">
          <h2 className="display text-white text-[36px] md:text-[48px] leading-[1.05]">
            Start with accurate toll data today
          </h2>
          <p className="mt-4 text-white/70 text-[15px] md:text-[16px] max-w-xl mx-auto leading-relaxed">
            Give your dispatchers, TMS, and rating engines toll data they can trust — down to the axle class and plaza.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/pricing" className="btn-primary px-6 py-3.5 rounded-lg text-[14px] font-semibold inline-flex items-center gap-2">
              <span className="label">View pricing</span>
            </Link>
            <Link
              href="/#quote"
              className="px-6 py-3.5 rounded-lg text-[14px] text-white font-semibold"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              Try toll calculator →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
