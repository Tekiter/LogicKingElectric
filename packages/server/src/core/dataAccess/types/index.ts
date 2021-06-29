import { AuthDataAccess } from "./auth";
import { ConfigDataAccess } from "./config";
import { UserDataAccess } from "./user";

export interface DataAccessFacade {
    auth: AuthDataAccess;
    config: ConfigDataAccess;
    user: UserDataAccess;
}

export type DataAccess<K extends keyof DataAccessFacade = keyof DataAccessFacade> = Pick<DataAccessFacade, K>;
