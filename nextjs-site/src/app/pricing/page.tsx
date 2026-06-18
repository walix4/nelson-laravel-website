"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    desc: "For owner-operators just getting started on DrayGo.",
    color: "#4ade80",
    features: [
      "Up to 10 loads/month",
      "Live load board access",
      "Basic rate calculator",
      "Email support",
      "Standard POD upload",
      "48h payment on delivery",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Carrier Pro",
    price: "$49",
    period: "per month",
    desc: "For active drayage carriers running high load volumes.",
    color: "#27b30a",
    features: [
      "Unlimited load claims",
      "Priority load matching",
      "Real-time GPS tracking",
      "Instant POD processing",
      "Dedicated carrier support",
      "Same-day payment option",
    ],
    cta: "Start 14-Day Trial",
    highlight: false,
  },
  {
    name: "Shipper",
    price: "$99",
    period: "per month",
    desc: "For shippers and BCOs moving containers regularly.",
    color: "#fc0b05",
    features: [
      "Unlimited load postings",
      "Instant rate quotes",
      "500+ verified carriers",
      "Container tracking dashboard",
      "Demurrage & per-diem alerts",
      "Dedicated account manager",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Broker",
    price: "$149",
    period: "per month",
    desc: "For freight brokers sourcing drayage capacity at scale.",
    color: "#00a5e7",
    features: [
      "Full carrier network access",
      "Multi-load management",
      "Lane rate intelligence",
      "Digital BOL & rate con",
      "Margin reporting per load",
      "API access (coming soon)",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "3PL / NVOCC",
    price: "$299",
    period: "per month",
    desc: "For logistics providers managing multiple clients.",
    color: "#a78bfa",
    features: [
      "Everything in Broker",
      "Multi-client workspace",
      "White-label portal",
      "Custom reporting",
      "Priority carrier matching",
      "SLA-backed support",
    ],
    cta: "Talk to Sales",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    desc: "For large shippers, BCOs and 3PLs with complex needs.",
    color: "#fbbf24",
    features: [
      "Everything in 3PL/NVOCC",
      "Dedicated infrastructure",
      "Custom integrations (TMS/ERP)",
      "Volume-based pricing",
      "24/7 dedicated support team",
      "On-site onboarding",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div style={{ background: "#08192b", minHeight: "100vh", color: "#fff" }}>
      <Nav />

      {/* Header */}
      <section style={{ padding: "80px 24px 56px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-semibold mb-5"
            style={{ borderRadius: 4, background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.35)", color: "#fc0b05" }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
            Simple, transparent pricing
          </div>
          <h1
            className="display text-white"
            style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 800, lineHeight: 1.08, margin: "0 0 20px" }}
          >
            Pay for what you use.
            <br />
            <span style={{ color: "#fc0b05" }}>Scale when you grow.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>
            Every plan includes live load board access, verified carriers, and 48-hour payments. No setup fees, no hidden costs.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                style={{
                  background: plan.highlight ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
                  border: plan.highlight ? `1px solid ${plan.color}` : "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 16,
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  backdropFilter: "blur(12px)",
                }}
              >
                {plan.highlight && (
                  <div
                    style={{
                      position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                      background: plan.color, color: "#fff", fontSize: 11, fontWeight: 700,
                      padding: "4px 14px", borderRadius: 4, whiteSpace: "nowrap",
                      letterSpacing: "0.06em", textTransform: "uppercase",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Plan name */}
                <div style={{ fontSize: 13, fontWeight: 700, color: plan.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                  {plan.name}
                </div>

                {/* Price */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 48, fontWeight: 800, lineHeight: 1, color: "#fff" }}>{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{plan.period}</span>
                  )}
                </div>

                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 24 }}>{plan.desc}</p>

                {/* Features */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/#load-board"
                  style={{
                    display: "block", textAlign: "center", padding: "13px 20px",
                    borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: "none",
                    background: plan.highlight ? plan.color : "rgba(255,255,255,0.07)",
                    color: "#fff",
                    border: plan.highlight ? "none" : `1px solid rgba(255,255,255,0.15)`,
                    transition: "opacity 0.15s",
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div style={{ textAlign: "center", marginTop: 48, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            All plans include a 14-day free trial · No credit card required · Cancel anytime
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
