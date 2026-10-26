import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yarfix.pk"),
  title: "YarFix — Ghar Ka Har Masla, Hal | Home Services & Marketplace Pakistan",
  description:
    "YarFix is coming soon to Pakistan! Connecting you with trusted home maintenance professionals and a curated marketplace for quality pre-loved goods. Join our Early Access list.",
  keywords: [
    "YarFix",
    "Home Services Pakistan",
    "Karachi Home Maintenance",
    "Electrician Karachi",
    "Plumber Karachi",
    "AC Service Pakistan",
    "Used Products Marketplace Pakistan",
    "Pre-loved tech Karachi",
    "Ghar Ka Har Masla Hal",
  ],
  authors: [{ name: "YarFix" }],
  icons: {
    icon: "/logo-badge.png",
    apple: "/logo-badge.png",
  },
  openGraph: {
    title: "YarFix — Ghar Ka Har Masla, Hal",
    description:
      "Pakistan's premier platform for reliable home services and verified pre-loved marketplace. Coming soon — Join early access!",
    url: "https://yarfix.pk",
    siteName: "YarFix",
    images: [
      {
        url: "/logo-full.png",
        width: 1024,
        height: 1024,
        alt: "YarFix — Ghar Ka Har Masla, Hal",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#061a13",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#061a13] text-[#f3f5f4] antialiased min-h-screen selection:bg-brand-gold/30 selection:text-brand-goldLight">
        {children}
      </body>
    </html>
  );
}
