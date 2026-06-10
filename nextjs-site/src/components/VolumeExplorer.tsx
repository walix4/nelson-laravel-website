"use client";
import { useMemo, useRef, useState } from "react";

// Deterministic PRNG — same series on server and client, no hydration mismatch.
const mulberry32 = (a: number) => () => {
  a |= 0; a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type Port = { key: string; name: string; base: number; seed: number; icon: string };
const PORTS: Port[] = [
  { key: "all", name: "All U.S. Ports", base: 48200, seed: 11, icon: "M12 3v10M12 13l-5.5 5.5M12 13l5.5 5.5M4 9h16" },
  { key: "lalb", name: "LA / Long Beach", base: 16840, seed: 23, icon: "M3 17h18M6 17V9h12v8M9 9V5h6v4" },
  { key: "nynj", name: "NY / NJ", base: 12410, seed: 37, icon: "M4 19V9l4-4 4 4v10M12 19V12l4-3 4 3v7" },
  { key: "sav", name: "Savannah", base: 7460, seed: 51, icon: "M3 18c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0M7 14V6h10v8" },
  { key: "hou", name: "Houston", base: 5930, seed: 67, icon: "M4 18V8h6v10M14 18V4h6v14" },
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

const N = 90, W = 1000, H = 360, PAD_T = 18, PAD_B = 14;
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

export default function VolumeExplorer() {
  const [port, setPort] = useState(PORTS[0]);
  const [range, setRange] = useState<Range>("1D");
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const { vals, pts, area, min, max, delta } = useMemo(() => {
    const rnd = mulberry32(port.seed * 1000 + range.charCodeAt(0) * 7 + range.length);
    const vol = VOLATILITY[range], drift = DRIFT[range];
    let v = 1;
    const vals: number[] = [];
    for (let i = 0; i < N; i++) { v = Math.max(0.5, v + (rnd() - 0.5) * vol + drift * (rnd() > 0.42 ? 1 : -1)); vals.push(v * port.base); }
    const min = Math.min(...vals), max = Math.max(...vals), span = max - min || 1;
    const x = (i: number) => (i / (N - 1)) * W;
    const y = (val: number) => PAD_T + (1 - (val - min) / span) * (H - PAD_T - PAD_B);
    const pts = vals.map((val, i) => `${x(i).toFixed(1)},${y(val).toFixed(1)}`).join(" ");
    const area = `0,${H} ${pts} ${W},${H}`;
    const delta = ((vals[N - 1] - vals[0]) / vals[0]) * 100;
    return { vals, pts, area, min, max, delta };
  }, [port, range]);

  const yFor = (val: number) => PAD_T + (1 - (val - min) / (max - min || 1)) * (H - PAD_T - PAD_B);
  const yTicks = Array.from({ length: 5 }, (_, k) => min + ((max - min) * k) / 4);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const i = Math.min(N - 1, Math.max(0, Math.round(((e.clientX - r.left) / r.width) * (N - 1))));
    setHover({ i, x: (i / (N - 1)) * W, y: yFor(vals[i]) });
  };

  const portDelta = (p: Port) => {
    const rnd = mulberry32(p.seed * 1000 + range.charCodeAt(0) * 7 + range.length);
    const vol = VOLATILITY[range], drift = DRIFT[range];
    let v = 1, first = 0, last = 0;
    for (let i = 0; i < N; i++) { v = Math.max(0.5, v + (rnd() - 0.5) * vol + drift * (rnd() > 0.42 ? 1 : -1)); if (i === 0) first = v; last = v; }
    return ((last - first) / first) * 100;
  };

  const hourLabel = X_LABELS[range];

  return (
    <div className="bg-white rounded-lg border border-[var(--navy)]/8 p-5 md:p-8 reveal reveal-d1">
      {/* port tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {PORTS.map((p) => {
          const d = portDelta(p), on = p.key === port.key;
          return (
            <button key={p.key} onClick={() => { setPort(p); setHover(null); }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded shrink-0 border transition text-left ${on ? "border-[var(--red)]" : "border-[var(--navy)]/10 hover:border-[var(--navy)]/30"}`}
              style={{ background: on ? "rgba(47,97,192,0.07)" : "#fff" }}>
              <span className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ background: "linear-gradient(160deg,#0B2D5C,#061A38)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6E8FE0" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
              </span>
              <span>
                <span className="block text-[13px] font-bold text-[var(--navy)] whitespace-nowrap">{p.name}</span>
                <span className="block text-[11.5px] font-bold num" style={{ color: d >= 0 ? "#15935F" : "#C0392B" }}>{d >= 0 ? "↑" : "↓"} {Math.abs(d).toFixed(2)}%</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* headline + ranges */}
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="display num text-[34px] md:text-[42px] text-[var(--navy)] leading-none">{fmt(hover ? vals[hover.i] : vals[N - 1])} <span className="text-[18px] md:text-[20px] text-[var(--muted)]">TEU</span></span>
            <span className="text-[13px] font-bold num px-2 py-1 rounded" style={{ color: delta >= 0 ? "#15935F" : "#C0392B", background: delta >= 0 ? "rgba(22,181,113,0.1)" : "rgba(192,57,43,0.08)" }}>{delta >= 0 ? "+" : ""}{delta.toFixed(2)}%</span>
          </div>
          <div className="mt-1.5 text-[12.5px] text-[var(--muted)] num">{hover ? `at ${hourLabel[Math.floor((hover.i / (N - 1)) * (hourLabel.length - 1))]}` : `${port.name} · container volume anchored on-chain · ${range}`}</div>
        </div>
        <div className="flex items-center gap-1">
          {RANGES.map((r) => (
            <button key={r} onClick={() => { setRange(r); setHover(null); }}
              className={`px-3 py-1.5 rounded text-[12px] font-bold transition ${r === range ? "bg-[var(--navy)] text-white" : "text-[var(--muted)] hover:text-[var(--navy)]"}`}>{r}</button>
          ))}
        </div>
      </div>

      {/* chart */}
      <div className="relative mt-5">
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full block cursor-crosshair" style={{ height: "min(46vw, 360px)" }} preserveAspectRatio="none"
          onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          <defs>
            <linearGradient id="velFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2f61c0" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#2f61c0" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {yTicks.map((t) => <line key={t} x1="0" x2={W} y1={yFor(t)} y2={yFor(t)} stroke="rgba(11,45,92,0.06)" strokeWidth="1" />)}
          <polygon points={area} fill="url(#velFill)" />
          <polyline points={pts} fill="none" stroke="#2f61c0" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          {hover && (
            <g>
              <line x1={hover.x} x2={hover.x} y1={PAD_T - 6} y2={H} stroke="rgba(11,45,92,0.3)" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
              <circle cx={hover.x} cy={hover.y} r="5" fill="#2f61c0" stroke="#fff" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
            </g>
          )}
        </svg>
        {/* y labels */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden sm:flex flex-col justify-between py-1 text-right">
          {[...yTicks].reverse().map((t) => <span key={t} className="text-[10.5px] num text-[var(--muted)] bg-white/80 px-1 rounded-sm">{fmt(t)}</span>)}
        </div>
        {/* tooltip */}
        {hover && (
          <div className="pointer-events-none absolute glass-sky rounded-md px-3 py-2 text-[11px] -translate-x-1/2" style={{ left: `${(hover.x / W) * 100}%`, top: Math.max(0, (hover.y / H) * 100 - 22) + "%" }}>
            <div className="text-white/60 text-[9px] uppercase tracking-wider whitespace-nowrap">{port.name}</div>
            <div className="display text-white num whitespace-nowrap">{fmt(vals[hover.i])} TEU</div>
          </div>
        )}
      </div>
      {/* x labels */}
      <div className="mt-2 flex justify-between text-[10.5px] num text-[var(--muted)] px-0.5">
        {hourLabel.map((l) => <span key={l}>{l}</span>)}
      </div>
    </div>
  );
}
