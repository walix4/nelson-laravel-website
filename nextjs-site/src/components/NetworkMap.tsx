"use client";
import { useEffect, useRef, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const PORTS: Record<string, [number, number]> = { LAX: [33.7395, -118.2596], LGB: [33.7536, -118.2169], OAK: [37.7955, -122.2782], SEA: [47.4097, -122.3331], HOU: [29.725, -95.025], SAV: [32.133, -81.143], MIA: [25.7741, -80.1709], NOR: [36.9171, -76.2944], NYNJ: [40.663, -74.109] };
const HUBS: Record<string, { name: string; coords: [number, number] }> = {
  DAL: { name: "Dallas, TX", coords: [32.7767, -96.797] }, CHI: { name: "Chicago, IL", coords: [41.8781, -87.6298] }, ATL: { name: "Atlanta, GA", coords: [33.749, -84.388] }, MEM: { name: "Memphis, TN", coords: [35.1495, -90.049] }, KCM: { name: "Kansas City, MO", coords: [39.0997, -94.5786] }, DEN: { name: "Denver, CO", coords: [39.7392, -104.9903] }, PHX: { name: "Phoenix, AZ", coords: [33.4484, -112.074] }, NSH: { name: "Nashville, TN", coords: [36.1627, -86.7816] }, IND: { name: "Indianapolis, IN", coords: [39.7684, -86.1581] }, SLC: { name: "Salt Lake City, UT", coords: [40.7608, -111.891] },
};
const HUB_META: Record<string, { time: string; rate: string }> = { DAL: { time: "36 hr", rate: "$1,920" }, CHI: { time: "72 hr", rate: "$2,640" }, ATL: { time: "24 hr", rate: "$1,180" }, MEM: { time: "30 hr", rate: "$1,420" }, KCM: { time: "48 hr", rate: "$1,980" }, DEN: { time: "60 hr", rate: "$2,260" }, PHX: { time: "12 hr", rate: "$980" }, NSH: { time: "30 hr", rate: "$1,540" }, IND: { time: "66 hr", rate: "$2,420" }, SLC: { time: "52 hr", rate: "$2,180" } };
const CORRIDORS: [string, string][] = [["LAX", "DAL"], ["LAX", "PHX"], ["LAX", "DEN"], ["LGB", "SLC"], ["OAK", "SLC"], ["SEA", "DEN"], ["SEA", "CHI"], ["NYNJ", "CHI"], ["NYNJ", "IND"], ["NOR", "ATL"], ["SAV", "ATL"], ["SAV", "NSH"], ["HOU", "DAL"], ["MIA", "ATL"]];

export default function NetworkMap() {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [hub, setHub] = useState({ name: "Chicago", time: "36 hr", rate: "$1,920" });
  useEffect(() => {
    let cancelled = false;
    const start = () => {
      const L = (window as any).L;
      if (!L) { setTimeout(start, 120); return; }
      if (cancelled || mapRef.current || !el.current) return;
      const map = L.map(el.current, { zoomControl: false, attributionControl: false, scrollWheelZoom: false, dragging: true, minZoom: 3, maxZoom: 7 }).setView([39, -96], 4);
      mapRef.current = map;
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19 }).addTo(map);
      const WARM = new Set([1, 4, 7, 10, 13]);
      CORRIDORS.forEach(([a, b], i) => { const A = PORTS[a] || HUBS[a]?.coords, B = PORTS[b] || HUBS[b]?.coords; L.polyline([A, B], { className: "corridor" + (WARM.has(i) ? " corridor-warm" : ""), weight: 1.1 }).addTo(map); });
      Object.values(PORTS).forEach((c) => L.marker(c, { icon: L.divIcon({ html: `<div class="port-icon"><div class="ring"></div><div class="dot"></div></div>`, className: "", iconSize: [14, 14], iconAnchor: [7, 7] }) }).addTo(map));
      Object.entries(HUBS).forEach(([k, h]) => {
        const meta = HUB_META[k] || { time: "—", rate: "—" };
        L.marker(h.coords, { icon: L.divIcon({ html: `<div class="port-icon" style="opacity:.85"><div class="ring" style="border-color:#FF3B30;animation-duration:3.4s;"></div><div class="dot" style="background:#FF3B30;box-shadow:0 0 10px #FF3B30;"></div></div>`, className: "", iconSize: [14, 14], iconAnchor: [7, 7] }) })
          .on("mouseover", () => setHub({ name: h.name, time: meta.time, rate: meta.rate }))
          .addTo(map);
      });
    };
    start();
    return () => { cancelled = true; if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ height: 520, background: "#06143A" }}>
      <div ref={el} className="absolute inset-0" />
      <div className="absolute top-4 left-4 glass-sky rounded-xl px-3.5 py-2.5 text-[11px] z-[600]">
        <div className="text-white/55 uppercase tracking-[0.12em] text-[10px]">Hovered hub</div>
        <div className="display text-white text-[14px] mt-1">{hub.name}</div>
        <div className="num text-white/70 mt-1"><b className="text-white">{hub.time}</b> avg transit · <b className="text-white">{hub.rate}</b> avg</div>
      </div>
    </div>
  );
}
