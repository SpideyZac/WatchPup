import { Router } from "express";

import { login, signup } from "#controllers/auth.controller";
import { validateData } from "#middlewares/validate.middleware";
import { LoginScheme, SignupScheme } from "#schemas/auth.scheme";

export const router = Router();

router.post("/signup", validateData(SignupScheme), signup);
router.post("/login", validateData(LoginScheme), login);
