"use client";
import { useEffect, useRef, useState } from "react";

// ─── Same key as contact page — get at web3forms.com ───
const WEB3FORMS_KEY = "70a957d6-a4a7-44b0-a150-3e0f166f8100";

type Msg = { who: "bot" | "me"; text: string };
type Step = "idle" | "ask_name" | "ask_contact" | "ask_inquiry" | "done";

const SHORTCUTS = ["Get an instant quote", "Which ports do you cover?", "Talk to sales"];

function botReply(t: string): { text: string; nextStep?: Step } {
  const l = t.toLowerCase();
  if (/quote|rate|price|cost|pricing/.test(l))
    return { text: "Our rate engine gives instant locked drayage prices for any U.S. port-to-inland lane. Want me to connect you with a specialist for a custom quote?" };
  if (/port|lane|coverage|cover/.test(l))
    return { text: "We cover 40+ U.S. sea ports & rail ramps — LA/Long Beach, NY/NJ, Houston, Savannah, Seattle and more. Need a rate on a specific lane?" };
  if (/track|status|where|container/.test(l))
    return { text: "Container tracking is under our Tools menu — just enter a container or booking number. Need help with something specific?" };
  if (/sales|talk|human|agent|call|speak|contact/.test(l) || t === "Talk to sales")
    return { text: "I'd love to connect you with our team. What's your name?", nextStep: "ask_name" };
  if (/broker/.test(l))
    return { text: "DrayGo Broker gives you a full drayage TMS — dispatch, carrier matching, real-time status and instant billing. Want to talk to our team?" };
  if (/carrier|driver|truck/.test(l))
    return { text: "Carriers get access to live drayage loads, instant booking and DrayPay — 24-hour payment. Interested in signing up?" };
  return { text: "Great question! Let me connect you with a specialist who can help. What's your name?", nextStep: "ask_name" };
}

async function sendLead(name: string, contact: string, inquiry: string) {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `DrayGo Chat Lead: ${name}`,
        from_name: name,
        email: contact.includes("@") ? contact : "chat-lead@draygo.net",
        phone: contact.includes("@") ? "" : contact,
        message: `Name: ${name}\nContact: ${contact}\n\nInquiry:\n${inquiry}`,
      }),
    });
    const d = await res.json();
    return d.success;
  } catch {
    // Fallback mailto
    const sub = encodeURIComponent(`DrayGo Chat Lead: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nContact: ${contact}\n\nInquiry:\n${inquiry}`);
    window.open(`mailto:info@draygo.net?subject=${sub}&body=${body}`);
    return true;
  }
}

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{
    who: "bot",
    text: "👋 Hi! I'm the Dray Rate Assistant. Ask me about drayage rates, ports, transit times or accessorials — or tap a shortcut below.",
  }]);
  const [typing, setTyping] = useState(false);
  const [val, setVal] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [lead, setLead] = useState({ name: "", contact: "" });
  const [unread, setUnread] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  const scroll = () => setTimeout(() => { bodyRef.current?.scrollTo({ top: 9999, behavior: "smooth" }); }, 60);

  const addBot = (text: string) => {
    setTyping(true);
    scroll();
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { who: "bot", text }]);
      if (!open) setUnread((n) => n + 1);
      scroll();
    }, 900);
  };

  const send = async (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { who: "me", text }]);
    setVal("");
    scroll();

    if (step === "ask_name") {
      setLead((l) => ({ ...l, name: text }));
      setStep("ask_contact");
      addBot(`Nice to meet you, ${text.split(" ")[0]}! 🙌 What's the best way to reach you? (Email or phone)`);
      return;
    }

    if (step === "ask_contact") {
      setLead((l) => ({ ...l, contact: text }));
      setStep("ask_inquiry");
      addBot("Perfect. What can we help you with? (e.g. drayage rates, a specific lane, platform demo, carrier sign-up...)");
      return;
    }

    if (step === "ask_inquiry") {
      setStep("done");
      addBot("✅ Got it! Our team will reach out to you shortly. We typically respond within a few hours.");
      await sendLead(lead.name, lead.contact, text);
      return;
    }

    const { text: replyText, nextStep } = botReply(text);
    if (nextStep) setStep(nextStep);
    addBot(replyText);
  };

  // Show unread badge when closed
  useEffect(() => { if (open) setUnread(0); }, [open]);

  const showShortcuts = msgs.length === 1 && step === "idle";

  return (
    <>
      <style>{`
        .chat-widget *{box-sizing:border-box}
        .chat-panel{
          position:fixed;bottom:90px;right:24px;width:360px;max-height:560px;
          border-radius:10px;overflow:hidden;display:flex;flex-direction:column;
          background:#0d1f35;border:1px solid rgba(255,255,255,0.09);
          box-shadow:0 24px 80px rgba(0,0,0,0.55),0 0 0 1px rgba(252,11,5,0.08);
          transform:scale(0.92) translateY(12px);opacity:0;pointer-events:none;
          transition:transform 0.28s cubic-bezier(0.34,1.56,0.64,1),opacity 0.22s ease;
          z-index:9000;font-family:inherit;
        }
        .chat-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
        @media(max-width:400px){.chat-panel{width:calc(100vw - 24px);right:12px}}
        .chat-head{
          display:flex;align-items:center;gap:10px;padding:14px 16px;
          background:linear-gradient(135deg,#fc0b05 0%,#b00904 100%);flex-shrink:0;
        }
        .chat-av{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.18);display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .chat-status{display:flex;align-items:center;gap:5px;font-size:11px;color:rgba(255,255,255,0.8);margin-top:2px}
        .chat-dot{width:7px;height:7px;border-radius:50%;background:#4ade80;animation:chatPing 2s ease-in-out infinite;flex-shrink:0}
        .chat-body{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:8px;scrollbar-width:none}
        .chat-body::-webkit-scrollbar{display:none}
        .chat-msg{max-width:82%;padding:10px 13px;border-radius:14px;font-size:13.5px;line-height:1.45;animation:chatIn 0.3s cubic-bezier(0.22,1,0.36,1) both}
        .chat-msg.bot{background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.9);border-radius:14px 14px 14px 4px;align-self:flex-start}
        .chat-msg.me{background:#fc0b05;color:#fff;border-radius:14px 14px 4px 14px;align-self:flex-end;box-shadow:0 4px 14px rgba(252,11,5,0.3)}
        .chat-shortcuts{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;align-self:flex-start}
        .chat-chip{
          padding:7px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;
          border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);
          color:rgba(255,255,255,0.85);transition:all 0.18s ease;white-space:nowrap;
        }
        .chat-chip:hover{background:rgba(252,11,5,0.15);border-color:rgba(252,11,5,0.4);color:#fff}
        .chat-typing{display:flex;align-items:center;gap:4px;padding:12px 14px;align-self:flex-start;background:rgba(255,255,255,0.07);border-radius:14px 14px 14px 4px}
        .chat-typing-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.5);animation:chatBounce 1.2s ease-in-out infinite}
        .chat-typing-dot:nth-child(2){animation-delay:.18s}
        .chat-typing-dot:nth-child(3){animation-delay:.36s}
        .chat-foot{display:flex;align-items:center;gap:8px;padding:10px 12px;border-top:1px solid rgba(255,255,255,0.07);flex-shrink:0}
        .chat-input{flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.10);border-radius:12px;padding:10px 14px;font-size:13px;color:#fff;outline:none;transition:border-color .2s}
        .chat-input::placeholder{color:rgba(255,255,255,0.3)}
        .chat-input:focus{border-color:rgba(252,11,5,0.4)}
        .chat-send{width:38px;height:38px;border-radius:12px;background:#fc0b05;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none;flex-shrink:0;transition:opacity .18s,transform .18s}
        .chat-send:hover{opacity:0.85;transform:scale(1.05)}
        .chat-fab{
          position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;
          background:linear-gradient(135deg,#fc0b05,#b00904);border:none;cursor:pointer;
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 6px 28px rgba(252,11,5,0.45);z-index:9001;
          transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1),box-shadow .2s;
        }
        .chat-fab:hover{transform:scale(1.1);box-shadow:0 8px 36px rgba(252,11,5,0.55)}
        .chat-fab-ping{position:absolute;top:2px;right:2px;width:13px;height:13px;border-radius:50%;background:#22c55e;border:2px solid #0d1f35;animation:chatPing 2s ease-in-out infinite}
        .chat-fab-badge{position:absolute;top:-2px;right:-2px;min-width:18px;height:18px;border-radius:9px;background:#22c55e;font-size:10px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center;padding:0 4px;border:2px solid #0d1f35}
        .chat-icon-chat{transition:opacity .2s,transform .2s}
        .chat-icon-close{position:absolute;transition:opacity .2s,transform .2s;opacity:0;transform:rotate(-90deg)}
        .chat-fab.open .chat-icon-chat{opacity:0;transform:rotate(90deg)}
        .chat-fab.open .chat-icon-close{opacity:1;transform:rotate(0deg)}
        @keyframes chatIn   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes chatPing { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,0.5)} 50%{box-shadow:0 0 0 5px rgba(74,222,128,0)} }
        @keyframes chatBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
      `}</style>

      {/* ── Panel ── */}
      <div
        className={`chat-widget chat-panel${open ? " open" : ""}`}
        role="dialog"
        aria-label="DrayGo Assistant"
        style={{ background: "#0d1f35" }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "linear-gradient(135deg,#fc0b05 0%,#b00904 100%)", flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 8V4M9 13h.01M15 13h.01M9 16h6M2 12v2M22 12v2"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>DrayGo AI Chat</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>
              <span className="chat-dot" />
              AI · replies instantly
            </div>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.75)", padding: 4 }} onClick={() => setOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div
          ref={bodyRef}
          style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px", display: "flex", flexDirection: "column", gap: 8, scrollbarWidth: "none", background: "#0d1f35" }}
        >
          {msgs.map((m, i) => (
            <div key={i} style={{
              maxWidth: "82%",
              padding: "10px 13px",
              borderRadius: m.who === "bot" ? "8px 8px 8px 2px" : "8px 8px 2px 8px",
              fontSize: 13.5,
              lineHeight: 1.45,
              alignSelf: m.who === "bot" ? "flex-start" : "flex-end",
              background: m.who === "bot" ? "rgba(255,255,255,0.09)" : "#fc0b05",
              color: m.who === "bot" ? "rgba(255,255,255,0.92)" : "#fff",
              boxShadow: m.who === "me" ? "0 4px 14px rgba(252,11,5,0.3)" : "none",
              animation: "chatIn 0.3s cubic-bezier(0.22,1,0.36,1) both",
            }}>{m.text}</div>
          ))}
          {showShortcuts && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4, alignSelf: "flex-start" }}>
              {SHORTCUTS.map((s) => (
                <button key={s} className="chat-chip" onClick={() => send(s)}
                  style={{ padding: "7px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.88)", whiteSpace: "nowrap" }}>
                  {s}
                </button>
              ))}
            </div>
          )}
          {typing && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "12px 14px", alignSelf: "flex-start", background: "rgba(255,255,255,0.09)", borderRadius: "14px 14px 14px 4px" }}>
              <span className="chat-typing-dot" /><span className="chat-typing-dot" /><span className="chat-typing-dot" />
            </div>
          )}
        </div>

        {/* Footer */}
        <form
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0, background: "#0d1f35" }}
          onSubmit={(e) => { e.preventDefault(); send(val); }}
        >
          <input
            className="chat-input"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={
              step === "ask_name" ? "Your full name…" :
              step === "ask_contact" ? "Email or phone number…" :
              step === "ask_inquiry" ? "Describe your inquiry…" :
              "Type your message…"
            }
            autoComplete="off"
            disabled={step === "done"}
            style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "10px 14px", fontSize: 13, color: "#fff", outline: "none" }}
          />
          <button
            type="submit"
            disabled={step === "done"}
            aria-label="Send"
            style={{ width: 38, height: 38, borderRadius: 6, background: "#fc0b05", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "none", flexShrink: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>
      </div>

      {/* ── FAB ── */}
      <button className={`chat-widget chat-fab${open ? " open" : ""}`} onClick={() => setOpen((o) => !o)} aria-label="Open chat">
        {!open && unread > 0 && <span className="chat-fab-badge">{unread}</span>}
        {!open && unread === 0 && <span className="chat-fab-ping" />}
        <svg className="chat-icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5z"/>
        </svg>
        <svg className="chat-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </>
  );
}
