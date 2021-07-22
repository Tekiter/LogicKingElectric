import { GenerationActual, GenerationPrediction } from "../../../entity/generationHistory";
import { UserIdentifier } from "../../../entity/user";

export interface GenerationHistoryDataAccess {
    getMonthlyPrediction(user: UserIdentifier): Promise<GenerationPrediction[]>;
    getMonthlyActual(user: UserIdentifier): Promise<GenerationActual[]>;

    addPrediction(user: UserIdentifier, prediction: GenerationPrediction): Promise<void>;
    addActual(user: UserIdentifier, actual: GenerationActual): Promise<void>;
}
