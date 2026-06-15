import Link from "next/link";
import { asset } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="text-white/85 py-14 border-t border-white/10 mt-10" style={{ background: "#08163C" }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center">
              <img src={asset("/logo-draygo.png")} alt="DrayGo" className="h-10 w-auto" />
            </div>
            <p className="mt-3 max-w-sm text-white/75 text-[13px]">The drayage pricing network for North America. Instant rates across every U.S. container port.</p>
          </div>
          <Link href="/tools" className="text-[13px] font-semibold text-white/90 hover:text-white inline-flex items-center gap-2">← All tools</Link>
        </div>
        <div className="mt-8 text-[11px] text-white/55 num">© 2026 drayagerate.net · All rights reserved</div>
      </div>
    </footer>
  );
}
