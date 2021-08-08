export interface WindPredictionAPI {
    getPrediction(lastCapacities: LastCapacities): Promise<PredictionResult>;
}

type LastCapacities = number[];

export interface PredictionResult {
    predicted: number;
}
