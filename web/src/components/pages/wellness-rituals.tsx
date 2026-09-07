"use client";

import { useI18n } from "@/i18n/provider";
import { siteConfig } from "@/lib/site";

const programs = [
  {
    days: "wp.3days",
    title: "wp.3dayTitle",
    desc: "wp.3dayDesc",
    features: ["wp.3dayF1", "wp.3dayF2", "wp.3dayF3", "wp.3dayF4", "wp.3dayF5"],
    popular: false,
  },
  {
    days: "wp.5days",
    title: "wp.5dayTitle",
    desc: "wp.5dayDesc",
    features: ["wp.5dayF1", "wp.5dayF2", "wp.5dayF3", "wp.5dayF4", "wp.5dayF5", "wp.5dayF6"],
    popular: true,
  },
  {
    days: "wp.7days",
    title: "wp.7dayTitle",
    desc: "wp.7dayDesc",
    features: ["wp.7dayF1", "wp.7dayF2", "wp.7dayF3", "wp.7dayF4", "wp.7dayF5", "wp.7dayF6"],
    popular: false,
  },
];

const philosophy = [
  { title: "wp.philF1Title", desc: "wp.philF1Desc", icon: "eco" },
  { title: "wp.philF2Title", desc: "wp.philF2Desc", icon: "self_improvement" },
  { title: "wp.philF3Title", desc: "wp.philF3Desc", icon: "restaurant_menu" },
];

export function WellnessContent() {
  const { t } = useI18n();

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low to-background py-12 lg:py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="text-sm uppercase tracking-widest text-primary font-semibold">
                {t("wp.eyebrow")}
              </span>
              <h1 className="font-display text-4xl lg:text-5xl text-on-surface">
                {t("wp.titlePrefix")}
                <span className="italic text-primary">
                  {t("wp.title.italic")}
                </span>
                {t("wp.titleSuffix")}
              </h1>
              <p className="text-base lg:text-lg text-on-surface-variant max-w-xl">
                {t("wp.desc")}
              </p>
              <a
                href="/#quick-book"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary rounded-lg text-sm font-semibold uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5"
              >
                {t("wp.ctaBook")}
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </a>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/images/gm-photo-06-spa.jpg"
                alt="Wellness rituals at New Blossom Hotel & Spa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("wp.programsEyebrow")}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl text-on-surface mt-2">
              {t("wp.programsTitle")}
            </h2>
            <p className="text-base text-on-surface-variant mt-4">
              {t("wp.programsDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((prog, i) => (
              <div
                key={i}
                className={`relative bg-surface-container-low rounded-2xl p-8 flex flex-col shadow-sm ${
                  prog.popular ? "ring-2 ring-primary md:scale-105" : ""
                }`}
              >
                {prog.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-xs uppercase tracking-wider font-bold px-4 py-1 rounded-full shadow-md">
                    {t("wp.popular")}
                  </div>
                )}
                <span className="text-sm uppercase tracking-widest text-primary font-semibold">
                  {t(prog.days)}
                </span>
                <h3 className="font-display text-xl text-on-surface mt-2">
                  {t(prog.title)}
                </h3>
                <p className="text-sm text-on-surface-variant mt-2 flex-1">
                  {t(prog.desc)}
                </p>
                <ul className="space-y-2 mt-4">
                  {prog.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">
                        check_circle
                      </span>
                      {t(f)}
                    </li>
                  ))}
                </ul>
                <a
                  href="/#quick-book"
                  className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-sm font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all"
                >
                  {t("wp.book")}
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 bg-surface-container-low">
        <div className="container-max px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("wp.philosophyEyebrow")}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl text-on-surface mt-2">
              {t("wp.philosophyTitle")}
            </h2>
            <p className="text-base text-on-surface-variant mt-4">
              {t("wp.philosophyDesc1")}
            </p>
            <p className="text-base text-on-surface-variant mt-2">
              {t("wp.philosophyDesc2")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {philosophy.map((p, i) => (
              <div key={i} className="bg-surface rounded-2xl p-8 space-y-3">
                <span className="material-symbols-outlined text-primary text-[32px]">
                  {p.icon}
                </span>
                <h3 className="font-display text-lg text-on-surface">
                  {t(p.title)}
                </h3>
                <p className="text-sm text-on-surface-variant">{t(p.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center bg-surface-container-low rounded-3xl p-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("wp.ctaEyebrow")}
            </span>
            <h2 className="font-display text-3xl text-on-surface mt-2">
              {t("wp.ctaTitle")}
            </h2>
            <p className="text-base text-on-surface-variant mt-4">
              {t("wp.ctaDesc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a
                href="/#quick-book"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-sm font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all"
              >
                {t("wp.ctaBookRetreat")}
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-on-surface border border-outline hover:bg-surface-container text-sm font-semibold uppercase tracking-wider rounded-lg transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">
                  call
                </span>
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
