import { Router } from "express";

import { signup } from "#controllers/auth.controller";
import { validateData } from "#middlewares/validate.middleware";
import { SignupScheme } from "../schemes/signup.scheme";

export const router = Router();

router.post("/signup", validateData(SignupScheme), signup);