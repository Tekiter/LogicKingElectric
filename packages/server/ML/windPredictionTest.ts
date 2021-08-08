import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-node";

async function load(sample: tf.Tensor3D) {
    const model = await tf.loadLayersModel("file://./ML/model.json");
    const res = model.predict(sample);
    //console.log((res as tf.Tensor).dataSync()[0]);
    const model_prediction = (res as tf.Tensor).dataSync()[0];
    return model_prediction;
}

const dummy = tf.tensor3d([
    [
        [-0.8103514],
        [-0.61888821],
        [0.87503328],
        [-0.35512678],
        [0.11644669],
        [2.06014318],
        [-0.1549442],
        [-0.44740695],
        [1.13588825],
        [0.08193245],
        [0.126256],
        [0.19419455],
        [0.19419455],
        [0.33334142],
        [0.26794602],
        [0.01908021],
        [-1.0261562],
        [0.67085432],
        [1.17839526],
        [2.12844504],
    ],
]);
// kWh 단위의 20일치 발전량
const std = 10962.6830382078;
const mean = 13009.62705882353;
const res = load(dummy);
res.then((val)=>console.log(val*std+mean));
