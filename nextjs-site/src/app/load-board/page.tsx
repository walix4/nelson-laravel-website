"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LoadMapView from "./LoadMapView";

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

const TYPE_LABEL: Record<string, string> = {
  dry: "Dry", cool: "Reefer", flat: "Flatbed", ow: "O/W",
};

const TIME_SLOTS = [
  "8:00 AM","8:15 AM","8:30 AM","8:45 AM","9:00 AM",
  "9:15 AM","9:30 AM","9:45 AM","10:00 AM","10:30 AM",
  "11:00 AM","11:30 AM",
];

/* ─── Icons ─────────────────────────────────────────────────────────── */
const DryIcon  = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#facc15">
    <circle cx="12" cy="12" r="4.5"/>
    <g stroke="#facc15" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </g>
  </svg>
);
const CoolIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="2" x2="12" y2="22"/>
    <polyline points="20,7 12,12 4,7"/><polyline points="20,17 12,12 4,17"/>
    <polyline points="12,2 16,6 12,10 8,6 12,2"/><polyline points="12,14 16,18 12,22 8,18 12,14"/>
  </svg>
);
const FlatIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#f97316">
    <rect x="1" y="8" width="15" height="7" rx="1"/>
    <path d="M16 11h4l2 4H16z"/>
    <circle cx="6" cy="19" r="2.5"/><circle cx="14" cy="19" r="2.5"/><circle cx="20" cy="19" r="2.5"/>
  </svg>
);
const OWIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="#a78bfa" d="M12 2L2 7l10 5 10-5z"/>
    <path fill="#a78bfa" fillOpacity=".7" d="M2 12l10 5 10-5-10-5z"/>
    <path fill="#a78bfa" fillOpacity=".45" d="M2 17l10 5 10-5-10-5z"/>
  </svg>
);

const TYPE_ICON: Record<string, React.ReactNode> = {
  dry:  <DryIcon size={18} />,
  cool: <CoolIcon size={18} />,
  flat: <FlatIcon size={18} />,
  ow:   <OWIcon size={18} />,
};

/* ─── Booking dialog ─────────────────────────────────────────────────── */
function BookingDialog({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(4,12,38,0.75)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(160deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.04) 100%)",
          border: "1px solid rgba(255,255,255,0.14)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-5 flex items-start justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <h2 className="display text-white text-[22px] font-bold leading-tight">Booking Info</h2>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse inline-block" />
              <span className="text-[11px] text-white/50">247 loads available now</span>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center transition hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.18)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="px-6 py-7 text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(252,11,5,0.15)", border: "1px solid rgba(252,11,5,0.30)" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <p className="text-white font-semibold text-[15px]">Want to book this load?</p>
          <p className="text-white/45 text-[13px] mt-2 leading-relaxed">Sign in or create a free account to claim loads, view full details, and get paid in 48h.</p>
        </div>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
        <div className="px-6 py-5 flex gap-3">
          <Link href="/login" className="flex-1 flex items-center justify-center py-3 rounded-xl text-[14px] font-semibold text-white transition hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.22)" }}>Sign In</Link>
          <Link href="/register" className="flex-1 flex items-center justify-center py-3 rounded-xl text-[14px] font-bold text-white transition hover:opacity-90" style={{ background: "#fc0b05" }}>Sign Up Free</Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Load list row (glass style) ───────────────────────────────────── */
function LoadListRow({ load, onClick }: { load: typeof LOADS[0]; onClick: () => void }) {
  const isHot = load.status === "hot";
  const icon  = TYPE_ICON[load.type] ?? TYPE_ICON.dry;

  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-all hover:brightness-125 mb-2"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px" }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          {/* Tag row */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <span className="text-[11px] font-bold text-white/65">{load.id}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md font-medium" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>{load.mode}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md font-medium" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>{TYPE_LABEL[load.type]}</span>
            <span style={{ display: "inline-flex", transform: "scale(0.80)", transformOrigin: "left center" }}>{icon}</span>
            {isHot && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: "rgba(252,11,5,0.18)", color: "#fc0b05", border: "1px solid rgba(252,11,5,0.32)" }}>Hot</span>
            )}
            {!isHot && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.22)" }}>Premium</span>
            )}
          </div>
          {/* Route */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[14px] font-semibold text-white">{load.terminal}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            <span className="text-[14px] font-semibold text-white">{load.dest}</span>
          </div>
          {/* Meta */}
          <div className="text-[12px] text-white/35">{load.miles} mi · {load.weight} · {load.avail}</div>
        </div>
        {/* Price + Claim */}
        <div className="shrink-0 text-right flex flex-col items-end gap-2.5">
          <div className="num text-[22px] font-extrabold text-white leading-none">${load.rate.toLocaleString()}</div>
          <div className="px-5 py-1.5 rounded-lg text-[12px] font-bold text-white" style={{ background: "#fc0b05" }}>Claim</div>
        </div>
      </div>
    </button>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function LoadBoardPage() {
  const [showSignIn, setShowSignIn]     = useState(false);
  const [activeMode, setActiveMode]     = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode]         = useState<"list" | "map">("list");
  const [selectedDay, setSelectedDay]   = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [bookService, setBookService]   = useState<"Drayage" | "Import" | "Export">("Drayage");
  const [weekDays, setWeekDays]         = useState<Array<{ day: string; date: number }>>([]);

  useEffect(() => {
    const today = new Date();
    setWeekDays(Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return { day: d.toLocaleDateString("en-US", { weekday: "short" }), date: d.getDate() };
    }));
  }, []);

  const modeFiltered = LOADS.filter(l => {
    if (activeMode === "all") return true;
    if (activeMode === "drayage") return l.mode === "Drayage";
    if (activeMode === "pp") return l.mode === "Port→Port";
    if (activeMode === "intermodal") return l.mode === "Intermodal";
    return true;
  });
  const filtered = modeFiltered.filter(l => activeFilter === "all" || l.type === activeFilter);

  return (
    <>
      <Nav />
      {showSignIn && <BookingDialog onClose={() => setShowSignIn(false)} />}
      <style>{`
        .glass-scroll::-webkit-scrollbar{width:5px}
        .glass-scroll::-webkit-scrollbar-track{background:rgba(255,255,255,0.04);border-radius:4px}
        .glass-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.18);border-radius:4px}
        .time-strip::-webkit-scrollbar{display:none}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: "#08192b", minHeight: "420px" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 700px at 75% 50%,rgba(6,20,58,0.95),transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(600px 500px at 20% 60%,rgba(252,11,5,0.06),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-7" style={{ background: "rgba(252,11,5,0.13)", border: "1px solid rgba(252,11,5,0.32)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#fc0b05] inline-block" />
            <span className="text-white">Live Load Board</span>
          </div>
          <h1 className="display font-black leading-[1.02] text-[56px] md:text-[76px] lg:text-[88px] max-w-3xl">
            <span className="text-white">Find loads.</span><br />
            <span style={{ color: "#fc0b05" }}>Get paid in 48 hours.</span>
          </h1>
          <p className="mt-6 text-white/55 text-[15px] md:text-[17px] max-w-[520px] leading-relaxed">
            Hundreds of verified drayage jobs from US ports, updated in real time. Browse free — sign up to claim loads and get paid within 48 hours of delivery.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={() => document.getElementById("load-board-glass")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-bold text-white transition hover:opacity-90"
              style={{ background: "#fc0b05" }}>
              Browse Jobs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
            <button onClick={() => setShowSignIn(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-bold text-white transition hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.22)" }}>
              Sign Up Free
            </button>
          </div>
        </div>
      </section>

      {/* ── QUICK BOOK STRIP ── */}
      <section style={{ background: "#060f1e", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1100px] mx-auto px-6 py-4">
          {/* Day + time strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 time-strip">
            {weekDays.map((d, i) => (
              <button key={i} onClick={() => setSelectedDay(i)}
                className="shrink-0 flex flex-col items-center rounded-xl transition-all"
                style={{
                  padding: "8px 12px", minWidth: 52,
                  background: selectedDay === i ? "#fc0b05" : "rgba(255,255,255,0.06)",
                  color: selectedDay === i ? "white" : "rgba(255,255,255,0.45)",
                  border: `1px solid ${selectedDay === i ? "#fc0b05" : "rgba(255,255,255,0.09)"}`,
                }}>
                <span className="text-[10px] font-bold">{d.day}</span>
                <span className="num text-[16px] font-extrabold">{d.date}</span>
                <span style={{ width: 14, height: 2, background: selectedDay === i ? "rgba(255,255,255,0.5)" : "transparent", borderRadius: 1, marginTop: 2 }} />
              </button>
            ))}
            <div style={{ width: 1, height: 44, background: "rgba(255,255,255,0.10)", flexShrink: 0, margin: "0 4px" }} />
            {TIME_SLOTS.map((t, i) => (
              <button key={i} onClick={() => setSelectedTime(i)}
                className="shrink-0 rounded-xl text-[11px] font-semibold transition-all"
                style={{
                  padding: "8px 12px", minWidth: 70,
                  background: selectedTime === i ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                  color: selectedTime === i ? "white" : "rgba(255,255,255,0.38)",
                  border: `1px solid ${selectedTime === i ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.07)"}`,
                }}>
                {t}
              </button>
            ))}
          </div>
          {/* Service type + CTA */}
          <div className="flex items-center gap-3 flex-wrap">
            {(["Drayage", "Import", "Export"] as const).map(s => (
              <button key={s} onClick={() => setBookService(s)}
                className="px-5 py-2 rounded-lg text-[13px] font-semibold transition-all"
                style={{
                  background: bookService === s ? "rgba(255,255,255,0.10)" : "transparent",
                  color: bookService === s ? "white" : "rgba(255,255,255,0.42)",
                  border: `1px solid ${bookService === s ? "rgba(255,255,255,0.20)" : "rgba(255,255,255,0.09)"}`,
                }}>
                {s}
              </button>
            ))}
            <div className="flex-1" />
            <button onClick={() => setShowSignIn(true)}
              className="px-6 py-2.5 rounded-xl text-[13px] font-bold text-white transition hover:opacity-90"
              style={{ background: "#fc0b05" }}>
              Get Instant Quote →
            </button>
          </div>
        </div>
      </section>

      {/* ── GLASS LOAD BOARD ── */}
      <section id="load-board-glass" className="py-12" style={{ background: "#08192b" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="rounded-2xl overflow-hidden" style={{
            background: "rgba(10,20,42,0.82)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}>

            {/* Glass header */}
            <div className="px-6 pt-5 pb-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div>
                <div className="display text-white text-[22px] font-bold leading-tight">Load Board</div>
                <div className="text-white/35 text-[12px] mt-0.5">Live available drayage loads</div>
              </div>
              <div className="flex items-center gap-3">
                {/* Map / List toggle */}
                <div className="flex overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8 }}>
                  {(["map", "list"] as const).map((mode, i) => (
                    <button key={mode} onClick={() => setViewMode(mode)}
                      className="flex items-center gap-1.5 text-[11px] font-bold transition"
                      style={{
                        padding: "6px 14px",
                        background: viewMode === mode ? "#fc0b05" : "transparent",
                        color: viewMode === mode ? "white" : "rgba(255,255,255,0.45)",
                        borderRight: i === 0 ? "1px solid rgba(255,255,255,0.15)" : "none",
                      }}>
                      {mode === "map"
                        ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
                        : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                      }
                      {mode === "map" ? "Map" : "List"}
                    </button>
                  ))}
                </div>
                {/* LIVE indicator */}
                <div className="flex items-center gap-1.5 font-bold text-[12px]" style={{ color: "#4ade80" }}>
                  <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse inline-block" />
                  LIVE
                </div>
              </div>
            </div>

            {/* Mode tabs: All | Drayage | P-P | Intermodal */}
            <div className="px-6 pt-4 pb-3 flex gap-2 flex-wrap">
              {[
                { key: "all", label: "All" },
                { key: "drayage", label: "Drayage" },
                { key: "pp", label: "P-P" },
                { key: "intermodal", label: "Intermodal" },
              ].map(t => (
                <button key={t.key} onClick={() => setActiveMode(t.key)}
                  className="px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
                  style={{
                    background: activeMode === t.key
                      ? "linear-gradient(135deg,rgba(252,11,5,0.88),rgba(180,8,3,0.88))"
                      : "rgba(255,255,255,0.06)",
                    color: activeMode === t.key ? "white" : "rgba(255,255,255,0.52)",
                    border: activeMode === t.key ? "1px solid rgba(252,11,5,0.40)" : "1px solid rgba(255,255,255,0.09)",
                  }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Filter dropdowns */}
            <div className="px-6 pb-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                {[
                  { label: "DISTANCE", opts: [{ v: "all", l: "Any" }, { v: "local", l: "< 50 mi" }, { v: "mid", l: "50–200 mi" }, { v: "long", l: "200+ mi" }], val: "all" },
                  { label: "TYPE",     opts: [{ v: "all", l: "Any" }, { v: "dry", l: "Dry" }, { v: "cool", l: "Reefer" }, { v: "flat", l: "Flatbed" }, { v: "ow", l: "O/W" }], val: activeFilter },
                  { label: "WEIGHT",   opts: [{ v: "all", l: "Any" }, { v: "lt30", l: "< 30K" }, { v: "30-40", l: "30–40K" }, { v: "gt40", l: "40K+" }], val: "all" },
                  { label: "WEATHER",  opts: [{ v: "all", l: "Any" }, { v: "dry", l: "Dry" }, { v: "cool", l: "Reefer" }], val: "all" },
                ].map(f => (
                  <div key={f.label}>
                    <div className="text-[9px] uppercase tracking-[0.18em] text-white/30 mb-1.5 font-bold">{f.label}</div>
                    <select
                      value={f.val}
                      onChange={f.label === "TYPE" ? e => setActiveFilter(e.target.value) : undefined}
                      className="w-full text-[13px] text-white/80 bg-transparent focus:outline-none cursor-pointer font-medium"
                      style={{ colorScheme: "dark" }}
                    >
                      {f.opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Load list or map */}
            <div className="px-6 pb-2 glass-scroll" style={{ maxHeight: 520, overflowY: "auto" }}>
              {viewMode === "map" ? (
                <div className="pb-4">
                  <LoadMapView loads={filtered} onMarkerClick={() => setShowSignIn(true)} />
                </div>
              ) : (
                filtered.map(load => (
                  <LoadListRow key={load.id} load={load} onClick={() => setShowSignIn(true)} />
                ))
              )}
            </div>

            {/* Glass footer */}
            <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-[12px] text-white/30">{filtered.length} loads · updates every 60s</span>
              <button onClick={() => setShowSignIn(true)} className="text-[12px] font-semibold transition hover:opacity-80" style={{ color: "#fc0b05" }}>
                + Post a Dry Load
              </button>
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
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.16em] mb-6 pb-3 border-b border-[#f1f5f9]" style={{ color: "#fc0b05" }}>For Shippers &amp; Brokers</div>
              <div className="space-y-6">
                {[
                  { n:"1", t:"Post your load",    d:"Enter origin terminal, delivery address, container type, and weight. Takes 60 seconds." },
                  { n:"2", t:"Get carrier bids",   d:"Verified carriers on the DrayGo network are notified instantly. First bids arrive in minutes." },
                  { n:"3", t:"Confirm & dispatch", d:"Accept a bid, sign the rate confirmation digitally, and the carrier is dispatched." },
                  { n:"4", t:"Track & invoice",    d:"Live GPS tracking from gate-out to delivery. Digital POD, BOL, and automated invoicing." },
                ].map(s => (
                  <div key={s.n} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-[13px] font-bold" style={{ background: "#fc0b05" }}>{s.n}</div>
                    <div><div className="text-[15px] font-semibold text-[#08192b]">{s.t}</div><p className="text-[13.5px] text-[#64748b] mt-1 leading-relaxed">{s.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.16em] mb-6 pb-3 border-b border-[#f1f5f9]" style={{ color: "#08192b" }}>For Carriers</div>
              <div className="space-y-6">
                {[
                  { n:"1", t:"Browse live loads",    d:"Filter by location, container type, distance, and rate. See loads the moment they're posted." },
                  { n:"2", t:"Claim in one tap",      d:"Hit Claim and receive the full packet — terminal name, container number, contacts — instantly." },
                  { n:"3", t:"Complete & submit POD", d:"Deliver the load, get the proof of delivery signed, and upload it from your phone." },
                  { n:"4", t:"Get paid in 48h",       d:"DrayGo processes carrier payments within 48 hours of approved POD. No net-30 wait." },
                ].map(s => (
                  <div key={s.n} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-[13px] font-bold" style={{ background: "#08192b" }}>{s.n}</div>
                    <div><div className="text-[15px] font-semibold text-[#08192b]">{s.t}</div><p className="text-[13.5px] text-[#64748b] mt-1 leading-relaxed">{s.d}</p></div>
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
          <p className="mt-4 text-white/60 text-[15px] max-w-xl mx-auto leading-relaxed">Join thousands of shippers, brokers, and carriers already using DrayGo.</p>
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
