import { defineEndpoint } from "../../util";

interface Response {
    year: number;
    month: number;
    records: DateRecord[];
    error: {
        average: number;
        deviation: number;
    };
}

interface DateRecord {
    date: number;
    actual?: number;
    prediction?: number;
    errorRate?: number;
    incentive?: number;
}

export const endpoint = defineEndpoint<null, Response>({
    method: "GET",
    path: "/analysis/monthlyHistoryReport",
});
