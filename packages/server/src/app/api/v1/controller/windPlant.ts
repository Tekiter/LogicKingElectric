import { getWindPlantInfo, updateWindPlantInfo, predictWindPlant } from "@electric/shared/dist/api/v1/request";
import { APIError, createAuthController } from "../util";

export const getWindPlantInfoController = createAuthController(getWindPlantInfo.endpoint, async (req, services) => {
    const ownerHasWindPlant = await services.windPlant.ownerHasWindPlantInfo(req.user);
    if (!ownerHasWindPlant) {
        throw new APIError(getWindPlantInfo.errors.hasNoWindPlantInfo);
    }

    const plant = await services.windPlant.getWindPlantInfo(req.user);
    return {
        capacity: plant.capacity,
        cutInWindSpeed: plant.cutInWindSpeed,
        cutOutWindSpeed: plant.cutOutWindSpeed,
        ratedWindSpeed: plant.ratedWindSpeed,
    };
});

export const updateWindPlantInfoController = createAuthController(
    updateWindPlantInfo.endpoint,
    async (req, services) => {
        const { data } = req;
        await services.windPlant.updateOrCreateWindPlant(req.user, {
            ...data,
        });

        return { success: true };
    },
);

export const predictWindPlantController = createAuthController(predictWindPlant.endpoint, async (req, services) => {
    const hasPlantInfo = await services.plant.ownerHasPlant(req.user);
    if (!hasPlantInfo) {
        throw new APIError(predictWindPlant.errors.hasNoPlantInfo);
    }
    const plantInfo = await services.plant.getPlantInfo(req.user);
    if (plantInfo.type !== "wind") {
        throw new APIError(predictWindPlant.errors.plantIsNotWindError);
    }
    const hasWindPlantInfo = await services.windPlant.ownerHasWindPlantInfo(req.user);
    if (!hasWindPlantInfo) {
        throw new APIError(predictWindPlant.errors.hasNoWindPlantInfo);
    }

    const prediction = await services.predictWindPlant.getPredictionFromLastHistory(req.user);

    if (!prediction.isPredictable) {
        return {
            isPredictable: false,
        };
    }

    return {
        isPredictable: true,
        predicted: prediction.generation,
    };
});
