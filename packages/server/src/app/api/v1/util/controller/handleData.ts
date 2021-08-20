import express from "express";
import { EndpointEntry, HTTPMethod } from "@electric/shared/dist/api/v1/util";
import { RequestError } from "../error";

export function extractData(method: HTTPMethod, req: express.Request): Record<string, unknown> {
    let dataSource = req.body;
    switch (method) {
        case "GET":
        case "DELETE":
            dataSource = req.query;
            break;
        case "PATCH":
        case "POST":
            dataSource = req.body;
            break;
        default:
            throw new Error("Invalid method type : " + method);
    }

    return dataSource;
}

export function getValidData<T>(endpoint: EndpointEntry<T, unknown>, req: express.Request): T {
    const data = extractData(endpoint.method, req);

    if (!checkValidity(endpoint, data)) {
        throw new RequestError();
    }
    return data;
}

function checkValidity<T>(endpoint: EndpointEntry<T, unknown>, data: unknown): data is T {
    const [checkSuccess, errorReason] = endpoint.validator.check(data);
    if (!checkSuccess) {
        throw new RequestError({ invalidObject: errorReason?.notValidObject, errorFields: errorReason?.errorFields });
    }
    return true;
}
