"use client";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

const FAQS = [
  { q: "Is DrayGo free to use for shippers?", a: "Yes — shippers get free access to instant rate quotes, container tracking and port appointment scheduling. No credit card required." },
  { q: "How does instant drayage pricing work?", a: "DrayGo pulls live diesel index, port congestion, chassis and lane data to generate locked rates for any U.S. port-to-inland move in under 30 seconds." },
  { q: "Which ports does DrayGo cover?", a: "40+ U.S. sea ports, rail ramps and inland destinations — including LA/Long Beach, NY/NJ, Houston, Savannah, Seattle and more." },
  { q: "How quickly do carriers get paid?", a: "DrayPay settles carrier invoices within 24 hours of an approved POD upload. No net-30, no factoring, no waiting." },
  { q: "Can freight brokers use DrayGo?", a: "Yes. DrayGo Broker gives you a full drayage TMS — dispatch, carrier matching, real-time status, instant billing — all in one dashboard." },
  { q: "What container types does DrayGo support?", a: "All standard ISO sizes (20', 40', 45', 53') including dry, reefer, open-top and flat rack, across domestic and international port moves." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ email: "", name: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("DrayGo Inquiry");
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:info@draygo.net?subject=${subject}&body=${body}`);
    setSubmitted(true);
  }

  return (
    <>
      <Nav />
      <RevealInit />

      {/* ─── HERO ─── */}
      <section className="grid-bg relative overflow-hidden pt-28 pb-20 text-center">
        {/* Decorative arcs */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: 700, height: 700 }}>
          <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.05)" }} />
          <div className="absolute inset-[80px] rounded-full" style={{ border: "1px solid rgba(255,255,255,0.04)" }} />
          <div className="absolute inset-[160px] rounded-full" style={{ border: "1px solid rgba(255,255,255,0.03)" }} />
        </div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(252,11,5,0.12) 0%, transparent 65%)" }} />

        <div className="relative z-10 max-w-[860px] mx-auto px-6 reveal">
          <div className="inline-flex items-center gap-2 rounded-xl px-4 py-1.5 mb-7 text-[12px] font-semibold text-white/65"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.13)" }}>
            Contact
          </div>
          <h1 className="display text-white leading-[1.05]" style={{ fontSize: "clamp(38px, 6vw, 72px)" }}>
            Get in Touch<br />with DrayGo
          </h1>
          <p className="mt-4 text-white/50 max-w-lg mx-auto" style={{ fontSize: 17 }}>
            Whether you&apos;re a shipper, carrier or broker — our team is ready to help you get started.
          </p>
        </div>
      </section>

      {/* ─── FORM + INFO ─── */}
      <section className="relative py-16" style={{ background: "#07153B" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">

            {/* Form card */}
            <div className="rounded-3xl p-8 md:p-12 reveal"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)" }}>
              <h2 className="text-[24px] font-bold text-white text-center mb-1.5">Contact Us</h2>
              <p className="text-[14px] text-white/45 text-center mb-8">
                Drop us a message — we typically respond within a few hours.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <input
                      type="email" required placeholder="Your Email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="rounded-xl px-4 py-3.5 text-[14px] text-white placeholder-white/30 outline-none w-full transition-colors focus:border-white/30"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                    />
                    <input
                      type="text" required placeholder="Your Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="rounded-xl px-4 py-3.5 text-[14px] text-white placeholder-white/30 outline-none w-full transition-colors focus:border-white/30"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                    />
                  </div>
                  <textarea
                    rows={6} required placeholder="Your Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl px-4 py-3.5 text-[14px] text-white placeholder-white/30 outline-none resize-none mb-4 transition-colors focus:border-white/30"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                  />
                  <button type="submit"
                    className="w-full rounded-xl py-4 text-[15px] font-bold text-white transition-all hover:opacity-90 active:scale-[0.99]"
                    style={{ background: "#fc0b05" }}>
                    Submit
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(24,163,84,0.2)", border: "1px solid rgba(24,163,84,0.4)" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#18a354" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="text-[20px] font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-[14px] text-white/50">We&apos;ll get back to you at <span className="text-white">info@draygo.net</span></p>
                  <button onClick={() => { setSubmitted(false); setForm({ email: "", name: "", message: "" }); }}
                    className="mt-6 text-[13px] text-white/40 hover:text-white/70 transition-colors underline underline-offset-2">
                    Send another message
                  </button>
                </div>
              )}
            </div>

            {/* Info cards */}
            <div className="space-y-4 reveal reveal-delay-1">
              {[
                {
                  icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
                  label: "Email Us",
                  value: "info@draygo.net",
                  sub: "Typical response: same day",
                  color: "#fc0b05",
                  href: "mailto:info@draygo.net",
                },
                {
                  icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
                  label: "Support Hours",
                  value: "24 / 7",
                  sub: "Available around the clock",
                  color: "#18a354",
                  href: null,
                },
                {
                  icon: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M5 15H2a10 10 0 0 0 20 0h-3"/>',
                  label: "Headquarters",
                  value: "Los Angeles, CA",
                  sub: "Serving all U.S. ports",
                  color: "#3A5FC0",
                  href: null,
                },
              ].map((c) => (
                <div key={c.label} className="rounded-2xl p-6"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{ background: `${c.color}18`, border: `1px solid ${c.color}35` }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: c.icon }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] text-white/40 uppercase tracking-wider mb-0.5">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-[15px] font-bold text-white hover:text-white/80 transition-colors">{c.value}</a>
                      ) : (
                        <div className="text-[15px] font-bold text-white">{c.value}</div>
                      )}
                      <div className="text-[11px] text-white/35 mt-0.5">{c.sub}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* App download */}
              <div className="rounded-2xl p-6"
                style={{ background: "rgba(252,11,5,0.08)", border: "1px solid rgba(252,11,5,0.2)" }}>
                <div className="text-[13px] font-bold text-white mb-1">Ready to get started?</div>
                <p className="text-[12px] text-white/50 mb-4 leading-relaxed">Download the app that fits your role and start moving containers today.</p>
                <div className="flex flex-col gap-2">
                  <a href="#" className="inline-flex items-center gap-2.5 rounded-xl h-[46px] px-4 bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 transition-colors duration-200">
                    <svg width="22" height="22" viewBox="0 0 384 512" fill="#fff" className="shrink-0"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                    <span className="text-white text-left"><span className="block text-[8px] opacity-70">Download on the</span><span className="block text-[13px] font-semibold">App Store</span></span>
                  </a>
                  <a href="#" className="inline-flex items-center gap-2.5 rounded-xl h-[46px] px-4 bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 transition-colors duration-200">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" className="shrink-0"><path d="M3.18 23.76a2 2 0 0 0 2.92-.02l.02-.02 9.2-9.2-2.12-2.12-10.02 10a2 2 0 0 0 0 3.36zM20.68 10.04l-2.76-1.6-2.44 2.44 2.44 2.44 2.78-1.6a1.4 1.4 0 0 0 0-2.44l-.02-.24zM2.1.28A2 2 0 0 0 2 1v22a2 2 0 0 0 .1.72l.02.02L13.26 12.5 2.12.26 2.1.28zM6.12.28l9.2 9.2-2.12 2.12L4.94.26A2 2 0 0 1 6.12.28z"/></svg>
                    <span className="text-white text-left"><span className="block text-[8px] uppercase tracking-[0.12em] opacity-70">Get it on</span><span className="block text-[13px] font-semibold">Google Play</span></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="relative py-24 grid-bg">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <h2 className="display text-white" style={{ fontSize: "clamp(30px, 4.5vw, 50px)" }}>FAQ</h2>
            <p className="mt-3 text-white/50 max-w-lg mx-auto" style={{ fontSize: 16 }}>
              Whether you&apos;re curious about DrayGo&apos;s features, pricing, or how it works — we&apos;ve got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-8 reveal">
            {FAQS.map((faq, i) => (
              <button key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="rounded-2xl px-6 py-5 text-left transition-all duration-200 w-full"
                style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${openFaq === i ? "rgba(252,11,5,0.4)" : "rgba(255,255,255,0.08)"}` }}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[15px] font-semibold text-white">{faq.q}</span>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ border: "1.5px solid rgba(255,255,255,0.25)" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      {openFaq === i
                        ? <line x1="5" y1="12" x2="19" y2="12"/>
                        : <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>
                      }
                    </svg>
                  </div>
                </div>
                {openFaq === i && (
                  <p className="mt-3 text-[13.5px] text-white/55 leading-relaxed">{faq.a}</p>
                )}
              </button>
            ))}
          </div>

          <div className="rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 reveal"
            style={{ background: "#fc0b05" }}>
            <div>
              <div className="text-[18px] font-bold text-white mb-1">Still have questions?</div>
              <div className="text-[13px] text-white/80">Can&apos;t find what you&apos;re looking for? Reach us directly.</div>
            </div>
            <a href="mailto:info@draygo.net"
              className="rounded-xl px-6 py-3 text-[14px] font-bold text-[#fc0b05] bg-white shrink-0 transition-all hover:scale-[1.03] whitespace-nowrap">
              Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
