"use client";
import { useState } from "react";

const LOADS = [
  {
    id: "DR-1041",
    mode: "drayage",
    origin: "APM Terminals — Elizabeth, NJ",
    dest: "Philadelphia, PA",
    container: "dry",
    weight: 42000,
    rate: 1840,
    miles: 95,
    weather: "clear",
    avail: "Today",
    tag: "Hot",
  },
  {
    id: "DR-1042",
    mode: "drayage",
    origin: "Pier 400 (APM) — Los Angeles, CA",
    dest: "Ontario, CA",
    container: "dry",
    weight: 28000,
    rate: 620,
    miles: 34,
    weather: "clear",
    avail: "Today",
    tag: null,
  },
  {
    id: "PP-0890",
    mode: "porttoport",
    origin: "Long Beach (Pier E) — Long Beach, CA",
    dest: "Garden City Terminal — Savannah, GA",
    container: "reefer",
    weight: 38000,
    rate: 3200,
    miles: 2388,
    weather: "rain",
    avail: "Tomorrow",
    tag: "Premium",
  },
  {
    id: "IM-0312",
    mode: "intermodal",
    origin: "Norfolk International — Norfolk, VA",
    dest: "Chicago, IL (Rail Ramp)",
    container: "dry",
    weight: 35000,
    rate: 1960,
    miles: 891,
    weather: "clear",
    avail: "Jun 14",
    tag: null,
  },
  {
    id: "DR-1043",
    mode: "drayage",
    origin: "Seagirt Marine — Baltimore, MD",
    dest: "Richmond, VA",
    container: "dry",
    weight: 22000,
    rate: 740,
    miles: 160,
    weather: "snow",
    avail: "Jun 13",
    tag: null,
  },
  {
    id: "IM-0313",
    mode: "intermodal",
    origin: "Barbours Cut — Houston, TX",
    dest: "Dallas, TX (Rail Ramp)",
    container: "flat",
    weight: 18000,
    rate: 880,
    miles: 248,
    weather: "clear",
    avail: "Jun 14",
    tag: null,
  },
];

const MODE_LABELS: Record<string, string> = {
  drayage: "Drayage",
  porttoport: "Port–Port",
  intermodal: "Intermodal",
};
const CONT_LABELS: Record<string, string> = {
  dry: "Dry",
  reefer: "Reefer",
  flat: "Flat Rack",
  opentop: "Open Top",
  tank: "Tank",
};
const WEATHER_LABELS: Record<string, string> = {
  clear: "Clear",
  rain: "Rain",
  snow: "Snow/Ice",
  wind: "High Wind",
};
const WEATHER_ICON: Record<string, string> = {
  clear: "☀️",
  rain: "🌧️",
  snow: "🌨️",
  wind: "💨",
};

const N = (n: number) => n.toLocaleString();
const sel = "w-full rounded bg-white/[0.07] px-2.5 py-2 text-[12px] text-white placeholder-white/40 focus:outline-none focus:bg-white/[0.14] transition appearance-none cursor-pointer";
const label = "block text-[9.5px] font-semibold uppercase tracking-[0.07em] text-white/55 mb-1";

export default function LoadBoard() {
  const [filter, setFilter] = useState("all");
  const [fDist, setFDist] = useState("any");
  const [fType, setFType] = useState("any");
  const [fWeight, setFWeight] = useState("any");
  const [fWeather, setFWeather] = useState("any");
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);

  // Post form state
  const [pDist, setPDist] = useState("");
  const [pType, setPType] = useState("dry");
  const [pWeight, setPWeight] = useState("");
  const [pWeather, setPWeather] = useState("clear");

  const visible = LOADS.filter((l) => {
    if (filter !== "all" && l.mode !== filter) return false;
    if (fType !== "any" && l.container !== fType) return false;
    if (fWeather !== "any" && l.weather !== fWeather) return false;
    if (fDist !== "any") {
      if (fDist === "short" && l.miles >= 100) return false;
      if (fDist === "mid" && (l.miles < 100 || l.miles > 500)) return false;
      if (fDist === "long" && l.miles <= 500) return false;
    }
    if (fWeight !== "any") {
      if (fWeight === "light" && l.weight >= 20000) return false;
      if (fWeight === "med" && (l.weight < 20000 || l.weight > 40000)) return false;
      if (fWeight === "heavy" && l.weight <= 40000) return false;
    }
    return true;
  });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    setPosted(true);
    setTimeout(() => { setPosted(false); setPosting(false); setPDist(""); setPWeight(""); }, 2800);
  };

  return (
    <div className="reveal rounded-lg bg-white/[0.08] border border-[var(--red)]/30 backdrop-blur-sm shadow-2xl p-5 md:p-6 w-full max-w-[460px] mx-auto lg:mx-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="display text-[20px] md:text-[22px] text-white leading-tight">Load Board</h3>
          <p className="text-[12px] text-white/50 mt-0.5">Live available drayage loads</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="live-dot" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7CF0B0]">Live</span>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {[
          ["all", "All"],
          ["drayage", "Drayage"],
          ["porttoport", "P–P"],
          ["intermodal", "Intermodal"],
        ].map(([v, l]) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            className={`rounded py-1.5 text-[11px] font-semibold transition ${
              filter === v
                ? "bg-[var(--red)]/25 border border-[var(--red)] text-white"
                : "bg-white/[0.06] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.12]"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* 4-field filter row */}
      <div className="grid grid-cols-4 gap-2 mb-3 p-3 rounded-md bg-white/[0.04] border border-white/[0.07]">
        <div>
          <div className={label}>Distance</div>
          <select value={fDist} onChange={(e) => setFDist(e.target.value)} className={sel}>
            <option value="any">Any</option>
            <option value="short">&lt; 100 mi</option>
            <option value="mid">100–500 mi</option>
            <option value="long">500+ mi</option>
          </select>
        </div>
        <div>
          <div className={label}>Type</div>
          <select value={fType} onChange={(e) => setFType(e.target.value)} className={sel}>
            <option value="any">Any</option>
            <option value="dry">Dry</option>
            <option value="reefer">Reefer</option>
            <option value="flat">Flat Rack</option>
            <option value="opentop">Open Top</option>
            <option value="tank">Tank</option>
          </select>
        </div>
        <div>
          <div className={label}>Weight</div>
          <select value={fWeight} onChange={(e) => setFWeight(e.target.value)} className={sel}>
            <option value="any">Any</option>
            <option value="light">&lt; 20K lbs</option>
            <option value="med">20–40K lbs</option>
            <option value="heavy">40K+ lbs</option>
          </select>
        </div>
        <div>
          <div className={label}>Weather</div>
          <select value={fWeather} onChange={(e) => setFWeather(e.target.value)} className={sel}>
            <option value="any">Any</option>
            <option value="clear">☀️ Clear</option>
            <option value="rain">🌧️ Rain</option>
            <option value="snow">🌨️ Snow</option>
            <option value="wind">💨 Wind</option>
          </select>
        </div>
      </div>

      {/* Load cards */}
      <div className="space-y-2 max-h-[260px] overflow-y-auto pr-0.5">
        {visible.map((load) => (
          <div
            key={load.id}
            className="rounded-md p-3 bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.10] transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold text-white/45 font-mono">{load.id}</span>
                  <span className="text-[10px] rounded px-1.5 py-0.5 bg-white/[0.08] text-white/60">
                    {MODE_LABELS[load.mode]}
                  </span>
                  <span className="text-[10px] rounded px-1.5 py-0.5 bg-white/[0.08] text-white/55">
                    {CONT_LABELS[load.container] ?? load.container}
                  </span>
                  <span className="text-[10px]" title={WEATHER_LABELS[load.weather]}>{WEATHER_ICON[load.weather]}</span>
                  {load.tag && (
                    <span className={`text-[10px] rounded px-1.5 py-0.5 font-bold ${load.tag === "Hot" ? "bg-[var(--red)]/25 text-[var(--red)]" : "bg-amber-500/20 text-amber-400"}`}>
                      {load.tag}
                    </span>
                  )}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-white/85 leading-tight min-w-0">
                  <span className="truncate max-w-[110px]">{load.origin.split(" — ")[0]}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-white/40"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  <span className="truncate max-w-[90px] text-white/70">{load.dest}</span>
                </div>
                <div className="mt-1 text-[11px] text-white/45">
                  {N(load.miles)} mi · {N(load.weight)} lbs · {load.avail}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="display text-[18px] text-white num">${N(load.rate)}</div>
                <button className="mt-1.5 text-[10px] font-bold bg-[var(--red)] hover:bg-[var(--red)]/85 text-white px-2.5 py-1 rounded transition">
                  Claim
                </button>
              </div>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="text-center py-6 text-[12px] text-white/40">No loads match your filters.</div>
        )}
      </div>

      {/* Footer row */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[10px] text-white/35">{visible.length} load{visible.length !== 1 ? "s" : ""} · updates every 60s</p>
        <button
          onClick={() => setPosting((p) => !p)}
          className="text-[10px] font-bold text-[var(--red)] hover:underline flex items-center gap-1"
        >
          {posting ? "Cancel" : "+ Post a Dry Load"}
        </button>
      </div>

      {/* Post a Dry Load form */}
      {posting && (
        <form onSubmit={handlePost} className="mt-3 rounded-md bg-white/[0.05] border border-white/[0.10] p-4">
          {posted ? (
            <div className="text-center py-3">
              <div className="text-[#7CF0B0] text-[13px] font-semibold">Load posted successfully!</div>
              <div className="text-[11px] text-white/50 mt-1">Our team will match you with a carrier.</div>
            </div>
          ) : (
            <>
              <div className="text-[12px] font-bold text-white mb-3">Post a Dry Load</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label}>Distance (mi)</label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={pDist}
                    onChange={(e) => setPDist(e.target.value)}
                    placeholder="e.g. 250"
                    className="w-full rounded bg-white/[0.07] px-3 py-2 text-[13px] text-white placeholder-white/35 focus:outline-none focus:bg-white/[0.14] transition"
                  />
                </div>
                <div>
                  <label className={label}>Type</label>
                  <select value={pType} onChange={(e) => setPType(e.target.value)} className={`${sel} py-2`}>
                    <option value="dry">Dry</option>
                    <option value="reefer">Reefer</option>
                    <option value="flat">Flat Rack</option>
                    <option value="opentop">Open Top</option>
                    <option value="tank">Tank</option>
                  </select>
                </div>
                <div>
                  <label className={label}>Weight (lbs)</label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={pWeight}
                    onChange={(e) => setPWeight(e.target.value)}
                    placeholder="e.g. 35000"
                    className="w-full rounded bg-white/[0.07] px-3 py-2 text-[13px] text-white placeholder-white/35 focus:outline-none focus:bg-white/[0.14] transition"
                  />
                </div>
                <div>
                  <label className={label}>Weather</label>
                  <select value={pWeather} onChange={(e) => setPWeather(e.target.value)} className={`${sel} py-2`}>
                    <option value="clear">☀️ Clear</option>
                    <option value="rain">🌧️ Rain</option>
                    <option value="snow">🌨️ Snow/Ice</option>
                    <option value="wind">💨 High Wind</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="btn-primary w-full py-3 rounded text-[13px] font-semibold mt-3"
              >
                <span className="label">Submit Dry Load</span>
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
}
