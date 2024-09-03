import { Router } from "express";

import { router as authRouter } from "./auth.route";

export const router = Router();

router.use("/auth", authRouter);