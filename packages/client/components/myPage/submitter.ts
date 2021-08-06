import { updatePlantInfo, updateSolarPlantInfo } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import { useState } from "react";
import { EditingSolarPlantInfo, PlantInfo, SolarPlantInfo } from "./types";

export interface Submitter<Req> {
    submit(data: Req): Promise<void>;
    check(data: Req): boolean;
    isProcessing: boolean;
    isError: boolean;
}

export function usePlantInfoSubmitter(): Submitter<PlantInfo> {
    const [isProcessing, setIsProcessing] = useState(false);
    const { request, error } = useAPIRequest(updatePlantInfo.endpoint);

    const isError = error !== undefined;

    async function submit(data: PlantInfo) {
        setIsProcessing(true);

        await request(data);

        setIsProcessing(false);
    }

    function check(data: PlantInfo) {
        return true;
    }

    return { submit, check, isProcessing, isError };
}

export function useSolarPlantInfoSubmitter(): Submitter<EditingSolarPlantInfo> {
    const apiRequest = useAPIRequest(updateSolarPlantInfo.endpoint);

    const [isProcessing, setIsProcessing] = useState(false);

    const isError = apiRequest.error !== undefined;

    async function submit(data: EditingSolarPlantInfo) {
        setIsProcessing(true);
        const converted = convert(data);

        await apiRequest.request(converted);
        setIsProcessing(false);
    }

    function check(data: EditingSolarPlantInfo) {
        try {
            convert(data);
        } catch (e) {
            if (e instanceof ConvertError) {
                return false;
            }
            throw e;
        }
        return true;
    }

    function convert(data: EditingSolarPlantInfo): SolarPlantInfo {
        if (data.arrayType !== "fixed" && data.arrayType !== "track") {
            throw new ConvertError();
        }
        const arrayType = data.arrayType;

        if (!isNumber([data.capacity, data.meridianAngle, data.temperatureCoefficientPmpp, data.tiltAngle])) {
            throw new ConvertError();
        }

        const capacity = parseInt(data.capacity);
        const meridianAngle = parseInt(data.meridianAngle);
        const temperatureCoefficientPmpp = parseInt(data.temperatureCoefficientPmpp);
        const tiltAngle = parseInt(data.tiltAngle);

        return {
            arrayType,
            capacity,
            meridianAngle,
            temperatureCoefficientPmpp,
            tiltAngle,
        };
    }

    return { submit, check, isProcessing, isError };
}

class ConvertError extends Error {}

function isNumber(arr: string[]): boolean {
    return arr.every(str => isNaN(parseInt(str)) === false);
}

interface GeneralSubmitter {
    submit(): Promise<void>;
    isValid: boolean;
}

export function useSubmitter(plantInfo: PlantInfo, solarPlantInfo: EditingSolarPlantInfo): GeneralSubmitter {
    const plantSubmitter = usePlantInfoSubmitter();
    const solarPlantSubmitter = useSolarPlantInfoSubmitter();

    const isValid = (() => {
        if (!plantSubmitter.check(plantInfo)) return false;
        if (plantInfo.type === "solar") {
            if (!solarPlantSubmitter.check(solarPlantInfo)) return false;
        }
        return true;
    })();

    async function submit() {
        await plantSubmitter.submit(plantInfo);
        if (plantInfo.type === "solar") {
            await solarPlantSubmitter.submit(solarPlantInfo);
        }
    }

    return { submit, isValid };
}
