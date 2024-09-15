import { z } from "zod";

export const SignupScheme = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(3),
});

export const LoginScheme = z.object({
    user: z.string(),
    password: z.string(),
});
