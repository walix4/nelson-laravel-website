"use client";
import { useState, useRef, useEffect } from "react";

const FIELD = "w-full rounded bg-white/[0.07] px-3 py-2.5 text-[14px] text-white focus:outline-none focus:bg-white/[0.16] transition";

export default function PortSelect({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setQuery(""); } };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { if (open) setTimeout(() => searchRef.current?.focus(), 30); }, [open]);
  const list = query ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase())) : options;

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} className={`${FIELD} text-left flex items-center justify-between gap-2`}>
        <span className={`truncate ${value ? "text-white" : "text-white/45"}`}>{value || placeholder}</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2f61c0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="absolute z-30 mt-1.5 w-full rounded-md border border-white/15 shadow-2xl overflow-hidden" style={{ background: "rgba(12,22,42,0.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
          <div className="p-2 border-b border-white/10">
            <div className="relative">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" className="absolute left-2.5 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
              <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search terminals…" className="w-full rounded bg-white/[0.08] pl-8 pr-3 py-2 text-[13px] text-white placeholder-white/40 focus:outline-none focus:bg-white/[0.14]" />
            </div>
          </div>
          <div className="port-scroll max-h-56 overflow-auto py-1">
            {list.length === 0 && <div className="px-3 py-3 text-[13px] text-white/50">No terminals match.</div>}
            {list.map((o) => (
              <button type="button" key={o} onClick={() => { onChange(o); setOpen(false); setQuery(""); }} className={`w-full text-left px-3 py-2.5 text-[13px] hover:bg-white/10 transition flex items-center gap-2 ${o === value ? "text-white bg-white/[0.06]" : "text-white/75"}`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2f61c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M12 22s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" /><circle cx="12" cy="11" r="2.4" /></svg>
                <span>{o}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
