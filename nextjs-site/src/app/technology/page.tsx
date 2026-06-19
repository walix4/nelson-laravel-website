import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import RevealInit from "@/components/RevealInit";
import PageHero from "@/components/PageHero";
import ChainCube from "@/components/ChainCube";
import { asset } from "@/lib/site";

export const metadata = { title: "Technology · Drayage Blockchain", description: "How Drayage Blockchain hashes, signs and anchors drayage records on an immutable ledger." };

const PIPELINE = [
  { n: "01", t: "Ingest", d: "A record arrives from your TMS, portal or the API — rate conf, BOL, POD, gate event or payment milestone." },
  { n: "02", t: "Hash & sign", d: "The full payload is fingerprinted with SHA-256 and signed by every party with Ed25519 keys." },
  { n: "03", t: "Anchor", d: "The hash, signatures and timestamp are written into the next block and linked to the parent block." },
  { n: "04", t: "Verify", d: "Anyone with the record can recompute the hash and check it against the chain — in about 120 ms." },
];

const SECURITY = [
  { t: "SHA-256 hashing", d: "Every record is reduced to a unique cryptographic fingerprint. Change one character of a BOL and the hash no longer matches the chain.", i: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9.5 12l1.8 1.8L15 10"/>' },
  { t: "Ed25519 signatures", d: "Carriers, brokers and shippers sign with their own keys, so every approval is bound to a verifiable identity — not an email thread.", i: '<path d="M15 7a4 4 0 1 1-4 4"/><path d="M3 21l6.5-6.5M9 15l2 2"/>' },
  { t: "Merkle proofs", d: "Individual records are provable against a block root without revealing the rest of the block — verify privately, share selectively.", i: '<path d="M12 3v5M12 8l-6 5M12 8l6 5M6 13v5M18 13v5"/><circle cx="12" cy="4" r="1.6"/><circle cx="6" cy="19" r="1.6"/><circle cx="18" cy="19" r="1.6"/>' },
  { t: "Immutable storage", d: "Blocks replicate across 510+ validator nodes. There is no admin button that rewrites history — for us or for anyone else.", i: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>' },
];

const FAQ = [
  ["Is shipment data public on the chain?", "No. Only the cryptographic hash, signatures and timestamps are anchored on-chain. The underlying documents stay in your systems — the chain proves they haven't changed without revealing them."],
  ["Do my partners need a Drayage Blockchain account to verify?", "No. Every anchored record gets a shareable verification link that recomputes and checks the hash in the browser. Accounts are only needed to anchor new records."],
  ["What happens if a record is corrected later?", "Corrections are appended as new versions linked to the original — the history shows both, with who signed what and when. Nothing is ever overwritten."],
  ["How fast is anchoring?", "Records are accepted in milliseconds and final after one block (~2 seconds). Verification against the chain averages 120 ms via the API."],
];

export default function Technology() {
  return (
    <>
      <Nav />
      <RevealInit />
      <PageHero
        eyebrow="Under the hood"
        title={<>The ledger engineered <span className="bg-gradient-to-r from-[#8fa8e6] via-[#4f74cf] to-[#2f61c0] bg-clip-text text-transparent">for freight</span></>}
        sub="Drayage Blockchain is a purpose-built blockchain for supply-chain records: fast enough for gate events, private enough for rates, and permanent enough for audits."
        photo="/photos/chain-abstract.jpg"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/solutions" className="px-6 py-3 rounded text-[14px] font-semibold btn-primary inline-flex items-center gap-2">Explore solutions</Link>
          <Link href="/network" className="px-6 py-3 rounded text-[14px] font-semibold btn-ghost">See the live network</Link>
        </div>
      </PageHero>

      {/* ANCHORING PIPELINE */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-2xl reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">The anchoring pipeline</div>
            <h2 className="display text-[36px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-3">From paperwork to proof in four steps</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PIPELINE.map((s, i) => (
              <div key={s.n} className={`reveal reveal-d${i % 4} rounded-lg border border-[var(--navy)]/8 p-7`} style={{ background: "linear-gradient(170deg,#FFFFFF,#F4F7FC)" }}>
                <div className="display text-[40px] leading-none num text-[var(--red)]/30">{s.n}</div>
                <h3 className="display text-[19px] text-[var(--navy)] mt-4">{s.t}</h3>
                <p className="text-[13.5px] text-[var(--muted)] mt-2 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D BLOCK + ARCHITECTURE COPY */}
      <section className="grid-bg relative py-24 text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-14 items-center">
          <div className="hidden lg:flex items-center justify-center gap-0">
            <ChainCube size={100} duration={18} label="Parent block" />
            <div className="chain-link w-[90px] -mt-8" />
            <ChainCube size={140} duration={13} delay={-5} label="New block · 2s finality" />
          </div>
          <div className="reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8fa8e6]">Architecture</div>
            <h2 className="display text-[36px] md:text-[46px] leading-[1.06] mt-3">Built like a chain. Tuned like a freight system.</h2>
            <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-lg">Most chains are built for currency. Drayage Blockchain is built for documents and events: high-volume writes at port-gate speed, selective disclosure for commercially sensitive rates, and an audit trail regulators can rely on.</p>
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
              {[["Block time", "2s"], ["Writes / day", "1.4M"], ["Verify latency", "120ms"], ["Node operators", "510+"]].map(([k, v]) => (
                <div key={k} className="glass-dark rounded-md p-4"><div className="text-white/55 text-[10px] uppercase tracking-wider">{k}</div><div className="display num text-[24px] mt-1">{v}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#F0F4FA,#FFFFFF)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Security model</div>
            <h2 className="display text-[36px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-3">Cryptography does the trusting for you</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {SECURITY.map((s, i) => (
              <div key={s.t} className={`reveal reveal-d${i % 2} rounded-lg bg-white border border-[var(--navy)]/8 p-7 flex gap-5`}>
                <div className="shrink-0 w-12 h-12 rounded flex items-center justify-center" style={{ background: "linear-gradient(160deg,#0B2D5C,#061A38)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6E8FE0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.i }} />
                </div>
                <div>
                  <h3 className="display text-[19px] text-[var(--navy)]">{s.t}</h3>
                  <p className="text-[13.5px] text-[var(--muted)] mt-2 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-[880px] mx-auto px-6">
          <div className="text-center reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Questions</div>
            <h2 className="display text-[34px] md:text-[44px] text-[var(--navy)] leading-[1.05] mt-3">The fine print, in plain English</h2>
          </div>
          <div className="mt-10 space-y-3">
            {FAQ.map(([q, a], i) => (
              <details key={q} className={`reveal reveal-d${i % 3} group rounded-lg border border-[var(--navy)]/10 bg-white open:bg-[#F4F7FC] transition`}>
                <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4">
                  <span className="display text-[16px] text-[var(--navy)]">{q}</span>
                  <svg className="shrink-0 transition group-open:rotate-45" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </summary>
                <p className="px-6 pb-6 text-[14px] text-[var(--muted)] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 text-white">
        <img src={asset("/photos/network-3d.jpg")} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(4,12,30,0.92),rgba(6,20,46,0.7))" }} />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl reveal">
            <h2 className="display text-[32px] md:text-[42px] leading-[1.08]">Anchor your first record today.</h2>
            <p className="mt-3 text-white/70 text-[15px]">Sandbox keys are free — go from TMS export to on-chain proof in an afternoon.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/network" className="px-7 py-3.5 rounded text-[14px] font-semibold btn-primary">Open the live network</Link>
            <Link href="/solutions" className="px-7 py-3.5 rounded text-[14px] font-semibold btn-ghost">Explore solutions</Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
