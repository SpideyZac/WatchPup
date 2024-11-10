import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import { getRequest } from "#controllers/request.controller";
import { authMiddleware } from "#middlewares/auth.middleware";
import { createRecordId } from "#middlewares/id.middleware";
import { validateData } from "#middlewares/validate.middleware";
import { GetRequestScheme } from "#schemas/request.scheme";

export const router = Router();

router.get(
    "/",
    rateLimit({
        windowMs: 1000,
        limit: 50,
        standardHeaders: true,
        legacyHeaders: false,
        validate: {
            ip: false,
        },
    }),
    validateData(GetRequestScheme),
    authMiddleware,
    createRecordId(["requestId"]),
    getRequest,
);
