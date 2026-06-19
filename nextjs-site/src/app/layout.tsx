import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drayage Blockchain · Real-Time Blockchain Verification for Drayage",
  description: "Create immutable records for rate confirmations, container movements, signatures, payments, and shipment events across the supply chain.",
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
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
