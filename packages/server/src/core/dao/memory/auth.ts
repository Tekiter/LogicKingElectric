import type { AuthData, AuthDataAccess } from "../types";

export class AuthMemoryDataAccess implements AuthDataAccess {
    private _store: AuthData[] = [];

    async getAuthByUsername(username: string): Promise<AuthData | null> {
        const foundAuthData = this._store.find(value => value.username == username);
        if (foundAuthData === undefined) {
            return null;
        } else {
            return foundAuthData;
        }
    }

    async registerAuth(authData: AuthData): Promise<void> {
        this._store.push(authData);
    }
}
