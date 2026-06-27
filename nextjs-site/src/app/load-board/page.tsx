"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LoadMapView from "./LoadMapView";

const LOADS = [
  { id: "DG-4821", mode: "Drayage",    origin: "LA/Long Beach",  terminal: "APM Terminal",   dest: "Ontario, CA",      container: "40' HC",  miles: 58,  weight: "42K", rate: 1850, avail: "Today",    status: "hot",       type: "dry",      pickupTime: "07:00 AM", dropoffTime: "10:30 AM", fsc: "19.5%" },
  { id: "DG-4822", mode: "Drayage",    origin: "NY/NJ Port",     terminal: "Maher Terminal", dest: "Newark, NJ",       container: "20' Std", miles: 12,  weight: "28K", rate: 650,  avail: "Today",    status: "available", type: "dry",      pickupTime: "09:00 AM", dropoffTime: "11:00 AM", fsc: "17.2%" },
  { id: "DG-4823", mode: "Intermodal", origin: "Savannah, GA",   terminal: "GPA Garden City",dest: "Atlanta, GA",      container: "40' Std", miles: 246, weight: "35K", rate: 2200, avail: "Tomorrow", status: "available", type: "dry",      pickupTime: "06:30 AM", dropoffTime: "02:00 PM", fsc: "21.0%" },
  { id: "DG-4824", mode: "Drayage",    origin: "Houston, TX",    terminal: "Bayport Term.",  dest: "Pasadena, TX",     container: "45' HC",  miles: 34,  weight: "44K", rate: 1100, avail: "Today",    status: "available", type: "hazmat",   pickupTime: "10:00 AM", dropoffTime: "12:30 PM", fsc: "18.8%" },
  { id: "DG-4825", mode: "Port→Port",  origin: "Seattle, WA",    terminal: "SSA T-18",       dest: "Tacoma, WA",       container: "20' Rfr", miles: 28,  weight: "18K", rate: 980,  avail: "Today",    status: "hot",       type: "reefer",   pickupTime: "08:00 AM", dropoffTime: "10:00 AM", fsc: "22.3%" },
  { id: "DG-4826", mode: "Drayage",    origin: "Miami, FL",      terminal: "PortMiami D",    dest: "Medley, FL",       container: "40' HC",  miles: 22,  weight: "38K", rate: 875,  avail: "Tomorrow", status: "available", type: "dry",      pickupTime: "07:30 AM", dropoffTime: "09:30 AM", fsc: "16.5%" },
  { id: "DG-4827", mode: "Intermodal", origin: "Chicago, IL",    terminal: "BNSF Alliance",  dest: "Indianapolis, IN", container: "53' Std", miles: 184, weight: "41K", rate: 1750, avail: "Jun 17",   status: "available", type: "urgent",   pickupTime: "05:00 AM", dropoffTime: "01:00 PM", fsc: "20.1%" },
  { id: "DG-4828", mode: "Drayage",    origin: "Norfolk, VA",    terminal: "NIT Terminal",   dest: "Richmond, VA",     container: "40' Std", miles: 95,  weight: "30K", rate: 1200, avail: "Today",    status: "hot",       type: "hot_load", pickupTime: "06:00 AM", dropoffTime: "09:30 AM", fsc: "23.7%" },
  { id: "DG-4829", mode: "Drayage",    origin: "Baltimore, MD",  terminal: "Seagirt Marine", dest: "Frederick, MD",    container: "20' Std", miles: 62,  weight: "22K", rate: 890,  avail: "Tomorrow", status: "available", type: "reefer",   pickupTime: "08:30 AM", dropoffTime: "11:00 AM", fsc: "18.0%" },
  { id: "DG-4830", mode: "Port→Port",  origin: "LA/LB — TTI",   terminal: "TTI Terminal",   dest: "LA/LB — Trapac",   container: "40' HC",  miles: 8,   weight: "36K", rate: 420,  avail: "Today",    status: "available", type: "flat",     pickupTime: "11:00 AM", dropoffTime: "12:00 PM", fsc: "15.9%" },
  { id: "DG-4831", mode: "Intermodal", origin: "Dallas, TX",     terminal: "BNSF Alliance",  dest: "Memphis, TN",      container: "40' Std", miles: 468, weight: "32K", rate: 3100, avail: "Jun 17",   status: "available", type: "urgent",   pickupTime: "04:00 AM", dropoffTime: "03:00 PM", fsc: "21.8%" },
  { id: "DG-4832", mode: "Drayage",    origin: "Charleston, SC", terminal: "Wando Welch",    dest: "Greenville, SC",   container: "45' HC",  miles: 218, weight: "43K", rate: 2400, avail: "Tomorrow", status: "hot",       type: "hot_load", pickupTime: "07:00 AM", dropoffTime: "01:30 PM", fsc: "24.5%" },
];

const LIVE_POOL = [
  { id: "DG-4833", mode: "Drayage",    origin: "Boston, MA",     terminal: "Conley Term.",   dest: "Worcester, MA",    container: "40' HC",  miles: 45,  weight: "34K", rate: 1300, avail: "Today",    status: "hot",       type: "dry",      pickupTime: "08:00 AM", dropoffTime: "10:30 AM", fsc: "20.4%" },
  { id: "DG-4834", mode: "Intermodal", origin: "Portland, OR",   terminal: "Terminal 6",     dest: "Eugene, OR",       container: "40' Std", miles: 113, weight: "29K", rate: 1650, avail: "Tomorrow", status: "available", type: "reefer",   pickupTime: "06:00 AM", dropoffTime: "10:00 AM", fsc: "17.8%" },
  { id: "DG-4835", mode: "Drayage",    origin: "Tampa, FL",      terminal: "Port Tampa",     dest: "Orlando, FL",      container: "20' Std", miles: 78,  weight: "25K", rate: 960,  avail: "Today",    status: "available", type: "hazmat",   pickupTime: "09:30 AM", dropoffTime: "12:00 PM", fsc: "19.1%" },
  { id: "DG-4836", mode: "Port→Port",  origin: "Tacoma, WA",     terminal: "T-4 Terminal",   dest: "Seattle, WA",      container: "45' HC",  miles: 31,  weight: "40K", rate: 780,  avail: "Today",    status: "hot",       type: "flat",     pickupTime: "07:00 AM", dropoffTime: "09:00 AM", fsc: "22.0%" },
  { id: "DG-4837", mode: "Drayage",    origin: "Oakland, CA",    terminal: "Outer Harbor",   dest: "Stockton, CA",     container: "40' HC",  miles: 82,  weight: "37K", rate: 1450, avail: "Tomorrow", status: "available", type: "reefer",   pickupTime: "10:00 AM", dropoffTime: "01:30 PM", fsc: "18.5%" },
  { id: "DG-4838", mode: "Intermodal", origin: "Detroit, MI",    terminal: "Conrail Yard",   dest: "Columbus, OH",     container: "53' Std", miles: 165, weight: "44K", rate: 2100, avail: "Jun 27",   status: "available", type: "urgent",   pickupTime: "05:30 AM", dropoffTime: "11:00 AM", fsc: "21.3%" },
  { id: "DG-4839", mode: "Drayage",    origin: "San Diego, CA",  terminal: "National City",  dest: "Los Angeles, CA",  container: "20' Rfr", miles: 118, weight: "18K", rate: 1580, avail: "Today",    status: "hot",       type: "hot_load", pickupTime: "06:30 AM", dropoffTime: "10:30 AM", fsc: "24.2%" },
  { id: "DG-4840", mode: "Drayage",    origin: "Wilmington, DE", terminal: "Port of Wilm.",  dest: "Philadelphia, PA", container: "40' Std", miles: 28,  weight: "31K", rate: 740,  avail: "Tomorrow", status: "available", type: "dry",      pickupTime: "08:00 AM", dropoffTime: "09:30 AM", fsc: "16.7%" },
  { id: "DG-4841", mode: "Drayage",    origin: "Philadelphia, PA",terminal: "PhilaPORT",     dest: "Allentown, PA",    container: "40' HC",  miles: 59,  weight: "39K", rate: 1090, avail: "Today",    status: "available", type: "dry",      pickupTime: "09:00 AM", dropoffTime: "11:30 AM", fsc: "18.9%" },
  { id: "DG-4842", mode: "Intermodal", origin: "Kansas City, MO",terminal: "BNSF Intermodal",dest: "Wichita, KS",      container: "53' Std", miles: 202, weight: "38K", rate: 2350, avail: "Jun 27",   status: "available", type: "urgent",   pickupTime: "04:30 AM", dropoffTime: "12:00 PM", fsc: "20.6%" },
  { id: "DG-4843", mode: "Drayage",    origin: "New Orleans, LA",terminal: "ICTSI Louisiana",dest: "Baton Rouge, LA",  container: "40' HC",  miles: 81,  weight: "42K", rate: 1480, avail: "Today",    status: "hot",       type: "dry",      pickupTime: "07:30 AM", dropoffTime: "10:30 AM", fsc: "23.1%" },
  { id: "DG-4844", mode: "Port→Port",  origin: "Long Beach, CA", terminal: "Pier J",         dest: "LA/LB — Yusen",   container: "40' Std", miles: 5,   weight: "33K", rate: 310,  avail: "Today",    status: "available", type: "flat",     pickupTime: "01:00 PM", dropoffTime: "02:00 PM", fsc: "15.5%" },
];

const DryIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 45.16 45.16" fill="#facc15" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
    <path d="M22.58,11.269c-6.237,0-11.311,5.075-11.311,11.312s5.074,11.312,11.311,11.312c6.236,0,11.311-5.074,11.311-11.312S28.816,11.269,22.58,11.269z M22.58,7.944c-1.219,0-2.207-0.988-2.207-2.206V2.207C20.373,0.988,21.361,0,22.58,0c1.219,0,2.207,0.988,2.207,2.207v3.531C24.787,6.956,23.798,7.944,22.58,7.944z M22.58,37.215c-1.219,0-2.207,0.988-2.207,2.207v3.53c0,1.22,0.988,2.208,2.207,2.208c1.219,0,2.207-0.988,2.207-2.208v-3.53C24.787,38.203,23.798,37.215,22.58,37.215z M32.928,12.231c-0.861-0.862-0.861-2.259,0-3.121l2.497-2.497c0.861-0.861,2.259-0.861,3.121,0c0.862,0.862,0.862,2.26,0,3.121l-2.497,2.497C35.188,13.093,33.791,13.093,32.928,12.231z M12.231,32.93c-0.862-0.863-2.259-0.863-3.121,0l-2.497,2.496c-0.861,0.861-0.862,2.26,0,3.121c0.862,0.861,2.26,0.861,3.121,0l2.497-2.498C13.093,35.188,13.093,33.79,12.231,32.93z M37.215,22.58c0-1.219,0.988-2.207,2.207-2.207h3.531c1.219,0,2.207,0.988,2.207,2.207c0,1.219-0.988,2.206-2.207,2.206h-3.531C38.203,24.786,37.215,23.799,37.215,22.58z M7.944,22.58c0-1.219-0.988-2.207-2.207-2.207h-3.53C0.988,20.373,0,21.361,0,22.58c0,1.219,0.988,2.206,2.207,2.206h3.531C6.956,24.786,7.944,23.799,7.944,22.58z M32.928,32.93c0.862-0.861,2.26-0.861,3.121,0l2.497,2.497c0.862,0.86,0.862,2.259,0,3.12s-2.259,0.861-3.121,0l-2.497-2.497C32.066,35.188,32.066,33.791,32.928,32.93z M12.231,12.231c0.862-0.862,0.862-2.259,0-3.121L9.734,6.614c-0.862-0.862-2.259-0.862-3.121,0c-0.862,0.861-0.862,2.259,0,3.12l2.497,2.497C9.972,13.094,11.369,13.094,12.231,12.231z"/>
  </svg>
);
const ImportIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v14"/><path d="M5 10l7 7 7-7"/><path d="M5 21h14"/>
  </svg>
);
const ExportIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21V7"/><path d="M5 14l7-7 7 7"/><path d="M5 3h14"/>
  </svg>
);
const ReeferIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="80 320 64 64" fill="#38bdf8" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
    <path d="m109.044 346.923-7.674-4.43s-1.898-8.897-1.898-8.897c-.338-1.582-1.896-2.593-3.478-2.255-1.583.337-2.593 1.896-2.255 3.478 0 0 .795 3.727.795 3.727s-3.67-2.119-3.67-2.119c-1.401-.809-3.195-.328-4.004 1.073s-.328 3.195 1.073 4.004c0 0 3.67 2.119 3.67 2.119s-3.626 1.175-3.626 1.175c-1.539.498-2.383 2.153-1.884 3.691.498 1.539 2.153 2.384 3.692 1.885 0 0 8.654-2.805 8.654-2.805s7.674 4.431 7.674 4.431-7.674 4.431-7.674 4.431-8.654-2.805-8.654-2.805c-1.539-.499-3.194.346-3.692 1.885-.499 1.538.345 3.193 1.884 3.691 0 0 3.626 1.175 3.626 1.175s-3.67 2.119-3.67 2.119c-1.401.809-1.882 2.603-1.073 4.004s2.603 1.882 4.004 1.073c0 0 3.67-2.119 3.67-2.119s-.795 3.727-.795 3.727c-.338 1.582.672 3.141 2.255 3.478 1.582.338 3.14-.673 3.478-2.255 0 0 1.898-8.897 1.898-8.897s7.674-4.43 7.674-4.43v8.861s-6.756 6.092-6.756 6.092c-1.202 1.084-1.297 2.938-.214 4.14 1.083 1.201 2.938 1.297 4.14.214 0 0 2.83-2.553 2.83-2.553v4.238c0 1.618 1.313 2.931 2.931 2.931 1.617 0 2.931-1.313 2.931-2.931v-4.238s2.83 2.553 2.83 2.553c1.201 1.083 3.056.987 4.14-.214 1.083-1.202.987-3.056-.214-4.14 0 0-6.756-6.092-6.756-6.092v-8.861s7.674 4.43 7.674 4.43 1.898 8.897 1.898 8.897c.337 1.582 1.896 2.593 3.478 2.255 1.582-.337 2.593-1.896 2.255-3.478 0 0-.795-3.727-.795-3.727s3.67 2.119 3.67 2.119c1.401.809 3.195.328 4.004-1.073.808-1.401.328-3.195-1.073-4.004 0 0-3.67-2.119-3.67-2.119s3.625-1.175 3.625-1.175c1.539-.498 2.384-2.153 1.885-3.691-.499-1.539-2.153-2.384-3.692-1.885 0 0-8.654 2.805-8.654 2.805s-7.674-4.431-7.674-4.431 7.674-4.431 7.674-4.431 8.654 2.805 8.654 2.805c1.539.499 3.193-.346 3.692-1.885.499-1.538-.346-3.193-1.885-3.691 0 0-3.625-1.175-3.625-1.175s3.67-2.119 3.67-2.119c1.401-.809 1.881-2.603 1.073-4.004-.809-1.401-2.603-1.882-4.004-1.073 0 0-3.67 2.119-3.67 2.119s.795-3.727.795-3.727c.338-1.582-.673-3.141-2.255-3.478-1.582-.338-3.141.673-3.478 2.255 0 0-1.898 8.897-1.898 8.897s-7.674 4.43-7.674 4.43v-8.861s6.756-6.092 6.756-6.092c1.201-1.084 1.297-2.938.214-4.14-1.084-1.201-2.939-1.297-4.14-.214 0 0-2.83 2.553-2.83 2.553v-4.238c0-1.618-1.314-2.931-2.931-2.931-1.618 0-2.931 1.313-2.931 2.931v4.238s-2.83-2.553-2.83-2.553c-1.202-1.083-3.057-.987-4.14.214-1.083 1.202-.988 3.056.214 4.14 0 0 6.756 6.092 6.756 6.092z"/>
  </svg>
);
const HotIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
    <path fill="#f97316" d="M12 23c-4.4 0-8-3.1-8-7 0-3 2.3-5.1 4-7l3.5 3.5c0-2-.5-4.5-1-6C13 8 16 12 16 14c1-1 1.5-2.5 1.5-4 0 3.5 1.5 5 1.5 7 0 3.3-3.1 6-7 6z"/>
  </svg>
);
const UrgentIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
    <path fill="#facc15" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
const HazmatIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flexShrink: 0 }}>
    <path d="M12 2L2 12l10 10 10-10L12 2z"/>
    <line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16" r="0.5" fill="#ef4444"/>
  </svg>
);
const FlatRackIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flexShrink: 0 }}>
    <rect x="1" y="14" width="22" height="3" rx="1"/>
    <rect x="1" y="7" width="4" height="7" rx="0.5"/>
    <rect x="19" y="7" width="4" height="7" rx="0.5"/>
  </svg>
);
const TankIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flexShrink: 0 }}>
    <ellipse cx="12" cy="12" rx="10" ry="6"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <line x1="4" y1="9" x2="4" y2="15"/>
    <line x1="20" y1="9" x2="20" y2="15"/>
  </svg>
);

const AVATAR_POOL = [
  "https://i.pravatar.cc/40?img=1",  "https://i.pravatar.cc/40?img=5",
  "https://i.pravatar.cc/40?img=8",  "https://i.pravatar.cc/40?img=12",
  "https://i.pravatar.cc/40?img=15", "https://i.pravatar.cc/40?img=18",
  "https://i.pravatar.cc/40?img=22", "https://i.pravatar.cc/40?img=25",
  "https://i.pravatar.cc/40?img=30", "https://i.pravatar.cc/40?img=33",
  "https://i.pravatar.cc/40?img=36", "https://i.pravatar.cc/40?img=44",
];

const WEATHER_POOL = [
  { temp: 72, label: "Sunny",   icon: "☀️" },
  { temp: 68, label: "Cloudy",  icon: "☁️" },
  { temp: 88, label: "Hot",     icon: "🌡️" },
  { temp: 64, label: "Partly",  icon: "⛅" },
  { temp: 91, label: "Humid",   icon: "🌤️" },
  { temp: 75, label: "Breezy",  icon: "🌬️" },
];

function fmtAvail(avail: string): string {
  const today = new Date();
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  if (avail === "Today") return fmt(today);
  if (avail === "Tomorrow") { const t = new Date(today); t.setDate(t.getDate() + 1); return fmt(t); }
  return avail;
}

const TYPE_CHIP_LB: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  dry:      { label: "Dry",       color: "#facc15", icon: <DryIcon size={11} /> },
  reefer:   { label: "Reefer",    color: "#38bdf8", icon: <ReeferIcon size={11} /> },
  hot_load: { label: "Hot Load",  color: "#f97316", icon: <HotIcon size={11} /> },
  urgent:   { label: "Urgent",    color: "#facc15", icon: <UrgentIcon size={11} /> },
  hazmat:   { label: "Hazmat",    color: "#ef4444", icon: <HazmatIcon size={11} /> },
  flat:     { label: "Flatrack",  color: "#94a3b8", icon: <FlatRackIcon size={11} /> },
  tank:     { label: "Tank",      color: "#a78bfa", icon: <TankIcon size={11} /> },
};

const TYPE_ICON: Record<string, React.ReactNode> = {
  dry:      <DryIcon size={22} />,
  import:   <ImportIcon size={22} />,
  export:   <ExportIcon size={22} />,
  reefer:   <ReeferIcon size={22} />,
  hot_load: <HotIcon size={22} />,
  urgent:   <UrgentIcon size={22} />,
  hazmat:   <HazmatIcon size={22} />,
  flat:     <FlatRackIcon size={22} />,
  tank:     <TankIcon size={22} />,
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
          <button onClick={onClose} className="w-9 h-9 rounded-md flex items-center justify-center transition hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.18)" }}>
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
          <Link href="/login" className="flex-1 flex items-center justify-center py-3 rounded-md text-[14px] font-semibold text-white transition hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.22)" }}>Sign In</Link>
          <Link href="/register" className="flex-1 flex items-center justify-center py-3 rounded-md text-[14px] font-bold text-white transition hover:opacity-90" style={{ background: "#fc0b05" }}>Sign Up Free</Link>
        </div>
      </div>
    </div>
  );
}

function LoadCard({ load, idx, onClick, refreshing = false, isNew = false }: { load: typeof LOADS[0]; idx: number; onClick: () => void; refreshing?: boolean; isNew?: boolean }) {
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
  const isHot      = load.status === "hot";
  const num        = String(idx + 1).padStart(2, "0");
  const perMile    = (load.rate / load.miles).toFixed(2);
  const icon       = TYPE_ICON[load.type] ?? TYPE_ICON.import;
  const weather    = WEATHER_POOL[idx % WEATHER_POOL.length];
  const avatarStart = (idx * 3) % (AVATAR_POOL.length - 2);
  const cardAvatars = AVATAR_POOL.slice(avatarStart, avatarStart + 3);
  const viewCount  = 2 + (idx % 6);

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
        animation: isNew ? "slideInNew 0.4s ease" : undefined,
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
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="text-[13px] font-bold text-white">{load.id}</div>
            {TYPE_CHIP_LB[load.type] && (() => { const c = TYPE_CHIP_LB[load.type]; return (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 shrink-0" style={{ borderRadius: 2, background: `${c.color}20`, color: c.color }}>{c.icon}{c.label}</span>
            ); })()}
            {isNew && <span className="text-[8px] font-bold px-1.5 py-0.5 shrink-0" style={{ borderRadius: 2, background: "rgba(74,222,128,0.20)", color: "#4ade80", letterSpacing: "0.08em" }}>NEW</span>}
          </div>
          <div className="text-[11px] mt-0.5 font-medium" style={{ color: "#fc0b05" }}>{load.mode}</div>
          <div className="mt-1 flex items-center gap-1.5">
            {isHot && (
              <span className="text-[9px] font-bold px-1.5 py-0.5" style={{ borderRadius: 2, background: "rgba(252,11,5,0.18)", color: "#fc0b05" }}>🔥 HOT</span>
            )}
          </div>
        </div>
        <div className="shrink-0 pt-0.5 flex flex-col items-center gap-1.5">
          <div style={{ position: "relative" }}>
            <div style={{ filter: "blur(6px)", userSelect: "none", pointerEvents: "none" }}>
              <div className="text-[18px] font-extrabold leading-none text-white">${load.rate.toLocaleString()}</div>
              <div className="text-[9px] text-white/35 mt-1 uppercase tracking-wide">{perMile} per mile</div>
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" fill={isHot ? "#fc0b05" : "#4ade80"}/><path d="M8 11V7a4 4 0 018 0v4" stroke={isHot ? "#fc0b05" : "#4ade80"} strokeWidth="2" strokeLinecap="round"/></svg>
              <span style={{ fontSize: 10, color: isHot ? "#fc0b05" : "#4ade80", fontWeight: 800, whiteSpace: "nowrap", letterSpacing: "0.02em" }}>Price</span>
            </div>
          </div>
        </div>
      </div>

      {/* Route */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex gap-2">
          {/* Left: route */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2.5">
              <div className="shrink-0 mt-1"><div className="w-3 h-3 rounded-full" style={{ border: "2.5px solid #3b82f6", background: "#3b82f6" }} /></div>
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-white truncate">{load.origin}</div>
                <div className="text-[10px] text-white/40 mt-0.5">Pickup · {fmtAvail(load.avail)} · {load.pickupTime}</div>
              </div>
            </div>
            <div style={{ marginLeft: "5px", height: "18px", borderLeft: "1.5px dashed rgba(255,255,255,0.22)" }} />
            <div className="flex items-start gap-2.5">
              <div className="shrink-0 mt-1"><div className="w-3 h-3 rounded-full" style={{ border: "2.5px solid #4ade80", background: "#4ade80" }} /></div>
              <div className="min-w-0">
                <div className="text-[13px] font-bold truncate" style={{ color: "#4ade80" }}>{load.dest}</div>
                <div className="text-[10px] text-white/40 mt-0.5">Drop-off · {fmtAvail(load.avail)} · {load.dropoffTime}</div>
              </div>
            </div>
          </div>
          {/* Right: $/MI top, FSURC bottom */}
          <div className="shrink-0 flex flex-col justify-between text-right">
            <div>
              <div className="text-[8px] uppercase tracking-[0.14em] text-white/30 font-semibold">$/MI</div>
              <div className="text-[11px] font-bold text-white">${perMile}</div>
            </div>
            <div>
              <div className="text-[8px] uppercase tracking-[0.14em] text-white/30 font-semibold">FSURC</div>
              <div className="text-[11px] font-bold text-white">{load.fsc}</div>
            </div>
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

      {/* Footer — weather · avatars · CTA all in one row */}
      <div className="px-3 pb-3 flex items-center gap-2">
        {/* Weather */}
        <div className="flex items-center gap-1 shrink-0">
          <span style={{ fontSize: 16, lineHeight: 1 }}>{weather.icon}</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{weather.temp}°</span>
          <div className="flex flex-col" style={{ gap: 1 }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.40)", fontWeight: 500, lineHeight: 1 }}>{weather.label}</span>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.28)", fontWeight: 500, lineHeight: 1 }}>{load.origin.split(",")[0]}</span>
          </div>
        </div>
        {/* Divider */}
        <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)", flexShrink: 0 }} />
        {/* Avatars + viewing */}
        <div className="flex items-center gap-1.5 flex-1">
          <div className="flex">
            {([["#3b82f6","MK"],["#10b981","JR"],["#f59e0b","AL"]] as [string,string][]).slice(0, 2).map(([bg, initials], i) => (
              <div key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: bg, border: "1.5px solid rgba(8,25,43,0.85)", marginLeft: i === 0 ? 0 : -7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: "#fff", letterSpacing: "0.02em" }}>
                {initials}
              </div>
            ))}
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.70)", fontSize: 8, border: "1.5px solid rgba(8,25,43,0.85)", marginLeft: -7, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
              +{viewCount}
            </div>
          </div>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>viewing</span>
        </div>
        {/* CTA */}
        <button
          className="shrink-0 text-[11px] font-bold text-white px-3 py-1.5 transition hover:opacity-90"
          style={{ borderRadius: 6, background: "#fc0b05", fontSize: 13, padding: "8px 16px" }}
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
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [liveLoads, setLiveLoads]   = useState<typeof LOADS>(() => LOADS.slice(0, 8));
  const [newIds, setNewIds]         = useState<Set<string>>(new Set(LOADS.slice(0, 3).map(l => l.id)));
  const [showSkeleton, setShowSkeleton] = useState(false);
  const poolIdxRef = useRef(0);

  const dates = useMemo(() => {
    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);
    return Array.from({ length: 21 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i - 6);
      const key = d.toISOString().slice(0, 10);
      return { key, day: d.toLocaleDateString("en-US", { weekday: "short" }), date: d.getDate(), isToday: key === todayKey };
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = LIVE_POOL[poolIdxRef.current % LIVE_POOL.length];
      poolIdxRef.current += 1;
      setShowSkeleton(true);
      setTimeout(() => {
        setShowSkeleton(false);
        setLiveLoads(prev => {
          const without = prev.filter(l => l.id !== next.id);
          return [next, ...without].slice(0, 8);
        });
        setNewIds(prev => new Set([...prev, next.id]));
        setTimeout(() => {
          setNewIds(prev => { const s = new Set(prev); s.delete(next.id); return s; });
        }, 4000);
      }, 500);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const filtered = liveLoads.filter(l => {
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
        @keyframes slideInNew {
          0%   { opacity: 0; transform: translateY(-14px) scale(0.97); }
          60%  { opacity: 1; transform: translateY(3px) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
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
                <div className="display text-white text-[22px] font-bold leading-tight">Draygo AI Loadboard</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse inline-block" />
                  <span className="text-[11px] font-bold" style={{ color: "#4ade80", letterSpacing: "0.06em" }}>LIVE</span>
                </div>
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
              </div>
            </div>

            {/* Date strip */}
            <div className="px-4 pt-3 pb-2 hide-scrollbar" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", overflowX: "auto" }}>
              <div className="flex gap-1.5" style={{ width: "100%" }}>
                {dates.map(d => {
                  const active = selectedDate === d.key;
                  return (
                    <button
                      key={d.key}
                      onClick={() => setSelectedDate(d.key)}
                      className="flex flex-col items-center justify-center transition-all"
                      style={{
                        flex: 1,
                        minWidth: 40,
                        height: 56,
                        borderRadius: 4,
                        background: active
                          ? "rgba(252,11,5,0.60)"
                          : "rgba(255,255,255,0.07)",
                        border: active
                          ? "1px solid rgba(252,100,100,0.40)"
                          : "1px solid rgba(255,255,255,0.12)",
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                        boxShadow: active
                          ? "0 2px 14px rgba(252,11,5,0.30), inset 0 1px 0 rgba(255,255,255,0.15)"
                          : "inset 0 1px 0 rgba(255,255,255,0.08)",
                      }}
                    >
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: active ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.38)", lineHeight: 1 }}>{d.day}</span>
                      <span style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.2, color: active ? "#fff" : "rgba(255,255,255,0.70)" }}>{d.date}</span>
                      <span style={{ width: 22, height: 3, borderRadius: 2, background: active ? "#ffffff" : "#fc0b05", marginTop: 4 }} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pill filter bar */}
            <div className="px-4 py-3 flex items-center gap-2 flex-wrap" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {/* Mode pills */}
              {[
                { key: "all",         label: "All Modes",  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
                { key: "drayage",     label: "Drayage",    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                { key: "intermodal",  label: "Intermodal", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
                { key: "pp",          label: "Port→Port",  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg> },
              ].map(t => (
                <button key={t.key} onClick={() => setActiveMode(t.key)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-semibold rounded-md transition-all"
                  style={{
                    background: activeMode === t.key
                      ? "rgba(59,130,246,0.75)"
                      : "rgba(255,255,255,0.08)",
                    color: activeMode === t.key ? "#fff" : "rgba(255,255,255,0.60)",
                    border: activeMode === t.key
                      ? "1px solid rgba(147,197,253,0.40)"
                      : "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: activeMode === t.key ? "0 2px 12px rgba(59,130,246,0.20)" : "inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}>
                  {t.icon}{t.label}
                </button>
              ))}

              <div style={{ width: 1, height: 26, background: "rgba(255,255,255,0.13)", margin: "0 2px", flexShrink: 0 }} />

              {/* Type pills */}
              {[
                { key: "all",      label: "All Types",    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
                { key: "dry",      label: "Dry",          icon: <DryIcon size={14} /> },
                { key: "reefer",   label: "Reefer",       icon: <ReeferIcon size={14} /> },
                { key: "hot_load", label: "Hot Load",     icon: <span style={{ fontSize: 13, lineHeight: 1 }}>🔥</span> },
                { key: "urgent",   label: "Urgent Load",  icon: <UrgentIcon size={14} /> },
                { key: "hazmat",   label: "Hazmat",       icon: <HazmatIcon size={14} /> },
                { key: "flat",     label: "Flat Rack",    icon: <FlatRackIcon size={14} /> },
                { key: "tank",     label: "Tank",         icon: <TankIcon size={14} /> },
              ].map(t => (
                <button key={t.key} onClick={() => setActiveType(t.key)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-semibold rounded-md transition-all"
                  style={{
                    background: activeType === t.key
                      ? "rgba(252,11,5,0.75)"
                      : "rgba(255,255,255,0.08)",
                    color: activeType === t.key ? "#fff" : "rgba(255,255,255,0.60)",
                    border: activeType === t.key
                      ? "1px solid rgba(252,100,100,0.40)"
                      : "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: activeType === t.key ? "0 2px 12px rgba(252,11,5,0.20)" : "inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}>
                  {t.icon}{t.label}
                </button>
              ))}

              {/* Hide List */}
              <button onClick={() => setHideList(h => !h)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-semibold rounded-md transition-all ml-auto"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.60)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
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
                    {showSkeleton && (
                      <LoadCard key="__skeleton__" load={LOADS[0]} idx={0} onClick={() => {}} refreshing={true} />
                    )}
                    {filtered.slice(0, showSkeleton ? 7 : 8).map((load, idx) => (
                      <LoadCard key={load.id} load={load} idx={showSkeleton ? idx + 1 : idx} onClick={() => setShowDialog(true)} isNew={newIds.has(load.id)} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Footer bar */}
            <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-[12px] text-white/30">{filtered.length} loads · live feed</span>
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
