type CheckerObject<T> = Record<keyof T, ValidateChecker>;

export interface ValidateChecker {
    check(rawData: unknown): boolean;
}

export interface Validator<T> {
    check(obj: unknown): boolean;
    field: CheckerObject<T>;
}

export function getDummyValidator(): Validator<null> {
    return {
        check() {
            return true;
        },
        field: {},
    };
}

export function defineValidator<Req>(checkerObject: CheckerObject<Req>): Validator<Req> {
    return {
        check(obj) {
            if (!isRecord(obj)) return false;

            for (const key in checkerObject) {
                const checker = checkerObject[key];

                if (!(key in obj) || !checker.check(obj[key])) {
                    return false;
                }
            }
            return true;
        },
        field: { ...checkerObject },
    };
}

function isRecord(obj: unknown): obj is Record<string, unknown> {
    return typeof obj === "object" && obj !== null;
}
