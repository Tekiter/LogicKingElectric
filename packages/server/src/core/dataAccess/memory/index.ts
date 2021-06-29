import { DataAccessFacade } from "../types";
import { AuthMemoryDataAccess } from "./auth";
import { ConfigMemoryDataAccess } from "./config";
import { UserMemoryDataAccess } from "./user";

export function createMemoryDataAccessFacade(): DataAccessFacade {
    return {
        auth: new AuthMemoryDataAccess(),
        config: new ConfigMemoryDataAccess(),
        user: new UserMemoryDataAccess(),
    };
}
