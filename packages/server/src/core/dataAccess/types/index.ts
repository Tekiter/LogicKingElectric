import { AuthDataAccess } from "./auth";
import { ConfigDataAccess } from "./config";

export interface DataAccessFacade {
    auth: AuthDataAccess;
    config: ConfigDataAccess;
}

export type DataAccess<K extends keyof DataAccessFacade = keyof DataAccessFacade> = Pick<DataAccessFacade, K>;
