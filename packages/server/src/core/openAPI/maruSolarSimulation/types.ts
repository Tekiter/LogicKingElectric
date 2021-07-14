export interface SimulationRequest {
    currentDatetime: Date;
    latitude: number;
    longitude: number;
    capacity: number;
    arrayType: "fixed" | "track";
    temperatureCoefficientPmpp: number;
    tiltAngle: number;
    meridianAngle: number;
}

export interface SimulationResponse {
    data: SimulationPerTimeEntry[];
}

export interface SimulationPerTimeEntry {
    targetDatetime: Date;
    generation: number;
    amountOfSolarRadiation: number;
    temperature: number;
    windSpeed: number;
}

export interface SimulationAPI {
    request(query: SimulationRequest): Promise<SimulationResponse>;
}
