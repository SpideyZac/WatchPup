import { Router } from "express";

import { create } from "#controllers/service.controller";
import { authMiddleware } from "#middlewares/auth.middleware";
import { validateData } from "#middlewares/validate.middleware";
import { CreateServiceScheme } from "#schemas/service.scheme";

export const router = Router();

router.post(
    "/create",
    validateData(CreateServiceScheme),
    authMiddleware,
    create,
);
