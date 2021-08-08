import { compareDesc } from "date-fns";
import { DataAccess } from "../../core/dataAccess/types";
import { WindPredictionAPI } from "../../core/ml/windPrediction/types";
import { UserIdentifier } from "../../entity/user";

export interface PredictWindPlantService {
    getPredictionFromLastHistory(owner: UserIdentifier): Promise<PredictionResult>;
}

interface PredictionResult {
    isPredictable: boolean;
    generation?: number;
}

export class PredictWindPlantServiceImpl implements PredictWindPlantService {
    constructor(private readonly predictAPI: WindPredictionAPI, private readonly dataAccess: DataAccess) {}

    async getPredictionFromLastHistory(owner: UserIdentifier): Promise<PredictionResult> {
        const actualMonthlyRaw = await this.dataAccess.generationHistory.getMonthlyActual(owner, 2);

        actualMonthlyRaw.sort((a, b) => {
            return compareDesc(a.generation, b.generation);
        });

        const actualMonthly = actualMonthlyRaw.slice(0, 20).map(item => item.generation);

        if (actualMonthly.length !== 20) {
            return {
                isPredictable: false,
            };
        }

        const result = await this.predictAPI.getPrediction(actualMonthly);
        return {
            isPredictable: true,
            generation: result.predicted,
        };
    }
}
