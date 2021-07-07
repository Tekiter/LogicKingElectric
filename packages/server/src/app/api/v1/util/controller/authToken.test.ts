import { AuthHeaderParser, AuthFailError } from "./authToken";

describe("AuthHeaderParser", () => {
    test("fail on undefined header", () => {
        expect(() => AuthHeaderParser.parse(undefined)).toThrowError(AuthFailError);
    });

    test("fail on empty string header", () => {
        expect(() => AuthHeaderParser.parse("")).toThrowError(AuthFailError);
    });

    test("fail on invalid prefix", () => {
        expect(() => AuthHeaderParser.parse("Bear hello")).toThrowError(AuthFailError);
    });

    test("fail on only prefix", () => {
        expect(() => AuthHeaderParser.parse("Bearer ")).toThrowError(AuthFailError);
    });

    test("success on valid header", () => {
        expect(AuthHeaderParser.parse("Bearer A_t0ken")).toEqual("A_t0ken");
    });
});
