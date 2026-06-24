import Link from "next/link";
import { TRANSACTIONS, METHOD_COLORS, addrLabel } from "@/lib/data";

export function generateStaticParams() {
  return TRANSACTIONS.map(tx => ({ hash: tx.hash }));
}

export default async function TxDetailPage({ params }: { params: Promise<{ hash: string }> }) {
  const { hash } = await params;
  const tx = TRANSACTIONS.find(t => t.hash === hash) ?? TRANSACTIONS[0];

  const LOAD_ID = `DLD-${tx.block}-${tx.hash.slice(2, 8).toUpperCase()}`;
  const PORT = ["LA/LB", "NY/NJ", "SEA", "HOU", "SAV", "OAK"][tx.block % 6];

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ padding: "28px 0 20px", borderBottom: "1px solid #1e2d45", marginBottom: 24 }}>
        <Link href="/txs" style={{ color: "#64748b", fontSize: 13 }}>← Transactions</Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>Transaction Details</h1>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4,
            background: tx.status === "success" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
            color: tx.status === "success" ? "#22c55e" : "#ef4444",
            border: `1px solid ${tx.status === "success" ? "#22c55e" : "#ef4444"}30`,
          }}>{tx.status === "success" ? "✓ Success" : "✗ Failed"}</span>
        </div>
      </div>

      <div className="card" style={{ padding: "0 24px", marginBottom: 24 }}>
        {[
          ["Transaction Hash", <span key="h" className="mono" style={{ fontSize: 12, wordBreak: "break-all" }}>{tx.hash}</span>],
          ["Status", <span key="s" style={{ color: tx.status === "success" ? "#22c55e" : "#ef4444", fontWeight: 600 }}>{tx.status === "success" ? "Success" : "Failed"}</span>],
          ["Method", <span key="m" style={{ fontSize: 12, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: `${METHOD_COLORS[tx.method]}18`, color: METHOD_COLORS[tx.method], border: `1px solid ${METHOD_COLORS[tx.method]}30` }}>{tx.method}</span>],
          ["Block", <Link key="b" href={`/block/${tx.block}`}>{tx.block.toLocaleString()}</Link>],
          ["Timestamp", tx.age],
          ["Load ID", <span key="l" style={{ color: "#f59e0b", fontFamily: "monospace", fontSize: 12 }}>{LOAD_ID}</span>],
          ["Port", <span key="p" style={{ color: "#e2e8f0" }}>Port of {PORT}</span>],
          ["From", <Link key="f" href={`/address/${tx.from}`} className="mono" style={{ fontSize: 12 }}>{tx.from}</Link>],
          ["To", <Link key="t" href={`/address/${tx.to}`} className="mono" style={{ fontSize: 12 }}>{tx.to}</Link>],
          ["Value", <span key="v" style={{ color: "#22c55e", fontWeight: 700 }}>{tx.value}</span>],
          ["Transaction Fee", <span key="fee">{tx.fee}</span>],
          ["Gas Price", "0.041 Gwei"],
          ["Gas Limit", "180,000"],
          ["Gas Used", `142,847 (79.4%)`],
          ["Nonce", `${tx.block % 8294}`],
        ].map(([label, value]) => (
          <div key={String(label)} className="overview-row">
            <span className="overview-label">{label}</span>
            <span className="overview-value" style={{ fontSize: 13 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Input data */}
      <div className="card" style={{ padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 14 }}>Input Data</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {["Hex", "Decoded", "UTF-8"].map((t) => (
            <button key={t} style={{
              padding: "4px 12px", borderRadius: 4, fontSize: 12, cursor: "pointer",
              background: t === "Decoded" ? "#3b82f6" : "transparent",
              color: t === "Decoded" ? "#fff" : "#64748b",
              border: `1px solid ${t === "Decoded" ? "#3b82f6" : "#1e2d45"}`,
            }}>{t}</button>
          ))}
        </div>
        <div style={{ background: "#0a1428", borderRadius: 6, padding: "16px", fontSize: 12, fontFamily: "monospace", color: "#94a3b8", lineHeight: 1.8 }}>
          <div><span style={{ color: "#3b82f6" }}>Function:</span> <span style={{ color: "#f59e0b" }}>{tx.method}</span>()</div>
          <div><span style={{ color: "#3b82f6" }}>loadId:</span> <span style={{ color: "#22c55e" }}>"{LOAD_ID}"</span></div>
          <div><span style={{ color: "#3b82f6" }}>carrier:</span> <span style={{ color: "#e2e8f0" }}>"{tx.to}"</span></div>
          <div><span style={{ color: "#3b82f6" }}>origin:</span> <span style={{ color: "#22c55e" }}>"Port of {PORT}"</span></div>
          <div><span style={{ color: "#3b82f6" }}>paymentAmount:</span> <span style={{ color: "#f59e0b" }}>{tx.value.replace("$", "")} DRAY</span></div>
          <div><span style={{ color: "#3b82f6" }}>timestamp:</span> <span style={{ color: "#e2e8f0" }}>1750723842</span></div>
        </div>
      </div>

      {/* Event logs */}
      <div className="card" style={{ padding: "20px 24px", marginBottom: 40 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 14 }}>Event Logs (2)</div>
        {[
          { index: 0, contract: "BOL Registry v2", event: "LoadBooked", params: { loadId: LOAD_ID, shipper: tx.from, carrier: tx.to, amount: tx.value } },
          { index: 1, contract: "Payment Escrow", event: "FundsLocked", params: { loadId: LOAD_ID, amount: tx.value, releaseTime: "On POD confirmation" } },
        ].map((log) => (
          <div key={log.index} style={{ background: "#0a1428", borderRadius: 6, padding: "14px 16px", marginBottom: 10, border: "1px solid #1e2d45" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
              <span style={{ background: "#1e2d45", borderRadius: 4, padding: "2px 8px", fontSize: 11, color: "#64748b" }}>#{log.index}</span>
              <Link href={`/address/${tx.to}`} style={{ fontSize: 12, color: "#3b82f6" }}>{log.contract}</Link>
              <span style={{ fontSize: 11, color: "#f59e0b", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 4, padding: "1px 7px" }}>{log.event}</span>
            </div>
            {Object.entries(log.params).map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 12, fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: "#3b82f6", minWidth: 120, fontFamily: "monospace" }}>{k}</span>
                <span style={{ color: "#94a3b8", fontFamily: "monospace" }}>{String(v)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
