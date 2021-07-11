import { RawAuthToken } from "../../data/auth";
import { defineError, defineEndpoint, defineErrors } from "../../util";
import { defineValidator, va } from "../../util/validation";

export interface Request {
    username: string;
    password: string;
}

const requestValidator = defineValidator<Request>({
    username: va().stringRegex(/.+/i),
    password: va().stringRegex(/.+/i),
});
export interface Response {
    accessToken: RawAuthToken;
}

export const errors = defineErrors({
    authFailError: defineError({
        key: "AuthFailError",
        status: 401,
        message: "Invalid username or password",
    }),
});

export const endpoint = defineEndpoint<Request, Response>({
    path: "/auth/issue",
    method: "POST",
    validator: requestValidator,
});
