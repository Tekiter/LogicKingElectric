import { submitActual, submitPrediction } from "@electric/shared/dist/api/v1/request";
import { createAuthController } from "../util";

export const submitActualController = createAuthController(submitActual.endpoint, async (req, services) => {
    const { amount, targetDate } = req.data;
    await services.submitActual.submitActual(req.user, { targetDate: new Date(targetDate), amount });
});

export const submitPredictionController = createAuthController(submitPrediction.endpoint, async (req, services) => {
    const { amount, targetDate } = req.data;
    await services.submitPrediction.submitPredicted(req.user, { date: new Date(targetDate), amount });
});
