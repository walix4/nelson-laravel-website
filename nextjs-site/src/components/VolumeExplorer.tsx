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

const N = 90, W = 1000, H = 360, PAD_T = 22, PAD_B = 16;
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

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

function genSeries(p: Port, range: Range) {
  const rnd = mulberry32(p.seed * 1000 + range.charCodeAt(0) * 7 + range.length);
  const vol = VOLATILITY[range], drift = DRIFT[range];
  let v = 1;
  const vals: number[] = [];
  for (let i = 0; i < N; i++) { v = Math.max(0.5, v + (rnd() - 0.5) * vol + drift * (rnd() > 0.42 ? 1 : -1)); vals.push(v * p.base); }
  return vals;
}

export default function VolumeExplorer() {
  const [port, setPort] = useState(PORTS[0]);
  const [range, setRange] = useState<Range>("1D");
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const { vals, line, area, min, max, delta, insight } = useMemo(() => {
    const vals = genSeries(port, range);
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
    const best = PORTS.slice(1).map((p) => { const s = genSeries(p, range); return { p, d: ((s[N - 1] - s[0]) / s[0]) * 100 }; }).sort((a, b) => b.d - a.d)[0];
    const insight = `Volume peaked around ${peakLabel} at ${fmt(max)} TEU — ${abovePct.toFixed(1)}% above the ${range} average. ${best.p.name} is the fastest-growing gateway this window (+${best.d.toFixed(2)}%).`;
    return { vals, line, area, min, max, delta, insight };
  }, [port, range]);

  const yFor = (val: number) => PAD_T + (1 - (val - min) / (max - min || 1)) * (H - PAD_T - PAD_B);
  const yTicks = Array.from({ length: 5 }, (_, k) => min + ((max - min) * k) / 4);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const i = Math.min(N - 1, Math.max(0, Math.round(((e.clientX - r.left) / r.width) * (N - 1))));
    setHover({ i, x: (i / (N - 1)) * W, y: yFor(vals[i]) });
  };

  const portDelta = (p: Port) => { const s = genSeries(p, range); return ((s[N - 1] - s[0]) / s[0]) * 100; };
  const hourLabel = X_LABELS[range];

  return (
    <div className="relative rounded-lg p-5 md:p-8 reveal reveal-d1 overflow-hidden" style={{ background: "linear-gradient(165deg,#0A1B3F 0%,#071226 60%,#0B2D5C 130%)", border: "1px solid rgba(143,168,230,0.28)" }}>
      {/* futuristic backdrop: grid + glows */}
      <div className="absolute inset-0 pointer-events-none opacity-50" style={{ backgroundImage: "linear-gradient(rgba(143,168,230,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(143,168,230,0.06) 1px,transparent 1px)", backgroundSize: "44px 44px", maskImage: "radial-gradient(ellipse at 50% 30%,#000 30%,transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse at 50% 30%,#000 30%,transparent 80%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(700px 280px at 12% 0%,rgba(47,97,192,0.25),transparent 65%),radial-gradient(600px 260px at 92% 100%,rgba(110,143,224,0.16),transparent 65%)" }} />

      <div className="relative">
        {/* port tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {PORTS.map((p) => {
            const d = portDelta(p), on = p.key === port.key;
            return (
              <button key={p.key} onClick={() => { setPort(p); setHover(null); }}
                className="flex items-center gap-3 px-4 py-2.5 rounded shrink-0 border transition text-left"
                style={{ borderColor: on ? "rgba(143,198,255,0.8)" : "rgba(143,168,230,0.22)", background: on ? "linear-gradient(160deg,rgba(47,97,192,0.35),rgba(11,45,92,0.5))" : "rgba(255,255,255,0.04)", filter: on ? "drop-shadow(0 0 14px rgba(47,97,192,0.45))" : "none" }}>
                <span className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ background: "linear-gradient(160deg,#15448C,#061A38)", border: "1px solid rgba(143,168,230,0.35)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8fc6ff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
                </span>
                <span>
                  <span className="block text-[13px] font-bold text-white whitespace-nowrap">{p.name}</span>
                  <span className="block text-[11.5px] font-bold num" style={{ color: d >= 0 ? "#5fe3a8" : "#ff8a80" }}>{d >= 0 ? "↑" : "↓"} {Math.abs(d).toFixed(2)}%</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* headline + ranges */}
        <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="display num text-[36px] md:text-[46px] leading-none bg-gradient-to-r from-white via-[#cfe0ff] to-[#8fc6ff] bg-clip-text text-transparent">{fmt(hover ? vals[hover.i] : vals[N - 1])} <span className="text-[18px] md:text-[20px]" style={{ WebkitTextFillColor: "rgba(255,255,255,0.45)" }}>TEU</span></span>
              <span className="text-[13px] font-bold num px-2 py-1 rounded" style={{ color: delta >= 0 ? "#5fe3a8" : "#ff8a80", background: delta >= 0 ? "rgba(22,181,113,0.16)" : "rgba(192,57,43,0.2)", border: `1px solid ${delta >= 0 ? "rgba(95,227,168,0.35)" : "rgba(255,138,128,0.35)"}` }}>{delta >= 0 ? "+" : ""}{delta.toFixed(2)}%</span>
            </div>
            <div className="mt-2 text-[12.5px] text-white/50 num flex items-center gap-2"><span className="live-dot" />{hover ? `at ${hourLabel[Math.floor((hover.i / (N - 1)) * (hourLabel.length - 1))]}` : `${port.name} · container volume anchored on-chain · ${range}`}</div>
          </div>
          <div className="flex items-center gap-1 rounded p-1" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(143,168,230,0.2)" }}>
            {RANGES.map((r) => (
              <button key={r} onClick={() => { setRange(r); setHover(null); }}
                className="px-3 py-1.5 rounded text-[12px] font-bold transition"
                style={r === range ? { background: "linear-gradient(180deg,#2f61c0,#244a93)", color: "#fff", filter: "drop-shadow(0 0 10px rgba(47,97,192,0.6))" } : { color: "rgba(255,255,255,0.55)" }}>{r}</button>
            ))}
          </div>
        </div>

        {/* chart */}
        <div className="relative mt-6">
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full block cursor-crosshair" style={{ height: "min(46vw, 360px)" }} preserveAspectRatio="none"
            onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
            <defs>
              <linearGradient id="velFillD" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f8ef7" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#2f61c0" stopOpacity="0.01" />
              </linearGradient>
              <linearGradient id="velLineD" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6E8FE0" />
                <stop offset="55%" stopColor="#8fc6ff" />
                <stop offset="100%" stopColor="#4f8ef7" />
              </linearGradient>
              <filter id="velGlow" x="-20%" y="-60%" width="140%" height="220%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>
            {yTicks.map((t) => <line key={t} x1="0" x2={W} y1={yFor(t)} y2={yFor(t)} stroke="rgba(143,168,230,0.12)" strokeWidth="1" />)}
            <path d={area} fill="url(#velFillD)" />
            {/* glow underlay + crisp line */}
            <path d={line} fill="none" stroke="#3b7af0" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" opacity="0.45" filter="url(#velGlow)" />
            <path d={line} fill="none" stroke="url(#velLineD)" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            {hover && (
              <g>
                <line x1={hover.x} x2={hover.x} y1={PAD_T - 8} y2={H} stroke="rgba(143,198,255,0.5)" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                <circle cx={hover.x} cy={hover.y} r="9" fill="rgba(143,198,255,0.25)" />
                <circle cx={hover.x} cy={hover.y} r="4.5" fill="#8fc6ff" stroke="#071226" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </g>
            )}
          </svg>
          {/* y labels */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden sm:flex flex-col justify-between py-1 text-right">
            {[...yTicks].reverse().map((t) => <span key={t} className="text-[10.5px] num text-white/40 px-1 rounded-sm" style={{ background: "rgba(7,18,38,0.7)" }}>{fmt(t)}</span>)}
          </div>
          {/* tooltip */}
          {hover && (
            <div className="pointer-events-none absolute glass-sky rounded-md px-3 py-2 text-[11px] -translate-x-1/2" style={{ left: `${(hover.x / W) * 100}%`, top: Math.max(0, (hover.y / H) * 100 - 24) + "%" }}>
              <div className="text-white/60 text-[9px] uppercase tracking-wider whitespace-nowrap">{port.name}</div>
              <div className="display text-white num whitespace-nowrap">{fmt(vals[hover.i])} TEU</div>
            </div>
          )}
        </div>
        {/* x labels */}
        <div className="mt-2 flex justify-between text-[10.5px] num text-white/40 px-0.5">
          {hourLabel.map((l) => <span key={l}>{l}</span>)}
        </div>

        {/* AI insight strip */}
        <div className="mt-6 flex items-start gap-3 rounded-md px-4 py-3.5" style={{ background: "linear-gradient(90deg,rgba(47,97,192,0.18),rgba(110,143,224,0.07))", border: "1px solid rgba(143,168,230,0.3)" }}>
          <span className="shrink-0 w-7 h-7 rounded flex items-center justify-center" style={{ background: "linear-gradient(160deg,#2f61c0,#15448C)", filter: "drop-shadow(0 0 10px rgba(47,97,192,0.7))" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l1.8 5.6L19 9l-5.2 1.4L12 16l-1.8-5.6L5 9l5.2-1.4L12 2zM19 14l.9 2.6L22 17l-2.1.7L19 20l-.9-2.3L16 17l2.1-.4L19 14zM5 15l.7 2L8 18l-2.3.8L5 21l-.7-2.2L2 18l2.3-1L5 15z" /></svg>
          </span>
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#8fc6ff]">Chain intelligence</div>
            <div className="text-[13px] text-white/80 leading-relaxed mt-0.5">{insight}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
