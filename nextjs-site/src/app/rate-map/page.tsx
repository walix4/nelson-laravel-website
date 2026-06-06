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
