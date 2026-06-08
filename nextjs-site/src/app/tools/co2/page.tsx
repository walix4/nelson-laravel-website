"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function Page() {
  const [mi, setMi] = useState(372), [tons, setTons] = useState(18), [f, setF] = useState(0.161);
  const kg = mi * tons * f, diesel = mi * tons * 0.161;
  return (
    <ToolLayout title={<>CO&#8322; Emissions Records</>} desc="Estimate the carbon footprint of a container move, compare rail and electric drayage, and attach verifiable emissions data to the record.">
      <div className="bg-white rounded-[24px] p-7 md:p-10 reveal" style={{ border: "1px solid rgba(11,35,80,0.06)" }}>
        <div className="grid md:grid-cols-3 gap-5">
          <div><label className="tool-label">Distance (miles)</label><input className="tool-input" type="number" min={0} value={mi} onChange={(e) => setMi(+e.target.value)} /></div>
          <div><label className="tool-label">Cargo weight (tons)</label><input className="tool-input" type="number" min={0} value={tons} onChange={(e) => setTons(+e.target.value)} /></div>
          <div><label className="tool-label">Mode</label><select className="tool-select" value={f} onChange={(e) => setF(+e.target.value)}><option value={0.161}>Diesel truck</option><option value={0.09}>Rail + dray</option><option value={0.045}>Electric truck</option></select></div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-8 text-center">
          <div className="rounded-2xl py-7 text-white" style={{ background: "linear-gradient(160deg,#34D399,#059669)" }}><div className="display text-[40px] leading-none num">{Math.round(kg).toLocaleString()}</div><div className="text-[12px] mt-1.5 uppercase tracking-wider opacity-90">kg CO₂</div></div>
          <div className="rounded-2xl bg-[var(--navy)]/4 border border-[var(--navy)]/8 py-7"><div className="display text-[34px] text-[var(--navy)] num">{Math.max(0, Math.round(kg / 21))}</div><div className="text-[12px] text-[var(--muted)] mt-1.5 uppercase tracking-wider">Trees / yr to offset</div></div>
          <div className="rounded-2xl bg-[var(--navy)]/4 border border-[var(--navy)]/8 py-7"><div className="display text-[34px] text-[var(--navy)] num">{diesel > 0 ? Math.round((1 - kg / diesel) * 100) : 0}%</div><div className="text-[12px] text-[var(--muted)] mt-1.5 uppercase tracking-wider">Cut vs diesel</div></div>
        </div>
        <p className="text-[12px] text-[var(--muted)] mt-5 text-center">Based on ~0.161 kg CO₂ per ton-mile for diesel drayage (EPA SmartWay range). Directional only.</p>
      </div>
    </ToolLayout>
  );
}
