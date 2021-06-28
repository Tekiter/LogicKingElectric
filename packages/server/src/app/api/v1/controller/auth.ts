import { issueToken } from "@electric/shared/src/api/v1/request/auth";
import { JWTTokenManager } from "../../../../service/auth/token/jwt";
import { APIError, createNoAuthController } from "../util";

export const issueTokenController = createNoAuthController<issueToken.Request, issueToken.Response>(
    issueToken.endpoint,
    async (req, services) => {
        const { data } = req;

        const result = await services.auth.authorize(data.username, data.password);

        if (result.success) {
            const tokenManager = new JWTTokenManager("SECRET_NEED_CHANGE");
            const token = await tokenManager.issue(result.authInfo);
            return {
                accessToken: token,
            };
        } else {
            throw new APIError(issueToken.authFailError);
        }
    },
);
