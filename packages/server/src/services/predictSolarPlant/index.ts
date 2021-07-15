import { SolarSimulationAPI } from "../../core/openAPI/maruSolarSimulation";
import { UserIdentifier } from "../../entity/user";
import { SolarPlant } from "../../entity/plant";
import { PlantService } from "../plant";
import { SolarPlantService } from "../solarPlant";

export interface PredictSolarPlantService {
    getPredictionFromCurrentTime(owner: UserIdentifier, solarPlantInfo: SolarPlant): Promise<PredictResult>;
}

interface PredictResult {
    data: PredictPerTimeEntry[];
}

interface PredictPerTimeEntry {
    targetDatetime: Date;
    generation: number;
    amountOfSolarRadiation: number;
    temperature: number;
    windSpeed: number;
}

export class PredictSolarPlantServiceImpl implements PredictSolarPlantService {
    constructor(
        private readonly apiCall: SolarSimulationAPI,
        private readonly plantService: PlantService,
        private readonly solarPlantService: SolarPlantService,
    ) {}

    async getPredictionFromCurrentTime(owner: UserIdentifier): Promise<PredictResult> {
        const plantInfo = await this.plantService.getPlantInfo(owner);
        const solarPlantInfo = await this.solarPlantService.getSolarPlantInfo(owner);

        const { latitude, longitude } = plantInfo.location.coordinate;
        const { arrayType, meridianAngle, capacity, temperatureCoefficientPmpp, tiltAngle } = solarPlantInfo;

        const res = await this.apiCall.request({
            latitude,
            longitude,
            arrayType,
            capacity,
            meridianAngle,
            temperatureCoefficientPmpp,
            tiltAngle,
            currentDatetime: new Date(),
        });
        return { ...res };
    }
}
