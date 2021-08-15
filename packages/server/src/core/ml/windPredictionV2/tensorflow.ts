import { relative, join } from "path";
import * as tf from "@tensorflow/tfjs-node";
import { HistoryActual, PredictionResult, WindPredictionV2API } from "./types";

const std = 8697.476203780127;
const mean = 4703.139041666667;

export class WindPredictionV2ML implements WindPredictionV2API {
    async getPrediction(historyActual: HistoryActual[]): Promise<PredictionResult> {
        if (historyActual.length !== 20) {
            throw new Error("array length should be exactly 20.");
        }
        const model = await tf.loadLayersModel(`file://${getPath()}`);

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

function norm(value: number) {
    return (value - mean) / std;
}

function unnorm(value: number) {
    return value * std + mean;
}

function getPath() {
    const thispath = __dirname;
    const abspath = join(thispath, "../../../../ML/MultiTest/model.json");
    const relpath = relative(process.cwd(), abspath);
    return relpath;
}
