import { compareAsc, isEqual, startOfMonth, subMonths } from "date-fns";

export class DateStore<T extends { targetDate: Date }> {
    private list: T[];

    constructor() {
        this.list = [];
    }

    getListOfThisMonth(): T[] {
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

    getListOfLastMonths(amount: number): T[] {
        const result: T[] = [];

        const thisMonthStart = startOfMonth(subMonths(Date.now(), amount - 1));

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
