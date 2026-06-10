import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DrayPay · The Financial Hub for Modern Logistics",
  description: "Manage payments, balances, payouts and transfers across your entire transportation network from a single wallet built for logistics.",
};

const BASE = process.env.NEXT_PUBLIC_BASE || "";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href={`${BASE}/favicon.ico?v=3`} sizes="any" />
        <link rel="icon" type="image/png" href={`${BASE}/favicon.png?v=3`} />
        <link rel="apple-touch-icon" href={`${BASE}/apple-touch-icon.png?v=3`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
