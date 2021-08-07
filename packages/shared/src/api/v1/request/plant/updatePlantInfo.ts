import { defineEndpoint, defineErrors } from "../../util";
import { defineValidator, va } from "../../util/validation";

export interface Request {
    name: string;
    type: "solar" | "wind" | "hydro";

    /** 발전소 위치 위도 */
    latitude: number;

    /** 발전소 위치 경도 */
    longitude: number;

    /** 발전소 위치 이름 */
    locationName: string;
}

const validator = defineValidator<Request>({
    name: va().string(),
    latitude: va().number(),
    longitude: va().number(),
    locationName: va().string(),
    type: va().string().in(["solar", "wind"]),
});

export interface Response {
    success: boolean;
}

export const errors = defineErrors({});

/**
 * 현재 유저의 발전소 정보를 생성하거나 업데이트하는 Endpoint.
 *
 * 발전소 정보가 없으면 새로 생성하고, 이미 있다면 기존 값을 덮어씌우면서 업데이트한다.
 */
export const endpoint = defineEndpoint<Request, Response>({
    path: "/plant",
    method: "POST",
    validator,
});
