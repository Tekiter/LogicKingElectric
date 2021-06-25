module.exports = {
    testMatch: ["**/tests/**/*.+(ts|tsx|js)", "**/test/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
    testPathIgnorePatterns: ["/node_modules/", "/test/tmp/", "/test/utils/"],
    transformIgnorePatterns: [
        "/node_modules/",
        "/test/(fixtures|tmp|__data__)/",
        "<rootDir>/(packages|codemods|eslint)/[^/]+/lib/",
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testEnvironment: "node",
};
