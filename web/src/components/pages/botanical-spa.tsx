"use client";

import { useI18n } from "@/i18n/provider";
import { siteConfig } from "@/lib/site";

const spaCards = [
  {
    eyebrow: "spa.c1.eyebrow",
    title: "spa.c1.title",
    desc: "spa.c1.desc",
    f1: "spa.c1.f1",
    f2: "spa.c1.f2",
    f3: "spa.c1.f3",
    icon: "spa",
  },
  {
    eyebrow: "spa.c2.eyebrow",
    title: "spa.c2.title",
    desc: "spa.c2.desc",
    f1: "spa.c2.f1",
    f2: "spa.c2.f2",
    f3: "spa.c2.f3",
    icon: "face_retouching_natural",
  },
  {
    eyebrow: "spa.c3.eyebrow",
    title: "spa.c3.title",
    desc: "spa.c3.desc",
    f1: "spa.c3.f1",
    f2: "spa.c3.f2",
    f3: "spa.c3.f3",
    icon: "hot_tub",
  },
  {
    eyebrow: "spa.c4.eyebrow",
    title: "spa.c4.title",
    desc: "spa.c4.desc",
    f1: "spa.c4.f1",
    f2: "spa.c4.f2",
    f3: "spa.c4.f3",
    icon: "water_phy",
  },
];

const hammamSteps = [
  { title: "bsp.step1", desc: "bsp.step1Desc", icon: "steam" },
  { title: "bsp.step2", desc: "bsp.step2Desc", icon: "spa" },
  { title: "bsp.step3", desc: "bsp.step3Desc", icon: "hydration" },
];

const galleryImages = [
  { src: "/images/gm-photo-06-spa.jpg", alt: "Botanical spa treatment room" },
  { src: "/images/gm-photo-08-360view.jpg", alt: "Spa wellness area panoramic view" },
  { src: "/images/gm-photo-09-thumb1.jpg", alt: "Spa amenities and botanical products" },
  { src: "/images/gm-photo-10-thumb2.jpg", alt: "Hammam steam chamber" },
  { src: "/images/gm-photo-11-thumb3.jpg", alt: "Massage therapy space" },
  { src: "/images/gm-photo-12-thumb4.jpg", alt: "Relaxation lounge" },
];

export function BotanicalSpaContent() {
  const { t } = useI18n();

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low to-background py-12 lg:py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="text-sm uppercase tracking-widest text-primary font-semibold">
                {t("bsp.eyebrow")}
              </span>
              <h1 className="font-display text-4xl lg:text-5xl text-on-surface">
                {t("bsp.titlePrefix")}
                <span className="italic text-primary">
                  {t("bsp.title.italic")}
                </span>
              </h1>
              <p className="text-base lg:text-lg text-on-surface-variant max-w-xl">
                {t("bsp.desc")}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="/#quick-book"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary rounded-lg text-sm font-semibold uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5"
                >
                  {t("bsp.ctaBook")}
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </a>
                <div className="flex items-center gap-3 bg-surface-container-high px-4 py-2 rounded-lg shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">
                      call
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-on-surface-variant">
                      {t("bsp.inquiriesLabel")}
                    </span>
                    <a
                      className="text-base font-bold text-on-surface hover:text-primary transition-colors"
                      href={`tel:${siteConfig.phone}`}
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/images/gm-photo-06-spa.jpg"
                alt="Botanical spa and hammam at New Blossom Hotel & Spa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("bsp.servicesEyebrow")}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl text-on-surface mt-2">
              {t("bsp.servicesTitle")}
            </h2>
            <p className="text-base text-on-surface-variant mt-4">
              {t("bsp.servicesDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spaCards.map((card, i) => (
              <div
                key={i}
                className="group bg-surface-container-low hover:bg-surface-container transition-all duration-300 rounded-2xl p-6 shadow-sm hover:shadow-md flex flex-col"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-container/50 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[28px]">
                      {card.icon}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                      {t(card.eyebrow)}
                    </span>
                    <h3 className="font-display text-xl text-on-surface mt-1">
                      {t(card.title)}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant mb-4">
                  {t(card.desc)}
                </p>
                <div className="space-y-1.5 text-sm text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span>
                    {t(card.f1)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span>
                    {t(card.f2)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span>
                    {t(card.f3)}
                  </div>
                </div>
                <div className="pt-4 mt-auto">
                  <a
                    href="/#quick-book"
                    className="inline-flex items-center gap-1 text-sm uppercase tracking-wider text-primary hover:text-on-surface font-semibold group-hover:gap-2 transition-all"
                  >
                    {t("spa.bookRitual")}
                    <span className="material-symbols-outlined text-[16px]">
                      chevron_right
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hammam ritual */}
      <section className="py-16 bg-surface-container-low">
        <div className="container-max px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("bsp.hammamEyebrow")}
            </span>
            <h2 className="font-display text-3xl text-on-surface mt-2">
              {t("bsp.hammamTitle")}
            </h2>
            <p className="text-base text-on-surface-variant mt-4">
              {t("bsp.hammamDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hammamSteps.map((step, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl p-8 text-center shadow-sm relative"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <span className="material-symbols-outlined text-primary text-[40px] mb-3 block mt-2">
                  {step.icon}
                </span>
                <h3 className="font-display text-lg text-on-surface mb-2">
                  {t(step.title)}
                </h3>
                <p className="text-sm text-on-surface-variant">
                  {t(step.desc)}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/#quick-book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-sm font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all"
            >
              {t("bsp.bookHammam")}
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("bsp.galleryEyebrow")}
            </span>
            <h2 className="font-display text-3xl text-on-surface mt-2">
              {t("bsp.galleryTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
