import { DataAccess } from "../../core/dataAccess/types";
import { UserIdentifier } from "../../entity/user";

export interface SubmitActualService {
    submitActual(user: UserIdentifier, actual: ActualData): Promise<SubmitResult>;
}

interface ActualData {
    targetDate: Date;
    amount: number;
}

interface SubmitResult {
    success: boolean;
}

export class SubmitActualServiceImpl implements SubmitActualService {
    constructor(private readonly dataAccess: DataAccess) {}

    async submitActual(user: UserIdentifier, actual: ActualData): Promise<SubmitResult> {
        await this.dataAccess.generationHistory.addActual(user, {
            targetDate: actual.targetDate,
            generation: actual.amount,
        });

        return { success: true };
    }
}
