module.exports = {
    root: true,
    parser: "babel-eslint",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        // "plugin:jsx-a11y/recommended",
        "plugin:prettier/recommended",
    ],
    plugins: [],
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
                warnOnUnsupportedTypeScriptVersion: false,
            },
            plugins: ["@typescript-eslint"],
            rules: {
                // Already handled by TS
                "no-dupe-class-members": "off",
                "no-undef": "off",

                // Add TypeScript specific rules (and turn off ESLint equivalents)
                "@typescript-eslint/consistent-type-assertions": "warn",
                "no-array-constructor": "off",
                "@typescript-eslint/no-array-constructor": "warn",
                "@typescript-eslint/no-namespace": "error",
                "no-use-before-define": "off",
                "@typescript-eslint/no-use-before-define": [
                    "warn",
                    {
                        functions: false,
                        classes: false,
                        variables: false,
                        typedefs: false,
                    },
                ],
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": [
                    "warn",
                    {
                        args: "none",
                        ignoreRestSiblings: true,
                    },
                ],
                "no-unused-expressions": "off",
                "@typescript-eslint/no-unused-expressions": [
                    "error",
                    {
                        allowShortCircuit: true,
                        allowTernary: true,
                        allowTaggedTemplates: true,
                    },
                ],
                "no-useless-constructor": "off",
                "@typescript-eslint/no-useless-constructor": "warn",
            },
        },
    ],
    rules: {
        "prettier/prettier": ["error", { endOfLine: "auto" }, { usePrettierrc: true }],
        "react/react-in-jsx-scope": "off",
    },
};
