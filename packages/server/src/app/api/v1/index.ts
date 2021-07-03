import express from "express";
import { getControllers, Controller } from "./util";

import { ServiceFacade } from "../../../services";

import "./registerControllers";
export class APIv1 {
    private _router = express.Router();

    constructor(private readonly services: ServiceFacade) {
        this.setRequestDataParser();
        this.setControllers();
        this.setFallbackController();
    }

    private setRequestDataParser() {
        this._router.use(express.json());
        this._router.use(express.urlencoded({ extended: true }));
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

export default APIv1;
