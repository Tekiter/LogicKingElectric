import { defineEndpoint, defineErrors } from "../../util";
import { defineValidator, va } from "../../util/validation";

export interface Request {
    /** 정격 풍속 */
    ratedWindSpeed: number;

    /** 시동 풍속 */
    cutInWindSpeed: number;

    /** 종단 풍속 */
    cutOutWindSpeed: number;

    /** 정격 출력 */
    capacity: number;
}

const validator = defineValidator<Request>({
    ratedWindSpeed: va().number(),
    capacity: va().number(),
    cutInWindSpeed: va().number(),
    cutOutWindSpeed: va().number(),
});

export interface Response {
    success: boolean;
}

export const errors = defineErrors({});

/**
 * 현재 유저의 풍력 발전소 정보를 생성하거나 업데이트하는 Endpoint.
 *
 * 풍력 발전소 정보가 없으면 새로 생성하고, 이미 있다면 기존 값을 덮어씌우면서 업데이트한다.
 */
export const endpoint = defineEndpoint<Request, Response>({
    path: "/plant/wind",
    method: "POST",
    validator,
});
