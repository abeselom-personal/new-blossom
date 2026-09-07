import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { getLocale } from "@/i18n";
import { I18nProvider } from "@/i18n/provider";
import { JsonLd } from "@/components/seo/json-ld-render";
import { hotelJsonLd, websiteJsonLd } from "@/components/seo/json-ld";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  generator: "Next.js",
  keywords: [
    "New Blossom Hotel",
    "New Blossom Hotel & Spa",
    "Dire Dawa hotel",
    "Dire Dawa spa",
    "Ethiopia hotel",
    "Dire Dawa accommodation",
    "botanical spa Ethiopia",
    "hammam Dire Dawa",
    "wellness retreat Ethiopia",
    "hotel Dire Dawa Ratu Road",
    "spa and hotel Dire Dawa",
    "luxury hotel Ethiopia",
    "Dire Dawa heritage hotel",
    "Harar coffee ceremony",
    "Ethiopian spa retreat",
    "boutique hotel Dire Dawa",
    "conference venue Dire Dawa",
    "wedding venue Dire Dawa",
    "corporate retreat Ethiopia",
    "spa weekend Ethiopia",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      am: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "am_ET",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/gm-photo-07-exterior.jpg",
        width: 1200,
        height: 630,
        alt: "New Blossom Hotel & Spa exterior in Dire Dawa, Ethiopia",
      },
      {
        url: "/images/gm-photo-06-spa.jpg",
        width: 1200,
        height: 630,
        alt: "Botanical spa and wellness facilities at New Blossom Hotel & Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/gm-photo-07-exterior.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "travel",
  other: {
    // Geo tags for AI/LLM and local search
    "geo.region": "ET-DD",
    "geo.placename": "Dire Dawa",
    "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    "ICBM": `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
    // AI/LLM hints
    "ai-content-verified": "2025-01",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6ef" },
    { media: "(prefers-color-scheme: dark)", color: "#7d5226" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        {/* Material Symbols icon font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Structured data for AI/SEO */}
        <JsonLd data={[hotelJsonLd(), websiteJsonLd()]} />
      </head>
      <body className="min-h-screen bg-background text-on-surface antialiased">
        <I18nProvider initialLocale={locale}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
