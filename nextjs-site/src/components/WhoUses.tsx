const USES = [
  { t: "Shippers & BCOs", d: "Pay for drayage moves with funds held in escrow and released on delivery — full visibility, no upfront risk.", i: '<path d="M20 17.6A2.4 2.4 0 0 0 18 14H6a4 4 0 1 1 .9-7.9A5 5 0 0 1 16.7 8 3.5 3.5 0 0 1 20 11.5"/>' },
  { t: "3PLs & freight brokers", d: "Settle carriers instantly, offer QuickPay, and reconcile every payout from one wallet and ledger.", i: '<path d="m7 7 5-3 5 3M4 10h16M7 7v10l5 3 5-3V7M7 17l5-3 5 3"/>' },
  { t: "Carriers & fleets", d: "Get paid the day a load delivers — no 30-to-60-day terms, no factoring middleman eating your margin.", i: '<path d="M21 7.5 12 3 3 7.5 12 12zM3 7.5v9L12 21M21 7.5v9L12 21M12 12v9"/>' },
  { t: "Owner-operators", d: "Send invoices and receive instant payouts straight to your wallet — transparent fees shown up front.", i: '<path d="M3 7h11v8H3zM14 10h3l3 3v2h-6zM7 18a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 7 18Zm10 0a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 17 18Z"/>' },
  { t: "Drivers", d: "Tap into same-day pay with a smart-contract wallet and a debit card for fuel and everything on the road.", i: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M6 14h5"/>' },
];

export default function WhoUses() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto reveal">
          <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Built for the whole lane</div>
          <h2 className="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-3">Who uses DrayPay to move money</h2>
          <p className="mt-4 text-[var(--muted)] text-[15px] md:text-[16px] leading-relaxed">Shippers, brokers, carriers, owner-operators and drivers — everyone in the drayage payment chain, paid faster.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {USES.map((u, i) => (
            <div key={u.t} className={`reveal reveal-d${i % 3} group relative overflow-hidden rounded-lg border border-[var(--navy)]/8 p-7 hover:-translate-y-1 transition shadow-sm hover:shadow-xl bg-white`}>
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none" style={{ background: "rgba(0,162,231,0.10)" }} />
              <div className="relative w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(160deg,#0B2D5C,#061A38)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3bb8ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: u.i }} />
              </div>
              <h3 className="display text-[19px] text-[var(--navy)] mt-5 relative">{u.t}</h3>
              <p className="text-[13.5px] text-[var(--muted)] mt-2.5 leading-relaxed relative">{u.d}</p>
              <a href="#quote" className="inline-flex items-center gap-1.5 mt-5 text-[13.5px] font-semibold text-[var(--red)] relative">Learn more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
