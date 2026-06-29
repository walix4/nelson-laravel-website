"use client";
import Link from "next/link";
import { asset } from "@/lib/site";

const LINKS = [
  { label: "Features",          href: "#features" },
  { label: "Services",          href: "#services" },
  { label: "How It Works",      href: "#how-it-works" },
  { label: "About",             href: "#about" },
];

export default function Nav() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b overflow-hidden" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(14px) saturate(160%)", WebkitBackdropFilter: "blur(14px) saturate(160%)", borderColor: "rgba(11,45,92,0.08)" }}>
      <div className="max-w-[1280px] mx-auto px-6 h-[68px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <img src={asset("/draypay-d-dark.png?v=1")} alt="" className="h-8 md:h-9 w-auto" style={{ height: 32, width: "auto" }} />
          <span className="italic font-black text-[22px] md:text-[24px] tracking-tight leading-none text-[var(--navy)]" style={{ fontFamily: "'Roboto', sans-serif" }}>Dray<span className="text-[#00a2e7]">Pay</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-[var(--navy)]/75">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              className="hover:text-[var(--navy)] transition-colors cursor-pointer"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#how-it-works"
            onClick={(e) => scrollTo(e, "#how-it-works")}
            className="hidden md:inline-flex text-[13px] font-semibold text-[var(--navy)]/75 hover:text-[var(--navy)] transition-colors cursor-pointer"
          >
            Book Demo
          </a>
          <a
            href="#services"
            onClick={(e) => scrollTo(e, "#services")}
            className="btn-primary text-[13px] px-5 py-2.5 inline-flex items-center gap-1.5"
          >
            <span className="label">Get Started</span>
          </a>
        </div>
      </div>
    </header>
  );
}
