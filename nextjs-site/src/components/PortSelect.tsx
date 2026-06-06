"use client";
import { useState, useRef, useEffect } from "react";

const FIELD = "w-full rounded bg-white/[0.07] px-3 py-2.5 text-[14px] text-white placeholder-white/45 focus:outline-none focus:bg-white/[0.16] transition";

export default function PortSelect({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setEditing(false); } };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const list = editing && value ? options.filter((o) => o.toLowerCase().includes(value.toLowerCase())) : options;
  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <input
          className={FIELD + " pr-9"}
          value={value}
          placeholder={placeholder}
          onFocus={() => { setOpen(true); setEditing(false); }}
          onChange={(e) => { onChange(e.target.value); setEditing(true); setOpen(true); }}
        />
        <svg onClick={() => setOpen((o) => !o)} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-transform ${open ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
      </div>
      {open && list.length > 0 && (
        <div className="absolute z-30 mt-1.5 w-full max-h-60 overflow-auto rounded-md border border-white/15 shadow-2xl" style={{ background: "rgba(12,22,42,0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
          {list.map((o) => (
            <button type="button" key={o} onClick={() => { onChange(o); setOpen(false); setEditing(false); }} className={`w-full text-left px-3 py-2.5 text-[13px] hover:bg-white/10 transition flex items-center gap-2 ${o === value ? "text-white bg-white/[0.06]" : "text-white/75"}`}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M12 22s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" /><circle cx="12" cy="11" r="2.4" /></svg>
              <span>{o}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
