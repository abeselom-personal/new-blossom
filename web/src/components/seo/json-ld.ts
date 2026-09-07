import { siteConfig } from "@/lib/site";

/**
 * JSON-LD structured data for the hotel (LocalBusiness / LodgingBusiness schema).
 * Optimized for AI/LLM discovery and rich search results.
 */
export function hotelJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${siteConfig.url}/#hotel`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    image: [
      `${siteConfig.url}/images/gm-photo-07-exterior.jpg`,
      `${siteConfig.url}/images/gm-photo-02-lobby.jpg`,
      `${siteConfig.url}/images/gm-photo-06-spa.jpg`,
      `${siteConfig.url}/images/gm-photo-03-room.jpg`,
    ],
    logo: `${siteConfig.url}/images/new-blossom-logo.png`,
    priceRange: "$$",
    starRating: {
      "@type": "Rating",
      ratingValue: "3.5",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "3.5",
      reviewCount: "116",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    sameAs: siteConfig.sameAs,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Spa", value: true },
      { "@type": "LocationFeatureSpecification", name: "Hammam", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
      { "@type": "LocationFeatureSpecification", name: "Room Service", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "24h Security", value: true },
    ],
    checkinTime: "14:00",
    checkoutTime: "12:00",
    petsAllowed: false,
    smokingAllowed: false,
  };
}

/**
 * JSON-LD for a specific page (Breadcrumb + WebPage).
 */
export function pageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  breadcrumbs: { name: string; path: string }[];
}) {
  const url = `${siteConfig.url}${opts.path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name: opts.name,
      description: opts.description,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      primaryImageOfPage: {
        "@id": `${url}#primaryimage`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: opts.breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: `${siteConfig.url}${b.path}`,
      })),
    },
  ];
}

/**
 * JSON-LD for the website root.
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#hotel` },
    inLanguage: ["en", "am"],
  };
}

/**
 * JSON-LD for a spa service.
 */
export function spaServiceJsonLd(opts: {
  name: string;
  description: string;
  duration: string;
  price: number;
  priceCurrency: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    provider: { "@id": `${siteConfig.url}/#hotel` },
    serviceType: "Spa Treatment",
    offers: {
      "@type": "Offer",
      price: opts.price,
      priceCurrency: opts.priceCurrency,
    },
  };
}

/**
 * JSON-LD for a restaurant menu.
 */
export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteConfig.url}/dining-rooftop#restaurant`,
    name: "Garden Restaurant — New Blossom Hotel & Spa",
    servesCuisine: ["Ethiopian", "International", "Horn of Africa"],
    parentOrganization: { "@id": `${siteConfig.url}/#hotel` },
    openingHours: "Mo-Su 07:00-23:00",
    acceptsReservations: true,
    priceRange: "$$",
  };
}

/**
 * JSON-LD for FAQ.
 */
export function faqJsonLd(opts: { questions: { q: string; a: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: opts.questions.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.a,
      },
    })),
  };
}
