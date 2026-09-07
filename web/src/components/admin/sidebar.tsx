"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/rooms", label: "Rooms & Suites", icon: "bed" },
  { href: "/admin/spa", label: "Spa Services", icon: "spa" },
  { href: "/admin/dining", label: "Dining & Menu", icon: "restaurant" },
  { href: "/admin/heritage", label: "Heritage Tours", icon: "museum" },
  { href: "/admin/wellness", label: "Wellness", icon: "self_improvement" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "reviews" },
  { href: "/admin/bookings", label: "Bookings", icon: "event" },
  { href: "/admin/settings", label: "Settings", icon: "tune" },
];

export function AdminSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center gap-space-sm px-space-lg">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-headline-md">
            NB
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none">
              New Blossom
            </span>
            <span className="font-label-sm text-label-sm text-outline leading-tight mt-space-2xs">
              CMS Platform
            </span>
          </div>
        </div>

        {/* Property selector */}
        <div className="px-space-md py-space-xs">
          <div className="flex items-center justify-between px-space-sm py-space-xs rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-space-xs min-w-0">
              <span className="material-symbols-outlined text-primary text-[18px]">
                hotel
              </span>
              <div className="flex flex-col truncate">
                <span className="font-label-sm text-label-sm text-on-surface truncate">
                  Dire Dawa Hotel
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Hotel & Spa
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px]">
              unfold_more
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-space-2xs px-space-md mt-space-sm">
          {navItems.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-space-md py-space-sm rounded-xl transition-all ${
                  active
                    ? "bg-primary-container text-on-primary-container font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px]">
                    {item.icon}
                  </span>
                  <span className="font-label-md text-label-md">
                    {item.label}
                  </span>
                </div>
                {active && (
                  <span className="w-2 h-2 rounded-full bg-on-primary-container" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* System status */}
      <div className="p-space-md">
        <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-tertiary text-[18px]">
              verified
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface">
                System Status
              </span>
              <span className="font-body-sm text-body-sm text-tertiary">
                API Connected
              </span>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse" />
        </div>
      </div>
    </aside>
  );
}
