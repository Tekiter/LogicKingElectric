export interface EndpointEntry {
    endpoint: string;
    method: "GET" | "POST" | "UPDATE" | "DELETE";
}

export function createEndpoint(entry: EndpointEntry): Readonly<EndpointEntry> {
    return Object.freeze(entry);
}
