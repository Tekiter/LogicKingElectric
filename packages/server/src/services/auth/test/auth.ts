import { AuthMemoryDataAccess } from "../../../core/dataAccess/memory/auth";
import { AuthDataAccess } from "../../../core/dataAccess/types/auth";
import { AuthWithPassword } from "../auth";

const SAMPLE_USERNAME = "helloworld";
const SAMPLE_PASSWORD = "a_s1mp1e_p4sswd";

describe("Auth With Username & Password", () => {
    let auth: AuthWithPassword;
    let store: { auth: AuthDataAccess };

    beforeEach(() => {
        store = {
            auth: new AuthMemoryDataAccess(),
        };
        auth = new AuthWithPassword(store);
    });

    beforeEach(() => {
        AuthMemoryDataAccess.clear();
    });

    test("register new auth", async () => {
        const result = await auth.register(SAMPLE_USERNAME, SAMPLE_PASSWORD);

        expect(result.success).toBeTruthy();
        expect(store.auth.getAuthByUsername(SAMPLE_USERNAME)).resolves.not.toBeNull();
    });

    test("register existing auth", async () => {
        await auth.register(SAMPLE_USERNAME, SAMPLE_PASSWORD);

        const result = await auth.register(SAMPLE_USERNAME, SAMPLE_PASSWORD);

        expect(result.success).toBeFalsy();
    });

    test("authorize success", async () => {
        await auth.register(SAMPLE_USERNAME, SAMPLE_PASSWORD);

        const result = await auth.authorize(SAMPLE_USERNAME, SAMPLE_PASSWORD);
        expect(result.success).toBeTruthy();

        if (result.success) {
            expect(result.authInfo.username).toBe(SAMPLE_USERNAME);
            expect(typeof result.accessToken).toBe("string");
        }
    });

    test("authorize with invalid username", async () => {
        await auth.register(SAMPLE_USERNAME, SAMPLE_PASSWORD);

        const result = await auth.authorize("THE_OTHER", SAMPLE_PASSWORD);
        expect(result.success).toBeFalsy();
    });

    test("authorize with invalid password", async () => {
        await auth.register(SAMPLE_USERNAME, SAMPLE_PASSWORD);

        const result = await auth.authorize(SAMPLE_USERNAME, "OTHER_PW");
        expect(result.success).toBeFalsy();
    });

    test("getAuthInfo failure on invalid token", async () => {
        expect(auth.getAuthInfo("INVALID_TOKEN")).resolves.toEqual({ success: false });
    });

    test("getAuthInfo success", async () => {
        await auth.register(SAMPLE_USERNAME, SAMPLE_PASSWORD);
        const token = await auth.authorize(SAMPLE_USERNAME, SAMPLE_PASSWORD);
        if (token.success) {
            expect(auth.getAuthInfo(token.accessToken)).resolves.toEqual({
                success: true,
                authInfo: { username: SAMPLE_USERNAME },
            });
        }
        expect.assertions(1);
    });
});
