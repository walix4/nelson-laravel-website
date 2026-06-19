"use client";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { asset } from "@/lib/site";

const PORTS = ["Los Angeles","Long Beach","New York","Savannah","Houston","Seattle","Miami","Chicago"];

export default function SubmitContainerPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deliveryType, setDeliveryType] = useState<"port-to-port"|"port-to-door">("port-to-port");
  const [form, setForm] = useState({
    containerNumber: "", containerType: "40ft Dry", sealNumber: "",
    weight: "", commodity: "", freeTime: "4",
    originPort: "Los Angeles", destPort: "Long Beach", deliveryAddress: "",
    city: "", state: "", zip: "",
    pickupDate: "", deliveryDate: "", railRequired: false,
    shipperCompany: "", shipperContact: "", shipperEmail: "", shipperPhone: "",
    consigneeCompany: "", consigneeContact: "", consigneeEmail: "", consigneeAddress: "",
    carrierMC: "", nraNumber: "",
  });

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const txHash = "0x3a7f" + (form.containerNumber || "c8d2").replace(/[^a-zA-Z0-9]/g,"").toLowerCase().slice(0,8).padEnd(8,"0") + "1e9b4a6fc8d2";
  const contractId = "SC-2026-" + String((form.containerNumber.length * 7 + 482910) % 900000 + 100000);

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none",
    boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 6,
  };

  const steps = ["Container","Route","Parties","Review"];

  return (
    <>
      <Nav />
      <style>{`
        .submit-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .route-toggle{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .cta-cards{display:grid;grid-template-columns:1fr 1fr;gap:20px}
        .three-col{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
        @media(max-width:768px){
          .submit-grid{grid-template-columns:1fr!important}
          .route-toggle{grid-template-columns:1fr!important}
          .cta-cards{grid-template-columns:1fr!important}
          .three-col{grid-template-columns:1fr!important}
        }
        input:focus,select:focus,textarea:focus{border-color:rgba(26,110,212,0.8)!important;outline:none}
        input[type=date]::-webkit-calendar-picker-indicator{filter:invert(1);opacity:0.5}
        @keyframes scaleIn{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .check-anim{animation:scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)}
        .pulse-dot{animation:pulse 2s infinite}
      `}</style>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg,#060d1a 0%,#0B2D5C 100%)", padding: "80px 24px 64px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "5%", top: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,91,255,0.14),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "5%", bottom: "0%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(26,110,212,0.15),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,91,255,0.15)", border: "1px solid rgba(99,91,255,0.4)", borderRadius: 6, padding: "5px 14px", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a78bfa", marginBottom: 24 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#a78bfa", display: "inline-block" }} />
            Blockchain Submission
          </div>
          <h1 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, color: "#fff", lineHeight: 1.05, margin: "0 0 20px" }}>
            Submit Your Container<br />
            <span style={{ color: "#7dd3fc" }}>to the Blockchain</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 36px" }}>
            One submission auto-generates your smart contract, BOL, invoice, and ISF filing — tamper-proof on-chain.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {["⚡ Instant Smart Contract","🔒 Blockchain Record","📄 Auto Paperwork"].map(c => (
              <div key={c} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, padding: "8px 18px", fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM AREA */}
      <section style={{ background: "#08192b", padding: "56px 24px 80px", minHeight: "60vh" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>

          {!submitted ? (
            <>
              {/* Step indicator */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 48 }}>
                {steps.map((s, i) => {
                  const n = i + 1;
                  const done = step > n;
                  const active = step === n;
                  return (
                    <div key={s} style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: done ? "#27b30a" : active ? "#1a6ed4" : "rgba(255,255,255,0.08)",
                          border: done ? "2px solid #27b30a" : active ? "2px solid #1a6ed4" : "2px solid rgba(255,255,255,0.2)",
                          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                        }}>
                          {done
                            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            : <span style={{ fontSize: 13, fontWeight: 700, color: active ? "#fff" : "rgba(255,255,255,0.4)" }}>{n}</span>
                          }
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: active ? "#7dd3fc" : done ? "#27b30a" : "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>{s}</span>
                      </div>
                      {i < 3 && <div style={{ width: 60, height: 2, background: done ? "#27b30a" : "rgba(255,255,255,0.1)", margin: "0 8px 22px", transition: "all 0.2s" }} />}
                    </div>
                  );
                })}
              </div>

              {/* Card */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "40px 44px" }}>

                {/* STEP 1 */}
                {step === 1 && (
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Container Details</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 32px" }}>Enter the physical container information.</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <label style={labelStyle}>Container Number</label>
                        <input style={inputStyle} placeholder="MSCU 123456-7" value={form.containerNumber} onChange={e => set("containerNumber", e.target.value)} />
                      </div>
                      <div className="submit-grid">
                        <div>
                          <label style={labelStyle}>Container Type</label>
                          <select style={inputStyle} value={form.containerType} onChange={e => set("containerType", e.target.value)}>
                            {["20ft Dry","40ft Dry","40ft HC","Reefer","Flat Rack"].map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>Seal Number</label>
                          <input style={inputStyle} placeholder="SL-88291" value={form.sealNumber} onChange={e => set("sealNumber", e.target.value)} />
                        </div>
                      </div>
                      <div className="submit-grid">
                        <div>
                          <label style={labelStyle}>Gross Weight (lbs)</label>
                          <input style={inputStyle} placeholder="44,000" value={form.weight} onChange={e => set("weight", e.target.value)} />
                        </div>
                        <div>
                          <label style={labelStyle}>Commodity</label>
                          <input style={inputStyle} placeholder="Electronics" value={form.commodity} onChange={e => set("commodity", e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>Free Time Allowed (days)</label>
                        <input style={{ ...inputStyle, maxWidth: 200 }} type="number" placeholder="4" value={form.freeTime} onChange={e => set("freeTime", e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Route Details</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 28px" }}>Choose your delivery type and route.</p>

                    {/* Delivery type toggle */}
                    <div className="route-toggle" style={{ marginBottom: 28 }}>
                      {[
                        { val: "port-to-port" as const, label: "Port to Port", desc: "Container moves between two port terminals", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10V7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v3"/><path d="M2 10h20"/><path d="M6 10v8"/><path d="M18 10v8"/><path d="M3 18h18"/></svg> },
                        { val: "port-to-door" as const, label: "Port to Door", desc: "Container delivered to final destination address", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
                      ].map(opt => (
                        <div key={opt.val} onClick={() => setDeliveryType(opt.val)} style={{
                          background: deliveryType === opt.val ? "rgba(26,110,212,0.15)" : "rgba(255,255,255,0.03)",
                          border: deliveryType === opt.val ? "2px solid #1a6ed4" : "2px solid rgba(255,255,255,0.1)",
                          borderRadius: 14, padding: "20px 22px", cursor: "pointer", transition: "all 0.18s",
                        }}>
                          <div style={{ color: deliveryType === opt.val ? "#7dd3fc" : "rgba(255,255,255,0.5)", marginBottom: 10 }}>{opt.icon}</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: deliveryType === opt.val ? "#fff" : "rgba(255,255,255,0.7)", marginBottom: 4 }}>{opt.label}</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{opt.desc}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <label style={labelStyle}>Origin Port</label>
                        <select style={inputStyle} value={form.originPort} onChange={e => set("originPort", e.target.value)}>
                          {PORTS.map(p => <option key={p}>{p}</option>)}
                        </select>
                      </div>
                      {deliveryType === "port-to-port" ? (
                        <div>
                          <label style={labelStyle}>Destination Port</label>
                          <select style={inputStyle} value={form.destPort} onChange={e => set("destPort", e.target.value)}>
                            {PORTS.map(p => <option key={p}>{p}</option>)}
                          </select>
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                          <div>
                            <label style={labelStyle}>Delivery Address</label>
                            <input style={inputStyle} placeholder="123 Warehouse Blvd" value={form.deliveryAddress} onChange={e => set("deliveryAddress", e.target.value)} />
                          </div>
                          <div className="three-col">
                            <div>
                              <label style={labelStyle}>City</label>
                              <input style={inputStyle} placeholder="Chicago" value={form.city} onChange={e => set("city", e.target.value)} />
                            </div>
                            <div>
                              <label style={labelStyle}>State</label>
                              <input style={inputStyle} placeholder="IL" value={form.state} onChange={e => set("state", e.target.value)} />
                            </div>
                            <div>
                              <label style={labelStyle}>ZIP</label>
                              <input style={inputStyle} placeholder="60601" value={form.zip} onChange={e => set("zip", e.target.value)} />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="submit-grid">
                        <div>
                          <label style={labelStyle}>Pickup Date</label>
                          <input type="date" style={inputStyle} value={form.pickupDate} onChange={e => set("pickupDate", e.target.value)} />
                        </div>
                        <div>
                          <label style={labelStyle}>Estimated Delivery Date</label>
                          <input type="date" style={inputStyle} value={form.deliveryDate} onChange={e => set("deliveryDate", e.target.value)} />
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "14px 18px" }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Rail Required?</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Intermodal rail segment needed</div>
                        </div>
                        <div onClick={() => set("railRequired", !form.railRequired)} style={{
                          width: 44, height: 24, borderRadius: 12, cursor: "pointer", transition: "background 0.2s", position: "relative",
                          background: form.railRequired ? "#1a6ed4" : "rgba(255,255,255,0.15)",
                        }}>
                          <div style={{ position: "absolute", width: 18, height: 18, borderRadius: "50%", background: "#fff", top: 3, left: form.railRequired ? 23 : 3, transition: "left 0.2s" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Parties</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 28px" }}>Shipper, consignee, and carrier information.</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1a6ed4", paddingBottom: 4, borderBottom: "1px solid rgba(26,110,212,0.25)" }}>Shipper</div>
                      <div className="submit-grid">
                        <div>
                          <label style={labelStyle}>Company Name</label>
                          <input style={inputStyle} placeholder="ACME Imports LLC" value={form.shipperCompany} onChange={e => set("shipperCompany", e.target.value)} />
                        </div>
                        <div>
                          <label style={labelStyle}>Contact Name</label>
                          <input style={inputStyle} placeholder="Jane Smith" value={form.shipperContact} onChange={e => set("shipperContact", e.target.value)} />
                        </div>
                      </div>
                      <div className="submit-grid">
                        <div>
                          <label style={labelStyle}>Email</label>
                          <input type="email" style={inputStyle} placeholder="jane@acme.com" value={form.shipperEmail} onChange={e => set("shipperEmail", e.target.value)} />
                        </div>
                        <div>
                          <label style={labelStyle}>Phone</label>
                          <input style={inputStyle} placeholder="+1 (555) 000-0000" value={form.shipperPhone} onChange={e => set("shipperPhone", e.target.value)} />
                        </div>
                      </div>

                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1a6ed4", paddingTop: 8, paddingBottom: 4, borderBottom: "1px solid rgba(26,110,212,0.25)" }}>Consignee</div>
                      <div className="submit-grid">
                        <div>
                          <label style={labelStyle}>Company Name</label>
                          <input style={inputStyle} placeholder="Midwest Distribution Co." value={form.consigneeCompany} onChange={e => set("consigneeCompany", e.target.value)} />
                        </div>
                        <div>
                          <label style={labelStyle}>Contact Name</label>
                          <input style={inputStyle} placeholder="John Doe" value={form.consigneeContact} onChange={e => set("consigneeContact", e.target.value)} />
                        </div>
                      </div>
                      <div className="submit-grid">
                        <div>
                          <label style={labelStyle}>Email</label>
                          <input type="email" style={inputStyle} placeholder="john@midwest.com" value={form.consigneeEmail} onChange={e => set("consigneeEmail", e.target.value)} />
                        </div>
                        <div>
                          <label style={labelStyle}>Delivery Address</label>
                          <input style={inputStyle} placeholder="456 Commerce Dr, Chicago IL" value={form.consigneeAddress} onChange={e => set("consigneeAddress", e.target.value)} />
                        </div>
                      </div>

                      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#635bff", paddingTop: 8, paddingBottom: 4, borderBottom: "1px solid rgba(99,91,255,0.25)" }}>Carrier (Optional)</div>
                      <div className="submit-grid">
                        <div>
                          <label style={labelStyle}>MC/DOT Number</label>
                          <input style={inputStyle} placeholder="Leave blank to auto-assign" value={form.carrierMC} onChange={e => set("carrierMC", e.target.value)} />
                        </div>
                        <div>
                          <label style={labelStyle}>NRA / Rate Agreement #</label>
                          <input style={inputStyle} placeholder="NRA-2026-XXXXX (optional)" value={form.nraNumber} onChange={e => set("nraNumber", e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Review & Submit</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 28px" }}>Confirm your details before submitting to the blockchain.</p>

                    {[
                      { label: "Container", rows: [
                        ["Container #", form.containerNumber || "—"],
                        ["Type", form.containerType],
                        ["Seal #", form.sealNumber || "—"],
                        ["Weight", form.weight ? form.weight + " lbs" : "—"],
                        ["Commodity", form.commodity || "—"],
                        ["Free Time", form.freeTime + " days"],
                      ]},
                      { label: "Route", rows: [
                        ["Delivery Type", deliveryType === "port-to-port" ? "Port to Port" : "Port to Door"],
                        ["Origin Port", form.originPort],
                        [deliveryType === "port-to-port" ? "Dest. Port" : "Delivery Address", deliveryType === "port-to-port" ? form.destPort : (form.deliveryAddress || "—")],
                        ["Pickup Date", form.pickupDate || "—"],
                        ["Delivery Date", form.deliveryDate || "—"],
                        ["Rail Required", form.railRequired ? "Yes" : "No"],
                      ]},
                      { label: "Parties", rows: [
                        ["Shipper", form.shipperCompany || "—"],
                        ["Shipper Contact", form.shipperContact || "—"],
                        ["Consignee", form.consigneeCompany || "—"],
                        ["Carrier MC/DOT", form.carrierMC || "Auto-assign"],
                      ]},
                    ].map(section => (
                      <div key={section.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px", marginBottom: 16 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7dd3fc", marginBottom: 14 }}>{section.label}</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }}>
                          {section.rows.map(([k,v]) => (
                            <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{k}</span>
                              <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)", textAlign: "right" }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(39,179,10,0.08)", border: "1px solid rgba(39,179,10,0.2)", borderRadius: 10, padding: "12px 18px", marginBottom: 20 }}>
                      <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#27b30a", flexShrink: 0, display: "inline-block" }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Drayage Blockchain Mainnet · <span style={{ color: "#27b30a", fontWeight: 700 }}>Ready</span></span>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div style={{ display: "flex", gap: 12, justifyContent: "space-between", marginTop: 36 }}>
                  {step > 1 ? (
                    <button onClick={() => setStep(s => s - 1)} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "13px 24px", color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                      ← Back
                    </button>
                  ) : <div />}

                  {step < 4 ? (
                    <button onClick={() => setStep(s => s + 1)} style={{ background: "linear-gradient(135deg,#1a6ed4,#2563eb)", border: "none", borderRadius: 10, padding: "13px 32px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                      Continue →
                    </button>
                  ) : (
                    <button onClick={() => setSubmitted(true)} style={{ flex: 1, height: 56, background: "linear-gradient(135deg,#1a6ed4,#635bff)", border: "none", borderRadius: 12, color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                      Submit to Blockchain
                    </button>
                  )}
                </div>
                {step === 4 && (
                  <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 12 }}>
                    Submitting creates an immutable blockchain record and auto-generates all required documentation.
                  </p>
                )}
              </div>
            </>
          ) : (
            /* CONFIRMATION SCREEN */
            <div style={{ textAlign: "center" }}>
              {/* Success header */}
              <div className="check-anim" style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(39,179,10,0.15)", border: "3px solid #27b30a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#27b30a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>Container Submitted to Blockchain</h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto 40px" }}>
                Your smart contract has been generated and all documentation is ready.
              </p>

              {/* Blockchain record */}
              <div style={{ background: "rgba(39,179,10,0.08)", border: "1px solid rgba(39,179,10,0.35)", borderRadius: 16, padding: "28px 32px", marginBottom: 20, textAlign: "left" }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#27b30a", marginBottom: 20 }}>Blockchain Record</div>
                {[
                  ["Transaction Hash", txHash, true],
                  ["Block", "#4,829,103", false],
                  ["Status", "✓ Confirmed", false],
                  ["Timestamp", new Date().toLocaleString(), false],
                ].map(([k, v, hasCopy]) => (
                  <div key={k as string} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{k as string}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", fontFamily: "monospace" }}>{v as string}</span>
                      {hasCopy && (
                        <button onClick={() => { navigator.clipboard?.writeText(v as string); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "3px 8px", color: copied ? "#27b30a" : "rgba(255,255,255,0.5)", fontSize: 10, cursor: "pointer" }}>
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Smart contract */}
              <div style={{ background: "rgba(99,91,255,0.08)", border: "1px solid rgba(99,91,255,0.35)", borderRadius: 16, padding: "28px 32px", marginBottom: 20, textAlign: "left" }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a78bfa", marginBottom: 20 }}>Smart Contract</div>
                {[
                  ["Contract ID", contractId],
                  ["Type", "Drayage Freight Agreement"],
                  ["Triggers", "Milestone-based payment release"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{k}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                  {["Gate Out","In Transit","POD Confirmed"].map(m => (
                    <div key={m} style={{ background: "rgba(99,91,255,0.2)", border: "1px solid rgba(99,91,255,0.4)", borderRadius: 6, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: "#a78bfa" }}>{m}</div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div style={{ background: "rgba(26,110,212,0.08)", border: "1px solid rgba(26,110,212,0.35)", borderRadius: 16, padding: "28px 32px", marginBottom: 32, textAlign: "left" }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7dd3fc", marginBottom: 20 }}>Documents Ready</div>
                {["Bill of Lading (BOL)","Commercial Invoice","ISF Filing (10+2)"].map(doc => (
                  <div key={doc} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(26,110,212,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{doc}</span>
                    </div>
                    <button style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "5px 12px", color: "rgba(255,255,255,0.6)", fontSize: 11, cursor: "pointer" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download
                    </button>
                  </div>
                ))}
              </div>

              {/* Exit CTAs */}
              <div className="cta-cards" style={{ marginBottom: 32 }}>
                <div style={{ background: "rgba(252,11,5,0.08)", border: "1.5px solid rgba(252,11,5,0.35)", borderRadius: 16, padding: "28px 28px", textAlign: "left" }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#fc0b05", marginBottom: 8 }}>DrayGo</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Need an instant driver?</div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 20 }}>
                    DrayGo's AI will assign the nearest verified carrier to your container within 60 seconds.
                  </p>
                  <a href="https://draygo.net" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fc0b05", borderRadius: 8, padding: "11px 20px", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                    Get a Driver Now →
                  </a>
                </div>
                <div style={{ background: "rgba(0,165,231,0.08)", border: "1.5px solid rgba(0,165,231,0.35)", borderRadius: 16, padding: "28px 28px", textAlign: "left" }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#00a5e7", marginBottom: 8 }}>DrayPay</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Ready to pay?</div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 20 }}>
                    Pay carriers, fuel, and port fees instantly using DrayPay's wallet — zero factoring fees.
                  </p>
                  <a href="https://draypay.net" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#00a5e7", borderRadius: 8, padding: "11px 20px", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                    Open DrayPay →
                  </a>
                </div>
              </div>

              <button onClick={() => { setStep(1); setSubmitted(false); setForm({ containerNumber:"",containerType:"40ft Dry",sealNumber:"",weight:"",commodity:"",freeTime:"4",originPort:"Los Angeles",destPort:"Long Beach",deliveryAddress:"",city:"",state:"",zip:"",pickupDate:"",deliveryDate:"",railRequired:false,shipperCompany:"",shipperContact:"",shipperEmail:"",shipperPhone:"",consigneeCompany:"",consigneeContact:"",consigneeEmail:"",consigneeAddress:"",carrierMC:"",nraNumber:"" }); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}>
                Submit another container
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
