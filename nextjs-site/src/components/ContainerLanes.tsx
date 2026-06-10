import Link from "next/link";
import { asset } from "@/lib/site";

const FLOW = [
  ["Port gate", "Gate-in record", "09:14"],
  ["Rate conf", "Hashed & signed", "09:21"],
  ["BOL / POD", "Document anchor", "11:48"],
  ["Rail ramp", "Custody handoff", "14:05"],
  ["Delivery", "Payment event", "17:32"],
];

export default function ContainerLanes() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#F0F4FA,#FFFFFF)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-70" style={{ background: "radial-gradient(700px 360px at 12% 0%,rgba(47,97,192,0.10),transparent 60%)" }} />
      <div className="max-w-[1400px] mx-auto px-6 relative grid lg:grid-cols-2 gap-14 items-center">
        {/* left — photo with floating on-chain event tags */}
        <div className="relative reveal">
          <div className="photo-tile min-h-[420px] h-full">
            <img src={asset("/photos/ship.jpg")} alt="Container ship arriving at port" loading="lazy" />
            <div className="pt-shade" />
            <div className="pt-body">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/70">Vessel → gate → rail → door</div>
              <div className="display text-white text-[22px] leading-tight mt-1.5">One container, five anchored events.</div>
            </div>
          </div>
          <div className="floating-tag glass-sky rounded-md px-3.5 py-2.5 text-[11px]" style={{ top: "7%", left: "5%", animationDelay: "-1s" }}><div className="text-white/60 text-[9px] uppercase tracking-wider">Gate-in</div><div className="display text-white num">Block #5,184,711</div></div>
          <div className="floating-tag glass-sky rounded-md px-3.5 py-2.5 text-[11px]" style={{ top: "26%", right: "4%", animationDelay: "-3s" }}><div className="text-white/60 text-[9px] uppercase tracking-wider">BOL hash</div><div className="display text-white num">0x3f9c…a217</div></div>
          <div className="floating-tag glass-sky rounded-md px-3.5 py-2.5 text-[11px]" style={{ top: "52%", left: "8%", animationDelay: "-4.5s" }}><div className="text-white/60 text-[9px] uppercase tracking-wider">Signature</div><div className="display text-white">Carrier · verified</div></div>
        </div>
        {/* right — chain-of-custody timeline */}
        <div className="reveal reveal-d1">
          <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Container chain of custody</div>
          <h2 className="display text-[36px] md:text-[46px] text-[var(--navy)] leading-[1.06] mt-3">From port gate to inland ramp — every event verified</h2>
          <p className="mt-5 text-[var(--muted)] text-[15px] md:text-[16px] max-w-md leading-relaxed">Anchor each step of a drayage and intermodal move on-chain. No more disputed paperwork or missing handoffs on container shipments.</p>
          <div className="mt-9 relative pl-7">
            <div className="absolute left-[9px] top-2 bottom-2 w-[2px]" style={{ background: "linear-gradient(180deg,rgba(47,97,192,0.5),rgba(47,97,192,0.08))" }} />
            {FLOW.map(([t, s, time], i) => (
              <div key={t} className={`relative pb-6 last:pb-0 reveal reveal-d${i % 3}`}>
                <span className="absolute -left-7 top-1 w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center bg-white" style={{ borderColor: "var(--red)" }}><span className="w-[8px] h-[8px] rounded-full" style={{ background: "var(--red)" }} /></span>
                <div className="flex items-baseline gap-3">
                  <div className="text-[15px] font-semibold text-[var(--navy)]">{t}</div>
                  <div className="text-[11px] text-[var(--muted)] num">{time}</div>
                </div>
                <div className="text-[13px] text-[var(--muted)] mt-0.5">{s} · written to the ledger</div>
              </div>
            ))}
          </div>
          <Link href="/technology" className="inline-flex items-center gap-2 mt-9 px-6 py-3 rounded text-[14px] font-semibold text-white bg-[var(--navy)] hover:bg-[var(--navy-2)] transition">See how anchoring works <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
        </div>
      </div>
    </section>
  );
}
