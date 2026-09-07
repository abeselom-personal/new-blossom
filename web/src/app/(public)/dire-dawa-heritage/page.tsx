import type { Metadata } from "next";
import { HeritageContent } from "@/components/pages/dire-dawa-heritage";
import { JsonLd } from "@/components/seo/json-ld-render";
import { pageJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dire Dawa Heritage — Railway, Architecture & Spice Routes",
  description:
    "Explore Dire Dawa's heritage with New Blossom Hotel & Spa's curated excursions: the 1902 Chemin de Fer railway station, Kezira French colonial architecture, vibrant spice markets, and Harar coffee trail. Concierge-arranged tours.",
  alternates: {
    canonical: "/dire-dawa-heritage",
  },
  openGraph: {
    title: "Dire Dawa Heritage — New Blossom Hotel & Spa",
    description:
      "Curated heritage excursions: railway station, French colonial architecture, spice markets, and Harar coffee trail.",
    url: `${siteConfig.url}/dire-dawa-heritage`,
    images: [
      {
        url: "/images/gm-photo-07-exterior.jpg",
        width: 1200,
        height: 630,
        alt: "Dire Dawa heritage and city views",
      },
    ],
  },
};

export default function HeritagePage() {
  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: "/dire-dawa-heritage",
          name: "Dire Dawa Heritage — New Blossom Hotel & Spa",
          description:
            "Curated heritage excursions in Dire Dawa: railway, architecture, spice markets, and Harar.",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Dire Dawa Heritage", path: "/dire-dawa-heritage" },
          ],
        })}
      />
      <HeritageContent />
    </>
  );
}
