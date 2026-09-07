"use client";

import { create } from "zustand";
import { api, type AdminUser, type LoginResult } from "./client";

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post<{ success: boolean; data: LoginResult }>(
        "/auth/login",
        { email, password }
      );
      const { access_token, user } = data.data;
      localStorage.setItem("nb_admin_token", access_token);
      localStorage.setItem("nb_admin_user", JSON.stringify(user));
      set({ user, token: access_token, isAuthenticated: true, isLoading: false });
    } catch {
      set({ isLoading: false });
      throw new Error("Invalid email or password");
    }
  },

  logout: () => {
    localStorage.removeItem("nb_admin_token");
    localStorage.removeItem("nb_admin_user");
    set({ user: null, token: null, isAuthenticated: false });
  },

  hydrate: () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("nb_admin_token");
    const userStr = localStorage.getItem("nb_admin_user");
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as AdminUser;
        set({ user, token, isAuthenticated: true });
      } catch {
        localStorage.removeItem("nb_admin_token");
        localStorage.removeItem("nb_admin_user");
      }
    }
  },
}));
