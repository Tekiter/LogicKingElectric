export interface OpenWeatherAPI {
    getCurrentWeather(request: CurrentWeatherRequest): Promise<WeatherResponse>;
    getCurrentAirPollution(request: CurrentAirPollutionRequest): Promise<AirPollutionResponse>;
}

export interface CurrentWeatherRequest {
    lat: number;
    lon: number;
}

export interface WeatherResponse {
    coord: {
        lon: number;
        lat: number;
    };
    base: string;
    sys: unknown;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface CurrentAirPollutionRequest {
    lat: number;
    lon: number;
}

export interface AirPollutionResponse {
    coord: unknown;

    list: {
        dt: number;
        main: {
            aqi: number;
        };
        components: {
            co: number;
            no: number;
            no2: number;
            o3: number;
            so2: number;
            pm2_5: number;
            pm10: number;
            nh3: number;
        };
    }[];
}
