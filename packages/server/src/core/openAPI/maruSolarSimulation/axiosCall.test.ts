import { SolarSimulationAxiosCall } from "./axiosCall";

xdescribe("maruSolarSimulationAPIAxios", () => {
    test("request", async () => {
        const api = new SolarSimulationAxiosCall();
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
        expect(Array.isArray(res.data)).toBeTruthy();
    }, 13000);
});
