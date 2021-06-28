import express from "express";
import APIv1 from "./api/v1";
import { createServices } from "./services";

export function createApp(): express.Express {
    const app = express();

    const services = createServices();
    const apiv1 = new APIv1(services);
    app.use("/api/v1", apiv1.getRouter());

    return app;
}
