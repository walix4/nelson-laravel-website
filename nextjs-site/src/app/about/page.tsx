"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const PILLARS = [
  {
    color: "#635bff", rgb: "99,91,255", label: "Draygo", num: "01",
    sub: "AI dispatch & TMS",
    desc: "AI handles dispatching, pricing, and compliance decisions in real time. Every action generates a tamper-proof data event that flows directly into DrayChain.",
    bullets: ["Instant rate quotes", "AI dispatch assignment", "Compliance automation", "Real-time data events"],
  },
  {
    color: "#27b30a", rgb: "39,179,10", label: "DrayChain", num: "02",
    sub: "Blockchain proof layer",
    desc: "Every event is hashed and written to the blockchain immediately — creating verifiable, immutable records. Smart contracts check milestone conditions for payment release.",
    bullets: ["Tamper-proof BOL & invoices", "Smart contract triggers", "ISF filing records", "Single source of truth"],
  },
  {
    color: "#00a5e7", rgb: "0,165,231", label: "DrayPay", num: "03",
    sub: "Instant settlement",
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

const EXTRA_ITEMS = [
  "Fuel, toll, and operational expense management",
  "Digital Bill of Lading workflows",
  "Demurrage & Per Diem optimization",
  "Real-time container visibility",
  "Reduced admin costs & manual processing",
];

const MISSION_CARDS = [
  { color: "#fc0b05", icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>', title: "AI First", desc: "Every decision powered by real-time AI" },
  { color: "#635bff", icon: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>', title: "Blockchain Trust", desc: "Immutable records for every transaction" },
  { color: "#27b30a", icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>', title: "Instant Pay", desc: "Funds move when milestones are confirmed" },
  { color: "#00a5e7", icon: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>', title: "Global Scale", desc: "Built for every major US port and beyond" },
];

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* ── HERO (DARK) ───────────────────────────────────────────────────── */}
      <section style={{
        background: "#060d1a",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}>
        <div style={{ position: "absolute", left: "-5%", top: "10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(252,11,5,0.10), transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "-8%", top: "30%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,91,255,0.09), transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "40%", bottom: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,165,231,0.07), transparent 65%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 24px 80px", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 32 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
            About DrayGo
          </div>

          <h1 style={{ fontSize: "clamp(52px,7vw,88px)", fontWeight: 900, lineHeight: 1.02, margin: "0 0 32px", letterSpacing: "-0.02em" }}>
            <span style={{ color: "#fff", display: "block" }}>The intelligent</span>
            <span style={{ color: "#fc0b05", display: "block" }}>drayage platform.</span>
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 900, marginBottom: 72 }} className="hero-copy-grid">
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, margin: 0 }}>
              Draygo combines artificial intelligence, blockchain infrastructure, smart contracts, digital payments, and operational automation into one intelligent platform — designed for the modern logistics economy.
            </p>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: 0 }}>
              Our mission is to transform how ports, shippers, brokers, carriers, and owner-operators move containers across the world by creating a faster, more transparent, and highly automated drayage ecosystem.
            </p>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 48, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }} className="hero-stats-grid">
            {[
              { val: "500+", label: "Verified Carriers" },
              { val: "24-72h", label: "Payment Settlement" },
              { val: "98.4%", label: "On-Time Rate" },
              { val: "$0", label: "Setup Fees" },
            ].map((s, i) => (
              <div key={s.label} style={{ paddingLeft: i === 0 ? 0 : 32, borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 10, textTransform: "uppercase" as const, letterSpacing: "0.12em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION (LIGHT) ──────────────────────────────────────────────── */}
      <section style={{ background: "#f8f9fc", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="mission-grid">
          {/* left: photo */}
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=80"
              alt="Container port"
              style={{ width: "100%", height: 500, objectFit: "cover", borderRadius: 16, boxShadow: "0 12px 48px rgba(10,22,40,0.14)", display: "block" }}
            />
            <div style={{ position: "absolute", bottom: 24, left: 24, background: "rgba(10,22,40,0.82)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "12px 18px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1 }}>500+</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 4, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Verified Carriers</div>
            </div>
          </div>

          {/* right: text + mission cards */}
          <div>
            <svg width="56" height="40" viewBox="0 0 56 40" fill="none" style={{ marginBottom: 24 }}>
              <path d="M0 40V24C0 10.745 8.955 3.16 26.865 0L28.56 3.84C20.205 5.76 15.3 10.17 13.845 17.07H22.8V40H0ZM33.2 40V24C33.2 10.745 42.155 3.16 60.065 0L61.76 3.84C53.405 5.76 48.5 10.17 47.045 17.07H56V40H33.2Z" fill="#fc0b05" fillOpacity="0.7"/>
            </svg>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 900, color: "#0a1628", lineHeight: 1.15, margin: "0 0 20px" }}>
              Transforming global drayage.
            </h2>
            <p style={{ fontSize: 16, color: "#4a5568", lineHeight: 1.75, margin: "0 0 16px" }}>
              Most TMS platforms stop at visibility — tracking, dispatching, document storage — and then hand off to a completely separate, disconnected stack for money.
            </p>
            <p style={{ fontSize: 16, color: "#4a5568", lineHeight: 1.75, margin: "0 0 32px" }}>
              Draygo collapses "did this happen" and "did we get paid for it" into the same event. That is the genuinely hard-to-copy part.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {MISSION_CARDS.map(c => (
                <div key={c.title} style={{ background: "#ffffff", border: "1px solid #e8eaf0", borderRadius: 14, padding: "24px 20px", boxShadow: "0 2px 10px rgba(10,22,40,0.05)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `rgba(${c.color === "#fc0b05" ? "252,11,5" : c.color === "#635bff" ? "99,91,255" : c.color === "#27b30a" ? "39,179,10" : "0,165,231"},0.10)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: c.icon }} />
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0a1628", marginBottom: 5 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS (DARK) ──────────────────────────────────────────── */}
      <section style={{ background: "#060d1a", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              One platform. Three layers.
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 14px" }}>Each layer feeds the next.</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>A continuous loop where every output becomes the next input — operations, proof, and payment unified.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="pillars-grid">
            {PILLARS.map((p, i) => (
              <div key={p.label} style={{ background: `linear-gradient(145deg, rgba(${p.rgb},0.18) 0%, rgba(${p.rgb},0.04) 100%)`, border: `1.5px solid rgba(${p.rgb},0.28)`, borderRadius: 20, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: -10, bottom: -20, fontSize: 80, fontWeight: 900, color: p.color, opacity: 0.05, lineHeight: 1, userSelect: "none" as const, whiteSpace: "nowrap" as const }}>{p.label}</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: `rgba(${p.rgb},0.5)`, letterSpacing: "0.14em", marginBottom: 20 }}>{p.num}</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `rgba(${p.rgb},0.14)`, border: `1px solid rgba(${p.rgb},0.3)`, borderRadius: 5, padding: "4px 10px", fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: p.color, marginBottom: 20 }}>
                  {p.label}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 16, letterSpacing: "0.04em" }}>{p.sub}</div>
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 28px" }}>{p.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative", zIndex: 1 }}>
                  {p.bullets.map(b => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{b}</span>
                    </div>
                  ))}
                </div>
                {i < 2 && (
                  <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
                    <div style={{ flex: 1, height: 1, background: `rgba(${p.rgb},0.2)` }} />
                    <span style={{ fontSize: 11, color: `rgba(${p.rgb},0.6)`, fontWeight: 700 }}>feeds into {PILLARS[i + 1].label} →</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DRAYPAY FINANCIAL (LIGHT) ─────────────────────────────────────── */}
      <section style={{ background: "#f8f9fc", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="draypay-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,165,231,0.10)", border: "1px solid rgba(0,165,231,0.30)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#0090cc", marginBottom: 28 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00a5e7", display: "inline-block" }} />
              DrayPay Financial Infrastructure
            </div>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 900, color: "#0a1628", lineHeight: 1.1, margin: "0 0 24px" }}>
              A new generation of financial infrastructure for logistics.
            </h2>
            <p style={{ fontSize: 15.5, color: "#4a5568", lineHeight: 1.8, margin: "0 0 18px" }}>
              Integrated with the <strong style={{ color: "#0a1628" }}>DrayPay Digital Hash Wallet</strong> and <strong style={{ color: "#0a1628" }}>DrayPay Debit Card</strong>, Draygo lets shippers, brokers, carriers, and drivers instantly manage transportation expenses — fuel, tolls, chassis, parking, maintenance, and more.
            </p>
            <p style={{ fontSize: 15.5, color: "#4a5568", lineHeight: 1.8, margin: "0 0 40px" }}>
              Smart contracts automatically execute predefined payment terms, release funds based on milestones, reduce disputes, accelerate settlements, and improve trust across the entire transportation chain.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { val: "24-72h", label: "Payment Settlement", color: "#00a5e7" },
                { val: "500+", label: "Verified Carriers", color: "#00a5e7" },
                { val: "$0", label: "Factoring Fees", color: "#27b30a" },
                { val: "100%", label: "Blockchain Secured", color: "#635bff" },
              ].map(s => (
                <div key={s.label} style={{ background: "#ffffff", border: "1px solid #e8eaf0", borderTop: `3px solid ${s.color}`, borderRadius: 14, padding: "28px 22px", textAlign: "center", boxShadow: "0 2px 10px rgba(10,22,40,0.05)" }}>
                  <div style={{ fontSize: 42, fontWeight: 900, color: "#0a1628", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 10, textTransform: "uppercase" as const, letterSpacing: "0.12em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* right: payment photo */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80"
              alt="Payment infrastructure"
              style={{ width: "100%", height: 460, objectFit: "cover", borderRadius: 16, boxShadow: "0 12px 48px rgba(10,22,40,0.12)", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* ── WHY DIFFERENT (DARK) ─────────────────────────────────────────── */}
      <section style={{ background: "#08192b", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              Why Draygo is Different
            </div>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>Built different from the ground up.</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>Every capability was designed to eliminate the friction that costs drayage operations time and money.</p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, overflow: "hidden", marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ padding: "18px 32px", fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, letterSpacing: "0.12em", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
                Old TMS Platforms
              </div>
              <div style={{ padding: "18px 32px", fontSize: 12, fontWeight: 800, color: "#27b30a", textTransform: "uppercase" as const, letterSpacing: "0.12em" }}>
                DrayGo
              </div>
            </div>
            {COMPARE_ROWS.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: i % 2 === 1 ? "rgba(255,255,255,0.02)" : "transparent", borderBottom: i < COMPARE_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div style={{ padding: "18px 32px", display: "flex", alignItems: "center", gap: 12, borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(252,11,5,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(252,11,5,0.6)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </div>
                  <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.38)" }}>{row.old}</span>
                </div>
                <div style={{ padding: "18px 32px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(39,179,10,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.85)" }}>{row.neo}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {EXTRA_ITEMS.map(item => (
              <div key={item} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.07)", border: "1px solid rgba(252,11,5,0.18)", borderRadius: 6, padding: "7px 14px" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA (PHOTO DARK) ──────────────────────────────────────── */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        padding: "120px 24px",
        backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,22,40,0.82)", zIndex: 0 }} />
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "clamp(24px,4vw,44px)", fontWeight: 900, color: "#fff", lineHeight: 1.2, margin: "0 0 16px", letterSpacing: "-0.01em" }}>
            Draygo is more than a TMS.
          </p>
          <p style={{ fontSize: "clamp(16px,2.5vw,22px)", fontWeight: 600, color: "rgba(255,255,255,0.7)", lineHeight: 1.4, margin: "0 0 48px" }}>
            It is an <span style={{ color: "#fc0b05" }}>intelligent financial and operational infrastructure</span> designed to power the future of global drayage.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/#load-board" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fc0b05", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 8, padding: "16px 32px", textDecoration: "none" }}>
              Get Started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <a href="/how-it-works" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 8, padding: "16px 32px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.35)" }}>
              How It Works
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-copy-grid { grid-template-columns: 1fr !important; }
          .hero-stats-grid { grid-template-columns: repeat(2,1fr) !important; gap: 24px !important; }
          .mission-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
          .draypay-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 480px) {
          .hero-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      <Footer />
    </>
  );
}
