"use client";
import { useEffect, useRef, useState } from "react";

// Premium fintech mockups — pure CSS/SVG, no images.

const TXNS = [
  { n: "Driver payout · M. Alvarez", s: "LA → Phoenix · settled", a: "-$740.00", neg: true },
  { n: "Broker transfer · Halo Freight", s: "Invoice #8841 · instant", a: "+$1,840.00", neg: false },
  { n: "Shipment payment · Atlas", s: "Long Beach → Vegas", a: "+$1,120.00", neg: false },
  { n: "Fuel card · Pilot #214", s: "Ontario, CA", a: "-$182.60", neg: true },
];

export function PhoneWallet() {
  return (
    <div className="phone-mock float-soft">
      <div className="pm-screen">
        <div className="pm-notch" />
        {/* header */}
        <div className="px-5 pt-12 pb-5" style={{ background: "linear-gradient(160deg,#0B2D5C,#0670a0)" }}>
          <div className="flex items-center justify-between">
            <span className="italic font-black text-[15px] text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>Dray<span className="text-[#8fd9f5]">Pay</span></span>
            <span className="w-7 h-7 rounded-full bg-white/15 grid place-items-center"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" /></svg></span>
          </div>
          <div className="mt-5 text-[10px] uppercase tracking-[0.16em] text-white/60">Available balance</div>
          <div className="num display text-white text-[30px] leading-tight">$12,480.20</div>
          <div className="mt-1 text-[10.5px] text-white/55 num">+ $8,340.00 reserved for booked moves</div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["Send", "Request", "Card"].map((b) => (
              <span key={b} className="text-center text-[11px] font-semibold text-white bg-white/12 border border-white/20 rounded-lg py-2">{b}</span>
            ))}
          </div>
        </div>
        {/* transactions */}
        <div className="px-1 pb-4 bg-white">
          <div className="px-4 pt-3.5 pb-1 text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--muted)]">Recent activity</div>
          {TXNS.map((t) => (
            <div key={t.n} className="pm-row">
              <span>
                <span className="block text-[11.5px] font-semibold text-[var(--navy)]">{t.n}</span>
                <span className="block text-[10px] text-[var(--muted)] mt-0.5">{t.s}</span>
              </span>
              <span className={`num text-[12px] font-bold ${t.neg ? "text-[var(--navy)]" : ""}`} style={t.neg ? {} : { color: "#0E9F6E" }}>{t.a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Small floating glass chip used around the hero phone.
export function FloatChip({ title, value, sub, className = "", style }: { title: string; value: string; sub?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`absolute bg-white/90 backdrop-blur rounded-xl px-4 py-3 ${className}`} style={{ border: "1px solid #E6EDF5", boxShadow: "0 24px 50px -20px rgba(11,45,92,0.28)", ...style }}>
      <div className="text-[9.5px] uppercase tracking-[0.14em] font-bold text-[var(--muted)]">{title}</div>
      <div className="num display text-[17px] text-[var(--navy)] mt-0.5">{value}</div>
      {sub && <div className="text-[10px] mt-0.5" style={{ color: "#0E9F6E" }}>{sub}</div>}
    </div>
  );
}

const PAYOUTS = [
  ["M. Alvarez · Driver", "$740.00", "Settled"],
  ["Halo Freight · Broker", "$1,840.00", "Settled"],
  ["R. Chen · Owner-op", "$2,310.40", "Processing"],
  ["Meridian Fleet · Carrier", "$960.00", "Settled"],
];

export function DashboardMock() {
  return (
    <div className="browser-mock">
      <div className="bm-bar"><span className="bm-dot" /><span className="bm-dot" /><span className="bm-dot" /><span className="bm-url">app.draypay.net/dashboard</span></div>
      <div className="grid md:grid-cols-[1.1fr_1.6fr]">
        {/* left summary */}
        <div className="p-6 border-b md:border-b-0 md:border-r" style={{ borderColor: "#EDF2F8" }}>
          <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--muted)]">Total balance</div>
          <div className="num display text-[30px] text-[var(--navy)] mt-1">$84,212.46</div>
          <div className="mt-1 text-[11px] num" style={{ color: "#0E9F6E" }}>↑ 12.4% vs last month</div>
          {/* bars */}
          <div className="mt-6 flex items-end gap-2 h-[88px]">
            {[34, 52, 41, 66, 58, 80, 72].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 5 ? "linear-gradient(180deg,#00a2e7,#0670a0)" : "#E3EEF7" }} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[9px] text-[var(--muted)] num"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
        </div>
        {/* right payouts */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--muted)]">Today&apos;s payouts</div>
            <span className="pm-pill" style={{ background: "rgba(0,162,231,0.1)", color: "#0670a0" }}>Auto-settlement on</span>
          </div>
          <div className="mt-3">
            {PAYOUTS.map(([n, a, s]) => (
              <div key={n as string} className="pm-row" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full grid place-items-center text-[11px] font-bold" style={{ background: "#F0F6FB", color: "var(--navy)" }}>{(n as string).slice(0, 1)}</span>
                  <span className="text-[12px] font-semibold text-[var(--navy)]">{n}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="num text-[12.5px] font-bold text-[var(--navy)]">{a}</span>
                  <span className="pm-pill" style={s === "Settled" ? { background: "rgba(14,159,110,0.1)", color: "#0E9F6E" } : { background: "rgba(0,162,231,0.1)", color: "#0670a0" }}>{s}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Card3D({ name = "NELSON BULDIER", number = "5310 •••• •••• 0226", tag = "DrayPay · Visa" }: { name?: string; number?: string; tag?: string }) {
  return (
    <div className="paycard-scene">
      <div className="paycard">
        <div className="absolute left-6 top-5 flex items-center gap-2">
          <span className="italic font-black text-[19px] tracking-tight text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>Dray<span className="text-[#8fd9f5]">Pay</span></span>
        </div>
        <div className="absolute right-6 top-5 text-[10px] uppercase tracking-[0.2em] text-white/70">{tag}</div>
        <div className="pcc-chip" />
        <div className="absolute left-6 bottom-14 num text-[19px] tracking-[0.12em] text-white/95">{number}</div>
        <div className="absolute left-6 bottom-5 text-[11px] uppercase tracking-[0.16em] text-white/70">{name}</div>
        <div className="absolute right-6 bottom-5 text-right"><div className="text-[8px] uppercase tracking-[0.14em] text-white/55">Balance</div><div className="num text-[15px] font-bold text-white">$12,480.20</div></div>
      </div>
    </div>
  );
}

// Count-up number when scrolled into view.
export function Counter({ to, prefix = "", suffix = "", decimals = 0, duration = 1400, className = "" }: { to: number; prefix?: string; suffix?: string; decimals?: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        setVal(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref} className={`num ${className}`}>{prefix}{val.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}
