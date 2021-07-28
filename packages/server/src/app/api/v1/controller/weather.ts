import { getCurrentWeather } from "@electric/shared/src/api/v1/request";
import { createAuthController } from "../util";

export const getCurrentWeatherController = createAuthController(getCurrentWeather.endpoint, async (req, services) => {
    const weather = await services.weather.getCurrentWeather(req.user);

    return weather;
});
