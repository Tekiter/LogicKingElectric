import { ServerRequestAPIService, APIError } from "./serverRequest";
import { APIService } from "./service";

export type { APIService };
export { APIError };
export const apiService: APIService = new ServerRequestAPIService({ url: "/api/v1/" });
