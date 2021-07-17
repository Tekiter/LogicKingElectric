import { AuthData, AuthDataAccess } from "../types/auth";

const store = new Map<string, AuthData>();

export class AuthMemoryDataAccess implements AuthDataAccess {
    async getAuthByUsername(username: string): Promise<AuthData | null> {
        const foundAuthData = store.get(username);
        if (foundAuthData === undefined) {
            return null;
        } else {
            return foundAuthData;
        }
    }

    async registerAuth(authData: AuthData): Promise<void> {
        store.set(authData.username, authData);
    }

    async updateAuth(username: string, authData: AuthData): Promise<void> {
        throw new Error("Method not implemented.");
    }

    static clear(): void {
        store.clear();
    }
}
