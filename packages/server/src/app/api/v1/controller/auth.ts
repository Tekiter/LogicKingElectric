import { authorize, issueToken } from "@electric/shared/src/api/v1/request/auth";
import { APIError, createAuthController, createNoAuthController } from "../util";

export const issueTokenController = createNoAuthController(issueToken.endpoint, async (req, services) => {
    const { data } = req;

    const result = await services.auth.authorize(data.username, data.password);

    if (result.success) {
        return {
            accessToken: result.accessToken,
        };
    } else {
        throw new APIError(issueToken.authFailError);
    }
});

export const authorizeController = createAuthController(authorize.endpoint, async (req, services) => {
    return { username: req.auth.username };
});
