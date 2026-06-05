"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Lightweight built-in geocoder: keyword -> [lat,lng,label]. Matched longest-first.
const GEO: [string, [number, number], string][] = [
  ["apm terminals", [40.666, -74.211], "Elizabeth, NJ"],
  ["elizabeth", [40.666, -74.211], "Elizabeth, NJ"],
  ["newark", [40.7357, -74.1724], "Newark, NJ"],
  ["new york", [40.7128, -74.006], "New York, NY"],
  ["manhattan", [40.7831, -73.9712], "New York, NY"],
  ["nyc", [40.7128, -74.006], "New York, NY"],
  ["los angeles", [34.0522, -118.2437], "Los Angeles, CA"],
  ["long beach", [33.77, -118.19], "Long Beach, CA"],
  ["oakland", [37.8044, -122.2712], "Oakland, CA"],
  ["seattle", [47.6062, -122.3321], "Seattle, WA"],
  ["houston", [29.7604, -95.3698], "Houston, TX"],
  ["savannah", [32.0809, -81.0912], "Savannah, GA"],
  ["miami", [25.7617, -80.1918], "Miami, FL"],
  ["norfolk", [36.8508, -76.2859], "Norfolk, VA"],
  ["baltimore", [39.2904, -76.6122], "Baltimore, MD"],
  ["philadelphia", [39.9526, -75.1652], "Philadelphia, PA"],
  ["philly", [39.9526, -75.1652], "Philadelphia, PA"],
  ["boston", [42.3601, -71.0589], "Boston, MA"],
  ["chicago", [41.8781, -87.6298], "Chicago, IL"],
  ["dallas", [32.7767, -96.797], "Dallas, TX"],
  ["san antonio", [29.4241, -98.4936], "San Antonio, TX"],
  ["atlanta", [33.749, -84.388], "Atlanta, GA"],
  ["orlando", [28.5383, -81.3792], "Orlando, FL"],
  ["phoenix", [33.4484, -112.074], "Phoenix, AZ"],
  ["denver", [39.7392, -104.9903], "Denver, CO"],
  ["nashville", [36.1627, -86.7816], "Nashville, TN"],
  ["memphis", [35.1495, -90.049], "Memphis, TN"],
  ["indianapolis", [39.7684, -86.1581], "Indianapolis, IN"],
  ["kansas city", [39.0997, -94.5786], "Kansas City, MO"],
  ["salt lake", [40.7608, -111.891], "Salt Lake City, UT"],
];
const geocode = (t: string): { c: [number, number]; label: string } | null => {
  const l = t.toLowerCase();
  const hit = [...GEO].sort((a, b) => b[0].length - a[0].length).find(([k]) => l.includes(k));
  return hit ? { c: hit[1], label: hit[2] } : null;
};
const LOADING_STEPS = ["Geocoding route…", "Scanning toll roads & plazas…", "Pricing bridges, tunnels & axles…", "Applying vehicle class…"];

function hav(a: [number, number], b: [number, number]) { const R = 3958.8, t = (v: number) => (v * Math.PI) / 180; const dL = t(b[0] - a[0]), dG = t(b[1] - a[1]); const x = Math.sin(dL / 2) ** 2 + Math.cos(t(a[0])) * Math.cos(t(b[0])) * Math.sin(dG / 2) ** 2; return 2 * R * Math.asin(Math.min(1, Math.sqrt(x))); }
const CAT_MULT: Record<string, number> = { tractor: 1, straight: 0.72, bus: 0.6, van: 0.45, car: 0.35 };

type Params = { axles: number; category: string; dual: boolean; trailer: boolean; commercial: boolean; special: boolean; weight: number; height: number; width: number; length: number };
function computeToll(miles: number, p: Params) {
  const drive = Math.max(miles, 6);
  const tolledMiles = drive * 0.42;
  const axleMult = 0.5 + p.axles * 0.42; // 5-axle -> 2.6
  const catMult = CAT_MULT[p.category] ?? 1;
  const roads = tolledMiles * 0.12 * axleMult * catMult;
  const bridges = Math.max(1, Math.round(drive / 220)) * 16 * axleMult * (p.trailer ? 1.12 : 1);
  const oversize = (p.weight > 80000 ? 60 : 0) + (p.width > 102 ? 45 : 0) + (p.height > 162 ? 40 : 0) + (p.length > 636 ? 35 : 0) + (p.special ? 55 : 0);
  const surcharge = (roads + bridges) * ((p.commercial ? 0.1 : 0) + (p.dual ? 0.03 : 0));
  const total = roads + bridges + oversize + surcharge;
  return {
    miles: Math.round(miles), total: Math.round(total),
    plazas: Math.max(1, Math.round(tolledMiles / 70)),
    eta: Math.round((drive / 52 + 0.4) * 10) / 10,
    perMile: drive ? total / drive : 0,
    roads: Math.round(roads), bridges: Math.round(bridges),
    oversize: Math.round(oversize), surcharge: Math.round(surcharge),
  };
}
const N = (n: number) => n.toLocaleString();

export default function CalculateRate() {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const routeRef = useRef<any>({ line: null, truck: null, o: null, d: null, raf: 0 });
  const [ready, setReady] = useState(false);
  const [from, setFrom] = useState("APM Terminals, McLester Street, Elizabeth, NJ, USA");
  const [to, setTo] = useState("New York, NY, USA");
  const [category, setCategory] = useState("tractor");
  const [axles, setAxles] = useState("5");
  const [dual, setDual] = useState("no");
  const [trailer, setTrailer] = useState("no");
  const [commercial, setCommercial] = useState("no");
  const [special, setSpecial] = useState("no");
  const [weight, setWeight] = useState("80000");
  const [height, setHeight] = useState("162");
  const [width, setWidth] = useState("102");
  const [length, setLength] = useState("576");
  const [routeLabel, setRouteLabel] = useState("Elizabeth, NJ");
  const [phase, setPhase] = useState<"form" | "loading" | "result">("form");
  const [step, setStep] = useState(0);
  const [res, setRes] = useState<ReturnType<typeof computeToll> | null>(null);

  const drawRoute = (o: [number, number], d: [number, number], dLabel: string) => {
    const L = (window as any).L, map = mapRef.current; if (!L || !map) return;
    const r = routeRef.current;
    if (r.raf) cancelAnimationFrame(r.raf);
    ["line", "truck", "o", "d"].forEach((k) => { if (r[k]) { map.removeLayer(r[k]); r[k] = null; } });
    r.o = L.marker(o, { icon: L.divIcon({ html: `<div class="port-icon origin"><div class="ring"></div><div class="dot"></div></div>`, className: "", iconSize: [14, 14], iconAnchor: [7, 7] }) }).addTo(map);
    r.d = L.marker(d, { icon: L.divIcon({ html: `<div class="port-icon destination"><div class="ring"></div><div class="dot"></div><div class="label" style="left:18px;top:-3px;">${dLabel}</div></div>`, className: "", iconSize: [14, 14], iconAnchor: [7, 7] }) }).addTo(map);
    const mid = [(o[0] + d[0]) / 2, (o[1] + d[1]) / 2], dx = d[1] - o[1], dy = d[0] - o[0], norm = Math.sqrt(dx * dx + dy * dy) || 1, off = norm * 0.08;
    const ctrl = [mid[0] + (dx / norm) * off, mid[1] - (dy / norm) * off];
    const path: [number, number][] = [];
    for (let i = 0; i <= 60; i++) { const t = i / 60; path.push([(1 - t) ** 2 * o[0] + 2 * (1 - t) * t * ctrl[0] + t * t * d[0], (1 - t) ** 2 * o[1] + 2 * (1 - t) * t * ctrl[1] + t * t * d[1]]); }
    r.line = L.polyline(path, { className: "route-line", smoothFactor: 1 }).addTo(map);
    map.flyToBounds(L.latLngBounds(path).pad(0.35), { duration: 1.0, easeLinearity: 0.4, maxZoom: 9 });
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
    }, 900);
  };

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      const L = (window as any).L;
      if (!L) { setTimeout(start, 120); return; }
      if (cancelled || mapRef.current || !mapEl.current) return;
      const map = L.map(mapEl.current, { zoomControl: true, attributionControl: true, scrollWheelZoom: false, minZoom: 3, maxZoom: 10 }).setView([39.5, -96], 4);
      mapRef.current = map;
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19, attribution: "© OpenStreetMap · © CARTO" }).addTo(map);
      setReady(true);
      const o = geocode(from), d = geocode(to);
      if (o && d) drawRoute(o.c, d.c, d.label);
    };
    start();
    return () => { cancelled = true; if (routeRef.current.raf) cancelAnimationFrame(routeRef.current.raf); if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    setStep(0);
    const iv = setInterval(() => setStep((s) => (s + 1) % LOADING_STEPS.length), 800);
    return () => clearInterval(iv);
  }, [phase]);

  const run = () => {
    if (!ready) return;
    const o = geocode(from), d = geocode(to);
    const oc = o?.c ?? [40.666, -74.211], dc = d?.c ?? [40.7128, -74.006];
    setRouteLabel(o?.label ?? from.split(",")[0]);
    drawRoute(oc, dc, d?.label ?? to.split(",")[0]);
    setPhase("loading");
    const miles = hav(oc, dc);
    const params: Params = { axles: parseInt(axles) || 5, category, dual: dual === "yes", trailer: trailer === "yes", commercial: commercial === "yes", special: special === "yes", weight: +weight || 0, height: +height || 0, width: +width || 0, length: +length || 0 };
    setTimeout(() => { setRes(computeToll(miles, params)); setPhase("result"); }, 3000);
  };

  const quick = (f: string, t: string) => { setFrom(f); setTo(t); setTimeout(run, 0); };

  return (
    <div className="grid lg:grid-cols-[1fr_1.4fr] gap-5 items-stretch">
      <div className="reveal">
        <div className="rounded-2xl p-5 md:p-6 lg:p-7 relative overflow-hidden h-full" style={{ background: "#fff", minHeight: phase === "form" ? undefined : 560 }}>
          <div className="flex items-center justify-between">
            <div><div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--navy)]/70">Instant toll engine</div><h3 className="display text-[24px] md:text-[26px] text-[var(--navy)] mt-1">Calculate tolls</h3></div>
            <div className="px-2.5 py-1 rounded-md text-[10px] font-semibold text-[var(--navy)] bg-[var(--navy)]/8 border border-[var(--navy)]/10">v2026</div>
          </div>

          {phase !== "result" && (
            <form className="mt-5 space-y-3" onSubmit={(e) => { e.preventDefault(); run(); }}>
              <div><label className="input-label">From <span className="text-[var(--red)]">*</span></label><input className="input mt-1" required value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Origin address or city" /></div>
              <div><label className="input-label">To <span className="text-[var(--red)]">*</span></label><input className="input mt-1" required value={to} onChange={(e) => setTo(e.target.value)} placeholder="Destination address or city" /></div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                <div><label className="input-label">Vehicle category</label><select className="input mt-1" value={category} onChange={(e) => setCategory(e.target.value)}><option value="tractor">Tractor Trailer</option><option value="straight">Straight Truck</option><option value="bus">Bus</option><option value="van">Van</option><option value="car">Car</option></select></div>
                <div><label className="input-label">Axles</label><select className="input mt-1" value={axles} onChange={(e) => setAxles(e.target.value)}>{[2, 3, 4, 5, 6, 7, 8, 9].map((a) => <option key={a} value={a}>{a} Axle</option>)}</select></div>
                <div><label className="input-label">Dual tires</label><select className="input mt-1" value={dual} onChange={(e) => setDual(e.target.value)}><option value="no">No</option><option value="yes">Yes</option></select></div>
                <div><label className="input-label">Has trailer</label><select className="input mt-1" value={trailer} onChange={(e) => setTrailer(e.target.value)}><option value="no">No</option><option value="yes">Yes</option></select></div>
                <div><label className="input-label">Commercial</label><select className="input mt-1" value={commercial} onChange={(e) => setCommercial(e.target.value)}><option value="no">No</option><option value="yes">Yes</option></select></div>
                <div><label className="input-label">Special load</label><select className="input mt-1" value={special} onChange={(e) => setSpecial(e.target.value)}><option value="no">No</option><option value="yes">Yes</option></select></div>
                <div><label className="input-label">Weight (lbs)</label><input className="input num mt-1" type="number" min={0} value={weight} onChange={(e) => setWeight(e.target.value)} /></div>
                <div><label className="input-label">Height (in)</label><input className="input num mt-1" type="number" min={0} value={height} onChange={(e) => setHeight(e.target.value)} /></div>
                <div><label className="input-label">Width (in)</label><input className="input num mt-1" type="number" min={0} value={width} onChange={(e) => setWidth(e.target.value)} /></div>
                <div><label className="input-label">Length (in)</label><input className="input num mt-1" type="number" min={0} value={length} onChange={(e) => setLength(e.target.value)} /></div>
              </div>
              <button type="submit" className="btn-primary w-full py-4 rounded-lg text-[14px] font-semibold" style={{ marginTop: "1.4rem" }}><span className="label">Calculate tolls</span></button>
              <p className="text-[10px] text-[var(--navy)]/55 text-center mt-1">No login · No card · Rates refreshed daily</p>
            </form>
          )}

          {phase === "result" && res && (
            <div className="mt-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--green)] flex items-center gap-1.5"><span className="live-dot" /> Estimated tolls · {axles}-axle</div>
                  <div className="flex items-baseline gap-2 mt-1"><span className="display text-[40px] text-[var(--navy)] num leading-none">${N(res.total)}</span><span className="text-[12px] text-[var(--navy)]/60">/ trip</span></div>
                </div>
                <div className="text-right text-[11px] text-[var(--navy)]/70"><div className="num"><b>{N(res.miles)}</b> mi · <b>{res.plazas}</b> toll pts</div><div className="num"><b>{res.eta}</b> hr · <b>${res.perMile.toFixed(2)}</b>/mi</div></div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                {([["Toll roads", res.roads], ["Bridges / tunnels", res.bridges], ["Oversize / permit", res.oversize], ["Surcharges", res.surcharge]] as [string, number][]).map(([k, v]) => <div key={k} className="rounded-lg px-2.5 py-2 bg-[var(--navy)]/5 border border-[var(--navy)]/10"><div className="text-[var(--navy)]/55 uppercase tracking-wider">{k}</div><div className="display text-[var(--navy)] text-[15px] num mt-0.5">${N(v)}</div></div>)}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button className="flex-1 py-2.5 rounded-lg text-[12px] font-semibold bg-[var(--navy)] text-white hover:bg-[var(--navy-2)]">Export PDF</button>
                <button className="flex-1 py-2.5 rounded-lg text-[12px] font-semibold border border-[var(--navy)]/20 text-[var(--navy)] hover:bg-[var(--navy)]/5">Save route</button>
              </div>
              <button type="button" onClick={() => setPhase("form")} className="mt-3 w-full py-2.5 rounded-lg text-[12px] font-semibold text-[var(--navy)] bg-[var(--navy)]/8 hover:bg-[var(--navy)]/14 transition flex items-center justify-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>Calculate again
              </button>
            </div>
          )}

          {phase === "loading" && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6" style={{ background: "linear-gradient(180deg,rgba(255,255,255,0.94),rgba(240,247,255,0.92))", backdropFilter: "blur(10px)" }}>
              <div className="relative w-16 h-16"><div className="absolute inset-0 rounded-full border-[3px] border-[var(--navy)]/10" /><div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[var(--red)] animate-spin" /></div>
              <div className="display text-[16px] text-[var(--navy)] mt-5">Pricing your tolls</div>
              <div className="text-[12px] text-[var(--navy)]/60 mt-1.5 num">{LOADING_STEPS[step]}</div>
            </div>
          )}
        </div>
      </div>

      <div className="reveal reveal-d1 relative rounded-2xl overflow-hidden border border-white/10 min-h-[480px]" style={{ background: "#061A38" }}>
        <div ref={mapEl} className="absolute inset-0" />
        <div className="absolute top-4 left-4 glass-sky rounded-xl px-3.5 py-2.5 text-[11px] z-[600]">
          <div className="flex items-center gap-2 text-white/60 uppercase tracking-[0.14em] text-[10px]"><span className="live-dot" /> Active route</div>
          <div className="display text-white text-[13px] mt-1.5">{routeLabel}</div>
          <div className="num text-white/70 mt-0.5">Class · <b className="text-white">{axles}-axle</b></div>
        </div>
        <div className="absolute top-4 right-4 glass-sky rounded-xl px-3.5 py-2.5 text-[11px] z-[600] hidden sm:block">
          <div className="text-white/60 uppercase tracking-[0.14em] text-[10px]">Live · last 60s</div>
          <div className="flex items-center gap-4 mt-1.5"><div><div className="display text-white text-[14px] num">318</div><div className="text-white/55">Routes</div></div><div className="h-7 w-px bg-white/15" /><div><div className="display text-white text-[14px] num">$214</div><div className="text-white/55">Avg toll</div></div></div>
        </div>
        <div className="absolute left-4 right-4 bottom-4 glass-sky rounded-xl px-4 py-3 z-[600] flex flex-wrap items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2 text-white/70"><span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]" /><span>Origin</span><span className="ml-3 w-1.5 h-1.5 rounded-full bg-[var(--green)]" /><span>Destination</span></div>
          <div className="flex flex-wrap gap-2">
            {([["Elizabeth, NJ", "New York, NY", "Elizabeth → NYC"], ["Los Angeles, CA", "Dallas, TX", "LA → Dallas"], ["Savannah, GA", "Atlanta, GA", "Savannah → Atlanta"]] as const).map(([f, t, label]) => (
              <button key={label} onClick={() => quick(f, t)} className="glass-pill px-3 py-1.5 rounded-lg text-white/80 hover:text-white">{label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
