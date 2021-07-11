interface ErrorObjectRaw {
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
