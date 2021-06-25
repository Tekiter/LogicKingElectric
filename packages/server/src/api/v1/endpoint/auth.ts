import { issueToken } from "@electric/shared/src/api/v1/request/auth";
import { AuthWithPassword } from "../../../core/auth";
import { createNoAuthController, NotFoundError, registerController } from "../util";

export const issueTokenController = createNoAuthController<issueToken.Request, issueToken.Response>(
    issueToken.endpoint,
    async (req, services) => {
        const { data } = req;

        const auth = new AuthWithPassword(services.dataAccess);
        const result = await auth.authorize(data.username, data.password);

        if (result.success) {
            return {
                accessToken: result.authInfo.username,
            };
        } else {
            throw new NotFoundError("Invalid username or password");
        }
    },
);
registerController(issueTokenController);
