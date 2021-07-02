import { defineError, defineEndpoint } from "../../util";

export interface Request {
    username: string;
    password: string;
}

export interface Response {
    success: boolean;
}

export const endpoint = defineEndpoint({
    path: "/register",
    method: "POST",
});

export const registerFailError = defineError({
    key: "RegisterFailError",
    status: 401,
    message: "Invalid username or password",
});
