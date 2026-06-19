import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import RevealInit from "@/components/RevealInit";
import PageHero from "@/components/PageHero";
import { asset } from "@/lib/site";

export const metadata = { title: "Solutions · Drayage Blockchain", description: "Blockchain verification for ports, carriers, brokers, 3PLs and shippers." };

const AUDIENCES = [
  {
    t: "Carriers & owner-operators", img: "/photos/truck-bw.jpg", tag: "On the road",
    lead: "Get paid on what was actually agreed — and prove every delivery.",
    points: ["Rate confirmations locked at booking, immune to after-the-fact edits", "Signed, timestamped POD on every load — disputes close in minutes", "Chain-of-custody records that protect you on damaged-freight claims"],
  },
  {
    t: "Ports & marine terminals", img: "/photos/containers-stack.jpg", tag: "At the gate",
    lead: "Every gate-in and gate-out becomes a verifiable, shareable event.",
    points: ["Gate events anchored in real time from your TOS via the API", "One source of truth for free-time, demurrage and per-diem clocks", "Selective disclosure — terminals share proofs, not raw operational data"],
  },
  {
    t: "3PLs & freight brokers", img: "/photos/servers.jpg", tag: "In the middle",
    lead: "Stop arbitrating he-said-she-said between shippers and carriers.",
    points: ["Every rate conf, accessorial and approval cryptographically signed", "Audit-ready files for every shipment, assembled automatically", "White-label verification links your customers can check themselves"],
  },
  {
    t: "Shippers & finance teams", img: "/photos/circuit-glow.jpg", tag: "At the desk",
    lead: "Reconcile invoices against proof, not promises.",
    points: ["Match invoices to anchored rates, events and signatures automatically", "Tamper-proof audit trail for SOX, customs and insurance reviews", "Payment milestones recorded against the same verified shipment record"],
  },
];

export default function Solutions() {
  return (
    <>
      <Nav />
      <RevealInit />
      <PageHero
        eyebrow="Solutions"
        title={<>One chain. <span className="bg-gradient-to-r from-[#8fa8e6] via-[#4f74cf] to-[#2f61c0] bg-clip-text text-transparent">Every side</span> of the move.</>}
        sub="The same anchored record serves the terminal that scanned the container, the carrier that hauled it, the broker that arranged it and the shipper that pays for it."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/network" className="px-6 py-3 rounded text-[14px] font-semibold btn-primary">See the live network</Link>
          <Link href="/technology" className="px-6 py-3 rounded text-[14px] font-semibold btn-ghost">Explore the technology</Link>
        </div>
      </PageHero>

      {/* AUDIENCE ROWS */}
      {AUDIENCES.map((a, i) => (
        <section key={a.t} className="py-20" style={{ background: i % 2 ? "linear-gradient(180deg,#F0F4FA,#FFFFFF)" : "#fff" }}>
          <div className={`max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center`}>
            <div className={`photo-tile min-h-[380px] reveal ${i % 2 ? "lg:order-2" : ""}`}>
              <img src={asset(a.img)} alt={a.t} loading="lazy" />
              <div className="pt-shade" />
              <div className="pt-body"><div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/70">{a.tag}</div></div>
            </div>
            <div className={`reveal reveal-d1 ${i % 2 ? "lg:order-1" : ""}`}>
              <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">{a.t}</div>
              <h2 className="display text-[32px] md:text-[42px] text-[var(--navy)] leading-[1.08] mt-3">{a.lead}</h2>
              <ul className="mt-7 space-y-4">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-3.5 items-start">
                    <span className="shrink-0 mt-0.5 w-6 h-6 rounded flex items-center justify-center" style={{ background: "rgba(47,97,192,0.12)" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="text-[14.5px] text-[var(--ink)] leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
              <Link href="/network" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded text-[14px] font-semibold text-white bg-[var(--navy)] hover:bg-[var(--navy-2)] transition">Get started <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="grid-bg relative py-20 text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10 text-center">
          <h2 className="display text-[32px] md:text-[44px] leading-[1.08] reveal">Whoever you are in the move — the proof is the same.</h2>
          <p className="mt-4 text-white/65 text-[15px] max-w-xl mx-auto reveal reveal-d1">Anchor once, verify everywhere. Bring your TMS, your portal or just your paperwork.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 reveal reveal-d2">
            <Link href="/technology" className="px-7 py-3.5 rounded text-[14px] font-semibold btn-primary">Explore the technology</Link>
            <Link href="/network" className="px-7 py-3.5 rounded text-[14px] font-semibold btn-ghost">Watch the live network</Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
