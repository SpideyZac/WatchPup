import { Router } from "express";

import { signup } from "#controllers/signup.controller";
import { validateData } from "#middlewares/validate.middleware";
import { SignupScheme } from "../schemes/signup.scheme";

export const router = Router();

router.post("/signup", validateData(SignupScheme), signup);