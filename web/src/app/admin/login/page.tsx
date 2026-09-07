"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/api/auth-store";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, hydrate, isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState("admin@newblossomdiredawa.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  useEffect(() => { hydrate(); }, [hydrate]);

  useEffect(() => {
    if (isAuthenticated) router.push("/admin");
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      router.push("/admin");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-space-md">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-fixed/20 -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-tertiary-fixed/20 translate-y-1/3 -translate-x-1/3" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-space-xl">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-on-primary font-bold text-headline-lg mx-auto shadow-lg">
            NB
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-space-md">
            New Blossom
          </h1>
          <p className="font-body-md text-body-md text-outline mt-space-2xs">
            Hotel & Spa — CMS Admin Platform
          </p>
        </div>

        {/* Login card */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xl flex flex-col gap-space-md"
        >
          {error && (
            <div className="bg-error-container text-on-error-container px-space-md py-space-sm rounded-xl flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span className="font-label-md text-label-md">{error}</span>
            </div>
          )}

          <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-2xs">
            <label className="font-label-sm text-label-sm text-outline">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent font-title-md text-title-md text-on-surface focus:outline-none w-full"
              required
            />
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-2xs">
            <label className="font-label-sm text-label-sm text-outline">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent font-title-md text-title-md text-on-surface focus:outline-none w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-space-md bg-primary hover:bg-primary-container text-on-primary rounded-xl font-headline-sm text-headline-sm shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-space-xs disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                Signing in...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">login</span>
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-center font-body-sm text-body-sm text-outline mt-space-md">
          New Blossom Hotel & Spa · Dire Dawa, Ethiopia
        </p>
      </div>
    </div>
  );
}
