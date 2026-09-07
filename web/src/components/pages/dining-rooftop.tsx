"use client";

import { useI18n } from "@/i18n/provider";

const diningCards = [
  {
    eyebrow: "dp.gardenEyebrow",
    title: "dp.gardenTitle",
    desc: "dp.gardenDesc",
    tag1: "dp.gardenTag1",
    tag2: "dp.gardenTag2",
    image: "/images/gm-photo-05-dining.jpg",
  },
  {
    eyebrow: "dp.courtyardEyebrow",
    title: "dp.courtyardTitle",
    desc: "dp.courtyardDesc",
    tag1: "dp.courtyardTag1",
    tag2: "dp.courtyardTag2",
    image: "/images/gm-photo-02-lobby.jpg",
  },
  {
    eyebrow: "dp.loungeEyebrow",
    title: "dp.loungeTitle",
    desc: "dp.loungeDesc",
    tag1: "dp.loungeTag1",
    tag2: "dp.loungeTag2",
    image: "/images/linkedin-awash-bank-training.jpg",
  },
];

const signatureDishes = [
  {
    eyebrow: "dp.dish1Eyebrow",
    title: "dp.dish1Title",
    desc: "dp.dish1Desc",
    icon: "nutrition",
  },
  {
    eyebrow: "dp.dish2Eyebrow",
    title: "dp.dish2Title",
    desc: "dp.dish2Desc",
    icon: "coffee",
  },
  {
    eyebrow: "dp.dish3Eyebrow",
    title: "dp.dish3Title",
    desc: "dp.dish3Desc",
    icon: "restaurant",
  },
  {
    eyebrow: "dp.dish4Eyebrow",
    title: "dp.dish4Title",
    desc: "dp.dish4Desc",
    icon: "local_drink",
  },
];

const soups = [
  { name: "dp.s1Name", desc: "dp.s1Desc", price: "180" },
  { name: "dp.s2Name", desc: "dp.s2Desc", price: "180" },
  { name: "dp.s3Name", desc: "dp.s3Desc", price: "180" },
  { name: "dp.s4Name", desc: "dp.s4Desc", price: "200" },
  { name: "dp.s5Name", desc: "dp.s5Desc", price: "200" },
  { name: "dp.s6Name", desc: "dp.s6Desc", price: "170" },
  { name: "dp.s7Name", desc: "dp.s7Desc", price: "170" },
  { name: "dp.s8Name", desc: "dp.s8Desc", price: "190" },
  { name: "dp.s9Name", desc: "dp.s9Desc", price: "220" },
];

const salads = [
  { name: "dp.sl1Name", desc: "dp.sl1Desc", price: "350" },
  { name: "dp.sl2Name", desc: "dp.sl2Desc", price: "200" },
  { name: "dp.sl3Name", desc: "dp.sl3Desc", price: "250" },
  { name: "dp.sl4Name", desc: "dp.sl4Desc", price: "270" },
  { name: "dp.sl5Name", desc: "dp.sl5Desc", price: "180" },
  { name: "dp.sl6Name", desc: "dp.sl6Desc", price: "180" },
  { name: "dp.sl7Name", desc: "dp.sl7Desc", price: "280" },
  { name: "dp.sl8Name", desc: "dp.sl8Desc", price: "300" },
  { name: "dp.sl9Name", desc: "dp.sl9Desc", price: "300" },
  { name: "dp.sl10Name", desc: "dp.sl10Desc", price: "200" },
];

const eventFeatures = [
  { title: "dp.eventsF1", desc: "dp.eventsF1Desc", icon: "groups" },
  { title: "dp.eventsF2", desc: "dp.eventsF2Desc", icon: "restaurant" },
  { title: "dp.eventsF3", desc: "dp.eventsF3Desc", icon: "spa" },
  { title: "dp.eventsF4", desc: "dp.eventsF4Desc", icon: "videocam" },
];

export function DiningContent() {
  const { t } = useI18n();

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low to-background py-12 lg:py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("dp.eyebrow")}
            </span>
            <h1 className="font-display text-4xl lg:text-5xl text-on-surface mt-2">
              {t("dp.titlePrefix")}
              <span className="italic text-primary">
                {t("dp.title.italic")}
              </span>
            </h1>
            <p className="text-base lg:text-lg text-on-surface-variant mt-4 max-w-xl">
              {t("dp.desc")}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-lg">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  schedule
                </span>
                <span className="text-sm font-semibold text-on-surface">
                  {t("dp.openDaily")}
                </span>
                <span className="text-sm text-on-surface-variant">
                  {t("dp.hours")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dining venues */}
      <section className="py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("dp.expEyebrow")}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl text-on-surface mt-2">
              {t("dp.expTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {diningCards.map((card, i) => (
              <div
                key={i}
                className="group bg-surface-container-low hover:bg-surface-container transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={card.image}
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

      {/* Signature dishes */}
      <section className="py-16 bg-surface-container-low">
        <div className="container-max px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("dp.menuEyebrow")}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl text-on-surface mt-2">
              {t("dp.menuTitle")}
            </h2>
            <p className="text-base text-on-surface-variant mt-4">
              {t("dp.menuDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {signatureDishes.map((dish, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl p-6 shadow-sm flex items-start gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-container/50 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[28px]">
                    {dish.icon}
                  </span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                    {t(dish.eyebrow)}
                  </span>
                  <h3 className="font-display text-lg text-on-surface mt-1">
                    {t(dish.title)}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-1">
                    {t(dish.desc)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant Menu */}
      <section className="py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("dp.rmEyebrow")}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl text-on-surface mt-2">
              {t("dp.rmTitle")}
            </h2>
            <p className="text-base text-on-surface-variant mt-4">
              {t("dp.rmDesc")}
            </p>
          </div>

          {/* Soups */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="font-display text-2xl text-primary mb-6 pb-2 border-b-2 border-primary-container">
              {t("dp.rmSoups")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {soups.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-4 pb-3 border-b border-outline-variant/50"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-on-surface">
                      {t(item.name)}
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {t(item.desc)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-primary whitespace-nowrap">
                    {item.price} ETB
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Salads */}
          <div className="max-w-4xl mx-auto">
            <h3 className="font-display text-2xl text-primary mb-6 pb-2 border-b-2 border-primary-container">
              {t("dp.rmSalads")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {salads.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-4 pb-3 border-b border-outline-variant/50"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-on-surface">
                      {t(item.name)}
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {t(item.desc)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-primary whitespace-nowrap">
                    {item.price} ETB
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-on-surface-variant mt-8 max-w-2xl mx-auto">
            {t("dp.rmNote")}
          </p>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 bg-surface-container-low">
        <div className="container-max px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("dp.eventsEyebrow")}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl text-on-surface mt-2">
              {t("dp.eventsTitle")}
            </h2>
            <p className="text-base text-on-surface-variant mt-4">
              {t("dp.eventsDesc")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {eventFeatures.map((f, i) => (
              <div
                key={i}
                className="bg-surface p-6 rounded-xl text-center space-y-2"
              >
                <span className="material-symbols-outlined text-primary text-[28px]">
                  {f.icon}
                </span>
                <h4 className="text-sm font-bold text-on-surface">{t(f.title)}</h4>
                <p className="text-xs text-on-surface-variant">{t(f.desc)}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="/#quick-book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-sm font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all"
            >
              {t("dp.inquireEvents")}
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
