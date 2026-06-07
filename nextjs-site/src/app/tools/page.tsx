"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { TOOLS } from "@/lib/site";

export default function Page() {
  return (
    <>
      <Nav />
      <RevealInit />
      <section className="relative overflow-hidden py-20" style={{ background: "linear-gradient(135deg,#0B2D5C,#061A38 60%,#15448C)" }}>
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: "radial-gradient(700px 360px at 85% 0%,rgba(0,162,231,0.22),transparent 60%),radial-gradient(600px 360px at 10% 100%,rgba(58,95,192,0.3),transparent 60%)" }} />
        <div className="max-w-[1100px] mx-auto px-6 relative text-center">
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-white/70">Free trucking tools</div>
          <h1 className="display text-white text-[40px] md:text-[58px] leading-[1.03] mt-3">Everything you need to<br />price a truck route</h1>
          <p className="text-white/75 text-[16px] mt-5 max-w-xl mx-auto">A full toolkit for the road — calculate tolls, distance and transit time, axle classes, fuel surcharge and emissions, all in one place.</p>
        </div>
      </section>
      <section className="py-16 -mt-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map((t, i) => (
              <Link key={t.n} href={t.href} className={`reveal reveal-d${i % 3} group bg-white rounded-2xl p-7 border border-[var(--navy)]/8 hover:-translate-y-1.5 transition`}>
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-white" style={{ background: t.g }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: t.i }} />
                </span>
                <h3 className="display text-[20px] text-[var(--navy)] mt-5">{t.n}</h3>
                <p className="text-[14px] text-[var(--muted)] mt-2 leading-relaxed">{t.d}</p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-[13.5px] font-semibold text-[var(--red)]">Open tool <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
