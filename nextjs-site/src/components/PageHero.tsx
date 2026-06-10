// Light premium hero shared by the inner pages.
export default function PageHero({ eyebrow, title, sub, children }: { eyebrow: string; title: React.ReactNode; sub: string; photo?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden f-hero-bg">
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0670a0]" style={{ background: "rgba(0,162,231,0.08)", border: "1px solid rgba(0,162,231,0.22)" }}>
            <span className="live-dot" /> {eyebrow}
          </div>
          <h1 className="display text-[38px] md:text-[58px] leading-[1.05] mt-5 text-[var(--navy)]">{title}</h1>
          <p className="mt-5 text-[var(--muted)] text-[16px] md:text-[17px] leading-relaxed max-w-2xl">{sub}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
