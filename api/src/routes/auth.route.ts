import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import { login, signup } from "#controllers/auth.controller";
import { validateData } from "#middlewares/validate.middleware";
import { LoginScheme, SignupScheme } from "#schemas/auth.scheme";

export const router = Router();

router.post(
    "/signup",
    rateLimit({
        windowMs: 5 * 1000,
        limit: 1,
        standardHeaders: true,
        legacyHeaders: false,
        validate: {
            ip: false,
        },
    }),
    validateData(SignupScheme),
    signup,
);
router.post(
    "/login",
    rateLimit({
        windowMs: 1000,
        limit: 1,
        standardHeaders: true,
        legacyHeaders: false,
        validate: {
            ip: false,
        },
    }),
    validateData(LoginScheme),
    login,
);
