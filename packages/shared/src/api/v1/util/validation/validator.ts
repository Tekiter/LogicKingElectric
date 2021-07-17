type CheckerObject<T> = Record<keyof T, ValidateChecker>;

export interface ValidateChecker {
    check(rawData: unknown): boolean;
}

export interface Validator<T> {
    check(obj: unknown): [true, undefined] | [false, ErrorReason];
    field: CheckerObject<T>;
}
type ErrorReason = {
    notValidObject?: boolean;
    errorFields: string[];
};

export function getDummyValidator(): Validator<null> {
    return {
        check() {
            return [true, undefined];
        },
        field: {},
    };
}

export function defineValidator<Req>(checkerObject: CheckerObject<Req>): Validator<Req> {
    return {
        check(obj) {
            if (!isRecord(obj)) return [false, { notValidObject: true, errorFields: [] }];

            const errorFields: string[] = [];

            for (const key in checkerObject) {
                const checker = checkerObject[key];

                if (!(key in obj) || !checker.check(obj[key])) {
                    errorFields.push(key);
                }
            }
            if (errorFields.length > 0) {
                return [false, { errorFields }];
            }

            return [true, undefined];
        },
        field: { ...checkerObject },
    };
}

function isRecord(obj: unknown): obj is Record<string, unknown> {
    return typeof obj === "object" && obj !== null;
}
