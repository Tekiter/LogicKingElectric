import { commonErrors, CommonErrors } from "./commonErrors";

export function defineErrors<ErrorCollection>(obj: ErrorCollection): Readonly<ErrorCollection & CommonErrors> {
    return Object.freeze({ ...obj, ...commonErrors });
}
