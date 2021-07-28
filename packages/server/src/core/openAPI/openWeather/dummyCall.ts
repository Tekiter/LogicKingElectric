import { getAirPollutionDummy, getCurrentWeatherDummy } from "./dummyData";
import {
    AirPollutionResponse,
    CurrentAirPollutionRequest,
    CurrentWeatherRequest,
    OpenWeatherAPI,
    WeatherResponse,
} from "./types";

export class OpenWeatherAPIDummy implements OpenWeatherAPI {
    async getCurrentWeather(request: CurrentWeatherRequest): Promise<WeatherResponse> {
        return getCurrentWeatherDummy();
    }

    async getCurrentAirPollution(request: CurrentAirPollutionRequest): Promise<AirPollutionResponse> {
        return getAirPollutionDummy();
    }
}
