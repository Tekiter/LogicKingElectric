import { compareAsc, compareDesc } from "date-fns";
import { DataAccess } from "../../core/dataAccess/types";
import { WindPredictionAPI } from "../../core/ml/windPrediction/types";
import { UserIdentifier } from "../../entity/user";
import { WeatherService } from "../weather";

export interface PredictWindPlantService {
    getPredictionFromLastHistory(owner: UserIdentifier): Promise<PredictionResult>;
}

interface PredictionResult {
    isPredictable: boolean;
    generation?: number;
}

export class PredictWindPlantServiceImpl implements PredictWindPlantService {
    constructor(
        private readonly predictAPI: WindPredictionAPI,
        private readonly dataAccess: DataAccess,
        private readonly weatherService: WeatherService,
    ) {}

    async getPredictionFromLastHistory(owner: UserIdentifier): Promise<PredictionResult> {
        const actualMonthly = await this.last20GenerationHistory(owner);

        if (actualMonthly.length !== 20) {
            return { isPredictable: false };
        }

        const weatherHistory = await this.last20WeatherHistory(owner);
        if (weatherHistory.length === 20) {
            const records = actualMonthly.map((generation, idx) => {
                return {
                    generation,
                    speed: weatherHistory[idx][0],
                    pressure: weatherHistory[idx][1],
                };
            });
            const result = await this.predictAPI.getPredictionWithWeather(records);
            return {
                isPredictable: true,
                generation: result.predicted,
            };
        } else {
            const result = await this.predictAPI.getPrediction(actualMonthly);
            return {
                isPredictable: true,
                generation: result.predicted,
            };
        }
    }

    private async last20GenerationHistory(owner: UserIdentifier): Promise<number[]> {
        const actualMonthlyRaw = await this.dataAccess.generationHistory.getMonthlyActual(owner, 2);

        actualMonthlyRaw.sort((a, b) => {
            return compareDesc(a.generation, b.generation);
        });

        const actualMonthly = actualMonthlyRaw
            .slice(0, 20)
            .map(item => item.generation)
            .reverse();
        return actualMonthly;
    }

    private async last20WeatherHistory(owner: UserIdentifier): Promise<[speed: number, pressure: number][]> {
        const history = await this.weatherService.getHistoryOfMonths(owner, 2);

        history.records.sort((a, b) => compareAsc(a.targetDate, b.targetDate));
        const parts = history.records
            .slice(0, 20)
            .map(item => [item.speed, item.pressure] as [number, number])
            .reverse();

        return parts;
    }
}
