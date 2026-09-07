import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "/", priority: 1.0, changeFreq: "weekly" as const },
    { path: "/suites-stays", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/botanical-spa-hammam", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/dining-rooftop", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/dire-dawa-heritage", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/wellness-rituals", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/virtual-tour", priority: 0.7, changeFreq: "monthly" as const },
  ];

  return pages.map((p) => ({
    url: `${siteConfig.url}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFreq,
    priority: p.priority,
  }));
}
