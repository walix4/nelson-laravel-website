"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { asset } from "@/lib/site";

/* ── Team cards ─────────────────────────────────────────────────────────── */
const TEAM = [
  {
    title: "Engineering",
    desc: "5 engineers building the toll-rate engine, API infrastructure, and real-time pricing pipeline that keeps every route accurate.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Data Science",
    desc: "3 data scientists maintaining toll authority feeds, axle-class models, and congestion-price forecasting across 50K+ plazas.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 14l3-3 3 2 4-5" />
      </svg>
    ),
  },
  {
    title: "Freight Ops",
    desc: "2 ex-truckers who spent years behind the wheel — they make sure every rate reflects the real world, not a spreadsheet.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 17V7H2v10h2" />
        <path d="M14 9h4l4 4v4h-2" />
        <circle cx="7" cy="18" r="1.8" />
        <circle cx="17" cy="18" r="1.8" />
      </svg>
    ),
  },
];

/* ── Values ─────────────────────────────────────────────────────────────── */
const VALUES = [
  {
    label: "Accuracy",
    text: "We source rates directly from toll authorities and cross-validate every plaza to eliminate estimate drift before it hits your TMS.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Speed",
    text: "Sub-120ms API responses and a 15-minute toll-rate refresh cycle — your freight platform never runs on stale data.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    label: "Trust",
    text: "Enterprise SLAs, 99.9% uptime, and full audit logs — so freight platforms and owner-operators can build on us with confidence.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

/* ── Stats ───────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "50K+", label: "Toll plazas" },
  { value: "3,200+", label: "Routes" },
  { value: "6", label: "Axle classes" },
  { value: "99.9%", label: "API uptime" },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden text-white py-20 md:py-28"
        style={{ background: "linear-gradient(135deg,#0B2D5C 0%,#061A38 60%,#0f3060 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(700px 400px at 10% 50%,rgba(255,107,0,0.12),transparent 60%)" }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-5"
              style={{ background: "rgba(255,107,0,0.16)", border: "1px solid rgba(255,107,0,0.4)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] inline-block" />
              Our story
            </div>
            <h1 className="display text-white text-[40px] md:text-[62px] leading-[1.04]">
              About <span style={{ color: "#FF6B00" }}>DrayToll</span>
            </h1>
            <p className="mt-5 text-white/70 text-[16px] md:text-[18px] max-w-xl leading-relaxed">
              The commercial toll intelligence layer for North American freight.
            </p>
          </div>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Left */}
            <div className="reveal">
              <div
                className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4"
                style={{ color: "#FF6B00" }}
              >
                Our mission
              </div>
              <h2 className="display text-[32px] md:text-[44px] text-[var(--navy)] leading-[1.08]">
                We exist to eliminate toll guesswork from freight.
              </h2>
            </div>

            {/* Right */}
            <div className="reveal space-y-5 text-[15px] text-[var(--muted)] leading-relaxed">
              <p>
                DrayToll was founded in 2022 by a team of freight veterans and data engineers who were tired of watching
                fleets absorb thousands of dollars in unexpected toll charges every quarter. The problem wasn&apos;t that
                truckers didn&apos;t care — it was that accurate toll data for commercial vehicles simply didn&apos;t
                exist in a usable form.
              </p>
              <p>
                We built a toll intelligence engine that covers 50,000+ toll plazas across North America, priced by
                axle class, transponder type, time of day, and vehicle weight. Our platform feeds drayage TMS systems,
                freight brokers, and owner-operators with the same live data via a single API.
              </p>
              <p>
                Today, DrayToll powers toll calculations across intermodal rail-to-truck moves, port drayage lanes, and
                long-haul container freight — giving every stakeholder in the supply chain a clear, accurate picture of
                what every tolled mile actually costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ────────────────────────────────────────────────────── */}
      <section className="py-14" style={{ background: "#061A38" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div key={s.label} className={`reveal reveal-d${i} text-center`}>
                <div
                  className="display num text-[46px] md:text-[54px] leading-none font-extrabold"
                  style={{ color: "#FF6B00" }}
                >
                  {s.value}
                </div>
                <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24" style={{ background: "#F8FAFC" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <div
              className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3"
              style={{ color: "#FF6B00" }}
            >
              The team
            </div>
            <h2 className="display text-[32px] md:text-[44px] text-[var(--navy)] leading-[1.08]">
              Built by freight &amp; data engineers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((t, i) => (
              <div
                key={t.title}
                className={`reveal reveal-d${i} rounded-xl p-7 border border-[var(--navy)]/10 bg-white`}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(11,45,92,0.07)" }}
                >
                  {t.icon}
                </div>
                <h3 className="display text-[20px] text-[var(--navy)] mb-3">{t.title}</h3>
                <p className="text-[14px] text-[var(--muted)] leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <div
              className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3"
              style={{ color: "#FF6B00" }}
            >
              What we stand for
            </div>
            <h2 className="display text-[32px] md:text-[44px] text-[var(--navy)] leading-[1.08]">
              Our core values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <div
                key={v.label}
                className={`reveal reveal-d${i} rounded-xl p-7 border border-[var(--navy)]/10 bg-white`}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: "rgba(255,107,0,0.10)" }}
                >
                  {v.icon}
                </div>
                <h3 className="display text-[20px] text-[var(--navy)] mb-2">{v.label}</h3>
                <p className="text-[14px] text-[var(--muted)] leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-24 text-white"
        style={{ background: "linear-gradient(135deg,#0B2D5C 0%,#061A38 100%)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 text-center reveal">
          <h2 className="display text-[32px] md:text-[48px] leading-[1.08] text-white">
            Ready to price every toll on your route?
          </h2>
          <p className="mt-4 text-white/65 text-[15px] max-w-xl mx-auto leading-relaxed">
            Get access to the DrayToll API and start returning accurate class-aware toll estimates in under a minute.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold"
            >
              Get API Key
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/#quote"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              Try the calculator
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
