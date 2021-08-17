import { UserIdentifier } from "../../../entity/user";
import { WeatherInfo } from "../../../entity/weatherHistory";

export interface WeatherDataAccess {
    getHistoryOfLastMonths(owner: UserIdentifier, days: number): Promise<WeatherInfo[]>;
}
