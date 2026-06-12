"use client";
import { useState } from "react";

const LOADS = [
  {
    id: "DR-1041",
    mode: "drayage",
    origin: "APM Terminals — Elizabeth, NJ",
    dest: "Philadelphia, PA",
    container: "40' HC Dry",
    weight: "42K lbs",
    rate: 1840,
    miles: 95,
    avail: "Today",
    tag: "Hot",
  },
  {
    id: "DR-1042",
    mode: "drayage",
    origin: "Pier 400 (APM) — Los Angeles, CA",
    dest: "Ontario, CA",
    container: "20' Dry",
    weight: "28K lbs",
    rate: 620,
    miles: 34,
    avail: "Today",
    tag: null,
  },
  {
    id: "PP-0890",
    mode: "porttoport",
    origin: "Long Beach (Pier E) — Long Beach, CA",
    dest: "Garden City Terminal — Savannah, GA",
    container: "40' Reefer",
    weight: "38K lbs",
    rate: 3200,
    miles: 2388,
    avail: "Tomorrow",
    tag: "Premium",
  },
  {
    id: "IM-0312",
    mode: "intermodal",
    origin: "Norfolk International — Norfolk, VA",
    dest: "Chicago, IL (Rail Ramp)",
    container: "40' HC Dry",
    weight: "35K lbs",
    rate: 1960,
    miles: 891,
    avail: "Jun 14",
    tag: null,
  },
  {
    id: "DR-1043",
    mode: "drayage",
    origin: "Seagirt Marine — Baltimore, MD",
    dest: "Richmond, VA",
    container: "40' Standard Dry",
    weight: "22K lbs",
    rate: 740,
    miles: 160,
    avail: "Jun 13",
    tag: null,
  },
  {
    id: "IM-0313",
    mode: "intermodal",
    origin: "Barbours Cut — Houston, TX",
    dest: "Dallas, TX (Rail Ramp)",
    container: "20' Dry",
    weight: "18K lbs",
    rate: 880,
    miles: 248,
    avail: "Jun 14",
    tag: null,
  },
];

const MODE_LABELS: Record<string, string> = {
  drayage: "Drayage",
  porttoport: "Port–Port",
  intermodal: "Intermodal",
};

const N = (n: number) => n.toLocaleString();

export default function LoadBoard() {
  const [filter, setFilter] = useState("all");

  const visible = filter === "all" ? LOADS : LOADS.filter((l) => l.mode === filter);

  return (
    <div className="reveal rounded-lg bg-white/[0.08] border border-[var(--red)]/30 backdrop-blur-sm shadow-2xl p-5 md:p-6 w-full max-w-[460px] mx-auto lg:mx-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="display text-[20px] md:text-[22px] text-white leading-tight">Load Board</h3>
          <p className="text-[12px] text-white/50 mt-0.5">Live available drayage loads</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="live-dot" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7CF0B0]">Live</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="grid grid-cols-4 gap-1.5 mb-4">
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

      {/* Load cards */}
      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-0.5">
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
                  {load.tag && (
                    <span
                      className={`text-[10px] rounded px-1.5 py-0.5 font-bold ${
                        load.tag === "Hot"
                          ? "bg-[var(--red)]/25 text-[var(--red)]"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {load.tag}
                    </span>
                  )}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-white/85 leading-tight min-w-0">
                  <span className="truncate max-w-[120px]">{load.origin.split(" — ")[0]}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-white/40"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                  <span className="truncate max-w-[100px] text-white/70">{load.dest}</span>
                </div>
                <div className="mt-1 text-[11px] text-white/45">
                  {load.container} · {load.weight} · {N(load.miles)} mi · {load.avail}
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
          <div className="text-center py-8 text-[12px] text-white/40">No loads in this category right now.</div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-[10px] text-white/35">
          {visible.length} load{visible.length !== 1 ? "s" : ""} available · updates every 60s
        </p>
        <a href="/rate-map" className="text-[10px] font-semibold text-[var(--red)] hover:underline">
          View rate map →
        </a>
      </div>
    </div>
  );
}
