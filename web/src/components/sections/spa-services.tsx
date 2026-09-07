"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";

const spaCards = [
  {
    eyebrow: "spa.c1.eyebrow",
    title: "spa.c1.title",
    desc: "spa.c1.desc",
    f1: "spa.c1.f1",
    f2: "spa.c1.f2",
    f3: "spa.c1.f3",
    icon: "spa",
    image: "/images/gm-photo-06-spa.jpg",
    color: "primary",
  },
  {
    eyebrow: "spa.c2.eyebrow",
    title: "spa.c2.title",
    desc: "spa.c2.desc",
    f1: "spa.c2.f1",
    f2: "spa.c2.f2",
    f3: "spa.c2.f3",
    icon: "face_retouching_natural",
    image: "/images/gm-photo-06-spa.jpg",
    color: "secondary",
  },
  {
    eyebrow: "spa.c3.eyebrow",
    title: "spa.c3.title",
    desc: "spa.c3.desc",
    f1: "spa.c3.f1",
    f2: "spa.c3.f2",
    f3: "spa.c3.f3",
    icon: "hot_tub",
    image: "/images/gm-photo-06-spa.jpg",
    color: "tertiary",
  },
  {
    eyebrow: "spa.c4.eyebrow",
    title: "spa.c4.title",
    desc: "spa.c4.desc",
    f1: "spa.c4.f1",
    f2: "spa.c4.f2",
    f3: "spa.c4.f3",
    icon: "water_phy",
    image: "/images/gm-photo-06-spa.jpg",
    color: "primary",
  },
];

export function SpaServices() {
  const { t } = useI18n();

  return (
    <section className="py-16 lg:py-24">
      <div className="container-max px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">
            {t("spa.eyebrow")}
          </span>
          <h2 className="font-display text-3xl lg:text-4xl text-on-surface mt-2">
            {t("spa.title")}
          </h2>
          <p className="text-base text-on-surface-variant mt-4">
            {t("spa.desc")}
          </p>
          <div className="flex items-center gap-2 text-primary text-sm uppercase tracking-wider font-semibold mt-4">
            <span>{t("spa.exploreAll")}</span>
            <span className="material-symbols-outlined text-[18px]">
              north_east
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaCards.map((card, i) => (
            <div
              key={i}
              className="group bg-surface-container-low hover:bg-surface-container transition-all duration-300 rounded-2xl p-6 shadow-sm hover:shadow-md flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-${card.color}-container/50 flex items-center justify-center text-${card.color} shrink-0`}
                >
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
                <Link
                  href="/#quick-book"
                  className="inline-flex items-center gap-1 text-sm uppercase tracking-wider text-primary hover:text-on-surface font-semibold group-hover:gap-2 transition-all"
                >
                  {t("spa.bookRitual")}
                  <span className="material-symbols-outlined text-[16px]">
                    chevron_right
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
