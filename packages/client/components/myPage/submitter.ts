import { EndpointEntry, updatePlantInfo, updateSolarPlantInfo } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import { useState } from "react";
import { EditingSolarPlantInfo, SolarPlantInfo } from "./types";

export interface Submitter<Req> {
    submit(data: Req): Promise<void>;
    isProcessing: boolean;
    isError: boolean;
}

function createSubmitter<Request, Response>(endpoint: EndpointEntry<Request, Response>) {
    return function usePlantInfoSubmitter(): Submitter<Request> {
        const [isProcessing, setIsProcessing] = useState(false);
        const { request, error } = useAPIRequest(endpoint);

        const isError = error !== undefined;

        async function submit(data: Request) {
            setIsProcessing(true);

            await request(data);

            setIsProcessing(false);
        }

        return { submit, isProcessing, isError };
    };
}

export const usePlantInfoSubmitter = createSubmitter(updatePlantInfo.endpoint);

interface SolarPlantInfoSubmitter {
    submit: (data: EditingSolarPlantInfo) => Promise<void>;
    check: (data: EditingSolarPlantInfo) => boolean;
}

export function useSolarPlantInfoSubmitter(): SolarPlantInfoSubmitter {
    const apiRequest = useAPIRequest(updateSolarPlantInfo.endpoint);

    async function submit(data: EditingSolarPlantInfo) {
        const converted = convert(data);

        await apiRequest.request(converted);
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

    return { submit, check };
}

class ConvertError extends Error {}

function isNumber(arr: string[]): boolean {
    return arr.every(str => isNaN(parseInt(str)) === false);
}
