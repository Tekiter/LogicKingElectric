import { WindPredictionAPI } from "./types";
import { WindPredictionML } from "./tensorflow";

describe("Wind Prediction Tf", () => {
    let api: WindPredictionAPI;

    beforeEach(() => {
        api = new WindPredictionML();
    });

    test("makes number", async () => {
        const res = await api.getPrediction([1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]);

        expect(typeof res.predicted).toBe("number");
    });

    test("error on non 20 records input", async () => {
        expect(api.getPrediction([1, 2, 3])).rejects.toThrow();
    });
});
