"use client";
import { useRef, useState } from "react";

type Msg = { who: "bot" | "me"; text: string };
const reply = (t: string) => {
  const l = t.toLowerCase();
  if (/quote|rate|price|cost|fee|payment|pay/.test(l)) return "You can see the fee and net payout instantly with the calculator at the top — enter the amount, method and settlement speed.";
  if (/payout|settle|settlement|escrow|coverage|cover|network/.test(l)) return "We settle payments to carriers, brokers and drivers across all 48 states and Canada, with funds reserved at booking and released on delivery. What are you paying?";
  if (/track|status|where|wallet|invoice|quickpay|factoring/.test(l)) return "Your wallet shows every payment, invoice and payout in real time — and QuickPay lets you get paid early with the fee shown up front.";
  if (/sales|human|agent|talk|call/.test(l)) return "Happy to connect you with a specialist. Drop your email and we'll reach out within one business hour.";
  return "Thanks! A payments specialist will follow up shortly. For an instant estimate, use the payment calculator at the top of the page.";
};

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ who: "bot", text: "👋 Hi! I'm the DrayPay assistant. Ask me about payments, fees, payouts, escrow or your wallet — or tap a shortcut below." }]);
  const [typing, setTyping] = useState(false);
  const [val, setVal] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const scroll = () => setTimeout(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, 0);
  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { who: "me", text }]); setVal(""); setTyping(true); scroll();
    setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { who: "bot", text: reply(text) }]); scroll(); }, 1000);
  };
  return (
    <>
      <div className={`chat-panel ${open ? "open" : ""}`} role="dialog" aria-label="AI chat">
        <div className="chat-head">
          <div className="av"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 8V4M9 13h.01M15 13h.01M9 16h6M2 12v2M22 12v2" /></svg></div>
          <div className="flex-1"><div className="display text-[15px] leading-none">DrayPay Assistant</div><div className="status"><span className="dot" />AI · replies instantly</div></div>
          <button className="text-white/70 hover:text-white" onClick={() => setOpen(false)} aria-label="Close"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg></button>
        </div>
        <div className="chat-body" ref={bodyRef}>
          {msgs.map((m, i) => <div key={i} className={`chat-msg ${m.who}`}>{m.text}</div>)}
          {msgs.length === 1 && <div className="chat-quick">{["Estimate a payment fee", "How do payouts work?", "Talk to sales"].map((q) => <button key={q} className="chat-chip" onClick={() => send(q)}>{q}</button>)}</div>}
          {typing && <div className="chat-msg bot chat-typing"><span /><span /><span /></div>}
        </div>
        <form className="chat-foot" onSubmit={(e) => { e.preventDefault(); send(val); }}>
          <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Type your message…" autoComplete="off" />
          <button className="chat-send" type="submit" aria-label="Send"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg></button>
        </form>
      </div>
      <button className={`chat-fab ${open ? "open" : ""}`} onClick={() => setOpen((o) => !o)} aria-label="Open chat">
        {!open && <span className="ping" />}
        <svg className="fab-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5z" /><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" /></svg>
        <svg className="fab-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
    </>
  );
}
