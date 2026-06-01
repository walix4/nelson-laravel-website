"use client";
import { useEffect, useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const UC: Record<string, { special?: string; units: Record<string, number> }> = {
  Length: { units: { "Meter (m)": 1, "Kilometer (km)": 1000, "Centimeter (cm)": 0.01, "Millimeter (mm)": 0.001, "Mile (mi)": 1609.344, "Yard (yd)": 0.9144, "Foot (ft)": 0.3048, "Inch (in)": 0.0254, "Nautical mile (nmi)": 1852 } },
  Weight: { units: { "Kilogram (kg)": 1, "Gram (g)": 0.001, "Metric tonne (t)": 1000, "Pound (lb)": 0.45359237, "Ounce (oz)": 0.028349523, "US ton": 907.18474, "Long ton": 1016.0469 } },
  Volume: { units: { "Liter (L)": 1, "Milliliter (mL)": 0.001, "Cubic meter (m³)": 1000, "Cubic foot (ft³)": 28.316846, "US gallon": 3.785411784, "Imperial gallon": 4.54609, "Barrel (oil)": 158.987295 } },
  Area: { units: { "Square meter (m²)": 1, "Square kilometer (km²)": 1e6, "Hectare (ha)": 10000, "Square foot (ft²)": 0.092903, "Square yard (yd²)": 0.836127, Acre: 4046.8564 } },
  Speed: { units: { "Meter/sec (m/s)": 1, "Kilometer/hour (km/h)": 0.277778, "Mile/hour (mph)": 0.44704, "Knot (kn)": 0.514444, "Foot/sec (ft/s)": 0.3048 } },
  Acceleration: { units: { "Meter/sq.sec (m/sec²)": 1, "Foot/sq.sec (ft/sec²)": 0.3048, "Standard gravity (g)": 9.80665, "Gal (cm/sec²)": 0.01 } },
  Time: { units: { "Second (s)": 1, "Minute (min)": 60, "Hour (h)": 3600, "Day (d)": 86400, Week: 604800 } },
  Temperature: { special: "temp", units: { "Celsius (°C)": 1, "Fahrenheit (°F)": 1, "Kelvin (K)": 1 } },
};
const toC = (v: number, u: string) => (u.startsWith("Fahrenheit") ? ((v - 32) * 5) / 9 : u.startsWith("Kelvin") ? v - 273.15 : v);
const fromC = (v: number, u: string) => (u.startsWith("Fahrenheit") ? (v * 9) / 5 + 32 : u.startsWith("Kelvin") ? v + 273.15 : v);

export default function Page() {
  const [cat, setCat] = useState("Length");
  const units = useMemo(() => Object.keys(UC[cat].units), [cat]);
  const [from, setFrom] = useState(units[0]);
  const [to, setTo] = useState(units[1]);
  const [input, setInput] = useState("1");
  useEffect(() => { setFrom(units[0]); setTo(units[1] || units[0]); }, [units]);

  const raw = parseFloat(input);
  let out = "";
  if (!isNaN(raw)) {
    const c = UC[cat];
    const res = c.special === "temp" ? fromC(toC(raw, from), to) : (raw * c.units[from]) / c.units[to];
    out = parseFloat(res.toPrecision(8)).toLocaleString(undefined, { maximumFractionDigits: 8 });
  }
  return (
    <ToolLayout eyebrow="Free logistics tool" title="Online Unit Converter" desc="Convert common units of measurement instantly. Pick a category, then choose the from and to units.">
      <div className="uc-card p-7 md:p-12 reveal">
        <div className="relative" style={{ zIndex: 1 }}>
          <div className="mb-6 md:max-w-[48%]">
            <select className="tool-select" value={cat} onChange={(e) => setCat(e.target.value)}>{Object.keys(UC).map((c) => <option key={c}>{c}</option>)}</select>
          </div>
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-5 md:gap-7 items-center">
            <div className="space-y-4">
              <select className="tool-select" value={from} onChange={(e) => setFrom(e.target.value)}>{units.map((u) => <option key={u}>{u}</option>)}</select>
              <input className="tool-input" inputMode="decimal" value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <div className="text-center select-none" style={{ fontSize: 34, fontWeight: 800, color: "var(--navy)" }}>=</div>
            <div className="space-y-4">
              <select className="tool-select" value={to} onChange={(e) => setTo(e.target.value)}>{units.map((u) => <option key={u}>{u}</option>)}</select>
              <input className="tool-input" readOnly value={out} style={{ background: "#F4F6FB" }} />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button type="button" onClick={() => { setFrom(to); setTo(from); }} className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--navy)] border border-[var(--navy)]/15 rounded-lg px-4 py-2 hover:bg-[var(--navy)]/5 transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4" /></svg>Swap units
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
