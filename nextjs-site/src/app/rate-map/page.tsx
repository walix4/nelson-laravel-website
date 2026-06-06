"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { asset } from "@/lib/site";

const MPG = 7;
const DIESEL = 5.15;
const fuel = (miles: number) => (miles / MPG) * DIESEL;
const usd = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type Pt = [number, number];
type Port = { name: string; city: string; miles: number; color: string; port: Pt; dest: Pt };

// % positions calibrated to /usa-map.svg silhouette (background-size 92%, centered)
const CITIES: Record<string, Pt> = {
  Chicago: [63, 38], Denver: [38, 50], Dallas: [52, 66], Atlanta: [72, 57],
  "Washington DC": [86, 43], Charlotte: [80, 53],
  "Salt Lake City": [30, 45], "Kansas City": [55, 48], Phoenix: [22, 67],
};

const LEFT: Port[] = [
  { name: "Port of Seattle", city: "Chicago", miles: 2064, color: "#2B7CC4", port: [13, 20], dest: CITIES.Chicago },
  { name: "Port of Oakland", city: "Denver", miles: 1235, color: "#34A853", port: [8, 48], dest: CITIES.Denver },
  { name: "Port of LA / Long Beach", city: "Dallas", miles: 1419, color: "#E53535", port: [11, 61], dest: CITIES.Dallas },
  { name: "Port of San Diego", city: "Dallas", miles: 1322, color: "#E0529B", port: [14, 66], dest: CITIES.Dallas },
  { name: "Port of Houston", city: "Dallas", miles: 239, color: "#00B4B4", port: [55, 80], dest: CITIES.Dallas },
  { name: "Port of New Orleans", city: "Dallas", miles: 504, color: "#00CC88", port: [62, 78], dest: CITIES.Dallas },
];
const RIGHT: Port[] = [
  { name: "Port of New York / NJ", city: "Chicago", miles: 791, color: "#FF9A00", port: [90, 33], dest: CITIES.Chicago },
  { name: "Port of Baltimore", city: "Washington DC", miles: 38, color: "#B06FD8", port: [87, 40], dest: CITIES["Washington DC"] },
  { name: "Port of Virginia", city: "Charlotte", miles: 340, color: "#8C7BFF", port: [86, 48], dest: CITIES.Charlotte },
  { name: "Port of Charleston", city: "Charlotte", miles: 211, color: "#2BC4A8", port: [84, 61], dest: CITIES.Charlotte },
  { name: "Port of Savannah", city: "Atlanta", miles: 255, color: "#FF6B00", port: [83, 58], dest: CITIES.Atlanta },
  { name: "Port of Tampa", city: "Atlanta", miles: 470, color: "#FFB300", port: [83, 82], dest: CITIES.Atlanta },
  { name: "Port of Miami", city: "Atlanta", miles: 663, color: "#FFD700", port: [87, 90], dest: CITIES.Atlanta },
];
const ALL = [...LEFT, ...RIGHT];
const DEST_NAMES = Array.from(new Set(ALL.map((p) => p.city)));

function Card({ p, align }: { p: Port; align: "left" | "right" }) {
  return (
    <div className="rounded-lg p-3.5 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderLeft: align === "left" ? `3px solid ${p.color}` : undefined, borderRight: align === "right" ? `3px solid ${p.color}` : undefined }}>
      <div className="flex items-center gap-2">
        <span className="grid place-items-center rounded-md" style={{ width: 22, height: 22, background: `${p.color}22`, border: `1px solid ${p.color}55` }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2.5" /><path d="M12 7.5V21M5 12H2a10 10 0 0 0 20 0h-3M12 12l-4 4M12 12l4 4" /></svg>
        </span>
        <div className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-white leading-tight">{p.name}</div>
      </div>
      <div className="mt-2.5 flex items-center justify-between text-[11.5px]">
        <span className="text-white/55">Miles to {p.city}</span>
        <span className="num font-bold text-white">{p.miles.toLocaleString()}</span>
      </div>
      <div className="mt-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="mt-1.5 flex items-center justify-between text-[11.5px]">
        <span className="text-white/55">Fuel Cost</span>
        <span className="num font-extrabold" style={{ color: p.color }}>${usd(fuel(p.miles))}</span>
      </div>
    </div>
  );
}

export default function RateMapPage() {
  return (
    <>
      <Nav />
      <section className="py-9 md:py-12" style={{ background: "linear-gradient(160deg,#061A38 0%,#0B2350 60%,#0d3570 100%)" }}>
        <div className="max-w-[1500px] mx-auto px-5">
          {/* header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-7">
            <div>
              <div className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[var(--red)]">Port terminals drayage rate guide</div>
              <h1 className="display text-[34px] md:text-[50px] text-white leading-[1.02] mt-2">Drayage Rate Map</h1>
              <p className="mt-2.5 text-white/60 text-[14.5px] max-w-xl">Average over-the-road fuel cost from every major U.S. container port to its nearest inland hub.</p>
            </div>
            {/* assumptions */}
            <div className="rounded-xl p-4 w-full lg:w-[340px] shrink-0" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,107,0,0.35)" }}>
              <div className="text-[10.5px] uppercase tracking-[0.16em] font-bold text-[var(--red)]">Rate calculation assumptions</div>
              <div className="mt-3 flex items-center justify-between text-[12.5px]"><span className="text-white/70">Miles per gallon (diesel)</span><span className="num font-extrabold text-white">{MPG} MPG</span></div>
              <div className="mt-2 flex items-center justify-between text-[12.5px]"><span className="text-white/70">Diesel price per gallon</span><span className="num font-extrabold text-white">${DIESEL.toFixed(2)}</span></div>
              <div className="mt-3 rounded-md px-3 py-2 text-[11.5px] num font-semibold text-white/90 text-center" style={{ background: "rgba(255,107,0,0.16)", border: "1px solid rgba(255,107,0,0.3)" }}>(Total miles ÷ {MPG}) × ${DIESEL.toFixed(2)} = Fuel Cost</div>
            </div>
          </div>

          {/* main grid */}
          <div className="grid lg:grid-cols-[235px_1fr_235px] gap-5 items-start">
            {/* left cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3 order-2 lg:order-1">
              {LEFT.map((p) => <Card key={p.name} p={p} align="left" />)}
            </div>

            {/* map */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 560, background: "radial-gradient(700px 400px at 50% 30%,rgba(58,95,192,0.18),transparent 70%),linear-gradient(160deg,#0a2350,#06143A)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="absolute inset-0" style={{ backgroundImage: `url(${asset("/usa-map.svg")})`, backgroundSize: "92%", backgroundPosition: "center", backgroundRepeat: "no-repeat", opacity: 0.3, filter: "brightness(0) invert(1)" }} />
                {/* connector lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {ALL.map((p) => (
                    <line key={p.name} x1={p.port[0]} y1={p.port[1]} x2={p.dest[0]} y2={p.dest[1]} stroke={p.color} strokeWidth="0.45" strokeLinecap="round" opacity="0.85" />
                  ))}
                </svg>
                {/* destination cities */}
                {DEST_NAMES.map((c) => (
                  <span key={c} className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5" style={{ left: `${CITIES[c][0]}%`, top: `${CITIES[c][1]}%` }}>
                    <span className="block rounded-full bg-white" style={{ width: 8, height: 8, boxShadow: "0 0 0 3px rgba(255,255,255,0.2)" }} />
                    <span className="text-[9.5px] font-bold uppercase tracking-wide text-white whitespace-nowrap" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>{c}</span>
                  </span>
                ))}
                {/* reference cities */}
                {["Salt Lake City", "Kansas City", "Phoenix"].map((c) => (
                  <span key={c} className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5" style={{ left: `${CITIES[c][0]}%`, top: `${CITIES[c][1]}%` }}>
                    <span className="block rounded-full" style={{ width: 5, height: 5, background: "rgba(255,255,255,0.55)" }} />
                    <span className="text-[8.5px] font-semibold uppercase tracking-wide text-white/55 whitespace-nowrap">{c}</span>
                  </span>
                ))}
                {/* port dots */}
                {ALL.map((p) => (
                  <span key={p.name} title={p.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.port[0]}%`, top: `${p.port[1]}%` }}>
                    <span className="block rounded-full" style={{ width: 11, height: 11, background: p.color, boxShadow: `0 0 0 4px ${p.color}33, 0 0 14px ${p.color}` }} />
                  </span>
                ))}
              </div>
              {/* how to read */}
              <div className="mt-4 rounded-lg p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-[10.5px] uppercase tracking-[0.16em] font-bold text-[var(--red)]">How to read this map</div>
                <div className="mt-2.5 grid sm:grid-cols-3 gap-3 text-[12px] text-white/70">
                  <div className="flex gap-2"><span className="num font-bold" style={{ color: "var(--red)" }}>1.</span> Pick your port terminal from either side.</div>
                  <div className="flex gap-2"><span className="num font-bold" style={{ color: "var(--red)" }}>2.</span> Follow the line to its inland hub & total miles.</div>
                  <div className="flex gap-2"><span className="num font-bold" style={{ color: "var(--red)" }}>3.</span> Fuel cost = (miles ÷ {MPG}) × ${DIESEL.toFixed(2)}.</div>
                </div>
              </div>
            </div>

            {/* right cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3 order-3">
              {RIGHT.map((p) => <Card key={p.name} p={p} align="right" />)}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
