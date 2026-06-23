"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import Testimonials from "@/components/Testimonials";
import Chat from "@/components/Chat";
import Stats from "@/components/Stats";
import UnitConverter from "@/components/UnitConverter";
import NetworkMap from "@/components/NetworkMap";
import Ticker from "@/components/Ticker";
import CalculateRate from "@/components/CalculateRate";
import LoadBoard from "@/components/LoadBoard";
import { asset } from "@/lib/site";

const BRANDS = ["CARGOMAX", "portlink", "NORDFREIGHT", "veritas3pl", "ARC LOGISTICS", "Halo Freight", "CONTAINERWORKS", "Meridian Drayage", "Atlas BCO", "Northstar Cargo"];
const COSTS = [
  { n: "Fuel + FSC", d: "Live diesel × MPG × distance, plus carrier FSC.", i: '<line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>', a: "#fc0b05" },
  { n: "Driver labor", d: "Hourly wage × transit time + per diem on 400+ mi.", i: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/>', a: "#3A5FC0" },
  { n: "Port charges", d: "Gate fees, terminal handling, exam fees if pulled.", i: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>', a: "#08192b" },
  { n: "Chassis", d: "Daily rental, pool fees, per-diem on long dwell.", i: '<path d="M14 18V6H2v12h2"/><path d="M14 8h4l4 4v6h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>', a: "#fc0b05" },
  { n: "Accessorials", d: "Tolls, overweight, hazmat, reefer plug, lumper.", i: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>', a: "#fc0b05" },
  { n: "Overhead", d: "Admin, dispatch, ELD/TMS, insurance, depreciation.", i: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>', a: "#1E3A8A" },
];
const Arrow = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--navy)]/35 shrink-0"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
type Lane = [string, string, string];
const SHIP: { title: string; icon: React.ReactNode; rows: Lane[] }[] = [
  { title: "Parcels", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 17V7H2v10h2" /><path d="M14 9h4l4 4v4h-2" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>, rows: [["Los Angeles", "Phoenix, AZ", "2h ago"], ["Long Beach", "Las Vegas, NV", "4h ago"], ["Oakland", "Sacramento, CA", "08 Jan"], ["Seattle", "Portland, OR", "29 Oct"], ["Houston", "San Antonio, TX", "12 Mar"]] },
  { title: "Standard Cargo", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="12" width="7" height="7" rx="1" /><rect x="14" y="12" width="7" height="7" rx="1" /><rect x="8.5" y="4" width="7" height="7" rx="1" /></svg>, rows: [["Los Angeles", "Dallas, TX", "1h ago"], ["New York/NJ", "Chicago, IL", "5h ago"], ["Norfolk", "Atlanta, GA", "22 Nov"], ["Long Beach", "Denver, CO", "22 Nov"], ["Miami", "Orlando, FL", "03 Feb"]] },
  { title: "Project Cargo", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.7" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="1" /><path d="M7 6v12M11 6v12M15 6v12" /></svg>, rows: [["Houston", "Kansas City, MO", "3d ago"], ["Seattle", "Salt Lake City, UT", "3d ago"], ["Oakland", "Reno, NV", "2d ago"], ["New York/NJ", "Indianapolis, IN", "11 Dec"], ["Charleston", "Columbus, OH", "14 Feb"]] },
];

export default function Home() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section id="load-board" className="relative overflow-hidden text-white">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline><source src={asset("/hero-cargo.mp4")} type="video/mp4" /></video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(1,7,26,0.82) 0%,rgba(1,7,26,0.55) 42%,rgba(1,7,26,0.86) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 520px at 18% 22%,rgba(11,35,80,0.28),transparent 60%),radial-gradient(820px 520px at 86% 82%,rgba(255,59,48,0.18),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-[440px_1fr] gap-10 lg:gap-14 items-stretch">
            {/* LEFT — load board */}
            <LoadBoard />
            {/* RIGHT — headline */}
            <div className="flex flex-col justify-center h-full">
              <div className="inline-flex items-center gap-2 self-start rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-5" style={{ background: "rgba(255,59,48,0.16)", border: "1px solid rgba(255,59,48,0.4)" }}>
                <span className="live-dot" /> Live drayage data — diesel &amp; FSC updated continuously
              </div>
              <h1 className="display text-white text-[40px] md:text-[64px] leading-[1.03]">Drayage quotes, port to door — <span style={{ color: "var(--red)" }}>Rate in 30 seconds.</span></h1>
              <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-xl leading-relaxed">Live diesel, FSC, chassis and port fees across every major U.S. &amp; Canadian container port — instant, fully itemised, and locked for 24 hours.</p>
              <div className="mt-8 grid w-fit grid-cols-2 gap-3">
                {/* App Store badge */}
                <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] w-full pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200">
                  <svg width="30" height="30" viewBox="0 0 384 512" fill="#fff" aria-hidden="true" className="shrink-0"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] opacity-90">Download on the</span><span className="block text-[14px] font-semibold tracking-tight">App Store</span></span>
                </a>
                {/* Google Play badge */}
                <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] w-full pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200">
                  <img src={asset("/google-play.png")} alt="" className="h-7 w-auto shrink-0" />
                  <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] uppercase tracking-[0.14em] opacity-90">Get it on</span><span className="block text-[14px] font-semibold tracking-tight">Google Play</span></span>
                </a>
              </div>
              <div className="mt-5 text-[12px] text-white/55">🚛 Built for drayage, chassis moves &amp; container freight</div>
              <div className="mt-10 flex items-center gap-7 text-[11px] uppercase tracking-[0.16em] text-white/60">
                <div><div className="text-[26px] md:text-[30px] display num text-white">50</div><div className="mt-0.5">Ports</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">1,200+</div><div className="mt-0.5">Lanes</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">250,000+</div><div className="mt-0.5">Quotes</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
