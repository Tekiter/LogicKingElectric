import express from "express";
import { EndpointEntry } from "@electric/shared/src/api/v1/util";
import { ServiceFacade } from "../../../../../services";
import { Controller, Request, RequestHandler } from "./controller";
import { AuthTokenParser } from "./authTokenParser";
import { extractData } from "./common";
import { asyncErrorHandler } from "../error";
import { AuthInfo } from "../../../../../services/auth/auth";

interface RequestWithAuth<ReqData> extends Request<ReqData> {
    auth: AuthInfo;
}

type RequestHandlerWithAuth<ReqData, Res> = RequestHandler<RequestWithAuth<ReqData>, Res>;

export function createAuthController<Req, Res>(
    endpoint: EndpointEntry<Req, Res>,
    handler: RequestHandlerWithAuth<Req, Res>,
): Controller {
    return new AuthController(endpoint, handler);
}

class AuthController<ReqData, Res> implements Controller {
    constructor(
        public readonly endpoint: EndpointEntry<ReqData, Res>,
        public readonly handler: RequestHandlerWithAuth<ReqData, Res>,
    ) {}

    middleware(services: ServiceFacade): (req: express.Request, res: express.Response) => void {
        const middleware = (req: express.Request, res: express.Response): void => {
            const tokenParser = new AuthTokenParser(services);

            tokenParser
                .getAuthInfo(req.headers.authorization)
                .then(authInfo => {
                    const request = {
                        data: extractData(this.endpoint.method, req),
                        auth: authInfo,
                    } as RequestWithAuth<ReqData>;

                    this.handler(request, services)
                        .then(response => res.status(200).json(response))
                        .catch(asyncErrorHandler(res));
                })
                .catch(asyncErrorHandler(res));
        };
        return middleware;
    }
}
