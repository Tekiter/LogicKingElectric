import { register } from "@electric/shared/src/api/v1/request/register";
import { createNoAuthController } from "../util";

export const registerUserController = createNoAuthController<register.Request, register.Response>(
    register.endpoint,
    async (req, services) => {
        const registerResult = await services.register.registerUser({
            username: req.data.username,
            password: req.data.password,
        });

        return { success: registerResult.success };
    },
);
