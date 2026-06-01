"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";

/* eslint-disable @typescript-eslint/no-explicit-any */
const PORTS: Record<string, { name: string; coords: [number, number]; teu: string }> = {
  LAX: { name: "Los Angeles", coords: [33.7395, -118.2596], teu: "9.2M" },
  LGB: { name: "Long Beach", coords: [33.7536, -118.2169], teu: "9.1M" },
  OAK: { name: "Oakland", coords: [37.7955, -122.2782], teu: "2.4M" },
  SEA: { name: "Seattle/Tacoma", coords: [47.4097, -122.3331], teu: "3.4M" },
  HOU: { name: "Houston", coords: [29.725, -95.025], teu: "4.0M" },
  SAV: { name: "Savannah", coords: [32.133, -81.143], teu: "5.9M" },
  MIA: { name: "Miami", coords: [25.7741, -80.1709], teu: "1.2M" },
  NOR: { name: "Norfolk", coords: [36.9171, -76.2944], teu: "3.5M" },
  NYNJ: { name: "New York/NJ", coords: [40.663, -74.109], teu: "9.5M" },
};
const HUBS: Record<string, { name: string; coords: [number, number] }> = {
  DAL: { name: "Dallas, TX", coords: [32.7767, -96.797] }, CHI: { name: "Chicago, IL", coords: [41.8781, -87.6298] },
  ATL: { name: "Atlanta, GA", coords: [33.749, -84.388] }, MEM: { name: "Memphis, TN", coords: [35.1495, -90.049] },
  KCM: { name: "Kansas City, MO", coords: [39.0997, -94.5786] }, DEN: { name: "Denver, CO", coords: [39.7392, -104.9903] },
  PHX: { name: "Phoenix, AZ", coords: [33.4484, -112.074] }, NSH: { name: "Nashville, TN", coords: [36.1627, -86.7816] },
  IND: { name: "Indianapolis, IN", coords: [39.7684, -86.1581] }, SLC: { name: "Salt Lake City, UT", coords: [40.7608, -111.891] },
};
const CORRIDORS: [string, string][] = [["LAX", "DAL"], ["LAX", "PHX"], ["LAX", "DEN"], ["LGB", "SLC"], ["OAK", "SLC"], ["SEA", "DEN"], ["SEA", "CHI"], ["NYNJ", "CHI"], ["NYNJ", "IND"], ["NOR", "ATL"], ["SAV", "ATL"], ["SAV", "NSH"], ["HOU", "DAL"], ["MIA", "ATL"]];
const CONT: Record<string, number> = { "20ft": 0.88, "40ft": 1, "40ft-hc": 1.08, reefer: 1.15 };

function hav(a: [number, number], b: [number, number]) { const R = 3958.8, t = (v: number) => (v * Math.PI) / 180; const dL = t(b[0] - a[0]), dG = t(b[1] - a[1]); const x = Math.sin(dL / 2) ** 2 + Math.cos(t(a[0])) * Math.cos(t(b[0])) * Math.sin(dG / 2) ** 2; return 2 * R * Math.asin(Math.min(1, Math.sqrt(x))); }
function quote(o: [number, number], d: [number, number], m: number) {
  const miles = hav(o, d), mpg = 7, diesel = 5.18, fsc = 0.17, drvHr = 28, speed = 50, legs = 2;
  const fuel = (miles / mpg) * diesel * (1 + fsc) * legs;
  const labor = (miles / speed + 2.5) * drvHr * legs;
  const chassis = 40 * Math.max(1, Math.ceil(miles / 300));
  const port = 75, overhead = 160;
  const sub = (fuel + labor + chassis + port + overhead) * m;
  const margin = sub * 0.15, admin = sub * 0.05;
  return { miles: Math.round(miles), total: Math.round(sub + margin + admin), fuel: Math.round(fuel * m), labor: Math.round(labor * m), chassis: Math.round(chassis), port, overhead: Math.round(overhead + margin + admin), acc: 0 };
}

export default function CalculateRate() {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const routeRef = useRef<any>({ line: null, truck: null, o: null, d: null, raf: 0 });
  const [origin, setOrigin] = useState("LAX");
  const [dest, setDest] = useState("DAL");
  const [cont, setCont] = useState("40ft");
  const [ready, setReady] = useState(false);

  const q = quote(PORTS[origin].coords, HUBS[dest].coords, CONT[cont]);
  const parts: [string, number][] = [["Fuel", q.fuel], ["Labor", q.labor], ["Chassis", q.chassis], ["Port", q.port], ["Overhead", q.overhead], ["Access.", q.acc]];

  // init map once
  useEffect(() => {
    let cancelled = false;
    const start = () => {
      const L = (window as any).L;
      if (!L) { setTimeout(start, 120); return; }
      if (cancelled || mapRef.current || !mapEl.current) return;
      const map = L.map(mapEl.current, { zoomControl: true, attributionControl: true, scrollWheelZoom: false, minZoom: 3, maxZoom: 8 }).setView([39.5, -96], 4);
      mapRef.current = map;
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19 }).addTo(map);
      CORRIDORS.forEach(([a, b]) => { const A = PORTS[a]?.coords || HUBS[a]?.coords, B = PORTS[b]?.coords || HUBS[b]?.coords; L.polyline([A, B], { className: "corridor", weight: 1.2, smoothFactor: 1 }).addTo(map); });
      Object.entries(PORTS).forEach(([k, p]) => {
        const html = `<div class="port-icon"><div class="ring"></div><div class="dot"></div><div class="label">${p.name.split("/")[0].split(",")[0]}</div></div>`;
        L.marker(p.coords, { icon: L.divIcon({ html, className: "", iconSize: [14, 14], iconAnchor: [7, 7] }), title: p.name }).on("click", () => setOrigin(k)).addTo(map);
      });
      setReady(true);
    };
    start();
    return () => { cancelled = true; if (routeRef.current.raf) cancelAnimationFrame(routeRef.current.raf); if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);

  // draw route on change
  useEffect(() => {
    if (!ready) return;
    const L = (window as any).L; const map = mapRef.current; if (!L || !map) return;
    const r = routeRef.current;
    if (r.raf) cancelAnimationFrame(r.raf);
    ["line", "truck", "o", "d"].forEach((k) => { if (r[k]) { map.removeLayer(r[k]); r[k] = null; } });
    const o = PORTS[origin].coords, d = HUBS[dest].coords;
    r.o = L.marker(o, { icon: L.divIcon({ html: `<div class="port-icon origin"><div class="ring"></div><div class="dot"></div></div>`, className: "", iconSize: [14, 14], iconAnchor: [7, 7] }) }).addTo(map);
    r.d = L.marker(d, { icon: L.divIcon({ html: `<div class="port-icon destination"><div class="ring"></div><div class="dot"></div><div class="label" style="left:18px;top:-3px;">${HUBS[dest].name}</div></div>`, className: "", iconSize: [14, 14], iconAnchor: [7, 7] }) }).addTo(map);
    const mid = [(o[0] + d[0]) / 2, (o[1] + d[1]) / 2], dx = d[1] - o[1], dy = d[0] - o[0], norm = Math.sqrt(dx * dx + dy * dy) || 1, off = norm * 0.08;
    const ctrl = [mid[0] + (dx / norm) * off, mid[1] - (dy / norm) * off];
    const path: [number, number][] = [];
    for (let i = 0; i <= 60; i++) { const t = i / 60; path.push([(1 - t) ** 2 * o[0] + 2 * (1 - t) * t * ctrl[0] + t * t * d[0], (1 - t) ** 2 * o[1] + 2 * (1 - t) * t * ctrl[1] + t * t * d[1]]); }
    r.line = L.polyline(path, { className: "route-line", smoothFactor: 1 }).addTo(map);
    map.flyToBounds(L.latLngBounds(path).pad(0.18), { duration: 1.0, easeLinearity: 0.4 });
    setTimeout(() => {
      if (!mapRef.current) return;
      r.truck = L.marker(path[0], { icon: L.divIcon({ html: `<div class="truck-wrap"><img class="truck-img" src="${asset("/truck.png")}" alt=""></div>`, className: "", iconSize: [60, 40], iconAnchor: [30, 20] }) }).addTo(map);
      const t0 = performance.now(), dur = 2400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / dur), idx = Math.floor(t * (path.length - 1));
        r.truck.setLatLng(path[idx]);
        const i1 = Math.max(0, idx - 1), i2 = Math.min(path.length - 1, idx + 1);
        const angle = (Math.atan2(-(path[i2][0] - path[i1][0]), path[i2][1] - path[i1][1]) * 180) / Math.PI;
        const el = r.truck.getElement(); if (el) { const img = el.querySelector(".truck-img"); if (img) img.style.transform = `rotate(${angle}deg)${angle > 90 || angle < -90 ? " scaleY(-1)" : ""}`; }
        if (t < 1) r.raf = requestAnimationFrame(tick);
      };
      r.raf = requestAnimationFrame(tick);
    }, 1100);
  }, [origin, dest, ready]);

  return (
    <div className="grid lg:grid-cols-[1fr_1.55fr] gap-5 items-stretch">
      <div className="reveal">
        <div className="glass rounded-2xl p-6 lg:p-7" style={{ background: "#fff" }}>
          <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--navy)]/70">Instant quote engine</div>
          <h3 className="display text-[24px] text-[var(--navy)] mt-1">Price your move</h3>
          <div className="space-y-3.5 mt-5">
            <div><label className="tool-label">Origin port</label><select className="tool-select" value={origin} onChange={(e) => setOrigin(e.target.value)}>{Object.entries(PORTS).map(([k, p]) => <option key={k} value={k}>{p.name}</option>)}</select></div>
            <div><label className="tool-label">Destination</label><select className="tool-select" value={dest} onChange={(e) => setDest(e.target.value)}>{Object.entries(HUBS).map(([k, h]) => <option key={k} value={k}>{h.name}</option>)}</select></div>
            <div><label className="tool-label">Container</label><select className="tool-select" value={cont} onChange={(e) => setCont(e.target.value)}>{Object.keys(CONT).map((c) => <option key={c}>{c}</option>)}</select></div>
          </div>
          <div className="mt-5 flex items-end justify-between rounded-xl px-4 py-3.5" style={{ background: "rgba(11,35,80,0.04)", border: "1px solid rgba(11,35,80,0.08)" }}>
            <div><span className="display text-[40px] text-[var(--navy)] num leading-none">${q.total.toLocaleString()}</span><span className="text-[12px] text-[var(--navy)]/60 ml-1">/ round trip</span></div>
            <span className="text-[11px] text-[var(--navy)]/60">Rate locks 24h</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 text-[11px]">
            {parts.map(([k, v]) => <div key={k} className="rounded-lg px-2 py-2" style={{ background: "rgba(11,35,80,0.05)", border: "1px solid rgba(11,35,80,0.1)" }}><div className="text-[var(--navy)]/55 uppercase tracking-wider">{k}</div><div className="display text-[var(--navy)] text-[14px] num mt-0.5">${v.toLocaleString()}</div></div>)}
          </div>
        </div>
      </div>
      <div className="reveal reveal-d1 relative rounded-2xl overflow-hidden border border-white/10 min-h-[480px]" style={{ background: "#06143A" }}>
        <div ref={mapEl} className="absolute inset-0" />
        <div className="absolute top-4 left-4 glass-sky rounded-xl px-3.5 py-2.5 text-[11px] z-[600]">
          <div className="flex items-center gap-2 text-white/60 uppercase tracking-[0.14em] text-[10px]"><span className="live-dot" /> Active corridor</div>
          <div className="display text-white text-[13px] mt-1.5">{PORTS[origin].name} · Port complex</div>
          <div className="num text-white/70 mt-0.5">Throughput · <b className="text-white">{PORTS[origin].teu} TEU</b> / yr</div>
        </div>
        <div className="absolute top-4 right-4 glass-sky rounded-xl px-3.5 py-2.5 text-[11px] z-[600] hidden sm:block">
          <div className="text-white/60 uppercase tracking-[0.14em] text-[10px]">Live · last 60s</div>
          <div className="flex items-center gap-4 mt-1.5"><div><div className="display text-white text-[14px] num">412</div><div className="text-white/55">Quotes</div></div><div className="h-7 w-px bg-white/15" /><div><div className="display text-white text-[14px] num">$1,847</div><div className="text-white/55">Avg rate</div></div></div>
        </div>
        <div className="absolute left-4 right-4 bottom-4 glass-sky rounded-xl px-4 py-3 z-[600] flex flex-wrap items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2 text-white/70"><span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" /><span>Origin</span><span className="ml-3 w-1.5 h-1.5 rounded-full bg-[var(--green)]" /><span>Destination</span><span className="ml-3 w-1.5 h-1.5 rounded-full bg-[var(--blue)]" /><span>Port</span></div>
          <div className="flex flex-wrap gap-2">
            {([["LAX", "DAL", "LA → Dallas"], ["NYNJ", "CHI", "NY/NJ → Chicago"], ["SAV", "ATL", "Savannah → Atlanta"]] as const).map(([o, d, label]) => (
              <button key={label} onClick={() => { setOrigin(o); setDest(d); }} className="glass-pill px-3 py-1.5 rounded-lg text-white/80 hover:text-white">{label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
