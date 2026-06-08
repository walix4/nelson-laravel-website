const FLOW = [
  ["Port gate", "Gate-in record"],
  ["Rate conf", "Hashed & signed"],
  ["BOL / POD", "Document anchor"],
  ["Rail ramp", "Custody handoff"],
  ["Delivery", "Payment event"],
];
const STEPS = [
  ["01", "Capture the record", "Pull rate confirmations, documents, signatures and events straight from your TMS or portal."],
  ["02", "Anchor it on-chain", "Each record is hashed, signed and written to an immutable, timestamped ledger entry."],
  ["03", "Verify anywhere", "Partners confirm authenticity instantly via the API or a shareable verification link."],
];
const Arrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default function ContainerLanes() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#FFF8EF,#FFFFFF)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-70" style={{ background: "radial-gradient(700px 360px at 12% 0%,rgba(47,97,192,0.10),transparent 60%)" }} />
      <div className="max-w-[1400px] mx-auto px-6 relative grid lg:grid-cols-2 gap-14 items-start">
        {/* left */}
        <div className="reveal">
          <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Container chain of custody</div>
          <h2 className="display text-[36px] md:text-[46px] text-[var(--navy)] leading-[1.06] mt-3">From port gate to inland ramp — every event verified</h2>
          <p className="mt-5 text-[var(--muted)] text-[15px] md:text-[16px] max-w-md leading-relaxed">Anchor each step of a drayage and intermodal move on-chain. No more disputed paperwork or missing handoffs on container shipments.</p>
          <div className="mt-9 flex items-center gap-2.5 overflow-x-auto pb-3 lane-scroll">
            {FLOW.map(([t, s], i) => (
              <div key={t} className="flex items-center gap-2.5 shrink-0">
                <div className="rounded-lg bg-white border border-[var(--navy)]/10 px-4 py-2.5 shadow-sm min-w-[128px]">
                  <div className="text-[14px] font-semibold text-[var(--navy)]">{t}</div>
                  <div className="text-[11.5px] text-[var(--muted)] mt-0.5">{s}</div>
                </div>
                {i < FLOW.length - 1 && <Arrow />}
              </div>
            ))}
          </div>
        </div>
        {/* right steps */}
        <div className="space-y-4">
          {STEPS.map(([n, t, d], i) => (
            <div key={n} className={`reveal reveal-d${i} rounded-lg bg-white border border-[var(--navy)]/8 p-6 flex gap-5 shadow-sm`}>
              <div className="display text-[28px] leading-none text-[var(--red)]/30 num shrink-0">{n}</div>
              <div>
                <h3 className="display text-[18px] text-[var(--navy)]">{t}</h3>
                <p className="text-[13.5px] text-[var(--muted)] mt-1.5 leading-relaxed">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
