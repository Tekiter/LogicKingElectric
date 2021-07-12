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

export const endpoint = defineEndpoint<null, Response>({
    path: "/plant",
    method: "GET",
});
