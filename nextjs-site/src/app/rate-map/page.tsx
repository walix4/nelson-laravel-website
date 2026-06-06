"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { geoAlbersUsa, geoPath } from "d3-geo";
import * as topojson from "topojson-client";
import usTopo from "@/data/us-states-10m.json";

const W = 960;
const H = 600;
/* eslint-disable @typescript-eslint/no-explicit-any */

type Region = { key: string; title: string; color: string; states: string[] };
const REGIONS: Region[] = [
  { key: "1", title: "Region 1", color: "#4F8FE0", states: ["Washington", "Oregon", "Idaho", "Montana", "Wyoming"] },
  { key: "2", title: "Region 2", color: "#33B0A2", states: ["North Dakota", "South Dakota", "Nebraska", "Kansas", "Minnesota", "Iowa", "Missouri", "Wisconsin", "Illinois", "Michigan", "Indiana", "Ohio", "Kentucky"] },
  { key: "3", title: "Region 3", color: "#9B7BE6", states: ["Maine", "New Hampshire", "Vermont", "Massachusetts", "New York", "Rhode Island", "Connecticut", "New Jersey", "Pennsylvania"] },
  { key: "4", title: "Region 4", color: "#F08A45", states: ["California", "Nevada", "Arizona", "New Mexico", "Utah", "Colorado"] },
  { key: "5", title: "Region 5", color: "#E0566F", states: ["Texas", "Oklahoma", "Louisiana", "Arkansas"] },
  { key: "6", title: "Region 6", color: "#E6B53C", states: ["West Virginia", "Delaware", "Maryland", "Virginia", "District of Columbia", "Tennessee", "North Carolina", "South Carolina", "Georgia", "Alabama", "Mississippi", "Florida"] },
];
const UNASSIGNED = { title: "Unassigned Region", color: "#7E8CA3", states: ["Alaska", "Hawaii"] };
const DISPLAY: Record<string, string> = { "District of Columbia": "Wash. D.C." };

const REGION_OF: Record<string, string> = {};
REGIONS.forEach((r) => r.states.forEach((s) => { REGION_OF[s] = r.key; }));
UNASSIGNED.states.forEach((s) => { REGION_OF[s] = "U"; });
const COLOR_OF: Record<string, string> = { U: UNASSIGNED.color };
REGIONS.forEach((r) => { COLOR_OF[r.key] = r.color; });

const usGeo = topojson.feature(usTopo as any, (usTopo as any).objects.states) as any;
const projection = geoAlbersUsa().fitSize([W, H], usGeo);
const pathGen = geoPath(projection);
const stateShapes = usGeo.features.map((f: any) => ({ d: pathGen(f) || "", region: REGION_OF[f.properties?.name] }));
const proj = (lng: number, lat: number): [number, number] => (projection([lng, lat]) as [number, number]) || [0, 0];

// port -> inland hub routes (from the rate map)
type LngLat = [number, number];
type Route = { name: string; color: string; port: LngLat; dest: LngLat };
const CITY: Record<string, LngLat> = {
  Chicago: [-87.6298, 41.8781], Denver: [-104.9903, 39.7392], Dallas: [-96.797, 32.7767], Atlanta: [-84.388, 33.749],
  "Washington DC": [-77.0369, 38.9072], Charlotte: [-80.8431, 35.2271],
};
const ROUTES: Route[] = [
  { name: "Seattle", color: "#2B7CC4", port: [-122.33, 47.6], dest: CITY.Chicago },
  { name: "Oakland", color: "#34A853", port: [-122.27, 37.8], dest: CITY.Denver },
  { name: "LA / Long Beach", color: "#E53535", port: [-118.19, 33.77], dest: CITY.Dallas },
  { name: "San Diego", color: "#E0529B", port: [-117.16, 32.72], dest: CITY.Dallas },
  { name: "Houston", color: "#00B4B4", port: [-95.37, 29.76], dest: CITY.Dallas },
  { name: "New Orleans", color: "#00CC88", port: [-90.07, 29.95], dest: CITY.Dallas },
  { name: "New York / NJ", color: "#FF9A00", port: [-74.05, 40.7], dest: CITY.Chicago },
  { name: "Baltimore", color: "#B06FD8", port: [-76.61, 39.29], dest: CITY["Washington DC"] },
  { name: "Virginia", color: "#8C7BFF", port: [-76.29, 36.85], dest: CITY.Charlotte },
  { name: "Charleston", color: "#2BC4A8", port: [-79.93, 32.78], dest: CITY.Charlotte },
  { name: "Savannah", color: "#FF6B00", port: [-81.09, 32.08], dest: CITY.Atlanta },
  { name: "Tampa", color: "#FFB300", port: [-82.46, 27.95], dest: CITY.Atlanta },
  { name: "Miami", color: "#FFD700", port: [-80.19, 25.76], dest: CITY.Atlanta },
];
const DEST_NAMES = Array.from(new Set(ROUTES.map((r) => Object.keys(CITY).find((k) => CITY[k] === r.dest)!)));

function RegionCard({ title, color, states }: { title: string; color: string; states: string[] }) {
  return (
    <div className="rounded-lg p-3.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="flex items-center gap-2">
        <span className="rounded" style={{ width: 12, height: 12, background: color, border: "1px solid rgba(255,255,255,0.35)" }} />
        <div className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-[var(--red)]">{title}</div>
      </div>
      <div className="mt-2 text-[11.5px] leading-[1.65] text-white/70">{states.map((s) => DISPLAY[s] || s).join(" · ")}</div>
    </div>
  );
}

export default function RateMapPage() {
  return (
    <>
      <Nav />
      <section className="py-9 md:py-12" style={{ background: "linear-gradient(160deg,#061A38 0%,#0B2350 60%,#0d3570 100%)" }}>
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="max-w-2xl mb-7">
            <div className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[var(--red)]">Drayage service coverage</div>
            <h1 className="display text-[34px] md:text-[50px] text-white leading-[1.02] mt-2">Our 6 Service Regions</h1>
            <p className="mt-2.5 text-white/60 text-[14.5px] max-w-xl">Nationwide drayage coverage organized into six operating regions, port to door.</p>
          </div>

          {/* region map */}
          <div className="mx-auto max-w-[1000px]">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="US drayage service regions">
              {stateShapes.map((s: { d: string; region?: string }, i: number) => (
                <path key={i} d={s.d} fill={s.region ? COLOR_OF[s.region] : "#54657F"} stroke="#0B2350" strokeWidth={0.9} strokeLinejoin="round" />
              ))}
              {/* connector routes (white casing + colored line) */}
              {ROUTES.map((r) => { const a = proj(...r.port); const b = proj(...r.dest); return (
                <g key={r.name}><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="rgba(6,20,56,0.55)" strokeWidth={4} strokeLinecap="round" /><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={r.color} strokeWidth={2.4} strokeLinecap="round" /></g>
              ); })}
              {/* destination cities */}
              {DEST_NAMES.map((c) => { const [x, y] = proj(...CITY[c]); return (
                <g key={c}><circle cx={x} cy={y} r={4.5} fill="#fff" stroke="#0B2350" strokeWidth={1.5} /><text x={x + 9} y={y + 4} fill="#fff" fontSize={12.5} fontWeight={800} letterSpacing="0.5" style={{ paintOrder: "stroke", stroke: "rgba(6,20,56,0.9)", strokeWidth: 3 }}>{c.toUpperCase()}</text></g>
              ); })}
              {/* port dots */}
              {ROUTES.map((r) => { const [x, y] = proj(...r.port); return (
                <g key={"p" + r.name}><circle cx={x} cy={y} r={9} fill={r.color} opacity={0.22} /><circle cx={x} cy={y} r={5.5} fill={r.color} stroke="#fff" strokeWidth={1.5} /></g>
              ); })}
            </svg>
          </div>

          {/* region legends */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {REGIONS.map((r) => <RegionCard key={r.key} title={r.title} color={r.color} states={r.states} />)}
            <RegionCard title={UNASSIGNED.title} color={UNASSIGNED.color} states={UNASSIGNED.states} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
