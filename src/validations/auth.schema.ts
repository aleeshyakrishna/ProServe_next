import { z } from "zod";

// ------ Password Regex Patterns ----------------------------

export const PASSWORD_RULES = {
  min: 8,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecial: /[^A-Za-z0-9]/,
} as const;

// ------ Phone Validation (UAE Format) -----------------------

// Valid formats: +9715X XXXXXXX, 05X XXXXXXX, +971 5X XXXXXXX, etc.
const UAE_PHONE_REGEX = /^(?:\+971|0)?5[024568]\d{7}$/;

// ------ Login Schema ----------------------------------------

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
  rememberMe: z.boolean(),
});

// ------ Register Schema -------------------------------------

export const RegisterSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please enter a valid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .refine((val) => UAE_PHONE_REGEX.test(val.replace(/\s+/g, "")), {
        message: "Please enter a valid UAE mobile number (e.g. 050 123 4567)",
      }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(PASSWORD_RULES.min, `Password must be at least ${PASSWORD_RULES.min} characters`)
      .refine((val) => PASSWORD_RULES.hasUppercase.test(val), {
        message: "Must contain at least one uppercase letter",
      })
      .refine((val) => PASSWORD_RULES.hasLowercase.test(val), {
        message: "Must contain at least one lowercase letter",
      })
      .refine((val) => PASSWORD_RULES.hasNumber.test(val), {
        message: "Must contain at least one number",
      })
      .refine((val) => PASSWORD_RULES.hasSpecial.test(val), {
        message: "Must contain at least one special character",
      }),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    role: z.enum(["customer", "provider"]),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
