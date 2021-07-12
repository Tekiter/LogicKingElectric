import { defineEndpoint, defineErrors } from "../../util";
import { defineValidator, va } from "../../util/validation";

export interface Request {
    name: string;
    type: "solar" | "wind";
    latitude: number;
    longitude: number;
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

export const endpoint = defineEndpoint<Request, Response>({
    path: "/plant",
    method: "POST",
    validator,
});
