import express from "express";
import { getControllers, ServiceFacade, Controller } from "./util";

class APIv1 {
    private _router = express.Router();

    constructor(private readonly services: ServiceFacade) {
        const controllers = getControllers();
        for (const controller of controllers) {
            this.setController(controller);
        }
    }

    getRouter(): express.Router {
        return this._router;
    }

    private setController(controller: Controller) {
        const path = controller.endpoint.path;
        const binded = controller(this.services);
        switch (controller.endpoint.method) {
            case "GET":
                this._router.get(path, binded);
                break;
            case "POST":
                this._router.post(path, binded);
                break;
            case "PATCH":
                this._router.patch(path, binded);
                break;
            case "DELETE":
                this._router.delete(path, binded);
                break;
        }
    }
}

export default APIv1;
