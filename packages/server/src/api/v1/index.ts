import express from "express";
import { getControllers, ServiceFacade, Controller } from "./util";

import "./endpoint";

export class APIv1 {
    private _router = express.Router();

    constructor(private readonly services: ServiceFacade) {
        this.setRequestDataParser();
        this.setControllers();
        this.setFallbackController();
    }

    getRouter(): express.Router {
        return this._router;
    }

    private setControllers() {
        const controllers = getControllers();
        controllers.forEach(controller => this.setController(controller));
    }

    private setController(controller: Controller) {
        const { method, path } = controller.endpoint;
        const serviceBindedController = controller(this.services);
        switch (method) {
            case "GET":
                this._router.get(path, serviceBindedController);
                break;
            case "POST":
                this._router.post(path, serviceBindedController);
                break;
            case "PATCH":
                this._router.patch(path, serviceBindedController);
                break;
            case "DELETE":
                this._router.delete(path, serviceBindedController);
                break;
            default:
                throw new Error("Invalid endpoint method:" + method);
        }
    }

    private setFallbackController() {
        this._router.use("*", (_, res) => res.status(404).json({ message: "invalid API route" }));
    }

    private setRequestDataParser() {
        this._router.use(express.json());
        this._router.use(express.urlencoded({ extended: true }));
    }
}

export default APIv1;
