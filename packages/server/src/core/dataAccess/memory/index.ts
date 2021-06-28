import { DataAccessFacade } from "../types";
import { AuthMemoryDataAccess } from "./auth";

export function createMemoryDataAccessFacade(): DataAccessFacade {
    return {
        auth: new AuthMemoryDataAccess(),
    };
}
