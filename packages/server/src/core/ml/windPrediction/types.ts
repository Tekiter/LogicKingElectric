export interface WindPredictionAPI {
    getPrediction(lastCapacities: LastCapacities): Promise<PredictionResult>;
    getPredictionWithWeather(historyActual: LastCapacitiesWithWeather): Promise<PredictionResult>;
}

type LastCapacities = number[];
export interface CapacityWithWeather {
    generation: number;
    speed: number;
    pressure: number;
}
export type LastCapacitiesWithWeather = CapacityWithWeather[];

export interface PredictionResult {
    predicted: number;
}
