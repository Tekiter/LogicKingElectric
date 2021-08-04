import { defineEndpoint, defineError, defineErrors } from "../../util";

export interface Response {
    /** 태양광 발전기 타입 (고정형, 추적형) */
    arrayType: SolarPlantArrayType;

    /** 발전용량 */
    capacity: number;

    /** 방위각 */
    meridianAngle: number;

    /** 온도계수 */
    temperatureCoefficientPmpp: number;

    /** 각도 */
    tiltAngle: number;
}
type SolarPlantArrayType = "fixed" | "track";

export const errors = defineErrors({
    hasNoSolarPlantInfo: defineError({
        key: "HasNoSolarPlantInfo",
        message: "There is no solar plant info.",
        status: 404,
    }),
});

/**
 * 현재 유저의 태양광 발전소 정보를 가져오는 Endpoint.
 *
 */
export const endpoint = defineEndpoint<null, Response>({
    method: "GET",
    path: "/plant/solar",
});
