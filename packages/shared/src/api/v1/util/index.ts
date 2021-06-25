export type HTTPMethod = "GET" | "POST" | "DELETE" | "PATCH";

export interface EndpointEntry {
    readonly path: string;
    readonly method: HTTPMethod;
}

export function createEndpoint(entry: EndpointEntry): Readonly<EndpointEntry> {
    return Object.freeze(entry);
}
