import { UserIdentifier } from "../../../entity/user";
import { WeatherInfo } from "../../../entity/weatherHistory";
import { WeatherDataAccess } from "../types/weather";
import { DateStore } from "./utils/store";

const store = new Map<string, DateStore<WeatherInfo>>();

export class WeatherMemoryDataAccess implements WeatherDataAccess {
    async getHistoryOfLastMonths(owner: UserIdentifier, months: number): Promise<WeatherInfo[]> {
        const userStore = store.get(owner.username);
        if (userStore === undefined) {
            return [];
        }

        const result = userStore.getListOfLastMonths(months);
        return result;
    }

    async addWeatherRecord(owner: UserIdentifier, weather: WeatherInfo): Promise<void> {
        let userStore = store.get(owner.username);
        if (userStore === undefined) {
            userStore = new DateStore();
            store.set(owner.username, userStore);
        }

        userStore.setOrUpdate(weather);
    }
}
