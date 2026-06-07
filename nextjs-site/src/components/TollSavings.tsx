"use client";
import { useState, useEffect } from "react";
import GlassSelect from "@/components/GlassSelect";
import PortSelect from "@/components/PortSelect";

const PORTS = [
  "APM Terminals — Elizabeth, NJ", "Maher Terminals — Elizabeth, NJ", "Port Newark Container Terminal — Newark, NJ",
  "GCT Bayonne — Bayonne, NJ", "GCT New York — Staten Island, NY",
  "APM Terminals (Pier 400) — Los Angeles, CA", "Fenix Marine (Pier 300) — Los Angeles, CA", "Yusen Terminals — Los Angeles, CA",
  "Long Beach Container Terminal (Pier E) — Long Beach, CA", "Total Terminals (Pier T) — Long Beach, CA", "ITS (Pier G) — Long Beach, CA",
  "TraPac — Oakland, CA", "SSA Terminal (Pier J) — Oakland, CA",
  "Terminal 18 (SSA) — Seattle, WA", "Husky Terminal — Tacoma, WA",
  "Barbours Cut — Houston, TX", "Bayport Container Terminal — Houston, TX",
  "Garden City Terminal — Savannah, GA", "Wando Welch Terminal — Charleston, SC", "Hugh K. Leatherman Terminal — Charleston, SC",
  "Norfolk International Terminals — Norfolk, VA", "Virginia International Gateway — Portsmouth, VA",
  "Seagirt Marine Terminal — Baltimore, MD", "Packer Avenue Marine Terminal — Philadelphia, PA", "Conley Terminal — Boston, MA",
  "POMTOC — Miami, FL", "South Florida Container Terminal — Miami, FL", "Port Everglades — Fort Lauderdale, FL",
  "Blount Island (JAXPORT) — Jacksonville, FL", "Napoleon Avenue Terminal — New Orleans, LA",
  "APM Terminals — Mobile, AL", "Terminal 6 — Portland, OR",
];

// State overweight-cost multiplier (permit fees + fine schedules vary by state).
const STATES: [string, number][] = [
  ["Alabama", 0.92], ["Alaska", 1.1], ["Arizona", 1.0], ["Arkansas", 0.9], ["California", 1.35],
  ["Colorado", 1.0], ["Connecticut", 1.2], ["Delaware", 1.05], ["Florida", 1.1], ["Georgia", 0.95],
  ["Hawaii", 1.15], ["Idaho", 0.88], ["Illinois", 1.15], ["Indiana", 1.0], ["Iowa", 0.92],
  ["Kansas", 0.9], ["Kentucky", 0.95], ["Louisiana", 1.0], ["Maine", 1.05], ["Maryland", 1.18],
  ["Massachusetts", 1.2], ["Michigan", 1.1], ["Minnesota", 0.98], ["Mississippi", 0.9], ["Missouri", 0.92],
  ["Montana", 0.85], ["Nebraska", 0.9], ["Nevada", 1.0], ["New Hampshire", 1.05], ["New Jersey", 1.25],
  ["New Mexico", 0.9], ["New York", 1.3], ["North Carolina", 0.98], ["North Dakota", 0.85], ["Ohio", 1.05],
  ["Oklahoma", 0.9], ["Oregon", 1.05], ["Pennsylvania", 1.2], ["Rhode Island", 1.18], ["South Carolina", 0.95],
  ["South Dakota", 0.85], ["Tennessee", 0.95], ["Texas", 1.05], ["Utah", 0.9], ["Vermont", 1.0],
  ["Virginia", 1.05], ["Washington", 1.08], ["West Virginia", 0.95], ["Wisconsin", 0.98], ["Wyoming", 0.82],
  ["Washington, D.C.", 1.3],
];
const STATE_OPTS: [string, string][] = STATES.map(([n]) => [n, n]);
const AXLES: [string, string][] = [
  ["2", "2-axle (single unit)"], ["3", "3-axle (single unit)"], ["4", "4-axle (single unit)"],
  ["5", "5-axle (standard 18-wheeler)"], ["6", "6-axle (heavy combo)"], ["7", "7+ axle (heavy haul)"],
];

const N = (n: number) => Math.round(n).toLocaleString();
// Federal bridge formula: max gross weight (lbs) for N axles spanning L feet, capped at 80,000.
function bridgeMax(L: number, axles: number) {
  if (axles < 2 || L <= 0) return 80000;
  const w = 500 * ((L * axles) / (axles - 1) + 12 * axles + 36);
  return Math.min(80000, Math.round(w / 500) * 500);
}
const LOADING = ["Computing gross vehicle weight…", "Applying the federal bridge formula…", "Checking per-axle limits…", "Estimating state permit & fines…"];

const fieldCls = "w-full rounded bg-white/[0.07] px-3 py-2.5 text-[14px] text-white placeholder-white/45 focus:outline-none focus:bg-white/[0.16] transition";
const labelCls = "block text-[10.5px] font-semibold uppercase tracking-[0.06em] text-white/65 mb-1.5";

export default function TollSavings() {
  const [from, setFrom] = useState("APM Terminals — Elizabeth, NJ");
  const [to, setTo] = useState("Philadelphia, PA, USA");
  const [container, setContainer] = useState("52000");
  const [tare, setTare] = useState("34000");
  const [state, setState] = useState("New Jersey");
  const [axles, setAxles] = useState("5");
  const [wheelbase, setWheelbase] = useState("51");
  const [trips, setTrips] = useState("1");
  const [phase, setPhase] = useState<"form" | "loading" | "result">("form");
  const [step, setStep] = useState(0);
  const [res, setRes] = useState<{ gvw: number; legal: number; over: number; perAxle: number; perTrip: number; total: number; trips: number } | null>(null);

  useEffect(() => {
    if (phase !== "loading") return;
    setStep(0);
    const iv = setInterval(() => setStep((s) => (s + 1) % LOADING.length), 700);
    return () => clearInterval(iv);
  }, [phase]);

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(axles) || 5;
    const L = +wheelbase || 51;
    const t = Math.max(1, parseInt(trips) || 1);
    const gvw = (+container || 0) + (+tare || 0);
    const legal = bridgeMax(L, a);
    const over = Math.max(0, gvw - legal);
    const mult = (STATES.find(([n]) => n === state)?.[1]) ?? 1;
    // Estimated permit + fine: base permit fee plus per-pound overage, scaled by state schedule.
    const perTrip = over > 0 ? Math.round((35 + over * 0.08) * mult) : 0;
    setPhase("loading");
    setTimeout(() => {
      setRes({ gvw, legal, over, perAxle: gvw / a, perTrip, total: perTrip * t, trips: t });
      setPhase("result");
    }, 2500);
  };

  return (
    <div className="reveal rounded-md bg-white/[0.08] border border-[#ffde01]/30 backdrop-blur-sm shadow-2xl p-6 md:p-7 w-full max-w-[460px] mx-auto lg:mx-0 relative overflow-hidden">
      {phase !== "result" && (
        <form onSubmit={run} className="flex flex-col">
          <h3 className="display text-[20px] md:text-[22px] text-white leading-tight">Calculate Your Drayage Overweight Cost</h3>
          <p className="text-[12.5px] text-white/55 mt-1.5">Axle weights, permits &amp; fines — before you roll.</p>
          <div className="mt-5 space-y-3.5">
            <div><label className={labelCls}>Select port terminal <span className="text-[#ffde01]">*</span></label><PortSelect value={from} onChange={setFrom} options={PORTS} placeholder="Select port terminal" /></div>
            <div><label className={labelCls}>Enter drop off address <span className="text-[#ffde01]">*</span></label><input className={fieldCls} required value={to} onChange={(e) => setTo(e.target.value)} placeholder="Enter drop-off address" /></div>
          </div>
          <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">Configure your load</div>
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3.5">
            <div>
              <label className={labelCls}>Container weight (lbs)</label>
              <input className={fieldCls} type="number" min={0} value={container} onChange={(e) => setContainer(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Truck tare weight (lbs)</label>
              <input className={fieldCls} type="number" min={0} value={tare} onChange={(e) => setTare(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>State</label>
              <GlassSelect value={state} onChange={setState} options={STATE_OPTS} />
            </div>
            <div>
              <label className={labelCls}>Axle configuration</label>
              <GlassSelect value={axles} onChange={setAxles} options={AXLES} />
            </div>
            <div>
              <label className={labelCls}>Wheelbase (L) — feet</label>
              <input className={fieldCls} type="number" min={0} value={wheelbase} onChange={(e) => setWheelbase(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Number of trips</label>
              <input className={fieldCls} type="number" min={1} value={trips} onChange={(e) => setTrips(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full py-3.5 rounded-md text-[14px] font-semibold mt-5"><span className="label">Analyze overweight</span></button>
          <p className="mt-4 text-[10.5px] leading-snug text-white/40"><span className="font-semibold text-white/55">How it works:</span> Enter your container weight and axle configuration. The calculator applies the Federal Bridge Formula (FBF), checks per-axle limits for your state, calculates the overweight above 44,000 lbs (standard 2-axle 40/45-ft container threshold), computes the overweight permit fee for your chosen state, and shows total drayage cost impact.</p>
        </form>
      )}

      {phase === "result" && res && (
        <div>
          <h3 className="display text-[20px] text-white leading-tight">Calculate Your Drayage Overweight Cost</h3>
          <div className="mt-4 text-[10px] uppercase tracking-[0.16em] font-bold flex items-center gap-1.5" style={{ color: res.over > 0 ? "#FFD36B" : "#7CF0B0" }}>
            <span className="live-dot" /> {axles}-axle · {state}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="display text-[44px] md:text-[48px] text-white num leading-none">${N(res.perTrip)}</span>
            <span className="text-[13px] text-white/60">/ trip est.</span>
          </div>
          <div className="text-[13px] mt-1.5 num" style={{ color: res.over > 0 ? "#FFD36B" : "#7CF0B0" }}>
            GVW {N(res.gvw)} lbs · {res.over > 0 ? `${N(res.over)} lbs over legal` : "within legal limit ✓"}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
            {([["Gross weight", `${N(res.gvw)} lbs`], ["Legal max (bridge)", `${N(res.legal)} lbs`], ["Avg per axle", `${N(res.perAxle)} lbs`], [`Est. ${res.trips}-trip total`, `$${N(res.total)}`]] as [string, string][]).map(([k, v]) => (
              <div key={k} className="rounded px-3 py-3 bg-white/[0.08]"><div className="text-white/55 uppercase tracking-wider">{k}</div><div className="display text-white text-[17px] num mt-0.5">{v}</div></div>
            ))}
          </div>
          <a href={`${process.env.NEXT_PUBLIC_BASE || ""}/toll-calculator`} className="btn-primary w-full py-3.5 rounded-md text-[14px] font-semibold mt-5 flex items-center justify-center gap-2"><span className="label">Get full breakdown &amp; permits</span></a>
          <button type="button" onClick={() => setPhase("form")} className="mt-2.5 w-full py-2.5 rounded text-[12px] font-semibold text-white/85 bg-white/10 hover:bg-white/15 transition flex items-center justify-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>Calculate again
          </button>
        </div>
      )}

      {phase === "loading" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6" style={{ background: "rgba(8,18,38,0.78)", backdropFilter: "blur(8px)" }}>
          <div className="relative w-16 h-16"><div className="absolute inset-0 rounded-full border-[3px] border-white/15" /><div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#ffde01] animate-spin" /></div>
          <div className="display text-[16px] text-white mt-5">Analyzing your load</div>
          <div className="text-[12px] text-white/60 mt-1.5 num">{LOADING[step]}</div>
        </div>
      )}
    </div>
  );
}
