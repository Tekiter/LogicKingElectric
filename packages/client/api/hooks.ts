import { useEffect, useState } from "react";
import Router from "next/router";
import { EndpointEntry, authorize } from "./endpoint";
import { apiService } from "./service";
import { APIError } from "./service";

interface APIRequestHook<Req, Res> {
    isLoading: boolean;
    error: APIError | undefined;
    data: Res | undefined;
    request: (data: Req) => Promise<void>;
}

interface APIRequestOptions<Res> {
    onSuccess?(data: Res): void;
    onError?(error: Error): void;
}

export function useAPIRequest<Req, Res>(
    endpoint: EndpointEntry<Req, Res>,
    options?: APIRequestOptions<Res>,
): APIRequestHook<Req, Res> {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Res>();
    const [error, setError] = useState<APIError>();

    const request = async (requestData: Req): Promise<void> => {
        setIsLoading(true);
        setError(undefined);

        try {
            const response = await apiService.request(endpoint, requestData);
            setData(response);
            options?.onSuccess?.call(undefined, response);
        } catch (error) {
            if (error instanceof APIError) {
                if (error.key === "AuthFailError") {
                    Router.push("/testpage/login");
                    return;
                }
            }
            setError(error);
            options?.onError?.call(undefined, error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, request, data, error };
}

export function useAuth(): { username: string | undefined } {
    const authorizeAPI = useAPIRequest(authorize.endpoint);

    useEffect(() => {
        authorizeAPI.request({});
    }, []);

    return { username: authorizeAPI.data?.username };
}
