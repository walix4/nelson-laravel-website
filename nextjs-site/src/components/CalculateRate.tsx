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
const LOADING_STEPS = ["Routing port to door…", "Pulling live diesel + FSC…", "Pricing chassis & port fees…", "Sealing the rate…"];

function hav(a: [number, number], b: [number, number]) { const R = 3958.8, t = (v: number) => (v * Math.PI) / 180; const dL = t(b[0] - a[0]), dG = t(b[1] - a[1]); const x = Math.sin(dL / 2) ** 2 + Math.cos(t(a[0])) * Math.cos(t(b[0])) * Math.sin(dG / 2) ** 2; return 2 * R * Math.asin(Math.min(1, Math.sqrt(x))); }
function computeQuote(o: [number, number], d: [number, number], type: string, qty: number, acc: string[]) {
  const miles = hav(o, d), mpg = 7, diesel = 5.18, fsc = 0.17, drvHr = 28, speed = 50, legs = 2;
  const fuel = (miles / mpg) * diesel * (1 + fsc) * legs;
  const labor = (miles / speed + 2.5) * drvHr * legs;
  const chassis = 40 * Math.max(1, Math.ceil(miles / 300));
  const port = 75, overhead = 160;
  const accCost = (acc.includes("overweight") ? 125 : 0) + (acc.includes("hazmat") ? 180 : 0) + (acc.includes("reefer") ? 95 : 0) + (acc.includes("prepull") ? 75 : 0) + (acc.includes("tolls") ? Math.round(miles * 0.04) : 0);
  const m = type === "45hc" ? 1.08 : type === "40rf" ? 1.15 : type === "20" ? 0.88 : 1;
  const sub = (fuel + labor + chassis + port + overhead + accCost) * m * qty;
  const margin = sub * 0.15, admin = sub * 0.05;
  return { miles: Math.round(miles), total: Math.round(sub + margin + admin), eta: Math.round((miles / speed + 4) * 10) / 10, fuel: Math.round(fuel * m * qty), labor: Math.round(labor * m * qty), chassis: Math.round(chassis * qty), port: port * qty, overhead: Math.round(overhead * qty + margin + admin), acc: Math.round(accCost * qty) };
}
const N = (n: number) => n.toLocaleString();
const ACC = [["tolls", "Tolls"], ["prepull", "Pre-pull"], ["overweight", "Overweight"], ["hazmat", "Hazmat"], ["reefer", "Reefer plug"]];

export default function CalculateRate({ compact = false }: { compact?: boolean }) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const routeRef = useRef<any>({ line: null, truck: null, o: null, d: null, raf: 0 });
  const [ready, setReady] = useState(false);
  const [origin, setOrigin] = useState("LAX");
  const [dest, setDest] = useState("DAL");
  const [contType, setContType] = useState("40");
  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState(32000);
  const [line, setLine] = useState("Maersk");
  const [acc, setAcc] = useState<string[]>([]);
  const [phase, setPhase] = useState<"form" | "loading" | "result">("form");
  const [step, setStep] = useState(0);
  const [res, setRes] = useState<ReturnType<typeof computeQuote> | null>(null);

  const drawRoute = (oKey: string, dKey: string) => {
    const L = (window as any).L, map = mapRef.current; if (!L || !map) return;
    const r = routeRef.current;
    if (r.raf) cancelAnimationFrame(r.raf);
    ["line", "truck", "o", "d"].forEach((k) => { if (r[k]) { map.removeLayer(r[k]); r[k] = null; } });
    const o = PORTS[oKey].coords, d = HUBS[dKey].coords;
    r.o = L.marker(o, { icon: L.divIcon({ html: `<div class="port-icon origin"><div class="ring"></div><div class="dot"></div></div>`, className: "", iconSize: [14, 14], iconAnchor: [7, 7] }) }).addTo(map);
    r.d = L.marker(d, { icon: L.divIcon({ html: `<div class="port-icon destination"><div class="ring"></div><div class="dot"></div><div class="label" style="left:18px;top:-3px;">${HUBS[dKey].name}</div></div>`, className: "", iconSize: [14, 14], iconAnchor: [7, 7] }) }).addTo(map);
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
    }, 900);
  };

  useEffect(() => {
    if (compact) { setReady(true); return; }
    let cancelled = false;
    const start = () => {
      const L = (window as any).L;
      if (!L) { setTimeout(start, 120); return; }
      if (cancelled || mapRef.current || !mapEl.current) return;
      const map = L.map(mapEl.current, { zoomControl: true, attributionControl: true, scrollWheelZoom: false, minZoom: 3, maxZoom: 8 }).setView([39.5, -96], 4);
      mapRef.current = map;
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19, attribution: "© OpenStreetMap · © CARTO" }).addTo(map);
      const WARM = new Set([1, 4, 7, 10, 13]); // ~1/3 red corridors, like Laravel's random "warm"
      CORRIDORS.forEach(([a, b], i) => { const A = PORTS[a]?.coords || HUBS[a]?.coords, B = PORTS[b]?.coords || HUBS[b]?.coords; L.polyline([A, B], { className: "corridor" + (WARM.has(i) ? " corridor-warm" : ""), weight: 1.2, smoothFactor: 1 }).addTo(map); });
      Object.entries(PORTS).forEach(([k, p]) => {
        const html = `<div class="port-icon"><div class="ring"></div><div class="dot"></div><div class="label">${p.name.split("/")[0].split(",")[0]}</div></div>`;
        L.marker(p.coords, { icon: L.divIcon({ html, className: "", iconSize: [14, 14], iconAnchor: [7, 7] }), title: p.name }).on("click", () => setOrigin(k)).addTo(map);
      });
      setReady(true);
      drawRoute("LAX", "DAL");
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

  const run = (oKey: string, dKey: string) => {
    if (!ready) return;
    drawRoute(oKey, dKey);
    setPhase("loading");
    setTimeout(() => { setRes(computeQuote(PORTS[oKey].coords, HUBS[dKey].coords, contType, qty, acc)); setPhase("result"); }, 3000);
  };
  const toggleAcc = (v: string) => setAcc((a) => (a.includes(v) ? a.filter((x) => x !== v) : [...a, v]));

  const formCard = (
      <div className="reveal">
        <div className={`p-5 md:p-6 lg:p-7 relative overflow-hidden ${compact ? "rounded-lg calc-glass border border-[var(--red)]/30 backdrop-blur-md shadow-2xl" : "rounded-2xl"}`} style={{ background: compact ? "rgba(255,255,255,0.08)" : "#fff", minHeight: phase === "form" ? undefined : 560 }}>
          <div className="flex items-center justify-between">
            <div><div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--navy)]/70">Instant quote engine</div><h3 className="display text-[24px] md:text-[26px] text-[var(--navy)] mt-1">Price your move</h3></div>
            <div className="px-2.5 py-1 rounded-md text-[10px] font-semibold text-[var(--navy)] bg-[var(--navy)]/8 border border-[var(--navy)]/10">v2026.07</div>
          </div>

          {phase !== "result" && (
            <form className="mt-5 space-y-3.5" onSubmit={(e) => { e.preventDefault(); run(origin, dest); }}>
              <div><label className="input-label">Origin port / ramp</label><select className="input mt-1.5" value={origin} onChange={(e) => setOrigin(e.target.value)}>{Object.entries(PORTS).map(([k, p]) => <option key={k} value={k}>{p.name}</option>)}</select></div>
              <div><label className="input-label">Destination city</label><select className="input mt-1.5" value={dest} onChange={(e) => setDest(e.target.value)}>{Object.entries(HUBS).map(([k, h]) => <option key={k} value={k}>{h.name}</option>)}</select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="input-label">Container</label><select className="input mt-1.5" value={contType} onChange={(e) => setContType(e.target.value)}><option value="40">40&apos; Standard</option><option value="40hc">40&apos; High Cube</option><option value="20">20&apos; Standard</option><option value="45hc">45&apos; High Cube</option><option value="40rf">40&apos; Reefer</option></select></div>
                <div><label className="input-label">Qty</label><input className="input mt-1.5 num" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value))} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="input-label">Weight (lb)</label><input className="input mt-1.5 num" type="number" min={0} value={weight} onChange={(e) => setWeight(+e.target.value)} /></div>
                <div><label className="input-label">Shipping line</label><select className="input mt-1.5" value={line} onChange={(e) => setLine(e.target.value)}>{["Maersk", "MSC", "CMA CGM", "Hapag-Lloyd", "ONE", "Evergreen", "COSCO", "Other"].map((l) => <option key={l}>{l}</option>)}</select></div>
              </div>
              <div>
                <label className="input-label">Accessorials</label>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  {ACC.map(([v, label]) => <button type="button" key={v} onClick={() => toggleAcc(v)} className={`px-3 py-1.5 rounded-md border transition ${acc.includes(v) ? (compact ? "bg-[var(--red)] text-white border-[var(--red)]" : "bg-[var(--navy)] text-white border-[var(--navy)]") : (compact ? "border-white/20 bg-white/[0.06] text-white/80 hover:bg-white/[0.12]" : "border-[var(--navy)]/15 bg-white/60 text-[var(--navy)]/80")}`}>{label}</button>)}
                </div>
              </div>
              <button type="submit" className="btn-primary w-full py-4 rounded-lg text-[14px] font-semibold" style={{ marginTop: "1.6rem" }}><span className="label">Calculate instant rate</span></button>
              <p className="text-[10px] text-[var(--navy)]/55 text-center mt-1">No login · No card · Rates lock for 24h</p>
            </form>
          )}

          {phase === "result" && res && (
            <div className="mt-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--green)] flex items-center gap-1.5"><span className="live-dot" /> Live rate · locked 24h</div>
                  <div className="flex items-baseline gap-2 mt-1"><span className="display text-[40px] text-[var(--navy)] num leading-none">${N(res.total)}</span><span className="text-[12px] text-[var(--navy)]/60">/ round trip</span></div>
                </div>
                <div className="text-right text-[11px] text-[var(--navy)]/70"><div className="num"><b>{N(res.miles)}</b> mi total</div><div className="num"><b>{res.eta}</b> hr transit</div></div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
                {([["Fuel", res.fuel], ["Labor", res.labor], ["Chassis", res.chassis], ["Port", res.port], ["Overhead", res.overhead], ["Access.", res.acc]] as [string, number][]).map(([k, v]) => <div key={k} className="rounded-lg px-2 py-2 bg-[var(--navy)]/5 border border-[var(--navy)]/10"><div className="text-[var(--navy)]/55 uppercase tracking-wider">{k}</div><div className="display text-[var(--navy)] text-[14px] num mt-0.5">${N(v)}</div></div>)}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button className={`flex-1 py-2.5 rounded-lg text-[12px] font-semibold ${compact ? "bg-[var(--red)] text-white hover:brightness-110" : "bg-[var(--navy)] text-white hover:bg-[var(--navy-2)]"}`}>Export PDF</button>
                <button className="flex-1 py-2.5 rounded-lg text-[12px] font-semibold border border-[var(--navy)]/20 text-[var(--navy)] hover:bg-[var(--navy)]/5">Request booking</button>
              </div>
              <button type="button" onClick={() => setPhase("form")} className="mt-3 w-full py-2.5 rounded-lg text-[12px] font-semibold text-[var(--navy)] bg-[var(--navy)]/8 hover:bg-[var(--navy)]/14 transition flex items-center justify-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>Calculate again
              </button>
            </div>
          )}

          {phase === "loading" && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6" style={{ background: compact ? "rgba(8,18,38,0.82)" : "linear-gradient(180deg,rgba(255,255,255,0.94),rgba(240,247,255,0.92))", backdropFilter: "blur(10px)" }}>
              <div className="relative w-16 h-16"><div className="absolute inset-0 rounded-full border-[3px] border-[var(--navy)]/10" /><div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[var(--red)] animate-spin" /></div>
              <div className="display text-[16px] text-[var(--navy)] mt-5">Computing your rate</div>
              <div className="text-[12px] text-[var(--navy)]/60 mt-1.5 num">{LOADING_STEPS[step]}</div>
            </div>
          )}
        </div>
      </div>
  );

  const mapPanel = (
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
              <button key={label} onClick={() => { setOrigin(o); setDest(d); run(o, d); }} className="glass-pill px-3 py-1.5 rounded-lg text-white/80 hover:text-white">{label}</button>
            ))}
          </div>
        </div>
      </div>
  );

  if (compact) return formCard;
  return (
    <div className="grid lg:grid-cols-[1fr_1.55fr] gap-5 items-stretch">
      {formCard}
      {mapPanel}
    </div>
  );
}
