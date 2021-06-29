import { DataAccess } from "../core/dataAccess/types";
import { AuthWithPassword } from "./auth";
import { ConfigService, ConfigServiceImpl } from "./config";
import { UserService, UserServiceImpl } from "./user";

export interface ServiceFacade {
    auth: AuthWithPassword;
    config: ConfigService;
    user: UserService;
}

export function createServices(dataAccess: DataAccess): ServiceFacade {
    const auth = new AuthWithPassword(dataAccess);
    const config = new ConfigServiceImpl(dataAccess);
    const user = new UserServiceImpl(dataAccess);

    return {
        auth,
        config,
        user,
    };
}
