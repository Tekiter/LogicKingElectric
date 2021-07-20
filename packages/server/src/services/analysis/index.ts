import { getDate, getMonth, getYear } from "date-fns";
import { DataAccess } from "../../core/dataAccess/types";
import { UserIdentifier } from "../../entity/user";

export interface AnalysisService {
    createMonthlyGenerationHistory(user: UserIdentifier): Promise<MonthlyGenerationHistory>;
}

export class AnalysisServiceImpl implements AnalysisService {
    constructor(private readonly dataAccess: DataAccess<"generationHistory">) {}

    async createMonthlyGenerationHistory(user: UserIdentifier): Promise<MonthlyGenerationHistory> {
        const actualMonthly = await this.dataAccess.generationHistory.getMonthlyActual(user);
        const predictionMonthly = await this.dataAccess.generationHistory.getMonthlyPrediction(user);

        const actual = actualMonthly.map(entry => {
            return {
                date: getDate(entry.targetDate),
                amount: entry.generation,
            };
        });

        const prediction = predictionMonthly.map(entry => {
            return {
                date: getDate(entry.targetDate),
                amount: entry.generation,
            };
        });

        const year = getYear(Date.now());
        const month = getMonth(Date.now());

        return {
            year,
            month,
            actual,
            prediction,
        };
    }
}

interface MonthlyGenerationHistory {
    year: number;
    month: number;

    actual: AmountRecord[];
    prediction: AmountRecord[];
}

type AmountRecord = { date: number; amount: number };
