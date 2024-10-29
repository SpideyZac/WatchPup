import { z } from "zod";

export const SignupScheme = z.object({
    email: z.string().email().max(255),
    password: z.string().min(8).max(255),
    username: z.string().min(3).max(16),
});

export const LoginScheme = z.object({
    user: z.string().max(255),
    password: z.string().max(255),
});
