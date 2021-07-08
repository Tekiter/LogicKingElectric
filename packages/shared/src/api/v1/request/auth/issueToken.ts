import { RawAuthToken } from "../../data/auth";
import { defineError, defineEndpoint } from "../../util";
import { defineValidator, va } from "../../util/validation";

export interface Request {
    username: string;
    password: string;
}

export const requestValidator = defineValidator<Request>({
    username: va().stringRegex(/.+/i),
    password: va().stringRegex(/.+/i),
});
export interface Response {
    accessToken: RawAuthToken;
}

export const endpoint = defineEndpoint<Request, Response>({
    path: "/auth/issue",
    method: "POST",
    validator: requestValidator,
});

export const authFailError = defineError({
    key: "AuthFailError",
    status: 401,
    message: "Invalid username or password",
});
