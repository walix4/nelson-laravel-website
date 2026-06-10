"use client";
import { useEffect, useState } from "react";

type Pay = { hash: string; type: string; lane: string; by: string; amt: string; age: number; born: number };

const TYPES = ["All", "Instant payout", "Escrow release", "QuickPay", "Invoice", "Card spend"];
// Deterministic pool (no Math.random — keeps SSG hydration clean); cycled as "new" payments arrive.
const POOL: Omit<Pay, "age" | "born">[] = [
  { hash: "PAY-84J3C9", type: "Instant payout", lane: "Los Angeles → Phoenix, AZ", by: "Broker → Carrier", amt: "$740.00" },
  { hash: "PAY-1C9E04", type: "Escrow release", lane: "Long Beach → Las Vegas, NV", by: "Shipper → Carrier", amt: "$1,120.00" },
  { hash: "PAY-4B20E6", type: "QuickPay", lane: "Oakland → Sacramento, CA", by: "Factor → Owner-op", amt: "$2,310.40" },
  { hash: "PAY-9D117A", type: "Invoice", lane: "Seattle → Portland, OR", by: "Carrier → Broker", amt: "$980.00" },
  { hash: "PAY-3E8AB5", type: "Card spend", lane: "Pilot #214 · Ontario, CA", by: "Driver wallet", amt: "$182.60" },
  { hash: "PAY-C4F21D", type: "Instant payout", lane: "Houston → San Antonio, TX", by: "Broker → Carrier", amt: "$540.00" },
  { hash: "PAY-8B0793", type: "Escrow release", lane: "New York/NJ → Chicago, IL", by: "Shipper → Carrier", amt: "$1,840.00" },
  { hash: "PAY-2A55F0", type: "QuickPay", lane: "Savannah → Atlanta, GA", by: "Factor → Carrier", amt: "$760.00" },
  { hash: "PAY-6F3D28", type: "Invoice", lane: "Norfolk → Columbus, OH", by: "Carrier → Broker", amt: "$1,380.00" },
  { hash: "PAY-E1906B", type: "Instant payout", lane: "Miami → Orlando, FL", by: "Broker → Driver", amt: "$570.00" },
  { hash: "PAY-5D72AA", type: "Escrow release", lane: "Houston → Kansas City, MO", by: "Shipper → Carrier", amt: "$1,640.00" },
  { hash: "PAY-AB1407", type: "Card spend", lane: "TA #88 · Salt Lake City, UT", by: "Driver wallet", amt: "$96.40" },
  { hash: "PAY-3C81D9", type: "QuickPay", lane: "Oakland → Reno, NV", by: "Factor → Owner-op", amt: "$960.00" },
  { hash: "PAY-7E601F", type: "Invoice", lane: "New York/NJ → Indianapolis, IN", by: "Carrier → Broker", amt: "$1,820.00" },
];
const SEED: Pay[] = POOL.slice(0, 10).map((r, i) => ({ ...r, age: [12, 31, 44, 68, 120, 150, 210, 264, 318, 380][i], born: 0 }));

const fmt = (s: number) => (s < 60 ? `${s}s ago` : s < 3600 ? `${Math.floor(s / 60)}m ago` : `${Math.floor(s / 3600)}h ago`);

export default function LiveSettlements({ compact = false }: { compact?: boolean }) {
  const [tick, setTick] = useState(0);
  const [pays, setPays] = useState<Pay[]>(SEED);
  const [filter, setFilter] = useState("All");
  const [paused, setPaused] = useState(false);
  const [copied, setCopied] = useState("");
  const [nextIdx, setNextIdx] = useState(10);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // every 6s a "new" payment lands at the top (skipped while hovering, so rows hold still under the cursor)
  useEffect(() => {
    if (tick === 0 || tick % 6 !== 0 || paused) return;
    setPays((rs) => [{ ...POOL[nextIdx % POOL.length], age: 0, born: tick }, ...rs].slice(0, compact ? 7 : 12));
    setNextIdx((i) => i + 1);
  }, [tick, paused, nextIdx, compact]);

  const copy = (hash: string) => {
    try { navigator.clipboard?.writeText(hash); } catch { /* clipboard unavailable */ }
    setCopied(hash);
    setTimeout(() => setCopied(""), 1400);
  };

  const shown = pays.filter((r) => filter === "All" || r.type === filter).slice(0, compact ? 6 : 12);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* filter chips */}
      <div className="mt-8 flex flex-wrap items-center gap-2 reveal">
        {TYPES.map((t) => (
          <button key={t} className={`lr-chip ${filter === t ? "on" : ""}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
        <span className="ml-auto hidden md:inline-flex items-center gap-2 text-[12px] font-semibold text-[var(--muted)]">
          {paused ? <>Paused — move the mouse away to resume</> : <><span className="live-dot" /> New settlement every ~6s</>}
        </span>
      </div>

      <div className="est-wrap mt-5" style={{ borderRadius: 8 }}>
        <div className="est-scroll">
          <table className="est-table">
            <thead><tr><th>Payment ID</th><th>Type</th><th>Lane / location</th><th>Parties</th><th>Amount</th><th>Status</th><th>Settled</th></tr></thead>
            <tbody>
              {shown.map((r) => (
                <tr key={`${r.hash}-${r.born}`} className={r.born === 0 ? "" : "lr-in"}>
                  <td>
                    <span className="est-ref lr-hash" title="Click to copy payment ID" onClick={() => copy(r.hash)}>{r.hash}</span>
                    {copied === r.hash && <span className="ml-2 text-[10.5px] font-bold" style={{ color: "var(--green)" }}>Copied ✓</span>}
                  </td>
                  <td><span className="est-chip" style={{ borderRadius: 4 }}>{r.type}</span></td>
                  <td><span className="est-loc" style={{ maxWidth: 230 }}>{r.lane}</span></td>
                  <td className="text-[12.5px]">{r.by}</td>
                  <td><span className="est-price num">{r.amt}</span></td>
                  <td>
                    {tick - r.born < 2 && r.born !== 0
                      ? <span className="est-badge streaming" style={{ borderRadius: 4 }}><span className="est-dot" /> Settling</span>
                      : <span className="est-badge completed" style={{ borderRadius: 4 }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg> Settled</span>}
                  </td>
                  <td><span className="est-time num">{fmt(r.age + (tick - r.born))}</span></td>
                </tr>
              ))}
              {shown.length === 0 && <tr><td colSpan={7}><div className="est-empty">No {filter.toLowerCase()} payments in the last few minutes — they&apos;ll appear here as they settle.</div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
