"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { asset } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import type { Card as CardType } from "@/components/ui/apple-cards-carousel";

const APPS = [
  {
    id: "shipper",
    name: "DrayGo Shipper",
    role: "For Importers, Exporters & BCOs",
    tagline: "Ship smarter. Every container.",
    desc: "Get instant drayage quotes, schedule port pickups and track every container in real time — from the first gate move to final delivery.",
    color: "#fc0b05",
    colorDark: "#b80803",
    colorAlpha: "rgba(252,11,5,0.13)",
    colorBorder: "rgba(252,11,5,0.32)",
    video: "/shipper-hero.mp4",
    features: [
      { label: "Instant rate quotes", sub: "Live diesel, FSC & port fees across 40+ U.S. ports in seconds." },
      { label: "Real-time container tracking", sub: "Gate-in to gate-out visibility, every move, 24/7." },
      { label: "Port appointment scheduling", sub: "Book and manage terminal appointments in one tap." },
      { label: "Auto-generated documents", sub: "BOL, delivery orders and customs docs ready instantly." },
      { label: "Drayage spend analytics", sub: "Full cost breakdown and per-move spend dashboard." },
    ],
    cta: "Start shipping",
    href: "/shipper",
    flip: false,
  },
  {
    id: "carrier",
    name: "DrayGo Carrier",
    role: "For Truckers & Owner-Operators",
    tagline: "More loads. Less paperwork.",
    desc: "Find drayage loads near you, confirm pickups from your phone and get paid within 24 hours of proof of delivery — no net-30 waits.",
    color: "#18a354",
    colorDark: "#117a3e",
    colorAlpha: "rgba(24,163,84,0.13)",
    colorBorder: "rgba(24,163,84,0.32)",
    video: "/carrier-hero.mp4",
    features: [
      { label: "Live load board", sub: "Hundreds of drayage loads posted daily near every major port." },
      { label: "24-hour instant payout", sub: "Get paid on delivery — DrayPay settles same day, guaranteed." },
      { label: "Digital dispatch & POD", sub: "Accept loads, upload proof of delivery from your phone." },
      { label: "Port gate routing", sub: "Turn-by-turn with built-in gate, chassis and yard instructions." },
      { label: "Earnings dashboard", sub: "Miles, on-time rate and total revenue tracked automatically." },
    ],
    cta: "Find loads",
    href: "/carriers",
    flip: true,
  },
  {
    id: "broker",
    name: "DrayGo Broker",
    role: "For Freight Brokers & 3PLs",
    tagline: "Book, manage, deliver — at scale.",
    desc: "Source carriers instantly, manage your full load book and give shippers a live tracking portal — all from one operations dashboard.",
    color: "#3A5FC0",
    colorDark: "#2a47a0",
    colorAlpha: "rgba(58,95,192,0.13)",
    colorBorder: "rgba(58,95,192,0.32)",
    video: "/broker-hero.mp4",
    features: [
      { label: "8,000+ carrier network", sub: "Vetted drayage carriers across all major U.S. ports, ready now." },
      { label: "Operations load board", sub: "Post, assign and track every load from a single view." },
      { label: "Bid & rate engine", sub: "Instant carrier quotes with counter-offer and auto-award." },
      { label: "White-label shipper portal", sub: "Branded tracking portal your customers log into directly." },
      { label: "P&L analytics", sub: "Margin, volume and on-time performance per customer account." },
    ],
    cta: "Run your book",
    href: "/broker",
    flip: false,
  },
];

const STATS = [
  { n: "40+", label: "U.S. & Canada Ports" },
  { n: "8,000+", label: "Active Carriers" },
  { n: "30s", label: "Quote to Booking" },
  { n: "24h", label: "Guaranteed Payout" },
];

const FLOW = [
  {
    step: "01",
    title: "Shipper posts a load",
    desc: "A BCO or freight broker enters the container details. DrayGo prices it instantly against live diesel, FSC and port fees.",
    color: "#fc0b05",
    icon: '<path d="M14 18V6H2v12h2"/><path d="M14 8h4l4 4v6h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  },
  {
    step: "02",
    title: "Broker matches a carrier",
    desc: "DrayGo Broker assigns the move to a vetted carrier from the network. Real-time status flows back to the shipper automatically.",
    color: "#3A5FC0",
    icon: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M5 15H2a10 10 0 0 0 20 0h-3"/>',
  },
  {
    step: "03",
    title: "Carrier delivers & gets paid",
    desc: "The driver uploads POD in DrayGo Carrier. Payment hits their DrayPay wallet within 24 hours — no invoices, no waiting.",
    color: "#18a354",
    icon: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
  },
];

const FEATURES = [
  { label: "Real-time visibility", desc: "Every container, every move — live status across all three apps simultaneously.", icon: '<circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>' },
  { label: "Integrated payments", desc: "DrayPay powers instant settlements across the entire platform — no third-party delays.", icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
  { label: "Live pricing engine", desc: "Diesel index, FSC, chassis and port fees updated continuously — always accurate.", icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>' },
  { label: "Digital documents", desc: "BOLs, PODs, customs docs and delivery orders auto-generated and stored in one place.", icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' },
  { label: "Port coverage", desc: "LA/LB, New York/NJ, Savannah, Houston, Seattle, Charleston and 35+ more ports.", icon: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>' },
  { label: "Mobile-first apps", desc: "iOS and Android apps built for the road — offline-capable, fast, always up to date.", icon: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>' },
];

const FAQS = [
  { q: "Is DrayGo free to use for shippers?", a: "Yes — shippers get free access to instant rate quotes, container tracking and port appointment scheduling. No credit card required." },
  { q: "How does instant drayage pricing work?", a: "DrayGo pulls live diesel index, port congestion, chassis and lane data to generate locked rates for any U.S. port-to-inland move in under 30 seconds." },
  { q: "Which ports does DrayGo cover?", a: "40+ U.S. sea ports, rail ramps and inland destinations — including LA/Long Beach, NY/NJ, Houston, Savannah, Seattle and more." },
  { q: "How quickly do carriers get paid?", a: "DrayPay settles carrier invoices within 24 hours of an approved POD upload. No net-30, no factoring, no waiting." },
  { q: "Can freight brokers use DrayGo?", a: "Yes. DrayGo Broker gives you a full drayage TMS — dispatch, carrier matching, real-time status, instant billing — all in one dashboard." },
  { q: "What container types does DrayGo support?", a: "All standard ISO sizes (20', 40', 45', 53') including dry, reefer, open-top and flat rack, across domestic and international port moves." },
];

const TESTIMONIALS = [
  { quote: "DrayGo cut our per-container drayage cost by 18% in Q1. The instant quoting saves my team hours every week.", name: "Marcus T.", role: "Import Manager", company: "Pacific Rim Logistics" },
  { quote: "I used to wait 5 days for payment. DrayPay hits my account the next morning. This is how it should always have worked.", name: "Darius W.", role: "Owner-Operator", company: "DW Trucking" },
  { quote: "The broker dashboard is genuinely the best TMS I've used for drayage. Real-time tracking, instant docs, clean UI.", name: "Priya K.", role: "Drayage Broker", company: "Summit Freight" },
  { quote: "Long Beach to Phoenix rates locked in 20 seconds. Our finance team loves the predictability.", name: "James O.", role: "VP Operations", company: "West Coast Importers" },
  { quote: "Three apps that actually talk to each other. No more spreadsheets, no more phone tag. DrayGo runs our entire container operation.", name: "Chen L.", role: "Logistics Director", company: "Apex Distribution" },
];

function tiltProps(color: string) {
  return {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(1100px) rotateX(${(y - 0.5) * -14}deg) rotateY(${(x - 0.5) * 14}deg) scale(1.018)`;
      el.style.transition = "transform 0.08s ease";
      const shine = el.querySelector<HTMLElement>(".tilt-shine");
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${color}30 0%, transparent 65%)`;
        shine.style.opacity = "1";
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)";
      e.currentTarget.style.transition = "transform 0.6s cubic-bezier(0.23,1,0.32,1)";
      const shine = e.currentTarget.querySelector<HTMLElement>(".tilt-shine");
      if (shine) { shine.style.opacity = "0"; shine.style.transition = "opacity 0.5s ease"; }
    },
  };
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <>
      <Nav />
      <RevealInit />

      {/* ─── HERO ─── */}
      <section className="grid-bg relative overflow-hidden min-h-[100svh]" style={{ paddingBottom: 0 }}>
        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(252,11,5,0.14) 0%, transparent 60%)" }} />
          <div className="absolute top-0 -right-40 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(58,95,192,0.14) 0%, transparent 60%)" }} />
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(24,163,84,0.08) 0%, transparent 65%)" }} />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 min-h-[100svh] grid lg:grid-cols-2 gap-10 items-center py-20">

        {/* ── LEFT: 3 phone mockups ── */}
        <div className="flex items-end justify-center gap-3 md:gap-4 order-2 lg:order-2 pt-10 lg:pt-0 reveal">

          {/* Shipper phone (red, lower) */}
          <div className="flex-shrink-0 hidden sm:block" style={{ width: 185, transform: "translateY(48px)" }}>
            <div className="rounded-[18px] overflow-hidden" style={{ background: "#0D0D1A", border: "2px solid rgba(255,255,255,0.12)", boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8)" }}>
              <div className="flex items-center justify-between px-4 pt-3 pb-1" style={{ background: "#0D0D1A" }}>
                <span className="text-[9px] font-bold text-white">9:41</span>
                <div className="flex items-center gap-1">
                  <svg width="10" height="7" viewBox="0 0 12 8" fill="white" opacity="0.7"><rect x="0" y="2" width="2" height="6" rx="0.5"/><rect x="3" y="1" width="2" height="7" rx="0.5"/><rect x="6" y="0" width="2" height="8" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5" opacity="0.3"/></svg>
                  <svg width="12" height="7" viewBox="0 0 14 8" fill="white" opacity="0.7"><rect x="0.5" y="0.5" width="11" height="7" rx="1.5" stroke="white" strokeWidth="1" fill="none" opacity="0.5"/><rect x="12" y="2.5" width="1.5" height="3" rx="0.5" fill="white" opacity="0.5"/><rect x="1.5" y="1.5" width="8" height="5" rx="0.8" fill="white"/></svg>
                </div>
              </div>
              <div className="px-3.5 pt-2 pb-3" style={{ background: "#0D0D1A" }}>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-black text-white">DrayGo <span style={{ color: "#fc0b05" }}>Shipper</span></span>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(252,11,5,0.2)" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4-6 8-6s6.5 2 8 6"/></svg>
                  </div>
                </div>
                <div className="rounded-xl p-3" style={{ background: "#161626", border: "1px solid rgba(252,11,5,0.2)" }}>
                  <div className="text-[8px] uppercase tracking-widest text-white/40 mb-1">New quote</div>
                  <div className="flex items-center gap-1 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#fc0b05" }} />
                    <span className="text-[10px] text-white font-semibold">Long Beach, CA</span>
                  </div>
                  <div className="w-px h-2.5 ml-[2.5px] mb-1.5" style={{ background: "rgba(255,255,255,0.15)" }} />
                  <div className="flex items-center gap-1 mb-2.5">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#18a354" }} />
                    <span className="text-[10px] text-white font-semibold">Phoenix, AZ</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-white/40">40&apos; Dry · 2 axle</span>
                    <div className="rounded-md px-2 py-0.5 text-[9px] font-bold text-white" style={{ background: "#fc0b05" }}>Quote →</div>
                  </div>
                </div>
                <div className="mt-2 rounded-xl p-3" style={{ background: "#161626" }}>
                  <div className="text-[8px] text-white/40 uppercase tracking-widest mb-0.5">Estimated rate</div>
                  <div className="text-[22px] font-black text-white leading-none">$742<span className="text-[11px] font-normal text-white/40">.00</span></div>
                  <div className="mt-0.5 text-[8px] font-medium" style={{ color: "#18a354" }}>✓ Locked 24h · Diesel live</div>
                </div>
                <div className="mt-2 space-y-1.5">
                  {[["LA → Denver", "$1,140"], ["Oakland → Reno", "$480"]].map(([r, p]) => (
                    <div key={r} className="flex items-center justify-between rounded-lg px-2.5 py-1.5" style={{ background: "#161626" }}>
                      <span className="text-[9px] text-white/55">{r}</span>
                      <span className="text-[9px] font-bold text-white">{p}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex justify-center"><div className="w-16 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} /></div>
              </div>
            </div>
          </div>

          {/* Carrier phone (green, center, tallest/highest) */}
          <div className="flex-shrink-0" style={{ width: 210, zIndex: 2 }}>
            <div className="rounded-[22px] overflow-hidden" style={{ background: "#0A0F0D", border: "2px solid rgba(255,255,255,0.15)", boxShadow: "0 60px 120px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(24,163,84,0.2)" }}>
              <div className="flex items-center justify-between px-4 pt-3 pb-1" style={{ background: "#0A0F0D" }}>
                <span className="text-[9px] font-bold text-white">9:41</span>
                <div className="flex items-center gap-1">
                  <svg width="10" height="7" viewBox="0 0 12 8" fill="white" opacity="0.7"><rect x="0" y="2" width="2" height="6" rx="0.5"/><rect x="3" y="1" width="2" height="7" rx="0.5"/><rect x="6" y="0" width="2" height="8" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5" opacity="0.3"/></svg>
                  <svg width="12" height="7" viewBox="0 0 14 8" fill="white" opacity="0.7"><rect x="0.5" y="0.5" width="11" height="7" rx="1.5" stroke="white" strokeWidth="1" fill="none" opacity="0.5"/><rect x="12" y="2.5" width="1.5" height="3" rx="0.5" fill="white" opacity="0.5"/><rect x="1.5" y="1.5" width="8" height="5" rx="0.8" fill="white"/></svg>
                </div>
              </div>
              <div className="px-3.5 pt-2 pb-4" style={{ background: "#0A0F0D" }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-[9px] text-white/40">Good morning,</div>
                    <div className="text-[12px] font-black text-white">DrayGo <span style={{ color: "#18a354" }}>Carrier</span></div>
                  </div>
                  <div className="rounded-lg px-2 py-1 text-[9px] font-bold text-white flex items-center gap-1" style={{ background: "rgba(24,163,84,0.2)", border: "1px solid rgba(24,163,84,0.35)" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#18a354", display: "inline-block" }} />Online
                  </div>
                </div>
                <div className="rounded-xl p-3 mb-2.5" style={{ background: "linear-gradient(135deg, rgba(24,163,84,0.25) 0%, rgba(24,163,84,0.08) 100%)", border: "1px solid rgba(24,163,84,0.25)" }}>
                  <div className="text-[8px] text-white/45 uppercase tracking-widest mb-0.5">Today&apos;s earnings</div>
                  <div className="text-[22px] font-black text-white leading-none">$1,240</div>
                  <div className="mt-0.5 text-[8px]" style={{ color: "#18a354" }}>↑ 3 loads completed</div>
                </div>
                <div className="text-[10px] font-bold text-white mb-2 flex items-center justify-between">
                  <span>Nearby Loads</span>
                  <span className="rounded-full px-1.5 py-0.5 text-[8px] font-bold" style={{ background: "rgba(24,163,84,0.2)", color: "#18a354" }}>24 new</span>
                </div>
                {[
                  { from: "Long Beach", to: "Phoenix", pay: "$680", t: "2h ago" },
                  { from: "Oakland", to: "Sac.", pay: "$420", t: "4h ago" },
                  { from: "Houston", to: "Dallas", pay: "$580", t: "5h ago" },
                ].map((l) => (
                  <div key={l.from} className="flex items-center justify-between rounded-xl px-2.5 py-2 mb-1.5" style={{ background: "#161E15", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div>
                      <div className="text-[10px] font-semibold text-white">{l.from} → {l.to}</div>
                      <div className="text-[8px] text-white/40">{l.t}</div>
                    </div>
                    <div className="text-[11px] font-black" style={{ color: "#18a354" }}>{l.pay}</div>
                  </div>
                ))}
                <div className="mt-2.5 grid grid-cols-4 gap-0">
                  {["Home", "Loads", "Pay", "Me"].map((n, i) => (
                    <div key={n} className="flex flex-col items-center gap-0.5 py-1.5">
                      <div className="w-3 h-3 rounded" style={{ background: i === 1 ? "#18a354" : "rgba(255,255,255,0.15)" }} />
                      <span className="text-[7px]" style={{ color: i === 1 ? "#18a354" : "rgba(255,255,255,0.3)" }}>{n}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-1"><div className="w-20 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} /></div>
              </div>
            </div>
          </div>

          {/* Broker phone (blue, lower) */}
          <div className="flex-shrink-0 hidden sm:block" style={{ width: 185, transform: "translateY(48px)" }}>
            <div className="rounded-[18px] overflow-hidden" style={{ background: "#0B0D18", border: "2px solid rgba(255,255,255,0.12)", boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8)" }}>
              <div className="flex items-center justify-between px-4 pt-3 pb-1" style={{ background: "#0B0D18" }}>
                <span className="text-[9px] font-bold text-white">9:41</span>
                <div className="flex items-center gap-1">
                  <svg width="10" height="7" viewBox="0 0 12 8" fill="white" opacity="0.7"><rect x="0" y="2" width="2" height="6" rx="0.5"/><rect x="3" y="1" width="2" height="7" rx="0.5"/><rect x="6" y="0" width="2" height="8" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5" opacity="0.3"/></svg>
                  <svg width="12" height="7" viewBox="0 0 14 8" fill="white" opacity="0.7"><rect x="0.5" y="0.5" width="11" height="7" rx="1.5" stroke="white" strokeWidth="1" fill="none" opacity="0.5"/><rect x="12" y="2.5" width="1.5" height="3" rx="0.5" fill="white" opacity="0.5"/><rect x="1.5" y="1.5" width="8" height="5" rx="0.8" fill="white"/></svg>
                </div>
              </div>
              <div className="px-3.5 pt-2 pb-3" style={{ background: "#0B0D18" }}>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-black text-white">DrayGo <span style={{ color: "#3A5FC0" }}>Broker</span></span>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(58,95,192,0.2)" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3A5FC0" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1 mb-2.5">
                  {[["12", "Active"], ["4", "Pending"], ["$8.4k", "Week"]].map(([v, l]) => (
                    <div key={l} className="rounded-xl p-2 text-center" style={{ background: "#131525" }}>
                      <div className="text-[12px] font-black text-white">{v}</div>
                      <div className="text-[7px] text-white/40">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="text-[9px] font-bold text-white mb-1.5 uppercase tracking-widest">Active loads</div>
                {[
                  { id: "DR-8841", route: "NY → Chicago", status: "In transit", color: "#18a354" },
                  { id: "DR-8842", route: "LA → Phoenix", status: "Dispatched", color: "#3A5FC0" },
                  { id: "DR-8843", route: "Houston → Dallas", status: "Pending", color: "#fc0b05" },
                ].map((l) => (
                  <div key={l.id} className="rounded-lg px-2.5 py-2 mb-1.5" style={{ background: "#131525", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-bold text-white">{l.route}</span>
                      <span className="text-[7px] rounded-full px-1.5 py-0.5 font-bold" style={{ background: `${l.color}22`, color: l.color }}>{l.status}</span>
                    </div>
                    <div className="text-[8px] text-white/30">{l.id}</div>
                  </div>
                ))}
                <div className="mt-3 flex justify-center"><div className="w-16 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: text content ── */}
        <div className="order-1 lg:order-1 text-left reveal reveal-delay-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-xl px-4 py-1.5 mb-8 text-[12px] font-semibold text-white/70" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.14)" }}>
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#fc0b05", animation: "livePulse 1.8s ease-out infinite" }} />
            The DrayGo Platform — Now Live
          </div>

          {/* Headline */}
          <h1 className="display text-white leading-[1.05]" style={{ fontSize: "clamp(38px, 5vw, 72px)" }}>
            Three Apps,<br /><span style={{ color: "var(--red)" }}>One Drayage</span><br />Ecosystem.
          </h1>

          {/* Sub */}
          <p className="mt-5 text-white/55 leading-relaxed max-w-md" style={{ fontSize: "clamp(15px, 1.6vw, 17px)" }}>
            DrayGo Shipper, Carrier and Broker — three purpose-built apps connected on a single real-time platform with instant quotes, live loads and same-day payments.
          </p>

          {/* App pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {APPS.map((app) => (
              <a key={app.id} href={`#${app.id}`}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[12px] font-semibold text-white transition-all duration-200 hover:scale-105"
                style={{ background: app.colorAlpha, border: `1px solid ${app.colorBorder}` }}>
                <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: app.color, flexShrink: 0 }} />
                {app.name}
              </a>
            ))}
          </div>

          {/* Download CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-white/[0.10] hover:bg-white/[0.20] border border-white/15 backdrop-blur-sm transition-colors duration-200">
              <svg width="30" height="30" viewBox="0 0 384 512" fill="#fff" className="shrink-0"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] opacity-90">Download on the</span><span className="block text-[14px] font-semibold tracking-tight">App Store</span></span>
            </a>
            <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-white/[0.10] hover:bg-white/[0.20] border border-white/15 backdrop-blur-sm transition-colors duration-200">
              <img src={asset("/google-play.png")} alt="" className="h-7 w-auto shrink-0" />
              <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] uppercase tracking-[0.14em] opacity-90">Get it on</span><span className="block text-[14px] font-semibold tracking-tight">Google Play</span></span>
            </a>
          </div>

        </div>

        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section style={{ background:"#0f172a", borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n:"$2.4B+", label:"Drayage Moved" },
            { n:"12,431", label:"Active Routes" },
            { n:"8,000+", label:"Verified Carriers" },
            { n:"4.8", label:"App Store Rating", star:true },
          ].map((s)=>(
            <div key={s.label}>
              <div style={{ fontSize:"clamp(32px,4vw,52px)", fontWeight:900, color:"#fff", lineHeight:1, letterSpacing:"-0.02em" }}>
                {s.star && <span style={{ color:"#f59e0b", marginRight:4 }}>★</span>}{s.n}
              </div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.35)", marginTop:6, fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── APP FEATURE ROWS (Fincash style) ─── */}
      <style>{`
        @keyframes widgetFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes barGrow { from{transform:scaleY(0);transform-origin:bottom} to{transform:scaleY(1);transform-origin:bottom} }
        @keyframes shimmer { 0%{opacity:0.4} 50%{opacity:1} 100%{opacity:0.4} }
        @keyframes statusPing { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2.2);opacity:0} }
        @keyframes slideIn { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0)} }
      `}</style>
      <section style={{ background:"#0f172a", padding:"72px 0 80px" }}>
        <div className="max-w-[1200px] mx-auto px-6" style={{ display:"flex", flexDirection:"column" as const, gap:16 }}>
          {APPS.map((app) => {
            const tilt = tiltProps(app.color);
            return (
            <div key={app.id} id={app.id} {...tilt} style={{ background:"#1e293b", border:"1px solid rgba(255,255,255,0.12)", borderRadius:24, overflow:"hidden", position:"relative", cursor:"default" }}>
              {/* Tilt shine overlay */}
              <div className="tilt-shine" style={{ position:"absolute", inset:0, borderRadius:24, opacity:0, pointerEvents:"none", zIndex:20, transition:"opacity 0.4s ease" }} />
              {/* Subtle glow */}
              <div style={{ position:"absolute", top:"50%", [app.flip ? "left" : "right"]:-120, transform:"translateY(-50%)", width:480, height:480, borderRadius:"50%", background:`radial-gradient(circle, ${app.color}14 0%, transparent 65%)`, pointerEvents:"none" }} />

              <div className={`relative grid lg:grid-cols-2`} style={{ minHeight:440 }}>

                {/* ── TEXT ── */}
                <div className={`${app.flip ? "lg:order-2" : "lg:order-1"} flex flex-col justify-center`} style={{ padding:"48px 52px" }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${app.color}12`, border:`1px solid ${app.colorBorder}`, borderRadius:8, padding:"5px 14px", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:app.color, marginBottom:20, width:"fit-content" }}>
                    {app.role}
                  </div>
                  <h2 style={{ fontSize:"clamp(26px,3vw,40px)", fontWeight:800, color:"#fff", lineHeight:1.12, marginBottom:14 }}>
                    {app.tagline}
                  </h2>
                  <p style={{ fontSize:15, color:"rgba(255,255,255,0.45)", lineHeight:1.75, marginBottom:28, maxWidth:420 }}>
                    {app.desc}
                  </p>
                  <ul style={{ listStyle:"none", padding:0, margin:"0 0 32px 0", display:"flex", flexDirection:"column" as const, gap:10 }}>
                    {app.features.map(({ label })=>(
                      <li key={label} style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={app.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        <span style={{ fontSize:13.5, color:"rgba(255,255,255,0.62)" }}>{label}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display:"flex", gap:12, flexWrap:"wrap" as const }}>
                    <Link href={app.href} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"11px 22px", background:"transparent", border:"1px solid rgba(255,255,255,0.18)", borderRadius:10, fontSize:13, fontWeight:600, color:"#fff", textDecoration:"none" }}>
                      Learn More
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    </Link>
                    <Link href={app.href} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"11px 22px", background:app.color, border:`1px solid ${app.color}`, borderRadius:10, fontSize:13, fontWeight:700, color:"#fff", textDecoration:"none" }}>
                      {app.cta}
                    </Link>
                  </div>
                </div>

                {/* ── WIDGET ── */}
                <div className={`${app.flip ? "lg:order-1" : "lg:order-2"} flex items-center justify-center`}
                  style={{ padding:"40px 48px", background:`${app.color}07`, borderLeft:app.flip?"none":`1px solid rgba(255,255,255,0.05)`, borderRight:app.flip?`1px solid rgba(255,255,255,0.05)`:"none" }}>

                  {/* ── SHIPPER WIDGET ── */}
                  {app.id === "shipper" && (
                    <div style={{ background:"rgba(15,23,42,0.97)", border:`1px solid ${app.colorBorder}`, borderRadius:24, padding:28, boxShadow:`0 40px 80px rgba(0,0,0,0.7), 0 0 60px ${app.color}14`, width:"100%", maxWidth:380 }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                        <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${app.color}18`, border:`1px solid ${app.colorBorder}`, borderRadius:8, padding:"4px 12px", fontSize:9, fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:app.color }}>
                          <span style={{ width:5, height:5, borderRadius:"50%", background:app.color, display:"inline-block", animation:"shimmer 1.6s ease-in-out infinite" }} />
                          Instant Quote
                        </div>
                        <span style={{ fontSize:10, color:"rgba(255,255,255,0.28)" }}>DrayGo Shipper</span>
                      </div>
                      <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"16px 18px", marginBottom:14 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                          <div style={{ width:8, height:8, borderRadius:"50%", background:app.color, flexShrink:0 }} />
                          <span style={{ fontSize:13, fontWeight:600, color:"#fff" }}>Long Beach, CA</span>
                          <span style={{ fontSize:10, color:"rgba(255,255,255,0.28)", marginLeft:"auto" }}>POLB</span>
                        </div>
                        <div style={{ width:1, height:18, background:"rgba(255,255,255,0.1)", marginLeft:3.5, marginBottom:12 }} />
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{ width:8, height:8, borderRadius:"50%", background:"#18a354", flexShrink:0 }} />
                          <span style={{ fontSize:13, fontWeight:600, color:"#fff" }}>Phoenix, AZ</span>
                          <span style={{ fontSize:10, color:"rgba(255,255,255,0.28)", marginLeft:"auto" }}>PHX</span>
                        </div>
                      </div>
                      <div style={{ background:`${app.color}10`, border:`1px solid ${app.colorBorder}`, borderRadius:14, padding:"18px 18px", marginBottom:14 }}>
                        <div style={{ fontSize:9, color:"rgba(255,255,255,0.38)", textTransform:"uppercase" as const, letterSpacing:"0.14em", marginBottom:6 }}>Locked Rate · 40&apos; Dry</div>
                        <div style={{ fontSize:40, fontWeight:900, color:"#fff", lineHeight:1, marginBottom:6 }}>$742<span style={{ fontSize:16, fontWeight:400, color:"rgba(255,255,255,0.35)" }}>.00</span></div>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#18a354" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          <span style={{ fontSize:10, color:"#18a354", fontWeight:700 }}>Locked 24h · All-in · Diesel live</span>
                        </div>
                      </div>
                      {[["LA → Denver","$1,140","#fc0b05"],["Oakland → Reno","$480","#18a354"]].map(([r,p,c])=>(
                        <div key={r} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                          <span style={{ fontSize:11, color:"rgba(255,255,255,0.42)" }}>{r}</span>
                          <span style={{ fontSize:11, fontWeight:800, color:c as string }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── CARRIER WIDGET ── */}
                  {app.id === "carrier" && (
                    <div style={{ background:"rgba(15,23,42,0.97)", border:`1px solid ${app.colorBorder}`, borderRadius:24, padding:28, boxShadow:`0 40px 80px rgba(0,0,0,0.7), 0 0 60px ${app.color}14`, width:"100%", maxWidth:380 }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                        <span style={{ fontSize:13, fontWeight:700, color:"#fff" }}>DrayGo <span style={{ color:app.color }}>Carrier</span></span>
                        <div style={{ position:"relative", display:"inline-flex", alignItems:"center", gap:5, background:`${app.color}20`, border:`1px solid ${app.colorBorder}`, borderRadius:20, padding:"4px 12px 4px 8px" }}>
                          <span style={{ position:"absolute", width:8, height:8, borderRadius:"50%", background:app.color, left:8, animation:"statusPing 1.6s ease-out infinite" }} />
                          <span style={{ width:8, height:8, borderRadius:"50%", background:app.color, flexShrink:0, position:"relative" }} />
                          <span style={{ fontSize:9, fontWeight:800, color:app.color, textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>Online</span>
                        </div>
                      </div>
                      <div style={{ marginBottom:20 }}>
                        <div style={{ fontSize:9, color:"rgba(255,255,255,0.32)", textTransform:"uppercase" as const, letterSpacing:"0.14em", marginBottom:4 }}>Today&apos;s Earnings</div>
                        <div style={{ fontSize:44, fontWeight:900, color:"#fff", lineHeight:1 }}>$1,240</div>
                        <div style={{ display:"flex", gap:14, marginTop:8 }}>
                          <span style={{ fontSize:10, color:"rgba(255,255,255,0.38)" }}>3 loads · 247 mi</span>
                          <span style={{ fontSize:10, color:app.color, fontWeight:700 }}>↑ 18% vs yesterday</span>
                        </div>
                      </div>
                      <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:72, marginBottom:20 }}>
                        {[42,68,55,80,65,90,74].map((h,ii)=>(
                          <div key={ii} style={{ flex:1, display:"flex", flexDirection:"column" as const, alignItems:"center", gap:4 }}>
                            <div style={{ width:"100%", height:`${h}%`, background:ii===6?app.color:`${app.color}38`, borderRadius:4, animation:`barGrow 0.5s ease-out ${ii*0.07}s both` }} />
                            <span style={{ fontSize:8, color:"rgba(255,255,255,0.22)" }}>{["M","T","W","T","F","S","S"][ii]}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:14, padding:"14px 16px" }}>
                        <div style={{ fontSize:9, color:"rgba(255,255,255,0.32)", textTransform:"uppercase" as const, letterSpacing:"0.1em", marginBottom:10 }}>Available Loads Nearby</div>
                        {[{r:"Long Beach → Phoenix",p:"$680",t:"2h ago"},{r:"LA Port → Las Vegas",p:"$520",t:"45m ago"}].map((l)=>(
                          <div key={l.r} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                            <div>
                              <div style={{ fontSize:11, fontWeight:600, color:"#fff" }}>{l.r}</div>
                              <div style={{ fontSize:9, color:"rgba(255,255,255,0.28)", marginTop:2 }}>{l.t}</div>
                            </div>
                            <span style={{ fontSize:12, fontWeight:900, color:app.color }}>{l.p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── BROKER WIDGET ── */}
                  {app.id === "broker" && (
                    <div style={{ background:"rgba(15,23,42,0.97)", border:`1px solid ${app.colorBorder}`, borderRadius:24, padding:28, boxShadow:`0 40px 80px rgba(0,0,0,0.7), 0 0 60px ${app.color}14`, width:"100%", maxWidth:380 }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                        <span style={{ fontSize:13, fontWeight:700, color:"#fff" }}>DrayGo <span style={{ color:app.color }}>Broker</span></span>
                        <span style={{ fontSize:9, color:"rgba(255,255,255,0.32)", textTransform:"uppercase" as const, letterSpacing:"0.12em" }}>Operations</span>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:18 }}>
                        {[{label:"Monthly Rev",val:"$14.6M",sub:"↑ 22% MoM",col:app.color},{label:"Avg Margin",val:"18%",sub:"1,800+ carriers",col:"#18a354"}].map((s)=>(
                          <div key={s.label} style={{ background:`${s.col}10`, border:`1px solid ${s.col}28`, borderRadius:14, padding:"14px 16px" }}>
                            <div style={{ fontSize:9, color:"rgba(255,255,255,0.32)", textTransform:"uppercase" as const, letterSpacing:"0.12em", marginBottom:4 }}>{s.label}</div>
                            <div style={{ fontSize:26, fontWeight:900, color:"#fff" }}>{s.val}</div>
                            <div style={{ fontSize:9, color:s.col, fontWeight:700, marginTop:3 }}>{s.sub}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize:9, color:"rgba(255,255,255,0.32)", textTransform:"uppercase" as const, letterSpacing:"0.12em", marginBottom:10 }}>Active Load Queue</div>
                      {[
                        {id:"DG-8821",route:"POLB → Phoenix AZ",status:"Matched",carrier:"Veloz Trucking",col:"#18a354"},
                        {id:"DG-8822",route:"NY/NJ → Chicago IL",status:"In Transit",carrier:"FastLane LLC",col:app.color},
                        {id:"DG-8823",route:"Houston → Dallas TX",status:"Pending",carrier:"Assigning...",col:"#f59e0b"},
                      ].map((load,idx)=>(
                        <div key={load.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,0.06)", animation:`slideIn 0.4s ease-out ${idx*0.1}s both` }}>
                          <div style={{ width:6, height:6, borderRadius:"50%", background:load.col, flexShrink:0 }} />
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:11, fontWeight:600, color:"#fff" }}>{load.route}</div>
                            <div style={{ fontSize:9, color:"rgba(255,255,255,0.32)", marginTop:1 }}>{load.id} · {load.carrier}</div>
                          </div>
                          <span style={{ fontSize:9, fontWeight:700, color:load.col, background:`${load.col}18`, border:`1px solid ${load.col}35`, borderRadius:6, padding:"3px 8px", whiteSpace:"nowrap" as const }}>{load.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );})}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="relative py-24 md:py-32" style={{ background: "#111827" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 rounded-xl px-4 py-1.5 mb-6 text-[12px] font-semibold text-white/65"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.13)" }}>
              How it works
            </div>
            <h2 className="display text-white" style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}>
              Built for every move<br />on the drayage chain
            </h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto" style={{ fontSize: 16 }}>
              Shippers, brokers and carriers — each gets a purpose-built app, all connected on one real-time platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-4 reveal">
              {[
                { title: "Instant Drayage Pricing", desc: "Locked rates for any U.S. lane in under 30 seconds — live diesel, FSC, chassis & terminal fees all included.", color: "#fc0b05", active: true },
                { title: "Real-time Container Visibility", desc: "Gate-in to gate-out tracking on every container, across all three apps simultaneously, 24/7.", color: "#3A5FC0", active: false },
                { title: "Same-Day Carrier Payments", desc: "Upload POD and DrayPay settles within 24 hours. No net-30, no factoring, no waiting.", color: "#18a354", active: false },
              ].map((f) => (
                <div key={f.title} className="rounded-2xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderBottom: f.active ? `3px solid ${f.color}` : "1px solid rgba(255,255,255,0.08)",
                  }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: f.color }} />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-white mb-1">{f.title}</h3>
                      <p className="text-[13.5px] text-white/50 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
              <a href="#shipper" className="inline-flex items-center gap-2 mt-2 text-[14px] font-semibold text-white/70 hover:text-white transition-colors">
                Explore all features
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </div>

            <div className="flex justify-center lg:justify-end reveal reveal-delay-1">
              <div style={{ width: 280 }}>
                <div className="rounded-[28px] overflow-hidden"
                  style={{ background: "#0A0F0D", border: "2px solid rgba(255,255,255,0.14)", boxShadow: "0 60px 120px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(24,163,84,0.15)" }}>
                  <div className="flex items-center justify-between px-5 pt-3 pb-1" style={{ background: "#0A0F0D" }}>
                    <span className="text-[10px] font-bold text-white">9:41</span>
                    <div className="flex items-center gap-1">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="white" opacity="0.7"><rect x="0" y="2" width="2" height="6" rx="0.5"/><rect x="3" y="1" width="2" height="7" rx="0.5"/><rect x="6" y="0" width="2" height="8" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5" opacity="0.3"/></svg>
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="white" opacity="0.7"><rect x="0.5" y="0.5" width="11" height="7" rx="1.5" stroke="white" strokeWidth="1" fill="none" opacity="0.5"/><rect x="12" y="2.5" width="1.5" height="3" rx="0.5" fill="white" opacity="0.5"/><rect x="1.5" y="1.5" width="8" height="5" rx="0.8" fill="white"/></svg>
                    </div>
                  </div>
                  <div className="px-4 pt-2 pb-5" style={{ background: "#0A0F0D" }}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-[10px] text-white/40">Welcome back</div>
                        <div className="text-[14px] font-black text-white">DrayGo <span style={{ color: "#18a354" }}>Carrier</span></div>
                      </div>
                      <div className="rounded-xl px-2.5 py-1.5 text-[10px] font-bold text-white flex items-center gap-1.5"
                        style={{ background: "rgba(24,163,84,0.2)", border: "1px solid rgba(24,163,84,0.35)" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#18a354", display: "inline-block" }} />
                        Online
                      </div>
                    </div>
                    <div className="rounded-2xl p-4 mb-3"
                      style={{ background: "linear-gradient(135deg, rgba(24,163,84,0.28) 0%, rgba(24,163,84,0.08) 100%)", border: "1px solid rgba(24,163,84,0.25)" }}>
                      <div className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Today&apos;s earnings</div>
                      <div className="text-[26px] font-black text-white leading-none">$1,240</div>
                      <div className="mt-1 text-[9px]" style={{ color: "#18a354" }}>↑ 3 loads completed today</div>
                    </div>
                    <div className="rounded-xl p-3 mb-3" style={{ background: "#111A12" }}>
                      <div className="text-[9px] text-white/30 mb-2">Weekly earnings</div>
                      <div className="flex items-end gap-1.5 h-10">
                        {[40, 65, 45, 80, 55, 90, 100].map((h, i) => (
                          <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 6 ? "#18a354" : "rgba(24,163,84,0.25)" }} />
                        ))}
                      </div>
                    </div>
                    <div className="text-[11px] font-bold text-white mb-2 flex items-center justify-between">
                      <span>Available loads</span>
                      <span className="text-[9px] font-bold rounded-full px-2 py-0.5" style={{ background: "rgba(24,163,84,0.2)", color: "#18a354" }}>24 new</span>
                    </div>
                    {[{ r: "Long Beach → Phoenix", p: "$680" }, { r: "Oakland → Sacramento", p: "$420" }].map((l) => (
                      <div key={l.r} className="flex items-center justify-between rounded-xl px-3 py-2.5 mb-1.5"
                        style={{ background: "#161E15", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <span className="text-[11px] text-white/70">{l.r}</span>
                        <span className="text-[11px] font-black" style={{ color: "#18a354" }}>{l.p}</span>
                      </div>
                    ))}
                    <div className="mt-3 flex justify-center"><div className="w-20 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE GROWTH CHART ─── */}
      <section style={{ background:"#0b1a10", padding:"88px 0" }}>
        <style>{`
          @keyframes barRise { from { transform:scaleY(0); transform-origin:bottom } to { transform:scaleY(1); transform-origin:bottom } }
          .chart-bar { animation: barRise 0.7s cubic-bezier(0.34,1.56,0.64,1) both; }
          .chart-bar:hover { filter: brightness(1.35); cursor:pointer; }
          .chart-col:hover .bar-value { opacity:1 !important; }
        `}</style>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(24,163,84,0.12)", border:"1px solid rgba(24,163,84,0.3)", borderRadius:8, padding:"5px 14px", fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:"#18a354", marginBottom:20 }}>
              Platform Metrics
            </div>
            <h2 className="display text-white" style={{ fontSize:"clamp(30px,4vw,50px)" }}>
              Built from zero.<br />Growing every month.
            </h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.4)", marginTop:12 }}>Real drayage volume across shippers, carriers and brokers on the DrayGo network.</p>
          </div>

          {/* Chart card */}
          <div style={{ background:"#071410", border:"1px solid rgba(24,163,84,0.28)", borderRadius:24, padding:"44px 48px" }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.22em", color:"#18a354", textTransform:"uppercase" as const, marginBottom:36, fontFamily:"monospace" }}>
              12-Month Load Volume Growth
            </div>

            {/* Bars */}
            <div style={{ display:"flex", gap:20, alignItems:"flex-end", height:200, marginBottom:14 }}>
              {[
                { val:"1,200", label:"START", pct:12, delay:"0s" },
                { val:"3,400", label:"MO 3",  pct:26, delay:"0.1s" },
                { val:"7,800", label:"MO 6",  pct:48, delay:"0.2s" },
                { val:"14,200",label:"MO 9",  pct:72, delay:"0.3s" },
                { val:"24,500",label:"MO 12", pct:100, delay:"0.4s" },
              ].map((b,i)=>(
                <div key={b.label} className="chart-col" style={{ flex:1, display:"flex", flexDirection:"column" as const, alignItems:"center", gap:8, height:"100%" }}>
                  <div className="bar-value" style={{ fontSize:11, fontWeight:700, color:"#18a354", fontFamily:"monospace", opacity:i===4?1:0.55, transition:"opacity 0.2s" }}>{b.val}</div>
                  <div style={{ flex:1, width:"100%", display:"flex", alignItems:"flex-end" }}>
                    <div className="chart-bar" style={{ width:"100%", height:`${b.pct}%`, background:i===4?"#18a354":`rgba(24,163,84,${0.2 + i*0.1})`, borderRadius:"6px 6px 4px 4px", animationDelay:b.delay, animationDuration:"0.8s" }} />
                  </div>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", fontFamily:"monospace", letterSpacing:"0.08em" }}>{b.label}</div>
                </div>
              ))}
            </div>

            {/* Divider + stats */}
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:28, display:"flex", gap:0, flexWrap:"wrap" as const }}>
              {[
                { n:"+23,300", label:"MONTHLY LOADS" },
                { n:"1,940%",  label:"NETWORK GROWTH" },
                { n:"$2.4B",   label:"VOLUME MOVED" },
              ].map((s,i)=>(
                <div key={s.label} style={{ flex:1, minWidth:160, paddingRight:32, borderRight:i<2?"1px solid rgba(255,255,255,0.07)":"none", paddingLeft:i>0?32:0 }}>
                  <div style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:900, color:"#18a354", fontFamily:"monospace", lineHeight:1 }}>{s.n}</div>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:"0.18em", marginTop:6, textTransform:"uppercase" as const, fontFamily:"monospace" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURE BANNERS ─── */}
      <section className="relative py-20 md:py-28" style={{ background: "#0f172a" }}>
        <div className="max-w-[1280px] mx-auto px-6 space-y-6">

          {/* Banner 1 */}
          <div className="rounded-3xl overflow-hidden grid lg:grid-cols-2 min-h-[280px]"
            style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="p-10 lg:p-14 flex flex-col justify-center reveal">
              <h2 className="display text-white leading-tight" style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}>
                Quote any lane<br />in 30 seconds.
              </h2>
              <p className="mt-3 text-white/50 max-w-sm leading-relaxed" style={{ fontSize: 15 }}>
                Live diesel index, FSC, chassis fees and port surcharges — all baked in. Lock a rate before your competitor even gets a callback.
              </p>
              <p className="mt-3 text-white/35 text-sm">No credit card. No wait. No middleman.</p>
              <a href="/shipper" className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold text-white w-fit transition-all hover:opacity-90"
                style={{ background: "#fc0b05" }}>
                Download App →
              </a>
            </div>
            <div className="relative overflow-hidden flex items-center justify-center min-h-[220px]"
              style={{ background: "linear-gradient(135deg, rgba(252,11,5,0.22) 0%, rgba(252,11,5,0.05) 100%)" }}>
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 60% 50%, rgba(252,11,5,0.28) 0%, transparent 65%)" }} />
              <div className="relative flex items-center gap-6">
                <div className="w-28 h-28 rounded-full flex items-center justify-center"
                  style={{ background: "#fc0b05", boxShadow: "0 0 60px rgba(252,11,5,0.45)" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/>
                  </svg>
                </div>
                <div className="display text-white" style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em" }}>Quote</div>
              </div>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="rounded-3xl overflow-hidden grid lg:grid-cols-2 min-h-[280px]"
            style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="relative overflow-hidden flex items-center justify-center min-h-[220px] order-2 lg:order-1"
              style={{ background: "linear-gradient(135deg, rgba(24,163,84,0.22) 0%, rgba(24,163,84,0.05) 100%)" }}>
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 40% 50%, rgba(24,163,84,0.28) 0%, transparent 65%)" }} />
              <div className="relative flex items-center gap-6">
                <div className="display text-white" style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em" }}>Receive</div>
                <div className="w-28 h-28 rounded-full flex items-center justify-center"
                  style={{ background: "#18a354", boxShadow: "0 0 60px rgba(24,163,84,0.45)" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v16M6 12l6 6 6-6"/><path d="M3 20h18"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-10 lg:p-14 flex flex-col justify-center order-1 lg:order-2 reveal">
              <h2 className="display text-white leading-tight" style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}>
                Carriers get paid<br />the same day.
              </h2>
              <p className="mt-3 text-white/50 max-w-sm leading-relaxed" style={{ fontSize: 15 }}>
                Upload your proof of delivery and DrayPay settles your invoice within 24 hours. No factoring, no net-30, no chasing brokers.
              </p>
              <p className="mt-3 text-white/35 text-sm">Guaranteed. Every load. Every time.</p>
              <a href="/carriers" className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold text-white w-fit transition-all hover:opacity-90"
                style={{ background: "#18a354" }}>
                Download App →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ─── APPLE CARDS CAROUSEL ─── */}
      {(() => {
        const carouselData: CardType[] = [
          {
            category: "For Shippers",
            title: "Quote any lane in 30 seconds.",
            src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
            content: (
              <div>
                <p>Get locked drayage rates for any U.S. port-to-inland lane in under 30 seconds. Live diesel index, FSC, chassis and terminal fees all baked in automatically — no callbacks, no surprises.</p>
                <ul style={{ marginTop:16, display:"flex", flexDirection:"column" as const, gap:8 }}>
                  {["Instant pricing across 40+ U.S. ports","Lock rates for 24 hours guaranteed","All-in pricing: diesel, FSC, chassis, port fees","Book directly from the app in one tap"].map(f=>(
                    <li key={f} style={{ display:"flex", gap:10, alignItems:"center" }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:"#fc0b05", flexShrink:0 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          },
          {
            category: "For Carriers",
            title: "Find loads. Get paid in 24 hours.",
            src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
            content: (
              <div>
                <p>Hundreds of drayage loads posted daily near every major U.S. port. Accept from your phone, upload POD, and DrayPay settles your invoice within 24 hours — no net-30, no factoring, no chasing.</p>
                <ul style={{ marginTop:16, display:"flex", flexDirection:"column" as const, gap:8 }}>
                  {["Live load board updated in real time","Digital dispatch & POD from your phone","24-hour guaranteed payout via DrayPay","Turn-by-turn port gate routing"].map(f=>(
                    <li key={f} style={{ display:"flex", gap:10, alignItems:"center" }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:"#18a354", flexShrink:0 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          },
          {
            category: "For Brokers",
            title: "Manage your full book at scale.",
            src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop",
            content: (
              <div>
                <p>Source vetted carriers instantly, post and assign loads from one operations dashboard, and give your shippers a branded live tracking portal. Built for drayage brokers and 3PLs moving volume.</p>
                <ul style={{ marginTop:16, display:"flex", flexDirection:"column" as const, gap:8 }}>
                  {["8,000+ vetted drayage carriers","Instant bid & counter-offer engine","White-label shipper tracking portal","P&L analytics per customer account"].map(f=>(
                    <li key={f} style={{ display:"flex", gap:10, alignItems:"center" }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:"#3A5FC0", flexShrink:0 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          },
          {
            category: "Port Coverage",
            title: "40+ U.S. ports and rail ramps.",
            src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2070&auto=format&fit=crop",
            content: (
              <div>
                <p>From Long Beach and Los Angeles to New York/NJ, Savannah, Houston and Seattle — DrayGo covers every major U.S. sea port, inland rail ramp and cross-dock destination.</p>
                <div style={{ marginTop:16, display:"flex", flexWrap:"wrap" as const, gap:8 }}>
                  {["POLB","POLA","NY/NJ","SAV","HOU","SEA","CHI","ATL","MEM","DAL","+30 more"].map(p=>(
                    <span key={p} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.7)" }}>{p}</span>
                  ))}
                </div>
              </div>
            ),
          },
          {
            category: "DrayPay",
            title: "Same-day carrier payments.",
            src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
            content: (
              <div>
                <p>DrayPay is DrayGo's built-in payment rail. Carriers upload their proof of delivery and the money moves within 24 hours — no factoring company, no broker delays, no net-30 invoicing cycles.</p>
                <div style={{ marginTop:20, background:"rgba(24,163,84,0.10)", border:"1px solid rgba(24,163,84,0.25)", borderRadius:14, padding:"20px 24px" }}>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", textTransform:"uppercase" as const, letterSpacing:"0.12em", marginBottom:4 }}>Average settlement time</div>
                  <div style={{ fontSize:42, fontWeight:900, color:"#fff", lineHeight:1 }}>6.4 <span style={{ fontSize:18, color:"rgba(255,255,255,0.4)" }}>hours</span></div>
                  <div style={{ fontSize:11, color:"#18a354", marginTop:6, fontWeight:700 }}>✓ Guaranteed within 24h on every load</div>
                </div>
              </div>
            ),
          },
          {
            category: "Real-Time Visibility",
            title: "Track every container, every move.",
            src: "https://images.unsplash.com/photo-1504222490345-c075b626a046?q=80&w=2070&auto=format&fit=crop",
            content: (
              <div>
                <p>Gate-in to gate-out container tracking across all three DrayGo apps simultaneously. Shippers, brokers and carriers all see the same real-time status — no more phone calls to check ETA.</p>
                <ul style={{ marginTop:16, display:"flex", flexDirection:"column" as const, gap:8 }}>
                  {["Live gate-in / gate-out events","Chassis & terminal dwell alerts","Automated status updates to all parties","24/7 live support for every move"].map(f=>(
                    <li key={f} style={{ display:"flex", gap:10, alignItems:"center" }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:"#fc0b05", flexShrink:0 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          },
        ];
        const cards = carouselData.map((card, index) => <Card key={card.src} card={card} index={index} />);
        return (
          <section style={{ background:"#0f172a", padding:"80px 0 60px" }}>
            <div className="max-w-[1200px] mx-auto px-6 mb-10">
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(252,11,5,0.10)", border:"1px solid rgba(252,11,5,0.28)", borderRadius:8, padding:"5px 14px", fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:"#fc0b05", marginBottom:20 }}>
                Explore DrayGo
              </div>
              <h2 className="display text-white" style={{ fontSize:"clamp(28px,4vw,48px)" }}>
                Everything your drayage operation needs.
              </h2>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.4)", marginTop:10 }}>Tap any card to learn more.</p>
            </div>
            <Carousel items={cards} />
          </section>
        );
      })()}

      {/* ─── TESTIMONIALS ─── */}
      <section className="relative py-24 md:py-32" style={{ background: "#111827" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <div className="inline-flex items-center gap-2 rounded-xl px-4 py-1.5 mb-6 text-[12px] font-semibold text-white/65"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.13)" }}>
              What people are saying
            </div>
            <h2 className="display text-white" style={{ fontSize: "clamp(30px, 4.5vw, 50px)" }}>Voices from the road</h2>
            <p className="mt-4 text-white/50 max-w-md mx-auto" style={{ fontSize: 16 }}>
              Shippers, carriers and brokers already running on DrayGo.
            </p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 reveal">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="break-inside-avoid mb-5 rounded-2xl p-7"
                style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#fc0b05">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-[14px] text-white/75 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0"
                    style={{ background: "rgba(252,11,5,0.3)" }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-white">{t.name}</div>
                    <div className="text-[11px] text-white/40">{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT + FAQ ─── */}
      <section className="relative py-24 md:py-32" style={{ background:"#0f172a" }}>
        <div className="max-w-[1280px] mx-auto px-6">

          <div className="text-center mb-12 reveal">
            <div className="inline-flex items-center gap-2 rounded-xl px-4 py-1.5 mb-6 text-[12px] font-semibold text-white/65"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.13)" }}>
              Get in touch
            </div>
            <h2 className="display text-white" style={{ fontSize: "clamp(30px, 4.5vw, 50px)" }}>Get in Touch with DrayGo</h2>
            <p className="mt-3 text-white/50" style={{ fontSize: 16 }}>Questions about the platform? We&apos;d love to hear from you.</p>
          </div>

          <div className="max-w-[640px] mx-auto mb-24 reveal">
            <div className="rounded-3xl p-8 md:p-10"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}>
              <h3 className="text-[20px] font-bold text-white text-center mb-1.5">Contact Us</h3>
              <p className="text-[13px] text-white/45 text-center mb-7">Our team typically responds within a few hours.</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input type="email" placeholder="Your Email"
                  className="rounded-xl px-4 py-3 text-[13px] text-white placeholder-white/30 outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }} />
                <input type="text" placeholder="Your Name"
                  className="rounded-xl px-4 py-3 text-[13px] text-white placeholder-white/30 outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }} />
              </div>
              <textarea rows={5} placeholder="Your Message"
                className="w-full rounded-xl px-4 py-3 text-[13px] text-white placeholder-white/30 outline-none resize-none mb-3"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }} />
              <button className="w-full rounded-xl py-3.5 text-[14px] font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#fc0b05" }}>
                Submit
              </button>
            </div>
          </div>

          <div className="text-center mb-12 reveal">
            <h2 className="display text-white" style={{ fontSize: "clamp(30px, 4.5vw, 50px)" }}>FAQ</h2>
            <p className="mt-3 text-white/50 max-w-lg mx-auto" style={{ fontSize: 16 }}>
              Whether you&apos;re curious about DrayGo&apos;s features, pricing, or how it works — we&apos;ve got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-8 reveal">
            {FAQS.map((faq, i) => (
              <button key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="rounded-2xl px-6 py-5 text-left transition-all duration-200 w-full"
                style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${openFaq === i ? "rgba(252,11,5,0.4)" : "rgba(255,255,255,0.08)"}` }}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[15px] font-semibold text-white">{faq.q}</span>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ border: "1.5px solid rgba(255,255,255,0.25)" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      {openFaq === i
                        ? <line x1="5" y1="12" x2="19" y2="12"/>
                        : <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>
                      }
                    </svg>
                  </div>
                </div>
                {openFaq === i && (
                  <p className="mt-3 text-[13.5px] text-white/55 leading-relaxed">{faq.a}</p>
                )}
              </button>
            ))}
          </div>

          <div className="rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 reveal"
            style={{ background: "#fc0b05" }}>
            <div>
              <div className="text-[18px] font-bold text-white mb-1">Still have questions?</div>
              <div className="text-[13px] text-white/80">Can&apos;t find what you&apos;re looking for? Our team is ready to help.</div>
            </div>
            <a href="mailto:support@draygo.net"
              className="rounded-xl px-6 py-3 text-[14px] font-bold text-[#fc0b05] bg-white shrink-0 transition-all hover:scale-[1.03] whitespace-nowrap">
              Contact Us
            </a>
          </div>

        </div>
      </section>

      {/* ─── FINAL CTA (Fincash style) ─── */}
      <section style={{ background:"#0f172a", padding:"0 0 80px" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div style={{ background:"#1e293b", border:"1px solid rgba(255,255,255,0.12)", borderRadius:24, overflow:"hidden", display:"grid" }} className="lg:grid-cols-2">
            {/* Left: text */}
            <div style={{ padding:"56px 60px", display:"flex", flexDirection:"column" as const, justifyContent:"center" }}>
              <h2 style={{ fontSize:"clamp(32px,4vw,52px)", fontWeight:900, color:"#fff", lineHeight:1.1, marginBottom:16 }}>
                Take Control of<br />Your Drayage Today
              </h2>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.45)", lineHeight:1.7, marginBottom:32, maxWidth:400 }}>
                Join thousands of shippers, carriers and brokers already running on DrayGo. Free to start. No contracts.
              </p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" as const, marginBottom:20 }}>
                <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#1e293b", border:"1px solid rgba(255,255,255,0.12)", borderRadius:12, padding:"10px 20px", textDecoration:"none" }}>
                  <svg width="26" height="26" viewBox="0 0 384 512" fill="#fff"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  <span style={{ lineHeight:1 }}>
                    <span style={{ display:"block", fontSize:9, color:"rgba(255,255,255,0.5)" }}>Download on the</span>
                    <span style={{ display:"block", fontSize:14, fontWeight:700, color:"#fff" }}>App Store</span>
                  </span>
                </a>
                <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#1e293b", border:"1px solid rgba(255,255,255,0.12)", borderRadius:12, padding:"10px 20px", textDecoration:"none" }}>
                  <img src={asset("/google-play.png")} alt="" style={{ height:26, width:"auto" }} />
                  <span style={{ lineHeight:1 }}>
                    <span style={{ display:"block", fontSize:9, color:"rgba(255,255,255,0.5)", textTransform:"uppercase" as const, letterSpacing:"0.1em" }}>Get it on</span>
                    <span style={{ display:"block", fontSize:14, fontWeight:700, color:"#fff" }}>Google Play</span>
                  </span>
                </a>
              </div>
              <p style={{ fontSize:11, color:"rgba(255,255,255,0.22)" }}>No credit card required · Free to start · Cancel anytime</p>
            </div>
            {/* Right: gradient panel with mini UI */}
            <div style={{ position:"relative", overflow:"hidden", background:"linear-gradient(135deg, #1a0a0a 0%, #0d1a0d 50%, #0a0d1a 100%)", minHeight:320, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 30% 40%, rgba(252,11,5,0.18) 0%, transparent 55%)" }} />
              <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 50% at 70% 60%, rgba(24,163,84,0.14) 0%, transparent 55%)" }} />
              <div style={{ position:"relative", display:"flex", flexDirection:"column" as const, gap:10, padding:32 }}>
                {APPS.map((app)=>(
                  <div key={app.id} style={{ background:"rgba(10,10,10,0.85)", border:`1px solid ${app.colorBorder}`, borderRadius:14, padding:"14px 20px", display:"flex", alignItems:"center", gap:14, backdropFilter:"blur(12px)" }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:`${app.color}20`, border:`1px solid ${app.colorBorder}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:app.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{app.name}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", marginTop:2 }}>{app.role}</div>
                    </div>
                    <div style={{ marginLeft:"auto", fontSize:11, fontWeight:700, color:app.color, background:`${app.color}12`, border:`1px solid ${app.colorBorder}`, borderRadius:6, padding:"3px 10px" }}>Free</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
