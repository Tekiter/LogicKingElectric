import { dummyData } from "./dummyData";
import { addHours, startOfDay } from "date-fns";
import { SimulationAPI, SimulationRequest, SimulationResponse } from "./types";

export class SolarSimulationDummyCall implements SimulationAPI {
    async request(query: SimulationRequest): Promise<SimulationResponse> {
        const response: SimulationResponse = {
            data: [],
        };

        const baseDate = startOfDay(query.currentDatetime);
        let currentDate = baseDate;
        for (const entry of dummyData.data) {
            response.data.push({ ...entry, targetDatetime: currentDate });
            currentDate = addHours(currentDate, 1);
        }

        return response;
    }
}
