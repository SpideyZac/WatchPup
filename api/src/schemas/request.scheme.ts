import { z } from "zod";

export const GetRequestScheme = z.object({
    requestId: z.string().max(255),
});
