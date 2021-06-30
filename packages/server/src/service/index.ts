import { DataAccess } from "../core/dataAccess/types";
import { AuthService, AuthWithPassword } from "./auth/auth";
import { ConfigService, ConfigServiceImpl } from "./config";
import { RegisterService, RegisterServiceImpl } from "./register";
import { UserService, UserServiceImpl } from "./user";

export interface ServiceFacade {
    auth: AuthService;
    config: ConfigService;
    user: UserService;
    register: RegisterService;
}

export function createServices(dataAccess: DataAccess): ServiceFacade {
    const auth = new AuthWithPassword(dataAccess);
    const config = new ConfigServiceImpl(dataAccess);
    const user = new UserServiceImpl(dataAccess);
    const register = new RegisterServiceImpl(auth, user);

    return {
        auth,
        config,
        user,
        register,
    };
}
