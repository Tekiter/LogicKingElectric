import { commonErrors, CommonErrors } from "./commonErrors";
import { ErrorObject } from "./defineError";

export function defineErrors<ErrorCollection extends Record<string, ErrorObject<unknown>>>(
    obj: ErrorCollection,
): Readonly<ErrorCollection & CommonErrors> {
    return Object.freeze({ ...obj, ...commonErrors });
}
