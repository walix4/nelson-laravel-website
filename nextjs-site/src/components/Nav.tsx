"use client";
import Link from "next/link";
import { asset } from "@/lib/site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b" style={{ background: "#0B2D5C", borderColor: "rgba(255,255,255,0.18)" }}>
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <img src={asset("/draychain-mark.png?v=1")} alt="DrayChain" className="h-8 md:h-9 w-auto" />
          <span className="text-white font-bold text-[20px] md:text-[22px] tracking-tight leading-none">Dray<span className="text-[#8fa8e6]">Chain</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-white/85">
          <Link href="/technology" className="hover:text-white">Technology</Link>
          <Link href="/solutions" className="hover:text-white">Solutions</Link>
          <Link href="/network" className="hover:text-white">Live Network</Link>
          <Link href="/estimates" className="hover:text-white">Records Stream</Link>
        </nav>
        <div className="flex items-center gap-2.5">
          <Link href="/network" className="btn-primary text-[13px] px-4 py-2 rounded inline-flex items-center gap-1.5"><span className="label">Verify a Record</span></Link>
        </div>
      </div>
    </header>
  );
}
