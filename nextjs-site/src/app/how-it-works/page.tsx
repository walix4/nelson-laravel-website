"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { asset } from "@/lib/site";

const STEPS = [
  {
    num: "01",
    tag: "Draygo",
    tagline: "AI dispatch & TMS",
    color: "#fc0b05",
    rgb: "252,11,5",
    logo: "/logo-draygo-white.png",
    role: "The Brain",
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
    color: "#1a6ed4",
    rgb: "26,110,212",
    logo: "/logo-draychain.png",
    logoText: "Drayage Blockchain" as string | undefined,
    role: "The Proof",
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
    logo: "/logo-draypay-white.png",
    role: "The Money",
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
      <RevealInit />

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

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: "#06101e", paddingBottom: 0 }}>
        <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
          <source src={asset("/hero-bg.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "rgba(4,10,20,0.70)", zIndex: 1 }} />
        <div style={{ position: "absolute", zIndex: 2, pointerEvents: "none", inset: 0 }}>
          <div style={{ position: "absolute", top: -100, left: -80, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(252,11,5,0.13) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", top: 0, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,95,192,0.13) 0%, transparent 60%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 3, maxWidth: 960, margin: "0 auto", textAlign: "center", padding: "clamp(110px,13vh,150px) 24px 80px", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.40)", borderRadius: 6, padding: "5px 16px", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 36, animation: "hiw-badge-pulse 2.5s ease-in-out infinite" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block", animation: "hiw-dot-blink 1.2s ease-in-out infinite" }} />
            How It Works
          </div>

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
            <rect x="10" y="10" width="240" height="126" rx="18" fill="rgba(252,11,5,0.10)" stroke="rgba(252,11,5,0.60)" strokeWidth="1.8" style={{ animation: "hiw-card-glow-purple 3s ease-in-out infinite" }} filter="url(#glow-red)" />
            <image href={asset("/logo-draygo-white.png")} x="40" y="30" width="180" height="42" preserveAspectRatio="xMidYMid meet" />
            <text x="130" y="116" textAnchor="middle" fill="rgba(255,255,255,0.50)" fontSize="12" fontFamily="system-ui,sans-serif">AI dispatch &amp; TMS</text>
            <line x1="270" y1="73" x2="308" y2="73" stroke="rgba(252,11,5,0.80)" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#fwd1)" style={{ animation: "hiw-flow 1s linear infinite" }} />
            <rect x="325" y="10" width="240" height="126" rx="18" fill="rgba(26,110,212,0.10)" stroke="rgba(26,110,212,0.60)" strokeWidth="1.8" style={{ animation: "hiw-card-glow-green 3s ease-in-out infinite", animationDelay: "0.8s" }} filter="url(#glow-blue)" />
            <image href={asset("/logo-draychain.png")} x="352" y="30" width="186" height="42" preserveAspectRatio="xMidYMid meet" />
            <text x="445" y="116" textAnchor="middle" fill="rgba(255,255,255,0.50)" fontSize="12" fontFamily="system-ui,sans-serif">Blockchain trust</text>
            <line x1="583" y1="73" x2="622" y2="73" stroke="rgba(26,110,212,0.80)" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#fwd2)" style={{ animation: "hiw-flow 1s linear infinite", animationDelay: "0.4s" }} />
            <rect x="640" y="10" width="240" height="126" rx="18" fill="rgba(0,165,231,0.10)" stroke="rgba(0,165,231,0.60)" strokeWidth="1.8" style={{ animation: "hiw-card-glow-cyan 3s ease-in-out infinite", animationDelay: "1.6s" }} filter="url(#glow-cyan)" />
            <image href={asset("/logo-draypay-white.png")} x="690" y="34" width="140" height="36" preserveAspectRatio="xMidYMid meet" />
            <text x="760" y="116" textAnchor="middle" fill="rgba(255,255,255,0.50)" fontSize="12" fontFamily="system-ui,sans-serif">Instant settlement</text>
            <path d="M 740,158 C 740,222 150,222 150,158" fill="none" stroke="rgba(0,165,231,0.70)" strokeWidth="1.8" strokeDasharray="8 4" style={{ animation: "hiw-flow-back 1.6s linear infinite" }} />
            <polygon points="144,160 150,148 156,160" fill="rgba(0,165,231,0.85)" />
            <text x="445" y="244" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="13" fontFamily="system-ui,sans-serif" fontWeight="600" letterSpacing="0.3">
              ↺ verified history feeds back into Draygo&apos;s AI — improving pricing &amp; dispatch over time
            </text>
          </svg>
        </div>
      </section>

      {/* ── STEP 1: DRAYGO ── */}
      <section style={{ background: "#08192b", padding: "0 24px", position: "relative" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, right: 0, background: "rgba(252,11,5,0.05)", zIndex: 0 }} />
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "rgba(252,11,5,0.35)", transform: "translateX(-50%)", zIndex: 1 }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          {(() => { const step = STEPS[0]; return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }} className="how-step-card">
              <div style={{ padding: "80px 60px" }}>
                <div style={{ marginBottom: 24 }}>
                  <img src={asset(step.logo)} alt={step.tag} style={{ height: 40, width: "auto", objectFit: "contain", maxWidth: 200, marginBottom: 16, display: "block" }} />
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
              <div style={{ padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ background: "rgba(252,11,5,0.06)", border: "1px solid rgba(252,11,5,0.18)", borderRadius: 16, padding: 24, overflow: "hidden" }}>
                    <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "14px 16px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 4, letterSpacing: "0.1em" }}>ACTIVE SHIPMENT</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>SH-2025-4821</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>APM Terminals → Ontario, CA</div>
                      </div>
                      <div style={{ background: "rgba(252,11,5,0.15)", border: "1px solid rgba(252,11,5,0.4)", borderRadius: 6, padding: "4px 10px", fontSize: 10, color: "#fc0b05", fontWeight: 800, animation: "hiw-dot-blink 1.5s ease-in-out infinite" }}>● LIVE</div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.38)" }}>AI Rate Lock</span>
                        <span style={{ fontSize: 20, fontWeight: 900, color: "#fc0b05" }}>$1,850</span>
                      </div>
                      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 12 }}>
                        <div style={{ height: "100%", width: "72%", background: "linear-gradient(90deg,#fc0b05,#ff5530)", borderRadius: 2 }} />
                      </div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 6 }}>Locked in 0.4s · 500+ carriers evaluated</div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(252,11,5,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2" strokeLinecap="round"><path d="M14 18V6H2v12h2"/><path d="M14 8h4l4 4v6h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>Carlos M. · CDL-A · LA/LB</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Insurance verified · MC checked · 4.9★</div>
                      </div>
                      <div style={{ background: "rgba(39,179,10,0.15)", border: "1px solid rgba(39,179,10,0.35)", borderRadius: 5, padding: "3px 8px", fontSize: 10, color: "#27b30a", fontWeight: 700 }}>ASSIGNED</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <div style={{ background: "rgba(252,11,5,0.10)", borderRadius: 5, padding: "5px 12px", fontSize: 11, fontWeight: 700, color: "#fc0b05" }}>AI dispatched</div>
                      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 5, padding: "5px 12px", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>Compliance ✓</div>
                      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 5, padding: "5px 12px", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>GPS live</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {step.chips.map(chip => (
                    <div key={chip} style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)", border: `1px solid rgba(${step.rgb},0.28)`, borderRadius: 6, padding: "7px 16px", fontSize: 13, fontWeight: 700, color: step.color }}>{chip}</div>
                  ))}
                </div>
              </div>
            </div>
          ); })()}
        </div>
      </section>

      {/* ── STEP 2: DRAYCHAIN ── */}
      <section style={{ background: "#060d1a", padding: "0 24px", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, right: "50%", background: "rgba(26,110,212,0.04)", zIndex: 0 }} />
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(26,110,212,0.20)", transform: "translateX(-50%)", zIndex: 1 }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          {(() => { const step = STEPS[1]; return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }} className="how-step-card">
              <div style={{ padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ background: "rgba(26,110,212,0.07)", border: "1px solid rgba(26,110,212,0.18)", borderRadius: 16, padding: 24 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(26,110,212,0.8)", letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: 16 }}>Blockchain Ledger</div>
                    {[
                      { block: "#29,441", hash: "0x4a8f2c91b...3d72", event: "Gate-Out Confirmed", ms: 12 },
                      { block: "#29,442", hash: "0x91c3f8d4a...2b18", event: "BOL Issued & Hashed", ms: 14 },
                      { block: "#29,443", hash: "0x7e129a3f8...c501", event: "POD Scanned · Payment Trigger", ms: 11 },
                    ].map((b) => (
                      <div key={b.block} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(26,110,212,0.15)", borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(26,110,212,0.9)" }}>Block {b.block}</span>
                          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>{b.ms}ms ago</span>
                        </div>
                        <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.28)", marginBottom: 6 }}>{b.hash}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ color: "#1a6ed4" }}>→</span> {b.event}
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(26,110,212,0.08)", borderRadius: 8, border: "1px solid rgba(26,110,212,0.15)" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a6ed4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <span style={{ fontSize: 11, color: "rgba(26,110,212,0.85)", fontWeight: 600 }}>Smart contract: milestone conditions met</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {step.chips.map(chip => (
                    <div key={chip} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(${step.rgb},0.28)`, borderRadius: 6, padding: "7px 16px", fontSize: 13, fontWeight: 700, color: step.color }}>{chip}</div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "80px 60px" }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <img src={asset(step.logo)} alt={step.tag} style={{ height: 36, width: "auto", objectFit: "contain", display: "block" }} />
                    <span style={{ fontWeight: 800, fontSize: 26, color: "#1a6ed4", letterSpacing: "-0.02em", lineHeight: 1 }}>{step.logoText}</span>
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `rgba(${step.rgb},0.10)`, border: `1px solid rgba(${step.rgb},0.25)`, borderRadius: 5, padding: "4px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: step.color }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: step.color, display: "inline-block" }} />{step.tagline}
                  </div>
                </div>
                <h2 style={{ fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, margin: "0 0 18px", letterSpacing: "-0.01em" }}>{step.title}</h2>
                <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.58)", lineHeight: 1.75, margin: "0 0 32px" }}>{step.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {step.bullets.map(b => (
                    <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 7, background: `rgba(${step.rgb},0.12)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
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
          ); })()}
        </div>
      </section>

      {/* ── STEP 3: DRAYPAY ── */}
      <section style={{ background: "#070f1e", padding: "0 24px", position: "relative" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, right: 0, background: "rgba(0,165,231,0.04)", zIndex: 0 }} />
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "rgba(0,165,231,0.25)", transform: "translateX(-50%)", zIndex: 1 }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          {(() => { const step = STEPS[2]; return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }} className="how-step-card">
              <div style={{ padding: "80px 60px" }}>
                <div style={{ marginBottom: 24 }}>
                  <img src={asset(step.logo)} alt={step.tag} style={{ height: 40, width: "auto", objectFit: "contain", maxWidth: 200, marginBottom: 16, display: "block" }} />
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
              <div style={{ padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ background: "rgba(0,165,231,0.06)", border: "1px solid rgba(0,165,231,0.18)", borderRadius: 16, padding: 24 }}>
                    <div style={{ background: "linear-gradient(135deg,#006fa8,#00a5e7)", borderRadius: 14, padding: "20px 24px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                      <div style={{ fontSize: 9, letterSpacing: "0.16em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase" as const, marginBottom: 14 }}>DrayPay Wallet</div>
                      <div style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>$2,840.00</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>Available Balance · Instant access</div>
                    </div>
                    {[
                      { id: "SH-2025-4819", amt: "+$1,680", status: "PAID", color: "#27b30a", bg: "rgba(39,179,10,0.12)" },
                      { id: "SH-2025-4820", amt: "+$2,200", status: "PAID", color: "#27b30a", bg: "rgba(39,179,10,0.12)" },
                      { id: "SH-2025-4821", amt: "+$1,850", status: "IN 48H", color: "#00a5e7", bg: "rgba(0,165,231,0.12)" },
                    ].map(tx => (
                      <div key={tx.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 8, marginBottom: 8 }}>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{tx.id}</div>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>No factoring · No net-30</div>
                        </div>
                        <div style={{ textAlign: "right" as const }}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#00a5e7" }}>{tx.amt}</div>
                          <div style={{ background: tx.bg, borderRadius: 4, padding: "2px 7px", fontSize: 9, color: tx.color, fontWeight: 700, marginTop: 3 }}>{tx.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {step.chips.map(chip => (
                    <div key={chip} style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)", border: `1px solid rgba(${step.rgb},0.28)`, borderRadius: 6, padding: "7px 16px", fontSize: 13, fontWeight: 700, color: step.color }}>{chip}</div>
                  ))}
                </div>
              </div>
            </div>
          ); })()}
        </div>
      </section>

      {/* ── WHY DIFFERENT ── */}
      <section style={{ background: "#06101e", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.09)", border: "1px solid rgba(252,11,5,0.25)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              Why it&apos;s different
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 16px", letterSpacing: "-0.02em" }}>Not just another TMS.</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 540, margin: "0 auto" }}>Most TMS platforms stop at visibility. That is where 45-day cycles, disputed invoices, and lost paperwork come from.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }} className="diff-grid">
            {DIFFS.map(col => (
              <div key={col.label} style={{ background: col.bad ? "rgba(255,255,255,0.03)" : "rgba(252,11,5,0.05)", border: col.bad ? "1px solid rgba(255,255,255,0.08)" : "2px solid rgba(252,11,5,0.22)", borderRadius: 18, padding: "36px 36px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: col.bad ? "rgba(255,255,255,0.06)" : "rgba(252,11,5,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {col.bad
                      ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      : <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    }
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 800, color: col.bad ? "rgba(255,255,255,0.28)" : "#fc0b05", textTransform: "uppercase" as const, letterSpacing: "0.12em" }}>{col.label}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {col.items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: col.bad ? "rgba(255,255,255,0.04)" : "rgba(252,11,5,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {col.bad
                          ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        }
                      </div>
                      <span style={{ fontSize: 14, color: col.bad ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(99,91,255,0.08)", border: "1.5px solid rgba(99,91,255,0.28)", borderRadius: 18, padding: "36px 40px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(99,91,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 10 }}>The hard-to-copy part</div>
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.58)", margin: "0 0 20px", lineHeight: 1.7 }}>By making the blockchain layer the single source of truth for both the operational record and the trigger for payment, we collapse &ldquo;did this happen&rdquo; and &ldquo;did we get paid for it&rdquo; into the same event. A competitor would need to rebuild fintech rails and a blockchain layer underneath their TMS.</p>
                <a href="/#load-board" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fc0b05", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 8, padding: "12px 24px", textDecoration: "none" }}>
                  Get Started
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "130px 24px", background: "linear-gradient(160deg,#06101e 0%,#100508 55%,#06101e 100%)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(252,11,5,0.10) 0%, transparent 65%)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "28px 28px", zIndex: 2 }} />
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
