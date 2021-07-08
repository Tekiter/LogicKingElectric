type CheckerObject<T> = Record<keyof T, ValidateChecker>;

export interface ValidateChecker {
    check(rawData: unknown): boolean;
}

export interface Validator<T> {
    check(obj: Record<string, unknown>): boolean;
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
            for (const key in checkerObject) {
                const checker = checkerObject[key];

                if (checker.check(obj[key])) {
                    return false;
                }
            }
            return true;
        },
        field: { ...checkerObject },
    };
}
