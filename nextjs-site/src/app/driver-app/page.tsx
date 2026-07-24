"use client";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { asset } from "@/lib/site";

const LIME = "#C8FF45";
const BG = "#0a0e07";
const CARD = "rgba(255,255,255,0.04)";
const BORDER = "rgba(255,255,255,0.08)";

/* ─── shared bits ──────────────────────────────────────────── */

function Shot({ name, alt, radius = 28, style }: { name: string; alt: string; radius?: number; style?: React.CSSProperties }) {
  return (
    <picture style={{ display: "block", ...style }}>
      <source srcSet={asset(`/driver-app/${name}.webp`)} type="image/webp" />
      <img src={asset(`/driver-app/${name}.png`)} alt={alt} loading="lazy"
        style={{ width: "100%", display: "block", borderRadius: radius }} />
    </picture>
  );
}

function Phone({ name, alt, width = 300, glow = false, style }: { name: string; alt: string; width?: number; glow?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{
      width, flexShrink: 0, padding: 10, borderRadius: 40, background: "#161a12",
      border: `1px solid rgba(255,255,255,0.12)`,
      boxShadow: glow
        ? `0 30px 90px rgba(0,0,0,0.65), 0 0 80px ${LIME}30, inset 0 1px 0 rgba(255,255,255,0.08)`
        : "0 30px 90px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)",
      ...style,
    }}>
      <Shot name={name} alt={alt} radius={30} />
    </div>
  );
}

function HandShot({ name, alt, eager = false, zoom = 1.35, style }: { name: string; alt: string; eager?: boolean; zoom?: number; style?: React.CSSProperties }) {
  const mask = "radial-gradient(ellipse 68% 68% at 50% 50%, black 55%, transparent 85%)";
  return (
    <picture style={{ display: "block", ...style }}>
      <source srcSet={asset(`/driver-app/${name}.webp`)} type="image/webp" />
      <img src={asset(`/driver-app/${name}.jpg`)} alt={alt} loading={eager ? "eager" : "lazy"}
        style={{ width: "100%", display: "block", maskImage: mask, WebkitMaskImage: mask, transform: `scale(${zoom})` }} />
    </picture>
  );
}

function StoreButtons({ dark = false }: { dark?: boolean }) {
  const cls = dark
    ? "inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-[#0a0e07] hover:bg-[#151a0e] border border-black/50 transition-colors duration-200"
    : "inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-white/[0.10] hover:bg-white/[0.20] border border-white/15 backdrop-blur-sm transition-colors duration-200";
  return (
    <div className="flex flex-wrap gap-3">
      <a href="#" className={cls} style={{ textDecoration: "none" }}>
        <svg width="30" height="30" viewBox="0 0 384 512" fill="#fff" aria-hidden="true" className="shrink-0"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
        <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] opacity-90">Download on the</span><span className="block text-[14px] font-semibold tracking-tight">App Store</span></span>
      </a>
      <a href="#" className={cls} style={{ textDecoration: "none" }}>
        <img src={asset("/google-play.png")} alt="" className="h-7 w-auto shrink-0" />
        <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] uppercase tracking-[0.14em] opacity-90">Get it on</span><span className="block text-[14px] font-semibold tracking-tight">Google Play</span></span>
      </a>
    </div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 12, padding: "7px 16px",
      fontSize: 11.5, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase",
      color: LIME, background: `${LIME}14`, border: `1px solid ${LIME}30`, width: "fit-content",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 2, background: LIME, display: "inline-block" }} />
      {children}
    </div>
  );
}

/* ─── hero ─────────────────────────────────────────────────── */

const ROTATE = ["Get Paid in 24 Hours.", "Never Miss a Load.", "Run Legal, Automatically."];

function Hero() {
  const [line, setLine] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setLine(l => (l + 1) % ROTATE.length); setFade(true); }, 350);
    }, 3400);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${BORDER}` }}>
      {/* truck-route background */}
      <picture>
        <source srcSet={asset("/driver-app/hero-bg.webp?v=2")} type="image/webp" />
        <img src={asset("/driver-app/hero-bg.jpg?v=2")} alt="" aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      </picture>

      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center" style={{ padding: "clamp(56px,8vw,110px) clamp(24px,4vw,56px) 0", position: "relative", zIndex: 1 }}>
        {/* text */}
        <div className="reveal-left" style={{ paddingBottom: "clamp(56px,7vw,100px)" }}>
          <SectionTag>DrayGo Driver App</SectionTag>
          <h1 style={{ fontSize: "clamp(34px,3.9vw,54px)", fontWeight: 900, color: "#fff", lineHeight: 1.06, letterSpacing: "-0.025em", margin: "26px 0 8px" }}>
            Built for the<br />Modern Drayage Driver.
          </h1>
          <div style={{ height: "clamp(36px,3.5vw,48px)", display: "flex", alignItems: "center" }}>
            <span style={{
              fontSize: "clamp(20px,2.3vw,32px)", fontWeight: 900, letterSpacing: "-0.02em", color: LIME, whiteSpace: "nowrap",
              opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(10px)",
              transition: "opacity .35s ease, transform .35s ease", textShadow: `0 0 34px ${LIME}55`,
            }}>
              {ROTATE[line]}
            </span>
          </div>
          <p style={{ fontSize: "clamp(15px,1.25vw,17.5px)", color: "rgba(255,255,255,0.52)", lineHeight: 1.75, maxWidth: 480, margin: "14px 0 36px" }}>
            Loads near your port, one-tap accept, live trip guidance, HOS that tracks itself and money that
            hits your bank in 24 hours. Everything a container driver needs — in one app.
          </p>
          <StoreButtons />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2" style={{ marginTop: 28, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              <span style={{ color: LIME, fontSize: 15 }}>★★★★★</span> <b style={{ color: "#fff" }}>4.9</b> rating
            </span>
            <span><b style={{ color: "#fff" }}>8,000+</b> drivers on the network</span>
            <span>Free download</span>
          </div>
        </div>

        {/* phone-in-hands cutout mockup */}
        <div className="reveal-right reveal-delay-1 flex" style={{ alignItems: "flex-end", justifyContent: "center", position: "relative", paddingTop: 24 }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 55% 55% at 50% 60%, ${LIME}22 0%, transparent 70%)`, pointerEvents: "none" }} />
          <picture style={{ display: "block", width: "min(620px, 100%)", position: "relative" }}>
            <source srcSet={asset("/driver-app/hand-hero.webp?v=3")} type="image/webp" />
            <img src={asset("/driver-app/hand-hero.png?v=3")} alt="DrayGo Driver app in hand — home and today's earnings" loading="eager"
              style={{ width: "100%", display: "block" }} />
          </picture>
        </div>
      </div>

      {/* glass stats strip over the hero render */}
      <StatsStrip glass />
    </section>
  );
}

/* ─── stats strip ──────────────────────────────────────────── */

const STATS: [string, string][] = [
  ["24h", "DrayPay Payout After POD"],
  ["$8,820", "Top-Driver Weekly Earnings"],
  ["40+", "Ports & Rail Terminals"],
  ["0", "Paperwork. Digital POD & BOL"],
];

function StatsStrip({ glass = false }: { glass?: boolean }) {
  return (
    <section style={glass
      ? { borderTop: `1px solid rgba(255,255,255,0.12)`, background: "rgba(10,14,7,0.35)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", position: "relative", zIndex: 1 }
      : { borderBottom: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)" }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4" style={{ padding: "0 clamp(24px,4vw,56px)" }}>
        {STATS.map(([n, l], i) => (
          <div key={l} className={`reveal reveal-delay-${i % 4}`} style={{ padding: "34px 20px", textAlign: "center", borderLeft: i > 0 ? `1px solid ${BORDER}` : "none" }}>
            <div style={{ fontSize: "clamp(28px,2.8vw,40px)", fontWeight: 900, color: LIME, letterSpacing: "-0.02em", textShadow: `0 0 30px ${LIME}40` }}>{n}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)", marginTop: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── feature grid ─────────────────────────────────────────── */

const GRID = [
  { t: "Live Load Board", d: "Loads near you, refreshed live — flat rate, $/mi and fuel surcharge shown up front. Filter by day and equipment, accept in one tap.", i: "M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" },
  { t: "Instant Alerts", d: "New trips, rate changes and payments land on your lock screen the second they happen. Never miss a load or a dollar.", i: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" },
  { t: "QR Container Scan", d: "Scan the container code at the gate — chassis, seal and box verified in seconds. Gate-in logged automatically.", i: "M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10" },
  { t: "Digital POD & Signature", d: "Photo proof of delivery plus on-glass signature. Receipts generated instantly — the office gets it before you leave the yard.", i: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 15l2 2 4-4" },
  { t: "HOS & ELD Built In", d: "Drive, shift and 70-hour cycle clocks with break warnings before you need them. ELD-connected, always audit-ready.", i: "M12 3a9 9 0 1 0 9 9M12 7v5l3 2M21 3l-4 4M21 3h-4M21 3v4" },
  { t: "Terminals Directory", d: "Gate hours, appointment rules and live congestion for 40+ ports and rail ramps — before you burn a trip finding out.", i: "M12 2a3 3 0 0 1 3 3M12 22V8M5 12H2a10 10 0 0 0 20 0h-3M12 2a3 3 0 0 0-3 3" },
];

function FeatureGrid() {
  return (
    <section style={{ borderBottom: `1px solid ${BORDER}`, position: "relative" }}>
      <div className="max-w-[1200px] mx-auto" style={{ padding: "clamp(64px,8vw,110px) clamp(24px,4vw,56px)" }}>
        <div className="reveal" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}><SectionTag>One App. The Whole Job.</SectionTag></div>
          <h2 style={{ fontSize: "clamp(30px,3.6vw,48px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "22px 0 14px" }}>
            Everything from gate&#8209;in<br />to getting paid
          </h2>
          <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.48)", lineHeight: 1.7 }}>
            46 screens of driver-first design. No dispatcher phone tag, no paper, no waiting on net-30.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GRID.map((f, i) => (
            <div key={f.t} className={`reveal reveal-delay-${i % 3}`}
              style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: "26px 24px", transition: "border-color .2s, transform .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${LIME}50`; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${LIME}14`, border: `1px solid ${LIME}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={f.i} /></svg>
              </div>
              <div style={{ fontSize: 16.5, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{f.t}</div>
              <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.46)", lineHeight: 1.65 }}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── deep-dive sections ───────────────────────────────────── */

type Deep = { tag: string; title: string; desc: string; points: [string, string][]; shot: string; mock?: string; alt: string; flip?: boolean };

const DEEPS: Deep[] = [
  {
    tag: "Load Board",
    title: "42 loads near you.\nPick the ones worth driving.",
    desc: "Go online and watch loads roll in from every terminal around your port. Every card shows the flat rate, per-mile money and fuel surcharge before you commit — urgent moves flagged in red, one tap to accept.",
    points: [
      ["Rate transparency", "Flat rate, $/mi and FSC% on every card — no calling to find out."],
      ["Filter your week", "Day strip + Dry / Reefer / Flatbed filters. Build the week you want."],
      ["One-tap accept", "See it, take it. The load locks to you instantly."],
    ],
    shot: "06-load-board", mock: "hand-loadboard", alt: "Driver accepting a load on the DrayGo Driver load board",
  },
  {
    tag: "Live Trips",
    title: "Every trip guided,\ngate to gate.",
    desc: "From “departed yard” to “return empty,” the app walks each step with live GPS, terminal timelines and QR gate-in confirmation. Dispatch is one tap away — and so is SOS if something goes wrong.",
    points: [
      ["Step-by-step timeline", "Yard → terminal → gate-in → deliver → return empty, stamped in real time."],
      ["Scan to confirm", "QR container scan logs gate-in and seal checks automatically."],
      ["Call Dispatch / SOS", "Straight line to your dispatcher, emergency button always visible."],
    ],
    shot: "15-active-trip", alt: "DrayGo Driver active trip with live map and step timeline", flip: true,
  },
  {
    tag: "Earnings + DrayPay Wallet",
    title: "Deliver today.\nMoney tomorrow.",
    desc: "Upload the POD and DrayPay settles within 24 hours — no net-30, no factoring fees eating your rate. Watch the week build on your earnings chart and move money to your bank whenever you want.",
    points: [
      ["24-hour settlement", "POD in, money out. Same-day on most lanes."],
      ["Overtime paid at 1.5×", "Time past 8 hours is tracked per leg — port, warehouse, return — and paid automatically."],
      ["Withdraw anywhere", "Linked bank transfers in one tap. Your money, your schedule."],
    ],
    shot: "09-earnings", mock: "hand-overtime", alt: "DrayGo Driver overtime tracking with OT pay",
  },
  {
    tag: "Hours of Service",
    title: "Stay legal without\nwatching the clock.",
    desc: "Drive, shift and 70-hour/8-day cycle clocks run themselves off your ELD. The app warns you before a 30-minute break is due, keeps today's log clean, and files your DVIR and fuel purchases in the same place.",
    points: [
      ["ELD connected", "Duty status flips automatically. Logs are always inspection-ready."],
      ["Break warnings", "Alerts before you run out of drive time — not after."],
      ["DVIR + fuel log", "Pre-trip inspections and fuel receipts, digital and attached to the day."],
    ],
    shot: "13-hos", mock: "hand-eld", alt: "Dray ELD driving clock in a driver's hand", flip: true,
  },
];

function DeepSection({ s }: { s: Deep }) {
  return (
    <div style={{ borderBottom: `1px solid ${BORDER}`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 50% 80% at ${s.flip ? "18%" : "82%"} 50%, ${LIME}12 0%, transparent 58%)`, pointerEvents: "none" }} />
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 items-center gap-12" style={{ padding: "clamp(64px,7vw,100px) clamp(24px,4vw,56px)", position: "relative", zIndex: 1 }}>
        <div className={s.flip ? "lg:order-2 reveal-right" : "reveal-left"}>
          <SectionTag>{s.tag}</SectionTag>
          <h2 style={{ fontSize: "clamp(30px,3.4vw,46px)", fontWeight: 900, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.02em", margin: "24px 0 16px", whiteSpace: "pre-line" }}>
            {s.title}
          </h2>
          <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 460, marginBottom: 30 }}>{s.desc}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {s.points.map(([t, d]) => (
              <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 26, height: 26, borderRadius: 8, background: `${LIME}16`, border: `1px solid ${LIME}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: "#fff" }}>{t}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.44)", lineHeight: 1.6, marginTop: 2 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${s.flip ? "lg:order-1 reveal-left" : "reveal-right"} reveal-delay-1`} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {s.mock
            ? <HandShot name={s.mock} alt={s.alt} zoom={s.mock === "hand-overtime" ? 1.6 : 1.45} style={{ width: "min(640px, 100%)" }} />
            : <Phone name={s.shot} alt={s.alt} width={310} glow />}
        </div>
      </div>
    </div>
  );
}

/* ─── screens marquee ──────────────────────────────────────── */

const ALL_SHOTS = [
  ["04-home", "Home & today's earnings"], ["06-load-board", "Load board"], ["05-job-details", "Job details"],
  ["15-active-trip", "Active trip"], ["09-earnings", "Earnings"], ["13-hos", "Hours of Service"],
] as const;

function ScreensMarquee() {
  return (
    <section style={{ borderBottom: `1px solid ${BORDER}`, padding: "clamp(64px,7vw,96px) 0", overflow: "hidden" }}>
      <div className="reveal" style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 48px", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}><SectionTag>Inside the App</SectionTag></div>
        <h2 style={{ fontSize: "clamp(30px,3.6vw,48px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "22px 0 12px" }}>
          Take the tour
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.48)", lineHeight: 1.7 }}>
          Every screen a working driver actually needs — dark, glanceable, one-handed.
        </p>
      </div>

      <style>{`
        @keyframes daMarquee { from { transform: translateX(0); } to { transform: translateX(-33.3333%); } }
        .da-marquee { display: flex; gap: 26px; width: max-content; animation: daMarquee 34s linear infinite; }
        .da-marquee:hover { animation-play-state: paused; }
      `}</style>
      <div style={{ maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)" }}>
        <div className="da-marquee">
          {[...ALL_SHOTS, ...ALL_SHOTS, ...ALL_SHOTS].map(([name, label], i) => (
            <figure key={`${name}-${i}`} style={{ margin: 0, width: 236, flexShrink: 0 }}>
              <div style={{ padding: 7, borderRadius: 28, background: "#161a12", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 16px 44px rgba(0,0,0,0.5)" }}>
                <Shot name={name} alt={`DrayGo Driver — ${label}`} radius={21} />
              </div>
              <figcaption style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center", marginTop: 10, fontWeight: 600 }}>{label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── how it works ─────────────────────────────────────────── */

const STEPS = [
  { t: "Download & sign up", d: "Phone number + OTP. You're in before your coffee cools — about 2 minutes." },
  { t: "Verify once", d: "CDL, MC/DOT and insurance checked in-app. Most drivers approved same day." },
  { t: "Go online, take loads", d: "Flip the toggle, watch loads near your port roll in, accept the ones you want." },
  { t: "Deliver & get paid", d: "Photo POD + signature at drop. DrayPay settles to your bank within 24 hours." },
];

function Steps() {
  return (
    <section style={{ borderBottom: `1px solid ${BORDER}`, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 55% 60% at 50% 0%, ${LIME}0e 0%, transparent 60%)`, pointerEvents: "none" }} />
      <div className="max-w-[1200px] mx-auto" style={{ padding: "clamp(64px,8vw,110px) clamp(24px,4vw,56px)", position: "relative", zIndex: 1 }}>
        <div className="reveal" style={{ textAlign: "center", margin: "0 auto 56px", maxWidth: 620 }}>
          <div style={{ display: "flex", justifyContent: "center" }}><SectionTag>Getting Started</SectionTag></div>
          <h2 style={{ fontSize: "clamp(30px,3.6vw,48px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "22px 0 0" }}>
            From download to first payout
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <div key={s.t} className={`reveal reveal-delay-${i}`} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: "28px 24px", position: "relative" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: `${LIME}2e`, lineHeight: 1, marginBottom: 14, letterSpacing: "-0.03em" }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{s.t}</div>
              <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.46)", lineHeight: 1.65 }}>{s.d}</div>
              {i < 3 && (
                <svg className="hidden lg:block" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ position: "absolute", right: -18, top: "50%", transform: "translateY(-50%)", zIndex: 2, opacity: 0.7 }}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── final CTA ────────────────────────────────────────────── */

function DownloadCTA() {
  return (
    <section style={{ padding: "clamp(64px,8vw,110px) clamp(24px,4vw,56px)" }}>
      <div className="max-w-[1200px] mx-auto reveal-scale" style={{
        borderRadius: 28, position: "relative", overflow: "hidden",
        background: `linear-gradient(135deg, ${LIME} 0%, #a8e21f 55%, #8fcf07 100%)`,
        boxShadow: `0 40px 120px ${LIME}30`,
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(circle at 2px 2px, #0a0e07 1.4px, transparent 0)", backgroundSize: "26px 26px" }} />
        <div className="grid lg:grid-cols-[1.2fr_1fr] items-center" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ padding: "clamp(44px,5vw,72px)" }}>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(10,14,7,0.65)", marginBottom: 14 }}>
              Free on iOS &amp; Android
            </div>
            <h2 style={{ fontSize: "clamp(32px,4vw,54px)", fontWeight: 900, color: "#0a0e07", lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: 16 }}>
              Your next load is<br />already waiting.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(10,14,7,0.68)", lineHeight: 1.7, maxWidth: 440, marginBottom: 32, fontWeight: 500 }}>
              Join 8,000+ drayage drivers running their whole day — loads, trips, compliance and pay — from one app.
            </p>
            <StoreButtons dark />
          </div>
          <div className="hidden lg:flex" style={{ justifyContent: "center", alignItems: "flex-end", paddingTop: 40 }}>
            <Phone name="04-home" alt="DrayGo Driver app home screen" width={272} style={{ marginBottom: -80, transform: "rotate(-4deg)" }} />
            <Phone name="09-earnings" alt="DrayGo Driver earnings screen" width={220} style={{ marginBottom: -110, marginLeft: -46, transform: "rotate(6deg)", opacity: 0.95 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── page ─────────────────────────────────────────────────── */

/* ─── pricing ──────────────────────────────────────────────── */

const PLANS = [
  {
    name: "Starter", price: "$0", per: "", popular: false, cta: "Get Started Free", ctaSolid: false,
    desc: "For owner-operators just getting started on DrayGo.",
    features: ["3 loads per month", "Live load board access", "Basic rate calculator", "Email support", "Standard POD upload", "48h payment on delivery"],
  },
  {
    name: "Carrier Pro", price: "$49", per: "/ mo", popular: true, cta: "Start Free Trial", ctaSolid: true,
    desc: "For active drayage carriers running high load volumes.",
    features: ["Unlimited load claims", "Priority load matching", "Real-time GPS tracking", "Instant POD processing", "Dedicated carrier support", "Same-day payment option"],
  },
  {
    name: "Fleet", price: "$99", per: "/ mo", popular: false, cta: "Get Started", ctaSolid: false,
    desc: "For small fleets and dispatchers managing multiple trucks.",
    features: ["Everything in Carrier Pro", "Multi-truck dashboard", "Fleet GPS overview", "Driver management tools", "Fuel card integration", "Priority phone support"],
  },
  {
    name: "Enterprise", price: "$199", per: "/ mo", popular: false, cta: "Contact Sales", ctaSolid: false,
    desc: "For large fleets and carriers with enterprise needs.",
    features: ["Everything in Fleet", "Unlimited trucks & drivers", "Enterprise GPS & telematics", "Custom rate negotiations", "Dedicated account team", "SLA & uptime guarantee"],
  },
];

function Pricing() {
  return (
    <section style={{ background: `radial-gradient(ellipse 70% 90% at 15% 50%, ${LIME}14 0%, transparent 65%), radial-gradient(ellipse 60% 70% at 85% 30%, ${LIME}0b 0%, transparent 55%), ${BG}`, padding: "88px 24px", borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-semibold mb-5 rounded" style={{ background: `${LIME}14`, border: `1px solid ${LIME}44`, color: "#fff" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: LIME, display: "inline-block" }} />
            Simple, transparent pricing
          </div>
          <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 16px" }}>
            Plans built for drivers.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            Every plan includes live load board access, verified loads, and 48-hour payments. No setup fees.
          </p>
        </div>
        <div className="pricing-grid-driver" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }}>
          {PLANS.map((p, i) => (
            <div key={p.name} className={`reveal reveal-delay-${i % 4}`} style={{
              background: p.popular ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              border: p.popular ? `1px solid ${LIME}` : "1px solid rgba(255,255,255,0.09)",
              borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column", position: "relative",
              boxShadow: p.popular ? `0 0 40px ${LIME}22` : "none",
            }}>
              {p.popular && (
                <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: LIME, color: "#0a0e07", fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 4, whiteSpace: "nowrap" }}>Most Popular</div>
              )}
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: LIME, marginBottom: 16 }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{p.price}</span>
                {p.per && <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{p.per}</span>}
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>{p.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8,
                background: p.ctaSolid ? LIME : "rgba(255,255,255,0.07)",
                border: p.ctaSolid ? "none" : "1px solid rgba(255,255,255,0.16)",
                color: p.ctaSolid ? "#0a0e07" : "#fff", fontSize: 14, fontWeight: p.ctaSolid ? 800 : 600, textDecoration: "none" }}>{p.cta}</a>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .pricing-grid-driver { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .pricing-grid-driver { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

export default function DriverAppPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <RevealInit />
      <Nav logoSrc={asset("/logo-draygo-lime.png")} />
      <main>
        <Hero />
        <FeatureGrid />
        {DEEPS.map(s => <DeepSection key={s.tag} s={s} />)}
        <ScreensMarquee />
        <Steps />
        <Pricing />
        <DownloadCTA />
      </main>
      <Footer bg="#000000" accent={LIME} />
    </div>
  );
}
