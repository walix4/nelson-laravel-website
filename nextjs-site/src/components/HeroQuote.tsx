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
const CONTAINER: [string, string][] = [["dry", "Dry Container"], ["reefer", "Reefer"], ["opentop", "Open Top"], ["flatrack", "Flat Rack"], ["tank", "Tank"]];
const TRIP: [string, string][] = [["round", "Round Trip"], ["oneway", "One Way"]];
const SIZE: [string, string][] = [["20", "20' Standard"], ["40", "40' Standard"], ["40hc", "40' High Cube"], ["45hc", "45' High Cube"]];
const WCLASS: [string, string][] = [["5", "5K lbs"], ["10", "10K lbs"], ["20", "20K lbs"], ["32", "32K lbs"], ["44", "44K lbs"]];
const MODES: [string, string][] = [["drayage", "Drayage"], ["porttoport", "Port To Port"], ["intermodal", "Intermodal"]];

const GEO: [string, [number, number]][] = [
  ["elizabeth", [40.666, -74.211]], ["newark", [40.7357, -74.1724]], ["bayonne", [40.6687, -74.1143]], ["staten island", [40.5795, -74.1502]],
  ["new york", [40.7128, -74.006]], ["philadelphia", [39.9526, -75.1652]], ["baltimore", [39.2904, -76.6122]], ["boston", [42.3601, -71.0589]],
  ["portsmouth", [36.8354, -76.2983]], ["norfolk", [36.8508, -76.2859]], ["los angeles", [34.0522, -118.2437]], ["long beach", [33.77, -118.19]],
  ["oakland", [37.8044, -122.2712]], ["seattle", [47.6062, -122.3321]], ["tacoma", [47.2529, -122.4443]], ["portland", [45.5152, -122.6784]],
  ["houston", [29.7604, -95.3698]], ["savannah", [32.0809, -81.0912]], ["charleston", [32.7765, -79.9311]], ["miami", [25.7617, -80.1918]],
  ["fort lauderdale", [26.1224, -80.1373]], ["jacksonville", [30.3322, -81.6557]], ["new orleans", [29.9511, -90.0715]], ["mobile", [30.6954, -88.0399]],
  ["dallas", [32.7767, -96.797]], ["atlanta", [33.749, -84.388]], ["chicago", [41.8781, -87.6298]], ["denver", [39.7392, -104.9903]],
  ["phoenix", [33.4484, -112.074]], ["nashville", [36.1627, -86.7816]], ["memphis", [35.1495, -90.049]], ["orlando", [28.5383, -81.3792]],
  ["richmond", [37.5407, -77.436]], ["pittsburgh", [40.4406, -79.9959]], ["columbus", [39.9612, -82.9988]], ["indianapolis", [39.7684, -86.1581]],
];
const geocode = (t: string): [number, number] | null => {
  const l = t.toLowerCase();
  const hit = [...GEO].sort((a, b) => b[0].length - a[0].length).find(([k]) => l.includes(k));
  return hit ? hit[1] : null;
};
function hav(a: [number, number], b: [number, number]) { const R = 3958.8, t = (v: number) => (v * Math.PI) / 180; const dL = t(b[0] - a[0]), dG = t(b[1] - a[1]); const x = Math.sin(dL / 2) ** 2 + Math.cos(t(a[0])) * Math.cos(t(b[0])) * Math.sin(dG / 2) ** 2; return 2 * R * Math.asin(Math.min(1, Math.sqrt(x))); }
const SIZE_MULT: Record<string, number> = { "20": 0.9, "40": 1, "40hc": 1.06, "45hc": 1.12 };
const CONT_MULT: Record<string, number> = { dry: 1, reefer: 1.18, opentop: 1.08, flatrack: 1.1, tank: 1.14 };
const N = (n: number) => n.toLocaleString();
const LOADING = ["Geocoding route…", "Pulling live diesel + FSC…", "Pricing chassis & port fees…", "Sealing the rate…"];

const labelCls = "block text-[10.5px] font-semibold uppercase tracking-[0.06em] text-white/65 mb-1.5";
const fieldCls = "w-full rounded bg-white/[0.07] px-3 py-2.5 text-[14px] text-white placeholder-white/45 focus:outline-none focus:bg-white/[0.16] transition";

export default function HeroQuote() {
  const [mode, setMode] = useState<string | null>(null);
  const [dir, setDir] = useState<string | null>(null);
  const [from, setFrom] = useState("APM Terminals — Elizabeth, NJ");
  const [to, setTo] = useState("Philadelphia, PA, USA");
  const [container, setContainer] = useState("dry");
  const [trip, setTrip] = useState("round");
  const [size, setSize] = useState("40hc");
  const [wclass, setWclass] = useState("5");
  const [phase, setPhase] = useState<"form" | "loading" | "result">("form");
  const [step, setStep] = useState(0);
  const [res, setRes] = useState<{ total: number; miles: number; fuel: number; labor: number; chassis: number; port: number } | null>(null);

  useEffect(() => {
    if (phase !== "loading") return;
    setStep(0);
    const iv = setInterval(() => setStep((s) => (s + 1) % LOADING.length), 750);
    return () => clearInterval(iv);
  }, [phase]);

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    const oc = geocode(from) ?? [40.666, -74.211], dc = geocode(to) ?? [39.9526, -75.1652];
    const miles = Math.max(hav(oc, dc), 8);
    const legs = trip === "round" ? 2 : 1;
    const modeMult = mode === "porttoport" ? 0.82 : mode === "intermodal" ? 0.91 : 1;
    const mult = (SIZE_MULT[size] ?? 1) * (CONT_MULT[container] ?? 1) * modeMult;
    const weightLbs = (parseInt(wclass) || 5) * 1000;
    const fuel = (miles / 7) * 5.18 * 1.17 * legs;
    const labor = (miles / 50 + 2.5) * 28 * legs;
    const chassis = 40 * Math.max(1, Math.ceil(miles / 300)) + (size === "45hc" ? 20 : 0);
    const port = 75 + (weightLbs > 40000 ? 60 : 0) + (container === "reefer" ? 45 : 0);
    const overhead = 160;
    const base = (fuel + labor + chassis + port + overhead) * mult;
    setPhase("loading");
    setTimeout(() => {
      setRes({ total: Math.round(base * 1.2), miles: Math.round(miles), fuel: Math.round(fuel * mult), labor: Math.round(labor * mult), chassis: Math.round(chassis * mult), port: Math.round((port + overhead) * mult) });
      setPhase("result");
    }, 2600);
  };

  return (
    <div className="reveal rounded-lg bg-white/[0.08] border border-[var(--red)]/30 backdrop-blur-sm shadow-2xl p-6 md:p-7 w-full max-w-[460px] mx-auto lg:mx-0 relative overflow-hidden">
      {phase !== "result" && (
        <form onSubmit={run} className="flex flex-col">
          <h3 className="display text-[20px] md:text-[22px] text-white leading-tight">Get instant quote</h3>
          <p className="text-[12.5px] text-white/55 mt-1.5">Price a container move from port gate to door.</p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {MODES.map(([v, l]) => {
              const base = "rounded-md py-2.5 text-[12px] font-semibold border backdrop-blur-sm transition";
              const onCls = "bg-[var(--red)]/25 border-[var(--red)] text-white shadow-[0_8px_20px_-8px_rgba(255,59,48,0.7)]";
              const offCls = "bg-white/[0.06] border-white/15 text-white/70 hover:bg-white/[0.12] hover:text-white";
              if (!mode) return <button type="button" key={v} onClick={() => { setMode(v); setDir(null); setTo(v === "porttoport" ? "Packer Avenue Marine Terminal — Philadelphia, PA" : "Philadelphia, PA, USA"); }} className={`${base} ${offCls}`}>{l}</button>;
              if (v === mode) return <button type="button" key={v} onClick={() => { setMode(null); setDir(null); setTo("Philadelphia, PA, USA"); }} className={`${base} ${onCls}`}>{l}</button>;
              const others = MODES.filter(([mv]) => mv !== mode).map(([mv]) => mv);
              const isImport = others[0] === v;
              const dv = isImport ? "import" : "export";
              return <button type="button" key={v} onClick={() => setDir(dv)} className={`${base} ${dir === dv ? onCls : offCls}`}>{isImport ? "Import" : "Export"}</button>;
            })}
          </div>
          <div className="mt-4 space-y-3.5">
            <div><label className={labelCls}>{mode === "porttoport" ? "Origin port terminal" : "Select port terminal"} <span className="text-[var(--red)]">*</span></label><PortSelect value={from} onChange={setFrom} options={PORTS} placeholder="Select port terminal" /></div>
            <div>
              <label className={labelCls}>{mode === "porttoport" ? "Destination port terminal" : mode === "intermodal" ? "Destination rail ramp / address" : "Enter drop off address"} <span className="text-[var(--red)]">*</span></label>
              {mode === "porttoport"
                ? <PortSelect value={to} onChange={setTo} options={PORTS} placeholder="Select destination port" />
                : <input className={fieldCls} required value={to} onChange={(e) => setTo(e.target.value)} placeholder={mode === "intermodal" ? "Enter rail ramp or address" : "Enter drop-off address"} />}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3.5">
            <div><label className={labelCls}>Container type</label><GlassSelect value={container} onChange={setContainer} options={CONTAINER} /></div>
            <div><label className={labelCls}>Trip</label><GlassSelect value={trip} onChange={setTrip} options={TRIP} /></div>
            <div><label className={labelCls}>Container size</label><GlassSelect value={size} onChange={setSize} options={SIZE} /></div>
            <div><label className={labelCls}>Weight</label><GlassSelect value={wclass} onChange={setWclass} options={WCLASS} /></div>
          </div>
          <button type="submit" className="btn-primary w-full py-3.5 rounded-md text-[14px] font-semibold mt-5"><span className="label">Calculate instant rate</span></button>
          <p className="text-[10px] text-white/45 text-center mt-3">No login · No card · Rates lock for 24h</p>
        </form>
      )}

      {phase === "result" && res && (
        <div>
          <h3 className="display text-[20px] text-white leading-tight">Get instant quote</h3>
          <div className="mt-4 text-[10px] uppercase tracking-[0.16em] font-bold text-[#7CF0B0] flex items-center gap-1.5"><span className="live-dot" /> Live rate · {trip === "round" ? "round trip" : "one way"} · locked 24h</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="display text-[44px] md:text-[48px] text-white num leading-none">${N(res.total)}</span>
            <span className="text-[13px] text-white/60">/ {trip === "round" ? "round trip" : "move"}</span>
          </div>
          <div className="text-[13px] text-white/70 mt-1.5 num">{N(res.miles)} mi · port to door</div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
            {([["Fuel + FSC", res.fuel], ["Driver labor", res.labor], ["Chassis", res.chassis], ["Port & fees", res.port]] as [string, number][]).map(([k, v]) => (
              <div key={k} className="rounded px-3 py-3 bg-white/[0.08]"><div className="text-white/55 uppercase tracking-wider">{k}</div><div className="display text-white text-[17px] num mt-0.5">${N(v)}</div></div>
            ))}
          </div>
          <a href="#quote" className="btn-primary w-full py-3.5 rounded-md text-[14px] font-semibold mt-5 flex items-center justify-center gap-2"><span className="label">Get Your Quote Now</span></a>
          <button type="button" onClick={() => setPhase("form")} className="mt-2.5 w-full py-2.5 rounded text-[12px] font-semibold text-white/85 bg-white/10 hover:bg-white/15 transition flex items-center justify-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>Calculate Again
          </button>
        </div>
      )}

      {phase === "loading" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6" style={{ background: "rgba(8,18,38,0.78)", backdropFilter: "blur(8px)" }}>
          <div className="relative w-16 h-16"><div className="absolute inset-0 rounded-full border-[3px] border-white/15" /><div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[var(--red)] animate-spin" /></div>
          <div className="display text-[16px] text-white mt-5">Computing your rate</div>
          <div className="text-[12px] text-white/60 mt-1.5 num">{LOADING[step]}</div>
        </div>
      )}
    </div>
  );
}
