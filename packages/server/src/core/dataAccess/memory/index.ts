import { DataAccessFacade } from "../types";
import { AuthMemoryDataAccess } from "./auth";
import { ConfigMemoryDataAccess } from "./config";

export function createMemoryDataAccessFacade(): DataAccessFacade {
    return {
        auth: new AuthMemoryDataAccess(),
        config: new ConfigMemoryDataAccess(),
    };
}
