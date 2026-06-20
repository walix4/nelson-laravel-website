"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { asset } from "@/lib/site";

const STEPS = [
  {
    num: "01",
    tag: "Draygo",
    tagline: "AI dispatch & TMS",
    color: "#635bff",
    rgb: "99,91,255",
    logo: "/logo-draygo-white.png",
    role: "The Brain",
    photo: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80",
    photoAlt: "Truck on highway",
    nextTag: "DrayChain",
    chips: ["500+ carriers", "< 60s quotes"],
    title: "The Brain — AI decides in real time.",
    desc: "Draygo's AI handles dispatching, pricing, and compliance decisions instantly. Every action — a rate quote, a dispatch assignment, a milestone like gate-out confirmed or POD scanned — generates a verified data event that flows to the next layer.",
    bullets: [
      "Instant rate quotes across 500+ carriers",
      "AI dispatch assignment to nearest verified driver",
      "Compliance checks on MC/DOT, insurance, authority",
      "Every action generates a tamper-proof data event",
    ],
  },
  {
    num: "02",
    tag: "DrayChain",
    tagline: "Blockchain trust layer",
    color: "#27b30a",
    rgb: "39,179,10",
    logo: "/logo-draychain.png",
    role: "The Proof",
    photo: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80",
    photoAlt: "Blockchain technology",
    nextTag: "DrayPay",
    chips: ["Tamper-proof records", "Smart contracts"],
    title: "The Proof — blockchain records everything.",
    desc: "Every data event from Draygo gets hashed and written to the blockchain layer immediately. The BOL, invoice, ISF filing — whatever document is involved — becomes a verifiable, tamper-proof record. A smart contract automatically checks whether milestone conditions for payment have been met.",
    bullets: [
      "Every milestone hashed to blockchain in real time",
      "BOL, invoice & ISF filing — tamper-proof records",
      "Smart contracts verify payment milestone conditions",
      "Single source of truth — no disputed documents",
    ],
  },
  {
    num: "03",
    tag: "DrayPay",
    tagline: "Instant settlement",
    color: "#00a5e7",
    rgb: "0,165,231",
    logo: "/logo-draypay.png",
    role: "The Money",
    photo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
    photoAlt: "Payment infrastructure",
    nextTag: null,
    chips: ["24-72h pay", "zero factoring"],
    title: "The Money — funds move automatically.",
    desc: "The moment the smart contract confirms a milestone, funds move automatically. No invoice sitting in a queue, no 30/60-day terms, no manual approval chain. Wallet-based debit cards give drivers instant access to earned funds at the pump or for per-diem expenses.",
    bullets: [
      "Payment triggered automatically on milestone confirm",
      "No 30/60-day terms — funds move in 24-72 hours",
      "Wallet-based debit cards for drivers & owner-ops",
      "Instant pump access — no factoring fees",
    ],
  },
];

const DIFFS = [
  {
    label: "Old TMS platforms",
    items: ["Stop at visibility only", "Separate disconnected payment stack", "Factoring companies & ACH delays", "45-day payment cycles", "Disputed invoices & lost paperwork", "Fraud from duplicated documents"],
    bad: true,
  },
  {
    label: "DrayGo ecosystem",
    items: ["Operations + blockchain + payments in one loop", "Blockchain is single source of truth", "Smart contract triggers payment automatically", "24-72 hour settlement", "Tamper-proof records eliminate disputes", "Verified history improves AI over time"],
    bad: false,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Nav />

      <style>{`
        @keyframes hiw-float-a {
          0%,100%{transform:translate(0,0) scale(1);}
          33%{transform:translate(30px,-40px) scale(1.06);}
          66%{transform:translate(-20px,20px) scale(0.96);}
        }
        @keyframes hiw-float-b {
          0%,100%{transform:translate(0,0) scale(1);}
          40%{transform:translate(-35px,25px) scale(1.04);}
          70%{transform:translate(20px,-30px) scale(0.97);}
        }
        @keyframes hiw-float-c {
          0%,100%{transform:translate(0,0);}
          50%{transform:translate(15px,-20px);}
        }
        @keyframes hiw-card-glow-purple {
          0%,100%{box-shadow:0 0 24px rgba(252,11,5,0.15);}
          50%{box-shadow:0 0 48px rgba(252,11,5,0.40),0 0 80px rgba(252,11,5,0.14);}
        }
        @keyframes hiw-card-glow-green {
          0%,100%{box-shadow:0 0 24px rgba(26,110,212,0.15);}
          50%{box-shadow:0 0 48px rgba(26,110,212,0.40),0 0 80px rgba(26,110,212,0.14);}
        }
        @keyframes hiw-card-glow-cyan {
          0%,100%{box-shadow:0 0 24px rgba(0,165,231,0.15);}
          50%{box-shadow:0 0 48px rgba(0,165,231,0.35),0 0 80px rgba(0,165,231,0.12);}
        }
        @keyframes hiw-flow {
          0%{stroke-dashoffset:60;}
          100%{stroke-dashoffset:0;}
        }
        @keyframes hiw-flow-back {
          0%{stroke-dashoffset:66;}
          100%{stroke-dashoffset:0;}
        }
        @keyframes hiw-arrow-pulse {
          0%,100%{opacity:0.3;}
          50%{opacity:0.9;}
        }
        @keyframes hiw-badge-pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(252,11,5,0.4);}
          50%{box-shadow:0 0 0 6px rgba(252,11,5,0);}
        }
        @keyframes hiw-dot-blink {
          0%,100%{opacity:1;} 50%{opacity:0.3;}
        }
        @keyframes hiw-particle {
          0%{transform:translateY(0) translateX(0);opacity:0;}
          10%{opacity:0.6;}
          90%{opacity:0.2;}
          100%{transform:translateY(-80px) translateX(20px);opacity:0;}
        }
      `}</style>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(6,13,26,0.88)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "30px 30px", zIndex: 2 }} />

        {/* Animated glow orbs */}
        <div style={{ position: "absolute", left: "8%", top: "15%", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,91,255,0.18), transparent 65%)", zIndex: 2, pointerEvents: "none", animation: "hiw-float-a 9s ease-in-out infinite" }} />
        <div style={{ position: "absolute", right: "6%", bottom: "10%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,165,231,0.15), transparent 65%)", zIndex: 2, pointerEvents: "none", animation: "hiw-float-b 12s ease-in-out infinite" }} />
        <div style={{ position: "absolute", left: "45%", bottom: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(39,179,10,0.10), transparent 65%)", zIndex: 2, pointerEvents: "none", animation: "hiw-float-c 7s ease-in-out infinite" }} />

        {/* Floating particles */}
        {[
          { left:"18%", top:"70%", delay:"0s", color:"rgba(99,91,255,0.5)" },
          { left:"35%", top:"80%", delay:"1.5s", color:"rgba(39,179,10,0.4)" },
          { left:"60%", top:"75%", delay:"3s", color:"rgba(0,165,231,0.5)" },
          { left:"75%", top:"65%", delay:"0.8s", color:"rgba(252,11,5,0.4)" },
          { left:"50%", top:"85%", delay:"2.2s", color:"rgba(99,91,255,0.3)" },
        ].map((p,i) => (
          <div key={i} style={{ position:"absolute", left:p.left, top:p.top, width:4, height:4, borderRadius:"50%", background:p.color, zIndex:2, animation:`hiw-particle 4s ease-in-out infinite`, animationDelay:p.delay, pointerEvents:"none" }} />
        ))}

        <div style={{ position: "relative", zIndex: 3, maxWidth: 960, margin: "0 auto", textAlign: "center", padding: "100px 24px 80px", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.40)", borderRadius: 6, padding: "5px 16px", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 36, animation: "hiw-badge-pulse 2.5s ease-in-out infinite" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block", animation: "hiw-dot-blink 1.2s ease-in-out infinite" }} />
            How It Works
          </div>

          {/* 2-line headline */}
          <h1 style={{ fontSize: "clamp(28px,6vw,90px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 28px", letterSpacing: "-0.03em" }}>
            <span style={{ whiteSpace: "nowrap" }}>One loop.{" "}
            <span style={{ background: "linear-gradient(90deg,#fc0b05,#ff5530)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Three layers.</span>
            </span>
            <br />
            Zero gaps.
          </h1>

          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 64px" }}>
            Draygo, DrayChain, and DrayPay are one continuous cycle where each layer&apos;s output is the next layer&apos;s input.
          </p>

          {/* SVG cycle diagram */}
          <svg viewBox="0 0 880 258" style={{ width: "100%", maxWidth: 880, display: "block", margin: "0 auto", overflow: "visible" }}>
            <defs>
              <marker id="fwd1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0.5 L0,7.5 L7,4 z" fill="rgba(252,11,5,0.9)" />
              </marker>
              <marker id="fwd2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0.5 L0,7.5 L7,4 z" fill="rgba(26,110,212,0.9)" />
              </marker>
              <marker id="back" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0.5 L0,7.5 L7,4 z" fill="rgba(0,165,231,0.85)" />
              </marker>
              <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>

            {/* ── Card 1: Draygo (red) ── */}
            <rect x="10" y="10" width="240" height="126" rx="18"
              fill="rgba(252,11,5,0.10)" stroke="rgba(252,11,5,0.60)" strokeWidth="1.8"
              style={{ animation: "hiw-card-glow-purple 3s ease-in-out infinite" }} filter="url(#glow-red)" />
            <image href={asset("/logo-draygo-white.png")} x="40" y="30" width="180" height="42" preserveAspectRatio="xMidYMid meet" />
            <text x="130" y="116" textAnchor="middle" fill="rgba(255,255,255,0.50)" fontSize="12" fontFamily="system-ui,sans-serif">AI dispatch &amp; TMS</text>

            {/* ── Arrow 1→2 (red, spaced) ── */}
            <line x1="270" y1="73" x2="308" y2="73"
              stroke="rgba(252,11,5,0.80)" strokeWidth="2" strokeDasharray="6 3"
              markerEnd="url(#fwd1)"
              style={{ animation: "hiw-flow 1s linear infinite" }} />

            {/* ── Card 2: DrayChain (blue) ── */}
            <rect x="325" y="10" width="240" height="126" rx="18"
              fill="rgba(26,110,212,0.10)" stroke="rgba(26,110,212,0.60)" strokeWidth="1.8"
              style={{ animation: "hiw-card-glow-green 3s ease-in-out infinite", animationDelay: "0.8s" }} filter="url(#glow-blue)" />
            <image href={asset("/logo-draychain.png")} x="352" y="30" width="186" height="42" preserveAspectRatio="xMidYMid meet" />
            <text x="445" y="116" textAnchor="middle" fill="rgba(255,255,255,0.50)" fontSize="12" fontFamily="system-ui,sans-serif">Blockchain trust</text>

            {/* ── Arrow 2→3 (blue, spaced) ── */}
            <line x1="583" y1="73" x2="622" y2="73"
              stroke="rgba(26,110,212,0.80)" strokeWidth="2" strokeDasharray="6 3"
              markerEnd="url(#fwd2)"
              style={{ animation: "hiw-flow 1s linear infinite", animationDelay: "0.4s" }} />

            {/* ── Card 3: DrayPay (cyan) ── */}
            <rect x="640" y="10" width="240" height="126" rx="18"
              fill="rgba(0,165,231,0.10)" stroke="rgba(0,165,231,0.60)" strokeWidth="1.8"
              style={{ animation: "hiw-card-glow-cyan 3s ease-in-out infinite", animationDelay: "1.6s" }} filter="url(#glow-cyan)" />
            <image href={asset("/logo-draypay-white.png")} x="690" y="34" width="140" height="36" preserveAspectRatio="xMidYMid meet" />
            <text x="760" y="116" textAnchor="middle" fill="rgba(255,255,255,0.50)" fontSize="12" fontFamily="system-ui,sans-serif">Instant settlement</text>

            {/* ── Return arc: DrayPay → Draygo ── */}
            <path d="M 740,158 C 740,222 150,222 150,158"
              fill="none" stroke="rgba(0,165,231,0.70)" strokeWidth="1.8"
              strokeDasharray="8 4"
              markerEnd="url(#back)"
              style={{ animation: "hiw-flow-back 1.6s linear infinite" }} />

            {/* ── Feedback label ── */}
            <text x="445" y="244" textAnchor="middle" fill="rgba(0,165,231,0.85)" fontSize="13" fontFamily="system-ui,sans-serif" fontWeight="600" letterSpacing="0.3">
              ↺ verified history feeds back into Draygo&apos;s AI — improving pricing &amp; dispatch over time
            </text>
          </svg>

        </div>
      </section>

      {/* STEP 1: DRAYGO dark */}
      <section style={{ background: "#08192b", padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {(() => { const step = STEPS[0]; return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderBottom: `1px solid rgba(${step.rgb},0.12)` }} className="how-step-card">
              <div style={{ padding: "80px 60px", borderRight: `1px solid rgba(${step.rgb},0.12)`, position: "relative" }}>
                <div style={{ position: "absolute", left: 60, top: 60, fontSize: 140, fontWeight: 900, color: step.color, opacity: 0.04, lineHeight: 1, userSelect: "none" as const, letterSpacing: "-0.05em" }}>{step.num}</div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ marginBottom: 24 }}>
                    <img src={asset(step.logo)} alt={step.tag} style={{ height: 40, width: "auto", objectFit: "contain", maxWidth: 160, marginBottom: 16, display: "block" }} />
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `rgba(${step.rgb},0.12)`, border: `1px solid rgba(${step.rgb},0.28)`, borderRadius: 5, padding: "4px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: step.color }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: step.color, display: "inline-block" }} />{step.tagline}
                    </div>
                  </div>
                  <h2 style={{ fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, margin: "0 0 18px", letterSpacing: "-0.01em" }}>{step.title}</h2>
                  <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.58)", lineHeight: 1.75, margin: "0 0 32px" }}>{step.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {step.bullets.map(b => (
                      <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                        <div style={{ width: 26, height: 26, borderRadius: 7, background: `rgba(${step.rgb},0.14)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span style={{ fontSize: 14.5, color: "rgba(255,255,255,0.80)", lineHeight: 1.55 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 1, background: `rgba(${step.rgb},0.18)` }} />
                    <span style={{ fontSize: 11, color: step.color, fontWeight: 800, letterSpacing: "0.1em" }}>feeds into {step.nextTag} &rarr;</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: "80px 60px", background: `rgba(${step.rgb},0.03)`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <img src={step.photo} alt={step.photoAlt} style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 16, marginBottom: 24, display: "block", boxShadow: `0 16px 48px rgba(${step.rgb},0.15)` }} />
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {step.chips.map(chip => (
                    <div key={chip} style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)", border: `1px solid rgba(${step.rgb},0.28)`, borderRadius: 20, padding: "8px 18px", fontSize: 13, fontWeight: 700, color: step.color }}>{chip}</div>
                  ))}
                </div>
              </div>
            </div>
          ); })()}
        </div>
      </section>

      {/* STEP 2: DRAYCHAIN light */}
      <section style={{ background: "#f8f9fc", padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {(() => { const step = STEPS[1]; return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }} className="how-step-card">
              <div style={{ padding: "80px 60px", background: `rgba(${step.rgb},0.04)`, display: "flex", flexDirection: "column", justifyContent: "center", borderRight: `1px solid rgba(${step.rgb},0.12)` }}>
                <img src={step.photo} alt={step.photoAlt} style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 16, marginBottom: 24, display: "block", boxShadow: `0 12px 40px rgba(${step.rgb},0.12)` }} />
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {step.chips.map(chip => (
                    <div key={chip} style={{ background: "#fff", border: `1px solid rgba(${step.rgb},0.28)`, borderRadius: 20, padding: "8px 18px", fontSize: 13, fontWeight: 700, color: step.color }}>{chip}</div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "80px 60px", background: "#fff", position: "relative" }}>
                <div style={{ position: "absolute", right: 60, top: 60, fontSize: 140, fontWeight: 900, color: step.color, opacity: 0.04, lineHeight: 1, userSelect: "none" as const, letterSpacing: "-0.05em" }}>{step.num}</div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ marginBottom: 24 }}>
                    <img src={asset(step.logo)} alt={step.tag} style={{ height: 40, width: "auto", objectFit: "contain", maxWidth: 160, marginBottom: 16, display: "block" }} />
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `rgba(${step.rgb},0.10)`, border: `1px solid rgba(${step.rgb},0.25)`, borderRadius: 5, padding: "4px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: step.color }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: step.color, display: "inline-block" }} />{step.tagline}
                    </div>
                  </div>
                  <h2 style={{ fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 900, color: "#0a1628", lineHeight: 1.15, margin: "0 0 18px", letterSpacing: "-0.01em" }}>{step.title}</h2>
                  <p style={{ fontSize: 15.5, color: "#4a5568", lineHeight: 1.75, margin: "0 0 32px" }}>{step.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {step.bullets.map(b => (
                      <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                        <div style={{ width: 26, height: 26, borderRadius: 7, background: `rgba(${step.rgb},0.12)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span style={{ fontSize: 14.5, color: "#1e293b", lineHeight: 1.55 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 1, background: `rgba(${step.rgb},0.18)` }} />
                    <span style={{ fontSize: 11, color: step.color, fontWeight: 800, letterSpacing: "0.1em" }}>feeds into {step.nextTag} &rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          ); })()}
        </div>
      </section>

      {/* STEP 3: DRAYPAY dark */}
      <section style={{ background: "#060d1a", padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {(() => { const step = STEPS[2]; return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }} className="how-step-card">
              <div style={{ padding: "80px 60px", borderRight: `1px solid rgba(${step.rgb},0.12)`, position: "relative" }}>
                <div style={{ position: "absolute", left: 60, top: 60, fontSize: 140, fontWeight: 900, color: step.color, opacity: 0.04, lineHeight: 1, userSelect: "none" as const, letterSpacing: "-0.05em" }}>{step.num}</div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ marginBottom: 24 }}>
                    <img src={asset(step.logo)} alt={step.tag} style={{ height: 40, width: "auto", objectFit: "contain", maxWidth: 160, marginBottom: 16, display: "block" }} />
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `rgba(${step.rgb},0.12)`, border: `1px solid rgba(${step.rgb},0.28)`, borderRadius: 5, padding: "4px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: step.color }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: step.color, display: "inline-block" }} />{step.tagline}
                    </div>
                  </div>
                  <h2 style={{ fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, margin: "0 0 18px", letterSpacing: "-0.01em" }}>{step.title}</h2>
                  <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.58)", lineHeight: 1.75, margin: "0 0 32px" }}>{step.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {step.bullets.map(b => (
                      <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                        <div style={{ width: 26, height: 26, borderRadius: 7, background: `rgba(${step.rgb},0.14)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span style={{ fontSize: 14.5, color: "rgba(255,255,255,0.80)", lineHeight: 1.55 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ padding: "80px 60px", background: `rgba(${step.rgb},0.03)`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <img src={step.photo} alt={step.photoAlt} style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 16, marginBottom: 24, display: "block", boxShadow: `0 16px 48px rgba(${step.rgb},0.12)` }} />
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {step.chips.map(chip => (
                    <div key={chip} style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)", border: `1px solid rgba(${step.rgb},0.28)`, borderRadius: 20, padding: "8px 18px", fontSize: 13, fontWeight: 700, color: step.color }}>{chip}</div>
                  ))}
                </div>
              </div>
            </div>
          ); })()}
        </div>
      </section>

      {/* WHY DIFFERENT light */}
      <section style={{ background: "#f8f9fc", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.09)", border: "1px solid rgba(252,11,5,0.25)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              Why it&apos;s different
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, color: "#0a1628", lineHeight: 1.05, margin: "0 0 16px", letterSpacing: "-0.02em" }}>Not just another TMS.</h2>
            <p style={{ color: "#4a5568", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>Most TMS platforms stop at visibility. That is where 45-day cycles, disputed invoices, and lost paperwork come from.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }} className="diff-grid">
            {DIFFS.map(col => (
              <div key={col.label} style={{ background: col.bad ? "#f4f6f9" : "#fff", border: col.bad ? "1px solid #e2e8f0" : "2px solid rgba(252,11,5,0.22)", borderRadius: 18, padding: "36px 36px", boxShadow: col.bad ? "none" : "0 4px 24px rgba(252,11,5,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: col.bad ? "#e5e7eb" : "rgba(252,11,5,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {col.bad
                      ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    }
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 800, color: col.bad ? "#9ca3af" : "#fc0b05", textTransform: "uppercase" as const, letterSpacing: "0.12em" }}>{col.label}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {col.items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: col.bad ? "#f3f4f6" : "rgba(252,11,5,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {col.bad
                          ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        }
                      </div>
                      <span style={{ fontSize: 14, color: col.bad ? "#9ca3af" : "#0a1628", lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1.5px solid rgba(99,91,255,0.28)", borderRadius: 18, padding: "36px 40px", boxShadow: "0 4px 24px rgba(99,91,255,0.08)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(99,91,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#0a1628", marginBottom: 10 }}>The hard-to-copy part</div>
                <p style={{ fontSize: 14.5, color: "#4a5568", margin: "0 0 20px", lineHeight: 1.7 }}>By making the blockchain layer the single source of truth for both the operational record and the trigger for payment, we collapse &ldquo;did this happen&rdquo; and &ldquo;did we get paid for it&rdquo; into the same event. A competitor would need to rebuild fintech rails and a blockchain layer underneath their TMS.</p>
                <a href="/#load-board" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fc0b05", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 8, padding: "12px 24px", textDecoration: "none" }}>
                  Get Started
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA dark photo */}
      <section style={{ position: "relative", overflow: "hidden", padding: "130px 24px" }}>
        <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(6,13,26,0.88)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px", zIndex: 2 }} />
        <div style={{ position: "relative", zIndex: 3, maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 28 }}>
            Ready to move freight smarter?
          </div>
          <h2 style={{ fontSize: "clamp(34px,5vw,64px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 18px", letterSpacing: "-0.02em" }}>
            Start moving freight<br />the intelligent way.
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: "0 0 48px" }}>Zero setup fees. No long-term contract. Get your first shipment moving in minutes.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/#load-board" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fc0b05", color: "#fff", fontWeight: 700, fontSize: 16, borderRadius: 10, padding: "18px 36px", textDecoration: "none", boxShadow: "0 8px 32px rgba(252,11,5,0.35)" }}>
              Get Started Free
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", fontWeight: 700, fontSize: 16, borderRadius: 10, padding: "18px 36px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.30)" }}>
              View Pricing
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .how-step-card { grid-template-columns: 1fr !important; }
          .diff-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </>
  );
}
