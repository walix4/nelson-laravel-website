import Link from "next/link";
import { BLOCKS, TRANSACTIONS, addrLabel, shortHash, METHOD_COLORS } from "@/lib/data";

export default function BlockDetailPage({ params }: { params: { number: string } }) {
  const blockNum = parseInt(params.number);
  const block = BLOCKS.find(b => b.number === blockNum) ?? BLOCKS[0];
  const txns = TRANSACTIONS.filter(tx => tx.block === block.number).slice(0, 15);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ padding: "28px 0 20px", borderBottom: "1px solid #1e2d45", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <Link href="/blocks" style={{ color: "#64748b", fontSize: 13 }}>← Blocks</Link>
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>Block #{block.number.toLocaleString()}</h1>
      </div>

      {/* Overview */}
      <div className="card" style={{ padding: "0 24px", marginBottom: 24 }}>
        {[
          ["Block Height", <span key="h" style={{ fontWeight: 700 }}>{block.number.toLocaleString()}</span>],
          ["Timestamp", block.timestamp + ` (${block.age})`],
          ["Load Transactions", <Link key="t" href="#txns">{block.loadCount} loads in this block</Link>],
          ["Validator", <Link key="v" href={`/address/${block.validator}`} className="mono">{block.validator}</Link>],
          ["Block Reward", <span key="r" style={{ color: "#22c55e" }}>{block.reward}</span>],
          ["Gas Used", `${block.gasUsed} (${block.gasPercent}%)`],
          ["Base Fee Per Gas", "0.041 Gwei"],
          ["Burnt Fees", <span key="b" style={{ color: "#ef4444" }}>{block.burntFees}</span>],
          ["Block Size", `${(48 + block.loadCount * 0.8).toFixed(1)} KB`],
          ["DrayChain Network", <span key="n" style={{ color: "#3b82f6" }}>DrayChain Mainnet</span>],
        ].map(([label, value]) => (
          <div key={String(label)} className="overview-row">
            <span className="overview-label">{label}</span>
            <span className="overview-value" style={{ fontSize: 13 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Block nav */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <Link href={`/block/${block.number - 1}`} style={{ padding: "7px 16px", borderRadius: 6, border: "1px solid #1e2d45", fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>← Block {(block.number - 1).toLocaleString()}</Link>
        <Link href={`/block/${block.number + 1}`} style={{ padding: "7px 16px", borderRadius: 6, border: "1px solid #1e2d45", fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>Block {(block.number + 1).toLocaleString()} →</Link>
      </div>

      {/* Transactions in block */}
      <div id="txns" className="table-wrap" style={{ marginBottom: 40 }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #1e2d45" }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>Load Transactions ({block.loadCount})</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Tx Hash</th>
              <th>Method</th>
              <th>Age</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            {txns.length > 0 ? txns.map(tx => (
              <tr key={tx.hash}>
                <td className="mono"><Link href={`/tx/${tx.hash}`}>{shortHash(tx.hash)}</Link></td>
                <td>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 4,
                    background: `${METHOD_COLORS[tx.method]}18`, color: METHOD_COLORS[tx.method],
                    border: `1px solid ${METHOD_COLORS[tx.method]}30`,
                  }}>{tx.method}</span>
                </td>
                <td style={{ color: "#64748b" }}>{tx.age}</td>
                <td className="mono"><Link href={`/address/${tx.from}`}>{addrLabel(tx.from)}</Link></td>
                <td className="mono"><Link href={`/address/${tx.to}`}>{addrLabel(tx.to)}</Link></td>
                <td style={{ color: "#22c55e" }}>{tx.value}</td>
                <td style={{ color: "#64748b" }}>{tx.fee}</td>
              </tr>
            )) : (
              <tr><td colSpan={7} style={{ textAlign: "center", color: "#475569", padding: "32px" }}>No transactions in this block</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
