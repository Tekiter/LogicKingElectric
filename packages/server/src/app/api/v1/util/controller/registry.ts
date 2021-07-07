import { Controller } from "./controller";

const controllers: Controller[] = [];

export function registerController(controller: Controller): void {
    controllers.push(controller);
}

export function getControllers(): Controller[] {
    return [...controllers];
}
