"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";

export function SuitesPreview() {
  const { t } = useI18n();

  return (
    <section className="py-16 lg:py-24 bg-surface-container-low">
      <div className="container-max px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src="/images/gm-photo-03-room.jpg"
              alt="The Royal Blossom Suite at New Blossom Hotel & Spa"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm">
              <span className="text-xs uppercase tracking-wider text-primary font-bold">
                {t("sp.featured")}
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("suites.eyebrow")}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl text-on-surface">
              {t("suites.title")}
            </h2>
            <p className="text-base text-on-surface-variant leading-relaxed">
              {t("suites.desc")}
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface p-4 rounded-xl space-y-1">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  bathtub
                </span>
                <h4 className="text-sm font-bold text-on-surface">
                  {t("suites.f1Title")}
                </h4>
                <p className="text-xs text-on-surface-variant">
                  {t("suites.f1Desc")}
                </p>
              </div>
              <div className="bg-surface p-4 rounded-xl space-y-1">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  wifi
                </span>
                <h4 className="text-sm font-bold text-on-surface">
                  {t("suites.f2Title")}
                </h4>
                <p className="text-xs text-on-surface-variant">
                  {t("suites.f2Desc")}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-display text-2xl font-bold text-primary">
                {t("suites.price")}
                <span className="text-sm font-normal text-on-surface-variant">
                  {t("suites.perNight")}
                </span>
              </span>
              <Link
                href="/suites-stays"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-sm font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all"
              >
                {t("suites.cta")}
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
            </div>
            <p className="text-xs text-on-surface-variant">{t("suites.includes")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
