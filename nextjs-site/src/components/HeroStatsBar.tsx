import React from "react";

const STATS = [
  { value: "$2.4B+",  label: "Drayage Moved",     star: false },
  { value: "12,431",  label: "Active Routes",      star: false },
  { value: "8,000+",  label: "Verified Carriers",  star: false },
  { value: "4.8",     label: "App Store Rating",   star: true  },
];

export default function HeroStatsBar() {
  return (
    <div style={{ padding: "40px clamp(16px,4vw,48px) 0" }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        background: "#16181d",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
      }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            padding: "36px 32px",
            borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
          }}>
            <div style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: 8 }}>
              {s.star && <span style={{ fontSize: "clamp(22px,2.5vw,36px)" }}>⭐</span>}
              {s.value}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", marginTop: 10, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
