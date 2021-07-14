import { SolarSimulationDummyCall } from "./dummyCall";

describe("maruSolarSimulationAPIDummy", () => {
    test("request", async () => {
        const api = new SolarSimulationDummyCall();
        const res = await api.request({
            arrayType: "fixed",
            capacity: 1000,
            currentDatetime: new Date(),
            latitude: 37.005,
            longitude: 127.49,
            meridianAngle: 180,
            tiltAngle: 30,
            temperatureCoefficientPmpp: -0.415,
        });
        expect(res.data).toHaveLength(39);
    });
});
