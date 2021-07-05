import { useEffect, useState } from "react";
import Router from "next/router";
import { EndpointEntry, authorize } from "./endpoint";
import { apiService } from "./service";
import { APIError } from "./service";

export function useAPIRequest<Req, Res>(
    endpoint: EndpointEntry<Req, Res>,
): { isLoading: boolean; request: (data: Req) => Promise<Res> } {
    const [isLoading, setIsLoading] = useState(false);

    const request = async (requestData: Req): Promise<Res> => {
        setIsLoading(true);
        try {
            const response = await apiService.request(endpoint, requestData);
            return response;
        } catch (error) {
            if (error instanceof APIError) {
                console.log(error.key);
                if (error.key === "AuthFailError") {
                    Router.push("/testpage/login");
                    return {} as Res;
                }
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, request };
}

export function useAuth(): { username: string } {
    const authorizeAPI = useAPIRequest(authorize.endpoint);
    const [username, setUsername] = useState("");

    useEffect(() => {
        authorizeAPI.request({}).then(ret => {
            setUsername(ret.username);
        });
    }, []);

    return { username };
}
