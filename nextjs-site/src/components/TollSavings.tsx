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
const CATEGORY: [string, string][] = [["truck", "Truck"], ["tractor", "Tractor Trailer"], ["straight", "Straight Truck"], ["bus", "Bus"], ["van", "Van"]];
const PROFILE: [string, string][] = [["2", "2-Axle Truck — 2 axles"], ["3", "3-Axle Truck — 3 axles"], ["4", "4-Axle Truck — 4 axles"], ["5", "5-Axle Semi-Trailer — 5 axles"], ["6", "6-Axle Heavy — 6 axles"], ["7", "7+ Axle Oversize — 7 axles"]];
const YESNO: [string, string][] = [["yes", "Yes"], ["no", "No"]];

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
const CAT_MULT: Record<string, number> = { tractor: 1, truck: 0.92, straight: 0.72, bus: 0.6, van: 0.45 };
const N = (n: number) => n.toLocaleString();
const LOADING = ["Geocoding route…", "Scanning toll roads & plazas…", "Pricing bridges, tunnels & axles…", "Applying vehicle class…"];

const fieldCls = "w-full rounded bg-white/[0.07] px-3 py-2.5 text-[14px] text-white placeholder-white/45 focus:outline-none focus:bg-white/[0.16] transition";
const labelCls = "block text-[10.5px] font-semibold uppercase tracking-[0.06em] text-white/65 mb-1.5";

export default function TollSavings() {
  const [from, setFrom] = useState("APM Terminals — Elizabeth, NJ");
  const [to, setTo] = useState("Philadelphia, PA, USA");
  const [category, setCategory] = useState("truck");
  const [profile, setProfile] = useState("5");
  const [dual, setDual] = useState("yes");
  const [trailer, setTrailer] = useState("yes");
  const [weight, setWeight] = useState("80000");
  const [height, setHeight] = useState("162");
  const [width, setWidth] = useState("102");
  const [length, setLength] = useState("576");
  const [phase, setPhase] = useState<"form" | "loading" | "result">("form");
  const [step, setStep] = useState(0);
  const [res, setRes] = useState<{ total: number; miles: number; roads: number; bridges: number; oversize: number; surcharge: number; plazas: number } | null>(null);

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
    const axles = parseInt(profile) || 5;
    const tolledMiles = miles * 0.42;
    const axleMult = 0.5 + axles * 0.42;
    const catMult = CAT_MULT[category] ?? 0.9;
    const roads = tolledMiles * 0.12 * axleMult * catMult;
    const bridges = Math.max(1, Math.round(miles / 220)) * 16 * axleMult * (trailer === "yes" ? 1.12 : 1);
    const oversize = ((+weight || 0) > 80000 ? 60 : 0) + ((+width || 0) > 102 ? 45 : 0) + ((+height || 0) > 162 ? 40 : 0) + ((+length || 0) > 636 ? 35 : 0);
    const surcharge = (roads + bridges) * (dual === "yes" ? 0.03 : 0);
    setPhase("loading");
    setTimeout(() => {
      setRes({ total: Math.round(roads + bridges + oversize + surcharge), miles: Math.round(miles), roads: Math.round(roads), bridges: Math.round(bridges), oversize: Math.round(oversize), surcharge: Math.round(surcharge), plazas: Math.max(1, Math.round(tolledMiles / 70)) });
      setPhase("result");
    }, 2600);
  };

  return (
    <div className="reveal rounded-md bg-white/[0.08] border border-[#00a2e7]/30 backdrop-blur-sm shadow-2xl p-6 md:p-7 w-full max-w-[460px] mx-auto lg:mx-0 relative overflow-hidden">
      {phase !== "result" && (
        <form onSubmit={run} className="flex flex-col">
          <h3 className="display text-[20px] md:text-[22px] text-white leading-tight">Calculate Your Drayage Toll Cost</h3>
          <p className="text-[12.5px] text-white/55 mt-1.5">Price a container move from port gate to door.</p>
          <div className="mt-5 space-y-3.5">
            <div><label className={labelCls}>Select port terminal <span className="text-[#00a2e7]">*</span></label><PortSelect value={from} onChange={setFrom} options={PORTS} placeholder="Select port terminal" /></div>
            <div><label className={labelCls}>Enter drop off address <span className="text-[#00a2e7]">*</span></label><input className={fieldCls} required value={to} onChange={(e) => setTo(e.target.value)} placeholder="Enter drop-off address" /></div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3.5">
            <div><label className={labelCls}>Vehicle category</label><GlassSelect value={category} onChange={setCategory} options={CATEGORY} /></div>
            <div><label className={labelCls}>Truck profile</label><GlassSelect value={profile} onChange={setProfile} options={PROFILE} /></div>
            <div><label className={labelCls}>Dual tires</label><GlassSelect value={dual} onChange={setDual} options={YESNO} /></div>
            <div><label className={labelCls}>Has trailer</label><GlassSelect value={trailer} onChange={setTrailer} options={YESNO} /></div>
            <div><label className={labelCls}>Weight (lbs)</label><input className={fieldCls} type="number" min={0} value={weight} onChange={(e) => setWeight(e.target.value)} /></div>
            <div><label className={labelCls}>Height (in)</label><input className={fieldCls} type="number" min={0} value={height} onChange={(e) => setHeight(e.target.value)} /></div>
            <div><label className={labelCls}>Width (in)</label><input className={fieldCls} type="number" min={0} value={width} onChange={(e) => setWidth(e.target.value)} /></div>
            <div><label className={labelCls}>Length (in)</label><input className={fieldCls} type="number" min={0} value={length} onChange={(e) => setLength(e.target.value)} /></div>
          </div>
          <button type="submit" className="btn-primary w-full py-3.5 rounded-md text-[14px] font-semibold mt-5"><span className="label">Calculate tolls</span></button>
        </form>
      )}

      {phase === "result" && res && (
        <div>
          <h3 className="display text-[20px] text-white leading-tight">Calculate Your Drayage Toll Cost</h3>
          <div className="mt-4 text-[10px] uppercase tracking-[0.16em] font-bold text-[#7CF0B0] flex items-center gap-1.5"><span className="live-dot" /> Estimated tolls · {profile}-axle</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="display text-[44px] md:text-[48px] text-white num leading-none">${N(res.total)}</span>
            <span className="text-[13px] text-white/60">/ trip</span>
          </div>
          <div className="text-[13px] text-white/70 mt-1.5 num">{N(res.miles)} mi · {res.plazas} toll points</div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
            {([["Toll roads", res.roads], ["Bridges / tunnels", res.bridges], ["Oversize / permit", res.oversize], ["Surcharges", res.surcharge]] as [string, number][]).map(([k, v]) => (
              <div key={k} className="rounded px-3 py-3 bg-white/[0.08]"><div className="text-white/55 uppercase tracking-wider">{k}</div><div className="display text-white text-[17px] num mt-0.5">${N(v)}</div></div>
            ))}
          </div>
          <a href={`${process.env.NEXT_PUBLIC_BASE||""}/toll-calculator?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&profile=${profile}&dual=${dual}&trailer=${trailer}&weight=${weight}&height=${height}&width=${width}&length=${length}`} className="btn-primary w-full py-3.5 rounded-md text-[14px] font-semibold mt-5 flex items-center justify-center gap-2"><span className="label">Get full breakdown</span></a>
          <button type="button" onClick={() => setPhase("form")} className="mt-2.5 w-full py-2.5 rounded text-[12px] font-semibold text-white/85 bg-white/10 hover:bg-white/15 transition flex items-center justify-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>Calculate again
          </button>
        </div>
      )}

      {phase === "loading" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6" style={{ background: "rgba(8,18,38,0.78)", backdropFilter: "blur(8px)" }}>
          <div className="relative w-16 h-16"><div className="absolute inset-0 rounded-full border-[3px] border-white/15" /><div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#00a2e7] animate-spin" /></div>
          <div className="display text-[16px] text-white mt-5">Pricing your tolls</div>
          <div className="text-[12px] text-white/60 mt-1.5 num">{LOADING[step]}</div>
        </div>
      )}
    </div>
  );
}
