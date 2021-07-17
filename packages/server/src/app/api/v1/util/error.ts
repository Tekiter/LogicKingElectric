import express from "express";
import { commonErrors, ErrorObject } from "@electric/shared/src/api/v1/util";

export abstract class HandleableError<ErrorData = undefined> extends Error {
    public abstract key: string;
    public abstract status: number;
    public abstract data: ErrorData | undefined;
}

export class APIError<ErrorData> extends HandleableError<ErrorData> {
    public key: string;
    public status: number;
    public data: ErrorData | undefined;

    constructor(error: ErrorObject<null>);
    constructor(error: ErrorObject<NonNullable<ErrorData>>, data: ErrorData);
    constructor(error: ErrorObject<ErrorData>, data?: ErrorData) {
        super(error.message);
        this.key = error.key;
        this.status = error.status;
        this.data = data;
    }
}

export class RequestError extends APIError<RequestErrorReason> {
    constructor(reason?: RequestErrorReason) {
        super(commonErrors.invalidRequestError);
        this.data = reason;
    }
}
type RequestErrorReason = { invalidObject?: boolean; errorFields?: string[] };

export class AuthorizeFailError extends APIError<null> {
    constructor() {
        super(commonErrors.authorizeFailError);
    }
}

export function asyncErrorHandler(res: express.Response) {
    return (error: Error): void => {
        if (error instanceof HandleableError) {
            res.status(error.status).json({ key: error.key, message: error.message, data: error.data });
        } else {
            res.status(500).json({ message: "Fatal error occuered" });
            console.error(error);
        }
    };
}
