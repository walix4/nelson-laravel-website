import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DrayToll · The truck toll-cost network for North America",
  description: "Instant toll costs for every truck route across the U.S. & Canada — by axle class, corridor and transponder network. Know the toll before you dispatch.",
};

const BASE = process.env.NEXT_PUBLIC_BASE || "";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href={`${BASE}/favicon.ico?v=2`} sizes="any" />
        <link rel="icon" type="image/png" href={`${BASE}/favicon.png?v=2`} />
        <link rel="apple-touch-icon" href={`${BASE}/apple-touch-icon.png?v=2`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
