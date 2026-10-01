import { z } from "zod";

const email = z
    .email("Invalid email format")
    .transform((e) => e.toLowerCase());

export const registerSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email,
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
    email,
    password: z.string().min(1, "Password is required"),
});