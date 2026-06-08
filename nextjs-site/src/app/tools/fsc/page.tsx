"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function Page() {
  const [diesel, setDiesel] = useState(4.05), [peg, setPeg] = useState(1.25), [mpg, setMpg] = useState(6), [miles, setMiles] = useState(372), [base, setBase] = useState(950);
  const perMile = Math.max(0, (diesel - peg) / (mpg || 1));
  const fsc = perMile * miles;
  const N = (n: number) => Math.round(n).toLocaleString();
  return (
    <ToolLayout title="Fuel Surcharge Records" desc="Work out the per-mile fuel surcharge and total FSC for a move from the current diesel price, your base peg and truck MPG — then attach it to the verified record.">
      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="bg-white rounded-[24px] p-7 md:p-9 reveal" style={{ border: "1px solid rgba(11,35,80,0.06)" }}>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="tool-label">Diesel price ($/gal)</label><input className="tool-input" type="number" step="0.01" value={diesel} onChange={(e) => setDiesel(+e.target.value)} /></div>
              <div><label className="tool-label">Base peg ($/gal)</label><input className="tool-input" type="number" step="0.01" value={peg} onChange={(e) => setPeg(+e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="tool-label">Truck MPG</label><input className="tool-input" type="number" step="0.1" value={mpg} onChange={(e) => setMpg(+e.target.value)} /></div>
              <div><label className="tool-label">Distance (miles)</label><input className="tool-input" type="number" value={miles} onChange={(e) => setMiles(+e.target.value)} /></div>
            </div>
            <div><label className="tool-label">Linehaul base ($)</label><input className="tool-input" type="number" value={base} onChange={(e) => setBase(+e.target.value)} /></div>
          </div>
        </div>
        <div className="bg-[var(--navy)] text-white rounded-[24px] p-7 md:p-9 reveal flex flex-col justify-center">
          <div className="text-[12px] uppercase tracking-[0.16em] text-white/60">FSC per mile</div>
          <div className="display text-[26px] mt-1 num">${perMile.toFixed(3)}</div>
          <div className="h-px bg-white/15 my-6" />
          <div className="flex justify-between text-[14px] text-white/80"><span>Fuel surcharge</span><span className="num">${N(fsc)}</span></div>
          <div className="flex justify-between text-[14px] text-white/80 mt-2"><span>FSC as % of linehaul</span><span className="num">{base > 0 ? Math.round((fsc / base) * 100) : 0}%</span></div>
          <div className="h-px bg-white/15 my-5" />
          <div className="flex justify-between items-end"><span className="text-[14px] text-white/70">All-in total</span><span className="display text-[40px] leading-none num">${N(base + fsc)}</span></div>
        </div>
      </div>
      <p className="text-[12px] text-[var(--muted)] mt-5 text-center reveal">Per-mile method: (diesel − peg) ÷ MPG. Carriers vary; use as a directional estimate.</p>
    </ToolLayout>
  );
}
