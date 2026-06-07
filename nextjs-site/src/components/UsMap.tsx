"use client";
import { asset } from "@/lib/site";

type Dot = { x: number; y: number; label?: string; kind?: "port" | "origin" | "dest" };
const COLOR = { port: "#3A5FC0", origin: "#2f61c0", dest: "#16B571" };

// Approx % positions on the continental-US silhouette
export const US_PORTS: Dot[] = [
  { x: 11, y: 60, label: "Los Angeles", kind: "origin" }, { x: 12, y: 63, label: "Long Beach" }, { x: 8, y: 48, label: "Oakland" },
  { x: 13, y: 20, label: "Seattle" }, { x: 90, y: 33, label: "New York / NJ" }, { x: 83, y: 58, label: "Savannah" },
  { x: 85, y: 50, label: "Norfolk" }, { x: 84, y: 62, label: "Charleston" }, { x: 55, y: 80, label: "Houston" },
  { x: 86, y: 90, label: "Miami" }, { x: 63, y: 38, label: "Chicago", kind: "dest" }, { x: 52, y: 66, label: "Dallas" },
  { x: 38, y: 50, label: "Denver" }, { x: 70, y: 56, label: "Atlanta" },
];

export default function UsMap({ dots = US_PORTS, height = 460, route }: { dots?: Dot[]; height?: number; route?: [Dot, Dot] }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ height, background: "linear-gradient(160deg,#0B2D5C,#061A38)" }}>
      <div className="absolute inset-0" style={{ backgroundImage: `url(${asset("/usa-map.svg")})`, backgroundSize: "92%", backgroundPosition: "center", backgroundRepeat: "no-repeat", opacity: 0.22, filter: "brightness(0) invert(1)" }} />
      {route && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1={route[0].x} y1={route[0].y} x2={route[1].x} y2={route[1].y} stroke="#2f61c0" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.8" />
        </svg>
      )}
      {dots.map((d, i) => (
        <span key={i} title={d.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${d.x}%`, top: `${d.y}%` }}>
          <span className="block rounded-full" style={{ width: 9, height: 9, background: COLOR[d.kind || "port"], boxShadow: `0 0 0 4px ${COLOR[d.kind || "port"]}33, 0 0 12px ${COLOR[d.kind || "port"]}` }} />
        </span>
      ))}
    </div>
  );
}
