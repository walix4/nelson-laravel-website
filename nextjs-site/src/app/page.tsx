"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, type MotionProps } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import Chat from "@/components/Chat";
import StatBand from "@/components/StatBand";
import Ticker from "@/components/Ticker";
import CalculateRate from "@/components/CalculateRate";
import TollSavings from "@/components/TollSavings";
import { asset } from "@/lib/site";

const fadeUp: MotionProps = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } };
const fadeIn: MotionProps  = { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.5 } };

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const BRANDS = ["CARGOMAX","portlink","NORDFREIGHT","veritas3pl","ARC LOGISTICS","Halo Freight","ROADWORKS","Meridian Fleet","Atlas Carriers","Northstar Cargo"];

type Lane = [string, string, string];
const SHIP: { title: string; icon: React.ReactNode; rows: Lane[] }[] = [
  { title: "5-axle semi", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 17V7H2v10h2"/><path d="M14 9h4l4 4v4h-2"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>, rows: [["Los Angeles","Phoenix, AZ","Legal"],["Long Beach","Las Vegas, NV","Legal"],["Oakland","Sacramento, CA","Legal"],["Seattle","Portland, OR","Tandem +"],["Houston","San Antonio, TX","Legal"]] },
  { title: "6-axle heavy", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="12" width="7" height="7" rx="1"/><rect x="14" y="12" width="7" height="7" rx="1"/><rect x="8.5" y="4" width="7" height="7" rx="1"/></svg>, rows: [["Los Angeles","Dallas, TX","Permit"],["New York/NJ","Chicago, IL","Permit"],["Norfolk","Atlanta, GA","Legal"],["Long Beach","Denver, CO","Permit"],["Miami","Orlando, FL","Legal"]] },
  { title: "Oversize / permit", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.7" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="1"/><path d="M7 6v12M11 6v12M15 6v12"/></svg>, rows: [["Houston","Kansas City, MO","Escort"],["Seattle","Salt Lake City, UT","Permit"],["Oakland","Reno, NV","Permit"],["New York/NJ","Indianapolis, IN","Escort"],["Charleston","Columbus, OH","Permit"]] },
];

const FEATURES = [
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Permit Automation", desc: "Auto-generate multi-state overweight permits. Rules updated daily from all 50 DOT databases.", accent: "#ffde01" },
  { icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-13l6 3m6 10l5.447 2.724A1 1 0 0021 19.382V8.618a1 1 0 00-.553-.894L15 5m0 15V5", title: "Route Optimization", desc: "Bridge-weight-aware routing across every US highway. Avoid overweight violations before they happen.", accent: "#3A5FC0" },
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", title: "Compliance Tracking", desc: "Real-time compliance dashboard for every load in your fleet. Instant alerts on violations or limit changes.", accent: "#ffde01" },
  { icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9", title: "50-State Regulations", desc: "Every state's axle limits, permit thresholds, escort requirements, and fee schedules in one place.", accent: "#3A5FC0" },
  { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "Fleet Visibility", desc: "Live GPS status, load weight, compliance state, and permit validity for every truck in your fleet.", accent: "#ffde01" },
  { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", title: "Dispatch Support", desc: "Built-in dispatch tools. Assign loads, push permit documents, and communicate compliance status in real time.", accent: "#3A5FC0" },
];

const WORKFLOW_STEPS = [
  { n: "01", title: "Submit Load",    desc: "Enter axle config, gross weight, origin and destination.", color: "#ffde01" },
  { n: "02", title: "Auto Analysis",  desc: "Engine checks 38 compliance inputs across federal + state rules.", color: "#3A5FC0" },
  { n: "03", title: "Permit Issued",  desc: "Multi-state permit generated and sent to driver instantly.", color: "#ffde01" },
  { n: "04", title: "Route Cleared",  desc: "Bridge-safe route calculated and pushed to navigation.", color: "#3A5FC0" },
  { n: "05", title: "Compliant Move", desc: "Real-time monitoring until delivery is confirmed compliant.", color: "#ffde01" },
];

const COMPARE_ROWS = [
  { feat: "50-state permit rules",    us: true,  manual: false, comp: false },
  { feat: "Real-time axle analysis",  us: true,  manual: false, comp: true  },
  { feat: "Bridge formula checks",    us: true,  manual: false, comp: false },
  { feat: "Automated permit filing",  us: true,  manual: false, comp: false },
  { feat: "Route optimization",       us: true,  manual: false, comp: true  },
  { feat: "Fleet-wide visibility",    us: true,  manual: false, comp: true  },
  { feat: "API / integrations",       us: true,  manual: false, comp: false },
  { feat: "Daily rule-set updates",   us: true,  manual: false, comp: false },
];

const COUNTERS = [
  { val: 250000, suffix: "+",  label: "Loads checked",      prefix: "" },
  { val: 50,     suffix: "",   label: "State rule sets",     prefix: "" },
  { val: 99.9,   suffix: "%",  label: "API uptime SLA",      prefix: "" },
  { val: 120,    suffix: "ms", label: "Avg recheck latency", prefix: "" },
];

const TESTIMONIALS = [
  { quote: "Dray Overweight cut our permit filing time from 4 hours to under 10 minutes. We're running 40% more loads.", name: "Marcus T.", role: "Fleet Manager", company: "Midwest Heavy Haul" },
  { quote: "The bridge formula checker alone saved us from 3 violations last quarter. It paid for itself on day one.", name: "Sandra K.", role: "Dispatch Director", company: "TransMax Freight" },
  { quote: "We do 300+ permit loads a month. The auto-filing across 14 states used to require 2 full-time staff. Now it's automated.", name: "James R.", role: "CEO", company: "Overload Express" },
];

const FAQS = [
  { q: "What is an overweight permit and when do I need one?", a: "An overweight permit is a legal document authorizing a commercial vehicle to exceed standard weight limits on public roads. You need one any time your gross vehicle weight exceeds 80,000 lbs federally, or when any individual axle exceeds its state limit — typically 20,000 lbs per single axle or 34,000 lbs per tandem group." },
  { q: "Which states do you support?", a: "DrayOW supports all 50 states plus federal regulations. Every state's axle weight limits, permit fee schedules, escort requirements, and route restrictions are maintained in our database, updated daily from official DOT sources." },
  { q: "How fast are permits generated?", a: "Permits are generated in under 60 seconds for most routes. Multi-state permits that require coordination across 2–5 states typically complete in 2–4 minutes. We maintain pre-computed permit packages for the 500 most common corridors for instant issuance." },
  { q: "Can I file permits for multiple axle configurations?", a: "Yes. DrayOW supports every commercial axle configuration from 3-axle straight trucks to 9-axle double-drop lowboys, including split-tandem setups, spread axles, and custom converter dollies. The compliance engine checks each axle group independently." },
  { q: "How does the bridge formula checker work?", a: "Our bridge formula engine applies the federal Bridge Formula B calculation to every axle group on your route, comparing the result against the maximum gross weight allowed for that axle spacing. It flags any configuration that would require a bridge permit before you move, giving you load-redistribution recommendations in real time." },
  { q: "Is there an API for TMS integration?", a: "Yes. Our REST API provides full access to compliance checks, permit generation, route analysis, and state rule sets. We offer SDKs for Python, Node.js, and Java, plus native integrations with major TMS platforms. API pricing is usage-based with no monthly minimum." },
];

function CounterStat({ val, suffix, prefix, label, decimals = 0 }: { val: number; suffix: string; prefix: string; label: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const dur = 1800, step = 16;
    const inc = val / (dur / step);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + inc, val);
      setCount(parseFloat(cur.toFixed(decimals)));
      if (cur >= val) clearInterval(t);
    }, step);
    return () => clearInterval(t);
  }, [inView, val, decimals]);
  return (
    <div ref={ref} className="text-center">
      <div className="display text-[42px] md:text-[52px] text-white num leading-none">{prefix}{count.toLocaleString()}{suffix}</div>
      <div className="mt-2 text-[13px] text-white/45 uppercase tracking-[0.12em] font-medium">{label}</div>
    </div>
  );
}

const Check = ({ ok }: { ok: boolean }) => ok
  ? <span style={{ color: "#22c55e", fontWeight: 700, fontSize: 16 }}>✓</span>
  : <span style={{ color: "#E53935", fontWeight: 700, fontSize: 16 }}>✕</span>;

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* TICKER */}
      <div className="text-[11px] font-medium border-b text-[#0B2D5C]" style={{ background: "#ffde01", borderColor: "rgba(0,0,0,0.15)" }}>
        <div className="max-w-[1400px] mx-auto px-6 h-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2"><span className="live-dot" style={{ background: "#0B2D5C" }} /><span>Network <b>LIVE</b></span></span>
            <span className="hidden sm:inline opacity-50">·</span><span className="hidden sm:inline num"><b>50</b> state rule sets tracked</span>
            <span className="hidden md:inline opacity-50">·</span><span className="hidden md:inline num">Federal limit <b>80,000</b> lb · Tandem <b>34,000</b> lb</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.14em]"><span className="opacity-60">v2026.05</span><a href="#api" className="opacity-80 hover:opacity-100">API status</a></div>
        </div>
      </div>

      <Nav />
      <RevealInit />

      {/* HERO — UNCHANGED */}
      <section className="relative overflow-hidden text-white">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="auto" poster={asset("/hero-toll.jpg?v=2")}><source src={asset("/hero-toll.mp4?v=2")} type="video/mp4" /></video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(1,7,26,0.82) 0%,rgba(1,7,26,0.55) 42%,rgba(1,7,26,0.86) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 520px at 18% 22%,rgba(11,35,80,0.28),transparent 60%),radial-gradient(820px 520px at 86% 82%,rgba(255,222,1,0.18),transparent 60%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-[440px_1fr] gap-10 lg:gap-14 items-stretch">
            <TollSavings />
            <div className="flex flex-col justify-center h-full">
              <div className="inline-flex items-center gap-2 self-start rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-5" style={{ background: "rgba(255,222,1,0.16)", border: "1px solid rgba(255,222,1,0.4)" }}>
                <span className="live-dot" /> Commercial overweight &amp; permit data — updated every 15 minutes
              </div>
              <h1 className="display text-white text-[40px] md:text-[64px] leading-[1.02]">The Smart Drayage Overweight Platform <span className="bg-gradient-to-r from-[#fff08a] via-[#ffe45c] to-[#ffde01] bg-clip-text text-transparent">Built for Every U.S. State</span></h1>
              <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-xl leading-relaxed">Instant overweight analysis, axle compliance, permit guidance, and route intelligence for ports, carriers, brokers, and owner operators.</p>
              <div className="mt-8 grid w-fit grid-cols-2 gap-3">
                <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] w-full pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200">
                  <svg width="30" height="30" viewBox="0 0 384 512" fill="#fff" aria-hidden="true" className="shrink-0"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] opacity-90">Download on the</span><span className="block text-[14px] font-semibold tracking-tight">App Store</span></span>
                </a>
                <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] w-full pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200">
                  <img src={asset("/google-play.png")} alt="" className="h-7 w-auto shrink-0" />
                  <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] uppercase tracking-[0.14em] opacity-90">Get it on</span><span className="block text-[14px] font-semibold tracking-tight">Google Play</span></span>
                </a>
              </div>
              <div className="mt-5 text-[12px] text-white/55">🚛 Built for 5-axle rigs, chassis moves, and heavy permit loads</div>
              <div className="mt-10 flex items-center gap-7 text-[11px] uppercase tracking-[0.16em] text-white/60">
                <div><div className="text-[26px] md:text-[30px] display num text-white">80K lb</div><div className="mt-0.5">Federal limit</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">50</div><div className="mt-0.5">States</div></div>
                <div className="h-9 w-px bg-white/20" />
                <div><div className="text-[26px] md:text-[30px] display num text-white">250,000+</div><div className="mt-0.5">Loads checked</div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 py-9 border-t-2" style={{ borderColor: "rgba(255,222,1,0.6)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-white/65">Trusted by fleets, owner-operators, brokers &amp; 3PLs</div>
            <div className="mt-6 overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)" }}>
              <div className="marquee-track">{[...BRANDS, ...BRANDS].map((b, i) => <span key={i} className="brand-logo text-white"><span className="text-[18px] font-bold tracking-tight whitespace-nowrap">{b}</span></span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <StatBand />

      {/* PROBLEM SECTION */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#0B2D5C,#061A38)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <FadeUp className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block text-[11px] uppercase tracking-[0.22em] font-semibold px-4 py-1.5 rounded-full mb-5" style={{ background: "rgba(255,222,1,0.12)", border: "1px solid rgba(255,222,1,0.3)", color: "#ffde01" }}>The problem</div>
            <h2 className="display text-white text-[36px] md:text-[52px] leading-[1.04]">Manual permits cost you time, money, and loads.</h2>
            <p className="mt-4 text-white/60 text-[15px]">Most carriers still manage overweight compliance with spreadsheets, phone calls, and guesswork. One missed rule change means a $10,000 fine at the scale house.</p>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.1 }} className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-[13px] font-bold uppercase tracking-[0.14em] mb-6 flex items-center gap-2" style={{ color: "#E53935" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#E53935", display: "inline-block" }} />Without DrayOW
              </div>
              {[["Hours","Manual permit research per load"],["$10k+","Average overweight fine exposure"],["3–5 days","Multi-state permit turnaround"],["Unknown","Real-time axle compliance status"],["Missed","Daily state rule-set changes"]].map(([val, label], i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i, duration: 0.4 }} className="flex items-center gap-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="display text-[20px] num" style={{ color: "#E53935", minWidth: 90 }}>{val}</div>
                  <div className="text-[13px] text-white/55">{label}</div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.2 }} className="rounded-2xl p-8" style={{ background: "rgba(255,222,1,0.06)", border: "1px solid rgba(255,222,1,0.2)" }}>
              <div className="text-[13px] font-bold uppercase tracking-[0.14em] mb-6 flex items-center gap-2" style={{ color: "#ffde01" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffde01", display: "inline-block" }} />With DrayOW
              </div>
              {[["Seconds","Instant overweight compliance check"],["$0","Fine exposure with permit coverage"],["Instant","Multi-state permit generation"],["Live","Real-time axle status every load"],["Automatic","Daily rule-set sync, all 50 states"]].map(([val, label], i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i, duration: 0.4 }} className="flex items-center gap-4 py-3" style={{ borderBottom: "1px solid rgba(255,222,1,0.1)" }}>
                  <div className="display text-[20px] num" style={{ color: "#ffde01", minWidth: 90 }}>{val}</div>
                  <div className="text-[13px] text-white/70">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID — dark */}
      <section id="features" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#061A38,#08213e)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: "radial-gradient(900px 600px at 80% 20%,rgba(255,222,1,0.08),transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <FadeUp className="max-w-2xl mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#ffde01" }}>Platform capabilities</div>
            <h2 className="display text-[36px] md:text-[50px] text-white leading-[1.04]">Everything overweight compliance requires.</h2>
            <p className="mt-4 text-white/55 text-[15px] max-w-xl">Six core capabilities, fully automated. From the moment a load is submitted to the moment it crosses the state line legally.</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} className="rounded-2xl p-7 cursor-default" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: f.accent === "#ffde01" ? "rgba(255,222,1,0.15)" : "rgba(58,95,192,0.18)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={f.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                </div>
                <h3 className="display text-[18px] text-white mb-2">{f.title}</h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATE RATE */}
      <section id="quote" className="relative overflow-hidden py-20 md:py-24" style={{ background: "radial-gradient(900px 500px at 80% 0%,rgba(58,95,192,0.2),transparent 60%),linear-gradient(180deg,#0B2D5C,#061A38)" }}>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--blue-2)]">Instant overweight engine</div>
            <h2 className="display text-white text-[44px] md:text-[64px] leading-[1.03] mt-3">Check your load.</h2>
            <p className="text-white/60 text-[15px] md:text-[16px] mt-4 max-w-xl mx-auto">Pick a route, see it on the map, and get a full compliance read — gross and per-axle weight, bridge formula, and state permits — in seconds.</p>
          </motion.div>
          <CalculateRate />
        </div>
      </section>

      {/* WORKFLOW — dark */}
      <section id="how-it-works" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#0B2D5C,#061A38)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <FadeUp className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#ffde01" }}>How it works</div>
            <h2 className="display text-[36px] md:text-[50px] text-white leading-[1.04]">From submission to compliant move in minutes.</h2>
          </FadeUp>
          <div className="relative">
            <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,222,1,0.25) 20%,rgba(255,222,1,0.25) 80%,transparent)" }} />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {WORKFLOW_STEPS.map((s, i) => (
                <motion.div key={s.n} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center display text-[15px] text-white" style={{ border: `2px solid ${s.color}`, background: "rgba(255,255,255,0.06)", position: "relative", zIndex: 2 }}>{s.n}</div>
                  </div>
                  <h3 className="display text-[17px] text-white mb-2">{s.title}</h3>
                  <p className="text-[13px] text-white/50 leading-relaxed max-w-[180px]">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-16 text-center">
            <Link href="/how-it-works" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#ffde01] hover:opacity-80 transition">
              See full walkthrough <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* LIVE LOADS — dark */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#061A38,#0B2D5C)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: "radial-gradient(700px 400px at 90% 50%,rgba(255,222,1,0.12),transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <FadeUp className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-2" style={{ color: "#ffde01" }}>Live on the network</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.04]">Loads being checked right now</h2>
            <p className="mt-4 text-white/55 text-[15px]">Real overweight checks running across the country — by axle configuration, from 5-axle semis to oversize permit loads.</p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Link href="/estimates" className="text-[14px] font-semibold text-[#ffde01] inline-flex items-center gap-1.5 hover:opacity-80 transition">View all <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></Link>
              <Link href="/#quote" className="px-5 py-2.5 rounded-lg text-[13px] font-semibold text-[#0B2D5C] transition hover:opacity-90" style={{ background: "#ffde01" }}>Check a load</Link>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {SHIP.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">{s.icon}<h3 className="display text-[17px] text-white">{s.title}</h3></div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 11v5" strokeLinecap="round"/><circle cx="12" cy="7.8" r="0.6" fill="#22c55e"/></svg>
                </div>
                <div style={{ position: "relative" }}>
                  <Ticker rows={s.rows} index={i} />
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 46, background: "linear-gradient(transparent,rgba(6,26,56,0.95))", pointerEvents: "none" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM DASHBOARD MOCKUP */}
      <section className="py-28 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 0%,#0B2D5C,#061A38 70%)", color: "#fff" }}>
        <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <div className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-3" style={{ color: "#ffde01" }}>Compliance engine</div>
              <h2 className="display text-[36px] md:text-[52px] leading-[1.04]">Every variable. Checked. In&nbsp;120ms.</h2>
              <p className="text-white/60 mt-5 max-w-lg text-[15px] leading-relaxed">Axle count, gross weight, axle spacing, height, width, length and route — all 38 compliance inputs checked against current state and federal limits before the truck leaves the yard.</p>
              <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                {[["50","State rule sets"],["38","Compliance inputs"],["120ms","Recheck latency"],["Daily","Limit refresh"]].map(([v, l]) => (
                  <div key={l} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="text-white/45 text-[10px] uppercase tracking-wider mb-1">{l}</div>
                    <div className="display num text-[24px]">{v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ duration: 0.7, delay: 0.2 }} className="relative" style={{ minHeight: 400 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
                  {["#E53935","#ffde01","#22c55e"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />)}
                  <div className="ml-3 rounded flex-1 h-5" style={{ background: "rgba(255,255,255,0.06)", maxWidth: 200 }} />
                </div>
                <div className="p-5 grid grid-cols-3 gap-3">
                  {[["Loads Today","1,247","+12%"],["Compliant","99.1%","↑"],["Pending","18","→"]].map(([l,v,d]) => (
                    <div key={l} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="text-white/40 text-[10px] uppercase tracking-wide">{l}</div>
                      <div className="display text-[22px] num mt-1">{v}</div>
                      <div className="text-[11px] mt-0.5" style={{ color: "#ffde01" }}>{d}</div>
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-5 grid grid-cols-2 gap-3">
                  {[["Route: LAX → PHX","5-axle","Legal","#22c55e"],["Route: LGB → LV","6-axle","Permit","#ffde01"],["Route: OAK → SAC","5-axle","Legal","#22c55e"],["Route: HOU → DAL","6-axle","Escort","#E53935"]].map(([r,ax,s,c]) => (
                    <div key={r} className="rounded-xl p-3 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div><div className="text-[11px] font-semibold">{r}</div><div className="text-white/40 text-[10px] mt-0.5">{ax}</div></div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: c + "22", color: c, border: `1px solid ${c}44` }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              {[{ label: "Axle config", val: "5-axle semi", style: { top: "-14px", left: "10%", animationDelay: "-1s" } }, { label: "Gross weight", val: "38,420 lb", style: { top: "30%", right: "-10px", animationDelay: "-2.5s" } }, { label: "Status", val: "Legal", style: { bottom: "20%", left: "-8px", animationDelay: "-3.5s" } }].map(t => (
                <div key={t.label} className="floating-tag glass-dark rounded-xl px-3 py-2 text-[11px] absolute" style={t.style as React.CSSProperties}>
                  <div className="text-white/45 text-[9px] uppercase tracking-wider">{t.label}</div>
                  <div className="display text-white">{t.val}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ANIMATED STATS — dark */}
      <section className="py-20 relative overflow-hidden" style={{ background: "#0B2D5C", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {COUNTERS.map((c) => (
              <CounterStat key={c.label} val={c.val} suffix={c.suffix} prefix={c.prefix} label={c.label} decimals={c.suffix === "%" ? 1 : 0} />
            ))}
          </div>
        </div>
      </section>

      {/* NATIONWIDE COVERAGE */}
      <section className="py-16" style={{ background: "#061A38" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="ports-band flex flex-col md:block">
            <div className="pmap" style={{ backgroundImage: `url(${asset("/usa-map.svg")})` }} />
            <div className="relative z-10 text-center px-6 pt-12 pb-10 md:py-16 max-w-xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-white/80">U.S. coverage</div>
              <h2 className="display text-white text-[34px] md:text-[44px] leading-[1.05] mt-2">Explore overweight rules by state</h2>
              <p className="text-white/85 text-[15px] mt-4">Browse overweight limits, permit requirements and fees across all 50 states — then check a load in seconds.</p>
              <Link href="/tools" className="inline-flex items-center gap-2 mt-7 font-semibold text-[14px] px-6 py-3 rounded-xl text-[#0B2D5C]" style={{ background: "#ffde01" }}>Browse state rules <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></Link>
            </div>
            <div className="ports-card left">
              <div className="flex items-center justify-between mb-4"><div className="display text-[19px] text-[var(--navy)]">Filters</div><div className="flex items-center gap-3"><span className="text-[13px] text-[var(--muted)] cursor-pointer">Clear</span><span className="bg-[var(--navy)] text-white text-[13px] font-semibold px-4 py-2 rounded-lg">Show 20</span></div></div>
              <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--muted)] mb-2">Sort by</div>
              <div className="grid grid-cols-2 gap-3 mb-5"><div className="pf-radio"><span className="pf-dot" />Permits</div><div className="pf-radio sel"><span className="pf-dot" />Axle limits</div><div className="pf-radio"><span className="pf-dot" />Escorts</div></div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div><div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--muted)]">Permit fees</div><div className="pf-track"><div className="pf-fill" style={{ width: "18%" }}/><div className="pf-knob" style={{ left: "18%" }}/></div></div>
                <div><div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--muted)] flex justify-between">Axle limits <span className="bg-[var(--navy)]/6 px-2 rounded-full text-[var(--navy)]">50</span></div><div className="pf-track"><div className="pf-fill" style={{ width: "55%" }}/><div className="pf-knob" style={{ left: "55%" }}/></div></div>
                <div><div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--muted)]">Escorts</div><div className="pf-track"><div className="pf-fill" style={{ width: "35%" }}/><div className="pf-knob" style={{ left: "35%" }}/></div></div>
              </div>
            </div>
            <div className="ports-card right">
              <div className="px-4 pt-1 pb-2 text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--muted)] flex items-center gap-1.5"><span className="flag">🇺🇸</span> Top overweight permit states</div>
              {([["California",48],["Texas",45],["Florida",52],["Ohio",33],["New Jersey",29],["Indiana",21]] as [string,number][]).map(([city,n]) => (
                <div key={city} className="pc-row"><svg className="pc-pin" viewBox="0 0 24 24"><path d="M12 22s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z"/><circle cx="12" cy="11" r="2.6" fill="#fff"/></svg>{city} <span className="text-[var(--muted)] font-normal">({n})</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON — dark */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#061A38,#0B2D5C)" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <FadeUp className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#ffde01" }}>Why DrayOW</div>
            <h2 className="display text-[36px] md:text-[50px] text-white leading-[1.04]">The only platform built end-to-end for overweight compliance.</h2>
          </FadeUp>
          <FadeIn>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,222,1,0.15)" }}>
            <div className="grid grid-cols-4 text-[12px] font-bold uppercase tracking-[0.12em]" style={{ background: "#0B2D5C", borderBottom: "1px solid rgba(255,222,1,0.2)" }}>
              <div className="px-6 py-4 col-span-1 text-white/60">Feature</div>
              <div className="px-6 py-4 text-center" style={{ background: "rgba(255,222,1,0.1)", color: "#ffde01" }}>DrayOW ✦</div>
              <div className="px-6 py-4 text-center text-white/40">Manual</div>
              <div className="px-6 py-4 text-center text-white/40">Others</div>
            </div>
            {COMPARE_ROWS.map((r, i) => (
              <div key={r.feat} className="grid grid-cols-4 text-[13px]" style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="px-6 py-4 text-white/80 font-medium">{r.feat}</div>
                <div className="px-6 py-4 text-center" style={{ background: "rgba(255,222,1,0.04)" }}><Check ok={r.us} /></div>
                <div className="px-6 py-4 text-center"><Check ok={r.manual} /></div>
                <div className="px-6 py-4 text-center"><Check ok={r.comp} /></div>
              </div>
            ))}
          </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS — dark */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#060d1a" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 10% 50%,rgba(255,222,1,0.06),transparent 60%),radial-gradient(700px 400px at 90% 20%,rgba(58,95,192,0.1),transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative">
          <FadeUp className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#ffde01" }}>What fleet operators say</div>
            <h2 className="display text-[36px] md:text-[50px] text-white leading-[1.04]">Trusted by the operators who run heavy every day.</h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl p-8 flex flex-col gap-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none"><path d="M0 20V12C0 5.373 4.373 1.667 13.12 0l1.28 2.08C10.507 3.12 8.32 5.147 7.68 8H13V20H0zm15 0V12C15 5.373 19.373 1.667 28.12 0l1.28 2.08C25.507 3.12 23.32 5.147 22.68 8H28V20H15z" fill="rgba(255,222,1,0.3)"/></svg>
                <p className="text-white/75 text-[15px] leading-relaxed flex-1">{t.quote}</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold text-[#0B2D5C]" style={{ background: "#ffde01" }}>{t.name[0]}</div>
                  <div>
                    <div className="text-white font-semibold text-[14px]">{t.name}</div>
                    <div className="text-white/45 text-[12px]">{t.role}, {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — dark */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#08192b" }}>
        <div className="max-w-[860px] mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#ffde01" }}>Got questions?</div>
            <h2 className="display text-[36px] md:text-[50px] text-white leading-[1.04]">Frequently asked questions.</h2>
          </FadeUp>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: openFaq === i ? "1px solid rgba(255,222,1,0.3)" : "1px solid rgba(255,255,255,0.08)" }}>
                <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="display text-[16px] text-white">{faq.q}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,222,1,0.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M6 9l6 6 6-6"/></svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-[14px] text-white/60 leading-relaxed" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="pt-4">{faq.a}</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "radial-gradient(900px 480px at 50% -10%,rgba(58,95,192,0.35),transparent 60%),linear-gradient(160deg,#0B2D5C,#061A38)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="max-w-[1400px] mx-auto px-6 relative text-center">
          <motion.div {...fadeUp}>
            <div className="inline-block text-[11px] uppercase tracking-[0.22em] font-semibold px-4 py-1.5 rounded-full mb-6" style={{ background: "rgba(255,222,1,0.12)", border: "1px solid rgba(255,222,1,0.3)", color: "#ffde01" }}>Start today — no setup fee</div>
            <h2 className="display text-white text-[36px] md:text-[60px] leading-[1.03] max-w-3xl mx-auto">Stop guessing. Start moving loads compliantly.</h2>
            <p className="mt-5 text-white/60 text-[16px] max-w-xl mx-auto">Join thousands of carriers, brokers, and port operators who check overweight compliance with DrayOW before every move.</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#quote" className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-[15px] font-bold text-[var(--navy)] transition hover:opacity-90" style={{ background: "#ffde01" }}>Check a load free <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
              <a href="#" className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-[15px] font-semibold text-white transition hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>Book a demo</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[12px] text-white/40">
              {["50 state rule sets","No credit card required","API access included","Setup in 5 minutes"].map(t => (
                <span key={t} className="flex items-center gap-1.5"><span style={{ color: "#ffde01" }}>✓</span>{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
