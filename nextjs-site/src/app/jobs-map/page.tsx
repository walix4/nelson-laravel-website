"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LoadMapView from "@/app/load-board/LoadMapView";

/* ─── Load data ──────────────────────────────────────────────────────── */
const BASE_LOADS = [
  { id: "DG-4821", mode: "Drayage",    origin: "LA/Long Beach",  terminal: "APM Terminal",    dest: "Ontario, CA",       container: "40' HC",  miles: 58,  weight: "42,000", rate: 1850, avail: "Today",    status: "hot",       type: "dry",  commodity: "Consumer Electronics",  chassis: "Carrier Provided",  ref: "PU-88421", note: "Dual transactions allowed" },
  { id: "DG-4822", mode: "Drayage",    origin: "NY/NJ Port",     terminal: "Maher Terminal",  dest: "Newark, NJ",        container: "20' Std", miles: 12,  weight: "28,000", rate: 650,  avail: "Today",    status: "available", type: "dry",  commodity: "Auto Parts",            chassis: "Pool (TPSC)",       ref: "PU-72103", note: "" },
  { id: "DG-4823", mode: "Intermodal", origin: "Savannah, GA",   terminal: "GPA Garden City", dest: "Atlanta, GA",       container: "40' Std", miles: 246, weight: "35,000", rate: 2200, avail: "Tomorrow", status: "available", type: "dry",  commodity: "Retail Merchandise",    chassis: "Carrier Provided",  ref: "PU-65890", note: "Live unload required" },
  { id: "DG-4824", mode: "Drayage",    origin: "Houston, TX",    terminal: "Bayport Term.",   dest: "Pasadena, TX",      container: "45' HC",  miles: 34,  weight: "44,000", rate: 1100, avail: "Today",    status: "available", type: "flat", commodity: "Steel Coils",           chassis: "N/A (Flatbed)",     ref: "PU-54320", note: "Tarps required, side kit" },
  { id: "DG-4825", mode: "Port→Port",  origin: "Seattle, WA",    terminal: "SSA T-18",        dest: "Tacoma, WA",        container: "20' Rfr", miles: 28,  weight: "18,000", rate: 980,  avail: "Today",    status: "hot",       type: "cool", commodity: "Frozen Seafood",        chassis: "Carrier Provided",  ref: "PU-91240", note: "Set point: -18°C / 0°F",    temp: "-18°C" },
  { id: "DG-4826", mode: "Drayage",    origin: "Miami, FL",      terminal: "PortMiami D",     dest: "Medley, FL",        container: "40' HC",  miles: 22,  weight: "38,000", rate: 875,  avail: "Tomorrow", status: "available", type: "dry",  commodity: "Apparel & Textiles",    chassis: "Pool (DCLI)",       ref: "PU-33187", note: "" },
  { id: "DG-4827", mode: "Intermodal", origin: "Chicago, IL",    terminal: "BNSF Alliance",   dest: "Indianapolis, IN",  container: "53' Std", miles: 184, weight: "41,000", rate: 1750, avail: "Jun 17",   status: "available", type: "ow",   commodity: "Industrial Machinery",  chassis: "Escort required",   ref: "PU-20934", note: "Over-dimensional: 14'6\" H" },
  { id: "DG-4828", mode: "Drayage",    origin: "Norfolk, VA",    terminal: "NIT Terminal",    dest: "Richmond, VA",      container: "40' Std", miles: 95,  weight: "30,000", rate: 1200, avail: "Today",    status: "hot",       type: "dry",  commodity: "Paper & Packaging",     chassis: "Carrier Provided",  ref: "PU-47856", note: "Drop & hook available" },
  { id: "DG-4829", mode: "Drayage",    origin: "Baltimore, MD",  terminal: "Seagirt Marine",  dest: "Frederick, MD",     container: "20' Std", miles: 62,  weight: "22,000", rate: 890,  avail: "Tomorrow", status: "available", type: "cool", commodity: "Fresh Produce",         chassis: "Pool (TPSC)",       ref: "PU-61025", note: "Pre-cool to 34°F before load", temp: "34°F" },
  { id: "DG-4830", mode: "Port→Port",  origin: "LA/LB — TTI",   terminal: "TTI Terminal",    dest: "LA/LB — Trapac",    container: "40' HC",  miles: 8,   weight: "36,000", rate: 420,  avail: "Today",    status: "available", type: "flat", commodity: "Project Cargo",         chassis: "N/A (Flatbed)",     ref: "PU-80211", note: "" },
  { id: "DG-4831", mode: "Intermodal", origin: "Dallas, TX",     terminal: "BNSF Alliance",   dest: "Memphis, TN",       container: "40' Std", miles: 468, weight: "32,000", rate: 3100, avail: "Jun 17",   status: "available", type: "ow",   commodity: "Transformer Units",     chassis: "Permit required",   ref: "PU-19874", note: "State permits included, 15'2\" H" },
  { id: "DG-4832", mode: "Drayage",    origin: "Charleston, SC", terminal: "Wando Welch",     dest: "Greenville, SC",    container: "45' HC",  miles: 218, weight: "43,000", rate: 2400, avail: "Tomorrow", status: "hot",       type: "dry",  commodity: "Tires & Rubber",        chassis: "Carrier Provided",  ref: "PU-55602", note: "Floor-loaded, no pallets" },
];

/* extra loads fed in by the real-time simulation */
const LIVE_POOL = [
  { id: "DG-4833", mode: "Drayage",    origin: "Boston, MA",     terminal: "Conley Term.",    dest: "Worcester, MA",     container: "40' HC",  miles: 45,  weight: "34,000", rate: 1300, avail: "Today",    status: "hot",       type: "dry",  commodity: "Medical Devices",       chassis: "Carrier Provided",  ref: "PU-40320", note: "White glove handling" },
  { id: "DG-4834", mode: "Intermodal", origin: "Portland, OR",   terminal: "Terminal 6",      dest: "Eugene, OR",        container: "40' Std", miles: 113, weight: "29,000", rate: 1650, avail: "Tomorrow", status: "available", type: "cool", commodity: "Dairy Products",        chassis: "Carrier Provided",  ref: "PU-77043", note: "Continuous temp monitor req.", temp: "36°F" },
  { id: "DG-4835", mode: "Drayage",    origin: "Tampa, FL",      terminal: "Port Tampa",      dest: "Orlando, FL",       container: "20' Std", miles: 78,  weight: "25,000", rate: 960,  avail: "Today",    status: "available", type: "dry",  commodity: "Chemicals (Non-Haz)",   chassis: "Pool (DCLI)",       ref: "PU-28541", note: "" },
  { id: "DG-4836", mode: "Port→Port",  origin: "Tacoma, WA",     terminal: "T-4 Terminal",    dest: "Seattle, WA",       container: "45' HC",  miles: 31,  weight: "40,000", rate: 780,  avail: "Today",    status: "hot",       type: "flat", commodity: "Lumber & Building Mat.", chassis: "N/A (Flatbed)",     ref: "PU-63985", note: "Banding & blocking required" },
  { id: "DG-4837", mode: "Drayage",    origin: "Oakland, CA",    terminal: "Outer Harbor",    dest: "Stockton, CA",      container: "40' HC",  miles: 82,  weight: "37,000", rate: 1450, avail: "Tomorrow", status: "available", type: "cool", commodity: "Beverages",             chassis: "Carrier Provided",  ref: "PU-95147", note: "Temp 45°F — no freeze",     temp: "45°F" },
  { id: "DG-4838", mode: "Intermodal", origin: "Detroit, MI",    terminal: "Conrail Yard",    dest: "Columbus, OH",      container: "53' Std", miles: 165, weight: "44,000", rate: 2100, avail: "Jun 27",   status: "available", type: "ow",   commodity: "Press / Stamping Equip.",chassis: "Escort required",  ref: "PU-31260", note: "Over-dimensional 16'H" },
  { id: "DG-4839", mode: "Drayage",    origin: "San Diego, CA",  terminal: "National City",   dest: "Los Angeles, CA",   container: "20' Rfr", miles: 118, weight: "18,000", rate: 1580, avail: "Today",    status: "hot",       type: "cool", commodity: "Fresh Flowers",         chassis: "Carrier Provided",  ref: "PU-84712", note: "Priority — perishable",     temp: "34°F" },
  { id: "DG-4840", mode: "Drayage",    origin: "Wilmington, DE", terminal: "Port of Wilm.",   dest: "Philadelphia, PA",  container: "40' Std", miles: 28,  weight: "31,000", rate: 740,  avail: "Tomorrow", status: "available", type: "dry",  commodity: "Furniture & Fixtures",  chassis: "Pool (TPSC)",       ref: "PU-52398", note: "" },
  { id: "DG-4841", mode: "Drayage",    origin: "Philadelphia, PA", terminal: "PhilaPORT",     dest: "Allentown, PA",     container: "40' HC",  miles: 59,  weight: "39,000", rate: 1090, avail: "Today",    status: "available", type: "dry",  commodity: "Plastic Resins",        chassis: "Carrier Provided",  ref: "PU-70814", note: "Drop permitted" },
  { id: "DG-4842", mode: "Intermodal", origin: "Kansas City, MO", terminal: "BNSF Intermodal",dest: "Wichita, KS",       container: "53' Std", miles: 202, weight: "38,000", rate: 2350, avail: "Jun 27",   status: "available", type: "ow",   commodity: "Wind Turbine Components",chassis: "Permit required",  ref: "PU-18532", note: "3-axle required" },
  { id: "DG-4843", mode: "Drayage",    origin: "New Orleans, LA", terminal: "ICTSI Louisiana",dest: "Baton Rouge, LA",   container: "40' HC",  miles: 81,  weight: "42,000", rate: 1480, avail: "Today",    status: "hot",       type: "dry",  commodity: "Sugar & Food Grains",   chassis: "Carrier Provided",  ref: "PU-93045", note: "Food-grade container required" },
  { id: "DG-4844", mode: "Port→Port",  origin: "Long Beach, CA", terminal: "Pier J",          dest: "LA/LB — Yusen",     container: "40' Std", miles: 5,   weight: "33,000", rate: 310,  avail: "Today",    status: "available", type: "flat", commodity: "Breakbulk Cargo",       chassis: "N/A (Flatbed)",     ref: "PU-44219", note: "" },
];

/* ─── Type / mode filter definitions ────────────────────────────────── */
const TYPE_FILTERS = [
  { key: "all",  label: "All Types",  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { key: "dry",  label: "Dry",        icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="#facc15"><circle cx="12" cy="12" r="4"/><g stroke="#facc15" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></g></svg> },
  { key: "cool", label: "Reefer",     icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="2" x2="12" y2="22"/><polyline points="20,7 12,12 4,7"/><polyline points="20,17 12,12 4,17"/><polyline points="12,2 16,6 12,10 8,6 12,2"/><polyline points="12,14 16,18 12,22 8,18 12,14"/></svg> },
  { key: "flat", label: "Flatbed",    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="#f97316"><rect x="1" y="9" width="14" height="6" rx="1"/><path d="M15 12h4l2 3H15z"/><circle cx="6" cy="19" r="2"/><circle cx="13" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg> },
  { key: "ow",   label: "Overweight", icon: <svg width="13" height="13" viewBox="0 0 24 24"><path fill="#a78bfa" d="M12 2L2 7l10 5 10-5z"/><path fill="#a78bfa" fillOpacity=".65" d="M2 12l10 5 10-5-10-5z"/><path fill="#a78bfa" fillOpacity=".35" d="M2 17l10 5 10-5-10-5z"/></svg> },
];

const MODE_FILTERS = [
  { key: "all",        label: "All Modes",  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { key: "Drayage",    label: "Drayage",    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { key: "Intermodal", label: "Intermodal", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg> },
  { key: "Port→Port",  label: "Port→Port",  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg> },
];

/* inline icon for each type (shown inside card chip) */
const TYPE_CHIP: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  dry:  { label: "Dry",        color: "#facc15", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="#facc15"><circle cx="12" cy="12" r="4"/><g stroke="#facc15" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></g></svg> },
  cool: { label: "Reefer",     color: "#38bdf8", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="2" x2="12" y2="22"/><polyline points="20,7 12,12 4,7"/><polyline points="20,17 12,12 4,17"/><polyline points="12,2 16,6 12,10 8,6 12,2"/><polyline points="12,14 16,18 12,22 8,18 12,14"/></svg> },
  flat: { label: "Flatbed",    color: "#f97316", icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="#f97316"><rect x="1" y="9" width="14" height="6" rx="1"/><path d="M15 12h4l2 3H15z"/><circle cx="6" cy="19" r="2"/><circle cx="13" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg> },
  ow:   { label: "Overweight", color: "#a78bfa", icon: <svg width="11" height="11" viewBox="0 0 24 24"><path fill="#a78bfa" d="M12 2L2 7l10 5 10-5z"/><path fill="#a78bfa" fillOpacity=".65" d="M2 12l10 5 10-5-10-5z"/><path fill="#a78bfa" fillOpacity=".35" d="M2 17l10 5 10-5-10-5z"/></svg> },
};

const STATUS_COLOR: Record<string, string> = {
  hot: "#fc0b05",
  available: "#4ade80",
};

type LoadItem = typeof BASE_LOADS[0];

/* ─── QR Code SVG (deterministic from load id) ───────────────────────── */
function hashStr(s: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 0x01000193) >>> 0;
  return h;
}

function QRCodeSVG({ value }: { value: string }) {
  const N = 21, CELL = 10, PAD = 12;
  const W = N * CELL + PAD * 2;
  const seed = hashStr(value);

  function finderPixel(r: number, c: number): boolean | null {
    const tl = r < 7 && c < 7;
    const tr = r < 7 && c > N - 8;
    const bl = r > N - 8 && c < 7;
    if (!tl && !tr && !bl) return null;
    let lr = tl ? r : r > N - 8 ? r - (N - 7) : r;
    let lc = tr ? c - (N - 7) : c;
    if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return true;
    if (lr === 1 || lr === 5 || lc === 1 || lc === 5) return false;
    return true;
  }
  function timingPixel(r: number, c: number): boolean | null {
    if (r === 6 && c >= 8 && c <= N - 9) return c % 2 === 0;
    if (c === 6 && r >= 8 && r <= N - 9) return r % 2 === 0;
    return null;
  }
  function isSep(r: number, c: number) {
    return (r === 7 && c <= 7) || (c === 7 && r <= 7) ||
           (r === 7 && c >= N - 8) || (c === N - 8 && r <= 7) ||
           (r === N - 8 && c <= 7) || (c === 7 && r >= N - 8);
  }

  const rects: React.ReactNode[] = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const fp = finderPixel(r, c);
      const tp = timingPixel(r, c);
      const sep = isSep(r, c);
      let dark: boolean;
      if (fp !== null) dark = fp;
      else if (tp !== null) dark = tp;
      else if (sep) dark = false;
      else {
        const h = (seed ^ (r * 0x9e3779b9 + c * 0x6b43a9b5)) >>> 0;
        dark = (h >>> 16) > 24000;
      }
      if (dark) rects.push(
        <rect key={`${r}-${c}`} x={PAD + c * CELL + 1} y={PAD + r * CELL + 1} width={CELL - 2} height={CELL - 2} rx={1.5} fill="#0a0a14"/>
      );
    }
  }
  return (
    <svg width={W} height={W} viewBox={`0 0 ${W} ${W}`} style={{ display: "block" }}>
      <rect width={W} height={W} fill="white" rx={8}/>
      {rects}
    </svg>
  );
}

/* ─── Booking dialog ─────────────────────────────────────────────────── */
function BookingDialog({ load, onClose }: { load: LoadItem | null; onClose: () => void }) {
  const [view, setView] = useState<"details" | "qr">("details");
  useEffect(() => { setView("details"); }, [load?.id]);
  if (!load) return null;
  const perMile = (load.rate / load.miles).toFixed(2);
  const chip = TYPE_CHIP[load.type];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(3,8,24,0.55)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderTop: "1px solid rgba(255,255,255,0.28)",
          backdropFilter: "blur(48px) saturate(1.8)",
          WebkitBackdropFilter: "blur(48px) saturate(1.8)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)",
          animation: "dialogIn 0.25s ease",
        }}
        onClick={e => e.stopPropagation()}
      >
        {view === "details" ? (
          <>
            {/* ── Details view ── */}
            <div className="px-6 pt-5 pb-4 flex items-start justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold tracking-widest text-white/40 uppercase">Load</span>
                  <span className="text-[12px] font-bold text-white/60">{load.id}</span>
                  {chip && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: `${chip.color}22`, color: chip.color }}>
                      {chip.icon} {chip.label}
                    </span>
                  )}
                </div>
                <h2 className="text-white text-[20px] font-bold leading-tight">{load.origin}</h2>
                <div className="text-white/45 text-[13px] mt-0.5">→ {load.dest}</div>
              </div>
              <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center transition hover:bg-white/10 shrink-0 mt-1" style={{ border: "1px solid rgba(255,255,255,0.18)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Stats grid — transparent cells, dividers only */}
            <div className="grid grid-cols-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {[{ label: "Rate", value: `$${load.rate.toLocaleString()}` }, { label: "$/Mile", value: `$${perMile}` }, { label: "Miles", value: `${load.miles} mi` }, { label: "Available", value: load.avail }].map((s, i) => (
                <div key={s.label} className="px-5 py-4"
                  style={{
                    borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  }}>
                  <div className="text-[11px] text-white/35 uppercase tracking-widest mb-1">{s.label}</div>
                  <div className="text-white font-bold text-[18px]">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 space-y-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {([
                { label: "Ref #",      value: (load as any).ref },
                { label: "Commodity",  value: (load as any).commodity },
                { label: "Terminal",   value: load.terminal },
                { label: "Container",  value: load.container },
                { label: "Weight",     value: `${load.weight} lbs` },
                { label: "Chassis",    value: (load as any).chassis },
                { label: "Mode",       value: load.mode },
                ...((load as any).temp ? [{ label: "Temperature", value: (load as any).temp }] : []),
                { label: "Status",     value: null },
              ] as { label: string; value: string | null }[]).map((d, i) => (
                <div key={d.label} className="flex items-center justify-between text-[13px] py-2"
                  style={{ borderBottom: i < 7 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span className="text-white/38">{d.label}</span>
                  {d.value !== null ? (
                    <span className="text-white/82 font-medium text-right max-w-[58%] truncate">{d.value}</span>
                  ) : (
                    <span className="font-bold text-[12px]" style={{ color: STATUS_COLOR[load.status] ?? "#fff" }}>
                      {load.status === "hot" ? "🔥 HOT" : "✓ Available"}
                    </span>
                  )}
                </div>
              ))}
              {(load as any).note ? (
                <div className="mt-2 px-3 py-2 rounded-lg text-[11px] text-white/50 italic" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  📋 {(load as any).note}
                </div>
              ) : null}
            </div>

            <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />
            <div className="px-6 py-5 flex gap-3">
              <Link href="/login" className="flex-1 flex items-center justify-center py-3 rounded-xl text-[14px] font-semibold text-white transition hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.22)" }}>
                Sign In
              </Link>
              <button
                onClick={() => setView("qr")}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-bold text-white transition hover:opacity-90"
                style={{ background: "#fc0b05" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="5" y="5" width="3" height="3" fill="white" stroke="none"/><rect x="16" y="5" width="3" height="3" fill="white" stroke="none"/><rect x="5" y="16" width="3" height="3" fill="white" stroke="none"/>
                  <path d="M14 14h2v2h-2zM18 14h3v2h-3zM14 18h3v3h-3zM19 18h2v3h-2z"/>
                </svg>
                Book Load
              </button>
            </div>
          </>
        ) : (
          <>
            {/* ── QR view ── */}
            <div className="px-6 pt-5 pb-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <button onClick={() => setView("details")} className="flex items-center gap-2 text-[13px] font-semibold text-white/60 hover:text-white transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
                Back
              </button>
              <div className="text-white/40 text-[11px] font-mono">{load.id}</div>
              <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 transition" style={{ border: "1px solid rgba(255,255,255,0.14)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="px-6 pt-6 pb-4 flex flex-col items-center">
              {/* Title */}
              <div className="text-white font-bold text-[18px] mb-1">Scan to Get this Job</div>
              <div className="text-white/40 text-[12px] mb-5">Open DrayGo app and scan to instantly book</div>

              {/* QR scanner frame */}
              <div style={{ position: "relative", padding: 6, background: "rgba(255,255,255,0.06)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.10)" }}>

                {/* QR code */}
                <QRCodeSVG value={`draygo://book/${load.id}?rate=${load.rate}&origin=${encodeURIComponent(load.origin)}`} />

                {/* corner brackets */}
                {([["top","left"],["top","right"],["bottom","left"],["bottom","right"]] as const).map(([v, h]) => (
                  <div key={`${v}-${h}`} style={{
                    position: "absolute",
                    [v]: 6, [h]: 6,
                    width: 24, height: 24,
                    borderTop: v === "top" ? "3px solid #fc0b05" : "none",
                    borderBottom: v === "bottom" ? "3px solid #fc0b05" : "none",
                    borderLeft: h === "left" ? "3px solid #fc0b05" : "none",
                    borderRight: h === "right" ? "3px solid #fc0b05" : "none",
                    borderRadius: h === "left" && v === "top" ? "6px 0 0 0" : h === "right" && v === "top" ? "0 6px 0 0" : h === "left" ? "0 0 0 6px" : "0 0 6px 0",
                  }} />
                ))}

                {/* scan laser line */}
                <div style={{
                  position: "absolute", left: 6, right: 6, height: 2, borderRadius: 2,
                  background: "linear-gradient(90deg, transparent 0%, rgba(252,11,5,0.0) 10%, #fc0b05 40%, #ff4444 50%, #fc0b05 60%, rgba(252,11,5,0.0) 90%, transparent 100%)",
                  boxShadow: "0 0 8px 2px rgba(252,11,5,0.55)",
                  animation: "scanLine 1.8s ease-in-out infinite",
                  top: 6,
                }} />
              </div>

              {/* Load summary pills */}
              <div className="flex items-center gap-2 mt-5 flex-wrap justify-center">
                <span className="text-[12px] px-3 py-1 rounded-full font-semibold text-white" style={{ background: "rgba(252,11,5,0.18)", border: "1px solid rgba(252,11,5,0.30)" }}>
                  ${load.rate.toLocaleString()}
                </span>
                <span className="text-[12px] px-3 py-1 rounded-full font-medium text-white/60" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  {load.origin} → {load.dest}
                </span>
                <span className="text-[12px] px-3 py-1 rounded-full font-medium text-white/60" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}>
                  {load.avail}
                </span>
              </div>

              <div className="text-white/25 text-[11px] mt-4 mb-2 text-center">
                Don't have the app? <Link href="/register" className="text-white/50 underline hover:text-white transition">Sign up at draygo.net</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Skeleton loading card ──────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div
      className="rounded-xl px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.10)",
        marginBottom: 7,
        flexShrink: 0,
        animation: "slideInNew 0.3s ease",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* shimmer sweep overlay */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 12,
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0.07) 60%, transparent 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmerSweep 1.1s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* top row */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <div style={{ width: 52, height: 9, borderRadius: 4, background: "rgba(255,255,255,0.10)" }} />
            <div style={{ width: 30, height: 9, borderRadius: 4, background: "rgba(74,222,128,0.20)" }} />
          </div>
          <div style={{ width: "72%", height: 13, borderRadius: 5, background: "rgba(255,255,255,0.12)", marginBottom: 6 }} />
          <div style={{ width: "54%", height: 10, borderRadius: 4, background: "rgba(255,255,255,0.07)" }} />
        </div>
        <div className="text-right">
          <div style={{ width: 56, height: 15, borderRadius: 5, background: "rgba(255,255,255,0.12)", marginBottom: 5 }} />
          <div style={{ width: 38, height: 9, borderRadius: 4, background: "rgba(255,255,255,0.07)" }} />
        </div>
      </div>

      {/* chips row */}
      <div className="flex items-center gap-1.5">
        {[44, 58, 36, 48].map((w, i) => (
          <div key={i} style={{ width: w, height: 18, borderRadius: 9, background: "rgba(255,255,255,0.08)" }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Load row (sidebar card) ────────────────────────────────────────── */
function LoadRow({ load, onClick, isNew }: { load: LoadItem; onClick: () => void; isNew?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const perMile = (load.rate / load.miles).toFixed(2);
  const chip = TYPE_CHIP[load.type];

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left rounded-xl px-4 py-3"
      style={{
        background: hovered ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.07)",
        border: hovered ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.10)",
        boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.35)" : "0 2px 8px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        transition: "all 0.18s ease",
        cursor: "pointer",
        animation: isNew ? "slideInNew 0.4s ease" : undefined,
        marginBottom: 7,
        flexShrink: 0,
      }}
    >
      {/* Top row: route + rate */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] text-white/30 font-mono">{load.id}</span>
            {isNew && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: "rgba(74,222,128,0.20)", color: "#4ade80", letterSpacing: "0.08em" }}>
                NEW
              </span>
            )}
          </div>
          <div className="text-white font-semibold text-[13px] leading-tight truncate">{load.origin}</div>
          <div className="text-white/45 text-[11px] mt-0.5 truncate">→ {load.dest}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-white font-bold text-[15px]">${load.rate.toLocaleString()}</div>
          <div className="text-white/30 text-[10px]">${perMile}/mi</div>
        </div>
      </div>

      {/* Bottom row: chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Type chip with icon */}
        {chip && (
          <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
            style={{ background: `${chip.color}18`, color: chip.color }}>
            {chip.icon} {chip.label}
          </span>
        )}
        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
          style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>
          {load.mode}
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
          style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>
          {load.miles} mi
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
          style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>
          {load.avail}
        </span>
        {load.status === "hot" && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
            style={{ background: "rgba(252,11,5,0.18)", color: "#fc0b05" }}>
            🔥 HOT
          </span>
        )}
      </div>
    </button>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
const SIDEBAR_MAX = 8;

export default function JobsMapPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [selectedLoad, setSelectedLoad] = useState<LoadItem | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* live feed state: rolling window of up to SIDEBAR_MAX + buffer loads */
  const [liveLoads, setLiveLoads] = useState<LoadItem[]>(BASE_LOADS.slice(0, SIDEBAR_MAX + 4));
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [showSkeleton, setShowSkeleton] = useState(false);
  const poolIdxRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = LIVE_POOL[poolIdxRef.current % LIVE_POOL.length];
      poolIdxRef.current += 1;

      /* 1. show skeleton for 750ms */
      setShowSkeleton(true);

      setTimeout(() => {
        /* 2. swap skeleton → real card */
        setShowSkeleton(false);
        setLiveLoads(prev => {
          const without = prev.filter(l => l.id !== next.id);
          return [next, ...without].slice(0, SIDEBAR_MAX + 4);
        });
        setNewIds(prev => new Set([...prev, next.id]));

        /* 3. clear NEW badge after 4s */
        setTimeout(() => {
          setNewIds(prev => { const s = new Set(prev); s.delete(next.id); return s; });
        }, 4000);
      }, 750);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  /* Map always uses BASE_LOADS — they have stable LOAD_COORDS so markers never disappear */
  const mapLoads = BASE_LOADS.filter(l =>
    (typeFilter === "all" || l.type === typeFilter) &&
    (modeFilter === "all" || l.mode === modeFilter)
  );

  /* Sidebar uses the live feed (cycles through LIVE_POOL + BASE_LOADS) */
  const filtered = liveLoads.filter(l =>
    (typeFilter === "all" || l.type === typeFilter) &&
    (modeFilter === "all" || l.mode === modeFilter)
  );

  /* first SIDEBAR_MAX shown with no overflow */
  const visibleLoads = filtered.slice(0, SIDEBAR_MAX);

  return (
    <div style={{ position: "relative", background: "#05101c", overflow: "hidden" }}>
      {/* Background video */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: "fixed", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.45, zIndex: 0, pointerEvents: "none",
        }}
        src="/jobs-map-bg.mp4"
      />
      <div style={{ position: "fixed", inset: 0, background: "rgba(5,16,28,0.55)", zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 2 }}>
      <Nav />

      {/* Page header */}
      <div style={{ background: "#08192b", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "18px 24px" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-white font-bold text-[22px] leading-tight">Jobs on Map</h1>
              <p className="text-white/40 text-[13px] mt-0.5">Live drayage &amp; intermodal loads across the US</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Type filter */}
              <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {TYPE_FILTERS.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setTypeFilter(f.key)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold transition"
                    style={{
                      background: typeFilter === f.key ? "rgba(252,11,5,0.85)" : "transparent",
                      color: typeFilter === f.key ? "#fff" : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {f.icon}{f.label}
                  </button>
                ))}
              </div>

              {/* Mode filter */}
              <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {MODE_FILTERS.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setModeFilter(f.key)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold transition"
                    style={{
                      background: modeFilter === f.key ? "rgba(59,130,246,0.85)" : "transparent",
                      color: modeFilter === f.key ? "#fff" : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {f.icon}{f.label}
                  </button>
                ))}
              </div>

              {/* Sidebar toggle */}
              <button
                onClick={() => setSidebarOpen(o => !o)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-semibold transition hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>
                </svg>
                {sidebarOpen ? "Hide List" : "Show List"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideInNew {
          0%   { opacity: 0; transform: translateX(22px) scale(0.97); }
          60%  { opacity: 1; transform: translateX(-3px) scale(1.01); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes shimmerSweep {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes newCardGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
          50%     { box-shadow: 0 0 0 3px rgba(74,222,128,0.30); }
        }
        @keyframes scanLine {
          0%   { top: 6px;  opacity: 0.6; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: calc(100% - 8px); opacity: 0.6; }
        }
        @keyframes dialogIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Map + sidebar layout */}
      <div style={{ background: "transparent" }}>
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex gap-5" style={{ height: "calc(100vh - 220px)", minHeight: 520 }}>

            {/* Map */}
            <div className="flex-1 min-w-0 overflow-hidden" style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(252,11,5,0.30)",
              borderRadius: 16,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            }}>
              <LoadMapView
                loads={mapLoads}
                fillHeight
                onMarkerClick={(ids) => {
                  const load = mapLoads.find(l => l.id === ids[0]) ?? mapLoads.find(l => l.status === "hot") ?? mapLoads[0];
                  if (load) setSelectedLoad(load);
                }}
              />
            </div>

            {/* Sidebar load list — no scroll, fixed window */}
            {sidebarOpen && (
              <div
                className="shrink-0 flex flex-col"
                style={{
                  width: 320,
                  height: "100%",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(252,11,5,0.30)",
                  borderRadius: 16,
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                  overflow: "hidden",
                }}
              >
                {/* Sidebar header */}
                <div className="px-4 pt-4 pb-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold text-[14px]">Available Loads</div>
                      {showSkeleton ? (
                        <div className="text-[11px] mt-0.5 flex items-center gap-1.5" style={{ color: "#4ade80" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                          </svg>
                          Loading New Jobs...
                        </div>
                      ) : (
                        <div className="text-white/35 text-[11px] mt-0.5 flex items-center gap-1.5">
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 2s infinite" }} />
                          Live feed · {filtered.length} active
                        </div>
                      )}
                    </div>
                    <Link
                      href="/load-board"
                      className="text-[11px] font-semibold transition hover:opacity-80 flex items-center gap-1"
                      style={{ color: "#fc0b05" }}
                    >
                      Full Board
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Cards — flex-fill, no overflow */}
                <div className="flex-1 flex flex-col px-3 py-3 overflow-hidden">
                  {visibleLoads.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-white/30 text-[13px]">
                      No loads match current filters
                    </div>
                  ) : (
                    visibleLoads.map(load => (
                      <LoadRow
                        key={load.id}
                        load={load}
                        onClick={() => setSelectedLoad(load)}
                        isNew={newIds.has(load.id)}
                      />
                    ))
                  )}
                </div>

                {/* Footer count */}
                <div className="shrink-0 px-4 py-2.5 flex items-center justify-between"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="text-white/25 text-[10px]">Showing {visibleLoads.length} of {filtered.length}</span>
                  <span className="text-white/25 text-[10px]">Updates every 3.5s</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      </div>

      {/* Booking dialog */}
      {selectedLoad && (
        <BookingDialog load={selectedLoad} onClose={() => setSelectedLoad(null)} />
      )}
    </div>
  );
}
