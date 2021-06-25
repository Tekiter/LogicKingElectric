import { createMemoryDataAccessFacade } from "../../dao/memory";
import { DataAccessFacade } from "../../dao/types";
import { AuthWithPassword } from "../auth";

const SAMPLE_USERNAME = "helloworld";
const SAMPLE_PASSWORD = "a_s1mp1e_p4sswd";

describe("Auth With Username & Password", () => {
    let auth: AuthWithPassword;
    let store: DataAccessFacade;

    beforeEach(() => {
        store = createMemoryDataAccessFacade();
        auth = new AuthWithPassword(store);
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

    test("authorize", async () => {
        await auth.register(SAMPLE_USERNAME, SAMPLE_PASSWORD);

        const result = await auth.authorize(SAMPLE_USERNAME, SAMPLE_PASSWORD);
        expect(result.success).toBeTruthy();

        if (result.success) {
            expect(result.authInfo.username).toBe(SAMPLE_USERNAME);
        }
    });
});
