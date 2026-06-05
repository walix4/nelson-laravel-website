"use client";
import Link from "next/link";
import { useState } from "react";
import { TOOLS, asset } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b" style={{ background: "#0B2D5C", borderColor: "rgba(255,255,255,0.18)" }}>
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src={asset("/draytoll-logo.png")} alt="DrayToll" className="h-8 md:h-9 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-white/85">
          <div className={`mega-wrap ${open ? "open" : ""}`}>
            <button className="hover:text-white inline-flex items-center gap-1.5" onClick={() => setOpen((o) => !o)}>
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
                <Link href="/#quote" className="text-[13px] font-semibold px-5 py-2.5 rounded-lg" style={{ color: "var(--blue)", background: "rgba(58,95,192,0.08)" }}>Estimate a route</Link>
                <Link href="/tools" className="text-[13px] font-semibold px-5 py-2.5 rounded-lg" style={{ color: "var(--navy)", background: "rgba(11,35,80,0.06)" }}>All tools</Link>
              </div>
            </div>
          </div>
          <Link href="/#quote" className="hover:text-white">Calculator</Link>
          <Link href="/#how" className="hover:text-white">How it works</Link>
          <Link href="/#features" className="hover:text-white">Platform</Link>
          <Link href="/pricing" className="hover:text-white">API pricing</Link>
          <Link href="/estimates" className="nav-blink">Live tolls</Link>
        </nav>
        <div className="flex items-center gap-2.5">
          <Link href="/#login" className="hidden sm:inline text-[13px] font-semibold text-white/90 hover:text-white px-3 py-1.5">Sign in</Link>
          <Link href="/#quote" className="btn-primary text-[13px] px-4 py-2 rounded-lg inline-flex items-center gap-1.5"><span className="label">Get toll estimate</span></Link>
        </div>
      </div>
    </header>
  );
}
