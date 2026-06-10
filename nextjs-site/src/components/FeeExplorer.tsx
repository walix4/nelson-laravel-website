"use client";
import { useMemo, useRef, useState } from "react";

// Deterministic PRNG — same series on server and client, no hydration mismatch.
const mulberry32 = (a: number) => () => {
  a |= 0; a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type Rail = { key: string; name: string; base: number; seed: number; icon: string };
const RAILS: Rail[] = [
  { key: "all", name: "All rails", base: 1620000, seed: 11, icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  { key: "instant", name: "Instant payout", base: 742000, seed: 23, icon: "M13 2L4.5 13.5H11L9 22l8.5-11.5H13L13 2z" },
  { key: "escrow", name: "Escrow release", base: 488000, seed: 37, icon: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4" },
  { key: "quickpay", name: "QuickPay", base: 261000, seed: 51, icon: "M12 3a9 9 0 1 0 9 9M12 7v5l3 2M21 3l-4 1 3 3 1-4z" },
  { key: "card", name: "Card spend", base: 129000, seed: 67, icon: "M3 6h18v12H3zM3 10h18M6 15h4" },
];

const RANGES = ["1D", "1W", "1M", "1Y", "MAX"] as const;
type Range = (typeof RANGES)[number];
const X_LABELS: Record<Range, string[]> = {
  "1D": ["20:45", "23:45", "02:45", "05:45", "08:45", "11:45", "14:45", "17:45"],
  "1W": ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"],
  "1M": ["May 12", "May 17", "May 22", "May 27", "Jun 1", "Jun 5", "Jun 9"],
  "1Y": ["Jul", "Sep", "Nov", "Jan", "Mar", "May"],
  MAX: ["2021", "2022", "2023", "2024", "2025", "2026"],
};
const VOLATILITY: Record<Range, number> = { "1D": 0.025, "1W": 0.04, "1M": 0.055, "1Y": 0.09, MAX: 0.13 };
const DRIFT: Record<Range, number> = { "1D": 0.002, "1W": 0.003, "1M": 0.004, "1Y": 0.007, MAX: 0.012 };

const N = 90, W = 1000, H = 360, PAD_T = 22, PAD_B = 16;
const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

// Catmull-Rom → cubic bezier for a silky curve.
function smoothPath(xs: number[], ys: number[]) {
  let d = `M ${xs[0].toFixed(1)},${ys[0].toFixed(1)}`;
  for (let i = 0; i < xs.length - 1; i++) {
    const x0 = xs[Math.max(0, i - 1)], y0 = ys[Math.max(0, i - 1)];
    const x1 = xs[i], y1 = ys[i];
    const x2 = xs[i + 1], y2 = ys[i + 1];
    const x3 = xs[Math.min(xs.length - 1, i + 2)], y3 = ys[Math.min(xs.length - 1, i + 2)];
    d += ` C ${(x1 + (x2 - x0) / 6).toFixed(1)},${(y1 + (y2 - y0) / 6).toFixed(1)} ${(x2 - (x3 - x1) / 6).toFixed(1)},${(y2 - (y3 - y1) / 6).toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
  }
  return d;
}

function genSeries(p: Rail, range: Range) {
  const rnd = mulberry32(p.seed * 1000 + range.charCodeAt(0) * 7 + range.length);
  const vol = VOLATILITY[range], drift = DRIFT[range];
  let v = 1;
  const vals: number[] = [];
  for (let i = 0; i < N; i++) { v = Math.max(0.5, v + (rnd() - 0.5) * vol + drift * (rnd() > 0.42 ? 1 : -1)); vals.push(v * p.base); }
  return vals;
}

export default function FeeExplorer() {
  const [rail, setRail] = useState(RAILS[0]);
  const [range, setRange] = useState<Range>("1D");
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const { vals, line, area, min, max, delta, insight } = useMemo(() => {
    const vals = genSeries(rail, range);
    const min = Math.min(...vals), max = Math.max(...vals), span = max - min || 1;
    const xs = vals.map((_, i) => (i / (N - 1)) * W);
    const ys = vals.map((v) => PAD_T + (1 - (v - min) / span) * (H - PAD_T - PAD_B));
    const line = smoothPath(xs, ys);
    const area = `${line} L ${W},${H} L 0,${H} Z`;
    const delta = ((vals[N - 1] - vals[0]) / vals[0]) * 100;
    // deterministic "AI" read of the series
    const peakI = vals.indexOf(max);
    const labels = X_LABELS[range];
    const peakLabel = labels[Math.round((peakI / (N - 1)) * (labels.length - 1))];
    const avg = vals.reduce((a, b) => a + b, 0) / N;
    const abovePct = ((max - avg) / avg) * 100;
    const best = RAILS.slice(1).map((p) => { const s = genSeries(p, range); return { p, d: ((s[N - 1] - s[0]) / s[0]) * 100 }; }).sort((a, b) => b.d - a.d)[0];
    const insight = `Settlement volume peaked around ${peakLabel} at ${fmt(max)} — ${abovePct.toFixed(1)}% above the ${range} average. ${best.p.name} is the fastest-growing rail this window (+${best.d.toFixed(2)}%).`;
    return { vals, line, area, min, max, delta, insight };
  }, [rail, range]);

  const yFor = (val: number) => PAD_T + (1 - (val - min) / (max - min || 1)) * (H - PAD_T - PAD_B);
  const yTicks = Array.from({ length: 5 }, (_, k) => min + ((max - min) * k) / 4);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const i = Math.min(N - 1, Math.max(0, Math.round(((e.clientX - r.left) / r.width) * (N - 1))));
    setHover({ i, x: (i / (N - 1)) * W, y: yFor(vals[i]) });
  };

  const railDelta = (p: Rail) => { const s = genSeries(p, range); return ((s[N - 1] - s[0]) / s[0]) * 100; };
  const hourLabel = X_LABELS[range];

  return (
    <div className="relative rounded-2xl p-5 md:p-8 reveal reveal-d1 overflow-hidden bg-white" style={{ border: "1px solid #E6EDF5", boxShadow: "0 30px 70px -30px rgba(11,45,92,0.18)" }}>
      <div className="relative">
        {/* rail tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {RAILS.map((p) => {
            const d = railDelta(p), on = p.key === rail.key;
            return (
              <button key={p.key} onClick={() => { setRail(p); setHover(null); }}
                className="flex items-center gap-3 px-4 py-2.5 rounded shrink-0 border transition text-left"
                style={{ borderColor: on ? "#00a2e7" : "#E6EDF5", background: on ? "linear-gradient(160deg,rgba(0,162,231,0.1),rgba(0,162,231,0.04))" : "#fff", boxShadow: on ? "0 14px 30px -14px rgba(0,162,231,0.35)" : "none" }}>
                <span className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ background: "linear-gradient(160deg,#0B2D5C,#0670a0)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8fd9f5" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
                </span>
                <span>
                  <span className="block text-[13px] font-bold text-[var(--navy)] whitespace-nowrap">{p.name}</span>
                  <span className="block text-[11.5px] font-bold num" style={{ color: d >= 0 ? "#0E9F6E" : "#D9534F" }}>{d >= 0 ? "↑" : "↓"} {Math.abs(d).toFixed(2)}%</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* headline + ranges */}
        <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="display num text-[36px] md:text-[46px] leading-none text-[var(--navy)]">{fmt(hover ? vals[hover.i] : vals[N - 1])} <span className="text-[18px] md:text-[20px]" style={{ color: "rgba(11,45,92,0.4)" }}>USD</span></span>
              <span className="text-[13px] font-bold num px-2 py-1 rounded" style={{ color: delta >= 0 ? "#0E9F6E" : "#D9534F", background: delta >= 0 ? "rgba(14,159,110,0.1)" : "rgba(217,83,79,0.1)", border: `1px solid ${delta >= 0 ? "rgba(14,159,110,0.3)" : "rgba(217,83,79,0.3)"}` }}>{delta >= 0 ? "+" : ""}{delta.toFixed(2)}%</span>
            </div>
            <div className="mt-2 text-[12.5px] text-[var(--muted)] num flex items-center gap-2"><span className="live-dot" />{hover ? `at ${hourLabel[Math.floor((hover.i / (N - 1)) * (hourLabel.length - 1))]}` : `${rail.name} · settled on DrayPay · ${range}`}</div>
          </div>
          <div className="flex items-center gap-1 rounded p-1" style={{ background: "#F4F8FC", border: "1px solid #E6EDF5" }}>
            {RANGES.map((r) => (
              <button key={r} onClick={() => { setRange(r); setHover(null); }}
                className="px-3 py-1.5 rounded text-[12px] font-bold transition"
                style={r === range ? { background: "linear-gradient(180deg,#00a2e7,#0670a0)", color: "#fff", boxShadow: "0 8px 18px -8px rgba(0,162,231,0.55)" } : { color: "var(--muted)" }}>{r}</button>
            ))}
          </div>
        </div>

        {/* chart */}
        <div className="relative mt-6">
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full block cursor-crosshair" style={{ height: "min(46vw, 360px)" }} preserveAspectRatio="none"
            onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
            <defs>
              <linearGradient id="payFillD" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00a2e7" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#00a2e7" stopOpacity="0.01" />
              </linearGradient>
              <linearGradient id="payLineD" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3bb8ee" />
                <stop offset="55%" stopColor="#8fd9f5" />
                <stop offset="100%" stopColor="#00a2e7" />
              </linearGradient>
              <filter id="payGlow" x="-20%" y="-60%" width="140%" height="220%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>
            {yTicks.map((t) => <line key={t} x1="0" x2={W} y1={yFor(t)} y2={yFor(t)} stroke="rgba(11,45,92,0.07)" strokeWidth="1" />)}
            <path d={area} fill="url(#payFillD)" />
            {/* glow underlay + crisp line */}
            
            <path d={line} fill="none" stroke="url(#payLineD)" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            {hover && (
              <g>
                <line x1={hover.x} x2={hover.x} y1={PAD_T - 8} y2={H} stroke="rgba(11,45,92,0.3)" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                <circle cx={hover.x} cy={hover.y} r="9" fill="rgba(0,162,231,0.18)" />
                <circle cx={hover.x} cy={hover.y} r="4.5" fill="#00a2e7" stroke="#fff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </g>
            )}
          </svg>
          {/* y labels */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden sm:flex flex-col justify-between py-1 text-right">
            {[...yTicks].reverse().map((t) => <span key={t} className="text-[10.5px] num text-[var(--muted)] px-1 rounded-sm" style={{ background: "rgba(255,255,255,0.85)" }}>{fmt(t)}</span>)}
          </div>
          {/* tooltip */}
          {hover && (
            <div className="pointer-events-none absolute bg-white rounded-md px-3 py-2 text-[11px] -translate-x-1/2"  style={{ left: `${(hover.x / W) * 100}%`, top: Math.max(0, (hover.y / H) * 100 - 24) + "%" }}>
              <div className="text-[var(--muted)] text-[9px] uppercase tracking-wider whitespace-nowrap">{rail.name}</div>
              <div className="display text-[var(--navy)] num whitespace-nowrap">{fmt(vals[hover.i])}</div>
            </div>
          )}
        </div>
        {/* x labels */}
        <div className="mt-2 flex justify-between text-[10.5px] num text-[var(--muted)] px-0.5">
          {hourLabel.map((l) => <span key={l}>{l}</span>)}
        </div>

        {/* AI insight strip */}
        <div className="mt-6 flex items-start gap-3 rounded-md px-4 py-3.5" style={{ background: "linear-gradient(90deg,rgba(0,162,231,0.07),rgba(0,162,231,0.02))", border: "1px solid rgba(0,162,231,0.2)" }}>
          <span className="shrink-0 w-7 h-7 rounded flex items-center justify-center" style={{ background: "linear-gradient(160deg,#00a2e7,#0670a0)", boxShadow: "0 8px 18px -8px rgba(0,162,231,0.55)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l1.8 5.6L19 9l-5.2 1.4L12 16l-1.8-5.6L5 9l5.2-1.4L12 2zM19 14l.9 2.6L22 17l-2.1.7L19 20l-.9-2.3L16 17l2.1-.4L19 14zM5 15l.7 2L8 18l-2.3.8L5 21l-.7-2.2L2 18l2.3-1L5 15z" /></svg>
          </span>
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#0670a0]">Payments intelligence</div>
            <div className="text-[13px] text-[var(--navy)]/80 leading-relaxed mt-0.5">{insight}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
