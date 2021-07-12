import { defineEndpoint, defineError, defineErrors } from "../../util";

export interface Response {
    name: string;
    type: "solar" | "wind";

    latitude: number;
    longitude: number;
    locationName: string;
}

export const errors = defineErrors({
    hasNoPlantError: defineError({ key: "hasNoPlantError", status: 404, message: "User has no plant information." }),
});

/**
 * 현재 로그인된 유저의 발전소 정보를 얻어오는 Endpoint.
 *
 * 현재 발전소 정보가 없으면 hasNoPlantError 가 던져진다. 이경우 updatePlantInfo 엔드포인트로 발전소 정보를 등록해 주면 된다.
 */
export const endpoint = defineEndpoint<null, Response>({
    path: "/plant",
    method: "GET",
});
