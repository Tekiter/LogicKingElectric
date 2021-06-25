import type { User } from "../data/user";

type RawAuthToken = string;

export interface IssueAuthTokenRequest {
    username: string;
    password: string;
}

export interface IssueAuthTokenResponse {
    access_token: RawAuthToken;
}

export interface AuthorizeRequest {
    access_token: RawAuthToken;
}

export interface AuthorizeResponse {
    user: User;
}
