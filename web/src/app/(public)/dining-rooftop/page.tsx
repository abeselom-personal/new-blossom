import type { Metadata } from "next";
import { DiningContent } from "@/components/pages/dining-rooftop";
import { JsonLd } from "@/components/seo/json-ld-render";
import { pageJsonLd, restaurantJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dining & Rooftop — Garden Restaurant, Terrace, Menu",
  description:
    "Dine at New Blossom Hotel & Spa's garden restaurant, courtyard terrace, and executive lounge in Dire Dawa. Full restaurant menu with soups and salads, Harar coffee ceremony, and Horn of Africa cuisine. Open daily 7 AM – 11 PM.",
  alternates: {
    canonical: "/dining-rooftop",
  },
  openGraph: {
    title: "Dining & Rooftop — New Blossom Hotel & Spa, Dire Dawa",
    description:
      "Garden restaurant, courtyard terrace, executive lounge, and full restaurant menu in Dire Dawa.",
    url: `${siteConfig.url}/dining-rooftop`,
    images: [
      {
        url: "/images/gm-photo-05-dining.jpg",
        width: 1200,
        height: 630,
        alt: "Garden restaurant dining at New Blossom Hotel & Spa",
      },
    ],
  },
};

export default function DiningPage() {
  return (
    <>
      <JsonLd
        data={[
          restaurantJsonLd(),
          ...pageJsonLd({
            path: "/dining-rooftop",
            name: "Dining & Rooftop — New Blossom Hotel & Spa",
            description:
              "Garden restaurant, courtyard terrace, executive lounge, and full menu in Dire Dawa.",
            breadcrumbs: [
              { name: "Home", path: "/" },
              { name: "Dining & Rooftop", path: "/dining-rooftop" },
            ],
          }),
        ]}
      />
      <DiningContent />
    </>
  );
}
