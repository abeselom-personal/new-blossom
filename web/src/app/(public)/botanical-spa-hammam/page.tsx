import type { Metadata } from "next";
import { BotanicalSpaContent } from "@/components/pages/botanical-spa";
import { JsonLd } from "@/components/seo/json-ld-render";
import { pageJsonLd, spaServiceJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Botanical Spa & Hammam — Ethiopian Wellness Rituals",
  description:
    "Experience 16 signature spa rituals and traditional Ethiopian hammam at New Blossom Hotel & Spa. Frankincense steam, Harar coffee scrubs, acacia honey wraps, and deep tissue massage in Dire Dawa.",
  alternates: {
    canonical: "/botanical-spa-hammam",
  },
  openGraph: {
    title: "Botanical Spa & Hammam — New Blossom Hotel & Spa, Dire Dawa",
    description:
      "Ancient Ethiopian botanical rituals, frankincense steam, Harar coffee scrubs, and traditional hammam in Dire Dawa.",
    url: `${siteConfig.url}/botanical-spa-hammam`,
    images: [
      {
        url: "/images/gm-photo-06-spa.jpg",
        width: 1200,
        height: 630,
        alt: "Botanical spa and hammam at New Blossom Hotel & Spa",
      },
    ],
  },
};

export default function BotanicalSpaPage() {
  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: "/botanical-spa-hammam",
          name: "Botanical Spa & Hammam — New Blossom Hotel & Spa",
          description:
            "16 signature spa rituals and traditional Ethiopian hammam in Dire Dawa.",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Botanical Spa & Hammam", path: "/botanical-spa-hammam" },
          ],
        })}
      />
      <BotanicalSpaContent />
    </>
  );
}
