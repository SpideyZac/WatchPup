import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";

import { router } from "#routes/router";
import { connect } from "#utils/db.util";

declare module "bun" {
    interface Env {
        PORT: number | undefined;
        ENV_TYPE: "development" | "production";
        DB_PRIVATE_URL: string;
        DB_NAMESPACE: string;
        DB_DATABASE: string;
        DB_USER: string;
        DB_PASSWORD: string;
        JWT_SECRET: string;
    }
}

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(hpp());

app.use("/api", router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    console.info(`Server is running on http://localhost:${PORT}`);
    await connect();
    console.info("Connected to the database");

    const serviceRequesterWorker = new Worker(
        "./src/utils/workers/serviceRequester.worker.util.ts",
    );
    serviceRequesterWorker.postMessage({ type: "init", payload: {} });
    console.info("Service requester worker started");

    const requestExpirerWorker = new Worker(
        "./src/utils/workers/requestExpirer.worker.util.ts",
    );
    requestExpirerWorker.postMessage({ type: "init", payload: {} });
    console.info("Request expirer worker started");
});
