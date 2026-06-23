"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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

      {/* ── SHIPPERS ─────────────────────────────────────────────────── */}
      <section style={{ background: "radial-gradient(ellipse 70% 90% at 15% 50%, rgba(252,11,5,0.13) 0%, transparent 65%), radial-gradient(ellipse 60% 70% at 85% 30%, rgba(252,11,5,0.08) 0%, transparent 55%), #060f1e", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-semibold mb-5 rounded" style={{ background: "rgba(252,11,5,0.14)", border: "1px solid rgba(252,11,5,0.4)", color: "#fff" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fc0b05", display: "inline-block" }} />
              For Shippers &amp; BCOs
            </div>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 16px" }}>
              Plans built for shippers.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              Every plan includes live load board access, verified carriers, and 48-hour payments. No setup fees.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }} className="pricing-grid-shipper">
            {/* Starter */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fc0b05", marginBottom: 16 }}>Starter</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$0</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For shippers just getting started with drayage.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["3 loads per month","Live load board access","Basic rate calculator","Email support","Standard POD upload","48h payment on delivery"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get Started Free</a>
            </div>
            {/* Shipper — highlighted */}
            <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid #fc0b05", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#fc0b05", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 4, whiteSpace: "nowrap" }}>MOST POPULAR</div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fc0b05", marginBottom: 16 }}>Shipper</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$49</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For shippers and BCOs moving containers regularly.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Unlimited load postings","Instant rate quotes","500+ verified carriers","Container tracking dashboard","Demurrage & per-diem alerts","Dedicated account manager"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "#fc0b05", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Start Free Trial</a>
            </div>
            {/* Growth */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fc0b05", marginBottom: 16 }}>Growth</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$99</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For high-volume shippers scaling across multiple ports.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Everything in Shipper","Multi-port rate comparison","Advanced tracking & alerts","Custom rate contracts","Priority carrier matching","API access"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get Started</a>
            </div>
            {/* Enterprise */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fc0b05", marginBottom: 16 }}>Enterprise</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$199</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For large importers and BCOs with high-volume needs.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Everything in Growth","Dedicated account manager","Custom carrier contracts","Volume rate discounts","Priority port coverage","SLA & uptime guarantee"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BROKERS ──────────────────────────────────────────────────── */}
      <section style={{ background: "radial-gradient(ellipse 70% 90% at 15% 50%, rgba(0,165,231,0.12) 0%, transparent 65%), radial-gradient(ellipse 60% 70% at 85% 30%, rgba(0,165,231,0.07) 0%, transparent 55%), #060f1e", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-semibold mb-5 rounded" style={{ background: "rgba(0,165,231,0.14)", border: "1px solid rgba(0,165,231,0.4)", color: "#fff" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00a5e7", display: "inline-block" }} />
              For Freight Brokers
            </div>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 16px" }}>
              Plans built for brokers.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              Every plan includes live load board access, 500+ verified carriers, and real-time rate intelligence.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }} className="pricing-grid-broker">
            {/* Starter */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00a5e7", marginBottom: 16 }}>Starter</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$0</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For brokers just getting started on DrayGo.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["3 loads per month","Live load board access","Basic rate calculator","Email support","Standard BOL upload"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00a5e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get Started Free</a>
            </div>
            {/* Broker — highlighted */}
            <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid #00a5e7", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#00a5e7", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 4, whiteSpace: "nowrap" }}>BEST FOR YOU</div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00a5e7", marginBottom: 16 }}>Broker</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$99</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For freight brokers sourcing drayage capacity at scale.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Full carrier network access","Multi-load management","Lane rate intelligence","Digital BOL & rate con","Margin reporting per load","API access (coming soon)"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00a5e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "#00a5e7", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Start Free Trial</a>
            </div>
            {/* Agency */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00a5e7", marginBottom: 16 }}>Agency</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$199</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For large brokerages and 3PLs managing multiple teams.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Everything in Broker","Unlimited brokered loads","Multi-lane rate management","White-label portal option","Custom reporting dashboard","Dedicated account manager"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00a5e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get Started</a>
            </div>
            {/* Enterprise */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00a5e7", marginBottom: 16 }}>Enterprise</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$299</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For enterprise 3PLs and national brokerages.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Everything in Agency","Dedicated account manager","Custom carrier contracts","Volume rate discounts","White-label options","SLA & uptime guarantee"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00a5e7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CARRIERS ─────────────────────────────────────────────────── */}
      <section style={{ background: "radial-gradient(ellipse 70% 90% at 15% 50%, rgba(39,179,10,0.12) 0%, transparent 65%), radial-gradient(ellipse 60% 70% at 85% 30%, rgba(39,179,10,0.07) 0%, transparent 55%), #060f1e", padding: "80px 24px 96px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-semibold mb-5 rounded" style={{ background: "rgba(39,179,10,0.14)", border: "1px solid rgba(39,179,10,0.4)", color: "#fff" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#27b30a", display: "inline-block" }} />
              For Carriers &amp; Owner-Operators
            </div>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 16px" }}>
              Plans built for carriers.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              Every plan includes live load board access, verified loads, and 48-hour payments. No setup fees.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }} className="pricing-grid-carriers">
            {/* Starter */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#27b30a", marginBottom: 16 }}>Starter</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$0</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For owner-operators just getting started on DrayGo.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["3 loads per month","Live load board access","Basic rate calculator","Email support","Standard POD upload","48h payment on delivery"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get Started Free</a>
            </div>
            {/* Carrier Pro — highlighted */}
            <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid #27b30a", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#27b30a", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 4, whiteSpace: "nowrap" }}>MOST POPULAR</div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#27b30a", marginBottom: 16 }}>Carrier Pro</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$49</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For active drayage carriers running high load volumes.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Unlimited load claims","Priority load matching","Real-time GPS tracking","Instant POD processing","Dedicated carrier support","Same-day payment option"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "#27b30a", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Start Free Trial</a>
            </div>
            {/* Fleet */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#27b30a", marginBottom: 16 }}>Fleet</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$99</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For small fleets and dispatchers managing multiple trucks.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Everything in Carrier Pro","Multi-truck dashboard","Fleet GPS overview","Driver management tools","Fuel card integration","Priority phone support"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get Started</a>
            </div>
            {/* Enterprise */}
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#27b30a", marginBottom: 16 }}>Enterprise</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1 }}>$199</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>/ mo</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.5 }}>For large fleets and carriers with enterprise needs.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                {["Everything in Fleet","Unlimited trucks & drivers","Enterprise GPS & telematics","Custom rate negotiations","Dedicated account team","SLA & uptime guarantee"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ marginTop: "auto", display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Contact Sales</a>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 48, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            All plans include a 14-day free trial · No credit card required · Cancel anytime
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
