"use client";
import Link from "next/link";
import { useState } from "react";
import { TRANSACTIONS, METHOD_COLORS, shortHash, addrLabel, ADDR } from "@/lib/data";

export default function AddressContent({ address }: { address: string }) {
  const [tab, setTab] = useState("txns");
  const addr = address;
  const label = ADDR[addr];
  const txns = TRANSACTIONS.filter(tx => tx.from === addr || tx.to === addr).slice(0, 25);
  const balance = (12480 + parseInt(addr.slice(2, 8), 16) % 88000).toFixed(4);
  const totalSent = txns.filter(tx => tx.from === addr).length;
  const totalReceived = txns.filter(tx => tx.to === addr).length;

  const CONTRACT_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title DrayChain BOL Registry
/// @notice Records immutable Bill of Lading entries on-chain
contract BOLRegistry {

    struct LoadRecord {
        string  loadId;
        address shipper;
        address carrier;
        string  origin;
        string  destination;
        uint256 paymentAmount;
        uint256 timestamp;
        bool    delivered;
    }

    mapping(string => LoadRecord) public loads;
    mapping(address => string[]) public carrierLoads;

    event LoadBooked(string indexed loadId, address shipper, address carrier);
    event LoadDelivered(string indexed loadId, uint256 timestamp);
    event PaymentReleased(string indexed loadId, uint256 amount);

    function bookLoad(
        string calldata loadId,
        address carrier,
        string calldata origin,
        string calldata destination,
        uint256 paymentAmount
    ) external payable {
        require(loads[loadId].timestamp == 0, "Load already exists");
        loads[loadId] = LoadRecord(
            loadId, msg.sender, carrier,
            origin, destination, paymentAmount,
            block.timestamp, false
        );
        carrierLoads[carrier].push(loadId);
        emit LoadBooked(loadId, msg.sender, carrier);
    }

    function confirmDelivery(string calldata loadId) external {
        LoadRecord storage load = loads[loadId];
        require(msg.sender == load.carrier, "Not the assigned carrier");
        require(!load.delivered, "Already delivered");
        load.delivered = true;
        payable(load.carrier).transfer(load.paymentAmount);
        emit LoadDelivered(loadId, block.timestamp);
        emit PaymentReleased(loadId, load.paymentAmount);
    }
}`;

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ padding: "28px 0 20px", borderBottom: "1px solid #1e2d45", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", flexShrink: 0 }} />
          <div>
            {label && <div style={{ fontSize: 11, color: "#3b82f6", fontWeight: 600, marginBottom: 2 }}>{label}</div>}
            <div className="mono" style={{ fontSize: 14, color: "#e2e8f0", wordBreak: "break-all" }}>{addr}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: "20px 24px" }}>
          <div style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Overview</div>
          {[
            ["DRAY Balance", <span key="b" style={{ color: "#22c55e", fontWeight: 700 }}>{balance} DRAY</span>],
            ["DRAY Value", <span key="v">${(parseFloat(balance) * 2.84).toFixed(2)} USD</span>],
            ["Total Sent", `${totalSent} txns`],
            ["Total Received", `${totalReceived} txns`],
            ["First Seen", "2024-02-12"],
            ["Last Seen", "2026-06-24"],
          ].map(([l, v]) => (
            <div key={String(l)} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13 }}>
              <span style={{ color: "#64748b" }}>{l}</span>
              <span style={{ color: "#e2e8f0" }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: "20px 24px" }}>
          <div style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>More Info</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              ["Token Holdings", "3 tokens"],
              ["Load Activity", `${txns.length} loads`],
              ["Contract Type", label ? "Verified ✓" : "EOA Wallet"],
              ["Network", "DrayChain Mainnet"],
            ].map(([l, v]) => (
              <div key={String(l)}>
                <div style={{ fontSize: 11, color: "#475569", marginBottom: 4 }}>{l}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="table-wrap" style={{ marginBottom: 40 }}>
        <div className="tab-bar">
          {[
            { key: "txns", label: `Transactions (${txns.length})` },
            { key: "tokens", label: "Token Holdings (3)" },
            { key: "code", label: "Contract Code" },
          ].map((t) => (
            <button key={t.key} className={`tab${tab === t.key ? " active" : ""}`} onClick={() => setTab(t.key)} style={{ background: "none", border: "none" }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "txns" && (
          <table>
            <thead>
              <tr>
                <th>Tx Hash</th><th>Method</th><th>Block</th><th>Age</th>
                <th>From</th><th></th><th>To</th><th>Value</th><th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {txns.length > 0 ? txns.map(tx => (
                <tr key={tx.hash}>
                  <td className="mono"><Link href={`/tx/${tx.hash}`}>{shortHash(tx.hash)}</Link></td>
                  <td><span style={{ fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 4, background: `${METHOD_COLORS[tx.method]}18`, color: METHOD_COLORS[tx.method], border: `1px solid ${METHOD_COLORS[tx.method]}30` }}>{tx.method}</span></td>
                  <td><Link href={`/block/${tx.block}`}>{tx.block.toLocaleString()}</Link></td>
                  <td style={{ color: "#64748b" }}>{tx.age}</td>
                  <td className="mono"><span style={{ background: tx.from === addr ? "rgba(59,130,246,0.1)" : "transparent", borderRadius: 3, padding: "1px 4px" }}><Link href={`/address/${tx.from}`}>{addrLabel(tx.from)}</Link></span></td>
                  <td><span style={{ background: tx.to === addr ? "rgba(34,197,94,0.12)" : "rgba(59,130,246,0.12)", color: tx.to === addr ? "#22c55e" : "#3b82f6", border: `1px solid ${tx.to === addr ? "#22c55e" : "#3b82f6"}30`, borderRadius: 3, fontSize: 9, fontWeight: 700, padding: "1px 5px" }}>{tx.to === addr ? "IN" : "OUT"}</span></td>
                  <td className="mono"><Link href={`/address/${tx.to}`}>{addrLabel(tx.to)}</Link></td>
                  <td style={{ color: "#22c55e", fontWeight: 600 }}>{tx.value}</td>
                  <td style={{ color: "#64748b" }}>{tx.fee}</td>
                </tr>
              )) : (
                <tr><td colSpan={9} style={{ textAlign: "center", color: "#475569", padding: "32px" }}>No transactions found</td></tr>
              )}
            </tbody>
          </table>
        )}

        {tab === "tokens" && (
          <div style={{ padding: "24px" }}>
            {[
              { name: "DRAY Token", symbol: "DRAY", balance: balance, value: `$${(parseFloat(balance) * 2.84).toFixed(2)}`, color: "#3b82f6" },
              { name: "DrayPay USD", symbol: "DPUSD", balance: "4,820.00", value: "$4,820.00", color: "#22c55e" },
              { name: "DrayChain NFT", symbol: "DCNFT", balance: "2 NFTs", value: "—", color: "#8b5cf6" },
            ].map((t) => (
              <div key={t.symbol} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid #1e2d45" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${t.color}25`, border: `2px solid ${t.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: t.color }}>{t.symbol.slice(0, 1)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{t.symbol}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{t.balance}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{t.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "code" && (
          <div style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ color: "#22c55e", fontWeight: 700, fontSize: 12 }}>✓ Contract Source Code Verified</span>
              <span style={{ fontSize: 11, color: "#64748b" }}>· Solidity 0.8.24 · MIT License</span>
            </div>
            <pre style={{ background: "#0a1428", borderRadius: 8, padding: "20px", fontSize: 12, fontFamily: "monospace", color: "#94a3b8", overflow: "auto", lineHeight: 1.7, border: "1px solid #1e2d45" }}>
              <code>{CONTRACT_CODE}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
