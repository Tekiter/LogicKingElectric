import { Plant, SolarPlant, WindPlant } from "../../entity/plant";

export interface UserInfo {
    username: string;
    password: string;
    plant: Plant;
    solarPlant?: SolarPlant;
    windPlant?: WindPlant;
    actualGeneration: { target: Date; amount: number }[];
    predictionGeneration: { target: Date; amount: number }[];
    weather?: { target: Date; speed: number; pressure: number }[];
}
