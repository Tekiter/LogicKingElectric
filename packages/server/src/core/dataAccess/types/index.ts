import { AuthDataAccess } from "./auth";
import { ConfigDataAccess } from "./config";
import { PlantDataAccess } from "./plant";
import { SolarPlantDataAccess } from "./solarPlant";
import { UserDataAccess } from "./user";

export interface DataAccessFacade {
    auth: AuthDataAccess;
    config: ConfigDataAccess;
    user: UserDataAccess;
    plant: PlantDataAccess;
    solarPlant: SolarPlantDataAccess;
}

export type DataAccess<K extends keyof DataAccessFacade = keyof DataAccessFacade> = Pick<DataAccessFacade, K>;
