import axios from "axios";

// ------ Constants -----------------------------------------------------------

const TOKEN_KEY = "ps_access_token";
const REFRESH_TOKEN_KEY = "ps_refresh_token";

// ------ Token Helpers -------------------------------------------------------

export const tokenStorage = {
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  save: (accessToken: string, refreshToken: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    // Also set a non-httpOnly cookie so Next.js middleware can read it
    // for route protection (middleware runs server-side).
    document.cookie = `ps_has_session=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  },
  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    // Expire the session cookie
    document.cookie = "ps_has_session=; path=/; max-age=0; SameSite=Lax";
  },
};

// ------ Axios Instance ------------------------------------------------------

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach Bearer token to every request if available
api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize backend error responses into proper Error objects
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "An unexpected error occurred. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export default api;
