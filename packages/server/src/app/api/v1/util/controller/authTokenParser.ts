import { ServiceFacade } from "../../../../../services";
import { AuthInfo } from "../../../../../services/auth/auth";
import { HandleableError } from "../error";

class AuthFailError extends HandleableError {
    key = "AuthFailError";
    message = "Authorization Failed.";
    status = 401;
    data = undefined;
}

class AuthorizationParseError extends AuthFailError {
    message = "Invalid authorization header.";
}

class NotValidAuthTokenError extends AuthFailError {
    message = "Not a valid authorization token";
}

export class AuthTokenParser {
    constructor(private readonly services: ServiceFacade) {}

    async getAuthInfo(authHeader: string | undefined): Promise<AuthInfo> {
        if (!this.isValidAuthHeader(authHeader)) {
            throw new AuthorizationParseError();
        }

        const token = this.parseToken(authHeader);

        const authInfoResult = await this.services.auth.getAuthInfo(token);
        if (authInfoResult.success === false) {
            throw new NotValidAuthTokenError();
        }

        return authInfoResult.authInfo;
    }

    private isValidAuthHeader(authHeader: string | undefined): authHeader is string {
        if (authHeader === undefined) return false;
        if (!authHeader.startsWith("Bearer ")) return false;

        const parts = authHeader.split(" ");
        if (parts.length != 2) return false;

        return true;
    }

    private parseToken(authHeader: string): string {
        const parts = authHeader.split(" ");
        return parts[1];
    }
}
