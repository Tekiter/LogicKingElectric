import jwt from "jsonwebtoken";
import { AuthToken, AuthTokenManager, InvalidTokenError } from ".";

export class JWTTokenManager<AuthInfo> implements AuthTokenManager<AuthInfo> {
    constructor(private readonly secretKey: string) {}

    async issue(authInfo: AuthInfo): Promise<AuthToken> {
        const authInfoObj = Object.assign({}, authInfo);
        return jwt.sign(authInfoObj, this.secretKey);
    }

    async isValidToken(token: AuthToken): Promise<boolean> {
        try {
            jwt.verify(token, this.secretKey);
        } catch {
            return false;
        }
        return true;
    }

    async extract(token: AuthToken): Promise<AuthInfo> {
        try {
            const decoded = jwt.verify(token, this.secretKey);

            const authInfo = decoded as AuthInfo;
            return authInfo;
        } catch {
            throw new InvalidTokenError();
        }
    }
}
