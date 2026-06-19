"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { asset } from "@/lib/site";

const PILLARS = [
  {
    color: "#635bff", rgb: "99,91,255", label: "Draygo", num: "01",
    logo: "/logo-draygo-white.png",
    sub: "AI dispatch & TMS",
    role: "The Brain",
    desc: "AI handles dispatching, pricing, and compliance decisions in real time. Every action generates a tamper-proof data event that flows directly into DrayChain.",
    bullets: ["Instant rate quotes", "AI dispatch assignment", "Compliance automation", "Real-time data events"],
  },
  {
    color: "#27b30a", rgb: "39,179,10", label: "DrayChain", num: "02",
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

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* ── HERO — full-bleed photo ─────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "95vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* photo bg */}
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }}
        />
        {/* dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(6,13,26,0.93) 0%, rgba(8,25,43,0.84) 60%, rgba(0,0,0,0.70) 100%)", zIndex: 1 }} />
        {/* dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "30px 30px", zIndex: 2 }} />
        {/* glow blobs */}
        <div style={{ position: "absolute", left: "-5%", top: "15%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(252,11,5,0.14), transparent 65%)", pointerEvents: "none", zIndex: 2 }} />
        <div style={{ position: "absolute", right: "5%", bottom: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,91,255,0.12), transparent 65%)", pointerEvents: "none", zIndex: 2 }} />

        {/* content */}
        <div style={{ position: "relative", zIndex: 3, maxWidth: 1100, margin: "0 auto", padding: "100px 24px 160px", width: "100%" }}>
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
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.10)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }} className="hero-stats-grid">
            {[
              { val: "3", label: "Products" },
              { val: "500+", label: "Carriers" },
              { val: "$0", label: "VC funding" },
              { val: "2024", label: "Founded" },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: "28px 0", paddingLeft: i === 0 ? 0 : 32, borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)", textAlign: i === 0 ? "left" : "left" }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.val}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 8, textTransform: "uppercase" as const, letterSpacing: "0.14em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION — light with photo ────────────────────────────────── */}
      <section style={{ background: "#f8f9fc", padding: "120px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="two-col">
          {/* photo side */}
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
              alt="Office team"
              style={{ width: "100%", height: 500, objectFit: "cover", borderRadius: 20, boxShadow: "0 32px 80px rgba(10,22,40,0.15)", display: "block" }}
            />
            {/* floating accent card */}
            <div style={{ position: "absolute", bottom: -28, right: -28, background: "#fff", borderRadius: 16, padding: "20px 26px", boxShadow: "0 12px 40px rgba(10,22,40,0.15)", border: "1px solid #e8eaf0", minWidth: 210 }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#94a3b8", marginBottom: 6 }}>Our Mission</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0a1628", lineHeight: 1.45 }}>Transparent pay for every driver. Every time.</div>
            </div>
          </div>

          {/* text side */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.08)", border: "1px solid rgba(252,11,5,0.22)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 24 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              Mission
            </div>
            {/* big quote mark */}
            <div style={{ fontSize: 120, lineHeight: 0.75, color: "rgba(252,11,5,0.18)", fontWeight: 900, marginBottom: 12, userSelect: "none" as const }}>&ldquo;</div>
            <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, color: "#0a1628", lineHeight: 1.15, margin: "0 0 20px" }}>
              Drayage moves 90% of US port cargo. We&apos;re making it work for everyone in the chain.
            </h2>
            <p style={{ fontSize: 16, color: "#4a5568", lineHeight: 1.8, margin: "0 0 16px" }}>
              Most TMS platforms stop at visibility — tracking, dispatching, document storage — then hand off to a completely separate, disconnected stack for money. That gap costs carriers 45 days and costs shippers trust.
            </p>
            <p style={{ fontSize: 16, color: "#4a5568", lineHeight: 1.8, margin: "0 0 32px" }}>
              Draygo collapses &ldquo;did this happen&rdquo; and &ldquo;did we get paid for it&rdquo; into the same event. AI, blockchain, and instant payments in one loop. That&apos;s genuinely hard to copy.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Instant", "Transparent", "Fair Pay"].map(tag => (
                <div key={tag} style={{ background: "#eef2ff", borderRadius: 20, padding: "7px 16px", fontSize: 13, fontWeight: 700, color: "#3730a3" }}>{tag}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE PRODUCTS — dark with logos ─────────────────────────── */}
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
              <div key={p.label} style={{ background: `rgba(${p.rgb},0.07)`, border: `1.5px solid rgba(${p.rgb},0.28)`, borderRadius: 22, padding: "40px 36px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                {/* watermark bg label */}
                <div style={{ position: "absolute", right: -8, bottom: -16, fontSize: 72, fontWeight: 900, color: p.color, opacity: 0.04, lineHeight: 1, userSelect: "none" as const, whiteSpace: "nowrap" as const }}>{p.role}</div>
                {/* logo */}
                <div style={{ marginBottom: 20 }}>
                  <img src={asset(p.logo)} alt={p.label} style={{ height: 36, width: "auto", objectFit: "contain", maxWidth: 140 }} />
                </div>
                {/* divider */}
                <div style={{ height: 1, background: `rgba(${p.rgb},0.18)`, marginBottom: 20 }} />
                {/* tag */}
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
                {/* role label */}
                <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid rgba(${p.rgb},0.15)`, paddingTop: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, boxShadow: `0 0 0 3px rgba(${p.rgb},0.25)` }} />
                  <span style={{ fontSize: 11, fontWeight: 800, color: p.color, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{p.role}</span>
                  {i < 2 && <span style={{ marginLeft: "auto", fontSize: 11, color: `rgba(${p.rgb},0.6)`, fontWeight: 700 }}>feeds into {PILLARS[i + 1].label} →</span>}
                </div>
              </div>
            ))}
          </div>

          {/* feedback loop label */}
          <div style={{ marginTop: 36, textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em" }}>
            ↺ verified history feeds back into DrayGo AI — improving pricing &amp; dispatch over time
          </div>
        </div>
      </section>

      {/* ── DRAYPAY — light with photo ────────────────────────────────── */}
      <section style={{ background: "#f8f9fc", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="two-col">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,165,231,0.10)", border: "1px solid rgba(0,165,231,0.28)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#0090cc", marginBottom: 20 }}>
              <img src={asset("/logo-draypay.png")} alt="DrayPay" style={{ height: 18, width: "auto" }} />
            </div>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 900, color: "#0a1628", lineHeight: 1.1, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
              Carriers get paid in 24–72 hours.<br />
              <span style={{ color: "#00a5e7" }}>Not 45 days.</span>
            </h2>
            <p style={{ fontSize: 16, color: "#4a5568", lineHeight: 1.8, margin: "0 0 36px" }}>
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
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0a1628", marginBottom: 3 }}>{f.label}</div>
                    <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80"
              alt="Payment infrastructure"
              style={{ width: "100%", height: 500, objectFit: "cover", borderRadius: 20, boxShadow: "0 24px 64px rgba(10,22,40,0.15)", display: "block" }}
            />
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
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "32px" }}>
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
            <div style={{ background: "rgba(252,11,5,0.05)", border: "1.5px solid rgba(252,11,5,0.22)", borderRadius: 16, padding: "32px" }}>
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
          <div style={{ background: "rgba(99,91,255,0.07)", border: "1.5px solid rgba(99,91,255,0.28)", borderRadius: 16, padding: "36px 40px" }}>
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

      {/* ── CLOSING CTA — photo dark ─────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "140px 24px" }}>
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(6,13,26,0.88)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px", zIndex: 2 }} />
        <div style={{ position: "relative", zIndex: 3, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#fc0b05", marginBottom: 28 }}>
            Ready to move?
          </div>
          <h2 style={{ fontSize: "clamp(36px,5vw,68px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
            Join the freight network<br />that actually works.
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: "0 0 48px", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
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
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </>
  );
}
