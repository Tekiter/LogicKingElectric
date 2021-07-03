import { defineEndpoint, defineError } from "../../util";

export interface Response {
    username: string;
}

export const endpoint = defineEndpoint<unknown, Response>({
    path: "/auth/authorize",
    method: "POST",
});

export const invalidTokenError = defineError({
    key: "InvalidTokenError",
    status: 401,
    message: "Invalid auth token",
});
