import { z } from "zod";

export const SignupScheme = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(3),
});