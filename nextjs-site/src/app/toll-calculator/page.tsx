"use client";
import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/* eslint-disable @typescript-eslint/no-explicit-any */
const API = "/api/public/toll-calculator/calculate";
const money = (n: any) => (n === null || n === undefined ? "—" : `$${Number(n).toFixed(2)}`);

export default function TollCalculator() {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layers = useRef<any[]>([]);
  const [ready, setReady] = useState(false);
  const [from, setFrom] = useState("APM Terminals, McLester St, Elizabeth, NJ, USA");
  const [to, setTo] = useState("Philadelphia, PA, USA");
  const [category, setCategory] = useState("tractor_trailer");
  const [axles, setAxles] = useState("5");
  const [dual, setDual] = useState("yes");
  const [trailer, setTrailer] = useState("yes");
  const [commercial, setCommercial] = useState("yes");
  const [special, setSpecial] = useState("no");
  const [weight, setWeight] = useState("80000");
  const [height, setHeight] = useState("162");
  const [width, setWidth] = useState("102");
  const [length, setLength] = useState("576");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [res, setRes] = useState<any>(null);

  useEffect(() => {
    document.title = "Toll Calculator · DrayToll";
    const p = new URLSearchParams(window.location.search);
    const g = (k: string, s: (v: string) => void) => { const v = p.get(k); if (v) s(v); };
    g("from", setFrom); g("to", setTo); g("profile", setAxles); g("axles", setAxles);
    g("dual", setDual); g("trailer", setTrailer); g("weight", setWeight); g("height", setHeight); g("width", setWidth); g("length", setLength);
    const auto = !!p.get("from");
    const init = () => { const L = (window as any).L; if (L && mapEl.current && !mapRef.current) { const m = L.map(mapEl.current, { zoomControl: true, scrollWheelZoom: false, minZoom: 3, maxZoom: 12 }).setView([39.8, -77], 6); mapRef.current = m; L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", attribution: "© OpenStreetMap · © CARTO" }).addTo(m); setReady(true); if (auto) setTimeout(() => doCalc(), 300); } };
    if ((window as any).L) init();
    else {
      if (!document.getElementById("lfcss")) { const c = document.createElement("link"); c.id = "lfcss"; c.rel = "stylesheet"; c.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(c); }
      const s = document.createElement("script"); s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"; s.onload = init; document.head.appendChild(s);
    }
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draw = (c: any) => {
    const L = (window as any).L, m = mapRef.current; if (!L || !m) return;
    layers.current.forEach((x) => m.removeLayer(x)); layers.current = [];
    const pts: [number, number][] = (c.routePolyline || []).map((p: any) => [p.latitude, p.longitude]);
    if (pts.length) {
      layers.current.push(L.polyline(pts, { color: "#2563EB", weight: 5, opacity: 0.85 }).addTo(m));
      const dot = (c2: [number, number], color: string) => L.marker(c2, { icon: L.divIcon({ html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>`, className: "", iconSize: [16, 16], iconAnchor: [8, 8] }) }).addTo(m);
      layers.current.push(dot(pts[0], "#16B571"), dot(pts[pts.length - 1], "#FF6B00"));
    }
    (c.stops || []).forEach((s: any) => { if (s.latitude && s.longitude) layers.current.push(L.marker([s.latitude, s.longitude], { icon: L.divIcon({ html: `<div style="display:flex;align-items:center;justify-content:center;width:22px;height:28px;color:#EA4335;font-weight:800;font-size:13px;font-family:Poppins,sans-serif">T</div>`, className: "", iconSize: [22, 28], iconAnchor: [11, 28] }) }).addTo(m)); });
    if (pts.length) m.flyToBounds(L.latLngBounds(pts).pad(0.15), { duration: 0.8, maxZoom: 10 });
  };

  const doCalc = async () => {
    setLoading(true); setErr("");
    try {
      const body = { origin: from, destination: to, vehicle: { vehicle_type: category, weight: +weight || 1000, height: +height || 120, width: +width || 96, length: +length || 576, total_number_of_axles: parseInt(axles) || 5, has_trailer: trailer === "yes", has_dual_tires: dual === "yes", is_commercial: commercial === "yes", is_special_load: special === "yes" } };
      const r = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json();
      const c = j?.data?.calculation;
      if (!c || j?.data?.ok === false) { setErr(j?.data?.message || "Could not calculate this route. Try different addresses."); setRes(null); }
      else { setRes(c); setTimeout(() => draw(c), 60); }
    } catch { setErr("Network error. Please try again."); }
    setLoading(false);
  };

  const inp = "input";
  return (
    <>
      <Nav />
      <main className="bg-[#F6F8FB] min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <h1 className="display text-[30px] md:text-[36px] text-[var(--navy)]">Toll Calculator</h1>
          <p className="text-[var(--muted)] text-[14px] mt-1">Live TollSmart route pricing — per-plaza cash & transponder rates by truck class.</p>

          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="space-y-5">
              <div className="bg-white rounded-lg border border-[var(--navy)]/8 p-5 md:p-6 shadow-sm">
                <form onSubmit={(e) => { e.preventDefault(); doCalc(); }} className="space-y-3.5">
                  <div><label className="input-label">From <span className="text-[var(--red)]">*</span></label><input className={inp + " mt-1"} required value={from} onChange={(e) => setFrom(e.target.value)} /></div>
                  <div><label className="input-label">To <span className="text-[var(--red)]">*</span></label><input className={inp + " mt-1"} required value={to} onChange={(e) => setTo(e.target.value)} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="input-label">Vehicle category</label><select className={inp + " mt-1"} value={category} onChange={(e) => setCategory(e.target.value)}><option value="tractor_trailer">Tractor Trailer</option><option value="truck">Truck</option><option value="bus">Bus</option></select></div>
                    <div><label className="input-label">Truck profile</label><select className={inp + " mt-1"} value={axles} onChange={(e) => setAxles(e.target.value)}>{[2, 3, 4, 5, 6, 7].map((a) => <option key={a} value={a}>{a}-Axle{a === 5 ? " Semi-Trailer" : ""} — {a} axles</option>)}</select></div>
                    <div><label className="input-label">Dual tires</label><select className={inp + " mt-1"} value={dual} onChange={(e) => setDual(e.target.value)}><option value="yes">Yes</option><option value="no">No</option></select></div>
                    <div><label className="input-label">Has trailer</label><select className={inp + " mt-1"} value={trailer} onChange={(e) => setTrailer(e.target.value)}><option value="yes">Yes</option><option value="no">No</option></select></div>
                    <div><label className="input-label">Commercial</label><select className={inp + " mt-1"} value={commercial} onChange={(e) => setCommercial(e.target.value)}><option value="yes">Yes</option><option value="no">No</option></select></div>
                    <div><label className="input-label">Special load</label><select className={inp + " mt-1"} value={special} onChange={(e) => setSpecial(e.target.value)}><option value="no">No</option><option value="yes">Yes</option></select></div>
                    <div><label className="input-label">Weight (lbs)</label><input className={inp + " mt-1 num"} type="number" value={weight} onChange={(e) => setWeight(e.target.value)} /></div>
                    <div><label className="input-label">Height (in)</label><input className={inp + " mt-1 num"} type="number" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
                    <div><label className="input-label">Width (in)</label><input className={inp + " mt-1 num"} type="number" value={width} onChange={(e) => setWidth(e.target.value)} /></div>
                    <div><label className="input-label">Length (in)</label><input className={inp + " mt-1 num"} type="number" value={length} onChange={(e) => setLength(e.target.value)} /></div>
                  </div>
                  <button type="submit" disabled={!ready || loading} className="btn-primary w-full py-3.5 rounded-md text-[14px] font-semibold disabled:opacity-60"><span className="label">{loading ? "Calculating…" : "Calculate tolls"}</span></button>
                  {err && <p className="text-[13px] text-[var(--red)] text-center">{err}</p>}
                </form>
              </div>

              {res && (
                <>
                  <div className="bg-white rounded-lg border border-[var(--navy)]/8 p-4 shadow-sm grid grid-cols-2 gap-4">
                    <div><div className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-bold">Distance</div><div className="display text-[18px] text-[var(--navy)] mt-1">{res.distanceMiles || "—"}</div></div>
                    <div><div className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-bold">Duration</div><div className="display text-[18px] text-[var(--navy)] mt-1">{res.durationLabel || "—"}</div></div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {([["Cash / Plate", res.tollCashUsd, "var(--navy)"], ["Transponder", res.tollTransponderUsd, "var(--green)"], ["You Pay", res.tollCashUsd, "var(--red)"]] as [string, any, string][]).map(([k, v, c]) => (
                      <div key={k} className="bg-white rounded-lg border border-[var(--navy)]/8 p-4 text-center shadow-sm"><div className="text-[10px] uppercase tracking-[0.12em] font-bold text-[var(--muted)]">{k}</div><div className="display text-[22px] num mt-1" style={{ color: c }}>{money(v)}</div></div>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg border border-[var(--navy)]/8 p-5 md:p-6 shadow-sm">
                    <h2 className="display text-[18px] text-[var(--navy)] mb-4">Toll details</h2>
                    <div className="space-y-3">
                      {(res.stops || []).map((s: any, i: number) => (
                        <div key={s.id || i} className="rounded-lg border border-[var(--navy)]/8 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <span className="font-semibold text-[var(--red)]">{s.displayName || s.name}</span>
                              {s.tollTypeLabel && <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--muted)] bg-[var(--navy)]/6 px-1.5 py-0.5 rounded ml-2">{s.tollTypeLabel}</span>}
                              {s.exit && <div className="text-[12px] text-[var(--muted)] mt-1.5">Exit: {s.exit}</div>}
                              {Array.isArray(s.paymentMethods) && s.paymentMethods.length > 0 && <div className="text-[12px] text-[var(--muted)] mt-1">Payment: {s.paymentMethods.join(", ")}</div>}
                              {s.description && <div className="text-[12px] text-[var(--muted)] mt-1">{s.description}</div>}
                            </div>
                            <div className="text-right shrink-0 num text-[13px]"><div className="text-[var(--navy)]">Cash: <b>{money(s.cashRate)}</b></div><div className="text-[var(--green)]">Pass: <b>{money(s.etcRate)}</b></div></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-[var(--muted)] mt-4">Data from TollSmart. Each toll plaza shown with cash and transponder rates for your vehicle class.</p>
                  </div>
                </>
              )}
            </div>

            <div className="relative rounded-lg overflow-hidden border border-[var(--navy)]/10 shadow-sm min-h-[480px] lg:sticky lg:top-20 h-[78vh]">
              <div ref={mapEl} className="absolute inset-0" />
              {loading && <div className="absolute inset-0 z-[500] flex items-center justify-center bg-white/60 backdrop-blur-sm"><div className="w-12 h-12 rounded-full border-[3px] border-[var(--navy)]/15 border-t-[var(--red)] animate-spin" /></div>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
