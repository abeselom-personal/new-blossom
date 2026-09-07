export const siteConfig = {
  name: "New Blossom Hotel & Spa",
  shortName: "New Blossom",
  legalName: "New Blossom Hotel & Spa, Dire Dawa",
  url: "https://www.newblossomdiredawa.com",
  description:
    "New Blossom Hotel & Spa — a sanctuary of restorative calm and botanical luxury in Dire Dawa, Ethiopia. Spa, hammam, suites, dining, and wellness retreats rooted in Ethiopian healing traditions.",
  tagline: "A Sanctuary of Restorative Calm & Botanical Luxury",
  // Contact
  phone: "+251251114000",
  phoneDisplay: "+251 25 111 4000",
  email: "concierge@newblossomdiredawa.com",
  // Location — Dire Dawa, Ethiopia
  address: {
    street: "Ratu Road",
    city: "Dire Dawa",
    region: "Dire Dawa",
    country: "Ethiopia",
    countryCode: "ET",
    postalCode: "",
  },
  geo: {
    latitude: 9.5908,
    longitude: 41.8662,
  },
  // Social / sameAs
  sameAs: [
    "https://www.google.com/maps/place/New+Blossom+Hotel+%26+Spa",
  ],
  // Languages
  locales: ["en", "am"],
  defaultLocale: "en",
  // Nav
  nav: [
    { href: "/suites-stays", key: "nav.suites" },
    { href: "/botanical-spa-hammam", key: "nav.spa" },
    { href: "/dining-rooftop", key: "nav.dining" },
    { href: "/dire-dawa-heritage", key: "nav.heritage" },
    { href: "/wellness-rituals", key: "nav.wellness" },
    { href: "/virtual-tour", key: "nav.virtualTour" },
  ],
  // API
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1",
} as const;

export type SiteConfig = typeof siteConfig;
