import { getPlantInfo, updatePlantInfo } from "@electric/shared/src/api/v1/request";
import { APIError, createAuthController } from "../util";

export const getPlantInfoController = createAuthController(getPlantInfo.endpoint, async (req, services) => {
    const ownerHasPlant = await services.plant.ownerHasPlant(req.user);
    if (!ownerHasPlant) {
        throw new APIError(getPlantInfo.errors.hasNoPlantError);
    }

    const plant = await services.plant.getPlantInfo(req.user);

    return {
        name: plant.name,
        type: plant.type,
        latitude: plant.location.coordinate.laditude,
        longitude: plant.location.coordinate.longitude,
        locationName: plant.location.name,
    };
});

export const updatePlantInfoController = createAuthController(updatePlantInfo.endpoint, async (req, services) => {
    const { data } = req;
    await services.plant.updateOrCreatePlant(req.user, {
        name: data.name,
        type: data.type,
        location: {
            name: data.locationName,
            coordinate: {
                laditude: data.latitude,
                longitude: data.longitude,
            },
        },
    });

    return { success: true };
});
