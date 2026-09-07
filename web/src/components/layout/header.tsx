"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useI18n } from "@/i18n/provider";
import { siteConfig } from "@/lib/site";

export function Header() {
  const { t, toggleLocale, locale } = useI18n();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    const path = pathname?.replace(/\/$/, "") || "/";
    return path === href;
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(125,82,38,0.06)] transition-all duration-300">
      <div className="container-max h-24 px-4 lg:px-8 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/images/new-blossom-logo.png"
            alt="New Blossom Hotel & Spa logo"
            className="h-12 w-12 rounded-full object-cover shadow-sm"
          />
          <div className="flex flex-col">
            <span className="font-display text-xl text-on-surface tracking-tight leading-none">
              New Blossom
            </span>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mt-0.5 hidden sm:block">
              {t("nav.brandSub")}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-1">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive(item.href)
                  ? "bg-surface-container-high text-on-surface font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/#quick-book"
            className="hidden sm:inline-flex items-center px-3 py-1.5 bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
          >
            {t("nav.bookBtn")}
          </Link>

          <button
            type="button"
            onClick={toggleLocale}
            aria-label="Switch language"
            className="px-2.5 py-1.5 text-on-surface-variant text-xs font-medium hover:text-on-surface hover:bg-surface-container-low rounded-md border border-outline-variant/50 transition-colors"
          >
            {locale === "en" ? "አማርኛ" : "EN"}
          </button>

          <a
            href={`tel:${siteConfig.phone}`}
            aria-label={t("nav.contact")}
            className="hidden sm:inline-flex items-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden inline-flex items-center justify-center p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-md transition-colors"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-surface border-t border-outline-variant">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`mobile-nav-link ${isActive(item.href) ? "active" : ""}`}
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            href="/#quick-book"
            onClick={() => setMobileOpen(false)}
            className="mobile-nav-link text-primary font-semibold"
          >
            {t("nav.bookBtn")}
          </Link>
        </div>
      )}
    </header>
  );
}
