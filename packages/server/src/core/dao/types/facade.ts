import { AuthDataAccess } from "./auth";

export interface DataAccessFacade {
    auth: AuthDataAccess;
}

export type DataAccess<K extends keyof DataAccessFacade = keyof DataAccessFacade> = Pick<DataAccessFacade, K>;
