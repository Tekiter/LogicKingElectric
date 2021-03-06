import { AuthDataAccess } from "./auth";
import { ConfigDataAccess } from "./config";
import { GenerationHistoryDataAccess } from "./generationHistory";
import { PlantDataAccess } from "./plant";
import { SolarPlantDataAccess } from "./solarPlant";
import { UserDataAccess } from "./user";
import { WeatherDataAccess } from "./weather";
import { WindPlantDataAccess } from "./windPlant";

export interface DataAccessFacade {
    auth: AuthDataAccess;
    config: ConfigDataAccess;
    user: UserDataAccess;
    plant: PlantDataAccess;
    solarPlant: SolarPlantDataAccess;
    windPlant: WindPlantDataAccess;
    generationHistory: GenerationHistoryDataAccess;
    weather: WeatherDataAccess;
}

export type DataAccess<K extends keyof DataAccessFacade = keyof DataAccessFacade> = Pick<DataAccessFacade, K>;
