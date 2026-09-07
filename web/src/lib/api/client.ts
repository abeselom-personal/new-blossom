import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Attach token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("nb_admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("nb_admin_token");
      localStorage.removeItem("nb_admin_user");
      if (!window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: { total: number; page: number; limit: number };
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginResult {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: AdminUser;
}

export interface Room {
  id: string;
  slug: string;
  image_url: string | null;
  gallery_urls: string[] | null;
  price: number | null;
  capacity: number;
  size_sqm: number | null;
  bed_type: string | null;
  amenities: string[] | null;
  is_featured: boolean;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  translations?: Translation[];
}

export interface Translation {
  locale: string;
  name: string;
  description: string;
  features?: string[];
  benefits?: string[];
  highlights?: string[];
  inclusions?: string[];
  itinerary?: string[];
}

export interface SpaService {
  id: string;
  slug: string;
  image_url: string | null;
  gallery_urls: string[] | null;
  duration_mins: number | null;
  price: number | null;
  is_featured: boolean;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  translations?: Translation[];
}

export interface Venue {
  id: string;
  slug: string;
  image_url: string | null;
  gallery_urls: string[] | null;
  hours: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  translations?: Translation[];
}

export interface MenuItem {
  id: string;
  venue_id: string | null;
  category: string;
  image_url: string | null;
  price: number;
  is_available: boolean;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  translations?: Translation[];
}

export interface HeritageTour {
  id: string;
  slug: string;
  image_url: string | null;
  gallery_urls: string[] | null;
  duration_hours: number | null;
  price: number | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  translations?: Translation[];
}

export interface WellnessRetreat {
  id: string;
  slug: string;
  image_url: string | null;
  gallery_urls: string[] | null;
  duration_days: number;
  price: number | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  translations?: Translation[];
}

export interface Testimonial {
  id: string;
  image_url: string | null;
  rating: number;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  translations?: Translation[];
}

export interface Booking {
  id: string;
  type: string;
  reference_id: string | null;
  guest_name: string;
  guest_email: string;
  guest_phone: string | null;
  check_in: string | null;
  check_out: string | null;
  adults: number;
  children: number;
  notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Setting {
  id: string;
  key: string;
  type: string;
  is_public: boolean;
  updated_at: string;
  translations?: { locale: string; value: string }[];
}
