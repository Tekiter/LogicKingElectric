export abstract class ResponseError extends Error {
    abstract status: number;
}

export class NotFoundError extends ResponseError {
    status = 404;
}

export class UnauthorizedError extends ResponseError {
    status = 401;
}
