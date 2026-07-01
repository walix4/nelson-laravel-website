import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DrayGo · The drayage platform for North America",
  description: "Instant drayage quotes across every major U.S. port. Watch your freight move from port to door — in real time.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "DrayGo · The drayage platform for North America",
    description: "Instant drayage quotes across every major U.S. port. Watch your freight move from port to door — in real time.",
    url: "https://draygo.net",
    siteName: "DrayGo",
    images: [{ url: "https://draygo.net/og-image.png", width: 1200, height: 630, alt: "DrayGo" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DrayGo · The drayage platform for North America",
    description: "Instant drayage quotes across every major U.S. port.",
    images: ["https://draygo.net/og-image.png"],
  },
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
