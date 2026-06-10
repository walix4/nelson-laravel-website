const STATS = [
  { n: "3.1M+", l: "Records anchored on-chain", i: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M9 21v-3h6v3"/>' },
  { n: "510+", l: "Validator nodes online", i: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>' },
  { n: "0.4s", l: "Average verification time", i: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' },
  { n: "99.9%", l: "Verification API uptime", i: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9.5 12l1.8 1.8L15 10"/>' },
];

export default function StatBand() {
  return (
    <section className="grid-bg relative py-16">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((s, i) => (
          <div key={s.l} className={`stat-card reveal reveal-d${i % 4}`}>
            <div className="stat-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.i }} />
            </div>
            <div className="stat-num num">{s.n}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
