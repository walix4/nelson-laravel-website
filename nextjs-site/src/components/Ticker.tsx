"use client";
import { useEffect, useRef } from "react";

const Arrow = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--navy)]/35 shrink-0"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default function Ticker({ rows, index = 0 }: { rows: [string, string, string][]; index?: number }) {
  const listRef = useRef<HTMLDivElement>(null);
  const originals = rows.length;
  useEffect(() => {
    const list = listRef.current; if (!list) return;
    let i = 0; let interval: any; let kick: any;
    const step = () => {
      i++;
      const rowH = (list.children[0] as HTMLElement)?.offsetHeight || 62;
      list.style.transition = "transform .55s cubic-bezier(.5,0,.2,1)";
      list.style.transform = `translateY(${-i * rowH}px)`;
      if (i >= originals) setTimeout(() => { list.style.transition = "none"; list.style.transform = "translateY(0)"; i = 0; }, 580);
    };
    kick = setTimeout(() => { step(); interval = setInterval(step, 2600); }, index * 850);
    return () => { clearTimeout(kick); clearInterval(interval); };
  }, [originals, index]);
  // render rows twice for a seamless loop
  const doubled = [...rows, ...rows];
  return (
    <div className="ticker mt-4">
      <div className="ticker-list" ref={listRef}>
        {doubled.map(([from, to, time], i) => (
          <div key={i} className="ticker-row flex items-center justify-between border-t border-[var(--navy)]/6 gap-3">
            <div className="flex items-center gap-2 text-[13.5px] min-w-0"><span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#16B571" }} /><span className="font-semibold text-[var(--navy)]">{from}</span><Arrow /><span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#3A5FC0" }} /><span className="font-semibold text-[var(--navy)] truncate">{to}</span></div>
            <span className="text-[12px] text-[var(--muted)] shrink-0 num">{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
