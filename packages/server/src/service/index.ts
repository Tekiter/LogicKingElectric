import { DataAccess } from "../core/dataAccess/types";
import { AuthService, AuthWithPassword } from "./auth/auth";
import { ConfigService, ConfigServiceImpl } from "./config";
import { InitializeService, InitializeServiceImpl } from "./initialize";
import { RegisterService, RegisterServiceImpl } from "./register";
import { UserService, UserServiceImpl } from "./user";

export interface ServiceFacade {
    auth: AuthService;
    config: ConfigService;
    user: UserService;
    register: RegisterService;
    initialize: InitializeService;
}

export function createServices(dataAccess: DataAccess): ServiceFacade {
    const auth = new AuthWithPassword(dataAccess);
    const config = new ConfigServiceImpl(dataAccess);
    const user = new UserServiceImpl(dataAccess);
    const register = new RegisterServiceImpl(auth, user);

    const initialize = new InitializeServiceImpl(config, register);

    return {
        auth,
        config,
        user,
        register,
        initialize,
    };
}
