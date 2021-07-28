import express from "express";
import morgan from "morgan";
import APIv1 from "./api/v1";

export async function createApp(): Promise<express.Express> {
    await loadDotEnvIfNotProduction();

    const app = express();

    app.use(devLogger());

    const apiv1 = new APIv1();
    await apiv1.initialize();

    app.use("/api/v1", apiv1.getRouter());

    return app;
}

function devLogger() {
    return morgan("dev");
}

async function loadDotEnvIfNotProduction() {
    if (process.env.NODE_ENV !== "PRODUCTION") {
        const dotenv = await import("dotenv");
        dotenv.config();
    }
}
