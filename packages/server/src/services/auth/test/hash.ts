import { checkHashedPassword, hashPassword } from "../hash";

const SAMPLE_PASSWORD = "hi@wor1d_pw";

describe("Auth Password Hash", () => {
    test("hash is string", async () => {
        const hashed = await hashPassword(SAMPLE_PASSWORD);

        expect(typeof hashed).toBe("string");
    });

    test("hash compare", async () => {
        const hashed = await hashPassword(SAMPLE_PASSWORD);

        const correctResult = await checkHashedPassword(hashed, SAMPLE_PASSWORD);
        expect(correctResult).toBeTruthy();

        const wrongResult = await checkHashedPassword(hashed, "S0meth1ng_0ther");
        expect(wrongResult).toBeFalsy();
    });
});
