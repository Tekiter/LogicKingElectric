import express from "express";
import morgan from "morgan";
import { createMemoryDataAccessFacade } from "../core/dataAccess/memory";
import { SolarSimulationAPI } from "../core/openAPI/maruSolarSimulation";
import { SolarSimulationDummyCall } from "../core/openAPI/maruSolarSimulation/dummyCall";
import { OpenWeatherAPI, OpenWeatherAPIDummy } from "../core/openAPI/openWeather";
import { createServices } from "../services";
import APIv1 from "./api/v1";
import { initialize } from "./initialize";

export async function createApp(): Promise<express.Express> {
    const app = express();

    app.use(devLogger());

    const dataAccess = createMemoryDataAccessFacade();
    const solarSimulationAPI = createSolarSimulationAPI();
    const openWeatherAPI = createOpenWeatherAPI();
    const services = createServices(dataAccess, solarSimulationAPI, openWeatherAPI);

    await initialize(services);

    const apiv1 = new APIv1(services);

    app.use("/api/v1", apiv1.getRouter());

    return app;
}

function devLogger() {
    return morgan("dev");
}

function createSolarSimulationAPI(): SolarSimulationAPI {
    return new SolarSimulationDummyCall();
    // return new SolarSimulationAxiosCall();
}

function createOpenWeatherAPI(): OpenWeatherAPI {
    return new OpenWeatherAPIDummy();
    // return new OpenWeatherAPIAxios("API_KEY");
}
