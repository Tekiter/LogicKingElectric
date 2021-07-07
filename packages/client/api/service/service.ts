import { EndpointEntry } from "@electric/shared/dist/api/v1/util";

export interface APIService {
    request<Request, Response>(endpoint: EndpointEntry<Request, Response>, requestData: Request): Promise<Response>;
    setAuthToken(token: string | null): void;
}
