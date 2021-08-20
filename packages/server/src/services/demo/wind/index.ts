import { subDays } from "date-fns";
import { WIND_SAMPLE } from "./sample";

const START_INDEX = 150;

type GenData = { target: Date; amount: number }[];

export function extractActualWindData(): GenData {
    let idx = START_INDEX;
    const result: GenData = [];

    let curDate = subDays(new Date(), 1);

    for (let i = 0; i < 90; i++) {
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
    return extractActualWindData();
}

type WeatherData = { target: Date; speed: number; pressure: number }[];

export function extractWeatherHistoryData(): WeatherData {
    let idx = START_INDEX;
    const result: WeatherData = [];

    let curDate = subDays(new Date(), 1);

    for (let i = 0; i < 90; i++) {
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
