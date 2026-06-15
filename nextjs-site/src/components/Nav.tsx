"use client";
import Link from "next/link";
import { useState } from "react";
import { TOOLS, asset } from "@/lib/site";

const SERVICES = [
  { label: "Shippers", href: "/shipper", desc: "Instant drayage quotes & load board access" },
  { label: "Brokers", href: "/broker", desc: "Carrier network & freight matching tools" },
  { label: "Carriers", href: "/carriers", desc: "Find loads, dispatch fast, track earnings" },
  { label: "Services", href: "/services", desc: "Full suite of DrayGo platform features" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b" style={{ background: "#08192b", borderColor: "rgba(255,255,255,0.18)" }}>
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src={asset("/logo-draygo.png")} alt="DrayGo" className="h-10 md:h-11 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-[13px] font-medium text-white/85">
          {/* Tools dropdown */}
          <div className={`mega-wrap ${open ? "open" : ""}`}>
            <button className="hover:text-white inline-flex items-center gap-1.5" onClick={() => { setOpen((o) => !o); setSvcOpen(false); }}>
              Tools
              <svg className="mega-caret" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            <div className="mega-panel">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-1">
                {TOOLS.map((t) => (
                  <Link key={t.n} href={t.href} className="mega-tool" onClick={() => setOpen(false)}>
                    <span className="mega-ic" style={{ background: t.g }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: t.i }} />
                    </span>
                    <span><h4>{t.n}</h4><p>{t.d}</p></span>
                  </Link>
                ))}
              </div>
              <div className="border-t mt-3 pt-4 flex flex-wrap gap-3" style={{ borderColor: "rgba(11,35,80,0.1)" }}>
                <Link href="/#quote" className="text-[13px] font-semibold px-5 py-2.5 rounded-lg" style={{ color: "var(--blue)", background: "rgba(58,95,192,0.08)" }}>Request a quote</Link>
                <Link href="/tools" className="text-[13px] font-semibold px-5 py-2.5 rounded-lg" style={{ color: "var(--navy)", background: "rgba(11,35,80,0.06)" }}>All tools</Link>
              </div>
            </div>
          </div>

          {/* Services dropdown */}
          <div className={`mega-wrap ${svcOpen ? "open" : ""}`} style={{ position: "relative" }}>
            <button className="hover:text-white inline-flex items-center gap-1.5" onClick={() => { setSvcOpen((o) => !o); setOpen(false); }}>
              Services
              <svg className="mega-caret" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            <div className="mega-panel" style={{ minWidth: 260 }}>
              <div className="flex flex-col gap-1">
                {SERVICES.map((s) => (
                  <Link key={s.label} href={s.href} className="mega-tool" onClick={() => setSvcOpen(false)}>
                    <span className="mega-ic" style={{ background: "rgba(252,11,5,0.12)" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </span>
                    <span><h4>{s.label}</h4><p>{s.desc}</p></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/#how" className="hover:text-white">How it works</Link>
          <Link href="/#features" className="hover:text-white">Platform</Link>
          <Link href="/#pricing" className="hover:text-white">Pricing</Link>
          <Link href="/estimates" className="nav-blink">PortJob</Link>
        </nav>
        <div className="flex items-center gap-2.5">
          <Link href="/#login" className="hidden sm:inline text-[13px] font-semibold text-white/90 hover:text-white px-3 py-1.5">Sign in</Link>
          <Link href="/#load-board" className="btn-primary text-[13px] px-4 py-2 rounded-lg inline-flex items-center gap-1.5"><span className="label">Load Board</span></Link>
        </div>
      </div>
    </header>
  );
}
