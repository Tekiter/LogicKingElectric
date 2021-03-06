import { subDays } from "date-fns";
import { UserInfo } from "./types";
import { extractActualWindData, extractPredictWindData, extractWeatherHistoryData } from "./wind";

export const USER_ANDREW: UserInfo = (function () {
    const actualGeneration = generateRandomData(3000, 6000);
    const predictionGeneration = generatePredictedData(actualGeneration);

    return {
        username: "andrew123",
        password: "helloworld",
        plant: {
            name: "우리집태양광발전소",
            type: "solar",
            location: {
                name: "경기도 부천시 XX로 XX",
                coordinate: {
                    latitude: 37.486,
                    longitude: 126.801,
                },
            },
        },
        solarPlant: {
            arrayType: "fixed",
            temperatureCoefficientPmpp: -0.415,
            meridianAngle: 180,
            tiltAngle: 30,
            capacity: 1000,
        },
        actualGeneration,
        predictionGeneration,
    } as UserInfo;
})();

export const USER_HELLOWORLD: UserInfo = {
    username: "helloworld",
    password: "helloworld",
    plant: {
        name: "북서풍력발전소",
        type: "wind",
        location: {
            name: "경기도 용인시 수지구 XX로 XX",
            coordinate: {
                latitude: 37.331828,
                longitude: 127.080357,
            },
        },
    },
    windPlant: {
        capacity: 20000,
        cutInWindSpeed: 3,
        cutOutWindSpeed: 25,
        ratedWindSpeed: 13,
    },
    actualGeneration: extractActualWindData(),
    predictionGeneration: extractPredictWindData(),
    weather: extractWeatherHistoryData(),
};

type GenData = { target: Date; amount: number }[];
function generateRandomData(min: number, max: number): GenData {
    const result: GenData = [];

    let curDate = subDays(new Date(), 1);

    for (let i = 0; i < 60; i++) {
        result.push({
            target: curDate,
            amount: randint(min, max),
        });

        curDate = subDays(curDate, 1);
    }

    return result;
}

function randint(a: number, b: number) {
    return Math.floor(Math.random() * (b - a) + a);
}

function generatePredictedData(actual: GenData): GenData {
    function randPercent(base: number, percent: number) {
        const maxd = (base * percent) / 100;
        return randint(base - maxd, base + maxd);
    }

    return actual.map(({ target, amount }) => {
        return {
            target,
            amount: randPercent(amount, 20),
        };
    });
}
