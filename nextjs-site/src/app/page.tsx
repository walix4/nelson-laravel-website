"use client";
import Link from "next/link";
import { asset } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

const APPS = [
  {
    id: "shipper",
    name: "DrayGo Shipper",
    role: "For Importers, Exporters & BCOs",
    tagline: "Ship smarter. Every container.",
    desc: "Get instant drayage quotes, schedule port pickups and track every container in real time — from the first gate move to final delivery.",
    color: "#fc0b05",
    colorDark: "#b80803",
    colorAlpha: "rgba(252,11,5,0.13)",
    colorBorder: "rgba(252,11,5,0.32)",
    video: "/shipper-hero.mp4",
    features: [
      { label: "Instant rate quotes", sub: "Live diesel, FSC & port fees across 40+ U.S. ports in seconds." },
      { label: "Real-time container tracking", sub: "Gate-in to gate-out visibility, every move, 24/7." },
      { label: "Port appointment scheduling", sub: "Book and manage terminal appointments in one tap." },
      { label: "Auto-generated documents", sub: "BOL, delivery orders and customs docs ready instantly." },
      { label: "Drayage spend analytics", sub: "Full cost breakdown and per-move spend dashboard." },
    ],
    cta: "Start shipping",
    href: "/shipper",
    flip: false,
  },
  {
    id: "carrier",
    name: "DrayGo Carrier",
    role: "For Truckers & Owner-Operators",
    tagline: "More loads. Less paperwork.",
    desc: "Find drayage loads near you, confirm pickups from your phone and get paid within 24 hours of proof of delivery — no net-30 waits.",
    color: "#18a354",
    colorDark: "#117a3e",
    colorAlpha: "rgba(24,163,84,0.13)",
    colorBorder: "rgba(24,163,84,0.32)",
    video: "/carrier-hero.mp4",
    features: [
      { label: "Live load board", sub: "Hundreds of drayage loads posted daily near every major port." },
      { label: "24-hour instant payout", sub: "Get paid on delivery — DrayPay settles same day, guaranteed." },
      { label: "Digital dispatch & POD", sub: "Accept loads, upload proof of delivery from your phone." },
      { label: "Port gate routing", sub: "Turn-by-turn with built-in gate, chassis and yard instructions." },
      { label: "Earnings dashboard", sub: "Miles, on-time rate and total revenue tracked automatically." },
    ],
    cta: "Find loads",
    href: "/carriers",
    flip: true,
  },
  {
    id: "broker",
    name: "DrayGo Broker",
    role: "For Freight Brokers & 3PLs",
    tagline: "Book, manage, deliver — at scale.",
    desc: "Source carriers instantly, manage your full load book and give shippers a live tracking portal — all from one operations dashboard.",
    color: "#3A5FC0",
    colorDark: "#2a47a0",
    colorAlpha: "rgba(58,95,192,0.13)",
    colorBorder: "rgba(58,95,192,0.32)",
    video: "/broker-hero.mp4",
    features: [
      { label: "8,000+ carrier network", sub: "Vetted drayage carriers across all major U.S. ports, ready now." },
      { label: "Operations load board", sub: "Post, assign and track every load from a single view." },
      { label: "Bid & rate engine", sub: "Instant carrier quotes with counter-offer and auto-award." },
      { label: "White-label shipper portal", sub: "Branded tracking portal your customers log into directly." },
      { label: "P&L analytics", sub: "Margin, volume and on-time performance per customer account." },
    ],
    cta: "Run your book",
    href: "/broker",
    flip: false,
  },
];

const STATS = [
  { n: "40+", label: "U.S. & Canada Ports" },
  { n: "8,000+", label: "Active Carriers" },
  { n: "30s", label: "Quote to Booking" },
  { n: "24h", label: "Guaranteed Payout" },
];

const FLOW = [
  {
    step: "01",
    title: "Shipper posts a load",
    desc: "A BCO or freight broker enters the container details. DrayGo prices it instantly against live diesel, FSC and port fees.",
    color: "#fc0b05",
    icon: '<path d="M14 18V6H2v12h2"/><path d="M14 8h4l4 4v6h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  },
  {
    step: "02",
    title: "Broker matches a carrier",
    desc: "DrayGo Broker assigns the move to a vetted carrier from the network. Real-time status flows back to the shipper automatically.",
    color: "#3A5FC0",
    icon: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M5 15H2a10 10 0 0 0 20 0h-3"/>',
  },
  {
    step: "03",
    title: "Carrier delivers & gets paid",
    desc: "The driver uploads POD in DrayGo Carrier. Payment hits their DrayPay wallet within 24 hours — no invoices, no waiting.",
    color: "#18a354",
    icon: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
  },
];

const FEATURES = [
  { label: "Real-time visibility", desc: "Every container, every move — live status across all three apps simultaneously.", icon: '<circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>' },
  { label: "Integrated payments", desc: "DrayPay powers instant settlements across the entire platform — no third-party delays.", icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
  { label: "Live pricing engine", desc: "Diesel index, FSC, chassis and port fees updated continuously — always accurate.", icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>' },
  { label: "Digital documents", desc: "BOLs, PODs, customs docs and delivery orders auto-generated and stored in one place.", icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' },
  { label: "Port coverage", desc: "LA/LB, New York/NJ, Savannah, Houston, Seattle, Charleston and 35+ more ports.", icon: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>' },
  { label: "Mobile-first apps", desc: "iOS and Android apps built for the road — offline-capable, fast, always up to date.", icon: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>' },
];

export default function Home() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* ─── HERO ─── */}
      <section className="grid-bg relative overflow-hidden min-h-[100svh] flex flex-col justify-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[800px] h-[800px] rounded-full" style={{ background: "radial-gradient(circle, rgba(252,11,5,0.16) 0%, transparent 60%)" }} />
          <div className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(58,95,192,0.16) 0%, transparent 60%)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(24,163,84,0.08) 0%, transparent 60%)" }} />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-28 md:py-36 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-[12px] font-semibold text-white/75 reveal" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#fc0b05", animation: "livePulse 1.8s ease-out infinite" }} />
            The DrayGo Platform — Now Live
          </div>

          {/* Headline */}
          <h1 className="display text-white leading-[1.0] reveal reveal-delay-1" style={{ fontSize: "clamp(44px, 8vw, 88px)" }}>
            One Ecosystem.<br />
            <span style={{ color: "var(--red)" }}>Every Role.</span><br />
            Zero Friction.
          </h1>

          {/* Sub */}
          <p className="mt-6 text-white/60 leading-relaxed max-w-2xl mx-auto reveal reveal-delay-2" style={{ fontSize: "clamp(16px, 2vw, 20px)" }}>
            DrayGo connects shippers, carriers and brokers on a single real-time platform — instant quotes, live loads and same-day payments across every major U.S. container port.
          </p>

          {/* App pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 reveal reveal-delay-2">
            {APPS.map((app) => (
              <a key={app.id} href={`#${app.id}`}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:scale-105"
                style={{ background: app.colorAlpha, border: `1px solid ${app.colorBorder}` }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: app.color, flexShrink: 0 }} />
                {app.name}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 reveal reveal-delay-3">
            <Link href="/shipper" className="btn-primary inline-flex items-center gap-2 rounded-xl text-[15px] font-semibold" style={{ padding: "14px 32px" }}>
              <span className="label">Get Started Free</span>
            </Link>
            <a href="#how-it-works" className="btn-ghost inline-flex items-center gap-2 rounded-xl text-[15px] font-semibold" style={{ padding: "14px 32px" }}>
              How it works
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 reveal reveal-delay-3">
            {STATS.map(({ n, label }) => (
              <div key={label} className="rounded-2xl py-6 px-4 text-center" style={{ background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="display text-white leading-none" style={{ fontSize: 36 }}>{n}</div>
                <div className="mt-2 text-[12px] font-medium text-white/45">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 reveal">
          <span className="text-[11px] font-medium text-white/35 uppercase tracking-[0.15em]">Scroll to explore</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "floatTag 2s ease-in-out infinite" }}><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* ─── 3 APP SHOWCASE SECTIONS ─── */}
      {APPS.map((app, i) => (
        <section key={app.id} id={app.id} className="relative overflow-hidden py-24 md:py-32"
          style={{ background: i % 2 === 0 ? "#07153B" : "#050F2C" }}>

          {/* Glow */}
          <div className={`absolute ${app.flip ? "left-[-10%]" : "right-[-10%]"} top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none`}
            style={{ background: `radial-gradient(circle, ${app.color}22 0%, transparent 65%)` }} />

          <div className="relative z-10 max-w-[1280px] mx-auto px-6">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>

              {/* TEXT — swap order on flip */}
              <div className={`${app.flip ? "lg:order-2" : "lg:order-1"} reveal`}>
                {/* Role badge */}
                <div className="inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 mb-6 text-[11px] font-bold uppercase tracking-[0.12em]"
                  style={{ background: app.colorAlpha, border: `1px solid ${app.colorBorder}`, color: app.color }}>
                  {app.role}
                </div>

                <h2 className="display text-white leading-[1.04]" style={{ fontSize: "clamp(34px, 4.5vw, 54px)" }}>
                  <span style={{ color: app.color }}>{app.name}</span>
                </h2>
                <p className="mt-3 font-semibold text-white/70" style={{ fontSize: 20 }}>{app.tagline}</p>
                <p className="mt-4 text-white/50 leading-relaxed max-w-[480px]" style={{ fontSize: 16 }}>{app.desc}</p>

                {/* Feature checklist */}
                <ul className="mt-8 space-y-4">
                  {app.features.map(({ label, sub }) => (
                    <li key={label} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: app.colorAlpha, border: `1px solid ${app.colorBorder}` }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={app.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>
                        <span className="block text-[14px] font-semibold text-white leading-snug">{label}</span>
                        <span className="block text-[12.5px] text-white/45 mt-0.5">{sub}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA row */}
                <div className="mt-10 flex items-center gap-4">
                  <Link href={app.href}
                    className="inline-flex items-center gap-2 rounded-xl text-[14px] font-bold text-white transition-all duration-200 hover:scale-[1.03]"
                    style={{ background: `linear-gradient(175deg, ${app.color} 0%, ${app.colorDark} 100%)`, padding: "12px 28px", border: `1px solid ${app.colorBorder}` }}>
                    {app.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                  <Link href={app.href} className="text-[13px] font-medium text-white/40 hover:text-white/70 transition-colors">
                    Learn more →
                  </Link>
                </div>
              </div>

              {/* VISUAL — swap order on flip */}
              <div className={`${app.flip ? "lg:order-1" : "lg:order-2"} reveal reveal-delay-1`}>
                <div className="relative rounded-2xl overflow-hidden" style={{ border: `1px solid ${app.colorBorder}`, aspectRatio: "16/10" }}>
                  {/* Video */}
                  <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
                    <source src={asset(app.video)} type="video/mp4" />
                  </video>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${app.color}60 0%, rgba(5,15,44,0.35) 50%, rgba(5,15,44,0.80) 100%)` }} />
                  {/* Live badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold text-white"
                    style={{ background: "rgba(0,0,0,0.48)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.14)" }}>
                    <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: app.color, animation: "livePulse 1.8s ease-out infinite" }} />
                    {app.name}
                  </div>
                  {/* Bottom stat strip */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-4" style={{ background: "linear-gradient(0deg, rgba(5,15,44,0.95) 0%, transparent 100%)" }}>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-white/60">{app.role}</span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white/80">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                        {app.cta}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* ─── HOW IT CONNECTS ─── */}
      <section id="how-it-works" className="grid-bg relative overflow-hidden py-24 md:py-32">
        <div className="relative z-10 max-w-[1280px] mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[12px] font-semibold text-white/65"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.13)" }}>
              The DrayGo Ecosystem
            </div>
            <h2 className="display text-white" style={{ fontSize: "clamp(34px, 5vw, 56px)" }}>Where it all connects</h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto leading-relaxed" style={{ fontSize: 17 }}>
              Every app talks to every other. A shipper&apos;s booking becomes a carrier&apos;s load. A broker&apos;s dispatch becomes a same-day payment. One network, zero gaps.
            </p>
          </div>

          {/* Flow steps */}
          <div className="grid md:grid-cols-3 gap-6 reveal">
            {FLOW.map(({ step, title, desc, color, icon }, idx) => (
              <div key={step} className="relative">
                <div className="rounded-2xl p-8 h-full flex flex-col" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center" style={{ background: `${color}1a`, border: `1px solid ${color}40` }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: icon }} />
                  </div>
                  <div className="display text-[40px] leading-none mb-3 text-white/10 num">{step}</div>
                  <h3 className="text-[17px] font-bold text-white mb-2">{title}</h3>
                  <p className="text-[13.5px] text-white/50 leading-relaxed flex-1">{desc}</p>
                </div>
                {/* Arrow connector */}
                {idx < 2 && (
                  <div className="hidden md:flex absolute top-10 -right-3 z-10 w-6 h-6 rounded-full items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLATFORM FEATURES ─── */}
      <section className="relative py-24 md:py-32" style={{ background: "#07153B" }}>
        <div className="max-w-[1280px] mx-auto px-6">

          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[12px] font-semibold text-white/65"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.13)" }}>
              Platform Capabilities
            </div>
            <h2 className="display text-white" style={{ fontSize: "clamp(32px, 4.5vw, 50px)" }}>Everything drayage needs</h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto" style={{ fontSize: 16 }}>Built from the ground up for container freight — not adapted from generic TMS software.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
            {FEATURES.map(({ label, desc, icon }, i) => (
              <div key={label} className={`rounded-2xl p-7 reveal reveal-delay-${(i % 3) + 1}`}
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-11 h-11 rounded-xl mb-5 flex items-center justify-center" style={{ background: "rgba(252,11,5,0.13)", border: "1px solid rgba(252,11,5,0.3)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: icon }} />
                </div>
                <h3 className="text-[15px] font-bold text-white mb-1.5">{label}</h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative overflow-hidden py-28 md:py-36" style={{ background: "#040D24" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(252,11,5,0.18) 0%, transparent 65%)" }} />
        </div>

        <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center reveal">
          {/* App badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {APPS.map((app) => (
              <span key={app.id} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
                style={{ background: app.colorAlpha, border: `1px solid ${app.colorBorder}`, color: app.color }}>
                <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: app.color }} />
                {app.name}
              </span>
            ))}
          </div>

          <h2 className="display text-white leading-[1.05]" style={{ fontSize: "clamp(38px, 6vw, 70px)" }}>
            Ready to move<br /><span style={{ color: "var(--red)" }}>containers?</span>
          </h2>
          <p className="mt-5 text-white/50 leading-relaxed max-w-lg mx-auto" style={{ fontSize: 17 }}>
            Join thousands of shippers, carriers and brokers already running on DrayGo. Free to start. No contracts.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/shipper" className="btn-primary inline-flex items-center gap-2 rounded-xl text-[15px] font-bold" style={{ padding: "15px 36px" }}>
              <span className="label">Create Free Account</span>
            </Link>
            <Link href="/about" className="btn-ghost inline-flex items-center gap-2 rounded-xl text-[15px] font-semibold" style={{ padding: "15px 36px" }}>
              Learn about DrayGo
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-[12px] text-white/30 font-medium">No credit card required · Set up in under 5 minutes · Cancel anytime</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
