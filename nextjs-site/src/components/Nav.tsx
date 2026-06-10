"use client";
import Link from "next/link";
import { asset } from "@/lib/site";

const LINKS = [
  { label: "Wallet", href: "/wallet" },
  { label: "How Payments Work", href: "/payments" },
  { label: "QuickPay", href: "/quickpay" },
  { label: "Live Settlements", href: "/settlements" },
  { label: "Fees", href: "/fees" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b" style={{ background: "#0B2D5C", borderColor: "rgba(255,255,255,0.18)" }}>
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <img src={asset("/draypay-d.png?v=1")} alt="" className="h-8 md:h-10 w-auto" />
          <span className="italic font-black text-[22px] md:text-[26px] tracking-tight leading-none text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>Dray<span className="text-[#00a2e7]">Pay</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-white/85">
          {LINKS.map((l) => <Link key={l.href} href={l.href} className="hover:text-white">{l.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2.5">
          <Link href="/wallet" className="btn-primary text-[13px] px-4 py-2 rounded inline-flex items-center gap-1.5"><span className="label">Open Wallet</span></Link>
        </div>
      </div>
    </header>
  );
}
