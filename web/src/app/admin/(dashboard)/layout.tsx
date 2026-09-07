"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/api/auth-store";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, hydrate, logout, user } = useAuth();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem("nb_admin_token")) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-space-sm">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold animate-pulse">
            NB
          </div>
          <span className="font-body-md text-body-md text-outline">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminSidebar pathname={pathname} />
      <div className="pl-64">
      {/* Header */}
      <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl z-40 flex items-center justify-between px-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {/* Search */}
        <div className="flex items-center flex-1 max-w-lg">
          <div className="w-full flex items-center gap-space-sm bg-surface-container-low rounded-full px-space-md py-space-xs">
            <span className="material-symbols-outlined text-outline text-[20px]">
              search
            </span>
            <span className="font-body-md text-body-md text-outline flex-1 select-none">
              Search rooms, bookings, content...
            </span>
            <kbd className="px-space-xs py-space-2xs bg-surface-container-lowest rounded font-label-sm text-label-sm text-on-surface-variant shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
              Ctrl+K
            </kbd>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-space-md">
          <span className="px-space-sm py-space-2xs rounded-full bg-primary-fixed font-label-sm text-label-sm text-on-primary-fixed font-bold uppercase tracking-wider">
            Admin
          </span>
          <button className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all relative">
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
          </button>
          <button className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all">
            <span className="material-symbols-outlined text-[20px]">
              help_outline
            </span>
          </button>
          <div className="flex items-center gap-space-xs pl-space-xs">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="font-label-sm text-label-sm text-on-surface leading-none">
                {user?.name || "Admin"}
              </span>
              <span className="font-body-sm text-body-sm text-outline leading-tight mt-space-2xs">
                {user?.role || "Administrator"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative pt-16 bg-surface min-h-screen">
        <div className="flex flex-col w-full px-space-lg py-space-md gap-space-lg">
          {children}
        </div>
      </main>
      </div>
    </>
  );
}
