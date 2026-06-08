"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const PORTS: Record<string, [number, number]> = { "Los Angeles, CA": [33.74, -118.26], "Long Beach, CA": [33.75, -118.22], "Oakland, CA": [37.8, -122.3], "Seattle, WA": [47.6, -122.34], "New York / NJ": [40.66, -74.08], "Savannah, GA": [32.08, -81.1], "Houston, TX": [29.73, -95.27], "Miami, FL": [25.78, -80.18], "Baltimore, MD": [39.26, -76.55], "Charleston, SC": [32.78, -79.92] };
const DEST: Record<string, [number, number]> = { "Dallas, TX": [32.78, -96.8], "Chicago, IL": [41.88, -87.63], "Phoenix, AZ": [33.45, -112.07], "Denver, CO": [39.74, -104.99], "Atlanta, GA": [33.75, -84.39], "Memphis, TN": [35.15, -90.05], "Las Vegas, NV": [36.17, -115.14], "Columbus, OH": [39.96, -82.99], "Kansas City, MO": [39.1, -94.58], "Salt Lake City, UT": [40.76, -111.89] };
const hav = (a: [number, number], b: [number, number]) => { const R = 3958.8, t = Math.PI / 180; const dLat = (b[0] - a[0]) * t, dLon = (b[1] - a[1]) * t; const s = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * t) * Math.cos(b[0] * t) * Math.sin(dLon / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(s)); };

export default function Page() {
  const [o, setO] = useState("Los Angeles, CA");
  const [d, setD] = useState("Dallas, TX");
  const mi = Math.round(hav(PORTS[o], DEST[d]) * 1.2);
  const hrs = mi / 45; const h = Math.floor(hrs), m = Math.round((hrs - h) * 60);
  const rate = Math.round((350 + mi * 2.35) / 5) * 5;
  return (
    <ToolLayout title="Distance & Settlement Timing" desc="Pick an origin port and an inland destination to estimate move distance, transit time and an indicative payment amount.">
      <div className="bg-white rounded-[24px] p-7 md:p-10 reveal" style={{ border: "1px solid rgba(11,35,80,0.06)" }}>
        <div className="grid md:grid-cols-2 gap-5">
          <div><label className="tool-label">Origin port</label><select className="tool-select" value={o} onChange={(e) => setO(e.target.value)}>{Object.keys(PORTS).map((k) => <option key={k}>{k}</option>)}</select></div>
          <div><label className="tool-label">Destination</label><select className="tool-select" value={d} onChange={(e) => setD(e.target.value)}>{Object.keys(DEST).map((k) => <option key={k}>{k}</option>)}</select></div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          <div className="rounded-2xl bg-[var(--navy)]/4 border border-[var(--navy)]/8 py-6"><div className="display text-[34px] text-[var(--navy)] num">{mi.toLocaleString()}</div><div className="text-[12px] text-[var(--muted)] mt-1 uppercase tracking-wider">Miles</div></div>
          <div className="rounded-2xl bg-[var(--navy)]/4 border border-[var(--navy)]/8 py-6"><div className="display text-[34px] text-[var(--navy)] num">{h}h {m < 10 ? "0" : ""}{m}m</div><div className="text-[12px] text-[var(--muted)] mt-1 uppercase tracking-wider">Transit time</div></div>
          <div className="rounded-2xl bg-[var(--red)]/6 border border-[var(--red)]/15 py-6"><div className="display text-[34px] text-[var(--red)] num">${rate.toLocaleString()}</div><div className="text-[12px] text-[var(--muted)] mt-1 uppercase tracking-wider">Est. payment</div></div>
        </div>
        <p className="text-[12px] text-[var(--muted)] mt-5 text-center">Estimates use great-circle distance × a 1.2 road factor at 45 mph average. Get a firm, all-in payment on the payment calculator.</p>
      </div>
    </ToolLayout>
  );
}
