"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { asset } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import type { Card as CardType } from "@/components/ui/apple-cards-carousel";

/* ── deterministic confetti (no Math.random → no hydration mismatch) ── */
const CONFETTI_PIECES = Array.from({length:80}, (_,i) => ({
  id:i,
  x:(i*137.508)%100,
  delay:(i*0.13)%3.2,
  dur:2.2+(i%6)*0.35,
  color:['#fc0b05','#4ADE80','#38BDF8','#f59e0b','#a78bfa','#ffffff','#FF4D00','#f472b6'][i%8],
  size:6+(i%9),
  circle:i%4===0,
}));

function LaunchOverlay({onDone}:{onDone:()=>void}) {
  const [out,setOut] = useState(false);
  useEffect(()=>{
    const t=setTimeout(()=>{ setOut(true); setTimeout(onDone,800); },2000);
    return ()=>clearTimeout(t);
  },[onDone]);
  return (
    <>
      <style>{`
        @keyframes cFall{0%{transform:translateY(-40px) rotate(0deg);opacity:1}85%{opacity:.7}100%{transform:translateY(110vh) rotate(780deg);opacity:0}}
        @keyframes launchIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes launchOut{to{opacity:0;transform:scale(1.06)}}
        @keyframes textGlow{0%,100%{opacity:.85}50%{opacity:1}}
      `}</style>
      <div style={{position:'fixed',inset:0,zIndex:9999,background:'linear-gradient(160deg,#060606 0%,#0e0e1c 55%,#060606 100%)',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',animation:out?'launchOut 0.8s ease forwards':undefined}}>
        {CONFETTI_PIECES.map(p=>(
          <div key={p.id} style={{position:'absolute',left:`${p.x}%`,top:-24,width:p.size,height:p.circle?p.size:Math.round(p.size*.55),borderRadius:p.circle?'50%':3,background:p.color,animation:`cFall ${p.dur}s ${p.delay}s ease-in infinite`}}/>
        ))}
        <div style={{textAlign:'center',position:'relative',zIndex:1,padding:'0 24px',animation:'launchIn 0.6s ease forwards'}}>
          <img src={asset("/logo-draygo-white.png")} alt="DrayGo" style={{height:56,objectFit:'contain',marginBottom:32,filter:'drop-shadow(0 0 20px rgba(252,11,5,0.5))'}} />
          <h2 style={{fontSize:'clamp(28px,5.5vw,58px)',fontWeight:900,color:'#fff',marginBottom:16,letterSpacing:'-0.025em',lineHeight:1.1,animation:'textGlow 1.5s ease-in-out infinite'}}>
            We&apos;re Going Live Soon 🚀
          </h2>
          <p style={{color:'rgba(255,255,255,0.42)',fontSize:'clamp(14px,1.5vw,17px)',maxWidth:480,margin:'0 auto'}}>
            The all-in-one drayage platform for shippers, carriers &amp; brokers
          </p>
        </div>
      </div>
    </>
  );
}

type AppEntry = { id: string; name: string; role: string; tagline: string; desc: string; color: string; colorDark: string; colorAlpha: string; colorBorder: string; video: string; features: {label:string;sub:string}[]; cta: string; href: string; flip: boolean; };
function AppSection({ app }: { app: AppEntry }) {
  const [hovered, setHovered] = useState(false);
  const hasHover = app.id === "shipper";

  const mockupImg: Record<string, { webp: string; png: string; alt: string }> = {
    shipper: { webp: "/shipper-mockup.webp", png: "/shipper-mockup.png", alt: "DrayGo Shipper App" },
    carrier: { webp: "/carrier-mockup.webp", png: "/carrier-mockup.png", alt: "DrayGo Carrier App" },
    broker:  { webp: "/broker-mockup.webp",  png: "/broker-mockup.png",  alt: "DrayGo Broker App" },
  };
  const m = mockupImg[app.id];

  return (
    <div
      id={app.id}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative" as const, minHeight: 780 }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ambient glow */}
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 55% 90% at ${app.flip?"15%":"85%"} 50%, ${app.color}22 0%, transparent 55%)`, pointerEvents:"none", zIndex:0 }} />

      {/* main content — fades out on hover */}
      <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:140, minHeight:780, position:"relative", zIndex:1, alignItems:"center", padding:"0 clamp(24px,3vw,56px)", transition:"opacity 0.4s ease", opacity: hovered ? 0 : 1, pointerEvents: hovered ? "none" : "auto" }}>

        {/* TEXT */}
        <div className={`${app.flip ? "lg:order-2 reveal-right" : "lg:order-1 reveal-left"}`} style={{ display:"flex", flexDirection:"column" as const, justifyContent:"center", padding:"80px 24px 80px 56px", position:"relative", zIndex:2 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, borderRadius:8, padding:"6px 16px", fontSize:12, fontWeight:700, color:"#fff", marginBottom:28, width:"fit-content", background:app.color, letterSpacing:"0.06em", textTransform:"uppercase" as const }}>
            {app.role}
          </div>
          <h2 style={{ fontSize:"clamp(34px,3.8vw,58px)", fontWeight:900, color:"#fff", lineHeight:1.05, marginBottom:20, letterSpacing:"-0.02em" }}>
            {app.tagline}
          </h2>
          <p style={{ fontSize:"clamp(15px,1.2vw,17px)", color:"rgba(255,255,255,0.48)", lineHeight:1.75, marginBottom:40, maxWidth:380 }}>
            {app.desc}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-white/[0.10] hover:bg-white/[0.20] border border-white/15 backdrop-blur-sm transition-colors duration-200" style={{ textDecoration:"none", color:"#fff" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.22 1.3-2.2 3.88.03 3.02 2.65 4.03 2.68 4.04l-.03.1zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              <span style={{ display:"flex", flexDirection:"column" as const, lineHeight:1.2 }}>
                <span style={{ fontSize:10, opacity:0.65 }}>Download on the</span>
                <span style={{ fontSize:14, fontWeight:700 }}>App Store</span>
              </span>
            </a>
            <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-white/[0.10] hover:bg-white/[0.20] border border-white/15 backdrop-blur-sm transition-colors duration-200" style={{ textDecoration:"none", color:"#fff" }}>
              <img src={asset("/google-play.png")} alt="Google Play" style={{ width:22, height:22, objectFit:"contain" }} />
              <span style={{ display:"flex", flexDirection:"column" as const, lineHeight:1.2 }}>
                <span style={{ fontSize:10, opacity:0.65 }}>Get it on</span>
                <span style={{ fontSize:14, fontWeight:700 }}>Google Play</span>
              </span>
            </a>
          </div>
        </div>

        {/* PHONE */}
        <div
          className={`${app.flip ? "lg:order-1 reveal-left reveal-delay-1" : "lg:order-2 reveal-right reveal-delay-1"}`}
          style={{ display:"flex", alignItems:"center", justifyContent: app.flip ? "flex-end" : "flex-start", position:"relative", zIndex:2, padding:"40px 16px", cursor: hasHover ? "pointer" : "default" }}
          onMouseEnter={() => hasHover && setHovered(true)}
        >
          <picture style={{ width:"clamp(360px,38vw,500px)", display:"block", filter:`drop-shadow(0 40px 80px ${app.color}60) drop-shadow(0 0 40px ${app.color}30)` }}>
            <source srcSet={asset(m.webp)} type="image/webp" />
            <img src={asset(m.png)} alt={m.alt} loading="lazy" style={{ width:"100%", display:"block" }} />
          </picture>
        </div>
      </div>

      {/* FULL-SECTION OVERLAY — centered screens on hover */}
      {hasHover && (
        <div
          style={{ position:"absolute", inset:0, zIndex:20, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.90)", opacity: hovered ? 1 : 0, transition:"opacity 0.45s ease", pointerEvents: hovered ? "auto" : "none" }}
          onMouseLeave={() => setHovered(false)}
        >
          <picture style={{ width:"88%", maxWidth:1060, display:"block" }}>
            <source srcSet={asset("/shipper-screens.webp")} type="image/webp" />
            <img src={asset("/shipper-screens.png")} alt="DrayGo Shipper App Screens" style={{ width:"100%", display:"block", borderRadius:20, filter:`drop-shadow(0 24px 64px ${app.color}50)`, transform: hovered ? "scale(1)" : "scale(0.96)", transition:"transform 0.45s ease" }} />
          </picture>
        </div>
      )}
    </div>
  );
}

const APPS = [
  {
    id: "shipper",
    name: "DrayGo Shipper",
    role: "Shipper App",
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
    role: "Carrier App",
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
    role: "Broker App",
    tagline: "Book, manage, deliver — at scale.",
    desc: "Source carriers instantly, manage your full load book and give shippers a live tracking portal — all from one operations dashboard.",
    color: "#F59E0B",
    colorDark: "#d97706",
    colorAlpha: "rgba(245,158,11,0.13)",
    colorBorder: "rgba(245,158,11,0.32)",
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

const HERO_LINES = [
  { text: "Book Every Load.",        color: "#FF4D00" },
  { text: "Ship Every Container.",   color: "#4ADE80" },
  { text: "Haul Every Mile.",        color: "#38BDF8" },
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
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroOut, setHeroOut] = useState(false);
  const [showLaunch, setShowLaunch] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setHeroOut(true);
      setTimeout(() => {
        setHeroIdx(i => (i + 1) % HERO_LINES.length);
        setHeroOut(false);
      }, 380);
    }, 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      {showLaunch && <LaunchOverlay onDone={() => setShowLaunch(false)} />}
      <Nav />
      <RevealInit />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ paddingBottom: 0, background: "#000" }}>
        {/* Video background */}
        <video
          autoPlay muted loop playsInline
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }}
        >
          <source src={asset("/hero-bg.mp4")} type="video/mp4" />
        </video>
        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex:2 }}>
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(252,11,5,0.14) 0%, transparent 60%)" }} />
          <div className="absolute top-0 -right-40 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(58,95,192,0.14) 0%, transparent 60%)" }} />
        </div>

        <div className="relative max-w-[1100px] mx-auto px-6 flex flex-col items-center text-center" style={{ paddingTop: "clamp(110px, 13vh, 150px)", zIndex:3 }}>

          {/* ── HEADLINE ── */}
          <h1 className="display text-white reveal reveal-delay-1" style={{ fontSize: "clamp(40px, 5.8vw, 76px)", lineHeight: 1.02, letterSpacing: "-0.03em", maxWidth: 900 }}>
            Move Every Container,<br />
            <span style={{
              display: "inline-block",
              color: HERO_LINES[heroIdx].color,
              transition: "color 0.3s ease",
              animation: heroOut ? "heroLineOut 0.38s ease forwards" : "heroLineIn 0.42s ease forwards",
            }}>
              {HERO_LINES[heroIdx].text}
            </span>
          </h1>

          {/* ── SUB ── */}
          <p className="mt-5 text-white/50 reveal reveal-delay-1" style={{ fontSize: "clamp(15px, 1.4vw, 17px)", maxWidth: 460 }}>
            The all-in-one drayage platform for shippers, carriers and brokers.
          </p>

          {/* ── HERO IMAGE ── */}
          <div className="w-full flex justify-center reveal" style={{ marginTop: 28 }}>
            <picture style={{ width: "100%", maxWidth: 1000, display: "block" }}>
              <source srcSet={asset("/hero-mockup.webp")} type="image/webp" />
              <img
                src={asset("/hero-mockup.png")}
                alt="DrayGo Apps — Shipper, Broker, Carrier"
                loading="eager"
                fetchPriority="high"
                style={{ width: "100%", display: "block", opacity: 1 }}
              />
            </picture>
          </div>

        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      {(()=>{
        const STATS_DATA = [
          { end:2.4,  prefix:"$", suffix:"B+", label:"Drayage Moved",    decimals:1 },
          { end:12431, prefix:"",  suffix:"",   label:"Active Routes",    decimals:0, comma:true },
          { end:8000, prefix:"",  suffix:"+",  label:"Verified Carriers", decimals:0, comma:true },
          { end:4.8,  prefix:"",  suffix:"",   label:"App Store Rating",  decimals:1, star:true },
        ];
        const STAT_ICONS = [null, null, null, null];
        const [counts, setCounts] = useState(STATS_DATA.map(()=>0));
        const [started, setStarted] = useState(false);
        const ref = useRef<HTMLDivElement>(null);
        useEffect(()=>{
          const el = ref.current; if(!el) return;
          const obs = new IntersectionObserver(([e])=>{
            if(e.isIntersecting && !started){
              setStarted(true);
              STATS_DATA.forEach((s,i)=>{
                const dur=1800, steps=60, inc=s.end/steps;
                let cur=0, step=0;
                const t=setInterval(()=>{
                  step++; cur=Math.min(s.end, inc*step);
                  setCounts(prev=>{ const n=[...prev]; n[i]=cur; return n; });
                  if(cur>=s.end) clearInterval(t);
                }, dur/steps);
              });
            }
          },{threshold:0.3});
          obs.observe(el);
          return ()=>obs.disconnect();
        },[started]);
        const fmt=(val:number,s:typeof STATS_DATA[0])=>{
          const raw=s.decimals>0?val.toFixed(s.decimals):Math.floor(val).toString();
          const num=s.comma?parseInt(raw).toLocaleString():raw;
          return `${s.prefix}${num}${s.suffix}`;
        };
        return (
          <section ref={ref} style={{ position:"relative", padding:"32px 24px", background:"#000" }}>
            <div style={{
              maxWidth:1100, margin:"0 auto",
              background:"rgba(255,255,255,0.05)",
              backdropFilter:"blur(16px)",
              WebkitBackdropFilter:"blur(16px)",
              border:"1px solid rgba(255,255,255,0.1)",
              borderRadius:20,
              padding:"40px 48px",
              display:"grid",
              gridTemplateColumns:"repeat(4,1fr)",
              gap:24,
              textAlign:"center" as const,
            }}>
              {STATS_DATA.map((s,i)=>(
                <div key={s.label} style={{ padding:"8px 0" }}>
                  <div style={{ fontSize:"clamp(28px,3.5vw,48px)", fontWeight:900, color:"#fff", lineHeight:1, letterSpacing:"-0.02em", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                    {s.star && <span style={{ color:"#f59e0b" }}>★</span>}
                    {STAT_ICONS[i]}
                    {fmt(counts[i],s)}
                  </div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", marginTop:8, fontWeight:500, letterSpacing:"0.04em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>
        );
      })()}

      {/* ─── APP FEATURE ROWS (Opal style) ─── */}
      <style>{`
        @keyframes barGrow { from{transform:scaleY(0);transform-origin:bottom} to{transform:scaleY(1);transform-origin:bottom} }
        @keyframes shimmer { 0%{opacity:0.4} 50%{opacity:1} 100%{opacity:0.4} }
        @keyframes statusPing { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2.2);opacity:0} }
        @keyframes slideIn { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes imgFade { from{opacity:0} to{opacity:1} }
        picture img { animation: imgFade 0.5s ease forwards; }
        @keyframes heroLineOut { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-28px)} }
        @keyframes heroLineIn  { 0%{opacity:0;transform:translateY(28px)} 100%{opacity:1;transform:translateY(0)} }
      `}</style>
      <section style={{ background:"#000", overflow:"hidden" }}>
        {APPS.map((app) => <AppSection key={app.id} app={app} />)}
      </section>

      {/* ─── PLATFORM FEATURES BENTO ─── */}
      <section id="how-it-works" style={{ background:"linear-gradient(180deg,#050508 0%,#0a0b10 100%)", padding:"88px 0", position:"relative" as const }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 80% 50% at 20% 40%, rgba(252,11,5,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(24,163,84,0.05) 0%, transparent 60%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
          {/* Header */}
          <div className="reveal" style={{ marginBottom:56, textAlign:"center" as const }}>
            <div style={{ display:"inline-flex", alignItems:"center", background:"#fc0b05", borderRadius:8, padding:"6px 16px", fontSize:12, fontWeight:700, color:"#fff", letterSpacing:"0.06em", marginBottom:20 }}>
              App Features
            </div>
            <h2 style={{ fontSize:"clamp(32px,4.5vw,54px)", fontWeight:900, color:"#fff", lineHeight:1.1, margin:0 }}>
              Our Platform Features
            </h2>
            <p style={{ marginTop:14, fontSize:16, color:"rgba(255,255,255,0.45)", lineHeight:1.7, maxWidth:520, margin:"14px auto 0" }}>
              Everything you need to move containers — from quote to payment — in one connected platform.
            </p>
          </div>

          {/* 2×2 bento grid — horizontal layout: text left, visual right */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>

            {/* Card 1 — Quote any lane */}
            <div className="reveal reveal-delay-1" style={{ borderRadius:28, background:"rgba(255,255,255,0.07)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", border:"1px solid rgba(255,255,255,0.14)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.08)", overflow:"hidden", minHeight:320, display:"flex", alignItems:"stretch" }}>
              <div style={{ flex:"0 0 42%", padding:"36px 24px 36px 36px", display:"flex", flexDirection:"column" as const, justifyContent:"center" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase" as const, color:"#fc0b05", marginBottom:10 }}>Shipper</p>
                <h3 style={{ fontSize:"clamp(17px,1.5vw,22px)", fontWeight:900, color:"#fff", lineHeight:1.2, margin:"0 0 10px" }}>Quote any lane<br/>in 30 seconds</h3>
                <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.4)", lineHeight:1.6, margin:0 }}>Locked rates from any port in seconds.</p>
              </div>
              <div style={{ flex:"1 1 auto", display:"flex", alignItems:"flex-end", justifyContent:"center", overflow:"hidden" }}>
                <picture style={{ display:"block" }}>
                  <source srcSet={asset("/bento-phone-card.webp")} type="image/webp" />
                  <img src={asset("/bento-phone-card.png")} alt="DrayGo App" style={{ height:300, width:"auto", maxWidth:"100%", display:"block", filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }} />
                </picture>
              </div>
            </div>

            {/* Card 2 — Driver App */}
            <div className="reveal reveal-delay-2" style={{ borderRadius:28, background:"rgba(252,11,5,0.08)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", border:"1px solid rgba(252,11,5,0.25)", boxShadow:"inset 0 1px 0 rgba(252,11,5,0.10)", overflow:"hidden", minHeight:320, display:"flex", alignItems:"stretch" }}>
              <div style={{ flex:"0 0 42%", padding:"36px 24px 36px 36px", display:"flex", flexDirection:"column" as const, justifyContent:"center" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase" as const, color:"#fc0b05", marginBottom:10 }}>Driver</p>
                <h3 style={{ fontSize:"clamp(17px,1.5vw,22px)", fontWeight:900, color:"#fff", lineHeight:1.2, margin:"0 0 10px" }}>Never miss a<br/>load or payment</h3>
                <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.4)", lineHeight:1.6, margin:0 }}>Instant alerts for new trips and payments on your lock screen.</p>
              </div>
              <div style={{ flex:"1 1 auto", display:"flex", alignItems:"flex-end", justifyContent:"center", overflow:"hidden" }}>
                <picture style={{ display:"block" }}>
                  <source srcSet={asset("/bento-carrier-notif.webp")} type="image/webp" />
                  <img src={asset("/bento-carrier-notif.png")} alt="DrayGo Driver Notifications" style={{ height:300, width:"auto", maxWidth:"100%", display:"block", filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.6))" }} />
                </picture>
              </div>
            </div>

            {/* Card 3 — Track every container live */}
            <div className="reveal reveal-delay-1" style={{ borderRadius:28, background:"rgba(245,158,11,0.08)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", border:"1px solid rgba(245,158,11,0.22)", boxShadow:"inset 0 1px 0 rgba(245,158,11,0.10)", overflow:"hidden", minHeight:320, display:"flex", alignItems:"stretch" }}>
              <div style={{ flex:"0 0 42%", padding:"36px 24px 36px 36px", display:"flex", flexDirection:"column" as const, justifyContent:"center" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase" as const, color:"#F59E0B", marginBottom:10 }}>Broker</p>
                <h3 style={{ fontSize:"clamp(17px,1.5vw,22px)", fontWeight:900, color:"#fff", lineHeight:1.2, margin:"0 0 10px" }}>Track every<br/>container live</h3>
                <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.4)", lineHeight:1.6, margin:0 }}>Gate-in to gate-out visibility, 24/7.</p>
              </div>
              <div style={{ flex:"1 1 auto", display:"flex", alignItems:"flex-end", justifyContent:"center", overflow:"hidden" }}>
                <picture style={{ display:"block" }}>
                  <source srcSet={asset("/bento-broker-phone.webp")} type="image/webp" />
                  <img src={asset("/bento-broker-phone.png")} alt="DrayGo Broker App" style={{ height:300, width:"auto", maxWidth:"100%", display:"block", filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.6))" }} />
                </picture>
              </div>
            </div>

            {/* Card 4 — Carriers paid in 24 hours */}
            <div className="reveal reveal-delay-2" style={{ borderRadius:28, background:"rgba(255,255,255,0.07)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", border:"1px solid rgba(255,255,255,0.14)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.08)", overflow:"hidden", minHeight:320, display:"flex", alignItems:"stretch" }}>
              <div style={{ flex:"0 0 42%", padding:"36px 24px 36px 36px", display:"flex", flexDirection:"column" as const, justifyContent:"center" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase" as const, color:"rgba(255,255,255,0.4)", marginBottom:10 }}>DrayPay</p>
                <h3 style={{ fontSize:"clamp(17px,1.5vw,22px)", fontWeight:900, color:"#fff", lineHeight:1.2, margin:"0 0 10px" }}>Carriers paid<br/>in 24 hours</h3>
                <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.4)", lineHeight:1.6, margin:0 }}>Upload POD, get paid the same day.</p>
              </div>
              <div style={{ flex:"1 1 auto", display:"flex", alignItems:"flex-end", justifyContent:"center", overflow:"hidden" }}>
                <picture style={{ display:"block" }}>
                  <source srcSet={asset("/bento-gauge.webp")} type="image/webp" />
                  <img src={asset("/bento-gauge.png")} alt="Payment settlement gauge" style={{ height:300, width:"auto", maxWidth:"100%", display:"block", filter:"drop-shadow(0 16px 40px rgba(0,0,0,0.5))" }} />
                </picture>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FINAL CTA (Fincash style) ─── */}
      <section style={{ background:"#0f172a", padding:"0 0 80px" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="reveal reveal-scale lg:grid-cols-2" style={{ background:"#1e293b", border:"1px solid rgba(255,255,255,0.12)", borderRadius:24, overflow:"hidden", display:"grid" }}>
            {/* Left: text */}
            <div className="reveal-left reveal-delay-1" style={{ padding:"56px 60px", display:"flex", flexDirection:"column" as const, justifyContent:"center" }}>
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
            {/* Right: hero video bg + 3-app phones on top */}
            <div className="reveal-right reveal-delay-2" style={{ position:"relative", overflow:"hidden", minHeight:320, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px 16px" }}>
              {/* video background */}
              <video autoPlay muted loop playsInline style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }}>
                <source src={asset("/hero-bg.mp4")} type="video/mp4" />
              </video>
              {/* dark overlay so phones stay readable */}
              <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.55)", zIndex:1 }} />
              {/* phones */}
              <picture style={{ display:"block", width:"100%", position:"relative", zIndex:2 }}>
                <source srcSet={asset("/cta-phones.webp")} type="image/webp" />
                <img src={asset("/cta-phones.png")} alt="DrayGo Apps" style={{ width:"100%", display:"block", filter:"drop-shadow(0 24px 48px rgba(0,0,0,0.7))" }} />
              </picture>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
