import Link from "next/link";

const STEPS = [
  { n: "01", t: "Send invoice & fund escrow", d: "Issue an invoice and lock the payment in smart-contract escrow when a move is booked." },
  { n: "02", t: "Settle on delivery", d: "Funds release automatically the moment delivery conditions are met — no manual approvals." },
  { n: "03", t: "Push to accounting & TMS", d: "Feed settled payments and on-chain receipts into your ledger and dispatch via API or export." },
];

export default function HowSteps() {
  return (
    <section id="how" className="py-24" style={{ background: "linear-gradient(180deg,#FFFFFF,#F6F8FB)" }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal">
          <div className="max-w-xl">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">How it works</div>
            <h2 className="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-3">Get paid in three steps</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px] md:text-[16px] leading-relaxed">From booking to payout — align operations, billing, and accounting on one settlement per move.</p>
          </div>
          <Link href="/#quote" className="shrink-0 rounded-lg px-6 py-3 text-[14px] font-semibold text-[var(--navy)] border border-[var(--navy)]/15 hover:bg-[var(--navy)]/5 transition">Open a wallet</Link>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {STEPS.map((s, i) => {
            const hot = s.n === "03";
            return (
              <div key={s.n} className={`reveal reveal-d${i} rounded-lg p-7 transition shadow-sm hover:shadow-xl ${hot ? "border-2" : "border"}`} style={{ background: hot ? "linear-gradient(170deg,#FFF8EF,#FFFFFF)" : "#fff", borderColor: hot ? "var(--red)" : "rgba(11,45,92,0.08)" }}>
                <div className="display text-[44px] leading-none num" style={{ color: hot ? "var(--red)" : "rgba(0,162,231,0.32)" }}>{s.n}</div>
                <div className="h-[3px] w-12 rounded-full mt-3" style={{ background: hot ? "var(--red)" : "rgba(0,162,231,0.25)" }} />
                <h3 className={`display text-[20px] mt-5 ${hot ? "text-[var(--red)]" : "text-[var(--navy)]"}`}>{s.t}</h3>
                <p className="text-[13.5px] text-[var(--muted)] mt-2.5 leading-relaxed">{s.d}</p>
                <Link href="/#quote" className="inline-flex items-center gap-1.5 mt-5 text-[13.5px] font-semibold text-[var(--red)]">Get started <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg></Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
