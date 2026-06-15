import Link from "next/link";
import { asset } from "@/lib/site";

const FOOTER_LINKS = [
  { title: "Services", links: [
    { label: "For Shippers", href: "/shipper" },
    { label: "For Brokers", href: "/broker" },
    { label: "For Carriers", href: "/carriers" },
    { label: "All Services", href: "/services" },
  ]},
  { title: "Platform", links: [
    { label: "Load Board", href: "/#load-board" },
    { label: "Rate Map", href: "/rate-map" },
    { label: "PortJob", href: "/estimates" },
    { label: "Tools", href: "/tools" },
  ]},
  { title: "Company", links: [
    { label: "How it works", href: "/#how" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Sign in", href: "/#login" },
  ]},
];

export default function Footer() {
  return (
    <footer className="text-white/85 py-14 border-t border-white/10 mt-10" style={{ background: "#08163C" }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-12">
          <div>
            <img src={asset("/logo-draygo.png")} alt="DrayGo" className="h-10 w-auto" />
            <p className="mt-3 max-w-sm text-white/60 text-[13px] leading-relaxed">The drayage platform for shippers, brokers, and carriers. Instant rates across every U.S. container port.</p>
          </div>
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-white mb-4">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[13px] text-white/60 hover:text-white transition">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 text-[11px] text-white/45 num">© 2026 DrayGo · All rights reserved</div>
      </div>
    </footer>
  );
}
