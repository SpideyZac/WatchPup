import { z } from "zod";

export const GetServiceScheme = z.object({
    serviceId: z.string().max(255),
});

export const CreateServiceScheme = z.object({
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
    name: z.string().min(3).max(35),
    url: z.string().url().max(255),
});

export const EditServiceScheme = z.object({
    serviceId: z.string().max(255),
    method: z
        .union([
            z.literal("GET"),
            z.literal("HEAD"),
            z.literal("POST"),
            z.literal("PUT"),
            z.literal("DELETE"),
            z.literal("CONNECT"),
            z.literal("OPTIONS"),
            z.literal("TRACE"),
            z.literal("PATCH"),
        ])
        .optional(),
    name: z.string().min(3).max(35).optional(),
    url: z.string().url().max(255).optional(),
});

export const DeleteServiceScheme = z.object({
    serviceId: z.string().max(255),
});

export const GetRequests = z.object({
    serviceId: z.string().max(255),
});
