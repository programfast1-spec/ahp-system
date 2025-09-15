import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "../types";
import { api } from "../services/api";

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // === LOGIN ===
      login: async (email: string, password: string) => {
        try {
          const response = await api.post("/auth/login", { email, password });

          // Pastikan property sesuai dgn response backend
          const { user, token } = response.data;

          if (!user || !token) {
            console.error("Respon login tidak sesuai:", response.data);
            return false;
          }

          set({ user, token, isAuthenticated: true });

          // header Authorization otomatis ditangani oleh interceptor
          return true;
        } catch (err: any) {
          console.error("Login gagal:", err.response?.data || err.message);
          throw err;
        }
      },

      // === LOGOUT ===
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem("auth-storage");
        delete api.defaults.headers.Authorization;
      },

      // === SET USER MANUAL (misal setelah register) ===
      setUser: (user: User, token: string) => {
        set({ user, token, isAuthenticated: true });
      },

      // === CEK TOKEN SAAT REFRESH ===
      checkAuth: async () => {
        const { token } = get();
        if (!token) return;

        try {
          const response = await api.get("/auth/me");
          set({ user: response.data, isAuthenticated: true });
        } catch (error) {
          console.warn("Token tidak valid, logout…");
          set({ user: null, token: null, isAuthenticated: false });
          localStorage.removeItem("auth-storage");
        }
      },
    }),
    { name: "auth-storage" }
  )
);
