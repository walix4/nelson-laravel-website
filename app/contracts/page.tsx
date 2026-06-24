import Link from "next/link";
import { CONTRACTS, addrLabel } from "@/lib/data";

const CATEGORY_COLORS: Record<string, string> = {
  Document: "#3b82f6", Finance: "#22c55e", Pricing: "#f59e0b",
  Compliance: "#8b5cf6", Identity: "#06b6d4", Operations: "#f97316",
  Access: "#ec4899", Equipment: "#64748b", Legal: "#ef4444",
  Routing: "#10b981", Analytics: "#6366f1", Integration: "#0ea5e9",
};

export default function ContractsPage() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ padding: "28px 0 20px", borderBottom: "1px solid #1e2d45", marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Verified Smart Contracts</h1>
        <p style={{ color: "#64748b", fontSize: 13 }}>Audited and verified drayage smart contracts deployed on DrayChain</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {[
          ["Total Contracts", "1,284"],
          ["Verified Contracts", "847"],
          ["Audited Contracts", "312"],
          ["Total Value Locked", "$142.8M"],
        ].map(([l, v]) => (
          <div key={l} className="card" style={{ padding: "14px 18px" }}>
            <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{l}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {["All", "Finance", "Document", "Compliance", "Operations", "Identity", "Pricing"].map((cat) => (
          <button key={cat} style={{
            padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: "pointer",
            background: cat === "All" ? "#3b82f6" : "transparent",
            color: cat === "All" ? "#fff" : "#64748b",
            border: `1px solid ${cat === "All" ? "#3b82f6" : "#1e2d45"}`,
          }}>{cat}</button>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <input className="search-input" placeholder="Search contracts..." style={{ width: 220, padding: "6px 12px", fontSize: 12 }} />
        </div>
      </div>

      <div className="table-wrap" style={{ marginBottom: 40 }}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Contract Name</th>
              <th>Address</th>
              <th>Category</th>
              <th>Balance</th>
              <th>Transactions</th>
              <th>Compiler</th>
              <th>Verified</th>
              <th>Audited</th>
            </tr>
          </thead>
          <tbody>
            {CONTRACTS.map((c) => (
              <tr key={c.address}>
                <td style={{ color: "#475569" }}>{c.rank}</td>
                <td>
                  <Link href={`/address/${c.address}`} style={{ fontWeight: 600, color: "#e2e8f0" }}>{c.name}</Link>
                </td>
                <td className="mono">
                  <Link href={`/address/${c.address}`}>{addrLabel(c.address)}</Link>
                </td>
                <td>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4,
                    background: `${CATEGORY_COLORS[c.category] ?? "#3b82f6"}18`,
                    color: CATEGORY_COLORS[c.category] ?? "#3b82f6",
                    border: `1px solid ${CATEGORY_COLORS[c.category] ?? "#3b82f6"}30`,
                  }}>{c.category}</span>
                </td>
                <td style={{ color: "#e2e8f0" }}>{c.balance}</td>
                <td style={{ color: "#3b82f6" }}>{c.txns}</td>
                <td style={{ color: "#64748b" }} className="mono">{c.compiler}</td>
                <td style={{ color: "#64748b" }}>{c.verifiedDate}</td>
                <td>
                  {c.audited ? (
                    <span style={{ color: "#22c55e", fontWeight: 700, fontSize: 12 }}>✓ Audited</span>
                  ) : (
                    <span style={{ color: "#475569", fontSize: 12 }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
