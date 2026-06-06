"use client";
import { useState } from "react";
import GlassSelect from "@/components/GlassSelect";
import PortSelect from "@/components/PortSelect";

const PORTS = [
  "APM Terminals — Elizabeth, NJ", "Maher Terminals — Elizabeth, NJ", "Port Newark Container Terminal — Newark, NJ",
  "GCT Bayonne — Bayonne, NJ", "GCT New York — Staten Island, NY",
  "APM Terminals (Pier 400) — Los Angeles, CA", "Fenix Marine (Pier 300) — Los Angeles, CA", "Yusen Terminals — Los Angeles, CA",
  "Long Beach Container Terminal (Pier E) — Long Beach, CA", "Total Terminals (Pier T) — Long Beach, CA", "ITS (Pier G) — Long Beach, CA",
  "TraPac — Oakland, CA", "SSA Terminal (Pier J) — Oakland, CA",
  "Terminal 18 (SSA) — Seattle, WA", "Husky Terminal — Tacoma, WA",
  "Barbours Cut — Houston, TX", "Bayport Container Terminal — Houston, TX",
  "Garden City Terminal — Savannah, GA", "Wando Welch Terminal — Charleston, SC", "Hugh K. Leatherman Terminal — Charleston, SC",
  "Norfolk International Terminals — Norfolk, VA", "Virginia International Gateway — Portsmouth, VA",
  "Seagirt Marine Terminal — Baltimore, MD", "Packer Avenue Marine Terminal — Philadelphia, PA", "Conley Terminal — Boston, MA",
  "POMTOC — Miami, FL", "South Florida Container Terminal — Miami, FL", "Port Everglades — Fort Lauderdale, FL",
  "Blount Island (JAXPORT) — Jacksonville, FL", "Napoleon Avenue Terminal — New Orleans, LA",
  "APM Terminals — Mobile, AL", "Terminal 6 — Portland, OR",
];

const N = (n: number) => n.toLocaleString();
const fieldCls = "w-full rounded bg-white/[0.07] px-3 py-2.5 text-[14px] text-white placeholder-white/45 focus:outline-none focus:bg-white/[0.16] transition";
const labelCls = "block text-[10.5px] font-semibold uppercase tracking-[0.06em] text-white/65 mb-1.5";

export default function TollSavings() {
  const [spend, setSpend] = useState("");
  const [fleet, setFleet] = useState("");
  const [tollVeh, setTollVeh] = useState("");
  const [vType, setVType] = useState("trucks");
  const [avoid, setAvoid] = useState("yes");
  const [ftes, setFtes] = useState("");
  const [hours, setHours] = useState("30");
  const [from, setFrom] = useState("APM Terminals — Elizabeth, NJ");
  const [to, setTo] = useState("New York, NY, USA");
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
    <div className="reveal rounded-md bg-white/[0.08] border border-[#FF6B00]/30 backdrop-blur-sm shadow-2xl p-6 md:p-7 w-full max-w-[460px] mx-auto lg:mx-0 h-full flex flex-col">
      {!res && (
        <form onSubmit={calc} className="flex flex-col h-full">
          <h3 className="display text-[20px] md:text-[22px] text-white leading-tight">Calculate your toll savings</h3>
          <p className="text-[12.5px] text-white/55 mt-1.5">See what accurate toll data saves your fleet.</p>
          <div className="mt-5 space-y-3.5">
            <div><label className={labelCls}>Select port terminal <span className="text-[#FF6B00]">*</span></label><PortSelect value={from} onChange={setFrom} options={PORTS} placeholder="Select port terminal" /></div>
            <div><label className={labelCls}>Enter drop off address <span className="text-[#FF6B00]">*</span></label><input className={fieldCls} required value={to} onChange={(e) => setTo(e.target.value)} placeholder="Enter drop-off address" /></div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3.5 flex-1 content-start">
            <div><label className={labelCls}>Monthly toll spend ($)</label><input className={fieldCls} type="number" min={0} placeholder="0" required value={spend} onChange={(e) => setSpend(e.target.value)} /></div>
            <div><label className={labelCls}>Vehicles in fleet</label><input className={fieldCls} type="number" min={0} placeholder="0" required value={fleet} onChange={(e) => setFleet(e.target.value)} /></div>
            <div><label className={labelCls}>On toll roads</label><input className={fieldCls} type="number" min={0} placeholder="0" required value={tollVeh} onChange={(e) => setTollVeh(e.target.value)} /></div>
            <div><label className={labelCls}>Vehicle type</label><GlassSelect value={vType} onChange={setVType} options={[["trucks","Trucks"],["mixed","Mixed fleet"],["vans","Cars / vans"]]} /></div>
            <div><label className={labelCls}>Avoid toll roads?</label><GlassSelect value={avoid} onChange={setAvoid} options={[["yes","Yes"],["no","No"]]} /></div>
            <div><label className={labelCls}>FTEs on routing</label><input className={fieldCls} type="number" min={0} placeholder="0" required value={ftes} onChange={(e) => setFtes(e.target.value)} /></div>
            <div className="col-span-2"><label className={labelCls}>Hours / month each FTE spends on routing</label><input className={fieldCls} type="number" min={0} required value={hours} onChange={(e) => setHours(e.target.value)} /></div>
          </div>
          <button type="submit" className="btn-primary w-full py-3.5 rounded-md text-[14px] font-semibold mt-5"><span className="label">Calculate Savings</span></button>
        </form>
      )}

      {res && (
        <div className="flex flex-col h-full justify-center">
          <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#7CF0B0] flex items-center gap-1.5"><span className="live-dot" /> Estimated savings</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="display text-[44px] md:text-[50px] text-white num leading-none">${N(res.annual)}</span>
            <span className="text-[13px] text-white/60">/ year</span>
          </div>
          <div className="text-[13px] text-white/70 mt-1.5 num">≈ ${N(res.monthly)} / month back to your bottom line</div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
            <div className="rounded px-3 py-3 bg-white/[0.08]"><div className="text-white/55 uppercase tracking-wider">Toll savings</div><div className="display text-white text-[18px] num mt-0.5">${N(res.toll)}<span className="text-[10px] text-white/50"> /mo</span></div></div>
            <div className="rounded px-3 py-3 bg-white/[0.08]"><div className="text-white/55 uppercase tracking-wider">Routing time</div><div className="display text-white text-[18px] num mt-0.5">${N(res.labor)}<span className="text-[10px] text-white/50"> /mo</span></div></div>
          </div>
          <a href="#quote" className="btn-primary w-full py-3.5 rounded-md text-[14px] font-semibold mt-5 flex items-center justify-center gap-2"><span className="label">Price a route now</span></a>
          <button type="button" onClick={() => setRes(null)} className="mt-2.5 w-full py-2.5 rounded text-[12px] font-semibold text-white/85 bg-white/10 hover:bg-white/15 transition flex items-center justify-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>Recalculate
          </button>
        </div>
      )}
    </div>
  );
}
