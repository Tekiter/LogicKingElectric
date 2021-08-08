import { relative, join } from "path";
import * as tf from "@tensorflow/tfjs-node";
import { PredictionResult, WindPredictionAPI } from "./types";

const std = 10962.6830382078;
const mean = 13009.62705882353;

export class WindPredictionML implements WindPredictionAPI {
    async getPrediction(base: number[]): Promise<PredictionResult> {
        if (base.length !== 20) {
            throw new Error("array length should be exactly 20.");
        }
        const model = await tf.loadLayersModel(`file://${getPath()}`);

        const tensor = tf.tensor3d([
            base.map(item => {
                return [item];
            }),
        ]);

        const res = model.predict(tensor);
        const predicted = (res as tf.Tensor).dataSync()[0] * std + mean;

        return { predicted };
    }
}

function getPath() {
    const thispath = __dirname;
    const abspath = join(thispath, "../../../../ML/model.json");
    const relpath = relative(process.cwd(), abspath);
    return relpath;
}
