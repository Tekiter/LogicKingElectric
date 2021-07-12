export interface Plant {
    name: string;
    type: PlantTypes;

    location: {
        coordinate: Coordinate;
        name: string;
    };
}

export type PlantTypes = "solar" | "wind";
export type Coordinate = {
    laditude: number;
    longitude: number;
};
