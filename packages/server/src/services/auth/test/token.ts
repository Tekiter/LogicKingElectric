import { InvalidTokenError } from "../token";
import { JWTTokenManager } from "../token/jwt";

const TEST_SECRET = "A_TEST_3ecret";

interface TestInfo {
    str: string;
    num: number;
    arr: string[];
}

describe("Auth JWT Token", () => {
    const testInfo = {
        str: "A string",
        num: 987654321,
        arr: ["a", "b", "c"],
    } as TestInfo;

    const jwt = new JWTTokenManager<TestInfo>(TEST_SECRET);

    test("issue string token", async () => {
        const token = await jwt.issue(testInfo);
        expect(typeof token).toEqual("string");
    });

    test("check fail on invalid token", async () => {
        const isValid = await jwt.isValidToken("an invalid token");
        expect(isValid).toBeFalsy();
    });

    test("check success on valid token", async () => {
        const token = await jwt.issue(testInfo);

        const isValid = await jwt.isValidToken(token);
        expect(isValid).toBeTruthy();
    });

    test("extract auth info", async () => {
        const token = await jwt.issue(testInfo);
        const extractedInfo = await jwt.extract(token);
        expect(extractedInfo).toMatchObject(testInfo);
    });

    test("extract error on invalid token", async () => {
        try {
            await jwt.extract("an invalid token");
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidTokenError);
        }
        expect.assertions(1);
    });
});
