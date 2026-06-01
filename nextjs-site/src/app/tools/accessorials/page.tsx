"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const AC = [
  { n: "Chassis rental", d: "Daily charge for the wheeled frame the container rides on, when not using your own.", p: "$25–45 / day" },
  { n: "Chassis split", d: "Fee when the chassis and container are stored at different locations and must be combined.", p: "$75–150" },
  { n: "Pre-pull", d: "Pulling a container from the terminal early to beat last free day, then storing it short-term.", p: "$125–250" },
  { n: "Drop & hook", d: "Dropping the loaded container at the consignee and picking up an empty later, instead of waiting.", p: "$50–100" },
  { n: "Detention", d: "Charge when your driver waits beyond free time (usually 1–2 hrs) at pickup or delivery.", p: "$60–90 / hr" },
  { n: "Demurrage", d: "Terminal charge for a container sitting past its free days at the port.", p: "$150–300 / day" },
  { n: "Per diem", d: "Carrier charge for keeping the container/equipment past the allowed free days.", p: "$100–185 / day" },
  { n: "Congestion / pier pass", d: "Port traffic-mitigation fee (e.g. PierPass at LA/LB) on peak-hour moves.", p: "$35–80" },
  { n: "Tolls", d: "Highway, bridge and turnpike tolls along the drayage route, passed through at cost.", p: "At cost" },
  { n: "Hazmat", d: "Surcharge for moving hazardous materials requiring certified drivers and placarding.", p: "$75–200" },
  { n: "Overweight", d: "Surcharge for loads over legal axle/gross weight needing permits or special equipment.", p: "$100–350" },
  { n: "Reefer plug / genset", d: "Powering a refrigerated container in transit or at yard via genset or plug-in.", p: "$60–150 / day" },
  { n: "Scale / weigh", d: "Stopping at a certified scale to verify gross weight (often required for export).", p: "$25–60" },
  { n: "Yard storage", d: "Holding a container in the carrier yard between pickup and delivery.", p: "$30–55 / day" },
  { n: "Bobtail / dry run", d: "Driver dispatched but unable to complete the move (container not ready, etc.).", p: "$95–175" },
  { n: "Stop-off", d: "Additional intermediate stop for partial unload or cross-dock on the route.", p: "$50–120 / stop" },
];

export default function Page() {
  const [q, setQ] = useState("");
  const list = AC.filter((a) => !q || (a.n + " " + a.d).toLowerCase().includes(q.toLowerCase()));
  return (
    <ToolLayout eyebrow="Reference" title="Accessorial Guide" desc="Every drayage line-item, in plain English — what it is, when it hits, and a typical U.S. range.">
      <div className="relative max-w-xl mx-auto mb-6 reveal">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(11,35,80,0.4)" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
        <input className="tool-input" style={{ paddingLeft: "2.8rem" }} placeholder="Search accessorials…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((a) => (
          <div key={a.n} className="bg-white rounded-[16px] p-5 reveal" style={{ border: "1px solid rgba(11,35,80,0.08)" }}>
            <div className="flex items-start justify-between gap-3"><h3 className="text-[15.5px] font-bold text-[var(--navy)]">{a.n}</h3><span className="text-[12.5px] font-bold whitespace-nowrap px-[11px] py-1 rounded-full" style={{ color: "#15935F", background: "rgba(22,181,113,0.12)" }}>{a.p}</span></div>
            <p className="text-[13.5px] text-[var(--muted)] leading-[1.55] mt-1.5">{a.d}</p>
          </div>
        ))}
      </div>
      {list.length === 0 && <div className="text-center text-[var(--muted)] py-12">No accessorials match your search.</div>}
    </ToolLayout>
  );
}
