export interface GenerationPrediction {
    targetDate: Date;
    generation: number;
}

export interface GenerationActual {
    targetDate: Date;
    generation: number;
}

export function calculateErrorRate(actual: number, prediction: number): number {
    const error = Math.abs(actual - prediction);
    const errorRate = error / prediction;

    return errorRate;
}

export function calculateIncentive(actual: number, prediction: number): number {
    const error = calculateErrorRate(actual, prediction);
    let w = 0;
    if (error <= 0.06) {
        w = 4;
    } else if (error <= 0.08) {
        w = 3;
    }
    return actual * w;
}
