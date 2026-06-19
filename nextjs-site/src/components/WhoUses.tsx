import Link from "next/link";
import { asset } from "@/lib/site";

const USES = [
  { t: "Ports & terminals", d: "Anchor gate-in and gate-out events so every container handoff has a verifiable record before it leaves the terminal.", img: "/photos/wire-blocks.jpg" },
  { t: "Carriers & intermodal", d: "Prove chain of custody between ports, inland ramps and transload facilities with on-chain movement records.", img: "/photos/crystal-mesh.jpg" },
  { t: "3PLs & freight brokers", d: "Settle disputes fast with signed, timestamped rate confirmations and proof of delivery on every load.", img: "/photos/blockchain-tiles.jpg" },
  { t: "Shippers & finance teams", d: "Reconcile invoices against a tamper-proof audit trail of payments and events across multi-leg shipments.", img: "/photos/circuit.jpg" },
];

export default function WhoUses() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto reveal">
          <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Across the supply chain</div>
          <h2 className="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-3">Who uses Drayage Blockchain to verify records</h2>
          <p className="mt-4 text-[var(--muted)] text-[15px] md:text-[16px] leading-relaxed">Ports, carriers, brokers, 3PLs and shippers — anywhere a trusted, tamper-proof record of a shipment matters.</p>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USES.map((u, i) => (
            <Link key={u.t} href="/solutions" className={`photo-tile reveal reveal-d${i % 4} min-h-[360px] group`}>
              <img src={asset(u.img)} alt={u.t} loading="lazy" />
              <div className="pt-shade" />
              <div className="pt-body">
                <h3 className="display text-[21px] text-white leading-tight">{u.t}</h3>
                <p className="text-[12.5px] text-white/75 mt-2 leading-relaxed">{u.d}</p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-semibold text-white"><span className="border-b border-white/40 group-hover:border-white transition">Explore solutions</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
