import { AirPollutionResponse, WeatherResponse } from "./types";

const weatherDummy: WeatherResponse[] = [
    {
        coord: { lon: 126.9778, lat: 37.5683 },
        weather: [{ id: 800, main: "Clear", description: "맑음", icon: "01n" }],
        base: "stations",
        main: { temp: 301.26, feels_like: 302.88, temp_min: 299.86, temp_max: 302.57, pressure: 1004, humidity: 61 },
        visibility: 10000,
        wind: { speed: 2.06, deg: 360 },
        clouds: { all: 0 },
        dt: 1627305543,
        sys: { type: 1, id: 8105, country: "KR", sunrise: 1627245043, sunset: 1627296373 },
        timezone: 32400,
        id: 1835848,
        name: "Seoul",
        cod: 200,
    },
    {
        coord: { lon: 126.9778, lat: 37.5683 },
        weather: [{ id: 800, main: "Clear", description: "맑음", icon: "01n" }],
        base: "stations",
        main: { temp: 301.49, feels_like: 303.24, temp_min: 299.86, temp_max: 302.57, pressure: 1004, humidity: 61 },
        visibility: 10000,
        wind: { speed: 2.06, deg: 360 },
        clouds: { all: 0 },
        dt: 1627306219,
        sys: { type: 1, id: 8105, country: "KR", sunrise: 1627245043, sunset: 1627296373 },
        timezone: 32400,
        id: 1835848,
        name: "Seoul",
        cod: 200,
    },
];

const airPollutionDummy: AirPollutionResponse[] = [
    {
        coord: { lon: 126.801, lat: 37.486 },
        list: [
            {
                main: { aqi: 3 },
                components: {
                    co: 947.95,
                    no: 123.38,
                    no2: 104.19,
                    o3: 0,
                    so2: 23.37,
                    pm2_5: 24.1,
                    pm10: 30.06,
                    nh3: 16.21,
                },
                dt: 1627308000,
            },
        ],
    },
];

export function getCurrentWeatherDummy(): WeatherResponse {
    return randomPick(weatherDummy);
}

export function getAirPollutionDummy(): AirPollutionResponse {
    return randomPick(airPollutionDummy);
}

function randomPick<T>(arr: T[]): T {
    const size = arr.length;
    const idx = Math.floor(Math.random() * size);
    return arr[idx];
}
