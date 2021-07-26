import express from "express";
import morgan from "morgan";
import { createMemoryDataAccessFacade } from "../core/dataAccess/memory";
import { SolarSimulationAPI } from "../core/openAPI/maruSolarSimulation";
import { SolarSimulationAxiosCall } from "../core/openAPI/maruSolarSimulation/axiosCall";
import { SolarSimulationDummyCall } from "../core/openAPI/maruSolarSimulation/dummyCall";
import { OpenWeatherAPI, OpenWeatherAPIAxios, OpenWeatherAPIDummy } from "../core/openAPI/openWeather";
import { createServices } from "../services";
import APIv1 from "./api/v1";
import { initialize } from "./initialize";

export async function createApp(): Promise<express.Express> {
    await loadDotEnvIfNotProduction();

    const app = express();

    app.use(devLogger());

    const dataAccess = createMemoryDataAccessFacade();
    const [solarSimulationAPI, openWeatherAPI] = createOpenAPI();
    const services = createServices(dataAccess, solarSimulationAPI, openWeatherAPI);

    await initialize(services);

    const apiv1 = new APIv1(services);

    app.use("/api/v1", apiv1.getRouter());

    return app;
}

function devLogger() {
    return morgan("dev");
}

function createOpenAPI(): [SolarSimulationAPI, OpenWeatherAPI] {
    if (process.env.USE_REAL_API === "TRUE") {
        console.log("[info]: Now using real open API calls.");
        return [new SolarSimulationAxiosCall(), createOpenWeatherAPI()];
    } else {
        console.log("[info]: Now using dummy API calls.");
        return [new SolarSimulationDummyCall(), new OpenWeatherAPIDummy()];
    }
}

function createOpenWeatherAPI(): OpenWeatherAPI {
    const key = process.env.OPEN_WEATHER_API_KEY;
    if (key === undefined || key === "") {
        console.info("[warn]: OpenWeather API Key is not set in environment value. Now using dummy API.");
        return new OpenWeatherAPIDummy();
    }

    return new OpenWeatherAPIAxios(key);
}

async function loadDotEnvIfNotProduction() {
    if (process.env.NODE_ENV !== "PRODUCTION") {
        const dotenv = await import("dotenv");
        dotenv.config();
    }
}
