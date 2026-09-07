"use client";

import { useI18n } from "@/i18n/provider";
import { siteConfig } from "@/lib/site";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low to-background">
      <div className="container-max px-4 lg:px-8 pt-12 pb-8 lg:pt-16 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <span className="inline-block text-sm uppercase tracking-widest text-primary font-semibold">
              {t("hero.eyebrow")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight">
              {t("hero.title.prefix")}
              <span className="italic text-primary">
                {t("hero.title.italic")}
              </span>
              {t("hero.title.suffix")}
            </h1>
            <p className="text-base lg:text-lg text-on-surface-variant max-w-xl leading-relaxed">
              {t("hero.desc")}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#quick-book"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:-translate-y-0.5"
              >
                {t("hero.ctaBook")}
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
                    {t("hero.inquiriesLabel")}
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

            {/* Feature bullets */}
            <div className="grid grid-cols-3 gap-4 pt-4 text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  spa
                </span>
                <span className="text-xs uppercase font-medium">
                  {t("hero.featSpa")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  king_bed
                </span>
                <span className="text-xs uppercase font-medium">
                  {t("hero.featRooms")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  wifi
                </span>
                <span className="text-xs uppercase font-medium">
                  {t("hero.featWifi")}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/images/gm-photo-07-exterior.jpg"
                alt="New Blossom Hotel & Spa exterior — sunlit gardens and courtyards in Dire Dawa"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Circular badge */}
            <div className="hidden lg:flex absolute -bottom-8 -left-6 md:-bottom-10 md:-left-10 w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-primary-container via-surface-container-lowest to-secondary shadow-2xl items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden p-1 bg-surface">
                <img
                  src="/images/gm-photo-06-spa.jpg"
                  alt="Spa wellness therapeutic essence and botanical craft"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
