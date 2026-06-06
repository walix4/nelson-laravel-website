"use client";
import { useState, useRef, useEffect } from "react";

export default function GlassSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const label = options.find((o) => o[0] === value)?.[1] ?? "";
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full rounded bg-white/[0.07] px-3 py-2.5 text-[14px] text-white text-left flex items-center justify-between gap-2 focus:outline-none focus:bg-white/[0.16] transition">
        <span className="truncate">{label}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="absolute z-30 mt-1.5 w-full rounded-md border border-white/15 shadow-2xl overflow-hidden" style={{ background: "rgba(12,22,42,0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
          {options.map(([v, l]) => (
            <button type="button" key={v} onClick={() => { onChange(v); setOpen(false); }} className={`w-full text-left px-3 py-2.5 text-[13.5px] flex items-center justify-between gap-2 hover:bg-white/10 transition ${v === value ? "text-white bg-white/[0.06]" : "text-white/75"}`}>
              <span>{l}</span>
              {v === value && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M5 12l5 5L20 7" /></svg>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
