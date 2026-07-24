"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/site";

const DROPDOWNS: Record<string, { label: string; href: string; desc: string; icon: string }[]> = {
  Shipper: [
    { label: "Overview",         href: "/shipper",              desc: "Everything shippers need to run drayage",    icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
    { label: "Get a Quote",      href: "/estimates",            desc: "Instant drayage rate estimate by route",     icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
    { label: "Track Shipment",   href: "/shipper#tracking",     desc: "Real-time GPS visibility gate to gate",      icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" },
    { label: "Port Scheduling",  href: "/shipper#scheduling",   desc: "Book port appointments automatically",       icon: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
    { label: "Documents",        href: "/shipper#docs",         desc: "BOL, POD and customs paperwork in one place",icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" },
  ],
  Carrier: [
    { label: "Overview",         href: "/carriers",             desc: "Find loads, earn more, get paid fast",       icon: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" },
    { label: "Find Loads",       href: "/load-board",           desc: "Live load board updated every 60 seconds",   icon: "M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" },
    { label: "Earnings",         href: "/carriers#earnings",    desc: "DrayPay settles within 24 hours of POD",     icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
    { label: "Requirements",     href: "/carriers#requirements",desc: "Insurance, MC number and onboarding steps",  icon: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" },
    { label: "Jobs Map",         href: "/jobs-map",             desc: "View open loads plotted on a live US map",   icon: "M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" },
  ],
  Broker: [
    { label: "Overview",         href: "/broker",               desc: "Full drayage TMS for freight brokers",       icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
    { label: "Load Board",       href: "/load-board",           desc: "Post and manage loads across the network",   icon: "M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" },
    { label: "Carrier Network",  href: "/broker#carriers",      desc: "8,000+ vetted drayage carriers ready now",   icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
    { label: "Rate Engine",      href: "/broker#rates",         desc: "Instant bids with auto-award and counter",   icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
    { label: "Reports",          href: "/broker#reports",       desc: "Revenue, on-time and carrier scorecards",    icon: "M18 20V10M12 20V4M6 20v-6" },
  ],
};

const DROPDOWN_COLORS: Record<string, string> = {
  Shipper: "#fc0b05",
  Carrier: "#27b30a",
  Broker:  "#00a5e7",
};

const SIMPLE_LINKS = [
  { label: "How it Works", href: "/how-it-works" },
  { label: "About",        href: "/about" },
  { label: "Contact",      href: "/contact", highlight: true },
];

const linkCls = "text-[13px] font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap outline-none focus:outline-none focus-visible:outline-none active:outline-none";

function DropdownMenu({ label, items, color }: { label: string; items: typeof DROPDOWNS[string]; color: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} style={{ position: "relative" }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(o => !o)}
        className={linkCls}
        style={{ padding: "6px 12px", display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer" }}
      >
        {label}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.6 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
          width: 280, background: "#0b1a2e", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 14, padding: 8, boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
          zIndex: 100,
        }}>
          {/* Top accent line */}
          <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, borderRadius: 2, marginBottom: 8 }} />

          {items.map(item => (
            <Link key={item.href} href={item.href}
              onClick={() => setOpen(false)}
              style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 10, textDecoration: "none", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "transparent"}
            >
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginTop: 2, lineHeight: 1.4 }}>{item.desc}</div>
              </div>
            </Link>
          ))}

          {/* Bottom CTA */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: 6, paddingTop: 8 }}>
            <Link href={items[0].href}
              onClick={() => setOpen(false)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px 12px", borderRadius: 9, background: `${color}18`, border: `1px solid ${color}30`, color, fontSize: 12, fontWeight: 700, textDecoration: "none", letterSpacing: "0.02em" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = `${color}28`}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = `${color}18`}
            >
              View {label} Platform
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Nav({ logoSrc }: { logoSrc?: string } = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const isBroker = pathname === "/broker" || pathname === "/broker/";
  const isCarriers = pathname === "/carriers" || pathname === "/carriers/";
  const isDriverApp = pathname === "/driver-app" || pathname === "/driver-app/";
  const accentColor = isDriverApp ? "#C8FF45" : isBroker ? "#00a5e7" : isCarriers ? "#27b30a" : "#fc0b05";
  const accentText = isDriverApp ? "#0a0e07" : "#fff";
  const headerBg = isDriverApp ? "#0a0e07" : "#08192b";

  return (
    <>
    <header className="sticky top-0 z-40" style={{ background: headerBg }}>
      {/* Top bar */}
      <div style={{ overflow: "hidden", height: 32 }}>
        <div className="text-[11px] font-medium" style={{ background: accentColor, color: accentText, height: 32, transition: "background 0.3s" }}>
          <div className="max-w-[1400px] mx-auto px-6 h-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: accentText, display: "inline-block", boxShadow: "0 0 0 2px rgba(255,255,255,0.4)", animation: "pulse 2s infinite" }} />
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
              <a href="/load-board" style={{ color: accentText, opacity: 0.9, textDecoration: "none" }}>Load Board →</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1400px] mx-auto" style={{ height: 64, paddingLeft: 24, paddingRight: 24, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src={logoSrc ?? asset("/logo-draygo.png")} alt="DrayGo" className="h-7 md:h-8 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0 text-[13px]">
            <Link href="/"             className={linkCls} style={{ padding: "6px 12px" }}>Home</Link>
            <Link href="/driver-app"   className={linkCls} style={{ padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: 6 }}>
              Driver App
              <span style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: "0.08em", color: "#0a0e07", background: "#C8FF45", borderRadius: 5, padding: "2px 5px", lineHeight: 1 }}>NEW</span>
            </Link>
            <Link href="/shipper"      className={linkCls} style={{ padding: "6px 12px" }}>Shipper</Link>
            <Link href="/carriers"     className={linkCls} style={{ padding: "6px 12px" }}>Carrier</Link>
            <Link href="/broker"       className={linkCls} style={{ padding: "6px 12px" }}>Broker</Link>
            <Link href="/how-it-works" className={linkCls} style={{ padding: "6px 12px" }}>How it Works</Link>
            <Link href="/about"        className={linkCls} style={{ padding: "6px 12px" }}>About</Link>
            <Link href="/contact"
              className="text-[13px] font-semibold whitespace-nowrap outline-none focus:outline-none relative"
              style={{ padding: "6px 12px", color: isDriverApp ? "#C8FF45" : "#fc0b05", animation: "navContactPulse 2.8s ease-in-out infinite" }}>
              Contact
              <span className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full" style={{ background: isDriverApp ? "#C8FF45" : "#fc0b05", animation: "navUnderline 2.8s ease-in-out infinite" }} />
            </Link>
          </nav>

          <style>{`
            @keyframes navContactPulse { 0%,100%{opacity:1;text-shadow:none} 50%{opacity:0.7;text-shadow:0 0 12px currentColor} }
            @keyframes navUnderline { 0%,100%{transform:scaleX(1);opacity:0.6} 50%{transform:scaleX(0.4);opacity:1} }
          `}</style>

          {/* Right actions */}
          <div className="flex items-center gap-2 justify-end">
            <Link href="/book-meeting"
              className="hidden md:inline-flex text-[13px] font-semibold text-white items-center gap-[6px] rounded-lg transition whitespace-nowrap outline-none focus:outline-none"
              style={{ border: "1px solid rgba(255,255,255,0.28)", padding: "7px 14px", background: "rgba(255,255,255,0.04)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.12)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)"; }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Book Meeting
            </Link>
            <Link href="/#login" className="hidden sm:inline text-[13px] font-semibold text-white/90 hover:text-white transition whitespace-nowrap outline-none focus:outline-none" style={{ padding: "6px 12px" }}>
              Sign in
            </Link>
            <Link href="/#load-board"
              className="hidden sm:inline-flex text-[13px] font-semibold text-white rounded-lg items-center gap-[6px] transition hover:opacity-90 whitespace-nowrap outline-none focus:outline-none"
              style={{ background: accentColor, color: accentText, padding: "8px 16px", transition: "background 0.22s ease" }}>
              Get Started
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <button className="lg:hidden p-2 text-white/80 hover:text-white" onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu">
              {mobileOpen
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-3" style={{ background: headerBg }}>
            <Link href="/"         className="block py-2.5 px-3 text-[14px] text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/driver-app" className="block py-2.5 px-3 text-[14px] text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>
              Driver App <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", color: "#0a0e07", background: "#C8FF45", borderRadius: 5, padding: "2px 5px", marginLeft: 6, verticalAlign: "middle" }}>NEW</span>
            </Link>
            <Link href="/shipper"  className="block py-2.5 px-3 text-[14px] text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>Shipper</Link>
            <Link href="/carriers" className="block py-2.5 px-3 text-[14px] text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>Carrier</Link>
            <Link href="/broker"   className="block py-2.5 px-3 text-[14px] text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>Broker</Link>

            <Link href="/how-it-works" className="block py-2.5 px-3 text-[14px] text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>How it Works</Link>
            <Link href="/about"        className="block py-2.5 px-3 text-[14px] text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>About</Link>
            <Link href="/contact"      className="block py-2.5 px-3 text-[14px] text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>Contact</Link>

            <div className="pt-3">
              <Link href="/book-meeting" className="block text-center py-3 rounded-lg text-[14px] font-semibold text-white mb-2" style={{ border: "1px solid rgba(255,255,255,0.28)" }} onClick={() => setMobileOpen(false)}>
                Book Meeting
              </Link>
              <Link href="/#load-board" className="block text-center py-3 rounded-lg text-[14px] font-semibold text-white" style={{ background: accentColor, color: accentText }} onClick={() => setMobileOpen(false)}>
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
