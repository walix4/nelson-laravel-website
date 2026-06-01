"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type Box = { n: string; ic: string; L: number; W: number; H: number; cap: number; tare: number; pay: number };
const CN: Box[] = [
  { n: "20' Standard", ic: "dry", L: 19.4, W: 7.7, H: 7.9, cap: 1170, tare: 5070, pay: 47900 },
  { n: "40' Standard", ic: "dry", L: 39.5, W: 7.7, H: 7.9, cap: 2390, tare: 8160, pay: 59040 },
  { n: "40' High-Cube", ic: "dry", L: 39.5, W: 7.7, H: 8.9, cap: 2700, tare: 8750, pay: 58450 },
  { n: "45' High-Cube", ic: "dry", L: 44.5, W: 7.7, H: 8.9, cap: 3040, tare: 10580, pay: 56660 },
  { n: "20' Reefer", ic: "reefer", L: 17.8, W: 7.5, H: 7.5, cap: 1000, tare: 6610, pay: 46340 },
  { n: "40' Reefer HC", ic: "reefer", L: 37.9, W: 7.5, H: 8.2, cap: 2130, tare: 10780, pay: 56440 },
  { n: "20' Open Top", ic: "open", L: 19.3, W: 7.7, H: 7.8, cap: 1135, tare: 5510, pay: 47460 },
  { n: "40' Flat Rack", ic: "flat", L: 39.6, W: 6.8, H: 6.5, cap: 0, tare: 11630, pay: 85800 },
];
const IC: Record<string, string> = {
  dry: '<rect x="3" y="7" width="18" height="11" rx="1"/><path d="M3 11h18M8 7v11M13 7v11"/>',
  reefer: '<rect x="3" y="7" width="18" height="11" rx="1"/><path d="M7 11.5h0M7 14h2M9 10v5"/>',
  open: '<path d="M3 9v9h18V9"/><path d="M3 9l2-3h14l2 3M3 13h18"/>',
  flat: '<path d="M2 16h20M5 16v-3h14v3"/><circle cx="7" cy="18" r="1.4"/><circle cx="17.5" cy="18" r="1.4"/>',
};
const f1 = (v: number) => Math.round(v * 10) / 10;

export default function Page() {
  const [si, setSi] = useState(false);
  return (
    <ToolLayout eyebrow="Reference" title="Container Specs" desc="Interior dimensions, capacity and max payload for the boxes you move every day.">
      <div className="text-center -mt-4 mb-9">
        <div className="inline-flex rounded-xl border border-[var(--navy)]/12 overflow-hidden text-[13px] font-semibold">
          <button className={`px-5 py-2 ${!si ? "bg-[var(--navy)] text-white" : "text-[var(--navy)]"}`} onClick={() => setSi(false)}>US (ft / lb)</button>
          <button className={`px-5 py-2 ${si ? "bg-[var(--navy)] text-white" : "text-[var(--navy)]"}`} onClick={() => setSi(true)}>Metric (m / kg)</button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CN.map((c) => {
          const dims = si ? `${f1(c.L * 0.3048)} × ${f1(c.W * 0.3048)} × ${f1(c.H * 0.3048)} m` : `${f1(c.L)} × ${f1(c.W)} × ${f1(c.H)} ft`;
          const cap = c.cap ? (si ? `${f1(c.cap * 0.0283168).toLocaleString()} m³` : `${c.cap.toLocaleString()} cu ft`) : "—";
          const tare = si ? `${Math.round(c.tare * 0.453592).toLocaleString()} kg` : `${c.tare.toLocaleString()} lb`;
          const pay = si ? `${Math.round(c.pay * 0.453592).toLocaleString()} kg` : `${c.pay.toLocaleString()} lb`;
          return (
            <div key={c.n} className="bg-white rounded-[18px] p-6 reveal" style={{ border: "1px solid rgba(11,35,80,0.08)" }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-white" style={{ background: "linear-gradient(160deg,#0EA5E9,#1E3A8A)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: IC[c.ic] }} />
                </span>
                <div className="display text-[18px] text-[var(--navy)]">{c.n}</div>
              </div>
              {[["Interior", dims], ["Capacity", cap], ["Tare weight", tare], ["Max payload", pay]].map(([k, v], i, a) => (
                <div key={k} className="flex justify-between text-[13.5px] py-[7px]" style={{ borderBottom: i < a.length - 1 ? "1px dashed rgba(11,35,80,0.1)" : "none" }}>
                  <span className="text-[var(--muted)]">{k}</span><span className="font-semibold text-[var(--navy)]">{v}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </ToolLayout>
  );
}
