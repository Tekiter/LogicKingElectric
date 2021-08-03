import { getPlantInfo } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface Modifier<T> {
    isLoading: boolean;
    data: T;
    modify: ModifierFunc<T>;
}

export type PlantInfoModifier = Modifier<getPlantInfo.Response>;

export function usePlantInfoModifier(): PlantInfoModifier {
    const [plantData, setPlantData, modify] = useModifiableState<getPlantInfo.Response>({
        latitude: 0,
        longitude: 0,
        locationName: "",
        name: "",
        type: "solar",
    });

    const { request, isLoading } = useAPIRequest(getPlantInfo.endpoint, {
        onSuccess(data) {
            setPlantData(data);
        },
    });

    useEffect(() => {
        request(null);
    }, []);

    return {
        isLoading,
        data: plantData,
        modify,
    };
}

export interface ModifierFunc<T> {
    <K extends keyof T>(key: K, value: T[K]): void;
}

export type ModifiableState<T> = [T, Dispatch<SetStateAction<T>>, ModifierFunc<T>];

function useModifiableState<T>(initState: T): ModifiableState<T> {
    const [data, setData] = useState<T>(initState);

    const modify: ModifierFunc<T> = (key, value) => {
        setData(data => ({ ...data, [key]: value }));
    };

    return [data, setData, modify];
}
