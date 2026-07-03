"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { asset } from "@/lib/site";

const LINES = [
  { text: "Get Paid in 48 Hours.", color: "#27b30a" },
  { text: "No Empty Miles.", color: "#38BDF8" },
  { text: "Loads at Every Port.", color: "#4ADE80" },
];

const STEPS = [
  { n: "01", title: "Create your profile", desc: "Enter your MC/DOT number, operating region, and equipment details. Verification takes under 24 hours." },
  { n: "02", title: "Browse available loads", desc: "See drayage loads near your terminal the moment they are posted. Filter by port, container type, or rate." },
  { n: "03", title: "Accept and haul", desc: "Accept with one tap. Receive the full job packet — terminal name, container number, delivery address — instantly." },
  { n: "04", title: "Submit POD and get paid", desc: "Upload proof of delivery and receive payment within 48 hours via ACH. No 30-60 day wait." },
];

const FEATURES = [
  { icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", title: "Loads Near Your Terminal", desc: "See every available load within your operating radius, sorted by rate and distance from the terminal.", color: "#27b30a" },
  { icon: "M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", title: "Zero Deadhead Miles", desc: "Smart load suggestions route you to the next load near your last delivery point — no empty repositioning.", color: "#3A5FC0" },
  { icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", title: "48h Guaranteed Pay", desc: "Upload your POD and receive ACH payment within 48 hours — not 30, not 60. Every time.", color: "#27b30a" },
  { icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", title: "Digital Dispatch Packet", desc: "BOL, delivery instructions, contact info, and rate confirmation all in one digital packet — no paperwork.", color: "#3A5FC0" },
  { icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3", title: "Compliance Tools", desc: "ELD integration, HOS tracking, and overweight permit lookups. Stay compliant without leaving the platform.", color: "#27b30a" },
  { icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75", title: "All CDL-A Welcome", desc: "Owner-operators, small fleets, and large carriers — any CDL-A truck is welcome on the platform. No minimum fleet size.", color: "#3A5FC0" },
];

const TESTIMONIALS = [
  { name: "Ray Gonzalez", role: "Owner-Operator · DrayHaul LLC", text: "I was waiting 45 days to get paid from my last broker. DrayageRate pays in 48 hours, every time. That alone was worth switching. My cash flow finally makes sense.", stars: 5 },
  { name: "Keisha Monroe", role: "Fleet Manager · Monroe Drayage Co.", text: "The load board shows me everything near Port of Los Angeles sorted by rate. I filled three trucks yesterday without a single phone call. My drivers love it.", stars: 5 },
  { name: "Jose Reyes", role: "CDL-A Driver · Independent", text: "I accept loads from my phone and get the full packet — container number, terminal gate hours, delivery address — instantly. No calling dispatch, no waiting for email. Clean.", stars: 5 },
];

const FAQS = [
  { q: "How fast is the onboarding process?", a: "MC/DOT verification typically takes under 24 hours. Once verified, you can start accepting loads immediately. No paperwork mailed, no in-person meetings required." },
  { q: "What does 48-hour payment actually mean?", a: "Upload your proof of delivery and our system initiates ACH transfer within 48 hours — including weekends. If there is a dispute, our team resolves it within the same window." },
  { q: "Is there a minimum load volume requirement?", a: "No. Owner-operators running one truck are as welcome as carriers running 50. There are no minimums, no exclusivity requirements, and no fees to join." },
  { q: "Do you cover overweight or hazmat loads?", a: "Yes. Overweight loads are flagged with required permits, and carriers with hazmat endorsements can opt in to hazmat loads. All compliance requirements are pre-checked before dispatch." },
  { q: "What if a shipper cancels after I accept?", a: "Cancellations within 2 hours of your gate appointment are compensated with a cancellation fee paid by the shipper. You will never drive to a terminal for nothing." },
];

export default function CarriersPage() {
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
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 520px at 10% 60%,rgba(39,179,10,0.14),transparent 60%)" }} />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 py-28 md:py-40 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold mb-6" style={{ background: "rgba(39,179,10,0.15)", border: "1px solid rgba(39,179,10,0.4)" }}>
            For Carriers &amp; Owner-Operators
          </div>
          <h1 className="display text-white text-[44px] md:text-[68px] leading-[1.02]">Move More. Earn More.</h1>
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
          <p className="mt-8 text-white/70 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">Find drayage loads near your terminal, accept with one tap, and get paid within 48 hours of POD submission. No brokers between you and your rate.</p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/#quote" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white transition" style={{ background: "#27b30a" }}>
              Join the network <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white transition" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>See all services</Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="py-10" style={{ background: "#06143A", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[["50+", "Ports with Loads"], ["48h", "Guaranteed Pay"], ["0", "Setup Fees"], ["All CDL-A", "Welcome"]].map(([v, l]) => (
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
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#27b30a" }}>How it works</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Onboard to first load in four steps.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`rounded-2xl p-7 reveal reveal-d${i}`} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-[11px] font-bold mb-4 tracking-wider" style={{ color: "#27b30a" }}>{s.n}</div>
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
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#27b30a" }}>Everything carriers need</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Haul more. Worry less.</h2>
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
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#27b30a" }}>What carriers say</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Drivers. Fleets. One network.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`rounded-2xl p-7 flex flex-col gap-4 reveal reveal-d${i}`} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex gap-0.5">{Array.from({ length: t.stars }).map((_, j) => <svg key={j} width="15" height="15" viewBox="0 0 24 24" fill="#27b30a" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}</div>
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
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#27b30a" }}>FAQ</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Carrier questions, answered.</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="reveal" style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
                  style={{ background: openFaq === i ? "rgba(39,179,10,0.08)" : "rgba(255,255,255,0.03)" }}
                >
                  <span className="display text-[15px] text-white pr-4">{faq.q}</span>
                  <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white/60 transition-transform" style={{ background: "rgba(255,255,255,0.08)", transform: openFaq === i ? "rotate(45deg)" : "none" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5" style={{ background: "rgba(39,179,10,0.04)" }}>
                    <p className="text-[14px] text-white/65 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 60%,#061e0c 100%)" }}>
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: "radial-gradient(700px 400px at 85% 50%,rgba(39,179,10,0.22),transparent 60%)" }} />
        <div className="max-w-[800px] mx-auto px-6 text-center reveal relative">
          <h2 className="display text-white text-[40px] md:text-[54px] leading-[1.03]">More loads. Faster pay. Start today. Free.</h2>
          <p className="text-white/65 mt-4 text-[15px]">No setup fees. 48h guaranteed pay. All CDL-A welcome.</p>
          <Link href="/#quote" className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white transition" style={{ background: "#27b30a" }}>
            Join the network <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
          <div className="mt-5 flex items-center justify-center gap-6 text-[12px] text-white/40">
            <span>✓ No setup fees</span>
            <span>✓ 48h guaranteed pay</span>
            <span>✓ All CDL-A welcome</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
