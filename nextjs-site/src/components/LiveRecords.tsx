"use client";
import { useEffect, useState } from "react";

type Rec = { hash: string; type: string; lane: string; by: string; age: number; born: number };

const TYPES = ["All", "Rate confirmation", "Gate event", "POD signature", "Document hash", "Payment"];
// Deterministic pool (no Math.random — keeps SSG hydration clean); cycled as "new" records arrive.
const POOL: Omit<Rec, "age" | "born">[] = [
  { hash: "0x7af3…c918", type: "Rate confirmation", lane: "Los Angeles → Phoenix, AZ", by: "Carrier · Broker" },
  { hash: "0x1c9e…04b7", type: "Gate event", lane: "Port of Long Beach · Pier E", by: "Terminal" },
  { hash: "0x4b20…e6d1", type: "POD signature", lane: "Oakland → Sacramento, CA", by: "Carrier · Shipper" },
  { hash: "0x9d11…7a02", type: "Document hash", lane: "Seattle → Portland, OR", by: "3PL" },
  { hash: "0x3e8a…b5f9", type: "Payment", lane: "Houston → San Antonio, TX", by: "Shipper" },
  { hash: "0xc4f2…1d6e", type: "Gate event", lane: "BNSF Hobart Ramp", by: "IEP · Motor carrier" },
  { hash: "0x8b07…93aa", type: "Rate confirmation", lane: "New York/NJ → Chicago, IL", by: "Carrier · Broker" },
  { hash: "0x2a55…f0c3", type: "Gate event", lane: "Port of Savannah · GCT", by: "Terminal" },
  { hash: "0x6f3d…28e7", type: "Document hash", lane: "Port of Norfolk · NIT", by: "Terminal · 3PL" },
  { hash: "0xe190…6b44", type: "POD signature", lane: "Miami → Orlando, FL", by: "Carrier · Shipper" },
  { hash: "0x5d72…aa31", type: "Payment", lane: "Houston → Kansas City, MO", by: "Shipper · Carrier" },
  { hash: "0xab14…07ce", type: "Rate confirmation", lane: "Seattle → Salt Lake City, UT", by: "Carrier · Broker" },
  { hash: "0x3c81…d940", type: "POD signature", lane: "Oakland → Reno, NV", by: "Carrier · Shipper" },
  { hash: "0x7e60…1f55", type: "Document hash", lane: "New York/NJ → Indianapolis, IN", by: "3PL" },
];
const SEED: Rec[] = POOL.slice(0, 10).map((r, i) => ({ ...r, age: [12, 31, 44, 68, 120, 150, 210, 264, 318, 380][i], born: 0 }));

const fmt = (s: number) => (s < 60 ? `${s}s ago` : s < 3600 ? `${Math.floor(s / 60)}m ago` : `${Math.floor(s / 3600)}h ago`);

export default function LiveRecords() {
  const [tick, setTick] = useState(0);
  const [recs, setRecs] = useState<Rec[]>(SEED);
  const [filter, setFilter] = useState("All");
  const [paused, setPaused] = useState(false);
  const [copied, setCopied] = useState("");
  const [nextIdx, setNextIdx] = useState(10);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // every 6s a "new" record arrives at the top (skipped while hovering, so rows hold still under the cursor)
  useEffect(() => {
    if (tick === 0 || tick % 6 !== 0 || paused) return;
    setRecs((rs) => [{ ...POOL[nextIdx % POOL.length], age: 0, born: tick }, ...rs].slice(0, 12));
    setNextIdx((i) => i + 1);
  }, [tick, paused, nextIdx]);

  const copy = (hash: string) => {
    try { navigator.clipboard?.writeText(hash.replace("…", "9f2e6b8d04c1a7")); } catch { /* clipboard unavailable */ }
    setCopied(hash);
    setTimeout(() => setCopied(""), 1400);
  };

  const shown = recs.filter((r) => filter === "All" || r.type === filter);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* filter chips */}
      <div className="mt-8 flex flex-wrap items-center gap-2 reveal">
        {TYPES.map((t) => (
          <button key={t} className={`lr-chip ${filter === t ? "on" : ""}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
        <span className="ml-auto hidden md:inline-flex items-center gap-2 text-[12px] font-semibold text-[var(--muted)]">
          {paused ? <>Paused — move the mouse away to resume</> : <><span className="live-dot" /> New block every ~6s</>}
        </span>
      </div>

      <div className="est-wrap mt-5" style={{ borderRadius: 8 }}>
        <div className="est-scroll">
          <table className="est-table">
            <thead><tr><th>Record hash</th><th>Type</th><th>Lane / location</th><th>Signed by</th><th>Status</th><th>Anchored</th></tr></thead>
            <tbody>
              {shown.map((r) => (
                <tr key={`${r.hash}-${r.born}`} className={r.born === 0 ? "" : "lr-in"}>
                  <td>
                    <span className="est-ref lr-hash" title="Click to copy full hash" onClick={() => copy(r.hash)}>{r.hash}</span>
                    {copied === r.hash && <span className="ml-2 text-[10.5px] font-bold" style={{ color: "var(--green)" }}>Copied ✓</span>}
                  </td>
                  <td><span className="est-chip" style={{ borderRadius: 4 }}>{r.type}</span></td>
                  <td><span className="est-loc" style={{ maxWidth: 230 }}>{r.lane}</span></td>
                  <td className="text-[12.5px]">{r.by}</td>
                  <td>
                    {tick - r.born < 2 && r.born !== 0
                      ? <span className="est-badge streaming" style={{ borderRadius: 4 }}><span className="est-dot" /> Anchoring</span>
                      : <span className="est-badge completed" style={{ borderRadius: 4 }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg> Verified</span>}
                  </td>
                  <td><span className="est-time num">{fmt(r.age + (tick - r.born))}</span></td>
                </tr>
              ))}
              {shown.length === 0 && <tr><td colSpan={6}><div className="est-empty">No {filter.toLowerCase()} records in the last few minutes — they'll appear here as they anchor.</div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
