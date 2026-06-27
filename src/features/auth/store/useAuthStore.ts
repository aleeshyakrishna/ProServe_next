import { create } from "zustand";
import { AuthService } from "@/services/auth.service";
import type { AuthUser, AuthProfile } from "@/types/auth";

interface AuthState {
  user: AuthUser | null;
  profile: AuthProfile | null;
  roles: string[];
  isLoading: boolean;
  error: string | null;
  fetchCurrentUser: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  roles: [],
  isLoading: false,
  error: null,
  fetchCurrentUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await AuthService.getMe();
      set({
        user: data.user || data, // Handle direct user structures or wrapped responses
        profile: data.profile,
        roles: data.roles || [],
        isLoading: false,
      });
    } catch (err) {
      set({
        user: null,
        profile: null,
        roles: [],
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to load session details",
      });
    }
  },
  clearAuth: () => set({ user: null, profile: null, roles: [], error: null }),
}));
