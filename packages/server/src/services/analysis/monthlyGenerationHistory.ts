import { getDate, getDaysInMonth } from "date-fns";
import {
    calculateErrorRate,
    calculateIncentive,
    GenerationActual,
    GenerationPrediction,
} from "../../entity/generationHistory";

export interface MonthlyGenerationHistory {
    year: number;
    month: number;
    records: DateRecord[];
    error: {
        average: number;
        deviation: number;
    };
}

interface DateRecord {
    date: number;
    actual?: number;
    prediction?: number;
    errorRate?: number;
    incentive?: number;
}

interface RawData {
    year: number;
    month: number;
    actualMonthly: GenerationActual[];
    predictionMonthly: GenerationPrediction[];
}

export function createMonthlyHistoryReport({
    year,
    month,
    actualMonthly,
    predictionMonthly,
}: RawData): MonthlyGenerationHistory {
    const daysInMonth = getDaysInMonth(new Date(year, month));

    const dateList = makeEmptyDateList(daysInMonth);

    actualMonthly.forEach(actual => {
        const date = getDate(actual.targetDate);
        dateList[date - 1].actual = actual.generation;
    });

    predictionMonthly.forEach(prediction => {
        const date = getDate(prediction.targetDate);
        dateList[date - 1].prediction = prediction.generation;
    });

    dateList.forEach(entry => {
        if (entry.actual !== undefined && entry.prediction !== undefined) {
            entry.errorRate = calculateErrorRate(entry.actual, entry.prediction);
            entry.incentive = calculateIncentive(entry.actual, entry.prediction);
        }
    });

    const error = {
        average: calcErrorAverage(dateList),
        deviation: calcErrorDeviation(dateList),
    };

    return {
        year,
        month,
        records: dateList,
        error,
    };
}

function makeEmptyDateList(size: number): DateRecord[] {
    const result: DateRecord[] = [...new Array(size)].map((_, index) => {
        return {
            date: index + 1,
        };
    });

    return result;
}

function calcErrorAverage(records: DateRecord[]): number {
    let sum = 0;
    let count = 0;
    for (const record of records) {
        if (record.errorRate !== undefined) {
            sum += record.errorRate;
            count++;
        }
    }

    if (count === 0) {
        return 0;
    }

    return sum / count;
}

function calcErrorDeviation(records: DateRecord[]): number {
    const average = calcErrorAverage(records);

    let sum = 0;
    let count = 0;
    for (const record of records) {
        if (record.errorRate !== undefined) {
            const diff = Math.abs(average - record.errorRate);
            sum += diff * diff;
            count++;
        }
    }

    if (count === 0) {
        return 0;
    }

    return sum / count;
}
