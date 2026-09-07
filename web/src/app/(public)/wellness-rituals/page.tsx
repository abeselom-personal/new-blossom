import type { Metadata } from "next";
import { WellnessContent } from "@/components/pages/wellness-rituals";
import { JsonLd } from "@/components/seo/json-ld-render";
import { pageJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wellness Rituals — Multi-Day Retreat Packages",
  description:
    "Multi-day wellness retreat packages at New Blossom Hotel & Spa in Dire Dawa. 3, 5, and 7-day programs blending Ethiopian botanical rituals, hammam, massage, yoga, and nourishing cuisine for deep restoration.",
  alternates: {
    canonical: "/wellness-rituals",
  },
  openGraph: {
    title: "Wellness Rituals — New Blossom Hotel & Spa, Dire Dawa",
    description:
      "Multi-day wellness retreat packages: 3, 5, and 7-day programs in Dire Dawa.",
    url: `${siteConfig.url}/wellness-rituals`,
    images: [
      {
        url: "/images/gm-photo-06-spa.jpg",
        width: 1200,
        height: 630,
        alt: "Wellness rituals and retreat packages at New Blossom Hotel & Spa",
      },
    ],
  },
};

export default function WellnessPage() {
  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: "/wellness-rituals",
          name: "Wellness Rituals — New Blossom Hotel & Spa",
          description:
            "Multi-day wellness retreat packages in Dire Dawa: 3, 5, and 7-day programs.",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Wellness Rituals", path: "/wellness-rituals" },
          ],
        })}
      />
      <WellnessContent />
    </>
  );
}
