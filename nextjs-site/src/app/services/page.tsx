"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { asset } from "@/lib/site";

const SERVICES = [
  {
    tag: "For Shippers",
    href: "/shipper",
    headline: "Instant drayage quotes & verified carriers",
    desc: "Post a load, get matched with verified carriers, and track your container from port gate-out to final delivery.",
    features: ["Live load board", "Real-time container tracking", "Digital BOL", "Transparent all-in pricing"],
    color: "#fc0b05",
  },
  {
    tag: "For Brokers",
    href: "/broker",
    headline: "Cover every drayage lane with confidence",
    desc: "Access live load board, 2,800+ verified carriers, lane intelligence, and digital documentation — the complete broker toolkit.",
    features: ["Live load matching", "Carrier vetting & ratings", "Route intelligence", "Margin analytics"],
    color: "#3A5FC0",
  },
  {
    tag: "For Carriers",
    href: "/carriers",
    headline: "More loads, faster pay, less deadhead",
    desc: "Find drayage loads near your terminal, accept with one tap, and get paid within 48 hours of POD submission.",
    features: ["Live load board access", "48h carrier payment", "Fleet management", "Compliance tools"],
    color: "#27b30a",
  },
  {
    tag: "Rate API",
    href: "#api",
    headline: "Embed live drayage pricing in your TMS",
    desc: "POST origin/destination/container — get back a fully itemised rate object in under 120ms. REST/JSON, sandbox included.",
    features: ["120ms avg response", "Structured JSON rates", "Sandbox credentials", "Webhook repricing"],
    color: "#1E3A8A",
  },
];

const MATRIX: { feat: string; starter: boolean; pro: boolean; ent: boolean }[] = [
  { feat: "Web rate quotes",            starter: true,  pro: true,  ent: true  },
  { feat: "Quote PDF export",           starter: true,  pro: true,  ent: true  },
  { feat: "All 50+ ports",             starter: true,  pro: true,  ent: true  },
  { feat: "Rate API access",            starter: false, pro: true,  ent: true  },
  { feat: "Quote history & analytics",  starter: false, pro: true,  ent: true  },
  { feat: "Custom carrier contracts",   starter: false, pro: false, ent: true  },
  { feat: "White-label PDF branding",   starter: false, pro: true,  ent: true  },
  { feat: "Webhook repricing alerts",   starter: false, pro: false, ent: true  },
  { feat: "SLA & dedicated support",    starter: false, pro: false, ent: true  },
];

const Check = ({ ok }: { ok: boolean }) => ok
  ? <span style={{ color: "#22c55e", fontWeight: 700 }}>✓</span>
  : <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 700 }}>—</span>;

const JSON_SAMPLE = `{
  "origin": "Los Angeles, CA",
  "destination": "Phoenix, AZ",
  "container": "40HC",
  "weight_lb": 38420,
  "quote": {
    "total_usd": 1842.50,
    "valid_until": "2026-07-05T00:00:00Z",
    "line_items": {
      "base_rate":    1240.00,
      "fuel_fsc":      221.80,
      "chassis_fee":   148.00,
      "port_thc":      132.00,
      "accessorials":  100.70
    }
  }
}`;

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: 460 }}>
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src={asset("/hero-cargo.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(1,7,26,0.90) 0%,rgba(1,7,26,0.70) 45%,rgba(1,7,26,0.92) 100%)" }} />
        <div className="relative z-10 max-w-[860px] mx-auto px-6 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold mb-6" style={{ background: "rgba(255,59,48,0.15)", border: "1px solid rgba(255,59,48,0.4)" }}>
            Platform overview
          </div>
          <h1 className="display text-white text-[38px] md:text-[60px] leading-[1.03]">One platform.<br /><span style={{ color: "#fc0b05" }}>Every drayage need.</span></h1>
          <p className="mt-5 text-white/65 text-[16px] max-w-2xl mx-auto leading-relaxed">Quotes, load matching, carrier payments, and rate API — all built on the same live data engine that updates every 15 minutes.</p>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#08192b" }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: "radial-gradient(800px 400px at 80% 10%,rgba(58,95,192,0.3),transparent 60%)" }} />
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <div key={s.tag} className={`rounded-2xl p-8 reveal reveal-d${i % 2}`} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold mb-5" style={{ background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}40` }}>{s.tag}</div>
                <h3 className="display text-[20px] md:text-[22px] text-white mb-3">{s.headline}</h3>
                <p className="text-[14px] text-white/55 leading-relaxed mb-6">{s.desc}</p>
                <ul className="flex flex-col gap-2 mb-7">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-[13px] text-white/70">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${s.color}25` }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={s.href} className="inline-flex items-center gap-2 text-[13px] font-semibold transition" style={{ color: s.color }}>
                  Learn more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE MATRIX */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#060d1a" }}>
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center reveal mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: "#fc0b05" }}>Compare plans</div>
            <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Starter. Pro. Enterprise.</h2>
          </div>
          <div className="rounded-2xl overflow-hidden reveal reveal-d1" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="grid grid-cols-4" style={{ background: "rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="p-5 text-[12px] font-bold uppercase tracking-wider text-white/40">Feature</div>
              {[["Starter", "Free"], ["Pro", "$49/mo"], ["Enterprise", "Custom"]].map(([name, price]) => (
                <div key={name} className="p-5 text-center">
                  <div className="text-[14px] font-bold text-white">{name}</div>
                  <div className="text-[12px] mt-0.5" style={{ color: "#fc0b05" }}>{price}</div>
                </div>
              ))}
            </div>
            {MATRIX.map((row, i) => (
              <div key={row.feat} className="grid grid-cols-4" style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderBottom: i < MATRIX.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div className="p-4 pl-5 text-[13px] text-white/65">{row.feat}</div>
                <div className="p-4 text-center text-[16px]"><Check ok={row.starter} /></div>
                <div className="p-4 text-center text-[16px]"><Check ok={row.pro} /></div>
                <div className="p-4 text-center text-[16px]"><Check ok={row.ent} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATION */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#08192b" }}>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: "radial-gradient(700px 300px at 20% 60%,rgba(58,95,192,0.3),transparent 60%)" }} />
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: "#3A5FC0" }}>API integration</div>
              <h2 className="display text-[36px] md:text-[48px] text-white leading-[1.05]">Connect to your TMS or ERP in minutes.</h2>
              <p className="mt-5 text-white/60 text-[15px] leading-relaxed">The DrayageRate API is a single POST endpoint. Drop in your origin, destination, container type, and weight — get back a fully itemised rate object your TMS can consume directly.</p>
              <div className="mt-6 flex flex-col gap-3 text-[13px]">
                {[["REST / JSON", "Standard HTTP, no SDK required"], ["120ms avg", "P95 response time"], ["Sandbox mode", "Free test credentials, no billing"], ["Webhook alerts", "Push repricing on diesel index change"]].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md" style={{ background: "rgba(58,95,192,0.2)", color: "#6E8FE0" }}>{k}</span>
                    <span className="text-white/55">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-d1">
              <div className="rounded-2xl p-5 overflow-x-auto" style={{ background: "#060d1a", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#fc0b05" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ffde01" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} />
                  <span className="ml-2 text-[11px] text-white/40">POST /v1/quote — response</span>
                </div>
                <pre className="text-[12px] leading-relaxed" style={{ color: "#6E8FE0", fontFamily: "ui-monospace,SFMono-Regular,monospace" }}>{JSON_SAMPLE}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#08192b 0%,#06143A 60%,#1E3C82 100%)" }}>
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: "radial-gradient(700px 400px at 80% 50%,rgba(255,59,48,0.25),transparent 60%)" }} />
        <div className="max-w-[800px] mx-auto px-6 text-center reveal relative">
          <h2 className="display text-white text-[40px] md:text-[54px] leading-[1.03]">Start with any plan. Upgrade when you scale.</h2>
          <p className="text-white/65 mt-4 text-[15px]">Free tier includes web quotes and PDF export across all 50+ ports. No credit card required.</p>
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <Link href="/#quote" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold"><span className="label">Run a free quote</span></Link>
            <Link href="#api" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white transition" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>View API docs</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
