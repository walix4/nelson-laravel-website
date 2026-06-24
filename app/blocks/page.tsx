import Link from "next/link";
import { BLOCKS, addrLabel } from "@/lib/data";

export default function BlocksPage() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ padding: "28px 0 20px", borderBottom: "1px solid #1e2d45", marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Blocks</h1>
        <p style={{ color: "#64748b", fontSize: 13 }}>Latest blocks on the DrayChain network</p>
      </div>

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {[
          ["Total Blocks", "4,183,920"],
          ["Avg Block Time", "12.4s"],
          ["Avg Loads / Block", "38"],
          ["Network Utilization (24H)", "62.4%"],
        ].map(([l, v]) => (
          <div key={l} className="card" style={{ padding: "14px 18px" }}>
            <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{l}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{v}</div>
          </div>
        ))}
      </div>

      <div className="table-wrap" style={{ marginBottom: 40 }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #1e2d45", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#94a3b8" }}>
            Showing blocks <strong style={{ color: "#e2e8f0" }}>4,183,920</strong> to <strong style={{ color: "#e2e8f0" }}>4,183,871</strong>
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn-ghost">First</button>
            <button className="btn-ghost">← Prev</button>
            <span style={{ padding: "5px 12px", fontSize: 12, color: "#94a3b8" }}>Page 1 of 83,678</span>
            <button className="btn-ghost">Next →</button>
            <button className="btn-ghost">Last</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Block</th>
              <th>Age</th>
              <th>Validator</th>
              <th>Loads</th>
              <th>Gas Used</th>
              <th>Base Fee</th>
              <th>Reward</th>
              <th>Burnt Fees</th>
            </tr>
          </thead>
          <tbody>
            {BLOCKS.slice(0, 50).map((b) => (
              <tr key={b.number}>
                <td>
                  <Link href={`/block/${b.number}`} style={{ fontWeight: 700 }}>{b.number.toLocaleString()}</Link>
                </td>
                <td style={{ color: "#64748b" }}>{b.age}</td>
                <td>
                  <Link href={`/address/${b.validator}`} className="mono">{addrLabel(b.validator)}</Link>
                </td>
                <td>
                  <Link href={`/block/${b.number}`} style={{ color: "#e2e8f0" }}>{b.loadCount}</Link>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#e2e8f0" }}>{b.gasUsed}</span>
                    <div style={{ width: 48, height: 4, background: "#1e2d45", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${b.gasPercent}%`, background: b.gasPercent > 80 ? "#ef4444" : b.gasPercent > 50 ? "#f59e0b" : "#3b82f6", borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#475569" }}>{b.gasPercent}%</span>
                  </div>
                </td>
                <td style={{ color: "#94a3b8" }}>0.041 Gwei</td>
                <td style={{ color: "#22c55e" }}>{b.reward}</td>
                <td style={{ color: "#ef4444" }}>{b.burntFees}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #1e2d45", display: "flex", justifyContent: "flex-end", gap: 6 }}>
          <button className="btn-ghost">First</button>
          <button className="btn-ghost">← Prev</button>
          <span style={{ padding: "5px 12px", fontSize: 12, color: "#94a3b8" }}>Page 1 of 83,678</span>
          <button className="btn-ghost">Next →</button>
          <button className="btn-ghost">Last</button>
        </div>
      </div>
    </div>
  );
}
