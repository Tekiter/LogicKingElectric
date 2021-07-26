import axios, { AxiosInstance } from "axios";
import {
    AirPollutionResponse,
    CurrentAirPollutionRequest,
    CurrentWeatherRequest,
    OpenWeatherAPI,
    WeatherResponse,
} from "./types";

export class OpenWeatherAPIAxios implements OpenWeatherAPI {
    api: AxiosInstance;

    constructor(private readonly apiKey: string) {
        this.api = axios.create();
    }

    async getCurrentWeather(request: CurrentWeatherRequest): Promise<WeatherResponse> {
        const res = await this.api.get<WeatherResponse>("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                lat: request.lat,
                lon: request.lon,
                appid: this.apiKey,
                lang: "kr",
            },
        });
        return res.data;
    }

    async getCurrentAirPollution(request: CurrentAirPollutionRequest): Promise<AirPollutionResponse> {
        const res = await this.api.get<AirPollutionResponse>("https://api.openweathermap.org/data/2.5/air_pollution", {
            params: {
                lat: request.lat,
                lon: request.lon,
                appid: this.apiKey,
            },
        });
        return res.data;
    }
}
