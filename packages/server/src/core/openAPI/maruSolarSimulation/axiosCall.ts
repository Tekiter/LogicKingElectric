import axios, { AxiosInstance } from "axios";
import qs from "qs";
import { format, parse } from "date-fns";
import { SolarSimulationAPI, SimulationPerTimeEntry, SimulationRequest, SimulationResponse } from "./types";
import { RequestCache } from "../../cache";

interface APIRequest {
    hostKey: string;
    requestPath: string;
    method: "POST";
    BASE_DATE: string;
    BASE_TIME: string;
    LAT: number;
    LON: number;
    PCAP: number;
    ARRAY_CD: number;
    TC_P: number;
    TILT: number;
    AZMUTH: number;
}

interface APIResponse {
    res: {
        code: number;
        message: string;
    };
    data: Array<PerTimeEntry>;
}

interface PerTimeEntry {
    BASE_DATE: string;
    BASE_TIME: string;
    FCST_DATE: string;
    FCST_TIME: string;
    PCAP: number;
    QGEN: number;
    SRAD: number;
    TEMP: number;
    WSPD: number;
}

export class SolarSimulationAxiosCall implements SolarSimulationAPI {
    private api: AxiosInstance;
    private cache = new RequestCache<
        Omit<SimulationRequest, "currentDatetime"> & { currentDatetime: undefined },
        SimulationResponse
    >();

    constructor() {
        this.api = axios.create({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                Accept: "application/json, text/javascript, */*; q=0.01",
            },
        });
    }

    async request(query: SimulationRequest): Promise<SimulationResponse> {
        const cached = this.cache.get({ ...query, currentDatetime: undefined });
        if (cached !== undefined) {
            return cached;
        }

        const convertedQuery = qs.stringify(ToRequestConverter.convert(query));

        const res = await this.api.post<APIResponse>(
            "https://bd.kma.go.kr/kma2020/api/httpURLConnection.do",
            convertedQuery,
        );
        const response = ToResponseConverter.convert(res.data);
        this.cache.set({ ...query, currentDatetime: undefined }, response);
        return response;
    }
}

class ToRequestConverter {
    static convert(req: SimulationRequest): APIRequest {
        return {
            hostKey: "SERVICE.ENERGY.SUNLIGHT.PV.URI",
            requestPath: "/pv/getPower.do",
            method: "POST",
            BASE_DATE: this.convertDate(req.currentDatetime),
            BASE_TIME: this.convertTime(req.currentDatetime),
            LAT: req.latitude,
            LON: req.longitude,
            PCAP: req.capacity,
            ARRAY_CD: this.convertArrayType(req.arrayType),
            TC_P: req.temperatureCoefficientPmpp,
            TILT: req.tiltAngle,
            AZMUTH: req.meridianAngle,
        };
    }

    private static convertDate(date: Date) {
        return format(date, "yyyyMMdd");
    }

    private static convertTime(date: Date) {
        return format(date, "HHmm");
    }

    private static convertArrayType(type: SimulationRequest["arrayType"]): number {
        switch (type) {
            case "fixed":
                return 0;
            case "track":
                return 1;
            default:
                return 0;
        }
    }
}

class ToResponseConverter {
    static convert(res: APIResponse): SimulationResponse {
        return {
            data: this.convertEntry(res.data),
        };
    }

    private static convertEntry(entryArray: PerTimeEntry[]): SimulationPerTimeEntry[] {
        return entryArray.map(entry => ({
            targetDatetime: this.convertDatetime(entry.FCST_DATE, entry.FCST_TIME),
            amountOfSolarRadiation: entry.SRAD,
            generation: entry.PCAP,
            temperature: entry.TEMP,
            windSpeed: entry.WSPD,
        }));
    }

    private static convertDatetime(date: string, time: string): Date {
        return parse(`${date} ${time}`, "yyyyMMdd HHmm", new Date());
    }
}
