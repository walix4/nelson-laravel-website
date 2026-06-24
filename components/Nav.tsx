"use client";
import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  {
    label: "Blockchain",
    children: [
      { label: "Transactions", href: "/txs" },
      { label: "Blocks", href: "/blocks" },
      { label: "Top Accounts", href: "/accounts" },
    ],
  },
  { label: "Contracts", href: "/contracts" },
  {
    label: "Network",
    children: [
      { label: "DrayChain Mainnet ✓", href: "#" },
      { label: "DrayChain Testnet", href: "#" },
    ],
  },
  { label: "Resources", href: "#" },
];

export default function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{ background: "#060d1a", borderBottom: "1px solid #1e2d45", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 56, gap: 32 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 6,
            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 900, color: "#fff",
          }}>D</div>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
            Dray<span style={{ color: "#3b82f6" }}>Scan</span>
          </span>
          <span style={{ fontSize: 10, background: "rgba(59,130,246,0.18)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.35)", borderRadius: 4, padding: "1px 6px", fontWeight: 700 }}>MAINNET</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <div key={item.label} style={{ position: "relative" }}
              onMouseEnter={() => item.children && setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
            >
              {item.href ? (
                <Link href={item.href} style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "6px 12px", borderRadius: 6, color: "#94a3b8",
                  fontSize: 13, fontWeight: 500, textDecoration: "none",
                  transition: "color 0.15s",
                }}>
                  {item.label}
                </Link>
              ) : (
                <button style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "6px 12px", borderRadius: 6, color: "#94a3b8",
                  fontSize: 13, fontWeight: 500, background: "none", border: "none", cursor: "pointer",
                }}>
                  {item.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              )}
              {item.children && open === item.label && (
                <div style={{
                  position: "absolute", top: "100%", left: 0, marginTop: 4,
                  background: "#0f172a", border: "1px solid #1e2d45", borderRadius: 8,
                  minWidth: 180, padding: "6px 0", boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                  zIndex: 100,
                }}>
                  {item.children.map((c) => (
                    <Link key={c.label} href={c.href} style={{
                      display: "block", padding: "8px 16px", color: "#94a3b8",
                      fontSize: 13, textDecoration: "none", transition: "color 0.1s, background 0.1s",
                    }}
                      onMouseEnter={e => { (e.target as HTMLElement).style.color = "#e2e8f0"; (e.target as HTMLElement).style.background = "#1a2540"; }}
                      onMouseLeave={e => { (e.target as HTMLElement).style.color = "#94a3b8"; (e.target as HTMLElement).style.background = "transparent"; }}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search bar */}
        <div style={{ flex: 1, maxWidth: 360, display: "flex", gap: 8 }}>
          <input className="search-input" placeholder="Search by Address / Tx Hash / Block" style={{ padding: "7px 14px", fontSize: 12 }} />
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          <Link href="#" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none", padding: "6px 12px", border: "1px solid #1e2d45", borderRadius: 6 }}>Sign In</Link>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "#1e2d45", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          </div>
        </div>
      </div>
    </header>
  );
}
