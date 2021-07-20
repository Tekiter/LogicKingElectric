import { compareAsc, isEqual, startOfMonth } from "date-fns";
import { GenerationActual, GenerationPrediction } from "../../../entity/generationHistory";
import { UserIdentifier } from "../../../entity/user";
import { GenerationHistoryDataAccess } from "../types/generationHistory";

const predictionStore = new Map<string, DateStore<GenerationPrediction>>();
const actualStore = new Map<string, DateStore<GenerationActual>>();

export class GenerationHistoryMemoryDataAccess implements GenerationHistoryDataAccess {
    async getMonthlyPrediction(user: UserIdentifier): Promise<GenerationPrediction[]> {
        const userStore = predictionStore.get(user.username);
        if (userStore === undefined) {
            return [];
        }
        const result = userStore.getListOfThisMonth();
        return result;
    }

    async addPrediction(user: UserIdentifier, prediction: GenerationPrediction): Promise<void> {
        let userStore = predictionStore.get(user.username);
        if (userStore === undefined) {
            userStore = new DateStore();
            predictionStore.set(user.username, userStore);
        }

        userStore.setOrUpdate(prediction);
    }

    async getMonthlyActual(user: UserIdentifier): Promise<GenerationActual[]> {
        const userStore = actualStore.get(user.username);
        if (userStore === undefined) {
            return [];
        }
        const result = userStore.getListOfThisMonth();
        return result;
    }

    async addActual(user: UserIdentifier, actual: GenerationActual): Promise<void> {
        let userStore = actualStore.get(user.username);
        if (userStore === undefined) {
            userStore = new DateStore();
            actualStore.set(user.username, userStore);
        }

        userStore.setOrUpdate(actual);
    }

    static clear(): void {
        predictionStore.clear();
        actualStore.clear();
    }
}

class DateStore<T extends { targetDate: Date }> {
    private list: T[];

    constructor() {
        this.list = [];
    }

    getListOfThisMonth() {
        const result: T[] = [];

        const thisMonthStart = startOfMonth(Date.now());

        for (const entry of this.list) {
            const isThisMonth = compareAsc(thisMonthStart, entry.targetDate) <= 0;
            if (isThisMonth) {
                result.push(entry);
            }
        }

        return result;
    }

    setOrUpdate(entry: T): void {
        const existingIndex = this.list.findIndex(target => isEqual(entry.targetDate, target.targetDate));
        if (existingIndex !== -1) {
            this.list.splice(existingIndex, 1);
        }
        this.list.push(entry);
    }
}
