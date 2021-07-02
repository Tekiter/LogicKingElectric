import axios from "axios";

import { EndpointEntry } from "@electric/shared/dist/api/v1/util";
import { APIService } from "./service";

export class ServerRequestAPIService implements APIService {
    readonly axios;

    constructor() {
        this.axios = axios.create({
            baseURL: "/api/v1/",
        });
    }
    async request<Request, Response>(
        endpoint: EndpointEntry<Request, Response>,
        requestData: Request,
    ): Promise<Response> {
        const ret = await this.axios.request({
            method: endpoint.method,
            url: endpoint.path,
            ...setupRequestData(endpoint, requestData),
        });

        return ret.data as Response;
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
