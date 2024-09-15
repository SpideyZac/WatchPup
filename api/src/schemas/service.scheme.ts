import { z } from "zod";

export const CreateServiceScheme = z.object({
    body: z.object({}),
    headers: z.object({}),
    method: z.union([
        z.literal("GET"),
        z.literal("HEAD"),
        z.literal("POST"),
        z.literal("PUT"),
        z.literal("DELETE"),
        z.literal("CONNECT"),
        z.literal("OPTIONS"),
        z.literal("TRACE"),
        z.literal("PATCH"),
    ]),
    name: z.string(),
    url: z.string().url(),
});
