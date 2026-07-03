"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { asset } from "@/lib/site";
import HeroStatsBar from "@/components/HeroStatsBar";

const PRIMARY = "#27b30a";

const CARRIER_LINES = [
  { text: "Get Paid in 48 Hours.",      color: "#27b30a" },
  { text: "No Empty Miles. Ever.",      color: "#38BDF8" },
  { text: "Loads at Every Major Port.", color: "#fc0b05" },
];

/* ─── data ─────────────────────────────────────────────────── */
const STATS = [
  ["4,600+", "Active Carriers"],
  ["48h", "Average Payment"],
  ["$3.42", "Avg Per Mile"],
  ["96.2%", "On-Time Rate"],
];

const LOADS = [
  { id: "DG-4821", from: "APM Terminals (LA/LB)", to: "Ontario, CA", miles: 58, rate: 1850, container: "40' HC", avail: "Today" },
  { id: "DG-4822", from: "Bayport Terminal (HOU)", to: "Pasadena, TX", miles: 34, rate: 1100, container: "45' HC", avail: "Today" },
  { id: "DG-4823", from: "Garden City (SAV)", to: "Atlanta, GA", miles: 246, rate: 2200, container: "40' Std", avail: "Tomorrow" },
  { id: "DG-4824", from: "Maher Terminal (NY/NJ)", to: "Newark, NJ", miles: 12, rate: 650, container: "20' Std", avail: "Today" },
  { id: "DG-4825", from: "Wando Welch (CHS)", to: "Greenville, SC", miles: 218, rate: 2400, container: "45' HC", avail: "Tomorrow" },
  { id: "DG-4826", from: "SSA T-18 (SEA)", to: "Tacoma, WA", miles: 28, rate: 980, container: "20' Rfr", avail: "Today" },
];

const LOAD_CHIPS = [
  "LA/LB → Ontario $1,850",
  "NY/NJ → Newark $650",
  "SAV → Atlanta $2,200",
  "HOU → Pasadena $1,100",
  "CHS → Greenville $2,400",
  "SEA → Tacoma $980",
];

const ONBOARD_STEPS = [
  {
    title: "Enter MC/DOT Number",
    desc: "We verify your authority and insurance in real time. 2 minutes.",
  },
  {
    title: "Upload Insurance COI",
    desc: "Cert of Insurance with DrayGo as additional insured. 1 hour review.",
  },
  {
    title: "Download DrayGo App",
    desc: "iOS & Android. Load board, navigation, payments.",
  },
  {
    title: "Claim Your First Load",
    desc: "Browse near your home port. Get paid 48h after delivery.",
  },
];

const TESTIMONIALS = [
  {
    initial: "M",
    name: "Mike D.",
    role: "Owner-Operator · Long Beach, CA",
    quote: "I went from 3-4 loads a week calling brokers to 12+ loads using DrayGo. The pay is better and I get paid in 2 days.",
    stat: "12 loads/week",
  },
  {
    initial: "C",
    name: "Carlos R.",
    role: "Small Fleet · Houston, TX",
    quote: "No more waiting 45 days for a check. 48-hour payment changed my cash flow completely. I bought a second truck in 6 months.",
    stat: "3 trucks",
  },
  {
    initial: "J",
    name: "James T.",
    role: "Owner-Operator · Savannah, GA",
    quote: "The app shows me loads at every terminal near me. I never run empty miles anymore.",
    stat: "8 loads/week",
  },
];

/* ─── helpers ───────────────────────────────────────────────── */
function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

/* ─── page ──────────────────────────────────────────────────── */
export default function CarriersPage() {
  /* hero animation */
  const [carrierIdx, setCarrierIdx] = useState(0);
  const [carrierOut, setCarrierOut] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setCarrierOut(true);
      setTimeout(() => { setCarrierIdx(i => (i + 1) % CARRIER_LINES.length); setCarrierOut(false); }, 380);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  /* earnings calculator */
  const [loadsPerWeek, setLoadsPerWeek] = useState(8);
  const [avgMiles, setAvgMiles] = useState(65);

  const weeklyGross = loadsPerWeek * avgMiles * 3.42;
  const monthlyGross = weeklyGross * 4.3;
  const annualGross = weeklyGross * 52;
  const fuelCost = avgMiles * loadsPerWeek * 4.3 * 0.42;
  const netMonthly = monthlyGross - fuelCost;

  /* load claim */
  const [claimedId, setClaimedId] = useState<string | null>(null);

  /* onboarding checklist */
  const [done, setDone] = useState([false, false, false, false]);
  const allDone = done.every(Boolean);
  function toggleStep(i: number) {
    setDone((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  return (
    <div style={{ background: "#060f1e" }}>
      <Nav logoSrc={asset("/logo-carrier-green.png")} />

      {/* ── SECTION 1: HERO ──────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "#06101e", paddingBottom: 0 }}>
        <video autoPlay muted loop playsInline style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }}>
          <source src={asset("/hero-bg.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex:2 }}>
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full" style={{ background:"radial-gradient(circle, rgba(39,179,10,0.14) 0%, transparent 60%)" }} />
          <div className="absolute top-0 -right-40 w-[600px] h-[600px] rounded-full" style={{ background:"radial-gradient(circle, rgba(58,95,192,0.14) 0%, transparent 60%)" }} />
        </div>
        <div className="relative max-w-[1100px] mx-auto px-6 flex flex-col items-center text-center" style={{ paddingTop:"clamp(110px,13vh,150px)", paddingBottom:"clamp(48px,8vh,80px)", zIndex:3 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:4, background:"rgba(39,179,10,0.16)", border:"1px solid rgba(39,179,10,0.4)", marginBottom:24 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:PRIMARY, display:"inline-block" }} />
            <span style={{ fontSize:11, fontWeight:700, color:"#fff", letterSpacing:"0.06em", textTransform:"uppercase" }}>For Drayage Carriers</span>
          </div>
          <h1 className="display text-white" style={{ fontSize:"clamp(40px,5.8vw,76px)", lineHeight:1.02, letterSpacing:"-0.03em", maxWidth:900, margin:"0 0 8px" }}>
            Haul Every Mile,<br />
            <span style={{ display:"inline-block", color:CARRIER_LINES[carrierIdx].color, transition:"color 0.3s ease", animation:carrierOut ? "heroLineOut 0.38s ease forwards" : "heroLineIn 0.42s ease forwards" }}>
              {CARRIER_LINES[carrierIdx].text}
            </span>
          </h1>
          <p className="mt-5 text-white/50" style={{ fontSize:"clamp(15px,1.4vw,17px)", maxWidth:480, marginBottom:32 }}>
            Browse live drayage loads near every major US port. Claim loads, sign digitally, and get paid in 48 hours &mdash; no factoring, no net-30 delays.
          </p>
          <div className="flex gap-2.5 flex-wrap justify-center" style={{ marginBottom:8 }}>
            <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200" style={{ textDecoration:"none", whiteSpace:"nowrap" }}>
              <svg width="30" height="30" viewBox="0 0 384 512" fill="#fff" className="shrink-0"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] opacity-90">Download on the</span><span className="block text-[14px] font-semibold tracking-tight">App Store</span></span>
            </a>
            <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-white/[0.12] hover:bg-white/[0.26] border border-white/15 backdrop-blur-md transition-colors duration-200" style={{ textDecoration:"none", whiteSpace:"nowrap" }}>
              <img src={asset("/google-play.png")} alt="" className="h-7 w-auto shrink-0" />
              <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] uppercase tracking-[0.14em] opacity-90">Get it on</span><span className="block text-[14px] font-semibold tracking-tight">Google Play</span></span>
            </a>
          </div>
          <div className="w-full flex justify-center" style={{ marginTop:20 }}>
            <picture style={{ width:"100%", maxWidth:1000, display:"block" }}>
              <source srcSet={asset("/hero-mockup.webp")} type="image/webp" />
              <img src={asset("/hero-mockup.png")} alt="DrayGo Carrier App" loading="eager" fetchPriority="high" style={{ width:"100%", display:"block", opacity:1 }} />
            </picture>
          </div>
        </div>
      </section>

      <HeroStatsBar />

      {/* ── PRICING SECTION ──────────────────────────────────── */}
      <section style={{ background: "radial-gradient(ellipse 70% 90% at 15% 50%, rgba(39,179,10,0.12) 0%, transparent 65%), radial-gradient(ellipse 60% 70% at 85% 30%, rgba(39,179,10,0.07) 0%, transparent 55%), #060f1e", padding: "88px 24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-semibold mb-5 rounded" style={{ background: "rgba(39,179,10,0.14)", border: "1px solid rgba(39,179,10,0.4)", color: "#fff" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#27b30a", display: "inline-block" }} />
              Simple, transparent pricing
            </div>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 16px" }}>
              Plans built for carriers.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              Every plan includes live load board access, verified loads, and 48-hour payments. No setup fees.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }} className="pricing-grid-carriers">
            {/* Starter */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#27b30a", marginBottom: 16 }}>Starter</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$0</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For owner-operators just getting started on DrayGo.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["3 loads per month","Live load board access","Basic rate calculator","Email support","Standard POD upload","48h payment on delivery"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get Started Free</a>
            </div>
            {/* Carrier Pro — highlighted */}
            <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid #27b30a", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#27b30a", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 4, whiteSpace: "nowrap" }}>MOST POPULAR</div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#27b30a", marginBottom: 16 }}>Carrier Pro</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$49</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For active drayage carriers running high load volumes.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Unlimited load claims","Priority load matching","Real-time GPS tracking","Instant POD processing","Dedicated carrier support","Same-day payment option"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "#27b30a", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Start Free Trial</a>
            </div>
            {/* Fleet */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#27b30a", marginBottom: 16 }}>Fleet</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$99</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For small fleets and dispatchers managing multiple trucks.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Everything in Carrier Pro","Multi-truck dashboard","Fleet GPS overview","Driver management tools","Fuel card integration","Priority phone support"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get Started</a>
            </div>
            {/* Enterprise */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#27b30a", marginBottom: 16 }}>Enterprise</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$199</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For large fleets and carriers with enterprise needs.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Everything in Fleet","Unlimited trucks & drivers","Enterprise GPS & telematics","Custom rate negotiations","Dedicated account team","SLA & uptime guarantee"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CARRIER BENEFITS ─────────────────────────────────── */}
      <section style={{ background: "#060d1a", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(39,179,10,0.12)", border: "1px solid rgba(39,179,10,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#27b30a", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#27b30a", display: "inline-block" }} />
              Benefits
            </div>
            <h2 style={{ fontSize: "clamp(34px,4vw,56px)", fontWeight: 900, color: "#fff", lineHeight: 1.04, margin: "0 0 14px" }}>
              Drive more. Earn more.{" "}
              <span style={{ color: "#27b30a" }}>Get paid faster.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 17, maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
              DrayGo puts carriers first — faster payments, smarter loads, and technology that works as hard as you do.
            </p>
          </div>

          {/* bento top row */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
            {/* HERO CARD */}
            <div style={{ background: "linear-gradient(135deg, rgba(39,179,10,0.18) 0%, rgba(39,179,10,0.05) 100%)", border: "1.5px solid rgba(39,179,10,0.3)", borderRadius: 20, padding: "44px 48px", position: "relative", overflow: "hidden", minHeight: 340, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ position: "absolute", right: -60, top: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(39,179,10,0.15), transparent 70%)", pointerEvents: "none" }} />
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#27b30a", borderRadius: 99, padding: "3px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", marginBottom: 20 }}>FAST PAYMENT</div>
                <div style={{ fontSize: "clamp(72px,8vw,96px)", fontWeight: 900, color: "#fff", lineHeight: 0.9, marginBottom: 4 }}>24h</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Fastest payout after POD</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 12px", lineHeight: 1.2 }}>Get paid in 24 to 72 hours.</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
                  No more waiting 30–45 days for a check. DrayGo deposits directly to your bank account within 24 to 72 hours of POD confirmation — so your cash flow never stalls between loads.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div><div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>72h</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 3 }}>Max wait</div></div>
                <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }} />
                <div><div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>Direct</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 3 }}>Bank deposit</div></div>
                <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }} />
                <div><div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>48h</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 3 }}>Average</div></div>
              </div>
            </div>

            {/* STAT TOWER */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, display: "flex", flexDirection: "column" }}>
              {[
                { val: "4,600+", label: "Active Carriers" },
                { val: "96.2%", label: "On-Time Rate" },
                { val: "$3.42", label: "Avg Per Mile" },
              ].map((s, i, arr) => (
                <div key={s.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <div style={{ fontSize: 44, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 8, textAlign: "center" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* bento bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              { iconPath: '<path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>', title: "AI + Blockchain Load Board", desc: "AI matches you to the highest-paying loads near your location. Blockchain-secured POD means instant payment release with zero disputes." },
              { iconPath: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>', title: "Loads Near Your Location", desc: "AI surfaces loads at ports closest to where you are right now. Minimize deadhead miles and maximize your revenue every single day." },
              { iconPath: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', title: "Verified Shippers Only", desc: "Every shipper on DrayGo is vetted and pre-approved. No more chasing down payment or dealing with fraudulent load postings." },
            ].map(b => (
              <div key={b.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(39,179,10,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: b.iconPath }} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "14px 0 8px" }}>{b.title}</div>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PHOTO SPLIT — EARNINGS CALCULATOR ─────── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* LEFT: photo */}
        <div style={{ minHeight: 620, position: "relative", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80"
            alt="Carrier trucks"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(8,25,43,0.2) 0%, rgba(39,179,10,0.25) 100%)",
            }}
          />
          {/* bottom-left content */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              padding: "2.5rem",
            }}
          >
            <p
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 22,
                lineHeight: 1.3,
                maxWidth: 340,
                marginBottom: 12,
              }}
            >
              4,600+ carriers earning more on DrayGo.
            </p>
            <span
              style={{
                display: "inline-block",
                background: PRIMARY,
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                padding: "6px 16px",
                borderRadius: 999,
              }}
            >
              $3.42/mi average
            </span>
          </div>
        </div>

        {/* RIGHT: calculator */}
        <div
          style={{
            background: "#08192b",
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3"
            style={{ color: PRIMARY }}
          >
            EARNINGS CALCULATOR
          </div>
          <h2
            className="font-bold text-white leading-[1.08] mb-8"
            style={{ fontSize: "clamp(26px, 2.5vw, 40px)" }}
          >
            See How Much You Can Earn
          </h2>

          {/* slider: loads per week */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-[14px] font-semibold">Loads Per Week</span>
              <span className="text-white font-bold text-[18px]">{loadsPerWeek} loads</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={loadsPerWeek}
              onChange={(e) => setLoadsPerWeek(Number(e.target.value))}
              style={{ accentColor: PRIMARY, width: "100%" }}
            />
          </div>

          {/* slider: avg miles */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-[14px] font-semibold">Avg Miles Per Load</span>
              <span className="text-white font-bold text-[18px]">{avgMiles} mi</span>
            </div>
            <input
              type="range"
              min={15}
              max={350}
              step={5}
              value={avgMiles}
              onChange={(e) => setAvgMiles(Number(e.target.value))}
              style={{ accentColor: PRIMARY, width: "100%" }}
            />
          </div>

          {/* 2x2 stat grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            {[
              { label: "Weekly Gross", value: fmt(weeklyGross), alt: false },
              { label: "Monthly Gross", value: fmt(monthlyGross), alt: false },
              { label: "Est. Annual", value: fmt(annualGross), alt: false },
              { label: "After Fuel Est.", value: fmt(netMonthly), alt: true },
            ].map(({ label, value, alt }) => (
              <div
                key={label}
                style={{
                  background: alt ? "rgba(39,179,10,0.05)" : "rgba(39,179,10,0.08)",
                  border: "1px solid rgba(39,179,10,0.2)",
                  borderRadius: 12,
                  padding: 16,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: PRIMARY,
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 12,
                    marginTop: 6,
                    fontWeight: 500,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 11,
              marginTop: 16,
            }}
          >
            Est. based on $3.42/mi avg. Actual varies.
          </p>
        </div>
      </section>

      {/* ── SECTION 4: FIND MORE LOADS FULL-BLEED ────────────── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80"
          alt="Highway trucks"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(5,10,24,0.82)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            paddingTop: 112,
            paddingBottom: 112,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <div
            className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4"
            style={{ color: PRIMARY }}
          >
            LIVE LOAD BOARD
          </div>
          <h2
            className="font-extrabold text-white leading-[1.06]"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 16 }}
          >
            Hundreds of Loads Available Right Now.
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 16,
              maxWidth: 520,
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            Every load is pre-verified, fully digital, and pays within 48 hours of POD.
          </p>

          {/* load chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 10,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            {LOAD_CHIPS.map((chip) => (
              <span
                key={chip}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: 13,
                  padding: "8px 16px",
                  borderRadius: 999,
                  backdropFilter: "blur(8px)",
                }}
              >
                {chip}
              </span>
            ))}
          </div>

          {/* CTA button */}
          <Link
            href="/load-board"
            style={{
              display: "inline-block",
              background: PRIMARY,
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              padding: "16px 40px",
              borderRadius: 12,
              marginTop: 32,
              textDecoration: "none",
            }}
            className="hover:opacity-90 transition-opacity"
          >
            View All Loads
          </Link>
        </div>
      </section>

      {/* ── SECTION 5: TOP LANES CARDS ───────────────────────── */}
      <section style={{ background: "#08192b", padding: "80px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3"
              style={{ color: PRIMARY }}
            >
              TOP LANES
            </div>
            <h2
              className="font-bold text-white"
              style={{ fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1.08 }}
            >
              Highest-Paying Loads Right Now.
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{
              gap: 16,
              maxWidth: 896,
              margin: "0 auto",
            }}
          >
            {LOADS.map((load) => {
              const ppm = (load.rate / load.miles).toFixed(2);
              const isClaimed = claimedId === load.id;
              return (
                <div
                  key={load.id}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${isClaimed ? PRIMARY : "rgba(255,255,255,0.09)"}`,
                    borderRadius: 16,
                    padding: 20,
                    transition: "border-color 0.2s",
                  }}
                  className="hover:border-[#27b30a]"
                >
                  {/* top row: ID + availability */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 10,
                        background: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.55)",
                        padding: "2px 8px",
                        borderRadius: 4,
                      }}
                    >
                      {load.id}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: 6,
                        background:
                          load.avail === "Today"
                            ? "rgba(39,179,10,0.15)"
                            : "rgba(255,255,255,0.07)",
                        color:
                          load.avail === "Today" ? PRIMARY : "rgba(255,255,255,0.5)",
                        border: `1px solid ${
                          load.avail === "Today"
                            ? "rgba(39,179,10,0.3)"
                            : "rgba(255,255,255,0.12)"
                        }`,
                      }}
                    >
                      {load.avail}
                    </span>
                  </div>

                  {/* route */}
                  <div style={{ marginBottom: 6 }}>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: 12,
                        marginBottom: 2,
                      }}
                    >
                      {load.from}
                    </div>
                    <div
                      style={{
                        color: PRIMARY,
                        fontSize: 18,
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      → {load.to}
                    </div>
                  </div>

                  {/* miles */}
                  <div
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 12,
                      marginBottom: 14,
                    }}
                  >
                    {load.miles} mi
                  </div>

                  {/* bottom row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          color: "#fff",
                          fontSize: 24,
                          fontWeight: 800,
                          lineHeight: 1,
                        }}
                      >
                        {fmt(load.rate)}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.35)",
                          fontSize: 11,
                          marginTop: 2,
                        }}
                      >
                        ${ppm}/mi
                      </div>
                    </div>

                    {isClaimed ? (
                      <button
                        style={{
                          background: "rgba(39,179,10,0.12)",
                          color: PRIMARY,
                          border: "1px solid rgba(39,179,10,0.3)",
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 700,
                          padding: "8px 14px",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => setClaimedId(null)}
                      >
                        Sign in to claim →
                      </button>
                    ) : (
                      <button
                        style={{
                          background: PRIMARY,
                          color: "#fff",
                          border: "none",
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 700,
                          padding: "8px 16px",
                          cursor: "pointer",
                        }}
                        className="hover:opacity-90 transition-opacity"
                        onClick={() => setClaimedId(load.id)}
                      >
                        Claim Load
                      </button>
                    )}
                  </div>

                  {/* container type */}
                  <div
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 11,
                      marginTop: 10,
                    }}
                  >
                    {load.container}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: PAYMENT SPEED PHOTO SPLIT ─────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* LEFT: photo */}
        <div style={{ position: "relative", minHeight: 500, overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80"
            alt="Payment speed"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(8,25,43,0.45) 0%, rgba(5,10,24,0.7) 100%)",
            }}
          />
        </div>

        {/* RIGHT: content */}
        <div
          style={{
            background: "#05101c",
            padding: "4rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3"
            style={{ color: PRIMARY }}
          >
            PAYMENT SPEED
          </div>
          <h2
            className="font-bold text-white leading-[1.08] mb-4"
            style={{ fontSize: "clamp(24px, 2.5vw, 38px)" }}
          >
            Get Paid in 48 Hours. Guaranteed.
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 15,
              lineHeight: 1.65,
              marginBottom: 32,
            }}
          >
            Stop waiting 30-45 days for a check. DrayGo pays 48 hours after POD — no
            factoring, no fees.
          </p>

          {/* comparison bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              {
                label: "DrayGo",
                days: "48 Hours",
                barW: "8%",
                barColor: PRIMARY,
              },
              {
                label: "Factoring Co",
                days: "15–20 Days (minus 3–5% fee)",
                barW: "40%",
                barColor: "rgba(255,255,255,0.15)",
              },
              {
                label: "Industry Avg",
                days: "30–45 Days",
                barW: "70%",
                barColor: "rgba(255,255,255,0.1)",
              },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 13,
                    width: 120,
                    flexShrink: 0,
                  }}
                >
                  {row.label}
                </span>
                <div
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: 999,
                    height: 12,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: row.barW,
                      height: "100%",
                      background: row.barColor,
                      borderRadius: 999,
                    }}
                  />
                </div>
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 11,
                    width: 180,
                    flexShrink: 0,
                  }}
                >
                  {row.days}
                </span>
              </div>
            ))}
          </div>

          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontWeight: 600,
              marginTop: 32,
              fontSize: 15,
            }}
          >
            Save $4,500+ per month in factoring fees.
          </p>
          <p style={{ color: PRIMARY, marginTop: 8, fontSize: 14, fontWeight: 600 }}>
            No factoring fees. Ever.
          </p>
        </div>
      </section>

      {/* ── SECTION 7: ONBOARDING ────────────────────────────── */}
      <section style={{ background: "#08192b", padding: "80px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div
              className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3"
              style={{ color: PRIMARY }}
            >
              GET STARTED
            </div>
            <h2
              className="font-bold text-white"
              style={{ fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1.08 }}
            >
              Join DrayGo in 4 Simple Steps.
            </h2>
          </div>

          {/* 4-step grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{
              gap: 24,
              maxWidth: 1000,
              margin: "48px auto 0",
            }}
          >
            {ONBOARD_STEPS.map((step, i) => (
              <div
                key={step.title}
                onClick={() => toggleStep(i)}
                style={{
                  background: done[i] ? "rgba(39,179,10,0.05)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${done[i] ? PRIMARY : "rgba(255,255,255,0.09)"}`,
                  borderRadius: 16,
                  padding: 32,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  backdropFilter: "blur(12px)",
                }}
                className="hover:border-[#27b30a]"
              >
                {/* circle */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    background: done[i] ? PRIMARY : "rgba(255,255,255,0.06)",
                    border: done[i] ? "none" : "2px solid rgba(255,255,255,0.2)",
                    fontSize: 24,
                    fontWeight: 700,
                    color: done[i] ? "#fff" : "rgba(255,255,255,0.4)",
                    transition: "all 0.2s",
                  }}
                >
                  {done[i] ? "✓" : i + 1}
                </div>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                    marginTop: 16,
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  {step.desc}
                </div>
              </div>
            ))}
          </div>

          {/* celebration card */}
          {allDone && (
            <div
              style={{
                background: "rgba(39,179,10,0.08)",
                border: `1px solid ${PRIMARY}`,
                borderRadius: 16,
                padding: "32px 48px",
                textAlign: "center",
                maxWidth: 640,
                margin: "32px auto 0",
              }}
            >
              <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                🚛 You&apos;re Ready to Haul!
              </div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}>
                Your application is under review. Typical approval: 1 business day.
              </div>
            </div>
          )}

          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 13,
              textAlign: "center",
              marginTop: 24,
            }}
          >
            Free to join. No monthly fees for owner-operators.
          </p>
        </div>
      </section>

      {/* ── SECTION 8: TESTIMONIALS ──────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "80px 0" }}>
        {/* photo background */}
        <img
          src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1920&q=80"
          alt="Highway"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(5,10,24,0.88)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3"
              style={{ color: PRIMARY }}
            >
              Carrier Stories
            </div>
            <h2
              className="font-bold text-white"
              style={{ fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1.08 }}
            >
              Carriers Earning More with DrayGo.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24 }}>
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 16,
                  overflow: "hidden",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* top accent bar */}
                <div style={{ height: 4, background: PRIMARY }} />
                <div style={{ padding: 28 }}>
                  {/* avatar row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: PRIMARY,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 20,
                        flexShrink: 0,
                      }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
                        {t.name}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 }}>
                        {t.role}
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      lineHeight: 1.65,
                      marginBottom: 20,
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <span
                    style={{
                      display: "inline-block",
                      background: "rgba(39,179,10,0.12)",
                      color: PRIMARY,
                      border: "1px solid rgba(39,179,10,0.25)",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 999,
                    }}
                  >
                    {t.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: CTA ───────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #06143A 0%, #061e0a 50%, #08192b 100%)",
          padding: "96px 24px",
          textAlign: "center",
        }}
      >
        <h2
          className="font-extrabold text-white leading-[1.06]"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", marginBottom: 20 }}
        >
          Start Hauling More.{" "}
          <span style={{ color: PRIMARY }}>Earning More.</span>
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 16,
            maxWidth: 480,
            margin: "0 auto 40px",
            lineHeight: 1.65,
          }}
        >
          Join thousands of drayage carriers already running more loads, cutting empty miles,
          and getting paid in 48 hours.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <a
            href="#"
            style={{
              background: PRIMARY,
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              padding: "16px 32px",
              borderRadius: 12,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
            className="hover:opacity-90 transition-opacity"
          >
            Join DrayGo Free
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <Link
            href="/load-board"
            style={{
              border: "1px solid rgba(255,255,255,0.22)",
              color: "#fff",
              background: "rgba(255,255,255,0.05)",
              fontWeight: 700,
              fontSize: 15,
              padding: "16px 32px",
              borderRadius: 12,
              textDecoration: "none",
            }}
            className="hover:bg-white/10 transition-colors"
          >
            View Live Loads
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
