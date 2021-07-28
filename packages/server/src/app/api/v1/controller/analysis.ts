import { monthlyHistoryReport } from "@electric/shared/src/api/v1/request";
import { createAuthController } from "../util";

export const monthlyHistoryReportController = createAuthController(
    monthlyHistoryReport.endpoint,
    async (req, services) => {
        const report = await services.analysisService.createMonthlyGenerationHistory(req.user);
        return {
            year: report.year,
            month: report.month,
            records: report.records,
            error: {
                average: report.error.average,
                deviation: report.error.deviation,
            },
        };
    },
);
