import { DataAccessFacade } from "../types";
import { AuthMemoryDataAccess } from "./auth";
import { ConfigMemoryDataAccess } from "./config";
import { PlantMemoryDataAccess } from "./plant";
import { UserMemoryDataAccess } from "./user";

export function createMemoryDataAccessFacade(): DataAccessFacade {
    return {
        auth: new AuthMemoryDataAccess(),
        config: new ConfigMemoryDataAccess(),
        user: new UserMemoryDataAccess(),
        plant: new PlantMemoryDataAccess(),
    };
}
