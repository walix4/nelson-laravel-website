"use client";
import ToolLayout from "@/components/ToolLayout";
import UnitConverter from "@/components/UnitConverter";

export default function Page() {
  return (
    <ToolLayout eyebrow="Free payments tool" title="Unit Converter" desc="Convert common units of measurement instantly. Pick a category, then choose the from and to units.">
      <div className="reveal"><UnitConverter initial="Length" /></div>
    </ToolLayout>
  );
}
