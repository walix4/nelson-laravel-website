"use client";
import ToolLayout from "@/components/ToolLayout";
import UnitConverter from "@/components/UnitConverter";

export default function Page() {
  return (
    <ToolLayout eyebrow="Free logistics tool" title="Weight & Unit Converter" desc="Convert weight, distance and dimensions instantly. Pick a category, then choose the from and to units.">
      <div className="reveal"><UnitConverter initial="Length" /></div>
    </ToolLayout>
  );
}
