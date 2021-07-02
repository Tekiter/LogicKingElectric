import { authorize, issueToken } from "@electric/shared/src/api/v1/request/auth";
import { APIError, createNoAuthController } from "../util";

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

export const authorizeController = createNoAuthController(authorize.endpoint, async (req, services) => {
    const token = req.data.accessToken;
    const authInfo = await services.auth.getAuthInfo(token);
    if (!authInfo.success) {
        throw new APIError(authorize.invalidTokenError);
    }
    return { username: authInfo.authInfo.username };
});
