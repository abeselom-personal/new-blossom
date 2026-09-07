import type { Metadata } from "next";
import { SuitesStaysContent } from "@/components/pages/suites-stays";
import { JsonLd } from "@/components/seo/json-ld-render";
import { pageJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Suites & Stays — Luxury Rooms & Suites",
  description:
    "Explore the Royal Blossom Suite, Deluxe Garden Room, and amenities at New Blossom Hotel & Spa in Dire Dawa. King beds, marble baths, garden balconies, free WiFi, and breakfast included.",
  alternates: {
    canonical: "/suites-stays",
  },
  openGraph: {
    title: "Suites & Stays — New Blossom Hotel & Spa, Dire Dawa",
    description:
      "Luxury suites and rooms with king beds, marble baths, garden balconies, and aromatherapy. Wake to Dire Dawa birdsong in cloud-like bedding.",
    url: `${siteConfig.url}/suites-stays`,
    images: [
      {
        url: "/images/gm-photo-03-room.jpg",
        width: 1200,
        height: 630,
        alt: "Royal Blossom Suite at New Blossom Hotel & Spa",
      },
    ],
  },
};

export default function SuitesStaysPage() {
  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: "/suites-stays",
          name: "Suites & Stays — New Blossom Hotel & Spa",
          description:
            "Luxury suites and rooms in Dire Dawa with king beds, marble baths, garden balconies, and aromatherapy.",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Suites & Stays", path: "/suites-stays" },
          ],
        })}
      />
      <SuitesStaysContent />
    </>
  );
}
