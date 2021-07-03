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
    (error: unknown): error is ErrorObjectRaw;
    __dataType?: ErrorData;
}

export function defineError<ErrorData = null>(errorObj: ErrorObjectRaw): ErrorObject<ErrorData> {
    const error = Object.assign(function (error: unknown): error is ErrorObjectRaw {
        if (isErrorObject(error)) {
            return error.key === errorObj.key;
        }
        return false;
    }, errorObj);

    return Object.freeze(error);
}

function isErrorObject(error: unknown): error is ErrorObjectRaw {
    return (error as ErrorObjectRaw).key !== undefined;
}
