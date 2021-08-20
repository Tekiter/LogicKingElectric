import { getSolarPlantInfo, predictSolarPlant, updateSolarPlantInfo } from "@electric/shared/dist/api/v1/request";
import { formatISO } from "date-fns";
import { APIError, createAuthController } from "../util";

export const getSolarPlantInfoController = createAuthController(getSolarPlantInfo.endpoint, async (req, services) => {
    const ownerHasSolarPlant = await services.solarPlant.ownerHasSolarPlantInfo(req.user);
    if (!ownerHasSolarPlant) {
        throw new APIError(getSolarPlantInfo.errors.hasNoSolarPlantInfo);
    }

    const plant = await services.solarPlant.getSolarPlantInfo(req.user);
    return {
        arrayType: plant.arrayType,
        capacity: plant.capacity,
        meridianAngle: plant.meridianAngle,
        temperatureCoefficientPmpp: plant.temperatureCoefficientPmpp,
        tiltAngle: plant.tiltAngle,
    };
});

export const updateSolarPlantInfoController = createAuthController(
    updateSolarPlantInfo.endpoint,
    async (req, services) => {
        const { data } = req;
        await services.solarPlant.updateOrCreateSolarPlant(req.user, {
            arrayType: data.arrayType,
            capacity: data.capacity,
            meridianAngle: data.meridianAngle,
            temperatureCoefficientPmpp: data.temperatureCoefficientPmpp,
            tiltAngle: data.tiltAngle,
        });

        return { success: true };
    },
);

export const predictSolarPlantController = createAuthController(predictSolarPlant.endpoint, async (req, services) => {
    const hasPlantInfo = await services.plant.ownerHasPlant(req.user);
    if (!hasPlantInfo) {
        throw new APIError(predictSolarPlant.errors.hasNoPlantInfo);
    }
    const plantInfo = await services.plant.getPlantInfo(req.user);
    if (plantInfo.type !== "solar") {
        throw new APIError(predictSolarPlant.errors.plantIsNotSolarError);
    }
    const hasSolarPlantInfo = await services.solarPlant.ownerHasSolarPlantInfo(req.user);
    if (!hasSolarPlantInfo) {
        throw new APIError(predictSolarPlant.errors.hasNoSolarPlantInfo);
    }

    const solarPlantInfo = await services.solarPlant.getSolarPlantInfo(req.user);
    const prediction = await services.predictSolarPlant.getPredictionFromCurrentTime(req.user, solarPlantInfo);

    return {
        data: prediction.data.map(entry => ({
            targetDatetime: formatISO(entry.targetDatetime),
            generation: entry.generation,
            amountOfSolarRadiation: entry.amountOfSolarRadiation,
            temperature: entry.temperature,
            windSpeed: entry.windSpeed,
        })),
    };
});
