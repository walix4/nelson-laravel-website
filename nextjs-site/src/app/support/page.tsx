"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

const QUICK_LINKS = [
  {
    title: "API Docs",
    desc: "Full reference for every endpoint, parameter, and response format.",
    href: "#",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "Route Coverage",
    desc: "See which toll roads, bridges, and tunnels are in our live network.",
    href: "/tools/ports",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2a8 8 0 0 0-8 8c0 5.6 8 13 8 13s8-7.4 8-13a8 8 0 0 0-8-8z" />
      </svg>
    ),
  },
  {
    title: "Billing & Plans",
    desc: "Understand your usage, upgrade your plan, or request an invoice.",
    href: "/pricing",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    title: "Integration Guides",
    desc: "Step-by-step walkthroughs for TMS, ERP, and fleet platform integrations.",
    href: "#",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

const FAQ = [
  {
    q: "How often is toll data updated?",
    a: "Toll rates across our network are refreshed every 15 minutes from live authority feeds. Major corridors like the NJ Turnpike and PA Turnpike update on sub-minute schedules.",
  },
  {
    q: "Which toll authorities do you cover?",
    a: "We source data directly from 50+ toll authorities across all 48 contiguous states, including E-ZPass affiliates, TxDOT, SunPass, and managed-lane operators.",
  },
  {
    q: "How do axle classes affect toll rates?",
    a: "Most authorities price by vehicle classification — typically 2 through 6 axles. A 5-axle semi will pay a different rate than a 2-axle pickup even on the same plaza, sometimes 3-5x more.",
  },
  {
    q: "What is the rate limit on the free tier?",
    a: "The Developer free tier supports up to 1,000 API calls per month in our sandbox environment. Production usage requires a Growth or Enterprise plan.",
  },
  {
    q: "How do I add my transponder account?",
    a: "In the API payload, pass your transponder network (e.g. E-ZPass, SunPass) in the transponder field. Discounted transponder rates are applied automatically where the authority supports them.",
  },
  {
    q: "Can I get historical toll rate data?",
    a: "Historical rate snapshots are available on Growth and Enterprise plans via our /history endpoint. Data goes back 24 months with daily granularity.",
  },
];

export default function Support() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* HERO */}
      <section
        className="relative overflow-hidden text-white py-20 md:py-28"
        style={{ background: "linear-gradient(135deg,#0B2D5C 0%,#061A38 60%,#0f3060 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(700px 400px at 10% 50%,rgba(255,107,0,0.12),transparent 60%)" }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
          <div
            className="inline-flex items-center rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-6"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            Support Center
          </div>
          <h1 className="display text-white text-[40px] md:text-[58px] leading-[1.05]">
            How can we help?
          </h1>
          <p className="mt-5 text-white/75 text-[16px] md:text-[18px] max-w-xl mx-auto leading-relaxed">
            Get help with toll data, API integration, and route coverage.
          </p>

          {/* Search bar */}
          <div className="mt-10 max-w-[640px] mx-auto">
            <div
              className="rounded-xl p-2 flex items-center gap-2"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}
            >
              <input
                type="text"
                placeholder="Search help articles..."
                readOnly
                className="flex-1 bg-transparent text-white placeholder-white/45 text-[15px] px-4 py-3 outline-none cursor-default"
              />
              <button
                className="shrink-0 flex items-center justify-center w-11 h-11 rounded-lg text-white transition"
                style={{ background: "var(--red)" }}
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="py-20 md:py-24" style={{ background: "linear-gradient(180deg,#F6F8FB,#FFFFFF)" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Resources</div>
            <h2 className="display text-[32px] md:text-[42px] text-[var(--navy)] leading-[1.05] mt-2">
              Find what you need
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_LINKS.map((item, i) => (
              <Link
                key={item.title}
                href={item.href}
                className={`reveal reveal-d${i} group rounded-xl p-7 border border-[var(--navy)]/10 bg-white flex flex-col gap-4 hover:border-[var(--red)]/40 transition`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ background: "var(--red)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="display text-[17px] text-[var(--navy)] flex items-center gap-1.5">
                    {item.title}
                    <span className="text-[var(--navy)]/30 group-hover:text-[var(--red)] transition">→</span>
                  </div>
                  <p className="text-[13px] text-[var(--muted)] mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="text-center reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">FAQ</div>
            <h2 className="display text-[32px] md:text-[42px] text-[var(--navy)] leading-[1.05] mt-2">
              Frequently asked questions
            </h2>
          </div>
          <div className="mt-10 space-y-4">
            {FAQ.map(({ q, a }, i) => (
              <div
                key={q}
                className={`reveal reveal-d${i % 3} rounded-xl p-7 border border-[var(--navy)]/10 bg-white`}
              >
                <h3 className="text-[15px] font-semibold text-[var(--navy)]">{q}</h3>
                <p className="text-[13.5px] text-[var(--muted)] mt-2.5 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        className="py-20 md:py-24"
        style={{ background: "linear-gradient(180deg,#F6F8FB,#EEF4F9)" }}
      >
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Contact</div>
            <h2 className="display text-[32px] md:text-[42px] text-[var(--navy)] leading-[1.05] mt-2">
              Still need help?
            </h2>
            <p className="mt-4 text-[var(--muted)] text-[15px] max-w-md mx-auto leading-relaxed">
              Our freight experts are standing by to help you get the right toll data for your platform.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="reveal rounded-xl p-7 border border-[var(--navy)]/10 bg-white flex gap-5 items-start">
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white"
                style={{ background: "var(--red)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="display text-[18px] text-[var(--navy)]">Email Support</div>
                <a
                  href="mailto:freight@draytoll.com"
                  className="font-semibold text-[14px] mt-1 block hover:opacity-80 transition"
                  style={{ color: "var(--red)" }}
                >
                  freight@draytoll.com
                </a>
                <p className="text-[13px] text-[var(--muted)] mt-2 leading-relaxed">
                  We respond to all freight and API inquiries within 24 hours on business days.
                </p>
                <div
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-semibold"
                  style={{ background: "rgba(255,107,0,0.08)", color: "var(--red)" }}
                >
                  Response &lt; 24h
                </div>
              </div>
            </div>

            {/* Live Chat */}
            <div className="reveal reveal-d1 rounded-xl p-7 border border-[var(--navy)]/10 bg-white flex gap-5 items-start">
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white"
                style={{ background: "var(--red)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <div className="display text-[18px] text-[var(--navy)]">Live Chat</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="live-dot" />
                  <span className="text-[13.5px] font-semibold" style={{ color: "var(--navy)" }}>
                    Online now
                  </span>
                </div>
                <p className="text-[13px] text-[var(--muted)] mt-2 leading-relaxed">
                  Chat with a freight data specialist in real time — no waiting in queues.
                </p>
                <div
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-semibold"
                  style={{ background: "rgba(11,45,92,0.06)", color: "var(--navy)" }}
                >
                  9AM - 6PM EST · Mon–Fri
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
