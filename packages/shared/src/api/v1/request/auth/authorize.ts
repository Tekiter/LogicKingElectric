import { RawAuthToken } from "../../data/auth";
import type { User } from "../../data/user";

export interface AuthorizeRequest {
    accessToken: RawAuthToken;
}

export interface AuthorizeResponse {
    user: User;
}
