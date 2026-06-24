"use client";
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
    { label: "Load Board", href: "/load-board" },
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
    <footer className="text-white/85 py-14 mt-10" style={{ background: "#08192b", borderTop: "1px solid #fc0b05" }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-12">
          <div>
            <img src={asset("/logo-draygo.png")} alt="DrayGo" className="h-14 w-auto" />
            <p className="mt-3 max-w-sm text-white/60 text-[13px] leading-relaxed">The drayage platform for shippers, brokers, and carriers. Instant rates across every U.S. container port.</p>
            <div className="grid grid-cols-2 gap-3 mt-5" style={{ width: "fit-content" }}>
              <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-white/[0.10] hover:bg-white/[0.20] border border-white/15 backdrop-blur-sm transition-colors duration-200">
                <svg width="30" height="30" viewBox="0 0 384 512" fill="#fff" aria-hidden="true" className="shrink-0"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] opacity-90">Download on the</span><span className="block text-[14px] font-semibold tracking-tight">App Store</span></span>
              </a>
              <a href="#" className="inline-flex items-center gap-2.5 rounded-md h-[54px] pl-3 pr-4 bg-white/[0.10] hover:bg-white/[0.20] border border-white/15 backdrop-blur-sm transition-colors duration-200">
                <img src={asset("/google-play.png")} alt="" className="h-7 w-auto shrink-0" />
                <span className="leading-none text-white text-left whitespace-nowrap"><span className="block text-[8.5px] uppercase tracking-[0.14em] opacity-90">Get it on</span><span className="block text-[14px] font-semibold tracking-tight">Google Play</span></span>
              </a>
            </div>
          </div>
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <div className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-white mb-4">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[13px] font-medium text-white/60 hover:text-white transition">{l.label}</Link>
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
