"use client";
import { useState, useEffect, useRef } from "react";
import { asset } from "@/lib/site";

/* ─── Shared helpers ──────────────────────────────────────────── */
function Tag({ children, color = "#fc0b05" }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", background:color, borderRadius:8, padding:"6px 16px", fontSize:12, fontWeight:700, color:"#fff", letterSpacing:"0.06em", textTransform:"uppercase" as const, marginBottom:20 }}>
      {children}
    </div>
  );
}
function SectionHead({ tag, title, sub, tagColor }: { tag: string; title: React.ReactNode; sub?: string; tagColor?: string }) {
  return (
    <div className="reveal" style={{ textAlign:"center" as const, marginBottom:56 }}>
      <Tag color={tagColor}>{tag}</Tag>
      <h2 style={{ fontSize:"clamp(32px,4.5vw,54px)", fontWeight:900, color:"#fff", lineHeight:1.1, margin:0 }}>{title}</h2>
      {sub && <p style={{ marginTop:14, fontSize:16, color:"rgba(255,255,255,0.45)", lineHeight:1.7, maxWidth:540, margin:"14px auto 0" }}>{sub}</p>}
    </div>
  );
}
function GlassCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background:"rgba(255,255,255,0.05)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.10)", borderRadius:20, boxShadow:"inset 0 1px 0 rgba(255,255,255,0.07)", ...style }}>
      {children}
    </div>
  );
}

/* ─── Animated counter hook ─────────────────────────────────────── */
function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);
  return { count, ref };
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 1 — TRUSTED BY
══════════════════════════════════════════════════════════════════ */
const PORTS = [
  { name:"Port of Los Angeles", code:"LA", rank:"#1 in US" },
  { name:"Port of Long Beach",  code:"LB", rank:"#2 in US" },
  { name:"Port of New York",    code:"NY", rank:"#3 in US" },
  { name:"Port of Savannah",    code:"SAV", rank:"#4 in US" },
  { name:"Port of Oakland",     code:"OAK", rank:"#5 in US" },
  { name:"Port of Houston",     code:"HOU", rank:"#6 in US" },
  { name:"Port of Norfolk",     code:"NFK", rank:"Top 10"  },
];

export function TrustedBySection() {
  return (
    <section style={{ background:"#06101e", padding:"88px 0 96px", overflow:"hidden", position:"relative" as const }}>
      {/* Subtle red glow at top */}
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"60%", height:1, background:"linear-gradient(90deg,transparent,rgba(252,11,5,0.35),transparent)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"40%", height:160, background:"radial-gradient(ellipse at top,rgba(252,11,5,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 clamp(16px,3vw,40px)" }}>
        <SectionHead tag="Trusted By" title="Active Across Every Major Port" sub="Connecting freight across the busiest container terminals in North America — from gate-in to final delivery." />

        {/* Single-row scrollable on mobile, 7-col on desktop */}
        <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch" as any, paddingBottom:4 }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:10, minWidth:840 }}>
            {PORTS.map((p, i) => (
              <div key={p.code} className={`reveal reveal-delay-${(i % 4) + 1}`}
                style={{ background:"rgba(255,255,255,0.035)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:18, padding:"28px 14px 22px", textAlign:"center" as const, cursor:"default", transition:"all 0.28s ease", position:"relative" as const, overflow:"hidden" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "rgba(252,11,5,0.07)";
                  el.style.borderColor = "rgba(252,11,5,0.35)";
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = "0 16px 40px rgba(252,11,5,0.12), 0 0 0 1px rgba(252,11,5,0.18)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "rgba(255,255,255,0.035)";
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Rank badge top-right */}
                <div style={{ position:"absolute", top:10, right:10, fontSize:9, fontWeight:800, color:"rgba(252,11,5,0.75)", letterSpacing:"0.06em", background:"rgba(252,11,5,0.1)", border:"1px solid rgba(252,11,5,0.2)", borderRadius:6, padding:"2px 6px" }}>{p.rank}</div>

                {/* Ship/anchor icon */}
                <div style={{ width:44, height:44, borderRadius:12, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M6 12H2a10 10 0 0 0 20 0h-4"/>
                  </svg>
                </div>

                {/* Code */}
                <div style={{ fontSize:26, fontWeight:900, color:"#fff", letterSpacing:"-0.03em", lineHeight:1 }}>{p.code}</div>
                {/* Full name */}
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.38)", marginTop:6, lineHeight:1.4 }}>{p.name.replace("Port of ","")}</div>

                {/* Bottom accent line */}
                <div style={{ position:"absolute", bottom:0, left:"20%", right:"20%", height:2, background:"linear-gradient(90deg,transparent,rgba(252,11,5,0.4),transparent)", borderRadius:2 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats strip */}
        <div className="reveal" style={{ display:"flex", justifyContent:"center", gap:"clamp(24px,4vw,64px)", marginTop:44, flexWrap:"wrap" as const }}>
          {[["40+","Ports Covered"],["8,000+","Vetted Carriers"],["50 States","Full Coverage"],["24/7","Live Tracking"]].map(([v,l]) => (
            <div key={l} style={{ textAlign:"center" as const }}>
              <div style={{ fontSize:20, fontWeight:900, color:"#fff", letterSpacing:"-0.02em" }}>{v}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:3, letterSpacing:"0.04em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 2 — HOW DRAYGO WORKS (Timeline)
══════════════════════════════════════════════════════════════════ */
const STEPS = [
  { n:1, title:"Create Shipment",       desc:"Enter origin port, destination, container type and pickup window in seconds.", icon:<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>, icon2:<polyline points="14 2 14 8 20 8"/> },
  { n:2, title:"Broker Receives Quote", desc:"Your request hits 8,000+ vetted carriers. Instant bids land in under 60 seconds.", icon:<circle cx="12" cy="12" r="10"/>, icon2:<polyline points="12 6 12 12 16 14"/> },
  { n:3, title:"Carrier Accepts Job",   desc:"The best-match carrier locks in your load. Rate, truck, and ETA confirmed instantly.", icon:<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>, icon2:<circle cx="9" cy="7" r="4"/> },
  { n:4, title:"Container Picked Up",   desc:"Driver arrives at gate, scans container, and departure is logged automatically.", icon:<rect x="1" y="3" width="15" height="13"/>, icon2:<polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/> },
  { n:5, title:"Live GPS Tracking",     desc:"Watch your container move in real time. Full gate-in to gate-out visibility.", icon:<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>, icon2:<circle cx="12" cy="10" r="3"/> },
  { n:6, title:"Proof of Delivery",     desc:"Driver uploads photo POD at destination. Instant digital receipt — no paperwork.", icon:<path d="M23 6l-9.5 9.5-5-5L1 18"/>, icon2:null },
  { n:7, title:"Instant Payment",       desc:"DrayPay settles with the carrier within 24 hours. No net-30. No wire delays.", icon:<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>, icon2:<line x1="1" y1="10" x2="23" y2="10"/> },
];

export function HowItWorksSection() {
  return (
    <section style={{ background:"linear-gradient(180deg,#070f1f 0%,#0a1428 100%)", padding:"88px 0", position:"relative" as const }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 60% 60% at 50% 0%, rgba(252,11,5,0.05) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
        <SectionHead tag="How It Works" title={<>Move freight in<br/>7 simple steps</>} sub="From first click to final payment — the full drayage lifecycle, automated." />

        <div style={{ position:"relative" as const }}>
          {/* Vertical line */}
          <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:2, background:"linear-gradient(180deg,rgba(252,11,5,0.5) 0%,rgba(252,11,5,0.1) 100%)", transform:"translateX(-50%)", pointerEvents:"none" }} />

          {STEPS.map((step, i) => {
            const left = i % 2 === 0;
            return (
              <div key={step.n} className={`reveal ${left ? "reveal-left" : "reveal-right"} reveal-delay-${(i % 3) + 1}`}
                style={{ display:"flex", justifyContent: left ? "flex-end" : "flex-start", marginBottom: i < STEPS.length - 1 ? 32 : 0, paddingRight: left ? "calc(50% + 32px)" : 0, paddingLeft: left ? 0 : "calc(50% + 32px)", position:"relative" as const }}>
                {/* Center dot */}
                <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", width:14, height:14, borderRadius:"50%", background:"#fc0b05", border:"3px solid #050508", boxShadow:"0 0 0 4px rgba(252,11,5,0.2)", zIndex:2 }} />
                <GlassCard style={{ padding:"22px 24px", maxWidth:340, width:"100%", position:"relative" as const }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:"rgba(252,11,5,0.12)", border:"1px solid rgba(252,11,5,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {step.icon}{step.icon2}
                      </svg>
                    </div>
                    <div>
                      <span style={{ fontSize:10, fontWeight:700, color:"rgba(252,11,5,0.8)", letterSpacing:"0.1em", display:"block" }}>STEP {step.n}</span>
                      <h3 style={{ fontSize:15, fontWeight:800, color:"#fff", margin:0, lineHeight:1.2 }}>{step.title}</h3>
                    </div>
                  </div>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.65, margin:0 }}>{step.desc}</p>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 3 — DASHBOARD MOCKUP
══════════════════════════════════════════════════════════════════ */
const FLOAT_CARDS = [
  { label:"Today's Revenue",   value:"$47,820",   sub:"+12.4% vs yesterday", color:"#22c55e", x:"left:-120px", y:"top:80px" },
  { label:"Active Loads",      value:"138",        sub:"24 in transit now",   color:"#38bdf8", x:"right:-120px", y:"top:80px" },
  { label:"Carriers Online",   value:"2,841",      sub:"Ready to accept loads",color:"#a78bfa", x:"left:-120px", y:"bottom:80px" },
  { label:"Avg Settlement",    value:"18.4 hrs",   sub:"Last 7 days",         color:"#fc0b05", x:"right:-120px", y:"bottom:80px" },
];

export function DashboardSection() {
  return (
    <section style={{ background:"#06101e", padding:"88px 0", overflow:"visible" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
        <SectionHead tag="One Dashboard" title={<>Everything in<br/>one place</>} sub="Real-time visibility across every load, carrier, payment, and document — from a single operations dashboard." />

        <div className="reveal reveal-scale" style={{ position:"relative" as const, maxWidth:820, margin:"0 auto" }}>
          {/* Floating cards — hidden on small screens via style */}
          {FLOAT_CARDS.map((c, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
              position:"absolute" as const,
              ...(c.x.startsWith("left") ? { left: c.x.replace("left:","") } : { right: c.x.replace("right:","") }),
              ...(c.y.startsWith("top")  ? { top:  c.y.replace("top:","")  } : { bottom: c.y.replace("bottom:","") }),
              zIndex:10, display:"none",
            }}>
              <GlassCard style={{ padding:"14px 18px", minWidth:160, display:"block" }}>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase" as const, marginBottom:4 }}>{c.label}</div>
                <div style={{ fontSize:22, fontWeight:900, color:c.color, letterSpacing:"-0.02em" }}>{c.value}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", marginTop:2 }}>{c.sub}</div>
              </GlassCard>
            </div>
          ))}

          {/* CSS Laptop Mockup */}
          <div style={{ background:"#1a1a2e", border:"2px solid rgba(255,255,255,0.1)", borderRadius:16, overflow:"hidden", boxShadow:"0 48px 96px rgba(0,0,0,0.8), 0 0 80px rgba(252,11,5,0.08)" }}>
            {/* Titlebar */}
            <div style={{ height:32, background:"rgba(255,255,255,0.04)", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", padding:"0 14px", gap:7 }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f57" }}/>
              <div style={{ width:10, height:10, borderRadius:"50%", background:"#ffbd2e" }}/>
              <div style={{ width:10, height:10, borderRadius:"50%", background:"#28ca41" }}/>
              <div style={{ flex:1, height:20, background:"rgba(255,255,255,0.04)", borderRadius:5, margin:"0 60px" }} />
            </div>
            {/* Screen body */}
            <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", minHeight:460 }}>
              {/* Sidebar */}
              <div style={{ borderRight:"1px solid rgba(255,255,255,0.06)", padding:"20px 12px", display:"flex", flexDirection:"column" as const, gap:4 }}>
                <div style={{ padding:"8px 12px", borderRadius:8, background:"rgba(252,11,5,0.15)", color:"#fc0b05", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:8 }}>
                  <span>⬡</span> Dashboard
                </div>
                {["Shipments","Load Board","Carriers","Payments","Reports","Documents","Settings"].map(item => (
                  <div key={item} style={{ padding:"8px 12px", borderRadius:8, color:"rgba(255,255,255,0.4)", fontSize:12, display:"flex", alignItems:"center", gap:8 }}>
                    <span>·</span> {item}
                  </div>
                ))}
              </div>
              {/* Main area */}
              <div style={{ padding:24 }}>
                {/* Stat row */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
                  {[["$47,820","Revenue","↑12.4%","#22c55e"],["138","Active Loads","↑8","#38bdf8"],["2,841","Carriers","Online","#a78bfa"],["98%","On-Time","Delivery","#fc0b05"]].map(([v,l,s,c])=>(
                    <div key={l} style={{ background:"rgba(255,255,255,0.04)", borderRadius:10, padding:"12px 14px", border:"1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontSize:18, fontWeight:900, color:c as string }}>{v}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", marginTop:2 }}>{l}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", marginTop:1 }}>{s}</div>
                    </div>
                  ))}
                </div>
                {/* Table rows */}
                <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:10, border:"1px solid rgba(255,255,255,0.06)", overflow:"hidden" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr", padding:"10px 16px", borderBottom:"1px solid rgba(255,255,255,0.05)", fontSize:10, color:"rgba(255,255,255,0.3)", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" as const }}>
                    <span>Shipment</span><span>Route</span><span>Carrier</span><span>ETA</span><span>Status</span>
                  </div>
                  {[
                    ["SH-2024-0128","LA → Dallas","FastHaul","Jun 14","In Transit","#38bdf8"],
                    ["SH-2024-0127","LB → Phoenix","RedTruck","Jun 14","Picked Up","#22c55e"],
                    ["SH-2024-0126","SAV → Atlanta","Prime Dry","Jun 13","Delivered","#a78bfa"],
                    ["SH-2024-0125","NY → Newark","BlueLine","Jun 13","Pending","#f59e0b"],
                    ["SH-2024-0124","HOU → Austin","Eagle Frt","Jun 12","Delivered","#a78bfa"],
                  ].map(([id,r,c,e,s,col])=>(
                    <div key={id} style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr", padding:"9px 16px", borderBottom:"1px solid rgba(255,255,255,0.04)", fontSize:11, color:"rgba(255,255,255,0.6)", alignItems:"center" }}>
                      <span style={{ color:"rgba(255,255,255,0.85)", fontWeight:600 }}>{id}</span>
                      <span>{r}</span><span>{c}</span><span>{e}</span>
                      <span style={{ color:col as string, fontWeight:700, fontSize:10, background:`${col}18`, padding:"3px 8px", borderRadius:6, width:"fit-content" }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Laptop base */}
          <div style={{ height:14, background:"#111", borderRadius:"0 0 8px 8px", margin:"0 24px", boxShadow:"0 4px 24px rgba(0,0,0,0.5)" }} />
          <div style={{ height:6, background:"#0a0a0a", borderRadius:4, margin:"0 8px" }} />
        </div>

        {/* Bottom stat row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, maxWidth:820, margin:"40px auto 0", textAlign:"center" as const }}>
          {[["Real-Time","Updates"],["Zero","Downtime"],["API","Integrations"],["White-Label","Portal"]].map(([a,b],i)=>(
            <div key={a} className={`reveal reveal-delay-${i+1}`} style={{ padding:"18px 12px", background:"rgba(255,255,255,0.04)", borderRadius:12, border:"1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize:14, fontWeight:800, color:"#fff" }}>{a}</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.35)" }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 4 — POWERFUL PLATFORM FEATURES (12-card bento)
══════════════════════════════════════════════════════════════════ */
const FEATURES = [
  { icon:<><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>, title:"AI Load Matching",       desc:"Smart algorithm matches your load to the right carrier, truck type, and lane in seconds.",        color:"#38bdf8" },
  { icon:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,                                                                                           title:"Live Container Tracking", desc:"Real-time GPS from gate-in to final destination. No more phone-tag with drivers.",              color:"#22c55e" },
  { icon:<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,                                                                                      title:"Smart Notifications",     desc:"Push alerts for dispatch, gate arrival, delays, POD uploads, and settlement events.",           color:"#f59e0b" },
  { icon:<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,                                                                               title:"Instant Quotes",          desc:"Live diesel surcharge, FSC, port fees, and chassis split bundled into one transparent rate.",   color:"#a78bfa" },
  { icon:<><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,                                                                                      title:"24-Hour Carrier Payment",  desc:"DrayPay settles the carrier the same day POD is uploaded. No factoring companies needed.",      color:"#fc0b05" },
  { icon:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>, title:"Digital Documents",     desc:"BOL, delivery orders, customs docs and POD generated and stored automatically.",                color:"#22c55e" },
  { icon:<><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,                                                   title:"Photo POD Upload",        desc:"Drivers upload delivery proof photos directly from their phone. Auto-attached to the load.",    color:"#38bdf8" },
  { icon:<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,                                                               title:"Fleet Analytics",         desc:"Miles, on-time rate, revenue per mile, and utilization tracked per carrier and driver.",        color:"#a78bfa" },
  { icon:<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,                  title:"Driver Availability",     desc:"Live driver status board. See who's empty, en-route, or off-duty across your fleet.",          color:"#f59e0b" },
  { icon:<><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></>,                                                                                           title:"Custom Rate Engine",      desc:"Build lane-specific rate cards with fuel escalators, seasonal adjustments, and volume tiers.",  color:"#fc0b05" },
  { icon:<><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,                                            title:"Broker Dashboard",        desc:"Manage your full load book, post to carriers, and track every shipment from one screen.",       color:"#22c55e" },
  { icon:<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,   title:"Multi-Port Support",      desc:"Operates across 40+ US & Canada ports with port-specific rules, chassis pools, and fees.",     color:"#38bdf8" },
];

export function FeatureGridSection() {
  return (
    <section style={{ background:"linear-gradient(180deg,#070f1f 0%,#0a1428 100%)", padding:"88px 0" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
        <SectionHead tag="Platform" title="Everything your operation needs" sub="12 enterprise-grade tools built for drayage, bundled into one connected platform." />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:12 }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`reveal reveal-delay-${(i % 4) + 1}`}
              style={{ background:"rgba(255,255,255,0.04)", border:`1px solid rgba(255,255,255,0.08)`, borderRadius:18, padding:"22px", cursor:"default", transition:"background 0.3s, border-color 0.3s, transform 0.3s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background=`rgba(255,255,255,0.07)`; (e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.borderColor=`${f.color}40`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,0.04)"; (e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; (e.currentTarget as HTMLDivElement).style.borderColor="rgba(255,255,255,0.08)"; }}
            >
              <div style={{ width:40, height:40, borderRadius:11, background:`${f.color}15`, border:`1px solid ${f.color}30`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
              </div>
              <h3 style={{ fontSize:15, fontWeight:800, color:"#fff", margin:"0 0 8px", lineHeight:1.2 }}>{f.title}</h3>
              <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.4)", lineHeight:1.6, margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 5 — USA COVERAGE MAP
══════════════════════════════════════════════════════════════════ */
// usa.svg viewBox="477 421 593.378 318.287"
// geoViewBox lonMin=-127.553 latMax=50.668 lonMax=-64.549 latMin=24.336
// Convert lon/lat → exact SVG coordinate space so overlay aligns perfectly
const SVG_VB = { x:477, y:421, w:593.3779761904764, h:318.2870370370371 };
const LON_MIN=-127.55272679845754, LON_MAX=-64.54920772895363;
const LAT_MIN=24.335873369454947,  LAT_MAX=50.66828705652597;
function toSVG(lon: number, lat: number) {
  return {
    x: SVG_VB.x + (lon - LON_MIN) / (LON_MAX - LON_MIN) * SVG_VB.w,
    y: SVG_VB.y + (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * SVG_VB.h,
  };
}

const SVG_PORTS = [
  { name:"Los Angeles",  lon:-118.27, lat:33.74, active:true  },
  { name:"Long Beach",   lon:-118.22, lat:33.77, active:true  },
  { name:"Oakland",      lon:-122.28, lat:37.80, active:true  },
  { name:"Seattle",      lon:-122.33, lat:47.60, active:true  },
  { name:"Houston",      lon:-95.01,  lat:29.73, active:true  },
  { name:"New Orleans",  lon:-90.07,  lat:29.95, active:false },
  { name:"Miami",        lon:-80.15,  lat:25.77, active:true  },
  { name:"Savannah",     lon:-81.10,  lat:32.08, active:true  },
  { name:"New York",     lon:-74.01,  lat:40.71, active:true  },
  { name:"Norfolk",      lon:-76.30,  lat:36.85, active:true  },
  { name:"Baltimore",    lon:-76.62,  lat:39.29, active:false },
  { name:"Charleston",   lon:-79.94,  lat:32.78, active:false },
].map(p => ({ ...p, ...toSVG(p.lon, p.lat) }));

const SVG_ROUTES = [
  [0,2],[2,3],[0,4],[4,5],[5,6],[6,7],[7,11],[11,9],[9,10],[10,8],[3,8],[4,7]
];

const MAP_STATS = [
  { n:"50",   label:"States Covered" },
  { n:"320+", label:"Active Cities"  },
  { n:"18",   label:"Major Ports"    },
  { n:"12K+", label:"Active Routes"  },
];

export function CoverageMapSection() {
  return (
    <section style={{ background:"#060b18", padding:"88px 0" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
        <SectionHead tag="Coverage" title="Nationwide Reach" sub="From coast to coast — DrayGo connects freight across every major US port and distribution hub." />

        <div className="reveal reveal-scale" style={{ position:"relative" as const, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:24, overflow:"hidden", padding:"24px 24px 16px" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 80% 60% at 50% 50%, rgba(252,11,5,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />

          {/* SVG map as base + overlay in same viewBox 0 0 100 100 */}
          <div style={{ position:"relative" as const }}>
            {/* Real USA SVG */}
            <img src={asset("/usa.svg")} alt="USA map" style={{ width:"100%", display:"block", filter:"brightness(0) invert(1) opacity(0.12)" }} />

            {/* Overlay — same viewBox as usa.svg so coordinates align perfectly */}
            <svg
              viewBox={`${SVG_VB.x} ${SVG_VB.y} ${SVG_VB.w} ${SVG_VB.h}`}
              style={{ position:"absolute" as const, inset:0, width:"100%", height:"100%" }}
            >
              {/* Routes */}
              {SVG_ROUTES.map(([a,b], i) => {
                const pa = SVG_PORTS[a], pb = SVG_PORTS[b];
                return (
                  <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                    stroke="rgba(252,11,5,0.55)" strokeWidth="2.2" strokeDasharray="8,6" />
                );
              })}
              {/* Port dots */}
              {SVG_PORTS.map((p, i) => (
                <g key={p.name}>
                  {/* pulse ring */}
                  <circle cx={p.x} cy={p.y} r={p.active ? 7 : 4} fill={p.active ? "rgba(252,11,5,0.2)" : "rgba(255,255,255,0.08)"}>
                    <animate attributeName="r" values={`${p.active?7:4};${p.active?18:10};${p.active?7:4}`} dur={`${2.3+i*0.22}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.55;0;0.55" dur={`${2.3+i*0.22}s`} repeatCount="indefinite" />
                  </circle>
                  {/* solid dot */}
                  <circle cx={p.x} cy={p.y} r={p.active ? 5 : 3} fill={p.active ? "#fc0b05" : "rgba(255,255,255,0.5)"} />
                  {/* label */}
                  {p.active && (
                    <text x={p.x+9} y={p.y+4} fontSize="11" fill="rgba(255,255,255,0.80)" fontWeight="700" fontFamily="system-ui,sans-serif">
                      {p.name}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>

          <div style={{ display:"flex", gap:24, justifyContent:"center", marginTop:12, flexWrap:"wrap" as const }}>
            {[["#fc0b05","Active Port"],["rgba(255,255,255,0.55)","Partner Port"],["rgba(252,11,5,0.6)","Active Route"]].map(([c,l])=>(
              <div key={l} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12, color:"rgba(255,255,255,0.45)" }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:c }}/>{l}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginTop:28 }}>
          {MAP_STATS.map((s, i) => (
            <div key={s.label} className={`reveal reveal-delay-${i+1}`} style={{ textAlign:"center" as const, padding:"24px 16px", background:"rgba(255,255,255,0.04)", borderRadius:14, border:"1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize:"clamp(28px,3vw,40px)", fontWeight:900, color:"#fc0b05", lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.45)", marginTop:6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 6 — TESTIMONIALS
══════════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { name:"Marcus Reyes",    role:"VP of Logistics",    company:"Apex Distribution",     avatar:"MR", color:"#fc0b05", type:"Shipper",  stars:5, text:"DrayGo eliminated phone tag completely. We get instant quotes, live tracking, and digital PODs — all in one dashboard. Our port dwell time dropped 40% in the first quarter." },
  { name:"Diane Cho",       role:"Owner-Operator",     company:"Cho Trucking",          avatar:"DC", color:"#22c55e", type:"Carrier",  stars:5, text:"DrayPay changed everything. I get paid within 24 hours of dropping the container. No more waiting 45 days for a check. I've added two trucks since joining DrayGo." },
  { name:"Jordan Ellis",    role:"Operations Manager", company:"Pacific Freight Brokers",avatar:"JE", color:"#f59e0b", type:"Broker",   stars:5, text:"The carrier network is incredible. We filled 97% of our loads in the first month without a single phone call. The rate engine and white-label portal are worth it alone." },
  { name:"Sarah Kim",       role:"Supply Chain Dir.",  company:"Hana Import Group",     avatar:"SK", color:"#38bdf8", type:"Shipper",  stars:5, text:"Real-time container tracking from gate-in to our warehouse door. Our clients love getting automated status updates. We couldn't go back to the old way." },
  { name:"Tony Vasquez",    role:"Fleet Manager",      company:"Southwest Dray",        avatar:"TV", color:"#a78bfa", type:"Carrier",  stars:5, text:"The load board shows exactly what's available near our trucks. The digital dispatch and POD upload alone saves us 2 hours of paperwork every single day." },
];

function StarRating({ n }: { n: number }) {
  return (
    <div style={{ display:"flex", gap:2, marginBottom:14 }}>
      {Array.from({length:n}).map((_,i)=>(
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];
  return (
    <section style={{ background:"linear-gradient(180deg,#050508 0%,#0a0b10 100%)", padding:"88px 0", overflow:"hidden" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
        <SectionHead tag="Reviews" title="Loved by freight pros" sub="Shippers, brokers, and carriers across North America depend on DrayGo every single day." />

        {/* Active testimonial */}
        <div className="reveal" style={{ maxWidth:740, margin:"0 auto 40px" }}>
          <GlassCard style={{ padding:"40px 44px", position:"relative" as const }}>
            <div style={{ position:"absolute", top:28, left:40, fontSize:72, lineHeight:1, color:"rgba(252,11,5,0.15)", fontFamily:"Georgia,serif", fontWeight:900 }}>"</div>
            <StarRating n={t.stars} />
            <p style={{ fontSize:"clamp(15px,1.5vw,18px)", color:"rgba(255,255,255,0.82)", lineHeight:1.75, marginBottom:28, position:"relative" as const, zIndex:1 }}>"{t.text}"</p>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:"50%", background:t.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:900, color:"#fff", flexShrink:0 }}>{t.avatar}</div>
              <div>
                <div style={{ fontSize:14, fontWeight:800, color:"#fff" }}>{t.name}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>{t.role} · {t.company}</div>
              </div>
              <div style={{ marginLeft:"auto", background:t.color+"18", border:`1px solid ${t.color}30`, borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700, color:t.color }}>{t.type}</div>
            </div>
          </GlassCard>
        </div>

        {/* Avatar selector */}
        <div style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap" as const }}>
          {TESTIMONIALS.map((t2, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ width:48, height:48, borderRadius:"50%", background: i===idx ? t2.color : "rgba(255,255,255,0.06)", border:`2px solid ${i===idx ? t2.color : "rgba(255,255,255,0.1)"}`, fontSize:14, fontWeight:900, color:"#fff", cursor:"pointer", transition:"all 0.25s", outline:"none" }}>
              {t2.avatar}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 7 — SECURITY & COMPLIANCE
══════════════════════════════════════════════════════════════════ */
const SEC_ITEMS = [
  { title:"FMCSA Compliant",      desc:"All carriers verified against FMCSA carrier registry. No unregistered trucks — ever.",     icon:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></> },
  { title:"DOT Verified",         desc:"Driver qualification files checked against FMCSA SAFER database before every dispatch.",    icon:<><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></> },
  { title:"Encrypted Payments",   desc:"All financial transactions use AES-256 encryption with PCI DSS Level 1 compliance.",       icon:<><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></> },
  { title:"Secure Documents",     desc:"BOL, POD and customs docs stored in encrypted cloud storage with role-based access.",      icon:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M12 11v6"/><path d="M9 14h6"/></> },
  { title:"24/7 Monitoring",      desc:"Infrastructure monitored round the clock with automated failover and incident response.",   icon:<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></> },
  { title:"Cloud Infrastructure", desc:"Built on enterprise-grade cloud with 99.99% uptime SLA across multi-region availability.", icon:<><polyline points="17 18 22 18 22 10 12 3 2 10 2 18 7 18"/><path d="M9 18V12h6v6"/></> },
  { title:"SOC 2 Ready",          desc:"Security controls aligned with SOC 2 Type II requirements. Audit reports available.",      icon:<><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></> },
];

export function SecuritySection() {
  return (
    <section style={{ background:"#06101e", padding:"88px 0" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
        <SectionHead tag="Security" title="Built to enterprise standards" sub="Every shipment, payment, and document is protected by industry-leading security and compliance frameworks." />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14 }}>
          {SEC_ITEMS.map((s, i) => (
            <div key={s.title} className={`reveal reveal-delay-${(i%4)+1}`} style={{ display:"flex", gap:16, padding:"22px 20px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:"rgba(34,197,94,0.10)", border:"1px solid rgba(34,197,94,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
              </div>
              <div>
                <h3 style={{ fontSize:14, fontWeight:800, color:"#fff", margin:"0 0 6px" }}>{s.title}</h3>
                <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.4)", lineHeight:1.6, margin:0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 8 — BUSINESS STATISTICS (animated counters)
══════════════════════════════════════════════════════════════════ */
function StatCounter({ n, suffix, label, prefix }: { n: number; suffix?: string; label: string; prefix?: string }) {
  const { count, ref } = useCounter(n);
  return (
    <div className="reveal reveal-scale" style={{ textAlign:"center" as const, padding:"36px 20px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:18 }}>
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ fontSize:"clamp(36px,4vw,56px)", fontWeight:900, color:"#fff", lineHeight:1, letterSpacing:"-0.02em" }}>
        {prefix}<span style={{ color:"#fc0b05" }}>{count.toLocaleString()}</span>{suffix}
      </div>
      <div style={{ fontSize:14, color:"rgba(255,255,255,0.4)", marginTop:10, fontWeight:500 }}>{label}</div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section style={{ background:"linear-gradient(180deg,#070f1f 0%,#06101e 100%)", padding:"88px 0", position:"relative" as const }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 70% 50% at 50% 50%, rgba(252,11,5,0.06) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
        <SectionHead tag="By the Numbers" title="The DrayGo difference, measured" sub="Real numbers from real freight moving through the DrayGo network every day." />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
          <StatCounter n={3800} suffix="B+" prefix="$" label="Freight Moved Annually" />
          <StatCounter n={38}   suffix="K+"            label="Loads Completed" />
          <StatCounter n={9800} suffix="+"             label="Verified Carriers" />
          <StatCounter n={49}   prefix="4." suffix="★" label="Average App Rating" />
          <StatCounter n={98}   suffix="%"             label="On-Time Delivery" />
          <StatCounter n={24}   suffix=" hrs"          label="Average Carrier Settlement" />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 9 — COMPARISON TABLE
══════════════════════════════════════════════════════════════════ */
const CMP_ROWS = [
  { label:"Instant Rate Quotes",     old:false, neo:true  },
  { label:"Live GPS Tracking",       old:false, neo:true  },
  { label:"Digital POD Upload",      old:false, neo:true  },
  { label:"24-Hour Carrier Payment", old:false, neo:true  },
  { label:"Automated Dispatch",      old:false, neo:true  },
  { label:"Verified Carrier Network",old:false, neo:true  },
  { label:"Document Automation",     old:false, neo:true  },
  { label:"Phone Calls & Fax",       old:true,  neo:false },
  { label:"Manual Dispatch Sheets",  old:true,  neo:false },
  { label:"Paper POD",               old:true,  neo:false },
  { label:"Net-30 / Net-60 Payment", old:true,  neo:false },
  { label:"Rate Negotiation Delays", old:true,  neo:false },
];

export function ComparisonSection() {
  return (
    <section style={{ background:"linear-gradient(180deg,#070f1f 0%,#0a1428 100%)", padding:"88px 0" }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
        <SectionHead tag="Comparison" title="DrayGo vs. Traditional Drayage" sub="See why thousands of logistics professionals switched and never looked back." />
        <div className="reveal" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:20, overflow:"hidden" }}>
          {/* Header */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 140px 140px", padding:"18px 24px", background:"rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.5)", textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>Feature</span>
            <span style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.3)", textAlign:"center" as const }}>Traditional</span>
            <span style={{ fontSize:13, fontWeight:800, color:"#fc0b05", textAlign:"center" as const }}>DrayGo</span>
          </div>
          {CMP_ROWS.map((r, i) => (
            <div key={r.label} style={{ display:"grid", gridTemplateColumns:"1fr 140px 140px", padding:"14px 24px", borderBottom: i < CMP_ROWS.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems:"center", background: i%2===0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
              <span style={{ fontSize:14, color:"rgba(255,255,255,0.7)" }}>{r.label}</span>
              <span style={{ textAlign:"center" as const }}>
                {r.old
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                }
              </span>
              <span style={{ textAlign:"center" as const }}>
                {r.neo
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                }
              </span>
            </div>
          ))}
        </div>
        <div className="reveal" style={{ textAlign:"center" as const, marginTop:28 }}>
          <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fc0b05", borderRadius:10, padding:"14px 32px", fontSize:15, fontWeight:700, color:"#fff", textDecoration:"none", transition:"opacity 0.2s" }}
            onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.opacity="0.85"} onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.opacity="1"}>
            Switch to DrayGo — Free to Start
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 10 — FAQ
══════════════════════════════════════════════════════════════════ */
const FAQS = [
  { q:"How does DrayGo pricing work?",         a:"DrayGo charges a small transaction fee per load — no monthly subscription required. Shippers pay nothing to post loads. Carriers pay a small percentage on accepted jobs. Brokers have a flat monthly operations fee with volume discounts available." },
  { q:"How do carriers get paid?",             a:"Carriers are paid through DrayPay within 24 hours of uploading a verified proof of delivery (POD). No factoring company needed. Funds arrive via ACH direct deposit to the carrier's registered bank account." },
  { q:"How do brokers join the network?",      a:"Brokers can apply online and are onboarded within 24–48 hours after FMCSA authority verification. The broker dashboard, white-label shipper portal, and carrier matching tools are available immediately upon approval." },
  { q:"Can I track containers in real time?",  a:"Yes. DrayGo provides real-time GPS tracking from gate-in at the port to final delivery. You can share a live tracking link with your customer so they have visibility without needing a login." },
  { q:"How fast is the onboarding process?",   a:"Shippers can start getting quotes in under 5 minutes. Carrier onboarding takes 24–48 hours for FMCSA/DOT verification. Brokers are typically live within 48 hours of completing the application." },
  { q:"Do you support multiple ports?",        a:"DrayGo operates at 40+ major US and Canadian ports including Los Angeles, Long Beach, New York, Savannah, Houston, Oakland, Seattle, Miami, and more. New ports are added regularly." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section style={{ background:"#06101e", padding:"88px 0" }}>
      <div style={{ maxWidth:820, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
        <SectionHead tag="FAQ" title="Frequently asked questions" sub="Everything you need to know before you move your first load on DrayGo." />
        <div className="reveal" style={{ display:"flex", flexDirection:"column" as const }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
              <button onClick={() => setOpen(open===i ? null : i)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 0", background:"transparent", border:"none", cursor:"pointer", textAlign:"left" as const, gap:16 }}>
                <span style={{ fontSize:16, fontWeight:700, color:"#fff", lineHeight:1.3 }}>{f.q}</span>
                <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"transform 0.3s, background 0.3s", transform: open===i ? "rotate(45deg)" : "rotate(0deg)", ...(open===i ? { background:"rgba(252,11,5,0.15)", borderColor:"rgba(252,11,5,0.35)" } : {}) }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={open===i ? "#fc0b05" : "rgba(255,255,255,0.6)"} strokeWidth="3" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
              </button>
              <div style={{ maxHeight: open===i ? 200 : 0, overflow:"hidden", transition:"max-height 0.4s cubic-bezier(.4,0,.2,1)" }}>
                <p style={{ fontSize:15, color:"rgba(255,255,255,0.55)", lineHeight:1.75, paddingBottom:20, margin:0 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 11 — INDUSTRY INSIGHTS
══════════════════════════════════════════════════════════════════ */
const POSTS = [
  { tag:"Port Operations",  img:"/blog-port.webp",     imgFb:"/blog-port.jpg",     title:"Reducing Port Dwell Time: A Shipper's Playbook",               desc:"How leading logistics teams are cutting average terminal dwell from 4.8 days to under 2 using data-driven scheduling and pre-gate booking systems.", mins:6, date:"Jun 28, 2026" },
  { tag:"Industry Trends",  img:"/blog-future.webp",   imgFb:"/blog-future.jpg",   title:"The Future of Drayage: Automation, AI, and Real-Time Rail",    desc:"Container drayage is entering its digital era. We break down the five forces reshaping how freight moves from the port to the warehouse door.",        mins:8, date:"Jun 21, 2026" },
  { tag:"Technology",       img:"/blog-tracking.webp", imgFb:"/blog-tracking.jpg", title:"Container Tracking in 2026: GPS vs. Carrier EDI vs. Ocean APIs",desc:"A technical deep-dive into the three tracking methodologies — and why combining all three gives shippers the most accurate ETA predictions.",            mins:5, date:"Jun 14, 2026" },
];

export function BlogSection() {
  return (
    <section style={{ background:"linear-gradient(180deg,#050508 0%,#0a0b10 100%)", padding:"88px 0" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
        <SectionHead tag="Insights" title="Latest industry articles" sub="Expert takes on drayage, port operations, and supply chain technology." />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
          {POSTS.map((p, i) => (
            <div key={p.title} className={`reveal reveal-delay-${i+1}`}
              style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, overflow:"hidden", cursor:"pointer", transition:"transform 0.3s, border-color 0.3s" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateY(-5px)"; (e.currentTarget as HTMLDivElement).style.borderColor="rgba(252,11,5,0.3)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; (e.currentTarget as HTMLDivElement).style.borderColor="rgba(255,255,255,0.08)";}}
            >
              {/* Article photo */}
              <div style={{ height:180, overflow:"hidden", position:"relative" as const }}>
                <picture>
                  <source srcSet={asset(p.img)} type="image/webp" />
                  <img src={asset(p.imgFb)} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.5s ease" }}
                    onMouseEnter={e=>(e.currentTarget as HTMLImageElement).style.transform="scale(1.06)"}
                    onMouseLeave={e=>(e.currentTarget as HTMLImageElement).style.transform="scale(1)"} />
                </picture>
                <div style={{ position:"absolute" as const, inset:0, background:"linear-gradient(180deg,transparent 50%,rgba(5,5,8,0.7) 100%)" }} />
              </div>
              <div style={{ padding:"22px 24px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                  <span style={{ fontSize:10, fontWeight:700, color:"#fc0b05", letterSpacing:"0.08em", textTransform:"uppercase" as const, background:"rgba(252,11,5,0.1)", borderRadius:6, padding:"3px 8px" }}>{p.tag}</span>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>{p.mins} min read</span>
                </div>
                <h3 style={{ fontSize:16, fontWeight:800, color:"#fff", margin:"0 0 10px", lineHeight:1.3 }}>{p.title}</h3>
                <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", lineHeight:1.65, margin:"0 0 18px" }}>{p.desc}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.25)" }}>{p.date}</span>
                  <span style={{ fontSize:12, color:"#fc0b05", fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>
                    Read more
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 12 — DOWNLOAD APPS
══════════════════════════════════════════════════════════════════ */
export function DownloadAppsSection() {
  return (
    <section style={{ background:"#06101e", padding:"88px 0", position:"relative" as const, overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 70% 80% at 50% 100%, rgba(252,11,5,0.08) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          {/* Left: text + buttons */}
          <div className="reveal reveal-left">
            <Tag>Available Now</Tag>
            <h2 style={{ fontSize:"clamp(32px,4.5vw,56px)", fontWeight:900, color:"#fff", lineHeight:1.1, margin:"0 0 20px" }}>
              Download the<br/>DrayGo App
            </h2>
            <p style={{ fontSize:16, color:"rgba(255,255,255,0.45)", lineHeight:1.75, marginBottom:36, maxWidth:420 }}>
              Manage shipments, find loads, dispatch carriers, and track containers — all from your phone. iOS and Android, optimized for logistics professionals.
            </p>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap" as const, marginBottom:32 }}>
              <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#fff", borderRadius:12, padding:"12px 22px", textDecoration:"none", transition:"opacity 0.2s" }}
                onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.opacity="0.9"} onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.opacity="1"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#000"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.22 1.3-2.2 3.88.03 3.02 2.65 4.03 2.68 4.04l-.03.1zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <span style={{ lineHeight:1 }}>
                  <span style={{ display:"block", fontSize:10, color:"rgba(0,0,0,0.5)" }}>Download on the</span>
                  <span style={{ display:"block", fontSize:15, fontWeight:800, color:"#000" }}>App Store</span>
                </span>
              </a>
              <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:12, background:"#fff", borderRadius:12, padding:"12px 22px", textDecoration:"none", transition:"opacity 0.2s" }}
                onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.opacity="0.9"} onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.opacity="1"}>
                <img src={asset("/google-play.png")} alt="" style={{ width:24, height:24, objectFit:"contain" }} />
                <span style={{ lineHeight:1 }}>
                  <span style={{ display:"block", fontSize:10, color:"rgba(0,0,0,0.5)" }}>Get it on</span>
                  <span style={{ display:"block", fontSize:15, fontWeight:800, color:"#000" }}>Google Play</span>
                </span>
              </a>
            </div>
            <div style={{ display:"flex", gap:20, flexWrap:"wrap" as const }}>
              {["Free to Download","No Subscription","Works Offline"].map(f=>(
                <div key={f} style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"rgba(255,255,255,0.4)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3 phones floating */}
          <div className="reveal reveal-right reveal-delay-1" style={{ position:"relative" as const, display:"flex", justifyContent:"center", alignItems:"center", minHeight:380 }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, alignItems:"flex-end" }}>
              {[
                { img:"/bento-phone-card.png", webp:"/bento-phone-card.webp", label:"Shipper App", h:260, mt:0 },
                { img:"/bento-broker-phone.png", webp:"/bento-broker-phone.webp", label:"Broker App", h:310, mt:-24 },
                { img:"/bento-carrier-notif.png", webp:"/bento-carrier-notif.webp", label:"Driver App", h:260, mt:0 },
              ].map((p, i) => (
                <div key={i} style={{ textAlign:"center" as const, marginTop: p.mt }}>
                  <picture>
                    <source srcSet={asset(p.webp)} type="image/webp" />
                    <img src={asset(p.img)} alt={p.label} style={{ height:p.h, width:"auto", maxWidth:"100%", display:"block", margin:"0 auto", filter:"drop-shadow(0 24px 48px rgba(0,0,0,0.7))" }} />
                  </picture>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:10, fontWeight:600 }}>{p.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 13 — ENTERPRISE CTA
══════════════════════════════════════════════════════════════════ */
export function EnterpriseCTASection() {
  return (
    <section style={{ background:"#06101e", padding:"88px 0 96px", position:"relative" as const, overflow:"hidden" }}>
      {/* Animated background glows */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 60% 70% at 20% 50%, rgba(252,11,5,0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 70% at 80% 50%, rgba(252,11,5,0.05) 0%, transparent 55%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:600, borderRadius:"50%", background:"radial-gradient(ellipse, rgba(252,11,5,0.04) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:860, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)", textAlign:"center" as const, position:"relative" as const, zIndex:1 }}>
        <div className="reveal">
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(252,11,5,0.12)", border:"1px solid rgba(252,11,5,0.3)", borderRadius:100, padding:"8px 20px", fontSize:12, fontWeight:700, color:"#fc0b05", letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:28 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#fc0b05", display:"inline-block" }}/> Now Open to All Carriers & Shippers
          </div>
          <h2 style={{ fontSize:"clamp(36px,5.5vw,72px)", fontWeight:900, color:"#fff", lineHeight:1.05, margin:"0 0 20px", letterSpacing:"-0.025em" }}>
            Move Containers<br/><span style={{ color:"#fc0b05" }}>Smarter.</span>
          </h2>
          <p style={{ fontSize:"clamp(15px,1.5vw,18px)", color:"rgba(255,255,255,0.45)", lineHeight:1.75, marginBottom:44, maxWidth:560, margin:"0 auto 44px" }}>
            Join thousands of shippers, brokers, and carriers already running the most connected drayage network in North America.
          </p>
        </div>
        <div className="reveal reveal-delay-1" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" as const, marginBottom:32 }}>
          <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fc0b05", borderRadius:12, padding:"16px 36px", fontSize:16, fontWeight:800, color:"#fff", textDecoration:"none", letterSpacing:"-0.01em", transition:"opacity 0.2s, transform 0.2s", boxShadow:"0 8px 32px rgba(252,11,5,0.35)" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.opacity="0.88"; (e.currentTarget as HTMLAnchorElement).style.transform="translateY(-2px)";}} onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.opacity="1"; (e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)";}}>
            Start Free Today
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.14)", borderRadius:12, padding:"16px 36px", fontSize:16, fontWeight:700, color:"#fff", textDecoration:"none", transition:"background 0.2s" }}
            onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.10)"} onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.06)"}>
            Book a Demo
          </a>
        </div>
        <div className="reveal reveal-delay-2" style={{ display:"flex", gap:28, justifyContent:"center", flexWrap:"wrap" as const }}>
          {["No credit card required","Free onboarding support","Cancel anytime"].map(t=>(
            <div key={t} style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"rgba(255,255,255,0.3)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION A — LIVE ACTIVITY TICKER
══════════════════════════════════════════════════════════════════ */
const FEED_ITEMS = [
  { type:"load",   icon:"📦", msg:"Load #DR-8821 dispatched · LA → Phoenix",       time:"2s ago",  color:"#22c55e" },
  { type:"pay",    icon:"💳", msg:"Payment $3,240 settled · Long Beach carrier",    time:"11s ago", color:"#38bdf8" },
  { type:"bid",    icon:"⚡", msg:"8 bids received · Container TGHU4412301",        time:"23s ago", color:"#f59e0b" },
  { type:"del",    icon:"✅", msg:"Delivery confirmed · NY → Newark · POD uploaded", time:"41s ago", color:"#22c55e" },
  { type:"track",  icon:"📍", msg:"Live GPS lock · Truck DRY-2291 · I-10 West",    time:"1m ago",  color:"#a78bfa" },
  { type:"load",   icon:"📦", msg:"Load #DR-8822 accepted · Savannah Port",         time:"1m ago",  color:"#22c55e" },
  { type:"pay",    icon:"💳", msg:"Payment $1,890 settled · Oakland carrier",       time:"2m ago",  color:"#38bdf8" },
  { type:"bid",    icon:"⚡", msg:"12 bids received · Reefer container HLBU2239",   time:"3m ago",  color:"#f59e0b" },
  { type:"del",    icon:"✅", msg:"Gate-out confirmed · Houston · 40ft dry van",    time:"4m ago",  color:"#22c55e" },
  { type:"track",  icon:"📍", msg:"ETA updated · NFK terminal · 14 min early",      time:"5m ago",  color:"#a78bfa" },
];

export function LiveActivitySection() {
  const [items, setItems] = useState(FEED_ITEMS);
  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setHighlight(h => (h + 1) % FEED_ITEMS.length);
      setItems(prev => {
        const next = [...prev];
        const last = next.pop()!;
        return [last, ...next];
      });
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background:"linear-gradient(180deg,#07101f 0%,#060e1b 100%)", padding:"80px 0", overflow:"hidden", position:"relative" as const }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 50% 60% at 70% 50%, rgba(56,189,248,0.04) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>

          {/* Left copy */}
          <div className="reveal reveal-left">
            <Tag>Live Network</Tag>
            <h2 style={{ fontSize:"clamp(30px,3.8vw,50px)", fontWeight:900, color:"#fff", lineHeight:1.1, margin:"0 0 18px", letterSpacing:"-0.025em" }}>
              Thousands of loads<br/>moving <span style={{ color:"#38bdf8" }}>right now</span>
            </h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.42)", lineHeight:1.75, marginBottom:32 }}>
              DrayGo processes hundreds of drayage events every minute — bids, dispatches, GPS pings, and instant payments. Watch it happen in real time.
            </p>
            <div style={{ display:"flex", gap:32 }}>
              {[["847","Loads active now"],["2.3s","Avg bid response"],["99.8%","Uptime SLA"]].map(([v,l])=>(
                <div key={l}>
                  <div style={{ fontSize:24, fontWeight:900, color:"#38bdf8" }}>{v}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", marginTop:3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right feed */}
          <div className="reveal reveal-right" style={{ position:"relative" as const }}>
            {/* Fade edges */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:48, background:"linear-gradient(180deg,#07101f,transparent)", zIndex:2, pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:48, background:"linear-gradient(0deg,#07101f,transparent)", zIndex:2, pointerEvents:"none" }} />

            <div style={{ display:"flex", flexDirection:"column" as const, gap:8, maxHeight:380, overflow:"hidden" }}>
              {items.slice(0, 7).map((item, i) => (
                <div key={`${item.msg}-${i}`}
                  style={{ display:"flex", alignItems:"center", gap:12, background: i===0 ? "rgba(56,189,248,0.07)" : "rgba(255,255,255,0.028)", border:`1px solid ${i===0 ? "rgba(56,189,248,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius:12, padding:"11px 14px", transition:"all 0.4s ease", opacity: i > 5 ? 0 : 1 }}>
                  <div style={{ width:32, height:32, borderRadius:10, background:`rgba(255,255,255,0.05)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>{item.icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, color:"rgba(255,255,255,0.75)", fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" as const }}>{item.msg}</div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", marginTop:2 }}>{item.time}</div>
                  </div>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:item.color, flexShrink:0, boxShadow:`0 0 6px ${item.color}` }} />
                </div>
              ))}
            </div>

            {/* Live pulse dot */}
            <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:14 }}>
              <div style={{ position:"relative" as const, width:8, height:8 }}>
                <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#22c55e", animation:"ping 1.4s cubic-bezier(0,0,0.2,1) infinite" }} />
                <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#22c55e" }} />
              </div>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)", fontWeight:600, letterSpacing:"0.06em" }}>LIVE NETWORK FEED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION B — ANIMATED FEATURE CAROUSEL (TABBED)
══════════════════════════════════════════════════════════════════ */
const FEATURES_TAB = [
  {
    id:"dispatch", label:"Smart Dispatch", color:"#fc0b05",
    headline:"Dispatch loads in under 60 seconds",
    desc:"AI-powered carrier matching routes your load to the best available truck based on proximity, rating, and equipment type. No phone calls. No back-and-forth.",
    points:["Auto-match to 8,000+ carriers","ETA + rate locked instantly","Full paperwork generated automatically"],
    visual: (
      <div style={{ background:"rgba(252,11,5,0.06)", border:"1px solid rgba(252,11,5,0.15)", borderRadius:16, padding:24 }}>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:16, fontWeight:700, letterSpacing:"0.06em" }}>MATCHING CARRIERS</div>
        {[{name:"Carlos M. · DryTruck",dist:"2.1 mi",rate:"$380",score:98,c:"#22c55e"},{name:"Ahmed K. · FastFreight",dist:"3.8 mi",rate:"$390",score:94,c:"#22c55e"},{name:"Sam T. · GoLoad",dist:"5.2 mi",rate:"$405",score:87,c:"#f59e0b"}].map((c,i)=>(
          <div key={c.name} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:i<2?"1px solid rgba(255,255,255,0.06)":"none" }}>
            <div style={{ width:32, height:32, borderRadius:10, background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>🚛</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, color:"#fff", fontWeight:600 }}>{c.name}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:2 }}>{c.dist} away</div>
            </div>
            <div style={{ textAlign:"right" as const }}>
              <div style={{ fontSize:13, color:"#fff", fontWeight:700 }}>{c.rate}</div>
              <div style={{ fontSize:10, color:c.c, marginTop:2 }}>Score {c.score}</div>
            </div>
            {i===0 && <div style={{ background:"#fc0b05", borderRadius:6, padding:"3px 8px", fontSize:9, fontWeight:800, color:"#fff", letterSpacing:"0.06em" }}>BEST</div>}
          </div>
        ))}
        <button style={{ width:"100%", marginTop:16, padding:"10px", background:"#fc0b05", border:"none", borderRadius:10, fontSize:13, fontWeight:800, color:"#fff", cursor:"pointer", letterSpacing:"-0.01em" }}>Dispatch Now →</button>
      </div>
    )
  },
  {
    id:"track", label:"GPS Tracking", color:"#38bdf8",
    headline:"Full container visibility, gate to gate",
    desc:"Real-time GPS updates every 30 seconds. Know exactly where your container is at all times — from terminal gate-out to final warehouse delivery.",
    points:["30-second location refresh","Geofence alerts at every checkpoint","Full audit trail for compliance"],
    visual: (
      <div style={{ background:"rgba(56,189,248,0.06)", border:"1px solid rgba(56,189,248,0.15)", borderRadius:16, padding:24 }}>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:12, fontWeight:700, letterSpacing:"0.06em" }}>CONTAINER TGHU4412301</div>
        {/* Fake map track */}
        <div style={{ height:140, background:"rgba(255,255,255,0.03)", borderRadius:12, border:"1px solid rgba(255,255,255,0.06)", marginBottom:12, position:"relative" as const, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg viewBox="0 0 320 140" width="100%" height="100%" style={{ position:"absolute", inset:0 }}>
            <polyline points="20,110 80,85 140,70 200,55 280,35" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="2" strokeDasharray="6,4"/>
            {[{x:20,y:110,done:true},{x:80,y:85,done:true},{x:140,y:70,done:true},{x:200,y:55,done:true},{x:280,y:35,done:false}].map((pt,i)=>(
              <circle key={i} cx={pt.x} cy={pt.y} r={i===3?7:4} fill={pt.done?"#38bdf8":"rgba(255,255,255,0.2)"} stroke={i===3?"rgba(56,189,248,0.4)":"none"} strokeWidth={i===3?8:0}/>
            ))}
          </svg>
          <div style={{ position:"absolute", bottom:8, left:8, fontSize:10, color:"rgba(255,255,255,0.3)" }}>LA Port → Phoenix WH</div>
        </div>
        {[["Status","In Transit • I-10 W"],["ETA","4h 22min (on time)"],["Last ping","18 seconds ago"]].map(([k,v])=>(
          <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.05)", fontSize:12 }}>
            <span style={{ color:"rgba(255,255,255,0.35)" }}>{k}</span>
            <span style={{ color:"#fff", fontWeight:600 }}>{v}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    id:"pay", label:"Instant Pay", color:"#a78bfa",
    headline:"Carriers paid within 24 hours",
    desc:"DrayPay settles every load automatically the moment POD is uploaded. No net-30, no wire transfers, no payment chasing. Carriers love DrayGo because they actually get paid.",
    points:["Same-day ACH for top-rated carriers","Automatic invoice generation","Full payment history + tax exports"],
    visual: (
      <div style={{ background:"rgba(167,139,250,0.06)", border:"1px solid rgba(167,139,250,0.15)", borderRadius:16, padding:24 }}>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:12, fontWeight:700, letterSpacing:"0.06em" }}>DRAYPAY SETTLEMENTS</div>
        {[{id:"#8821",amt:"$3,240",carrier:"Carlos M.",status:"Paid",dt:"Today 2:14pm",c:"#22c55e"},{id:"#8819",amt:"$1,890",carrier:"Ahmed K.",status:"Paid",dt:"Today 11:02am",c:"#22c55e"},{id:"#8817",amt:"$4,100",carrier:"Sam T.",status:"Processing",dt:"Today 8:30am",c:"#f59e0b"},{id:"#8815",amt:"$2,750",carrier:"Maria L.",status:"Paid",dt:"Yesterday",c:"#22c55e"}].map((r,i)=>(
          <div key={r.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:i<3?"1px solid rgba(255,255,255,0.05)":"none" }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, color:"#fff", fontWeight:600 }}>{r.id} · {r.carrier}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", marginTop:2 }}>{r.dt}</div>
            </div>
            <div style={{ fontSize:13, color:"#fff", fontWeight:700 }}>{r.amt}</div>
            <div style={{ fontSize:9, fontWeight:800, color:r.c, background:`${r.c}18`, border:`1px solid ${r.c}40`, borderRadius:5, padding:"2px 7px", letterSpacing:"0.06em" }}>{r.status}</div>
          </div>
        ))}
        <div style={{ marginTop:14, padding:"10px 14px", background:"rgba(167,139,250,0.08)", borderRadius:10, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:12, color:"rgba(255,255,255,0.45)" }}>This month</span>
          <span style={{ fontSize:17, fontWeight:900, color:"#a78bfa" }}>$284,310</span>
        </div>
      </div>
    )
  },
];

export function FeatureTabSection() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  function switchTab(i: number) {
    setActive(i);
    setAnimKey(k => k + 1);
  }

  useEffect(() => {
    const t = setInterval(() => switchTab((active + 1) % FEATURES_TAB.length), 5000);
    return () => clearInterval(t);
  }, [active]);

  const tab = FEATURES_TAB[active];

  return (
    <section style={{ background:"linear-gradient(180deg,#060e1b 0%,#06101e 100%)", padding:"96px 0", overflow:"hidden", position:"relative" as const }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(ellipse 55% 65% at 80% 50%, ${tab.color}0a 0%, transparent 60%)`, transition:"background-image 0.6s ease", pointerEvents:"none" }} />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
        <SectionHead tag="Platform Features" title={<>Everything you need<br/>to run drayage</>} sub="Three core systems. One unified platform." />

        {/* Tab switcher */}
        <div className="reveal" style={{ display:"flex", justifyContent:"center", gap:10, marginBottom:56 }}>
          {FEATURES_TAB.map((t,i)=>(
            <button key={t.id} onClick={()=>switchTab(i)}
              style={{ padding:"10px 24px", borderRadius:100, border:`1.5px solid ${active===i ? t.color : "rgba(255,255,255,0.1)"}`, background: active===i ? `${t.color}18` : "transparent", color: active===i ? t.color : "rgba(255,255,255,0.45)", fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.25s ease", letterSpacing:"0.01em" }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div key={animKey} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center", opacity:1, transition:"opacity 0.35s ease" }}>
          {/* Left text */}
          <div>
            <h3 style={{ fontSize:"clamp(26px,3vw,42px)", fontWeight:900, color:"#fff", lineHeight:1.1, margin:"0 0 16px", letterSpacing:"-0.02em" }}>{tab.headline}</h3>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.42)", lineHeight:1.75, marginBottom:28 }}>{tab.desc}</p>
            <div style={{ display:"flex", flexDirection:"column" as const, gap:10 }}>
              {tab.points.map(pt=>(
                <div key={pt} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                  <div style={{ width:20, height:20, borderRadius:6, background:`${tab.color}20`, border:`1px solid ${tab.color}40`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={tab.color} strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize:14, color:"rgba(255,255,255,0.65)", lineHeight:1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div>{tab.visual}</div>
        </div>

        {/* Progress bar */}
        <div style={{ display:"flex", gap:6, justifyContent:"center", marginTop:40 }}>
          {FEATURES_TAB.map((_,i)=>(
            <div key={i} style={{ height:3, width: active===i ? 32 : 16, borderRadius:2, background: active===i ? tab.color : "rgba(255,255,255,0.12)", transition:"all 0.3s ease" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION C — ANIMATED PARTICLE NETWORK (Canvas)
══════════════════════════════════════════════════════════════════ */
export function NetworkShaderSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const NODES = 55;
    const MAX_DIST = 160;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Nodes
    const nodes = Array.from({ length: NODES }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 1.5 + Math.random() * 2,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Active "data" packets travelling along edges
    const packets: { from: number; to: number; t: number; speed: number; color: string }[] = [];
    const COLORS = ["#fc0b05","#38bdf8","#22c55e","#a78bfa","#f59e0b"];

    function spawnPacket() {
      const from = Math.floor(Math.random() * NODES);
      const to = Math.floor(Math.random() * NODES);
      if (from === to) return;
      packets.push({ from, to, t: 0, speed: 0.008 + Math.random() * 0.012, color: COLORS[Math.floor(Math.random() * COLORS.length)] });
    }

    let frame = 0;
    function draw() {
      if (!canvas || !ctx) return;
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.pulse += 0.02;
      });

      // Draw edges
      for (let i = 0; i < NODES; i++) {
        for (let j = i + 1; j < NODES; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const pulse = Math.sin(n.pulse) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (1 + pulse * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${0.4 + pulse * 0.4})`;
        ctx.fill();
      });

      // Move packets
      packets.forEach((p, idx) => {
        p.t += p.speed;
        const na = nodes[p.from], nb = nodes[p.to];
        const x = na.x + (nb.x - na.x) * p.t;
        const y = na.y + (nb.y - na.y) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        if (p.t >= 1) packets.splice(idx, 1);
      });

      // Spawn packets
      if (frame % 18 === 0) spawnPacket();
      frame++;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section style={{ background:"linear-gradient(180deg,#060e1b 0%,#06101e 100%)", padding:"96px 0", position:"relative" as const, overflow:"hidden" }}>
      {/* Canvas background */}
      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.65 }} />

      <div style={{ position:"relative" as const, zIndex:1, maxWidth:960, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)", textAlign:"center" as const }}>
        <div className="reveal">
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(56,189,248,0.1)", border:"1px solid rgba(56,189,248,0.25)", borderRadius:100, padding:"7px 18px", fontSize:11, fontWeight:700, color:"#38bdf8", letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:24 }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#38bdf8", display:"inline-block" }}/> Connected Network
          </div>
          <h2 style={{ fontSize:"clamp(32px,5vw,64px)", fontWeight:900, color:"#fff", lineHeight:1.08, margin:"0 0 20px", letterSpacing:"-0.025em" }}>
            One network.<br/><span style={{ color:"#38bdf8" }}>Every shipment connected.</span>
          </h2>
          <p style={{ fontSize:"clamp(14px,1.4vw,17px)", color:"rgba(255,255,255,0.4)", lineHeight:1.8, maxWidth:580, margin:"0 auto 52px" }}>
            DrayGo's carrier network spans the entire continental US. Every load, every carrier, every container — connected in a single intelligent mesh.
          </p>
        </div>

        {/* Animated stats */}
        <div className="reveal reveal-delay-1" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, overflow:"hidden" }}>
          {[
            { value:"8,200+", label:"Carriers online", color:"#38bdf8" },
            { value:"340ms",  label:"Match speed",     color:"#22c55e" },
            { value:"50",     label:"States covered",  color:"#a78bfa" },
            { value:"99.8%",  label:"Network uptime",  color:"#f59e0b" },
          ].map((s, i) => (
            <div key={s.label} style={{ padding:"28px 20px", textAlign:"center" as const, borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none", position:"relative" as const }}>
              <div style={{ fontSize:"clamp(22px,2.5vw,34px)", fontWeight:900, color:s.color, letterSpacing:"-0.03em", lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)", marginTop:8, fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Master export ─────────────────────────────────────────────── */
export function AllNewSections() {
  return (
    <>
      <TrustedBySection />
      <HowItWorksSection />
      <LiveActivitySection />
      <DashboardSection />
      <FeatureGridSection />
      <FeatureTabSection />
      <CoverageMapSection />
      <NetworkShaderSection />
      <TestimonialsSection />
      <SecuritySection />
      <StatsSection />
      <ComparisonSection />
      <FAQSection />
      <BlogSection />
      <EnterpriseCTASection />
    </>
  );
}
