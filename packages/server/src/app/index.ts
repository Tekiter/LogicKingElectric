import express from "express";
import morgan from "morgan";
import { createMemoryDataAccessFacade } from "../core/dataAccess/memory";
import { createServices } from "../service";
import APIv1 from "./api/v1";

export function createApp(): express.Express {
    const app = express();

    app.use(devLogger());

    const dataAccess = createMemoryDataAccessFacade();
    const services = createServices(dataAccess);
    const apiv1 = new APIv1(services);

    app.use("/api/v1", apiv1.getRouter());

    return app;
}

function devLogger() {
    return morgan("dev");
}
