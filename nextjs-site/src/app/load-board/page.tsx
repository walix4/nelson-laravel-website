"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/* ─── Demo load data ─────────────────────────────────────────────────── */
const LOADS = [
  { id: "DG-4821", mode: "drayage", origin: "LA/Long Beach Port", dest: "Ontario, CA", terminal: "APM Terminal", container: "40' HC", weight: 42000, miles: 58, rate: 1850, avail: "Today", weather: "clear", status: "available", carrier_count: 3 },
  { id: "DG-4822", mode: "drayage", origin: "NY/NJ Port — Maher", dest: "Newark, NJ", terminal: "Maher Terminal", container: "20' Std", weight: 28000, miles: 12, rate: 650, avail: "Today", weather: "rain", status: "hot", carrier_count: 7 },
  { id: "DG-4823", mode: "intermodal", origin: "Savannah, GA — GPA", dest: "Atlanta, GA", terminal: "GPA Garden City", container: "40' Std", weight: 35000, miles: 246, rate: 2200, avail: "Tomorrow", weather: "clear", status: "available", carrier_count: 2 },
  { id: "DG-4824", mode: "drayage", origin: "Houston, TX — Bayport", dest: "Houston, TX", terminal: "Bayport Terminal", container: "45' HC", weight: 44500, miles: 34, rate: 1100, avail: "Today", weather: "clear", status: "available", carrier_count: 5 },
  { id: "DG-4825", mode: "port-port", origin: "Seattle, WA — T-18", dest: "Tacoma, WA — T-7", terminal: "SSA T-18", container: "20' Reefer", weight: 18000, miles: 28, rate: 980, avail: "Today", weather: "rain", status: "hot", carrier_count: 4 },
  { id: "DG-4826", mode: "drayage", origin: "Miami, FL — PortMiami", dest: "Medley, FL", terminal: "PortMiami — D", container: "40' HC", weight: 38000, miles: 22, rate: 875, avail: "Tomorrow", weather: "clear", status: "available", carrier_count: 1 },
  { id: "DG-4827", mode: "intermodal", origin: "Chicago, IL — BNSF", dest: "Indianapolis, IN", terminal: "BNSF Logistics Park", container: "53' Std", weight: 41000, miles: 184, rate: 1750, avail: "Jun 17", weather: "clear", status: "available", carrier_count: 2 },
  { id: "DG-4828", mode: "drayage", origin: "Norfolk, VA — NIT", dest: "Richmond, VA", terminal: "Norfolk Intl Terminal", container: "40' Std", weight: 30500, miles: 95, rate: 1200, avail: "Today", weather: "wind", status: "hot", carrier_count: 6 },
  { id: "DG-4829", mode: "drayage", origin: "Baltimore, MD — Seagirt", dest: "Frederick, MD", terminal: "Seagirt Marine", container: "20' Std", weight: 22000, miles: 62, rate: 890, avail: "Tomorrow", weather: "clear", status: "available", carrier_count: 3 },
  { id: "DG-4830", mode: "port-port", origin: "LA/Long Beach — TTI", dest: "LA/Long Beach — Trapac", terminal: "TTI Terminal", container: "40' HC", weight: 36500, miles: 8, rate: 420, avail: "Today", weather: "clear", status: "available", carrier_count: 2 },
  { id: "DG-4831", mode: "intermodal", origin: "Dallas, TX — Alliance", dest: "Memphis, TN", terminal: "BNSF Alliance", container: "40' Std", weight: 32000, miles: 468, rate: 3100, avail: "Jun 17", weather: "clear", status: "available", carrier_count: 1 },
  { id: "DG-4832", mode: "drayage", origin: "Charleston, SC — WTC", dest: "Greenville, SC", terminal: "Wando Welch", container: "45' HC", weight: 43000, miles: 218, rate: 2400, avail: "Tomorrow", weather: "clear", status: "hot", carrier_count: 5 },
];

const STATS = [
  { value: "247", label: "Active loads", live: true },
  { value: "83", label: "Carriers online", live: true },
  { value: "1,240", label: "Loads moved today", live: false },
  { value: "< 4 min", label: "Avg. claim time", live: false },
];

const WEATHER_ICON: Record<string, string> = { clear: "☀️", rain: "🌧️", snow: "❄️", wind: "💨" };

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  available: { label: "Available", bg: "#dcfce7", color: "#16a34a" },
  hot: { label: "High Demand", bg: "#fef3c7", color: "#d97706" },
  claimed: { label: "Claimed", bg: "#f1f5f9", color: "#64748b" },
};

const MODE_LABELS: Record<string, string> = {
  all: "All Loads",
  drayage: "Drayage",
  intermodal: "Intermodal",
  "port-port": "Port to Port",
};

/* ─── Post form ──────────────────────────────────────────────────────── */
function PostForm({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div className="text-center py-10">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#dcfce7" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
      </div>
      <h3 className="display text-[22px] text-[#08192b] mb-2">Load posted!</h3>
      <p className="text-[14px] text-[#64748b] mb-6">Carriers are being notified. You'll hear back in minutes.</p>
      <button onClick={onClose} className="px-6 py-2.5 rounded-lg text-[13px] font-semibold text-white" style={{ background: "#fc0b05" }}>Back to Board</button>
    </div>
  );
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[12px] font-semibold text-[#08192b] mb-1.5 uppercase tracking-wide">Pickup Terminal / Origin</label>
          <input required placeholder="e.g. LA/Long Beach — APM Terminal" className="w-full border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#fc0b05]" />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-[#08192b] mb-1.5 uppercase tracking-wide">Delivery Address</label>
          <input required placeholder="e.g. Ontario, CA 91761" className="w-full border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#fc0b05]" />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-[#08192b] mb-1.5 uppercase tracking-wide">Container Type</label>
          <select required className="w-full border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#fc0b05]">
            <option value="">Select type</option>
            <option>20&apos; Standard</option>
            <option>40&apos; Standard</option>
            <option>40&apos; High Cube</option>
            <option>45&apos; High Cube</option>
            <option>20&apos; Reefer</option>
            <option>40&apos; Reefer</option>
            <option>53&apos; Domestic</option>
          </select>
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-[#08192b] mb-1.5 uppercase tracking-wide">Gross Weight (lbs)</label>
          <input required type="number" placeholder="e.g. 42000" className="w-full border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#fc0b05]" />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-[#08192b] mb-1.5 uppercase tracking-wide">Available Date</label>
          <input required type="date" className="w-full border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#fc0b05]" />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-[#08192b] mb-1.5 uppercase tracking-wide">Move Type</label>
          <select required className="w-full border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#fc0b05]">
            <option value="">Select type</option>
            <option>Drayage</option>
            <option>Intermodal</option>
            <option>Port to Port</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-[#08192b] mb-1.5 uppercase tracking-wide">Target Rate (optional)</label>
        <input type="number" placeholder="e.g. 1850" className="w-full border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#fc0b05]" />
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-[#08192b] mb-1.5 uppercase tracking-wide">Special Instructions</label>
        <textarea rows={2} placeholder="Hazmat, overweight permit, chassis required, etc." className="w-full border border-[#e2e8f0] rounded-lg px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-[#fc0b05] resize-none" />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="flex-1 py-3 rounded-lg text-[14px] font-semibold text-white transition hover:opacity-90" style={{ background: "#fc0b05" }}>
          Post Load — Get Carrier Bids
        </button>
        <button type="button" onClick={onClose} className="px-5 py-3 rounded-lg text-[14px] font-semibold border border-[#e2e8f0] text-[#64748b] hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ─── Load card ──────────────────────────────────────────────────────── */
function LoadCard({ load, onClaim }: { load: typeof LOADS[0]; onClaim: (id: string) => void }) {
  const st = STATUS_CONFIG[load.status];
  return (
    <div className="bg-white rounded-2xl border border-[#e8edf5] hover:border-[#fc0b05]/30 hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Top bar */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#f1f5f9]">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-bold text-[#94a3b8] tracking-wider">{load.id}</span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(8,25,43,0.08)", color: "#08192b" }}>
            {load.mode === "port-port" ? "Port→Port" : load.mode === "intermodal" ? "Intermodal" : "Drayage"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base">{WEATHER_ICON[load.weather]}</span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: st.bg, color: st.color }}>
            {st.label}
          </span>
        </div>
      </div>

      {/* Route */}
      <div className="px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center pt-1 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-[#fc0b05]" />
            <div className="w-px h-8 bg-[#e2e8f0] my-1" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#08192b]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-[#08192b] truncate">{load.origin}</div>
            <div className="text-[11.5px] text-[#94a3b8] mt-0.5 mb-2 truncate">{load.terminal}</div>
            <div className="text-[13px] font-semibold text-[#08192b] truncate">{load.dest}</div>
          </div>
        </div>

        {/* Details row */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "Container", value: load.container },
            { label: "Weight", value: `${(load.weight / 1000).toFixed(0)}K lbs` },
            { label: "Distance", value: `${load.miles} mi` },
          ].map((d) => (
            <div key={d.label} className="rounded-lg px-2.5 py-2 text-center" style={{ background: "#f8fafc" }}>
              <div className="text-[10px] text-[#94a3b8] uppercase tracking-wide font-semibold">{d.label}</div>
              <div className="text-[13px] font-bold text-[#08192b] mt-0.5">{d.value}</div>
            </div>
          ))}
        </div>

        {/* Rate + action */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[#94a3b8] uppercase tracking-wide font-semibold">Rate</div>
            <div className="display text-[26px] font-extrabold leading-none num" style={{ color: "#fc0b05" }}>
              ${load.rate.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#94a3b8] mt-0.5">
              Avail: {load.avail} · {load.carrier_count} carrier{load.carrier_count !== 1 ? "s" : ""} interested
            </div>
          </div>
          <button
            onClick={() => onClaim(load.id)}
            className="px-5 py-2.5 rounded-xl text-[13px] font-bold text-white transition hover:opacity-90 active:scale-95"
            style={{ background: "#fc0b05" }}
          >
            Claim Load →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function LoadBoardPage() {
  const [mode, setMode] = useState("all");
  const [fDist, setFDist] = useState("any");
  const [fType, setFType] = useState("any");
  const [fWeight, setFWeight] = useState("any");
  const [showPost, setShowPost] = useState(false);
  const [claimed, setClaimed] = useState<string[]>([]);
  const [claimedId, setClaimedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return LOADS.filter((l) => {
      if (mode !== "all" && l.mode !== mode) return false;
      if (fDist === "short" && l.miles >= 100) return false;
      if (fDist === "mid" && (l.miles < 100 || l.miles > 500)) return false;
      if (fDist === "long" && l.miles <= 500) return false;
      if (fType !== "any" && !l.container.toLowerCase().includes(fType)) return false;
      if (fWeight === "lt20" && l.weight >= 20000) return false;
      if (fWeight === "20-40" && (l.weight < 20000 || l.weight > 40000)) return false;
      if (fWeight === "gt40" && l.weight <= 40000) return false;
      return true;
    });
  }, [mode, fDist, fType, fWeight]);

  const handleClaim = (id: string) => {
    setClaimedId(id);
    setTimeout(() => { setClaimed((p) => [...p, id]); setClaimedId(null); }, 1200);
  };

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 55%,#0d2240 100%)" }}>
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

      {/* ── BOARD ── */}
      <section className="py-8 md:py-12 min-h-screen" style={{ background: "#f1f5f9" }}>
        <div className="max-w-[1400px] mx-auto px-6">

          {/* Filter + post bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Mode tabs */}
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: "#e2e8f0" }}>
              {Object.entries(MODE_LABELS).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setMode(k)}
                  className="px-4 py-2 rounded-lg text-[13px] font-semibold transition-all whitespace-nowrap"
                  style={mode === k ? { background: "#08192b", color: "#fff" } : { color: "#64748b" }}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Filter dropdowns */}
            <div className="flex flex-wrap gap-2 flex-1">
              {[
                { label: "Distance", val: fDist, set: setFDist, opts: [["any","Any distance"],["short","< 100 mi"],["mid","100–500 mi"],["long","500+ mi"]] },
                { label: "Container", val: fType, set: setFType, opts: [["any","Any type"],["20","20' Std"],["40","40' HC"],["reefer","Reefer"],["53","53' Domestic"]] },
                { label: "Weight", val: fWeight, set: setFWeight, opts: [["any","Any weight"],["lt20","< 20K lbs"],["20-40","20–40K lbs"],["gt40","40K+ lbs"]] },
              ].map((f) => (
                <select
                  key={f.label}
                  value={f.val}
                  onChange={(e) => f.set(e.target.value)}
                  className="border border-[#e2e8f0] bg-white rounded-lg px-3.5 py-2 text-[13px] font-medium text-[#08192b] focus:outline-none focus:border-[#fc0b05] cursor-pointer"
                >
                  {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              ))}
            </div>

            {/* Post a load */}
            <button
              onClick={() => setShowPost(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-bold text-white whitespace-nowrap transition hover:opacity-90"
              style={{ background: "#fc0b05" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Post a Load
            </button>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-5">
            <div className="text-[13px] font-semibold text-[#64748b]">
              Showing <span className="text-[#08192b]">{filtered.length}</span> loads
              {mode !== "all" && <span> · {MODE_LABELS[mode]}</span>}
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[12px] text-[#94a3b8]">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] inline-block animate-pulse" />
              Live board
            </div>
          </div>

          {/* Post form modal */}
          {showPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(8,25,43,0.6)", backdropFilter: "blur(4px)" }}>
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="px-7 pt-7 pb-5 border-b border-[#f1f5f9] flex items-center justify-between">
                  <div>
                    <h2 className="display text-[22px] text-[#08192b]">Post a Load</h2>
                    <p className="text-[13px] text-[#64748b] mt-1">Carriers will be notified instantly. Average first bid in under 4 minutes.</p>
                  </div>
                  <button onClick={() => setShowPost(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
                <div className="px-7 py-6">
                  <PostForm onClose={() => setShowPost(false)} />
                </div>
              </div>
            </div>
          )}

          {/* Claim confirmation */}
          {claimedId && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-5 py-4 shadow-2xl" style={{ background: "#08192b" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#fc0b05" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <div>
                <div className="text-[13px] font-bold text-white">Load {claimedId} claimed!</div>
                <div className="text-[11px] text-white/60">Carrier packet sent to your email.</div>
              </div>
            </div>
          )}

          {/* Load grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-[48px] mb-4">📦</div>
              <h3 className="display text-[22px] text-[#08192b] mb-2">No loads match your filters</h3>
              <p className="text-[14px] text-[#64748b]">Try adjusting your filters or check back soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((load) => (
                claimed.includes(load.id)
                  ? null
                  : <LoadCard key={load.id} load={{ ...load, status: load.status }} onClaim={handleClaim} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>How it works</div>
            <h2 className="display text-[32px] md:text-[44px] text-[#08192b] leading-[1.08]">
              From post to delivery in hours
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* For shippers/brokers */}
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.16em] mb-6 pb-3 border-b border-[#f1f5f9]" style={{ color: "#fc0b05" }}>For Shippers & Brokers</div>
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

            {/* For carriers */}
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

      {/* ── TRUST ── */}
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
          <h2 className="display text-[32px] md:text-[48px] leading-[1.08] text-white">
            Ready to move your first load?
          </h2>
          <p className="mt-4 text-white/60 text-[15px] max-w-xl mx-auto leading-relaxed">
            Join thousands of shippers, brokers, and carriers already using DrayGo to move containers faster and cheaper.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowPost(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold text-white transition hover:opacity-90"
              style={{ background: "#fc0b05" }}
            >
              Post Your First Load Free
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
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
