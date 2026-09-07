"use client";

import { useI18n } from "@/i18n/provider";

export function Testimonial() {
  const { t } = useI18n();

  return (
    <section className="py-16 lg:py-24 bg-surface-container-low">
      <div className="container-max px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 text-secondary mb-4">
            {[1, 2, 3].map((i) => (
              <span key={i} className="material-symbols-outlined text-[24px]">
                star
              </span>
            ))}
            <span className="material-symbols-outlined text-[24px] opacity-50">
              star
              </span>
            <span className="material-symbols-outlined text-[24px] opacity-50">
              star
            </span>
          </div>
          <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold mb-6">
            {t("test.rating")}
          </p>
          <blockquote className="font-display text-2xl lg:text-3xl text-on-surface italic leading-relaxed">
            {t("test.quote")}
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold text-on-surface">{t("test.name")}</p>
            <p className="text-sm text-on-surface-variant">
              {t("test.location")}
            </p>
          </div>
        </div>

        {/* Privileges */}
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface rounded-xl p-6 text-center shadow-sm">
            <span className="material-symbols-outlined text-primary text-[32px] mb-2">
              flight_land
            </span>
            <p className="text-sm text-on-surface-variant">{t("test.priv1")}</p>
          </div>
          <div className="bg-surface rounded-xl p-6 text-center shadow-sm">
            <span className="material-symbols-outlined text-primary text-[32px] mb-2">
              coffee
            </span>
            <p className="text-sm text-on-surface-variant">{t("test.priv2")}</p>
          </div>
          <div className="bg-surface rounded-xl p-6 text-center shadow-sm">
            <span className="material-symbols-outlined text-primary text-[32px] mb-2">
              hot_tub
            </span>
            <p className="text-sm text-on-surface-variant">{t("test.priv3")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
