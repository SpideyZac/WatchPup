import { Router } from "express";

import { router as authRouter } from "#routes/auth.route";
import { router as serviceRouter } from "#routes/service.route";
import { router as requestRouter } from "#routes/request.route";

export const router = Router();

router.use("/auth", authRouter);
router.use("/service", serviceRouter);
router.use("/request", requestRouter);
