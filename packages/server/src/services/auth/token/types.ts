export type AuthToken = string;

export interface AuthTokenManager<AuthInfo> {
    issue(authInfo: AuthInfo): Promise<AuthToken>;
    isValidToken(token: AuthToken): Promise<boolean>;
    extract(token: AuthToken): Promise<AuthInfo>;
}

export class InvalidTokenError extends Error {}
