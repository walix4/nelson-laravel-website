"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const DIFF_ITEMS = [
  { icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>', text: "AI-driven dispatching and decision intelligence" },
  { icon: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>', text: "Blockchain-secured operational and payment records" },
  { icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/>', text: "Smart contract automation for operations and settlements" },
  { icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>', text: "DrayPay Digital Wallet + Debit Card ecosystem" },
  { icon: '<path d="M14 18V6H2v12h2"/><path d="M14 8h4l4 4v6h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>', text: "Fuel, toll, and operational expense management" },
  { icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>', text: "Digital Bill of Lading and logistics document workflows" },
  { icon: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>', text: "Demurrage and Per Diem monitoring and optimization" },
  { icon: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>', text: "Transparent and auditable logistics operations" },
  { icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>', text: "Real-time container visibility and status updates" },
  { icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>', text: "Reduced administrative costs and manual processing" },
  { icon: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>', text: "Built for global drayage and modern freight ecosystems" },
];

const PILLARS = [
  { color: "#635bff", rgb: "99,91,255", label: "Draygo", sub: "AI brain", desc: "AI handles dispatching, pricing, and compliance in real time. Every action generates a tamper-proof data event flowing to the next layer." },
  { color: "#27b30a", rgb: "39,179,10", label: "DrayChain", sub: "Blockchain proof", desc: "Every event is hashed and written to the blockchain immediately — verifiable, immutable, the single source of truth for every operation." },
  { color: "#00a5e7", rgb: "0,165,231", label: "DrayPay", sub: "Instant settlement", desc: "Smart contracts confirm milestones and trigger automatic payment. Wallet + debit card for instant driver access to earned funds." },
];

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section style={{ background: "#060d1a", padding: "100px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "10%", top: "20%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(252,11,5,0.08), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "5%", bottom: "0%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,91,255,0.07), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fc0b05", marginBottom: 28 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
            About DrayGo
          </div>
          <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: "#fff", lineHeight: 1.04, margin: "0 0 28px" }}>
            The next-generation AI-powered TMS<br />
            <span style={{ color: "#fc0b05" }}>built for worldwide drayage.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 760, margin: "0 0 20px" }}>
            Draygo combines artificial intelligence, blockchain infrastructure, smart contracts, digital payments, and operational automation into one intelligent platform — designed for the modern logistics economy.
          </p>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 760, margin: 0 }}>
            Our mission is to transform how ports, shippers, brokers, carriers, and owner-operators move containers across the world by creating a faster, more transparent, and highly automated drayage ecosystem.
          </p>
        </div>
      </section>

      {/* 3 PILLARS */}
      <section style={{ background: "#08192b", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>One platform. Three layers.</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, maxWidth: 500, margin: "0 auto" }}>At the core of Draygo is a blockchain-powered architecture enabling real-time automation across every layer of drayage.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="pillars-grid">
            {PILLARS.map(p => (
              <div key={p.label} style={{ background: `rgba(${p.rgb},0.06)`, border: `1.5px solid rgba(${p.rgb},0.25)`, borderRadius: 18, padding: "36px 32px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: p.color, marginBottom: 6 }}>{p.label}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 18 }}>{p.sub}</div>
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DRAYPAY BLOCK */}
      <section style={{ background: "#060d1a", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="mission-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,165,231,0.12)", border: "1px solid rgba(0,165,231,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00a5e7", marginBottom: 24 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00a5e7", display: "inline-block" }} />
              DrayPay
            </div>
            <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, margin: "0 0 20px" }}>A new generation of financial infrastructure for logistics.</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, margin: "0 0 16px" }}>
              Integrated with the <strong style={{ color: "#fff" }}>DrayPay Digital Hash Wallet</strong> and <strong style={{ color: "#fff" }}>DrayPay Debit Card</strong>, Draygo lets shippers, brokers, carriers, and drivers instantly manage transportation expenses — fuel, tolls, chassis, parking, maintenance, and more — through a secure digital payment ecosystem.
            </p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, margin: 0 }}>
              Smart contracts automatically execute predefined payment terms, release funds based on milestones, reduce disputes, accelerate settlements, and improve trust across the entire transportation chain.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { val: "24-72h", label: "Payment settlement" },
              { val: "500+", label: "Verified carriers" },
              { val: "$0", label: "Factoring fees" },
              { val: "100%", label: "Blockchain secured" },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "28px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 34, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DRAYGO IS DIFFERENT */}
      <section style={{ background: "#08192b", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(252,11,5,0.12)", border: "1px solid rgba(252,11,5,0.35)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fc0b05", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              Why Draygo is Different
            </div>
            <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>Built different from the ground up.</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, maxWidth: 500, margin: "0 auto" }}>Every capability was designed to eliminate the friction that costs drayage operations time and money.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="diff-grid">
            {DIFF_ITEMS.map(item => (
              <div key={item.text} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "22px 22px", display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(252,11,5,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: item.icon }} />
                </div>
                <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.55 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ background: "#060d1a", padding: "80px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "clamp(20px,3vw,32px)", fontWeight: 800, color: "#fff", lineHeight: 1.4, margin: "0 0 36px" }}>
            Draygo is more than a TMS — it is an{" "}
            <span style={{ color: "#fc0b05" }}>intelligent financial and operational infrastructure</span>{" "}
            designed to power the future of global drayage.
          </p>
          <a href="/#load-board" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fc0b05", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 8, padding: "16px 32px", textDecoration: "none" }}>
            Get Started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
          .mission-grid { grid-template-columns: 1fr !important; }
          .diff-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .diff-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </>
  );
}
