import { defineEndpoint, defineError, defineErrors } from "../../util";

interface Response {
    data: Entry[];
}

interface Entry {
    /** 예측 대상 시간 (ISO 포맷 시간) */
    targetDatetime: string;

    /** 예상 발전량 */
    generation: number;

    /** 예상 태양광량 */
    amountOfSolarRadiation: number;

    /** 예상 온도 */
    temperature: number;

    /** 예상 풍속 */
    windSpeed: number;
}

export const errors = defineErrors({
    hasNoSolarPlantInfo: defineError({
        key: "HasNoSolarPlantInfo",
        status: 403,
        message: "There is no solar plant info.",
    }),
    hasNoPlantInfo: defineError({
        key: "HasNoPlantInfo",
        status: 403,
        message: "There is no plant info.",
    }),
    plantIsNotSolarError: defineError({
        key: "PlantIsNotSolar",
        status: 403,
        message: "Plant type is not solar.",
    }),
});

/**
 * 이틀간의 태양광 발전 예측치를 가져오는 Endpoint.
 *
 * plant 정보와 solarPlant 정보가 모두 있어야 작동한다.
 */
export const endpoint = defineEndpoint<null, Response>({
    method: "GET",
    path: "/plant/solar/predict",
});
