import { defineEndpoint, defineErrors } from "../../util";

interface Response {
    /** 현재 온도 */
    temp: number;

    wind: {
        /** 풍속 (m/s) */
        speed: number;

        /** 풍향 */
        degree: number;
    };

    /** 구름 양 (%) */
    cloud: number;

    weather: {
        /** 날씨 고유값 */
        key: string;

        /** 날씨 설명 (한글) */
        description: string;
    };
    quality: {
        /** 공기 질 수준 */
        level: QualityLevel;

        /** 오염물질 양 (단위: μg/m3)*/
        components: PollutionComponents;
    };
}
type QualityLevel = "great" | "good" | "moderate" | "poor" | "veryPoor";
interface PollutionComponents {
    /** 일산화탄소  */
    co: number;

    /** 일산화질소  */
    no: number;

    /** 이산화질소  */
    no2: number;

    /** 오존 */
    o3: number;

    /** 이산화황 */
    so2: number;

    /** 초미세먼지 */
    pm2_5: number;

    /** 미세먼지 */
    pm10: number;
}

export const errors = defineErrors({});

export const endpoint = defineEndpoint<null, Response>({
    method: "GET",
    path: "/weather/current",
});
