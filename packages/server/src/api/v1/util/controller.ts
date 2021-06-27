import express from "express";
import { EndpointEntry } from "@electric/shared/src/api/v1/util";
import { DataAccess } from "../../../core/dao/types";
import { APIError } from "./error";

export interface ServiceFacade {
    dataAccess: DataAccess;
}

export interface Request<Data> {
    data: Data;
}

export interface RequestHandler<RequestData, ResponseData> {
    (request: Request<RequestData>, services: ServiceFacade): Promise<ResponseData>;
}

export interface Controller {
    (services: ServiceFacade): (req: express.Request, res: express.Response) => void;
    endpoint: EndpointEntry;
}

export function createNoAuthController<Req, Res>(
    endpoint: EndpointEntry,
    handler: RequestHandler<Req, Res>,
): Controller {
    const controller: Controller =
        services =>
        (req, res): void => {
            const request: Request<Req> = {
                data: extractData(endpoint, req),
            };
            console.log(request);

            handler(request, services)
                .then(response => res.status(200).json(response))
                .catch(asyncErrorHandler(res));
        };

    controller.endpoint = endpoint;
    return controller;
}

function asyncErrorHandler(res: express.Response) {
    return (error: Error) => {
        if (error instanceof APIError) {
            res.status(error.status).json({ message: error.message, data: error.data });
        } else {
            res.status(500).json({ message: "Fatal error occuered" });
            console.log(error);
        }
    };
}

function extractData<T>(endpoint: EndpointEntry, req: express.Request): T {
    let dataSource = req.body;
    console.log(req.body);
    console.log(req.query);
    switch (endpoint.method) {
        case "GET":
        case "DELETE":
            dataSource = req.query;
            break;
        case "PATCH":
        case "POST":
            dataSource = req.body;
            break;
        default:
            throw new Error("Invalid method type : " + endpoint.method);
    }

    return dataSource as T;
}

const controllers: Controller[] = [];

export function registerController(controller: Controller): void {
    controllers.push(controller);
}

export function getControllers(): Controller[] {
    return [...controllers];
}
