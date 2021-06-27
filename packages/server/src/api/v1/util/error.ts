import { ErrorObject } from "@electric/shared/src/api/v1/util";

export class APIError<ErrorData> extends Error {
    public status: number;
    public data: ErrorData | undefined;

    constructor(error: ErrorObject<null>);
    constructor(error: ErrorObject<NonNullable<ErrorData>>, data: ErrorData);
    constructor(error: ErrorObject<ErrorData>, data?: ErrorData) {
        super(error.message);
        this.status = error.status;
        this.data = data;
    }
}
