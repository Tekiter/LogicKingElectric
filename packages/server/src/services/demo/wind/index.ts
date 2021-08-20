import { subDays } from "date-fns";
import { WIND_PREDICTED } from "./predicted";
import { WIND_SAMPLE } from "./sample";

const START_INDEX = 150;
const HOW_MANY_DAYS = 90;

type GenData = { target: Date; amount: number }[];

export function extractActualWindData(): GenData {
    let idx = START_INDEX;
    const result: GenData = [];

    let curDate = subDays(new Date(), 1);

    for (let i = 0; i < HOW_MANY_DAYS; i++) {
        result.push({
            target: curDate,
            amount: WIND_SAMPLE[idx][0],
        });

        curDate = subDays(curDate, 1);
        idx--;
    }
    return result;
}

export function extractPredictWindData(): GenData {
    let idx = START_INDEX;
    const result: GenData = [];

    for (const date of lastDays(subDays(new Date(), 1), HOW_MANY_DAYS)) {
        result.push({
            target: date,
            amount: WIND_PREDICTED[idx],
        });
        idx--;
    }
    return result;
}

type WeatherData = { target: Date; speed: number; pressure: number }[];

export function extractWeatherHistoryData(): WeatherData {
    let idx = START_INDEX;
    const result: WeatherData = [];

    let curDate = subDays(new Date(), 1);

    for (let i = 0; i < HOW_MANY_DAYS; i++) {
        result.push({
            target: curDate,
            speed: WIND_SAMPLE[idx][1],
            pressure: WIND_SAMPLE[idx][2],
        });

        curDate = subDays(curDate, 1);
        idx--;
    }
    return result;
}

function* lastDays(startDate: Date, days: number) {
    let curDate = startDate;

    for (let i = 0; i < days; i++) {
        yield curDate;

        curDate = subDays(curDate, 1);
    }
}
