"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { asset } from "@/lib/site";

const LINES = [
  { text: "Match in Minutes. Not Hours.", color: "#00a5e7" },
  { text: "Live Carrier Network.", color: "#4ADE80" },
  { text: "Settle in 24 Hours.", color: "#38BDF8" },
];

const STEPS = [
  { n: "01", title: "Post the load", desc: "Enter origin port, destination, container type, and weight. Takes under 60 seconds." },
  { n: "02", title: "Get matched", desc: "The live carrier network surfaces available capacity near the terminal in real time." },
  { n: "03", title: "Lock the rate", desc: "Rate is locked for 24 hours. No callbacks, no re-quoting, no surprises at billing." },
  { n: "04", title: "Track & settle", desc: "Container moves are tracked from gate-out to delivery. Settlement is processed within 24 hours of POD." },
];

const FEATURES = [
  { icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3", title: "1,800+ Vetted Carriers", desc: "Every carrier is MC/DOT verified, insured, and rated by real brokers. No unvetted trucks on your loads.", color: "#00a5e7" },
  { icon: "M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", title: "Lane Intelligence", desc: "See historical rate trends, lane density, and carrier reliability scores before you commit to a load.", color: "#3A5FC0" },
  { icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", title: "Instant Rate Locks", desc: "Quotes lock for 24 hours. The rate you show your shipper is the rate you pay the carrier — no margin erosion.", color: "#00a5e7" },
  { icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", title: "Margin Analytics", desc: "See your margin per load, per lane, per carrier — live. Know where you make money before you cover the load.", color: "#3A5FC0" },
  { icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", title: "Digital Documentation", desc: "BOL, POD, and carrier rate confirmation all digital. Stored, searchable, and shareable from the platform.", color: "#00a5e7" },
  { icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", title: "24h Settlement", desc: "Carrier payments processed within 24 hours of POD. Keep your carrier relationships — and your network — strong.", color: "#3A5FC0" },
];

const TESTIMONIALS = [
  { name: "Marcus Webb", role: "Freight Broker · Webb Logistics Group", text: "Before DrayageRate I was calling three carriers to get a competitive rate. Now I post the load and get matched in under two minutes. The lane intelligence feature alone is worth it.", stars: 5 },
  { name: "Angela Kim", role: "Operations Lead · Blue Ridge Transport", text: "The margin analytics dashboard changed how we price drayage. We can now see which lanes are worth covering and which ones we should pass on. Revenue is up 18% since we started.", stars: 5 },
  { name: "Tyler Okonkwo", role: "Broker Owner · Coastal Freight Solutions", text: "The 24-hour rate lock is a game changer. I can quote a shipper confidently and know my cost won't change. No more last-minute carrier negotiations killing my margins.", stars: 5 },
];

const FAQS = [
  { q: "How quickly can I cover a drayage load?", a: "Most loads are covered in under 5 minutes. Post the load, match with a carrier from the live network, confirm the rate — done. No phone calls required." },
  { q: "How is carrier quality maintained?", a: "All carriers are MC/DOT verified before onboarding. They are rated on every completed load by brokers and shippers. Carriers below a 4.2 rating are reviewed and may be removed." },
  { q: "What does the 24-hour rate lock mean for brokers?", a: "The rate you lock for a shipper is guaranteed for 24 hours regardless of diesel or chassis fee movements. Your quoted margin is protected from the moment you confirm." },
  { q: "Can I set my own markup on quotes?", a: "Yes. Pro and Enterprise plans support custom markup layers applied automatically before any quote is shown to your shippers. Your rates, your margins, your brand." },
  { q: "How does settlement work?", a: "Carrier settlement is initiated within 24 hours of POD confirmation. Funds are transferred via ACH. A full audit trail is available in your settlement dashboard." },
];

export default function BrokerPage() {
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
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 520px at 10% 60%,rgba(0,165,231,0.16),transparent 60%)" }} />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 py-28 md:py-40 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold mb-6" style={{ background: "rgba(0,165,231,0.15)", border: "1px solid rgba(0,165,231,0.4)" }}>
            For Freight Brokers
          </div>
          <h1 className="display text-white text-[44px] md:text-[68px] leading-[1.02]">Cover Every Lane,</h1>
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
          <p className="mt-8 text-white/70 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">Live carrier network, instant rate locks, and lane intelligence — everything you need to cover drayage with confidence and protect your margins.</p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/#quote" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white transition" style={{ background: "#00a5e7" }}>
              Post a load free <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white transition" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>See all services</Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="py-10" style={{ background: "#06143A", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[["1,800+", "Vetted Carriers"], ["2 min", "Avg Time to Cover"], ["24h", "Rate Lock Window"], ["24h", "Carrier Settlement"]].map(([v, l]) => (
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
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto reveal mb-16">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#00a5e7" }}>How it works</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Post to paid in four steps.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`rounded-2xl p-7 reveal reveal-d${i}`} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-[11px] font-bold mb-4 tracking-wider" style={{ color: "#00a5e7" }}>{s.n}</div>
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
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#00a5e7" }}>Everything brokers need</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Your complete drayage toolkit.</h2>
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
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#00a5e7" }}>What brokers say</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Built by brokers. Loved by brokers.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`rounded-2xl p-7 flex flex-col gap-4 reveal reveal-d${i}`} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex gap-0.5">{Array.from({ length: t.stars }).map((_, j) => <svg key={j} width="15" height="15" viewBox="0 0 24 24" fill="#00a5e7" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}</div>
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
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#00a5e7" }}>FAQ</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Broker questions, answered.</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="reveal" style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
                  style={{ background: openFaq === i ? "rgba(0,165,231,0.08)" : "rgba(255,255,255,0.03)" }}
                >
                  <span className="display text-[15px] text-white pr-4">{faq.q}</span>
                  <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white/60 transition-transform" style={{ background: "rgba(255,255,255,0.08)", transform: openFaq === i ? "rotate(45deg)" : "none" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5" style={{ background: "rgba(0,165,231,0.04)" }}>
                    <p className="text-[14px] text-white/65 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 60%,#0a2a4a 100%)" }}>
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: "radial-gradient(700px 400px at 85% 50%,rgba(0,165,231,0.25),transparent 60%)" }} />
        <div className="max-w-[800px] mx-auto px-6 text-center reveal relative">
          <h2 className="display text-white text-[40px] md:text-[54px] leading-[1.03]">Build your brokerage on DrayageRate.</h2>
          <p className="text-white/65 mt-4 text-[15px]">No setup fees. Live carrier network from day one. Cancel anytime.</p>
          <Link href="/#quote" className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white transition" style={{ background: "#00a5e7" }}>
            Post a load free <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
          <div className="mt-5 flex items-center justify-center gap-6 text-[12px] text-white/40">
            <span>✓ No setup fees</span>
            <span>✓ Live carrier network</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
