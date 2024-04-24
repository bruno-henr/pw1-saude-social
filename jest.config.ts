/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
    clearMocks: true,

    coveragePathIgnorePatterns: ["/node_modules/"],

    coverageProvider: "v8",

    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],

    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
    },

    transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],
};

export default config;
