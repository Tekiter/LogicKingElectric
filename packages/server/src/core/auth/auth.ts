import { checkHashedPassword, hashPassword } from "./hash";

import { DataAccess } from "../../service/dataAccess/types";

interface AuthInfo {
    username: string;
}

type AuthResult = { success: true; authInfo: AuthInfo } | { success: false };
type RegisterResult = { success: boolean };

export class AuthWithPassword {
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
            return {
                success: true,
                authInfo: authInfo,
            };
        }

        return { success: false };
    }

    async register(username: string, password: string): Promise<RegisterResult> {
        const existingAuthData = await this.dataAccess.auth.getAuthByUsername(username);
        if (existingAuthData !== null) {
            return { success: false };
        }

        const hashedPassword = await hashPassword(password);
        await this.dataAccess.auth.registerAuth({ username: username, passwordHash: hashedPassword });

        return { success: true };
    }
}
