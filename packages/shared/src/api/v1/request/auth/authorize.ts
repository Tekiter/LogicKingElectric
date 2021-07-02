import { RawAuthToken } from "../../data/auth";
import { defineEndpoint, defineError } from "../../util";

export interface Request {
    accessToken: RawAuthToken;
}

export interface Response {
    username: string;
}

export const endpoint = defineEndpoint<Request, Response>({
    path: "/auth/authorize",
    method: "POST",
});

export const invalidTokenError = defineError({
    key: "InvalidTokenError",
    status: 401,
    message: "Invalid auth token",
});
