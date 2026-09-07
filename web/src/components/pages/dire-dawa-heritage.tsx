"use client";

import { useI18n } from "@/i18n/provider";
import { siteConfig } from "@/lib/site";

const excursions = [
  {
    eyebrow: "hp.railwayEyebrow",
    title: "hp.railwayTitle",
    desc: "hp.railwayDesc",
    tag: "hp.railwayTag",
    icon: "train",
    image: "/images/gm-photo-07-exterior.jpg",
  },
  {
    eyebrow: "hp.archEyebrow",
    title: "hp.archTitle",
    desc: "hp.archDesc",
    tag: "hp.archTag",
    icon: "apartment",
    image: "/images/gm-photo-02-lobby.jpg",
  },
  {
    eyebrow: "hp.spiceEyebrow",
    title: "hp.spiceTitle",
    desc: "hp.spiceDesc",
    tag: "hp.archTag",
    icon: "storefront",
    image: "/images/gm-photo-05-dining.jpg",
  },
];

export function HeritageContent() {
  const { t } = useI18n();

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low to-background py-12 lg:py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="text-sm uppercase tracking-widest text-primary font-semibold">
                {t("hp.eyebrow")}
              </span>
              <h1 className="font-display text-4xl lg:text-5xl text-on-surface">
                {t("hp.titlePrefix")}
                <span className="italic text-primary">
                  {t("hp.title.italic")}
                </span>
              </h1>
              <p className="text-base lg:text-lg text-on-surface-variant max-w-xl">
                {t("hp.desc")}
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/images/gm-photo-07-exterior.jpg"
                alt="Dire Dawa city and heritage views"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Excursions */}
      <section className="py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("hp.exploreEyebrow")}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl text-on-surface mt-2">
              {t("hp.exploreTitle")}
            </h2>
            <p className="text-base text-on-surface-variant mt-4">
              {t("hp.exploreDesc")}
            </p>
          </div>
          <div className="space-y-6">
            {excursions.map((ex, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-surface-container-low rounded-2xl overflow-hidden shadow-sm ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
                  <img
                    src={ex.image}
                    alt={t(ex.title)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 lg:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-[28px]">
                      {ex.icon}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                      {t(ex.eyebrow)}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-on-surface">
                    {t(ex.title)}
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    {t(ex.desc)}
                  </p>
                  <span className="inline-block text-xs uppercase tracking-wider text-on-surface-variant bg-surface-container-high px-3 py-1.5 rounded">
                    {t(ex.tag)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge CTA */}
      <section className="py-16 bg-surface-container-low">
        <div className="container-max px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="material-symbols-outlined text-primary text-[48px] mb-4 block">
              concierge
            </span>
            <h2 className="font-display text-3xl text-on-surface">
              {t("footer.col2d")}
            </h2>
            <p className="text-base text-on-surface-variant mt-4">
              {t("hp.exploreDesc")}
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-sm font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">
                  call
                </span>
                {siteConfig.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-on-surface border border-outline hover:bg-surface-container text-sm font-semibold uppercase tracking-wider rounded-lg transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">
                  mail
                </span>
                {t("footer.col3Title")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
