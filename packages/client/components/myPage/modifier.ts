import { getPlantInfo, getSolarPlantInfo } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { EditingPlantInfo, EditingSolarPlantInfo } from "./types";

export interface Modifier<T> {
    isLoading: boolean;
    data: T;
    modify: ModifierFunc<T>;
}

export interface ModifierFunc<T> {
    <K extends keyof T>(key: K, value: T[K]): void;
}

export type ModifiableState<T> = [T, Dispatch<SetStateAction<T>>, ModifierFunc<T>];

export function useModifiableState<T>(initState: T): ModifiableState<T> {
    const [data, setData] = useState<T>(initState);

    const modify: ModifierFunc<T> = (key, value) => {
        setData(data => ({ ...data, [key]: value }));
    };

    return [data, setData, modify];
}

export type PlantInfoModifier = Modifier<EditingPlantInfo>;

export function usePlantInfoModifier(): PlantInfoModifier {
    const [plantData, setPlantData, modify] = useModifiableState<EditingPlantInfo>({
        latitude: "",
        longitude: "",
        locationName: "",
        name: "",
        type: "solar",
    });

    const { request, isLoading } = useAPIRequest(getPlantInfo.endpoint, {
        onSuccess(data) {
            setPlantData({
                name: data.name,
                type: data.type,
                latitude: data.latitude + "",
                longitude: data.longitude + "",
                locationName: data.locationName,
            });
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

export type SolarPlantInfoModifier = Modifier<EditingSolarPlantInfo>;

export function useSolarPlantInfoModifier(): SolarPlantInfoModifier {
    const [plantData, setPlantData, modify] = useModifiableState<EditingSolarPlantInfo>({
        arrayType: "fixed",
        capacity: "",
        meridianAngle: "",
        temperatureCoefficientPmpp: "",
        tiltAngle: "",
    });

    const { request, isLoading } = useAPIRequest(getSolarPlantInfo.endpoint, {
        onSuccess(data) {
            setPlantData({
                arrayType: data.arrayType,
                capacity: data.capacity + "",
                meridianAngle: data.meridianAngle + "",
                temperatureCoefficientPmpp: data.temperatureCoefficientPmpp + "",
                tiltAngle: data.tiltAngle + "",
            });
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
