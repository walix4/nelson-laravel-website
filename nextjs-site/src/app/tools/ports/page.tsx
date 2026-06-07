"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type P = { n: string; c: string; r: string; t: string; v: string };
const PT: P[] = [
  { n: "Port of Los Angeles", c: "San Pedro, CA", r: "West", t: "Sea", v: "9.2M TEU" }, { n: "Port of Long Beach", c: "Long Beach, CA", r: "West", t: "Sea", v: "9.1M TEU" }, { n: "Port of Oakland", c: "Oakland, CA", r: "West", t: "Sea", v: "2.3M TEU" }, { n: "Northwest Seaport (Seattle)", c: "Seattle, WA", r: "West", t: "Sea", v: "3.4M TEU" }, { n: "Port of Tacoma", c: "Tacoma, WA", r: "West", t: "Sea", v: "2.1M TEU" }, { n: "Port of Portland", c: "Portland, OR", r: "West", t: "Sea", v: "0.3M TEU" },
  { n: "Port of New York & NJ", c: "Elizabeth, NJ", r: "East", t: "Sea", v: "9.5M TEU" }, { n: "Port of Savannah", c: "Savannah, GA", r: "East", t: "Sea", v: "5.9M TEU" }, { n: "Port of Virginia", c: "Norfolk, VA", r: "East", t: "Sea", v: "3.7M TEU" }, { n: "Port of Charleston", c: "Charleston, SC", r: "East", t: "Sea", v: "2.8M TEU" }, { n: "Port of Baltimore", c: "Baltimore, MD", r: "East", t: "Sea", v: "1.1M TEU" }, { n: "PortMiami", c: "Miami, FL", r: "East", t: "Sea", v: "1.2M TEU" }, { n: "Port Everglades", c: "Fort Lauderdale, FL", r: "East", t: "Sea", v: "1.0M TEU" }, { n: "Port of Jacksonville", c: "Jacksonville, FL", r: "East", t: "Sea", v: "1.4M TEU" },
  { n: "Port of Houston", c: "La Porte, TX", r: "Gulf", t: "Sea", v: "4.0M TEU" }, { n: "Port of New Orleans", c: "New Orleans, LA", r: "Gulf", t: "Sea", v: "0.6M TEU" }, { n: "Port of Mobile", c: "Mobile, AL", r: "Gulf", t: "Sea", v: "0.6M TEU" },
  { n: "BNSF Logistics Park", c: "Chicago, IL", r: "Rail", t: "Rail", v: "Class I ramp" }, { n: "UP Global IV", c: "Joliet, IL", r: "Rail", t: "Rail", v: "Class I ramp" }, { n: "CSX Fairburn", c: "Atlanta, GA", r: "Rail", t: "Rail", v: "Class I ramp" }, { n: "BNSF Alliance", c: "Fort Worth, TX", r: "Rail", t: "Rail", v: "Class I ramp" },
  { n: "Inland Empire Hub", c: "Ontario, CA", r: "Inland", t: "Inland", v: "Distribution" }, { n: "Memphis Intermodal", c: "Memphis, TN", r: "Inland", t: "Inland", v: "Distribution" }, { n: "Columbus Rickenbacker", c: "Columbus, OH", r: "Inland", t: "Inland", v: "Distribution" }, { n: "Kansas City SmartPort", c: "Kansas City, MO", r: "Inland", t: "Inland", v: "Distribution" }, { n: "Denver Inland Port", c: "Denver, CO", r: "Inland", t: "Inland", v: "Distribution" },
];
const COLOR: Record<string, string> = { West: "linear-gradient(160deg,#22D3EE,#3A5FC0)", East: "linear-gradient(160deg,#4C6FE0,#1E3A8A)", Gulf: "linear-gradient(160deg,#FB923C,#0086c2)", Rail: "linear-gradient(160deg,#8B5CF6,#6D28D9)", Inland: "linear-gradient(160deg,#34D399,#059669)" };
const TAG: Record<string, { bg: string; c: string }> = { Sea: { bg: "rgba(58,95,192,0.13)", c: "#3A5FC0" }, Rail: { bg: "rgba(139,92,246,0.14)", c: "#6D28D9" }, Inland: { bg: "rgba(22,181,113,0.14)", c: "#15935F" } };
const FILTERS = ["all", "West", "East", "Gulf", "Rail", "Inland"];

export default function Page() {
  const [q, setQ] = useState(""), [f, setF] = useState("all");
  const list = PT.filter((p) => (f === "all" || p.r === f || p.t === f) && (!q || (p.n + " " + p.c).toLowerCase().includes(q.toLowerCase())));
  return (
    <ToolLayout eyebrow="Port directory" title="See all U.S. ports" desc="Every sea, rail and inland port we price drayage to. Search by name or state, or filter by coast and type.">
      <div className="reveal">
        <div className="relative max-w-xl mx-auto">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(11,35,80,0.4)" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          <input className="tool-input" style={{ paddingLeft: "2.8rem" }} placeholder="Search ports, cities or states…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="flex flex-wrap justify-center gap-2.5 mt-5">
          {FILTERS.map((x) => (
            <button key={x} onClick={() => setF(x)} className="text-[13px] font-semibold px-4 py-2 rounded-full transition" style={f === x ? { background: "var(--navy)", color: "#fff", border: "1px solid var(--navy)" } : { color: "var(--muted)", background: "#fff", border: "1px solid rgba(11,35,80,0.14)" }}>{x === "all" ? "All" : x === "Rail" ? "Rail ramps" : x === "West" || x === "East" ? `${x} Coast` : x}</button>
          ))}
        </div>
        <div className="text-center text-[13px] text-[var(--muted)] mt-4"><b className="text-[var(--navy)]">{list.length}</b> ports</div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {list.map((p) => (
          <div key={p.n} className="bg-white rounded-[16px] p-[18px] flex items-center gap-3.5" style={{ border: "1px solid rgba(11,35,80,0.08)" }}>
            <span className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center text-white flex-shrink-0" style={{ background: COLOR[p.r] }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" /><circle cx="12" cy="11" r="2.4" /></svg>
            </span>
            <div className="min-w-0 flex-1"><div className="font-semibold text-[var(--navy)] text-[15px] truncate">{p.n}</div><div className="text-[12.5px] text-[var(--muted)]">{p.c} · {p.v}</div></div>
            <span className="text-[10.5px] font-bold uppercase px-[9px] py-[3px] rounded-full" style={{ background: TAG[p.t].bg, color: TAG[p.t].c }}>{p.t}</span>
          </div>
        ))}
      </div>
      {list.length === 0 && <div className="text-center text-[var(--muted)] py-16">No ports match your search.</div>}
    </ToolLayout>
  );
}
