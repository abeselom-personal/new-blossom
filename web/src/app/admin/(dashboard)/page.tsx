"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type Room, type SpaService, type HeritageTour, type Booking } from "@/lib/api/client";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    rooms: 0,
    spa: 0,
    heritage: 0,
    bookings: 0,
    pendingBookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [rooms, spa, heritage, bookings] = await Promise.all([
          api.get("/admin/rooms"),
          api.get("/admin/spa"),
          api.get("/admin/heritage"),
          api.get("/admin/bookings?limit=5"),
        ]);
        const allBookings = await api.get("/admin/bookings?limit=100");
        const pending = (allBookings.data.data as Booking[]).filter(
          (b) => b.status === "pending"
        ).length;
        setStats({
          rooms: (rooms.data.data as Room[]).length,
          spa: (spa.data.data as SpaService[]).length,
          heritage: (heritage.data.data as HeritageTour[]).length,
          bookings: allBookings.data.meta?.total ?? (allBookings.data.data as Booking[]).length,
          pendingBookings: pending,
        });
        setRecentBookings(bookings.data.data as Booking[]);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-space-2xl">
        <span className="font-body-md text-body-md text-outline">Loading dashboard...</span>
      </div>
    );
  }

  const metrics = [
    {
      label: "Rooms & Suites",
      value: stats.rooms,
      sub: "Published accommodations",
      icon: "bed",
      iconColor: "text-primary",
      circleColor: "bg-primary-fixed/30",
      href: "/admin/rooms",
    },
    {
      label: "Spa Services",
      value: stats.spa,
      sub: "Active treatments & rituals",
      icon: "spa",
      iconColor: "text-secondary",
      circleColor: "bg-secondary-fixed/30",
      href: "/admin/spa",
    },
    {
      label: "Heritage Tours",
      value: stats.heritage,
      sub: "Cultural excursions available",
      icon: "museum",
      iconColor: "text-tertiary",
      circleColor: "bg-tertiary-fixed/40",
      href: "/admin/heritage",
    },
    {
      label: "Total Bookings",
      value: stats.bookings,
      sub: `${stats.pendingBookings} pending review`,
      icon: "event",
      iconColor: "text-primary",
      circleColor: "bg-primary-fixed/30",
      href: "/admin/bookings",
    },
  ];

  return (
    <>
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Dashboard
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
            Overview of hotel content, bookings, and operations
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary font-label-md text-label-md shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          View Site
        </Link>
      </div>

      {/* Metric cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {metrics.map((m) => (
          <Link
            key={m.label}
            href={m.href}
            className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
          >
            <div
              className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${m.circleColor} group-hover:scale-125 transition-transform duration-500`}
            />
            <div className="flex items-center justify-between relative z-10">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                {m.label}
              </span>
              <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center">
                <span className={`material-symbols-outlined text-[18px] ${m.iconColor}`}>
                  {m.icon}
                </span>
              </span>
            </div>
            <div className="mt-space-sm relative z-10">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-headline-lg text-on-surface">
                  {m.value}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
                {m.sub}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* Recent bookings table */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-space-md md:p-space-lg flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Recent Bookings
            </h2>
            <span className="px-space-xs py-space-2xs rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
              {stats.bookings} total
            </span>
          </div>
          <Link
            href="/admin/bookings"
            className="text-primary font-label-md text-label-md hover:underline flex items-center gap-space-2xs"
          >
            View all
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
        <div className="w-full overflow-x-auto">
          {recentBookings.length === 0 ? (
            <div className="px-space-lg py-space-2xl text-center">
              <span className="material-symbols-outlined text-outline text-[40px]">
                inbox
              </span>
              <p className="font-body-md text-body-md text-outline mt-space-sm">
                No bookings yet
              </p>
            </div>
          ) : (
            <table className="w-full text-left font-body-md text-body-md">
              <thead className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <tr>
                  <th className="py-space-sm px-space-md">Guest</th>
                  <th className="py-space-sm px-space-md">Type</th>
                  <th className="py-space-sm px-space-md">Dates</th>
                  <th className="py-space-sm px-space-md">Created</th>
                  <th className="py-space-sm px-space-md">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-space-md px-space-md">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-label-md">
                          {b.guest_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-title-md text-title-md text-on-surface font-semibold">
                            {b.guest_name}
                          </span>
                          <span className="font-body-sm text-body-sm text-outline">
                            {b.guest_email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-space-md px-space-md">
                      <span className="capitalize font-label-md text-label-md text-on-surface-variant">
                        {b.type}
                      </span>
                    </td>
                    <td className="py-space-md px-space-md font-body-sm text-body-sm text-on-surface-variant">
                      {b.check_in
                        ? new Date(b.check_in).toLocaleDateString()
                        : "—"}
                      {b.check_out
                        ? ` → ${new Date(b.check_out).toLocaleDateString()}`
                        : ""}
                    </td>
                    <td className="py-space-md px-space-md font-body-sm text-body-sm text-outline">
                      {new Date(b.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-space-md px-space-md">
                      <span
                        className={`inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full font-label-sm text-label-sm font-bold ${
                          b.status === "pending"
                            ? "bg-secondary-fixed text-on-secondary-container"
                            : b.status === "confirmed"
                            ? "bg-tertiary-fixed text-on-tertiary-fixed"
                            : b.status === "cancelled"
                            ? "bg-error-container text-on-error-container"
                            : "bg-surface-container text-on-surface-variant"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            b.status === "pending"
                              ? "bg-secondary"
                              : b.status === "confirmed"
                              ? "bg-tertiary"
                              : b.status === "cancelled"
                              ? "bg-error"
                              : "bg-outline"
                          }`}
                        />
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}
