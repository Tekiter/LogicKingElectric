import express from "express";
import nocache from "nocache";
import { getControllers, Controller } from "./util";

import { createServices, ServiceFacade } from "../../../services";

import "./registerControllers";
import { createMemoryDataAccessFacade } from "../../../core/dataAccess/memory";
import { initialize } from "../../initialize";
import { SolarSimulationAPI } from "../../../core/openAPI/maruSolarSimulation";
import { OpenWeatherAPI, OpenWeatherAPIAxios, OpenWeatherAPIDummy } from "../../../core/openAPI/openWeather";
import { SolarSimulationAxiosCall } from "../../../core/openAPI/maruSolarSimulation/axiosCall";
import { SolarSimulationDummyCall } from "../../../core/openAPI/maruSolarSimulation/dummyCall";
export class APIv1 {
    private readonly services: ServiceFacade;
    private _router = express.Router();

    constructor() {
        this.services = this.createServices();
        this.setRequestDataParser();
        this.setControllers();
        this.setFallbackController();
    }

    async initialize(): Promise<void> {
        await initialize(this.services);
    }

    private createServices() {
        const dataAccess = createMemoryDataAccessFacade();
        const [solarSimulationAPI, openWeatherAPI] = createOpenAPI();
        return createServices(dataAccess, solarSimulationAPI, openWeatherAPI);
    }

    private setRequestDataParser() {
        this._router.use(express.json());
        this._router.use(express.urlencoded({ extended: true }));
        this._router.use(nocache());
    }

    private setControllers() {
        const controllers = getControllers();
        controllers.forEach(controller => this.setController(controller));
    }

    private setController(controller: Controller) {
        const middleware = this.createMiddleware(controller);
        this.setMiddleware(controller, middleware);
    }

    private createMiddleware(controller: Controller) {
        const middleware = controller.middleware(this.services);
        return middleware;
    }

    private setMiddleware(controller: Controller, middleware: (req: express.Request, res: express.Response) => void) {
        const { method, path } = controller.endpoint;
        switch (method) {
            case "GET":
                this._router.get(path, middleware);
                break;
            case "POST":
                this._router.post(path, middleware);
                break;
            case "PATCH":
                this._router.patch(path, middleware);
                break;
            case "DELETE":
                this._router.delete(path, middleware);
                break;
            default:
                throw new Error("Invalid endpoint method:" + method);
        }
    }

    private setFallbackController() {
        this._router.use("*", (_, res) => res.status(404).json({ message: "invalid API route" }));
    }

    getRouter(): express.Router {
        return this._router;
    }
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

export default APIv1;
