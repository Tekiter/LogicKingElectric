import { checkHashedPassword, hashPassword } from "./hash";

import { DataAccess } from "../../core/dataAccess/types";
import { JWTTokenManager } from "./token/jwt";

export interface AuthService {
    authorize(username: string, password: string): Promise<AuthResult>;
    register(username: string, password: string): Promise<RegisterResult>;
}

interface AuthInfo {
    username: string;
}

type AuthResult = { success: true; authInfo: AuthInfo; accessToken: string } | { success: false };
type RegisterResult = { success: boolean };

export class AuthWithPassword implements AuthService {
    constructor(private readonly dataAccess: DataAccess<"auth">) {}

    async authorize(username: string, password: string): Promise<AuthResult> {
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
        const tokenManager = new JWTTokenManager("SECRET_NEED_CHANGE");
        const token = await tokenManager.issue(authInfo);
        return token;
    }

    async register(username: string, password: string): Promise<RegisterResult> {
        const existingAuthData = await this.dataAccess.auth.getAuthByUsername(username);
        const authDataExists = existingAuthData !== null;

        const hashedPassword = await hashPassword(password);

        if (authDataExists) {
            return { success: false };
        }

        await this.dataAccess.auth.registerAuth({ username: username, passwordHash: hashedPassword });

        return { success: true };
    }
}
