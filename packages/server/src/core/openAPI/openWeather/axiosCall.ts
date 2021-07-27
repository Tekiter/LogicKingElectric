import axios, { AxiosInstance } from "axios";
import { RequestCache } from "../../cache";
import {
    AirPollutionResponse,
    CurrentAirPollutionRequest,
    CurrentWeatherRequest,
    OpenWeatherAPI,
    WeatherResponse,
} from "./types";

export class OpenWeatherAPIAxios implements OpenWeatherAPI {
    private api: AxiosInstance;

    private currentWeatherCache = new RequestCache<CurrentWeatherRequest, WeatherResponse>();
    private pollutionCache = new RequestCache<CurrentAirPollutionRequest, AirPollutionResponse>();

    constructor(private readonly apiKey: string) {
        this.api = axios.create();
    }

    async getCurrentWeather(request: CurrentWeatherRequest): Promise<WeatherResponse> {
        const cached = this.currentWeatherCache.get(request);
        if (cached !== undefined) {
            return cached;
        }

        const res = await this.api.get<WeatherResponse>("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                lat: request.lat,
                lon: request.lon,
                appid: this.apiKey,
                lang: "kr",
            },
        });
        this.currentWeatherCache.set(request, res.data);
        return res.data;
    }

    async getCurrentAirPollution(request: CurrentAirPollutionRequest): Promise<AirPollutionResponse> {
        const cached = this.pollutionCache.get(request);
        if (cached !== undefined) {
            return cached;
        }

        const res = await this.api.get<AirPollutionResponse>("https://api.openweathermap.org/data/2.5/air_pollution", {
            params: {
                lat: request.lat,
                lon: request.lon,
                appid: this.apiKey,
            },
        });
        this.pollutionCache.set(request, res.data);
        return res.data;
    }
}
