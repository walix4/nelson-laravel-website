"use client";
import React, { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LoadMapView from "@/app/load-board/LoadMapView";

/* ─── Shared load data ───────────────────────────────────────────────── */
const LOADS = [
  { id: "DG-4821", mode: "Drayage",    origin: "LA/Long Beach",  terminal: "APM Terminal",   dest: "Ontario, CA",      container: "40' HC",  miles: 58,  weight: "42K", rate: 1850, avail: "Today",    status: "hot",       type: "dry" },
  { id: "DG-4822", mode: "Drayage",    origin: "NY/NJ Port",     terminal: "Maher Terminal", dest: "Newark, NJ",       container: "20' Std", miles: 12,  weight: "28K", rate: 650,  avail: "Today",    status: "available", type: "dry" },
  { id: "DG-4823", mode: "Intermodal", origin: "Savannah, GA",   terminal: "GPA Garden City",dest: "Atlanta, GA",      container: "40' Std", miles: 246, weight: "35K", rate: 2200, avail: "Tomorrow", status: "available", type: "dry" },
  { id: "DG-4824", mode: "Drayage",    origin: "Houston, TX",    terminal: "Bayport Term.",  dest: "Pasadena, TX",     container: "45' HC",  miles: 34,  weight: "44K", rate: 1100, avail: "Today",    status: "available", type: "flat" },
  { id: "DG-4825", mode: "Port→Port",  origin: "Seattle, WA",    terminal: "SSA T-18",       dest: "Tacoma, WA",       container: "20' Rfr", miles: 28,  weight: "18K", rate: 980,  avail: "Today",    status: "hot",       type: "cool" },
  { id: "DG-4826", mode: "Drayage",    origin: "Miami, FL",      terminal: "PortMiami D",    dest: "Medley, FL",       container: "40' HC",  miles: 22,  weight: "38K", rate: 875,  avail: "Tomorrow", status: "available", type: "dry" },
  { id: "DG-4827", mode: "Intermodal", origin: "Chicago, IL",    terminal: "BNSF Alliance",  dest: "Indianapolis, IN", container: "53' Std", miles: 184, weight: "41K", rate: 1750, avail: "Jun 17",   status: "available", type: "ow" },
  { id: "DG-4828", mode: "Drayage",    origin: "Norfolk, VA",    terminal: "NIT Terminal",   dest: "Richmond, VA",     container: "40' Std", miles: 95,  weight: "30K", rate: 1200, avail: "Today",    status: "hot",       type: "dry" },
  { id: "DG-4829", mode: "Drayage",    origin: "Baltimore, MD",  terminal: "Seagirt Marine", dest: "Frederick, MD",    container: "20' Std", miles: 62,  weight: "22K", rate: 890,  avail: "Tomorrow", status: "available", type: "cool" },
  { id: "DG-4830", mode: "Port→Port",  origin: "LA/LB — TTI",   terminal: "TTI Terminal",   dest: "LA/LB — Trapac",   container: "40' HC",  miles: 8,   weight: "36K", rate: 420,  avail: "Today",    status: "available", type: "flat" },
  { id: "DG-4831", mode: "Intermodal", origin: "Dallas, TX",     terminal: "BNSF Alliance",  dest: "Memphis, TN",      container: "40' Std", miles: 468, weight: "32K", rate: 3100, avail: "Jun 17",   status: "available", type: "ow" },
  { id: "DG-4832", mode: "Drayage",    origin: "Charleston, SC", terminal: "Wando Welch",    dest: "Greenville, SC",   container: "45' HC",  miles: 218, weight: "43K", rate: 2400, avail: "Tomorrow", status: "hot",       type: "dry" },
];

const TYPE_FILTERS = [
  { key: "all",  label: "All Types" },
  { key: "dry",  label: "Dry" },
  { key: "cool", label: "Reefer" },
  { key: "flat", label: "Flatbed" },
  { key: "ow",   label: "Overweight" },
];

const MODE_FILTERS = [
  { key: "all",        label: "All Modes" },
  { key: "Drayage",    label: "Drayage" },
  { key: "Intermodal", label: "Intermodal" },
  { key: "Port→Port",  label: "Port→Port" },
];

const STATUS_COLOR: Record<string, string> = {
  hot: "#fc0b05",
  available: "#4ade80",
};

/* ─── Booking dialog ─────────────────────────────────────────────────── */
function BookingDialog({ load, onClose }: { load: typeof LOADS[0] | null; onClose: () => void }) {
  if (!load) return null;
  const perMile = (load.rate / load.miles).toFixed(2);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(4,12,38,0.80)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "linear-gradient(160deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.04) 100%)", border: "1px solid rgba(255,255,255,0.14)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-start justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold tracking-widest text-white/40 uppercase">Load</span>
              <span className="text-[12px] font-bold text-white/60">{load.id}</span>
            </div>
            <h2 className="text-white text-[20px] font-bold leading-tight">{load.origin}</h2>
            <div className="text-white/45 text-[13px] mt-0.5">→ {load.dest}</div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition hover:bg-white/10 shrink-0 mt-1"
            style={{ border: "1px solid rgba(255,255,255,0.18)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.06)", margin: "0 0 0 0" }}>
          {[
            { label: "Rate",      value: `$${load.rate.toLocaleString()}` },
            { label: "$/Mile",    value: `$${perMile}` },
            { label: "Miles",     value: `${load.miles} mi` },
            { label: "Available", value: load.avail },
          ].map(s => (
            <div key={s.label} className="px-5 py-4" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="text-[11px] text-white/40 uppercase tracking-widest mb-1">{s.label}</div>
              <div className="text-white font-bold text-[18px]">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="px-6 py-4 space-y-2.5">
          {[
            { label: "Terminal",   value: load.terminal },
            { label: "Container",  value: load.container },
            { label: "Weight",     value: `${load.weight} lbs` },
            { label: "Mode",       value: load.mode },
          ].map(d => (
            <div key={d.label} className="flex items-center justify-between text-[13px]">
              <span className="text-white/40">{d.label}</span>
              <span className="text-white/80 font-medium">{d.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-white/40">Status</span>
            <span className="font-bold text-[12px]" style={{ color: STATUS_COLOR[load.status] ?? "#fff" }}>
              {load.status === "hot" ? "🔥 HOT" : "Available"}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
        <div className="px-6 py-5 flex gap-3">
          <Link
            href="/login"
            className="flex-1 flex items-center justify-center py-3 rounded-xl text-[14px] font-semibold text-white transition hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.22)" }}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="flex-1 flex items-center justify-center py-3 rounded-xl text-[14px] font-bold text-white transition hover:opacity-90"
            style={{ background: "#fc0b05" }}
          >
            Book Load
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Load row (sidebar) ─────────────────────────────────────────────── */
function LoadRow({ load, onClick }: { load: typeof LOADS[0]; onClick: () => void }) {
  const perMile = (load.rate / load.miles).toFixed(2);
  return (
    <button
      onClick={onClick}
      className="w-full text-left transition hover:bg-white/5 rounded-xl px-4 py-3.5"
      style={{ border: "1px solid rgba(255,255,255,0.07)", marginBottom: 8 }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="text-[11px] text-white/35 font-mono mb-0.5">{load.id}</div>
          <div className="text-white font-semibold text-[14px] leading-tight">{load.origin}</div>
          <div className="text-white/50 text-[12px] mt-0.5">→ {load.dest}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-white font-bold text-[16px]">${load.rate.toLocaleString()}</div>
          <div className="text-white/35 text-[11px]">${perMile}/mi</div>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>{load.mode}</span>
        <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>{load.miles} mi</span>
        <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>{load.avail}</span>
        {load.status === "hot" && (
          <span className="text-[11px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(252,11,5,0.18)", color: "#fc0b05" }}>🔥 HOT</span>
        )}
      </div>
    </button>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function JobsMapPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [selectedLoad, setSelectedLoad] = useState<typeof LOADS[0] | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = LOADS.filter(l =>
    (typeFilter === "all" || l.type === typeFilter) &&
    (modeFilter === "all" || l.mode === modeFilter)
  );

  return (
    <>
      <Nav />

      {/* Page header */}
      <div style={{ background: "#08192b", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "18px 24px" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3">
            {/* Title + tabs */}
            <div className="flex items-center gap-4 flex-wrap">
              <div>
                <h1 className="text-white font-bold text-[22px] leading-tight">Jobs on Map</h1>
                <p className="text-white/40 text-[13px] mt-0.5">Live drayage & intermodal loads across the US</p>
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <Link
                  href="/load-board"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold transition text-white/55 hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                  Load Board
                </Link>
                <span
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
                  style={{ background: "#fc0b05" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/>
                  </svg>
                  Jobs on Map
                </span>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Type filter */}
              <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {TYPE_FILTERS.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setTypeFilter(f.key)}
                    className="px-3 py-1.5 rounded-md text-[12px] font-semibold transition"
                    style={{
                      background: typeFilter === f.key ? "rgba(252,11,5,0.85)" : "transparent",
                      color: typeFilter === f.key ? "#fff" : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Mode filter */}
              <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {MODE_FILTERS.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setModeFilter(f.key)}
                    className="px-3 py-1.5 rounded-md text-[12px] font-semibold transition"
                    style={{
                      background: modeFilter === f.key ? "rgba(59,130,246,0.85)" : "transparent",
                      color: modeFilter === f.key ? "#fff" : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {f.label}
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

      {/* Map + sidebar layout */}
      <div style={{ background: "#05101c", minHeight: "calc(100vh - 220px)" }}>
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex gap-5 items-start">

            {/* Map */}
            <div className="flex-1 min-w-0">
              {/* Stats bar */}
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                  <span className="text-white/50 text-[13px]">
                    <span className="text-white font-semibold">{filtered.length}</span> loads shown
                  </span>
                </div>
                <div className="text-white/25 text-[13px]">|</div>
                <span className="text-white/50 text-[13px]">
                  <span className="text-white font-semibold">247</span> total in network
                </span>
                <div className="text-white/25 text-[13px]">|</div>
                <span className="text-white/50 text-[13px]">
                  <span className="text-[#fc0b05] font-semibold">{LOADS.filter(l => l.status === "hot").length}</span> hot loads
                </span>
              </div>

              <LoadMapView
                loads={filtered}
                onMarkerClick={() => {
                  const hotLoad = filtered.find(l => l.status === "hot") ?? filtered[0];
                  if (hotLoad) setSelectedLoad(hotLoad);
                }}
              />

              {/* Legend */}
              <div className="flex items-center gap-6 mt-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" fill="#08192b" stroke="#fc0b05" strokeWidth="2"/>
                    <text x="10" y="10" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="9" fontWeight="700">3</text>
                  </svg>
                  <span className="text-white/40 text-[12px]">Active loads (red = DrayGo live)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" fill="#0d1e30" stroke="rgba(255,255,255,0.20)" strokeWidth="1.2"/>
                    <text x="10" y="10" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.55)" fontSize="9" fontWeight="600">12</text>
                  </svg>
                  <span className="text-white/40 text-[12px]">Regional market loads</span>
                </div>
              </div>
            </div>

            {/* Sidebar load list */}
            {sidebarOpen && (
              <div
                className="shrink-0 overflow-y-auto"
                style={{
                  width: 320,
                  maxHeight: "calc(100vh - 260px)",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: "16px 12px",
                }}
              >
                <div className="flex items-center justify-between mb-4 px-2">
                  <div>
                    <div className="text-white font-bold text-[15px]">Available Loads</div>
                    <div className="text-white/35 text-[12px] mt-0.5">{filtered.length} matching your filters</div>
                  </div>
                  <Link
                    href="/load-board"
                    className="text-[12px] font-semibold transition hover:opacity-80"
                    style={{ color: "#fc0b05" }}
                  >
                    Full Board →
                  </Link>
                </div>

                {filtered.length === 0 ? (
                  <div className="text-center py-12 text-white/30 text-[13px]">No loads match current filters</div>
                ) : (
                  filtered.map(load => (
                    <LoadRow key={load.id} load={load} onClick={() => setSelectedLoad(load)} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* Booking dialog */}
      {selectedLoad && (
        <BookingDialog load={selectedLoad} onClose={() => setSelectedLoad(null)} />
      )}
    </>
  );
}
