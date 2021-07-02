import { EndpointEntry } from "@electric/shared/src/api/v1/util";
import { ServiceFacade } from "../../../../service";

export interface Request<Data> {
    data: Data;
}
export interface RequestHandler<RequestData, ResponseData> {
    (request: Request<RequestData>, services: ServiceFacade): Promise<ResponseData>;
}

export interface Controller<Handler = RequestHandler<unknown, unknown>> {
    handler: Handler;
    endpoint: EndpointEntry<unknown, unknown>;
    flags: {
        needAuth: boolean;
    };
}

export function createNoAuthController<Req, Res>(
    endpoint: EndpointEntry<Req, Res>,
    handler: RequestHandler<Req, Res>,
): Controller {
    return {
        handler: handler as RequestHandler<unknown, unknown>,
        endpoint: endpoint,
        flags: {
            needAuth: false,
        },
    };
}

export function createAuthController<Req, Res>(
    endpoint: EndpointEntry<Req, Res>,
    handler: RequestHandler<Req, Res>,
): Controller {
    return {
        handler: handler as RequestHandler<unknown, unknown>,
        endpoint: endpoint,
        flags: {
            needAuth: true,
        },
    };
}

const controllers: Controller[] = [];

export function registerController(controller: Controller): void {
    controllers.push(controller);
}

export function getControllers(): Controller[] {
    return [...controllers];
}
