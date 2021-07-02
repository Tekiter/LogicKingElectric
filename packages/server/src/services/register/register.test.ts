import { RegisterService, RegisterServiceImpl } from ".";
import { AuthMemoryDataAccess } from "../../core/dataAccess/memory/auth";
import { UserMemoryDataAccess } from "../../core/dataAccess/memory/user";
import { AuthService } from "../auth";
import { AuthWithPassword } from "../auth/auth";
import { UserService, UserServiceImpl } from "../user";

const SAMPLE_USERNAME = "A_S4mple_username";
const SAMPLE_PASSWORD = "s4mp1e_passwd";

describe("Register Service", () => {
    const dataAccess = {
        auth: new AuthMemoryDataAccess(),
        user: new UserMemoryDataAccess(),
    };

    const authService: AuthService = new AuthWithPassword(dataAccess);
    const userService: UserService = new UserServiceImpl(dataAccess);
    const registerService: RegisterService = new RegisterServiceImpl(authService, userService);

    beforeEach(async () => {
        AuthMemoryDataAccess.clear();
        UserMemoryDataAccess.clear();
    });

    test("register new user success", async () => {
        const registerResult = await registerService.registerUser({
            username: SAMPLE_USERNAME,
            password: SAMPLE_PASSWORD,
        });

        expect(registerResult.success).toBeTruthy();
        const authResult = await authService.authorize(SAMPLE_USERNAME, SAMPLE_PASSWORD);
        expect(authResult.success).toBeTruthy();
        expect(userService.isUserExists(SAMPLE_USERNAME)).resolves.toBeTruthy();
    });

    test("register existing user fail", async () => {
        await registerService.registerUser({
            username: SAMPLE_USERNAME,
            password: SAMPLE_PASSWORD,
        });

        const registerResult = await registerService.registerUser({
            username: SAMPLE_USERNAME,
            password: SAMPLE_PASSWORD,
        });

        expect(registerResult.success).toBeFalsy();
    });
});
