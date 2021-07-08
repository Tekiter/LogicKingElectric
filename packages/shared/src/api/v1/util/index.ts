import { getDummyValidator, Validator } from "./validation";

export type HTTPMethod = "GET" | "POST" | "DELETE" | "PATCH";

export interface EndpointEntryObject<Request> {
    path: string;
    method: HTTPMethod;
    validator: Validator<Request>;
}

type EndpointEntryObjectWithoutValidator = Omit<EndpointEntryObject<null>, "validator">;

export interface EndpointEntry<Request, Response> {
    readonly path: string;
    readonly method: HTTPMethod;
    readonly validator: Validator<Request>;
    readonly __Request?: Request;
    readonly __Response?: Response;
}

type EP<T> = T extends null | undefined ? EndpointEntryObjectWithoutValidator : EndpointEntryObject<T>;

export function defineEndpoint<Request, Response>(entryObj: EP<Request>): EndpointEntry<Request, Response> {
    const entry: EndpointEntry<Request, Response> = {
        path: entryObj.path,
        method: entryObj.method,
        validator: (entryObj as EndpointEntryObject<Request>).validator ?? getDummyValidator(),
    };
    return Object.freeze(entry);
}

export * from "./error";
