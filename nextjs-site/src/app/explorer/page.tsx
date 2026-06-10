import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import RevealInit from "@/components/RevealInit";
import PageHero from "@/components/PageHero";
import VolumeExplorer from "@/components/VolumeExplorer";

export const metadata = { title: "Container Volume Explorer · DrayChain", description: "Explore the volume of containers moving through the DrayChain network — per port, across any time window, every TEU anchored on-chain." };

const PORTS = [
  { name: "LA / Long Beach", teu: "16,840", share: 35, d: "+6.66%", up: true },
  { name: "New York / NJ", teu: "12,410", share: 26, d: "+2.15%", up: true },
  { name: "Savannah", teu: "7,460", share: 15, d: "+19.20%", up: true },
  { name: "Houston", teu: "5,930", share: 12, d: "+7.26%", up: true },
  { name: "Seattle / Tacoma", teu: "3,610", share: 8, d: "−1.84%", up: false },
  { name: "Norfolk", teu: "1,950", share: 4, d: "+0.92%", up: true },
];

const STEPS = [
  { n: "01", t: "A container crosses a gate", d: "TOS and gate systems fire an event the moment a box enters or leaves a terminal, ramp or yard." },
  { n: "02", t: "The event becomes a block entry", d: "Each gate event is hashed, signed and anchored — one TEU, one tamper-proof data point." },
  { n: "03", t: "Volume you can audit", d: "These charts are sums over anchored events, so every number traces back to provable records." },
];

const LANES = [
  ["Los Angeles → Phoenix, AZ", "2,140 TEU", "0x7af3…c918"],
  ["LA/LB → Inland Empire, CA", "1,860 TEU", "0x4b20…e6d1"],
  ["NY/NJ → Chicago, IL", "1,540 TEU", "0x8b07…93aa"],
  ["Savannah → Atlanta, GA", "1,210 TEU", "0x2a55…f0c3"],
  ["Houston → Dallas, TX", "980 TEU", "0x3e8a…b5f9"],
];

export default function Explorer() {
  return (
    <>
      <Nav />
      <RevealInit />
      <PageHero
        eyebrow="Network explorer"
        title={<>Container volume, <span className="bg-gradient-to-r from-[#8fa8e6] via-[#4f74cf] to-[#2f61c0] bg-clip-text text-transparent">by the block</span></>}
        sub="Every anchored gate event adds up. Explore the volume of containers moving through the network — per port, across any window — with every TEU backed by an on-chain record."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#chart" className="px-6 py-3 rounded text-[14px] font-semibold btn-primary">Open the chart</a>
          <Link href="/network" className="px-6 py-3 rounded text-[14px] font-semibold btn-ghost">Watch records anchor live</Link>
        </div>
      </PageHero>

      {/* THE EXPLORER */}
      <section id="chart" className="py-20" style={{ background: "linear-gradient(180deg,#F6F8FB,#FFFFFF)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <VolumeExplorer />
          <p className="mt-4 text-center text-[12px] text-[var(--muted)]">Hover the chart for exact volumes · switch ports and time windows above · figures are sums of anchored gate events.</p>
        </div>
      </section>

      {/* PORT LEADERBOARD */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-2xl reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Today by port</div>
            <h2 className="display text-[34px] md:text-[44px] text-[var(--navy)] leading-[1.05] mt-3">Where the boxes are moving</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORTS.map((p, i) => (
              <div key={p.name} className={`reveal reveal-d${i % 3} rounded-lg border border-[var(--navy)]/8 p-6`} style={{ background: "linear-gradient(170deg,#FFFFFF,#F4F7FC)" }}>
                <div className="flex items-center justify-between">
                  <div className="text-[14px] font-bold text-[var(--navy)]">{p.name}</div>
                  <span className="text-[12px] font-bold num" style={{ color: p.up ? "#15935F" : "#C0392B" }}>{p.d}</span>
                </div>
                <div className="display num text-[30px] text-[var(--navy)] mt-3 leading-none">{p.teu} <span className="text-[14px] text-[var(--muted)]">TEU</span></div>
                <div className="mt-4 h-[6px] rounded-sm overflow-hidden" style={{ background: "rgba(11,45,92,0.08)" }}>
                  <div className="h-full rounded-sm" style={{ width: `${p.share}%`, background: "linear-gradient(90deg,#2f61c0,#6E8FE0)" }} />
                </div>
                <div className="mt-2 text-[11.5px] text-[var(--muted)] num">{p.share}% of network volume</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW VOLUME BECOMES DATA */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#F0F4FA,#FFFFFF)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Why you can trust these numbers</div>
            <h2 className="display text-[34px] md:text-[46px] text-[var(--navy)] leading-[1.05] mt-3">Every data point is a gate event on the chain</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`reveal reveal-d${i} rounded-lg bg-white border border-[var(--navy)]/8 p-7`}>
                <div className="display text-[40px] leading-none num text-[var(--red)]/30">{s.n}</div>
                <h3 className="display text-[19px] text-[var(--navy)] mt-4">{s.t}</h3>
                <p className="text-[13.5px] text-[var(--muted)] mt-2 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSIEST VERIFIED LANES */}
      <section className="grid-bg relative py-24 text-white overflow-hidden">
        <div className="max-w-[1080px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#8fa8e6]">Busiest verified lanes · 24h</div>
            <h2 className="display text-[34px] md:text-[46px] leading-[1.05] mt-3">The lanes doing the heavy lifting</h2>
          </div>
          <div className="mt-10 space-y-3">
            {LANES.map(([lane, teu, hash], i) => (
              <div key={lane} className={`anat-tag glass-dark rounded-md px-5 py-4 flex flex-wrap items-center gap-x-5 gap-y-1 reveal reveal-d${i % 3}`} style={{ border: "1px solid rgba(143,168,230,0.25)" }}>
                <span className="display num text-[18px] text-[#8fa8e6] w-7 shrink-0">{i + 1}</span>
                <span className="display text-[16px] flex-1 min-w-[200px]">{lane}</span>
                <span className="display num text-[16px]">{teu}</span>
                <span className="text-[11px] num text-white/45 hidden md:inline" style={{ fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace" }}>{hash}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center reveal">
            <Link href="/estimates" className="inline-flex items-center gap-2 px-7 py-3 rounded text-[14px] font-semibold btn-primary">See the records behind these numbers <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chat />
    </>
  );
}
