"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { geoAlbersUsa, geoPath } from "d3-geo";
import statesGeo from "@/data/us-states.geo.json";

const MPG = 7;
const DIESEL = 5.15;
const fuelOf = (miles: number) => (miles / MPG) * DIESEL;
const usd = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const W = 960;
const H = 600;
/* eslint-disable @typescript-eslint/no-explicit-any */
const projection = geoAlbersUsa().fitSize([W, H], statesGeo as any);
const pathGen = geoPath(projection);
const proj = (lng: number, lat: number): [number, number] => (projection([lng, lat]) as [number, number]) || [0, 0];
const statePaths = (statesGeo as any).features.map((f: any) => pathGen(f) || "");

type LngLat = [number, number];
type Port = { name: string; city: string; miles: number; color: string; port: LngLat; dest: LngLat };

const CITIES: Record<string, LngLat> = {
  Chicago: [-87.6298, 41.8781], Denver: [-104.9903, 39.7392], Dallas: [-96.797, 32.7767], Atlanta: [-84.388, 33.749],
  "Washington DC": [-77.0369, 38.9072], Charlotte: [-80.8431, 35.2271],
  "Salt Lake City": [-111.891, 40.7608], "Kansas City": [-94.5786, 39.0997], Phoenix: [-112.074, 33.4484],
};

const LEFT: Port[] = [
  { name: "Port of Seattle", city: "Chicago", miles: 2064, color: "#2B7CC4", port: [-122.33, 47.6], dest: CITIES.Chicago },
  { name: "Port of Oakland", city: "Denver", miles: 1235, color: "#34A853", port: [-122.27, 37.8], dest: CITIES.Denver },
  { name: "Port of LA / Long Beach", city: "Dallas", miles: 1419, color: "#E53535", port: [-118.19, 33.77], dest: CITIES.Dallas },
  { name: "Port of San Diego", city: "Dallas", miles: 1322, color: "#E0529B", port: [-117.16, 32.72], dest: CITIES.Dallas },
  { name: "Port of Houston", city: "Dallas", miles: 239, color: "#00B4B4", port: [-95.37, 29.76], dest: CITIES.Dallas },
  { name: "Port of New Orleans", city: "Dallas", miles: 504, color: "#00CC88", port: [-90.07, 29.95], dest: CITIES.Dallas },
];
const RIGHT: Port[] = [
  { name: "Port of New York / NJ", city: "Chicago", miles: 791, color: "#FF9A00", port: [-74.05, 40.7], dest: CITIES.Chicago },
  { name: "Port of Baltimore", city: "Washington DC", miles: 38, color: "#B06FD8", port: [-76.61, 39.29], dest: CITIES["Washington DC"] },
  { name: "Port of Virginia", city: "Charlotte", miles: 340, color: "#8C7BFF", port: [-76.29, 36.85], dest: CITIES.Charlotte },
  { name: "Port of Charleston", city: "Charlotte", miles: 211, color: "#2BC4A8", port: [-79.93, 32.78], dest: CITIES.Charlotte },
  { name: "Port of Savannah", city: "Atlanta", miles: 255, color: "#FF6B00", port: [-81.09, 32.08], dest: CITIES.Atlanta },
  { name: "Port of Tampa", city: "Atlanta", miles: 470, color: "#FFB300", port: [-82.46, 27.95], dest: CITIES.Atlanta },
  { name: "Port of Miami", city: "Atlanta", miles: 663, color: "#FFD700", port: [-80.19, 25.76], dest: CITIES.Atlanta },
];
const ALL = [...LEFT, ...RIGHT];
const DEST_NAMES = Array.from(new Set(ALL.map((p) => p.city)));
const REF_CITIES = ["Salt Lake City", "Kansas City", "Phoenix"];

function Card({ p, align }: { p: Port; align: "left" | "right" }) {
  return (
    <div className="rounded-lg p-3.5 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderLeft: align === "left" ? `3px solid ${p.color}` : undefined, borderRight: align === "right" ? `3px solid ${p.color}` : undefined }}>
      <div className="flex items-center gap-2">
        <span className="grid place-items-center rounded-md" style={{ width: 22, height: 22, background: `${p.color}22`, border: `1px solid ${p.color}55` }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2.5" /><path d="M12 7.5V21M5 12H2a10 10 0 0 0 20 0h-3M12 12l-4 4M12 12l4 4" /></svg>
        </span>
        <div className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-white leading-tight">{p.name}</div>
      </div>
      <div className="mt-2.5 flex items-center justify-between text-[11.5px]">
        <span className="text-white/55">Miles to {p.city}</span>
        <span className="num font-bold text-white">{p.miles.toLocaleString()}</span>
      </div>
      <div className="mt-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="mt-1.5 flex items-center justify-between text-[11.5px]">
        <span className="text-white/55">Fuel Cost</span>
        <span className="num font-extrabold" style={{ color: p.color }}>${usd(fuelOf(p.miles))}</span>
      </div>
    </div>
  );
}

export default function RateMapPage() {
  return (
    <>
      <Nav />
      <section className="py-9 md:py-12" style={{ background: "linear-gradient(160deg,#061A38 0%,#0B2350 60%,#0d3570 100%)" }}>
        <div className="max-w-[1500px] mx-auto px-5">
          {/* header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-7">
            <div>
              <div className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[var(--red)]">Port terminals drayage rate guide</div>
              <h1 className="display text-[34px] md:text-[50px] text-white leading-[1.02] mt-2">Drayage Rate Map</h1>
              <p className="mt-2.5 text-white/60 text-[14.5px] max-w-xl">Average over-the-road fuel cost from every major U.S. container port to its nearest inland hub.</p>
            </div>
            <div className="rounded-xl p-4 w-full lg:w-[340px] shrink-0" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,0,0.35)" }}>
              <div className="text-[10.5px] uppercase tracking-[0.16em] font-bold text-[var(--red)]">Rate calculation assumptions</div>
              <div className="mt-3 flex items-center justify-between text-[12.5px]"><span className="text-white/70">Miles per gallon (diesel)</span><span className="num font-extrabold text-white">{MPG} MPG</span></div>
              <div className="mt-2 flex items-center justify-between text-[12.5px]"><span className="text-white/70">Diesel price per gallon</span><span className="num font-extrabold text-white">${DIESEL.toFixed(2)}</span></div>
              <div className="mt-3 rounded-md px-3 py-2 text-[11.5px] num font-semibold text-white/90 text-center" style={{ background: "rgba(255,107,0,0.16)", border: "1px solid rgba(255,107,0,0.3)" }}>(Total miles ÷ {MPG}) × ${DIESEL.toFixed(2)} = Fuel Cost</div>
            </div>
          </div>

          {/* main grid */}
          <div className="grid lg:grid-cols-[235px_1fr_235px] gap-5 items-start">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3 order-2 lg:order-1">
              {LEFT.map((p) => <Card key={p.name} p={p} align="left" />)}
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative w-full rounded-2xl overflow-hidden" style={{ background: "radial-gradient(700px 420px at 50% 28%,rgba(58,95,192,0.18),transparent 70%),linear-gradient(160deg,#0a2350,#06143A)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="US drayage rate map">
                  {/* states */}
                  {statePaths.map((d: string, i: number) => (
                    <path key={i} d={d} fill="rgba(151,170,200,0.42)" stroke="rgba(11,35,80,0.55)" strokeWidth={0.6} strokeLinejoin="round" />
                  ))}
                  {/* connector lines */}
                  {ALL.map((p) => {
                    const a = proj(p.port[0], p.port[1]); const b = proj(p.dest[0], p.dest[1]);
                    return <line key={p.name} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={p.color} strokeWidth={2.4} strokeLinecap="round" opacity={0.9} />;
                  })}
                  {/* reference cities */}
                  {REF_CITIES.map((c) => { const [x, y] = proj(CITIES[c][0], CITIES[c][1]); return (
                    <g key={c}><circle cx={x} cy={y} r={3.2} fill="rgba(255,255,255,0.55)" /><text x={x + 7} y={y + 3.5} fill="rgba(255,255,255,0.6)" fontSize={11} fontWeight={600} letterSpacing="0.5">{c.toUpperCase()}</text></g>
                  ); })}
                  {/* destination cities */}
                  {DEST_NAMES.map((c) => { const [x, y] = proj(CITIES[c][0], CITIES[c][1]); return (
                    <g key={c}><circle cx={x} cy={y} r={4.5} fill="#fff" stroke="rgba(255,255,255,0.35)" strokeWidth={4} /><circle cx={x} cy={y} r={4.5} fill="#fff" /><text x={x + 9} y={y + 4} fill="#fff" fontSize={12.5} fontWeight={800} letterSpacing="0.5" style={{ paintOrder: "stroke", stroke: "rgba(6,20,56,0.85)", strokeWidth: 3 }}>{c.toUpperCase()}</text></g>
                  ); })}
                  {/* port dots */}
                  {ALL.map((p) => { const [x, y] = proj(p.port[0], p.port[1]); return (
                    <g key={p.name}><circle cx={x} cy={y} r={9} fill={p.color} opacity={0.18} /><circle cx={x} cy={y} r={5.5} fill={p.color} stroke="#fff" strokeWidth={1.2} /></g>
                  ); })}
                </svg>
              </div>
              <div className="mt-4 rounded-lg p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-[10.5px] uppercase tracking-[0.16em] font-bold text-[var(--red)]">How to read this map</div>
                <div className="mt-2.5 grid sm:grid-cols-3 gap-3 text-[12px] text-white/70">
                  <div className="flex gap-2"><span className="num font-bold" style={{ color: "var(--red)" }}>1.</span> Pick your port terminal from either side.</div>
                  <div className="flex gap-2"><span className="num font-bold" style={{ color: "var(--red)" }}>2.</span> Follow the line to its inland hub & total miles.</div>
                  <div className="flex gap-2"><span className="num font-bold" style={{ color: "var(--red)" }}>3.</span> Fuel cost = (miles ÷ {MPG}) × ${DIESEL.toFixed(2)}.</div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3 order-3">
              {RIGHT.map((p) => <Card key={p.name} p={p} align="right" />)}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
