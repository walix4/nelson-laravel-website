import Link from "next/link";

const STEPS = [
  { n: "01", t: "Capture the record", d: "Pull rate confirmations, documents, signatures and events from your TMS or portal." },
  { n: "02", t: "Anchor it on-chain", d: "Each record is hashed, signed and written to an immutable, timestamped ledger entry." },
  { n: "03", t: "Verify & share", d: "Confirm authenticity instantly through the API or a shareable verification link." },
];

export default function HowSteps() {
  return (
    <section id="how" className="py-24" style={{ background: "linear-gradient(180deg,#FFFFFF,#F6F8FB)" }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 reveal">
          <div className="max-w-xl">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">How it works</div>
            <h2 className="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-3">Verify a shipment record in three steps</h2>
            <p className="mt-4 text-[var(--muted)] text-[15px] md:text-[16px] leading-relaxed">From pickup to payment — align operations, documents and billing on one tamper-proof record per shipment.</p>
          </div>
          <Link href="/developers" className="shrink-0 rounded px-6 py-3 text-[14px] font-semibold text-[var(--navy)] border border-[var(--navy)]/15 hover:bg-[var(--navy)]/5 transition">Request API access</Link>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {STEPS.map((s, i) => {
            const hot = s.n === "03";
            return (
              <div key={s.n} className={`reveal reveal-d${i} rounded-lg p-7 transition ${hot ? "border-2" : "border"}`} style={{ background: hot ? "linear-gradient(170deg,#EFF4FC,#FFFFFF)" : "#fff", borderColor: hot ? "var(--red)" : "rgba(11,45,92,0.08)" }}>
                <div className="display text-[44px] leading-none num" style={{ color: hot ? "var(--red)" : "rgba(47,97,192,0.32)" }}>{s.n}</div>
                <div className="h-[3px] w-12 rounded-full mt-3" style={{ background: hot ? "var(--red)" : "rgba(47,97,192,0.25)" }} />
                <h3 className={`display text-[20px] mt-5 ${hot ? "text-[var(--red)]" : "text-[var(--navy)]"}`}>{s.t}</h3>
                <p className="text-[13.5px] text-[var(--muted)] mt-2.5 leading-relaxed">{s.d}</p>
                <Link href="/developers" className="inline-flex items-center gap-1.5 mt-5 text-[13.5px] font-semibold text-[var(--red)]">Get started <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg></Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
