module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
