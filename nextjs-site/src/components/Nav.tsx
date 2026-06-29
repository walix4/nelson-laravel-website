"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/site";

const NAV_LINKS = [
  { label: "Shipper", href: "/shipper" },
  { label: "Carrier", href: "/carriers" },
  { label: "Broker", href: "/broker" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
];

const SERVICES_ITEMS = [
  {
    label: "Toll Calculator",
    href: "/#quote",
    desc: "Instant drayage toll & rate estimates by route",
    icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  },
  {
    label: "Rate Map",
    href: "/rate-map",
    desc: "US drayage rate zones & port corridor pricing",
    icon: '<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
  },
  {
    label: "Container Tools",
    href: "/tools",
    desc: "Demurrage, FSC, weight converter & more",
    icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>',
  },
  {
    label: "All Services",
    href: "/services",
    desc: "Full suite of DrayGo platform features",
    icon: '<circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/>',
  },
];

const linkCls = "text-[13px] font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap outline-none focus:outline-none focus-visible:outline-none active:outline-none";

export default function Nav({ logoSrc }: { logoSrc?: string } = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const showBar = true;
  const isBroker = pathname === "/broker" || pathname === "/broker/";
  const isCarriers = pathname === "/carriers" || pathname === "/carriers/";
  const accentColor = isBroker ? "#00a5e7" : isCarriers ? "#27b30a" : "#fc0b05";

  return (
    <>
    <header className="sticky top-0 z-40" style={{ background: "#08192b" }}>
      <div style={{ overflow: "hidden", transition: "height 0.22s ease", height: showBar ? 32 : 0 }}>
        <div className="text-[11px] font-medium" style={{ background: accentColor, color: "#fff", height: 32 }}>
          <div className="max-w-[1400px] mx-auto px-6 h-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "inline-block", boxShadow: "0 0 0 2px rgba(255,255,255,0.4)", animation: "pulse 2s infinite" }} />
                <span>Network <b>LIVE</b></span>
              </span>
              <span className="hidden sm:inline" style={{ opacity: 0.6 }}>·</span>
              <span className="hidden sm:inline"><b>12,431</b> active routes</span>
              <span className="hidden md:inline" style={{ opacity: 0.6 }}>·</span>
              <span className="hidden md:inline">Diesel <b>$3.82</b>/gal · FSC <b>17%</b></span>
              <span className="hidden lg:inline" style={{ opacity: 0.6 }}>·</span>
              <span className="hidden lg:inline">Port congestion <b>Low</b></span>
            </div>
            <div className="flex items-center gap-4" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em" }}>
              <span style={{ opacity: 0.7 }}>v2026.07</span>
              <a href="/load-board" style={{ color: "#fff", opacity: 0.9, textDecoration: "none" }}>Load Board →</a>
            </div>
          </div>
        </div>
      </div>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="max-w-[1400px] mx-auto" style={{ height: 64, paddingLeft: 24, paddingRight: 24, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>

        {/* Logo — left col */}
        <Link href="/" className="flex items-center">
          <img src={logoSrc ?? asset("/logo-draygo.png")} alt="DrayGo" className="h-9 md:h-10 w-auto" />
        </Link>

        {/* Desktop nav links — always centered col */}
        <nav className="hidden lg:flex items-center gap-0 text-[13px]">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className={linkCls} style={{ padding: "6px 12px" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions — right col */}
        <div className="flex items-center gap-2 justify-end">
          <Link href="/#login" className="hidden sm:inline text-[13px] font-semibold text-white/90 hover:text-white transition whitespace-nowrap outline-none focus:outline-none focus-visible:outline-none" style={{ padding: "6px 12px" }}>
            Sign in
          </Link>
          <Link
            href="/#load-board"
            className="hidden sm:inline-flex text-[13px] font-semibold text-white rounded-lg items-center gap-[6px] transition hover:opacity-90 whitespace-nowrap outline-none focus:outline-none focus-visible:outline-none"
            style={{ background: accentColor, padding: "8px 16px", transition: "background 0.22s ease" }}
          >
            Get Started
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 px-6 py-4 space-y-1" style={{ background: "#08192b" }}>
          <div className="border-t border-white/10 pt-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="block py-2.5 px-3 text-[14px] text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="pt-3">
            <Link href="/#load-board" className="block text-center py-3 rounded-lg text-[14px] font-semibold text-white" style={{ background: "#fc0b05" }} onClick={() => setMobileOpen(false)}>
              Get Started →
            </Link>
          </div>
        </div>
      )}
      </div>
    </header>
    </>
  );
}
