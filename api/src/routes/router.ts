import { Router } from "express";

import { router as authRouter } from "#routes/auth.route";
import { router as serviceRouter } from "#routes/service.route";

export const router = Router();

router.use("/auth", authRouter);
router.use("/service", serviceRouter);
