import { DataAccess } from "../core/dataAccess/types";
import { SolarSimulationAPI } from "../core/openAPI/maruSolarSimulation";
import { AnalysisService, AnalysisServiceImpl } from "./analysis";
import { AuthService, AuthWithPassword } from "./auth/auth";
import { ConfigService, ConfigServiceImpl } from "./config";
import { InitializeService, InitializeServiceImpl } from "./initialize";
import { PlantService, PlantServiceImpl } from "./plant";
import { PredictSolarPlantService, PredictSolarPlantServiceImpl } from "./predictSolarPlant";
import { RegisterService, RegisterServiceImpl } from "./register";
import { SolarPlantService, SolarPlantServiceImpl } from "./solarPlant";
import { UserService, UserServiceImpl } from "./user";

export interface ServiceFacade {
    auth: AuthService;
    config: ConfigService;
    user: UserService;
    register: RegisterService;
    initialize: InitializeService;
    plant: PlantService;
    solarPlant: SolarPlantService;
    predictSolarPlant: PredictSolarPlantService;
    analysisService: AnalysisService;
}

export function createServices(dataAccess: DataAccess, solarApiCall: SolarSimulationAPI): ServiceFacade {
    const auth = new AuthWithPassword(dataAccess);
    const config = new ConfigServiceImpl(dataAccess);
    const user = new UserServiceImpl(dataAccess);
    const register = new RegisterServiceImpl(auth, user);

    const plant = new PlantServiceImpl(dataAccess);
    const solarPlant = new SolarPlantServiceImpl(dataAccess);
    const predictSolarPlant = new PredictSolarPlantServiceImpl(solarApiCall, plant, solarPlant);

    const analysisService = new AnalysisServiceImpl(dataAccess);

    const initialize = new InitializeServiceImpl(config, register);

    return {
        auth,
        config,
        user,
        register,
        initialize,
        plant,
        solarPlant,
        predictSolarPlant,
        analysisService,
    };
}
