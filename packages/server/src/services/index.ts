import { DataAccess } from "../core/dataAccess/types";
import { SolarSimulationAPI } from "../core/openAPI/maruSolarSimulation";
import { OpenWeatherAPI } from "../core/openAPI/openWeather";
import { AnalysisService, AnalysisServiceImpl } from "./analysis";
import { AuthService, AuthWithPassword } from "./auth/auth";
import { ConfigService, ConfigServiceImpl } from "./config";
import { DemoService, DemoServiceImpl } from "./demo";
import { InitializeService, InitializeServiceImpl } from "./initialize";
import { PlantService, PlantServiceImpl } from "./plant";
import { PredictSolarPlantService, PredictSolarPlantServiceImpl } from "./predictSolarPlant";
import { RegisterService, RegisterServiceImpl } from "./register";
import { SolarPlantService, SolarPlantServiceImpl } from "./solarPlant";
import { SubmitActualService, SubmitActualServiceImpl } from "./submitActual";
import { SubmitPredictionService, SubmitPredictionServiceImpl } from "./submitPrediciton";
import { UserService, UserServiceImpl } from "./user";
import { WeatherService, WeatherServiceImpl } from "./weather";

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
    submitPrediction: SubmitPredictionService;
    submitActual: SubmitActualService;
    demo: DemoService;
    weather: WeatherService;
}

export function createServices(
    dataAccess: DataAccess,
    solarApiCall: SolarSimulationAPI,
    weatherApiCall: OpenWeatherAPI,
): ServiceFacade {
    const auth = new AuthWithPassword(dataAccess);
    const config = new ConfigServiceImpl(dataAccess);
    const user = new UserServiceImpl(dataAccess);
    const register = new RegisterServiceImpl(auth, user);

    const plant = new PlantServiceImpl(dataAccess);
    const solarPlant = new SolarPlantServiceImpl(dataAccess);
    const predictSolarPlant = new PredictSolarPlantServiceImpl(solarApiCall, plant, solarPlant);

    const submitPrediction = new SubmitPredictionServiceImpl(dataAccess);
    const submitActual = new SubmitActualServiceImpl(dataAccess);

    const weather = new WeatherServiceImpl(weatherApiCall, plant);

    const analysisService = new AnalysisServiceImpl(dataAccess);

    const initialize = new InitializeServiceImpl(config, register);
    const demo = new DemoServiceImpl(user, register, plant, solarPlant, submitActual, submitPrediction);

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
        submitPrediction,
        submitActual,
        demo,
        weather,
    };
}
