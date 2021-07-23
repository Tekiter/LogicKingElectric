import { getDaysInMonth } from "date-fns";
import { GenerationActual, GenerationPrediction } from "../../../entity/generationHistory";
import { createMonthlyHistoryReport } from "../monthlyGenerationHistory";

const YEAR = 2021;
const MONTH = 7 - 1;

const predictionMock: GenerationPrediction[] = [
    { targetDate: new Date(YEAR, MONTH, 1), generation: 0 },
    { targetDate: new Date(YEAR, MONTH, 2), generation: 110 },
    { targetDate: new Date(YEAR, MONTH, 4), generation: 330 },
    { targetDate: new Date(YEAR, MONTH, 10), generation: 10 },
];
const actualMock: GenerationActual[] = [
    { targetDate: new Date(YEAR, MONTH, 1), generation: 0 },
    { targetDate: new Date(YEAR, MONTH, 2), generation: 100 },
    { targetDate: new Date(YEAR, MONTH, 4), generation: 300 },
];

describe("MonthlyGenerationHistory", () => {
    test("count of days of month is valid", () => {
        for (let year = 1996; year <= 2008; year += 2) {
            for (let month = 0; month < 12; month++) {
                const report = createMonthlyHistoryReport({
                    year,
                    month,
                    actualMonthly: [],
                    predictionMonthly: [],
                });

                expect(report.year).toBe(year);
                expect(report.month).toBe(month);

                expect(report.records).toHaveLength(getDaysInMonth(new Date(year, month)));
            }
        }
    });

    test("undefined value of unset actual", () => {
        const report = createMonthlyHistoryReport({
            year: YEAR,
            month: MONTH,
            actualMonthly: [],
            predictionMonthly: [],
        });

        for (const record of report.records) {
            expect(record.actual).toBe(undefined);
        }
    });

    test("undefined value of unset prediction", () => {
        const report = createMonthlyHistoryReport({
            year: YEAR,
            month: MONTH,
            actualMonthly: [],
            predictionMonthly: [],
        });

        for (const record of report.records) {
            expect(record.prediction).toBe(undefined);
        }
    });

    test("convert actual generation correctly", () => {
        const report = createMonthlyHistoryReport({
            year: YEAR,
            month: MONTH,
            actualMonthly: actualMock,
            predictionMonthly: [],
        });

        expect(report.records[0].actual).toBe(actualMock[0].generation);
        expect(report.records[0].date).toBe(1);
        expect(report.records[2].actual).toBe(undefined);
        expect(report.records[3].actual).toBe(actualMock[2].generation);
    });

    test("convert prediction generation correctly", () => {
        const report = createMonthlyHistoryReport({
            year: YEAR,
            month: MONTH,
            actualMonthly: [],
            predictionMonthly: predictionMock,
        });

        expect(report.records[0].prediction).toBe(predictionMock[0].generation);
        expect(report.records[0].date).toBe(1);
        expect(report.records[2].prediction).toBe(undefined);
        expect(report.records[3].prediction).toBe(predictionMock[2].generation);
    });

    test("error rate", () => {
        const report = createMonthlyHistoryReport({
            year: YEAR,
            month: MONTH,
            actualMonthly: actualMock,
            predictionMonthly: predictionMock,
        });

        expect(report.records[0].errorRate).not.toBe(undefined);
        expect(typeof report.records[0].errorRate).toBe("number");
        expect(report.records[10 - 1].errorRate).toBe(undefined);
    });
});
