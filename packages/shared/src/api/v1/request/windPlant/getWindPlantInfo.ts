import { defineEndpoint, defineError, defineErrors } from "../../util";

export interface Response {
    /** 정격 풍속 */
    ratedWindSpeed: number;

    /** 시동 풍속 */
    cutInWindSpeed: number;

    /** 종단 풍속 */
    cutOutWindSpeed: number;

    /** 정격 출력 */
    capacity: number;
}

export const errors = defineErrors({
    hasNoWindPlantInfo: defineError({
        key: "HasNoWindPlantInfo",
        message: "There is no wind plant info.",
        status: 404,
    }),
});

/**
 * 현재 유저의 풍력 발전소 정보를 가져오는 Endpoint.
 *
 */
export const endpoint = defineEndpoint<null, Response>({
    method: "GET",
    path: "/plant/wind",
});
