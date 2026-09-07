"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useI18n } from "@/i18n/provider";
import { siteConfig } from "@/lib/site";

declare global {
  interface Window {
    pannellum: {
      viewer: (
        id: string,
        config: Record<string, unknown>
      ) => { destroy: () => void };
    };
  }
}

const PANNELLUM_CSS =
  "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
const PANNELLUM_JS =
  "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";

const galleryImages = [
  { src: "/images/gm-photo-02-lobby.jpg", alt: "Hotel lobby and reception" },
  { src: "/images/gm-photo-03-room.jpg", alt: "Royal Blossom Suite" },
  { src: "/images/gm-photo-06-spa.jpg", alt: "Botanical spa facilities" },
  { src: "/images/gm-photo-05-dining.jpg", alt: "Garden restaurant" },
];

const infoCards = [
  {
    eyebrow: "vt.card1Eyebrow",
    title: "vt.card1Title",
    desc: "vt.card1Desc",
    icon: "spa",
  },
  {
    eyebrow: "vt.card2Eyebrow",
    title: "vt.card2Title",
    desc: "vt.card2Desc",
    icon: "king_bed",
  },
  {
    eyebrow: "vt.card3Eyebrow",
    title: "vt.card3Title",
    desc: "vt.card3Desc",
    icon: "restaurant",
  },
];

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject());
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.setAttribute("data-loaded", "true");
      resolve();
    };
    script.onerror = () => reject();
    document.body.appendChild(script);
  });
}

function loadCSS(href: string) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

export function VirtualTourContent() {
  const { t } = useI18n();
  const viewerRef = useRef<{ destroy: () => void } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const initViewer = useCallback(() => {
    if (viewerRef.current) return;
    if (!window.pannellum) {
      setError(true);
      setLoading(false);
      return;
    }

    const el = document.getElementById("panorama-container");
    if (!el) return;

    try {
      viewerRef.current = window.pannellum.viewer("panorama-container", {
        type: "equirectangular",
        panorama: "/images/gm-photo-360-panorama.jpg",
        autoLoad: true,
        autoRotate: -2,
        compass: false,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        showControls: true,
        hfov: 110,
        minHfov: 50,
        maxHfov: 120,
      });
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    loadCSS(PANNELLUM_CSS);

    loadScript(PANNELLUM_JS)
      .then(() => {
        if (cancelled) return;
        // Small delay to ensure DOM element is rendered
        setTimeout(initViewer, 100);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [initViewer]);

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low to-background py-12 lg:py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("vt.eyebrow")}
            </span>
            <h1 className="font-display text-4xl lg:text-5xl text-on-surface mt-2">
              {t("vt.titlePrefix")}
              <span className="italic text-primary">
                {t("vt.title.italic")}
              </span>
              {t("vt.titleSuffix")}
            </h1>
            <p className="text-base lg:text-lg text-on-surface-variant mt-4 max-w-xl">
              {t("vt.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Panorama viewer */}
      <section className="py-8">
        <div className="container-max px-4 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container min-h-[400px] md:min-h-[600px]">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-surface-container z-10">
                <div className="flex flex-col items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[48px] animate-spin">
                    progress_activity
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    {t("vt.loading")}
                  </span>
                </div>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-surface-container z-10 p-8">
                <div className="flex flex-col items-center gap-4 text-center">
                  <span className="material-symbols-outlined text-primary text-[48px]">
                    panorama
                  </span>
                  <p className="text-sm text-on-surface-variant max-w-md">
                    {t("vt.desc")}
                  </p>
                  <a
                    href="/images/gm-photo-360-panorama.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary text-sm font-semibold rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      open_in_new
                    </span>
                    View Panorama
                  </a>
                </div>
              </div>
            )}
            <div
              id="panorama-container"
              className="w-full"
              style={{ width: "100%", height: "600px" }}
            />
          </div>

          {/* Controls hint */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3 bg-surface-container-low p-4 rounded-xl">
              <span className="material-symbols-outlined text-primary text-[24px]">
                drag_pan
              </span>
              <div>
                <h4 className="text-sm font-bold text-on-surface">
                  {t("vt.dragHint")}
                </h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {t("vt.dragDesc")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-surface-container-low p-4 rounded-xl">
              <span className="material-symbols-outlined text-primary text-[24px]">
                zoom_in
              </span>
              <div>
                <h4 className="text-sm font-bold text-on-surface">
                  {t("vt.zoomHint")}
                </h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {t("vt.zoomDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Location label + book CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 bg-surface-container-low p-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[24px]">
                location_on
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider text-on-surface-variant">
                  {t("vt.locationLabel")}
                </span>
                <p className="text-sm font-bold text-on-surface">
                  {siteConfig.address.street}, {siteConfig.address.city},{" "}
                  {siteConfig.address.country}
                </p>
              </div>
            </div>
            <a
              href="/#quick-book"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-sm font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all"
            >
              {t("vt.bookCta")}
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-surface-container-low">
        <div className="container-max px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("vt.infoEyebrow")}
            </span>
            <h2 className="font-display text-3xl text-on-surface mt-2">
              {t("vt.infoTitle")}
            </h2>
            <p className="text-base text-on-surface-variant mt-4">
              {t("vt.infoDesc")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infoCards.map((card, i) => (
              <div
                key={i}
                className="bg-surface-container-low rounded-2xl p-8 space-y-3"
              >
                <span className="material-symbols-outlined text-primary text-[32px]">
                  {card.icon}
                </span>
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                  {t(card.eyebrow)}
                </span>
                <h3 className="font-display text-lg text-on-surface">
                  {t(card.title)}
                </h3>
                <p className="text-sm text-on-surface-variant">
                  {t(card.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface-container-low">
        <div className="container-max px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("vt.ctaEyebrow")}
            </span>
            <h2 className="font-display text-3xl text-on-surface mt-2">
              {t("vt.ctaTitle")}
            </h2>
            <p className="text-base text-on-surface-variant mt-4">
              {t("vt.ctaDesc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a
                href="/#quick-book"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-sm font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all"
              >
                {t("vt.ctaBook")}
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
                {t("vt.ctaCall")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
