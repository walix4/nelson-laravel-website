"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import { asset } from "@/lib/site";

const reveal = (dir: "left" | "right" | "up" = "up", delay = 0) => ({
  initial: { opacity: 0, x: dir === "left" ? -48 : dir === "right" ? 48 : 0, y: dir === "up" ? 28 : 0 },
  whileInView: { opacity: 1, x: 0, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
});

const STATS = [
  { v: "10M+", l: "Containers / year" },
  { v: "<60s", l: "Settlement speed" },
  { v: "$48M+", l: "Settled / month" },
  { v: "99.9%", l: "Uptime" },
];

const SHOWCASE = [
  {
    eyebrow: "AI Shipment Intelligence",
    title: "AI that reads every container movement",
    body: "DrayPay's AI layer monitors gate events, delivery confirmations, and BOL data in real time — then triggers the payment automatically. No broker approval. No waiting. The container arrives, the money moves.",
    points: ["AI-powered delivery confirmation", "Auto-matched to BOL & container number", "Zero manual entry required"],
    color: "#00a2e7",
    photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=760&q=80",
    photoAlt: "Container terminal aerial view",
    flip: false,
  },
  {
    eyebrow: "Container-to-Payment Tracking",
    title: "Every container linked to a payment",
    body: "Each container number becomes a live payment thread. Track settlement status, proof of delivery, and full remittance history — all tied to the exact container, on a single screen.",
    points: ["Container # linked to payment record", "Live settlement status per shipment", "Full POD + remittance history"],
    color: "#0E9F6E",
    photo: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=760&q=80",
    photoAlt: "Stacked shipping containers at port",
    flip: true,
  },
  {
    eyebrow: "Port Dispatch & Drayage",
    title: "Instant settlement at every port gate",
    body: "Carriers get paid the moment the container clears the terminal gate. DrayPay reads the gate event and releases funds — no manual triggers, no broker bottleneck, no end-of-week batch runs.",
    points: ["Gate-in / gate-out payment triggers", "Same-day carrier settlement", "Works at all major US ports & terminals"],
    color: "#8B5CF6",
    photo: "https://images.unsplash.com/photo-1494961104209-3c223057bd26?w=760&q=80",
    photoAlt: "Freight trucks at port terminal",
    flip: false,
  },
  {
    eyebrow: "Shipment Reconciliation",
    title: "Close every shipment, not just every invoice",
    body: "Match every payment to a container, a BOL, and a driver. Reconcile freight charges, detention, demurrage, and fuel surcharges — all inside a single shipment record that your accounting team can audit instantly.",
    points: ["Detention & demurrage tracking", "Fuel surcharge reconciliation", "Full audit trail per container"],
    color: "#F59E0B",
    photo: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=760&q=80",
    photoAlt: "Large cargo ship at sea",
    flip: true,
  },
];

const FEATURE_GRID = [
  { title: "Real-Time Container Status", desc: "Live tracking of every container from gate-in to final delivery, updated the moment a terminal event fires.", color: "#00a2e7", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { title: "Automated BOL Matching", desc: "AI reads the bill of lading and links it to the container and payment record — no manual data entry, ever.", color: "#8B5CF6", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { title: "Port-to-Door Settlement", desc: "From terminal gate event to carrier bank account in under 60 seconds, at every major US port and inland terminal.", color: "#0E9F6E", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
  { title: "Multi-Carrier Payouts", desc: "Pay every carrier and owner-operator in a single batch. DrayPay handles splitting, deductions, and remittance automatically.", color: "#F59E0B", icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" },
  { title: "Detention & Demurrage Alerts", desc: "DrayPay tracks free-time windows and auto-alerts before detention accrues — then reconciles the charges in the shipment record.", color: "#EF4444", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "AI Fraud Detection", desc: "Behavioral models flag duplicate BOLs, suspicious container IDs, and payment anomalies before funds ever leave your account.", color: "#0EA5E9", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];

const ROLES = [
  {
    icon: "M5 17a2 2 0 104 0 2 2 0 00-4 0zM15 17a2 2 0 104 0 2 2 0 00-4 0zM5 17H3V7h11v10M14 9h4l3 4v4h-2",
    title: "Drayage Drivers",
    desc: "Get paid the moment the container clears the gate. No more chasing brokers for settlement checks.",
    color: "#00a2e7",
  },
  {
    icon: "M3 21h18M5 21V7l7-4 7 4v14M9 9h2M9 13h2M13 9h2M13 13h2",
    title: "Freight Brokers",
    desc: "Dispatch containers, trigger payments, and audit every carrier settlement from one screen.",
    color: "#8B5CF6",
  },
  {
    icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0 2 2 0 00-4 0zm-2-2h.01M17 17a2 2 0 104 0 2 2 0 00-4 0zm-2-2h.01",
    title: "Port Operators",
    desc: "Gate events automatically trigger settlements. Eliminate manual payment runs and reconciliation backlogs.",
    color: "#0E9F6E",
  },
  {
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    title: "Shipping Companies",
    desc: "Full fleet visibility. Control carrier payouts, demurrage charges, and freight costs from a single dashboard.",
    color: "#F59E0B",
  },
];

function ParallaxPhoto({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[28px]" style={{ height: 440 }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, width: "100%", height: "110%", objectFit: "cover", objectPosition: "center", display: "block" }}
      />
    </div>
  );
}

export default function Features() {
  return (
    <>
      <Nav />

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 620 }}>
        {/* Background port photo */}
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 55%", display: "block" }}
        />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,rgba(5,12,24,0.92) 0%,rgba(5,12,24,0.78) 50%,rgba(5,12,24,0.45) 100%)" }} />
        {/* Cyan glow left */}
        <div style={{ position: "absolute", top: "10%", left: "0%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,162,231,0.18) 0%,transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
        {/* Grid pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,162,231,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,162,231,0.04) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center" style={{ minHeight: 620 }}>
            {/* Left col */}
            <div className="py-24 flex flex-col justify-center">
              <motion.div {...reveal("up")}>
                <span
                  className="inline-flex items-center gap-2 rounded-[6px] px-4 py-1.5 text-[12px] font-semibold w-fit"
                  style={{ background: "rgba(0,162,231,0.14)", border: "1px solid rgba(0,162,231,0.3)", color: "#60c8f0" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00a2e7" strokeWidth="2.2" strokeLinecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
                  AI-Powered Logistics Platform
                </span>
                <h1 className="display mt-5 text-white leading-[1.06]" style={{ fontSize: "clamp(36px,5vw,62px)" }}>
                  Smart Payments for Every<br />
                  <em style={{ fontStyle: "italic", background: "linear-gradient(135deg,#60D9FF,#00a2e7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Container &amp; Shipment</em>
                </h1>
                <p className="mt-5 leading-relaxed max-w-[480px]" style={{ fontSize: 16, color: "rgba(255,255,255,0.65)" }}>
                  DrayPay connects every container movement to an instant payment. From terminal gate events to final delivery — the moment freight moves, money moves with it.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/wallet" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-[14px] font-semibold text-white" style={{ background: "linear-gradient(135deg,#00a2e7,#0565a0)", boxShadow: "0 8px 24px rgba(0,162,231,0.4)" }}>
                    Get Started Free
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </Link>
                  <Link href="/payments" className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-[14px] font-semibold" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.22)", color: "white" }}>
                    See How It Works
                  </Link>
                </div>
                <div className="mt-10 flex flex-wrap gap-8">
                  {STATS.map(s => (
                    <div key={s.l}>
                      <div className="display font-black text-white" style={{ fontSize: 28 }}>{s.v}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right col — card stack */}
            <motion.div {...reveal("right")} className="hidden lg:flex items-center justify-center" style={{ overflow: "visible" }}>
              <img
                src={asset("/cardstack-glow.png")}
                alt="DrayPay Visa Debit Card"
                style={{ width: 440, height: "auto", display: "block", filter: "drop-shadow(0 40px 80px rgba(0,162,231,0.5))" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. ALTERNATING SHOWCASE ── */}
      {SHOWCASE.map((s, idx) => (
        <section key={s.eyebrow} className="py-24" style={{ background: idx % 2 === 0 ? "white" : "#F7FAFD" }}>
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`grid lg:grid-cols-2 gap-14 items-center${s.flip ? " lg:[direction:rtl]" : ""}`}>
              {/* Photo */}
              <motion.div {...reveal(s.flip ? "right" : "left")} style={{ direction: "ltr" }}>
                <ParallaxPhoto src={s.photo} alt={s.photoAlt} />
              </motion.div>
              {/* Text */}
              <motion.div {...reveal(s.flip ? "left" : "right", 0.1)} style={{ direction: "ltr" }}>
                <span
                  className="inline-flex items-center gap-2 rounded-[6px] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
                  style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}30` }}
                >
                  {s.eyebrow}
                </span>
                <h2 className="display text-[28px] md:text-[40px] text-[var(--navy)] leading-[1.1] mt-5">{s.title}</h2>
                <p className="mt-4 text-[15px] text-[var(--muted)] leading-relaxed">{s.body}</p>
                <ul className="mt-7 space-y-3">
                  {s.points.map(p => (
                    <li key={p} className="flex items-center gap-3 text-[14px]" style={{ color: "#2D3A4A", fontWeight: 500 }}>
                      <span
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: `${s.color}18` }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2.8" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* ── 3. FEATURE GRID ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...reveal("up")} className="text-center mb-14">
            <h2 className="display text-[32px] md:text-[50px] text-[var(--navy)] leading-[1.05]">
              Everything your logistics network needs
            </h2>
            <p className="mt-4 text-[var(--muted)] text-[15px] max-w-xl mx-auto">
              Purpose-built for container freight — from port to door and every touchpoint in between.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_GRID.map((f, i) => (
              <motion.div
                key={f.title}
                {...reveal("up", i * 0.07)}
                className="rounded-[22px] p-7 border"
                style={{ background: "#FAFBFD", borderColor: "rgba(11,45,92,0.08)" }}
              >
                <div
                  style={{ width: 48, height: 48, borderRadius: 14, background: `${f.color}12`, border: `1px solid ${f.color}20`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d={f.icon}/>
                  </svg>
                </div>
                <div className="display text-[17px] text-[var(--navy)]">{f.title}</div>
                <p className="mt-2 text-[13.5px] text-[var(--muted)] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. INTELLIGENCE SECTION ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...reveal("up")} className="text-center mb-14">
            <h2 className="display text-[32px] md:text-[50px] text-[var(--navy)] leading-[1.05]">
              Intelligent by design
            </h2>
            <p className="mt-4 text-[var(--muted)] text-[15px] max-w-xl mx-auto">
              AI that reads your freight and a dashboard that shows you everything — together in one platform.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Card A — dark navy — AI Intelligence */}
            <motion.div
              {...reveal("left")}
              className="rounded-[28px] overflow-hidden"
              style={{ background: "linear-gradient(145deg,#0B1E35,#0D2A4A,#0B2D5C)", border: "1px solid rgba(0,162,231,0.15)", boxShadow: "0 4px 32px rgba(0,0,0,0.2),0 32px 64px -32px rgba(0,0,0,0.4)", minHeight: 520 }}
            >
              <div className="p-8 pb-0">
                <span
                  className="inline-flex items-center gap-2 rounded-[6px] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
                  style={{ background: "rgba(0,162,231,0.18)", color: "#60c8f0", border: "1px solid rgba(0,162,231,0.25)" }}
                >
                  AI Intelligence
                </span>
                <h3 className="display text-white text-[26px] md:text-[34px] leading-[1.1] mt-4">
                  AI that understands<br />your freight.
                </h3>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Reads BOL data automatically — no manual input",
                    "Triggers delivery payments on confirmed events",
                    "Learns your network patterns over time",
                    "Flags anomalies before they become disputes",
                  ].map(p => (
                    <li key={p} className="flex items-center gap-2.5 text-[13px]" style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00a2e7" strokeWidth="2.6" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Fake AI Event Stream */}
              <div className="px-6 pt-7 pb-0 overflow-hidden">
                <div
                  className="rounded-t-[20px] p-5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none" }}
                >
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    AI Event Stream
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {[
                      { dot: "#00a2e7", label: "Gate-out event · TCNU 884263-1 · LBCT T18", badge: "Live", badgeColor: "#00a2e7", time: "2s ago" },
                      { dot: "#0E9F6E", label: "BOL matched · MSKU 203847-9 · APM MAERSK", badge: "Matched", badgeColor: "#0E9F6E", time: "14s ago" },
                      { dot: "#EF4444", label: "Detention alert · CMAU 774012-3 · Free time expiring", badge: "Alert", badgeColor: "#EF4444", time: "1m ago" },
                    ].map(row => (
                      <div
                        key={row.label}
                        className="flex items-center gap-3 rounded-[12px] px-4 py-3"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: row.dot, flexShrink: 0 }} />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.label}</div>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{row.time}</div>
                        </div>
                        <span style={{ fontSize: 9.5, fontWeight: 700, color: row.badgeColor, background: `${row.badgeColor}20`, padding: "2px 7px", borderRadius: 4, flexShrink: 0 }}>{row.badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card B — white — Live Dashboard */}
            <motion.div
              {...reveal("right")}
              className="rounded-[28px] overflow-hidden"
              style={{ background: "white", border: "1px solid rgba(11,45,92,0.08)", boxShadow: "0 4px 32px rgba(11,45,92,0.07),0 32px 64px -32px rgba(11,45,92,0.14)", minHeight: 520 }}
            >
              <div className="p-8 pb-0">
                <span
                  className="inline-flex items-center gap-2 rounded-[6px] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
                  style={{ background: "rgba(14,159,110,0.1)", color: "#0E9F6E", border: "1px solid rgba(14,159,110,0.2)" }}
                >
                  Live Dashboard
                </span>
                <h3 className="display text-[26px] md:text-[34px] text-[var(--navy)] leading-[1.1] mt-4">
                  Every container.<br />Every payment. One view.
                </h3>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Live container position and terminal status",
                    "Per-container payment records & POD",
                    "Carrier and driver-facing settlement view",
                    "One-click CSV export for accounting",
                  ].map(p => (
                    <li key={p} className="flex items-center gap-2.5 text-[13px]" style={{ color: "#2D3A4A", fontWeight: 500 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0E9F6E" strokeWidth="2.6" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Fake container shipments table */}
              <div className="px-6 pt-7 pb-0 overflow-hidden">
                <div
                  className="rounded-t-[20px] overflow-hidden"
                  style={{ background: "#F7FAFD", border: "1px solid rgba(11,45,92,0.07)", borderBottom: "none" }}
                >
                  <div
                    className="grid grid-cols-4 px-4 py-2.5"
                    style={{ background: "rgba(11,45,92,0.04)", borderBottom: "1px solid rgba(11,45,92,0.06)", fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}
                  >
                    <span>Container</span><span>Route</span><span>Status</span><span className="text-right">Payment</span>
                  </div>
                  {[
                    { id: "TCNU 884263-1", route: "LA → Chicago", status: "Delivered", statusColor: "#0E9F6E", amount: "$2,400" },
                    { id: "MSKU 203847-9", route: "NY → Dallas", status: "In Transit", statusColor: "#00a2e7", amount: "$1,875" },
                    { id: "CMAU 774012-3", route: "SEA → Denver", status: "Gate-out", statusColor: "#8B5CF6", amount: "$3,120" },
                    { id: "HLXU 991034-7", route: "SAV → ATL", status: "Pending", statusColor: "#F59E0B", amount: "$1,650" },
                  ].map((row, i) => (
                    <div
                      key={row.id}
                      className="grid grid-cols-4 px-4 py-3 items-center"
                      style={{ background: i % 2 === 0 ? "white" : "#FAFBFD", borderBottom: "1px solid rgba(11,45,92,0.05)", fontSize: 11.5 }}
                    >
                      <span style={{ fontWeight: 700, color: "#0B2D5C", fontFamily: "monospace" }}>{row.id}</span>
                      <span style={{ color: "#6B7280", fontWeight: 500 }}>{row.route}</span>
                      <span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: row.statusColor, background: `${row.statusColor}12`, padding: "2px 7px", borderRadius: 4 }}>{row.status}</span>
                      </span>
                      <span style={{ fontWeight: 800, color: "#0B2D5C", textAlign: "right" }}>{row.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 5. ROLE CARDS ── */}
      <section className="py-24" style={{ background: "linear-gradient(160deg,#060D1A 0%,#0B1A2E 50%,#071424 100%)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div {...reveal("up")} className="text-center mb-14">
            <h2 className="display text-[32px] md:text-[48px] leading-[1.05]" style={{ color: "white" }}>
              Built for every role in the chain
            </h2>
            <p className="mt-4 text-[15px] max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              From the driver behind the wheel to the operator running the terminal — one platform, every role.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ROLES.map((r, i) => (
              <motion.div
                key={r.title}
                {...reveal("up", i * 0.08)}
                className="rounded-[22px] p-7 flex flex-col gap-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 15, background: `${r.color}18`, border: `1px solid ${r.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={r.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={r.icon}/>
                  </svg>
                </div>
                <div>
                  <div className="display text-[20px]" style={{ color: "white" }}>{r.title}</div>
                  <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FULL-WIDTH PHOTO BANNER ── */}
      <section style={{ position: "relative", height: 480, overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1624953185459-bb8ba13ad27f?w=1400&q=80"
          alt="Port operations — container terminal"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(5,12,24,0.88) 0%,rgba(5,12,24,0.5) 60%,rgba(5,12,24,0.1) 100%)" }} />
        {/* Text */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
          <div className="max-w-[1280px] mx-auto px-6 w-full">
            <motion.div {...reveal("left")} style={{ maxWidth: 560 }}>
              <span
                className="inline-flex items-center gap-2 rounded-[6px] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em]"
                style={{ background: "rgba(0,162,231,0.2)", color: "#60c8f0", border: "1px solid rgba(0,162,231,0.35)" }}
              >
                Port Operations
              </span>
              <h2 className="display text-white mt-5 leading-[1.08]" style={{ fontSize: "clamp(28px,4vw,52px)" }}>
                From terminal gate to bank<br />account — in 60 seconds.
              </h2>
              <p className="mt-4 leading-relaxed" style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", maxWidth: 460 }}>
                DrayPay reads the gate event the moment it fires and releases carrier funds immediately. No batch runs. No broker approval. Just freight moving and money following.
              </p>
              <div className="mt-8">
                <Link
                  href="/wallet"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[10px] text-[14px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#00a2e7,#0565a0)", boxShadow: "0 8px 24px rgba(0,162,231,0.4)" }}
                >
                  Start for Free
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. COMPARISON TABLE ── */}
      <section className="py-24" style={{ background: "#F5F8FC" }}>
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div {...reveal("up")} className="text-center mb-14">
            <h2 className="display text-[32px] md:text-[46px] text-[var(--navy)] leading-[1.05]">
              DrayPay vs. Traditional Freight Payments
            </h2>
            <p className="mt-4 text-[var(--muted)] text-[15px]">
              See why logistics teams switch from ACH runs, factoring, and manual reconciliation.
            </p>
          </motion.div>
          <motion.div {...reveal("up", 0.1)} className="rounded-[24px] overflow-hidden border" style={{ borderColor: "rgba(11,45,92,0.08)" }}>
            <div className="grid grid-cols-3 text-[13px] font-bold uppercase tracking-[0.1em]" style={{ background: "#0B2D5C", color: "white" }}>
              <div className="p-5">Feature</div>
              <div className="p-5 text-center" style={{ background: "#00a2e7" }}>DrayPay</div>
              <div className="p-5 text-center opacity-60">Traditional</div>
            </div>
            {[
              ["Settlement speed", "< 60 seconds", "1–5 business days"],
              ["Container tracking", "Automatic AI tracking", "Manual spreadsheet"],
              ["Port integration", "Real-time gate events", "Phone / email"],
              ["Carrier payments", "Automated batch payouts", "Individual ACH runs"],
              ["Detention alerts", "Auto-detected & billed", "Missed until invoice"],
              ["BOL matching", "AI-powered, zero entry", "Manual data entry"],
              ["Setup time", "< 2 minutes", "Days of paperwork"],
            ].map(([feat, dp, trad], i) => (
              <div
                key={feat}
                className="grid grid-cols-3 text-[13.5px]"
                style={{ background: i % 2 === 0 ? "white" : "#F8FAFD", borderBottom: "1px solid rgba(11,45,92,0.06)" }}
              >
                <div className="p-5 font-semibold" style={{ color: "#0B2D5C" }}>{feat}</div>
                <div className="p-5 text-center font-semibold" style={{ color: "#0670a0" }}>
                  <span className="inline-flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00a2e7" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                    {dp}
                  </span>
                </div>
                <div className="p-5 text-center" style={{ color: "#9CA3AF" }}>{trad}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 8. 3-COL CAPABILITY STRIP ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
                title: "Container-first architecture",
                desc: "Every feature — payments, alerts, reconciliation — is built around the container number as the primary key.",
                color: "#00a2e7",
              },
              {
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                title: "Full shipment audit trail",
                desc: "Every payment carries who triggered it, which container it covers, and a timestamp your auditors can rely on.",
                color: "#0E9F6E",
              },
              {
                icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
                title: "Role-based access",
                desc: "Drivers, brokers, port operators, and admins each see exactly what their role needs — nothing more.",
                color: "#8B5CF6",
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                {...reveal("up", i * 0.1)}
                className="flex gap-4 p-6 rounded-[20px] border"
                style={{ borderColor: "rgba(11,45,92,0.07)", background: "#FAFBFD" }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 14, background: `${c.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d={c.icon}/>
                  </svg>
                </div>
                <div>
                  <div className="display text-[16px] text-[var(--navy)]">{c.title}</div>
                  <p className="mt-1.5 text-[13px] text-[var(--muted)] leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ── */}
      <section className="py-20" style={{ background: "linear-gradient(160deg,#0B2D5C,#093155 65%,#0A3D66)" }}>
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <motion.div {...reveal("up")}>
            <h2 className="display text-white text-[32px] md:text-[50px] leading-[1.05]">
              Start moving containers.<br />Start moving money.
            </h2>
            <p className="mt-4 text-white/65 text-[15px] max-w-lg mx-auto leading-relaxed">
              No paperwork. No waiting. Connect your port operations to instant carrier payments in under 2 minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                href="/wallet"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] text-[14px] font-semibold text-white"
                style={{ background: "#00a2e7", boxShadow: "0 8px 24px rgba(0,162,231,0.35)" }}
              >
                Get Started Free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
              <a
                href="mailto:support@draypay.net?subject=DrayPay%20Demo%20Request"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] text-[14px] font-semibold text-white"
                style={{ border: "1.5px solid rgba(255,255,255,0.35)" }}
              >
                Book a Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
