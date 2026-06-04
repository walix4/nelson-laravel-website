"use client";
import { useState } from "react";

type R = { n: string; r: number; d: string; img: number; t: string };
const REVIEWS: R[] = [
  { n: "Marcus Powell", r: 5, d: "May 06, 2026", img: 12, t: "Best toll-cost tool we've used. We finally bid lanes knowing the real toll burden — by axle class — instead of guessing and eating it later." },
  { n: "Terry McCarty", r: 5, d: "May 05, 2026", img: 13, t: "Honestly the cleanest toll calculator out there. Love it." },
  { n: "Ben Wallace", r: 5, d: "Apr 28, 2026", img: 33, t: "Just started using it and so far so good. The 5-axle toll numbers matched what hit our E-ZPass statement almost to the dollar. That kind of accuracy matters when you run daily." },
  { n: "Talia Bennett", r: 5, d: "Apr 23, 2026", img: 45, t: "Quick, accurate, dependable. Exactly what our dispatch desk needed." },
  { n: "Marie Barker", r: 5, d: "Apr 08, 2026", img: 5, t: "We'd be lost without this. Thank you DrayToll — you've taken the guesswork out of every northeast corridor we run." },
  { n: "Tom Riggs", r: 5, d: "Mar 12, 2026", img: 51, t: "The app works very well and the web version is even better. Pricing tolls on a new route takes seconds now." },
  { n: "Jarred Herman", r: 5, d: "Jan 10, 2026", img: 8, t: "The avoid-tolls reroute paid for itself in a week. It showed exactly where the toll roads were killing us and what the detour actually costs in miles." },
  { n: "Betty Sue Sands", r: 5, d: "Nov 22, 2025", img: 23, t: "Great people to work with and a genuinely useful product." },
  { n: "Hector Ramos", r: 5, d: "Nov 03, 2025", img: 60, t: "Cut our rate-quoting time in half. Bridge and tunnel tolls baked into every estimate is the part I didn't know I needed." },
  { n: "Dana Liu", r: 5, d: "Oct 18, 2025", img: 32, t: "Solid tool for over-the-road. Coverage keeps growing and the new managed-lane corridors are filling in fast." },
  { n: "Owen Pratt", r: 5, d: "Sep 30, 2025", img: 14, t: "The transit-time and toll estimates are scary accurate. Great for setting customer expectations up front." },
  { n: "Sofia Marin", r: 5, d: "Sep 12, 2025", img: 47, t: "Switched our whole fleet over. Transponder discounts and congestion pricing in the quote is a game changer." },
];
const Stars = ({ n }: { n: number }) => <span className="rv-stars">{Array.from({ length: 5 }).map((_, i) => <svg key={i} viewBox="0 0 24 24" fill={i < n ? "#FFB400" : "none"} stroke="#FFB400" strokeWidth="1.6" strokeLinejoin="round"><path d="M12 2l3 6.5 7 .9-5 4.9 1.3 7L12 18l-6.3 3.3L7 14.3 2 9.4l7-.9L12 2z" /></svg>)}</span>;

function Card({ r }: { r: R }) {
  const [clip, setClip] = useState(true);
  const long = r.t.length > 120;
  return (
    <div className="rv-card">
      <svg className="rv-quote" viewBox="0 0 24 24" fill="currentColor"><path d="M10 7L6 11v6h6v-6H8.5L11 8.2 10 7zm8 0l-4 4v6h6v-6h-3.5L20 8.2 18 7z" /></svg>
      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="display text-[20px] text-[var(--navy)]">{r.r}.0</span><Stars n={r.r} /></div><span className="text-[12.5px] text-[var(--muted)] num">{r.d}</span></div>
      <div className="rv-text flex-1"><span className={long && clip ? "rv-clip" : ""}>{r.t}</span>{long && <span className="rv-more" onClick={() => setClip((c) => !c)}> {clip ? "More" : "Less"}</span>}</div>
      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[var(--navy)]/6"><img className="rv-photo" src={`https://i.pravatar.cc/96?img=${r.img}`} alt={r.n} loading="lazy" /><div><div className="text-[14px] font-semibold text-[var(--navy)] leading-tight">{r.n}</div><div className="text-[12px] text-[var(--muted)]">Verified carrier</div></div></div>
    </div>
  );
}

export default function Testimonials() {
  const [shown, setShown] = useState(8);
  return (
    <section className="py-24" style={{ background: "linear-gradient(180deg,#EEF2F8,#FFFFFF)" }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="bg-white rounded-[26px] p-7 md:p-12" style={{ border: "1px solid rgba(11,35,80,0.05)" }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div><div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Loved by fleets &amp; drivers</div><h2 className="display text-[32px] md:text-[44px] text-[var(--navy)] leading-[1.05] mt-2">What our clients say about us</h2></div>
            <div className="text-right shrink-0"><div className="display text-[44px] text-[var(--navy)] leading-none num">5.00</div><div className="flex items-center justify-end gap-3 mt-2"><Stars n={5} /><span className="text-[13px] text-[var(--muted)] border-l border-[var(--navy)]/15 pl-3"><b className="text-[var(--navy)] num">654</b> reviews</span></div></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">{REVIEWS.slice(0, shown).map((r) => <Card key={r.n} r={r} />)}</div>
          {shown < REVIEWS.length && <div className="text-center mt-10"><button onClick={() => setShown((s) => s + 4)} className="px-7 py-3 rounded-xl text-[14px] font-semibold bg-[var(--navy)] text-white hover:bg-[var(--navy-2)] transition">Load more reviews</button></div>}
        </div>
      </div>
    </section>
  );
}
