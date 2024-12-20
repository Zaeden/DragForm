import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "First Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .min(1, { message: "Password is required" })
    .max(20, { message: "Password must be atmost 20 characters long" }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .min(1, { message: "Password is required" })
    .max(20, { message: "Password must be atmost 20 characters long" }),
});
