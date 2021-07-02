import { checkHashedPassword, hashPassword } from "./hash";

import { DataAccess } from "../../core/dataAccess/types";
import { JWTTokenManager } from "./token/jwt";
import { AuthTokenManager } from "./token";

export interface AuthService {
    authorize(username: string, password: string): Promise<AuthResult>;
    register(username: string, password: string): Promise<RegisterResult>;
    getAuthInfo(accessToken: string): Promise<GetAuthInfoResult>;
}

export interface AuthInfo {
    username: string;
}

type AuthResult = { success: true; authInfo: AuthInfo; accessToken: string } | { success: false };
type RegisterResult = { success: boolean };
type GetAuthInfoResult = { success: false } | { success: true; authInfo: AuthInfo };

export class AuthWithPassword implements AuthService {
    readonly token: AuthTokenManager<AuthInfo>;

    constructor(private readonly dataAccess: DataAccess<"auth">) {
        this.token = new JWTTokenManager("SECRET_NEED_CHANGE");
    }

    public async authorize(username: string, password: string): Promise<AuthResult> {
        const authData = await this.dataAccess.auth.getAuthByUsername(username);

        if (authData === null) {
            return { success: false };
        }

        const isCorrectPassword = await checkHashedPassword(authData.passwordHash, password);

        if (isCorrectPassword) {
            const authInfo: AuthInfo = {
                username: authData.username,
            };

            const token = await this.getAccessToken(authInfo);

            return {
                success: true,
                authInfo: authInfo,
                accessToken: token,
            };
        }

        return { success: false };
    }

    private async getAccessToken(authInfo: AuthInfo) {
        const token = await this.token.issue(authInfo);
        return token;
    }

    public async register(username: string, password: string): Promise<RegisterResult> {
        const existingAuthData = await this.dataAccess.auth.getAuthByUsername(username);
        const authDataExists = existingAuthData !== null;

        const hashedPassword = await hashPassword(password);

        if (authDataExists) {
            return { success: false };
        }

        await this.dataAccess.auth.registerAuth({ username: username, passwordHash: hashedPassword });

        return { success: true };
    }

    public async getAuthInfo(accessToken: string): Promise<GetAuthInfoResult> {
        const isValidToken = await this.token.isValidToken(accessToken);
        if (isValidToken) {
            const extractedToken = await this.token.extract(accessToken);

            const authInfo = {
                username: extractedToken.username,
            } as AuthInfo;
            return { success: true, authInfo };
        }
        return { success: false };
    }
}
