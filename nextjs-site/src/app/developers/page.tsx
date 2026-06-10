import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import RevealInit from "@/components/RevealInit";
import PageHero from "@/components/PageHero";

export const metadata = { title: "Developers · DrayChain", description: "REST API to anchor and verify drayage records on-chain. Sandbox keys, SDKs and webhooks." };

const ENDPOINTS = [
  { m: "POST", p: "/v1/records", d: "Anchor a record — send the payload or just its hash, get back the block reference and proof." },
  { m: "GET", p: "/v1/records/{hash}", d: "Fetch a record's on-chain status, signatures, block height and confirmation count." },
  { m: "POST", p: "/v1/verify", d: "Recompute and check a document hash against the chain. Returns match / mismatch with the anchored version." },
  { m: "GET", p: "/v1/events", d: "Stream anchored events for your shipments via cursor pagination or webhooks." },
];

const SDKS = [
  ["JavaScript / TypeScript", "npm i @draychain/sdk"],
  ["Python", "pip install draychain"],
  ["Go", "go get github.com/draychain/go-sdk"],
];

export default function Developers() {
  return (
    <>
      <Nav />
      <RevealInit />
      <PageHero
        eyebrow="For developers"
        title={<>Anchor a record with <span className="bg-gradient-to-r from-[#8fa8e6] via-[#4f74cf] to-[#2f61c0] bg-clip-text text-transparent">one request</span></>}
        sub="A small, boring, well-documented REST API. Hash on your side or ours, sign with your keys, and get a proof your partners can verify without an account."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/pricing" className="px-6 py-3 rounded text-[14px] font-semibold btn-primary">Get a free sandbox key</Link>
          <Link href="/network" className="px-6 py-3 rounded text-[14px] font-semibold btn-ghost">See it running live</Link>
        </div>
      </PageHero>

      {/* CODE + PITCH */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div className="reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Five minutes to first proof</div>
            <h2 className="display text-[34px] md:text-[44px] text-[var(--navy)] leading-[1.06] mt-3">If you can call an API, you can anchor freight</h2>
            <p className="mt-5 text-[var(--muted)] text-[15px] leading-relaxed max-w-lg">POST the record, store the returned proof next to your shipment, done. Verification links work in any browser; webhooks tell you the moment a partner signs.</p>
            <ul className="mt-7 space-y-3.5">
              {["Sandbox environment with unlimited test anchors", "Idempotent writes — safe to retry from your job queue", "Webhooks for signatures, confirmations and disputes", "OpenAPI spec, Postman collection and typed SDKs"].map((p) => (
                <li key={p} className="flex gap-3 items-start">
                  <span className="shrink-0 mt-0.5 w-6 h-6 rounded flex items-center justify-center" style={{ background: "rgba(47,97,192,0.12)" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-[14.5px] text-[var(--ink)]">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal reveal-d1">
            <div className="code-win">
              <div className="cw-bar"><span className="cw-dot" /><span className="cw-dot" /><span className="cw-dot" /><span className="cw-title">anchor-record.sh</span></div>
              <pre>{`curl -X POST https://api.draychain.com/v1/records \\
  -H "Authorization: Bearer $DRAYCHAIN_KEY" \\
  -d '{
    "type": "rate_confirmation",
    "reference": "LOAD-48213",
    "sha256": "3f9c1b8e07d24c55b6a1f0e9d8c7a217",
    "signers": ["carrier", "broker"]
  }'

`}<span className="tc"># → 201 Created</span>{`
`}<span className="ts">{`{
  "hash":   "0x3f9c…a217",
  "block":  5184902,
  "status": "anchored",
  "verify": "https://drayageblockchain.com/v/0x3f9c"
}`}</span></pre>
            </div>
          </div>
        </div>
      </section>

      {/* ENDPOINTS */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#F0F4FA,#FFFFFF)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-2xl reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">The API surface</div>
            <h2 className="display text-[34px] md:text-[44px] text-[var(--navy)] leading-[1.05] mt-3">Four endpoints cover the whole lifecycle</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {ENDPOINTS.map((e, i) => (
              <div key={e.p} className={`reveal reveal-d${i % 2} rounded-lg bg-white border border-[var(--navy)]/8 p-6`}>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded text-[11px] font-bold text-white num" style={{ background: e.m === "POST" ? "var(--red)" : "var(--navy)" }}>{e.m}</span>
                  <code className="text-[14px] font-bold text-[var(--navy)]" style={{ fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace" }}>{e.p}</code>
                </div>
                <p className="text-[13.5px] text-[var(--muted)] mt-3 leading-relaxed">{e.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {SDKS.map(([name, cmd], i) => (
              <div key={name} className={`reveal reveal-d${i} rounded-lg border border-[var(--navy)]/8 bg-white p-5`}>
                <div className="text-[13px] font-bold text-[var(--navy)]">{name}</div>
                <code className="block mt-2 text-[12px] text-[var(--red)] bg-[var(--navy)]/4 rounded px-3 py-2" style={{ fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace" }}>{cmd}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grid-bg relative py-20 text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl reveal">
            <h2 className="display text-[32px] md:text-[42px] leading-[1.08]">Free in the sandbox. Cheap in production.</h2>
            <p className="mt-3 text-white/70 text-[15px]">Volume pricing per anchored record — see the plans or talk to us about TMS integrations.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/pricing" className="px-7 py-3.5 rounded text-[14px] font-semibold btn-primary">View API pricing</Link>
            <Link href="/solutions" className="px-7 py-3.5 rounded text-[14px] font-semibold btn-ghost">Explore solutions</Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
