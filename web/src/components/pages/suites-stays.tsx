"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";
import { siteConfig } from "@/lib/site";

const amenities = [
  { icon: "wifi", title: "sp.amFreeWifi", desc: "sp.amFreeWifiDesc" },
  { icon: "ac_unit", title: "sp.amAC", desc: "sp.amACDesc" },
  { icon: "coffee", title: "sp.amTea", desc: "sp.amTeaDesc" },
  { icon: "room_service", title: "sp.amRoomService", desc: "sp.amRoomServiceDesc" },
  { icon: "restaurant", title: "sp.amBreakfast", desc: "sp.amBreakfastDesc" },
  { icon: "local_parking", title: "sp.amParking", desc: "sp.amParkingDesc" },
  { icon: "tv", title: "sp.amTV", desc: "sp.amTVDesc" },
  { icon: "security", title: "sp.amSecurity", desc: "sp.amSecurityDesc" },
];

const galleryImages = [
  { src: "/images/gm-photo-02-lobby.jpg", alt: "Hotel lobby and reception area" },
  { src: "/images/gm-photo-03-room.jpg", alt: "Royal Blossom Suite interior" },
  { src: "/images/gm-photo-04-room2.jpg", alt: "Deluxe Garden Room" },
  { src: "/images/gm-photo-05-dining.jpg", alt: "Garden restaurant dining area" },
  { src: "/images/gm-photo-06-spa.jpg", alt: "Botanical spa facilities" },
  { src: "/images/gm-photo-07-exterior.jpg", alt: "Hotel exterior and gardens" },
];

export function SuitesStaysContent() {
  const { t } = useI18n();

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low to-background py-12 lg:py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("sp.eyebrow")}
            </span>
            <h1 className="font-display text-4xl lg:text-5xl text-on-surface mt-2">
              {t("sp.titlePrefix")}
              <span className="italic text-primary">{t("sp.title.italic")}</span>
            </h1>
            <p className="text-base lg:text-lg text-on-surface-variant mt-4 max-w-xl">
              {t("sp.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Royal Blossom Suite */}
      <section className="py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
            <div className="space-y-6">
              <span className="text-sm uppercase tracking-widest text-primary font-semibold">
                {t("sp.premier")}
              </span>
              <h2 className="font-display text-3xl text-on-surface">
                {t("sp.suiteTitle")}
              </h2>
              <p className="text-base text-on-surface-variant">
                {t("sp.suiteDesc")}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container p-4 rounded-xl space-y-1">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    king_bed
                  </span>
                  <h4 className="text-sm font-bold text-on-surface">
                    {t("sp.kingBed")}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    {t("sp.kingBedDesc")}
                  </p>
                </div>
                <div className="bg-surface-container p-4 rounded-xl space-y-1">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    bathtub
                  </span>
                  <h4 className="text-sm font-bold text-on-surface">
                    {t("sp.marbleBath")}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    {t("sp.marbleBathDesc")}
                  </p>
                </div>
                <div className="bg-surface-container p-4 rounded-xl space-y-1">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    balcony
                  </span>
                  <h4 className="text-sm font-bold text-on-surface">
                    {t("sp.balcony")}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    {t("sp.balconyDesc")}
                  </p>
                </div>
                <div className="bg-surface-container p-4 rounded-xl space-y-1">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    wifi
                  </span>
                  <h4 className="text-sm font-bold text-on-surface">
                    {t("sp.wifi")}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    {t("sp.wifiDesc")}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-display text-2xl font-bold text-primary">
                  {t("sp.fromPrice")}
                  <span className="text-sm font-normal text-on-surface-variant">
                    {t("sp.perNight")}
                  </span>
                </span>
                <a
                  href="/#quick-book"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-sm font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all"
                >
                  {t("sp.reserveNow")}
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deluxe Garden Room */}
      <section className="py-16 bg-surface-container-low">
        <div className="container-max px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <span className="text-sm uppercase tracking-widest text-primary font-semibold">
                {t("sp.comfortRoom")}
              </span>
              <h2 className="font-display text-3xl text-on-surface">
                {t("sp.deluxeTitle")}
              </h2>
              <p className="text-base text-on-surface-variant">
                {t("sp.deluxeDesc")}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface p-4 rounded-xl space-y-1">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    bed
                  </span>
                  <h4 className="text-sm font-bold text-on-surface">
                    {t("sp.queenBed")}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    {t("sp.queenBedDesc")}
                  </p>
                </div>
                <div className="bg-surface p-4 rounded-xl space-y-1">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    yard
                  </span>
                  <h4 className="text-sm font-bold text-on-surface">
                    {t("sp.gardenView")}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    {t("sp.gardenViewDesc")}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-display text-2xl font-bold text-primary">
                  {t("sp.fromPrice2")}
                  <span className="text-sm font-normal text-on-surface-variant">
                    {t("sp.perNight")}
                  </span>
                </span>
                <a
                  href="/#quick-book"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-sm font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all"
                >
                  {t("sp.reserveNow")}
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] order-1 lg:order-2">
              <img
                src="/images/gm-photo-04-room2.jpg"
                alt="Deluxe Garden Room at New Blossom Hotel & Spa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("sp.amenitiesEyebrow")}
            </span>
            <h2 className="font-display text-3xl text-on-surface mt-2">
              {t("sp.amenitiesTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {amenities.map((am, i) => (
              <div
                key={i}
                className="bg-surface-container-low p-6 rounded-xl text-center space-y-2"
              >
                <span className="material-symbols-outlined text-primary text-[28px]">
                  {am.icon}
                </span>
                <h4 className="text-sm font-bold text-on-surface">
                  {t(am.title)}
                </h4>
                <p className="text-xs text-on-surface-variant">{t(am.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-surface-container-low">
        <div className="container-max px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t("sp.galleryEyebrow")}
            </span>
            <h2 className="font-display text-3xl text-on-surface mt-2">
              {t("sp.galleryTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
    </div>
  );
}
