import express from "express";
import { createMemoryDataAccessFacade } from "../core/dataAccess/memory";
import { createServices } from "../services";
import APIv1 from "./api/v1";

export function createApp(): express.Express {
    const app = express();

    const dataAccess = createMemoryDataAccessFacade();

    const services = createServices(dataAccess);
    const apiv1 = new APIv1(services);
    app.use("/api/v1", apiv1.getRouter());

    return app;
}
