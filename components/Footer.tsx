"use client";
import Link from "next/link";

const COLS = [
  { title: "Company", links: [{ l: "About DrayScan", h: "#" }, { l: "Careers", h: "#" }, { l: "Terms of Service", h: "#" }, { l: "Privacy Policy", h: "#" }] },
  { title: "Blockchain", links: [{ l: "Transactions", h: "/txs" }, { l: "Blocks", h: "/blocks" }, { l: "Contracts", h: "/contracts" }, { l: "Top Accounts", h: "#" }] },
  { title: "Developers", links: [{ l: "API Documentation", h: "#" }, { l: "API Plans", h: "#" }, { l: "Smart Contract Verify", h: "#" }, { l: "DrayChain SDK", h: "#" }] },
  { title: "Services", links: [{ l: "DrayGo Platform", h: "#" }, { l: "DrayChain Explorer", h: "#" }, { l: "DrayPay Network", h: "#" }, { l: "Knowledge Base", h: "#" }] },
];

export default function Footer() {
  return (
    <footer style={{ background: "#060d1a", borderTop: "1px solid #1e2d45", padding: "48px 24px 24px", marginTop: "auto" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#fff" }}>D</div>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>Dray<span style={{ color: "#3b82f6" }}>Scan</span></span>
            </div>
            <p style={{ color: "#475569", fontSize: 12, lineHeight: 1.7, maxWidth: 260 }}>
              The drayage industry's blockchain explorer. Transparent, tamper-proof load records and real-time smart contract settlements on DrayChain.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              {["𝕏", "in", "GH"].map(s => (
                <a key={s} href="#" style={{
                  width: 30, height: 30, borderRadius: 6, background: "#1e2d45",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#64748b", fontSize: 11, fontWeight: 700, textDecoration: "none",
                }}>{s}</a>
              ))}
            </div>
          </div>
          {COLS.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#e2e8f0", marginBottom: 14 }}>{col.title}</div>
              <ul style={{ listStyle: "none" }}>
                {col.links.map(l => (
                  <li key={l.l} style={{ marginBottom: 8 }}>
                    <Link href={l.h} style={{ color: "#475569", fontSize: 12, textDecoration: "none" }}
                      onMouseOver={e => (e.currentTarget.style.color = "#94a3b8")}
                      onMouseOut={e => (e.currentTarget.style.color = "#475569")}
                    >{l.l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1e2d45", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#334155", fontSize: 11 }}>© 2026 DrayScan · Powered by DrayChain Network · All rights reserved</span>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            <span style={{ color: "#334155", fontSize: 11 }}>DrayChain Mainnet · Block #4,183,920</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
