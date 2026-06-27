// ------ Form Data Types ----------------------------------------------------

export type AuthRole = "customer" | "provider";

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: AuthRole;
  acceptTerms: boolean;
}

export interface AuthState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

// ------ Backend Response Types ---------------------------------------------

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expiresAt: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  status: string;
  createdAt: string;
}

export interface AuthProfile {
  fullName: string;
  phone: string;
  avatar: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
}

export interface LoginResponseData {
  session: AuthTokens;
  user: AuthUser;
  profile: AuthProfile | null;
  roles: string[];
}

export interface RegisterResponseData {
  user: AuthUser;
  profile: Pick<AuthProfile, "fullName" | "phone">;
  emailConfirmationSent: boolean;
}

// Standard backend envelope
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
