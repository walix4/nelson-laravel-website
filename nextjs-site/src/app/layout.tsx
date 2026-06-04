import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DrayToll · The truck toll-cost network for North America",
  description: "Instant toll costs for every truck route across the U.S. & Canada — by axle class, corridor and transponder network. Know the toll before you dispatch.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" defer></script>
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
