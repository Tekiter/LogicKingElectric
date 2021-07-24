import { getMonth, getYear } from "date-fns";
import { DataAccess } from "../../core/dataAccess/types";
import { UserIdentifier } from "../../entity/user";
import { createMonthlyHistoryReport, MonthlyGenerationHistory } from "./monthlyGenerationHistory";

export interface AnalysisService {
    createMonthlyGenerationHistory(user: UserIdentifier): Promise<MonthlyGenerationHistory>;
}

export class AnalysisServiceImpl implements AnalysisService {
    constructor(private readonly dataAccess: DataAccess<"generationHistory">) {}

    async createMonthlyGenerationHistory(user: UserIdentifier): Promise<MonthlyGenerationHistory> {
        const year = getYear(new Date());
        const month = getMonth(new Date()) + 1;
        const actualMonthly = await this.dataAccess.generationHistory.getMonthlyActual(user);
        const predictionMonthly = await this.dataAccess.generationHistory.getMonthlyPrediction(user);

        const report = createMonthlyHistoryReport({ year, month, actualMonthly, predictionMonthly });

        return report;
    }
}
