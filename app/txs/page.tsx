import Link from "next/link";
import { TRANSACTIONS, METHOD_COLORS, shortHash, addrLabel } from "@/lib/data";

export default function TxsPage() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ padding: "28px 0 20px", borderBottom: "1px solid #1e2d45", marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Transactions</h1>
        <p style={{ color: "#64748b", fontSize: 13 }}>
          More than <strong style={{ color: "#e2e8f0" }}>18,400,293</strong> load records found · Showing latest 100
        </p>
      </div>

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {[
          ["Transactions (24H)", "48,293 (+1.88%)"],
          ["Pending Loads", "1,847"],
          ["Total Fees (24H)", "$84,291"],
          ["Avg Transaction Fee", "$1.74"],
        ].map(([l, v]) => (
          <div key={l} className="card" style={{ padding: "14px 18px" }}>
            <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{l}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{v}</div>
          </div>
        ))}
      </div>

      <div className="table-wrap" style={{ marginBottom: 40 }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #1e2d45", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#94a3b8" }}>
            Page <strong style={{ color: "#e2e8f0" }}>1</strong> of <strong style={{ color: "#e2e8f0" }}>184,003</strong>
          </span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <select style={{ background: "#0f172a", border: "1px solid #1e2d45", borderRadius: 6, color: "#94a3b8", padding: "5px 10px", fontSize: 12, outline: "none" }}>
              <option>25 records</option>
              <option>50 records</option>
              <option>100 records</option>
            </select>
            <button className="btn-ghost">First</button>
            <button className="btn-ghost">← Prev</button>
            <button className="btn-ghost">Next →</button>
            <button className="btn-ghost">Last</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Tx Hash</th>
              <th>Method</th>
              <th>Block</th>
              <th>Age</th>
              <th>From</th>
              <th></th>
              <th>To</th>
              <th>Value</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((tx) => (
              <tr key={tx.hash}>
                <td style={{ padding: "9px 8px 9px 16px" }}>
                  <span style={{
                    display: "inline-block", width: 14, height: 14, borderRadius: "50%",
                    background: tx.status === "success" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                    border: `1.5px solid ${tx.status === "success" ? "#22c55e" : "#ef4444"}`,
                    fontSize: 8, textAlign: "center", lineHeight: "12px", color: tx.status === "success" ? "#22c55e" : "#ef4444",
                    fontWeight: 900,
                  }}>{tx.status === "success" ? "✓" : "✗"}</span>
                </td>
                <td className="mono">
                  <Link href={`/tx/${tx.hash}`}>{shortHash(tx.hash)}</Link>
                </td>
                <td>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 4,
                    background: `${METHOD_COLORS[tx.method]}18`,
                    color: METHOD_COLORS[tx.method],
                    border: `1px solid ${METHOD_COLORS[tx.method]}30`,
                    whiteSpace: "nowrap",
                  }}>{tx.method}</span>
                </td>
                <td>
                  <Link href={`/block/${tx.block}`}>{tx.block.toLocaleString()}</Link>
                </td>
                <td style={{ color: "#64748b" }}>{tx.age}</td>
                <td className="mono">
                  <Link href={`/address/${tx.from}`}>{addrLabel(tx.from)}</Link>
                </td>
                <td style={{ padding: "9px 4px" }}>
                  <span style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 3, fontSize: 9, fontWeight: 700, padding: "1px 5px" }}>IN</span>
                </td>
                <td className="mono">
                  <Link href={`/address/${tx.to}`}>{addrLabel(tx.to)}</Link>
                </td>
                <td style={{ color: "#22c55e", fontWeight: 600 }}>{tx.value}</td>
                <td style={{ color: "#64748b" }}>{tx.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #1e2d45", display: "flex", justifyContent: "flex-end", gap: 6 }}>
          <button className="btn-ghost">First</button>
          <button className="btn-ghost">← Prev</button>
          <span style={{ padding: "5px 12px", fontSize: 12, color: "#94a3b8" }}>Page 1 of 184,003</span>
          <button className="btn-ghost">Next →</button>
          <button className="btn-ghost">Last</button>
        </div>
      </div>
    </div>
  );
}
