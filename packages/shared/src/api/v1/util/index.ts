export type HTTPMethod = "GET" | "POST" | "DELETE" | "PATCH";

export interface EndpointEntryRaw {
    readonly path: string;
    readonly method: HTTPMethod;
}

export interface EndpointEntry<Request, Response> extends EndpointEntryRaw {
    readonly __Request?: Request;
    readonly __Response?: Response;
}

export function defineEndpoint<Request, Response>(entry: EndpointEntryRaw): EndpointEntry<Request, Response> {
    return Object.freeze(entry) as EndpointEntry<Request, Response>;
}

export interface ErrorObjectRaw {
    key: string;
    status: number;
    message?: string;
}

export interface ErrorObject<ErrorData> extends Readonly<ErrorObjectRaw> {
    __dataType?: ErrorData;
}

export function defineError<ErrorData = null>(errorObj: ErrorObjectRaw): ErrorObject<ErrorData> {
    return Object.freeze(errorObj);
}
