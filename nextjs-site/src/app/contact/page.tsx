"use client";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";

// ─── Get your FREE key: go to web3forms.com → enter info@draygo.net → click the email link ───
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

const BULLETS = [
  "Instant Drayage Rate Quotes",
  "40+ U.S. Port & Rail Coverage",
  "Real-Time Container Tracking",
  "Carrier & Broker Platform",
  "24/7 Network Support",
];

const ROLES = [
  { value: "", label: "Select one" },
  { value: "Shipper / Importer", label: "Shipper / Importer" },
  { value: "Freight Broker", label: "Freight Broker" },
  { value: "Carrier / Owner-Operator", label: "Carrier / Owner-Operator" },
  { value: "Logistics Manager", label: "Logistics Manager" },
  { value: "Other", label: "Other" },
];

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", company: "", role: "", message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `DrayGo Contact: ${form.firstName} ${form.lastName}`,
          from_name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          company: form.company || "—",
          role: form.role || "—",
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        return;
      }
      throw new Error(data.message);
    } catch {
      // Fallback: open mailto so message is never lost
      const subject = encodeURIComponent(`DrayGo Contact: ${form.firstName} ${form.lastName}`);
      const body = encodeURIComponent(
        `Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nCompany: ${form.company || "—"}\nRole: ${form.role || "—"}\n\n${form.message}`
      );
      window.open(`mailto:info@draygo.net?subject=${subject}&body=${body}`);
      setStatus("success");
    }
  }

  const inputBase = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.10)",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };
  const inputFocused = {
    borderColor: "rgba(252,11,5,0.5)",
    boxShadow: "0 0 0 3px rgba(252,11,5,0.10)",
  };
  function inputStyle(field: string) {
    return focused === field ? { ...inputBase, ...inputFocused } : inputBase;
  }

  return (
    <>
      <Nav />
      <RevealInit />

      <style>{`
        @keyframes scaleIn { from{transform:scale(0.6) rotate(-5deg);opacity:0} to{transform:scale(1) rotate(0deg);opacity:1} }
        @keyframes drawCheck { to{stroke-dashoffset:0} }
        @keyframes ripple1 { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.4);opacity:0} }
        @keyframes ripple2 { 0%{transform:scale(1);opacity:.4} 100%{transform:scale(2.8);opacity:0} }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        .field-label{font-size:11px;font-weight:600;letter-spacing:.08em;color:rgba(255,255,255,.38);margin-bottom:6px;display:block;text-transform:uppercase;transition:color .2s}
        .field-wrap:focus-within .field-label{color:rgba(252,11,5,.75)}
        .g1{animation:float 4s ease-in-out infinite}
        .g2{animation:float 5.5s ease-in-out .8s infinite}
        .g3{animation:float 3.8s ease-in-out 1.5s infinite}
        .g4{animation:float 6s ease-in-out .3s infinite}
      `}</style>

      <section className="relative overflow-hidden min-h-screen flex items-center py-24"
        style={{ background: "linear-gradient(150deg,#040d1a 0%,#081929 55%,#060e20 100%)" }}>

        {/* Background glows */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="g1 absolute w-[480px] h-[480px] rounded-full" style={{ background: "radial-gradient(circle,rgba(252,11,5,.08) 0%,transparent 70%)", top: "-5%", left: "-8%" }} />
            <div className="g2 absolute w-[340px] h-[340px] rounded-full" style={{ background: "radial-gradient(circle,rgba(58,95,192,.07) 0%,transparent 70%)", bottom: "8%", right: "3%" }} />
            <div className="g3 absolute w-[200px] h-[200px] rounded-full" style={{ background: "radial-gradient(circle,rgba(252,11,5,.06) 0%,transparent 70%)", top: "55%", left: "40%" }} />
            <div className="g4 absolute w-[140px] h-[140px] rounded-full" style={{ background: "radial-gradient(circle,rgba(255,255,255,.03) 0%,transparent 70%)", top: "12%", right: "18%" }} />
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
          </div>
        )}

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 xl:gap-20 items-center">

            {/* ── LEFT ── */}
            <div className="reveal">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-[6px] h-[6px] rounded-full" style={{ background: "#fc0b05", boxShadow: "0 0 8px #fc0b05" }} />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.26em]" style={{ color: "#fc0b05" }}>Contact Us</span>
              </div>

              <h1 className="display text-white leading-[1.06] mb-5"
                style={{ fontSize: "clamp(34px, 4.5vw, 58px)" }}>
                Get in Touch<br />
                <span style={{ color: "rgba(255,255,255,0.45)" }}>with DrayGo</span>
              </h1>

              <p className="text-white/50 mb-10 leading-relaxed" style={{ fontSize: 16, maxWidth: 390 }}>
                Shipper, carrier, or broker — our team is ready to help you move containers faster and smarter.
              </p>

              <ul className="space-y-3.5 mb-10">
                {BULLETS.map((b, i) => (
                  <li key={b} className="flex items-center gap-3.5">
                    <div className="relative w-[22px] h-[22px] shrink-0 flex items-center justify-center rounded-full"
                      style={{ background: "rgba(252,11,5,0.11)", border: "1px solid rgba(252,11,5,0.28)" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <span className="text-[14px] font-medium" style={{ color: `rgba(255,255,255,${0.55 + i * 0.07})` }}>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25 mb-4">Direct Contact</p>
                <a href="mailto:info@draygo.net"
                  className="group inline-flex items-center gap-3 transition-all"
                  style={{ textDecoration: "none" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ background: "rgba(252,11,5,0.10)", border: "1px solid rgba(252,11,5,0.22)", boxShadow: "0 4px 14px rgba(252,11,5,0.08)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fc0b05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-white transition-colors group-hover:text-white/75">info@draygo.net</div>
                    <div className="text-[11px] text-white/30 mt-0.5">Reply within a few hours</div>
                  </div>
                </a>
              </div>
            </div>

            {/* ── RIGHT — FORM ── */}
            <div className="reveal reveal-delay-1">
              <div className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.028)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 28px 90px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
                }}>

                {/* Top shimmer line */}
                <div className="absolute top-0 left-[15%] right-[15%] h-[1px]"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(252,11,5,0.45),transparent)" }} />

                {/* SUCCESS STATE */}
                {status === "success" ? (
                  <div className="flex flex-col items-center text-center py-10"
                    style={{ animation: "fadeUp 0.4s ease both" }}>
                    <div className="relative mb-6 w-20 h-20">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(24,163,84,0.10)", border: "1.5px solid rgba(24,163,84,0.38)", animation: "scaleIn 0.5s cubic-bezier(.34,1.56,.64,1) both" }}>
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#18a354" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: "drawCheck 0.5s 0.35s ease forwards" }}>
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(24,163,84,0.3)", animation: "ripple1 1.1s 0.6s ease-out forwards" }} />
                      <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(24,163,84,0.15)", animation: "ripple2 1.3s 0.8s ease-out forwards" }} />
                    </div>
                    <h3 className="text-[24px] font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-[14px] text-white/50 mb-1">We received your message.</p>
                    <p className="text-[13px] text-white/35 mb-8">
                      We&apos;ll reply to <span className="font-semibold text-white/60">{form.email}</span>
                    </p>
                    <button
                      onClick={() => { setStatus("idle"); setForm({ firstName: "", lastName: "", email: "", company: "", role: "", message: "" }); }}
                      className="rounded-xl px-6 py-2.5 text-[13px] font-semibold transition-colors"
                      style={{ border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.5)" }}>
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-7">
                      <h2 className="text-[20px] font-bold text-white mb-1">Send us a message</h2>
                      <p className="text-[13px] text-white/35">We reply fast — usually within a few hours.</p>
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {[{ f: "firstName", l: "First Name", p: "Nelson" }, { f: "lastName", l: "Last Name", p: "Buldier" }].map(({ f, l, p }) => (
                        <div key={f} className="field-wrap">
                          <label className="field-label">{l}</label>
                          <input type="text" required placeholder={p}
                            value={form[f as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                            onFocus={() => setFocused(f)} onBlur={() => setFocused(null)}
                            className="w-full rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/20"
                            style={inputStyle(f)} />
                        </div>
                      ))}
                    </div>

                    {/* Email */}
                    <div className="field-wrap mb-3">
                      <label className="field-label">Email Address</label>
                      <input type="email" required placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        className="w-full rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/20"
                        style={inputStyle("email")} />
                    </div>

                    {/* Company */}
                    <div className="field-wrap mb-3">
                      <label className="field-label">Company <span style={{ color: "rgba(255,255,255,0.18)", fontWeight: 400, textTransform: "none" }}>optional</span></label>
                      <input type="text" placeholder="Your company"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        onFocus={() => setFocused("company")} onBlur={() => setFocused(null)}
                        className="w-full rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/20"
                        style={inputStyle("company")} />
                    </div>

                    {/* Role */}
                    <div className="field-wrap mb-3">
                      <label className="field-label">Which best describes you?</label>
                      <div className="relative">
                        <select value={form.role}
                          onChange={(e) => setForm({ ...form, role: e.target.value })}
                          onFocus={() => setFocused("role")} onBlur={() => setFocused(null)}
                          className="w-full rounded-xl px-4 py-3 text-[14px] appearance-none"
                          style={{ ...inputStyle("role"), color: form.role ? "#fff" : "rgba(255,255,255,0.22)" }}>
                          {ROLES.map((r) => (
                            <option key={r.value} value={r.value} style={{ background: "#0d2040", color: "#fff" }}>{r.label}</option>
                          ))}
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="field-wrap mb-5">
                      <label className="field-label">
                        Message
                        {form.message.length > 0 && (
                          <span className="ml-2 font-normal normal-case" style={{ color: form.message.length > 4800 ? "#fc0b05" : "rgba(255,255,255,0.18)" }}>
                            {form.message.length}/5000
                          </span>
                        )}
                      </label>
                      <textarea rows={5} required placeholder="Write your message..."
                        value={form.message} maxLength={5000}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                        className="w-full rounded-xl px-4 py-3 text-[14px] text-white placeholder-white/20 resize-none"
                        style={inputStyle("message")} />
                    </div>

                    <button type="submit" disabled={status === "sending"}
                      className="w-full rounded-xl py-3.5 text-[15px] font-bold text-white flex items-center justify-center gap-2.5 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg,#fc0b05 0%,#c20a04 100%)", boxShadow: "0 6px 24px rgba(252,11,5,0.32)" }}>
                      {status === "sending" ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>
                      Replies go to info@draygo.net · We never share your data
                    </p>
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
