export type HTTPMethod = "GET" | "POST" | "DELETE" | "PATCH";

export interface EndpointEntryRaw {
    readonly path: string;
    readonly method: HTTPMethod;
}

export type EndpointEntry = Readonly<EndpointEntryRaw>;

export function defineEndpoint(entry: EndpointEntryRaw): EndpointEntry {
    return Object.freeze(entry);
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
