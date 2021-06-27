import { issueToken } from "@electric/shared/src/api/v1/request/auth";
import { AuthWithPassword } from "../../../core/auth";
import { JWTTokenManager } from "../../../core/auth/token/jwt";
import { createNoAuthController, NotFoundError } from "../util";

export const issueTokenController = createNoAuthController<issueToken.Request, issueToken.Response>(
    issueToken.endpoint,
    async (req, services) => {
        const { data } = req;

        const auth = new AuthWithPassword(services.dataAccess);
        const result = await auth.authorize(data.username, data.password);

        if (result.success) {
            const tokenManager = new JWTTokenManager("SECRET_NEED_CHANGE");
            const token = await tokenManager.issue(result.authInfo);
            return {
                accessToken: token,
            };
        } else {
            throw new NotFoundError("Invalid username or password");
        }
    },
);
