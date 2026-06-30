"use client";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

const BULLETS = [
  "Instant Drayage Rate Quotes",
  "40+ U.S. Port & Rail Coverage",
  "Real-Time Container Tracking",
  "Carrier & Broker Platform",
  "24/7 Network Support",
];

const ROLES = [
  "Select one",
  "Shipper / Importer",
  "Freight Broker",
  "Carrier / Owner-Operator",
  "Logistics Manager",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", company: "", role: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      const subject = encodeURIComponent(`DrayGo Inquiry — ${form.firstName} ${form.lastName}`);
      const body = encodeURIComponent(
        `Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nCompany: ${form.company}\nRole: ${form.role}\n\n${form.message}`
      );
      window.open(`mailto:info@draygo.net?subject=${subject}&body=${body}`);
      setSending(false);
      setSubmitted(true);
    }, 900);
  }

  return (
    <>
      <Nav />
      <RevealInit />

      <section className="grid-bg relative overflow-hidden min-h-screen flex items-center py-28">
        {/* Background glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(252,11,5,0.07) 0%, transparent 65%)" }} />
        <div className="absolute left-0 top-1/4 w-[400px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(58,95,192,0.08) 0%, transparent 65%)" }} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* ── LEFT ── */}
            <div className="reveal">
              <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] mb-5"
                style={{ color: "#fc0b05" }}>
                Contact Us
              </div>
              <h1 className="display text-white leading-[1.08] mb-5"
                style={{ fontSize: "clamp(34px, 4.5vw, 58px)" }}>
                Get in Touch<br />with DrayGo
              </h1>
              <p className="text-white/50 mb-8 leading-relaxed" style={{ fontSize: 16, maxWidth: 420 }}>
                Whether you&apos;re a shipper, carrier, or broker — our team is ready to help you move containers faster and smarter.
              </p>

              <ul className="space-y-3 mb-10">
                {BULLETS.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(252,11,5,0.15)", border: "1px solid rgba(252,11,5,0.35)" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <span className="text-[14px] font-medium text-white/75">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-[13px] font-bold text-white mb-3">General Contact Info</div>
                <p className="text-[13px] text-white/45 mb-4 leading-relaxed" style={{ maxWidth: 360 }}>
                  We&apos;re here to help with anything — platform questions, partnerships, or support.
                </p>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <a href="mailto:info@draygo.net" className="text-[13px] font-semibold text-white/80 hover:text-white transition-colors">
                    info@draygo.net
                  </a>
                </div>
              </div>
            </div>

            {/* ── RIGHT — FORM ── */}
            <div className="reveal reveal-delay-1">
              <div className="rounded-3xl p-8 md:p-10"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>

                {/* SUCCESS STATE */}
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    {/* Animated checkmark */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(24,163,84,0.12)", border: "1.5px solid rgba(24,163,84,0.35)", animation: "scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#18a354" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          style={{ animation: "drawCheck 0.5s 0.3s ease both", strokeDasharray: 30, strokeDashoffset: 30 }}>
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      {/* Ripple rings */}
                      <div className="absolute inset-0 rounded-full"
                        style={{ border: "1px solid rgba(24,163,84,0.2)", animation: "ripple 1s 0.5s ease-out both" }} />
                      <div className="absolute inset-0 rounded-full"
                        style={{ border: "1px solid rgba(24,163,84,0.1)", animation: "ripple 1s 0.7s ease-out both" }} />
                    </div>
                    <h3 className="text-[22px] font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-[14px] text-white/50 mb-1">Your email client should open shortly.</p>
                    <p className="text-[13px] text-white/35 mb-8">
                      Or email us directly at <a href="mailto:info@draygo.net" className="text-white/60 underline underline-offset-2">info@draygo.net</a>
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", company: "", role: "", message: "" }); }}
                      className="rounded-xl px-6 py-2.5 text-[13px] font-semibold text-white/60 hover:text-white transition-colors"
                      style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                      Send another message
                    </button>

                    <style>{`
                      @keyframes scaleIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                      @keyframes drawCheck { to { stroke-dashoffset: 0; } }
                      @keyframes ripple { from { transform: scale(1); opacity: 1; } to { transform: scale(2.2); opacity: 0; } }
                    `}</style>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-white/45 mb-1.5 font-medium">First Name</label>
                        <input
                          type="text" required placeholder="Nelson"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          className="w-full rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-white/45 mb-1.5 font-medium">Last Name</label>
                        <input
                          type="text" required placeholder="Buldier"
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          className="w-full rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] text-white/45 mb-1.5 font-medium">Email Address</label>
                      <input
                        type="email" required placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-[11px] text-white/45 mb-1.5 font-medium">Company Name</label>
                      <input
                        type="text" placeholder="Your company"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-[11px] text-white/45 mb-1.5 font-medium">Which best describes you?</label>
                      <div className="relative">
                        <select
                          value={form.role}
                          onChange={(e) => setForm({ ...form, role: e.target.value })}
                          className="w-full rounded-xl px-4 py-3 text-[14px] outline-none appearance-none"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.10)",
                            color: form.role ? "#fff" : "rgba(255,255,255,0.25)",
                          }}>
                          {ROLES.map((r) => (
                            <option key={r} value={r === "Select one" ? "" : r}
                              style={{ background: "#0d2040", color: "#fff" }}>
                              {r}
                            </option>
                          ))}
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] text-white/45 mb-1.5 font-medium">Message</label>
                      <textarea
                        rows={5} required placeholder="Write your message..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none resize-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full rounded-xl py-3.5 text-[15px] font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-70"
                      style={{ background: "#fc0b05", marginTop: 4 }}>
                      {sending ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Submit
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
