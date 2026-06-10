import Link from "next/link";
import { asset } from "@/lib/site";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Smart Wallet", href: "/wallet" },
      { label: "How payments work", href: "/payments" },
      { label: "QuickPay & factoring", href: "/quickpay" },
      { label: "Live settlements", href: "/settlements" },
      { label: "Fees & volume", href: "/fees" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Open a wallet", href: "/wallet" },
      { label: "Escrow & settlement", href: "/payments" },
      { label: "Fee schedule", href: "/fees" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Support", href: "#" },
      { label: "Request access", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Data quality", href: "#" },
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
            <span className="flex items-center gap-2.5">
              <img src={asset("/draypay-d.png?v=1")} alt="" className="h-9 w-auto" />
              <span className="italic font-black text-[24px] tracking-tight leading-none text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>Dray<span className="text-[#00a2e7]">Pay</span></span>
            </span>
            <p className="mt-4 max-w-xs text-white/60 text-[13.5px] leading-relaxed">
              The financial hub for modern logistics. Instant payouts, automated settlement and complete payment visibility for shippers, brokers, carriers and drivers.
            </p>
            <a href="mailto:support@draypay.net" className="mt-2 inline-block text-[13.5px] font-semibold text-[var(--red)] hover:opacity-80">support@draypay.net</a>
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
          <div className="num">© 2026 DrayPay. All rights reserved.</div>
          <div className="num">Instant payouts · Automated settlement · 99.9% uptime</div>
        </div>
      </div>
    </footer>
  );
}
