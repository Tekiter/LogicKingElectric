import { UserService } from "../user";
import { AuthService } from "../auth";

export interface RegisterService {
    registerUser(registerData: RegisterUserData): Promise<RegisterUserResult>;
}

export interface RegisterUserResult {
    success: boolean;
}

export interface RegisterUserData {
    username: string;
    password: string;
}

export class RegisterServiceImpl implements RegisterService {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    async registerUser(registerData: RegisterUserData): Promise<RegisterUserResult> {
        const { username, password } = registerData;

        const createUserResult = await this.userService.createNewUser({ username });
        if (createUserResult.state === "userExists") {
            return { success: false };
        }

        const registerResult = await this.authService.register(username, password);

        if (registerResult.success === false) {
            return { success: false };
        }

        return { success: true };
    }
}
