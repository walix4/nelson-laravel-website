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

const DryIcon  = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 45.16 45.16" fill="#facc15" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.58,11.269c-6.237,0-11.311,5.075-11.311,11.312s5.074,11.312,11.311,11.312c6.236,0,11.311-5.074,11.311-11.312S28.816,11.269,22.58,11.269z M22.58,7.944c-1.219,0-2.207-0.988-2.207-2.206V2.207C20.373,0.988,21.361,0,22.58,0c1.219,0,2.207,0.988,2.207,2.207v3.531C24.787,6.956,23.798,7.944,22.58,7.944z M22.58,37.215c-1.219,0-2.207,0.988-2.207,2.207v3.53c0,1.22,0.988,2.208,2.207,2.208c1.219,0,2.207-0.988,2.207-2.208v-3.53C24.787,38.203,23.798,37.215,22.58,37.215z M32.928,12.231c-0.861-0.862-0.861-2.259,0-3.121l2.497-2.497c0.861-0.861,2.259-0.861,3.121,0c0.862,0.862,0.862,2.26,0,3.121l-2.497,2.497C35.188,13.093,33.791,13.093,32.928,12.231z M12.231,32.93c-0.862-0.863-2.259-0.863-3.121,0l-2.497,2.496c-0.861,0.861-0.862,2.26,0,3.121c0.862,0.861,2.26,0.861,3.121,0l2.497-2.498C13.093,35.188,13.093,33.79,12.231,32.93z M37.215,22.58c0-1.219,0.988-2.207,2.207-2.207h3.531c1.219,0,2.207,0.988,2.207,2.207c0,1.219-0.988,2.206-2.207,2.206h-3.531C38.203,24.786,37.215,23.799,37.215,22.58z M7.944,22.58c0-1.219-0.988-2.207-2.207-2.207h-3.53C0.988,20.373,0,21.361,0,22.58c0,1.219,0.988,2.206,2.207,2.206h3.531C6.956,24.786,7.944,23.799,7.944,22.58z M32.928,32.93c0.862-0.861,2.26-0.861,3.121,0l2.497,2.497c0.862,0.86,0.862,2.259,0,3.12s-2.259,0.861-3.121,0l-2.497-2.497C32.066,35.188,32.066,33.791,32.928,32.93z M12.231,12.231c0.862-0.862,0.862-2.259,0-3.121L9.734,6.614c-0.862-0.862-2.259-0.862-3.121,0c-0.862,0.861-0.862,2.259,0,3.12l2.497,2.497C9.972,13.094,11.369,13.094,12.231,12.231z"/>
  </svg>
);
const CoolIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="80 320 64 64" fill="#38bdf8" xmlns="http://www.w3.org/2000/svg">
    <path d="m109.044 346.923-7.674-4.43s-1.898-8.897-1.898-8.897c-.338-1.582-1.896-2.593-3.478-2.255-1.583.337-2.593 1.896-2.255 3.478 0 0 .795 3.727.795 3.727s-3.67-2.119-3.67-2.119c-1.401-.809-3.195-.328-4.004 1.073s-.328 3.195 1.073 4.004c0 0 3.67 2.119 3.67 2.119s-3.626 1.175-3.626 1.175c-1.539.498-2.383 2.153-1.884 3.691.498 1.539 2.153 2.384 3.692 1.885 0 0 8.654-2.805 8.654-2.805s7.674 4.431 7.674 4.431-7.674 4.431-7.674 4.431-8.654-2.805-8.654-2.805c-1.539-.499-3.194.346-3.692 1.885-.499 1.538.345 3.193 1.884 3.691 0 0 3.626 1.175 3.626 1.175s-3.67 2.119-3.67 2.119c-1.401.809-1.882 2.603-1.073 4.004s2.603 1.882 4.004 1.073c0 0 3.67-2.119 3.67-2.119s-.795 3.727-.795 3.727c-.338 1.582.672 3.141 2.255 3.478 1.582.338 3.14-.673 3.478-2.255 0 0 1.898-8.897 1.898-8.897s7.674-4.43 7.674-4.43v8.861s-6.756 6.092-6.756 6.092c-1.202 1.084-1.297 2.938-.214 4.14 1.083 1.201 2.938 1.297 4.14.214 0 0 2.83-2.553 2.83-2.553v4.238c0 1.618 1.313 2.931 2.931 2.931 1.617 0 2.931-1.313 2.931-2.931v-4.238s2.83 2.553 2.83 2.553c1.201 1.083 3.056.987 4.14-.214 1.083-1.202.987-3.056-.214-4.14 0 0-6.756-6.092-6.756-6.092v-8.861s7.674 4.43 7.674 4.43 1.898 8.897 1.898 8.897c.337 1.582 1.896 2.593 3.478 2.255 1.582-.337 2.593-1.896 2.255-3.478 0 0-.795-3.727-.795-3.727s3.67 2.119 3.67 2.119c1.401.809 3.195.328 4.004-1.073.808-1.401.328-3.195-1.073-4.004 0 0-3.67-2.119-3.67-2.119s3.625-1.175 3.625-1.175c1.539-.498 2.384-2.153 1.885-3.691-.499-1.539-2.153-2.384-3.692-1.885 0 0-8.654 2.805-8.654 2.805s-7.674-4.431-7.674-4.431 7.674-4.431 7.674-4.431 8.654 2.805 8.654 2.805c1.539.499 3.193-.346 3.692-1.885.499-1.538-.346-3.193-1.885-3.691 0 0-3.625-1.175-3.625-1.175s3.67-2.119 3.67-2.119c1.401-.809 1.881-2.603 1.073-4.004-.809-1.401-2.603-1.882-4.004-1.073 0 0-3.67 2.119-3.67 2.119s.795-3.727.795-3.727c.338-1.582-.673-3.141-2.255-3.478-1.582-.338-3.141.673-3.478 2.255 0 0-1.898 8.897-1.898 8.897s-7.674 4.43-7.674 4.43v-8.861s6.756-6.092 6.756-6.092c1.201-1.084 1.297-2.938.214-4.14-1.084-1.201-2.939-1.297-4.14-.214 0 0-2.83 2.553-2.83 2.553v-4.238c0-1.618-1.314-2.931-2.931-2.931-1.618 0-2.931 1.313-2.931 2.931v4.238s-2.83-2.553-2.83-2.553c-1.202-1.083-3.057-.987-4.14.214-1.083 1.202-.988 3.056.214 4.14 0 0 6.756 6.092 6.756 6.092z"/>
  </svg>
);
const FlatIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="14" width="22" height="3" rx="1"/>
    <rect x="1" y="7" width="4" height="7" rx="0.5"/>
    <rect x="19" y="7" width="4" height="7" rx="0.5"/>
  </svg>
);
const OWIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="12" x2="17" y2="12"/>
    <line x1="5" y1="8" x2="5" y2="16"/>
    <line x1="3" y1="9.5" x2="3" y2="14.5"/>
    <line x1="19" y1="8" x2="19" y2="16"/>
    <line x1="21" y1="9.5" x2="21" y2="14.5"/>
  </svg>
);

const TYPE_ICON: Record<string, React.ReactNode> = {
  dry:  <DryIcon size={22} />,
  cool: <CoolIcon size={22} />,
  flat: <FlatIcon size={22} />,
  ow:   <OWIcon size={22} />,
};

function BookingDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(4,12,38,0.75)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
      onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "linear-gradient(160deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.04) 100%)", border: "1px solid rgba(255,255,255,0.14)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        onClick={e => e.stopPropagation()}>
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

function LoadCard({ load, idx, onClick, refreshing = false }: { load: typeof LOADS[0]; idx: number; onClick: () => void; refreshing?: boolean }) {
  const [hovered, setHovered] = useState(false);

  if (refreshing) {
    return (
      <div className="relative overflow-hidden" style={{
        background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "12px", minHeight: "290px", display: "flex", flexDirection: "column",
      }}>
        {/* shimmer sweep */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.07) 50%, transparent 80%)",
          backgroundSize: "200% 100%", animation: "shimmerSweep 1.1s ease-in-out infinite",
        }} />
        {/* skeleton header */}
        <div className="p-4 flex items-start gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ width: 46, height: 64, borderRadius: 8, background: "rgba(255,255,255,0.08)" }} />
          <div style={{ flex: 1, paddingTop: 2 }}>
            <div style={{ height: 11, width: "55%", borderRadius: 4, background: "rgba(255,255,255,0.08)", marginBottom: 8 }} />
            <div style={{ height: 9,  width: "35%", borderRadius: 4, background: "rgba(255,255,255,0.05)" }} />
          </div>
          <div style={{ width: 64, paddingTop: 2 }}>
            <div style={{ height: 18, width: "100%", borderRadius: 4, background: "rgba(255,255,255,0.09)", marginBottom: 7 }} />
            <div style={{ height: 8,  width: "65%",  borderRadius: 4, background: "rgba(255,255,255,0.05)", marginLeft: "auto" }} />
          </div>
        </div>
        {/* center loading text */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: "20px 16px" }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.10)", borderTopColor: "#fc0b05", animation: "spin 0.75s linear infinite" }} />
          <span style={{ color: "rgba(255,255,255,0.42)", fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase" }}>New Job Loading</span>
        </div>
        {/* skeleton footer */}
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{ height: 36, borderRadius: 8, background: "rgba(255,255,255,0.05)", marginBottom: 8 }} />
          <div style={{ height: 3, borderRadius: 4, background: "rgba(255,255,255,0.05)" }} />
        </div>
      </div>
    );
  }
  const isHot   = load.status === "hot";
  const num     = String(idx + 1).padStart(2, "0");
  const perMile = (load.rate / load.miles).toFixed(2);
  const icon    = TYPE_ICON[load.type] ?? TYPE_ICON.dry;

  return (
    <button onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-left w-full transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
      style={{
        background: hovered ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.07)",
        border: hovered ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.10)",
        borderRadius: "12px",
        boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.35)" : "0 2px 8px rgba(0,0,0,0.2)",
        transition: "all 0.18s ease",
      }}>

      {/* Hover sign-in overlay — slides in from left */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "12px", zIndex: 10,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.15)",
        transform: hovered ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.32s cubic-bezier(0.23,1,0.32,1)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 12, padding: "20px 22px",
      }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(252,11,5,0.16)", border: "1px solid rgba(252,11,5,0.30)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Sign in to see details</p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, lineHeight: 1.5 }}>Claim loads, view full route &amp; get paid in 48h</p>
        </div>
        <div style={{ display: "flex", gap: 8, width: "100%", marginTop: 4 }}>
          <a href="/login" onClick={e => e.stopPropagation()} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 0", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#fff", border: "1px solid rgba(255,255,255,0.22)", background: "transparent", textDecoration: "none" }}>Sign In</a>
          <a href="/register" onClick={e => e.stopPropagation()} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 0", borderRadius: 8, fontSize: 12, fontWeight: 700, color: "#fff", background: "#fc0b05", textDecoration: "none" }}>Sign Up</a>
        </div>
      </div>

      {/* Card content — hidden when overlay is active */}
      <div style={{ opacity: hovered ? 0 : 1, transition: "opacity 0.2s ease", pointerEvents: hovered ? "none" : "auto" }}>

      {/* Header */}
      <div className="p-4 flex items-start gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="shrink-0 rounded-lg flex flex-col items-center justify-between px-2.5 py-2.5 gap-1" style={{ background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.20)", minWidth: "46px" }}>
          <div className="flex items-center justify-center">{icon}</div>
          <span className="display num text-[18px] font-extrabold leading-none text-white">{num}</span>
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="text-[13px] font-bold text-white truncate">{load.id}</div>
          <div className="text-[11px] mt-0.5 font-medium" style={{ color: "#fc0b05" }}>{load.mode}</div>
        </div>
        <div className="text-right shrink-0 pt-0.5">
          <div className="text-[18px] font-extrabold leading-none text-white">${load.rate.toLocaleString()}</div>
          <div className="text-[9px] text-white/35 mt-1 uppercase tracking-wide">{perMile} per mile</div>
        </div>
      </div>

      {/* Route */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5 flex-1 min-w-0">
            <div className="shrink-0 mt-1"><div className="w-3 h-3 rounded-full" style={{ border: "2.5px solid #3b82f6", background: "#3b82f6" }} /></div>
            <div className="min-w-0">
              <div className="text-[13px] font-bold text-white truncate">{load.origin}</div>
              <div className="text-[10px] text-white/40 mt-0.5">Pickup · {load.avail}</div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[8px] uppercase tracking-[0.14em] text-white/30 font-semibold">WEIGHT</div>
            <div className="text-[11px] font-bold text-white">{load.weight}</div>
          </div>
        </div>
        <div style={{ marginLeft: "5px", height: "22px", borderLeft: "1.5px dashed rgba(255,255,255,0.22)" }} />
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5 flex-1 min-w-0">
            <div className="shrink-0 mt-1"><div className="w-3 h-3 rounded-full" style={{ border: "2.5px solid #4ade80", background: "#4ade80" }} /></div>
            <div className="min-w-0">
              <div className="text-[13px] font-bold truncate" style={{ color: "#4ade80" }}>{load.dest}</div>
              <div className="text-[10px] text-white/40 mt-0.5">Drop-off · {load.miles} mi</div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[8px] uppercase tracking-[0.14em] text-white/30 font-semibold">AVAIL</div>
            <div className="text-[11px] font-bold text-white">{load.avail}</div>
          </div>
        </div>
      </div>

      {/* Detail strip */}
      <div className="px-4 pb-3 pt-2">
        <div className="grid grid-cols-3 rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)" }}>
          {[
            { label: "DISTANCE", value: `${load.miles} MI` },
            { label: "WEIGHT",   value: load.weight },
            { label: "CONT TYPE",value: load.container },
          ].map((d, i) => (
            <div key={d.label} className="px-2 py-2 text-center" style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <div className="text-[8px] uppercase tracking-[0.14em] text-white/30 font-semibold">{d.label}</div>
              <div className="text-[11px] font-bold text-white mt-0.5">{d.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-2.5 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
          <div className="h-full rounded-full" style={{ background: isHot ? "#fc0b05" : "#4ade80", width: isHot ? "72%" : "38%" }} />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 flex items-center justify-between">
        {isHot
          ? <span className="text-[9px] font-bold px-2.5 py-1.5 rounded" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.28)" }}>High Demand</span>
          : <span className="text-[9px] font-bold px-2.5 py-1.5 rounded" style={{ background: "rgba(74,222,128,0.10)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.22)" }}>Available</span>
        }
        <button
          className="text-[11px] font-bold text-white px-4 py-1.5 rounded transition hover:opacity-90"
          style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)" }}
          onClick={e => { e.stopPropagation(); onClick(); }}>
          Get Job
        </button>
      </div>

      </div>{/* end card content wrapper */}
    </button>
  );
}

export default function LoadBoardPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [activeMode, setActiveMode] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [viewMode, setViewMode]     = useState<"list" | "map">("list");
  const [hideList, setHideList]     = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 3000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filtered = LOADS.filter(l => {
    const modeOk = activeMode === "all"
      || (activeMode === "drayage"   && l.mode === "Drayage")
      || (activeMode === "pp"        && l.mode === "Port→Port")
      || (activeMode === "intermodal"&& l.mode === "Intermodal");
    const typeOk = activeType === "all" || l.type === activeType;
    return modeOk && typeOk;
  });

  return (
    <div style={{ position: "relative", background: "#08192b", overflow: "hidden" }}>
      <style>{`
        @keyframes shimmerSweep {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      {/* Full-page background video */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: "fixed", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.45, zIndex: 0, pointerEvents: "none",
        }}
        src="/load-board-bg.mp4"
      />
      <div style={{ position: "fixed", inset: 0, background: "rgba(8,25,43,0.60)", zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 2 }}>
      <Nav />
      {showDialog && <BookingDialog onClose={() => setShowDialog(false)} />}

      <section className="min-h-screen py-8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="rounded-2xl overflow-hidden" style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(252,11,5,0.30)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            borderTop: "1px solid rgba(255,255,255,0.13)",
          }}>

            {/* Glass header */}
            <div className="px-6 pt-5 pb-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div>
                <div className="display text-white text-[22px] font-bold leading-tight">Load Board</div>
                <div className="text-white/35 text-[12px] mt-0.5">Live available drayage loads</div>
              </div>
              <div className="flex items-center gap-3">
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
                <div className="flex items-center gap-1.5 font-bold text-[12px]" style={{ color: "#4ade80" }}>
                  <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse inline-block" />
                  LIVE
                </div>
              </div>
            </div>

            {/* Pill filter bar */}
            <div className="px-4 py-3 flex items-center gap-1.5 flex-wrap" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {/* Mode pills */}
              {[
                { key: "all",         label: "All Modes",  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
                { key: "drayage",     label: "Drayage",    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                { key: "intermodal",  label: "Intermodal", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
                { key: "pp",          label: "Port→Port",  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg> },
              ].map(t => (
                <button key={t.key} onClick={() => setActiveMode(t.key)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold rounded-lg transition-all"
                  style={{
                    background: activeMode === t.key ? "#3b82f6" : "rgba(255,255,255,0.06)",
                    color:      activeMode === t.key ? "#fff"    : "rgba(255,255,255,0.55)",
                    border:     activeMode === t.key ? "1px solid rgba(59,130,246,0.0)" : "1px solid rgba(255,255,255,0.1)",
                  }}>
                  {t.icon}{t.label}
                </button>
              ))}

              <div style={{ width: 1, height: 26, background: "rgba(255,255,255,0.13)", margin: "0 4px", flexShrink: 0 }} />

              {/* Type pills */}
              {[
                { key: "all",  label: "All Types",   icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
                { key: "dry",  label: "Dry",          icon: <DryIcon size={14} /> },
                { key: "cool", label: "Reefer",        icon: <CoolIcon size={14} /> },
                { key: "flat", label: "Flatrack",       icon: <FlatIcon size={14} /> },
                { key: "ow",   label: "Overweight",    icon: <OWIcon size={14} /> },
              ].map(t => (
                <button key={t.key} onClick={() => setActiveType(t.key)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold rounded-lg transition-all"
                  style={{
                    background: activeType === t.key ? "#fc0b05" : "rgba(255,255,255,0.06)",
                    color:      activeType === t.key ? "#fff"    : "rgba(255,255,255,0.55)",
                    border:     activeType === t.key ? "1px solid rgba(252,11,5,0.0)" : "1px solid rgba(255,255,255,0.1)",
                  }}>
                  {t.icon}{t.label}
                </button>
              ))}

              {/* Hide List */}
              <button onClick={() => setHideList(h => !h)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold rounded-lg transition-all ml-auto"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                {hideList ? "Show List" : "Hide List"}
              </button>
            </div>

            {/* Content: map or card grid */}
            {!hideList && (
              <div className="px-6 pb-6 pt-4">
                {viewMode === "map" ? (
                  <LoadMapView loads={filtered} onMarkerClick={(_ids) => setShowDialog(true)} />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filtered.slice(0, 8).map((load, idx) => (
                      <LoadCard key={load.id} load={load} idx={idx} onClick={() => setShowDialog(true)} refreshing={refreshing} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Footer bar */}
            <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-[12px] text-white/30">{filtered.length} loads · updates every 8s</span>
              <button onClick={() => setShowDialog(true)} className="text-[12px] font-semibold transition hover:opacity-80" style={{ color: "#fc0b05" }}>
                + Post a Load
              </button>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      </div>{/* end zIndex wrapper */}
    </div>
  );
}
