"use client";

import { useI18n } from "@/i18n/provider";

export function QuickBook() {
  const { t } = useI18n();

  return (
    <section
      id="quick-book"
      className="relative z-20 container-max px-4 lg:px-8 -mt-8 w-full"
    >
      <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-6 lg:p-8">
        <form
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">
                calendar_month
              </span>
              {t("book.checkIn")}
            </label>
            <input
              className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
              type="date"
              defaultValue="2025-04-10"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">
                event
              </span>
              {t("book.checkOut")}
            </label>
            <input
              className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
              type="date"
              defaultValue="2025-04-14"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">
                self_improvement
              </span>
              {t("book.ritualStay")}
            </label>
            <select className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container">
              <option>{t("book.opt1")}</option>
              <option>{t("book.opt2")}</option>
              <option>{t("book.opt3")}</option>
              <option>{t("book.opt4")}</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">
                group
              </span>
              {t("book.guests")}
            </label>
            <select className="w-full px-3 py-2.5 bg-surface-container-low rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container">
              <option>{t("book.guest1")}</option>
              <option>{t("book.guest2")}</option>
              <option>{t("book.guest3")}</option>
            </select>
          </div>
          <div>
            <button
              className="w-full h-[42px] flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-sm font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all duration-300"
              type="submit"
            >
              {t("book.availability")}
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
