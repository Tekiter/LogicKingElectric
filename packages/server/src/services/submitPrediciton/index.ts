import { startOfDay } from "date-fns";
import { DataAccess } from "../../core/dataAccess/types";
import { UserIdentifier } from "../../entity/user";

export interface SubmitPredictionService {
    submitPredicted(user: UserIdentifier, predicted: Predicted): Promise<SubmitResult>;
}

interface Predicted {
    date: Date;
    amount: number;
}

interface SubmitResult {
    success: boolean;
}

export class SubmitPredictionServiceImpl implements SubmitPredictionService {
    constructor(private readonly dataAccess: DataAccess<"generationHistory">) {}

    async submitPredicted(user: UserIdentifier, predicted: Predicted): Promise<SubmitResult> {
        await this.dataAccess.generationHistory.addPrediction(user, {
            targetDate: startOfDay(predicted.date),
            generation: predicted.amount,
        });

        return { success: true };
    }
}
