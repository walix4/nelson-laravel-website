"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { asset } from "@/lib/site";

const PILLARS = [
  {
    color: "#fc0b05", rgb: "252,11,5", label: "Draygo", num: "01",
    logo: "/logo-draygo-white.png",
    sub: "AI dispatch & TMS",
    role: "The Brain",
    desc: "AI handles dispatching, pricing, and compliance decisions in real time. Every action generates a tamper-proof data event that flows directly into DrayChain.",
    bullets: ["Instant rate quotes", "AI dispatch assignment", "Compliance automation", "Real-time data events"],
  },
  {
    color: "#3b82f6", rgb: "59,130,246", label: "DrayChain", num: "02",
    logo: "/logo-draychain.png",
    sub: "Blockchain proof layer",
    role: "The Proof",
    desc: "Every event is hashed and written to the blockchain immediately — creating verifiable, immutable records. Smart contracts check milestone conditions for payment release.",
    bullets: ["Tamper-proof BOL & invoices", "Smart contract triggers", "ISF filing records", "Single source of truth"],
  },
  {
    color: "#00a5e7", rgb: "0,165,231", label: "DrayPay", num: "03",
    logo: "/logo-draypay.png",
    sub: "Instant settlement",
    role: "The Money",
    desc: "The moment a smart contract confirms a milestone, funds move automatically. Wallet-based debit cards give drivers instant access to earned funds — no factoring, no delays.",
    bullets: ["24-72h bank deposit", "DrayPay Digital Wallet", "Debit card at pump", "Zero factoring fees"],
  },
];

const COMPARE_ROWS = [
  { old: "Stop at visibility only", neo: "Operations + blockchain + payments unified" },
  { old: "Separate disconnected payment stack", neo: "Smart contracts trigger payment automatically" },
  { old: "45-day payment cycles", neo: "24-72 hour guaranteed settlement" },
  { old: "Disputed invoices & lost paperwork", neo: "Tamper-proof blockchain records eliminate disputes" },
  { old: "Manual reconciliation across 4+ systems", neo: "Single source of truth for operations and payment" },
  { old: "Fraud from duplicated documents", neo: "Verified, immutable history on every transaction" },
];

const VALUES = [
  { icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>', title: "Speed above all", desc: "Quotes in under 30 seconds. Payment in 24-72 hours. Every delay costs someone money.", color: "#fc0b05", rgb: "252,11,5" },
  { icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', title: "Trust by default", desc: "Blockchain-verified records mean no disputed invoices. Every action is immutable.", color: "#1a6ed4", rgb: "26,110,212" },
  { icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>', title: "Fair pay, always", desc: "Carriers shouldn't wait 45 days. DrayPay makes fair pay automatic, not a negotiation.", color: "#00a5e7", rgb: "0,165,231" },
  { icon: '<circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>', title: "Full transparency", desc: "Shippers see real rates. Carriers see real loads. Brokers see real margins. No black boxes.", color: "#4ADE80", rgb: "74,222,128" },
  { icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', title: "AI that learns", desc: "Every move makes the platform smarter. Pricing improves. Dispatch gets faster.", color: "#f59e0b", rgb: "245,158,11" },
  { icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>', title: "Everyone wins", desc: "The loop only works when shippers, carriers, and brokers all benefit. We designed for that.", color: "#a78bfa", rgb: "167,139,250" },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* ── HERO — video bg ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "#06101e", paddingBottom: 0 }}>
        <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
          <source src={asset("/hero-bg.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(6,13,26,0.88) 0%,rgba(8,25,43,0.78) 60%,rgba(0,0,0,0.65) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: "-5%", top: "15%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(252,11,5,0.13),transparent 65%)" }} />
          <div style={{ position: "absolute", right: "5%", bottom: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,91,255,0.10),transparent 65%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 3, maxWidth: 1100, margin: "0 auto", padding: "clamp(120px,15vh,160px) 24px clamp(80px,10vh,120px)", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.40)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 36 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
            About DrayGo
          </div>

          <h1 style={{ fontSize: "clamp(52px,7vw,96px)", fontWeight: 900, lineHeight: 1.0, margin: "0 0 32px", letterSpacing: "-0.03em" }}>
            <span style={{ color: "#fff", display: "block" }}>We&apos;re rebuilding</span>
            <span style={{ background: "linear-gradient(90deg,#fc0b05,#ff6b35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "block" }}>freight logistics.</span>
            <span style={{ color: "rgba(255,255,255,0.55)", display: "block", fontWeight: 700 }}>From scratch.</span>
          </h1>

          <p style={{ fontSize: 19, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 600, margin: 0 }}>
            Draygo combines AI, blockchain, smart contracts, and instant payments into one platform — eliminating the 45-day cycles and disputed invoices that have plagued drayage for decades.
          </p>
        </div>

        {/* stats bar */}
        <div style={{ position: "relative", zIndex: 4, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.10)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }} className="hero-stats-grid">
            {[
              { val: "3", label: "Products" },
              { val: "500+", label: "Carriers" },
              { val: "$0", label: "VC funding" },
              { val: "2024", label: "Founded" },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: "28px 0", paddingLeft: i === 0 ? 0 : 32, borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.val}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 8, textTransform: "uppercase" as const, letterSpacing: "0.14em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION — dark ─────────────────────────────────────────────── */}
      <section style={{ background: "#08192b", padding: "120px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="two-col">
          {/* CSS metrics visual */}
          <div className="reveal" style={{ position: "relative" }}>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: 32, backdropFilter: "blur(12px)" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.35)", marginBottom: 24 }}>Platform Activity · Live</div>
              <div style={{ fontSize: "clamp(48px,6vw,80px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8 }}>$2.4B+</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 32 }}>Drayage value moved through DrayGo</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                {[
                  { val: "40+", label: "US Sea Ports" },
                  { val: "500+", label: "Verified Carriers" },
                  { val: "24h", label: "Avg Payment Time" },
                  { val: "4.8★", label: "App Store Rating" },
                ].map(s => (
                  <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "16px 20px" }}>
                    <div style={{ fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 900, color: "#fc0b05", letterSpacing: "-0.02em" }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Loads processed today</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#fc0b05" }}>1,248</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: "68%", background: "linear-gradient(90deg,#fc0b05,#ff5530)", borderRadius: 3 }} />
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", bottom: -20, right: -20, background: "#fc0b05", borderRadius: 14, padding: "16px 20px", boxShadow: "0 12px 40px rgba(252,11,5,0.35)", minWidth: 160 }}>
              <div style={{ fontSize: 9, letterSpacing: "0.14em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" as const, marginBottom: 6 }}>On-Time Rate</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>96.2%</div>
            </div>
          </div>

          {/* text side */}
          <div className="reveal">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.08)", border: "1px solid rgba(252,11,5,0.22)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 24 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              Mission
            </div>
            <div style={{ fontSize: 120, lineHeight: 0.75, color: "rgba(252,11,5,0.18)", fontWeight: 900, marginBottom: 12, userSelect: "none" as const }}>&ldquo;</div>
            <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, margin: "0 0 20px" }}>
              Drayage moves 90% of US port cargo. We&apos;re making it work for everyone in the chain.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.62)", lineHeight: 1.8, margin: "0 0 16px" }}>
              Most TMS platforms stop at visibility — tracking, dispatching, document storage — then hand off to a completely separate, disconnected stack for money. That gap costs carriers 45 days and costs shippers trust.
            </p>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.62)", lineHeight: 1.8, margin: "0 0 32px" }}>
              Draygo collapses &ldquo;did this happen&rdquo; and &ldquo;did we get paid for it&rdquo; into the same event. AI, blockchain, and instant payments in one loop. That&apos;s genuinely hard to copy.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Instant", "Transparent", "Fair Pay"].map(tag => (
                <div key={tag} style={{ background: "rgba(99,91,255,0.14)", borderRadius: 20, padding: "7px 16px", fontSize: 13, fontWeight: 700, color: "#a5b4fc" }}>{tag}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE PRODUCTS — dark ─────────────────────────────────────── */}
      <section style={{ background: "#060d1a", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              The Ecosystem
            </div>
            <h2 style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
              Three layers. One loop.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>A continuous cycle — each layer&apos;s output becomes the next layer&apos;s input.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="pillars-grid">
            {PILLARS.map((p, i) => (
              <div key={p.label} className="reveal" style={{ background: `rgba(${p.rgb},0.07)`, border: `1.5px solid rgba(${p.rgb},0.28)`, borderRadius: 22, padding: "40px 36px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "absolute", right: -8, bottom: -16, fontSize: 72, fontWeight: 900, color: p.color, opacity: 0.04, lineHeight: 1, userSelect: "none" as const, whiteSpace: "nowrap" as const }}>{p.role}</div>
                <div style={{ marginBottom: 20 }}>
                  <img src={asset(p.logo)} alt={p.label} style={{ height: 36, width: "auto", objectFit: "contain", maxWidth: 140 }} />
                </div>
                <div style={{ height: 1, background: `rgba(${p.rgb},0.18)`, marginBottom: 20 }} />
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `rgba(${p.rgb},0.14)`, border: `1px solid rgba(${p.rgb},0.28)`, borderRadius: 5, padding: "4px 10px", fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: p.color, marginBottom: 18, alignSelf: "flex-start" }}>
                  {p.sub}
                </div>
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: "0 0 24px", flex: 1 }}>{p.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative", zIndex: 1 }}>
                  {p.bullets.map(b => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid rgba(${p.rgb},0.15)`, paddingTop: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, boxShadow: `0 0 0 3px rgba(${p.rgb},0.25)` }} />
                  <span style={{ fontSize: 11, fontWeight: 800, color: p.color, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{p.role}</span>
                  {i < 2 && <span style={{ marginLeft: "auto", fontSize: 11, color: `rgba(${p.rgb},0.6)`, fontWeight: 700 }}>feeds into {PILLARS[i + 1].label} →</span>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36, textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em" }}>
            ↺ verified history feeds back into DrayGo AI — improving pricing &amp; dispatch over time
          </div>
        </div>
      </section>

      {/* ── VALUES / PRINCIPLES ───────────────────────────────────────── */}
      <section style={{ background: "#08192b", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              Our Principles
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.02em" }}>Built different. On purpose.</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>Six principles that guide every product decision.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="values-grid">
            {VALUES.map(v => (
              <div key={v.title} className="reveal" style={{ background: `rgba(${v.rgb},0.07)`, border: `1px solid rgba(${v.rgb},0.2)`, borderRadius: 16, padding: "28px 24px" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(${v.rgb},0.14)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={v.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: v.icon }} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{v.title}</div>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.52)", lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY DIFFERENT — dark ─────────────────────────────────────── */}
      <section style={{ background: "#08192b", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              Why Different
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.02em" }}>Not just another TMS.</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>Every capability was designed to eliminate the friction that costs drayage operations time and money.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }} className="two-col">
            {/* Old column */}
            <div className="reveal" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(252,11,5,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(252,11,5,0.5)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <span style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.30)", textTransform: "uppercase" as const, letterSpacing: "0.12em" }}>Old TMS Platforms</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {COMPARE_ROWS.map(row => (
                  <div key={row.old} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, background: "rgba(252,11,5,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(252,11,5,0.45)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </div>
                    <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.33)" }}>{row.old}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* DrayGo column */}
            <div className="reveal" style={{ background: "rgba(252,11,5,0.05)", border: "1.5px solid rgba(252,11,5,0.22)", borderRadius: 16, padding: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(39,179,10,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#27b30a", textTransform: "uppercase" as const, letterSpacing: "0.12em" }}>DrayGo Ecosystem</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {COMPARE_ROWS.map(row => (
                  <div key={row.neo} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, background: "rgba(39,179,10,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.85)" }}>{row.neo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hard to copy card */}
          <div className="reveal" style={{ background: "rgba(99,91,255,0.07)", border: "1.5px solid rgba(99,91,255,0.28)", borderRadius: 16, padding: "36px 40px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(99,91,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#635bff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 10 }}>Our moat isn&apos;t a feature. It&apos;s the loop.</div>
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.7, maxWidth: 720 }}>
                  As more freight moves through DrayGo → DrayChain → DrayPay, the AI gets smarter, the blockchain gets deeper, and switching cost goes up. A competitor would need to rebuild fintech rails and a blockchain layer underneath their TMS — not just add a dashboard feature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DRAYPAY — dark ───────────────────────────────────────────── */}
      <section style={{ background: "#060d1a", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="two-col">
          <div className="reveal">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,165,231,0.10)", border: "1px solid rgba(0,165,231,0.28)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#0090cc", marginBottom: 20 }}>
              <img src={asset("/logo-draypay.png")} alt="DrayPay" style={{ height: 18, width: "auto" }} />
            </div>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
              Carriers get paid in 24–72 hours.<br />
              <span style={{ color: "#00a5e7" }}>Not 45 days.</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "0 0 36px" }}>
              Smart contracts automatically execute predefined payment terms, release funds based on verified milestones, and give every driver instant access to earned money — at the pump, not the bank.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 36 }}>
              {[
                { icon: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>', label: "Instant payouts", desc: "Funds move the moment milestone conditions are met" },
                { icon: '<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>', label: "Zero factoring", desc: "No third-party cash advance — earn what you earned" },
                { icon: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>', label: "DrayPay debit card", desc: "Wallet-based card for fuel, per diem, expenses" },
                { icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', label: "Fuel access", desc: "Pay at the pump instantly — no cash advance needed" },
              ].map(f => (
                <div key={f.label} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(0,165,231,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00a5e7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: f.icon }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{f.label}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CSS payment visual */}
          <div className="reveal" style={{ position: "relative" }}>
            <div style={{ background: "rgba(0,165,231,0.07)", border: "1px solid rgba(0,165,231,0.18)", borderRadius: 20, padding: 32 }}>
              <div style={{ background: "linear-gradient(135deg,#006fa8,#00a5e7)", borderRadius: 16, padding: "24px 28px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                <div style={{ fontSize: 9, letterSpacing: "0.16em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" as const, marginBottom: 12 }}>DrayPay Digital Wallet</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>$4,290.00</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Available · Instant access</div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>Recent Payments</div>
              {[
                { id: "SH-4821", route: "APM → Ontario", amt: "+$1,850", time: "2h ago", done: true },
                { id: "SH-4820", route: "Bayport → Pasadena", amt: "+$1,100", time: "8h ago", done: true },
                { id: "SH-4819", route: "Garden City → Atlanta", amt: "+$2,200", time: "Yesterday", done: true },
                { id: "SH-4822", route: "Maher → Newark", amt: "+$650", time: "Pending", done: false },
              ].map(tx => (
                <div key={tx.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{tx.id}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{tx.route}</div>
                  </div>
                  <div style={{ textAlign: "right" as const }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: tx.done ? "#00a5e7" : "rgba(255,255,255,0.35)" }}>{tx.amt}</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{tx.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", top: -16, right: -16, background: "#27b30a", borderRadius: 12, padding: "12px 16px", boxShadow: "0 8px 24px rgba(39,179,10,0.35)" }}>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Avg payout</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>48h</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA — dark gradient ──────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "140px 24px", background: "linear-gradient(160deg,#06101e 0%,#100508 55%,#06101e 100%)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(252,11,5,0.10) 0%, transparent 65%)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "28px 28px", zIndex: 2 }} />
        <div style={{ position: "relative", zIndex: 3, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 28 }}>
            Ready to move?
          </div>
          <h2 style={{ fontSize: "clamp(36px,5vw,68px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
            Join the freight network<br />that actually works.
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: "0 auto 48px", maxWidth: 560 }}>
            Shippers, brokers, and carriers across 30+ US ports are already running on DrayGo. Zero setup fees. No long-term contract.
          </p>
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
        @media(max-width:900px){
          .two-col{grid-template-columns:1fr!important;gap:48px!important;}
          .hero-stats-grid{grid-template-columns:repeat(2,1fr)!important;}
          .pillars-grid{grid-template-columns:1fr!important;}
          .values-grid{grid-template-columns:1fr!important;}
        }
      `}</style>

      <Footer />
    </>
  );
}
