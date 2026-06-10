import { asset } from "@/lib/site";

// Dark page hero shared by the inner pages. photo = path under /public.
export default function PageHero({ eyebrow, title, sub, photo, children }: { eyebrow: string; title: React.ReactNode; sub: string; photo?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden text-white">
      {photo && <img src={asset(photo)} alt="" className="absolute inset-0 w-full h-full object-cover" />}
      <div className="absolute inset-0" style={{ background: photo ? "linear-gradient(180deg,rgba(4,12,30,0.88),rgba(6,20,46,0.82))" : "radial-gradient(900px 500px at 70% 0%,rgba(0,162,231,0.3),transparent 60%),linear-gradient(180deg,#07153B,#0B2D5C)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ background: "rgba(0,162,231,0.18)", border: "1px solid rgba(143,217,245,0.45)" }}>
            <span className="live-dot" /> {eyebrow}
          </div>
          <h1 className="display text-[38px] md:text-[58px] leading-[1.05] mt-5">{title}</h1>
          <p className="mt-5 text-white/70 text-[16px] md:text-[17px] leading-relaxed max-w-2xl">{sub}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
