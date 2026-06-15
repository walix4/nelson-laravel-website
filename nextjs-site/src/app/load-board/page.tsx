"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/* ─── Demo load data (shown blurred behind gate) ────────────────────── */
const LOADS = [
  { id: "DG-4821", mode: "Drayage",    origin: "LA/Long Beach",  dest: "Ontario, CA",      container: "40' HC",  rate: 1850, avail: "Today",    status: "hot" },
  { id: "DG-4822", mode: "Drayage",    origin: "NY/NJ Port",     dest: "Newark, NJ",       container: "20' Std", rate: 650,  avail: "Today",    status: "available" },
  { id: "DG-4823", mode: "Intermodal", origin: "Savannah, GA",   dest: "Atlanta, GA",      container: "40' Std", rate: 2200, avail: "Tomorrow", status: "available" },
  { id: "DG-4824", mode: "Drayage",    origin: "Houston, TX",    dest: "Houston, TX",      container: "45' HC",  rate: 1100, avail: "Today",    status: "available" },
  { id: "DG-4825", mode: "Port→Port",  origin: "Seattle, WA",    dest: "Tacoma, WA",       container: "20' Rfr", rate: 980,  avail: "Today",    status: "hot" },
  { id: "DG-4826", mode: "Drayage",    origin: "Miami, FL",      dest: "Medley, FL",       container: "40' HC",  rate: 875,  avail: "Tomorrow", status: "available" },
  { id: "DG-4827", mode: "Intermodal", origin: "Chicago, IL",    dest: "Indianapolis, IN", container: "53' Std", rate: 1750, avail: "Jun 17",   status: "available" },
  { id: "DG-4828", mode: "Drayage",    origin: "Norfolk, VA",    dest: "Richmond, VA",     container: "40' Std", rate: 1200, avail: "Today",    status: "hot" },
  { id: "DG-4829", mode: "Drayage",    origin: "Baltimore, MD",  dest: "Frederick, MD",    container: "20' Std", rate: 890,  avail: "Tomorrow", status: "available" },
  { id: "DG-4830", mode: "Port→Port",  origin: "LA/LB — TTI",   dest: "LA/LB — Trapac",   container: "40' HC",  rate: 420,  avail: "Today",    status: "available" },
  { id: "DG-4831", mode: "Intermodal", origin: "Dallas, TX",     dest: "Memphis, TN",      container: "40' Std", rate: 3100, avail: "Jun 17",   status: "available" },
  { id: "DG-4832", mode: "Drayage",    origin: "Charleston, SC", dest: "Greenville, SC",   container: "45' HC",  rate: 2400, avail: "Tomorrow", status: "hot" },
];

const STATS = [
  { value: "247",     label: "Active loads",     live: true },
  { value: "83",      label: "Carriers online",  live: true },
  { value: "1,240",   label: "Loads moved today", live: false },
  { value: "< 4 min", label: "Avg. claim time",  live: false },
];

/* ─── Ghost card (blurred, locked) ──────────────────────────────────── */
function GhostCard({ load }: { load: typeof LOADS[0] }) {
  const isHot = load.status === "hot";
  return (
    <div
      className="relative rounded-xl overflow-hidden select-none"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        aspectRatio: "1 / 1",
      }}
    >
      {/* Blurred content underneath */}
      <div
        className="absolute inset-0 p-4 flex flex-col justify-between"
        style={{ filter: "blur(3px)", opacity: 0.45, userSelect: "none", pointerEvents: "none" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-white/60 tracking-wider">{load.id}</span>
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{
              background: isHot ? "rgba(251,191,36,0.25)" : "rgba(74,222,128,0.20)",
              color: isHot ? "#fbbf24" : "#4ade80",
            }}
          >
            {isHot ? "High Demand" : "Available"}
          </span>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-[0.14em] text-white/40 mb-1">{load.mode}</div>
          <div className="text-[12px] font-semibold text-white leading-snug">{load.origin}</div>
          <div className="text-white/25 text-[10px] my-1">↓</div>
          <div className="text-[12px] font-semibold text-white leading-snug">{load.dest}</div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[9px] text-white/40 uppercase tracking-wide">{load.container}</div>
            <div className="text-[9px] text-white/30">{load.avail}</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-white/40 uppercase tracking-wide">Rate</div>
            <div className="text-[18px] font-extrabold text-white leading-none">${load.rate.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Lock icon overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(252,11,5,0.20)", border: "1px solid rgba(252,11,5,0.40)" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <span className="text-[10px] font-semibold text-white/45">Sign in to view</span>
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function LoadBoardPage() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 55%,#0d2240 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 5% 70%,rgba(252,11,5,0.10),transparent 60%)" }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-14 pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-[11px] font-bold mb-4" style={{ background: "rgba(252,11,5,0.18)", border: "1px solid rgba(252,11,5,0.4)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#fc0b05] animate-pulse inline-block" />
                LIVE · Updated every 60 seconds
              </div>
              <h1 className="display text-white text-[38px] md:text-[54px] leading-[1.05]">
                DrayGo <span style={{ color: "#fc0b05" }}>Load Board</span>
              </h1>
              <p className="mt-4 text-white/70 text-[15px] md:text-[17px] max-w-xl leading-relaxed">
                The live drayage marketplace. Find verified loads from top brokers and shippers — or post your own and get carrier bids in minutes.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold text-white transition hover:opacity-90"
                  style={{ background: "#fc0b05" }}
                >
                  Create Free Account
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold border text-white hover:bg-white/10 transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.22)" }}
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Live stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl px-5 py-4 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    {s.live && <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse inline-block" />}
                    <span className="display num text-[24px] md:text-[28px] font-extrabold text-white leading-none">{s.value}</span>
                  </div>
                  <div className="text-[11px] text-white/50 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE JOBS ── */}
      <section
        className="relative py-12 md:py-16"
        style={{ background: "linear-gradient(180deg,#06143A 0%,#08192b 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px 600px at 80% 50%,rgba(252,11,5,0.07),transparent 60%)" }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          {/* Row header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse inline-block" />
              <span className="text-white font-semibold text-[15px]">Live Jobs</span>
              <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(252,11,5,0.20)", color: "#fc0b05" }}>247 active</span>
            </div>
            <span className="text-[12px] text-white/40">Updated just now</span>
          </div>

          {/* Square ghost cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {LOADS.map((load) => (
              <GhostCard key={load.id} load={load} />
            ))}
          </div>

          {/* Gate banner */}
          <div
            className="mt-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-7"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(252,11,5,0.18)", border: "1px solid rgba(252,11,5,0.35)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold text-[15px]">Sign in to see live load details</div>
                <div className="text-white/50 text-[13px] mt-0.5">247 loads available right now · rates, terminals, container numbers &amp; carrier contacts</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-bold text-white transition hover:opacity-90 whitespace-nowrap"
                style={{ background: "#fc0b05" }}
              >
                Create Free Account
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-semibold border text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                style={{ borderColor: "rgba(255,255,255,0.22)" }}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 md:py-24" style={{ background: "#f8fafc" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>How it works</div>
            <h2 className="display text-[32px] md:text-[44px] text-[#08192b] leading-[1.08]">From post to delivery in hours</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.16em] mb-6 pb-3 border-b border-[#f1f5f9]" style={{ color: "#fc0b05" }}>For Shippers &amp; Brokers</div>
              <div className="space-y-6">
                {[
                  { n: "1", t: "Post your load", d: "Enter origin terminal, delivery address, container type, and weight. Takes 60 seconds." },
                  { n: "2", t: "Get carrier bids", d: "Verified carriers on the DrayGo network are notified instantly. First bids arrive in minutes." },
                  { n: "3", t: "Confirm & dispatch", d: "Accept a bid, sign the rate confirmation digitally, and the carrier is dispatched with full job details." },
                  { n: "4", t: "Track & invoice", d: "Live GPS tracking from gate-out to delivery. Digital POD, BOL, and automated invoicing." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-[13px] font-bold" style={{ background: "#fc0b05" }}>{s.n}</div>
                    <div>
                      <div className="text-[15px] font-semibold text-[#08192b]">{s.t}</div>
                      <p className="text-[13.5px] text-[#64748b] mt-1 leading-relaxed">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.16em] mb-6 pb-3 border-b border-[#f1f5f9]" style={{ color: "#08192b" }}>For Carriers</div>
              <div className="space-y-6">
                {[
                  { n: "1", t: "Browse live loads", d: "Filter by location, container type, distance, and rate. See loads the moment they're posted." },
                  { n: "2", t: "Claim in one tap", d: "Hit Claim Load and receive the full job packet — terminal name, container number, contacts — instantly." },
                  { n: "3", t: "Complete & submit POD", d: "Deliver the load, get the proof of delivery signed, and upload it from your phone." },
                  { n: "4", t: "Get paid in 48h", d: "DrayGo processes carrier payments within 48 hours of approved POD. No net-30 wait." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-[13px] font-bold" style={{ background: "#08192b" }}>{s.n}</div>
                    <div>
                      <div className="text-[15px] font-semibold text-[#08192b]">{s.t}</div>
                      <p className="text-[13.5px] text-[#64748b] mt-1 leading-relaxed">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAND ── */}
      <section className="py-16" style={{ background: "#08192b" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[["$0","To post a load"],["500+","Verified carriers"],["48h","Carrier payment"],["99%","Load coverage"]].map(([v,l]) => (
              <div key={l}>
                <div className="display num text-[38px] md:text-[46px] leading-none font-extrabold" style={{ color: "#fc0b05" }}>{v}</div>
                <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/55">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 text-white" style={{ background: "linear-gradient(135deg,#06143A 0%,#08192b 100%)" }}>
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h2 className="display text-[32px] md:text-[48px] leading-[1.08] text-white">Ready to move your first load?</h2>
          <p className="mt-4 text-white/60 text-[15px] max-w-xl mx-auto leading-relaxed">
            Join thousands of shippers, brokers, and carriers already using DrayGo to move containers faster and cheaper.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold text-white transition hover:opacity-90" style={{ background: "#fc0b05" }}>
              Create Free Account
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <Link href="/carriers" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors">
              Join as Carrier
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
