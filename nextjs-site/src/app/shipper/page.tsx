"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { asset } from "@/lib/site";

const LINES = [
  { text: "Port to Door in 30 Seconds.", color: "#fc0b05" },
  { text: "Live Diesel Rates. Always Fresh.", color: "#38BDF8" },
  { text: "Locked for 24 Hours.", color: "#4ADE80" },
];

const STEPS = [
  { n: "01", title: "Choose your port", desc: "Select from 50+ U.S. and Canadian container ports — West Coast, Gulf, East Coast, and every Class I rail ramp." },
  { n: "02", title: "Set destination", desc: "Enter the delivery address. Door, warehouse, or ramp — 1,200+ inland cities covered." },
  { n: "03", title: "Calculate rate", desc: "Get a fully itemised all-in price in under 30 seconds. Live diesel, FSC, chassis, and port fees baked in." },
  { n: "04", title: "Export or book", desc: "Download as branded PDF, copy as JSON, or hand off to a carrier directly from the platform." },
];

const FEATURES = [
  { icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", title: "Instant Quotes", desc: "Get a fully itemised drayage rate in under 30 seconds. No phone calls, no waiting for a callback.", color: "#fc0b05" },
  { icon: "M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", title: "50+ Ports Covered", desc: "Every major U.S. and Canadian container port. West Coast, East Coast, Gulf, and all Class I rail ramps.", color: "#3A5FC0" },
  { icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3", title: "Locked Rates", desc: "Every quote is locked for 24 hours. Diesel spikes or chassis fee changes after lock do not affect your quote.", color: "#4ADE80" },
  { icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", title: "Digital BOL", desc: "Paperless bill of lading generation, e-signatures, and cloud document storage. Your freight records, always accessible.", color: "#fc0b05" },
  { icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", title: "Full Transparency", desc: "No hidden FSCs. No surprise accessorials. Six cost components — each priced from live market data — visible before you confirm.", color: "#3A5FC0" },
  { icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", title: "Live Rate API", desc: "Integrate DrayageRate into your TMS or ERP. REST/JSON, 120ms avg response, sandbox credentials included.", color: "#38BDF8" },
];

const TESTIMONIALS = [
  { name: "Sara Cho", role: "Import Manager · Pacific Rim Logistics", text: "DrayageRate replaced three different carrier spreadsheets we had. Now the import team runs a quote in 30 seconds and the rate holds through delivery. Enormous time saver.", stars: 5 },
  { name: "Dave Mehta", role: "Director of Ops · TriCoast 3PL", text: "The itemised breakdown — base rate, FSC, chassis, port THC — all in one place was the thing that finally convinced our CFO. No more surprise accessorials at billing.", stars: 5 },
  { name: "Lisa Tran", role: "Ocean Freight Coordinator · Apex Forwarding", text: "We handle 200+ drayage moves a month. Being able to lock a quote for 24 hours and export it directly as a PDF to our clients cut our quoting time by 70%.", stars: 5 },
];

const FAQS = [
  { q: "How accurate are the rates?", a: "Rates are calculated from live diesel (DOE index), carrier-declared CPM, and real chassis pool fee schedules. The typical variance against actual carrier invoices is under 2%." },
  { q: "Can I export quotes to my TMS?", a: "Yes. Every quote is available as a structured JSON response via the rate API, or as a branded PDF download. Most TMS systems can ingest either format." },
  { q: "What if the carrier charges more than the quote?", a: "Quotes locked for 24 hours are guaranteed by the carrier. We track variance reports — carriers with consistent over-billing are removed from the network." },
  { q: "Do you support LTL drayage as well?", a: "Currently DrayageRate covers full-container drayage (FCL) — 20', 40', 40'HC, reefer, and open top. LTL and break-bulk drayage is on our roadmap." },
  { q: "Is there a free tier?", a: "Yes. Web quotes, PDF export, and access to all 50+ ports are free forever. The API and advanced analytics require a Pro or Enterprise plan." },
];

export default function ShipperPage() {
  const [lineIdx, setLineIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setLineIdx(i => (i + 1) % LINES.length);
        setAnimating(false);
      }, 400);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: 600 }}>
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src={asset("/hero-cargo.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(1,7,26,0.88) 0%,rgba(1,7,26,0.60) 40%,rgba(1,7,26,0.92) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 520px at 10% 60%,rgba(255,59,48,0.18),transparent 60%)" }} />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 py-28 md:py-40 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold mb-6" style={{ background: "rgba(255,59,48,0.15)", border: "1px solid rgba(255,59,48,0.4)" }}>
            For Shippers
          </div>
          <h1 className="display text-white text-[44px] md:text-[68px] leading-[1.02]">Quote Every Shipment,</h1>
          <div className="overflow-hidden mt-2" style={{ height: "1.15em" }}>
            <span
              key={lineIdx}
              className="block display text-[44px] md:text-[68px] leading-[1.15]"
              style={{
                color: LINES[lineIdx].color,
                animation: animating ? "heroLineOut 0.35s ease-in forwards" : "heroLineIn 0.45s cubic-bezier(0.2,0.7,0.2,1) forwards",
              }}
            >
              {LINES[lineIdx].text}
            </span>
          </div>
          <p className="mt-8 text-white/70 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">Drayage rates that are live, itemised, and locked — so you can quote customers with confidence and book without surprises.</p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/#quote" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold"><span className="label">Get a free quote</span></Link>
            <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white transition" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>See all services</Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="relative z-10 py-10" style={{ background: "#06143A", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[["50+", "Ports Covered"], ["2,800+", "Verified Carriers"], ["$2.4B+", "Rates Processed"], ["30s", "Avg Quote Time"]].map(([v, l]) => (
              <div key={l}>
                <div className="display text-[32px] md:text-[38px] text-white num leading-none">{v}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/45 mt-2">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#08192b" }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: "radial-gradient(800px 400px at 85% 20%,rgba(255,59,48,0.2),transparent 60%)" }} />
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto reveal mb-16">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>How it works</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Four steps to a locked quote.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`rounded-2xl p-7 reveal reveal-d${i}`} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-[11px] font-bold mb-4 tracking-wider" style={{ color: "#fc0b05" }}>{s.n}</div>
                <h3 className="display text-[18px] text-white mb-3">{s.title}</h3>
                <p className="text-[13px] text-white/55 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#060d1a" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto reveal mb-14">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>Everything shippers need</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Built for how you move freight.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`rounded-2xl p-7 reveal reveal-d${i % 3}`} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: `${f.color}22` }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: f.icon }} />
                </div>
                <h3 className="display text-[17px] text-white mb-2">{f.title}</h3>
                <p className="text-[13px] text-white/55 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#08192b" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center reveal mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>What shippers say</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Trusted by import &amp; export teams.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`rounded-2xl p-7 flex flex-col gap-4 reveal reveal-d${i}`} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex gap-0.5">{Array.from({ length: t.stars }).map((_, j) => <svg key={j} width="15" height="15" viewBox="0 0 24 24" fill="#fc0b05" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}</div>
                <p className="text-[14px] text-white/65 leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="text-[14px] font-semibold text-white">{t.name}</div>
                  <div className="text-[12px] text-white/40 mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#060d1a" }}>
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center reveal mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>FAQ</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Questions answered.</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="reveal" style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
                  style={{ background: openFaq === i ? "rgba(255,59,48,0.08)" : "rgba(255,255,255,0.03)" }}
                >
                  <span className="display text-[15px] text-white pr-4">{faq.q}</span>
                  <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white/60 transition-transform" style={{ background: "rgba(255,255,255,0.08)", transform: openFaq === i ? "rotate(45deg)" : "none" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5" style={{ background: "rgba(255,59,48,0.04)" }}>
                    <p className="text-[14px] text-white/65 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 60%,#1E3C82 100%)" }}>
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: "radial-gradient(700px 400px at 85% 50%,rgba(255,59,48,0.25),transparent 60%)" }} />
        <div className="max-w-[800px] mx-auto px-6 text-center reveal relative">
          <h2 className="display text-white text-[40px] md:text-[54px] leading-[1.03]">Start quoting for free. No credit card needed.</h2>
          <p className="text-white/65 mt-4 text-[15px]">All 50+ ports. Full item breakdown. PDF export. Free forever.</p>
          <Link href="/#quote" className="btn-primary inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-xl text-[15px] font-semibold"><span className="label">Run my first quote</span></Link>
          <div className="mt-5 flex items-center justify-center gap-6 text-[12px] text-white/40">
            <span>✓ No setup fees</span>
            <span>✓ Live data always</span>
            <span>✓ Export to PDF</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
