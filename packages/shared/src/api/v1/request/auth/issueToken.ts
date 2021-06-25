import { RawAuthToken } from "../../data/auth";
import { createEndpoint } from "../../util";

export interface Request {
    username: string;
    password: string;
}

export interface Response {
    accessToken: RawAuthToken;
}

export const IssueAuthToken = createEndpoint({
    endpoint: "auth/issue",
    method: "POST",
});
