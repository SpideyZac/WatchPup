import { Router } from "express";

import { signup } from "#controllers/signup.controller";

export const router = Router();

router.use("/signup", signup);