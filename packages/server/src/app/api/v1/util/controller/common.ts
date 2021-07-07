import express from "express";
import { HTTPMethod } from "@electric/shared/src/api/v1/util";

export function extractData<T>(method: HTTPMethod, req: express.Request): T {
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

    return dataSource as T;
}
