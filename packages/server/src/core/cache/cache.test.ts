import { RequestCache } from ".";

describe("cache", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runAllTimers();
        jest.useRealTimers();
    });

    test("undefined on cache miss", () => {
        const cache = new RequestCache<string, number>();

        cache.set("world", 123);

        expect(cache.get("hello")).toBe(undefined);
    });

    test("cached value on cache hit", () => {
        const cache = new RequestCache<string, string>();

        cache.set("hello", "world");

        expect(cache.get("hello")).toBe("world");
    });

    test("complex object key", () => {
        const cache = new RequestCache<{ a: number; b: string }, string>();

        cache.set({ a: 1, b: "asdf" }, "world");

        expect(cache.get({ a: 1, b: "asdf" })).toBe("world");
    });

    test("invalidate after timeout", () => {
        const cache = new RequestCache<string, string>({ timeout: 100 });

        cache.set("hello", "world");

        expect(cache.get("hello")).toBe("world");
        jest.runAllTimers();
        expect(cache.get("hello")).toBe(undefined);
    });
});
