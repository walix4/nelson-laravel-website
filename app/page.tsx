import Link from "next/link";
import { BLOCKS, TRANSACTIONS, METHOD_COLORS, shortHash, addrLabel } from "@/lib/data";

const STATS = [
  { label: "DRAY Price", value: "$2.84", sub: "+3.2% (+$0.09)", subColor: "#22c55e", icon: "◈" },
  { label: "Total Load Records", value: "18.4M", sub: "142 TPS · 24h: +48,293", subColor: "#94a3b8", icon: "⬡" },
  { label: "Active Carriers", value: "2,847", sub: "↑ 14 joined today", subColor: "#22c55e", icon: "◎" },
  { label: "Avg Settlement", value: "18h 42m", sub: "vs 45 days traditional", subColor: "#60a5fa", icon: "⧖" },
];

const NETWORK = [
  ["Latest Block", "#4,183,920"],
  ["Gas Price", "0.041 Gwei"],
  ["24h Transactions", "48,293"],
  ["Pending Loads", "1,847"],
  ["Network TPS", "142"],
  ["Total Value Settled", "$2.4B"],
];

export default function HomePage() {
  const recentBlocks = BLOCKS.slice(0, 8);
  const recentTxns = TRANSACTIONS.slice(0, 8);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>

      {/* ── HERO ── */}
      <section style={{
        position: "relative",
        background: "linear-gradient(160deg, #060d1e 0%, #0b1735 40%, #060d1e 100%)",
        padding: "72px 24px 56px",
        textAlign: "center",
        overflow: "hidden",
      }}>
        {/* Background orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", top: -120, left: "20%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", top: -80, right: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: -60, left: "40%", width: 500, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)" }} />
          {/* Grid lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto" }}>
          {/* Live badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.22)", borderRadius: 99, padding: "5px 16px", fontSize: 11, fontWeight: 600, color: "#60a5fa", marginBottom: 24, backdropFilter: "blur(8px)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }} />
            DrayChain Mainnet · Block #4,183,920 · Live
          </div>

          <h1 style={{ fontSize: "clamp(32px,5vw,58px)", fontWeight: 900, color: "#fff", lineHeight: 1.06, margin: "0 0 16px", letterSpacing: "-0.03em" }}>
            The Drayage{" "}
            <span style={{
              background: "linear-gradient(90deg, #3b82f6, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Blockchain</span>{" "}
            Explorer
          </h1>
          <p style={{ color: "#64748b", fontSize: 16, marginBottom: 36, lineHeight: 1.6 }}>
            Explore load records, smart contracts, and carrier settlements on DrayChain.
            <br />Tamper-proof · Auditable · Real-time.
          </p>

          {/* Search bar */}
          <div style={{
            maxWidth: 700, margin: "0 auto",
            display: "flex", gap: 0,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 12,
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}>
            <select style={{
              background: "transparent",
              border: "none",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              color: "#64748b", padding: "14px 14px",
              fontSize: 12, outline: "none", flexShrink: 0, cursor: "pointer",
            }}>
              <option style={{ background: "#0f172a" }}>All</option>
              <option style={{ background: "#0f172a" }}>Address</option>
              <option style={{ background: "#0f172a" }}>Tx Hash</option>
              <option style={{ background: "#0f172a" }}>Block</option>
              <option style={{ background: "#0f172a" }}>Load ID</option>
            </select>
            <input style={{
              flex: 1, background: "transparent", border: "none",
              color: "#e2e8f0", fontSize: 14, padding: "14px 16px", outline: "none",
            }} placeholder="Search by Address / Tx Hash / Block / Load ID" />
            <button style={{
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              border: "none", color: "#fff", fontWeight: 700,
              fontSize: 13, padding: "14px 24px", cursor: "pointer",
              flexShrink: 0,
            }}>Search</button>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1,
          marginTop: -1,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          overflow: "hidden",
          backdropFilter: "blur(16px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          marginBottom: 24,
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              padding: "24px 28px",
              background: "rgba(15,23,42,0.7)",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 12, right: 16, fontSize: 22, opacity: 0.08, color: "#3b82f6" }}>{s.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: 10 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: s.subColor }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Network ticker */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 10,
          padding: "12px 24px",
          marginBottom: 28,
          display: "flex", gap: 0, overflowX: "auto",
          backdropFilter: "blur(8px)",
        }}>
          {NETWORK.map(([label, val], i) => (
            <div key={label} style={{ flexShrink: 0, paddingRight: 32, marginRight: 32, borderRight: i < NETWORK.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
              <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>{label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>{val}</div>
            </div>
          ))}
        </div>

        {/* ── RECENT BLOCKS + TXS ── */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>

          {/* Blocks panel */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            overflow: "hidden",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
          }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(59,130,246,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                </div>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>Latest Blocks</span>
              </div>
              <Link href="/blocks" style={{ fontSize: 11, color: "#3b82f6", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 6, padding: "4px 10px", textDecoration: "none" }}>View all →</Link>
            </div>
            {recentBlocks.map((b, i) => (
              <div key={b.number} style={{
                display: "flex", alignItems: "center", padding: "11px 20px",
                borderBottom: i < recentBlocks.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                gap: 12, transition: "background 0.1s",
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#3b82f6" }}>Bk</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <Link href={`/block/${b.number}`} style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>{b.number.toLocaleString()}</Link>
                    <span style={{ fontSize: 11, color: "#334155", background: "rgba(255,255,255,0.04)", borderRadius: 4, padding: "1px 6px" }}>{b.age}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    <Link href={`/address/${b.validator}`} style={{ color: "#60a5fa" }}>{addrLabel(b.validator)}</Link>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 3 }}>{b.loadCount} loads</div>
                  <div style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>{b.reward}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Transactions panel */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            overflow: "hidden",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
          }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(99,102,241,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.2"><path d="M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>
                </div>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>Latest Transactions</span>
              </div>
              <Link href="/txs" style={{ fontSize: 11, color: "#818cf8", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 6, padding: "4px 10px", textDecoration: "none" }}>View all →</Link>
            </div>
            {recentTxns.map((tx, i) => (
              <div key={tx.hash} style={{
                display: "flex", alignItems: "center", padding: "11px 20px",
                borderBottom: i < recentTxns.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                gap: 12,
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#818cf8" }}>Tx</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <Link href={`/tx/${tx.hash}`} style={{ fontSize: 12, fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 150, display: "block", color: "#60a5fa" }}>{shortHash(tx.hash)}</Link>
                    <span style={{ fontSize: 11, color: "#334155", background: "rgba(255,255,255,0.04)", borderRadius: 4, padding: "1px 6px" }}>{tx.age}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {addrLabel(tx.from)} <span style={{ color: "#1e3a5f", margin: "0 3px" }}>→</span> {addrLabel(tx.to)}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 4, marginBottom: 3,
                    background: `${METHOD_COLORS[tx.method]}14`,
                    color: METHOD_COLORS[tx.method],
                    border: `1px solid ${METHOD_COLORS[tx.method]}28`,
                    whiteSpace: "nowrap",
                  }}>{tx.method}</div>
                  <div style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>{tx.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURE CARDS ── */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {[
              { color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.18)", title: "Tamper-Proof Load Records", desc: "Every drayage load is recorded on-chain the moment it's booked. Immutable, auditable, verifiable by any party.", icon: "🔗" },
              { color: "#22c55e", bg: "rgba(34,197,94,0.07)", border: "rgba(34,197,94,0.18)", title: "Smart Contract Settlements", desc: "Payments auto-release when delivery is confirmed via POD. No factoring, no 45-day waits. Carriers paid in hours.", icon: "⚡" },
              { color: "#818cf8", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.18)", title: "Real-Time Dispute Resolution", desc: "On-chain dispute contracts provide transparent arbitration with full event logs for every load in question.", icon: "🛡️" },
            ].map((f) => (
              <div key={f.title} style={{
                background: f.bg,
                border: `1px solid ${f.border}`,
                borderRadius: 14,
                padding: "28px 24px",
                backdropFilter: "blur(12px)",
                boxShadow: `0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 ${f.border}`,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${f.color}15, transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#f1f5f9", marginBottom: 10 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>{f.desc}</div>
                <div style={{ marginTop: 18 }}>
                  <span style={{ fontSize: 11, color: f.color, fontWeight: 600 }}>Learn more →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
