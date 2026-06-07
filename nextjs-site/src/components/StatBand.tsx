const STATS = [
  { n: "50K+", l: "Toll plazas & gantries", i: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M9 21v-3h6v3"/>' },
  { n: "Class 2–6", l: "Commercial truck tiers", i: '<path d="M3 6h13v9H3zM16 9h3l2 3v3h-5zM6 18a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 6 18Zm12 0a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 18 18Z"/>' },
  { n: "40' / 53'", l: "Container equipment profiles", i: '<rect x="3" y="7" width="18" height="10" rx="1"/><path d="M7 7v10M11 7v10M15 7v10"/>' },
  { n: "99.9%", l: "API uptime SLA", i: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9.5 12l1.8 1.8L15 10"/>' },
];

export default function StatBand() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((s, i) => (
          <div key={s.l} className={`reveal reveal-d${i % 4} rounded-lg p-6 border border-[var(--navy)]/8 relative overflow-hidden`} style={{ background: "linear-gradient(160deg,#FFFFFF, #FFF6EE)" }}>
            <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5" style={{ background: "rgba(0,162,231,0.12)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.i }} />
            </div>
            <div className="display text-[34px] md:text-[38px] text-[var(--navy)] leading-none num">{s.n}</div>
            <div className="mt-2 text-[13px] text-[var(--muted)]">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
