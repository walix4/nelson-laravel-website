import React from "react";

// Driver-app style hero stats strip (glass, sits at the end of the hero).
const STATS: [string, string][] = [
  ["24h", "DrayPay Payout After POD"],
  ["$8,820", "Top-Driver Weekly Earnings"],
  ["40+", "Ports & Rail Terminals"],
  ["0", "Paperwork. Digital POD & BOL"],
];

export default function HeroStatBand({ accent = "#C8FF45" }: { accent?: string }) {
  return (
    <section style={{
      borderTop: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(0,0,0,0.45)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      position: "relative",
      zIndex: 3,
    }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4" style={{ padding: "0 clamp(24px,4vw,56px)" }}>
        {STATS.map(([n, l], i) => (
          <div key={l} className={`reveal reveal-delay-${i % 4}`} style={{
            padding: "34px 20px",
            textAlign: "center",
            borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.12)" : "none",
          }}>
            <div style={{ fontSize: "clamp(28px,2.8vw,40px)", fontWeight: 900, color: accent, letterSpacing: "-0.02em", textShadow: `0 0 30px ${accent}40` }}>{n}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)", marginTop: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
