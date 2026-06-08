"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function Page() {
  const [qty, setQty] = useState(3), [days, setDays] = useState(9), [free, setFree] = useState(4), [dem, setDem] = useState(165), [det, setDet] = useState(120);
  const charge = Math.max(0, days - free);
  const demTot = charge * dem * qty, detTot = charge * det * qty;
  const N = (n: number) => n.toLocaleString();
  return (
    <ToolLayout title="Demurrage & Detention Records" desc="Calculate per-diem exposure on containers sitting past their free time — at the terminal (demurrage) and on your equipment (detention) — then anchor the figures to the shipment record.">
      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="bg-white rounded-[24px] p-7 md:p-9 reveal" style={{ border: "1px solid rgba(11,35,80,0.06)" }}>
          <div className="space-y-5">
            <div><label className="tool-label">Containers</label><input className="tool-input" type="number" min={1} value={qty} onChange={(e) => setQty(+e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="tool-label">Total days held</label><input className="tool-input" type="number" min={0} value={days} onChange={(e) => setDays(+e.target.value)} /></div>
              <div><label className="tool-label">Free days</label><input className="tool-input" type="number" min={0} value={free} onChange={(e) => setFree(+e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="tool-label">Demurrage / day ($)</label><input className="tool-input" type="number" min={0} value={dem} onChange={(e) => setDem(+e.target.value)} /></div>
              <div><label className="tool-label">Detention / day ($)</label><input className="tool-input" type="number" min={0} value={det} onChange={(e) => setDet(+e.target.value)} /></div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--navy)] text-white rounded-[24px] p-7 md:p-9 reveal flex flex-col justify-center">
          <div className="text-[12px] uppercase tracking-[0.16em] text-white/60">Chargeable days</div>
          <div className="display text-[26px] mt-1 num">{charge} per container</div>
          <div className="h-px bg-white/15 my-6" />
          <div className="flex justify-between text-[14px] text-white/80"><span>Demurrage</span><span className="num">${N(demTot)}</span></div>
          <div className="flex justify-between text-[14px] text-white/80 mt-2"><span>Detention</span><span className="num">${N(detTot)}</span></div>
          <div className="h-px bg-white/15 my-5" />
          <div className="flex justify-between items-end"><span className="text-[14px] text-white/70">Total exposure</span><span className="display text-[40px] leading-none num">${N(demTot + detTot)}</span></div>
        </div>
      </div>
      <p className="text-[12px] text-[var(--muted)] mt-5 text-center reveal">Indicative only — actual tariffs vary by carrier and terminal.</p>
    </ToolLayout>
  );
}
