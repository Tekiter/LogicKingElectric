import { relative, join } from "path";
import * as tf from "@tensorflow/tfjs-node";
import { LastCapacitiesWithWeather, PredictionResult, WindPredictionAPI } from "./types";

export class WindPredictionML implements WindPredictionAPI {
    async getPrediction(base: number[]): Promise<PredictionResult> {
        const std = 10962.6830382078;
        const mean = 13009.62705882353;

        if (base.length !== 20) {
            throw new Error("array length should be exactly 20.");
        }
        const model = await tf.loadLayersModel(`file://${getPath()}`);

        const tensor = tf.tensor3d([
            base.map(item => {
                return [(item - mean) / std];
            }),
        ]);

        const res = model.predict(tensor);
        const predicted = (res as tf.Tensor).dataSync()[0] * std + mean;

        return { predicted };
    }

    async getPredictionWithWeather(historyActual: LastCapacitiesWithWeather): Promise<PredictionResult> {
        const std = 8697.476203780127;
        const mean = 4703.139041666667;

        function norm(value: number) {
            return (value - mean) / std;
        }

        function unnorm(value: number) {
            return value * std + mean;
        }

        if (historyActual.length !== 20) {
            throw new Error("array length should be exactly 20.");
        }
        const model = await tf.loadLayersModel(`file://${getWithWeatherModelPath()}`);

        const tensor = tf.tensor3d([
            historyActual.map(item => {
                return [norm(item.generation), norm(item.speed), norm(item.pressure)];
            }),
        ]);

        const res = model.predict(tensor);
        const predicted = unnorm((res as tf.Tensor).dataSync()[0]);

        return { predicted };
    }
}

function getPath() {
    const thispath = __dirname;
    const abspath = join(thispath, "../../../../ML/model.json");
    const relpath = relative(process.cwd(), abspath);
    return relpath;
}

function getWithWeatherModelPath() {
    const thispath = __dirname;
    const abspath = join(thispath, "../../../../ML/MultiTest/model.json");
    const relpath = relative(process.cwd(), abspath);
    return relpath;
}
