import { defineError, defineErrors, ErrorObject } from ".";

export const authorizeFailError = defineError({
    key: "AuthorizeFailError",
    status: 401,
    message: "Invalid authorization",
});

export const invalidRequestError = defineError({
    key: "invalidRequestError",
    status: 400,
    message: "Invalid request field",
});

export interface CommonErrors {
    authorizeFailError: ErrorObject<null>;
    invalidRequestError: ErrorObject<null>;
}

export const commonErrors: Readonly<CommonErrors> = defineErrors({
    authorizeFailError,
    invalidRequestError,
});
