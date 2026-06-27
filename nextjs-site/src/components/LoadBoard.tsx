"use client";
import { useState, useEffect, useRef } from "react";

const LOADS = [
  { id: "DR-1041", mode: "drayage",    origin: "APM Terminals — Elizabeth, NJ",        dest: "Philadelphia, PA",          container: "dry",    size: "40'", weight: 42000, rate: 1840, miles: 95,   weather: "clear", avail: "Today",    tag: "Hot" },
  { id: "DR-1042", mode: "drayage",    origin: "Pier 400 (APM) — Los Angeles, CA",     dest: "Ontario, CA",               container: "dry",    size: "20'", weight: 28000, rate: 620,  miles: 34,   weather: "clear", avail: "Today",    tag: null },
  { id: "PP-0890", mode: "porttoport", origin: "Long Beach (Pier E) — Long Beach, CA", dest: "Garden City — Savannah, GA", container: "reefer", size: "40'", weight: 38000, rate: 3200, miles: 2388, weather: "rain",  avail: "Tomorrow", tag: "Premium" },
  { id: "IM-0312", mode: "intermodal", origin: "Norfolk International — Norfolk, VA",  dest: "Chicago, IL (Rail Ramp)",   container: "dry",    size: "53'", weight: 35000, rate: 1960, miles: 891,  weather: "clear", avail: "Jun 14",   tag: null },
  { id: "DR-1043", mode: "drayage",    origin: "Seagirt Marine — Baltimore, MD",       dest: "Richmond, VA",              container: "dry",    size: "20'", weight: 22000, rate: 740,  miles: 160,  weather: "snow",  avail: "Jun 13",   tag: null },
  { id: "IM-0313", mode: "intermodal", origin: "Barbours Cut — Houston, TX",           dest: "Dallas, TX (Rail Ramp)",    container: "flat",   size: "45'", weight: 18000, rate: 880,  miles: 248,  weather: "clear", avail: "Jun 14",   tag: null },
];

const LIVE_POOL = [
  { id: "DR-1044", mode: "drayage",    origin: "SSA Terminal — Seattle, WA",           dest: "Tacoma, WA",                container: "reefer", size: "20'", weight: 18000, rate: 980,  miles: 28,   weather: "rain",  avail: "Today",    tag: "Hot" },
  { id: "IM-0314", mode: "intermodal", origin: "BNSF Alliance — Chicago, IL",          dest: "Indianapolis, IN",          container: "dry",    size: "53'", weight: 41000, rate: 1750, miles: 184,  weather: "clear", avail: "Jun 27",   tag: null },
  { id: "DR-1045", mode: "drayage",    origin: "NIT Terminal — Norfolk, VA",           dest: "Richmond, VA",              container: "dry",    size: "40'", weight: 30000, rate: 1200, miles: 95,   weather: "clear", avail: "Today",    tag: "Hot" },
  { id: "PP-0891", mode: "porttoport", origin: "TTI Terminal — Long Beach, CA",        dest: "Trapac — Los Angeles, CA",  container: "flat",   size: "45'", weight: 36000, rate: 420,  miles: 8,    weather: "clear", avail: "Today",    tag: null },
  { id: "DR-1046", mode: "drayage",    origin: "Port Tampa — Tampa, FL",               dest: "Orlando, FL",               container: "dry",    size: "40'", weight: 25000, rate: 960,  miles: 78,   weather: "rain",  avail: "Today",    tag: null },
  { id: "IM-0315", mode: "intermodal", origin: "Conrail Yard — Detroit, MI",           dest: "Columbus, OH",              container: "dry",    size: "53'", weight: 44000, rate: 2100, miles: 165,  weather: "clear", avail: "Jun 27",   tag: "Hot" },
];

const MODE_LABELS: Record<string, string> = { drayage: "Drayage", porttoport: "Port–Port", intermodal: "Intermodal" };
const CONT_LABELS: Record<string, string> = { dry: "Dry", reefer: "Reefer", flat: "Flat Rack", opentop: "Open Top", tank: "Tank" };
const WEATHER_LABELS: Record<string, string> = { clear: "Clear", rain: "Rain", snow: "Snow/Ice", wind: "High Wind" };
const WEATHER_ICON: Record<string, string>  = { clear: "☀️", rain: "🌧️", snow: "🌨️", wind: "💨" };
const N = (n: number) => n.toLocaleString();
const sel = "w-full rounded bg-white/[0.07] px-2.5 py-2 text-[12px] text-white placeholder-white/40 focus:outline-none focus:bg-white/[0.14] transition appearance-none cursor-pointer";
const labelCls = "block text-[9.5px] font-semibold uppercase tracking-[0.07em] text-white/55 mb-1";

export default function LoadBoard() {
  const [filter, setFilter]     = useState("all");
  const [fDist, setFDist]       = useState("any");
  const [fType, setFType]       = useState("any");
  const [fWeight, setFWeight]   = useState("any");
  const [fSize, setFSize]       = useState("any");
  const [posting, setPosting]   = useState(false);
  const [posted, setPosted]     = useState(false);
  const [pDist, setPDist]       = useState("");
  const [pType, setPType]       = useState("dry");
  const [pWeight, setPWeight]   = useState("");
  const [pWeather, setPWeather] = useState("clear");

  const [liveLoads, setLiveLoads]       = useState<typeof LOADS>(() => LOADS.slice(0, 6));
  const [newIds, setNewIds]             = useState<Set<string>>(new Set(LOADS.slice(0, 4).map(l => l.id)));
  const [showSkeleton, setShowSkeleton] = useState(false);
  const poolIdxRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = LIVE_POOL[poolIdxRef.current % LIVE_POOL.length];
      poolIdxRef.current += 1;
      setShowSkeleton(true);
      setTimeout(() => {
        setShowSkeleton(false);
        setLiveLoads(prev => [next, ...prev.filter(l => l.id !== next.id)].slice(0, 6));
        setNewIds(prev => new Set([...prev, next.id]));
        setTimeout(() => setNewIds(prev => { const s = new Set(prev); s.delete(next.id); return s; }), 4000);
      }, 500);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const visible = liveLoads.filter(l => {
    if (filter !== "all" && l.mode !== filter) return false;
    if (fType !== "any" && l.container !== fType) return false;
    if (fSize !== "any" && l.size !== fSize) return false;
    if (fDist !== "any") {
      if (fDist === "short" && l.miles >= 100) return false;
      if (fDist === "mid"   && (l.miles < 100 || l.miles > 500)) return false;
      if (fDist === "long"  && l.miles <= 500) return false;
    }
    if (fWeight !== "any") {
      if (fWeight === "light" && l.weight >= 20000) return false;
      if (fWeight === "med"   && (l.weight < 20000 || l.weight > 40000)) return false;
      if (fWeight === "heavy" && l.weight <= 40000) return false;
    }
    return true;
  });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    setPosted(true);
    setTimeout(() => { setPosted(false); setPosting(false); setPDist(""); setPWeight(""); }, 2800);
  };

  return (
    <div className="reveal rounded-lg bg-white/[0.08] border border-[var(--red)]/30 backdrop-blur-sm shadow-2xl p-5 md:p-6 w-full max-w-[460px] mx-auto lg:mx-0">
      <style>{`
        @keyframes lbSlideIn { 0%{opacity:0;transform:translateY(-12px) scale(0.97)} 60%{opacity:1;transform:translateY(2px) scale(1.01)} 100%{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes lbShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="display text-[20px] md:text-[22px] text-white leading-tight">Load Board</h3>
          <p className="text-[12px] text-white/50 mt-0.5">Live available drayage loads</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="live-dot" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7CF0B0]">Live</span>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {[["all","All"],["drayage","Drayage"],["porttoport","P–P"],["intermodal","Intermodal"]].map(([v,l]) => (
          <button key={v} onClick={() => setFilter(v)}
            className={`rounded py-1.5 text-[11px] font-semibold transition ${filter===v ? "bg-[var(--red)]/25 border border-[var(--red)] text-white" : "bg-white/[0.06] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.12]"}`}>
            {l}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-4 gap-2 mb-3 p-3 rounded-md bg-white/[0.04] border border-white/[0.07]">
        <div>
          <div className={labelCls}>Distance</div>
          <select value={fDist} onChange={e => setFDist(e.target.value)} className={sel}>
            <option value="any">Any</option><option value="short">&lt; 100 mi</option><option value="mid">100–500 mi</option><option value="long">500+ mi</option>
          </select>
        </div>
        <div>
          <div className={labelCls}>Type</div>
          <select value={fType} onChange={e => setFType(e.target.value)} className={sel}>
            <option value="any">Any</option><option value="dry">Dry</option><option value="reefer">Reefer</option><option value="flat">Flat Rack</option><option value="opentop">Open Top</option><option value="tank">Tank</option>
          </select>
        </div>
        <div>
          <div className={labelCls}>Weight</div>
          <select value={fWeight} onChange={e => setFWeight(e.target.value)} className={sel}>
            <option value="any">Any</option><option value="light">&lt; 20K lbs</option><option value="med">20–40K lbs</option><option value="heavy">40K+ lbs</option>
          </select>
        </div>
        <div>
          <div className={labelCls}>Size</div>
          <select value={fSize} onChange={e => setFSize(e.target.value)} className={sel}>
            <option value="any">Any</option><option value="20'">20'</option><option value="40'">40'</option><option value="45'">45'</option><option value="53'">53'</option>
          </select>
        </div>
      </div>

      {/* Load rows */}
      <div className="space-y-2 max-h-[260px] overflow-y-auto pr-0.5 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
        {showSkeleton && (
          <div className="relative overflow-hidden rounded-md" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", height: 72 }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent 20%,rgba(255,255,255,0.07) 50%,transparent 80%)", backgroundSize: "200% 100%", animation: "lbShimmer 1s ease-in-out infinite" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.10)", borderTopColor: "#fc0b05", animation: "spin 0.75s linear infinite" }} />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase" }}>New Job Loading</span>
            </div>
          </div>
        )}

        {visible.map(load => {
          const contColor: Record<string,string> = { dry:"#facc15", reefer:"#38bdf8", flat:"#94a3b8", opentop:"#a78bfa", tank:"#a78bfa" };
          const contIcon:  Record<string,string> = { dry:"☀", reefer:"❄", flat:"▬", opentop:"⬭", tank:"⬭" };
          const cc = contColor[load.container] ?? "#94a3b8";
          const ci = contIcon[load.container]  ?? "📦";
          const isHot = load.tag === "Hot";
          const lockColor = isHot ? "#ffffff" : "#4ade80";
          return (
            <div key={load.id} className="px-4 py-3 hover:bg-white/[0.10] transition"
              style={{ borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", animation: newIds.has(load.id) ? "lbSlideIn 0.4s ease" : undefined }}>
              {/* ID row */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[10px] text-white/30 font-mono shrink-0">{load.id}</span>
                  <span className="text-[9px] px-1.5 py-0.5 font-semibold shrink-0" style={{ borderRadius: 2, background: `${cc}18`, color: cc }}>{ci} {CONT_LABELS[load.container] ?? load.container}</span>
                  {newIds.has(load.id) && (
                    <span className="text-[8px] font-bold px-1.5 py-0.5 shrink-0" style={{ borderRadius: 2, background: "rgba(74,222,128,0.20)", color: "#4ade80", letterSpacing: "0.08em" }}>NEW</span>
                  )}
                </div>
                {/* Blurred price + lock */}
                <div className="shrink-0" style={{ position: "relative" }}>
                  <div style={{ filter: "blur(5px)", userSelect: "none", pointerEvents: "none", textAlign: "right" }}>
                    <div className="text-white font-bold text-[14px]">${N(load.rate)}</div>
                  </div>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" fill={lockColor}/><path d="M8 11V7a4 4 0 018 0v4" stroke={lockColor} strokeWidth="2" strokeLinecap="round"/></svg>
                    <span style={{ fontSize: 9, color: lockColor, fontWeight: 800, whiteSpace: "nowrap" }}>Price</span>
                  </div>
                </div>
              </div>
              {/* Origin */}
              <div className="text-white font-semibold text-[13px] leading-tight truncate">{load.origin.split(" — ")[1] ?? load.origin.split(" — ")[0]}</div>
              {/* Dest */}
              <div className="text-white/45 text-[11px] mt-0.5 truncate">→ {load.dest}</div>
              {/* Bottom chips */}
              <div className="flex items-center gap-1.5 mt-2 overflow-hidden">
                <span className="text-[10px] px-1.5 py-0.5 font-medium shrink-0" style={{ borderRadius: 2, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>{MODE_LABELS[load.mode]}</span>
                <span className="text-[10px] px-1.5 py-0.5 font-medium shrink-0" style={{ borderRadius: 2, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>{N(load.miles)} mi</span>
                <span className="text-[10px] px-1.5 py-0.5 font-medium shrink-0" style={{ borderRadius: 2, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>{N(load.weight)} lbs</span>
                <span className="text-[10px] px-1.5 py-0.5 font-medium shrink-0" style={{ borderRadius: 2, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>{load.size}</span>
                {isHot && <span className="text-[10px] px-1.5 py-0.5 font-bold shrink-0 ml-auto" style={{ borderRadius: 2, background: "rgba(252,11,5,0.18)", color: "#fc0b05" }}>🔥 HOT</span>}
              </div>
            </div>
          );
        })}
        {visible.length === 0 && !showSkeleton && (
          <div className="text-center py-6 text-[12px] text-white/40">No loads match your filters.</div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3">
        <p className="text-[10px] text-white/35">{visible.length} load{visible.length !== 1 ? "s" : ""} · updates every 10s</p>
      </div>
    </div>
  );
}
