"use client";

import { useI18n } from "@/i18n/provider";

const diningCards = [
  {
    eyebrow: "dining.c1.eyebrow",
    title: "dining.c1.title",
    desc: "dining.c1.desc",
    tag1: "dining.c1.tag1",
    tag2: "dining.c1.tag2",
    icon: "restaurant",
  },
  {
    eyebrow: "dining.c2.eyebrow",
    title: "dining.c2.title",
    desc: "dining.c2.desc",
    tag1: "dining.c2.tag1",
    tag2: "dining.c2.tag2",
    icon: "deck",
  },
  {
    eyebrow: "dining.c3.eyebrow",
    title: "dining.c3.title",
    desc: "dining.c3.desc",
    tag1: "dining.c3.tag1",
    tag2: "dining.c3.tag2",
    icon: "event",
  },
];

export function DiningPreview() {
  const { t } = useI18n();

  return (
    <section className="py-16 lg:py-24">
      <div className="container-max px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">
            {t("dining.eyebrow")}
          </span>
          <h2 className="font-display text-3xl lg:text-4xl text-on-surface mt-2">
            {t("dining.title")}
          </h2>
          <p className="text-base text-on-surface-variant mt-4">
            {t("dining.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {diningCards.map((card, i) => (
            <div
              key={i}
              className="group bg-surface-container-low hover:bg-surface-container transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/gm-photo-05-dining.jpg"
                  alt={t(card.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                  {t(card.eyebrow)}
                </span>
                <h3 className="font-display text-xl text-on-surface mt-1">
                  {t(card.title)}
                </h3>
                <p className="text-sm text-on-surface-variant mt-2 flex-1">
                  {t(card.desc)}
                </p>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-outline-variant">
                  <span className="text-xs uppercase tracking-wider text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
                    {t(card.tag1)}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">
                    {t(card.tag2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
