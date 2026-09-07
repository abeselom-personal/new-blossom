import type { Metadata } from "next";
import { VirtualTourContent } from "@/components/pages/virtual-tour";
import { JsonLd } from "@/components/seo/json-ld-render";
import { pageJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "360° Virtual Tour — Explore New Blossom Hotel & Spa",
  description:
    "Take a 360° virtual tour of New Blossom Hotel & Spa in Dire Dawa, Ethiopia. Explore the lobby, spa, rooms, dining areas, and gardens before you book your wellness retreat.",
  alternates: {
    canonical: "/virtual-tour",
  },
  openGraph: {
    title: "360° Virtual Tour — New Blossom Hotel & Spa, Dire Dawa",
    description:
      "Explore New Blossom Hotel & Spa in 360° — lobby, spa, rooms, dining, and gardens.",
    url: `${siteConfig.url}/virtual-tour`,
    images: [
      {
        url: "/images/gm-photo-360-panorama.jpg",
        width: 1200,
        height: 630,
        alt: "360° panoramic view of New Blossom Hotel & Spa",
      },
    ],
  },
};

export default function VirtualTourPage() {
  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: "/virtual-tour",
          name: "360° Virtual Tour — New Blossom Hotel & Spa",
          description:
            "Take a 360° virtual tour of New Blossom Hotel & Spa in Dire Dawa.",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "360° Tour", path: "/virtual-tour" },
          ],
        })}
      />
      <VirtualTourContent />
    </>
  );
}
