"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { asset } from "@/lib/site";

/* ── Featured post ───────────────────────────────────────────────────────── */
const FEATURED = {
  title: "How 5-Axle Rigs Are Losing $3,200/Year to Miscalculated Tolls",
  date: "Jun 10, 2026",
  readTime: "8 min read",
  tag: "Toll Costs",
  excerpt:
    "Axle miscounting is the silent killer of freight margins. When a 5-axle semi gets logged as a 3-axle unit at a toll plaza, the difference in cash-rate billing adds up fast — and most fleets don't notice until reconciliation, if they notice at all. We analyzed 14,000 drayage moves across the Northeast and found that the average 5-axle rig overpays by $3,200 annually due to axle classification errors baked into TMS toll estimates.",
};

/* ── Blog grid posts ─────────────────────────────────────────────────────── */
const POSTS = [
  {
    title: "E-ZPass vs Cash: The Real Cost Difference for Drayage Fleets",
    date: "May 28, 2026",
    readTime: "5 min read",
    tag: "Transponders",
    excerpt: "Pay-by-plate surcharges and cash lane premiums cost the average drayage fleet 18–32% more per toll compared to E-ZPass — here's the math broken down by region.",
  },
  {
    title: "Port to Door: Mapping Every Toll Plaza on the LA–Phoenix Lane",
    date: "May 15, 2026",
    readTime: "6 min read",
    tag: "Routes",
    excerpt: "The LA–Phoenix corridor crosses 11 distinct toll zones. We mapped every plaza, axle rate, and transponder discount so your TMS can price this lane without surprises.",
  },
  {
    title: "Why Congestion Pricing Wrecks Your TMS Toll Estimates",
    date: "May 2, 2026",
    readTime: "4 min read",
    tag: "TMS",
    excerpt: "Most TMS toll plugins use static rate tables. Congestion pricing changes every 6–15 minutes on managed lanes — and that gap is quietly inflating your freight estimates.",
  },
  {
    title: "The Hidden Cost of Running Without a Transponder",
    date: "Apr 18, 2026",
    readTime: "3 min read",
    tag: "Savings",
    excerpt: "Cash and video tolls carry surcharges of 25–80% above the base rate on most Northeast corridors. We break down exactly where running tagless is costing you the most.",
  },
  {
    title: "Intermodal Rail-to-Truck Transfer: Which Tolls Apply?",
    date: "Apr 5, 2026",
    readTime: "7 min read",
    tag: "Intermodal",
    excerpt: "The last-mile drayage leg after a rail transfer carries its own set of toll obligations that most intermodal TMS platforms miss entirely. Here's what applies and when.",
  },
  {
    title: "Building a Freight API That Updates Toll Rates Every 15 Minutes",
    date: "Mar 22, 2026",
    readTime: "9 min read",
    tag: "Engineering",
    excerpt: "How we designed a sub-120ms toll pricing API that ingests authority feed updates, handles managed-lane time windows, and serves 50K+ plazas without a cold cache.",
  },
];

/* ── Tag color helper ────────────────────────────────────────────────────── */
function TagBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-block text-[11px] font-bold px-3 py-1 rounded-full"
      style={{ background: "rgba(255,107,0,0.12)", color: "#FF6B00" }}
    >
      {label}
    </span>
  );
}

export default function BlogPage() {
  return (
    <>
      <Nav />
      <RevealInit />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden text-white py-20 md:py-28"
        style={{ background: "linear-gradient(135deg,#0B2D5C 0%,#061A38 60%,#0f3060 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(700px 400px at 10% 50%,rgba(255,107,0,0.12),transparent 60%)" }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-[11px] font-semibold mb-5"
              style={{ background: "rgba(255,107,0,0.16)", border: "1px solid rgba(255,107,0,0.4)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] inline-block" />
              Freight intelligence
            </div>
            <h1 className="display text-white text-[40px] md:text-[62px] leading-[1.04]">
              DrayToll <span style={{ color: "#FF6B00" }}>Blog</span>
            </h1>
            <p className="mt-5 text-white/70 text-[16px] md:text-[18px] max-w-xl leading-relaxed">
              Insights on toll costs, freight tech, and drayage intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURED POST ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div
            className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-6 reveal"
            style={{ color: "#FF6B00" }}
          >
            Featured article
          </div>

          <div
            className="reveal rounded-xl p-8 md:p-10 border border-[var(--navy)]/10 bg-white"
            style={{ borderLeft: "4px solid #FF6B00" }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <TagBadge label={FEATURED.tag} />
              <span className="text-[12px] text-[var(--muted)]">{FEATURED.date}</span>
              <span className="text-[var(--muted)] opacity-50">·</span>
              <span className="text-[12px] text-[var(--muted)]">{FEATURED.readTime}</span>
            </div>

            <h2 className="display text-[24px] md:text-[32px] text-[var(--navy)] leading-[1.2] mb-5">
              {FEATURED.title}
            </h2>

            <p className="text-[15px] text-[var(--muted)] leading-relaxed max-w-3xl mb-7">
              {FEATURED.excerpt}
            </p>

            <Link
              href="#"
              className="inline-flex items-center gap-2 font-semibold text-[14px]"
              style={{ color: "#FF6B00" }}
            >
              Read full article
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BLOG GRID ─────────────────────────────────────────────────────── */}
      <section className="pb-24" style={{ background: "#F8FAFC" }}>
        <div className="max-w-[1400px] mx-auto px-6 pt-14">
          <div className="text-center max-w-xl mx-auto mb-12 reveal">
            <div
              className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3"
              style={{ color: "#FF6B00" }}
            >
              Latest articles
            </div>
            <h2 className="display text-[30px] md:text-[40px] text-[var(--navy)] leading-[1.1]">
              More from the DrayToll team
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map((post, i) => (
              <article
                key={post.title}
                className={`reveal reveal-d${i % 3} rounded-xl p-7 border border-[var(--navy)]/10 bg-white flex flex-col`}
              >
                {/* Tag + meta row */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <TagBadge label={post.tag} />
                  <span className="text-[11px] text-[var(--muted)]">{post.date}</span>
                  <span className="text-[var(--muted)] opacity-40 text-[11px]">·</span>
                  <span className="text-[11px] text-[var(--muted)]">{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="display text-[17px] text-[var(--navy)] leading-[1.35] mb-3 flex-1">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[13px] text-[var(--muted)] leading-relaxed mb-5 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <Link
                  href="#"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold mt-auto"
                  style={{ color: "#FF6B00" }}
                >
                  Read more
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────────────────────────────── */}
      <section
        className="py-16 md:py-20 text-white"
        style={{ background: "linear-gradient(135deg,#0B2D5C 0%,#061A38 100%)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 reveal">
          <div>
            <h2 className="display text-[24px] md:text-[36px] text-white leading-[1.1]">
              Stop guessing. Start pricing tolls accurately.
            </h2>
            <p className="mt-3 text-white/60 text-[14px] max-w-lg leading-relaxed">
              Get API access to the same toll data that powers these articles — class-aware, plaza-level, updated every 15 minutes.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/pricing"
              className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold whitespace-nowrap"
            >
              Get API Key
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
