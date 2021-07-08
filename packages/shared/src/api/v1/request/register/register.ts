import { defineError, defineEndpoint } from "../../util";
import { defineValidator, va } from "../../util/validation";

export interface Request {
    username: string;
    password: string;
}

export interface Response {
    success: boolean;
}

const validator = defineValidator<Request>({
    username: va().stringRegex(/.+/i),
    password: va().stringRegex(/.+/i),
});

export const endpoint = defineEndpoint<Request, Response>({
    path: "/register",
    method: "POST",
    validator,
});

export const registerFailError = defineError({
    key: "RegisterFailError",
    status: 401,
    message: "Invalid username or password",
});
