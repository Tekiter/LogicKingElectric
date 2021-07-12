import { ValidateChecker } from "./validator";

interface Checker {
    (rawData: unknown): boolean;
}

class CheckerBase implements ValidateChecker {
    private checkers: Checker[] = [];

    protected setChecker(func: Checker) {
        this.checkers.push(func);
    }

    check(rawData: unknown): boolean {
        return this.checkers.every(checker => checker(rawData));
    }
}

class ChainChecker extends CheckerBase {
    string() {
        this.setChecker(data => typeof data === "string");
        return this;
    }

    stringRegex(exp: RegExp) {
        this.setChecker(data => typeof data === "string" && exp.test(data));
        return this;
    }

    number() {
        this.setChecker(data => typeof data === "number");
        return this;
    }

    in(values: unknown[]) {
        this.setChecker(data => values.includes(data));
        return this;
    }
}

export function getChecker(): ChainChecker {
    return new ChainChecker();
}
