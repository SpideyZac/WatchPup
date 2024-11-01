import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import {
    create,
    deleteOwnedService,
    editOwnedService,
    getOwned,
    getService,
} from "#controllers/service.controller";
import { authMiddleware } from "#middlewares/auth.middleware";
import { createRecordId } from "#middlewares/id.middleware";
import { validateData } from "#middlewares/validate.middleware";
import {
    CreateServiceScheme,
    DeleteServiceScheme,
    EditServiceScheme,
    GetServiceScheme,
} from "#schemas/service.scheme";

export const router = Router();

router.get(
    "/",
    rateLimit({
        windowMs: 1000,
        limit: 5,
        standardHeaders: true,
        legacyHeaders: false,
        validate: {
            ip: false,
        },
    }),
    validateData(GetServiceScheme),
    authMiddleware,
    getService,
);

router.get(
    "/owned",
    rateLimit({
        windowMs: 1000,
        limit: 5,
        standardHeaders: true,
        legacyHeaders: false,
        validate: {
            ip: false,
        },
    }),
    authMiddleware,
    getOwned,
);

router.post(
    "/",
    rateLimit({
        windowMs: 5 * 1000,
        limit: 1,
        standardHeaders: true,
        legacyHeaders: false,
        validate: {
            ip: false,
        },
    }),
    validateData(CreateServiceScheme),
    authMiddleware,
    create,
);

router.patch(
    "/",
    rateLimit({
        windowMs: 5 * 1000,
        limit: 1,
        standardHeaders: true,
        legacyHeaders: false,
        validate: {
            ip: false,
        },
    }),
    validateData(EditServiceScheme),
    authMiddleware,
    createRecordId(["serviceId"]),
    editOwnedService,
);

router.delete(
    "/",
    rateLimit({
        windowMs: 5 * 1000,
        limit: 1,
        standardHeaders: true,
        legacyHeaders: false,
        validate: {
            ip: false,
        },
    }),
    validateData(DeleteServiceScheme),
    authMiddleware,
    createRecordId(["serviceId"]),
    deleteOwnedService,
);
