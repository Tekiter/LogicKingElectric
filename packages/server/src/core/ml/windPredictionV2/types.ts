export interface WindPredictionV2API {
    getPrediction(historyActual: HistoryActual[]): Promise<PredictionResult>;
}

export interface HistoryActual {
    generation: number;
    speed: number;
    pressure: number;
}

export interface PredictionResult {
    predicted: number;
}
