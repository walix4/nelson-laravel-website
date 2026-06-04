"use client";
import { useEffect, useRef, useState } from "react";

type Stat = { icon: string; count: number; suffix: string; decimals?: number; label: string };
const STATS: Stat[] = [
  { icon: '<path d="M14 3v5h5"/><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M9 13h6M9 17h4"/>', count: 250000, suffix: "+", label: "Routes priced" },
  { icon: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>', count: 3100, suffix: "+", label: "Toll roads & crossings" },
  { icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>', count: 48, suffix: "", label: "States & provinces covered" },
  { icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>', count: 99.9, suffix: "%", decimals: 1, label: "Toll-rate accuracy" },
];

function Counter({ s }: { s: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        io.unobserve(el);
        const t0 = performance.now(), dur = 1600;
        const step = (now: number) => { const t = Math.min(1, (now - t0) / dur); setVal(s.count * (1 - Math.pow(1 - t, 3))); if (t < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      }
    }), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [s.count]);
  const text = s.decimals ? val.toFixed(s.decimals) : Math.round(val).toLocaleString();
  return (
    <div className="stat-card reveal in" ref={ref}>
      <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.icon }} /></div>
      <div className="stat-num num">{text}{s.suffix}</div>
      <div className="stat-label">{s.label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0B2350 0%,#06143A 55%,#0B2350 100%)" }}>
      <div className="absolute inset-0 opacity-60 pointer-events-none" style={{ background: "radial-gradient(620px 300px at 14% 0%,rgba(58,95,192,0.30),transparent 60%),radial-gradient(640px 340px at 88% 100%,rgba(255,59,48,0.18),transparent 60%)" }} />
      <div className="max-w-[1400px] mx-auto px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {STATS.map((s) => <Counter key={s.label} s={s} />)}
        </div>
      </div>
    </section>
  );
}
