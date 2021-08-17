import { DataAccessFacade } from "../types";
import { AuthMemoryDataAccess } from "./auth";
import { ConfigMemoryDataAccess } from "./config";
import { GenerationHistoryMemoryDataAccess } from "./generationHistory";
import { PlantMemoryDataAccess } from "./plant";
import { SolarPlantMemoryDataAccess } from "./solarPlant";
import { UserMemoryDataAccess } from "./user";
import { WeatherMemoryDataAccess } from "./weather";
import { WindPlantMemoryDataAccess } from "./windPlant";

export function createMemoryDataAccessFacade(): DataAccessFacade {
    return {
        auth: new AuthMemoryDataAccess(),
        config: new ConfigMemoryDataAccess(),
        user: new UserMemoryDataAccess(),
        plant: new PlantMemoryDataAccess(),
        solarPlant: new SolarPlantMemoryDataAccess(),
        windPlant: new WindPlantMemoryDataAccess(),
        generationHistory: new GenerationHistoryMemoryDataAccess(),
        weather: new WeatherMemoryDataAccess(),
    };
}
