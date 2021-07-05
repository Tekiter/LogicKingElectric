import express from "express";
import { EndpointEntry } from "@electric/shared/src/api/v1/util";
import { ServiceFacade } from "../../../../../services";
import { Controller, Request, RequestHandler } from "./controller";
import { AuthTokenExtractor, AuthHeaderParser } from "./authToken";
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
            (async () => {
                try {
                    const tokenExtractor = new AuthTokenExtractor(services);
                    const token = AuthHeaderParser.parse(req.headers.authorization);
                    const authInfo = await tokenExtractor.getAuthInfo(token);
                    const request = {
                        data: extractData(this.endpoint.method, req),
                        auth: authInfo,
                    } as RequestWithAuth<ReqData>;

                    const response = await this.handler(request, services);
                    res.status(200).json(response);
                } catch (error) {
                    const handleError = asyncErrorHandler(res);
                    handleError(error);
                }
            })();
        };
        return middleware;
    }
}
