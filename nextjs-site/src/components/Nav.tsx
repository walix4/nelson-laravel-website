"use client";
import Link from "next/link";
import { useState } from "react";
import { asset } from "@/lib/site";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shippers", href: "/shipper" },
  { label: "Broker", href: "/broker" },
  { label: "Carriers", href: "/carriers" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About Us", href: "/about" },
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

const linkCls = "px-3 py-1.5 text-[13px] font-medium text-white/80 hover:text-white transition-colors";

export default function Nav() {
  const [svcOpen, setSvcOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b" style={{ background: "#08192b", borderColor: "rgba(255,255,255,0.12)" }}>
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img src={asset("/logo-draygo.png")} alt="DrayGo" className="h-10 md:h-11 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 text-[13px]">
          <Link
            href="/load-board"
            className="px-4 py-1.5 rounded-lg text-[13px] font-semibold text-white border border-white/25 hover:bg-white/10 transition"
          >
            Load Board
          </Link>
          <Link href="/" className={linkCls}>Home</Link>
          <Link href="/shipper" className={linkCls}>Shippers</Link>
          <Link href="/broker" className={linkCls}>Broker</Link>
          <Link href="/carriers" className={linkCls}>Carriers</Link>
          <Link href="/#pricing" className={linkCls}>Pricing</Link>
          <Link href="/about" className={linkCls}>About Us</Link>

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSvcOpen(true)}
            onMouseLeave={() => setSvcOpen(false)}
          >
            <button
              className={`${linkCls} flex items-center gap-1.5`}
              onClick={() => setSvcOpen((o) => !o)}
            >
              Services
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: svcOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.18s" }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {svcOpen && (
              <div className="absolute top-full left-0 mt-2 rounded-xl shadow-2xl bg-white border border-black/8 py-3 w-72" style={{ zIndex: 50 }}>
                {SERVICES_ITEMS.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="flex items-center gap-3.5 px-5 py-3 hover:bg-gray-50 transition"
                    onClick={() => setSvcOpen(false)}
                  >
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(252,11,5,0.10)" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.icon }} />
                    </span>
                    <span>
                      <div className="text-[13.5px] font-semibold text-[#08192b]">{s.label}</div>
                      <div className="text-[11.5px] text-[#64748b] leading-snug">{s.desc}</div>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/#login" className="hidden sm:inline text-[13px] font-semibold text-white/90 hover:text-white px-3 py-1.5 transition">
            Sign in
          </Link>
          <Link
            href="/#load-board"
            className="text-[13px] font-semibold text-white px-4 py-2 rounded-lg inline-flex items-center gap-1.5 transition hover:opacity-90"
            style={{ background: "#fc0b05" }}
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
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="block py-2.5 px-3 text-[14px] text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="pt-1 border-t border-white/10">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2 pt-2">Services</div>
            {SERVICES_ITEMS.map((s) => (
              <Link key={s.label} href={s.href} className="block py-2 px-3 text-[14px] text-white/75 hover:text-white" onClick={() => setMobileOpen(false)}>
                {s.label}
              </Link>
            ))}
          </div>
          <div className="pt-3">
            <Link href="/load-board" className="block text-center py-3 rounded-lg text-[14px] font-semibold text-white" style={{ background: "#fc0b05" }} onClick={() => setMobileOpen(false)}>
              Get Started →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
