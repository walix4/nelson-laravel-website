import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import RevealInit from "@/components/RevealInit";
import PageHero from "@/components/PageHero";
import { asset } from "@/lib/site";

export const metadata = { title: "Live Network · DrayChain", description: "Watch records being anchored on the DrayChain network in real time — blocks, nodes and verified events." };

const STATS = [
  { n: "5,184,902", l: "Block height" },
  { n: "3,128,440", l: "Records anchored" },
  { n: "510", l: "Validator nodes" },
  { n: "2.0s", l: "Block time" },
  { n: "1.4M", l: "Writes per day" },
  { n: "120ms", l: "Verify latency" },
  { n: "99.99%", l: "Chain uptime" },
  { n: "38", l: "Record types" },
];

const RECORDS: [string, string, string, string, string][] = [
  ["0x7af3…c918", "Rate confirmation", "Los Angeles → Phoenix, AZ", "Carrier · Broker", "12s ago"],
  ["0x1c9e…04b7", "Gate-in event", "Port of Long Beach · Pier E", "Terminal", "31s ago"],
  ["0x4b20…e6d1", "POD signature", "Oakland → Sacramento, CA", "Carrier · Shipper", "44s ago"],
  ["0x9d11…7a02", "BOL document hash", "Seattle → Portland, OR", "3PL", "1m ago"],
  ["0x3e8a…b5f9", "Payment milestone", "Houston → San Antonio, TX", "Shipper", "2m ago"],
  ["0xc4f2…1d6e", "Chassis interchange", "BNSF Hobart Ramp", "IEP · Motor carrier", "2m ago"],
  ["0x8b07…93aa", "Rate confirmation", "New York/NJ → Chicago, IL", "Carrier · Broker", "3m ago"],
  ["0x2a55…f0c3", "Gate-out event", "Port of Savannah · GCT", "Terminal", "4m ago"],
  ["0x6f3d…28e7", "Demurrage clock stop", "Port of Norfolk · NIT", "Terminal · 3PL", "5m ago"],
  ["0xe190…6b44", "POD signature", "Miami → Orlando, FL", "Carrier · Shipper", "6m ago"],
];

export default function Network() {
  return (
    <>
      <Nav />
      <RevealInit />
      <PageHero
        eyebrow="Chain live · block #5,184,902"
        title={<>The network, <span className="bg-gradient-to-r from-[#8fa8e6] via-[#4f74cf] to-[#2f61c0] bg-clip-text text-transparent">right now</span></>}
        sub="Every few seconds another drayage record becomes permanent. This is the public face of the chain — blocks, validators and the records they protect."
        photo="/photos/network-3d.jpg"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/developers" className="px-6 py-3 rounded text-[14px] font-semibold btn-primary">Anchor a record</Link>
          <Link href="/estimates" className="px-6 py-3 rounded text-[14px] font-semibold btn-ghost">Full record stream</Link>
        </div>
      </PageHero>

      {/* LIVE STATS */}
      <section className="grid-bg relative py-16 text-white">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div key={s.l} className={`stat-card reveal reveal-d${i % 4}`} style={{ padding: "24px 22px" }}>
                <div className="stat-num num" style={{ fontSize: 34 }}>{s.n}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT RECORDS TABLE */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#F0F4FA,#FFFFFF)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 reveal">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Recently anchored</div>
              <h2 className="display text-[34px] md:text-[44px] text-[var(--navy)] leading-[1.05] mt-2">Latest records on the chain</h2>
            </div>
            <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-[var(--navy)]"><span className="live-dot" /> Streaming live</span>
          </div>
          <div className="est-wrap mt-9 reveal reveal-d1">
            <div className="est-scroll">
              <table className="est-table">
                <thead><tr><th>Record hash</th><th>Type</th><th>Lane / location</th><th>Signed by</th><th>Status</th><th>Anchored</th></tr></thead>
                <tbody>
                  {RECORDS.map(([hash, type, lane, parties, time]) => (
                    <tr key={hash}>
                      <td><span className="est-ref">{hash}</span></td>
                      <td><span className="est-chip">{type}</span></td>
                      <td><span className="est-loc" style={{ maxWidth: 220 }}>{lane}</span></td>
                      <td className="text-[12.5px]">{parties}</td>
                      <td><span className="est-badge completed"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg> Verified</span></td>
                      <td><span className="est-time num">{time}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-7 text-center reveal"><Link href="/estimates" className="inline-flex items-center gap-2 px-6 py-3 rounded text-[14px] font-semibold text-[var(--navy)] border border-[var(--navy)]/15 hover:bg-[var(--navy)]/5 transition">Open the full stream <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link></div>
        </div>
      </section>

      {/* COVERAGE MAP */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="relative overflow-hidden rounded-lg grid-bg text-white px-6 py-16 md:py-20">
            <div className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: `url(${asset("/usa-map.svg")})`, backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat", filter: "brightness(0) invert(1)" }} />
            <div className="relative z-10 text-center max-w-xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#8fa8e6]">Validator coverage</div>
              <h2 className="display text-[32px] md:text-[42px] leading-[1.06] mt-2">Nodes near every major port and ramp</h2>
              <p className="text-white/65 text-[15px] mt-4">From San Pedro Bay to the Port of NY/NJ — 510+ independent validators across 48 states keep the ledger honest and the latency low.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                {["LA / Long Beach", "NY / NJ", "Savannah", "Houston", "Seattle / Tacoma", "Chicago", "Norfolk", "Memphis"].map((p) => (
                  <span key={p} className="glass-pill rounded px-4 py-2 text-[12.5px] font-semibold">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
