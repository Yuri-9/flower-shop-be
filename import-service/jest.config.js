/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@functions/(.*)$": "<rootDir>/src/functions/$1",
    "^@libs/(.*)$": "<rootDir>/src/libs/$1",
    "^@model/(.*)$": "<rootDir>/src/model/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
  },
};
