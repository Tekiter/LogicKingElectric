import express from "express";
import { getControllers, ServiceFacade, Controller, asyncErrorHandler } from "./util";

import "./controller";
import { HTTPMethod } from "@electric/shared/src/api/v1/util";

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

        const middleware = (req: express.Request, res: express.Response) => {
            const request = {
                data: extractData(method, req),
            };

            controller
                .handler(request, this.services)
                .then(response => res.status(200).json(response))
                .catch(asyncErrorHandler(res));
        };

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

    private setRequestDataParser() {
        this._router.use(express.json());
        this._router.use(express.urlencoded({ extended: true }));
    }
}

function extractData<T>(method: HTTPMethod, req: express.Request): T {
    let dataSource = req.body;
    switch (method) {
        case "GET":
        case "DELETE":
            dataSource = req.query;
            break;
        case "PATCH":
        case "POST":
            dataSource = req.body;
            break;
        default:
            throw new Error("Invalid method type : " + method);
    }

    return dataSource as T;
}

export default APIv1;
