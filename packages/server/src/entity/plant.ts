export interface Plant {
    name: string;
    type: PlantTypes;

    location: {
        coordinate: Coordinate;
        name: string;
    };
}

export type PlantTypes = "solar" | "wind" | "hydro";
export type Coordinate = {
    latitude: number;
    longitude: number;
};

export interface SolarPlant {
    arrayType: SolarPlantArrayType;
    capacity: number;
    meridianAngle: number;
    temperatureCoefficientPmpp: number;
    tiltAngle: number;
}

type SolarPlantArrayType = "fixed" | "track";

export interface WindPlant {
    ratedWindSpeed: number;
    cutInWindSpeed: number;
    cutOutWindSpeed: number;
    capacity: number;
}
