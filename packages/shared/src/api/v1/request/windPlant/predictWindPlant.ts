import { defineEndpoint, defineError, defineErrors } from "../../util";

interface Response {
    isPredictable: boolean;
    predicted?: number;
}

export const errors = defineErrors({
    hasNoWindPlantInfo: defineError({
        key: "HasNoWindPlantInfo",
        message: "There is no wind plant info.",
        status: 404,
    }),
    hasNoPlantInfo: defineError({
        key: "HasNoPlantInfo",
        status: 403,
        message: "There is no plant info.",
    }),
    plantIsNotWindError: defineError({
        key: "PlantIsNotWind",
        status: 403,
        message: "Plant type is not wind.",
    }),
});

/**
 * 풍력 발전 예측치를 가져오는 Endpoint.
 *
 * plant 정보와 windPlant 정보가 모두 있어야 작동한다.
 */
export const endpoint = defineEndpoint<null, Response>({
    method: "GET",
    path: "/plant/wind/predict",
});
