import Link from "next/link";
import { BLOCKS, TRANSACTIONS, METHOD_COLORS, shortHash, addrLabel } from "@/lib/data";

const STATS = [
  { label: "DRAY Price", value: "$2.84", sub: "+3.2% (+$0.09)", subColor: "#22c55e" },
  { label: "Total Load Records", value: "18.4M", sub: "142 TPS · 24h: +48,293", subColor: "#94a3b8" },
  { label: "Active Carriers", value: "2,847", sub: "↑ 14 joined today", subColor: "#22c55e" },
  { label: "Avg Settlement", value: "18h 42m", sub: "vs 45 days traditional", subColor: "#3b82f6" },
];

export default function HomePage() {
  const recentBlocks = BLOCKS.slice(0, 8);
  const recentTxns = TRANSACTIONS.slice(0, 8);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

      {/* Hero search */}
      <section style={{ padding: "48px 0 36px", textAlign: "center" }}>
        <div style={{ marginBottom: 10, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 99, padding: "4px 14px", fontSize: 11, fontWeight: 600, color: "#3b82f6" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          DrayChain Mainnet · Live
        </div>
        <h1 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, margin: "12px 0 8px", letterSpacing: "-0.02em" }}>
          The Drayage Blockchain Explorer
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, marginBottom: 28 }}>
          Explore load records, smart contracts, and carrier settlements on DrayChain
        </p>
        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", gap: 8 }}>
          <select style={{ background: "#0f172a", border: "1px solid #1e2d45", borderRadius: 6, color: "#94a3b8", padding: "11px 12px", fontSize: 12, outline: "none", flexShrink: 0 }}>
            <option>All Filters</option>
            <option>Address</option>
            <option>Tx Hash</option>
            <option>Block</option>
            <option>Load ID</option>
          </select>
          <input className="search-input" placeholder="Search by Address / Tx Hash / Block Number / Load ID" />
          <button className="btn-primary">Search</button>
        </div>
      </section>

      {/* Stats */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 28 }}>
        {STATS.map((s) => (
          <div key={s.label} className="card" style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#475569", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: s.subColor }}>{s.sub}</div>
          </div>
        ))}
      </section>

      {/* Network band */}
      <div style={{ background: "#0a1428", border: "1px solid #1e2d45", borderRadius: 8, padding: "10px 20px", marginBottom: 28, display: "flex", gap: 32, overflowX: "auto" }}>
        {[
          ["Latest Block", "#4,183,920"],
          ["Gas Price", "0.041 Gwei"],
          ["24h Transactions", "48,293"],
          ["Pending Loads", "1,847"],
          ["Network TPS", "142"],
          ["Total Value Settled", "$2.4B"],
        ].map(([label, val]) => (
          <div key={label} style={{ flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Recent blocks + transactions */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>

        {/* Recent Blocks */}
        <div className="table-wrap">
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #1e2d45", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>Latest Blocks</span>
            <Link href="/blocks" style={{ fontSize: 11, color: "#3b82f6" }}>View all blocks →</Link>
          </div>
          <div>
            {recentBlocks.map((b) => (
              <div key={b.number} style={{ display: "flex", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid #1a2540", gap: 12 }}>
                <div style={{ background: "#1a2540", borderRadius: 6, padding: "8px 10px", textAlign: "center", flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <Link href={`/block/${b.number}`} style={{ fontWeight: 700, fontSize: 13 }}>{b.number.toLocaleString()}</Link>
                    <span style={{ fontSize: 11, color: "#475569" }}>{b.age}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    Validator: <Link href={`/address/${b.validator}`} style={{ color: "#3b82f6", fontSize: 11 }}>{addrLabel(b.validator)}</Link>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 12, color: "#e2e8f0", marginBottom: 2 }}>{b.loadCount} loads</div>
                  <div style={{ fontSize: 11, color: "#22c55e" }}>{b.reward}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="table-wrap">
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #1e2d45", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>Latest Transactions</span>
            <Link href="/txs" style={{ fontSize: 11, color: "#3b82f6" }}>View all txns →</Link>
          </div>
          <div>
            {recentTxns.map((tx) => (
              <div key={tx.hash} style={{ display: "flex", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid #1a2540", gap: 12 }}>
                <div style={{ background: "#1a2540", borderRadius: 6, padding: "8px 10px", flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <Link href={`/tx/${tx.hash}`} className="mono" style={{ fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", maxWidth: 140, display: "block" }}>{shortHash(tx.hash)}</Link>
                    <span style={{ fontSize: 11, color: "#475569" }}>{tx.age}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>
                    <span style={{ color: "#94a3b8" }}>{addrLabel(tx.from)}</span>
                    <span style={{ color: "#334155", margin: "0 4px" }}>→</span>
                    <span style={{ color: "#94a3b8" }}>{addrLabel(tx.to)}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 4, marginBottom: 2,
                    background: `${METHOD_COLORS[tx.method]}18`,
                    color: METHOD_COLORS[tx.method],
                    border: `1px solid ${METHOD_COLORS[tx.method]}30`,
                    whiteSpace: "nowrap",
                  }}>{tx.method}</div>
                  <div style={{ fontSize: 11, color: "#22c55e" }}>{tx.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature band */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {[
            { icon: "🔗", title: "Tamper-Proof Load Records", desc: "Every drayage load is recorded on-chain the moment it's booked. Immutable, auditable, and verifiable by any party." },
            { icon: "⚡", title: "Smart Contract Settlements", desc: "Payments auto-release when delivery is confirmed via POD. No factoring, no 45-day waits. Carriers paid in hours." },
            { icon: "🛡️", title: "Real-Time Dispute Resolution", desc: "On-chain dispute contracts provide transparent arbitration with full event logs for every load in question." },
          ].map((f) => (
            <div key={f.title} className="card" style={{ padding: "24px" }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
