import { GenerationActual, GenerationPrediction } from "../../../entity/generationHistory";
import { UserIdentifier } from "../../../entity/user";

export interface GenerationHistoryDataAccess {
    getMonthlyPrediction(user: UserIdentifier, amount?: number): Promise<GenerationPrediction[]>;
    getMonthlyActual(user: UserIdentifier, amount?: number): Promise<GenerationActual[]>;

    addPrediction(user: UserIdentifier, prediction: GenerationPrediction): Promise<void>;
    addActual(user: UserIdentifier, actual: GenerationActual): Promise<void>;
}
