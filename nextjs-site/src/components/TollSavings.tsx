"use client";
import { useState } from "react";

const N = (n: number) => n.toLocaleString();

export default function TollSavings() {
  const [spend, setSpend] = useState("");
  const [fleet, setFleet] = useState("");
  const [tollVeh, setTollVeh] = useState("");
  const [vType, setVType] = useState("trucks");
  const [avoid, setAvoid] = useState("yes");
  const [ftes, setFtes] = useState("");
  const [hours, setHours] = useState("30");
  const [res, setRes] = useState<{ monthly: number; annual: number; toll: number; labor: number } | null>(null);

  const calc = (e: React.FormEvent) => {
    e.preventDefault();
    const s = +spend || 0, f = +ftes || 0, h = +hours || 0;
    const tollRate = avoid === "yes" ? 0.18 : 0.09;
    const wage = 32;
    const toll = Math.round(s * tollRate);
    const labor = Math.round(f * h * wage * 0.4);
    const monthly = toll + labor;
    setRes({ monthly, annual: monthly * 12, toll, labor });
  };

  return (
    <div className="reveal rounded-2xl bg-white shadow-2xl p-6 md:p-7 w-full max-w-[460px] mx-auto lg:mx-0 h-full flex flex-col">
      {!res && (
        <form onSubmit={calc} className="flex flex-col h-full">
          <h3 className="display text-[20px] md:text-[22px] text-[var(--navy)] leading-tight">Calculate your toll savings</h3>
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3.5 flex-1 content-start">
            <div><label className="input-label">Monthly toll spend ($)</label><input className="input num mt-1" type="number" min={0} placeholder="0" required value={spend} onChange={(e) => setSpend(e.target.value)} /></div>
            <div><label className="input-label">Vehicles in fleet</label><input className="input num mt-1" type="number" min={0} placeholder="0" required value={fleet} onChange={(e) => setFleet(e.target.value)} /></div>
            <div><label className="input-label">Vehicles on toll roads</label><input className="input num mt-1" type="number" min={0} placeholder="0" required value={tollVeh} onChange={(e) => setTollVeh(e.target.value)} /></div>
            <div><label className="input-label">Vehicle type</label><select className="input mt-1" value={vType} onChange={(e) => setVType(e.target.value)}><option value="trucks">Trucks</option><option value="mixed">Mixed fleet</option><option value="vans">Cars / vans</option></select></div>
            <div><label className="input-label">Avoid toll roads?</label><select className="input mt-1" value={avoid} onChange={(e) => setAvoid(e.target.value)}><option value="yes">Yes</option><option value="no">No</option></select></div>
            <div><label className="input-label">FTEs on routing</label><input className="input num mt-1" type="number" min={0} placeholder="0" required value={ftes} onChange={(e) => setFtes(e.target.value)} /></div>
            <div className="col-span-2"><label className="input-label">Hours / month each FTE spends on routing</label><input className="input num mt-1" type="number" min={0} required value={hours} onChange={(e) => setHours(e.target.value)} /></div>
          </div>
          <button type="submit" className="btn-primary w-full py-3.5 rounded-lg text-[14px] font-semibold mt-5"><span className="label">Calculate Savings</span></button>
        </form>
      )}

      {res && (
        <div className="flex flex-col h-full justify-center">
          <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--green)] flex items-center gap-1.5"><span className="live-dot" /> Estimated savings</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="display text-[44px] md:text-[50px] text-[var(--navy)] num leading-none">${N(res.annual)}</span>
            <span className="text-[13px] text-[var(--navy)]/60">/ year</span>
          </div>
          <div className="text-[13px] text-[var(--navy)]/65 mt-1.5 num">≈ ${N(res.monthly)} / month back to your bottom line</div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
            <div className="rounded-lg px-3 py-3 bg-[var(--navy)]/5 border border-[var(--navy)]/10"><div className="text-[var(--navy)]/55 uppercase tracking-wider">Toll savings</div><div className="display text-[var(--navy)] text-[18px] num mt-0.5">${N(res.toll)}<span className="text-[10px] text-[var(--navy)]/50"> /mo</span></div></div>
            <div className="rounded-lg px-3 py-3 bg-[var(--navy)]/5 border border-[var(--navy)]/10"><div className="text-[var(--navy)]/55 uppercase tracking-wider">Routing time</div><div className="display text-[var(--navy)] text-[18px] num mt-0.5">${N(res.labor)}<span className="text-[10px] text-[var(--navy)]/50"> /mo</span></div></div>
          </div>
          <a href="#quote" className="btn-primary w-full py-3.5 rounded-lg text-[14px] font-semibold mt-5 flex items-center justify-center gap-2"><span className="label">Price a route now</span></a>
          <button type="button" onClick={() => setRes(null)} className="mt-2.5 w-full py-2.5 rounded-lg text-[12px] font-semibold text-[var(--navy)] bg-[var(--navy)]/8 hover:bg-[var(--navy)]/14 transition flex items-center justify-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>Recalculate
          </button>
        </div>
      )}
    </div>
  );
}
