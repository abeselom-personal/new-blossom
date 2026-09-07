"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/provider";

export function Newsletter() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 lg:py-24">
      <div className="container-max px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">
            {t("news.eyebrow")}
          </span>
          <h2 className="font-display text-3xl lg:text-4xl text-on-surface mt-2">
            {t("news.title")}
          </h2>
          <p className="text-base text-on-surface-variant mt-4">
            {t("news.desc")}
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 mt-8 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={t("news.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-surface-container-low rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-sm font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all"
            >
              {t("news.subscribe")}
            </button>
          </form>
          <p className="text-xs text-on-surface-variant mt-4">
            {t("news.privacy")}
          </p>
        </div>
      </div>
    </section>
  );
}
