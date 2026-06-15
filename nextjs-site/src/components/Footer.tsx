import Link from "next/link";
import { asset } from "@/lib/site";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Toll calculator", href: "/#quote" },
      { label: "Route toll grade", href: "/tools" },
      { label: "Port drayage", href: "/tools/ports" },
      { label: "Intermodal & rail", href: "/tools" },
      { label: "Freight brokers", href: "/estimates" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API pricing", href: "/pricing" },
      { label: "Request API access", href: "/pricing" },
      { label: "Commercial data quality", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Support", href: "/support" },
      { label: "Data quality", href: "/data-quality" },
      { label: "Route toll grade", href: "/toll-grade" },
      { label: "Request access", href: "/pricing" },
      { label: "Privacy policy", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="text-white/85 pt-16 pb-10 border-t border-white/10 mt-10" style={{ background: "#061A38" }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* brand + contact */}
          <div>
            <img src={asset("/draytoll-logo.png")} alt="DrayToll" className="h-9 w-auto" />
            <p className="mt-4 max-w-xs text-white/60 text-[13.5px] leading-relaxed">
              Commercial truck and container shipping toll intelligence. Accurate class-aware rates for drayage, intermodal, and heavy freight.
            </p>
            <a href="mailto:freight@draytoll.com" className="mt-2 inline-block text-[13.5px] font-semibold text-[var(--red)] hover:opacity-80">freight@draytoll.com</a>
          </div>

          {/* link columns */}
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-white">{c.title}</div>
              <ul className="mt-5 space-y-3.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[14px] text-white/60 hover:text-white transition">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[12.5px] text-white/45">
          <div className="num">© 2026 DrayToll. All rights reserved.</div>
          <div className="num">50K+ toll plazas · Class 2–6 routes · 99.9% uptime</div>
        </div>
      </div>
    </footer>
  );
}
