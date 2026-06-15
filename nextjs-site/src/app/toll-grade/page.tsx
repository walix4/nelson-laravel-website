"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

const GRADES = [
  { letter: "A", range: "≤$0.10/mi", desc: "Low toll burden — minimal impact on freight cost.", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { letter: "B", range: "$0.10–0.18/mi", desc: "Moderate tolls — manageable with transponder discounts.", color: "#0d9488", bg: "#f0fdfa", border: "#99f6e4" },
  { letter: "C", range: "$0.18–0.28/mi", desc: "Elevated tolls — worth comparing alternate corridors.", color: "#ca8a04", bg: "#fefce8", border: "#fde047" },
  { letter: "D", range: "$0.28–0.40/mi", desc: "High toll burden — factor into rate quotes and load board bids.", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
  { letter: "F", range: ">$0.40/mi", desc: "Very high burden — re-route or negotiate toll allocation with shipper.", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
];

const STEPS = [
  "Calculate total tolled miles on the route using our lane-level road graph.",
  "Sum all plaza crossings by axle class, applying transponder discounts where applicable.",
  "Divide total toll cost by route miles to arrive at a per-mile toll rate.",
  "Assign grade A–F based on where the per-mile rate falls in the scale.",
];

const USE_CASES = [
  {
    title: "Dispatch Optimization",
    desc: "Surface route grade directly in your TMS — dispatchers see A–F at a glance before tendering a load.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <path d="M3 17.5h4M7 21v-7M7 14v-3.5H14" />
      </svg>
    ),
  },
  {
    title: "Carrier Selection",
    desc: "Let carriers self-select loads by grade tier — C and D loads attract different bids than A-rated corridors.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 17V7H2v10h2" />
        <path d="M14 9h4l4 4v4h-2" />
        <circle cx="7" cy="18" r="1.8" />
        <circle cx="17" cy="18" r="1.8" />
      </svg>
    ),
  },
  {
    title: "Budget Forecasting",
    desc: "Roll up monthly toll cost by grade band across all lanes — know exactly what your A, B, C, D routes cost each month.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
];

export default function TollGrade() {
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
            Route Grading
          </div>
          <h1 className="display text-white text-[40px] md:text-[58px] leading-[1.05]">
            Route Toll Grade
          </h1>
          <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">
            Every lane scored A–F so your dispatchers know the toll burden before committing.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#quote" className="btn-primary px-6 py-3.5 rounded-lg text-[14px] font-semibold inline-flex items-center gap-2">
              <span className="label">Grade my route</span>
            </Link>
            <Link
              href="/data-quality"
              className="px-6 py-3.5 rounded-lg text-[14px] text-white font-semibold"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              Data quality →
            </Link>
          </div>
        </div>
      </section>

      {/* GRADE SCALE */}
      <section className="py-20 md:py-24" style={{ background: "linear-gradient(180deg,#F6F8FB,#FFFFFF)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Grade Scale</div>
            <h2 className="display text-[32px] md:text-[42px] text-[var(--navy)] leading-[1.05] mt-2">
              The A–F toll grade system
            </h2>
            <p className="mt-4 text-[var(--muted)] text-[15px] max-w-xl mx-auto leading-relaxed">
              Every route is scored on a simple A-to-F scale based on the per-mile toll rate for your axle class.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {GRADES.map((g, i) => (
              <div
                key={g.letter}
                className={`reveal reveal-d${i} rounded-xl p-6 border flex flex-col gap-3`}
                style={{ background: g.bg, borderColor: g.border }}
              >
                <div
                  className="display text-[64px] leading-none"
                  style={{ color: g.color }}
                >
                  {g.letter}
                </div>
                <div
                  className="text-[13px] font-bold num"
                  style={{ color: g.color }}
                >
                  {g.range}
                </div>
                <p className="text-[12.5px] leading-relaxed" style={{ color: g.color + "cc" }}>
                  {g.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW GRADING WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Methodology</div>
            <h2 className="display text-[32px] md:text-[42px] text-[var(--navy)] leading-[1.05] mt-2">
              How grading works
            </h2>
          </div>
          <div className="mt-14 grid md:grid-cols-2 gap-12 items-start">
            {/* Steps */}
            <div className="reveal space-y-5">
              {STEPS.map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white display text-[15px]"
                    style={{ background: "var(--red)" }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-[14.5px] text-[var(--navy)]/80 leading-relaxed pt-1.5">{step}</p>
                </div>
              ))}
            </div>

            {/* Mock grade card */}
            <div className="reveal reveal-d1">
              <div className="rounded-xl border border-[var(--navy)]/10 bg-white overflow-hidden">
                {/* Card header */}
                <div
                  className="px-7 py-5"
                  style={{ background: "var(--navy)" }}
                >
                  <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-white/60 mb-1">
                    Sample route grade
                  </div>
                  <div className="display text-white text-[20px]">LA Port → Chicago</div>
                </div>

                {/* Grade badge */}
                <div className="px-7 py-6 flex items-center gap-6 border-b border-[var(--navy)]/8">
                  <div
                    className="shrink-0 w-20 h-20 rounded-xl flex items-center justify-center display text-[56px] leading-none"
                    style={{ background: "#f0fdfa", color: "#0d9488", border: "2px solid #99f6e4" }}
                  >
                    B
                  </div>
                  <div>
                    <div className="text-[13px] text-[var(--muted)] uppercase tracking-[0.14em] font-semibold mb-1">Toll Grade</div>
                    <div className="display text-[28px] text-[var(--navy)] num">$0.14<span className="text-[16px] text-[var(--muted)] font-normal">/mi</span></div>
                    <div
                      className="mt-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                      style={{ background: "rgba(13,148,136,0.1)", color: "#0d9488" }}
                    >
                      Moderate toll burden
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="px-7 py-6 grid grid-cols-3 gap-4">
                  {[
                    { label: "Total toll", value: "$126" },
                    { label: "Distance", value: "890 mi" },
                    { label: "Axle class", value: "5-axle" },
                  ].map((d) => (
                    <div key={d.label}>
                      <div className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-[var(--muted)]">{d.label}</div>
                      <div className="display text-[20px] text-[var(--navy)] num mt-0.5">{d.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section
        className="py-20 md:py-24"
        style={{ background: "linear-gradient(180deg,#F6F8FB,#EEF4F9)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Use Cases</div>
            <h2 className="display text-[32px] md:text-[42px] text-[var(--navy)] leading-[1.05] mt-2">
              Where toll grades save money
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {USE_CASES.map((u, i) => (
              <div key={u.title} className={`reveal reveal-d${i} rounded-xl p-7 border border-[var(--navy)]/10 bg-white flex flex-col gap-5`}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ background: "var(--red)" }}
                >
                  {u.icon}
                </div>
                <div>
                  <div className="display text-[18px] text-[var(--navy)]">{u.title}</div>
                  <p className="text-[13.5px] text-[var(--muted)] mt-2 leading-relaxed">{u.desc}</p>
                </div>
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
            See your route's grade now
          </h2>
          <p className="mt-4 text-white/70 text-[15px] md:text-[16px] max-w-xl mx-auto leading-relaxed">
            Enter any origin and destination to instantly see toll grade, per-mile rate, and full plaza breakdown — by your axle class.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#quote" className="btn-primary px-6 py-3.5 rounded-lg text-[14px] font-semibold inline-flex items-center gap-2">
              <span className="label">Open toll calculator</span>
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-lg text-[14px] text-white font-semibold"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              View API pricing →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
