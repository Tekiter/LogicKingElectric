import { OpenWeatherAPI } from "../../core/openAPI/openWeather";
import { UserIdentifier } from "../../entity/user";
import { PlantService } from "../plant";

export interface WeatherService {
    getCurrentWeather(user: UserIdentifier): Promise<DailyWeatherInfo>;
}

export interface DailyWeatherInfo {
    temp: number;
    wind: {
        speed: number;
        degree: number;
    };
    cloud: number;
    weather: {
        key: string;
        description: string;
    };
    quality: {
        level: QualityLevel;
        components: PollutionComponents;
    };
}

type QualityLevel = "great" | "good" | "moderate" | "poor" | "veryPoor";
interface PollutionComponents {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
}

export class WeatherServiceImpl implements WeatherService {
    constructor(private readonly apiCall: OpenWeatherAPI, private readonly plantService: PlantService) {}

    async getCurrentWeather(user: UserIdentifier): Promise<DailyWeatherInfo> {
        const plant = await this.plantService.getPlantInfo(user);
        const { latitude, longitude } = plant.location.coordinate;

        const weather = await this.apiCall.getCurrentWeather({ lat: latitude, lon: longitude });
        const pollution = await this.apiCall.getCurrentAirPollution({ lat: latitude, lon: longitude });

        return {
            cloud: weather.clouds.all,
            wind: {
                degree: weather.wind.deg,
                speed: weather.wind.speed,
            },
            temp: weather.main.temp,
            weather: {
                key: weather.weather[0].main,
                description: weather.weather[0].description,
            },
            quality: {
                level: airQualityLevelTable[pollution.list[0].main.aqi],
                components: pollution.list[0].components,
            },
        };
    }
}

const airQualityLevelTable: Record<number, QualityLevel> = {
    1: "great",
    2: "good",
    3: "moderate",
    4: "poor",
    5: "veryPoor",
};
