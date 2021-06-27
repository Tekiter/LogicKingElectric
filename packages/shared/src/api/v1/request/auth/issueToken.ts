import { RawAuthToken } from "../../data/auth";
import { EndpointEntry } from "../../util";

export interface Request {
    username: string;
    password: string;
}

export interface Response {
    accessToken: RawAuthToken;
}

export const endpoint = {
    path: "/auth/issue",
    method: "POST",
} as EndpointEntry;
