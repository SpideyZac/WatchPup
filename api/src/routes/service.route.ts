import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import { create, getOwned } from "#controllers/service.controller";
import { authMiddleware } from "#middlewares/auth.middleware";
import { validateData } from "#middlewares/validate.middleware";
import { CreateServiceScheme } from "#schemas/service.scheme";

export const router = Router();

router.post(
    "/create",
    validateData(CreateServiceScheme),
    authMiddleware,
    rateLimit({
        windowMs: 5 * 1000,
        limit: 1,
        standardHeaders: true,
        legacyHeaders: false,
    }),
    create,
);

router.get(
    "/owned",
    authMiddleware,
    rateLimit({
        windowMs: 1000,
        limit: 5,
        standardHeaders: true,
        legacyHeaders: false,
    }),
    getOwned,
);
