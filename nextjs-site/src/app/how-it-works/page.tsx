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
    title: "The Brain — AI decides in real time.",
    desc: "Draygo's AI handles dispatching, pricing, and compliance decisions instantly. Every action — a rate quote, a dispatch assignment, a milestone like gate-out confirmed or POD scanned — generates a verified data event that flows to the next layer.",
    bullets: [
      "Instant rate quotes across 500+ carriers",
      "AI dispatch assignment to nearest verified driver",
      "Compliance checks on MC/DOT, insurance, authority",
      "Every action generates a tamper-proof data event",
    ],
    icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',
  },
  {
    num: "02",
    tag: "DrayChain",
    tagline: "Blockchain trust layer",
    color: "#27b30a",
    rgb: "39,179,10",
    title: "The Proof — blockchain records everything.",
    desc: "Every data event from Draygo gets hashed and written to the blockchain layer immediately. The BOL, invoice, ISF filing — whatever document is involved — becomes a verifiable, tamper-proof record. A smart contract automatically checks whether milestone conditions for payment have been met.",
    bullets: [
      "Every milestone hashed to blockchain in real time",
      "BOL, invoice & ISF filing — tamper-proof records",
      "Smart contracts verify payment milestone conditions",
      "Single source of truth — no disputed documents",
    ],
    icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
  },
  {
    num: "03",
    tag: "DrayPay",
    tagline: "Instant settlement",
    color: "#00a5e7",
    rgb: "0,165,231",
    title: "The Money — funds move automatically.",
    desc: "The moment the smart contract confirms a milestone, funds move automatically. No invoice sitting in a queue, no 30/60-day terms, no manual approval chain. Wallet-based debit cards give drivers instant access to earned funds at the pump or for per-diem expenses.",
    bullets: [
      "Payment triggered automatically on milestone confirm",
      "No 30/60-day terms — funds move in 24–72 hours",
      "Wallet-based debit cards for drivers & owner-ops",
      "Instant pump access — no factoring fees",
    ],
    icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
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
    items: ["Operations + blockchain + payments in one loop", "Blockchain is single source of truth", "Smart contract triggers payment automatically", "24–72 hour settlement", "Tamper-proof records eliminate disputes", "Verified history improves AI over time"],
    bad: false,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#060d1a", padding: "100px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* background glow orbs */}
        <div style={{ position: "absolute", left: "15%", top: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,91,255,0.12), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "10%", bottom: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,165,231,0.10), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fc0b05", marginBottom: 24 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
            How It Works
          </div>
          <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 900, color: "#fff", lineHeight: 1.03, margin: "0 0 24px" }}>
            One loop.<br />
            <span style={{ color: "#fc0b05" }}>Three layers.</span><br />
            Zero gaps.
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 56px" }}>
            Draygo, DrayChain, and DrayPay aren't three products bolted together — they're one continuous cycle where each layer's output is the next layer's input.
          </p>

          {/* loop diagram */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
            {[
              { name: "Draygo", sub: "AI dispatch & TMS", color: "#635bff", rgb: "99,91,255" },
              { name: "DrayChain", sub: "Blockchain trust", color: "#27b30a", rgb: "39,179,10" },
              { name: "DrayPay", sub: "Instant settlement", color: "#00a5e7", rgb: "0,165,231" },
            ].map((item, i) => (
              <div key={item.name} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ background: `rgba(${item.rgb},0.10)`, border: `1.5px solid rgba(${item.rgb},0.4)`, borderRadius: 14, padding: "18px 28px", minWidth: 160, textAlign: "center" }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: item.color }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{item.sub}</div>
                </div>
                {i < 2 && (
                  <div style={{ display: "flex", alignItems: "center", padding: "0 12px" }}>
                    <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                      <path d="M0 8h24M20 2l6 6-6 6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>
            ↺ verified history feeds back into Draygo's AI — improving pricing & dispatch over time
          </div>
        </div>
      </section>

      {/* ── STEP 1: DRAYGO (dark) ──────────────────────────────────────── */}
      <section style={{ background: "#08192b", padding: "80px 24px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {(() => { const step = STEPS[0]; return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, background: "rgba(255,255,255,0.03)", border: `1px solid rgba(${step.rgb},0.18)`, borderRadius: 20, overflow: "hidden" }} className="how-step-card">
              <div style={{ padding: "52px 52px", borderRight: `1px solid rgba(${step.rgb},0.12)`, position: "relative" }}>
                <div style={{ position: "absolute", left: 52, top: 52, fontSize: 100, fontWeight: 900, color: `rgba(${step.rgb},0.07)`, lineHeight: 1, userSelect: "none" as const }}>{step.num}</div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `rgba(${step.rgb},0.12)`, border: `1px solid rgba(${step.rgb},0.3)`, borderRadius: 6, padding: "4px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: step.color, marginBottom: 20 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: step.color, display: "inline-block" }} />
                    {step.tag} · {step.tagline}
                  </div>
                  <h2 style={{ fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>{step.title}</h2>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
              <div style={{ padding: "52px 52px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
                {step.bullets.map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `rgba(${step.rgb},0.14)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: 14.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.55 }}>{b}</span>
                  </div>
                ))}
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 1, background: `rgba(${step.rgb},0.2)` }} />
                  <span style={{ fontSize: 11, color: `rgba(${step.rgb},0.7)`, fontWeight: 700, letterSpacing: "0.1em" }}>feeds into {STEPS[1].tag} →</span>
                </div>
              </div>
            </div>
          ); })()}
        </div>
      </section>

      {/* ── STEP 2: DRAYCHAIN (light) ──────────────────────────────────── */}
      <section style={{ background: "#f8f9fc", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {(() => { const step = STEPS[1]; return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, background: "#ffffff", border: `1.5px solid rgba(${step.rgb},0.22)`, borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(10,22,40,0.08)" }} className="how-step-card">
              <div style={{ padding: "52px 52px", borderRight: `1px solid rgba(${step.rgb},0.12)`, position: "relative" }}>
                <div style={{ position: "absolute", left: 52, top: 52, fontSize: 100, fontWeight: 900, color: step.color, opacity: 0.05, lineHeight: 1, userSelect: "none" as const }}>{step.num}</div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `rgba(${step.rgb},0.10)`, border: `1px solid rgba(${step.rgb},0.28)`, borderRadius: 6, padding: "4px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: step.color, marginBottom: 20 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: step.color, display: "inline-block" }} />
                    {step.tag} · {step.tagline}
                  </div>
                  <h2 style={{ fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 800, color: "#0a1628", lineHeight: 1.15, margin: "0 0 16px" }}>{step.title}</h2>
                  <p style={{ fontSize: 15, color: "#4a5568", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
              <div style={{ padding: "52px 52px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
                {step.bullets.map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `rgba(${step.rgb},0.12)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: 14.5, color: "#374151", lineHeight: 1.55 }}>{b}</span>
                  </div>
                ))}
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 1, background: `rgba(${step.rgb},0.18)` }} />
                  <span style={{ fontSize: 11, color: step.color, fontWeight: 700, letterSpacing: "0.1em" }}>feeds into {STEPS[2].tag} →</span>
                </div>
              </div>
            </div>
          ); })()}
        </div>
      </section>

      {/* ── STEP 3: DRAYPAY (dark) ─────────────────────────────────────── */}
      <section style={{ background: "#060d1a", padding: "64px 24px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {(() => { const step = STEPS[2]; return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, background: "rgba(255,255,255,0.03)", border: `1px solid rgba(${step.rgb},0.18)`, borderRadius: 20, overflow: "hidden" }} className="how-step-card">
              <div style={{ padding: "52px 52px", borderRight: `1px solid rgba(${step.rgb},0.12)`, position: "relative" }}>
                <div style={{ position: "absolute", left: 52, top: 52, fontSize: 100, fontWeight: 900, color: `rgba(${step.rgb},0.07)`, lineHeight: 1, userSelect: "none" as const }}>{step.num}</div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `rgba(${step.rgb},0.12)`, border: `1px solid rgba(${step.rgb},0.3)`, borderRadius: 6, padding: "4px 12px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: step.color, marginBottom: 20 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: step.color, display: "inline-block" }} />
                    {step.tag} · {step.tagline}
                  </div>
                  <h2 style={{ fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>{step.title}</h2>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
              <div style={{ padding: "52px 52px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
                {step.bullets.map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `rgba(${step.rgb},0.14)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: 14.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.55 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ); })()}
        </div>
      </section>

      {/* ── WHY DIFFERENT (light) ─────────────────────────────────────── */}
      <section style={{ background: "#f8f9fc", padding: "88px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.10)", border: "1px solid rgba(252,11,5,0.30)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              Why it is different
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#0a1628", lineHeight: 1.05, margin: "0 0 16px" }}>
              The gap is where drayage friction lives.
            </h2>
            <p style={{ color: "#4a5568", fontSize: 16, maxWidth: 560, margin: "0 auto" }}>
              Most TMS platforms stop at visibility, then hand off to a completely separate, disconnected stack for money. That is where 45-day cycles, disputed invoices, and lost paperwork come from.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="diff-grid">
            {DIFFS.map(col => (
              <div key={col.label} style={{
                background: col.bad ? "#ffffff" : "#fff8f8",
                border: col.bad ? "1px solid #e8eaf0" : "1.5px solid rgba(252,11,5,0.22)",
                borderRadius: 18,
                padding: "36px 36px",
                boxShadow: "0 2px 12px rgba(10,22,40,0.05)",
              }}>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: col.bad ? "#9ca3af" : "#fc0b05", marginBottom: 24 }}>{col.label}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {col.items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: col.bad ? "#f3f4f6" : "rgba(252,11,5,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {col.bad
                          ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        }
                      </div>
                      <span style={{ fontSize: 14, color: col.bad ? "#6b7280" : "#0a1628", lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* closing statement */}
          <div style={{ marginTop: 48, background: "#ffffff", border: "1px solid #e0e2f0", borderLeft: "4px solid #635bff", borderRadius: 16, padding: "32px 40px", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 32, boxShadow: "0 2px 16px rgba(10,22,40,0.06)" }} className="closing-cta">
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#0a1628", marginBottom: 8 }}>The hard-to-copy part</div>
              <p style={{ fontSize: 14.5, color: "#4a5568", margin: 0, lineHeight: 1.65 }}>
                By making the blockchain layer the single source of truth for both the operational record and the trigger for payment, we collapse "did this happen" and "did we get paid for it" into the same event. A competitor would need to rebuild fintech rails and a blockchain layer underneath their TMS — not just add a dashboard feature.
              </p>
            </div>
            <a href="/#load-board" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fc0b05", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 8, padding: "14px 24px", textDecoration: "none", whiteSpace: "nowrap" as const, flexShrink: 0 }}>
              Get Started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .how-step-card { grid-template-columns: 1fr !important; }
          .diff-grid { grid-template-columns: 1fr !important; }
          .closing-cta { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </>
  );
}
