"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { asset } from "@/lib/site";
import Calendar from "./Calendar";
import {
  MEETING, LIME, LIME_TEXT, BG, CARD, CARD_2, BORDER, TXT, TXT_MUTED, TXT_FAINT,
  COUNTRIES, TIMEZONES, type Country,
  detectTimezone, generateTimeSlots, formatLongDate, formatISODate,
} from "./data";

type Step = "datetime" | "details" | "done";

interface Details {
  name: string;
  email: string;
  guests: string[];
  message: string;
  country: Country;
  phone: string;
  website: string;
}

/* ── Shared icons ── */
const Icon = ({ d, size = 20 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {d.split("|").map((p, i) => <path key={i} d={p} />)}
  </svg>
);
const I = {
  clock: "M12 6v6l4 2|M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
  cal: "M8 2v4|M16 2v4|M3 10h18|M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z|M2 12h20|M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20z",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2|M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  back: "M19 12H5|M12 19l-7-7 7-7",
  check: "M20 6L9 17l-5-5",
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10",
};

const label: React.CSSProperties = { display: "block", fontSize: 13.5, fontWeight: 600, color: TXT, marginBottom: 8 };
const field: React.CSSProperties = {
  width: "100%", borderRadius: 12, border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.05)",
  padding: "13px 15px", fontSize: 14.5, color: TXT, outline: "none", transition: "border-color .18s, box-shadow .18s",
};
function focusOn(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = LIME;
  e.currentTarget.style.boxShadow = `0 0 0 4px ${LIME}22`;
}
function focusOff(e: React.FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = BORDER;
  e.currentTarget.style.boxShadow = "none";
}

export default function BookingFlow() {
  const [step, setStep] = useState<Step>("datetime");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [timezone, setTimezone] = useState("America/New_York");
  const [details, setDetails] = useState<Details | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const slots = useMemo(() => generateTimeSlots(), []);
  useEffect(() => { setTimezone(detectTimezone()); }, []);

  async function submit(d: Details) {
    setSubmitting(true);
    setDetails(d);
    // TODO: POST booking to API — { ...d, date: formatISODate(date), time, timezone }.
    await new Promise((r) => setTimeout(r, 1100));
    setSubmitting(false);
    setStep("done");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ───────── Confirmation ───────── */
  if (step === "done" && date && time && details) {
    const rows = [
      { d: I.user, v: details.name },
      { d: I.cal, v: formatISODate(date) },
      { d: I.clock, v: time },
      { d: I.globe, v: timezone },
    ];
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={{ maxWidth: 520, margin: "0 auto" }}>
        <div style={{ overflow: "hidden", borderRadius: 24, background: CARD, boxShadow: `0 40px 90px rgba(0,0,0,0.55), 0 0 80px ${LIME}18`, border: `1px solid ${BORDER}` }}>
          <div style={{ background: BG, padding: "26px 32px", textAlign: "center", borderBottom: `1px solid ${BORDER}` }}>
            <img src={asset("/logo-draygo.png")} alt="DrayGo" style={{ height: 34, width: "auto", display: "inline-block" }} />
          </div>
          <div style={{ padding: "36px 32px", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${LIME}1f`, border: `1px solid ${LIME}55`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: LIME }}>
              <Icon d={I.check} size={34} />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: TXT }}>Your Meeting is Pending</h2>
            <p style={{ marginTop: 12, color: TXT_MUTED, lineHeight: 1.6, fontSize: 14.5 }}>
              Thank you for scheduling. Your request is <b style={{ color: LIME }}>pending approval</b>. You&apos;ll receive a confirmation email once approved.
            </p>
            <div style={{ marginTop: 30, textAlign: "left" }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: TXT, paddingBottom: 12, borderBottom: `1px solid ${BORDER}` }}>Meeting Details</h3>
              {rows.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", color: LIME }}>
                  <Icon d={r.d} />
                  <span style={{ color: TXT, fontWeight: 600, fontSize: 15 }}>{r.v}</span>
                </div>
              ))}
            </div>
            <Link href="/" style={{ marginTop: 28, width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 12, background: LIME, color: LIME_TEXT, padding: "14px 22px", fontSize: 15, fontWeight: 700, textDecoration: "none", boxShadow: `0 14px 30px -10px ${LIME}70` }}>
              <Icon d={I.home} size={18} /> Return to Home Page
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ───────── Steps 1 & 2 (two-pane card) ───────── */
  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", overflow: "hidden", borderRadius: 24, background: CARD, boxShadow: "0 40px 90px rgba(0,0,0,0.55)", border: `1px solid ${BORDER}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,330px) 1fr" }} className="bm-grid">
        {/* Summary */}
        <div style={{ background: CARD_2, borderRight: `1px solid ${BORDER}`, padding: "34px 30px" }} className="bm-summary">
          {step === "details" && (
            <button
              onClick={() => setStep("datetime")}
              aria-label="Back"
              style={{ width: 44, height: 44, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.04)", color: TXT, cursor: "pointer" }}
            >
              <Icon d={I.back} />
            </button>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ width: 30, height: 30, borderRadius: 9, background: LIME, color: LIME_TEXT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15 }}>D</span>
            <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: TXT_FAINT }}>{MEETING.org} App</span>
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", color: TXT, lineHeight: 1.1 }}>{MEETING.title}</h1>
          <p style={{ marginTop: 8, color: TXT_MUTED, fontSize: 14.5 }}>{MEETING.subtitle}</p>

          <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 14 }}>
            <SummaryRow icon={I.clock} text={MEETING.durationLabel} />
            {date && <SummaryRow icon={I.cal} text={formatISODate(date)} />}
            {step === "details" && time && <SummaryRow icon={I.clock} text={time} />}
            <SummaryRow icon={I.globe} text={timezone} />
          </div>

          <p style={{ marginTop: 34, fontSize: 12, color: "rgba(255,255,255,0.30)", lineHeight: 1.6 }} className="bm-hide-mobile">
            Meet the {MEETING.org} team to see how our drayage platform can move your freight faster.
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: "34px 32px", minWidth: 0 }}>
          <AnimatePresence mode="wait">
            {step === "datetime" ? (
              <motion.div key="dt" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: TXT, marginBottom: 22 }}>Select a Date &amp; Time</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 250px", gap: 30 }} className="bm-dt-grid">
                  <div style={{ minWidth: 0 }}>
                    <Calendar selected={date} onSelect={(d) => { setDate(d); setTime(null); }} />
                    <div style={{ marginTop: 26 }}>
                      <label style={label}>Timezone</label>
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: TXT_FAINT, pointerEvents: "none" }}><Icon d={I.globe} size={17} /></span>
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          onFocus={focusOn} onBlur={focusOff}
                          className="bm-select"
                          style={{ ...field, paddingLeft: 42, paddingRight: 38, appearance: "none", cursor: "pointer",
                            backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23ffffff88'%3e%3cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3e%3c/svg%3e\")",
                            backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", backgroundSize: "16px" }}
                        >
                          {TIMEZONES.map((tz) => <option key={tz} value={tz} style={{ background: CARD, color: TXT }}>{tz.replace(/_/g, " ")}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Slots */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: TXT, marginBottom: 12, minHeight: 22 }}>
                      {date ? formatLongDate(date) : "Pick a day to see times"}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 430, overflowY: "auto", paddingRight: 4, opacity: date ? 1 : 0.4, pointerEvents: date ? "auto" : "none" }} className="bm-slots">
                      {date
                        ? slots.map((slot) => {
                            const active = time === slot;
                            return (
                              <button
                                key={slot}
                                onClick={() => { setTime(slot); setTimeout(() => setStep("details"), 170); }}
                                style={{
                                  width: "100%", borderRadius: 12, padding: "13px 14px", fontSize: 14, fontWeight: 700, cursor: "pointer",
                                  transition: "all .18s ease",
                                  border: active ? "1px solid transparent" : `1px solid ${BORDER}`,
                                  background: active ? LIME : "rgba(255,255,255,0.04)",
                                  color: active ? LIME_TEXT : "rgba(255,255,255,0.85)",
                                  boxShadow: active ? `0 10px 24px -8px ${LIME}70` : "none",
                                }}
                                onMouseEnter={(e) => { if (active) return; e.currentTarget.style.borderColor = LIME; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                                onMouseLeave={(e) => { if (active) return; e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.transform = "translateY(0)"; }}
                              >
                                {slot}
                              </button>
                            );
                          })
                        : [0, 1, 2, 3, 4].map((i) => <div key={i} style={{ height: 46, borderRadius: 12, background: "rgba(255,255,255,0.04)" }} />)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="dets" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
                <DetailsForm submitting={submitting} onSubmit={submit} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .bm-field::placeholder, .bm-area::placeholder { color: rgba(255,255,255,0.32); }
        .bm-slots::-webkit-scrollbar { width: 6px; }
        .bm-slots::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.14); border-radius: 3px; }
        @media (max-width: 860px) {
          .bm-grid { grid-template-columns: 1fr !important; }
          .bm-summary { border-right: none !important; border-bottom: 1px solid ${BORDER} !important; }
          .bm-dt-grid { grid-template-columns: 1fr !important; }
          .bm-slots { max-height: none !important; }
          .bm-hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function SummaryRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, color: LIME }}>
      <Icon d={icon} size={19} />
      <span style={{ color: TXT, fontWeight: 600, fontSize: 14.5 }}>{text}</span>
    </div>
  );
}

/* ───────── Details form (step 2) ───────── */
function DetailsForm({ submitting, onSubmit }: { submitting: boolean; onSubmit: (d: Details) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ERR = "#ff6b62";

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!emailRe.test(email)) e.email = "Enter a valid email";
    if (!phone.trim()) e.phone = "Phone number is required";
    guests.forEach((g, i) => { if (g.trim() && !emailRe.test(g)) e[`g${i}`] = "Invalid email"; });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handle(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit({
      name: name.trim(), email: email.trim(),
      guests: guests.map((g) => g.trim()).filter(Boolean),
      message: message.trim(), country, phone: phone.trim(), website: website.trim(),
    });
  }

  const errText = (msg?: string) => msg ? <p style={{ marginTop: 6, fontSize: 12, color: ERR }}>{msg}</p> : null;

  return (
    <form onSubmit={handle} noValidate style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: TXT }}>Enter Your Details</h2>

      <div>
        <label style={label}>Name <span style={{ color: ERR }}>*</span></label>
        <input className="bm-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name"
          onFocus={focusOn} onBlur={focusOff} style={{ ...field, borderColor: errors.name ? ERR : BORDER }} />
        {errText(errors.name)}
      </div>

      <div>
        <label style={label}>Email <span style={{ color: ERR }}>*</span></label>
        <input className="bm-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
          onFocus={focusOn} onBlur={focusOff} style={{ ...field, borderColor: errors.email ? ERR : BORDER }} />
        {errText(errors.email)}
      </div>

      {/* Guests */}
      <div>
        {guests.map((g, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <label style={label}>Guest {i + 1}</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input className="bm-field" type="email" value={g} placeholder="guest@email.com"
                onChange={(e) => { const n = [...guests]; n[i] = e.target.value; setGuests(n); }}
                onFocus={focusOn} onBlur={focusOff} style={{ ...field, borderColor: errors[`g${i}`] ? ERR : BORDER }} />
              <button type="button" onClick={() => setGuests(guests.filter((_, idx) => idx !== i))} aria-label="Remove guest"
                style={{ flexShrink: 0, width: 48, borderRadius: 12, border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.04)", color: TXT_MUTED, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            {errText(errors[`g${i}`])}
          </div>
        ))}
        <button type="button" onClick={() => setGuests([...guests, ""])}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: `1px solid rgba(255,255,255,0.22)`, background: "transparent", padding: "9px 18px", fontSize: 13.5, fontWeight: 600, color: TXT, cursor: "pointer" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Guests
        </button>
      </div>

      <div>
        <label style={label}>Message</label>
        <textarea className="bm-area" value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
          placeholder="Please share anything that will help prepare for our meeting."
          onFocus={focusOn} onBlur={focusOff} style={{ ...field, resize: "none", fontFamily: "inherit" }} />
      </div>

      {/* Phone */}
      <div>
        <label style={label}>Phone Number <span style={{ color: ERR }}>*</span></label>
        <div style={{ display: "flex", borderRadius: 12, border: `1px solid ${errors.phone ? ERR : BORDER}`, background: "rgba(255,255,255,0.05)", overflow: "visible", position: "relative" }}>
          <div style={{ position: "relative" }}>
            <button type="button" onClick={() => setCountryOpen((o) => !o)}
              style={{ height: "100%", display: "flex", alignItems: "center", gap: 6, padding: "0 12px", borderRight: `1px solid ${BORDER}`, background: "transparent", cursor: "pointer", color: TXT }}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>{country.flag}</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{country.dial}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.4" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            {countryOpen && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setCountryOpen(false)} />
                <div style={{ position: "absolute", zIndex: 20, top: "calc(100% + 8px)", left: 0, width: 260, maxHeight: 256, overflowY: "auto", borderRadius: 12, border: `1px solid ${BORDER}`, background: CARD, boxShadow: "0 24px 48px rgba(0,0,0,0.5)", padding: 4 }}>
                  {COUNTRIES.map((c) => (
                    <button key={c.code} type="button" onClick={() => { setCountry(c); setCountryOpen(false); }}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, border: "none", background: "transparent", textAlign: "left", fontSize: 14, color: TXT, cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <span style={{ fontSize: 18 }}>{c.flag}</span>
                      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                      <span style={{ color: TXT_FAINT }}>{c.dial}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <input className="bm-field" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number"
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", padding: "13px 15px", fontSize: 14.5, color: TXT, minWidth: 0 }} />
        </div>
        {errText(errors.phone)}
      </div>

      <div>
        <label style={label}>Your Website</label>
        <input className="bm-field" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Enter your website URL"
          onFocus={focusOn} onBlur={focusOff} style={field} />
      </div>

      <p style={{ fontSize: 13.5, color: TXT_MUTED }}>
        By proceeding, you agree to <b style={{ color: TXT }}>DrayGo&apos;s</b>{" "}
        <Link href="/terms" style={{ color: LIME, fontWeight: 600 }}>Terms</Link> &amp;{" "}
        <Link href="/privacy" style={{ color: LIME, fontWeight: 600 }}>Privacy Policy</Link>.
      </p>

      <button type="submit" disabled={submitting}
        style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 12, background: LIME, color: LIME_TEXT, padding: "16px 22px", fontSize: 15.5, fontWeight: 800, border: "none", cursor: submitting ? "default" : "pointer", opacity: submitting ? 0.7 : 1, boxShadow: `0 16px 34px -12px ${LIME}80` }}>
        {submitting ? (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
              <circle cx="12" cy="12" r="10" stroke="rgba(10,14,7,0.3)" strokeWidth="4" />
              <path d="M4 12a8 8 0 018-8" stroke={LIME_TEXT} strokeWidth="4" strokeLinecap="round" />
            </svg>
            Scheduling…
          </>
        ) : "Schedule"}
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
