"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const W = 960, H = 580;

/* projection and path generator are constant — created once at module level */
const proj = geoAlbersUsa().scale(1100).translate([490, 295]);
const pathGen = geoPath().projection(proj);

const LOAD_COORDS: Record<string, [number, number]> = {
  /* BASE_LOADS */
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
  /* LIVE_POOL */
  "DG-4833": [42.36, -71.06],
  "DG-4834": [45.52, -122.68],
  "DG-4835": [27.95, -82.46],
  "DG-4836": [47.25, -122.44],
  "DG-4837": [37.80, -122.27],
  "DG-4838": [42.33, -83.05],
  "DG-4839": [32.72, -117.16],
  "DG-4840": [39.73, -75.55],
  "DG-4841": [39.95, -75.17],
  "DG-4842": [39.10, -94.58],
  "DG-4843": [29.95, -90.07],
  "DG-4844": [33.73, -118.27],
};

const BASE_CLUSTERS = [
  { id: 0,  lat: 41.85, lng: -87.65,  base: 24 },  // Chicago
  { id: 1,  lat: 44.98, lng: -93.27,  base: 18 },  // Minneapolis
  { id: 2,  lat: 39.74, lng: -104.99, base: 9  },  // Denver
  { id: 3,  lat: 39.10, lng: -94.58,  base: 14 },  // Kansas City
  { id: 4,  lat: 38.63, lng: -90.20,  base: 8  },  // St. Louis
  { id: 5,  lat: 35.15, lng: -90.05,  base: 7  },  // Memphis
  { id: 6,  lat: 33.75, lng: -84.39,  base: 15 },  // Atlanta
  { id: 7,  lat: 42.33, lng: -83.05,  base: 11 },  // Detroit
  { id: 8,  lat: 40.76, lng: -111.89, base: 5  },  // Salt Lake City
  { id: 9,  lat: 35.46, lng: -97.52,  base: 6  },  // Oklahoma City
  { id: 10, lat: 36.17, lng: -86.78,  base: 8  },  // Nashville
  { id: 11, lat: 32.78, lng: -96.80,  base: 12 },  // Dallas
];

/* pre-compute cluster SVG positions once */
const CLUSTER_PTS = BASE_CLUSTERS.map(c => {
  const pt = proj([c.lng, c.lat]);
  return pt ? { id: c.id, x: pt[0], y: pt[1], base: c.base } : null;
}).filter(Boolean) as { id: number; x: number; y: number; base: number }[];

const PORT_TERMINALS = [
  { name: "Long Beach",   abbr: "LB",  lat: 33.73,  lng: -118.27 },
  { name: "New York",     abbr: "NY",  lat: 40.64,  lng: -74.15  },
  { name: "Savannah",     abbr: "SAV", lat: 31.98,  lng: -81.10  },
  { name: "Houston",      abbr: "HOU", lat: 29.73,  lng: -95.27  },
  { name: "Tacoma",       abbr: "TAC", lat: 47.25,  lng: -122.44 },
  { name: "Charleston",   abbr: "CHS", lat: 32.79,  lng: -79.95  },
  { name: "Norfolk",      abbr: "NOR", lat: 36.92,  lng: -76.30  },
  { name: "Baltimore",    abbr: "BAL", lat: 39.27,  lng: -76.58  },
  { name: "Miami",        abbr: "MIA", lat: 25.77,  lng: -80.17  },
  { name: "Oakland",      abbr: "OAK", lat: 37.80,  lng: -122.27 },
  { name: "New Orleans",  abbr: "NOL", lat: 29.95,  lng: -90.07  },
  { name: "Jacksonville", abbr: "JAX", lat: 30.33,  lng: -81.66  },
  { name: "Wilmington",   abbr: "WIL", lat: 39.73,  lng: -75.55  },
  { name: "Boston",       abbr: "BOS", lat: 42.36,  lng: -71.06  },
  { name: "Tampa",        abbr: "TPA", lat: 27.95,  lng: -82.46  },
];

const PORT_PTS = PORT_TERMINALS.map(p => {
  const pt = proj([p.lng, p.lat]);
  return pt ? { name: p.name, abbr: p.abbr, x: pt[0], y: pt[1] } : null;
}).filter(Boolean) as { name: string; abbr: string; x: number; y: number }[];

type ClusterState = { id: number; count: number; opacity: number };

function seedClusters(): ClusterState[] {
  return BASE_CLUSTERS.map(c => ({ id: c.id, count: c.base, opacity: 1 }));
}

function pseudoRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface LoadItem {
  id: string; origin: string; dest: string;
  rate: number; miles: number; type: string;
  status?: string; avail?: string;
}

interface Props {
  loads: LoadItem[];
  onMarkerClick: (ids: string[]) => void;
  fillHeight?: boolean;
}

/* ─── Static map layer (never re-renders after topo loads) ────────────── */
function StateLayer({ topo }: { topo: any }) {
  const statesGeo = useMemo(() => feature(topo, (topo as any).objects.states) as any, [topo]);
  const paths = useMemo(() =>
    statesGeo.features.map((f: any, i: number) => (
      <path key={i} d={pathGen(f) ?? ""} fill="rgba(11,30,53,0.70)" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6" />
    )),
  [statesGeo]);
  return <>{paths}</>;
}

export default function LoadMapView({ loads, onMarkerClick, fillHeight }: Props) {
  const [topo, setTopo] = useState<any>(null);
  const [clusters, setClusters] = useState<ClusterState[]>(seedClusters);
  const tickRef = useRef(0);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
      .then(r => r.json())
      .then(setTopo)
      .catch(console.error);
  }, []);

  /* Animate clusters — only cluster state changes, not the map */
  useEffect(() => {
    const timer = setInterval(() => {
      tickRef.current += 1;
      const tick = tickRef.current;
      setClusters(prev => {
        const next = prev.map(c => ({ ...c }));
        const picks = new Set<number>();
        let attempt = 0;
        while (picks.size < 4 && attempt < 200) {
          picks.add(Math.floor(pseudoRand(tick * 17 + attempt) * next.length));
          attempt++;
        }
        picks.forEach(idx => {
          const c = next[idx];
          const r = pseudoRand(tick * 13 + idx * 7);
          if (c.opacity < 0.1) {
            c.count = BASE_CLUSTERS[idx].base + Math.floor(pseudoRand(tick + idx) * 4) - 1;
            if (c.count < 1) c.count = 1;
            c.opacity = 1;
          } else if (r < 0.12) {
            c.opacity = 0;
          } else {
            const delta = Math.floor(pseudoRand(tick * 3 + idx * 11) * 5) - 2;
            c.count = Math.max(1, Math.min(35, c.count + delta));
          }
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  /* Active load markers — memoized on loads prop */
  const markers = useMemo(() => {
    const result: { x: number; y: number; ids: string[]; loads: LoadItem[] }[] = [];
    loads.forEach(load => {
      const coords = LOAD_COORDS[load.id];
      if (!coords) return;
      const pt = proj([coords[1], coords[0]]);
      if (!pt) return;
      const [x, y] = pt;
      const existing = result.find(m => Math.hypot(m.x - x, m.y - y) < 28);
      if (existing) { existing.ids.push(load.id); existing.loads.push(load); }
      else result.push({ x, y, ids: [load.id], loads: [load] });
    });
    return result;
  }, [loads]);

  function markerColor(ls: LoadItem[]) {
    if (ls.some(l => l.status === "hot")) return "#fc0b05";
    if (ls.some(l => l.avail === "Today")) return "#fbbf24";
    return "#4ade80";
  }

  const totalVisible = clusters.reduce((s, c) => c.opacity > 0.5 ? s + c.count : s, 0);

  if (!topo) {
    return (
      <div style={{ height: 560, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12 }}>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Loading map…</div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", background: "transparent", borderRadius: 12, overflow: "hidden", ...(fillHeight ? { height: "100%" } : {}) }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", display: "block", ...(fillHeight ? { height: "100%" } : {}) }}>
        <rect width={W} height={H} fill="transparent" />

        {/* State fills — static, never re-renders */}
        <StateLayer topo={topo} />

        {/* Animated clusters — only this part re-renders on tick */}
        {clusters.map(c => {
          const pt = CLUSTER_PTS.find(p => p.id === c.id);
          if (!pt) return null;
          const r = c.count >= 20 ? 18 : c.count >= 10 ? 15 : 12;
          return (
            <g key={c.id} style={{ opacity: c.opacity, transition: "opacity 0.9s ease" }}>
              <circle cx={pt.x} cy={pt.y} r={r + 5} fill="rgba(56,189,248,0.06)" />
              <circle cx={pt.x} cy={pt.y} r={r} fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.65)" strokeWidth="1.2" />
              <text x={pt.x} y={pt.y} textAnchor="middle" dominantBaseline="central"
                fill="rgba(186,230,253,0.95)" fontSize={r >= 18 ? 11 : 10} fontWeight="600"
                fontFamily="system-ui,-apple-system,sans-serif">{c.count}</text>
            </g>
          );
        })}

        {/* Active load markers — skip any that sit on a port terminal */}
        {markers.filter(m => !PORT_PTS.some(pt => Math.hypot(m.x - pt.x, m.y - pt.y) < 26)).map((m, i) => {
          const count = m.ids.length;
          const r = count > 1 ? 19 : 16;
          const color = markerColor(m.loads);
          const glowColor = color === "#fc0b05" ? "rgba(252,11,5,0.18)" : color === "#fbbf24" ? "rgba(251,191,36,0.18)" : "rgba(74,222,128,0.18)";
          return (
            <g key={i} onClick={() => onMarkerClick(m.ids)} style={{ cursor: "pointer" }}>
              <circle cx={m.x} cy={m.y} r={r + 6} fill={glowColor} />
              <circle cx={m.x} cy={m.y} r={r} fill="#08192b" stroke={color} strokeWidth="2" />
              <text x={m.x} y={m.y} textAnchor="middle" dominantBaseline="central"
                fill="white" fontSize="11" fontWeight="700"
                fontFamily="system-ui,-apple-system,sans-serif">{count}</text>
            </g>
          );
        })}

        {/* Port terminal markers — Final Icon SVG, tip at coordinate */}
        {PORT_PTS.map((p, i) => (
          <g key={`port-${i}`}>
            <svg x={p.x - 13} y={p.y - 40} width="26" height="27" viewBox="10 17 380 384">
              <path fill="#F97316" fillRule="evenodd" d="M199.697 59.901C280.643 59.901 346.513 125.752 346.513 206.698C346.513 287.644 280.643 353.475 199.697 353.475C118.771 353.475 52.92 287.634 52.92 206.698C52.92 125.752 118.761 59.901 199.697 59.901ZM199.697 17C94.922 17 10 101.932 10 206.707C10 311.472 199.698 619.194 199.698 619.194C199.698 619.194 389.415 311.473 389.415 206.707C389.414 101.922 304.502 17 199.697 17ZM302.499 214.944L293.09 279.066L274.009 260.542C260.78 271.426 248.909 299.154 197.391 300.453C156.415 300.453 139.337 275.275 124.271 263.102L106.841 279.985L96.934 216.45L162.404 226.093L144.358 243.591C144.358 243.591 159.834 269.335 186.565 271.133L186.458 166.495C172.018 161.473 161.612 148.176 161.612 132.436C161.612 112.368 178.358 96.111 199.042 96.111C219.706 96.111 236.481 112.369 236.481 132.436C236.481 148.42 225.734 161.864 210.981 166.68C211.059 187.119 211.401 271.524 210.942 271.524C233.071 270.908 253.794 240.953 253.794 240.953L236.901 224.568C236.912 224.557 302.499 214.944 302.499 214.944ZM218.368 131.868C218.368 121.541 209.702 113.158 199.043 113.158C188.403 113.158 179.766 121.541 179.766 131.868C179.766 142.215 188.403 150.617 199.043 150.617C209.712 150.607 218.368 142.214 218.368 131.868Z" />
            </svg>
            <text x={p.x} y={p.y + 4} textAnchor="middle"
              fill="rgba(253,186,116,0.95)" fontSize="8" fontWeight="700"
              fontFamily="system-ui,-apple-system,sans-serif">{p.name}</text>
          </g>
        ))}
      </svg>

      <div style={{
        position: "absolute", bottom: 16, left: 16,
        background: "rgba(8,25,43,0.92)", border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 8, padding: "8px 14px", color: "white", fontSize: 12, fontWeight: 700,
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        transition: "all 0.6s ease",
      }}>
        {totalVisible} Total Loads Available
      </div>

      <div style={{
        position: "absolute", top: 16, right: 16,
        background: "rgba(8,25,43,0.85)", border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 6, padding: "6px 12px",
        display: "flex", alignItems: "center", gap: 6,
        fontSize: 11, color: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 2s infinite" }} />
        Live
      </div>

      <div style={{ position: "absolute", bottom: 16, right: 16, color: "rgba(255,255,255,0.30)", fontSize: 11 }}>
        Click a marker to view load
      </div>
    </div>
  );
}
