import { defineEndpoint, defineErrors } from "../../util";
import { defineValidator, va } from "../../util/validation";

export interface Request {
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

const validator = defineValidator<Request>({
    arrayType: va().string().in(["fixed", "track"]),
    capacity: va().number(),
    meridianAngle: va().number(),
    temperatureCoefficientPmpp: va().number(),
    tiltAngle: va().number(),
});

export interface Response {
    success: boolean;
}

export const errors = defineErrors({});

/**
 * 현재 유저의 태양광 발전소 정보를 생성하거나 업데이트하는 Endpoint.
 *
 * 태양광 발전소 정보가 없으면 새로 생성하고, 이미 있다면 기존 값을 덮어씌우면서 업데이트한다.
 */
export const endpoint = defineEndpoint<Request, Response>({
    path: "/plant/solar",
    method: "POST",
    validator,
});
