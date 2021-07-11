import { getDummyValidator, Validator } from "./validation";

export type HTTPMethod = "GET" | "POST" | "DELETE" | "PATCH";

export interface EndpointEntryObject<Request> {
    path: string;
    method: HTTPMethod;
    validator: Validator<Request>;
}

export interface EndpointEntry<Request, Response> {
    readonly path: string;
    readonly method: HTTPMethod;
    readonly validator: Validator<Request>;
    readonly __Request?: Request;
    readonly __Response?: Response;
}

type RemoveValidatorIfNotNeeded<EntryObject, Request> = Request extends null | undefined
    ? Omit<EntryObject, "validator">
    : EntryObject;

type EntryObjectBuilt<Request> = RemoveValidatorIfNotNeeded<EndpointEntryObject<Request>, Request>;

export function defineEndpoint<Request, Response>(
    entryObj: EntryObjectBuilt<Request>,
): EndpointEntry<Request, Response> {
    const entry: EndpointEntry<Request, Response> = {
        path: entryObj.path,
        method: entryObj.method,
        validator: (entryObj as EndpointEntryObject<Request>).validator ?? getDummyValidator(),
    };
    return Object.freeze(entry);
}

export * from "./error";
