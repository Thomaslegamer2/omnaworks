import type { Metadata, Viewport } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeSync } from "@/components/theme-sync";
import { getSiteUrl } from "@/lib/site";
import { studio } from "@/lib/studio";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Omnaworks — le site de l'équipe",
    template: "%s — Omnaworks",
  },
  description: studio.description,
  applicationName: "Omnaworks",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Omnaworks",
    title: "Omnaworks — le site de l'équipe",
    description: studio.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Omnaworks — le site de l'équipe",
    description: studio.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050510",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-theme="default" className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-canvas font-sans text-ink">
        <div className="atmosphere pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-3 focus:py-2 focus:text-ink"
        >
          Aller au contenu
        </a>
        <div className="relative z-10">
          <ThemeSync />
          <Header />
          <div id="contenu">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
