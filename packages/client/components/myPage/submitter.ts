import { EndpointEntry, updatePlantInfo, updateSolarPlantInfo } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import { useState } from "react";

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

export const useSolarPlantInfoSubmitter = createSubmitter(updateSolarPlantInfo.endpoint);
