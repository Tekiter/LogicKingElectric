import { defineEndpoint, defineError, defineErrors } from "../../util";

export interface Response {
    username: string;
}

export const endpoint = defineEndpoint<null, Response>({
    path: "/auth/authorize",
    method: "POST",
});

export const errors = defineErrors({
    invalidTokenError: defineError({
        key: "InvalidTokenError",
        status: 401,
        message: "Invalid auth token",
    }),
});
