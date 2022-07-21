const path = require("path");

module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "json", "js"],
  transform: {
    ".*\\.(ts)$": "ts-jest"
  },
  moduleNameMapper: {
    "^@lin-cli/(.*)$": "<rootDir>/packages/$1/index.ts"
  },
  rootDir: path.join(__dirname),
  testMatch: [
    // 匹配测试用例的文件
    "<rootDir>/packages/**/__tests__/*.test.ts"
  ],
  collectCoverageFrom: ["<rootDir>/packages/**/src/*.ts"]
};
