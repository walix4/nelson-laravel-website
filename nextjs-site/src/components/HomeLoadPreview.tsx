"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const LOADS = [
  { id: "DG-4821", mode: "Drayage",    origin: "LA/Long Beach",  dest: "Ontario, CA",      container: "40' HC",  miles: 58,  weight: "42K", rate: 1850, avail: "Today",    status: "hot",       type: "dry" },
  { id: "DG-4822", mode: "Drayage",    origin: "NY/NJ Port",     dest: "Newark, NJ",       container: "20' Std", miles: 12,  weight: "28K", rate: 650,  avail: "Today",    status: "available", type: "dry" },
  { id: "DG-4823", mode: "Intermodal", origin: "Savannah, GA",   dest: "Atlanta, GA",      container: "40' Std", miles: 246, weight: "35K", rate: 2200, avail: "Tomorrow", status: "available", type: "dry" },
  { id: "DG-4824", mode: "Drayage",    origin: "Houston, TX",    dest: "Pasadena, TX",     container: "45' HC",  miles: 34,  weight: "44K", rate: 1100, avail: "Today",    status: "available", type: "hazmat" },
  { id: "DG-4825", mode: "Port→Port",  origin: "Seattle, WA",    dest: "Tacoma, WA",       container: "20' Rfr", miles: 28,  weight: "18K", rate: 980,  avail: "Today",    status: "hot",       type: "reefer" },
  { id: "DG-4826", mode: "Drayage",    origin: "Miami, FL",      dest: "Medley, FL",       container: "40' HC",  miles: 22,  weight: "38K", rate: 875,  avail: "Tomorrow", status: "available", type: "dry" },
  { id: "DG-4827", mode: "Intermodal", origin: "Chicago, IL",    dest: "Indianapolis, IN", container: "53' Std", miles: 184, weight: "41K", rate: 1750, avail: "Jun 27",   status: "available", type: "urgent" },
  { id: "DG-4828", mode: "Drayage",    origin: "Norfolk, VA",    dest: "Richmond, VA",     container: "40' Std", miles: 95,  weight: "30K", rate: 1200, avail: "Today",    status: "hot",       type: "hot_load" },
];

const LIVE_POOL = [
  { id: "DG-4833", mode: "Drayage",    origin: "Boston, MA",     dest: "Worcester, MA",    container: "40' HC",  miles: 45,  weight: "34K", rate: 1300, avail: "Today",    status: "hot",       type: "dry" },
  { id: "DG-4834", mode: "Intermodal", origin: "Portland, OR",   dest: "Eugene, OR",       container: "40' Std", miles: 113, weight: "29K", rate: 1650, avail: "Tomorrow", status: "available", type: "reefer" },
  { id: "DG-4835", mode: "Drayage",    origin: "Tampa, FL",      dest: "Orlando, FL",      container: "20' Std", miles: 78,  weight: "25K", rate: 960,  avail: "Today",    status: "available", type: "hazmat" },
  { id: "DG-4836", mode: "Port→Port",  origin: "Tacoma, WA",     dest: "Seattle, WA",      container: "45' HC",  miles: 31,  weight: "40K", rate: 780,  avail: "Today",    status: "hot",       type: "flat" },
];

const WEATHER_POOL = [
  { temp: 72, label: "Sunny",  icon: "☀️" },
  { temp: 68, label: "Cloudy", icon: "☁️" },
  { temp: 88, label: "Hot",    icon: "🌡️" },
  { temp: 64, label: "Partly", icon: "⛅" },
  { temp: 91, label: "Humid",  icon: "🌤️" },
  { temp: 75, label: "Breezy", icon: "🌬️" },
];

const TYPE_META: Record<string, { label: string; color: string; icon: string }> = {
  dry:      { label: "Dry",      color: "#facc15", icon: "☀" },
  reefer:   { label: "Reefer",   color: "#38bdf8", icon: "❄" },
  hot_load: { label: "Hot Load", color: "#f97316", icon: "🔥" },
  urgent:   { label: "Urgent",   color: "#facc15", icon: "⚡" },
  hazmat:   { label: "Hazmat",   color: "#ef4444", icon: "◆" },
  flat:     { label: "Flatrack", color: "#94a3b8", icon: "▬" },
  tank:     { label: "Tank",     color: "#a78bfa", icon: "⬭" },
};

function MiniCard({ load, idx, isNew }: { load: typeof LOADS[0]; idx: number; isNew: boolean }) {
  const isHot    = load.status === "hot";
  const num      = String(idx + 1).padStart(2, "0");
  const perMile  = (load.rate / load.miles).toFixed(2);
  const weather  = WEATHER_POOL[idx % WEATHER_POOL.length];
  const meta     = TYPE_META[load.type];
  const viewCount = 2 + (idx % 6);

  return (
    <Link href="/load-board" className="block text-left w-full transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl overflow-hidden rounded-xl"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        animation: isNew ? "hlbSlideIn 0.4s ease" : undefined,
      }}>

      {/* Header */}
      <div className="p-4 flex items-start gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="shrink-0 rounded-lg flex flex-col items-center justify-between px-2.5 py-2.5 gap-1" style={{ background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.20)", minWidth: 46 }}>
          <span style={{ fontSize: 20 }}>{meta?.icon ?? "📦"}</span>
          <span className="text-[18px] font-extrabold leading-none text-white">{num}</span>
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="text-[13px] font-bold text-white">{load.id}</div>
            {isNew && <span className="text-[8px] font-bold px-1.5 py-0.5 shrink-0" style={{ borderRadius: 2, background: "rgba(74,222,128,0.20)", color: "#4ade80", letterSpacing: "0.08em" }}>NEW</span>}
            {meta && <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 shrink-0" style={{ borderRadius: 2, background: `${meta.color}20`, color: meta.color }}>{meta.icon} {meta.label}</span>}
          </div>
          <div className="text-[11px] mt-0.5 font-medium" style={{ color: "#fc0b05" }}>{load.mode}</div>
          <div className="mt-1 flex items-center gap-1.5">
            {isHot && (
              <span className="text-[9px] font-bold px-1.5 py-0.5" style={{ borderRadius: 2, background: "rgba(252,11,5,0.18)", color: "#fc0b05" }}>🔥 HOT</span>
            )}
          </div>
        </div>
        <div className="shrink-0 pt-0.5 flex flex-col items-end gap-1">
          <div style={{ position: "relative" }}>
            <div style={{ filter: "blur(6px)", userSelect: "none", pointerEvents: "none" }}>
              <div className="text-[18px] font-extrabold leading-none text-white">${load.rate.toLocaleString()}</div>
              <div className="text-[9px] text-white/35 mt-1 uppercase tracking-wide">{perMile} /mi</div>
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" fill={isHot ? "#ffffff" : "#4ade80"}/><path d="M8 11V7a4 4 0 018 0v4" stroke={isHot ? "#ffffff" : "#4ade80"} strokeWidth="2" strokeLinecap="round"/></svg>
              <span style={{ fontSize: 9, color: isHot ? "#ffffff" : "#4ade80", fontWeight: 800, whiteSpace: "nowrap" }}>Price</span>
            </div>
          </div>
        </div>
      </div>

      {/* Route */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: "#3b82f6" }} />
          <div className="text-[12px] font-bold text-white truncate">{load.origin}</div>
        </div>
        <div style={{ marginLeft: "5px", height: 16, borderLeft: "1.5px dashed rgba(255,255,255,0.20)" }} />
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: "#4ade80" }} />
          <div className="text-[12px] font-bold truncate" style={{ color: "#4ade80" }}>{load.dest}</div>
        </div>
      </div>

      {/* Detail strip */}
      <div className="px-4 pb-3">
        <div className="grid grid-cols-3 rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)" }}>
          {[["DIST", `${load.miles} mi`], ["WT", load.weight], ["CONT", load.container]].map(([l, v], i) => (
            <div key={l} className="px-2 py-2 text-center" style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <div className="text-[8px] uppercase tracking-[0.14em] text-white/30 font-semibold">{l}</div>
              <div className="text-[10px] font-bold text-white mt-0.5">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
          <div className="h-full rounded-full" style={{ background: isHot ? "#fc0b05" : "#4ade80", width: isHot ? "72%" : "38%" }} />
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 pb-3 flex items-center gap-2">
        <div className="flex items-center gap-1 shrink-0">
          <span style={{ fontSize: 14, lineHeight: 1 }}>{weather.icon}</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{weather.temp}°</span>
          <div className="flex flex-col" style={{ gap: 1 }}>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.40)", fontWeight: 500, lineHeight: 1 }}>{weather.label}</span>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.28)", fontWeight: 500, lineHeight: 1 }}>{load.origin.split(",")[0]}</span>
          </div>
        </div>
        <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.12)", flexShrink: 0 }} />
        <div className="flex items-center gap-1.5 flex-1">
          <div className="flex">
            {([["#3b82f6","MK"],["#10b981","JR"]] as [string,string][]).map(([bg, init], i) => (
              <div key={i} style={{ width: 20, height: 20, borderRadius: "50%", background: bg, border: "1.5px solid rgba(8,25,43,0.9)", marginLeft: i === 0 ? 0 : -6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 800, color: "#fff" }}>{init}</div>
            ))}
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.65)", fontSize: 7, border: "1.5px solid rgba(8,25,43,0.9)", marginLeft: -6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>+{viewCount}</div>
          </div>
        </div>
        <div className="shrink-0 text-[11px] font-bold text-white px-4 py-1.5 transition hover:opacity-90" style={{ borderRadius: 6, background: "#fc0b05" }}>
          Get Job
        </div>
      </div>
    </Link>
  );
}

export default function HomeLoadPreview() {
  const [liveLoads, setLiveLoads] = useState<typeof LOADS>(() => LOADS.slice(0, 8));
  const [newIds, setNewIds]       = useState<Set<string>>(new Set(LOADS.slice(0, 3).map(l => l.id)));
  const [showSkeleton, setShowSkeleton] = useState(false);
  const poolIdxRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = LIVE_POOL[poolIdxRef.current % LIVE_POOL.length];
      poolIdxRef.current += 1;
      setShowSkeleton(true);
      setTimeout(() => {
        setShowSkeleton(false);
        setLiveLoads(prev => [next, ...prev.filter(l => l.id !== next.id)].slice(0, 8));
        setNewIds(prev => new Set([...prev, next.id]));
        setTimeout(() => setNewIds(prev => { const s = new Set(prev); s.delete(next.id); return s; }), 4000);
      }, 500);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ background: "linear-gradient(180deg,#060f1e 0%,#070d1c 100%)", padding: "80px 24px 100px", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes hlbSlideIn {
          0%   { opacity:0; transform:translateY(-14px) scale(0.97); }
          60%  { opacity:1; transform:translateY(3px) scale(1.01); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes hlbShimmer {
          0%   { background-position:200% 0; }
          100% { background-position:-200% 0; }
        }
      `}</style>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "80%", height: "1px", background: "linear-gradient(90deg,transparent,rgba(252,11,5,0.35),transparent)" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse inline-block" />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#4ade80", letterSpacing: "0.08em", textTransform: "uppercase" }}>Live</span>
            </div>
            <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, margin: 0 }}>
              Draygo AI Loadboard
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>New jobs posted every 10 seconds — sign up to claim them</p>
          </div>
          <Link href="/load-board" className="hidden sm:flex items-center gap-2 text-[13px] font-bold text-white px-5 py-2.5 transition hover:opacity-90" style={{ borderRadius: 8, background: "#fc0b05", textDecoration: "none" }}>
            View All Loads
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {showSkeleton && (
            <div className="relative overflow-hidden rounded-xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", minHeight: 290 }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent 20%,rgba(255,255,255,0.07) 50%,transparent 80%)", backgroundSize: "200% 100%", animation: "hlbShimmer 1.1s ease-in-out infinite" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.10)", borderTopColor: "#fc0b05", animation: "spin 0.75s linear infinite" }} />
              </div>
            </div>
          )}
          {liveLoads.slice(0, showSkeleton ? 7 : 8).map((load, idx) => (
            <MiniCard key={load.id} load={load} idx={showSkeleton ? idx + 1 : idx} isNew={newIds.has(load.id)} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="flex sm:hidden justify-center mt-6">
          <Link href="/load-board" className="flex items-center gap-2 text-[13px] font-bold text-white px-6 py-3 transition hover:opacity-90" style={{ borderRadius: 8, background: "#fc0b05", textDecoration: "none" }}>
            View All Loads
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
