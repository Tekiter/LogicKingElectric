import { ServiceFacade } from "../../../../../services";
import { AuthInfo } from "../../../../../services/auth/auth";
import { HandleableError } from "../error";

export class AuthFailError extends HandleableError {
    key = "AuthFailError";
    status = 401;
    data = undefined;
}

class AuthorizationParseError extends AuthFailError {
    message = "Invalid authorization header.";
}

class NotValidAuthTokenError extends AuthFailError {
    message = "Not a valid authorization token";
}

export class AuthTokenExtractor {
    constructor(private readonly services: ServiceFacade) {}

    async getAuthInfo(token: string): Promise<AuthInfo> {
        const authInfoResult = await this.services.auth.getAuthInfo(token);
        if (authInfoResult.success === false) {
            throw new NotValidAuthTokenError();
        }

        return authInfoResult.authInfo;
    }
}

export class AuthHeaderParser {
    static parse(authHeader: string | undefined): string {
        const parser = new AuthHeaderParser();
        return parser.parse(authHeader);
    }

    parse(authHeader: string | undefined): string {
        if (!this.isValidAuthHeader(authHeader)) {
            throw new AuthorizationParseError();
        }
        return this.parseToken(authHeader);
    }

    private isValidAuthHeader(authHeader: string | undefined): authHeader is string {
        if (authHeader === undefined) return false;
        if (!authHeader.startsWith("Bearer ")) return false;

        const parts = authHeader.split(" ");
        if (parts.length != 2 || parts[1] === "") return false;

        return true;
    }

    private parseToken(authHeader: string): string {
        const parts = authHeader.split(" ");
        return parts[1];
    }
}
