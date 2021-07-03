import { checkHashedPassword, hashPassword } from "../hash";

const SAMPLE_PASSWORD = "hi@wor1d_pw";

describe("Auth Password Hash", () => {
    test("hash is string", async () => {
        const hashed = await hashPassword(SAMPLE_PASSWORD);

        expect(typeof hashed).toBe("string");
    });

    test("hash undefined", () => {
        const d: unknown = undefined;
        expect(hashPassword(d as string)).rejects.toThrow();
    });

    test("hash compare", async () => {
        const hashed = await hashPassword(SAMPLE_PASSWORD);

        const correctResult = await checkHashedPassword(hashed, SAMPLE_PASSWORD);
        expect(correctResult).toBeTruthy();

        const wrongResult = await checkHashedPassword(hashed, "S0meth1ng_0ther");
        expect(wrongResult).toBeFalsy();
    });

    test("hash compare undefined", () => {
        const d: unknown = undefined;
        expect(checkHashedPassword(d as string, "asdf")).rejects.toThrow();
        expect(checkHashedPassword("asdf", d as string)).rejects.toThrow();
        expect(checkHashedPassword(d as string, d as string)).rejects.toThrow();
    });
});
