export interface AuthDataAccess {
    getAuthByUsername(username: string): Promise<AuthData | null>;
    registerAuth(authData: AuthData): Promise<void>;
}

export interface AuthData {
    username: string;
    passwordHash: string;
}
