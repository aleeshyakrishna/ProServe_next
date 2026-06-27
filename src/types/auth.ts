// ------ Authentication Types ---------------------------------

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
