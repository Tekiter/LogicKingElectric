import { RawAuthToken } from "../../data/auth";
import { defineError, defineEndpoint } from "../../util";

export interface Request {
    username: string;
    password: string;
}

export interface Response {
    accessToken: RawAuthToken;
}

export const endpoint = defineEndpoint({
    path: "/auth/issue",
    method: "POST",
});

export const authFailError = defineError({
    key: "AuthFailError",
    status: 401,
    message: "Invalid username or password",
});
