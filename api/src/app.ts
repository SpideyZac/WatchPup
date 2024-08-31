import cookieParser from "cookie-parser";
import express from "express";

import AppRouter from "#routes/router";
import { connect } from "#utils/db.utils";

declare module "bun" {
    interface Env {
        PORT: number | undefined;
        ENV_TYPE: "development" | "production";
        DB_PRIVATE_URL: string;
        DB_NAMESPACE: string;
        DB_DATABASE: string;
        DB_USER: string;
        DB_PASSWORD: string;
    }
}

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", AppRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    console.info(`Server is running on http://localhost:${PORT}`);
    await connect();
    console.info("Connected to the database");
});
