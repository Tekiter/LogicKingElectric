import axios from "axios";

import { EndpointEntry } from "@electric/shared/dist/api/v1/util";
import { APIService } from "./service";

export class ServerRequestAPIService implements APIService {
    private readonly axios;
    private authToken: string | null = null;

    constructor({ url }: { url: string }) {
        this.axios = axios.create({
            baseURL: url,
            validateStatus: status => status >= 200 && status < 500,
        });
    }

    async request<Request, Response>(
        endpoint: EndpointEntry<Request, Response>,
        requestData: Request,
    ): Promise<Response> {
        const ret = await this.axios.request({
            method: endpoint.method,
            url: endpoint.path,
            headers: {
                ...setupAuthHeader(this.authToken),
            },
            ...setupRequestData(endpoint, requestData),
        });

        if (ret.status >= 400 && ret.status < 500) {
            const errorData = ret.data as { key: string; message: string };
            throw new APIError(errorData);
        }

        return ret.data as Response;
    }

    setAuthToken(token: string | null): void {
        this.authToken = token;
    }
}

function setupRequestData<Request>(endpoint: EndpointEntry<Request, unknown>, data: Request) {
    const { method } = endpoint;
    switch (method) {
        case "GET":
        case "DELETE":
            return {
                params: data,
            };
        case "PATCH":
        case "POST":
            return {
                data: data,
            };
        default:
            throw new Error("Invalid method type : " + method);
    }
}

export class APIError extends Error {
    key: string;
    message: string;

    constructor({ key, message }: { key: string; message: string }) {
        super();
        this.key = key;
        this.message = message;
    }
}

function setupAuthHeader(token: string | null) {
    if (token === null) {
        return {};
    }
    return { Authorization: `Bearer ${token}` };
}
