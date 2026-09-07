"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="w-full bg-surface-container-low text-on-surface-variant mt-20">
      <div className="container-max px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/new-blossom-logo.png"
                alt="New Blossom Hotel & Spa logo"
                className="h-10 w-10 rounded-full object-cover shadow-sm"
              />
              <span className="font-display text-lg text-on-surface">
                New Blossom
              </span>
            </Link>
            <p className="text-sm leading-relaxed">{t("footer.desc")}</p>
            <div className="flex items-center gap-2 text-primary pt-1">
              <span className="material-symbols-outlined text-[20px]">spa</span>
              <span className="text-xs uppercase tracking-wider font-semibold">
                {t("footer.sanctuaryArts")}
              </span>
            </div>
          </div>

          {/* Sanctuary */}
          <div className="space-y-3">
            <h4 className="font-display text-lg text-on-surface">
              {t("footer.col1Title")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/botanical-spa-hammam"
                  className="text-sm hover:text-on-surface transition-colors"
                >
                  {t("footer.col1a")}
                </Link>
              </li>
              <li>
                <Link
                  href="/wellness-rituals"
                  className="text-sm hover:text-on-surface transition-colors"
                >
                  {t("footer.col1b")}
                </Link>
              </li>
              <li>
                <Link
                  href="/suites-stays"
                  className="text-sm hover:text-on-surface transition-colors"
                >
                  {t("footer.col1c")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dining-rooftop"
                  className="text-sm hover:text-on-surface transition-colors"
                >
                  {t("footer.col1d")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Heritage */}
          <div className="space-y-3">
            <h4 className="font-display text-lg text-on-surface">
              {t("footer.col2Title")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dire-dawa-heritage"
                  className="text-sm hover:text-on-surface transition-colors"
                >
                  {t("footer.col2a")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dire-dawa-heritage"
                  className="text-sm hover:text-on-surface transition-colors"
                >
                  {t("footer.col2b")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dire-dawa-heritage"
                  className="text-sm hover:text-on-surface transition-colors"
                >
                  {t("footer.col2c")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dire-dawa-heritage"
                  className="text-sm hover:text-on-surface transition-colors"
                >
                  {t("footer.col2d")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-display text-lg text-on-surface">
              {t("footer.col3Title")}
            </h4>
            <p className="text-sm">{t("footer.col3Addr")}</p>
            <p className="text-sm">{siteConfig.email}</p>
            <a
              href={`tel:${siteConfig.phone}`}
              className="block text-lg text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant/80">
          <p>{t("footer.copyright")}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-on-surface transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-on-surface transition-colors">
              {t("footer.terms")}
            </Link>
            <Link
              href="/sustainability"
              className="hover:text-on-surface transition-colors"
            >
              {t("footer.sustainability")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
