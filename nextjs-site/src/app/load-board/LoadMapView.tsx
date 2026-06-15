"use client";
import { useEffect, useState } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const W = 960, H = 580;

const LOAD_COORDS: Record<string, [number, number]> = {
  "DG-4821": [33.77, -118.19],
  "DG-4822": [40.68, -74.15],
  "DG-4823": [31.98, -81.10],
  "DG-4824": [29.73, -95.27],
  "DG-4825": [47.55, -122.43],
  "DG-4826": [25.77, -80.17],
  "DG-4827": [41.86, -87.63],
  "DG-4828": [36.92, -76.30],
  "DG-4829": [39.27, -76.58],
  "DG-4830": [33.73, -118.27],
  "DG-4831": [32.79, -96.97],
  "DG-4832": [32.79, -79.95],
};

const BG_CLUSTERS = [
  { lat: 45.52, lng: -122.68, count: 6 },
  { lat: 37.77, lng: -122.42, count: 28 },
  { lat: 32.72, lng: -117.16, count: 15 },
  { lat: 33.45, lng: -112.07, count: 4 },
  { lat: 39.74, lng: -104.99, count: 12 },
  { lat: 40.76, lng: -111.89, count: 5 },
  { lat: 44.98, lng: -93.27, count: 23 },
  { lat: 39.10, lng: -94.58, count: 18 },
  { lat: 38.63, lng: -90.20, count: 11 },
  { lat: 35.15, lng: -90.05, count: 9 },
  { lat: 33.75, lng: -84.39, count: 19 },
  { lat: 42.33, lng: -83.05, count: 14 },
  { lat: 41.50, lng: -81.69, count: 8 },
  { lat: 39.95, lng: -75.17, count: 22 },
  { lat: 42.36, lng: -71.06, count: 16 },
  { lat: 35.23, lng: -80.84, count: 7 },
  { lat: 29.95, lng: -90.07, count: 13 },
  { lat: 43.05, lng: -76.15, count: 3 },
  { lat: 30.33, lng: -81.66, count: 8 },
  { lat: 44.52, lng: -88.01, count: 5 },
  { lat: 36.17, lng: -86.78, count: 10 },
  { lat: 35.46, lng: -97.52, count: 6 },
  { lat: 30.07, lng: -99.14, count: 4 },
  { lat: 31.55, lng: -97.15, count: 7 },
];

interface LoadItem {
  id: string;
  origin: string;
  dest: string;
  rate: number;
  miles: number;
  type: string;
}

interface Props {
  loads: LoadItem[];
  onMarkerClick: () => void;
}

export default function LoadMapView({ loads, onMarkerClick }: Props) {
  const [topo, setTopo] = useState<any>(null);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
      .then(r => r.json())
      .then(setTopo)
      .catch(console.error);
  }, []);

  const proj = geoAlbersUsa().scale(1100).translate([490, 295]);
  const pathGen = geoPath().projection(proj);

  // Group loads that project close together
  const markers: { x: number; y: number; ids: string[]; origin: string }[] = [];
  loads.forEach(load => {
    const coords = LOAD_COORDS[load.id];
    if (!coords) return;
    const pt = proj([coords[1], coords[0]]);
    if (!pt) return;
    const [x, y] = pt;
    const existing = markers.find(m => Math.hypot(m.x - x, m.y - y) < 28);
    if (existing) {
      existing.ids.push(load.id);
    } else {
      markers.push({ x, y, ids: [load.id], origin: load.origin });
    }
  });

  if (!topo) {
    return (
      <div style={{ height: 560, background: "#07111e", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12 }}>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Loading map…</div>
      </div>
    );
  }

  const statesGeo = feature(topo, (topo as any).objects.states) as any;

  return (
    <div style={{ position: "relative", background: "#07111e", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
        <rect width={W} height={H} fill="#07111e" />

        {/* State fills */}
        {statesGeo.features.map((f: any, i: number) => (
          <path
            key={i}
            d={pathGen(f) ?? ""}
            fill="#0b1e35"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="0.6"
          />
        ))}

        {/* Background regional clusters */}
        {BG_CLUSTERS.map((c, i) => {
          const pt = proj([c.lng, c.lat]);
          if (!pt) return null;
          const [x, y] = pt;
          const r = c.count >= 20 ? 18 : c.count >= 10 ? 15 : 12;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={r} fill="#0d1e30" stroke="rgba(255,255,255,0.20)" strokeWidth="1.1" />
              <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
                fill="rgba(255,255,255,0.55)" fontSize={r >= 18 ? 11 : 10} fontWeight="600"
                fontFamily="system-ui,-apple-system,sans-serif">{c.count}</text>
            </g>
          );
        })}

        {/* Active load markers */}
        {markers.map((m, i) => {
          const count = m.ids.length;
          const r = count > 1 ? 19 : 16;
          return (
            <g key={i} onClick={onMarkerClick} style={{ cursor: "pointer" }}>
              <circle cx={m.x} cy={m.y} r={r + 6} fill="rgba(252,11,5,0.10)" />
              <circle cx={m.x} cy={m.y} r={r} fill="#08192b" stroke="#fc0b05" strokeWidth="2" />
              <text x={m.x} y={m.y} textAnchor="middle" dominantBaseline="central"
                fill="white" fontSize="11" fontWeight="700"
                fontFamily="system-ui,-apple-system,sans-serif">{count}</text>
            </g>
          );
        })}
      </svg>

      {/* Total loads badge */}
      <div style={{
        position: "absolute", bottom: 16, left: 16,
        background: "rgba(8,25,43,0.92)", border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 8, padding: "8px 14px", color: "white", fontSize: 12, fontWeight: 700,
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      }}>
        247 Total Loads Available
      </div>

      {/* Live badge */}
      <div style={{
        position: "absolute", top: 16, right: 16,
        background: "rgba(8,25,43,0.85)", border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 6, padding: "6px 12px",
        display: "flex", alignItems: "center", gap: 6,
        fontSize: 11, color: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 2s infinite" }} />
        Live · updates every 60s
      </div>

      {/* Click hint */}
      <div style={{
        position: "absolute", bottom: 16, right: 16,
        color: "rgba(255,255,255,0.30)", fontSize: 11,
      }}>
        Click a marker to view load
      </div>
    </div>
  );
}
