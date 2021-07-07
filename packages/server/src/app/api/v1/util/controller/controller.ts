import express from "express";
import { EndpointEntry } from "@electric/shared/src/api/v1/util";
import { ServiceFacade } from "../../../../../services";
import { asyncErrorHandler } from "../error";
import { extractData } from "./common";

export interface Controller {
    endpoint: EndpointEntry<unknown, unknown>;
    middleware(services: ServiceFacade): (req: express.Request, res: express.Response) => void;
}

export interface Request<Data> {
    data: Data;
}

export interface RequestHandler<Req, Res> {
    (request: Req, services: ServiceFacade): Promise<Res>;
}

type PlainRequestHandler<Req, Res> = RequestHandler<Request<Req>, Res>;

export function createNoAuthController<ReqData, Res>(
    endpoint: EndpointEntry<ReqData, Res>,
    handler: PlainRequestHandler<ReqData, Res>,
): Controller {
    return new NoAuthController(endpoint, handler);
}

class NoAuthController<ReqData, Res> implements Controller {
    constructor(
        public readonly endpoint: EndpointEntry<unknown, unknown>,
        public readonly handler: PlainRequestHandler<ReqData, Res>,
    ) {}

    middleware(services: ServiceFacade): (req: express.Request, res: express.Response) => void {
        const middleware = (req: express.Request, res: express.Response): void => {
            const request = {
                data: extractData(this.endpoint.method, req),
            } as Request<ReqData>;

            this.handler(request, services)
                .then(response => res.status(200).json(response))
                .catch(asyncErrorHandler(res));
        };
        return middleware;
    }
}
