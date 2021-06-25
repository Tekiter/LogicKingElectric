import type { AuthData, AuthDataAccess } from "../types";

const store: AuthData[] = [];

export class AuthMemoryDataAccess implements AuthDataAccess {
    async getAuthByUsername(username: string): Promise<AuthData | null> {
        const foundAuthData = store.find(value => value.username == username);
        if (foundAuthData === undefined) {
            return null;
        } else {
            return foundAuthData;
        }
    }

    async registerAuth(authData: AuthData): Promise<void> {
        store.push(authData);
    }

    static clear(): void {
        store.length = 0;
    }
}
