import { AuthDataAccess } from "./auth";

export interface DataAccessFacade {
    auth: AuthDataAccess;
}

export type DataAccessFacadePartial = Partial<DataAccessFacade>;
