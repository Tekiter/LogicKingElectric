import { getPlantInfo, getSolarPlantInfo } from "@/api/endpoint";

export type PlantInfo = getPlantInfo.Response;
export type EditingPlantInfo = { [key in keyof PlantInfo]: string };

export type SolarPlantInfo = getSolarPlantInfo.Response;

export interface EditingSolarPlantInfo {
    arrayType: string;
    capacity: string;
    meridianAngle: string;
    temperatureCoefficientPmpp: string;
    tiltAngle: string;
}
